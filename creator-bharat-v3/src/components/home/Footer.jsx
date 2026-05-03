import React, { useState } from 'react';
import { T } from '../../theme';
import { W } from '../../utils/helpers';
import { Logo } from '../Primitives'; // USING THE PRO LOGO COMPONENT

export default function Footer({ mob }) {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const linkGroups = [
    {
      title: 'Platform',
      links: ['Features', 'Elite Talent', 'Discovery', 'Brand Search', 'Analytics']
    },
    {
      title: 'Company',
      links: ['Our Story', 'Blog', 'Podcasts', 'Contact', 'Careers']
    },
    {
      title: 'Support',
      links: ['Help Center', 'Guidelines', 'Privacy', 'Terms', 'Security']
    }
  ];

  return (
    <footer style={{
      background: '#050505',
      position: 'relative',
      overflow: 'hidden',
      padding: mob ? '80px 20px 40px' : '120px 20px 80px',
      borderTop: '1px solid rgba(255,255,255,0.05)'
    }}>

      {/* LUXURY BACKGROUND DEPTH */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at 50% 0%, rgba(255,148,49,0.08) 0%, transparent 60%)', zIndex: 0 }} />

      {/* MASSIVE GHOST BRANDING */}
      <div style={{
        position: 'absolute', top: '25%', left: '5%', fontSize: 350, fontWeight: 900,
        color: 'rgba(255,255,255,0.015)', zIndex: 0, fontFamily: "'Fraunces', serif", fontStyle: 'italic',
        pointerEvents: 'none', whiteSpace: 'nowrap'
      }}>
        CREATOR BHARAT
      </div>

      {/* THE THEME PULSE LINE */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: 3,
        background: 'linear-gradient(90deg, #138808, #FFFFFF, #FF9933, #138808)',
        backgroundSize: '200% 100%',
        animation: 'navMove 6s linear infinite',
        opacity: 0.8
      }} />

      <div style={{ ...W(), position: 'relative', zIndex: 1 }}>

        {/* TOP SECTION: THE BRAND FOCUS */}
        <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 60, marginBottom: 120 }}>
          <div style={{ maxWidth: 600 }}>
            <div style={{ marginBottom: 40 }}>
              {/* USING THE ELITE LOGO COMPONENT FROM PRIMITIVES */}
              <Logo light />
            </div>
            <h1 style={{
              fontFamily: "'Fraunces', serif", fontSize: mob ? 42 : 72, fontWeight: 900, color: '#fff',
              lineHeight: 1, letterSpacing: '-0.05em', marginBottom: 32
            }}>
              Empowering the soul of <br />
              <span style={{ background: 'linear-gradient(90deg, #FF9431, #138808)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Digital Bharat.</span>
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', fontWeight: 600, lineHeight: 1.7, maxWidth: 480 }}>
              Building the elite infrastructure that connects India's authentic talent with global opportunities. No agencies. No limits.
            </p>
          </div>

          {/* NEWSLETTER: BRANDED GLASS BOX */}
          <div style={{
            width: mob ? '100%' : 420, background: 'rgba(255,255,255,0.03)',
            border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: 32, padding: 40,
            boxShadow: '0 40px 100px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF9431' }} />
              <h4 style={{ fontSize: 12, fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '3px' }}>The Bharat Pulse</h4>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 32, fontWeight: 600, lineHeight: 1.6 }}>Get the latest insights, creator spotlights, and direct brand deals in your inbox.</p>
            <div style={{ position: 'relative' }}>
              <input
                type="email" placeholder="email@example.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%', background: '#000', border: '1px solid rgba(255,255,255,0.15)',
                  padding: '18px 24px', borderRadius: 16, color: '#fff', fontSize: 14, outline: 'none',
                  fontWeight: 600, transition: 'all 0.3s'
                }}
                onFocus={e => e.target.style.borderColor = '#FF9431'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
              />
              <button style={{
                marginTop: 16, width: '100%', padding: '18px', background: 'linear-gradient(90deg, #FF9431, #138808)',
                color: '#fff', border: 'none', borderRadius: 16, fontWeight: 900,
                fontSize: 14, cursor: 'pointer', transition: 'all 0.4s',
                boxShadow: '0 10px 30px rgba(255,148,49,0.2)'
              }} onMouseOver={e => e.target.style.transform = 'translateY(-3px)'} onMouseOut={e => e.target.style.transform = 'translateY(0)'}>
                Join the Revolution
              </button>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: LINK GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 40, marginBottom: 100 }}>
          {linkGroups.map(group => (
            <div key={group.title}>
              <h4 style={{ fontSize: 11, fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: 28, opacity: 0.3 }}>{group.title}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {group.links.map(link => (
                  <span key={link} style={{ fontSize: 15, color: 'rgba(255,255,255,0.3)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={e => e.target.style.color = '#fff'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.3)'}>{link}</span>
                ))}
              </div>
            </div>
          ))}

          {/* SOCIAL COLUMN */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: 28, opacity: 0.3 }}>Connect</h4>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[
                { i: '📸', n: 'Insta' }, { i: '🐦', n: 'X' },
                { i: '💼', n: 'LinkedIn' }, { i: '📺', n: 'YouTube' }
              ].map(s => (
                <div key={s.n} style={{
                  width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s'
                }} onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = '#FF9431'; }} onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}>
                  <span style={{ fontSize: 18 }}>{s.i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: THE SIGNATURE */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 60, display: 'flex', flexDirection: mob ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.2)', fontWeight: 700 }}>© {currentYear} CreatorBharat. All Rights Reserved.</p>
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.05)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981', animation: 'pulse-dot 1.5s infinite' }} />
              <span style={{ fontSize: 11, fontWeight: 900, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Nodes: Live</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 900, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '1px' }}>Made in Jaipur 🇮🇳</span>
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.05)' }} />
            <div style={{ display: 'flex', gap: 16 }}>
              <img src="https://img.icons8.com/color/48/visa.png" style={{ height: 16, opacity: 0.2, filter: 'grayscale(1)' }} alt="" />
              <img src="https://img.icons8.com/color/48/mastercard.png" style={{ height: 16, opacity: 0.2, filter: 'grayscale(1)' }} alt="" />
              <img src="https://img.icons8.com/color/48/upi.png" style={{ height: 16, opacity: 0.2, filter: 'grayscale(1)' }} alt="" />
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes navMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes pulse-dot {
          0% { transform: scale(1); opacity: 1; }
          70% { transform: scale(2.5); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
      `}</style>
    </footer>
  );
}
