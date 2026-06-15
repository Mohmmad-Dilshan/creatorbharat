import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Download,
  UserPlus,
  UserCheck,
  Activity,
  Zap,
  Star,
  MessageSquare,
  Verified,
  ArrowLeft,
  Share2,
  ShieldCheck,
  Eye,
  Heart,
  Sparkles,
  TrendingUp,
  Users
} from 'lucide-react';
import { W, fmt } from '@/utils/helpers';
import { Bdg } from '@/components/common/Primitives';

// --- SUB-COMPONENTS ---

const EliteSocialIcon = ({ type, size = 20, color = 'currentColor' }) => {
  const icons = {
    insta: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
    yt: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
    linkedin: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    twitter: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    fb: <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 2.537-5.75 5.23-5.75 1.291 0 2.397.096 2.72.139v3.159h-1.87c-1.98 0-2.61.98-2.61 2.508v2.524h3.667l-.612 3.667h-3.055v7.98h-3.554z"/></svg>
  };
  return icons[type] || icons.insta;
};

const SocialIconsPanel = ({ c, mob }) => {
  if (!c) return null;
  const links = {
    insta: c.instagram ? (c.instagram.startsWith('http') ? c.instagram : `https://instagram.com/${c.instagram.replace(/^@/, '')}`) : null,
    yt: c.youtube ? (c.youtube.startsWith('http') ? c.youtube : `https://youtube.com/${c.youtube}`) : null,
    linkedin: c.linkedin ? (c.linkedin.startsWith('http') ? c.linkedin : `https://linkedin.com/in/${c.linkedin}`) : null,
    twitter: c.twitter ? (c.twitter.startsWith('http') ? c.twitter : `https://twitter.com/${c.twitter.replace(/^@/, '')}`) : null,
    fb: c.facebook ? (c.facebook.startsWith('http') ? c.facebook : `https://facebook.com/${c.facebook}`) : null
  };

  const renderIcon = (type, defaultColor) => {
    const url = links[type];
    const icon = <EliteSocialIcon type={type} size={18} color={url ? defaultColor : '#9ca3af'} />;
    if (url) {
      return (
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          title={`Open ${type}`}
          style={{ display: 'flex', alignItems: 'center', transition: 'transform 0.2s', cursor: 'pointer' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {icon}
        </a>
      );
    }
    return (
      <div style={{ opacity: 0.35, display: 'flex', alignItems: 'center', cursor: 'not-allowed' }} title={`${type} not linked`}>
        {icon}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', background: 'rgba(0,0,0,0.04)', padding: '10px 20px', borderRadius: '100px', width: 'fit-content', marginTop: mob ? '20px' : '0' }}>
       {renderIcon('insta', '#E4405F')}
       {renderIcon('yt', '#FF0000')}
       {renderIcon('linkedin', '#0077B5')}
       {renderIcon('twitter', '#000')}
       {renderIcon('fb', '#1877F2')}
       <div style={{ height: '16px', width: '1px', background: 'rgba(0,0,0,0.1)' }} />
       <Verified size={18} color="#6b7280" />
    </div>
  );
};
SocialIconsPanel.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool };

const HeroKeyAchievements = ({ mob, activeUsers, activeViews, likes, isLiked, onLike }) => {
  const items = [
    { l: activeViews ? fmt.num(activeViews) : '13,842', t: 'Total Profile Visitor', i: Eye, c: '#FF9431' },
    { l: likes ? fmt.num(likes) : '1,242', t: 'Likes', i: Heart, c: '#ef4444', fill: isLiked ? '#ef4444' : 'none', onClick: onLike },
    { l: `${activeUsers || 14}`, t: 'Active Now', i: Activity, c: '#10B981', pulse: true }
  ];

  return (
    <div style={{ 
      display: 'flex', 
      gap: mob ? '12px' : '24px', 
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: '24px', 
      padding: mob ? '16px 20px' : '20px 32px', 
      background: 'linear-gradient(135deg, rgba(255,148,49,0.06) 0%, rgba(255,92,0,0.06) 100%)', 
      borderRadius: '24px', 
      border: '1.5px solid rgba(255,148,49,0.12)', 
      width: '100%',
      boxShadow: '0 8px 30px rgba(0,0,0,0.02)'
    }}>
       {items.map(a => {
         const content = (
           <>
             <div style={{ 
               width: mob ? '28px' : '36px', 
               height: mob ? '28px' : '36px', 
               background: '#fff', 
               borderRadius: '10px', 
               display: 'flex', 
               alignItems: 'center', 
               justifyContent: 'center', 
               boxShadow: '0 6px 16px rgba(0,0,0,0.04)',
               flexShrink: 0
             }}>
                <a.i size={mob ? 14 : 18} color={a.c} fill={a.fill || 'none'} style={{ animation: a.pulse ? 'pulse 2s infinite' : 'none' }} />
             </div>
             <div>
                <div style={{ fontSize: mob ? '14px' : '18px', fontWeight: 950, color: '#0f172a', lineHeight: 1.1 }}>{a.l}</div>
                <div style={{ fontSize: mob ? '8px' : '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{a.t}</div>
             </div>
           </>
         );

         if (a.onClick) {
           return (
             <button 
               key={a.t} 
               onClick={a.onClick} 
               style={{ 
                 display: 'flex', 
                 alignItems: 'center', 
                 gap: mob ? '8px' : '12px', 
                 cursor: 'pointer', 
                 userSelect: 'none', 
                 transition: 'transform 0.2s',
                 background: 'none',
                 border: 'none',
                 padding: 0,
                 textAlign: 'left'
               }} 
               className="hover-scale-stat"
             >
                {content}
             </button>
           );
         }

         return (
           <div 
             key={a.t} 
             style={{ 
               display: 'flex', 
               alignItems: 'center', 
               gap: mob ? '8px' : '12px', 
               userSelect: 'none', 
               transition: 'transform 0.2s' 
             }}
           >
              {content}
           </div>
         );
       })}
    </div>
  );
};

HeroKeyAchievements.propTypes = {
  mob: PropTypes.bool,
  activeUsers: PropTypes.number,
  activeViews: PropTypes.number,
  likes: PropTypes.number,
  isLiked: PropTypes.bool,
  onLike: PropTypes.func
};

const ContactMetadata = ({ c, followers, mob, onContact }) => {
  const fullAddress = c.address || (c.city && c.state ? `${c.city}, ${c.state}, Bharat` : (c.city || 'Bharat'));
  return (
    <>
       <div style={{ display: 'flex', flexWrap: 'wrap', gap: mob ? '12px' : '24px', color: '#6b7280', fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} color="#9ca3af" /> {fullAddress}</div>
          <button 
            onClick={onContact}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0073b1', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '14px', fontWeight: 700 }}
          >
            Contact info
          </button>
       </div>
       <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
          <div style={{ color: '#0073b1', fontWeight: 700, fontSize: '14px' }}>{fmt.num(followers)} followers • {c.connections || '500+'} connections</div>
          {!mob && <SocialIconsPanel c={c} mob={false} />}
       </div>
    </>
  );
};
ContactMetadata.propTypes = { c: PropTypes.object.isRequired, followers: PropTypes.number, mob: PropTypes.bool, onContact: PropTypes.func.isRequired };

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
     <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
        {total > 0 ? (
           <>{val} <span style={{ color: '#64748b', fontWeight: 600 }}>({total} Reviews)</span></>
        ) : (
           <span style={{ color: '#64748b', fontWeight: 600 }}>0.0 (No Reviews Yet)</span>
        )}
     </div>
     <button onClick={onRate} style={{ background: 'none', border: 'none', color: '#0073b1', fontSize: '13px', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>Rate This Creator</button>
  </div>
);
RatingSection.propTypes = { val: PropTypes.number.isRequired, total: PropTypes.number.isRequired, onRate: PropTypes.func.isRequired };

const IdentityDetails = ({ c, stats, mob, onRate, onContact, dsp, dlStatus, onDownload, activeUsers, activeViews, likes, isLiked, onLike }) => {
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

  const reviews = c.reviews || [
     { b: 'OYO Rooms', r: 5, t: 'Absolute professional. The Jaipur heritage campaign delivered 4x the expected engagement.', u: 'Brand Manager', d: '2 weeks ago', type: 'brand', id: 'oyo' },
     { b: 'Rohan Sharma', r: 5, t: 'The cultural storytelling in the summer drop was raw and authentic. Highly recommended!', u: 'Travel Creator', d: '1 month ago', type: 'creator', id: 'rohan' },
     { b: 'Amazon Bharat', r: 4, t: 'Great content quality. Revision process was smooth and delivery was on time.', u: 'Marketing Lead', d: '3 months ago', type: 'brand', id: 'amazon' }
  ];
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((sum, rev) => sum + rev.r, 0) / totalReviews).toFixed(1)
    : '5.0';

  return (
    <div style={{ flex: 1 }}>
       <IdentityHeader category={c.category || c.niche} name={c.name} mob={mob} />
       <p style={{ fontSize: mob ? '16px' : '24px', color: '#475569', marginBottom: '16px', fontWeight: 500, lineHeight: 1.5, maxWidth: '850px', letterSpacing: '-0.01em' }}>
          {c.tagline || `Expert in ${Array.isArray(c.niche) ? c.niche[0] : (c.niche || 'Lifestyle')} Storytelling | Building authentic brand identities across Bharat.`}
       </p>
       {c.bio && (
         <p style={{ fontSize: mob ? '14px' : '16px', color: '#64748b', marginBottom: '24px', lineHeight: 1.6, maxWidth: '850px' }}>
           {c.bio}
         </p>
       )}
       <ContactMetadata c={c} followers={stats.followers} mob={mob} onContact={onContact} />
       <BadgeRow score={stats.score || 94} />
       <RatingSection 
          val={Number(averageRating)} 
          total={totalReviews} 
          onRate={onRate} 
       />
       
       <HeroKeyAchievements mob={mob} activeUsers={activeUsers} activeViews={activeViews} likes={likes} isLiked={isLiked} onLike={onLike} />

       {mob && (
         <div style={{ marginTop: '24px' }}>
            <button 
              onClick={onDownload}
              disabled={dlStatus === 'loading'}
              style={{ width: '100%', padding: '16px', borderRadius: '100px', background: dlStatus === 'done' ? '#10B981' : '#0f172a', color: '#fff', border: 'none', fontWeight: 950, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 12px 24px rgba(15,23,42,0.2)', transition: 'all 0.3s' }}
            >
               {dlIcon} {dlText}
            </button>
         </div>
       )}
    </div>
  );
};
IdentityDetails.propTypes = { 
  c: PropTypes.object.isRequired, 
  stats: PropTypes.object.isRequired, 
  mob: PropTypes.bool, 
  onRate: PropTypes.func.isRequired, 
  onContact: PropTypes.func.isRequired, 
  dsp: PropTypes.func.isRequired, 
  dlStatus: PropTypes.string, 
  onDownload: PropTypes.func,
  activeUsers: PropTypes.number,
  activeViews: PropTypes.number,
  likes: PropTypes.number,
  isLiked: PropTypes.bool,
  onLike: PropTypes.func
};

const FollowBtn = ({ active, onClick, mob }) => (
  <button 
    onClick={onClick} 
    style={{ 
      flex: mob ? 1 : 'initial', 
      background: active ? '#f8fafc' : '#0f172a', 
      color: active ? '#0f172a' : '#fff', 
      border: active ? '1.5px solid #e2e8f0' : 'none', 
      padding: mob ? '14px 20px' : '16px 32px', 
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
      letterSpacing: '1px',
      whiteSpace: 'nowrap'
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
      padding: mob ? '14px 20px' : '16px 32px', 
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
      letterSpacing: '1px',
      whiteSpace: 'nowrap'
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
    <div style={{ display: 'flex', gap: '12px', width: '100%', alignSelf: 'stretch', flexWrap: mob ? 'wrap' : 'nowrap', marginTop: mob ? '32px' : '0' }}>
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
              transition: 'all 0.3s',
              whiteSpace: 'nowrap'
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

const ConstellationCanvas = ({ hovered }) => {
  const canvasRef = useRef(null);
  const [mouse, setMouse] = useState({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = canvas.width = canvas.offsetWidth || 400;
    let height = canvas.height = canvas.offsetHeight || 400;

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
      }
    });
    
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    }

    const particles = [];
    const particleCount = 28;
    const colors = [
      'rgba(249, 115, 22, 0.35)', // Saffron
      'rgba(16, 185, 129, 0.35)', // Green
      'rgba(14, 165, 233, 0.35)'  // Sky Blue
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1.5,
        color: colors[i % colors.length]
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 85) {
            const alpha = (1 - dist / 85) * 0.12;
            ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Particles
      particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 4;
        ctx.shadowColor = p.color;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 100) {
            const malpha = (1 - mdist / 100) * 0.22;
            ctx.strokeStyle = hovered 
              ? `rgba(249, 115, 22, ${malpha})` 
              : `rgba(148, 163, 184, ${malpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            p.x += mdx * 0.005;
            p.y += mdy * 0.005;
          }
        }
      });
      
      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      setMouse({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const handleMouseLeave = () => {
      setMouse({ x: null, y: null });
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [mouse.x, mouse.y, hovered]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'absolute', 
        inset: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0, 
        pointerEvents: 'none',
        borderRadius: 'inherit'
      }} 
    />
  );
};

const CreatorHonestReviewCard = ({ c, mob }) => {
  const reviewerName = c?.name || 'Creator';
  const reviewerSlug = c?.slug || 'creator';
  const [hovered, setHovered] = useState(false);

  const honestReviewText = c?.honest_review || c?.platform_review || c?.philosophy || (
    reviewerName === 'Arjun Kapoor' 
    ? "CreatorBharat has completely transformed my brand collaboration pipeline. The media kit builder and live analytical proof allow me to close tier-1 automotive campaigns with absolute transparency and 3x faster response times."
    : `CreatorBharat is the ultimate growth layer for my career. It handles my media kit verification and escrow payments automatically, allowing me to build premium brand relationships with 100% trust.`
  );

  const dpImg = c?.photo || c?.avatarUrl || c?.profile_pic || c?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(reviewerName)}&background=FF9431&color=fff&size=200`;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Ambient Glow Blobs */}
      <div style={{
        position: 'absolute',
        top: '-10px',
        left: '-10px',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: 'rgba(255, 148, 49, 0.12)',
        filter: 'blur(40px)',
        zIndex: 0,
        transition: 'transform 0.5s ease',
        transform: hovered ? 'scale(1.3)' : 'scale(1)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10px',
        right: '-10px',
        width: '140px',
        height: '140px',
        borderRadius: '50%',
        background: 'rgba(0, 115, 177, 0.12)',
        filter: 'blur(50px)',
        zIndex: 0,
        transition: 'transform 0.5s ease',
        transform: hovered ? 'scale(1.3)' : 'scale(1)',
        pointerEvents: 'none'
      }} />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ 
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', 
          borderRadius: '36px', 
          padding: '40px', 
          color: '#0f172a', 
          boxShadow: hovered 
            ? '0 30px 60px rgba(255, 148, 49, 0.08), 0 0 30px rgba(0, 115, 177, 0.04)'
            : '0 20px 40px rgba(15, 23, 42, 0.02)',
          position: 'relative',
          border: hovered ? '1.5px solid rgba(255, 148, 49, 0.25)' : '1.5px solid rgba(226, 232, 240, 0.8)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          boxSizing: 'border-box',
          zIndex: 1,
          transform: hovered ? 'translateY(-6px)' : 'none'
        }}
      >
        <ConstellationCanvas hovered={hovered} />

        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              background: '#FF9431', 
              boxShadow: '0 0 12px #FF9431',
              animation: 'pulse 2s infinite'
            }} />
            <span style={{ fontSize: '11px', fontWeight: 950, color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px' }}>Honest Review</span>
          </div>
          <div style={{ 
            background: 'rgba(16, 185, 129, 0.06)', 
            color: '#059669', 
            padding: '6px 14px', 
            borderRadius: '100px', 
            fontSize: '10px', 
            fontWeight: 900, 
            textTransform: 'uppercase', 
            letterSpacing: '1px', 
            border: '1.5px solid rgba(16, 185, 129, 0.15)' 
          }}>
            ✓ Verified review
          </div>
        </div>

        {/* Testimonial Quote */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '28px 0', zIndex: 1 }}>
          <div style={{ fontSize: '72px', fontFamily: 'serif', color: 'rgba(255, 148, 49, 0.18)', lineHeight: 0.1, height: '36px', marginTop: '8px', userSelect: 'none' }}>“</div>
          <p style={{ 
            fontSize: '16.5px', 
            fontWeight: 600, 
            color: '#334155', 
            lineHeight: 1.75, 
            fontStyle: 'italic',
            fontFamily: "'Outfit', sans-serif",
            margin: '0',
            letterSpacing: '-0.01em'
          }}>
            {honestReviewText}
          </p>
        </div>

        {/* Reviewer signature */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderTop: '1.5px solid #f1f5f9', paddingTop: '20px', zIndex: 1 }}>
          <div style={{ 
            width: '46px', 
            height: '46px', 
            borderRadius: '50%', 
            overflow: 'hidden', 
            border: '2px solid #FF9431', 
            flexShrink: 0,
            boxShadow: '0 0 10px rgba(255, 148, 49, 0.15)'
          }}>
            <img src={dpImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.01em' }}>{reviewerName}</div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              @{reviewerSlug} <span style={{ color: 'rgba(0, 0, 0, 0.1)' }}>•</span> <span style={{ color: '#FF9431', fontWeight: 800 }}>Verified Creator</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

CreatorHonestReviewCard.propTypes = { 
  c: PropTypes.object.isRequired,
  mob: PropTypes.bool
};

// --- MAIN HERO ---

export const ProfileHero = ({ c, stats, navigate, st, dsp, mob, onRate, onContact, onMediaKit, navVisible = true, onBrief }) => {
  // Follow state from context (persists across pages)
  const followed = st?.follows?.includes(c?.id) || false;
  const [dlStatus] = useState('idle');

  const [activeUsers, setActiveUsers] = useState(14);
  const [activeViews, setActiveViews] = useState(13842);
  const [likes, setLikes] = useState(c.likes || Math.floor(1200 + Math.random() * 500));
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => Math.max(8, prev + (Math.random() > 0.5 ? 1 : -1)));
      setActiveViews(prev => prev + (Math.random() > 0.8 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    dsp({ 
      t: 'TOAST', 
      d: { 
        type: 'success', 
        msg: isLiked ? 'Removed like from profile!' : 'Liked creator profile!' 
      } 
    });
  };

  const handleAction = (a) => {
    if (!st?.user) { dsp({ t: 'TOAST', d: { type: 'warn', msg: 'Please login to ' + a } }); return; }
    if (a === 'follow') {
      // Use context FOLLOW action — persists to localStorage
      dsp({ t: 'FOLLOW', id: c?.id });
      dsp({ t: 'TOAST', d: { type: 'success', msg: followed ? `Unfollowed ${c?.name}` : `Following ${c?.name}!` } });
    }
    if (a === 'message') dsp({ t: 'TOAST', d: { type: 'success', msg: 'Opening chat...' } });
    if (a === 'rate') onRate();
  };

  const handleMediaKit = () => {
    onMediaKit();
  };
  const handleShare = async () => {
    const profileUrl = globalThis.location.href;
    const shareText = `Check out ${c.name}'s creator profile on CreatorBharat! ${profileUrl}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: c.name, text: shareText, url: profileUrl });
      } else {
        // Fallback: copy link + offer WhatsApp
        await navigator.clipboard.writeText(profileUrl);
        dsp({ t: 'TOAST', d: { type: 'success', msg: 'Profile link copied! Share on WhatsApp: wa.me/?text=' + encodeURIComponent(shareText) } });
        // Open WhatsApp share
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
      }
    } catch (e) {
      // Silent fallback
      try { await navigator.clipboard.writeText(profileUrl); dsp({ t: 'TOAST', d: { type: 'success', msg: 'Link copied!' } }); } catch {}
    }
  };
  const dpImg = c?.photo || c?.avatarUrl || c?.profile_pic || c?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(c?.name || 'C')}&background=FF9431&color=fff&size=200`;
  const bannerImg = c?.cover_image || c?.banner_image || `https://picsum.photos/seed/${c?.id}/1600/500`;

  if (mob) {
    return (
      <section style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', position: 'relative' }}>
        <HeroBanner banner={bannerImg} mob={true} onBack={() => navigate('/creators')} onShare={handleShare} />
        
        {/* Profile Content Container */}
        <div style={{ padding: '0 20px 32px', marginTop: '-60px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          
          {/* Centered Display Picture (DP) */}
          <ProfileImage src={dpImg} mob={true} />

          {/* Social Icons Panel directly under DP */}
          <SocialIconsPanel c={c} mob={true} />

          {/* Name & Available Dot & verified badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.04em', margin: 0 }}>
              {c.name}
            </h1>
            <div style={{ background: '#0073b1', borderRadius: '50%', padding: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,115,177,0.2)' }}>
              <Verified size={16} color="#fff" fill="currentColor" />
            </div>
          </div>

          {/* Niche Tagline & Location */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', justifyContent: 'center', marginTop: '8px' }}>
            <span style={{ 
              background: 'linear-gradient(135deg, #FF9431 0%, #f97316 100%)', 
              color: '#fff', 
              padding: '4px 12px', 
              borderRadius: '100px', 
              fontSize: '10px', 
              fontWeight: 900, 
              textTransform: 'uppercase', 
              letterSpacing: '1px'
            }}>
              {c.category || c.niche || 'Lifestyle'}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#64748b', fontWeight: 700 }}>
              <MapPin size={14} color="#94a3b8" /> {c.city || 'Bharat'}
            </div>
            {/* Status dot */}
            <div style={{ 
              background: '#ecfdf5', 
              color: '#059669', 
              padding: '4px 12px', 
              borderRadius: '100px', 
              fontSize: '10px', 
              fontWeight: 900, 
              textTransform: 'uppercase', 
              letterSpacing: '1px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              border: '1px solid rgba(16,185,129,0.2)' 
            }}>
              <div style={{ width: '6px', height: '6px', background: '#10B981', borderRadius: '50%', boxShadow: '0 0 6px #10B981', animation: 'pulse 2s infinite' }} /> 
              Active
            </div>
          </div>

          {/* Tagline */}
          <p style={{ fontSize: '15px', color: '#475569', marginTop: '16px', marginBottom: '8px', fontWeight: 600, lineHeight: 1.4, maxWidth: '400px' }}>
            {c.tagline || `Expert in ${c.niche || 'Lifestyle'} Storytelling | Building authentic brand identities.`}
          </p>

          {/* Bio (compact) */}
          {c.bio && (
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px', lineHeight: 1.5, maxWidth: '400px' }}>
              {c.bio}
            </p>
          )}

          {/* Unified Actions Row (Follow, Message, Download) */}
          <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '400px', marginTop: '16px', marginBottom: '24px' }}>
            {/* Follow Button (Primary) */}
            <button 
              onClick={() => handleAction('follow')}
              style={{
                flex: 2.5,
                background: followed ? '#f1f5f9' : '#0f172a',
                color: followed ? '#0f172a' : '#fff',
                border: followed ? '1.5px solid #e2e8f0' : 'none',
                height: '46px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: followed ? 'none' : '0 10px 20px rgba(15,23,42,0.15)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              {followed ? <UserCheck size={16} /> : <UserPlus size={16} />} 
              {followed ? 'Following' : 'Follow'}
            </button>

            {/* Message Button (Icon only) */}
            <button 
              onClick={() => handleAction('message')}
              style={{
                flex: 1,
                background: '#fff',
                color: '#0073b1',
                border: '1.5px solid #0073b1',
                height: '46px',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 16px rgba(0,115,177,0.06)'
              }}
              title="Message Creator"
            >
              <MessageSquare size={18} />
            </button>

            {/* Download Media Kit Button (Icon only) */}
            <button 
              onClick={handleMediaKit}
              style={{
                flex: 1,
                background: '#fff',
                color: '#FF9431',
                border: '1.5px solid #FF9431',
                height: '46px',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 16px rgba(255,148,49,0.06)'
              }}
              title="Download Media Kit"
            >
              <Download size={18} />
            </button>
          </div>

          {/* Stats & Trust Dashboard Card */}
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(226, 232, 240, 0.8)',
            borderRadius: '24px',
            padding: '16px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 10px 30px rgba(15,23,42,0.04)',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            boxSizing: 'border-box'
          }}>
            {/* Metric 1: Followers */}
            <div style={{ 
              background: '#fff', 
              borderRadius: '16px', 
              padding: '12px 14px', 
              textAlign: 'left', 
              border: '1px solid rgba(226, 232, 240, 0.6)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.01)'
            }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: 'rgba(59, 130, 246, 0.08)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Users size={14} color="#3B82F6" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '16px', fontWeight: 950, color: '#0f172a', fontFamily: "'Outfit', sans-serif", lineHeight: 1.2 }}>
                  {fmt.num(stats.followers)}
                </div>
                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  CB Followers
                </div>
              </div>
            </div>

            {/* Metric 2: Bharat Score */}
            <div style={{ 
              background: '#fff', 
              borderRadius: '16px', 
              padding: '12px 14px', 
              textAlign: 'left', 
              border: '1px solid rgba(226, 232, 240, 0.6)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.01)'
            }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: 'rgba(255, 148, 49, 0.08)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Sparkles size={14} color="#FF9431" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '16px', fontWeight: 950, color: '#FF9431', fontFamily: "'Outfit', sans-serif", lineHeight: 1.2 }}>
                  {stats.score || 85}
                </div>
                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Bharat Score
                </div>
              </div>
            </div>

            {/* Metric 3: Engagement */}
            <div style={{ 
              background: '#fff', 
              borderRadius: '16px', 
              padding: '12px 14px', 
              textAlign: 'left', 
              border: '1px solid rgba(226, 232, 240, 0.6)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.01)'
            }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: 'rgba(16, 185, 129, 0.08)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <TrendingUp size={14} color="#10B981" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '16px', fontWeight: 950, color: '#10B981', fontFamily: "'Outfit', sans-serif", lineHeight: 1.2 }}>
                  {stats.er}%
                </div>
                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Engagement
                </div>
              </div>
            </div>

            {/* Metric 4: Rating */}
            <div style={{ 
              background: '#fff', 
              borderRadius: '16px', 
              padding: '12px 14px', 
              textAlign: 'left', 
              border: '1px solid rgba(226, 232, 240, 0.6)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.01)'
            }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: 'rgba(139, 92, 246, 0.08)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Star size={14} color="#8B5CF6" fill="#8B5CF6" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '16px', fontWeight: 950, color: '#8B5CF6', fontFamily: "'Outfit', sans-serif", lineHeight: 1.2, display: 'flex', alignItems: 'center', gap: '3px' }}>
                  5.0<span style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 700 }}>(Verified)</span>
                </div>
                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Rating
                </div>
              </div>
            </div>
          </div>

          {/* Profile Likes & Visitors footer */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center', marginTop: '16px', fontSize: '12px', color: '#64748b', fontWeight: 700 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }} onClick={handleLike}>
              <Heart size={14} color="#ef4444" fill={isLiked ? '#ef4444' : 'none'} /> {likes} likes
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Eye size={14} color="#FF9431" /> {fmt.num(activeViews)} visitors
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              {activeUsers} active
            </span>
          </div>

        </div>
      </section>
    );
  }

  return (
    <section style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', position: 'relative' }}>
       <HeroBanner banner={bannerImg} mob={mob} onBack={() => navigate('/creators')} onShare={handleShare} />
       <div style={{ ...W(1150), margin: mob ? '-60px auto 0' : '-100px auto 0', padding: mob ? '0 16px 32px' : '0 20px 60px', position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: mob ? 'center' : 'flex-start', textAlign: mob ? 'center' : 'left' }}>
             <div style={{ display: 'flex', alignItems: mob ? 'center' : 'flex-end', gap: '24px', flexDirection: mob ? 'column' : 'row', marginBottom: '12px' }}>
                <ProfileImage src={dpImg} mob={mob} />
                {mob && <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}><SocialIconsPanel c={c} mob={true} /></div>}
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
               alignItems: 'stretch',
               marginTop: mob ? '0' : '20px'
             }}>
                <div style={{ flex: 1.6, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                   <IdentityDetails c={c} stats={stats} mob={mob} onRate={() => handleAction('rate')} onContact={onContact} dsp={dsp} dlStatus={dlStatus} onDownload={handleMediaKit} activeUsers={activeUsers} activeViews={activeViews} likes={likes} isLiked={isLiked} onLike={handleLike} />
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

                <div style={mob ? { display: 'none' } : { flex: 1, display: 'flex', flexDirection: 'column' }}>
                   <CreatorHonestReviewCard c={c} mob={mob} />
                </div>
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
  onMediaKit: PropTypes.func.isRequired,
  navVisible: PropTypes.bool,
  onBrief: PropTypes.func.isRequired
};
