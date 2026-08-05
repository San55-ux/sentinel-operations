"""
Sentinel Operations - Python Risk & Telemetry Engine
===================================================
Production-grade anomaly detection pipeline evaluating maritime shipment risks,
weather vector severities, port congestion levels, and route diversion heuristics.
"""

from dataclasses import dataclass
from typing import List, Dict, Any
import math

@dataclass
class TelemetryInput:
    shipment_id: str
    wave_height_m: float
    port_congestion_index: float  # 0.0 to 10.0
    supplier_delay_days: float
    cargo_sensitivity_multiplier: float = 1.0

@dataclass
class RiskEvaluationResult:
    shipment_id: str
    risk_score: int
    risk_level: str
    predicted_delay_hours: float
    recommended_action: str
    reroute_required: bool

class SentinelRiskEngine:
    def __init__(self, base_threshold: float = 20.0):
        self.base_threshold = base_threshold

    def evaluate(self, telemetry: TelemetryInput) -> RiskEvaluationResult:
        """
        Calculates normalized risk score based on multi-variable feature vectors.
        """
        # Feature weight scaling
        wave_risk = telemetry.wave_height_m * 7.5
        congestion_risk = telemetry.port_congestion_index * 5.2
        supplier_risk = telemetry.supplier_delay_days * 4.0
        
        raw_score = (self.base_threshold + wave_risk + congestion_risk + supplier_risk) * telemetry.cargo_sensitivity_multiplier
        risk_score = min(100, max(0, int(round(raw_score))))
        
        # Risk level categorization
        if risk_score >= 75:
            risk_level = "CRITICAL"
            action = f"REROUTE MANDATORY: High ocean wave state ({telemetry.wave_height_m}m) & port queue ({telemetry.port_congestion_index}/10)."
            reroute = True
        elif risk_score >= 50:
            risk_level = "HIGH"
            action = "ALERT: Monitor port berth allocation. Potential 18h+ anchorage queue."
            reroute = False
        elif risk_score >= 35:
            risk_level = "MEDIUM"
            action = "MODERATE: Vessel telemetry stable. Minor weather swell detected."
            reroute = False
        else:
            risk_level = "LOW"
            action = "NOMINAL: Transit proceeding on schedule."
            reroute = False

        predicted_delay = round((risk_score / 100.0) * 48.0, 1)

        return RiskEvaluationResult(
            shipment_id=telemetry.shipment_id,
            risk_score=risk_score,
            risk_level=risk_level,
            predicted_delay_hours=predicted_delay,
            recommended_action=action,
            reroute_required=reroute
        )

# Direct execution test script
if __name__ == "__main__":
    engine = SentinelRiskEngine()
    test_sample = TelemetryInput(
        shipment_id="SHP-9842",
        wave_height_m=5.8,
        port_congestion_index=8.8,
        supplier_delay_days=3.0,
        cargo_sensitivity_multiplier=1.1
    )
    result = engine.evaluate(test_sample)
    print(f"== Sentinel Python Risk Engine Diagnostic ==")
    print(f"Shipment: {result.shipment_id}")
    print(f"Risk Score: {result.risk_score} / 100 ({result.risk_level})")
    print(f"Predicted Delay: +{result.predictedDelay_hours if hasattr(result, 'predictedDelay_hours') else result.predicted_delay_hours} Hours")
    print(f"Action: {result.recommended_action}")
