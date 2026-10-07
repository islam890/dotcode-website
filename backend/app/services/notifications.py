import json
import html
import logging
import smtplib
from email.message import EmailMessage
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from app.database import Settings
from app.models import ContactMessage

logger = logging.getLogger(__name__)


def _budget_label(contact_message: ContactMessage) -> str:
    budget = contact_message.budget or "Not provided"
    currency = contact_message.budget_currency
    return f"{budget} {currency}".strip() if currency else budget


def _submitted_at(contact_message: ContactMessage) -> str:
    if not contact_message.created_at:
        return "Not available"
    return contact_message.created_at.strftime("%A, %B %d, %Y at %H:%M:%S UTC")


def _notification_lines(contact_message: ContactMessage) -> list[str]:
    return [
        f"Submitted: {_submitted_at(contact_message)}",
        f"Name: {contact_message.name}",
        f"Email: {contact_message.email}",
        f"Phone: {contact_message.phone or 'Not provided'}",
        f"Company: {contact_message.company or 'Not provided'}",
        "",
        "PROJECT",
        f"Project Type: {contact_message.project_type or 'Not provided'}",
        f"Service of Interest: {contact_message.service or 'Not provided'}",
        f"Budget: {_budget_label(contact_message)}",
        "",
        "MESSAGE",
        contact_message.message,
        "",
        "Submitted via DotCode Website",
    ]


def notify_contact_message(contact_message: ContactMessage, settings: Settings) -> None:
    """Attempt all configured notifications without affecting persisted inquiries."""
    _send_email_notification(contact_message, settings)
    _send_telegram_notification(contact_message, settings)


def _send_email_notification(
    contact_message: ContactMessage,
    settings: Settings,
) -> None:
    configuration = (
        settings.smtp_host,
        settings.email_from,
        settings.contact_email,
    )
    if not all(configuration):
        logger.info("Email notification skipped: SMTP/contact email is not configured.")
        return

    email = EmailMessage()
    email["Subject"] = "New Project Inquiry — DotCode"
    email["From"] = settings.email_from
    email["To"] = settings.contact_email
    email["Reply-To"] = contact_message.email
    plain_text = "\n".join(
        [
            "DOTCODE",
            "New Contact Inquiry",
            "",
            "CONTACT",
            *_notification_lines(contact_message),
        ]
    )
    email.set_content(plain_text)
    email.add_alternative(
        f"""
        <html>
          <body style="margin:0;background:#f5f5f5;color:#171717;font-family:Arial,sans-serif;">
            <div style="max-width:620px;margin:24px auto;background:#ffffff;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;">
              <div style="padding:24px 28px;background:#111111;color:#ffffff;">
                <div style="font-size:12px;letter-spacing:2px;font-weight:bold;">DOTCODE</div>
                <div style="margin-top:8px;font-size:24px;font-weight:bold;">New Contact Inquiry</div>
              </div>
              <div style="padding:24px 28px;font-size:14px;line-height:1.7;">
                <div style="font-size:12px;letter-spacing:1.5px;font-weight:bold;color:#666666;">CONTACT</div>
                <p><b>Name:</b> {html.escape(contact_message.name)}<br>
                <b>Email:</b> {html.escape(contact_message.email)}<br>
                <b>Submitted:</b> {html.escape(_submitted_at(contact_message))}<br>
                <b>Phone:</b> {html.escape(contact_message.phone or "Not provided")}<br>
                <b>Company:</b> {html.escape(contact_message.company or "Not provided")}</p>
                <div style="font-size:12px;letter-spacing:1.5px;font-weight:bold;color:#666666;">PROJECT</div>
                <p><b>Project Type:</b> {html.escape(contact_message.project_type or "Not provided")}<br>
                <b>Service of Interest:</b> {html.escape(contact_message.service or "Not provided")}<br>
                <b>Budget:</b> {html.escape(_budget_label(contact_message))}</p>
                <div style="font-size:12px;letter-spacing:1.5px;font-weight:bold;color:#666666;">MESSAGE</div>
                <div style="margin-top:8px;padding:14px;background:#f7f7f7;border-radius:8px;white-space:pre-wrap;">{html.escape(contact_message.message)}</div>
              </div>
              <div style="padding:16px 28px;color:#777777;font-size:12px;border-top:1px solid #eeeeee;">Submitted via DotCode Website</div>
            </div>
          </body>
        </html>
        """,
        subtype="html",
    )

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=10) as smtp:
            if settings.smtp_use_tls:
                smtp.starttls()
            if settings.smtp_username and settings.smtp_password:
                smtp.login(settings.smtp_username, settings.smtp_password)
            smtp.send_message(email)
    except (OSError, smtplib.SMTPException):
        logger.exception("Email notification failed for contact message %s.", contact_message.id)


def _send_telegram_notification(
    contact_message: ContactMessage,
    settings: Settings,
) -> None:
    if not settings.telegram_bot_token or not settings.telegram_chat_id:
        logger.info("Telegram notification skipped: bot credentials are not configured.")
        return

    escaped_name = html.escape(contact_message.name)
    escaped_email = html.escape(contact_message.email)
    escaped_submitted_at = html.escape(_submitted_at(contact_message))
    escaped_phone = html.escape(contact_message.phone or "Not provided")
    escaped_company = html.escape(contact_message.company or "Not provided")
    escaped_project_type = html.escape(contact_message.project_type or "Not provided")
    escaped_service = html.escape(contact_message.service or "Not provided")
    escaped_budget = html.escape(_budget_label(contact_message))
    escaped_message = html.escape(contact_message.message)
    message = "\n".join(
        [
            "📩 <b>DOTCODE</b>",
            "<b>NEW CONTACT INQUIRY</b>",
            "",
            "👤 <b>CONTACT</b>",
            f"<b>Submitted:</b> {escaped_submitted_at}",
            f"<b>Name:</b> {escaped_name}",
            f"<b>Email:</b> {escaped_email}",
            f"<b>Phone:</b> {escaped_phone}",
            f"<b>Company:</b> {escaped_company}",
            "",
            "🚀 <b>PROJECT</b>",
            f"<b>Project Type:</b> {escaped_project_type}",
            f"<b>Service of Interest:</b> {escaped_service}",
            f"<b>Budget:</b> {escaped_budget}",
            "",
            "📝 <b>MESSAGE</b>",
            escaped_message,
            "",
            "🌐 <i>Submitted via DotCode Website</i>",
        ]
    )
    payload = json.dumps(
        {
            "chat_id": settings.telegram_chat_id,
            "text": message,
            "parse_mode": "HTML",
            "disable_web_page_preview": True,
        }
    ).encode("utf-8")
    request = Request(
        f"https://api.telegram.org/bot{settings.telegram_bot_token}/sendMessage",
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urlopen(request, timeout=10) as response:
            response_body = json.loads(response.read().decode("utf-8"))
        if not response_body.get("ok"):
            raise RuntimeError("Telegram API returned an unsuccessful response.")
    except (HTTPError, URLError, OSError, ValueError, RuntimeError):
        logger.exception(
            "Telegram notification failed for contact message %s.",
            contact_message.id,
        )
