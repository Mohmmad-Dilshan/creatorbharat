import React from 'react';
import { T } from '../../theme';
import { W } from '../../utils/helpers';

export default function Cta({ mob, go }) {
  return (
    <section style={{ padding: mob ? '40px 20px' : '60px 20px 120px 20px', background: '#fff' }}>
      <div style={{ ...W(1100), position: 'relative' }}>
        
        {/* THE ELITE CTA CARD */}
        <div style={{ 
          background: '#111', 
          borderRadius: 48, 
          padding: mob ? '60px 24px' : '100px 60px', 
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          border: '1.5px solid #111',
          boxShadow: '0 40px 100px rgba(0,0,0,0.1)'
        }}>
           {/* Abstract Glow Background */}
           <div style={{ position: 'absolute', top: '-20%', left: '-20%', width: '140%', height: '140%', background: 'radial-gradient(circle at center, rgba(255,148,49,0.1) 0%, transparent 70%)', zIndex: 0 }} />

           <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ 
                display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 20px', 
                background: 'rgba(255,255,255,0.1)', borderRadius: 100, marginBottom: 32 
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', animation: 'pulse-dot 1.5s infinite' }} />
                <span style={{ fontSize: 11, fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '3px' }}>The Final Step</span>
              </div>

              <h2 style={{ 
                fontFamily: "'Fraunces', serif", 
                fontSize: mob ? 36 : 72, 
                fontWeight: 900, 
                color: '#fff', 
                lineHeight: 1, 
                letterSpacing: '-0.04em',
                marginBottom: 32
              }}>
                Ready to Claim your <br />
                <span style={{ background: 'linear-gradient(90deg, #FF9431, #138808)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>National Identity?</span>
              </h2>

              <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 56, maxWidth: 650, margin: '0 auto 56px', fontWeight: 600 }}>
                 Join 10,000+ elite creators who are building the new digital Bharat. No middlemen, no hidden costs. Just pure growth.
              </p>

              {/* ACTION BUTTONS */}
              <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: 20, justifyContent: 'center' }}>
                 <button 
                   onClick={() => go('apply')}
                   style={{ 
                     padding: '20px 48px', fontSize: 16, fontWeight: 900, borderRadius: 100, 
                     background: '#fff', color: '#111', border: 'none', cursor: 'pointer',
                     boxShadow: '0 10px 30px rgba(255,255,255,0.1)', transition: 'all 0.3s'
                   }}
                   onMouseOver={e => e.target.style.transform = 'translateY(-4px)'}
                   onMouseOut={e => e.target.style.transform = 'translateY(0)'}
                 >
                   Launch My Portfolio
                 </button>
                 <button 
                   onClick={() => go('creators')}
                   style={{ 
                     padding: '20px 48px', fontSize: 16, fontWeight: 900, borderRadius: 100, 
                     background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.2)', 
                     cursor: 'pointer', transition: 'all 0.3s'
                   }}
                   onMouseOver={e => e.target.style.transform = 'translateY(-4px)'}
                   onMouseOut={e => e.target.style.transform = 'translateY(0)'}
                 >
                   Explore Discovery
                 </button>
              </div>

              {/* CREATOR AVATAR STACK */}
              <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                 <div style={{ display: 'flex', marginLeft: 15 }}>
                    {[1,2,3,4,5].map(i => (
                      <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid #111', marginLeft: -12, overflow: 'hidden', background: '#333' }}>
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} style={{ width: '100%', height: '100%' }} alt="" />
                      </div>
                    ))}
                    <div style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid #111', marginLeft: -12, background: '#FF9431', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: '#fff' }}>+10k</div>
                 </div>
                 <span style={{ fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px' }}>Trusted by creators nationwide</span>
              </div>
           </div>
        </div>

      </div>

      <style>{`
        @keyframes pulse-dot {
          0% { transform: scale(1); opacity: 1; }
          70% { transform: scale(2.5); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
