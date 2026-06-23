import React from 'react';
import PropTypes from 'prop-types';
import { W } from '../../utils/helpers';

export default function Cta({ mob, go, creatorCount }) {
  const handleHoverStart = (e) => {
    e.currentTarget.style.transform = 'translateY(-4px)';
  };
  const handleHoverEnd = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
  };

  return (
    <section style={{ padding: mob ? '20px' : '60px 20px 120px 20px', background: '#fff' }}>
      <div style={{ ...W(1100), position: 'relative' }}>
        
        {/* THE ELITE CTA CARD WITH SPINNING BORDER */}
        <div style={{ 
          position: 'relative',
          padding: '1.5px',
          borderRadius: 48,
          overflow: 'hidden',
          background: 'rgba(0,0,0,0.05)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.05)'
        }}>
           {/* THE SPINNING LINE (NAVBAR SYNC) */}
           <div style={{
             position: 'absolute', top: '50%', left: '50%', width: '150%', height: '400%',
             background: 'conic-gradient(from 0deg, #138808, #FFFFFF, #FF9933, transparent 50%, #138808, #FFFFFF, #FF9933, transparent)',
             animation: 'spinBorder 6s linear infinite',
             transform: 'translate(-50%, -50%)',
             zIndex: 0
           }} />

            <div style={{ 
               position: 'relative', 
               zIndex: 1, 
               background: '#fff', 
               borderRadius: 47, 
               padding: mob ? '48px 20px' : '80px 60px', 
               textAlign: mob ? 'center' : 'left',
               display: 'grid',
               gridTemplateColumns: mob ? '1fr' : '1.15fr 0.85fr',
               gap: mob ? 40 : 48,
               alignItems: 'center',
               overflow: 'hidden'
            }}>
              {/* Abstract Glow Background */}
              <div style={{ position: 'absolute', top: '-20%', left: '-20%', width: '140%', height: '140%', background: 'radial-gradient(circle at center, rgba(255,148,49,0.04) 0%, transparent 70%)', zIndex: 0 }} />

              {/* Left Column: Copy, bullets, and action buttons */}
              <div style={{ 
                position: 'relative', 
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: mob ? 'center' : 'flex-start'
              }}>
                <div style={{ 
                  display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 20px', 
                  background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', 
                  borderRadius: 100, marginBottom: 28 
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', animation: 'pulse-dot 1.5s infinite' }} />
                  <span style={{ fontSize: 11, fontWeight: 900, color: '#10B981', textTransform: 'uppercase', letterSpacing: '3px' }}>The Final Step</span>
                </div>

                <h2 style={{ 
                  fontFamily: "'Outfit', sans-serif", 
                  fontSize: mob ? 'clamp(24px, 7.5vw, 32px)' : 56, 
                  fontWeight: 950, 
                  color: '#0f172a', 
                  lineHeight: 1.15, 
                  letterSpacing: '-0.03em',
                  marginBottom: 24,
                  textAlign: mob ? 'center' : 'left'
                }}>
                  Ready to Claim your <br />
                  <span style={{ background: 'linear-gradient(90deg, #FF9431, #138808)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>National Identity?</span>
                </h2>

                <p style={{ 
                  fontSize: mob ? 15 : 18, 
                  color: '#475569', 
                  marginBottom: 28, 
                  maxWidth: 580, 
                  fontWeight: 600,
                  lineHeight: 1.6,
                  textAlign: mob ? 'center' : 'left'
                }}>
                   Join over {creatorCount ? `${creatorCount.toLocaleString()}+` : '2,400+'} elite creators building their independent brand. Get verified, secure your escrow, and work directly with global companies—zero agency cuts.
                </p>

                {/* Small Bullet List for value density */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 12, 
                  marginBottom: 36,
                  textAlign: 'left'
                }}>
                  {[
                    "Lifetime free verified creator profile & media kit",
                    "0% platform commission on all campaigns",
                    "Full dispute mediation through Creator Union membership"
                  ].map((text, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF9431', flexShrink: 0, marginTop: 5 }} />
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#334155', lineHeight: 1.4 }}>{text}</span>
                    </div>
                  ))}
                </div>

                {/* ACTION BUTTONS */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: mob ? 'column' : 'row', 
                  gap: 16, 
                  width: mob ? '100%' : 'auto',
                  justifyContent: mob ? 'center' : 'flex-start'
                }}>
                   <button 
                     onClick={() => go('apply')}
                     onMouseOver={handleHoverStart}
                     onMouseOut={handleHoverEnd}
                     onFocus={handleHoverStart}
                     onBlur={handleHoverEnd}
                     style={{ 
                       padding: mob ? '16px 32px' : '20px 48px', 
                       fontSize: 16, 
                       fontWeight: 950, 
                       borderRadius: 100, 
                       background: 'linear-gradient(90deg, #FF9431, #EA580C)', 
                       color: '#fff', 
                       border: 'none', 
                       cursor: 'pointer',
                       boxShadow: '0 12px 24px rgba(255,148,49,0.2)', 
                       transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                       fontFamily: "'Outfit', sans-serif"
                     }}
                   >
                     Launch My Portfolio ⚡
                   </button>
                   <button 
                     onClick={() => go('creators')}
                     onMouseOver={handleHoverStart}
                     onMouseOut={handleHoverEnd}
                     onFocus={handleHoverStart}
                     onBlur={handleHoverEnd}
                     style={{ 
                       padding: mob ? '16px 32px' : '20px 48px', 
                       fontSize: 16, 
                       fontWeight: 950, 
                       borderRadius: 100, 
                       background: '#0f172a', 
                       color: '#fff', 
                       border: 'none', 
                       cursor: 'pointer', 
                       transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                       fontFamily: "'Outfit', sans-serif"
                     }}
                   >
                     Explore Creators
                   </button>
                </div>
              </div>

              {/* Right Column: Interactive 3D Creator ID Card Showcase */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
                minHeight: mob ? 220 : 340,
                width: '100%',
                padding: mob ? '10px 0' : 0
              }}>
                {/* Ambient Background Glow behind Card */}
                <div style={{
                  position: 'absolute',
                  width: 250,
                  height: 250,
                  background: 'radial-gradient(circle, rgba(255, 148, 49, 0.15) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                  pointerEvents: 'none',
                  zIndex: 0
                }} />
                
                {/* The Card & Badges Wrapper */}
                <div style={{
                  position: 'relative',
                  width: mob ? '260px' : '350px',
                  height: mob ? '160px' : '210px',
                  zIndex: 1
                }}>
                  {/* The Glassmorphic Creator ID Card */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 20,
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.85) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1.5px solid rgba(255, 255, 255, 0.4)',
                    boxShadow: '0 30px 60px rgba(15, 23, 42, 0.1), inset 0 1px 0 rgba(255,255,255,0.6)',
                    padding: mob ? 14 : 24,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    transform: mob ? 'rotate(0deg)' : 'rotate(-4deg) translateY(0px)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    zIndex: 2,
                    cursor: 'pointer',
                    overflow: 'hidden'
                  }}
                  className="interactive-creator-id-card"
                  >
                    {/* Saffron-White-Green Tricolor Strip */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: 'linear-gradient(90deg, #FF9431 0%, #F8FAFC 50%, #138808 100%)'
                    }} />

                    {/* Card Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: mob ? 9 : 10, fontWeight: 900, color: '#FF9431', letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}>Bharat Creator ID</span>
                      <span style={{ fontSize: mob ? 8 : 9, fontWeight: 900, background: 'rgba(16, 185, 129, 0.08)', color: '#10B981', padding: mob ? '2px 6px' : '3px 8px', borderRadius: 100, border: '1px solid rgba(16, 185, 129, 0.15)', fontFamily: "'Outfit', sans-serif" }}>Verified</span>
                    </div>

                    {/* Avatar + Info */}
                    <div style={{ display: 'flex', gap: mob ? 10 : 14, marginTop: mob ? 4 : 8, alignItems: 'center' }}>
                      <div style={{ width: mob ? 44 : 52, height: mob ? 44 : 52, borderRadius: 12, overflow: 'hidden', border: '1.5px solid #FF9431', background: '#F8FAFC', flexShrink: 0 }}>
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Amit" style={{ width: '100%', height: '100%' }} alt="Amit Sharma's Verified Creator Avatar" loading="lazy" />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <div style={{ fontSize: mob ? 13 : 15, fontWeight: 950, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 4, fontFamily: "'Outfit', sans-serif" }}>
                          Amit Sharma
                          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: mob ? 12 : 14, height: mob ? 12 : 14, borderRadius: '50%', background: '#FF9431' }}>
                            <span style={{ fontSize: mob ? 7 : 8, color: '#fff', fontWeight: 900, marginTop: -1 }}>✓</span>
                          </span>
                        </div>
                        <div style={{ fontSize: mob ? 9 : 10, fontWeight: 700, color: '#64748B' }}>@amit_vlogs • Tech & Travel</div>
                        <div style={{ fontSize: mob ? 9 : 10, fontWeight: 800, color: '#10B981', marginTop: 1, fontFamily: "'Outfit', sans-serif" }}>CB Score: 92 (Top 1%)</div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: mob ? 4 : 8, borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: mob ? 8 : 10 }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: mob ? 7 : 8, fontWeight: 900, color: '#94A3B8', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}>Location</span>
                        <span style={{ fontSize: mob ? 9 : 10, fontWeight: 800, color: '#334155', fontFamily: "'Outfit', sans-serif" }}>Jaipur, RJ</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                        <svg width={mob ? "20" : "24"} height={mob ? "20" : "24"} viewBox="0 0 32 32" style={{ opacity: 0.85 }}>
                          <path d="M0 0h10v10H0zm2 2v6h6V2zm10 0h10v10H12zm2 2v6h6V2zm0 10h10v10H12zm2 2v6h6v-6zm-14 0h10v10H0zm2 2v6h6v-6z" fill="#0f172a" />
                        </svg>
                        <span style={{ fontSize: mob ? 6 : 7, fontWeight: 800, color: '#64748B', fontFamily: "'Outfit', sans-serif" }}>ID: CB-98745</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Badge 1: Saffron Tier */}
                  <div style={{
                    position: 'absolute',
                    top: mob ? '-12px' : '-8px',
                    right: mob ? '-8px' : '-16px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    border: '1.5px solid #FF9431',
                    borderRadius: 12,
                    padding: '4px 10px',
                    boxShadow: '0 8px 20px rgba(255,148,49,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    zIndex: 3,
                    transform: 'rotate(6deg)'
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#FF9431' }} />
                    <span style={{ fontSize: 8, fontWeight: 900, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Saffron Tier</span>
                  </div>

                  {/* Floating Badge 2: 0% Commission */}
                  <div style={{
                    position: 'absolute',
                    bottom: mob ? '-12px' : '-8px',
                    left: mob ? '-8px' : '-16px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    border: '1.5px solid #10B981',
                    borderRadius: 12,
                    padding: '4px 10px',
                    boxShadow: '0 8px 20px rgba(16,185,129,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    zIndex: 3,
                    transform: 'rotate(-4deg)'
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981' }} />
                    <span style={{ fontSize: 8, fontWeight: 900, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>0% Commission</span>
                  </div>
                </div>
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
        @keyframes spinBorder {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .interactive-creator-id-card:hover {
          transform: rotate(-1deg) translateY(-6px) scale(1.02) !important;
          box-shadow: 0 40px 80px rgba(15, 23, 42, 0.15), inset 0 1px 0 rgba(255,255,255,0.8) !important;
        }
      `}</style>
    </section>
  );
}

Cta.propTypes = {
  mob: PropTypes.bool,
  go: PropTypes.func.isRequired,
  creatorCount: PropTypes.number
};
