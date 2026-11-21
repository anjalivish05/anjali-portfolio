"""
Database Migration & Seeding Utility: SQLite -> PostgreSQL
Safely transfers contact inquiries from the local development SQLite database (or backup JSON)
into a production PostgreSQL database without deleting or modifying any existing SQLite data.
"""

import argparse
from datetime import datetime
import json
import os
import sys
from pathlib import Path

# Add project root and backend to sys.path
script_dir = Path(__file__).resolve().parent
backend_dir = script_dir.parent
project_root = backend_dir.parent

for p in [str(project_root), str(backend_dir)]:
    if p not in sys.path:
        sys.path.insert(0, p)

from sqlalchemy import create_engine, select, text
from sqlalchemy.orm import sessionmaker
from backend.app.models.contact import ContactMessage
from backend.app.models.analytics import PageView, AnalyticsEvent
from backend.app.database import Base


def migrate_data(target_database_url: str, backup_json_path: Path = None):
    # Ensure URL uses postgresql://
    if target_database_url.startswith("postgres://"):
        target_database_url = target_database_url.replace("postgres://", "postgresql://", 1)

    print(f"Connecting to target database (dialect: {target_database_url.split(':')[0]})...")

    connect_args = {}
    engine_kwargs = {}
    if target_database_url.startswith("sqlite"):
        connect_args = {"check_same_thread": False}
        # If relative or absolute file path, ensure directory exists
        db_file_str = target_database_url.replace("sqlite:///", "")
        db_path = Path(db_file_str)
        db_path.parent.mkdir(parents=True, exist_ok=True)
    else:
        engine_kwargs = {"pool_pre_ping": True}

    target_engine = create_engine(target_database_url, connect_args=connect_args, **engine_kwargs)
    TargetSession = sessionmaker(bind=target_engine)

    # 1. Ensure target tables exist
    print("Ensuring target schema tables are initialized...")
    Base.metadata.create_all(bind=target_engine)

    # 2. Load records to migrate
    if backup_json_path and backup_json_path.exists():
        print(f"Loading contact records from backup file: {backup_json_path}")
        with open(backup_json_path, "r", encoding="utf-8") as f:
            records_data = json.load(f)
    else:
        # Fallback to local SQLite DB directly
        sqlite_path = backend_dir / "portfolio.db"
        if not sqlite_path.exists():
            print(f"No SQLite database or backup found at {sqlite_path}. Nothing to migrate.")
            return

        print(f"Reading directly from SQLite database: {sqlite_path}")
        sqlite_engine = create_engine(f"sqlite:///{sqlite_path.as_posix()}", connect_args={"check_same_thread": False})
        SQLiteSession = sessionmaker(bind=sqlite_engine)
        with SQLiteSession() as s_db:
            contacts = s_db.query(ContactMessage).all()
            records_data = [
                {
                    "id": c.id,
                    "full_name": c.full_name,
                    "email": c.email,
                    "subject": c.subject,
                    "message": c.message,
                    "status": c.status,
                    "created_at": c.created_at.isoformat() if c.created_at else None,
                }
                for c in contacts
            ]

    print(f"Found {len(records_data)} source records to migrate.")

    # 3. Seed into Target PostgreSQL
    inserted_count = 0
    skipped_count = 0

    with TargetSession() as target_db:
        for r in records_data:
            created_dt = (
                datetime.fromisoformat(r["created_at"])
                if r.get("created_at")
                else datetime.utcnow()
            )

            # Check if record already exists in target
            existing = (
                target_db.query(ContactMessage)
                .filter(
                    ContactMessage.email == r["email"],
                    ContactMessage.message == r["message"]
                )
                .first()
            )

            if existing:
                skipped_count += 1
                continue

            new_contact = ContactMessage(
                id=r.get("id"),
                full_name=r["full_name"],
                email=r["email"],
                subject=r["subject"],
                message=r["message"],
                status=r.get("status", "New"),
                created_at=created_dt,
            )
            target_db.add(new_contact)
            inserted_count += 1

        target_db.commit()

        # 4. If PostgreSQL, update the sequence counter so new inserts don't collide
        if target_database_url.startswith("postgresql"):
            try:
                target_db.execute(text("SELECT setval(pg_get_serial_sequence('contact_messages', 'id'), COALESCE(max(id), 1)) FROM contact_messages;"))
                target_db.commit()
                print("PostgreSQL identity sequence updated successfully.")
            except Exception as seq_err:
                print(f"Note: Sequence update skipped or unsupported: {seq_err}")

        total_target_count = target_db.query(ContactMessage).count()

    print("\n--- Migration Complete ---")
    print(f"Records Inserted: {inserted_count}")
    print(f"Records Already Present: {skipped_count}")
    print(f"Total Target Records Now: {total_target_count}")
    print("Source SQLite database remains intact and unmodified.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Migrate portfolio records to target database")
    parser.add_argument("--url", help="Target database connection URL (PostgreSQL)", default=os.getenv("TARGET_DATABASE_URL"))
    parser.add_argument("--backup-file", help="Path to backup_contacts.json", default=str(backend_dir / "data" / "backup_contacts.json"))
    args = parser.parse_args()

    target_url = args.url or os.getenv("DATABASE_URL")
    if not target_url:
        print("Error: Target database URL not provided. Pass --url or set TARGET_DATABASE_URL/DATABASE_URL.")
        sys.exit(1)

    migrate_data(target_url, Path(args.backup_file))
