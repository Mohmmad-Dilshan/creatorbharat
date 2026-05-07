import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { T } from '../../theme';
import { W, LS } from '../../utils/helpers';
import { apiCall } from '../../utils/api';
import { Btn } from '../Primitives';
import { User, BookOpen, Radio, MapPin, CreditCard, Zap } from 'lucide-react';

const TYPEWRITER_WORDS = ['Identity', 'Portfolio', 'Empire', 'Legacy'];

export const Typewriter = memo(function Typewriter({ words = TYPEWRITER_WORDS, interval = 1000 }) {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState('');
  const [del, setDel] = useState(false);
  const mob = globalThis.window !== undefined && globalThis.window.innerWidth < 768;

  useEffect(() => {
    const currentWord = words[idx % words.length];
    let speed;
    
    if (del) {
      speed = mob ? 10 : 15;
    } else {
      speed = mob ? 20 : 35;
    }

    const timeout = setTimeout(() => {
      if (!del && sub === currentWord) {
        setTimeout(() => setDel(true), mob ? 500 : interval);
      } else if (del && sub === '') {
        setDel(false);
        setIdx(prev => prev + 1);
      } else {
        const nextSub = del 
          ? currentWord.substring(0, sub.length - 1) 
          : currentWord.substring(0, sub.length + 1);
        setSub(nextSub);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [sub, del, idx, words, mob, interval]);

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ position: 'relative', zIndex: 2, background: 'linear-gradient(90deg, #FF9431, #DC2626)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{sub}</span>
      <span style={{ width: 3, height: '80%', background: '#FF9431', position: 'absolute', right: -6, top: '10%', animation: 'blink 0.6s infinite' }} />
      <svg style={{ position: 'absolute', bottom: -12, left: 0, width: '100%', height: 16, zIndex: 1, pointerEvents: 'none' }} viewBox="0 0 100 20" preserveAspectRatio="none">
        <path d="M2 15 Q 50 2 98 15" stroke="rgba(255, 148, 49, 0.4)" strokeWidth="8" strokeLinecap="round" fill="none" />
      </svg>
    </span>
  );
});

Typewriter.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string),
  interval: PropTypes.number
};

const TirangaGlow = memo(({ mob }) => {
  const chakraLines = useMemo(() => {
    return new Array(24).fill(0).map((_, i) => {
      const deg = i * 15;
      const rad = deg * (Math.PI / 180);
      return (
        <line
          key={`chakra-deg-${deg}`}
          x1="12"
          y1="12"
          x2={12 + 9.5 * Math.cos(rad)}
          y2={12 + 9.5 * Math.sin(rad)}
          stroke="#000080"
          strokeWidth="0.1"
        />
      );
    });
  }, []);

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: mob ? 600 : 900,
      zIndex: 0, pointerEvents: 'none', overflow: 'hidden',
      maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)'
    }}>
      <div style={{
        position: 'absolute', top: '-15%', left: '-5%', width: '70%', height: '70%',
        background: 'radial-gradient(circle, rgba(255,153,51,0.22) 0%, transparent 75%)',
        filter: 'blur(80px)', animation: 'float-slow 20s infinite alternate'
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', right: '-5%', width: '70%', height: '70%',
        background: 'radial-gradient(circle, rgba(19,136,8,0.18) 0%, transparent 75%)',
        filter: 'blur(80px)', animation: 'float-slow 25s infinite alternate-reverse'
      }} />
      <div style={{ position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.1, zIndex: 0 }}>
        <svg width={mob ? 300 : 600} height={mob ? 300 : 600} viewBox="0 0 24 24" style={{ animation: 'slowRotate 60s linear infinite', filter: 'drop-shadow(0 0 15px rgba(0,0,128,0.1))' }}>
          <circle cx="12" cy="12" r="9.5" fill="none" stroke="#000080" strokeWidth="0.2" />
          <circle cx="12" cy="12" r="0.8" fill="#000080" />
          {chakraLines}
        </svg>
      </div>
    </div>
  );
});

TirangaGlow.propTypes = { mob: PropTypes.bool };

