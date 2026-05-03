import React from 'react';
import { useApp } from '../../context';
import { Btn } from '../Primitives';
import { scrollToTop } from '../../utils/helpers';

export default function MobileMenu({ open }) {
  const { st, dsp } = useApp();
  if (!open) return null;

  const go = (p) => { 
    dsp({ t: 'GO', p }); 
    scrollToTop(); 
    dsp({ t: 'UI', v: { mobileMenu: false } }); 
  };
  
  const links = [
    ['creators', 'Discover Creators', '👥'], 
    ['campaigns', 'Active Campaigns', '📢'], 
    ['monetize', 'Monetize Content', '💰'], 
    ['blog', 'Creator Academy', '📖'], 
    ['about', 'Our Mission', '🇮🇳']
  ];

  return (
    <>
      <div className="mobile-nav-overlay" onClick={() => dsp({ t: 'UI', v: { mobileMenu: false } })} style={{ animation: 'fadeIn 0.4s ease' }} />
      <div className="mobile-nav-sheet">
        <div style={{ width: 40, height: 4, background: '#EEE', borderRadius: 10, margin: '0 auto 32px' }} />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {links.map(([p, l, i]) => (
            <div key={p} className="mobile-menu-item" onClick={() => go(p)}>
              <span style={{ fontSize: 24, background: '#F3F4F6', width: 48, height: 48, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i}</span>
              <span style={{ flex: 1 }}>{l}</span>
              <span style={{ color: '#CCC', fontSize: 14 }}>→</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, padding: '24px', background: '#111', borderRadius: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
           <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 700, textAlign: 'center' }}>Ready to start your journey?</p>
           <Btn full lg onClick={() => { dsp({ t: 'UI', v: { authModal: true, mobileMenu: false } }); }}>Login to Dashboard</Btn>
           <button onClick={() => go('apply')} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '14px', borderRadius: 20, fontWeight: 800, cursor: 'pointer' }}>Apply as Creator</button>
        </div>
      </div>
    </>
  );
}
