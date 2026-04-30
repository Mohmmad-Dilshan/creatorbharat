import React from 'react';
import { useApp } from '../context';
import { T, fmt } from '../theme';
import { Card, Bdg, Btn, Stars, Bar } from './Primitives';

export function CreatorCard({ creator: c, onView }) {
  const { st, dsp } = useApp();
  const saved = st.saved.includes(c.id);
  const compared = st.compared.includes(c.id);
  const score = c.score || fmt.score(c);
  const tier = fmt.tier(score);
  const img = c.photo || c.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=DC2626&color=fff&size=200`;

  return (
    <Card onClick={e => { e.stopPropagation(); onView && onView(c); }} style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', height: 80, background: `linear-gradient(135deg, ${T.gd}, #7C3AED)`, flexShrink: 0 }}>
        {c.coverUrl && <img src={c.coverUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />}
        <button onClick={e => { e.stopPropagation(); dsp({ t: 'SAVE', id: c.id }); }} style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,.5)', border: 'none', borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: saved ? '#F87171' : '#fff', fontSize: 14 }}>{saved ? '♥' : '♡'}</button>
        {c.trending && <span style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,.6)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>Trending</span>}
      </div>
      <div style={{ padding: '0 14px', marginTop: -22, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 }}>
        <img src={img} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '3px solid #fff', boxShadow: T.sh2 }} alt={c.name} />
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {c.verified && <Bdg sm color="blue">Verified</Bdg>}
          <Bdg sm color={tier.bc}>{tier.label}</Bdg>
        </div>
      </div>
      <div style={{ padding: '0 14px', flex: 1 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: T.n8, marginBottom: 2 }}>{c.name}</h3>
        <p style={{ fontSize: 12, color: T.t3, marginBottom: 8 }}>{c.city}{c.state ? `, ${c.state}` : ''} • {(Array.isArray(c.niche) ? c.niche : [c.niche]).slice(0, 2).join(', ')}</p>
        <div style={{ display: 'flex', gap: 14, marginBottom: 10, flexWrap: 'wrap' }}>
          {[[fmt.num(c.followers), 'Followers'], [c.er + '%', 'ER'], [fmt.inr(c.rateMin), 'Min Rate']].map(([v, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: T.n8, fontFamily: "'Fraunces',serif" }}>{v}</div>
              <div style={{ fontSize: 10, color: T.t3 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '10px 14px 14px', display: 'flex', gap: 8 }}>
        <Btn full sm>View Profile</Btn>
        <button onClick={e => { e.stopPropagation(); dsp({ t: 'COMPARE', id: c.id }); }} style={{ padding: '6px 12px', borderRadius: 8, border: `1.5px solid ${compared ? T.gd : T.bd}`, background: compared ? T.ga : 'transparent', color: compared ? T.gd : T.t2, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>{compared ? 'Added' : 'Compare'}</button>
      </div>
    </Card>
  );
}

export function CampCard({ campaign: c, onApply }) {
  const { st, dsp } = useApp();
  const applied = st.applied.includes(c.id);
  const fillPct = c.slots > 0 ? Math.round((c.filled / c.slots) * 100) : 0;
  const daysLeft = c.deadline ? Math.max(0, Math.ceil((new Date(c.deadline) - new Date()) / (1000 * 60 * 60 * 24))) : null;

  return (
    <Card style={{ padding: '18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, gap: 10 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 6 }}>
            {c.urgent && <Bdg sm color="red">Urgent</Bdg>}
            {(Array.isArray(c.niche) ? c.niche : [c.niche]).slice(0, 2).map(n => <Bdg key={n} sm>{n}</Bdg>)}
          </div>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: T.n8, lineHeight: 1.3 }}>{c.title}</h3>
          <p style={{ fontSize: 13, color: T.gd, fontWeight: 600, marginTop: 4 }}>{c.brand}</p>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: 16, fontWeight: 900, color: T.ok }}>{fmt.inr(c.budgetMin)}</div>
          <div style={{ fontSize: 11, color: T.t3 }}>to {fmt.inr(c.budgetMax)}</div>
        </div>
      </div>
      <p style={{ fontSize: 13, color: T.t2, lineHeight: 1.55, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{c.description}</p>
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><span style={{ fontSize: 12, color: T.t2 }}>Slots</span><span style={{ fontSize: 12, fontWeight: 700, color: fillPct >= 100 ? T.gd : T.ok }}>{c.filled}/{c.slots}</span></div>
        <Bar value={fillPct} color={fillPct >= 80 ? T.gd : T.ok} height={5} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
        {daysLeft !== null && <span style={{ fontSize: 12, color: daysLeft <= 7 ? T.gd : T.t3, fontWeight: daysLeft <= 7 ? 700 : 400 }}>{daysLeft}d left</span>}
        {applied ? <Bdg color="green">Applied</Bdg> : <Btn sm onClick={() => onApply && onApply(c)}>Apply Now</Btn>}
      </div>
    </Card>
  );
}

export function BlogCard({ article: b, onClick }) {
  return (
    <Card onClick={onClick} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <img src={b.image} style={{ width: '100%', height: 200, objectFit: 'cover' }} alt={b.title} />
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <Bdg sm color="orange">{b.category}</Bdg>
          <span style={{ fontSize: 11, color: T.t3 }}>{fmt.date(b.date)}</span>
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: T.n8, marginBottom: 8, lineHeight: 1.4 }}>{b.title}</h3>
        <p style={{ fontSize: 13, color: T.t2, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: 16 }}>{b.excerpt}</p>
        <div style={{ marginTop: 'auto', fontSize: 13, fontWeight: 700, color: T.gd }}>Read Article →</div>
      </div>
    </Card>
  );
}

export function NewsletterForm() {
  const [e, se] = React.useState('');
  return (
    <div style={{ display: 'flex', gap: 10, maxWidth: 400, margin: '0 auto' }}>
      <input value={e} onChange={ev => se(ev.target.value)} placeholder="your@email.com" style={{ flex: 1, padding: '12px 16px', borderRadius: 12, border: '1px solid ' + T.bd, outline: 'none' }} />
      <Btn onClick={() => { alert('Subscribed!'); se(''); }}>Notify Me</Btn>
    </div>
  );
}
