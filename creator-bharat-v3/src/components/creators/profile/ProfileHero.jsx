import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Download,
  UserPlus,
  UserCheck,
  Activity,
  Zap,
  Briefcase,
  Star,
  MessageSquare,
  Verified,
  ArrowLeft,
  Share2,
  ShieldCheck
} from 'lucide-react';
import { W, fmt } from '@/utils/helpers';
import { Bdg } from '@/components/common/Primitives';

// --- SUB-COMPONENTS ---

const EliteSocialIcon = ({ type, size = 20, color = 'currentColor' }) => {
  const icons = {
    insta: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
    yt: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
    linkedin: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    twitter: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  };
  return icons[type] || icons.insta;
};

const SocialIconsPanel = ({ mob }) => (
  <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', background: 'rgba(0,0,0,0.04)', padding: '10px 20px', borderRadius: '100px', width: 'fit-content', marginTop: mob ? '20px' : '0' }}>
     <EliteSocialIcon type="insta" size={18} color="#E4405F" />
     <EliteSocialIcon type="yt" size={18} color="#FF0000" />
     <EliteSocialIcon type="linkedin" size={18} color="#0077B5" />
     <EliteSocialIcon type="twitter" size={16} color="#000" />
     <div style={{ height: '16px', width: '1px', background: 'rgba(0,0,0,0.1)' }} />
     <Verified size={18} color="#6b7280" />
  </div>
);
SocialIconsPanel.propTypes = { mob: PropTypes.bool };

const HeroKeyAchievements = ({ mob }) => {
  const [active, setActive] = useState(14);
  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => Math.max(8, prev + (Math.random() > 0.5 ? 1 : -1)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', gap: mob ? '10px' : '20px', flexWrap: 'wrap', marginTop: '24px', padding: mob ? '12px' : '20px', background: 'rgba(0,0,0,0.02)', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.03)', width: mob ? '100%' : 'fit-content' }}>
       {[
         { l: '10M+', t: 'Impressions', i: Activity, c: '#FF9431' },
         { l: 'Top 1%', t: 'Engagement', i: Zap, c: '#10B981' },
         { l: mob ? `${active}` : '50+', t: mob ? 'Active Now' : 'Brands', i: mob ? Activity : Briefcase, c: mob ? '#ef4444' : '#3b82f6', pulse: mob }
       ].map(a => (
         <div key={a.t} style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: mob ? '1 1 40%' : 'initial' }}>
            <div style={{ width: '32px', height: '32px', background: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
               <a.i size={16} color={a.c} style={{ animation: a.pulse ? 'pulse 2s infinite' : 'none' }} />
            </div>
            <div>
               <div style={{ fontSize: mob ? '12px' : '13px', fontWeight: 950, color: '#0f172a', lineHeight: 1 }}>{a.l}</div>
               <div style={{ fontSize: '9px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{a.t}</div>
            </div>
         </div>
       ))}
    </div>
  );
};
HeroKeyAchievements.propTypes = { mob: PropTypes.bool };

