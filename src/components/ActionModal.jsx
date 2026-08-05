import React from 'react';
import { X, AlertTriangle, Navigation, DollarSign, Clock, ShieldCheck } from 'lucide-react';

export default function ActionModal({ shipment, onClose, onConfirm }) {
  if (!shipment) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', fontFamily: 'var(--font-serif)' }}>
              Sentinel Operations - Dispatch Intervention Order
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Shipment ID: {shipment.id} | Vessel: {shipment.vessel}
            </span>
          </div>
          <button 
            onClick={onClose} 
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ backgroundColor: 'var(--color-critical-bg)', border: '1px solid var(--color-critical-border)', padding: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-critical)', fontWeight: '700', fontSize: '0.9rem' }}>
              <AlertTriangle size={18} /> High Anomaly Risk Flagged ({shipment.riskScore} / 100)
            </div>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-primary)', marginTop: '0.35rem' }}>
              Current Weather Condition: <strong>{shipment.currentWeather}</strong>. Delay forecast: <strong>+{shipment.predictedDelayHours} hours</strong>.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ border: '1px solid var(--border-color)', padding: '1rem', backgroundColor: 'var(--bg-surface)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Cargo Profile & Value
              </span>
              <div style={{ fontSize: '1.1rem', fontWeight: '700', fontFamily: 'var(--font-serif)', marginTop: '0.25rem' }}>
                {shipment.cargoValue}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                {shipment.cargoType}
              </div>
            </div>

            <div style={{ border: '1px solid var(--border-color)', padding: '1rem', backgroundColor: 'var(--bg-surface)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Intervention Cost Delta
              </span>
              <div style={{ fontSize: '1.1rem', fontWeight: '700', fontFamily: 'var(--font-serif)', marginTop: '0.25rem', color: 'var(--text-primary)' }}>
                {shipment.rerouteCostDelta}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: '600', marginTop: '0.2rem' }}>
                Saves ~{shipment.predictedDelayHours}h Delay
              </div>
            </div>
          </div>

          <div style={{ border: '1px solid var(--border-dark)', padding: '1rem', backgroundColor: '#FFFFFF' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', fontFamily: 'var(--font-serif)', display: 'block', marginBottom: '0.35rem' }}>
              AI Recommended Dispatch Directive:
            </span>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontStyle: 'italic' }}>
              "{shipment.recommendedAction}"
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="btn-primary" 
            onClick={() => onConfirm(shipment)}
          >
            <ShieldCheck size={16} /> Authorize Dispatch Reroute
          </button>
        </div>
      </div>
    </div>
  );
}
