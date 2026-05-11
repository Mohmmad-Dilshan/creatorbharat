import React from 'react';
import { useApp } from '../context';
import { T, fmt } from '../theme';
import { Card, Bdg, Btn, Bar } from './Primitives';

export function CreatorCard({ creator: c, onView }) {
  const { st, dsp } = useApp();
  const saved = st.saved.includes(c.id);
  const compared = st.compared.includes(c.id);
  const score = c.score || fmt.score(c);
  const tier = fmt.tier(score);
  const niches = Array.isArray(c.niche) ? c.niche : [c.niche].filter(Boolean);
  const platforms = Array.isArray(c.platform) ? c.platform : [c.platform].filter(Boolean);
  const img = c.photo || c.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=FF9431&color=fff&size=200`;

  return (
    <Card onClick={e => { e.stopPropagation(); onView && onView(c) }} style={{ display: 'flex', flexDirection: 'column', border: `1.5px solid ${compared ? T.gd : T.bd}`, background: '#fff' }}>
      <div style={{ position: 'relative', height: 120, background: `linear-gradient(135deg,${T.n8},${T.n7})`, flexShrink: 0, overflow: 'hidden' }}>
        {c.coverUrl ? <img src={c.coverUrl} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} alt="" /> : <div style={{ width: '100%', height: '100%', background: T.gd, opacity: 0.1 }} />}
        <button onClick={e => { e.stopPropagation(); dsp({ t: 'SAVE', id: c.id }) }} style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', border: 'none', borderRadius: 12, width: 40, height: 40, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: saved ? T.gd : T.t3, fontSize: 20, boxShadow: T.sh2, transition: 'all .2s' }}>{saved ? '❤️' : '♡'}</button>
        {c.verified && <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(59,130,246,0.95)', color: '#fff', fontSize: 10, fontWeight: 900, padding: '5px 12px', borderRadius: 20, backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: 6, letterSpacing: '.05em' }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M20 6L9 17l-5-5" /></svg> VERIFIED</div>}
      </div>

      <div style={{ padding: '0 24px 24px', marginTop: -48, position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyBetween: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
          <div style={{ position: 'relative' }}>
            <img src={img} style={{ width: 96, height: 96, borderRadius: 28, objectFit: 'cover', border: '4px solid #fff', boxShadow: T.sh3, background: T.bg2 }} alt={c.name} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: '50%', background: tier.color, border: '3px solid #fff', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontSize: 11, fontWeight: 900, color: '#fff', boxShadow: T.sh2 }}>{score}</div>
          </div>
          <div style={{ paddingBottom: 8 }}><Bdg color={tier.bc}>{tier.label}</Bdg></div>
        </div>

        <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 20, fontWeight: 900, color: T.t1, marginBottom: 4, lineHeight: 1.2 }}>{c.name}</h3>
        <p style={{ fontSize: 14, color: T.t3, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}>📍 {c.city}{c.state ? `, ${c.state}` : ''}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24, padding: '16px', background: T.bg2, borderRadius: 20, border: `1px solid ${T.bd}` }}>
          {[[fmt.num(c.followers), 'Followers'], [(c.er || 0) + '%', 'Eng.'], [fmt.inr(c.rateMin), 'Min Rate']].map(([v, l], i) => (
            <div key={l} style={{ textAlign: 'center', borderRight: i < 2 ? `1px solid ${T.bd}` : 'none' }}>
              <div style={{ fontSize: 16, fontWeight: 900, color: T.t1, fontFamily: "'Fraunces',serif" }}>{v}</div>
              <div style={{ fontSize: 10, color: T.t4, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {niches.slice(0, 2).map(n => <span key={n} style={{ fontSize: 11, fontWeight: 800, color: T.gd, background: 'rgba(255,148,49,0.08)', padding: '5px 12px', borderRadius: 12 }}>{n}</span>)}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <Btn full variant="primary" style={{ borderRadius: 14, height: 48 }}>View Profile</Btn>
        </div>
      </div>
    </Card>
  );
}

export function CampCard({ campaign: c, onApply }) {
  const { st, dsp } = useApp();
  const applied = st.applied.includes(c.id);
  const niches = Array.isArray(c.niche) ? c.niche : [c.niche].filter(Boolean);
  const platforms = Array.isArray(c.platform) ? c.platform : [c.platform].filter(Boolean);
  const daysLeft = c.deadline ? Math.max(0, Math.ceil((new Date(c.deadline) - new Date()) / (1000 * 60 * 60 * 24))) : null;
  const fillPct = c.slots > 0 ? Math.round((c.filled / c.slots) * 100) : 0;

  return (
    <Card style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 24, border: `1.5px solid ${applied ? T.ok : T.bd}`, position: 'relative' }}>
      {c.urgent && <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,148,49,0.1)', color: T.gd, fontSize: 10, fontWeight: 900, padding: '6px 14px', borderRadius: 20, border: `1px solid rgba(255,148,49,0.2)`, letterSpacing: '.05em' }}>URGENT</div>}
      <div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {niches.slice(0, 2).map(n => <Bdg key={n} sm color="gray">{n}</Bdg>)}
        </div>
        <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 900, color: T.t1, lineHeight: 1.2, marginBottom: 10 }}>{c.title}</h3>
        <p style={{ fontSize: 15, color: T.gd, fontWeight: 800 }}>🏢 {typeof c.brand === 'object' ? c.brand.companyName : c.brand}</p>
      </div>
      <div style={{ background: T.bg2, padding: '20px', borderRadius: 20, display: 'flex', justifyBetween: 'space-between', alignItems: 'center', border: `1px solid ${T.bd}` }}>
        <div>
          <div style={{ fontSize: 11, color: T.t4, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 4 }}>Budget</div>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: 20, fontWeight: 900, color: T.ok }}>{fmt.inr(c.budgetMin)} - {fmt.inr(c.budgetMax)}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: T.t4, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 4 }}>Deadline</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: daysLeft <= 7 ? T.gd : T.t1 }}>{daysLeft} days left</div>
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', justifyBetween: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: T.t3, fontWeight: 700 }}>Applications: {c.filled}/{c.slots}</span>
          <span style={{ fontSize: 13, fontWeight: 900, color: fillPct >= 80 ? T.gd : T.ok }}>{fillPct}% Full</span>
        </div>
        <Bar value={fillPct} color={fillPct >= 80 ? T.gd : T.ok} height={8} />
      </div>
      <div style={{ display: 'flex', justifyBetween: 'space-between', alignItems: 'center', marginTop: 8, paddingTop: 24, borderTop: `1px solid ${T.bd}` }}>
        {applied ? <Bdg color="green">Application Sent</Bdg> : <Btn onClick={onApply} style={{ borderRadius: 14 }}>Apply Now</Btn>}
      </div>
    </Card>
  );
}
