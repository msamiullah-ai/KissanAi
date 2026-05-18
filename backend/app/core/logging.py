import json
import logging
import sys
from datetime import datetime


def _format_as_json(record: logging.LogRecord) -> str:
    payload = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "level": record.levelname,
        "logger": record.name,
        "message": record.getMessage(),
    }
    if hasattr(record, "extra"):
        payload.update(record.extra)
    if record.exc_info:
        payload["exception"] = logging.Formatter().formatException(record.exc_info)
    if hasattr(record, "request_id"):
        payload["request_id"] = record.request_id
    if hasattr(record, "duration_ms"):
        payload["duration_ms"] = record.duration_ms
    return json.dumps(payload, default=str)


class JsonFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        return _format_as_json(record)


def setup_logging(level: str = "INFO") -> None:
    root_logger = logging.getLogger()
    root_logger.setLevel(level)
    handler = logging.StreamHandler(stream=sys.stdout)
    handler.setFormatter(JsonFormatter())
    if root_logger.handlers:
        root_logger.handlers.clear()
    root_logger.addHandler(handler)


def get_logger(name: str | None = None) -> logging.Logger:
    return logging.getLogger(name)
