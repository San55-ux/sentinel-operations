# Sentinel Operations - Enterprise Supply Chain Audit & Risk Intelligence

**Sentinel Operations** is a production-grade full-stack platform built for Associate Software Engineer portfolios, demonstrating strong engineering fundamentals across **React**, **Python**, and **Predictive AI Integration**.

Designed around real-world global logistics bottlenecks, Sentinel Operations continuously monitors ocean freight corridors, performs anomaly risk scoring via a Python backend pipeline, and provides operators with interactive dispatch rerouting controls.

---

## Technical Stack & Engineering Architecture

### 1. Frontend (React 18 + Vite)
- **Design System**: Enterprise Light Theme built on crisp pure white (`#FFFFFF`) background, neutral slate borders (`#E5E7EB`), dark high-contrast typography (`#111827`), and zero generic glowing AI cliches.
- **Typography**: Executive **Times New Roman** serif font applied across titles, metric figures, table headers, and navigation tabs.
- **Components**:
  - `Header`: System health bar, real-time Python API status ticker, and live timestamp feed.
  - `KPICards`: Metric summary widgets calculating active freight, critical risk count, average delay forecast, and ML inference performance.
  - `ShipmentTable`: High-density filterable data grid with search, risk badges, delay projections, detail drawer, and reroute modal triggers.
  - `RiskChart`: Interactive Corridor Risk Index displaying delay hour distributions across 5 major ocean freight routes.
  - `PythonModelDrawer`: Embedded live code inspector & real-time simulation sandbox allowing operators to adjust ocean wave height, port congestion, and supplier delay history to test Python ML predictions.
  - `ActionModal`: Authorize dispatch reroutes, review cost deltas, and write immutable logs.
  - `AuditTrail`: System-wide audit log tracking Python AI risk escalations and engineer dispatch overrides.

### 2. Backend (Python 3.11 + FastAPI + Pandas)
- **`backend/risk_engine.py`**: Modular Python class (`SentinelRiskEngine`) implementing multi-variable feature scaling over telemetry parameters (wave height, port congestion, supplier reliability index).
- **`backend/app.py`**: Production-ready FastAPI REST service providing `/api/v1/predict` endpoint for asynchronous risk scoring.
- **`backend/requirements.txt`**: Production Python dependencies (`fastapi`, `uvicorn`, `pandas`, `scikit-learn`).

---

## Quick Start & Local Execution

### 1. Launch React Dashboard
```bash
# Navigate to project root
cd C:\Users\sanja\.gemini\antigravity-ide\scratch\sentinel-operations

# Install dependencies
npm install

# Start local Vite development server
npm run dev
```

### 2. Launch Python Risk Engine Backend
```bash
# Navigate to backend directory
cd backend

# Install Python requirements
pip install -r requirements.txt

# Run Python Risk Diagnostic
python risk_engine.py

# Launch FastAPI REST Server
python app.py
# Server will run on http://localhost:8000 (API Docs at http://localhost:8000/docs)
```

---

## Engineering Fundamentals Demonstrated
1. **Full-Stack Architecture**: Clean separation between React presentation components, local reactive state, and Python predictive backend services.
2. **Real-World Problem Solving**: Solves complex logistics supply chain disruptions with actionable cost-benefit reroute interventions.
3. **Data Density & UI Craftsmanship**: Adheres strictly to executive reporting aesthetic standards using Times New Roman serif typography and a clean white background.
4. **AI Anomaly Integration**: Explores AI/ML model execution without hype, surfacing raw feature vectors, inference timing, and transparent code logic.
