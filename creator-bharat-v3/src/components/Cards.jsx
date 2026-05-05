import React from 'react';
import { useApp } from '../context';
import { T } from '../theme';
import { fmt } from '../utils/helpers';
import { Card, Bdg, Btn, Stars, Bar } from './Primitives';

const Sparkline = ({ color }) => (
  <svg width="40" height="16" viewBox="0 0 40 20" fill="none" style={{ opacity: 0.8 }}>
    <path d="M0 15L5 12L10 14L15 8L20 10L25 4L30 7L35 2L40 5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function CreatorCard({ creator: c, onView }) {
  const { st, dsp } = useApp();
  const saved = st.saved.includes(c.id);
  const compared = st.compared.includes(c.id);
  const score = c.score || fmt.score(c);
  const tier = fmt.tier(score);
  const img = c.photo || c.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=FF9431&color=fff&size=200`;
  const mob = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  return (
    <Card onClick={() => onView && onView(c)} style={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)', border: '1px solid rgba(0,0,0,0.04)', borderRadius: mob ? 20 : 24, overflow: 'hidden' }} className="feature-card-h">
      <div style={{ position: 'relative', height: mob ? 120 : 140, background: 'linear-gradient(135deg, #0f172a, #1e293b)', flexShrink: 0 }}>
        {c.coverUrl ? (
          <img src={c.coverUrl} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} alt="" />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,148,49,0.15), transparent)' }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))' }} />
        
        <button 
          onClick={e => { e.stopPropagation(); dsp({ t: 'SAVE', id: c.id }); }} 
          style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: 30, height: 30, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: saved ? '#FF4D4D' : '#fff', fontSize: 14 }}
        >
          {saved ? '❤️' : '🤍'}
        </button>

        {mob && (
          <button 
            onClick={e => { e.stopPropagation(); dsp({ t: 'COMPARE', id: c.id }); }} 
            style={{ 
              position: 'absolute', top: 8, left: 8, 
              background: compared ? '#FF9431' : 'rgba(255,255,255,0.1)', 
              backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              fontSize: 14, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 5
            }}
          >⚖️</button>
        )}

        {c.verified && mob && (
          <div style={{ position: 'absolute', top: 32, left: 24, background: '#3B82F6', width: 14, height: 14, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#fff', border: '2px solid #fff', zIndex: 6 }}>✓</div>
        )}
      </div>

      <div style={{ padding: mob ? '0 16px' : '0 24px', marginTop: mob ? -34 : -40, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: mob ? 12 : 20, position: 'relative', zIndex: 2 }}>
        <img src={img} style={{ width: mob ? 68 : 80, height: mob ? 68 : 80, borderRadius: mob ? 16 : 24, objectFit: 'cover', border: (mob ? '3px' : '4px') + ' solid #fff', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }} alt={c.name} />
        {!mob && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
             <Bdg sm color={tier.bc} style={{ padding: '4px 12px', borderRadius: 100 }}>{tier.label}</Bdg>
             <div style={{ fontSize: 11, fontWeight: 900, color: T.t3, background: 'rgba(0,0,0,0.03)', padding: '2px 8px', borderRadius: 6 }}>SCORE: {score}</div>
          </div>
        )}
      </div>

      <div style={{ padding: mob ? '0 12px 12px' : '0 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: mob ? 15 : 22, fontWeight: 900, color: '#111', marginBottom: 4, letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</h3>
        <p style={{ fontSize: mob ? 11 : 14, color: T.t3, fontWeight: 700, marginBottom: mob ? 12 : 20, display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>📍 {typeof c.city === 'object' ? c.city.name : (c.city || 'Bharat')}</span>
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: mob ? 4 : 12, padding: (mob ? '12px' : '16px') + ' 0', borderTop: '1px solid rgba(0,0,0,0.05)', marginTop: 'auto' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: mob ? 13 : 18, fontWeight: 900, color: '#111' }}>{fmt.num(c.followers)}</div>
            <div style={{ fontSize: mob ? 8 : 10, fontWeight: 800, color: T.t4, textTransform: 'uppercase' }}>Reach</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: mob ? 13 : 18, fontWeight: 900, color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              {c.er || 4.2}%
              {!mob && <Sparkline color="#10B981" />}
            </div>
            <div style={{ fontSize: mob ? 8 : 10, fontWeight: 800, color: T.t4, textTransform: 'uppercase' }}>ER</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: mob ? 13 : 18, fontWeight: 900, color: '#FF9431' }}>{score}</div>
            <div style={{ fontSize: mob ? 8 : 10, fontWeight: 800, color: T.t4, textTransform: 'uppercase' }}>Score</div>
          </div>
        </div>

        {!mob && (
          <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
            <Btn lg full onClick={() => onView && onView(c)} style={{ borderRadius: 100, fontWeight: 900, fontSize: 14 }}>Portfolio</Btn>
            <button 
              onClick={e => { e.stopPropagation(); dsp({ t: 'COMPARE', id: c.id }); }} 
              style={{ width: 44, height: 44, borderRadius: 100, border: '1.5px solid ' + (compared ? '#FF9431' : 'rgba(0,0,0,0.08)'), background: compared ? 'rgba(255,148,49,0.05)' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}
            >⚖️</button>
          </div>
        )}
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
