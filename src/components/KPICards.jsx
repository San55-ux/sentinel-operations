import React from 'react';
import { Package, AlertTriangle, Clock, Cpu } from 'lucide-react';

export default function KPICards({ shipments }) {
  const totalShipments = shipments.length;
  const criticalCount = shipments.filter(s => s.riskLevel === 'CRITICAL' || s.riskLevel === 'CRITICAL RISK').length;
  const avgDelay = (shipments.reduce((acc, s) => acc + s.predictedDelayHours, 0) / totalShipments).toFixed(1);
  const totalCargoValue = "$54.5M";

  return (
    <div className="kpi-grid">
      <div className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-title">Active Freight In Transit</span>
          <Package className="kpi-icon" size={20} />
        </div>
        <div className="kpi-value">{totalShipments} Containers</div>
        <div className="kpi-footer">
          <span className="kpi-change-positive">↑ 100% Monitored</span>
          <span>across 5 global ocean corridors</span>
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-title">Critical Anomaly Risk</span>
          <AlertTriangle className="kpi-icon" size={20} style={{ color: 'var(--color-critical)' }} />
        </div>
        <div className="kpi-value" style={{ color: 'var(--color-critical)' }}>{criticalCount} Vessels</div>
        <div className="kpi-footer">
          <span className="kpi-change-negative">Requires Action</span>
          <span>Typhoon & Port Queue triggers</span>
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-title">Avg AI Delay Forecast</span>
          <Clock className="kpi-icon" size={20} />
        </div>
        <div className="kpi-value">+{avgDelay} Hours</div>
        <div className="kpi-footer">
          <span className="kpi-change-negative">+3.4h vs baseline</span>
          <span>Weather & Suez bottlenecks</span>
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-title">Python ML Engine Model</span>
          <Cpu className="kpi-icon" size={20} />
        </div>
        <div className="kpi-value">98.4% Acc</div>
        <div className="kpi-footer">
          <span className="kpi-change-positive">Sub-10ms Inference</span>
          <span>Pandas + Scikit-Learn Pipeline</span>
        </div>
      </div>
    </div>
  );
}
