import React from 'react';
import PropTypes from 'prop-types';
import { T } from '../theme';
export { Button as Btn, Input as Fld, Modal } from './ui';

export function Bdg({ children, color = 'gray', sm }) {
  const m = {
    red: { bg: T.ga, col: T.gd },
    green: { bg: T.okl, col: T.ok },
    yellow: { bg: T.wnl, col: T.wn },
    blue: { bg: T.infol, col: T.info },
    purple: { bg: 'rgba(124,58,237,.1)', col: '#7C3AED' },
    gray: { bg: T.bg3, col: T.t2 },
    gold: { bg: 'rgba(217,119,6,.1)', col: T.gold },
    platinum: { bg: 'rgba(124,58,237,.1)', col: T.platinum },
    silver: { bg: 'rgba(156,163,175,.15)', col: '#6B7280' },
    rising: { bg: 'rgba(107,114,128,.1)', col: '#6B7280' },
    dark: { bg: T.n8, col: '#fff' }
  };
  const c = m[color] || m.gray;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: sm ? '2px 7px' : '3px 10px', borderRadius: 20, background: c.bg, color: c.col, fontSize: sm ? 10 : 11, fontWeight: 700, whiteSpace: 'nowrap' }}>
      {children}
    </span>
  );
}

Bdg.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  sm: PropTypes.bool
};

export function Logo({ sm, light, onClick }) {
  const sz = sm ? 34 : 44;
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag 
      onClick={onClick} 
      className="logo-container" 
      style={{ 
        display: 'flex', alignItems: 'center', gap: sm ? 10 : 14, 
        cursor: onClick ? 'pointer' : 'default', userSelect: 'none', position: 'relative',
        background: 'none', border: 'none', padding: 0, textAlign: 'left'
      }}
    >
      <div style={{ position: 'relative', width: sz, height: sz, borderRadius: '50%', padding: 2, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: sm ? '150%' : '200%', height: sm ? '150%' : '200%', background: 'conic-gradient(from 0deg, #FF9431, #fff, #128807, #fff, #FF9431)', animation: 'spinBorder 4s linear infinite', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '33.33%', background: '#FF9431' }} />
          <div style={{ position: 'absolute', top: '33.33%', left: 0, right: 0, height: '33.34%', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '25%', height: '25%', borderRadius: '50%', border: '1px solid #000080', position: 'relative' }}>
              {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165].map(deg => (
                <div key={deg} style={{ position: 'absolute', top: '50%', left: '50%', width: '100%', height: 1, background: '#000080', transform: `translate(-50%,-50%) rotate(${deg}deg)` }} />
              ))}
            </div>
          </div>
          <div style={{ position: 'absolute', top: '66.67%', left: 0, right: 0, height: '33.33%', background: '#128807' }} />
        </div>
      </div>
      <span className="logo-text-animated" style={{ fontFamily: "'Inter',sans-serif", fontSize: sm ? 19 : 28, fontWeight: 900, letterSpacing: '-0.04em', display: 'flex', alignItems: 'center', color: light ? '#fff' : 'inherit' }}>
        CreatorBharat
      </span>
    </Tag>
  );
}

Logo.propTypes = {
  sm: PropTypes.bool,
  light: PropTypes.bool,
  onClick: PropTypes.func
};

export function SH({ eyebrow, title, sub, center, light, mb = 56 }) {
  const alignment = center ? 'center' : 'left';
  const justify = center ? 'center' : 'flex-start';
  
  return (
    <div style={{ textAlign: alignment, marginBottom: mb, position: 'relative' }}>
      {eyebrow && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: justify, gap: 12, marginBottom: 16 }}>
          <div style={{ width: 32, height: 3, background: T.gd, borderRadius: 4 }} />
          <p style={{ fontSize: 12, fontWeight: 900, letterSpacing: '.15em', textTransform: 'uppercase', color: T.saffron }}>{eyebrow}</p>
        </div>
      )}
      <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(32px,6vw,52px)', fontWeight: 900, color: light ? '#fff' : T.t1, marginBottom: sub ? 20 : 0, lineHeight: 1, letterSpacing: '-0.03em' }}>{title}</h2>
      {sub && <p style={{ fontSize: 18, color: light ? 'rgba(255,255,255,0.6)' : T.t2, maxWidth: center ? 640 : '100%', margin: center ? '0 auto' : '0', lineHeight: 1.6, fontWeight: 500 }}>{sub}</p>}
      {!center && <div style={{ width: 60, height: 4, background: T.ga, marginTop: 24, borderRadius: 2 }} />}
    </div>
  );
}

