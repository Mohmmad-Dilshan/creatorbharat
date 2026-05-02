import React from 'react';
import { W, T } from '../../theme';
import { Btn } from '../Primitives';

export default function Cta({ mob, go }) {
  return (
    <section style={{ padding: mob ? '100px 20px' : '160px 20px', background: 'linear-gradient(to bottom, #050505, #111)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(255,148,49,0.15) 0%, transparent 70%)', zIndex: 0 }} />
      
      <div style={{ ...W(900), position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: mob ? 48 : 80, fontWeight: 900, color: '#fff', marginBottom: 32, lineHeight: 1 }}>
          Ab Rukna Nahi Hai. <br />
          <span className="gradient-text">India Ka Next Big Creator Bano.</span>
        </h2>
        <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.6)', marginBottom: 56, maxWidth: 700, margin: '0 auto 56px', lineHeight: 1.6 }}>
          50,000+ creators ke sath judiye aur apne passion ko professional banaiye. Start your journey for free.
        </p>
        
        <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Btn lg style={{ padding: '24px 56px', fontSize: 18, background: T.gd, color: '#fff', borderRadius: 100, fontWeight: 900, border: 'none', boxShadow: '0 20px 40px rgba(255,148,49,0.3)' }} onClick={() => go('apply')}>
            Launch My Portfolio Now
          </Btn>
          <Btn lg variant="ghost" style={{ padding: '24px 56px', fontSize: 18, color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 100 }} onClick={() => go('creators')}>
            Explore Other Creators
          </Btn>
        </div>
      </div>
    </section>
  );
}
