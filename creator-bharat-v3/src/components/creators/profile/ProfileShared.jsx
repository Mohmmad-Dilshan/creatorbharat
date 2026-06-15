import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, ImageIcon, Play, Briefcase, Globe, Mic2 } from 'lucide-react';

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

export const TrustBadge = () => (
  <div style={{ background: '#f8fafc', padding: '16px 24px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #e2e8f0', width: '100%', marginTop: '40px' }}>
    <ShieldCheck size={20} color="#10B981" />
    <span style={{ fontSize: '12px', fontWeight: 900, color: '#475569', textTransform: 'uppercase', letterSpacing: '1px' }}>
      All metrics, location data, and brand history verified by CreatorBharat Official Audit
    </span>
  </div>
);

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
        style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 10 }}
      >
        {prevTab ? (
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => setActiveTab(prevTab.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#f1f5f9', border: 'none', padding: '12px 18px',
              borderRadius: 100, cursor: 'pointer', color: '#64748b',
              fontWeight: 700, fontSize: 13, flexShrink: 0, whiteSpace: 'nowrap',
            }}
          >
            <ArrowRight size={13} style={{ transform: 'rotate(180deg)' }} />
            Back
          </motion.button>
        ) : <div style={{ width: 8 }} />}

        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 5, alignItems: 'center' }}>
          {TAB_LIST.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              title={t.label}
              style={{
                width: t.id === activeTab ? 16 : 6,
                height: 6, borderRadius: 100, border: 'none',
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

        {nextTab && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(nextTab.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              background: isActionTab ? 'linear-gradient(135deg,#FF9431,#EA580C)' : 'linear-gradient(135deg,#0073b1,#0ea5e9)',
              border: 'none', padding: '12px 20px', borderRadius: 100,
              cursor: 'pointer', color: '#fff', fontWeight: 800, fontSize: 13,
              flexShrink: 0, whiteSpace: 'nowrap',
              boxShadow: isActionTab ? '0 4px 16px rgba(255,148,49,0.3)' : '0 4px 16px rgba(0,115,177,0.25)',
            }}
          >
            Next
            <ArrowRight size={13} />
          </motion.button>
        )}
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

export const SocialLinkTree = ({ links = {}, mob }) => {
  // Master list of all possible platforms a creator can add
  const MASTER_PLATFORMS = [
    { id: 'instagram', l: 'Official Instagram', s: 'Visual Community', i: ImageIcon, c: '#E4405F' },
    { id: 'youtube', l: 'YouTube Channel', s: 'Video Content & Vlogs', i: Play, c: '#FF0000' },
    { id: 'linkedin', l: 'Professional LinkedIn', s: 'Brand Collaborations', i: Briefcase, c: '#0077B5' },
    { id: 'twitter', l: 'Twitter (X)', s: 'Real-time Thoughts', i: Globe, c: '#000' },
    { id: 'facebook', l: 'Facebook Page', s: 'Community & Groups', i: Globe, c: '#1877F2' },
    { id: 'snapchat', l: 'Snapchat', s: 'Daily Stories & Filters', i: ImageIcon, c: '#FFFC00' },
    { id: 'pinterest', l: 'Pinterest', s: 'Moodboards & Ideas', i: ImageIcon, c: '#E60023' },
    { id: 'twitch', l: 'Twitch', s: 'Live Streaming', i: Play, c: '#9146FF' },
    { id: 'spotify', l: 'Spotify / Podcasts', s: 'Podcasts & Audio', i: Mic2, c: '#1DB954' },
    { id: 'discord', l: 'Discord Server', s: 'Exclusive Community', i: Globe, c: '#5865F2' },
    { id: 'reddit', l: 'Reddit', s: 'Subreddit Discussions', i: Globe, c: '#FF4500' },
    { id: 'website', l: 'Official Website', s: 'Portfolio & Media Kit', i: Globe, c: '#FF9431' }
  ];

  // Optional logic: Only show platforms the creator has filled out. 
  // If no links exist (dummy data phase), show a default set to keep UI intact.
  const activeLinks = Object.keys(links || {}).length > 0 
    ? MASTER_PLATFORMS.filter(p => links?.[p.id]) 
    : MASTER_PLATFORMS.slice(0, 5);

  if (activeLinks.length === 0) return null;

  return (
    <div style={{ padding: mob ? '32px 24px' : '48px', borderRadius: '40px', marginBottom: '40px', background: '#fff', border: '1.5px solid #f1f5f9' }}>
       <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a', marginBottom: '12px' }}>The Digital Ecosystem</h3>
          <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>Connect with me across all professional platforms.</p>
       </div>
       <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', margin: '0 auto' }}>
          {activeLinks.map(link => {
            const url = links?.[link.id] || '#';
            return (
              <button 
                key={link.id}
                onClick={() => window.open(url, '_blank')}
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                  padding: '20px 24px', background: '#f8fafc', border: '1.5px solid #f1f5f9', 
                  borderRadius: '24px', cursor: 'pointer', transition: 'all 0.2s', width: '100%', textAlign: 'left'
                }}
              >
                 <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '44px', height: '44px', background: `${link.c}10`, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <link.i size={20} color={link.c} />
                    </div>
                    <div>
                       <div style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a' }}>{link.l}</div>
                       <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700 }}>{link.s}</div>
                    </div>
                 </div>
                 <ArrowRight size={18} color="#cbd5e1" />
              </button>
            );
          })}
       </div>
    </div>
  );
};
