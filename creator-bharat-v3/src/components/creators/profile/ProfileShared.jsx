import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { ArrowRight, ShieldCheck, ImageIcon, Play, Briefcase, Globe, Mic2, Lock, Send, FileText, Compass, Phone } from 'lucide-react';
import { GithubIcon } from '../../icons/SocialIcons';

export const TAB_LIST = [
  { id: 'identity',  label: 'Identity',   icon: '👤', desc: 'Who they are' },
  { id: 'story',     label: 'My Story',   icon: '📖', desc: 'Creator journey' },
  { id: 'gallery',   label: 'Gallery',    icon: '🖼️', desc: 'Visual portfolio' },
  { id: 'work',      label: 'Pro Work',   icon: '💼', desc: 'Achievements' },
  { id: 'services',  label: 'Services',   icon: '🛠️', desc: 'What I offer' },
  { id: 'local',     label: 'Local Hub',  icon: '📍', desc: 'Regional presence' },
  { id: 'reviews',   label: 'Reviews',    icon: '⭐', desc: 'Brand feedback' },
  { id: 'packages',  label: 'Packages',   icon: '⚡', desc: 'Hire & rates' },
  { id: 'sponsor',   label: 'Sponsored',  icon: '📢', desc: 'Promoted content' },
  { id: 'connect',   label: 'Connect',    icon: '💬', desc: 'Get in touch' },
];

export const TrustBadge = () => {
  const [isMobile, setIsMobile] = React.useState(globalThis.innerWidth < 768);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', handleResize);
    return () => globalThis.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{
      background: '#f8fafc',
      padding: isMobile ? '12px 16px' : '16px 24px',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      border: '1px solid #e2e8f0',
      width: '100%',
      marginTop: isMobile ? '20px' : '40px'
    }}>
      <ShieldCheck size={isMobile ? 16 : 20} color="#10B981" style={{ flexShrink: 0 }} />
      <span style={{ fontSize: isMobile ? '10.5px' : '12px', fontWeight: 900, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.3 }}>
        All metrics, location data, and brand history verified by CreatorBharat Official Audit
      </span>
    </div>
  );
};

export const TabNavigator = ({ activeTab, setActiveTab, mob }) => {
  const currentIndex = TAB_LIST.findIndex(t => t.id === activeTab);
  const prevTab = currentIndex > 0 ? TAB_LIST[currentIndex - 1] : null;
  const nextTab = currentIndex < TAB_LIST.length - 1 ? TAB_LIST[currentIndex + 1] : null;
  const isActionTab = ['packages', 'sponsor', 'connect'].includes(nextTab?.id);
  
  if (!nextTab && !prevTab) return null;

  if (mob) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 320, damping: 30 }}
        style={{
          marginTop: 20,
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          {prevTab ? (
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => setActiveTab(prevTab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: '#f1f5f9', border: 'none', padding: '10px 16px',
                borderRadius: 100, cursor: 'pointer', color: '#64748b',
                fontWeight: 700, fontSize: 13, flexShrink: 0, whiteSpace: 'nowrap',
              }}
            >
              <ArrowRight size={13} style={{ transform: 'rotate(180deg)' }} />
              Back
            </motion.button>
          ) : null}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 4, alignItems: 'center' }}>
          {TAB_LIST.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              title={t.label}
              style={{
                width: t.id === activeTab ? 14 : 5,
                height: 5, borderRadius: 100, border: 'none',
                cursor: 'pointer', padding: 0,
                background: t.id === activeTab
                  ? (isActionTab ? 'linear-gradient(90deg,#FF9431,#EA580C)' : 'linear-gradient(90deg,#0073b1,#0ea5e9)')
                  : i < currentIndex ? '#cbd5e1' : '#e2e8f0',
                transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {nextTab ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(nextTab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: isActionTab ? 'linear-gradient(135deg,#FF9431,#EA580C)' : 'linear-gradient(135deg,#0073b1,#0ea5e9)',
                border: 'none', padding: '10px 18px', borderRadius: 100,
                cursor: 'pointer', color: '#fff', fontWeight: 800, fontSize: 13,
                flexShrink: 0, whiteSpace: 'nowrap',
                boxShadow: isActionTab ? '0 4px 12px rgba(255,148,49,0.2)' : '0 4px 12px rgba(0,115,177,0.18)',
              }}
            >
              Next
              <ArrowRight size={13} />
            </motion.button>
          ) : null}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      style={{
        marginTop: 48, padding: '20px 28px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        borderRadius: 24, border: '1px solid #e2e8f0',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
      }}
    >
      <div style={{ display: 'flex', gap: 5, alignItems: 'center', flexShrink: 0 }}>
        {TAB_LIST.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            title={t.label}
            style={{
              width: t.id === activeTab ? 22 : 7,
              height: 7, borderRadius: 100, border: 'none', cursor: 'pointer', padding: 0,
              background: t.id === activeTab ? 'linear-gradient(90deg, #0073b1, #0ea5e9)' : i < currentIndex ? '#cbd5e1' : '#e2e8f0',
              transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)'
            }}
          />
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {prevTab && (
          <motion.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveTab(prevTab.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              background: '#fff', border: '1.5px solid #e2e8f0',
              padding: '11px 22px', borderRadius: 100, cursor: 'pointer', color: '#64748b',
              fontWeight: 700, fontSize: 13, boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
          >
            <ArrowRight size={13} style={{ transform: 'rotate(180deg)' }} />
            {prevTab.icon} {prevTab.label}
          </motion.button>
        )}

        {nextTab && (
          <motion.button
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveTab(nextTab.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: isActionTab ? 'linear-gradient(135deg, #FF9431, #EA580C)' : 'linear-gradient(135deg, #0073b1, #0ea5e9)',
              border: 'none', padding: '11px 26px', borderRadius: 100, cursor: 'pointer',
              color: '#fff', fontWeight: 800, fontSize: 13,
              boxShadow: isActionTab ? '0 8px 20px rgba(255,148,49,0.25)' : '0 8px 20px rgba(0,115,177,0.2)',
            }}
          >
            {nextTab.icon} {nextTab.label}
            <ArrowRight size={13} />
          </motion.button>
        )}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </motion.div>
  );
};

