import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context';
import { W } from '../../utils/helpers';
import { Logo } from '../Primitives';
import { Send, Mail, Globe, ShieldCheck } from 'lucide-react';

export default function Footer({ mob }) {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = React.useState('');
  const { dsp } = useApp();
  const go = (p) => { 
    if (p === '/apply') return dsp({ t: 'UI', v: { authModal: true, authView: 'register' } });
    if (p === '/login') return dsp({ t: 'UI', v: { authModal: true, authView: 'login' } });
    navigate(p); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const linkGroups = [
    {
      title: 'Platform',
      links: [
        { label: 'Elite Talent', p: '/creators' },
        { label: 'Active Deals', p: '/campaigns' },
        { label: 'Pricing', p: '/pricing' },
        { label: 'Leaderboard', p: '/leaderboard' },
        { label: 'Creator Academy', p: '/blog' }
      ]
    },
    {
      title: 'Join Us',
      links: [
        { label: 'As Creator', p: '/apply' },
        { label: 'As Brand', p: '/brand-register' },
        { label: 'Login', p: '/login' },
        { label: 'Agencies', p: '/contact' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'Our Story', p: '/about' },
        { label: 'Contact', p: '/contact' },
        { label: 'Guidelines', p: '/blog' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Privacy Policy', p: '/privacy' },
        { label: 'Terms of Service', p: '/terms' },
        { label: 'Security', p: '/about' }
      ]
    }
  ];

  const handleHoverStart = (e) => {
    e.currentTarget.style.transform = 'translateY(-2px)';
  };
  const handleHoverEnd = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
  };

  const handleSocialHoverStart = (e) => {
    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
    e.currentTarget.style.borderColor = '#FF9431';
    e.currentTarget.style.transform = 'translateY(-3px)';
    e.currentTarget.style.color = '#fff';
  };
  const handleSocialHoverEnd = (e) => {
    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
  };

  return (
    <footer style={{
      background: '#050505',
      position: 'relative',
      overflow: 'hidden',
      padding: mob ? '80px 20px 40px' : '120px 20px 60px',
      borderTop: '1px solid rgba(255,255,255,0.05)'
    }}>

      {/* LUXURY BACKGROUND DEPTH */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at 50% 0%, rgba(255,148,49,0.06) 0%, transparent 60%)', zIndex: 0 }} />
      
      {/* MESH GRADIENT GLOWS */}
      <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(16,136,8,0.05) 0%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none' }} />

      {/* THE THEME PULSE LINE */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: 2,
        background: 'linear-gradient(90deg, #138808, #FFFFFF, #FF9933, #138808)',
        backgroundSize: '200% 100%',
        animation: 'navMove 6s linear infinite',
        opacity: 0.6
      }} />

      <div style={{ ...W(1240), position: 'relative', zIndex: 1 }}>

        {/* TOP SECTION: BRAND & NEWSLETTER */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: mob ? '1fr' : '1.2fr 0.8fr', 
          gap: 60, 
          marginBottom: mob ? 80 : 100,
          alignItems: 'start'
        }}>
          <div>
            <div style={{ marginBottom: 40 }}>
              <Logo light />
            </div>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif", 
              fontSize: mob ? 36 : 64, 
              fontWeight: 900, 
              color: '#fff',
              lineHeight: 1.1, 
              letterSpacing: '-0.04em', 
              marginBottom: 28
            }}>
              The New Identity of <br />
              <span style={{ background: 'linear-gradient(90deg, #FF9431, #FFFFFF, #138808)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Bharat's Creators.</span>
            </h2>
            <p style={{ 
              fontSize: mob ? 16 : 18, 
              color: 'rgba(255,255,255,0.4)', 
              fontWeight: 500, 
              lineHeight: 1.8, 
              maxWidth: 520 
            }}>
              Building elite infrastructure for India's 100M+ creators. No gatekeepers, no commissions. 
              Built with ❤️ for the next generation of digital entrepreneurs.
            </p>
          </div>

          {/* NEWSLETTER BOX */}
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.08)', 
            borderRadius: 32, 
            padding: mob ? '32px' : '48px',
            boxShadow: '0 40px 100px rgba(0,0,0,0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, background: 'radial-gradient(circle, rgba(255,148,49,0.1) 0%, transparent 70%)', filter: 'blur(30px)' }} />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF9431', boxShadow: '0 0 12px rgba(255,148,49,0.5)' }} />
              <h4 style={{ fontSize: 11, fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '2.5px' }}>Weekly Bharat Pulse</h4>
            </div>
            
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 28, fontWeight: 600, lineHeight: 1.6 }}>
              Join 5k+ creators getting exclusive brand deals and growth hacks.
            </p>
            
            <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email" placeholder="Enter your email"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                    padding: '16px 20px 16px 48px', borderRadius: 16, color: '#fff', fontSize: 14, outline: 'none',
                    fontWeight: 600, transition: 'all 0.3s'
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#FF9431'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                />
              </div>
              <button 
                style={{
                  width: '100%', padding: '16px', background: 'linear-gradient(135deg, #FF9431, #FF6B00)',
                  color: '#fff', border: 'none', borderRadius: 16, fontWeight: 900,
                  fontSize: 14, cursor: 'pointer', transition: 'all 0.3s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  boxShadow: '0 10px 25px rgba(255,107,0,0.2)'
                }} 
                onMouseOver={handleHoverStart} 
                onMouseOut={handleHoverEnd}
                onFocus={handleHoverStart}
                onBlur={handleHoverEnd}
              >
                Subscribe <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: LINKS GRID */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: mob ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
          gap: 40, 
          marginBottom: 80 
        }}>
          {linkGroups.map(group => (
            <div key={group.title}>
              <h4 style={{ fontSize: 11, fontWeight: 900, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '2.5px', marginBottom: 24 }}>{group.title}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {group.links.map(link => (
                  <button 
                    key={link.label} 
                    onClick={() => go(link.p)} 
                    style={{ 
                      fontSize: 15, color: 'rgba(255,255,255,0.4)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                      display: 'block', width: 'fit-content', border: 'none', background: 'none', padding: 0, textAlign: 'left'
                    }} 
                    onMouseOver={e => e.currentTarget.style.color = '#fff'} 
                    onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                    onFocus={e => e.currentTarget.style.color = '#fff'}
                    onBlur={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* SOCIALS */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 900, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '2.5px', marginBottom: 24 }}>Connect</h4>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[
                { n: 'Twitter', s: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg> },
                { n: 'Instagram', s: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                { n: 'LinkedIn', s: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
                { n: 'YouTube', s: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg> }
              ].map(s => (
                <button 
                  key={s.n} 
                  aria-label={`Follow us on ${s.n}`}
                  style={{
                    width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s',
                    color: 'rgba(255,255,255,0.7)', padding: 0
                  }} 
                  onMouseOver={handleSocialHoverStart} 
                  onMouseOut={handleSocialHoverEnd}
                  onFocus={handleSocialHoverStart}
                  onBlur={handleSocialHoverEnd}
                >
                  {s.s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM SIGNATURE */}
        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.06)', 
          paddingTop: 48, 
          display: 'flex', 
          flexDirection: mob ? 'column' : 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          gap: 32 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>© {currentYear} CreatorBharat. All Rights Reserved.</p>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: mob ? 'none' : 'block' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }} />
              <span style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Nodes: Operational</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Made in Bhilwara 🇮🇳</span>
            </div>
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.08)' }} />
            <div style={{ display: 'flex', gap: 16, opacity: 0.3 }}>
               <ShieldCheck size={16} color="#fff" />
               <Globe size={16} color="#fff" />
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes navMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </footer>
  );
}

Footer.propTypes = {
  mob: PropTypes.bool
};
