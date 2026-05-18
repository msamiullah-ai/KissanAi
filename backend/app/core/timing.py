import time
import uuid
from contextvars import ContextVar
from typing import Any

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

from .logging import get_logger

_request_metrics: ContextVar[dict[str, Any] | None] = ContextVar("request_metrics", default=None)


def get_request_metrics() -> dict[str, Any] | None:
    return _request_metrics.get()


def set_request_metrics(metrics: dict[str, Any]) -> None:
    _request_metrics.set(metrics)


def record_metric(key: str, value: Any) -> None:
    metrics = get_request_metrics()
    if metrics is not None:
        metrics["timings"][key] = value


class RequestTimingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        logger = get_logger("kissanai.request")
        request_id = str(uuid.uuid4())
        start_time = time.perf_counter()
        metrics = {"request_id": request_id, "path": request.url.path, "timings": {}}
        set_request_metrics(metrics)

        response = await call_next(request)

        duration_ms = round((time.perf_counter() - start_time) * 1000, 2)
        metrics["timings"]["request_duration_ms"] = duration_ms
        response.headers["X-Request-Duration-Ms"] = str(duration_ms)
        logger.info("request.completed", extra={"request_id": request_id, "path": request.url.path, "duration_ms": duration_ms, "timings": metrics["timings"]})
        return response


def get_current_request_id() -> str | None:
    metrics = get_request_metrics()
    return metrics.get("request_id") if metrics else None
