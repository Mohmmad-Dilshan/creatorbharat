import React from 'react';
import PropTypes from 'prop-types';
import { 
  ShieldCheck, 
  Languages, 
  ExternalLink, 
  MoreHorizontal,
  MessageSquare
} from 'lucide-react';
import { 
  TwitterIcon, 
  LinkedinIcon, 
  GithubIcon, 
  InstagramIcon 
} from '@/components/icons/SocialIcons';
import HslBadge from './HslBadge';
import { OFFICIAL_DATA } from './officialData';
import { Logo } from '@/components/common/Logo';

export default function ProfileHeader({ 
  mob, 
  content, 
  lang, 
  setLang, 
  isFollowing, 
  onFollow, 
  onMessage,
  postsCount,
  followersCount,
  followingCount
}) {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: mob ? 'column' : 'row',
      gap: mob ? '32px' : '80px', 
      alignItems: 'center', 
      textAlign: mob ? 'center' : 'left',
      marginBottom: mob ? '40px' : '44px' 
    }}>
      <div style={{ flexShrink: 0, position: 'relative' }}>
         <div style={{
            borderRadius: '50%',
            padding: '3px',
            background: 'linear-gradient(135deg, #FF9431 0%, #128807 100%)',
            boxShadow: '0 12px 36px rgba(255, 148, 49, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            cursor: 'pointer'
         }}
         onMouseEnter={(e) => {
           e.currentTarget.style.transform = 'scale(1.05) rotate(4deg)';
           e.currentTarget.style.boxShadow = '0 20px 48px rgba(255, 148, 49, 0.4)';
         }}
         onMouseLeave={(e) => {
           e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
           e.currentTarget.style.boxShadow = '0 12px 36px rgba(255, 148, 49, 0.25)';
         }}
         >
            <Logo size={mob ? 116 : 142} iconOnly={true} />
         </div>
         {/* Small official shield check badge in the corner of avatar */}
         <div style={{
           position: 'absolute',
           bottom: mob ? '2px' : '4px',
           right: mob ? '2px' : '4px',
           background: '#ffffff',
           borderRadius: '50%',
           padding: '3px',
           boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
           zIndex: 2
         }}>
           <div style={{
             background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
             borderRadius: '50%',
             width: mob ? '28px' : '34px',
             height: mob ? '28px' : '34px',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             color: '#ffffff'
           }}>
             <ShieldCheck size={mob ? 16 : 20} fill="#ffffff" color="#0369a1" style={{ color: '#fff' }} />
           </div>
         </div>
      </div>
      <div style={{ flex: 1, width: mob ? '100%' : 'auto' }}>
         <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: mob ? 'center' : 'flex-start' }}>
               <h1 style={{ fontSize: '26px', fontWeight: 900, letterSpacing: '-0.02em', margin: 0, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>{content.username}</h1>
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
                    background: isFollowing ? '#f1f5f9' : 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)', 
                    border: isFollowing ? '1px solid #cbd5e1' : 'none', 
                    color: isFollowing ? '#475569' : '#fff', 
                    borderRadius: '12px', 
                    fontSize: '13px', 
                    fontWeight: 800, 
                    cursor: 'pointer', 
                    boxShadow: isFollowing ? 'none' : '0 4px 15px rgba(255, 148, 49, 0.2)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    backdropFilter: 'blur(4px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    if (isFollowing) {
                      e.currentTarget.style.background = '#e2e8f0';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                    } else {
                      e.currentTarget.style.filter = 'brightness(1.05)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 148, 49, 0.35)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    if (isFollowing) {
                      e.currentTarget.style.background = '#f1f5f9';
                      e.currentTarget.style.boxShadow = 'none';
                    } else {
                      e.currentTarget.style.filter = 'brightness(1)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 148, 49, 0.2)';
                    }
                  }}
               >
                  {isFollowing ? 'Following' : 'Follow'}
               </button>
               <button 
                  onClick={onMessage} 
                  style={{ 
                    flex: 1, 
                    padding: '9px 16px', 
                    background: '#ffffff', 
                    border: '1px solid #cbd5e1', 
                    color: '#334155', 
                    borderRadius: '12px', 
                    fontSize: '13px', 
                    fontWeight: 800, 
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    backdropFilter: 'blur(4px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f8fafc';
                    e.currentTarget.style.color = '#0f172a';
                    e.currentTarget.style.borderColor = '#94a3b8';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.color = '#334155';
                    e.currentTarget.style.borderColor = '#cbd5e1';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.02)';
                  }}
               >
                  Message
               </button>
               <button 
                 onClick={() => setLang(lang === 'en' ? 'hi' : 'en')} 
                 style={{ 
                   padding: '9px 12px', 
                   background: '#ffffff', 
                   border: '1px solid #cbd5e1', 
                   color: '#334155', 
                   borderRadius: '12px', 
                   cursor: 'pointer', 
                   display: 'flex', 
                   alignItems: 'center', 
                   gap: '4px',
                   fontSize: '13px',
                   fontWeight: 800,
                   boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                   transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                   backdropFilter: 'blur(4px)'
                 }}
                 onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f8fafc';
                    e.currentTarget.style.color = '#0f172a';
                    e.currentTarget.style.borderColor = '#94a3b8';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.06)';
                 }}
                 onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.color = '#334155';
                    e.currentTarget.style.borderColor = '#cbd5e1';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.02)';
                 }}
               >
                 <Languages size={15} /> {lang.toUpperCase()}
               </button>
            </div>
            {mob ? null : <MoreHorizontal size={24} style={{ cursor: 'pointer', color: '#94a3b8' }} />}
         </div>
         {/* Posts/Followers row is shown here on desktop */}
         {!mob && (
            <div style={{ display: 'flex', gap: '40px', marginBottom: '20px', fontSize: '15px', color: '#64748b' }}>
               <span><strong style={{ color: '#0f172a', fontSize: '17px', marginRight: '4px' }}>{postsCount}</strong> posts</span>
               <span><strong style={{ color: '#0f172a', fontSize: '17px', marginRight: '4px' }}>{followersCount.toLocaleString()}</strong> followers</span>
               <span><strong style={{ color: '#0f172a', fontSize: '17px', marginRight: '4px' }}>{followingCount}</strong> following</span>
            </div>
         )}
         <div style={{ fontSize: '15px', lineHeight: 1.6 }}>
            <div style={{ fontWeight: 800, fontSize: '17px', marginBottom: '4px', color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>{content.displayName}</div>
            <div style={{ color: '#FF9431', fontWeight: 650, fontSize: '13px', marginBottom: '8px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{content.category}</div>
            <div style={{ whiteSpace: 'pre-line', color: '#475569', fontWeight: 500 }}>{content.bio}</div>
            
            <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', alignItems: mob ? 'center' : 'flex-start', gap: mob ? '12px' : '24px', marginTop: '16px' }}>
               <a 
                 href={`https://${content.website}`} 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 style={{ textDecoration: 'none', color: '#0284c7', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', transition: 'color 0.2s' }}
                 onMouseEnter={(e) => e.currentTarget.style.color = '#0369a1'}
                 onMouseLeave={(e) => e.currentTarget.style.color = '#0284c7'}
               >
                  <ExternalLink size={14} /> {content.website}
               </a>
 
               {/* Social Icons row */}
               <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {OFFICIAL_DATA.socialPlatforms.map((social) => {
                     let Icon = ExternalLink;
                     if (social.platform === 'Twitter') Icon = TwitterIcon;
                     else if (social.platform === 'LinkedIn') Icon = LinkedinIcon;
                     else if (social.platform === 'GitHub') Icon = GithubIcon;
                     else if (social.platform === 'Instagram') Icon = InstagramIcon;
                     else if (social.platform === 'Discord') Icon = MessageSquare;
 
                     return (
                        <a 
                           key={social.platform}
                           href={social.url}
                           target="_blank"
                           rel="noopener noreferrer"
                           title={`${social.platform}: ${social.handle}`}
                           style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              width: '28px', 
                              height: '28px', 
                              borderRadius: '50%', 
                              background: '#f8fafc', 
                              color: '#64748b', 
                              transition: 'all 0.2s ease',
                              border: '1px solid #cbd5e1',
                              textDecoration: 'none'
                           }}
                           onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#FF9431';
                              e.currentTarget.style.color = '#fff';
                              e.currentTarget.style.borderColor = '#FF9431';
                              e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 148, 49, 0.4)';
                           }}
                           onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#f8fafc';
                              e.currentTarget.style.color = '#64748b';
                              e.currentTarget.style.borderColor = '#cbd5e1';
                              e.currentTarget.style.boxShadow = 'none';
                           }}
                        >
                           <Icon size={14} />
                        </a>
                     );
                  })}
               </div>
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
  onMessage: PropTypes.func.isRequired,
  postsCount: PropTypes.number.isRequired,
  followersCount: PropTypes.number.isRequired,
  followingCount: PropTypes.number.isRequired
};
