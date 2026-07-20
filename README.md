# KissanAI 🌾

AI-powered agricultural intelligence platform for Punjab farmers featuring crop recommendation, profitability forecasting, weather-risk analysis, irrigation intelligence, and smart land allocation optimization.

Built using React, FastAPI, PostgreSQL, and AI-driven analytics workflows.

---

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/e6d69b77-2d94-4af4-9cfb-98738888ddf0" />

---

## Features

* AI crop recommendation engine
* Weather-aware agricultural analysis
* Profitability prediction
* Irrigation intelligence
* Smart land allocation optimization
* Interactive analytics dashboard
* Real-time weather integration
* Recommendation risk analysis
* Exportable reports

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* TailwindCSS
* Recharts
* Framer Motion

### Backend

* FastAPI
* PostgreSQL
* SQLAlchemy
* Alembic
* Pydantic

---

## Project Structure

```bash
KissanAi/
├── backend/
├── frontend/
├── docs/
└── README.md
```

---

## Setup Instructions

### Backend

```bash
cd backend
pip install -r requirements.txt
python -m alembic upgrade head
python scripts/seed_data.py
python -m uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## API Endpoints

| Method | Endpoint                        |
| ------ | ------------------------------- |
| POST   | `/api/recommendations/generate` |
| GET    | `/api/weather/{district}`       |
| GET    | `/api/health`                   |

---

## Future Roadmap

* Satellite imagery integration
* Machine learning yield forecasting
* Multilingual farmer assistant
* Mobile application
* Historical trend analysis
* AI-powered seasonal forecasting

---

## License

MIT License
