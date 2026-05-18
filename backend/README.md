# KissanAI Backend

FastAPI backend for KissanAI — Punjab Agricultural Decision Intelligence System.

## Structure

- `app/main.py` — FastAPI app setup
- `app/config.py` — environment config via dotenv
- `app/database/` — SQLAlchemy engine and base
- `app/models/` — database models
- `app/schemas/` — request/response schemas
- `app/routes/` — API routers
- `app/services/` — business logic
- `app/utils/` — helpers
- `app/ml/` — ML starter modules

## Setup

1. Copy `.env.example` to `.env`
2. Update `DATABASE_URL` and `OPENWEATHER_API_KEY`
3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Initialize the database:

```bash
createdb kissanai
alembic upgrade head
python scripts/seed_data.py
```

5. Run the app:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Health check

- `GET /api/health`

## Alembic migration commands

```bash
alembic revision --autogenerate -m "initial"
alembic upgrade head
```
