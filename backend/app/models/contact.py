from sqlalchemy import Column, Integer, String, Text, DateTime, func
from backend.app.database import Base


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    subject = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    status = Column(String(20), default="New", index=True)  # New, Read, Replied
    created_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    def __repr__(self):
        return f"<ContactMessage id={self.id} name='{self.full_name}' email='{self.email}'>"
