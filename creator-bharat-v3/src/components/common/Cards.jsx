import React from 'react';
import { motion } from 'framer-motion';

import PropTypes from 'prop-types';
import { useApp } from '@/core/context';
import { T } from '@/core/theme';
import { fmt } from '@/utils/helpers';
import { Card, Bdg, Btn, Bar } from './Primitives';
import { Heart, MapPin, Camera, Play, Briefcase, Ghost, AtSign, Smartphone, Check, Scale, Zap, Star } from 'lucide-react';

const ensureArray = val => {
  if (Array.isArray(val)) return val;
  if (!val) return [];
  return [val];
};

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

const CardHeader = ({ coverUrl, id, saved, dsp, mob, tierLabel, requireBrand }) => {
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
          onClick={e => { 
            e.stopPropagation(); 
            if (requireBrand?.()) dsp({ t: 'SAVE', id }); 
          }} 
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
  tierLabel: PropTypes.string,
  requireBrand: PropTypes.func
};

const CreatorIdentity = ({ c, mob, img, score }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: mob ? -24 : -48, marginBottom: mob ? 8 : 12, position: 'relative', zIndex: 2, minWidth: 0 }}>
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
  <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : '1fr 1fr 1fr', gap: mob ? 4 : 12, padding: (mob ? '12px' : '20px') + ' 0', borderTop: '1px dashed rgba(0,0,0,0.08)', marginTop: 'auto', minWidth: 0 }}>
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


