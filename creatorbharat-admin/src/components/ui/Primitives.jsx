import React from 'react';
import { Search } from 'lucide-react';

// ─── Design tokens ───────────────────────────────────────────────────────────
export const T = {
  orange: '#f97316', orangeLight: 'rgba(249,115,22,0.08)', orangeBorder: 'rgba(249,115,22,0.2)',
  blue: '#3b82f6', blueLight: 'rgba(59,130,246,0.08)',
  green: '#22c55e', greenLight: 'rgba(34,197,94,0.08)',
  purple: '#8b5cf6', purpleLight: 'rgba(139,92,246,0.08)',
  red: '#ef4444', redLight: 'rgba(239,68,68,0.08)',
  yellow: '#f59e0b', yellowLight: 'rgba(245,158,11,0.08)',
  teal: '#14b8a6', tealLight: 'rgba(20,184,166,0.08)',
  navy: '#0f172a', slate: '#475569', muted: '#64748b', border: '#e2e8f0',
  bg: '#f1f5f9', card: '#ffffff',
  // Sidebar dark theme
  sidebarBg: '#0f172a',
  sidebarBorder: 'rgba(255,255,255,0.06)',
  sidebarText: 'rgba(255,255,255,0.65)',
  sidebarTextActive: '#ffffff',
  sidebarActiveGlow: 'rgba(249,115,22,0.15)',
};

// ─── Helper formatters ────────────────────────────────────────────────────────
export const fmtINR = (n) => `\u20B9${Number(n || 0).toLocaleString('en-IN')}`;
export const fmtNum = (n) => Number(n || 0).toLocaleString('en-IN');
export const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '\u2014';

// ─── Badge ────────────────────────────────────────────────────────────────────
export const Badge = ({ color = T.orange, children, size = 'sm' }) => (
  <span style={{
    padding: size === 'sm' ? '2px 8px' : '4px 12px',
    background: color + '15',
    color,
    borderRadius: 20,
    fontSize: size === 'sm' ? 10 : 12,
    fontWeight: 800,
    border: `1px solid ${color}25`,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    whiteSpace: 'nowrap'
  }}>{children}</span>
);

// ─── StatCard ─────────────────────────────────────────────────────────────────
export const StatCard = ({ label, value, sub, icon: Icon, color, onClick, trend, trendUp }) => (
  <div onClick={onClick} style={{
    background: T.card, border: `1px solid ${T.border}`, borderRadius: 18, padding: '20px 22px',
    display: 'flex', flexDirection: 'column', gap: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    cursor: onClick ? 'pointer' : 'default', transition: 'all 0.22s', position: 'relative', overflow: 'hidden'
  }}
    onMouseEnter={e => { if(onClick){ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow=`0 8px 24px ${color}18`; e.currentTarget.style.borderColor=color+'35'; } }}
    onMouseLeave={e => { if(onClick){ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 1px 4px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor=T.border; } }}
  >
    <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: color + '08' }} />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: color + '12', color, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${color}18` }}><Icon size={20} /></div>
      {trend && (
        <span style={{ fontSize: 11, fontWeight: 800, color: trendUp ? T.green : T.red, background: (trendUp ? T.green : T.red)+'12', padding: '3px 8px', borderRadius: 20 }}>
          {trendUp ? '\u2191' : '\u2193'} {trend}
        </span>
      )}
    </div>
    <div>
      <div style={{ fontSize: 28, fontWeight: 900, color: T.navy, lineHeight: 1, marginBottom: 4, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      <div style={{ fontSize: 12, color: T.slate, fontWeight: 700 }}>{label}</div>
      {sub && <div style={{ fontSize: 10, color: T.muted, marginTop: 4, fontWeight: 500, lineHeight: 1.4 }}>{sub}</div>}
    </div>
  </div>
);

// ─── SectionHeader ────────────────────────────────────────────────────────────
export const SectionHeader = ({ title, sub, action, badge }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: T.navy }}>{title}</h3>
        {badge !== undefined && badge > 0 && (
          <span style={{ padding: '2px 10px', background: T.orange + '15', color: T.orange, borderRadius: 20, fontSize: 11, fontWeight: 800 }}>{badge}</span>
        )}
      </div>
      {sub && <p style={{ margin: '4px 0 0', fontSize: 13, color: T.muted, fontWeight: 500 }}>{sub}</p>}
    </div>
    {action}
  </div>
);

// ─── SearchBar ────────────────────────────────────────────────────────────────
export const SearchBar = ({ value, onChange, placeholder }) => (
  <div style={{ position: 'relative', marginBottom: 20 }}>
    <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: T.muted }} />
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || 'Search...'} style={{
      width: '100%', padding: '10px 14px 10px 40px', border: `1px solid ${T.border}`,
      borderRadius: 12, fontSize: 13, color: T.navy, background: '#fff', outline: 'none', boxSizing: 'border-box'
    }} />
  </div>
);

// ─── EmptyState ───────────────────────────────────────────────────────────────
export const EmptyState = ({ icon, msg }) => (
  <div style={{ padding: '60px 0', textAlign: 'center', color: T.muted }}>
    <div style={{ fontSize: 40, marginBottom: 12 }}>{icon || '\uD83D\uDCED'}</div>
    <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{msg || 'No data available'}</p>
  </div>
);

// ─── ActionBtn ────────────────────────────────────────────────────────────────
export const ActionBtn = ({ onClick, color = T.orange, children, small }) => (
  <button onClick={onClick} style={{
    padding: small ? '5px 12px' : '7px 16px', background: color + '12', color, border: `1px solid ${color}25`,
    borderRadius: 8, fontSize: small ? 11 : 12, fontWeight: 700, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 5, transition: 'all 0.15s', whiteSpace: 'nowrap'
  }}>{children}</button>
);

// ─── DangerBtn ────────────────────────────────────────────────────────────────
export const DangerBtn = ({ onClick, children, small }) => (
  <button onClick={onClick} style={{
    padding: small ? '5px 12px' : '7px 16px', background: T.red + '10', color: T.red, border: `1px solid ${T.red}25`,
    borderRadius: 8, fontSize: small ? 11 : 12, fontWeight: 700, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 5
  }}>{children}</button>
);

// ─── TableHead ────────────────────────────────────────────────────────────────
export const TableHead = ({ cols }) => (
  <thead>
    <tr style={{ borderBottom: `1px solid ${T.border}` }}>
      {cols.map((c, i) => (
        <th key={i} style={{ padding: '12px 16px', textAlign: typeof c === 'object' ? c.align || 'left' : 'left', color: T.muted, fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {typeof c === 'object' ? c.label : c}
        </th>
      ))}
    </tr>
  </thead>
);

// ─── Table ────────────────────────────────────────────────────────────────────
export const Table = ({ cols, children, style }) => (
  <div style={{ overflowX: 'auto', ...style }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
      <TableHead cols={cols} />
      <tbody>{children}</tbody>
    </table>
  </div>
);

// ─── Td ───────────────────────────────────────────────────────────────────────
export const Td = ({ children, right, bold, muted, style }) => (
  <td style={{ padding: '14px 16px', textAlign: right ? 'right' : 'left', color: muted ? T.muted : bold ? T.navy : T.slate, fontWeight: bold ? 700 : 500, ...style }}>{children}</td>
);