const ContactMetadata = ({ city, followers, mob, onContact }) => (
  <>
     <div style={{ display: 'flex', flexWrap: 'wrap', gap: mob ? '12px' : '24px', color: '#6b7280', fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} color="#9ca3af" /> {city || 'Bharat'}</div>
        <button 
          onClick={onContact}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0073b1', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '14px', fontWeight: 700 }}
        >
          Contact info
        </button>
     </div>
     <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
        <div style={{ color: '#0073b1', fontWeight: 700, fontSize: '14px' }}>{fmt.num(followers)} followers • 500+ connections</div>
        {!mob && <SocialIconsPanel mob={false} />}
     </div>
  </>
);
ContactMetadata.propTypes = { city: PropTypes.string, followers: PropTypes.number, mob: PropTypes.bool, onContact: PropTypes.func.isRequired };

const IdentityHeader = ({ category, name, mob }) => {
  const catDisplay = Array.isArray(category) ? category.join(' • ') : category;
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #FF9431 0%, #f97316 100%)', 
            color: '#fff', 
            padding: '6px 16px', 
            borderRadius: '100px', 
            fontSize: '11px', 
            fontWeight: 950, 
            textTransform: 'uppercase', 
            letterSpacing: '1.2px',
            boxShadow: '0 4px 12px rgba(255,148,49,0.2)'
          }}>
            {catDisplay || 'Lifestyle & Culture'}
          </div>
          {!mob && (
            <div style={{ 
              background: 'rgba(79, 70, 229, 0.05)', 
              color: '#4f46e5', 
              padding: '6px 16px', 
              borderRadius: '100px', 
              fontSize: '11px', 
              fontWeight: 950, 
              textTransform: 'uppercase', 
              letterSpacing: '1.2px',
              border: '1px solid rgba(79, 70, 229, 0.2)'
            }}>
              ELITE PARTNER
            </div>
          )}
          <div style={{ 
            background: '#ecfdf5', 
            color: '#059669', 
            padding: '6px 16px', 
            borderRadius: '100px', 
            fontSize: '11px', 
            fontWeight: 950, 
            textTransform: 'uppercase', 
            letterSpacing: '1.2px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            border: '1.5px solid #10b98130' 
          }}>
            <div style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '50%', boxShadow: '0 0 8px #10B981', animation: 'pulse 2s infinite' }} /> 
            Available Now
          </div>
       </div>
     <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <h1 style={{ fontSize: mob ? '32px' : '52px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.05em', lineHeight: 1 }}>{name}</h1>
        <div style={{ background: '#0073b1', borderRadius: '50%', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,115,177,0.3)' }}>
          <Verified size={mob ? 20 : 28} color="#fff" fill="currentColor" />
        </div>
     </div>
  </>
  );
};
IdentityHeader.propTypes = { category: PropTypes.any, name: PropTypes.string.isRequired, mob: PropTypes.bool };

const BadgeRow = ({ score }) => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
     <Bdg color="orange" lg style={{ padding: '8px 20px', borderRadius: '100px', fontSize: '11px', border: '1px solid rgba(255,148,49,0.2)' }}>
        <Zap size={14} fill="currentColor" /> {score} ELITE SCORE
     </Bdg>
     <Bdg color="green" lg style={{ padding: '8px 20px', borderRadius: '100px', fontSize: '11px' }}>
        <ShieldCheck size={14} /> VERIFIED PARTNER
     </Bdg>
  </div>
);
BadgeRow.propTypes = { score: PropTypes.number.isRequired };