const HeroHeader = memo(({ mob }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 1000 }}>
    <div className="au" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: mob ? '8px 16px' : '12px 32px', borderRadius: 100, background: '#fff', border: '1px solid rgba(0,0,0,0.08)', marginBottom: 40, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', position: 'relative', maxWidth: '90vw' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ background: '#FF9431', color: '#fff', padding: '4px 10px', borderRadius: 100, fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>New</div>
        <span style={{ fontSize: mob ? 11 : 13, fontWeight: 800, color: '#111', letterSpacing: '0.2px' }}>India&apos;s First Unified Creator Support & Identity System</span>
        <div style={{ width: 1, height: 16, background: 'rgba(0,0,0,0.1)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', animation: 'pulse-green 1.5s infinite' }} />
          <span style={{ fontSize: 10, fontWeight: 900, color: '#10B981', textTransform: 'uppercase' }}>Live Now</span>
        </div>
      </div>
    </div>
    <h1 className="au d1" style={{ fontSize: mob ? 'clamp(28px,9vw,36px)' : 'clamp(76px,9vw,104px)', fontWeight: 900, color: '#111', lineHeight: mob ? 1.15 : 1.02, marginBottom: mob ? 20 : 32, letterSpacing: '-0.05em', maxWidth: '100%', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
      Your Digital <Typewriter /> <br />
      Built for <span style={{ background: 'linear-gradient(90deg, #FF9431, #128807)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', paddingRight: mob ? 5 : 15, display: 'inline-block' }}>Bharat.</span>
    </h1>
    <p className="au d2" style={{ fontSize: mob ? 15 : 22, color: 'rgba(0,0,0,0.6)', lineHeight: 1.6, marginBottom: mob ? 32 : 48, fontWeight: 500, maxWidth: 720 }}>
      The all-in-one platform where Tier 2 & Tier 3 creators get the support, identity, and growth they deserve. Your journey from local to national starts here.
    </p>
  </div>
));

HeroHeader.propTypes = { mob: PropTypes.bool };

