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
            ? 'Unfollowed @CreatorBharat Official' 
            : '🎉 Following @CreatorBharat Official!' 
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
    <div style={{ background: '#fff', minHeight: 'auto', color: '#262626', paddingBottom: '100px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <Seo 
        title="Official Identity"
        description="Claim your verified digital handle on CreatorBharat. The infrastructure of trust for India's premier creator ecosystem."
        keywords="official creator handle, verified profile india, creator identity protocol"
        jsonLd={profileJsonLd}
      />
      
      <LiveTicker />

      <div style={{ maxWidth: '935px', margin: '0 auto', padding: mob ? '24px 16px' : '60px 20px 0' }}>
        
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
           <div style={{ display: 'flex', justifyContent: 'space-around', borderTop: '1px solid #efefef', borderBottom: '1px solid #efefef', padding: '12px 0', marginBottom: '28px', fontSize: '14px', color: '#262626' }}>
              <span style={{ textAlign: 'center' }}><strong>{postsCount}</strong><br/><span style={{ color: '#8e8e8e', fontSize: '12px' }}>posts</span></span>
              <span style={{ textAlign: 'center' }}><strong>{followersCount.toLocaleString()}</strong><br/><span style={{ color: '#8e8e8e', fontSize: '12px' }}>followers</span></span>
              <span style={{ textAlign: 'center' }}><strong>{followingCount}</strong><br/><span style={{ color: '#8e8e8e', fontSize: '12px' }}>following</span></span>
           </div>
        )}

        {/* Highlight Stories */}
        <div style={{ display: 'flex', gap: mob ? '16px' : '28px', marginBottom: '44px', overflowX: 'auto', paddingBottom: '12px' }}>
           {OFFICIAL_DATA.highlights.map((highlight) => {
              const Icon = highlight.icon;
              return (
                <div key={highlight.id} onClick={() => setActiveStory(highlight)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', flexShrink: 0 }}>
                   <div style={{ 
                     width: mob ? '64px' : '76px', 
                     height: mob ? '64px' : '76px', 
                     borderRadius: '50%', 
                     border: '2px solid #dbdbdb', 
                     padding: '3px',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     background: '#fff'
                   }}>
                      <div style={{ 
                        width: '100%', 
                        height: '100%', 
                        borderRadius: '50%', 
                        background: highlight.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff'
                      }}>
                         <Icon size={24} />
                      </div>
                   </div>
                   <span style={{ fontSize: '12px', fontWeight: 650, color: '#262626' }}>{highlight.label}</span>
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
          background: '#f1f5f9', 
          padding: '6px', 
          borderRadius: '100px', 
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
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
                   background: active ? '#0f172a' : 'transparent',
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
                   transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                   boxShadow: active ? '0 4px 12px rgba(15,23,42,0.15)' : 'none'
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
