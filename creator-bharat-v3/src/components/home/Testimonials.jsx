import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { W } from '../../utils/helpers';
import { ShieldCheck, Radio, CreditCard, Search, Send, Check, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const CREATOR_STEPS = [
  { id: 'c1', title: 'Verified Identity', sub: 'Get a premium verified portfolio page that stands out to global brands.', icon: ShieldCheck, color: '#FF9431', bg: 'rgba(255,148,49,0.08)', badge: 'Identity' },
  { id: 'c2', title: 'National Spotlight', sub: 'Be featured in our exclusive podcasts and articles for maximum reach.', icon: Radio, color: '#10B981', bg: 'rgba(19,136,8,0.08)', badge: 'Spotlight' },
  { id: 'c3', title: 'Direct Earnings', sub: 'Collaborate directly with brands and keep 100% of your earnings.', icon: CreditCard, color: '#3B82F6', bg: 'rgba(59,130,246,0.08)', badge: 'Monetize' }
];

const BRAND_STEPS = [
  { id: 'b1', title: 'Smart Discovery', sub: 'Find creators using AI-powered filters for niche, location, and reach.', icon: Search, color: '#FF9431', bg: 'rgba(255,148,49,0.08)', badge: 'Discovery' },
  { id: 'b2', title: 'Direct Access', sub: 'Skip agencies. Connect directly with verified creators for faster deals.', icon: Send, color: '#138808', bg: 'rgba(19,136,8,0.08)', badge: 'Access' },
  { id: 'b3', title: 'Campaign Impact', sub: 'Drive real results with our network of authentic and verified talent.', icon: Check, color: '#3B82F6', bg: 'rgba(59,130,246,0.08)', badge: 'Impact' }
];

function CardContent({ s, i, mob, isHovered }) {
  const Icon = s.icon;
  const borderColor = isHovered ? s.color : 'rgba(0,0,0,0.08)';
  const shadow = isHovered ? `0 32px 64px ${s.color}15` : '0 10px 30px rgba(0,0,0,0.03)';
  const iconShadow = isHovered ? `0 12px 24px ${s.color}20` : 'none';
  const lineWidth = isHovered ? '64px' : '32px';

  return (
    <div className="how-card" style={{
      padding: mob ? '36px 28px' : '56px 44px',
      background: '#fff',
      borderRadius: 36,
      border: `1.5px solid ${borderColor}`,
      boxShadow: shadow,
      position: 'relative',
      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'left',
      overflow: 'hidden'
    }}>
      <div style={{ 
        position: 'absolute', top: -30, right: -30, width: 120, height: 120, 
        background: `radial-gradient(circle, ${s.color}10 0%, transparent 70%)`,
        opacity: isHovered ? 1 : 0.5,
        transition: 'opacity 0.5s'
      }} />

      <div style={{
        position: 'absolute', top: 28, right: 32, fontSize: 36, fontWeight: 900,
        color: 'rgba(0,0,0,0.03)', fontFamily: "'Outfit', sans-serif", fontStyle: 'italic',
        userSelect: 'none'
      }}>
        0{i + 1}
      </div>

      <div style={{
        width: 60, height: 60, borderRadius: 18, background: s.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: s.color, marginBottom: 32,
        boxShadow: iconShadow,
        transition: 'all 0.4s'
      }}>
        <Icon size={30} strokeWidth={2.5} />
      </div>

      <div style={{ 
        display: 'inline-flex', alignItems: 'center', gap: 6, 
        fontSize: 10, fontWeight: 900, color: s.color, 
        textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 12 
      }}>
        <div style={{ width: 4, height: 4, borderRadius: '50%', background: s.color }} />
        {s.badge}
      </div>

      <h3 style={{ 
        fontSize: mob ? 24 : 28, fontWeight: 900, color: '#0f172a', 
        marginBottom: 16, fontFamily: "'Outfit', sans-serif", lineHeight: 1.2
      }}>
        {s.title}
      </h3>
      
      <p style={{ 
        fontSize: mob ? 15 : 16, color: '#64748b', 
        lineHeight: 1.7, fontWeight: 500, margin: 0 
      }}>
        {s.sub}
      </p>

      <div style={{ 
        width: lineWidth, height: 5, background: s.color, 
        marginTop: 'auto', borderRadius: 10,
        transition: 'width 0.4s ease'
      }} />
    </div>
  );
}

CardContent.propTypes = {
  s: PropTypes.shape({
    icon: PropTypes.elementType.isRequired,
    color: PropTypes.string.isRequired,
    bg: PropTypes.string.isRequired,
    badge: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    sub: PropTypes.string.isRequired
  }).isRequired,
  i: PropTypes.number.isRequired,
  mob: PropTypes.bool,
  isHovered: PropTypes.bool
};

function Heading({ mob, activeTab }) {
  const highlight = activeTab === 'creator' ? 'build, spotlight, and monetize' : 'discover, connect, and scale with';
  
  return (
    <div style={{ textAlign: 'center', marginBottom: mob ? 56 : 80 }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 20px',
        background: '#fff', border: '1.5px solid rgba(0,0,0,0.06)', 
        borderRadius: 100, marginBottom: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
      }}>
        <Star size={14} color="#FF9431" fill="#FF9431" />
        <span style={{ fontSize: 12, fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2.5px' }}>Platform Blueprint</span>
      </div>

      <h2 style={{
        fontFamily: "'Outfit', sans-serif", fontSize: mob ? 40 : 72, fontWeight: 900,
        color: '#0f172a', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: 24
      }}>
        The Ecosystem of <br />
        <span style={{ background: 'linear-gradient(135deg, #FF9431, #138808)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Growth.</span>
      </h2>

      <p style={{ fontSize: mob ? 16 : 20, fontWeight: 500, color: '#64748b', maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
        Everything you need to {highlight} your vision in the new Bharat.
      </p>
    </div>
  );
}

Heading.propTypes = {
  mob: PropTypes.bool,
  activeTab: PropTypes.string.isRequired
};

function MobileControls({ steps, current, goTo, prev, next }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
      <button 
        aria-label="Previous slide"
        onClick={prev} 
        style={{ 
          width: 48, height: 48, borderRadius: '50%', border: '1.5px solid #E2E8F0', 
          background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', 
          cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' 
        }}
      >
        <ChevronLeft size={22} color="#0f172a" />
      </button>
      
      <div style={{ display: 'flex', gap: 12 }}>
        {steps.map((step, idx) => (
          <button 
            key={step.id} 
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => goTo(idx, idx > current ? 'next' : 'prev')} 
            style={{
              width: idx === current ? 32 : 12, height: 12, borderRadius: 10, border: 'none',
              background: idx === current ? step.color : '#cbd5e1',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', cursor: 'pointer'
            }} 
          />
        ))}
      </div>

      <button 
        aria-label="Next slide"
        onClick={next} 
        style={{ 
          width: 48, height: 48, borderRadius: '50%', border: '1.5px solid #E2E8F0', 
          background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', 
          cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' 
        }}
      >
        <ChevronRight size={22} color="#0f172a" />
      </button>
    </div>
  );
}

MobileControls.propTypes = {
  steps: PropTypes.array.isRequired,
  current: PropTypes.number.isRequired,
  goTo: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired
};

export default function Testimonials({ mob }) {
  const [activeTab, setActiveTab] = useState('creator');
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [direction, setDirection] = useState('next');
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const steps = activeTab === 'creator' ? CREATOR_STEPS : BRAND_STEPS;

  const goTo = (idx, dir) => {
    if (flipping || idx === current) return;
    setDirection(dir);
    setFlipping(true);
    setTimeout(() => {
      setCurrent(idx);
      setFlipping(false);
    }, 160);
  };

  const handleTabChange = (tab) => {
    if (activeTab === tab) return;
    setActiveTab(tab);
    setCurrent(0);
  };

  const next = () => goTo((current + 1) % steps.length, 'next');
  const prev = () => goTo((current - 1 + steps.length) % steps.length, 'prev');

  const getAnimation = () => {
    if (!flipping) {
      return direction === 'next' ? 'flipInRight 0.18s ease forwards' : 'flipInLeft 0.18s ease forwards';
    }
    return direction === 'next' ? 'flipOutLeft 0.16s ease forwards' : 'flipOutRight 0.16s ease forwards';
  };

  return (
    <section style={{ 
      padding: mob ? '80px 20px' : '120px 20px', 
      background: '#fff', position: 'relative', overflow: 'hidden' 
    }}>
      <div style={{ 
        position: 'absolute', inset: 0, 
        backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', 
        backgroundSize: '40px 40px', opacity: 0.4, pointerEvents: 'none' 
      }} />
      <div style={{ 
        position: 'absolute', top: '15%', right: '-5%', width: 400, height: 400, 
        background: 'radial-gradient(circle, rgba(255,148,49,0.05) 0%, transparent 70%)', 
        filter: 'blur(80px)', pointerEvents: 'none' 
      }} />

      <div style={{ ...W(), maxWidth: 1240, position: 'relative', zIndex: 1 }}>
        <Heading mob={mob} activeTab={activeTab} />

        <div style={{ textAlign: 'center', marginBottom: mob ? 48 : 80 }}>
          <div style={{ display: 'inline-flex', background: '#F1F5F9', padding: 6, borderRadius: 100, position: 'relative', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
            <button
              onClick={() => handleTabChange('creator')}
              style={{
                padding: mob ? '14px 28px' : '16px 48px', borderRadius: 100, border: 'none',
                background: activeTab === 'creator' ? '#0f172a' : 'transparent',
                color: activeTab === 'creator' ? '#fff' : '#64748b',
                fontSize: mob ? 14 : 16, fontWeight: 800, cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 2, boxShadow: activeTab === 'creator' ? '0 10px 20px rgba(15,23,42,0.2)' : 'none'
              }}
            >
              For Creators
            </button>
            <button
              onClick={() => handleTabChange('brand')}
              style={{
                padding: mob ? '14px 28px' : '16px 48px', borderRadius: 100, border: 'none',
                background: activeTab === 'brand' ? '#0f172a' : 'transparent',
                color: activeTab === 'brand' ? '#fff' : '#64748b',
                fontSize: mob ? 14 : 16, fontWeight: 800, cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 2, boxShadow: activeTab === 'brand' ? '0 10px 20px rgba(15,23,42,0.2)' : 'none'
              }}
            >
              For Brands
            </button>
          </div>
        </div>

        {mob ? (
          <div style={{ width: '100%' }}>
            <div style={{ perspective: 1200, marginBottom: 32 }}>
              <div style={{ animation: getAnimation() }}>
                <CardContent s={steps[current]} i={current} mob={true} isHovered={true} />
              </div>
            </div>
            <MobileControls steps={steps} current={current} goTo={goTo} prev={prev} next={next} />
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: 32 }}>
            {steps.map((s, i) => (
              <article 
                key={s.id} 
                onMouseEnter={() => setHoveredIdx(i)} 
                onMouseLeave={() => setHoveredIdx(null)}
                style={{ transform: hoveredIdx === i ? 'translateY(-16px)' : 'none', transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
              >
                <CardContent s={s} i={i} mob={false} isHovered={hoveredIdx === i} />
              </article>
            ))}
          </div>
        )}
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

Testimonials.propTypes = {
  mob: PropTypes.bool
};
