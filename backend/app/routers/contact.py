from datetime import datetime, timedelta, timezone
import logging
from fastapi import APIRouter, Depends, HTTPException, Request, BackgroundTasks, status
from sqlalchemy.orm import Session

from backend.app.config import settings
from backend.app.database import get_db
from backend.app.limiter import limiter
from backend.app.models.contact import ContactMessage
from backend.app.schemas.contact import ContactCreate, ContactSubmissionResult
from backend.app.services.email_service import send_contact_notification

logger = logging.getLogger("portfolio.contact")

router = APIRouter(prefix="/api/contact", tags=["Contact"])


@router.post("", response_model=ContactSubmissionResult, status_code=status.HTTP_201_CREATED)
@limiter.limit(settings.CONTACT_RATE_LIMIT)
async def submit_contact_form(
    request: Request,
    payload: ContactCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    # 1. Anti-spam Honeypot Check
    # If the invisible honeypot field is populated, a bot filled it out.
    # Return fake success to deceive bots without writing to DB or dispatching emails.
    if payload.company_hp:
        logger.info(f"Bot submission intercepted via honeypot field from {payload.email}.")
        return ContactSubmissionResult(
            success=True,
            message="Thank you! Your message has been sent successfully."
        )

    # 2. Duplicate Submission Prevention
    # Check if a message with identical email and message content was submitted in the last 10 minutes.
    ten_minutes_ago = datetime.now(timezone.utc) - timedelta(minutes=10)
    existing_duplicate = (
        db.query(ContactMessage)
        .filter(
            ContactMessage.email == payload.email,
            ContactMessage.message == payload.message,
            ContactMessage.created_at >= ten_minutes_ago,
        )
        .first()
    )

    if existing_duplicate:
        logger.warning(f"Duplicate submission rejected for {payload.email}.")
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An identical message was recently submitted. Please wait a few minutes before resubmitting.",
        )

    # 3. Persist inquiry in PostgreSQL
    new_inquiry = ContactMessage(
        full_name=payload.full_name,
        email=payload.email,
        subject=payload.subject,
        message=payload.message,
        status="New"
    )

    try:
        db.add(new_inquiry)
        db.commit()
        db.refresh(new_inquiry)
        logger.info(f"Inquiry saved with ID #{new_inquiry.id} from {new_inquiry.email}.")
    except Exception as exc:
        db.rollback()
        logger.error(f"Failed to save contact message to database: {exc}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to save inquiry at this moment. Please try again later.",
        )

    # 4. Trigger Email Notification via Background Task
    background_tasks.add_task(send_contact_notification, new_inquiry)

    return ContactSubmissionResult(
        success=True,
        message="Thank you for reaching out! Your message has been received, and I'll get back to you shortly."
    )
