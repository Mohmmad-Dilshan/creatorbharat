import React from 'react';
import { W } from '../../theme';

export default function FeaturedCreators({ mob, creators, go, loading }) {
  // Premium & Reliable Portrait Images
  const mockCreators = [
    { n: 'Arjun Meena', i: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' },
    { n: 'Sonal Verma', i: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
    { n: 'Rohan Gupta', i: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
    { n: 'Priya Das', i: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80' },
    { n: 'Vikram Singh', i: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80' },
    { n: 'Anjali Nair', i: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80' },
  ];

  const displayList = Array.isArray(creators) && creators.length > 0 ? creators : mockCreators;

  return (
    <section style={{ padding: mob ? '40px 0' : '60px 0', background: '#fff', position: 'relative', zIndex: 10 }}>
      <div style={{ ...W(), maxWidth: 950 }}>
        
        {/* REFINED ELITE SPOTLIGHT CAPSULE */}
        <div style={{ 
          position: 'relative', 
          padding: mob ? '16px 20px' : '20px 48px', 
          background: 'rgba(255,255,255,0.95)', 
          backdropFilter: 'blur(30px)',
          borderRadius: 100, 
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: mob ? 20 : 40,
          overflow: 'hidden'
        }}>
           
           {/* SUBTLE GLOW BEHIND */}
           <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '140%', height: '200%', background: 'conic-gradient(from 0deg, transparent, rgba(255,148,49,0.08), transparent 50%)', animation: 'spinBorder 10s linear infinite', zIndex: 0 }} />

           {/* HEADING */}
           <div style={{ position: 'relative', zIndex: 2, whiteSpace: 'nowrap' }}>
              <h2 style={{ fontSize: mob ? 13 : 16, fontWeight: 900, color: '#111', textTransform: 'uppercase', letterSpacing: '3px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: '#FF9431' }}>Elite</span> 
                <span>Talent</span>
              </h2>
           </div>

           {/* SMOOTH MARQUEE */}
           <div style={{ flex: 1, overflow: 'hidden', position: 'relative', zIndex: 2 }}>
              <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', background: 'linear-gradient(90deg, #fff 0%, transparent 15%, transparent 85%, #fff 100%)' }} />
              
              <div style={{ display: 'flex', width: 'max-content', gap: 32, animation: 'marquee-fast 35s linear infinite' }}>
                {[...displayList, ...displayList, ...displayList].map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                     <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', border: '2px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', background: '#F3F4F6' }}>
                        <img 
                          src={c?.i || `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          alt=""
                          onError={(e) => { e.target.src = 'https://api.dicebear.com/7.x/initials/svg?seed=CB' }}
                        />
                     </div>
                     <span style={{ fontSize: 14, fontWeight: 800, color: '#333', whiteSpace: 'nowrap' }}>{c?.n || 'Creator'}</span>
                  </div>
                ))}
              </div>
           </div>

           {!mob && <div style={{ position: 'relative', zIndex: 2 }}>
              <button onClick={() => go('creators')} style={{ fontSize: 12, fontWeight: 900, color: '#111', background: '#F8FAFC', padding: '8px 20px', borderRadius: 100, border: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'all 0.3s' }}>Explore All</button>
           </div>}
        </div>

      </div>

      <style>{`
        @keyframes marquee-fast {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes spinBorder {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
