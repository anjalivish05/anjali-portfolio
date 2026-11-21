from sqlalchemy import Column, Integer, String, DateTime, func
from backend.app.database import Base


class PageView(Base):
    __tablename__ = "page_views"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    path = Column(String(255), nullable=False, index=True)
    referrer = Column(String(500), nullable=True)
    user_agent = Column(String(500), nullable=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now(), index=True)

    def __repr__(self):
        return f"<PageView id={self.id} path='{self.path}' at={self.timestamp}>"


class AnalyticsEvent(Base):
    __tablename__ = "analytics_events"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    event_name = Column(String(100), nullable=False, index=True)
    event_data = Column(String(500), nullable=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now(), index=True)

    def __repr__(self):
        return f"<AnalyticsEvent id={self.id} event='{self.event_name}'>"