SH.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  sub: PropTypes.string,
  center: PropTypes.bool,
  light: PropTypes.bool,
  mb: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export function Card({ children, style: sx = {}, onClick, glass }) {
  const base = {
    background: glass ? 'rgba(255,255,255,0.03)' : '#fff',
    backdropFilter: glass ? 'blur(16px)' : 'none',
    border: glass ? '1px solid rgba(255,255,255,0.1)' : `1px solid ${T.bd}`,
    borderRadius: 20,
    boxShadow: T.sh1,
    overflow: 'hidden',
    textAlign: 'left',
    width: '100%',
    position: 'relative',
    ...sx
  };

  return (
    <div 
      className={`cb-card ${glass ? 'cb-card-glass' : ''}`}
      style={base}
    >
      {onClick && (
        <button 
          type="button"
          onClick={onClick}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            background: 'transparent',
            border: 'none',
            padding: 0,
            margin: 0,
            cursor: 'pointer',
            zIndex: 0,
            opacity: 0,
            outline: 'none'
          }}
          aria-label="View Details"
        />
      )}
      
      <div style={{ position: 'relative', zIndex: 1, pointerEvents: 'none', height: '100%' }}>
        <div style={{ pointerEvents: 'auto', height: '100%' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  onClick: PropTypes.func,
  glass: PropTypes.bool
};

export function Stars({ rating, sm }) {
  const sz = sm ? 12 : 16;
  const roundedRating = Math.round(rating);
  
  return (
    <span style={{ display: 'inline-flex', gap: 2, alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width={sz} height={sz} viewBox="0 0 20 20" fill={i <= roundedRating ? '#F59E0B' : '#E5E7EB'}>
          <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.44.91-5.32L2.27 6.62l5.34-.78z" />
        </svg>
      ))}
      {rating > 0 && (
        <span style={{ fontSize: sm ? 11 : 13, color: T.t2, marginLeft: 3, fontWeight: 600 }}>{Number(rating).toFixed(1)}</span>
      )}
    </span>
  );
}

Stars.propTypes = {
  rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sm: PropTypes.bool
};

export function Ring({ score, size = 80 }) {
  const r = 32;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  
  let label = 'Rising';
  let color = T.rising;
  
  if (score >= 91) { label = 'Platinum'; color = T.platinum; }
  else if (score >= 76) { label = 'Gold'; color = T.gold; }
  else if (score >= 51) { label = 'Silver'; color = T.silver; }

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
        <circle cx="40" cy="40" r={r} fill="none" stroke={T.bg3} strokeWidth="6" />
        <circle cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="6" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset .6s' }} />
      </svg>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: size * 0.28, fontWeight: 900, color: color, lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: size * 0.11, color: T.t3, fontWeight: 600, marginTop: 1 }}>{label}</div>
      </div>
    </div>
  );
}

Ring.propTypes = {
  score: PropTypes.number.isRequired,
  size: PropTypes.number
};

export function Bar({ value, max = 100, color, label, showPct, height = 8 }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const barColor = color || T.gd;
  const labelColor = color || T.saffron;

  return (
    <div>
      {(label || showPct) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          {label && <span style={{ fontSize: 12, color: T.t2 }}>{label}</span>}
          {showPct && <span style={{ fontSize: 12, color: labelColor, fontWeight: 700 }}>{pct}%</span>}
        </div>
      )}
      <div style={{ height, background: T.bg3, borderRadius: height, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: pct + '%', background: barColor, borderRadius: height, transition: 'width .6s' }} />
      </div>
    </div>
  );
}

Bar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
  color: PropTypes.string,
  label: PropTypes.string,
  showPct: PropTypes.bool,
  height: PropTypes.number
};

export function SkeletonCard() {
  return (
    <div style={{ background: '#fff', borderRadius: 20, border: `1px solid ${T.bd}`, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ height: 100, background: T.bg3, borderRadius: 12, className: 'skeleton' }} />
      <div style={{ height: 20, width: '70%', background: T.bg3, borderRadius: 4, className: 'skeleton' }} />
      <div style={{ height: 14, width: '40%', background: T.bg3, borderRadius: 4, className: 'skeleton' }} />
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ height: 30, flex: 1, background: T.bg3, borderRadius: 8, className: 'skeleton' }} />
        <div style={{ height: 30, flex: 1, background: T.bg3, borderRadius: 8, className: 'skeleton' }} />
      </div>
    </div>
  );
}

export function Empty({ icon, title, sub, ctaLabel, onCta }) {
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', background: '#fff', borderRadius: 24, border: `1px dashed ${T.bd}` }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontSize: 20, fontWeight: 800, color: T.n8, marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 14, color: T.t3, marginBottom: 24, maxWidth: 300, margin: '0 auto 24px' }}>{sub}</p>
      {ctaLabel && <Btn onClick={onCta}>{ctaLabel}</Btn>}
    </div>
  );
}

Empty.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  sub: PropTypes.string,
  ctaLabel: PropTypes.string,
  onCta: PropTypes.func
};

export function Chip({ label, active, onClick }) {
  return (
    <button 
      onClick={onClick} 
      style={{ 
        padding: '6px 14px', borderRadius: 20, border: `1.5px solid ${active ? T.gd : T.bd}`, 
        background: active ? T.ga : 'transparent', color: active ? T.gd : T.t2, 
        fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all .2s' 
      }}
    >
      {label}
    </button>
  );
}

Chip.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func
};

export function PL({ children, noFooter }) {
  return <div className="page-layout">{children}</div>;
}

PL.propTypes = {
  children: PropTypes.node.isRequired,
  noFooter: PropTypes.bool
};
