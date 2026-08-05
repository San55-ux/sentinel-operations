from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from risk_engine import SentinelRiskEngine, TelemetryInput

app = FastAPI(
    title="Sentinel Operations API",
    description="RESTful Telemetry & Predictive Supply Chain Risk API",
    version="2.8.0"
)

risk_engine = SentinelRiskEngine()

class TelemetryPayload(BaseModel):
    shipment_id: str
    wave_height_m: float
    port_congestion_index: float
    supplier_delay_days: float
    cargo_sensitivity_multiplier: Optional[float] = 1.0

@app.get("/")
def health_check():
    return {
        "status": "ONLINE",
        "system": "Sentinel Operations Risk Engine",
        "version": "2.8.0-python3.11"
    }

@app.post("/api/v1/predict")
def predict_risk(payload: TelemetryPayload):
    input_data = TelemetryInput(
        shipment_id=payload.shipment_id,
        wave_height_m=payload.wave_height_m,
        port_congestion_index=payload.port_congestion_index,
        supplier_delay_days=payload.supplier_delay_days,
        cargo_sensitivity_multiplier=payload.cargo_sensitivity_multiplier or 1.0
    )
    result = risk_engine.evaluate(input_data)
    return {
        "shipment_id": result.shipment_id,
        "risk_score": result.risk_score,
        "risk_level": result.risk_level,
        "predicted_delay_hours": result.predicted_delay_hours,
        "recommended_action": result.recommended_action,
        "reroute_required": result.reroute_required
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
