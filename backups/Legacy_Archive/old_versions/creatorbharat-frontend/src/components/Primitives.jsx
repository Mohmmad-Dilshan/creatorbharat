import React, { useState, useEffect } from 'react';
import { T, fmt } from '../theme';

export function Btn({ children, onClick, variant = 'primary', sm, lg, full, disabled, loading, style: sx = {}, href }) {
  const [h, sh] = useState(false);
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontFamily: 'inherit',
    fontWeight: 700,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    border: 'none',
    borderRadius: 12,
    transition: 'all .2s cubic-bezier(0.4,0,0.2,1)',
    textDecoration: 'none',
    fontSize: lg ? 16 : sm ? 12 : 14,
    padding: lg ? '16px 32px' : sm ? '8px 16px' : '12px 24px',
    opacity: disabled ? .55 : 1,
    width: full ? '100%' : 'auto',
    ...sx
  };
  const vs = {
    primary: { background: T.gd, color: '#fff', boxShadow: h ? '0 8px 24px rgba(255,148,49,0.25)' : 'none', transform: h ? 'translateY(-1px)' : 'none' },
    outline: { background: 'transparent', color: T.t1, border: `1.5px solid ${T.bd2}`, boxShadow: h ? T.sh2 : 'none' },
    ghost: { background: h ? T.bg3 : 'transparent', color: T.t2 },
    dark: { background: T.n8, color: '#fff', boxShadow: h ? T.sh3 : 'none' },
    white: { background: '#fff', color: T.t1, boxShadow: T.sh2, transform: h ? 'translateY(-1px)' : 'none' },
    text: { background: 'none', color: T.t1, padding: '0', fontWeight: 700, fontSize: 'inherit' },
    success: { background: T.ok, color: '#fff', boxShadow: h ? '0 8px 24px rgba(16,185,129,0.25)' : 'none' }
  };
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      className="btn-int"
      onClick={onClick}
      disabled={disabled || loading}
      href={href}
      style={{ ...base, ...(vs[variant] || vs.primary) }}
      onMouseEnter={() => sh(true)}
      onMouseLeave={() => sh(false)}
    >
      {loading ? (
        <span className="spin" style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%' }} />
      ) : children}
    </Tag>
  );
}

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

export function Fld({ label, value, onChange, type = 'text', placeholder, options, rows, helper, required, error, sm, readOnly }) {
  const [foc, setFoc] = useState(false);
  const s = {
    width: '100%',
    padding: sm ? '10px 14px' : '14px 18px',
    border: `1.5px solid ${error ? '#EF4444' : foc ? '#FF9431' : T.bd}`,
    borderRadius: 12,
    fontSize: sm ? 13 : 15,
    color: T.n8,
    background: readOnly ? T.bg3 : '#fff',
    transition: 'all .2s cubic-bezier(0.4,0,0.2,1)',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    outline: 'none',
    boxShadow: foc ? `0 0 0 4px ${error ? 'rgba(239,68,68,0.15)' : 'rgba(255,148,49,0.15)'}` : 'none'
  };
  return (
    <div style={{ marginBottom: 18 }}>
      {label && <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 700, color: T.n8, marginBottom: 8 }}>{label}{required && <span style={{ color: '#EF4444' }}>*</span>}</label>}
      {options ? (
        <div style={{ position: 'relative' }}>
          <select value={value} onChange={onChange} onFocus={() => setFoc(true)} onBlur={() => setFoc(false)} style={{ ...s, paddingRight: 40, appearance: 'none', cursor: 'pointer' }}>
            {options.map(o => <option key={typeof o === 'object' ? o.v : o} value={typeof o === 'object' ? o.v : o}>{typeof o === 'object' ? o.l : o}</option>)}
          </select>
          <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: T.t3, fontSize: 10 }}>▼</div>
        </div>
      ) : rows ? (
        <textarea value={value} onChange={onChange} rows={rows} placeholder={placeholder} onFocus={() => setFoc(true)} onBlur={() => setFoc(false)} style={{ ...s, resize: 'vertical' }} readOnly={readOnly} />
      ) : (
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} onFocus={() => setFoc(true)} onBlur={() => setFoc(false)} style={s} readOnly={readOnly} />
      )}
      {error && <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, color: '#EF4444', fontSize: 12, fontWeight: 600 }}><span>⚠️</span> {error}</div>}
      {helper && !error && <div style={{ fontSize: 12, color: T.t3, marginTop: 6 }}>{helper}</div>}
    </div>
  );
}

