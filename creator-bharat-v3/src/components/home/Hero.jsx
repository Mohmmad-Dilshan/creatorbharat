import React, { useState, useEffect } from 'react';
import { T } from '../../theme';
import { W, ALL_STATES, fmt, LS } from '../../utils/helpers';
import { apiCall } from '../../utils/api';
import { Btn } from '../Primitives';
import { User, BookOpen, Mic, MapPin, Wallet, Rocket } from 'lucide-react';

export function Typewriter({ words, interval = 1000 }) {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState('');
  const [del, setDel] = useState(false);
  const mob = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    const word = words[idx % words.length];
    // SUPER FAST SPEED FOR MOBILE
    const speed = mob ? (del ? 10 : 20) : (del ? 15 : 35);

    const timeout = setTimeout(() => {
      if (!del && sub === word) {
        setTimeout(() => setDel(true), mob ? 500 : 800); // FASTER PAUSE ON MOBILE
      } else if (del && sub === '') {
        setDel(false);
        setIdx(i => i + 1);
      } else {
        setSub(del ? word.substring(0, sub.length - 1) : word.substring(0, sub.length + 1));
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [sub, del, idx, words, mob]);

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ position: 'relative', zIndex: 2, background: 'linear-gradient(90deg, #FF9431, #DC2626)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{sub}</span>
      <span style={{ width: 3, height: '80%', background: '#FF9431', position: 'absolute', right: -6, top: '10%', animation: 'blink 0.6s infinite' }} />
      <svg style={{ position: 'absolute', bottom: -12, left: 0, width: '100%', height: 16, zIndex: 1, pointerEvents: 'none' }} viewBox="0 0 100 20" preserveAspectRatio="none">
        <path d="M2 15 Q 50 2 98 15" stroke="rgba(255, 148, 49, 0.4)" strokeWidth="8" strokeLinecap="round" fill="none" />
      </svg>
    </span>
  );
}

const TirangaGlow = ({ mob }) => (
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: mob ? 600 : 900,
    zIndex: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
    maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)'
  }}>
    {/* Vibrant but soft Mesh Blobs */}
    <div style={{
      position: 'absolute',
      top: '-15%',
      left: '-5%',
      width: '70%',
      height: '70%',
      background: 'radial-gradient(circle, rgba(255,153,51,0.22) 0%, transparent 75%)',
      filter: 'blur(80px)',
      animation: 'float-slow 20s infinite alternate'
    }} />
    <div style={{
      position: 'absolute',
      bottom: '5%',
      right: '-5%',
      width: '70%',
      height: '70%',
      background: 'radial-gradient(circle, rgba(19,136,8,0.18) 0%, transparent 75%)',
      filter: 'blur(80px)',
      animation: 'float-slow 25s infinite alternate-reverse'
    }} />

    {/* The Chakra - Clearer and more 'Premium' */}
    <div style={{
      position: 'absolute',
      top: '38%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      opacity: 0.1,
      zIndex: 0
    }}>
      <svg width={mob ? 300 : 600} height={mob ? 300 : 600} viewBox="0 0 24 24" style={{ animation: 'slowRotate 180s linear infinite', filter: 'drop-shadow(0 0 15px rgba(0,0,128,0.1))' }}>
        <circle cx="12" cy="12" r="9.5" fill="none" stroke="#000080" strokeWidth="0.2" />
        <circle cx="12" cy="12" r="0.8" fill="#000080" />
        {[...Array(24)].map((_, i) => (
          <line
            key={i}
            x1="12"
            y1="12"
            x2={12 + 9.5 * Math.cos((i * 15) * Math.PI / 180)}
            y2={12 + 9.5 * Math.sin((i * 15) * Math.PI / 180)}
            stroke="#000080"
            strokeWidth="0.1"
          />
        ))}
      </svg>
    </div>

    <style>{`
      @keyframes float-slow {
        0% { transform: translate(0, 0) scale(1); }
        100% { transform: translate(60px, 40px) scale(1.1); }
      }
      @keyframes slowRotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default function Hero({ mob, st, dsp, go }) {
  const [sugs, setSugs] = useState([]);
  const [showSug, setShowSug] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [showStateSug, setShowStateSug] = useState(false);

  const trending = ['Fashion', 'Tech', 'Travel', 'Lifestyle', 'Gaming', 'Food'];

  useEffect(() => {
    if (!st.cf.q && !st.cf.state) {
      setSugs([]);
      setShowSug(false);
      setActiveIdx(-1);
      return;
    }

    const query = st.cf.q || '';
    if (query.length < 1 && !st.cf.state) {
      setSugs([]);
      setShowSug(false);
      setActiveIdx(-1);
      return;
    }

    const localList = LS.get('cb_creators', []);
    const filteredLocal = localList.filter(c => {
      const q = query.toLowerCase();
      const matchesQuery = !q ||
        (c.name || '').toLowerCase().includes(q) ||
        (c.niche || '').toLowerCase().includes(q) ||
        (c.city || '').toLowerCase().includes(q) ||
        (c.state || '').toLowerCase().includes(q);
      const matchesState = !st.cf.state || c.state === st.cf.state;
      return matchesQuery && matchesState;
    });

    if (filteredLocal.length > 0) {
      setSugs(filteredLocal.slice(0, 6));
      setShowSug(true);
    }

    const timer = setTimeout(() => {
      setIsSearching(true);
      const url = `/creators?q=${encodeURIComponent(query)}&state=${encodeURIComponent(st.cf.state || '')}&limit=10`;
      apiCall(url).then(d => {
        const apiList = d.creators || (Array.isArray(d) ? d : []);
        const merged = [...apiList];
        filteredLocal.forEach(lc => { if (!merged.find(ac => ac.id === lc.id)) merged.push(lc); });
        setSugs(merged.slice(0, 6));
        setShowSug(true);
        setIsSearching(false);
      }).catch(() => setIsSearching(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [st.cf.q, st.cf.state]);

  const handleKeyDown = (e) => {
    if (showSug) {
      const isTrending = !st.cf.q;
      const maxIdx = isTrending ? trending.length - 1 : sugs.length;
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(prev => (prev < maxIdx ? prev + 1 : prev)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(prev => (prev > 0 ? prev - 1 : -1)); }
      else if (e.key === 'Enter') {
        if (isTrending) { if (activeIdx >= 0) dsp({ t: 'GO', p: 'creators', sel: { q: trending[activeIdx] } }); }
        else {
          if (activeIdx >= 0 && activeIdx < sugs.length) go('creator-profile', { creator: sugs[activeIdx] });
          else if (activeIdx === sugs.length || activeIdx === -1) go('creators');
          setShowSug(false);
        }
      } else if (e.key === 'Escape') setShowSug(false);
    }
  };

  return (
    <section style={{ background: '#fff', minHeight: mob ? 'auto' : '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: mob ? 24 : 80, paddingBottom: 40, position: 'relative', overflow: 'visible', textAlign: 'center' }}>
      <TirangaGlow mob={mob} />


      <div style={{ ...W(), position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>

        {/* Elite Creator Badge */}
        <div className="au" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: mob ? '8px 16px' : '12px 32px', borderRadius: 100, background: '#fff', border: '1px solid rgba(0,0,0,0.08)', marginBottom: 40, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', position: 'relative', maxWidth: '90vw' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ background: '#FF9431', color: '#fff', padding: '4px 10px', borderRadius: 100, fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>New</div>
            <span style={{ fontSize: mob ? 11 : 13, fontWeight: 800, color: '#111', letterSpacing: '0.2px' }}>India's First Unified Creator Support & Identity System</span>
            <div style={{ width: 1, height: 16, background: 'rgba(0,0,0,0.1)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', animation: 'pulse-green 1.5s infinite' }} />
              <span style={{ fontSize: 10, fontWeight: 900, color: '#10B981', textTransform: 'uppercase' }}>Live Now</span>
            </div>
          </div>
        </div>

        <h1 className="au d1" style={{ fontSize: mob ? 'clamp(28px,9vw,36px)' : 'clamp(76px,9vw,104px)', fontWeight: 900, color: '#111', lineHeight: mob ? 1.15 : 1.02, marginBottom: mob ? 20 : 32, letterSpacing: '-0.05em', maxWidth: '100%', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          Your Digital <Typewriter words={['Identity', 'Portfolio', 'Empire', 'Legacy']} /> <br />
          Built for <span style={{
            background: 'linear-gradient(90deg, #FF9431, #128807)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            paddingRight: mob ? 5 : 15,
            display: 'inline-block'
          }}>Bharat.</span>
        </h1>

        <p className="au d2" style={{ fontSize: mob ? 15 : 22, color: 'rgba(0,0,0,0.6)', lineHeight: 1.6, marginBottom: mob ? 32 : 48, fontWeight: 500, maxWidth: 720 }}>
          The all-in-one platform where Tier 2 & Tier 3 creators get the support, identity, and growth they deserve. Your journey from local to national starts here.
        </p>

        <div className="au d3" style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: mob ? 12 : 16, marginBottom: 48, justifyContent: 'center', width: mob ? '100%' : 'auto', alignItems: 'center' }}>
          <Btn lg full={false} onClick={() => go('apply')} className="hero-primary-btn" style={{ padding: mob ? '16px 32px' : '22px 48px', fontSize: mob ? 15 : 18, background: T.gd, color: '#fff', borderRadius: 100, fontWeight: 900, border: 'none', boxShadow: '0 12px 32px rgba(255,148,49,0.35)', justifyContent: 'center', position: 'relative', overflow: 'hidden', width: mob ? 'auto' : 'auto' }}>
            <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>🚀 Claim Your Link Free</span>
            <div style={{ position: 'absolute', top: 0, left: '-100%', width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', animation: 'shimmer 3s infinite', transform: 'skewX(-20deg)' }} />
          </Btn>
          <Btn lg variant="ghost" full={false} onClick={() => dsp({ t: 'UI', v: { demoModal: true } })} className="hero-secondary-btn" style={{ padding: mob ? '15px 32px' : '20px 40px', fontSize: mob ? 14 : 17, background: 'rgba(0,0,0,0.03)', color: '#111', borderRadius: 100, fontWeight: 700, border: '1.5px solid rgba(0,0,0,0.08)', backdropFilter: 'blur(10px)', justifyContent: 'center', position: 'relative', width: mob ? 'auto' : 'auto' }}>
            <span className="live-dot" style={{ position: 'absolute', top: 12, left: 12, width: 8, height: 8, background: '#EF4444', borderRadius: '50%', animation: 'pulse-red 1.5s infinite' }} />
            👁️ View Live Demo
          </Btn>
        </div>

        {/* SEARCH BAR WITH EXACT NAVBAR BORDER */}
        <div className="au d3" style={{
          width: '100%',
          maxWidth: 1000,
          padding: 2,
          borderRadius: mob ? 24 : 102,
          position: 'relative',
          overflow: 'hidden',
          background: 'rgba(0,0,0,0.05)',
          marginBottom: mob ? 40 : 80,
          zIndex: 100,
          boxShadow: mob ? '0 20px 40px rgba(0,0,0,0.06)' : '0 40px 120px -20px rgba(0,0,0,0.12)',
          boxSizing: 'border-box'
        }}>
          {/* THE MOVING LINE ANIMATION (EXACT NAVBAR MATCH) - HIDDEN ON MOBILE FOR CLEAN LOOK */}
          {!mob && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '200%',
              height: '500%',
              background: 'conic-gradient(from 0deg, #138808 0%, #FFFFFF 20%, #FF9933 40%, #FF9933 60%, #FFFFFF 80%, #138808 100%)',
              animation: 'spinBorder 5s linear infinite',
              transform: 'translate(-50%, -50%)',
              zIndex: 0
            }} />
          )}

          {/* INNER SEARCH BAR CONTENT */}
          <div style={{
            width: '100%',
            background: 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(24px)',
            borderRadius: mob ? 32 : 100,
            padding: mob ? 6 : 8,
            display: 'flex',
            flexDirection: mob ? 'column' : 'row',
            alignItems: mob ? 'stretch' : 'center',
            gap: mob ? 4 : 0,
            position: 'relative',
            zIndex: 1,
            minHeight: mob ? 'auto' : 84
          }}>
            <div style={{ flex: 1.2, position: 'relative', padding: mob ? '12px 16px' : '0 40px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', borderRight: mob ? 'none' : '1px solid rgba(0,0,0,0.05)', borderBottom: mob ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
              <label style={{ fontSize: 9, fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 4, opacity: 0.8 }}>Who are you looking for?</label>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 12 }}>
                <input value={st.cf.q} onChange={e => dsp({ t: 'CF', v: { q: e.target.value } })} placeholder="Name, niche or city..." style={{ width: '100%', border: 'none', background: 'none', fontSize: mob ? 16 : 18, outline: 'none', fontWeight: 700, color: '#111' }} />
              </div>
            </div>
            <div style={{ flex: 0.8, padding: mob ? '10px 16px' : '0 40px', textAlign: 'left', width: '100%' }}>
              <label style={{ fontSize: 9, fontWeight: 900, color: '#10B981', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 2, opacity: 0.8 }}>Location</label>
              <div style={{ fontSize: mob ? 15 : 17, fontWeight: 700, color: '#111' }}>{st.cf.state || 'All over India'}</div>
            </div>
            <div style={{ padding: mob ? 8 : 4, width: mob ? '100%' : 'auto' }}>
              <Btn lg full={mob} onClick={() => go('creators')} className="hero-find-btn" style={{ borderRadius: mob ? 18 : 100, padding: mob ? '14px' : '18px 48px', background: '#111', color: '#fff', border: 'none', fontWeight: 900, fontSize: mob ? 14 : 16, transition: 'all 0.3s' }}>Find Creators ⚡</Btn>
            </div>
          </div>
        </div>
        
        {/* SECTION HEADING - ELITE SAAS */}
        <div 
          style={{ textAlign: 'center', marginBottom: mob ? 40 : 60, marginTop: mob ? 20 : 60 }}
        >
           <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 20px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 100, marginBottom: 24 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3B82F6', boxShadow: '0 0 10px rgba(59, 130, 246, 0.6)' }} />
              <span style={{ fontSize: 12, fontWeight: 900, color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '3px' }}>Support Ecosystem</span>
           </div>
           
           <h2 style={{ 
             fontFamily: "'Outfit', sans-serif", 
             fontSize: mob ? 36 : 56, 
             fontWeight: 900, 
             color: '#0f172a', 
             lineHeight: 1.1, 
             letterSpacing: '-0.03em',
             marginBottom: 20
           }}>
             Empowering Bharat's <br /> <span style={{ background: 'linear-gradient(135deg, #FF9431 0%, #10B981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', paddingRight: '10px' }}>Digital Success.</span>
           </h2>
        </div>

        {/* CREATOR SUPPORT SYSTEM GRID: HIGH FIDELITY */}
        <div style={{
          width: '100%', maxWidth: 1200,
          display: 'grid',
          gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(3, 1fr)',
          gap: mob ? 12 : 32,
          padding: mob ? '0 16px' : 0,
          boxSizing: 'border-box'
        }}>
          {[
            { t: 'Identity', h: 'Pro Portfolio', d: 'Verified identity jo brands ko instantly impress karegi.', i: User, c: '#FF9431', bg: 'rgba(255,148,49,0.08)' },
            { t: 'Growth', h: 'Insights & Analytics', d: 'Deep data analytics se apne growth ko measure karein.', i: BookOpen, c: '#10B981', bg: 'rgba(16,185,129,0.08)' },
            { t: 'Spotlight', h: 'National Exposure', d: 'Tier 2/3 cities se seedha national brands tak pahunch.', i: Mic, c: '#3B82F6', bg: 'rgba(59,130,246,0.08)' },
            { t: 'Reach', h: 'Hyperlocal Campaigns', d: 'Targeted brand deals exactly aapke area ke liye.', i: MapPin, c: '#8B5CF6', bg: 'rgba(139,92,246,0.08)' },
            { t: 'Freedom', h: '0% Platform Fee', d: 'Aapki mehnat, aapka paisa. Hum middlemen nahi hain.', i: Wallet, c: '#F59E0B', bg: 'rgba(245,158,11,0.08)' },
            { t: 'Scale', h: 'Free Forever', d: 'Basic features will always be free for verified creators.', i: Rocket, c: '#EF4444', bg: 'rgba(239,68,68,0.08)' }
          ].map((p, i) => (
            <div 
              key={i} 
              className="elite-support-card"
              style={{ 
                position: 'relative', 
                borderRadius: mob ? 16 : 24, 
                padding: mob ? '20px 16px' : 32, 
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 10px 40px -10px rgba(0,0,0,0.04)',
                display: 'flex', 
                flexDirection: 'column', 
                gap: mob ? 16 : 24,
                transition: 'all 0.3s',
                overflow: 'hidden'
              }}
            >
              {/* Subtle Animated Hover Background */}
              <div className="card-hover-bg" style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, transparent, ${p.bg}, transparent)`, opacity: 0, transition: 'opacity 0.4s' }} />
              
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', zIndex: 1, flexDirection: mob ? 'column' : 'row', gap: mob ? 12 : 0 }}>
                 <div style={{ width: mob ? 44 : 64, height: mob ? 44 : 64, borderRadius: mob ? 12 : 20, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.c, border: `1px solid ${p.c}30`, boxShadow: `0 8px 24px ${p.c}20` }}>
                   <p.i size={mob ? 20 : 28} strokeWidth={2.5} />
                 </div>
                 <div style={{ padding: mob ? '4px 8px' : '6px 14px', borderRadius: 100, background: '#f8fafc', fontSize: mob ? 9 : 11, fontWeight: 800, color: '#64748b', border: '1px solid #e2e8f0' }}>
                   {p.t}
                 </div>
              </div>
              
              <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: mob ? 16 : 22, fontWeight: 900, color: '#0f172a', marginBottom: mob ? 6 : 12, fontFamily: "'Outfit', sans-serif", lineHeight: 1.2 }}>{p.h}</h3>
                <p style={{ fontSize: mob ? 12 : 15, color: '#475569', lineHeight: 1.5, fontWeight: 500, flex: 1 }}>{p.d}</p>
              </div>

              {/* Bottom Accent Line */}
              <div className="card-accent-line" style={{ position: 'absolute', bottom: 0, left: 0, width: '0%', height: 4, background: p.c, transition: 'width 0.4s ease-out' }} />
            </div>
          ))}
        </div>

        <style>{`
          @keyframes spinBorder {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
          .hero-primary-btn:hover {
            background: #138808 !important;
            box-shadow: 0 12px 32px rgba(19,136,8,0.3) !important;
            transform: translateY(-2px);
          }
          .hero-secondary-btn:hover {
            background: rgba(19,136,8,0.05) !important;
            border-color: #138808 !important;
            color: #138808 !important;
          }
          .hero-secondary-btn:hover .live-dot {
            background: #138808 !important;
            animation: pulse-green 1.5s infinite !important;
          }
          .hero-find-btn:hover {
            background: #138808 !important;
            transform: scale(1.02);
            box-shadow: 0 8px 24px rgba(19,136,8,0.2) !important;
          }
          @keyframes pulse-orange {
            0% { box-shadow: 0 0 0 0 rgba(255,148,49,0.4); }
            70% { box-shadow: 0 0 0 10px rgba(255,148,49,0); }
            100% { box-shadow: 0 0 0 0 rgba(255,148,49,0); }
          }
          .elite-support-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px -10px rgba(0,0,0,0.08) !important;
            border-color: rgba(0,0,0,0.1) !important;
          }
          .elite-support-card:hover .card-hover-bg {
            opacity: 1 !important;
          }
          .elite-support-card:hover .card-accent-line {
            width: 100% !important;
          }
          ${!mob ? `
          .elite-support-card:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 0 32px 80px rgba(0,0,0,0.12);
          }
          ` : ''}
        `}</style>

      </div>
    </section>
  );
}
