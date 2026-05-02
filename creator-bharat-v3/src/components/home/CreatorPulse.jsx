import React from 'react';
import { W, T } from '../../theme';

export default function CreatorPulse({ mob }) {
  return (
    <section style={{ padding: mob ? '40px 20px' : '60px 20px', background: '#fff', position: 'relative', zIndex: 5, marginTop: mob ? -120 : -160 }}>
      <div style={W()}>
        {/* Live Marketplace Pulse */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          {[
            { t: 'Live Deals', v: '₹4.2 Cr+', s: 'Paid to Creators', i: '💸', c: '#10B981' },
            { t: 'Active Brands', v: '1,200+', s: 'Hiring right now', i: '🤝', c: '#3B82F6' },
            { t: 'Avg. Payout', v: '₹24,500', s: 'Per campaign', i: '📈', c: '#FF9431' },
            { t: 'Verified', v: '48K+', s: 'Pro Portfolios', i: '🛡️', c: '#8B5CF6' }
          ].map((item, i) => (
            <div key={i} className="au" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)', padding: mob ? '16px 20px' : '24px 32px', borderRadius: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: 20, minWidth: mob ? '100%' : 260, flex: 1 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: item.c + '10', color: item.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{item.i}</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 10, fontWeight: 900, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.t}</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#111', margin: '2px 0' }}>{item.v}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: item.c }}>{item.s}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Spotlight */}
        <div style={{ marginTop: 64, textAlign: 'center' }}>
          <p style={{ fontSize: 12, fontWeight: 900, color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: 24 }}>Spotlight Creators</p>
          <div style={{ display: 'flex', gap: mob ? 16 : 32, overflow: 'hidden', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', padding: 3, background: 'linear-gradient(45deg, #FF9431, #DC2626)', animation: 'pulse 2s infinite' }}>
                   <img src={`https://i.pravatar.cc/150?u=${i + 20}`} style={{ width: '100%', height: '100%', borderRadius: '50%', border: '3px solid #fff', objectFit: 'cover' }} />
                </div>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#111' }}>@{['karan', 'ishita', 'rajat', 'sneha', 'amit', 'neha'][i-1]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
