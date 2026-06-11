import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { W } from '../../utils/helpers';
import { X, CheckCircle2, AlertTriangle, ShieldCheck, ChevronLeft, ChevronRight, Wallet, Users, Star, Zap, Trophy, Shield } from 'lucide-react';

const DATA = [
  {
    id: 'problem',
    type: 'problem',
    tag: 'The Core Problem',
    tagColor: '#EF4444',
    tagBg: '#FEF2F2',
    icon: AlertTriangle,
    title: 'Middlemen taking 30% of your hard work.',
    subtitle: 'Ye hain woh 5 cheezein jo every Bharat creator ko rok rahi hain.',
    points: [
      { text: 'Koi verified portfolio nahi — brands ko screenshots bhejni padti hai.', highlight: false },
      { text: 'Agencies 15-30% commission kaat leti hain bina kuch kiye.', highlight: true },
      { text: 'DMs pe chaotic communication, ghosting, aur delayed payments.', highlight: false },
      { text: 'Tier 2 & 3 creators national brands ki radar pe hi nahi hain.', highlight: false },
      { text: 'Payment fraud ka koi protection nahi — paise dub jaate hain.', highlight: true },
    ],
    cardBg: '#fff',
    borderColor: 'rgba(239, 68, 68, 0.2)',
    textColor: '#475569',
    pointIcon: X,
    pointIconBg: '#FEF2F2',
    pointIconColor: '#EF4444'
  },
  {
    id: 'cbscore',
    type: 'fix',
    tag: 'Fix #1 — Trust & Identity',
    tagColor: '#FF9431',
    tagBg: 'rgba(255, 148, 49, 0.08)',
    icon: Star,
    title: 'CB Score + Verified Digital Identity.',
    subtitle: 'India ka pehla creator trust index — 0-100 score jo brands ko instantly sab kuch bata deta hai.',
    points: [
      { text: 'CB Score: Engagement, Deals, Profile & Activity — 4 factors ka combined score.', highlight: true },
      { text: 'Verified Badge milti hai admin review ke baad — real creators only.', highlight: false },
      { text: 'Bharat Creator Card — QR wala digital ID card, offline deals ke liye perfect.', highlight: true },
      { text: 'Public profile page (/creator/:id) — brands directly dekh sakte hain.', highlight: false },
      { text: 'Score filter: Brands "CB Score 80+" set karke verified creators dhundh sakte hain.', highlight: false },
    ],
    cardBg: '#fff',
    borderColor: 'rgba(255, 148, 49, 0.2)',
    textColor: '#475569',
    pointIcon: CheckCircle2,
    pointIconBg: '#FF943115',
    pointIconColor: '#FF9431'
  },
  {
    id: 'earnings',
    type: 'fix',
    tag: 'Fix #2 — Earnings & Growth',
    tagColor: '#10B981',
    tagBg: 'rgba(16, 185, 129, 0.08)',
    icon: Wallet,
    title: '0% Commission. 100% Yours. Always.',
    subtitle: 'Escrow wallet, Play Button milestones, aur monthly missions — creators ke liye complete earning system.',
    points: [
      { text: '0% Commission — jo tumhara hai, 100% tumhara hi rehta hai.', highlight: true },
      { text: 'Escrow Wallet — brand payment pehle lock hoti hai, fraud impossible.', highlight: true },
      { text: 'Play Buttons: Rising (10K) → Bharat (50K) → India Creator (100K) trophies.', highlight: false },
      { text: 'Monthly Missions — tasks complete karo, cashback aur Pro trial pao.', highlight: false },
      { text: 'Direct payout via Razorpay — bank settlement same day.', highlight: false },
    ],
    cardBg: '#0f172a',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    textColor: '#e2e8f0',
    pointIcon: CheckCircle2,
    pointIconBg: '#10B981',
    pointIconColor: '#fff'
  },
  {
    id: 'protection',
    type: 'fix',
    tag: 'Fix #3 — Creator Protection',
    tagColor: '#7C3AED',
    tagBg: 'rgba(124, 58, 237, 0.08)',
    icon: Shield,
    title: 'Creator Union. Har Creator Ki Awaaz.',
    subtitle: 'Account suspend? Payment default? Akele mat lado — CreatorBharat Creator Union tumhare saath hai.',
    points: [
      { text: 'Creator Union — unfair suspensions ke against collective institutional appeals.', highlight: true },
      { text: 'Crisis Alert System — network ke creators coordinated support bhejte hain.', highlight: false },
      { text: 'Brand payment default protection — escrow se guaranteed payout.', highlight: true },
      { text: 'Legal mediation — Meta/YouTube/Google ke saath formal complaint filing.', highlight: false },
      { text: 'Verified creators automatically union mein — koi extra signup nahi.', highlight: false },
    ],
    cardBg: '#fff',
    borderColor: 'rgba(124, 58, 237, 0.2)',
    textColor: '#475569',
    pointIcon: CheckCircle2,
    pointIconBg: '#7C3AED15',
    pointIconColor: '#7C3AED'
  },
  {
    id: 'community',
    type: 'fix',
    tag: 'Fix #4 — Network & Events',
    tagColor: '#3B82F6',
    tagBg: 'rgba(59, 130, 246, 0.08)',
    icon: Users,
    title: 'India\'s Largest Creator Network. Real Events.',
    subtitle: 'Leaderboard, community, co-creation bundles, aur National Summit 2027 — ek poora ecosystem.',
    points: [
      { text: 'Leaderboard — Bharat ke top creators ka real-time ranking system.', highlight: false },
      { text: 'Creator Community — co-creation bundles banao, dusre creators se connect karo.', highlight: true },
      { text: 'CreatorBharat National Summit 2027 — top creators ko free invite + travel.', highlight: true },
      { text: 'Messages — brands aur creators directly baat kar sakte hain (Pro: unlimited).', highlight: false },
      { text: '28 states coverage — Tier 1 se Tier 3 tak India ka sabse bada verified creator network.', highlight: false },
    ],
    cardBg: '#0f172a',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    textColor: '#e2e8f0',
    pointIcon: CheckCircle2,
    pointIconBg: '#3B82F6',
    pointIconColor: '#fff'
  },
];