const RatingSection = ({ val, total, onRate }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
     <div style={{ display: 'flex', gap: '2px' }}>
        {[1,2,3,4,5].map(s => <Star key={s} size={16} fill={s <= Math.floor(val) ? '#FF9431' : 'none'} color={s <= Math.floor(val) ? '#FF9431' : '#cbd5e1'} />)}
     </div>
     <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>{val} <span style={{ color: '#64748b', fontWeight: 600 }}>({total} Reviews)</span></div>
     <button onClick={onRate} style={{ background: 'none', border: 'none', color: '#0073b1', fontSize: '13px', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>Rate This Creator</button>
  </div>
);
RatingSection.propTypes = { val: PropTypes.number.isRequired, total: PropTypes.number.isRequired, onRate: PropTypes.func.isRequired };

const IdentityDetails = ({ c, stats, mob, onRate, onContact, dsp, dlStatus, onDownload }) => {
  let dlIcon;
  if (dlStatus === 'loading') {
    dlIcon = (
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
        <Activity size={18} />
      </motion.div>
    );
  } else if (dlStatus === 'done') {
    dlIcon = <ShieldCheck size={18} />;
  } else {
    dlIcon = <Download size={18} />;
  }

  let dlText = 'Download Media Kit';
  if (dlStatus === 'loading') dlText = 'Preparing Media Kit...';
  else if (dlStatus === 'done') dlText = 'Media Kit Ready';

  return (
    <div style={{ flex: 1 }}>
       <IdentityHeader category={c.category || c.niche} name={c.name} mob={mob} />
       <p style={{ fontSize: mob ? '16px' : '24px', color: '#475569', marginBottom: '24px', fontWeight: 500, lineHeight: 1.5, maxWidth: '850px', letterSpacing: '-0.01em' }}>
          Expert in {c.niche || 'Lifestyle'} Storytelling | Building authentic brand identities across Bharat.
       </p>
       <ContactMetadata city={c.city} followers={stats.followers} mob={mob} onContact={onContact} />
       <BadgeRow score={stats.score || 94} />
       <RatingSection val={4.9} total={24} onRate={onRate} />
       
       <HeroKeyAchievements mob={mob} />

       {mob && (
         <div style={{ marginTop: '24px' }}>
            <button 
              onClick={onDownload}
              disabled={dlStatus === 'loading'}
              style={{ width: '100%', padding: '16px', borderRadius: '100px', background: dlStatus === 'done' ? '#10B981' : '#0f172a', color: '#fff', border: 'none', fontWeight: 900, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 12px 24px rgba(15,23,42,0.2)', transition: 'all 0.3s' }}
            >
               {dlIcon} {dlText}
            </button>
         </div>
       )}
    </div>
  );
};
IdentityDetails.propTypes = { c: PropTypes.object.isRequired, stats: PropTypes.object.isRequired, mob: PropTypes.bool, onRate: PropTypes.func.isRequired, onContact: PropTypes.func.isRequired, dsp: PropTypes.func.isRequired, dlStatus: PropTypes.string, onDownload: PropTypes.func };

const FollowBtn = ({ active, onClick, mob }) => (
  <button 
    onClick={onClick} 
    style={{ 
      flex: mob ? 1 : 'initial', 
      background: active ? '#f8fafc' : '#0f172a', 
      color: active ? '#0f172a' : '#fff', 
      border: active ? '1.5px solid #e2e8f0' : 'none', 
      padding: mob ? '14px 20px' : '16px 48px', 
      borderRadius: '100px', 
      fontSize: mob ? '15px' : '16px', 
      fontWeight: 900, 
      cursor: 'pointer', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: '10px', 
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: active ? 'none' : '0 10px 25px rgba(15,23,42,0.2)',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    }}
  >
    {active ? <UserCheck size={mob ? 18 : 20} /> : <UserPlus size={mob ? 18 : 20} />} {active ? 'Following' : 'Follow Creator'}
  </button>
);
FollowBtn.propTypes = { active: PropTypes.bool, onClick: PropTypes.func.isRequired, mob: PropTypes.bool };

const MessageBtn = ({ onClick, mob }) => (
  <button 
    onClick={onClick} 
    style={{ 
      flex: mob ? 1 : 'initial', 
      background: '#fff', 
      color: '#0073b1', 
      border: '2px solid #0073b1', 
      padding: mob ? '14px 20px' : '16px 48px', 
      borderRadius: '100px', 
      fontSize: mob ? '15px' : '16px', 
      fontWeight: 900, 
      cursor: 'pointer', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: '10px', 
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 10px 25px rgba(0,115,177,0.1)',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    }}
  >
    <MessageSquare size={mob ? 18 : 20} /> Message
  </button>
);
MessageBtn.propTypes = { onClick: PropTypes.func.isRequired, mob: PropTypes.bool };

const ActionButtons = ({ followed, onAction, mob, dsp, dlStatus, onDownload }) => {
  let dlIcon;
  if (dlStatus === 'loading') {
    dlIcon = (
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
        <Activity size={20} />
      </motion.div>
    );
  } else if (dlStatus === 'done') {
    dlIcon = <ShieldCheck size={20} />;
  } else {
    dlIcon = <Download size={20} />;
  }

  let dlText = 'Media Kit';
  if (dlStatus === 'loading') dlText = 'Preparing...';
  else if (dlStatus === 'done') dlText = 'Media Kit Ready';

  return (
    <div style={{ display: 'flex', gap: '12px', width: '100%', alignSelf: 'stretch', flexWrap: 'wrap', marginTop: mob ? '32px' : '0' }}>
       <FollowBtn active={followed} onClick={() => onAction('follow')} mob={mob} />
       <MessageBtn onClick={() => onAction('message')} mob={mob} />
       {!mob && (
          <button 
            onClick={onDownload}
            disabled={dlStatus === 'loading'}
            style={{ 
              background: dlStatus === 'done' ? '#10B98110' : '#f8fafc', 
              color: dlStatus === 'done' ? '#10B981' : '#0f172a', 
              border: dlStatus === 'done' ? '1.5px solid #10B98120' : '1.5px solid #e2e8f0', 
              padding: '16px 32px', 
              borderRadius: '100px', 
              fontSize: '16px', 
              fontWeight: 900, 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              transition: 'all 0.3s'
            }}
          >
             {dlIcon} {dlText}
          </button>
       )}
    </div>
  );
};
ActionButtons.propTypes = { followed: PropTypes.bool, onAction: PropTypes.func.isRequired, mob: PropTypes.bool, dsp: PropTypes.func.isRequired, dlStatus: PropTypes.string, onDownload: PropTypes.func };

const HeroBanner = ({ banner, mob, onBack, onShare }) => (
  <div style={{ height: mob ? '180px' : '300px', background: '#0f172a', position: 'relative', overflow: 'hidden' }}>
     <img src={banner} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }} alt="banner" />
     <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
     <div style={{ position: 'absolute', top: mob ? '16px' : '24px', left: mob ? '16px' : '24px', zIndex: 10 }}>
        <button onClick={onBack} style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: mob ? '8px 16px' : '10px 24px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', backdropFilter: 'blur(12px)', fontSize: mob ? '12px' : '14px', fontWeight: 700 }}>
           <ArrowLeft size={mob ? 16 : 18} /> {mob ? 'Back' : 'Back to Marketplace'}
        </button>
     </div>
     <div style={{ position: 'absolute', top: mob ? '16px' : '24px', right: mob ? '16px' : '24px', zIndex: 10 }}>
        <button onClick={onShare} style={{ background: 'rgba(255,255,255,0.95)', border: 'none', color: '#0f172a', padding: mob ? '8px 16px' : '10px 24px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', backdropFilter: 'blur(12px)', fontSize: mob ? '12px' : '14px', fontWeight: 700, boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
           <Share2 size={mob ? 16 : 18} /> Share
        </button>
     </div>
  </div>
);
HeroBanner.propTypes = { banner: PropTypes.string.isRequired, mob: PropTypes.bool, onBack: PropTypes.func.isRequired, onShare: PropTypes.func.isRequired };

const ProfileImage = ({ src, mob }) => (
  <div style={{ 
    position: 'relative', 
    width: mob ? '120px' : '220px', 
    height: mob ? '120px' : '220px', 
    borderRadius: '50%', 
    padding: mob ? '4px' : '8px',
    background: 'linear-gradient(135deg, #FF9431 0%, #0073b1 100%)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
    flexShrink: 0,
    zIndex: 10
  }}>
     <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#fff', border: mob ? '3px solid #fff' : '6px solid #fff' }}>
        <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="profile" />
     </div>
     <div style={{ 
       position: 'absolute', 
       bottom: mob ? '12px' : '24px', 
       right: mob ? '12px' : '24px', 
       width: mob ? '20px' : '32px', 
       height: mob ? '20px' : '32px', 
       background: '#10B981', 
       border: mob ? '3px solid #fff' : '5px solid #fff', 
       borderRadius: '50%', 
       zIndex: 15, 
       boxShadow: '0 0 15px rgba(16,185,129,0.5)' 
     }} />
  </div>
);
ProfileImage.propTypes = { src: PropTypes.string.isRequired, mob: PropTypes.bool };

const EliteIntelligenceCard = ({ stats, mob }) => {
  const [active, setActive] = useState(14);
  const [views, setViews] = useState(13842);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => Math.max(8, prev + (Math.random() > 0.5 ? 1 : -1)));
      setViews(prev => prev + (Math.random() > 0.8 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 40 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        y: [0, -10, 0] 
      }}
      transition={{
        opacity: { duration: 0.5 },
        x: { duration: 0.5 },
        y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
      }}
      style={{ 
        background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)', 
        borderRadius: '40px', 
        padding: '40px', 
        color: '#fff', 
        boxShadow: '0 40px 80px rgba(15,23,42,0.3)',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        width: '100%',
        maxWidth: '400px'
      }}
    >
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '250px', height: '250px', background: '#FF9431', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.15, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '200px', height: '200px', background: '#3b82f6', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.1, pointerEvents: 'none' }} />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,148,49,0.15)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,148,49,0.2)' }}>
                 <Activity size={20} color="#FF9431" />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 950, textTransform: 'uppercase', letterSpacing: '2px', color: '#94a3b8' }}>Elite Intelligence</span>
           </div>
           <div style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', padding: '6px 12px', borderRadius: '100px', fontSize: '10px', fontWeight: 950, border: '1px solid rgba(16,185,129,0.2)' }}>LIVE</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px' }}>Live Engagement</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
               <div style={{ fontSize: '42px', fontWeight: 950, color: '#fff', lineHeight: 0.9 }}>{active}</div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontSize: '14px', fontWeight: 800, paddingBottom: '4px' }}>
                  <div style={{ width: '10px', height: '10px', background: '#10B981', borderRadius: '50%', boxShadow: '0 0 12px #10B981', animation: 'pulse 2s infinite' }} />
                  Viewing Now
               </div>
            </div>
          </div>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px' }}>Global Visibility</div>
            <div style={{ fontSize: '32px', fontWeight: 950, color: '#fff', marginBottom: '16px', lineHeight: 1 }}>{fmt.num(views)}+ <span style={{ fontSize: '14px', color: '#FF9431', fontWeight: 800, textTransform: 'uppercase' }}>Lifetime</span></div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', overflow: 'hidden' }}>
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: '78%' }}
                 transition={{ duration: 1.5, ease: "easeOut" }}
                 style={{ height: '100%', background: 'linear-gradient(90deg, #FF9431, #f97316)', boxShadow: '0 0 15px rgba(255,148,49,0.3)' }} 
               />
            </div>
          </div>

          <div style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <ShieldCheck size={20} color="#FF9431" />
                <div style={{ fontSize: '13px', fontWeight: 900, color: '#fff' }}>Verified Authority</div>
             </div>
             <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.6, fontWeight: 500 }}>
                This creator ranks in the <b>Top 1%</b> for regional engagement and brand safety across the CreatorBharat network.
             </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
