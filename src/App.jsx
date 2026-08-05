import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import KPICards from './components/KPICards';
import ShipmentTable from './components/ShipmentTable';
import RiskChart from './components/RiskChart';
import PythonModelDrawer from './components/PythonModelDrawer';
import AuditTrail from './components/AuditTrail';
import ActionModal from './components/ActionModal';
import { INITIAL_SHIPMENTS, INITIAL_AUDIT_LOGS } from './data/mockData';
import { LayoutDashboard, TrendingUp, Cpu, History, CheckCircle, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('MONITOR'); // MONITOR, CORRIDORS, PYTHON_MODEL, AUDIT
  const [shipments, setShipments] = useState(INITIAL_SHIPMENTS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [actionShipment, setActionShipment] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleConfirmReroute = (shipment) => {
    // Update shipment status
    const updated = shipments.map(s => {
      if (s.id === shipment.id) {
        return {
          ...s,
          status: 'Reroute Authorized',
          riskLevel: 'MEDIUM',
          riskScore: 45,
          predictedDelayHours: 6.0,
          recommendedAction: 'Divert authorized. Alternative transit route active.'
        };
      }
      return s;
    });

    setShipments(updated);

    // Add audit log
    const newLog = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      shipmentId: shipment.id,
      type: 'DISPATCH_AUTHORIZED',
      actor: 'Associate Engineer (sanja@sentinel)',
      details: `Authorized reroute directive: ${shipment.recommendedAction}. Cost delta: ${shipment.rerouteCostDelta}.`
    };

    setAuditLogs([newLog, ...auditLogs]);
    setActionShipment(null);

    // Show toast
    setToastMessage(`Dispatch Reroute Order authorized for ${shipment.id}`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="app-container">
      <Header pythonStatus="ACTIVE" currentTime={currentTime} />

      {/* Navigation Bar */}
      <nav className="nav-tabs-bar">
        <button 
          className={`nav-tab ${activeTab === 'MONITOR' ? 'active' : ''}`}
          onClick={() => setActiveTab('MONITOR')}
        >
          <LayoutDashboard size={16} /> Live Risk Monitor
        </button>

        <button 
          className={`nav-tab ${activeTab === 'CORRIDORS' ? 'active' : ''}`}
          onClick={() => setActiveTab('CORRIDORS')}
        >
          <TrendingUp size={16} /> Corridor Delay Analytics
        </button>

        <button 
          className={`nav-tab ${activeTab === 'PYTHON_MODEL' ? 'active' : ''}`}
          onClick={() => setActiveTab('PYTHON_MODEL')}
        >
          <Cpu size={16} /> Python AI Model & Engine
        </button>

        <button 
          className={`nav-tab ${activeTab === 'AUDIT' ? 'active' : ''}`}
          onClick={() => setActiveTab('AUDIT')}
        >
          <History size={16} /> Audit Log ({auditLogs.length})
        </button>
      </nav>

      {/* Notification Toast */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-success)',
          boxShadow: 'var(--shadow-md)',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          zIndex: 90,
          borderRadius: '2px'
        }}>
          <CheckCircle size={20} style={{ color: 'var(--color-success)' }} />
          <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>
            {toastMessage}
          </span>
        </div>
      )}

      {/* Main Dashboard Workspace */}
      <main className="dashboard-main">
        <KPICards shipments={shipments} />

        {activeTab === 'MONITOR' && (
          <ShipmentTable 
            shipments={shipments} 
            onSelectShipment={(s) => setSelectedShipment(s)}
            onTriggerAction={(s) => setActionShipment(s)}
          />
        )}

        {activeTab === 'CORRIDORS' && (
          <RiskChart />
        )}

        {activeTab === 'PYTHON_MODEL' && (
          <PythonModelDrawer />
        )}

        {activeTab === 'AUDIT' && (
          <AuditTrail auditLogs={auditLogs} />
        )}
      </main>

      {/* Shipment Inspection Modal */}
      {selectedShipment && (
        <div className="modal-overlay" onClick={() => setSelectedShipment(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', fontFamily: 'var(--font-serif)' }}>
                  Shipment Telemetry Drawer: {selectedShipment.id}
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {selectedShipment.carrier} - {selectedShipment.vessel}
                </span>
              </div>
              <button 
                onClick={() => setSelectedShipment(null)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                <div style={{ border: '1px solid var(--border-color)', padding: '0.75rem', backgroundColor: 'var(--bg-surface)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Risk Score</span>
                  <div style={{ fontSize: '1.2rem', fontWeight: '700', fontFamily: 'var(--font-serif)' }}>
                    {selectedShipment.riskScore} / 100
                  </div>
                </div>
                <div style={{ border: '1px solid var(--border-color)', padding: '0.75rem', backgroundColor: 'var(--bg-surface)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Predicted Delay</span>
                  <div style={{ fontSize: '1.2rem', fontWeight: '700', fontFamily: 'var(--font-serif)' }}>
                    +{selectedShipment.predictedDelayHours} hrs
                  </div>
                </div>
                <div style={{ border: '1px solid var(--border-color)', padding: '0.75rem', backgroundColor: 'var(--bg-surface)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Cargo Value</span>
                  <div style={{ fontSize: '1.2rem', fontWeight: '700', fontFamily: 'var(--font-serif)' }}>
                    {selectedShipment.cargoValue}
                  </div>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', fontFamily: 'var(--font-serif)', display: 'block', marginBottom: '0.35rem' }}>
                  Transit History & Audit Logs:
                </span>
                <div style={{ border: '1px solid var(--border-color)', padding: '0.75rem', backgroundColor: 'var(--bg-surface)' }}>
                  {selectedShipment.history.map((h, i) => (
                    <div key={i} style={{ fontSize: '0.8rem', padding: '0.35rem 0', borderBottom: i < selectedShipment.history.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>[{h.timestamp}]</span> {h.note}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedShipment(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reroute Action Modal */}
      {actionShipment && (
        <ActionModal 
          shipment={actionShipment} 
          onClose={() => setActionShipment(null)}
          onConfirm={handleConfirmReroute}
        />
      )}
    </div>
  );
}