function CardContent({ c, mob }) {
  const Icon = c.icon;
  const PointIcon = c.pointIcon;
  const isDark = c.cardBg === '#0f172a';
  const accentColor = c.tagColor;

  return (
    <div
      style={{
        padding: mob ? '32px 24px' : '48px 52px',
        borderRadius: 32,
        background: c.cardBg,
        color: isDark ? '#fff' : '#0f172a',
        border: `1px solid ${c.borderColor}`,
        boxShadow: isDark
          ? `0 30px 60px -15px ${accentColor}25`
          : '0 20px 40px -10px rgba(0,0,0,0.04)',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Top accent line */}
      <div style={{ 
        position: 'absolute', top: 0, left: 0, width: '100%', height: 4, 
        background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` 
      }} />

      {/* Glow for dark cards */}
      {isDark && (
        <div style={{ position: 'absolute', top: -80, right: -80, width: 280, height: 280, background: accentColor, filter: 'blur(120px)', opacity: 0.15 }} />
      )}

      {/* Icon */}
      <div style={{ 
        width: 56, height: 56, borderRadius: 18, 
        background: isDark ? `${accentColor}20` : `${accentColor}12`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 
      }}>
        <Icon size={28} color={accentColor} strokeWidth={2.5} />
      </div>

      {/* Tag badge */}
      <div style={{ 
        display: 'inline-flex', alignItems: 'center', gap: 6, 
        padding: '4px 12px', borderRadius: 100, marginBottom: 16,
        background: isDark ? `${accentColor}20` : c.tagBg,
        border: `1px solid ${accentColor}30`,
        width: 'fit-content'
      }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: accentColor }} />
        <span style={{ fontSize: 10, fontWeight: 900, color: accentColor, textTransform: 'uppercase', letterSpacing: '2px' }}>
          {c.tag}
        </span>
      </div>

      <h3 style={{ 
        fontSize: mob ? 22 : 30, fontWeight: 900, marginBottom: 10, lineHeight: 1.2, 
        letterSpacing: '-0.02em', fontFamily: "'Outfit', sans-serif",
        color: isDark ? '#fff' : '#0f172a'
      }}>
        {c.title}
      </h3>

      {c.subtitle && (
        <p style={{ 
          fontSize: mob ? 13 : 15, fontWeight: 500, lineHeight: 1.5, marginBottom: 28,
          color: isDark ? 'rgba(255,255,255,0.55)' : '#64748b'
        }}>
          {c.subtitle}
        </p>
      )}

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, padding: 0, position: 'relative', zIndex: 2, flex: 1 }}>
        {c.points.map((p, i) => {
          const text = typeof p === 'string' ? p : p.text;
          const highlight = typeof p === 'object' && p.highlight;
          return (
            <li key={`${c.id}-p-${i}`} style={{ 
              display: 'flex', gap: 12, alignItems: 'flex-start', 
              fontSize: mob ? 13 : 15, 
              color: highlight 
                ? (isDark ? '#fff' : '#0f172a') 
                : c.textColor, 
              fontWeight: highlight ? 700 : 500, 
              lineHeight: 1.45,
              padding: highlight ? '8px 12px' : '0',
              borderRadius: highlight ? 12 : 0,
              background: highlight ? (isDark ? `${accentColor}15` : `${accentColor}08`) : 'transparent',
              border: highlight ? `1px solid ${accentColor}25` : 'none',
              marginLeft: highlight ? -12 : 0,
            }}>
              <div style={{ 
                width: 20, height: 20, borderRadius: '50%', background: c.pointIconBg, 
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
                boxShadow: isDark ? `0 0 8px ${accentColor}50` : 'none'
              }}>
                <PointIcon size={11} color={c.pointIconColor} strokeWidth={3} />
              </div>
              {text}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

CardContent.propTypes = {
  c: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.elementType,
    pointIcon: PropTypes.elementType,
    cardBg: PropTypes.string,
    borderColor: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    points: PropTypes.array,
    textColor: PropTypes.string,
    pointIconBg: PropTypes.string,
    pointIconColor: PropTypes.string,
    tagColor: PropTypes.string,
    tagBg: PropTypes.string,
    tag: PropTypes.string
  }).isRequired,
  mob: PropTypes.bool
};

export default function Faq({ mob }) {
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [direction, setDirection] = useState('next');

  const goTo = (idx, dir) => {
    if (flipping || idx === current) return;
    setDirection(dir);
    setFlipping(true);
    setTimeout(() => {
      setCurrent(idx);
      setFlipping(false);
    }, 160);
  };

  const next = () => goTo((current + 1) % DATA.length, 'next');
  const prev = () => goTo((current - 1 + DATA.length) % DATA.length, 'prev');

  const getAnimation = () => {
    if (flipping) {
      return direction === 'next' ? 'flipOutLeft 0.16s ease forwards' : 'flipOutRight 0.16s ease forwards';
    }
    return direction === 'next' ? 'flipInRight 0.18s ease forwards' : 'flipInLeft 0.18s ease forwards';
  };

  return (
    <section style={{ padding: mob ? '60px 20px' : '100px 20px', background: '#fdfdfd', position: 'relative', overflow: 'hidden' }}>
      
      <div style={{ position: 'absolute', top: '10%', left: '-10%', width: 500, height: 500, background: 'rgba(239, 68, 68, 0.04)', filter: 'blur(100px)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: 500, height: 500, background: 'rgba(16, 185, 129, 0.04)', filter: 'blur(100px)', borderRadius: '50%' }} />

      <div style={{ ...W(1300), position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: mob ? 48 : 72 }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 20px', 
            background: DATA[current].tagBg, border: `1px solid ${DATA[current].borderColor}`, borderRadius: 100, marginBottom: 24,
            transition: 'all 0.3s'
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: DATA[current].tagColor, boxShadow: `0 0 10px ${DATA[current].tagColor}66` }} />
            <span style={{ fontSize: 12, fontWeight: 900, color: DATA[current].tagColor, textTransform: 'uppercase', letterSpacing: '3px' }}>
              {DATA[current].tag}
            </span>
          </div>
          
          <h2 style={{ 
            fontFamily: "'Outfit', sans-serif", 
            fontSize: mob ? 34 : 68, 
            fontWeight: 900, 
            color: '#0f172a', 
            lineHeight: 1.1, 
            letterSpacing: '-0.04em',
            marginBottom: 20
          }}>
            The Industry is{' '}
            <span style={{ color: '#cbd5e1', textDecoration: 'line-through', textDecorationColor: '#EF4444', textDecorationThickness: '4px' }}>Broken.</span>
            <br />
            <span style={{ background: 'linear-gradient(135deg, #FF9431 0%, #138808 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', paddingRight: '10px' }}>
              We're Fixing it.
            </span>
          </h2>

          <p style={{ fontSize: mob ? 15 : 18, color: '#64748b', fontWeight: 500, maxWidth: 600, margin: '0 auto' }}>
            Ek problem, 4 solutions — CreatorBharat ke har feature ko dekho jo industry ko badal raha hai.
          </p>

          {/* Progress steps — desktop only */}
          {!mob && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginTop: 40 }}>
              {DATA.map((d, i) => (
                <React.Fragment key={d.id}>
                  <button
                    onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                      background: 'none', border: 'none', cursor: 'pointer', padding: '0 16px'
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: i === current ? d.tagColor : i < current ? '#e2e8f0' : '#f1f5f9',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 900,
                      color: i === current ? '#fff' : i < current ? '#94a3b8' : '#cbd5e1',
                      border: i === current ? `2px solid ${d.tagColor}` : '2px solid transparent',
                      boxShadow: i === current ? `0 0 16px ${d.tagColor}50` : 'none',
                      transition: 'all 0.3s'
                    }}>
                      {i === 0 ? '!' : `F${i}`}
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 800, color: i === current ? d.tagColor : '#94a3b8', whiteSpace: 'nowrap', letterSpacing: '0.5px' }}>
                      {i === 0 ? 'PROBLEM' : d.tag.split('—')[1]?.trim() || d.tag}
                    </span>
                  </button>
                  {i < DATA.length - 1 && (
                    <div style={{ width: 40, height: 2, background: i < current ? '#10B981' : '#f1f5f9', transition: 'background 0.3s', flexShrink: 0 }} />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* MOBILE — flip carousel */}
        {mob ? (
          <div style={{ width: '100%' }}>
            <div style={{ perspective: 1000, marginBottom: 24 }}>
              <div style={{ animation: getAnimation() }}>
                <CardContent c={DATA[current]} mob={true} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 8 }}>
               <button aria-label="Previous" onClick={prev} style={{ width: 44, height: 44, borderRadius: '50%', border: '1.5px solid #E2E8F0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                 <ChevronLeft size={20} color="#0f172a" />
               </button>
               <div style={{ display: 'flex', gap: 8 }}>
                 {DATA.map((d, i) => (
                   <button 
                    key={d.id} 
                    aria-label={`Go to ${d.tag}`}
                    onClick={() => goTo(i, i > current ? 'next' : 'prev')} 
                    style={{
                      width: i === current ? 24 : 8, height: 8, borderRadius: 8,
                      background: i === current ? DATA[i].tagColor : '#E2E8F0',
                      transition: 'all 0.3s', cursor: 'pointer', border: 'none', padding: 0
                    }} 
                   />
                 ))}
               </div>
               <button aria-label="Next" onClick={next} style={{ width: 44, height: 44, borderRadius: '50%', border: '1.5px solid #E2E8F0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                 <ChevronRight size={20} color="#0f172a" />
               </button>
            </div>
          </div>
        ) : (
          /* DESKTOP — show current card large + 2 previews */
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }}>
            {/* Main active card */}
            <div style={{ animation: getAnimation() }}>
              <CardContent c={DATA[current]} mob={false} />
            </div>

            {/* Mini preview of other cards */}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${DATA.length}, 1fr)`, gap: 12 }}>
              {DATA.map((d, i) => (
                <button
                  key={d.id}
                  onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                  style={{
                    padding: '16px 20px', borderRadius: 16, border: `1.5px solid ${i === current ? d.tagColor : '#f1f5f9'}`,
                    background: i === current ? d.tagBg : '#fff',
                    cursor: 'pointer', textAlign: 'left',
                    boxShadow: i === current ? `0 4px 20px ${d.tagColor}20` : 'none',
                    transition: 'all 0.25s'
                  }}
                >
                  <div style={{ fontSize: 10, fontWeight: 900, color: i === current ? d.tagColor : '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 6 }}>
                    {i === 0 ? '⚠ Problem' : `✓ ${d.tag.split('—')[1]?.trim() || d.tag}`}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: i === current ? '#0f172a' : '#64748b', lineHeight: 1.3 }}>
                    {d.title.length > 42 ? d.title.slice(0, 42) + '…' : d.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bottom quote */}
        <div style={{ textAlign: 'center', marginTop: mob ? 48 : 64 }}>
           <div style={{ display: 'inline-block', padding: '16px 32px', background: '#fff', border: '1px solid rgba(0,0,0,0.05)', borderRadius: 100, boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
             <p style={{ fontSize: mob ? 14 : 18, fontWeight: 700, color: '#334155', fontStyle: 'italic', margin: 0 }}>
               <span style={{ color: '#FF9431', fontSize: 24, lineHeight: 0, verticalAlign: 'middle' }}>&ldquo;</span>
               {' '}Hum middlemen ko nahi,{' '}
               <strong style={{ color: '#0f172a', fontWeight: 900 }}>talent</strong>{' '}
               ko aage badhana chahte hain.{' '}
               <span style={{ color: '#FF9431', fontSize: 24, lineHeight: 0, verticalAlign: 'middle' }}>&rdquo;</span>
             </p>
           </div>
        </div>

      </div>

      <style>{`
        @keyframes flipOutLeft  { from{opacity:1;transform:rotateY(0deg) scale(1)} to{opacity:0;transform:rotateY(-30deg) scale(0.96)} }
        @keyframes flipOutRight { from{opacity:1;transform:rotateY(0deg) scale(1)} to{opacity:0;transform:rotateY(30deg) scale(0.96)} }
        @keyframes flipInRight  { from{opacity:0;transform:rotateY(20deg) scale(0.96)} to{opacity:1;transform:rotateY(0deg) scale(1)} }
        @keyframes flipInLeft   { from{opacity:0;transform:rotateY(-20deg) scale(0.96)} to{opacity:1;transform:rotateY(0deg) scale(1)} }
      `}</style>
    </section>
  );
}

Faq.propTypes = {
  mob: PropTypes.bool
};
