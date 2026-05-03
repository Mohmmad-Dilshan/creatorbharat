import React from 'react';
import { useApp } from '../../context';
import { Btn } from '../Primitives';

export default function CompareBar() {
  const { st, dsp } = useApp();
  if (st.compared.length === 0) return null;

  return (
    <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: '#111', borderRadius: 100, zIndex: 6000, padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 24, boxShadow: '0 20px 50px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {st.compared.map(id => (
          <div key={id} style={{ width: 32, height: 32, borderRadius: '50%', background: '#FF9431', border: '2px solid #fff' }} />
        ))}
      </div>
      <span style={{ fontSize: 14, fontWeight: 900, color: '#fff' }}>Compare {st.compared.length} Creators</span>
      <Btn sm onClick={() => dsp({ t: 'GO', p: 'compare' })} style={{ borderRadius: 100, background: '#fff', color: '#111' }}>Compare Now</Btn>
      <button onClick={() => dsp({ t: 'UI', v: { compared: [] } })} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 18 }}>×</button>
    </div>
  );
}