export const SocialLinkTree = ({ links = {}, c = {}, mob, compact }) => {
  // Master list of all possible platforms a creator can add
  const MASTER_PLATFORMS = [
    { id: 'instagram', l: 'Instagram', s: 'Visual Community & Stories', i: ImageIcon, c: '#E4405F' },
    { id: 'youtube', l: 'YouTube', s: 'Longform Videos & Vlogs', i: Play, c: '#FF0000' },
    { id: 'linkedin', l: 'LinkedIn', s: 'Professional Partnerships', i: Briefcase, c: '#0077B5' },
    { id: 'twitter', l: 'Twitter / X', s: 'Real-time Updates & Thoughts', i: Globe, c: '#000000' },
    { id: 'telegram', l: 'Telegram', s: 'Broadcast Channel & Community', i: Send, c: '#26A5E4' },
    { id: 'whatsapp', l: 'WhatsApp', s: 'Direct Updates & Group Chat', i: Phone, c: '#25D366' },
    { id: 'threads', l: 'Threads', s: 'Text Discussions & Thoughts', i: Globe, c: '#101010' },
    { id: 'moj', l: 'Moj App', s: 'Short Videos & Regional Reach', i: Play, c: '#FF4500' },
    { id: 'sharechat', l: 'ShareChat', s: 'Vernacular Community Hub', i: Globe, c: '#0082FF' },
    { id: 'josh', l: 'Josh App', s: 'Regional Short Video Platform', i: Play, c: '#FF2052' },
    { id: 'snapchat', l: 'Snapchat', s: 'Daily Stories & Behind the Scenes', i: ImageIcon, c: '#FFFC00' },
    { id: 'facebook', l: 'Facebook', s: 'Community Page & Groups', i: Globe, c: '#1877F2' },
    { id: 'pinterest', l: 'Pinterest', s: 'Moodboards & Creative Ideas', i: ImageIcon, c: '#E60023' },
    { id: 'twitch', l: 'Twitch', s: 'Live Streams & Gaming', i: Play, c: '#9146FF' },
    { id: 'spotify', l: 'Spotify / Podcasts', s: 'Audio & Podcast Episodes', i: Mic2, c: '#1DB954' },
    { id: 'discord', l: 'Discord Server', s: 'Private Fan Community', i: Globe, c: '#5865F2' },
    { id: 'reddit', l: 'Reddit Community', s: 'Discussions & Subreddit', i: Globe, c: '#FF4500' },
    { id: 'github', l: 'GitHub', s: 'Code Repositories & Tech Projects', i: GithubIcon, c: '#181717' },
    { id: 'behance', l: 'Behance', s: 'Creative Designs & Portfolio', i: Compass, c: '#1769FF' },
    { id: 'dribbble', l: 'Dribbble', s: 'Design Snippets & Showcases', i: Compass, c: '#EA4C89' },
    { id: 'medium', l: 'Medium', s: 'Articles & Written Stories', i: FileText, c: '#020202' },
    { id: 'website', l: 'Official Website', s: 'Portfolio & Bookings', i: Globe, c: '#FF9431' }
  ];

  // Resolve links dynamically from multiple potential sources
  const resolved = {};
  const addLink = (platformId, val) => {
    if (!val) return;
    let url = String(val).trim();
    if (!url) return;

    // Normalize platform ID
    const pid = platformId.toLowerCase()
      .replace('twitter / x', 'twitter')
      .replace('x', 'twitter')
      .replace('spotify / podcasts', 'spotify')
      .replace('whatsapp channel', 'whatsapp')
      .replace('whatsapp / phone', 'whatsapp');

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      if (pid === 'instagram') url = `https://instagram.com/${url.replace(/^@/, '')}`;
      else if (pid === 'youtube') {
        if (url.startsWith('c/') || url.startsWith('channel/') || url.startsWith('@')) {
          url = `https://youtube.com/${url}`;
        } else {
          url = `https://youtube.com/@${url}`;
        }
      }
      else if (pid === 'linkedin') url = `https://linkedin.com/in/${url}`;
      else if (pid === 'twitter') url = `https://x.com/${url.replace(/^@/, '')}`;
      else if (pid === 'facebook') url = `https://facebook.com/${url}`;
      else if (pid === 'snapchat') url = `https://snapchat.com/add/${url}`;
      else if (pid === 'pinterest') url = `https://pinterest.com/${url}`;
      else if (pid === 'twitch') url = `https://twitch.tv/${url}`;
      else if (pid === 'spotify') url = `https://open.spotify.com/user/${url}`;
      else if (pid === 'reddit') url = `https://reddit.com/user/${url}`;
      else if (pid === 'github') url = `https://github.com/${url}`;
      else if (pid === 'behance') url = `https://behance.net/${url}`;
      else if (pid === 'dribbble') url = `https://dribbble.com/${url}`;
      else if (pid === 'medium') url = `https://medium.com/@${url.replace(/^@/, '')}`;
      else if (pid === 'telegram') url = `https://t.me/${url.replace(/^@/, '')}`;
      else if (pid === 'whatsapp') url = `https://wa.me/${url.replace(/[^0-9]/g, '')}`;
      else if (pid === 'threads') url = `https://threads.net/@${url.replace(/^@/, '')}`;
      else if (pid === 'moj') url = `https://mojapp.in/@${url.replace(/^@/, '')}`;
      else if (pid === 'sharechat') url = `https://sharechat.com/profile/${url.replace(/^@/, '')}`;
      else if (pid === 'josh') url = `https://share.joshactiv.com/profile/${url}`;
      else if (pid === 'website') url = `https://${url}`;
    }
    resolved[pid] = url;
  };

  // Add individual top-level fields
  const sourceCreator = c && Object.keys(c).length > 0 ? c : {};
  addLink('instagram', links?.instagram || sourceCreator.instagram);
  addLink('youtube', links?.youtube || sourceCreator.youtube);
  addLink('linkedin', links?.linkedin || sourceCreator.linkedin);
  addLink('twitter', links?.twitter || sourceCreator.twitter || sourceCreator.twitterX || sourceCreator.x);
  addLink('facebook', links?.facebook || sourceCreator.facebook);
  addLink('website', links?.website || sourceCreator.portfolio || sourceCreator.website);
  addLink('telegram', links?.telegram || sourceCreator.telegram);
  addLink('whatsapp', links?.whatsapp || sourceCreator.whatsapp || sourceCreator.contactPhone);
  addLink('threads', links?.threads || sourceCreator.threads);
  addLink('github', links?.github || sourceCreator.github);
  addLink('behance', links?.behance || sourceCreator.behance);
  addLink('dribbble', links?.dribbble || sourceCreator.dribbble);
  addLink('medium', links?.medium || sourceCreator.medium);
  addLink('moj', links?.moj || sourceCreator.moj);
  addLink('sharechat', links?.sharechat || sourceCreator.sharechat);
  addLink('josh', links?.josh || sourceCreator.josh);

  // Add array format social links if present
  const arr = sourceCreator.socialLinks || sourceCreator.social_links || [];
  if (Array.isArray(arr)) {
    arr.forEach(item => {
      if (item && item.platform && item.url) {
        addLink(item.platform.toLowerCase(), item.url);
      }
    });
  }

  // Add keys from links object if passed
  if (links && typeof links === 'object' && !Array.isArray(links)) {
    Object.entries(links).forEach(([k, v]) => {
      addLink(k.toLowerCase(), v);
    });
  }

  const activeLinks = MASTER_PLATFORMS.filter(p => resolved[p.id]);
  const displayLinks = activeLinks.length > 0 ? activeLinks : MASTER_PLATFORMS.slice(0, 6);

  if (displayLinks.length === 0) return null;

  if (compact) {
    const listToRender = activeLinks.length > 0 ? activeLinks : MASTER_PLATFORMS.slice(0, 6);
    return (
      <div style={{ 
        padding: mob ? '28px 20px' : '32px 40px', 
        borderRadius: '32px', 
        marginBottom: '40px', 
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)', 
        border: '1.5px solid rgba(226, 232, 240, 0.8)',
        boxShadow: '0 8px 30px rgba(15,23,42,0.02)',
        display: 'flex',
        flexDirection: mob ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px'
      }}>
         <div style={{ textAlign: mob ? 'center' : 'left' }}>
            <h4 style={{ fontSize: '18px', fontWeight: 950, color: '#0f172a', margin: '0 0 4px 0', letterSpacing: '-0.01em' }}>Digital Footprint</h4>
            <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, margin: 0 }}>Verified handles & professional networks.</p>
         </div>
         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {listToRender.map(link => {
              const url = resolved[link.id] || '#';
              return (
                <motion.button
                  key={link.id}
                  whileHover={url !== '#' ? { y: -4, scale: 1.05, boxShadow: `0 8px 20px ${link.c}20` } : {}}
                  whileTap={url !== '#' ? { scale: 0.95 } : {}}
                  onClick={() => url !== '#' && window.open(url, '_blank')}
                  title={link.l}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#fff',
                    border: '1.5px solid rgba(226, 232, 240, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: url !== '#' ? 'pointer' : 'default',
                    color: link.c,
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.01)',
                    opacity: url === '#' ? 0.45 : 1
                  }}
                  onMouseEnter={(e) => { if (url !== '#') { e.currentTarget.style.borderColor = link.c; e.currentTarget.style.background = `${link.c}05`; } }}
                  onMouseLeave={(e) => { if (url !== '#') { e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.8)'; e.currentTarget.style.background = '#fff'; } }}
                >
                  <link.i size={20} color="currentColor" />
                </motion.button>
              );
            })}
         </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: mob ? '32px 24px' : '48px', 
      borderRadius: '40px', 
      marginBottom: '40px', 
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)', 
      border: '1.5px solid rgba(226, 232, 240, 0.8)',
      boxShadow: '0 8px 30px rgba(15,23,42,0.02)',
      position: 'relative',
      overflow: 'hidden'
    }}>
       <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a', marginBottom: '12px', letterSpacing: '-0.02em' }}>The Digital Ecosystem</h3>
          <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>Connect and follow my journey across all active platforms.</p>
       </div>
       <div style={{ 
         display: 'grid', 
         gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', 
         gap: '20px', 
         maxWidth: '100%', 
         margin: '0 auto' 
       }}>
          {displayLinks.map(link => {
            const url = resolved[link.id] || '#';
            return (
              <motion.button 
                key={link.id}
                whileHover={url !== '#' ? { 
                  y: -4,
                  borderColor: link.c,
                  boxShadow: `0 12px 30px rgba(15,23,42,0.03), 0 0 15px ${link.c}12`
                } : {}}
                whileTap={url !== '#' ? { scale: 0.98 } : {}}
                onClick={() => url !== '#' && window.open(url, '_blank')}
                style={{ 
                  display: 'flex', 
                  flexDirection: mob ? 'row' : 'column',
                  alignItems: mob ? 'center' : 'flex-start', 
                  justifyContent: 'space-between', 
                  padding: '24px', 
                  background: '#fff', 
                  border: '1.5px solid rgba(226, 232, 240, 0.8)', 
                  borderRadius: '28px', 
                  cursor: url !== '#' ? 'pointer' : 'default', 
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', 
                  width: '100%', 
                  textAlign: 'left',
                  opacity: url === '#' ? 0.45 : 1,
                  position: 'relative',
                  overflow: 'hidden',
                  gap: mob ? '16px' : '20px'
                }}
              >
                 {/* Decorative subtle platform logo watermark background */}
                 <div style={{
                   position: 'absolute',
                   bottom: '-15px',
                   right: '-15px',
                   width: '70px',
                   height: '70px',
                   borderRadius: '50%',
                   background: `${link.c}04`,
                   pointerEvents: 'none'
                 }} />

                 <div style={{ 
                   display: 'flex', 
                   flexDirection: mob ? 'row' : 'column', 
                   alignItems: mob ? 'center' : 'flex-start', 
                   gap: mob ? '16px' : '14px',
                   width: '100%'
                 }}>
                    {/* Icon visual container */}
                    <div style={{ 
                      width: '46px', 
                      height: '46px', 
                      background: `${link.c}10`, 
                      borderRadius: '14px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                       <link.i size={20} color={link.c} />
                    </div>
                    <div>
                       <div style={{ fontSize: '15px', fontWeight: 950, color: '#0f172a', marginBottom: '2px' }}>{link.l}</div>
                       <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.2px' }}>{link.s}</div>
                    </div>
                 </div>

                 {url !== '#' ? (
                   <div style={{
                     alignSelf: mob ? 'center' : 'flex-end',
                     display: 'flex',
                     alignItems: 'center',
                     gap: '4px',
                     fontSize: '11px',
                     fontWeight: 900,
                     color: link.c,
                     textTransform: 'uppercase',
                     letterSpacing: '0.5px',
                     marginTop: mob ? '0' : '8px'
                   }}>
                     Open Link <ArrowRight size={12} />
                   </div>
                 ) : (
                   <div style={{
                     alignSelf: mob ? 'center' : 'flex-end',
                     fontSize: '9px',
                     fontWeight: 800,
                     color: '#cbd5e1',
                     textTransform: 'uppercase',
                     letterSpacing: '0.5px',
                     background: '#f8fafc',
                     padding: '2px 8px',
                     borderRadius: '100px',
                     marginTop: mob ? '0' : '8px'
                   }}>
                     Not Connected
                   </div>
                 )}
              </motion.button>
            );
          })}
       </div>
    </div>
  );
};

