import React from 'react';
import { History, ShieldAlert, CheckCircle2, Sliders } from 'lucide-react';

export default function AuditTrail({ auditLogs }) {
  return (
    <div className="section-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">System Audit Log & Immutable Event Stream</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Complete audit trail of Python AI anomaly detections and operator dispatch overrides
          </p>
        </div>
      </div>

      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {auditLogs.map(log => (
            <div 
              key={log.id}
              style={{ 
                display: 'flex', 
                gap: '1.25rem', 
                padding: '1rem', 
                border: '1px solid var(--border-color)', 
                backgroundColor: 'var(--bg-surface)' 
              }}
            >
              <div style={{ paddingTop: '0.2rem' }}>
                {log.type === 'AI_RISK_ESCALATION' && <ShieldAlert size={20} style={{ color: 'var(--color-critical)' }} />}
                {log.type === 'ACTION_RECOMMENDED' && <Sliders size={20} style={{ color: 'var(--color-warning)' }} />}
                {log.type === 'DISPATCH_AUTHORIZED' && <CheckCircle2 size={20} style={{ color: 'var(--color-success)' }} />}
                {log.type === 'OPERATOR_OVERRIDE' && <History size={20} style={{ color: 'var(--color-info)' }} />}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    {log.type.replace(/_/g, ' ')}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {log.timestamp}
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  {log.details}
                </div>

                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  Actor: {log.actor} | Shipment: {log.shipmentId}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