const CreatorBio = ({ c, mob }) => (
  <div style={{ marginBottom: mob ? 10 : 16 }}>
    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mob ? 14 : 26, fontWeight: 900, color: '#0F172A', marginBottom: mob ? 2 : 4, letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center', gap: 6 }}>
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

const CreatorFooter = ({ c, mob, compared, onView, dsp, requireBrand }) => (
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
      onClick={e => { 
        e.stopPropagation(); 
        if (requireBrand?.()) dsp?.({ t: 'COMPARE', id: c?.id }); 
      }} 
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
  dsp: PropTypes.func,
  requireBrand: PropTypes.func
};

export function CreatorCard({ creator: c, onView }) {
  const context = useApp();
  const st = context?.st || { saved: [], compared: [] };
  const dsp = context?.dsp;
  const navigate = context?.navigate;

  const requireBrand = () => {
    if (!st.user || st.user?.role !== 'brand') {
      dsp?.({ t: 'TOAST', d: { type: 'error', msg: 'Only Brands can save or compare creators. Please login as a Brand.' } });
      navigate?.('/login');
      return false;
    }
    return true;
  };
  
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
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        padding: mob ? '8px' : '32px',
        minWidth: 0
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
      <CardHeader coverUrl={c.coverUrl} id={c.id} saved={saved} dsp={dsp} mob={mob} tierLabel={tier?.label || 'Rising'} requireBrand={requireBrand} />

      <div style={{ padding: mob ? '0 2px' : '0 24px', flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
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
        {dsp && <CreatorFooter c={c} mob={mob} compared={compared} onView={onView} dsp={dsp} requireBrand={requireBrand} />}
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

export function CampCard({ campaign: c, onApply, isTeaser = false }) {
  const { st, dsp } = useApp();
  const applied = !isTeaser && st.applied.includes(c.id);
  const fillPct = c.slots > 0 ? Math.round((c.filled / c.slots) * 100) : 0;
  const daysLeft = c.deadline ? Math.max(0, Math.ceil((new Date(c.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))) : 7;
  
  const brandName = isTeaser ? 'Verified Premium Brand' : (typeof c.brand === 'object' ? c.brand.companyName : c.brand);
  const brandImg = isTeaser ? 'https://ui-avatars.com/api/?name=V+B&background=f1f5f9&color=111&size=100' : `https://ui-avatars.com/api/?name=${encodeURIComponent(brandName)}&background=f1f5f9&color=111&size=100`;
  
  // High-end Ad Thumbnail Fallback
  const coverImg = c.coverImage || `https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800`;

  return (
    <Card 
      style={{ 
        padding: '0px', display: 'flex', flexDirection: 'column', borderRadius: '32px',
        border: '1px solid rgba(0,0,0,0.05)',
        background: '#fff', 
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)', 
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
        cursor: isTeaser ? 'pointer' : 'default',
        height: '100%'
      }}
      onClick={() => isTeaser && onApply?.(c)}
      onMouseEnter={e => { 
        e.currentTarget.style.transform = 'translateY(-12px) scale(1.01)'; 
        e.currentTarget.style.boxShadow = '0 40px 80px rgba(0,0,0,0.12)'; 
      }}
      onMouseLeave={e => { 
        e.currentTarget.style.transform = 'translateY(0) scale(1)'; 
        e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.03)'; 
      }}
    >
      {/* Cinematic Ad Header (Image) */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
         <img src={coverImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
         <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)' }} />
         
         {/* Ad Badges Over Image */}
         <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px' }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: '#fff', fontSize: '10px', fontWeight: 900, padding: '6px 14px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {ensureArray(c.niche)[0] || 'Exclusive'}
            </div>
            {c.urgent && (
              <div style={{ background: 'rgba(239, 68, 68, 0.9)', color: '#fff', fontSize: '10px', fontWeight: 900, padding: '6px 14px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 4px 10px rgba(239, 68, 68, 0.3)' }}>
                <Zap size={10} fill="#fff" /> ACTIVE NOW
              </div>
            )}
         </div>

         <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
            <button style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
               <Heart size={18} strokeWidth={2.5} />
            </button>
         </div>

         <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 900, color: '#10B981', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
               <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', animation: 'pulse 2s infinite' }} />
               {isTeaser ? 'HIGH-TICKET CAMPAIGN' : 'VERIFIED DEAL'}
            </div>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: 950, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{c.title}</h3>
         </div>
      </div>

      {/* Content Hub */}
      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
         
         {/* Overlapping Brand Logo */}
         <div style={{ position: 'absolute', top: '-32px', right: '24px' }}>
            <div style={{ position: 'relative' }}>
               <img src={brandImg} style={{ width: '64px', height: '64px', borderRadius: '20px', objectFit: 'cover', border: '4px solid #fff', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', background: '#fff' }} alt="" />
               <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '20px', height: '20px', background: '#3B82F6', borderRadius: '50%', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={12} color="#fff" strokeWidth={4} />
               </div>
            </div>
         </div>

         <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 700, marginBottom: '12px' }}>Promoted by <span style={{ color: '#0f172a' }}>{brandName}</span></p>
            <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, fontWeight: 500, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {c.description || c.desc || "Collaborate with this premium brand to create high-impact content for their upcoming launch."}
            </p>
         </div>

         {/* Value Grid */}
         <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '16px', flex: 1, border: '1px solid #f1f5f9' }}>
               <div style={{ fontSize: '10px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Budget</div>
               <div style={{ fontSize: '16px', fontWeight: 950, color: '#10B981' }}>{isTeaser ? '₹15K - 50K' : fmt.inr(c.budgetMin)}</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '16px', flex: 1, border: '1px solid #f1f5f9' }}>
               <div style={{ fontSize: '10px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Platform</div>
               <div style={{ fontSize: '16px', fontWeight: 950, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Camera size={14} color="#E1306C" /> Instagram
               </div>
            </div>
         </div>

         {/* Progress Section */}
         <div style={{ marginTop: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
               <span style={{ fontSize: '12px', fontWeight: 800, color: '#64748b' }}>Selection Status</span>
               <span style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a' }}>{isTeaser ? '6/10 Slots Left' : `${c.slots - c.filled} slots open`}</span>
            </div>
            <Bar value={isTeaser ? 40 : fillPct} color={(isTeaser ? 40 : fillPct) >= 90 ? '#FF9431' : '#3B82F6'} height={6} />
         </div>

         {/* Primary CTA */}
         <div style={{ marginTop: '24px' }}>
            {isTeaser ? (
              <Btn full lg style={{ borderRadius: '100px', padding: '16px', fontSize: '15px', fontWeight: 950, background: 'linear-gradient(90deg, #FF9431 0%, #FFB366 100%)', color: '#fff', border: 'none', boxShadow: '0 10px 20px rgba(255,148,49,0.2)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Join Campaign
              </Btn>
            ) : applied ? (
              <div style={{ background: '#f8fafc', color: '#10B981', padding: '16px', borderRadius: '100px', textAlign: 'center', fontSize: '14px', fontWeight: 950, border: '1px solid #e2e8f0' }}>
                ✓ REQUEST PENDING
              </div>
            ) : (
              <Btn full lg onClick={() => onApply?.(c)} style={{ borderRadius: '100px', padding: '16px', fontSize: '15px', fontWeight: 950, background: '#0f172a', color: '#fff', border: 'none', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Apply to Deal
              </Btn>
            )}
         </div>
      </div>
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
  onApply: PropTypes.func,
  isTeaser: PropTypes.bool
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