export const TabEmptyState = ({ title, icon: Icon, mob, setActiveTab, tabId }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <div style={{ padding: mob ? '40px 20px' : '80px', textAlign: 'center', background: '#f8fafc', borderRadius: '40px', border: '1.5px dashed #cbd5e1', marginBottom: '40px', maxWidth: '800px', margin: '0 auto' }}>
         {Icon && <div style={{ width: '80px', height: '80px', background: '#fff', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 8px 32px rgba(0,0,0,0.03)' }}><Icon size={40} color="#cbd5e1" /></div>}
         <div style={{ fontSize: '24px', fontWeight: 950, color: '#94a3b8', marginBottom: '16px' }}>{title}</div>
         <div style={{ fontSize: '16px', color: '#cbd5e1', fontWeight: 600 }}>The creator hasn't updated this section yet.</div>
      </div>
      <TabNavigator activeTab={tabId} setActiveTab={setActiveTab} mob={mob} />
  </motion.div>
);
TabEmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  mob: PropTypes.bool,
  setActiveTab: PropTypes.func.isRequired,
  tabId: PropTypes.string.isRequired
};

export const GatedOverlay = ({ title, description, ctaText = "Unlock as Brand", onCtaClick }) => (
  <div style={{
    position: 'absolute',
    inset: 0,
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(16px) saturate(120%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 24px',
    zIndex: 10,
    textAlign: 'center',
    borderRadius: '32px'
  }}>
    <div style={{
      background: '#fff',
      padding: '40px 32px',
      borderRadius: '32px',
      maxWidth: '460px',
      boxShadow: '0 20px 50px rgba(15, 23, 42, 0.1)',
      border: '1px solid rgba(226, 232, 240, 0.8)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, rgba(255, 148, 49, 0.1) 0%, rgba(234, 88, 12, 0.1) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#EA580C',
        border: '1.5px solid rgba(234, 88, 12, 0.1)'
      }}>
        <Lock size={28} />
      </div>
      <div>
        <h4 style={{ fontSize: '20px', fontWeight: 950, color: '#0f172a', marginBottom: '8px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
          {title}
        </h4>
        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, fontWeight: 550, margin: 0 }}>
          {description}
        </p>
      </div>
      <button 
        onClick={onCtaClick}
        style={{
          background: 'linear-gradient(90deg, #FF9431, #EA580C)',
          color: '#fff',
          border: 'none',
          padding: '14px 32px',
          borderRadius: '100px',
          fontSize: '14px',
          fontWeight: 850,
          cursor: 'pointer',
          boxShadow: '0 12px 24px rgba(234, 88, 12, 0.25)',
          transition: 'transform 0.2s',
          width: '100%'
        }}
      >
        {ctaText}
      </button>
    </div>
  </div>
);
GatedOverlay.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ctaText: PropTypes.string,
  onCtaClick: PropTypes.func.isRequired
};