const HeroCTA = memo(({ mob, go, dsp }) => (
  <div className="au d3" style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: mob ? 12 : 16, marginBottom: 48, justifyContent: 'center', width: 'auto', alignItems: 'center' }}>
    <Btn lg full={false} onClick={() => dsp({ t: 'UI', v: { authModal: true, authView: 'register' } })} className="hero-primary-btn" aria-label="Claim your free creator portfolio link" style={{ padding: mob ? '16px 32px' : '22px 48px', fontSize: mob ? 15 : 18, background: T.gd, color: '#fff', borderRadius: 100, fontWeight: 900, border: 'none', boxShadow: '0 12px 32px rgba(255,148,49,0.35)', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>🚀 Claim Your Link Free</span>
      <div style={{ position: 'absolute', top: 0, left: '-100%', width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', animation: 'shimmer 3s infinite', transform: 'skewX(-20deg)' }} />
    </Btn>
    <Btn lg variant="ghost" full={false} onClick={() => dsp({ t: 'UI', v: { demoModal: true } })} className="hero-secondary-btn" aria-label="View live demo of the platform" style={{ padding: mob ? '15px 32px' : '20px 40px', fontSize: mob ? 14 : 17, background: 'rgba(0,0,0,0.03)', color: '#111', borderRadius: 100, fontWeight: 700, border: '1.5px solid rgba(0,0,0,0.08)', backdropFilter: 'blur(10px)', justifyContent: 'center', position: 'relative' }}>
      <span className="live-dot" style={{ position: 'absolute', top: 12, left: 12, width: 8, height: 8, background: '#EF4444', borderRadius: '50%', animation: 'pulse-red 1.5s infinite' }} />
      <span>👁️ View Live Demo</span>
    </Btn>
  </div>
));

HeroCTA.propTypes = { mob: PropTypes.bool, go: PropTypes.func.isRequired, dsp: PropTypes.func.isRequired };

const SearchSugs = memo(({ sugs, go }) => (
  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', borderRadius: 16, marginTop: 8, boxShadow: '0 10px 40px rgba(0,0,0,0.1)', overflow: 'hidden', border: '1px solid #E2E8F0', zIndex: 1000 }}>
    {sugs.map((s, idx) => (
      <button 
        key={s.id} 
        onClick={() => go('creator-profile', { creator: s })} 
        style={{ width: '100%', padding: '12px 20px', cursor: 'pointer', border: 'none', borderBottom: idx === sugs.length - 1 ? 'none' : '1px solid #F1F5F9', background: 'transparent', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left', transition: 'background 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'} 
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <img src={s.photo || s.avatarUrl} alt={s.name} style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover' }} />
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>{s.name}</div>
          <div style={{ fontSize: 11, color: '#64748B' }}>{s.niche} • {s.city}</div>
        </div>
      </button>
    ))}
  </div>
));

SearchSugs.propTypes = { sugs: PropTypes.array.isRequired, go: PropTypes.func.isRequired };

const SearchInput = memo(({ mob, q, dsp, onKeyDown, sugs, go }) => (
  <div style={{ flex: 1.2, position: 'relative', padding: mob ? '12px 16px' : '0 40px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', borderRight: mob ? 'none' : '1px solid rgba(0,0,0,0.05)', borderBottom: mob ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
    <label htmlFor="hero-search-input" style={{ fontSize: 9, fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 4, opacity: 0.8 }}>Who are you looking for?</label>
    <input id="hero-search-input" value={q || ''} onKeyDown={onKeyDown} onChange={e => dsp({ t: 'CF', v: { q: e.target.value } })} placeholder="Name, niche or city..." style={{ width: '100%', border: 'none', background: 'none', fontSize: mob ? 16 : 18, outline: 'none', fontWeight: 700, color: '#111' }} />
    {sugs.length > 0 && <SearchSugs sugs={sugs} go={go} />}
  </div>
));

SearchInput.propTypes = { mob: PropTypes.bool, q: PropTypes.string, dsp: PropTypes.func.isRequired, onKeyDown: PropTypes.func, sugs: PropTypes.array, go: PropTypes.func.isRequired };

const LocationPicker = memo(({ mob, state }) => (
  <div style={{ flex: 0.8, padding: mob ? '10px 16px' : '0 40px', textAlign: 'left', width: '100%' }}>
    <label htmlFor="hero-location-select" style={{ fontSize: 9, fontWeight: 900, color: '#10B981', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: 2, opacity: 0.8 }}>Location</label>
    <div id="hero-location-select" style={{ fontSize: mob ? 15 : 17, fontWeight: 700, color: '#111', cursor: 'pointer' }}>{state || 'All over India'}</div>
  </div>
));

LocationPicker.propTypes = { mob: PropTypes.bool, state: PropTypes.string };

const SearchBar = memo(({ mob, st, dsp, go, sugs, onKeyDown }) => (
  <div className="au d3" style={{ width: '100%', maxWidth: 1000, padding: 2, borderRadius: mob ? 24 : 102, position: 'relative', overflow: 'hidden', background: 'rgba(0,0,0,0.05)', marginBottom: mob ? 40 : 80, zIndex: 100, boxShadow: mob ? '0 20px 40px rgba(0,0,0,0.06)' : '0 40px 120px -20px rgba(0,0,0,0.12)', boxSizing: 'border-box' }}>
    {!mob && (
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: '200%', height: '500%', background: 'conic-gradient(from 0deg, #138808 0%, #FFFFFF 20%, #FF9933 40%, #FF9933 60%, #FFFFFF 80%, #138808 100%)', animation: 'spinBorder 5s linear infinite', transform: 'translate(-50%, -50%)', zIndex: 0 }} />
    )}
    <div style={{ width: '100%', background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(24px)', borderRadius: mob ? 32 : 100, padding: mob ? 6 : 8, display: 'flex', flexDirection: mob ? 'column' : 'row', alignItems: mob ? 'stretch' : 'center', gap: mob ? 4 : 0, position: 'relative', zIndex: 1, minHeight: mob ? 'auto' : 84 }}>
      <SearchInput mob={mob} q={st?.cf?.q} dsp={dsp} onKeyDown={onKeyDown} sugs={sugs} go={go} />
      <LocationPicker mob={mob} state={st?.cf?.state} />
      <div style={{ padding: mob ? 8 : 4, width: mob ? '100%' : 'auto' }}>
        <Btn lg full={mob} onClick={() => go('creators')} className="hero-find-btn" aria-label="Search creators" style={{ borderRadius: mob ? 18 : 100, padding: mob ? '14px' : '18px 48px', background: T.gd, color: '#fff', border: 'none', fontWeight: 900, fontSize: mob ? 14 : 16, transition: 'all 0.3s', boxShadow: `0 8px 24px rgba(255,148,49,0.2)` }}>Find Creators ⚡</Btn>
      </div>
    </div>
  </div>
));

SearchBar.propTypes = { mob: PropTypes.bool, st: PropTypes.object.isRequired, dsp: PropTypes.func.isRequired, go: PropTypes.func.isRequired, sugs: PropTypes.array, onKeyDown: PropTypes.func };

const EcosystemHeader = memo(({ mob }) => (
  <div style={{ textAlign: 'center', marginBottom: mob ? 40 : 60, marginTop: mob ? 20 : 60 }}>
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 20px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 100, marginBottom: 24 }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3B82F6', boxShadow: '0 0 10px rgba(59, 130, 246, 0.6)' }} />
      <span style={{ fontSize: 12, fontWeight: 900, color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '3px' }}>Support Ecosystem</span>
    </div>
    <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mob ? 36 : 56, fontWeight: 900, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20 }}>
      Empowering Bharat&apos;s <br /> <span style={{ background: 'linear-gradient(135deg, #FF9431 0%, #10B981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', paddingRight: '10px' }}>Digital Success.</span>
    </h2>
  </div>
));

EcosystemHeader.propTypes = { mob: PropTypes.bool };

const SupportCard = memo(({ p, mob }) => (
  <div className="elite-support-card au d4" style={{ background: '#fff', borderRadius: mob ? 24 : 32, padding: mob ? 24 : 40, border: '1px solid rgba(0,0,0,0.05)', textAlign: 'left', transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 20 }}>
    <div className="card-hover-bg" style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${p.bg} 0%, transparent 100%)`, opacity: 0, transition: 'opacity 0.6s' }} />
    <div style={{ width: mob ? 48 : 64, height: mob ? 48 : 64, borderRadius: 20, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
      <p.i size={mob ? 24 : 32} color={p.c} strokeWidth={2.5} />
    </div>
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ fontSize: 12, fontWeight: 900, color: p.c, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>{p.t}</div>
      <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mob ? 18 : 24, fontWeight: 900, color: '#111', marginBottom: 12 }}>{p.h}</h3>
      <p style={{ fontSize: mob ? 14 : 16, color: 'rgba(0,0,0,0.5)', lineHeight: 1.6, fontWeight: 500 }}>{p.d}</p>
    </div>
    <div className="card-accent-line" style={{ position: 'absolute', bottom: 0, left: 0, height: 4, width: 0, background: p.c, transition: 'width 0.6s' }} />
  </div>
));

SupportCard.propTypes = { p: PropTypes.object.isRequired, mob: PropTypes.bool };

const mergeResults = (api, local) => {
  const merged = [...api];
  local.forEach(lc => {
    if (!merged.some(ac => ac.id === lc.id)) merged.push(lc);
  });
  return merged.slice(0, 6);
};

export default function Hero({ mob, st, dsp, go }) {
  const [sugs, setSugs] = useState([]);
  const [activeIdx, setActiveIdx] = useState(-1);

  const trending = useMemo(() => ['Fashion', 'Tech', 'Travel', 'Lifestyle', 'Gaming', 'Food'], []);

  useEffect(() => {
    const q = st?.cf?.q || '';
    const state = st?.cf?.state || '';

    if (!q && !state) {
      setSugs([]);
      setActiveIdx(-1);
      return;
    }

    const timer = setTimeout(() => {
      const local = LS.get('cb_creators', []).filter(c => {
        const query = q.toLowerCase();
        const mq = !query || (c.name || '').toLowerCase().includes(query) || (c.niche || '').toLowerCase().includes(query) || (c.city || '').toLowerCase().includes(query) || (c.state || '').toLowerCase().includes(query);
        const ms = !state || c.state === state;
        return mq && ms;
      });

      apiCall(`/creators?q=${encodeURIComponent(q)}&state=${encodeURIComponent(state)}&limit=10`)
        .then(d => {
          const apiList = d.creators || (Array.isArray(d) ? d : []);
          setSugs(mergeResults(apiList, local));
        })
        .catch(() => { if (local.length > 0) setSugs(local.slice(0, 6)); });
    }, 300);

    return () => clearTimeout(timer);
  }, [st.cf.q, st.cf.state]);

  const handleKeyDown = useCallback((e) => {
    const isTrending = !(st?.cf?.q);
    const maxIdx = isTrending ? trending.length - 1 : sugs.length;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(prev => (prev < maxIdx ? prev + 1 : prev)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(prev => (prev > 0 ? prev - 1 : -1)); }
    else if (e.key === 'Enter') {
      if (isTrending) { if (activeIdx >= 0) dsp({ t: 'GO', p: 'creators', sel: { q: trending[activeIdx] } }); }
      else if (activeIdx >= 0 && activeIdx < sugs.length) go('creator-profile', { creator: sugs[activeIdx] });
      else if (activeIdx === sugs.length || activeIdx === -1) go('creators');
    } else if (e.key === 'Escape') setSugs([]);
  }, [st.cf.q, activeIdx, sugs, trending, dsp, go]);

  const supportFeatures = useMemo(() => [
    { t: 'Identity', h: 'Pro Portfolio', d: 'Verified identity jo brands ko instantly impress karegi.', i: User, c: '#FF9431', bg: 'rgba(255,148,49,0.08)' },
    { t: 'Growth', h: 'Insights & Analytics', d: 'Deep data analytics se apne growth ko measure karein.', i: BookOpen, c: '#10B981', bg: 'rgba(16,185,129,0.08)' },
    { t: 'Spotlight', h: 'National Exposure', d: 'Tier 2/3 cities se seedha national brands tak pahunch.', i: Radio, c: '#3B82F6', bg: 'rgba(59,130,246,0.08)' },
    { t: 'Reach', h: 'Hyperlocal Campaigns', d: 'Targeted brand deals exactly aapke area ke liye.', i: MapPin, c: '#8B5CF6', bg: 'rgba(139,92,246,0.08)' },
    { t: 'Freedom', h: '0% Platform Fee', d: 'Aapki mehnat, aapka paisa. Hum middlemen nahi hain.', i: CreditCard, c: '#F59E0B', bg: 'rgba(245,158,11,0.08)' },
    { t: 'Scale', h: 'Free Forever', d: 'Basic features will always be free for verified creators.', i: Zap, c: '#EF4444', bg: 'rgba(239,68,68,0.08)' }
  ], []);

  return (
    <section style={{ background: '#fff', minHeight: mob ? 'auto' : '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: mob ? 24 : 80, paddingBottom: 40, position: 'relative', overflow: 'visible', textAlign: 'center' }}>
      <TirangaGlow mob={mob} />
      <div style={{ ...W(), position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
        <HeroHeader mob={mob} />
        <HeroCTA mob={mob} go={go} dsp={dsp} />
        <SearchBar mob={mob} st={st} dsp={dsp} go={go} sugs={sugs} onKeyDown={handleKeyDown} />
        <EcosystemHeader mob={mob} />
        <div style={{ width: '100%', maxWidth: 1200, display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(3, 1fr)', gap: mob ? 12 : 32, padding: mob ? '0 16px' : 0, boxSizing: 'border-box' }}>
          {supportFeatures.map((p) => <SupportCard key={p.h} p={p} mob={mob} />)}
        </div>
        <style>{`
          @keyframes slowRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes spinBorder { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
          .hero-primary-btn:hover { background: #138808 !important; box-shadow: 0 12px 32px rgba(19,136,8,0.3) !important; transform: translateY(-2px); }
          .hero-secondary-btn:hover { background: rgba(19,136,8,0.05) !important; border-color: #138808 !important; color: #138808 !important; }
          .hero-secondary-btn:hover .live-dot { background: #138808 !important; animation: pulse-green 1.5s infinite !important; }
          .hero-find-btn:hover { background: #138808 !important; transform: scale(1.02); box-shadow: 0 8px 24px rgba(19,136,8,0.2) !important; }
          .elite-support-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px -10px rgba(0,0,0,0.08) !important; border-color: rgba(0,0,0,0.1) !important; }
          .elite-support-card:hover .card-hover-bg { opacity: 1 !important; }
          .elite-support-card:hover .card-accent-line { width: 100% !important; }
          ${mob ? '' : '.elite-support-card:hover { transform: translateY(-12px) scale(1.02); box-shadow: 0 32px 80px rgba(0,0,0,0.12); }'}
        `}</style>
      </div>
    </section>
  );
}

Hero.propTypes = {
  mob: PropTypes.bool,
  st: PropTypes.shape({
    cf: PropTypes.shape({
      q: PropTypes.string,
      state: PropTypes.string
    })
  }).isRequired,
  dsp: PropTypes.func.isRequired,
  go: PropTypes.func.isRequired
};
