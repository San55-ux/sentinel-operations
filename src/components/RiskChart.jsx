import React, { useState } from 'react';
import { MOCK_CORRIDORS } from '../data/mockData';
import { TrendingUp, MapPin } from 'lucide-react';

export default function RiskChart() {
  const [selectedCorridor, setSelectedCorridor] = useState(MOCK_CORRIDORS[0]);

  const maxDelay = 30;

  return (
    <div className="section-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">Corridor Risk Index & Transit Bottlenecks</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Predicted transit hour deltas calculated from real-time maritime telemetry feeds
          </p>
        </div>
      </div>

      <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem' }}>
        <div>
          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: '700', fontFamily: 'var(--font-serif)' }}>
              Corridor Delay Distribution (Hours Added vs Normal Schedule)
            </span>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              Source: Python Maritime Risk Model v2.8
            </span>
          </div>

          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {MOCK_CORRIDORS.map(c => {
                const percentage = (c.avgDelayHours / maxDelay) * 100;
                const isSelected = selectedCorridor.name === c.name;

                return (
                  <div 
                    key={c.name} 
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedCorridor(c)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                      <span style={{ fontWeight: isSelected ? '700' : '500', color: 'var(--text-primary)' }}>
                        {c.name} ({c.totalVessels} Active Vessels)
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: c.riskIndex > 60 ? 'var(--color-critical)' : 'var(--text-primary)' }}>
                        +{c.avgDelayHours} hrs | Risk: {c.riskIndex}/100
                      </span>
                    </div>

                    <div style={{ width: '100%', height: '14px', backgroundColor: '#E5E7EB', borderRadius: '1px', overflow: 'hidden', display: 'flex' }}>
                      <div 
                        style={{ 
                          width: `${percentage}%`, 
                          backgroundColor: c.riskIndex > 70 ? 'var(--color-critical)' : c.riskIndex > 50 ? 'var(--color-warning)' : 'var(--text-primary)',
                          transition: 'width 0.4s ease'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ border: '1px solid var(--border-color)', padding: '1.25rem', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <MapPin size={18} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', fontFamily: 'var(--font-serif)' }}>
              {selectedCorridor.name}
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Active Maritime Vessels:</span>
              <div style={{ fontSize: '1.25rem', fontWeight: '700', fontFamily: 'var(--font-serif)' }}>
                {selectedCorridor.totalVessels} Cargo Vessels
              </div>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)' }}>Corridor Delay Delta:</span>
              <div style={{ fontSize: '1.25rem', fontWeight: '700', fontFamily: 'var(--font-serif)', color: selectedCorridor.avgDelayHours > 15 ? 'var(--color-critical)' : 'var(--text-primary)' }}>
                +{selectedCorridor.avgDelayHours} Hours Average
              </div>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)' }}>Risk Index Score:</span>
              <div style={{ fontSize: '1.25rem', fontWeight: '700', fontFamily: 'var(--font-serif)' }}>
                {selectedCorridor.riskIndex} / 100
              </div>
            </div>

            <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              <strong>Python ML Diagnosis:</strong> Weather anomaly models predict localized swell heights exceeding 5.2m along this transit track over the next 48h.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
