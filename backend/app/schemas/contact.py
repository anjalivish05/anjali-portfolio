from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, field_validator


class ContactCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100, description="Full name of sender")
    email: EmailStr = Field(..., description="Valid email address")
    subject: str = Field(..., min_length=2, max_length=200, description="Subject of the message")
    message: str = Field(..., min_length=5, max_length=5000, description="Message body")
    company_hp: Optional[str] = Field(default=None, alias="_hp_company", description="Honeypot anti-spam field")

    @field_validator("full_name", "subject", "message")
    def strip_and_sanitize(cls, v: str) -> str:
        if isinstance(v, str):
            cleaned = v.strip()
            if not cleaned:
                raise ValueError("Field cannot be empty or solely whitespace.")
            return cleaned
        return v


class ContactResponse(BaseModel):
    id: int
    full_name: str
    email: str
    subject: str
    message: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class ContactSubmissionResult(BaseModel):
    success: bool
    message: str
