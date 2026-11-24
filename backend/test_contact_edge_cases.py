import os
import sys

backend_dir = os.path.dirname(os.path.abspath(__file__))
project_dir = os.path.dirname(backend_dir)
for p in [str(project_dir), str(backend_dir)]:
    if p not in sys.path:
        sys.path.insert(0, p)

from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.database import SessionLocal
from backend.app.models.contact import ContactMessage

def test_contact_edge_cases():
    print("=== TESTING CONTACT FORM VALIDATION & EDGE CASES ===")
    results = []

    with TestClient(app) as client:
        # 1. Empty submission
        res_empty = client.post("/api/contact", json={})
        passed_empty = res_empty.status_code == 422
        results.append(("Empty submission", 422, res_empty.status_code, passed_empty, res_empty.json()))
        print(f"1. Empty Submission: status={res_empty.status_code} ({'PASS' if passed_empty else 'FAIL'})")

        # 2. Missing email
        res_no_email = client.post("/api/contact", json={
            "full_name": "Test User",
            "subject": "Hello",
            "message": "Valid message"
        })
        passed_no_email = res_no_email.status_code == 422
        results.append(("Missing email", 422, res_no_email.status_code, passed_no_email, res_no_email.json()))
        print(f"2. Missing Email: status={res_no_email.status_code} ({'PASS' if passed_no_email else 'FAIL'})")

        # 3. Missing full_name
        res_no_name = client.post("/api/contact", json={
            "email": "test@example.com",
            "subject": "Hello",
            "message": "Valid message"
        })
        passed_no_name = res_no_name.status_code == 422
        results.append(("Missing full_name", 422, res_no_name.status_code, passed_no_name, res_no_name.json()))
        print(f"3. Missing Full Name: status={res_no_name.status_code} ({'PASS' if passed_no_name else 'FAIL'})")

        # 4. Missing message
        res_no_msg = client.post("/api/contact", json={
            "full_name": "Test User",
            "email": "test@example.com",
            "subject": "Hello"
        })
        passed_no_msg = res_no_msg.status_code == 422
        results.append(("Missing message", 422, res_no_msg.status_code, passed_no_msg, res_no_msg.json()))
        print(f"4. Missing Message: status={res_no_msg.status_code} ({'PASS' if passed_no_msg else 'FAIL'})")

        # 5. Invalid emails
        invalid_emails = [
            "plainaddress",
            "@missinguser.com",
            "missingdomain@",
            "user@domain..com"
        ]
        for em in invalid_emails:
            res_inv = client.post("/api/contact", json={
                "full_name": "Invalid Emailer",
                "email": em,
                "subject": "Test",
                "message": "This should fail validation"
            })
            passed_inv = res_inv.status_code == 422
            results.append((f"Invalid email '{em}'", 422, res_inv.status_code, passed_inv, res_inv.json()))
            print(f"5. Invalid Email '{em}': status={res_inv.status_code} ({'PASS' if passed_inv else 'FAIL'})")

        # 6. Valid submission with long message (e.g. 2500 chars)
        long_text = "This is a comprehensive inquiry description. " * 60
        valid_payload = {
            "full_name": f"QA Verifier {os.urandom(3).hex()}",
            "email": f"qa_{os.urandom(3).hex()}@example.com",
            "subject": "QA Test Verification Subject",
            "message": long_text
        }
        res_valid = client.post("/api/contact", json=valid_payload)
        passed_valid = res_valid.status_code == 201
        results.append(("Valid submission with long message", 201, res_valid.status_code, passed_valid, res_valid.json()))
        print(f"6. Valid Submission with Long Message: status={res_valid.status_code} ({'PASS' if passed_valid else 'FAIL'})")

        # 7. Check database record
        db = SessionLocal()
        saved_msg = db.query(ContactMessage).filter(ContactMessage.email == valid_payload["email"]).first()
        db_persisted = saved_msg is not None and saved_msg.message == long_text.strip()
        print(f"7. Database Persistence Check: {'PASS (Record ID #' + str(saved_msg.id) + ')' if db_persisted else 'FAIL'}")
        
        # Total records count in database
        total_records = db.query(ContactMessage).count()
        print(f"Total contact messages in database: {total_records}")
        db.close()

if __name__ == "__main__":
    test_contact_edge_cases()
