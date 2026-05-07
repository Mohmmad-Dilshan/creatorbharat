import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { W } from '../../utils/helpers';
import { X, CheckCircle2, AlertTriangle, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

const DATA = [
  {
    id: 'problem',
    type: 'problem',
    tag: 'The Core Problem',
    tagColor: '#EF4444',
    tagBg: '#FEF2F2',
    icon: AlertTriangle,
    title: 'Middlemen taking 30% of your hard work.',
    points: [
      'No formal portfolio. Pitching via messy screenshots.',
      'Agencies eating up to 30% of your hard-earned money.',
      'Unprofessional communication & ghosting via chaotic DMs.',
      'Tier 2 & 3 talent being completely ignored by national brands.',
      'High risk of payment delays and agency frauds.'
    ],
    cardBg: '#fff',
    borderColor: 'rgba(239, 68, 68, 0.2)',
    textColor: '#475569',
    pointIcon: X,
    pointIconBg: '#FEF2F2',
    pointIconColor: '#EF4444'
  },
  {
    id: 'mission',
    type: 'mission',
    tag: 'The Fix',
    tagColor: '#10B981',
    tagBg: 'rgba(16, 185, 129, 0.1)',
    icon: ShieldCheck,
    title: 'Empowering the Real Bharat Creator.',
    points: [
      'Smart Media Kit (Your elite, verified SaaS portfolio).',
      '0% Commission. You keep exactly 100% of your earnings.',
      'Formal dashboard for professional & safe brand deals.',
      'National spotlight and premium visibility for local talent.',
      'Direct connections with top brands—no middlemen.'
    ],
    cardBg: '#0f172a',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    textColor: '#e2e8f0',
    pointIcon: CheckCircle2,
    pointIconBg: '#10B981',
    pointIconColor: '#fff'
  }
];

function CardContent({ c, mob }) {
  const Icon = c.icon;
  const PointIcon = c.pointIcon;
  const isMission = c.type === 'mission';

  return (
    <div
      style={{
        padding: mob ? '32px 24px' : '56px',
        borderRadius: 32,
        background: c.cardBg,
        color: isMission ? '#fff' : '#0f172a',
        border: `1px solid ${c.borderColor}`,
        boxShadow: isMission ? '0 30px 60px -15px rgba(16, 185, 129, 0.15)' : '0 20px 40px -10px rgba(239, 68, 68, 0.05)',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ 
        position: 'absolute', top: 0, left: 0, width: '100%', height: 4, 
        background: `linear-gradient(90deg, transparent, ${isMission ? '#10B981' : '#EF4444'}, transparent)` 
      }} />

      {isMission && (
        <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, background: '#10B981', filter: 'blur(120px)', opacity: 0.2 }} />
      )}

      <div style={{ width: 64, height: 64, borderRadius: 20, background: isMission ? 'rgba(16, 185, 129, 0.15)' : '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
        <Icon size={32} color={isMission ? '#10B981' : '#EF4444'} strokeWidth={2.5} />
      </div>

      <h3 style={{ fontSize: mob ? 24 : 36, fontWeight: 900, marginBottom: 32, lineHeight: 1.2, letterSpacing: '-0.02em', fontFamily: "'Outfit', sans-serif" }}>
        {c.title}
      </h3>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 20, padding: 0, position: 'relative', zIndex: 2 }}>
        {c.points.map((p, i) => (
          <li key={`${c.id}-p-${i}`} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: mob ? 14 : 17, color: c.textColor, fontWeight: isMission ? 500 : 600, lineHeight: 1.4 }}>
            <div style={{ 
              width: 20, height: 20, borderRadius: '50%', background: c.pointIconBg, 
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2,
              boxShadow: isMission ? '0 0 8px rgba(16, 185, 129, 0.4)' : 'none'
            }}>
              <PointIcon size={12} color={c.pointIconColor} strokeWidth={3} />
            </div>
            {p}
          </li>
        ))}
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
    points: PropTypes.arrayOf(PropTypes.string),
    textColor: PropTypes.string,
    pointIconBg: PropTypes.string,
    pointIconColor: PropTypes.string
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
      
      <div style={{ position: 'absolute', top: '10%', left: '-10%', width: 500, height: 500, background: 'rgba(239, 68, 68, 0.05)', filter: 'blur(100px)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: 500, height: 500, background: 'rgba(16, 185, 129, 0.05)', filter: 'blur(100px)', borderRadius: '50%' }} />

      <div style={{ ...W(1200), position: 'relative', zIndex: 1 }}>
        
        <div style={{ textAlign: 'center', marginBottom: mob ? 48 : 80 }}>
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
            fontSize: mob ? 36 : 72, 
            fontWeight: 900, 
            color: '#0f172a', 
            lineHeight: 1.1, 
            letterSpacing: '-0.04em'
          }}>
            The Industry is <span style={{ color: '#cbd5e1', textDecoration: 'line-through', textDecorationColor: '#EF4444', textDecorationThickness: '4px' }}>Broken.</span> <br />
            <span style={{ background: 'linear-gradient(135deg, #FF9431 0%, #138808 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', paddingRight: '10px' }}>We're Fixing it.</span>
          </h2>
        </div>

        {mob ? (
          <div style={{ width: '100%' }}>
            <div style={{ perspective: 1000, marginBottom: 24 }}>
              <div style={{ animation: getAnimation() }}>
                <CardContent c={DATA[current]} mob={true} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
               <button aria-label="Previous slide" onClick={prev} style={{ width: 44, height: 44, borderRadius: '50%', border: '1.5px solid #E2E8F0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                 <ChevronLeft size={20} color="#0f172a" />
               </button>
               
               <div style={{ display: 'flex', gap: 10 }}>
                 {DATA.map((_, i) => (
                   <button 
                    key={DATA[i].id} 
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => goTo(i, i > current ? 'next' : 'prev')} 
                    style={{
                      width: i === current ? 24 : 10, height: 10, borderRadius: 10,
                      background: i === current ? DATA[i].tagColor : '#E2E8F0',
                      transition: 'all 0.3s', cursor: 'pointer', border: 'none', padding: 0
                    }} 
                   />
                 ))}
               </div>

               <button aria-label="Next slide" onClick={next} style={{ width: 44, height: 44, borderRadius: '50%', border: '1.5px solid #E2E8F0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                 <ChevronRight size={20} color="#0f172a" />
               </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'stretch' }}>
            {DATA.map((c) => (
              <CardContent key={c.id} c={c} mob={false} />
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: mob ? 60 : 80 }}>
           <div style={{ display: 'inline-block', padding: '16px 32px', background: '#fff', border: '1px solid rgba(0,0,0,0.05)', borderRadius: 100, boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
             <p style={{ fontSize: mob ? 15 : 20, fontWeight: 700, color: '#334155', fontStyle: 'italic', margin: 0 }}>
               <span style={{ color: '#FF9431', fontSize: 24, lineHeight: 0, verticalAlign: 'middle' }}>&ldquo;</span> Hum middlemen ko nahi, <strong style={{ color: '#0f172a', fontWeight: 900 }}>talent</strong> ko aage badhana chahte hain. <span style={{ color: '#FF9431', fontSize: 24, lineHeight: 0, verticalAlign: 'middle' }}>&rdquo;</span>
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
