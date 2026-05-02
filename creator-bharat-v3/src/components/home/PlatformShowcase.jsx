import React from 'react';
import { W } from '../../theme';

export default function PlatformShowcase({ mob }) {
  return (
    <section style={{ padding: mob ? '40px 20px' : '20px 20px 100px 20px', background: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      
      {/* GHOST BACKGROUND TEXT */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: mob ? 100 : 220, fontWeight: 900, color: 'rgba(0,0,0,0.02)', zIndex: 0, letterSpacing: '-0.05em', whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none' }}>
        BHARAT HUB
      </div>

      <div style={{ ...W(), maxWidth: 1000, position: 'relative', zIndex: 1 }}>
        
        {/* PRO HEADING */}
        <div style={{ marginBottom: 48 }}>
           <span style={{ fontSize: 11, fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '4px' }}>Identity & Growth</span>
           <h2 style={{ fontSize: mob ? 32 : 52, fontWeight: 900, color: '#111', marginTop: 12, position: 'relative', display: 'inline-block' }}>
              Our Core Commitment.
              <div style={{ position: 'absolute', bottom: -12, left: '20%', right: '20%', height: 3, background: 'linear-gradient(90deg, #138808, #FF9933)', borderRadius: 10 }} />
           </h2>
        </div>

        {/* REFINED SMALL INFO BOX */}
        <div style={{ 
          position: 'relative', 
          padding: 2, 
          borderRadius: 40, 
          overflow: 'hidden',
          background: 'rgba(0,0,0,0.05)',
          boxShadow: '0 40px 100px -20px rgba(0,0,0,0.08)'
        }}>
          {/* MOVING BORDER (NAVBAR SYNC) */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%', width: '200%', height: '500%',
            background: 'conic-gradient(from 0deg, #138808, #FFFFFF, #FF9933, transparent 50%, #138808, #FFFFFF, #FF9933, transparent)',
            animation: 'spinBorder 5s linear infinite',
            transform: 'translate(-50%, -50%)',
            opacity: 0.5
          }} />

          {/* THE CONTENT (2-6 LINES) */}
          <div style={{ position: 'relative', zIndex: 1, background: '#fff', borderRadius: 38, padding: mob ? '40px 24px' : '64px 80px' }}>
             <div style={{ fontSize: 32, marginBottom: 24 }}>✨</div>
             <h3 style={{ fontSize: mob ? 22 : 32, fontWeight: 900, color: '#111', lineHeight: 1.5, letterSpacing: '-0.02em', maxWidth: 800, margin: '0 auto' }}>
                "Hum Bharat ke har creator ko unki <span style={{ color: '#FF9431' }}>Pehchan</span> dena chahte hain. Hamara mission local talent ko direct <span style={{ color: '#138808' }}>National Recognition</span> aur Growth Hub se jodna hai, bina kisi middlemen ke."
             </h3>
             
             {/* Small Stat Pills */}
             <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 24 }}>
                {[
                   { t: 'Verified Profile', i: '✓' },
                   { t: 'Direct Access', i: '🤝' },
                   { t: 'Bharat First', i: '🇮🇳' }
                ].map((p, i) => (
                   <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(0,0,0,0.02)', borderRadius: 100, border: '1px solid rgba(0,0,0,0.05)' }}>
                      <span style={{ fontSize: 10, fontWeight: 900, color: '#10B981' }}>{p.i}</span>
                      <span style={{ fontSize: 11, fontWeight: 800, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>{p.t}</span>
                   </div>
                ))}
             </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes spinBorder {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
