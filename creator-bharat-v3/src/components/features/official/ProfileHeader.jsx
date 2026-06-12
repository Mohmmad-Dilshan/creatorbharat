import React from 'react';
import PropTypes from 'prop-types';
import { ShieldCheck, Languages, ExternalLink, MoreHorizontal } from 'lucide-react';
import HslBadge from './HslBadge';
import { OFFICIAL_DATA } from './officialData';

export default function ProfileHeader({ mob, content, lang, setLang, isFollowing, onFollow, onMessage }) {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: mob ? 'column' : 'row',
      gap: mob ? '32px' : '100px', 
      alignItems: 'center', 
      textAlign: mob ? 'center' : 'left',
      marginBottom: mob ? '40px' : '44px' 
    }}>
      <div style={{ flexShrink: 0 }}>
         <div style={{ 
           width: mob ? '120px' : '150px', 
           height: mob ? '120px' : '150px', 
           borderRadius: '50%', 
           background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', 
           padding: '4px',
           boxShadow: '0 12px 30px rgba(220, 39, 67, 0.25)'
         }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#fff', padding: '4px' }}>
               <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={mob ? 60 : 80} color="#fff" />
               </div>
            </div>
         </div>
      </div>
      <div style={{ flex: 1, width: mob ? '100%' : 'auto' }}>
         <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: mob ? 'center' : 'flex-start' }}>
               <h1 style={{ fontSize: '24px', fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>{content.username}</h1>
               <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <HslBadge type="verified" />
                  <HslBadge type="elite" />
                  <HslBadge type="enterprise" />
               </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', width: mob ? '100%' : 'auto' }}>
               <button 
                 onClick={onFollow} 
                 style={{ 
                   flex: 1, 
                   padding: '9px 16px', 
                   background: isFollowing ? '#efefef' : '#0095f6', 
                   border: 'none', 
                   color: isFollowing ? '#262626' : '#fff', 
                   borderRadius: '8px', 
                   fontSize: '14px', 
                   fontWeight: 700, 
                   cursor: 'pointer', 
                   transition: 'opacity 0.2s' 
                 }}
               >
                 {isFollowing ? 'Following' : 'Follow'}
               </button>
               <button 
                 onClick={onMessage} 
                 style={{ 
                   flex: 1, 
                   padding: '9px 16px', 
                   background: '#efefef', 
                   border: 'none', 
                   color: '#262626', 
                   borderRadius: '8px', 
                   fontSize: '14px', 
                   fontWeight: 700, 
                   cursor: 'pointer' 
                 }}
               >
                 Message
               </button>
               <button onClick={() => setLang(lang === 'en' ? 'hi' : 'en')} style={{ padding: '9px 12px', background: '#efefef', border: 'none', color: '#262626', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><Languages size={16} /> {lang.toUpperCase()}</button>
            </div>
            {mob ? null : <MoreHorizontal size={24} style={{ cursor: 'pointer' }} />}
         </div>
         {/* Posts/Followers row is shown here on desktop */}
         {!mob && (
            <div style={{ display: 'flex', gap: '40px', marginBottom: '20px' }}>
               <span><strong>{OFFICIAL_DATA.baseStats.posts}</strong> posts</span>
               <span><strong>{OFFICIAL_DATA.baseStats.followers}</strong> followers</span>
               <span><strong>{OFFICIAL_DATA.baseStats.following}</strong> following</span>
            </div>
         )}
         <div style={{ fontSize: '15px', lineHeight: 1.6 }}>
            <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>{content.displayName}</div>
            <div style={{ color: '#8e8e8e', fontWeight: 500, marginBottom: '8px' }}>{content.category}</div>
            <div style={{ whiteSpace: 'pre-line', color: '#262626' }}>{content.bio}</div>
            <div style={{ color: '#00376b', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: mob ? 'center' : 'flex-start', gap: '4px', marginTop: '8px' }}>
               <ExternalLink size={14} /> {content.website}
            </div>
         </div>
      </div>
    </div>
  );
}

ProfileHeader.propTypes = {
  mob: PropTypes.bool.isRequired,
  content: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  setLang: PropTypes.func.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  onFollow: PropTypes.func.isRequired,
  onMessage: PropTypes.func.isRequired
};
