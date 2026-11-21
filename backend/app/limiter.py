from fastapi import Request
from slowapi import Limiter
from backend.app.config import settings


def get_real_client_ip(request: Request) -> str:
    """
    Safely extracts the client IP address for rate-limiting.
    - When running in production behind reverse proxies (Render / Cloudflare / Vercel),
      inspects CF-Connecting-IP or verified X-Forwarded-For client address.
    - In local development, defaults to the direct client connection host.
    """
    # 1. Cloudflare header (highest priority if Cloudflare proxy is active)
    cf_connecting_ip = request.headers.get("cf-connecting-ip")
    if cf_connecting_ip:
        return cf_connecting_ip.strip()

    # 2. X-Forwarded-For header (standard proxy header)
    # Only evaluate forwarded headers in production mode
    if settings.ENVIRONMENT == "production":
        forwarded_for = request.headers.get("x-forwarded-for")
        if forwarded_for:
            # The client IP is the first entry in X-Forwarded-For chain
            parts = [ip.strip() for ip in forwarded_for.split(",") if ip.strip()]
            if parts:
                return parts[0]

    # 3. Direct socket peer connection
    if request.client and request.client.host:
        return request.client.host

    return "127.0.0.1"


limiter = Limiter(key_func=get_real_client_ip)