export function Skeleton({ width = '100%', height = 20, borderRadius = 12, style = {} }) {
  return <div style={{ width, height, borderRadius, background: 'linear-gradient(90deg, #f9f9f9 25%, #ececec 50%, #f9f9f9 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', ...style }} />;
}

export function Ring({ score, size = 80 }) {
  const r = 32, circ = 2 * Math.PI * r, offset = circ - (score / 100) * circ;
  const tier = fmt.tier(score);
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyCenter: 'center' }}>
      <svg width={size} height={size} viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
        <circle cx="40" cy="40" r={r} fill="none" stroke={T.bg3} strokeWidth="6" />
        <circle cx="40" cy="40" r={r} fill="none" stroke={tier.color} strokeWidth="6" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset .6s' }} />
      </svg>
      <div style={{ textAlign: 'center', position: 'absolute' }}>
        <div style={{ fontFamily: "'Fraunces',serif", fontSize: size * 0.28, fontWeight: 900, color: tier.color, lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: size * 0.11, color: T.t3, fontWeight: 600, marginTop: 1 }}>{tier.label}</div>
      </div>
    </div>
  );
}

export function Modal({ open, onClose, title, children, width = 520 }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', zIndex: 8000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, backdropFilter: 'blur(10px)' }}>
      <div className="si" onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 28, width: '100%', maxWidth: width, maxHeight: '90vh', overflowY: 'auto', boxShadow: T.sh4, border: '1px solid rgba(255,255,255,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 32px', borderBottom: `1px solid ${T.bd}`, position: 'sticky', top: 0, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', zIndex: 1 }}>
          <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 900, color: T.n8 }}>{title}</h3>
          <button onClick={onClose} style={{ background: T.bg2, border: 'none', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', fontSize: 20, color: T.t2, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }} onMouseEnter={e => e.target.style.background = T.bg3} onMouseLeave={e => e.target.style.background = T.bg2}>×</button>
        </div>
        <div style={{ padding: '32px' }}>{children}</div>
      </div>
    </div>
  );
}

export function Logo({ sm, light, onClick }) {
  const sz = sm ? 34 : 44;
  return (
    <div onClick={onClick} className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: sm ? 10 : 14, cursor: onClick ? 'pointer' : 'default', userSelect: 'none', position: 'relative' }}>
      <div style={{ position: 'relative', width: sz, height: sz, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '33.33%', background: '#FF9431' }} />
        <div style={{ position: 'absolute', top: '33.33%', left: 0, right: 0, height: '33.34%', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '25%', height: '25%', borderRadius: '50%', border: '1px solid #000080', position: 'relative' }}>
            {[...Array(12)].map((_, i) => <div key={i} style={{ position: 'absolute', top: '50%', left: '50%', width: '100%', height: 1, background: '#000080', transform: `translate(-50%,-50%) rotate(${i * 15}deg)` }} />)}
          </div>
        </div>
        <div style={{ position: 'absolute', top: '66.67%', left: 0, right: 0, height: '33.33%', background: '#128807' }} />
      </div>
      <span className="logo-text-animated" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: sm ? 22 : 28, fontWeight: 900, letterSpacing: '-0.04em', display: 'flex', alignItems: 'center' }}>
        CreatorBharat
      </span>
    </div>
  );
}
