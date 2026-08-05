import React from 'react';
import { ShieldCheck, Activity, Download } from 'lucide-react';

export default function Header({ pythonStatus, currentTime }) {
  return (
    <header className="top-header">
      <div className="header-left">
        <span className="brand-badge">SENTINEL</span>
        <div>
          <h1 className="brand-title">Sentinel Operations</h1>
          <p className="brand-subtitle">Enterprise Supply Chain Audit & Predictive Risk Engine</p>
        </div>
      </div>

      <div className="header-right">
        <div className="status-pill">
          <span className="status-dot"></span>
          <span>PYTHON AI ENGINE ACTIVE (FastAPI v2.8)</span>
        </div>

        <a 
          href="/sentinel_demo_video.webp" 
          download="Sentinel_Operations_Demo_Video.webp"
          className="btn-primary"
          style={{ textDecoration: 'none', padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
        >
          <Download size={14} /> Download Demo Video
        </a>

        <div style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
          <span>SYS_TIME: {currentTime}</span>
        </div>
      </div>
    </header>
  );
}
