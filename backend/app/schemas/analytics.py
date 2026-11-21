from typing import Optional
from pydantic import BaseModel, Field


class PageViewCreate(BaseModel):
    path: str = Field(..., max_length=255, description="Path or route visited")
    referrer: Optional[str] = Field(default=None, max_length=500, description="Referring URL")


class AnalyticsEventCreate(BaseModel):
    event_name: str = Field(..., max_length=100, description="Action or event identifier")
    event_data: Optional[str] = Field(default=None, max_length=500, description="Contextual payload or item target")


class AnalyticsResult(BaseModel):
    success: bool
