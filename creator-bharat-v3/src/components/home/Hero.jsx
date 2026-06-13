import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { W, LS } from '../../utils/helpers';
import { apiCall } from '../../utils/api';
import { Btn } from '@/components/common/Primitives';
import { 
  User, BookOpen, Radio, MapPin, CreditCard, Zap, ChevronRight, Globe,
  Video, Mic, Play, Clapperboard, Camera, Headphones, Sparkles
} from 'lucide-react';
import { 
  InstagramIcon, YoutubeIcon, LinkedinIcon, TwitterIcon, FacebookIcon, 
  GithubIcon, TwitchIcon 
} from '../icons/SocialIcons';

const CITIES_LIST = ['Jaipur', 'Mumbai', 'Lucknow', 'Indore', 'Bhopal', 'Surat', 'Bhilwara', 'Patna', 'Kochi'];

const HeroValueProps = memo(({ mob }) => {
  const [cityIdx, setCityIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCityIdx(prev => (prev + 1) % CITIES_LIST.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="au d3" style={{ 
      width: '100%', 
      maxWidth: 1200, 
      marginBottom: mob ? 60 : 100,
      padding: mob ? '0 16px' : '0 40px',
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      <div style={{ 
        background: '#fff',
        padding: mob ? '40px 24px' : '80px 64px',
        borderRadius: mob ? 32 : 48,
        border: '1.5px solid rgba(0,0,0,0.05)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
        display: 'flex',
        flexDirection: mob ? 'column' : 'row',
        alignItems: 'center',
        gap: mob ? 32 : 80,
        textAlign: mob ? 'center' : 'left'
      }}>
        <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: mob ? 'center' : 'flex-start' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 20px', background: 'rgba(255,148,49,0.08)', borderRadius: 100, marginBottom: mob ? 16 : 24, margin: mob ? '0 auto 16px' : '0 0 24px 0' }}>
            <Globe size={14} color="#FF9431" />
            <span style={{ fontSize: 11, fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '3px' }}>The Bharat Narrative</span>
          </div>
          <h2 style={{ fontSize: mob ? 28 : 56, fontWeight: 950, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.04em', margin: 0 }}>
            Find Every <br />
            <span style={{ color: '#FF9431' }}>Tier City</span> <br />
            Creator.
          </h2>
        </div>

        <div style={{ flex: 1.2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: mob ? 'center' : 'flex-start' }}>
          <p style={{ 
            fontSize: mob ? 16 : 24, 
            color: '#475569', 
            fontWeight: 600, 
            lineHeight: mob ? 1.5 : 1.6, 
            margin: 0,
            fontFamily: "'Outfit', sans-serif"
          }}>
            At CreatorBharat, we are mapping the heartbeat of India’s talent. From hidden gems in{' '}
            <span style={{ 
              display: 'inline-flex', 
              position: 'relative', 
              overflow: 'hidden', 
              height: mob ? '24px' : '34px', 
              verticalAlign: 'middle', 
              padding: '0 4px' 
            }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={CITIES_LIST[cityIdx]}
                  initial={{ y: mob ? 12 : 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: mob ? -12 : -20, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  style={{ color: '#FF9431', fontWeight: 900, display: 'inline-block' }}
                >
                  {CITIES_LIST[cityIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
            {' '}to bustling metros, we find and verify every creator to provide them with a <span style={{ color: '#0f172a', fontWeight: 900 }}>Unique Digital ID</span>. 
            <br /><br />
            Dive into their raw journeys through <span style={{ color: '#0f172a', fontWeight: 900 }}>Articles & Podcasts</span>, and join the mission by <span style={{ color: '#138808', fontWeight: 900 }}>Supporting & Rating</span> your favorite stars. This is where Bharat’s voice find its home.
          </p>
        </div>
      </div>
    </div>
  );
});

HeroValueProps.propTypes = { mob: PropTypes.bool };


const TYPEWRITER_WORDS = ['Identity', 'Portfolio', 'Empire', 'Legacy'];

export const Typewriter = memo(function Typewriter({ words = TYPEWRITER_WORDS, interval = 1000 }) {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState('');
  const [del, setDel] = useState(false);
  const mob = globalThis.window !== undefined && globalThis.window.innerWidth < 768;

  useEffect(() => {
    const currentWord = words[idx % words.length];
    
    // Fixed nested ternary logic
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
    <span className="notranslate" style={{ 
      position: 'relative', 
      display: 'inline-block', 
      textAlign: 'left',
      verticalAlign: 'bottom',
      whiteSpace: 'nowrap'
    }}>
      {/* Phantom word to reserve space and prevent layout shift */}
      <span style={{ visibility: 'hidden', pointerEvents: 'none', userSelect: 'none' }}>Portfolio</span>
      
      {/* Actual typing text - grows with sub */}
      <span style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        zIndex: 2, 
        display: 'inline-block',
        width: 'fit-content'
      }}>
        <span style={{ 
          background: 'linear-gradient(90deg, #FF9431, #DC2626)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent' 
        }}>
          {sub}
        </span>
        
        {/* Cursor that moves with text */}
        <span style={{ 
          display: 'inline-block',
          width: 2, 
          height: '1em', 
          background: '#FF9431', 
          marginLeft: 2, 
          verticalAlign: 'middle',
          animation: 'blink 0.6s infinite',
          position: 'relative',
          top: -2
        }} />

        {/* Dynamic Underline that grows with text */}
        <svg style={{ 
          position: 'absolute', 
          bottom: mob ? -10 : -14, 
          left: 0, 
          width: '100%', 
          height: 16, 
          zIndex: 1, 
          pointerEvents: 'none',
          transition: 'width 0.1s linear'
        }} viewBox="0 0 100 20" preserveAspectRatio="none">
          <path d="M2 15 Q 50 2 98 15" stroke="rgba(255, 148, 49, 0.4)" strokeWidth="8" strokeLinecap="round" fill="none" />
        </svg>
      </span>
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

const FLOATING_ICONS = [
  // Left Side
  { Icon: Video, size: 30, top: '18%', left: '1.5%', color: '#FF9431', delay: 0, rotate: -15 },
  { Icon: Mic, size: 26, top: '52%', left: '4%', color: '#EA580C', delay: 1.5, rotate: 12 },
  { Icon: Play, size: 28, top: '78%', left: '2.5%', color: '#FF9431', delay: 0.8, rotate: -8 },

  // Right Side
  { Icon: Camera, size: 28, top: '20%', right: '1.5%', color: '#10B981', delay: 0.5, rotate: 15 },
  { Icon: InstagramIcon, size: 28, top: '48%', right: '4%', color: '#E1306C', delay: 0.9, rotate: -8 },
  { Icon: Sparkles, size: 26, top: '75%', right: '2.5%', color: '#FF9431', delay: 2.8, rotate: -15 }
];

const FloatingCreatorIcons = memo(({ mob }) => {
  if (mob) return null;

  return (
    <div className="floating-creator-icons-container" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {FLOATING_ICONS.map((ico) => {
        const { Icon, size, top, left, right, color, delay, rotate } = ico;
        const style = {
          position: 'absolute',
          top,
          left,
          right,
          pointerEvents: 'none',
        };

        return (
          <motion.div
            key={`float-icon-${color}-${top}-${left || right}`}
            style={style}
            initial={{ y: 0, rotate }}
            animate={{
              y: [0, -12, 0],
              rotate: [rotate, rotate + 4, rotate],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay,
            }}
          >
            <div style={{
              width: size + 24,
              height: size + 24,
              background: 'rgba(255, 255, 255, 0.75)',
              border: '1.5px solid rgba(0, 0, 0, 0.04)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
              backdropFilter: 'blur(12px)',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="floating-creator-btn"
            >
              <Icon size={size} color={color} strokeWidth={1.8} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
});

FloatingCreatorIcons.propTypes = { mob: PropTypes.bool };

const HeroHeader = memo(({ mob }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 1100 }}>
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="au" 
      style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: mob ? '10px 20px' : '14px 36px', borderRadius: 100, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,0,0,0.06)', marginBottom: 48, boxShadow: '0 20px 40px rgba(0,0,0,0.03)', position: 'relative' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ background: 'linear-gradient(90deg, #FF9431, #EA580C)', color: '#fff', padding: '6px 14px', borderRadius: 100, fontSize: 11, fontWeight: 950, textTransform: 'uppercase', letterSpacing: '1.5px' }}>ELITE</div>
        <span style={{ fontSize: mob ? 12 : 14, fontWeight: 900, color: '#0f172a', letterSpacing: '0.2px' }}>Empowering Bharat&apos;s Next 100M Creators</span>
        <div style={{ width: 1, height: 20, background: 'rgba(0,0,0,0.1)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 12px #10B981', animation: 'pulse-green 2s infinite' }} />
          <span style={{ fontSize: 11, fontWeight: 950, color: '#10B981', textTransform: 'uppercase' }}>National Pulse</span>
        </div>
      </div>
    </motion.div>

    <h1 className="au d1" style={{ fontSize: mob ? 'clamp(32px, 9vw, 42px)' : 'clamp(80px, 10vw, 110px)', fontWeight: 950, color: '#0f172a', lineHeight: 0.95, marginBottom: mob ? 24 : 40, letterSpacing: '-0.06em', maxWidth: '100%', textAlign: 'center' }}>
      Your Digital <Typewriter /> <br />
      Built for <span style={{ background: 'linear-gradient(90deg, #FF9431, #128807)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', paddingRight: mob ? 5 : 15 }}>Bharat.</span>
    </h1>
    <p className="au d2" style={{ fontSize: mob ? 16 : 24, color: '#475569', lineHeight: 1.6, marginTop: 0, marginRight: 'auto', marginBottom: mob ? 24 : 48, marginLeft: 'auto', fontWeight: 600, maxWidth: 800 }}>
      India&apos;s all-in-one platform helping Tier 2 & 3 creators build a professional identity, access regional missions, and grow nationally.
      <br />
      <span style={{ color: '#64748b', fontWeight: 500 }}>Verified creator profiles, paid brand campaigns, and real visibility for talent beyond the metros.</span>
      <br />
      <span style={{ display: 'block', width: 'fit-content', margin: '10px auto 0', fontSize: mob ? 13 : 15, fontWeight: 950, textTransform: 'uppercase', letterSpacing: '1.8px', background: 'linear-gradient(90deg, #FF9431 0%, #1A3A8A 48%, #138808 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Built in Bharat. Ready for India.</span>
    </p>
  </div>
));

HeroHeader.propTypes = { mob: PropTypes.bool };

const TourBadge = memo(({ mob, onClick }) => (
  <button 
    type="button" 
    onClick={onClick} 
    style={{
      background: 'rgba(255,148,49,0.08)',
      color: '#FF9431',
      border: '1px dashed rgba(255,148,49,0.3)',
      borderRadius: 100,
      padding: '8px 18px',
      fontSize: 12,
      fontWeight: 800,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      marginBottom: mob ? 12 : 40,
      transition: 'all 0.2s ease',
    }}
    className="interactive-tour-badge"
  >
    <span>👁️ Take 1-Minute Interactive Tour</span>
  </button>
));

TourBadge.propTypes = {
  mob: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

const PrimaryButtons = memo(({ mob, go }) => (
  <div className="au d3" style={{ display: 'flex', flexDirection: 'row', gap: mob ? 12 : 20, marginBottom: mob ? 16 : 20, justifyContent: 'center', width: mob ? '100%' : 'auto', maxWidth: mob ? 480 : 'none', padding: mob ? '0 16px' : 0, boxSizing: 'border-box', alignItems: 'center' }}>
    <Btn lg full={false} onClick={() => go('/join')} style={{ flex: mob ? 1 : 'initial', padding: mob ? '18px 14px' : '28px 64px', fontSize: mob ? 15 : 20, minWidth: mob ? 0 : 'auto', background: '#0f172a', color: '#fff', borderRadius: 100, fontWeight: 950, border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden', whiteSpace: 'nowrap' }}>
      <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: mob ? 6 : 12 }}>🚀 Join as Creator</span>
      <div style={{ position: 'absolute', top: 0, left: '-100%', width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)', animation: 'shimmer 3s infinite', transform: 'skewX(-20deg)' }} />
    </Btn>
    <Btn lg variant="ghost" full={false} onClick={() => go('/creators')} style={{ flex: mob ? 1 : 'initial', padding: mob ? '18px 14px' : '26px 56px', fontSize: mob ? 15 : 18, minWidth: mob ? 0 : 'auto', background: 'rgba(255,255,255,0.8)', color: '#0f172a', borderRadius: 100, fontWeight: 950, border: '1.5px solid #f1f5f9', backdropFilter: 'blur(20px)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', whiteSpace: 'nowrap' }}>
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: mob ? 6 : 12 }}>💼 Hire Talent</span>
    </Btn>
  </div>
));

PrimaryButtons.propTypes = {
  mob: PropTypes.bool,
  go: PropTypes.func.isRequired
};

const HeroCTA = memo(({ mob, go, dsp }) => {
  const handleOpenDemo = useCallback(() => {
    dsp({ t: 'UI', v: { demoModal: true } });
  }, [dsp]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: mob ? 18 : 0 }}>
      {mob ? (
        <>
          <TourBadge mob={mob} onClick={handleOpenDemo} />
          <PrimaryButtons mob={mob} go={go} />
        </>
      ) : (
        <>
          <PrimaryButtons mob={mob} go={go} />
          <TourBadge mob={mob} onClick={handleOpenDemo} />
        </>
      )}
      
      {mob && (
        <div className="au d3" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'rgba(16,185,129,0.06)', borderRadius: 100, marginBottom: 44, border: '1px solid rgba(16,185,129,0.1)' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }} />
          <span style={{ fontSize: 11, fontWeight: 950, color: '#10B981', textTransform: 'uppercase', letterSpacing: '1px' }}>Verified Bharat Ecosystem</span>
        </div>
      )}
    </div>
  );
});

HeroCTA.propTypes = { mob: PropTypes.bool, go: PropTypes.func.isRequired, dsp: PropTypes.func.isRequired };

const SearchSugs = memo(({ sugs, go }) => (
  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', borderRadius: 24, marginTop: 12, boxShadow: '0 30px 60px rgba(0,0,0,0.12)', overflow: 'hidden', border: '1.5px solid #f1f5f9', zIndex: 10000 }}>
    {sugs.map((s, idx) => (
      <button 
        key={s.id} 
        onClick={() => go('creator-profile', { creator: s })} 
        style={{ width: '100%', padding: '16px 24px', cursor: 'pointer', border: 'none', borderBottom: idx === sugs.length - 1 ? 'none' : '1px solid #F8FAFC', background: 'transparent', display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left', transition: 'all 0.2s ease' }}
        onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'} 
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <img src={s.photo || s.avatarUrl} alt={s.name} style={{ width: 40, height: 40, borderRadius: 12, objectFit: 'cover', border: '1px solid #f1f5f9' }} />
        <div>
          <div style={{ fontSize: 15, fontWeight: 900, color: '#0f172a' }}>{s.name}</div>
          <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 700 }}>{s.niche} • {s.city}</div>
        </div>
        <ChevronRight size={16} style={{ marginLeft: 'auto', color: '#cbd5e1' }} />
      </button>
    ))}
  </div>
));

SearchSugs.propTypes = { sugs: PropTypes.array.isRequired, go: PropTypes.func.isRequired };

const SearchInput = memo(({ mob, q, dsp, onKeyDown, sugs, go }) => (
  <div style={{ flex: 1.2, position: 'relative', padding: mob ? '16px 24px' : '0 48px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', borderRight: mob ? 'none' : '1.5px solid #f1f5f9', borderBottom: mob ? '1.5px solid #f1f5f9' : 'none' }}>
    <label htmlFor="hero-search-input" style={{ fontSize: 10, fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 6 }}>Who are you looking for?</label>
    <input id="hero-search-input" name="search" value={q || ''} onKeyDown={onKeyDown} onChange={e => dsp({ t: 'CF', v: { q: e.target.value } })} placeholder="Name, niche or city..." style={{ width: '100%', border: 'none', background: 'none', fontSize: mob ? 17 : 20, outline: 'none', fontWeight: 900, color: '#0f172a' }} />
    {sugs.length > 0 && <SearchSugs sugs={sugs} go={go} />}
  </div>
));

SearchInput.propTypes = { mob: PropTypes.bool, q: PropTypes.string, dsp: PropTypes.func.isRequired, onKeyDown: PropTypes.func, sugs: PropTypes.array, go: PropTypes.func.isRequired };

const LocationPicker = memo(({ mob, state }) => (
  <div style={{ flex: 0.8, padding: mob ? '16px 24px' : '0 48px', textAlign: 'left', width: '100%' }}>
    <span style={{ fontSize: 10, fontWeight: 950, color: '#10B981', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 6, display: 'block' }}>Location</span>
    <div id="hero-location-display" style={{ fontSize: mob ? 16 : 18, fontWeight: 900, color: '#0f172a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
       <MapPin size={16} color="#10B981" /> {state || 'All over Bharat'}
    </div>
  </div>
));

LocationPicker.propTypes = { mob: PropTypes.bool, state: PropTypes.string };

const SearchBar = memo(({ mob, st, dsp, go, sugs, onKeyDown }) => (
  <div className="au d3" style={{ width: '100%', maxWidth: 1100, padding: 3, borderRadius: mob ? 32 : 110, position: 'relative', overflow: 'hidden', background: '#f1f5f9', marginBottom: 80, zIndex: 100, boxShadow: '0 40px 100px -20px rgba(0,0,0,0.1)' }}>
    {!mob && (
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: '200%', height: '500%', background: 'conic-gradient(from 0deg, #10B981 0%, #fff 25%, #FF9431 50%, #fff 75%, #10B981 100%)', animation: 'spinBorder 10s linear infinite', transform: 'translate(-50%, -50%)', zIndex: 0, opacity: 0.4 }} />
    )}
    <div style={{ width: '100%', background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(32px)', borderRadius: mob ? 28 : 100, padding: mob ? 8 : 12, display: 'flex', flexDirection: mob ? 'column' : 'row', alignItems: mob ? 'stretch' : 'center', gap: mob ? 8 : 0, position: 'relative', zIndex: 1, minHeight: mob ? 'auto' : 100 }}>
      <SearchInput mob={mob} q={st?.cf?.q} dsp={dsp} onKeyDown={onKeyDown} sugs={sugs} go={go} />
      <LocationPicker mob={mob} state={st?.cf?.state} />
      <div style={{ padding: mob ? 8 : 4, width: mob ? '100%' : 'auto' }}>
        <Btn lg full={mob} onClick={() => go('creators')} style={{ borderRadius: mob ? 24 : 100, padding: mob ? '18px' : '22px 56px', background: 'linear-gradient(90deg, #FF9431, #EA580C)', color: '#fff', border: 'none', fontWeight: 950, fontSize: mob ? 15 : 18, transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', boxShadow: `0 12px 24px rgba(255,148,49,0.2)` }}>Search Creators ⚡</Btn>
      </div>
    </div>
  </div>
));

SearchBar.propTypes = { mob: PropTypes.bool, st: PropTypes.object.isRequired, dsp: PropTypes.func.isRequired, go: PropTypes.func.isRequired, sugs: PropTypes.array, onKeyDown: PropTypes.func };

const EcosystemHeader = memo(({ mob }) => (
  <div style={{ textAlign: 'center', marginBottom: mob ? 48 : 80, marginTop: 40 }}>
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '10px 24px', background: '#fff', border: '1.5px solid #f1f5f9', borderRadius: 100, marginBottom: 24, boxShadow: '0 10px 20px rgba(0,0,0,0.02)' }}>
      <Globe size={16} color="#3B82F6" />
      <span style={{ fontSize: 13, fontWeight: 950, color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '4px' }}>Support Infrastructure</span>
    </div>
    <h2 style={{ fontSize: mob ? 40 : 64, fontWeight: 950, color: '#0f172a', lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: 24 }}>
      Empowering the <br /> <span style={{ background: 'linear-gradient(135deg, #FF9431 0%, #10B981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', paddingRight: '10px' }}>Voice of Bharat.</span>
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

const TrustBadges = memo(({ mob }) => (
  <div className="au d4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: mob ? 16 : 40, flexWrap: 'wrap', marginTop: mob ? 40 : 64, opacity: 0.5, filter: 'grayscale(100%)', cursor: 'default' }}>
    <div style={{ fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', marginRight: mob ? 0 : 20, color: '#64748b', width: mob ? '100%' : 'auto', textAlign: 'center', marginBottom: mob ? 8 : 0 }}>Trusted By Teams At</div>
    {['Nykaa', 'Mamaearth', 'Unacademy', 'Dream11', 'Lenskart'].map(brand => (
      <span key={brand} style={{ fontSize: mob ? 18 : 24, fontWeight: 950, color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>{brand}</span>
    ))}
  </div>
));

TrustBadges.propTypes = { mob: PropTypes.bool };

const SummitBanner = memo(({ mob, go, st }) => {
  const [hovered, setHovered] = React.useState(false);

  const handleEventClick = () => {
    if (st?.user && st?.role === 'creator') {
      go('/creator/events');
    } else {
      go('/join');
    }
  };

  const isCreator = st?.user && st?.role === 'creator';

  // Inline SVG cartoon creator character — female creator with phone & mic
  const CreatorCharacter = () => (
    <svg viewBox="0 0 220 340" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: mob ? 120 : 190, height: 'auto', flexShrink: 0, filter: 'drop-shadow(0 20px 40px rgba(255,148,49,0.3))' }}
    >
      {/* Body shadow */}
      <ellipse cx="110" cy="330" rx="55" ry="10" fill="rgba(255,148,49,0.15)" />

      {/* Legs */}
      <rect x="88" y="245" width="18" height="65" rx="9" fill="#1e293b"/>
      <rect x="114" y="245" width="18" height="65" rx="9" fill="#1e293b"/>
      {/* Shoes */}
      <ellipse cx="97" cy="311" rx="16" ry="7" fill="#FF9431"/>
      <ellipse cx="123" cy="311" rx="16" ry="7" fill="#FF9431"/>

      {/* Body */}
      <rect x="72" y="155" width="76" height="100" rx="28" fill="#FF9431"/>
      {/* Body detail - dupatta / scarf */}
      <path d="M72 175 Q110 165 148 175 L148 195 Q110 185 72 195 Z" fill="rgba(255,255,255,0.18)"/>
      {/* Tricolor badge on body */}
      <rect x="96" y="185" width="28" height="8" rx="4" fill="#fff" opacity="0.9"/>
      <rect x="96" y="185" width="9" height="8" rx="0" fill="#FF9431" opacity="0.9"/>
      <rect x="105" y="185" width="10" height="8" fill="#fff" opacity="0.9"/>
      <rect x="115" y="185" width="9" height="8" rx="0" fill="#138808" opacity="0.9"/>

      {/* Right arm — holding phone */}
      <rect x="148" y="165" width="16" height="55" rx="8" fill="#f4a261"/>
      {/* Phone */}
      <rect x="156" y="145" width="28" height="48" rx="6" fill="#0f172a"/>
      <rect x="159" y="149" width="22" height="38" rx="4" fill="#1e3a5f"/>
      {/* Phone screen glow */}
      <rect x="159" y="149" width="22" height="38" rx="4" fill="url(#phoneGlow)" opacity="0.8"/>
      {/* Camera icon on phone */}
      <circle cx="170" cy="168" r="7" stroke="#FF9431" strokeWidth="2" fill="none"/>
      <circle cx="170" cy="168" r="3" fill="#FF9431"/>
      {/* Record button */}
      <circle cx="170" cy="179" r="3" fill="#ef4444"/>

      {/* Left arm — mic raised up */}
      <rect x="56" y="155" width="16" height="55" rx="8" fill="#f4a261"/>
      {/* Mic stick */}
      <rect x="42" y="105" width="7" height="50" rx="3.5" fill="#94a3b8"/>
      {/* Mic head */}
      <ellipse cx="45" cy="100" rx="12" ry="16" fill="#1e293b"/>
      <ellipse cx="45" cy="100" rx="8" ry="11" fill="#334155"/>
      {/* Mic grill lines */}
      <line x1="38" y1="96" x2="52" y2="96" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      <line x1="37" y1="100" x2="53" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      <line x1="38" y1="104" x2="52" y2="104" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>

      {/* Neck */}
      <rect x="100" y="130" width="20" height="28" rx="10" fill="#f4a261"/>

      {/* Head */}
      <ellipse cx="110" cy="115" rx="38" ry="40" fill="#f4a261"/>
      {/* Ears */}
      <ellipse cx="72" cy="115" rx="8" ry="10" fill="#f4a261"/>
      <ellipse cx="148" cy="115" rx="8" ry="10" fill="#f4a261"/>

      {/* Hair — long, Indian style */}
      <path d="M75 95 Q72 60 110 55 Q148 60 145 95 Q148 120 148 135 L155 160 Q135 155 110 158 Q85 155 65 160 L72 135 Q72 120 75 95 Z" fill="#1e293b"/>
      {/* Hair highlight */}
      <path d="M85 65 Q110 58 130 68" stroke="#334155" strokeWidth="4" strokeLinecap="round"/>
      {/* Hair side braid */}
      <path d="M145 115 Q155 130 150 160 Q148 170 143 165" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" fill="none"/>

      {/* Face details */}
      {/* Eyes */}
      <ellipse cx="97" cy="112" rx="6" ry="7" fill="#fff"/>
      <ellipse cx="123" cy="112" rx="6" ry="7" fill="#fff"/>
      <ellipse cx="98" cy="113" rx="4" ry="5" fill="#1e293b"/>
      <ellipse cx="124" cy="113" rx="4" ry="5" fill="#1e293b"/>
      {/* Eye shine */}
      <circle cx="100" cy="111" r="1.5" fill="#fff"/>
      <circle cx="126" cy="111" r="1.5" fill="#fff"/>
      {/* Eyebrows */}
      <path d="M91 104 Q97 100 103 104" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M117 104 Q123 100 129 104" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Nose */}
      <path d="M107 120 Q110 124 113 120" stroke="#e8916a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Smile */}
      <path d="M100 128 Q110 135 120 128" stroke="#e8916a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Dimples */}
      <circle cx="98" cy="128" r="2" fill="rgba(200,100,60,0.3)"/>
      <circle cx="122" cy="128" r="2" fill="rgba(200,100,60,0.3)"/>

      {/* Bindi */}
      <circle cx="110" cy="100" r="2.5" fill="#FF9431"/>

      {/* Earrings */}
      <circle cx="72" cy="120" r="4" fill="#FF9431"/>
      <circle cx="72" cy="126" r="2.5" fill="#FFB347"/>

      {/* Speech bubble */}
      <rect x="152" y="68" width="62" height="32" rx="12" fill="#fff" opacity="0.95"/>
      <path d="M160 100 L155 112 L168 100" fill="#fff" opacity="0.95"/>
      <text x="164" y="82" fontSize="8" fontWeight="900" fill="#FF9431" fontFamily="sans-serif">LIVE 🔴</text>
      <text x="158" y="94" fontSize="7" fontWeight="700" fill="#0f172a" fontFamily="sans-serif">Summit 2027</text>

      {/* Stars / sparkles around */}
      <text x="15" y="85" fontSize="16">✨</text>
      <text x="185" y="130" fontSize="12">⭐</text>
      <text x="8" y="140" fontSize="10">🌟</text>

      <defs>
        <linearGradient id="phoneGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.3"/>
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <motion.div
      className="au d5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        maxWidth: 1100,
        marginTop: mob ? 32 : 72,
        marginBottom: mob ? 32 : 56,
        borderRadius: mob ? 28 : 48,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        boxShadow: hovered
          ? '0 40px 100px rgba(255,148,49,0.22), 0 0 0 1px rgba(255,148,49,0.25)'
          : '0 24px 64px rgba(0,0,0,0.35)',
        transition: 'box-shadow 0.4s ease',
      }}
      onClick={handleEventClick}
    >
      {/* Dark background */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #08080f 0%, #0f172a 50%, #130800 100%)' }} />

      {/* Glow blob orange */}
      <motion.div
        animate={{ opacity: hovered ? 0.3 : 0.15, scale: hovered ? 1.2 : 1 }}
        transition={{ duration: 0.7 }}
        style={{ position: 'absolute', top: '-20%', right: '-5%', width: '55%', height: '180%', background: 'radial-gradient(circle, #FF9431 0%, transparent 65%)', filter: 'blur(70px)', pointerEvents: 'none' }}
      />
      {/* Glow blob green */}
      <motion.div
        animate={{ opacity: hovered ? 0.12 : 0.06 }}
        transition={{ duration: 0.7 }}
        style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: '35%', height: '150%', background: 'radial-gradient(circle, #138808 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }}
      />

      {/* Tricolor top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #FF9431 33.3%, #fff 33.3%, #fff 66.6%, #138808 66.6%)' }} />

      {/* MAIN CONTENT */}
      <div style={{
        position: 'relative', zIndex: 2,
        padding: mob ? '28px 22px 22px' : '44px 56px 32px',
      }}>

        {/* Top: Badge row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: mob ? 20 : 28, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <motion.div
              animate={{ opacity: [1, 0.3, 1], boxShadow: ['0 0 6px #10B981', '0 0 12px #10B981', '0 0 6px #10B981'] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', flexShrink: 0 }}
            />
            <span style={{ fontSize: mob ? 10 : 11, fontWeight: 900, color: '#10B981', textTransform: 'uppercase', letterSpacing: '2.5px' }}>
              Registrations Open · 2027
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'rgba(255,148,49,0.1)', border: '1px solid rgba(255,148,49,0.2)', borderRadius: 100 }}>
            <span style={{ fontSize: 16 }}>🏆</span>
            <span style={{ fontSize: mob ? 11 : 12, fontWeight: 900, color: '#FF9431', letterSpacing: '0.5px' }}>National Summit 2027</span>
          </div>
        </div>

        {/* Middle: 3-col layout — Title | Character | Stats+CTA */}
        <div style={{
          display: 'flex',
          flexDirection: mob ? 'column' : 'row',
          alignItems: mob ? 'flex-start' : 'flex-end',
          justifyContent: 'space-between',
          gap: mob ? 24 : 32
        }}>

          {/* LEFT: Title + meta */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: mob ? 26 : 40, fontWeight: 950, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 16px' }}>
              CreatorBharat{' '}
              <span style={{ background: 'linear-gradient(90deg, #FF9431 0%, #FFB347 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                National Summit
              </span>
            </h3>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { icon: '📍', text: 'Jaipur, Rajasthan' },
                { icon: '📅', text: 'March 15–16, 2027' },
                { icon: '👥', text: '500 Creators' },
              ].map(item => (
                <div key={item.text} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '5px 11px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 100,
                  fontSize: mob ? 10 : 11, color: 'rgba(255,255,255,0.65)', fontWeight: 600
                }}>
                  {item.icon} {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* CENTER: Cartoon character — hidden on mobile */}
          {!mob && (
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ flexShrink: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: -32 }}
            >
              <CreatorCharacter />
            </motion.div>
          )}

          {/* RIGHT: Stats + CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: mob ? 'stretch' : 'flex-end', gap: 14, flexShrink: 0, minWidth: mob ? '100%' : 240 }}>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1,
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              {[
                { v: '347', l: 'Seats Left' },
                { v: '60+', l: 'CB Score' },
                { v: 'FREE', l: 'Travel Top 50' },
              ].map((s, i) => (
                <div key={s.l} style={{
                  padding: mob ? '12px 8px' : '13px 10px', textAlign: 'center',
                  background: i === 0 ? 'rgba(255,148,49,0.08)' : 'transparent',
                  borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none'
                }}>
                  <div style={{ fontSize: mob ? 16 : 18, fontWeight: 950, color: i === 0 ? '#FF9431' : '#fff', lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => { e.stopPropagation(); handleEventClick(); }}
              style={{
                width: '100%',
                padding: mob ? '14px 20px' : '15px 24px',
                borderRadius: 14,
                background: 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)',
                color: '#fff', fontSize: mob ? 14 : 14, fontWeight: 900,
                border: 'none', cursor: 'pointer',
                boxShadow: '0 10px 28px rgba(255,148,49,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                letterSpacing: '-0.01em'
              }}
            >
              {isCreator ? '🎟 Book My Seat' : '✦ Join as Creator First'}
              <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>→</motion.span>
            </motion.button>

            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', fontWeight: 600, textAlign: mob ? 'center' : 'right', margin: 0 }}>
              {isCreator ? 'CB Score 60+ required · Free for verified creators' : 'Creator account required · Sign up free'}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom agenda strip */}
      <div style={{
        position: 'relative', zIndex: 2,
        padding: mob ? '12px 22px' : '12px 56px',
        background: 'rgba(0,0,0,0.25)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', gap: mob ? 12 : 28, flexWrap: 'wrap', alignItems: 'center'
      }}>
        {['🤝 Brand Speed-Networking', '🏆 Play Button Ceremony', '🎓 Creator Masterclasses'].map((item, i) => (
          <span key={item} style={{ display: 'flex', alignItems: 'center', gap: i > 0 ? 8 : 0, fontSize: mob ? 10 : 11, color: 'rgba(255,255,255,0.38)', fontWeight: 700 }}>
            {i > 0 && <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'inline-block' }} />}
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
});

SummitBanner.propTypes = { mob: PropTypes.bool, go: PropTypes.func, st: PropTypes.object };

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
      if (isTrending) {
        if (activeIdx >= 0) {
          dsp({ t: 'CF', v: { q: trending[activeIdx] } });
          go('creators');
        }
      }
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
        <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <HeroHeader mob={mob} />
          <HeroCTA mob={mob} go={go} dsp={dsp} />
          <FloatingCreatorIcons mob={mob} />
        </div>
        <HeroValueProps mob={mob} />
        <SearchBar mob={mob} st={st} dsp={dsp} go={go} sugs={sugs} onKeyDown={handleKeyDown} />
        <EcosystemHeader mob={mob} />
        <div style={{ width: '100%', maxWidth: 1200, display: 'grid', gridTemplateColumns: mob ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(320px, 1fr))', gap: mob ? 12 : 32, padding: mob ? '0 16px' : 0, boxSizing: 'border-box' }}>
          {supportFeatures.map((p) => <SupportCard key={p.h} p={p} mob={mob} />)}
        </div>
        <style>{`
          @keyframes slowRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes spinBorder { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
          .hero-primary-btn:hover { background: #138808 !important; box-shadow: 0 12px 32px rgba(19,136,8,0.3) !important; transform: translateY(-2px); }
          .hero-secondary-btn:hover { background: rgba(19,136,8,0.05) !important; border-color: #138808 !important; color: #138808 !important; }
          .hero-secondary-btn:hover .live-dot { background: #138808 !important; animation: pulse-green 1.5s infinite !important; }
          .hero-find-btn:hover { background: #138808 !important; transform: scale(1.02); box-shadow: 0 8px 24px rgba(19,136,8,0.2) !important; }
          .vp-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); border-color: rgba(255,148,49,0.3) !important; }
          .vp-card:hover .vp-line { width: 100% !important; }
          .elite-support-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px -10px rgba(0,0,0,0.08) !important; border-color: rgba(0,0,0,0.1) !important; }
          .elite-support-card:hover .card-hover-bg { opacity: 1 !important; }
          .elite-support-card:hover .card-accent-line { width: 100% !important; }
          ${mob ? '' : '.elite-support-card:hover { transform: translateY(-12px) scale(1.02); box-shadow: 0 32px 80px rgba(0,0,0,0.12); }'}
          .interactive-tour-badge:hover { background: rgba(255,148,49,0.15) !important; border-color: rgba(255,148,49,0.5) !important; transform: translateY(-1px) scale(1.02); }
          .floating-creator-btn:hover { background: #fff !important; border-color: rgba(0, 0, 0, 0.08) !important; box-shadow: 0 16px 36px rgba(0,0,0,0.06) !important; }
          @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
          @media (max-width: 1200px) {
            .floating-creator-icons-container {
              display: none !important;
            }
          }
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
