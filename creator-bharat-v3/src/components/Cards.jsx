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
  const img = c.photo || c.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=FF9431&color=fff&size=200`;

  return (
    <Card onClick={() => onView && onView(c)} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', height: 110, background: 'linear-gradient(135deg, #050505, #111)', flexShrink: 0 }}>
        {c.coverUrl ? (
          <img src={c.coverUrl} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} alt="" />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,148,49,0.1), transparent)' }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))' }} />
        
        <button 
          onClick={e => { e.stopPropagation(); dsp({ t: 'SAVE', id: c.id }); }} 
          style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: saved ? '#FF4D4D' : '#fff', fontSize: 16, transition: 'all 0.2s' }}
        >
          {saved ? '❤️' : '🤍'}
        </button>

        {c.verified && (
          <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: 100, display: 'flex', alignItems: 'center', gap: 4 }}>
             <span style={{ color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: '0.5px' }}>VERIFIED</span>
             <span style={{ color: '#2563EB', fontSize: 12 }}>✓</span>
          </div>
        )}
      </div>

      <div style={{ padding: '0 20px', marginTop: -32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16, position: 'relative', zIndex: 2 }}>
        <img src={img} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '4px solid #fff', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }} alt={c.name} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
           <Bdg sm color={tier.bc}>{tier.label}</Bdg>
           <div style={{ fontSize: 10, fontWeight: 800, color: T.t3 }}>SCORE: {score}</div>
        </div>
      </div>

      <div style={{ padding: '0 20px', flex: 1 }}>
        <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 900, color: '#111', marginBottom: 4, letterSpacing: '-0.02em' }}>{c.name || 'Anonymous Creator'}</h3>
        <p style={{ fontSize: 13, color: T.t3, fontWeight: 600, marginBottom: 16 }}>📍 {typeof c.city === 'object' ? c.city.name : (c.city || 'Bharat')} • {(Array.isArray(c.niche) ? c.niche : [c.niche || 'Digital Creator']).slice(0, 2).join(' & ')}</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, padding: '16px 0', borderTop: '1px solid rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.04)', marginBottom: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: '#111' }}>{fmt.num(c.followers)}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.t4, textTransform: 'uppercase' }}>Reach</div>
          </div>
          <div style={{ textAlign: 'center', borderLeft: '1px solid rgba(0,0,0,0.05)', borderRight: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: '#10B981' }}>{c.er || 4.2}%</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.t4, textTransform: 'uppercase' }}>ER</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: '#FF9431' }}>{fmt.inr(c.rateMin)}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.t4, textTransform: 'uppercase' }}>Min Rate</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px 20px', display: 'flex', gap: 10 }}>
        <Btn full onClick={() => onView && onView(c)} style={{ borderRadius: 100 }}>View Portfolio</Btn>
        <button 
          onClick={e => { e.stopPropagation(); dsp({ t: 'COMPARE', id: c.id }); }} 
          style={{ width: 44, height: 44, borderRadius: '50%', border: '1.5px solid ' + (compared ? '#FF9431' : 'rgba(0,0,0,0.08)'), background: compared ? 'rgba(255,148,49,0.05)' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, transition: 'all 0.2s' }}
          title="Compare Profile"
        >
          {compared ? '⚖️' : '⚖️'}
        </button>
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
    <Card style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
            {c.urgent && <Bdg sm color="red">URGENT</Bdg>}
            {(Array.isArray(c.niche) ? c.niche : [c.niche]).map(n => <Bdg key={n} sm color="blue">{n}</Bdg>)}
          </div>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 900, color: '#111', lineHeight: 1.2 }}>{c.title}</h3>
          <p style={{ fontSize: 14, color: T.t3, fontWeight: 700, marginTop: 6 }}>{typeof c.brand === 'object' ? c.brand.companyName : c.brand}</p>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: '#10B981' }}>{fmt.inr(c.budgetMin)}</div>
          <div style={{ fontSize: 11, color: T.t4, fontWeight: 700 }}>Starting Budget</div>
        </div>
      </div>

      <p style={{ fontSize: 14, color: T.t2, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{c.description || c.desc}</p>
      
      <div style={{ background: 'rgba(0,0,0,0.02)', borderRadius: 16, padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: T.t3 }}>Campaign Progress</span>
          <span style={{ fontSize: 12, fontWeight: 800, color: fillPct >= 100 ? T.gd : '#111' }}>{c.filled || 0} / {c.slots || 10} Creators</span>
        </div>
        <Bar value={fillPct} color={fillPct >= 90 ? T.gd : '#10B981'} height={6} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 14 }}>⏳</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: daysLeft <= 3 ? '#EF4444' : T.t3 }}>{daysLeft} days left</span>
        </div>
        {applied ? (
          <Bdg color="green">APPLICATION SENT</Bdg>
        ) : (
          <Btn onClick={() => onApply && onApply(c)} style={{ borderRadius: 100, padding: '10px 24px' }}>Apply to Campaign</Btn>
        )}
      </div>
    </Card>
  );
}

export function BlogCard({ article: b, onClick }) {
  return (
    <Card onClick={onClick} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 220, overflow: 'hidden', position: 'relative' }}>
         <img src={b.image} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} alt={b.title} onMouseEnter={e => e.target.style.transform = 'scale(1.1)'} onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
         <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
            <Bdg color="dark">{b.category}</Bdg>
         </div>
      </div>
      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: 12, fontWeight: 800, color: T.t3, marginBottom: 8 }}>{fmt.date(b.date)} • {b.readTime}</p>
        <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 900, color: '#111', marginBottom: 12, lineHeight: 1.3 }}>{b.title}</h3>
        <p style={{ fontSize: 14, color: T.t2, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: 20 }}>{b.excerpt}</p>
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8, color: '#FF9431', fontWeight: 800, fontSize: 14 }}>
           Read Full Story <span style={{ fontSize: 18 }}>→</span>
        </div>
      </div>
    </Card>
  );
}
