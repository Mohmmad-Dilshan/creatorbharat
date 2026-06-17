// Production Ready - Build Trigger 2026-06-14
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { scrollToTop } from '../../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Grid, 
  Cpu, 
  BarChart3
} from 'lucide-react';
import Seo from '@/components/common/SEO';
import { useApp } from '@/core/context';
import { fetchCreators } from '@/utils/platformService';

// Extracted Feature Components & Data
import { OFFICIAL_DATA } from '@/components/features/official/officialData';
import LiveTicker from '@/components/features/official/LiveTicker';
import ProfileHeader from '@/components/features/official/ProfileHeader';
import TabContent from '@/components/features/official/TabContent';
import StoryViewer from '@/components/features/official/StoryViewer';
import AuthRequiredModal from '@/components/features/official/AuthRequiredModal';

export default function OfficialProfilePage() {
  const navigate = useNavigate();
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [activeTab, setActiveTab] = useState('posts');
  const [activeStory, setActiveStory] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [lang, setLang] = useState('en');
  const [creatorsCount, setCreatorsCount] = useState(0);

  const isFollowing = st?.follows?.includes('creatorbharat-official');

  const handleFollow = () => {
    if (st?.user) {
      const currentlyFollowing = st?.follows?.includes('creatorbharat-official');
      dsp({ t: 'FOLLOW', id: 'creatorbharat-official' });
      dsp({ 
        t: 'TOAST', 
        d: { 
          type: currentlyFollowing ? 'info' : 'success', 
          msg: currentlyFollowing 
            ? 'Unfollowed @CreatorBharat.Official' 
            : '🎉 Following @CreatorBharat.Official!' 
        } 
      });
    } else {
      setShowAuthModal(true);
    }
  };

  const handleMessage = () => {
    if (st?.user) {
      if (st.role === 'creator') {
        navigate('/creator/messages');
      } else {
        dsp({
          t: 'TOAST',
          d: {
            type: 'success',
            msg: '📩 Message session initialized with HQ. Our team will contact you!'
          }
        });
      }
    } else {
      setShowAuthModal(true);
    }
  };

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    scrollToTop();

    // Fetch creators from the database to compute real stats
    const loadRealStats = async () => {
      try {
        const list = await fetchCreators();
        if (list) {
          setCreatorsCount(list.length);
        }
      } catch (e) {
        console.warn('Failed to load creators list for dynamic stats:', e);
      }
    };
    loadRealStats();

    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const content = OFFICIAL_DATA[lang];

  // Dynamic statistics calculations
  const postsCount = OFFICIAL_DATA.posts.length;
  const followersCount = 58420 + (isFollowing ? 1 : 0);
  const followingCount = 120 + creatorsCount;

  const profileJsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Organization",
      "name": "CreatorBharat",
      "alternateName": "क्रिएटरभारत ऑफिशियल",
      "url": "https://creatorbharat.com",
      "logo": "https://creatorbharat.com/logo.png",
      "description": "India's premier creator discovery ecosystem. Connecting brands with authentic Bharat talent.",
      "sameAs": [
        "https://www.linkedin.com/company/creatorbharat"
      ],
      "founder": {
        "@type": "Person",
        "name": "Mohmmad Dilshan",
        "jobTitle": "Founder & Chief Architect",
        "worksFor": {
          "@type": "Organization",
          "name": "CreatorBharat"
        }
      }
    }
  }), []);

  return (
    <div style={{ 
      background: '#ffffff', 
      minHeight: '100vh', 
      color: '#475569', 
      paddingBottom: '100px', 
      fontFamily: 'Outfit, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Seo 
        title="Official Identity"
        description="Claim your verified digital handle on CreatorBharat. The infrastructure of trust for India's premier creator ecosystem."
        keywords="official creator handle, verified profile india, creator identity protocol"
        jsonLd={profileJsonLd}
      />
      
      {/* Background glow meshes */}
      <div style={{ position: 'absolute', top: '-10%', left: '-15%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255, 148, 49, 0.08) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(50px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '30%', right: '-15%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(60px)', zIndex: 0 }} />
      
      <LiveTicker />

      <div style={{ maxWidth: '935px', margin: '0 auto', padding: mob ? '24px 16px' : '60px 20px 0', position: 'relative', zIndex: 1 }}>
        
        <ProfileHeader 
          mob={mob} 
          content={content} 
          lang={lang} 
          setLang={setLang} 
          isFollowing={isFollowing}
          onFollow={handleFollow}
          onMessage={handleMessage}
          postsCount={postsCount}
          followersCount={followersCount}
          followingCount={followingCount}
        />

        {/* Mobile Stats Row */}
        {mob && (
           <div style={{ display: 'flex', justifyContent: 'space-around', borderTop: '1px solid rgba(15, 23, 42, 0.06)', borderBottom: '1px solid rgba(15, 23, 42, 0.06)', padding: '16px 0', marginBottom: '28px', fontSize: '14px', color: '#475569' }}>
              <span style={{ textAlign: 'center' }}><strong style={{ color: '#0f172a', fontSize: '16px' }}>{postsCount}</strong><br/><span style={{ color: '#64748b', fontSize: '12px', fontWeight: 650 }}>posts</span></span>
              <span style={{ textAlign: 'center' }}><strong style={{ color: '#0f172a', fontSize: '16px' }}>{followersCount.toLocaleString()}</strong><br/><span style={{ color: '#64748b', fontSize: '12px', fontWeight: 650 }}>followers</span></span>
              <span style={{ textAlign: 'center' }}><strong style={{ color: '#0f172a', fontSize: '16px' }}>{followingCount}</strong><br/><span style={{ color: '#64748b', fontSize: '12px', fontWeight: 650 }}>following</span></span>
           </div>
        )}

        {/* Highlight Stories */}
        <div style={{ display: 'flex', gap: mob ? '16px' : '28px', marginBottom: '44px', overflowX: 'auto', paddingBottom: '12px', scrollbarWidth: 'none' }}>
           {OFFICIAL_DATA.highlights.map((highlight) => {
              const Icon = highlight.icon;
              return (
                <div key={highlight.id} onClick={() => setActiveStory(highlight)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', flexShrink: 0 }}>
                   <div style={{ 
                     width: mob ? '64px' : '76px', 
                     height: mob ? '64px' : '76px', 
                     borderRadius: '50%', 
                     background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
                     border: '1.5px solid #cbd5e1', 
                     padding: '3px',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                     transition: 'all 0.22s ease'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.borderColor = '#FF9431';
                     e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 148, 49, 0.2)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.borderColor = '#cbd5e1';
                     e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
                   }}
                   >
                      <div style={{ 
                        width: '100%', 
                        height: '100%', 
                        borderRadius: '50%', 
                        background: `linear-gradient(135deg, ${highlight.color} 0%, rgba(15, 23, 42, 0.9) 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)'
                      }}>
                         <Icon size={20} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }} />
                      </div>
                   </div>
                   <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', letterSpacing: '0.2px' }}>{highlight.label}</span>
                </div>
              );
           })}
        </div>

        {/* Modern high-tech pill tab switcher */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          margin: '0 auto 40px',
          maxWidth: mob ? '100%' : '560px',
          background: '#f8fafc', 
          padding: '5px', 
          borderRadius: '100px', 
          border: '1.5px solid #cbd5e1',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.04)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          gap: '4px'
        }}>
           {[
             { id: 'posts', label: 'POSTS & PROTOCOLS', icon: Grid },
             { id: 'mastermind', label: 'MASTERMIND NODE', icon: Cpu },
             { id: 'insights', label: 'METRICS & SHARDS', icon: BarChart3 }
           ].map(tab => {
             const Icon = tab.icon;
             const active = activeTab === tab.id;
             return (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 style={{
                   flex: 1,
                   background: active ? 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)' : 'transparent',
                   border: 'none',
                   padding: mob ? '10px 8px' : '12px 20px',
                   borderRadius: '100px',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   gap: '8px',
                   color: active ? '#fff' : '#64748b',
                   fontSize: '11px',
                   fontWeight: 800,
                   letterSpacing: '1px',
                   cursor: 'pointer',
                   transition: 'all 0.25s ease',
                   boxShadow: active ? '0 4px 15px rgba(255,148,49,0.2)' : 'none'
                 }}
                 onMouseEnter={e => {
                   if (!active) {
                     e.currentTarget.style.color = '#0f172a';
                     e.currentTarget.style.background = '#e2e8f0';
                   }
                 }}
                 onMouseLeave={e => {
                   if (!active) {
                     e.currentTarget.style.color = '#64748b';
                     e.currentTarget.style.background = 'transparent';
                   }
                 }}
               >
                 <Icon size={14} />
                 {!mob && tab.label}
               </button>
             );
           })}
        </div>

        {/* Main Tab Content */}
        <TabContent activeTab={activeTab} mob={mob} />

      </div>

      {/* Highlights Modal Overlay */}
      <AnimatePresence>
         {activeStory && (
           <StoryViewer highlight={activeStory} onClose={() => setActiveStory(null)} />
         )}
      </AnimatePresence>

      {/* Auth Gated Modal */}
      <AuthRequiredModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}
