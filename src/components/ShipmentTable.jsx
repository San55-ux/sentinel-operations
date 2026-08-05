import React, { useState } from 'react';
import { Search, ArrowRight, Eye, Navigation, AlertCircle } from 'lucide-react';

export default function ShipmentTable({ shipments, onSelectShipment, onTriggerAction }) {
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL');

  const filtered = shipments.filter(s => {
    const matchesSearch = 
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.carrier.toLowerCase().includes(search.toLowerCase()) ||
      s.vessel.toLowerCase().includes(search.toLowerCase()) ||
      s.origin.toLowerCase().includes(search.toLowerCase()) ||
      s.destination.toLowerCase().includes(search.toLowerCase());

    if (riskFilter === 'ALL') return matchesSearch;
    if (riskFilter === 'CRITICAL') return matchesSearch && (s.riskLevel === 'CRITICAL' || s.riskLevel === 'CRITICAL RISK');
    if (riskFilter === 'HIGH') return matchesSearch && s.riskLevel === 'HIGH';
    if (riskFilter === 'LOW_MED') return matchesSearch && (s.riskLevel === 'LOW' || s.riskLevel === 'MEDIUM');
    return matchesSearch;
  });

  const getBadgeClass = (riskLevel) => {
    if (riskLevel === 'CRITICAL' || riskLevel === 'CRITICAL RISK') return 'badge-critical';
    if (riskLevel === 'HIGH') return 'badge-high';
    if (riskLevel === 'MEDIUM') return 'badge-medium';
    return 'badge-low';
  };

  return (
    <div className="section-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">Live Global Freight Risk Monitor</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Real-time telemetry updated via Python pandas anomaly & corridor delay modeling
          </p>
        </div>
        <div style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
          Active Records: {filtered.length} of {shipments.length}
        </div>
      </div>

      <div className="table-toolbar">
        <input 
          type="text"
          className="search-input"
          placeholder="Search Shipment ID, Carrier, Vessel, Port..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="filter-buttons">
          <button 
            className={`btn-filter ${riskFilter === 'ALL' ? 'active' : ''}`}
            onClick={() => setRiskFilter('ALL')}
          >
            All Shipments
          </button>
          <button 
            className={`btn-filter ${riskFilter === 'CRITICAL' ? 'active' : ''}`}
            onClick={() => setRiskFilter('CRITICAL')}
          >
            Critical Risk ({shipments.filter(s => s.riskLevel.includes('CRITICAL')).length})
          </button>
          <button 
            className={`btn-filter ${riskFilter === 'HIGH' ? 'active' : ''}`}
            onClick={() => setRiskFilter('HIGH')}
          >
            High Risk ({shipments.filter(s => s.riskLevel === 'HIGH').length})
          </button>
          <button 
            className={`btn-filter ${riskFilter === 'LOW_MED' ? 'active' : ''}`}
            onClick={() => setRiskFilter('LOW_MED')}
          >
            Low / Medium
          </button>
        </div>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Shipment ID</th>
              <th>Carrier & Vessel</th>
              <th>Route Corridor</th>
              <th>Risk Score</th>
              <th>AI Delay Est.</th>
              <th>Cargo Value</th>
              <th>Recommended Intervention</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: '600' }}>
                  {s.id}
                </td>
                <td>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{s.carrier}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.vessel}</div>
                </td>
                <td>
                  <div style={{ fontSize: '0.85rem' }}>{s.origin} →</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '500' }}>{s.destination}</div>
                </td>
                <td>
                  <span className={`badge ${getBadgeClass(s.riskLevel)}`}>
                    {s.riskScore} / 100 - {s.riskLevel}
                  </span>
                </td>
                <td>
                  <span style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontWeight: '700',
                    color: s.predictedDelayHours > 20 ? 'var(--color-critical)' : 'var(--text-primary)'
                  }}>
                    +{s.predictedDelayHours} hrs
                  </span>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>
                  {s.cargoValue}
                </td>
                <td style={{ maxWidth: '280px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {s.recommendedAction}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button 
                      className="btn-secondary" 
                      style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                      onClick={() => onSelectShipment(s)}
                    >
                      <Eye size={13} /> View
                    </button>
                    {s.riskScore > 65 && (
                      <button 
                        className="btn-primary" 
                        style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem', backgroundColor: 'var(--color-critical)', borderColor: 'var(--color-critical)' }}
                        onClick={() => onTriggerAction(s)}
                      >
                        <Navigation size={13} /> Reroute
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
