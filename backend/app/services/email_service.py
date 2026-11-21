import html
import logging
from datetime import datetime

try:
    import truststore
    truststore.inject_into_ssl()
except ImportError:
    pass

import httpx
from backend.app.config import settings
from backend.app.models.contact import ContactMessage

logger = logging.getLogger("portfolio.email")


async def send_contact_notification(message: ContactMessage) -> bool:
    """
    Sends an email notification via Resend API when a new contact inquiry arrives.
    Configures the sender's email as the Reply-To address.
    """
    if not settings.RESEND_API_KEY or settings.RESEND_API_KEY.strip() == "":
        logger.warning(
            f"RESEND_API_KEY is not configured. Mocking notification for inquiry #{message.id} from {message.email}."
        )
        return True

    submitted_at_str = (
        message.created_at.strftime("%Y-%m-%d %H:%M:%S UTC")
        if message.created_at
        else datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    )

    # Sanitize user inputs to prevent HTML/XSS injection in rendered email client
    safe_full_name = html.escape(message.full_name)
    safe_email = html.escape(message.email)
    safe_subject = html.escape(message.subject)
    safe_message_escaped = html.escape(message.message)
    # Convert newlines to break tags for email clients while preserving escaped entities
    safe_message_html = safe_message_escaped.replace("\n", "<br/>")

    # HTML Email template formatted with clean typography and portfolio branding
    html_content = f"""
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #160F19; color: #F7EFF4; margin: 0; padding: 24px; }}
          .container {{ max-width: 600px; margin: 0 auto; background-color: #211725; border: 1px solid #403044; border-radius: 12px; padding: 32px; }}
          .badge {{ display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #E6A995; background-color: rgba(230, 169, 149, 0.1); border: 1px solid rgba(230, 169, 149, 0.2); border-radius: 9999px; margin-bottom: 16px; }}
          h2 {{ margin-top: 0; font-size: 22px; color: #F7EFF4; font-weight: 600; }}
          .meta-box {{ background-color: #2B1E30; border-radius: 8px; padding: 16px; margin: 20px 0; }}
          .meta-item {{ margin: 6px 0; font-size: 14px; color: #C5BAC6; }}
          .meta-item strong {{ color: #F7EFF4; }}
          .message-box {{ background-color: #160F19; border: 1px solid #403044; border-radius: 8px; padding: 20px; font-size: 15px; line-height: 1.6; color: #F7EFF4; word-break: break-word; }}
          .footer {{ margin-top: 24px; font-size: 12px; color: #8F8392; text-align: center; border-top: 1px solid #403044; padding-top: 16px; }}
          a {{ color: #E6A995; text-decoration: none; }}
        </style>
      </head>
      <body>
        <div class="container">
          <span class="badge">New Inquiry Received</span>
          <h2>New Contact Message from Portfolio</h2>
          
          <div class="meta-box">
            <div class="meta-item"><strong>From:</strong> {safe_full_name} (&lt;<a href="mailto:{safe_email}">{safe_email}</a>&gt;)</div>
            <div class="meta-item"><strong>Subject:</strong> {safe_subject}</div>
            <div class="meta-item"><strong>Received:</strong> {submitted_at_str}</div>
          </div>

          <p style="font-size: 13px; color: #C5BAC6; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; margin-bottom: 8px;">Message:</p>
          <div class="message-box">{safe_message_html}</div>

          <div class="footer">
            Sent directly from the Anjali Vishwakarma Developer Portfolio backend. Simply click <strong>Reply</strong> to email the sender directly.
          </div>
        </div>
      </body>
    </html>
    """

    payload = {
        "from": settings.SENDER_EMAIL,
        "to": [settings.NOTIFICATION_EMAIL],
        "reply_to": message.email,
        "subject": f"Portfolio Inquiry: {message.subject} (from {message.full_name})",
        "html": html_content,
    }

    headers = {
        "Authorization": f"Bearer {settings.RESEND_API_KEY}",
        "Content-Type": "application/json",
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(
                "https://api.resend.com/emails",
                json=payload,
                headers=headers,
            )
            if response.status_code in (200, 201):
                res_data = response.json()
                email_id = res_data.get("id", "unknown")
                logger.info(f"Email notification dispatched successfully via Resend for inquiry #{message.id}. Resend Email ID: {email_id}")
                return True
            else:
                logger.error(
                    f"Resend API error [{response.status_code}]: {response.text}"
                )
                return False
    except Exception as exc:
        logger.error(f"Failed to dispatch email notification: {exc}")
        return False
