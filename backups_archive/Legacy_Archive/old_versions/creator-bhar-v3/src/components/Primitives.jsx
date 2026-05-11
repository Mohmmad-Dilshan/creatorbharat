import React, { useState } from 'react';
import { T, fmt } from '../theme';

export function Btn({ children, onClick, variant = 'primary', sm, lg, full, disabled, loading, style: sx = {}, href }) {
  const [h, sh] = useState(false);
  const base = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 700, cursor: disabled || loading ? 'not-allowed' : 'pointer', border: 'none', borderRadius: 12, transition: 'all .2s', fontSize: lg ? 16 : sm ? 12 : 14, padding: lg ? '16px 32px' : sm ? '8px 16px' : '12px 24px', width: full ? '100%' : 'auto', textDecoration: 'none', ...sx };
  const vs = {
    primary: { background: T.gd, color: '#fff', transform: h ? 'translateY(-1px)' : 'none' },
    outline: { background: 'transparent', color: T.t1, border: `1.5px solid ${T.bd2}` },
    ghost: { background: h ? T.bg3 : 'transparent', color: T.t2 },
    white: { background: '#fff', color: T.t1, boxShadow: T.sh2 }
  };
  const Tag = href ? 'a' : 'button';
  return <Tag onClick={onClick} disabled={disabled || loading} href={href} style={{ ...base, ...(vs[variant] || vs.primary) }} onMouseEnter={() => sh(true)} onMouseLeave={() => sh(false)}>{loading ? '...' : children}</Tag>;
}

export function Bdg({ children, color = 'gray', sm }) {
  const m = { green: { bg: T.okl, col: T.ok }, gold: { bg: 'rgba(217,119,6,.1)', col: T.gold }, blue: { bg: T.infol, col: T.info }, gray: { bg: T.bg3, col: T.t2 }, purple: { bg: 'rgba(124,58,237,.1)', col: T.platinum } };
  const c = m[color] || m.gray;
  return <span style={{ display: 'inline-flex', alignItems: 'center', padding: sm ? '2px 7px' : '3px 10px', borderRadius: 20, background: c.bg, color: c.col, fontSize: sm ? 10 : 11, fontWeight: 700 }}>{children}</span>;
}

export function Fld({ label, value, onChange, type = 'text', placeholder, rows, required, error, style: sx = {} }) {
  const s = { width: '100%', padding: '14px 18px', border: `1.5px solid ${T.bd}`, borderRadius: 12, fontSize: 15, background: '#fff', outline: 'none', fontFamily: 'inherit', ...sx };
  return (
    <div style={{ marginBottom: 18 }}>
      {label && <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{label}</label>}
      {rows ? <textarea value={value} onChange={onChange} rows={rows} placeholder={placeholder} style={s} /> : <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={s} />}
    </div>
  );
}

export function Ring({ score, size = 80 }) {
  const r = 32, circ = 2 * Math.PI * r, offset = circ - (score / 100) * circ, tier = fmt.tier(score);
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)', position: 'absolute' }}><circle cx="40" cy="40" r={r} fill="none" stroke={T.bg3} strokeWidth="6" /><circle cx="40" cy="40" r={r} fill="none" stroke={tier.color} strokeWidth="6" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" /></svg>
      <div style={{ textAlign: 'center', position: 'absolute' }}><div style={{ fontSize: size * 0.28, fontWeight: 900, color: tier.color }}>{score}</div><div style={{ fontSize: size * 0.11, color: T.t3, fontWeight: 600 }}>{tier.label}</div></div>
    </div>
  );
}

export function Card({ children, style: sx = {}, onClick }) {
  return <div onClick={onClick} style={{ background: '#fff', borderRadius: 24, border: `1px solid ${T.bd}`, transition: 'all .3s', cursor: onClick ? 'pointer' : 'default', overflow: 'hidden', ...sx }}>{children}</div>;
}

export function Bar({ value, color = T.gd, height = 6 }) {
  return <div style={{ width: '100%', height, background: T.bg3, borderRadius: 10, overflow: 'hidden' }}><div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: 10 }} /></div>;
}

export function Logo({ sm, onClick }) {
  const sz = sm ? 34 : 44;
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ width: sz, height: sz, borderRadius: '50%', background: T.gd, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: sz * 0.5 }}>CB</div>
      <span style={{ fontSize: sm ? 20 : 26, fontWeight: 900, letterSpacing: '-0.04em' }}>CreatorBharat</span>
    </div>
  );
}
