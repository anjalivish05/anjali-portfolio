from datetime import datetime, timedelta, timezone
import logging
from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.orm import Session

from backend.app.config import settings
from backend.app.database import get_db
from backend.app.limiter import limiter
from backend.app.models.analytics import PageView, AnalyticsEvent
from backend.app.schemas.analytics import PageViewCreate, AnalyticsEventCreate, AnalyticsResult

logger = logging.getLogger("portfolio.analytics")

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])


@router.post("/pageview", response_model=AnalyticsResult, status_code=status.HTTP_200_OK)
@limiter.limit(settings.ANALYTICS_RATE_LIMIT)
async def track_page_view(
    request: Request,
    payload: PageViewCreate,
    db: Session = Depends(get_db)
):
    """
    Lightweight, privacy-first page view tracking.
    Includes a 3-second backend deduplication window to prevent React StrictMode
    or rapid page refresh duplication.
    """
    try:
        user_agent = request.headers.get("user-agent", "")[:500]
        sanitized_path = payload.path[:255]

        # Deduplication window (3 seconds)
        recent_window = datetime.now(timezone.utc) - timedelta(seconds=3)
        recent_duplicate = (
            db.query(PageView)
            .filter(
                PageView.path == sanitized_path,
                PageView.user_agent == user_agent,
                PageView.timestamp >= recent_window,
            )
            .first()
        )

        if recent_duplicate:
            return AnalyticsResult(success=True)

        page_view = PageView(
            path=sanitized_path,
            referrer=payload.referrer[:500] if payload.referrer else None,
            user_agent=user_agent
        )
        db.add(page_view)
        db.commit()
        return AnalyticsResult(success=True)
    except Exception as exc:
        db.rollback()
        logger.error(f"Failed to record page view: {exc}")
        return AnalyticsResult(success=False)


@router.post("/event", response_model=AnalyticsResult, status_code=status.HTTP_200_OK)
@limiter.limit(settings.ANALYTICS_RATE_LIMIT)
async def track_event(
    request: Request,
    payload: AnalyticsEventCreate,
    db: Session = Depends(get_db)
):
    """
    Lightweight event tracking for key portfolio interactions:
    - project link clicks
    - resume download events
    - contact form interactions
    Includes a 2-second backend deduplication window to debounce rapid double-clicks.
    """
    try:
        sanitized_event_name = payload.event_name[:100]
        sanitized_event_data = payload.event_data[:500] if payload.event_data else None

        # Deduplication window (2 seconds)
        recent_window = datetime.now(timezone.utc) - timedelta(seconds=2)
        recent_duplicate = (
            db.query(AnalyticsEvent)
            .filter(
                AnalyticsEvent.event_name == sanitized_event_name,
                AnalyticsEvent.event_data == sanitized_event_data,
                AnalyticsEvent.timestamp >= recent_window,
            )
            .first()
        )

        if recent_duplicate:
            return AnalyticsResult(success=True)

        event = AnalyticsEvent(
            event_name=sanitized_event_name,
            event_data=sanitized_event_data
        )
        db.add(event)
        db.commit()
        return AnalyticsResult(success=True)
    except Exception as exc:
        db.rollback()
        logger.error(f"Failed to record analytics event: {exc}")
        return AnalyticsResult(success=False)