EliteIntelligenceCard.propTypes = { stats: PropTypes.object.isRequired, mob: PropTypes.bool };

// --- MAIN HERO ---

export const ProfileHero = ({ c, stats, navigate, st, dsp, mob, onRate, onContact, onMediaKit }) => {
  const [followed, setFollowed] = useState(false);
  const [dlStatus, setDlStatus] = useState('idle');

  const handleAction = (a) => {
    if (!st?.user) { dsp({ t: 'TOAST', d: { type: 'warn', msg: 'Please login to ' + a } }); return; }
    if (a === 'follow') setFollowed(!followed);
    if (a === 'message') dsp({ t: 'TOAST', d: { type: 'success', msg: 'Opening chat...' } });
    if (a === 'rate') onRate();
  };

  const handleMediaKit = () => {
    setDlStatus('loading');
    dsp({ t: 'TOAST', d: { type: 'info', msg: 'Scanning Social APIs...' } });
    
    setTimeout(() => {
       setDlStatus('done');
       dsp({ t: 'TOAST', d: { 
         type: 'success', 
         msg: 'Media Kit Ready! Click to view.',
         action: { label: 'View Now', onClick: onMediaKit }
       } });
    }, 2500);
  };
  const handleShare = async () => {
    try {
      if (navigator.share) await navigator.share({ title: c.name, url: globalThis.location.href });
      else { await navigator.clipboard.writeText(globalThis.location.href); dsp({ t: 'TOAST', d: { type: 'success', msg: 'Copied!' } }); }
    } catch (e) { console.error(e); }
  };
  const dpImg = c?.photo || c?.avatarUrl || c?.profile_pic || c?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(c?.name || 'C')}&background=FF9431&color=fff&size=200`;
  const bannerImg = c?.cover_image || c?.banner_image || `https://picsum.photos/seed/${c?.id}/1600/500`;
  return (
    <section style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', position: 'relative' }}>
       <HeroBanner banner={bannerImg} mob={mob} onBack={() => navigate('/creators')} onShare={handleShare} />
       <div style={{ ...W(1150), margin: mob ? '-60px auto 0' : '-100px auto 0', padding: mob ? '0 16px 32px' : '0 20px 60px', position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: mob ? 'center' : 'flex-start', textAlign: mob ? 'center' : 'left' }}>
             <div style={{ display: 'flex', alignItems: mob ? 'center' : 'flex-end', gap: '24px', flexDirection: mob ? 'column' : 'row', marginBottom: '12px' }}>
                <ProfileImage src={dpImg} mob={mob} />
                {mob && <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}><SocialIconsPanel mob={true} /></div>}
                {!mob && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ 
                      background: 'rgba(255, 148, 49, 0.08)', 
                      padding: '16px 28px', 
                      borderRadius: '24px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '16px', 
                      border: '1.5px solid rgba(255, 148, 49, 0.2)', 
                      marginBottom: '24px',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 12px 32px rgba(255,148,49,0.08)'
                    }}
                  >
                    <div style={{ background: '#fff', borderRadius: '12px', padding: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                       <ShieldCheck size={28} color="#FF9431" />
                    </div>
                    <div>
                       <div style={{ fontSize: '11px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '2px' }}>CreatorBharat Verified</div>
                       <div style={{ fontSize: '16px', fontWeight: 950, color: '#0f172a', lineHeight: 1.2 }}>Elite Human Authority <span style={{ color: '#FF9431' }}>Confirmed</span></div>
                    </div>
                  </motion.div>
                )}
             </div>
             
             <div style={{ 
               display: 'flex', 
               flexDirection: mob ? 'column' : 'row', 
               gap: '60px', 
               width: '100%', 
               alignItems: 'flex-start',
               marginTop: mob ? '0' : '20px'
             }}>
                <div style={{ flex: 1.6, width: '100%' }}>
                   <IdentityDetails c={c} stats={stats} mob={mob} onRate={() => handleAction('rate')} onContact={onContact} dsp={dsp} />
                   <div style={{ marginTop: '40px' }}>
                      <ActionButtons 
                followed={followed} 
                onAction={handleAction} 
                mob={mob} 
                dsp={dsp} 
                dlStatus={dlStatus}
                onDownload={handleMediaKit}
              />
                   </div>
                </div>

                {!mob && (
                  <div style={{ flex: 1, position: 'sticky', top: '120px' }}>
                     <EliteIntelligenceCard stats={stats} mob={mob} />
                  </div>
                )}
             </div>
          </div>
       </div>
    </section>
  );
};

ProfileHero.propTypes = { 
  c: PropTypes.object.isRequired, 
  stats: PropTypes.object.isRequired, 
  navigate: PropTypes.func.isRequired, 
  st: PropTypes.object.isRequired, 
  dsp: PropTypes.func.isRequired, 
  mob: PropTypes.bool, 
  onRate: PropTypes.func.isRequired, 
  onContact: PropTypes.func.isRequired,
  onMediaKit: PropTypes.func.isRequired
};
