import React from 'react';
import PropTypes from 'prop-types';
import { useApp } from '@/core/context';
import { T } from '@/core/theme';
import { fmt } from '@/utils/helpers';
import { Card, Bdg, Btn, Bar } from './Primitives';
import { Heart, MapPin, Camera, Play, Briefcase, Ghost, AtSign, Smartphone, Check, Scale, Zap } from 'lucide-react';

const Sparkline = ({ color }) => (
  <svg width="40" height="16" viewBox="0 0 40 20" fill="none" style={{ opacity: 0.8 }}>
    <path d="M0 15L5 12L10 14L15 8L20 10L25 4L30 7L35 2L40 5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
Sparkline.propTypes = { color: PropTypes.string.isRequired };

const getSocialIcon = p => {
  const pt = p.toLowerCase();
  const props = { size: 14, strokeWidth: 2.5 };
  if (pt.includes('insta')) return <Camera {...props} color="#E1306C" />;
  if (pt.includes('you')) return <Play {...props} color="#FF0000" />;
  if (pt.includes('link')) return <Briefcase {...props} color="#0A66C2" />;
  if (pt.includes('snap')) return <Ghost {...props} color="#FBBF24" />;
  if (pt.includes('x') || pt.includes('twitter')) return <AtSign {...props} color="#1DA1F2" />;
  return <Smartphone {...props} color="#64748B" />;
};

const CardHeader = ({ coverUrl, id, saved, dsp, mob, tierLabel }) => {
  const idHash = id ? id.toString().split('').reduce((a, b) => a + (b.codePointAt(0) || 0), 0) : 0;
  const hue1 = (idHash * 137) % 360;
  const hue2 = (hue1 + 40) % 360;
  const fallbackGradient = `linear-gradient(135deg, hsl(${hue1}, 80%, 90%), hsl(${hue2}, 80%, 80%))`;

  return (
    <div style={{ position: 'relative', height: mob ? 80 : 150, background: fallbackGradient, flexShrink: 0 }}>
      {coverUrl && (
        <img src={coverUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
      )}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
      <div style={{ position: 'absolute', top: mob ? 8 : 12, right: mob ? 8 : 12, display: 'flex', gap: 8 }}>
        <button 
          onClick={e => { e.stopPropagation(); dsp({ t: 'SAVE', id }); }} 
          style={{ 
            background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: mob ? 26 : 36, height: mob ? 26 : 36, 
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
          }}
        >
          <Heart size={mob ? 14 : 18} fill={saved ? '#EF4444' : 'transparent'} color={saved ? '#EF4444' : '#fff'} strokeWidth={2.5} />
        </button>
      </div>
      {!mob && (
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
           <div style={{ 
             background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
             border: '1px solid rgba(255,255,255,0.3)', color: '#fff', 
             padding: '4px 12px', borderRadius: 100, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em'
           }}>
             {tierLabel}
           </div>
        </div>
      )}
    </div>
  );
};

CardHeader.propTypes = {
  coverUrl: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  saved: PropTypes.bool,
  dsp: PropTypes.func.isRequired,
  mob: PropTypes.bool,
  tierLabel: PropTypes.string
};

const CreatorIdentity = ({ c, mob, img, score }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: mob ? -24 : -48, marginBottom: mob ? 8 : 12, position: 'relative', zIndex: 2 }}>
    <div style={{ position: 'relative' }}>
      <img src={img} alt={c.name} style={{ width: mob ? 48 : 96, height: mob ? 48 : 96, borderRadius: mob ? 16 : 28, objectFit: 'cover', border: (mob ? '2px' : '4px') + ' solid #fff', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', backgroundColor: '#fff' }} />
      <div style={{ position: 'absolute', bottom: 2, right: 2, width: mob ? 10 : 16, height: mob ? 10 : 16, background: '#10B981', border: (mob ? '2px' : '3px') + ' solid #fff', borderRadius: '50%', zIndex: 10 }}>
        <div style={{ position: 'absolute', inset: mob ? -2 : -3, borderRadius: '50%', border: '1px solid #10B981', animation: 'pulse-green 2s infinite', opacity: 0.5 }} />
      </div>
      {c.verified && !mob && (
        <div style={{ position: 'absolute', top: 4, right: -4, background: '#3B82F6', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff', zIndex: 6, boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)' }}>
           <Check size={12} color="#fff" strokeWidth={4} />
        </div>
      )}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: mob ? 4 : 8 }}>
      <div style={{ fontSize: mob ? 9 : 11, fontWeight: 700, color: T.t3, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Score</div>
      <div style={{ fontSize: mob ? 14 : 16, fontWeight: 900, color: '#FF9431', background: 'rgba(255,148,49,0.1)', padding: mob ? '2px 8px' : '4px 10px', borderRadius: 12 }}>{score}</div>
    </div>
  </div>
);

CreatorIdentity.propTypes = {
  c: PropTypes.object.isRequired,
  mob: PropTypes.bool,
  img: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired
};

const CreatorStats = ({ c, mob }) => (
  <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : '1fr 1fr 1fr', gap: mob ? 6 : 12, padding: (mob ? '12px' : '20px') + ' 0', borderTop: '1px dashed rgba(0,0,0,0.08)', marginTop: 'auto' }}>
    <div>
      <div style={{ fontSize: mob ? 12 : 18, fontWeight: 900, color: '#0F172A', marginBottom: 2 }}>{fmt.num(c.followers)}</div>
      <div style={{ fontSize: mob ? 8 : 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Followers</div>
    </div>
    <div>
      <div style={{ fontSize: mob ? 12 : 18, fontWeight: 900, color: '#10B981', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
        {c.er || 4.2}%
        {!mob && <Sparkline color="#10B981" />}
      </div>
      <div style={{ fontSize: mob ? 8 : 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Eng. Rate</div>
    </div>
    {!mob && (
      <div>
        <div style={{ fontSize: 18, fontWeight: 900, color: '#0F172A', marginBottom: 2 }}>{fmt.num(Math.floor(c.followers * ((c.er || 4.2) / 100)))}</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Est. Reach</div>
      </div>
    )}
  </div>
);

CreatorStats.propTypes = {
  c: PropTypes.object.isRequired,
  mob: PropTypes.bool
};

const ensureArray = val => {
  if (Array.isArray(val)) return val;
  if (val) return [val];
  return [];
};

const CreatorBio = ({ c, mob }) => (
  <div style={{ marginBottom: mob ? 10 : 16 }}>
    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mob ? 15 : 26, fontWeight: 900, color: '#0F172A', marginBottom: mob ? 2 : 4, letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center', gap: 6 }}>
      {c.name} {mob && c.verified && <Check size={12} color="#3B82F6" strokeWidth={4} style={{ flexShrink: 0 }} />}
    </h3>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <p style={{ fontSize: mob ? 10 : 15, color: '#64748B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
        <MapPin size={mob ? 10 : 14} color="#FF9431" strokeWidth={2.5} style={{ flexShrink: 0 }} /> 
        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{typeof c.city === 'object' ? c.city.name : (c.city || 'Bharat')}</span>
      </p>
    </div>
  </div>
);

CreatorBio.propTypes = {
  c: PropTypes.object.isRequired,
  mob: PropTypes.bool
};

const CreatorFooter = ({ c, mob, compared, onView, dsp }) => (
  <div style={{ display: 'flex', gap: mob ? 6 : 12, marginTop: mob ? 10 : 16, marginBottom: mob ? 12 : 24 }}>
    <button 
      onClick={(e) => { e.stopPropagation(); onView?.(c); }} 
      style={{ 
        flex: 1, borderRadius: 16, fontWeight: 950, fontSize: mob ? 11 : 14, 
        background: '#0f172a', color: '#fff', border: 'none', cursor: 'pointer', 
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', padding: mob ? '10px' : '16px',
        boxShadow: '0 10px 20px rgba(15, 23, 42, 0.1)',
        textTransform: 'uppercase', letterSpacing: '0.05em',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
      }}
      onMouseEnter={e => { 
        e.currentTarget.style.transform = 'translateY(-4px)'; 
        e.currentTarget.style.boxShadow = '0 15px 30px rgba(15, 23, 42, 0.2)';
        e.currentTarget.style.background = '#FF9431'; 
      }}
      onMouseLeave={e => { 
        e.currentTarget.style.transform = 'translateY(0)'; 
        e.currentTarget.style.boxShadow = '0 10px 20px rgba(15, 23, 42, 0.1)';
        e.currentTarget.style.background = '#0f172a'; 
      }}
    >
      <Zap size={mob ? 12 : 16} fill="currentColor" /> {mob ? 'Preview' : 'Quick View'}
    </button>
    <button 
      onClick={e => { e.stopPropagation(); dsp?.({ t: 'COMPARE', id: c?.id }); }} 
      style={{ 
        width: mob ? 36 : 56, height: mob ? 36 : 56, borderRadius: 16, 
        border: '2.5px solid ' + (compared ? '#FF9431' : '#f1f5f9'), 
        background: compared ? 'rgba(255,148,49,0.1)' : '#fff', 
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', 
        transition: 'all 0.3s', color: compared ? '#FF9431' : '#64748B'
      }}
      title="Compare"
      onMouseEnter={e => { if(!compared) { e.currentTarget.style.borderColor = '#FF943140'; e.currentTarget.style.background = '#FF943105'; } }}
      onMouseLeave={e => { if(!compared) { e.currentTarget.style.borderColor = '#f1f5f9'; e.currentTarget.style.background = '#fff'; } }}
    >
      <Scale size={mob ? 16 : 22} color={compared ? "#FF9431" : "#64748B"} strokeWidth={2.5} />
    </button>
  </div>
);

CreatorFooter.propTypes = {
  c: PropTypes.object.isRequired,
  mob: PropTypes.bool,
  compared: PropTypes.bool,
  onView: PropTypes.func,
  dsp: PropTypes.func
};

export function CreatorCard({ creator: c, onView }) {
  const context = useApp();
  const st = context?.st || { saved: [], compared: [] };
  const dsp = context?.dsp;
  
  if (!c) return null;

  const saved = st.saved?.includes(c.id) || false;
  const compared = st.compared?.includes(c.id) || false;
  const score = c.score || fmt.score(c);
  const tier = fmt.tier(score);
  const img = c.photo || c.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name || 'C')}&background=FF9431&color=fff&size=200`;
  const isBrowser = globalThis.window !== undefined;
  const mob = isBrowser && globalThis.window.innerWidth < 768;
  const isMega = (c.followers || 0) >= 100000;
  
  const cp = ensureArray(c.platform);
  const cn = ensureArray(c.niche);

  return (
    <Card 
      onClick={() => onView?.(c)} 
      style={{ 
        height: '100%', display: 'flex', flexDirection: 'column', 
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', 
        border: isMega ? '1px solid rgba(251, 191, 36, 0.5)' : '1px solid rgba(0,0,0,0.04)', 
        borderRadius: mob ? 16 : 32, overflow: 'hidden', background: '#fff',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        const shadow = isMega ? '0 24px 48px rgba(251, 191, 36, 0.15), 0 0 0 1px rgba(251, 191, 36, 0.8)' : '0 24px 48px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.08)';
        e.currentTarget.style.boxShadow = shadow;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
      }}
    >
      <CardHeader coverUrl={c.coverUrl} id={c.id} saved={saved} dsp={dsp} mob={mob} tierLabel={tier?.label || 'Rising'} />

      <div style={{ padding: mob ? '0 10px' : '0 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <CreatorIdentity c={c} mob={mob} img={img} score={score} />
        <CreatorBio c={c} mob={mob} />

        <div style={{ display: 'flex', gap: mob ? 4 : 8, flexWrap: 'wrap', marginBottom: mob ? 12 : 20 }}>
           {cp.slice(0, mob ? 1 : 2).map(p => (
             <div key={p} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: mob ? '2px 6px' : '4px 10px', borderRadius: 100, fontSize: mob ? 9 : 12, fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: mob ? 4 : 6 }}>
               {getSocialIcon(p)} {!mob && <span>{p}</span>}
             </div>
           ))}
           {cn.slice(0, mob ? 1 : 2).map(n => (
             <div key={n} style={{ background: '#FFF7ED', border: '1px solid #FFEDD5', color: '#EA580C', padding: mob ? '2px 6px' : '4px 10px', borderRadius: 100, fontSize: mob ? 9 : 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: mob ? '60px' : 'none' }}>
               {n}
             </div>
           ))}
        </div>
        
        <CreatorStats c={c} mob={mob} />
        {dsp && <CreatorFooter c={c} mob={mob} compared={compared} onView={onView} dsp={dsp} />}
      </div>
    </Card>
  );
}

CreatorCard.propTypes = {
  creator: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string,
    avatarUrl: PropTypes.string,
    coverUrl: PropTypes.string,
    score: PropTypes.number,
    verified: PropTypes.bool,
    city: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    platform: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    niche: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    followers: PropTypes.number,
    er: PropTypes.number
  }).isRequired,
  onView: PropTypes.func
};

export function CampCard({ campaign: c, onApply }) {
  const { st, dsp } = useApp();
  const applied = st.applied.includes(c.id);
  const fillPct = c.slots > 0 ? Math.round((c.filled / c.slots) * 100) : 0;
  const daysLeft = c.deadline ? Math.max(0, Math.ceil((new Date(c.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))) : 7;
  const brandImg = `https://ui-avatars.com/api/?name=${encodeURIComponent(typeof c.brand === 'object' ? c.brand.companyName : c.brand)}&background=f1f5f9&color=111&size=100`;

  return (
    <Card 
      style={{ 
        padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', borderRadius: '32px',
        border: c.urgent ? '1.5px solid rgba(239, 68, 68, 0.2)' : '1px solid #f1f5f9',
        background: '#fff', transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden'
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.06)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {c.urgent && (
        <div style={{ position: 'absolute', top: '16px', right: '-35px', background: '#EF4444', color: '#fff', fontSize: '10px', fontWeight: 900, padding: '4px 40px', transform: 'rotate(45deg)', boxShadow: '0 4px 10px rgba(239, 68, 68, 0.2)' }}>
          URGENT
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
           <img src={brandImg} style={{ width: '56px', height: '56px', borderRadius: '16px', objectFit: 'cover', border: '1px solid #f1f5f9' }} alt="" />
           <div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '20px', fontWeight: 900, color: '#0f172a', lineHeight: 1.2, marginBottom: '4px' }}>{c.title}</h3>
              <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 700 }}>by {typeof c.brand === 'object' ? c.brand.companyName : c.brand}</p>
           </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
         <div style={{ background: '#f8fafc', padding: '12px 20px', borderRadius: '16px', flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase', marginBottom: '4px' }}>Budget</div>
            <div style={{ fontSize: '18px', fontWeight: 950, color: '#10B981' }}>{fmt.inr(c.budgetMin)}</div>
         </div>
         <div style={{ background: '#f8fafc', padding: '12px 20px', borderRadius: '16px', flex: 1 }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase', marginBottom: '4px' }}>Deadline</div>
            <div style={{ fontSize: '18px', fontWeight: 950, color: daysLeft <= 3 ? '#EF4444' : '#0f172a' }}>{daysLeft} Days</div>
         </div>
      </div>

      <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, fontWeight: 500 }}>{c.description || c.desc}</p>

      <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid #f1f5f9' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#64748b' }}>Capacity</span>
            <span style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>{c.filled || 0} applied / {c.slots || 10} slots</span>
         </div>
         <Bar value={fillPct} color={fillPct >= 90 ? '#FF9431' : '#10B981'} height={8} />
      </div>

      {applied ? (
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '16px', borderRadius: '100px', textAlign: 'center', fontSize: '14px', fontWeight: 900 }}>
          APPLICATION SUBMITTED
        </div>
      ) : (
        <Btn onClick={() => onApply?.(c)} style={{ borderRadius: '100px', padding: '16px', fontSize: '15px', fontWeight: 900, background: '#0f172a', color: '#fff' }}>Apply to Campaign</Btn>
      )}
      <div style={{ display: 'none' }}>{dsp && null}</div>
    </Card>
  );
}

CampCard.propTypes = {
  campaign: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    brand: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    description: PropTypes.string,
    desc: PropTypes.string,
    budgetMin: PropTypes.number,
    slots: PropTypes.number,
    filled: PropTypes.number,
    deadline: PropTypes.string,
    urgent: PropTypes.bool,
    niche: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  }).isRequired,
  onApply: PropTypes.func
};

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
        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 900, color: '#111', marginBottom: 12, lineHeight: 1.3 }}>{b.title}</h3>
        <p style={{ fontSize: 14, color: T.t2, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: 20 }}>{b.excerpt}</p>
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8, color: '#FF9431', fontWeight: 800, fontSize: 14 }}>
           Read Full Story <span style={{ fontSize: 18 }}>→</span>
        </div>
      </div>
    </Card>
  );
}

BlogCard.propTypes = {
  article: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    category: PropTypes.string,
    date: PropTypes.string,
    readTime: PropTypes.string,
    excerpt: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func
};
