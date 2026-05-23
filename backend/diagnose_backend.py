#!/usr/bin/env python3
"""Diagnostic script for KissanAI backend wiring.
Run: python diagnose_backend.py
"""
import sys
import traceback
from importlib import import_module

from sqlalchemy import text

MODULES = [
    "app.main",
    "app.routes.crop",
    "app.routes.health",
    "app.services.crop_service",
    "app.services.health_service",
    "app.database",
    "app.database.session",
    "app.models.crop",
    "app.models.farm",
    "app.schemas.crop",
]

success = True

print("\n== Import checks ==")
for mod in MODULES:
    try:
        import_module(mod)
        print(f"OK: imported {mod}")
    except Exception as e:
        success = False
        print(f"ERROR importing {mod}: {e}")
        traceback.print_exc()

print("\n== Database connection check ==")
try:
    from app.database import engine
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    print("OK: database connection established (SELECT 1)")
except Exception as e:
    success = False
    print(f"ERROR: database connection failed: {e}")
    traceback.print_exc()

print("\n== FastAPI route registration check ==")
try:
    from app.main import app
    # List registered routes
    paths = []
    for r in app.routes:
        path = getattr(r, "path", None)
        if path:
            paths.append((path, getattr(r, "methods", None)))
    print(f"Found {len(paths)} routes registered on app")
    for p, m in paths:
        print(f" - {p}  methods={m}")
    endpoint_present = any(
        p == "/api/crops/recommend" or p.endswith("/crops/recommend") or "/crops/recommend" in p
        for p, _ in paths
    )
    print("/crops/recommend registered:", endpoint_present)
    if not endpoint_present:
        success = False
except Exception as e:
    success = False
    print(f"ERROR checking FastAPI routes: {e}")
    traceback.print_exc()

print("\n== Summary ==")
if success:
    print("ALL CHECKS PASSED")
    sys.exit(0)
else:
    print("SOME CHECKS FAILED - see above for tracebacks")
    sys.exit(2)
