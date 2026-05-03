import React from 'react';
import { useApp } from '../../context';

export default function ToastBar() {
  const { st, dsp } = useApp();
  if (st.toasts.length === 0) return null;

  return (
    <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 10000, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {st.toasts.map(t => (
        <div key={t.id} style={{
          background: '#111',
          color: '#fff',
          borderRadius: 20,
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          border: `1px solid ${t.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`
        }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: t.type === 'success' ? '#10B981' : '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900 }}>
            {t.type === 'success' ? '✓' : '!'}
          </div>
          <span style={{ fontSize: 15, fontWeight: 700 }}>{t.msg}</span>
          <button onClick={() => dsp({ t: 'RM_TOAST', id: t.id })} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 20 }}>×</button>
        </div>
      ))}
    </div>
  );
}
