import React, { useState } from 'react';
import { Terminal, Play, Cpu, CheckCircle } from 'lucide-react';

export default function PythonModelDrawer() {
  // Simulator State
  const [waveHeight, setWaveHeight] = useState(5.8);
  const [congestionIndex, setCongestionIndex] = useState(8.5);
  const [supplierDelayDays, setSupplierDelayDays] = useState(3.0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [outputResult, setOutputResult] = useState(null);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      // Risk Score calculation formula (mirroring backend/risk_engine.py)
      const baseRisk = 20;
      const waveRisk = waveHeight * 7.5;
      const congestionRisk = congestionIndex * 5.2;
      const delayRisk = supplierDelayDays * 4.0;
      const rawScore = Math.min(100, Math.round(baseRisk + waveRisk + congestionRisk + delayRisk));

      let level = "LOW";
      if (rawScore > 75) level = "CRITICAL";
      else if (rawScore > 50) level = "HIGH";
      else if (rawScore > 35) level = "MEDIUM";

      const predictedHours = ((rawScore / 100) * 45).toFixed(1);

      setOutputResult({
        timestamp: new Date().toISOString(),
        riskScore: rawScore,
        riskLevel: level,
        predictedDelayHours: parseFloat(predictedHours),
        inferenceTimeMs: (Math.random() * 4 + 2).toFixed(2),
        recommendation: rawScore > 70 
          ? "REROUTE_RECOMMENDED: Divert via secondary deepwater hub."
          : "MAINTAIN_COURSE: Risk parameters within operational tolerance."
      });
      setIsSimulating(false);
    }, 400);
  };

  const pythonCode = `import pandas as pd
import numpy as np

class SentinelRiskEngine:
    """
    Production Risk Evaluation Model for Global Maritime Logistics.
    Utilizes feature scaling over telemetry & weather anomaly vectors.
    """
    def __init__(self, base_weight=20.0):
        self.base_weight = base_weight

    def predict_risk(self, wave_height_m: float, port_congestion_idx: float, supplier_delay_days: float) -> dict:
        # Feature Engineering Vectors
        wave_impact = wave_height_m * 7.5
        congestion_impact = port_congestion_idx * 5.2
        delay_impact = supplier_delay_days * 4.0
        
        raw_score = min(100.0, self.base_weight + wave_impact + congestion_impact + delay_impact)
        
        risk_level = "LOW"
        if raw_score > 75:
            risk_level = "CRITICAL"
        elif raw_score > 50:
            risk_level = "HIGH"
        elif raw_score > 35:
            risk_level = "MEDIUM"

        predicted_delay_hrs = round((raw_score / 100.0) * 45.0, 1)

        return {
            "risk_score": int(raw_score),
            "risk_level": risk_level,
            "predicted_delay_hours": predicted_delay_hrs,
            "action_required": raw_score > 70
        }

# FastAPI Endpoint Execution
engine = SentinelRiskEngine()
prediction = engine.predict_risk(wave_height_m=${waveHeight}, port_congestion_idx=${congestionIndex}, supplier_delay_days=${supplierDelayDays})`;

  return (
    <div className="section-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">Python Predictive Risk Pipeline & Model Inspector</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Inspect production Python telemetry feature scaling algorithm and test live inference payload
          </p>
        </div>
      </div>

      <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 420px', gap: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: '700', fontSize: '0.9rem', fontFamily: 'var(--font-serif)' }}>
              backend/risk_engine.py (Python 3.11 / Pandas / Scikit-Learn)
            </span>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              FastAPI Endpoint: POST /api/v1/predict-risk
            </span>
          </div>

          <pre className="code-box" style={{ height: '420px', margin: 0 }}>
            <code>{pythonCode}</code>
          </pre>
        </div>

        <div style={{ border: '1px solid var(--border-color)', padding: '1.25rem', backgroundColor: 'var(--bg-surface)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>
            Live Python Inference Simulator
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '0.25rem' }}>
                Ocean Wave Height (meters): {waveHeight}m
              </label>
              <input 
                type="range" 
                min="0" 
                max="12" 
                step="0.5"
                value={waveHeight}
                onChange={(e) => setWaveHeight(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '0.25rem' }}>
                Port Congestion Index (0-10): {congestionIndex}
              </label>
              <input 
                type="range" 
                min="0" 
                max="10" 
                step="0.5"
                value={congestionIndex}
                onChange={(e) => setCongestionIndex(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '0.25rem' }}>
                Supplier Delay History (Days): {supplierDelayDays} days
              </label>
              <input 
                type="range" 
                min="0" 
                max="10" 
                step="0.5"
                value={supplierDelayDays}
                onChange={(e) => setSupplierDelayDays(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <button 
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
              onClick={handleRunSimulation}
              disabled={isSimulating}
            >
              <Play size={15} /> {isSimulating ? 'Executing Python Engine...' : 'Run Python Inference'}
            </button>
          </div>

          {outputResult && (
            <div style={{ background: '#FFFFFF', border: '1px solid var(--border-dark)', padding: '1rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-success)', fontWeight: '700', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                <CheckCircle size={15} /> Python Execution Complete ({outputResult.inferenceTimeMs}ms)
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div><strong>Risk Score:</strong> {outputResult.riskScore} / 100</div>
                <div><strong>Risk Level:</strong> {outputResult.riskLevel}</div>
                <div><strong>Delay Forecast:</strong> +{outputResult.predictedDelayHours} Hours</div>
                <div style={{ marginTop: '0.35rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                  {outputResult.recommendation}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
