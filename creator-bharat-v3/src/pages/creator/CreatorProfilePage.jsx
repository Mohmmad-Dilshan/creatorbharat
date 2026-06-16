import React, { useState, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../core/context';
import { fetchCreatorById } from '../../utils/platformService';
import { W, LS } from '../../utils/helpers';
import { ProfileHero } from '../../components/creators/profile/ProfileHero';
import { IdentityTab } from '../../components/creators/profile/IdentityTab';
import { MediaKitPreview } from '../../components/creators/profile/MediaKitPreview';
import { TAB_LIST, TabNavigator, TrustBadge, SocialLinkTree } from '../../components/creators/profile/ProfileShared';
import { Btn, Empty } from '../../components/common/Primitives';
import Seo from '../../components/common/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Zap, 
  Briefcase,
  Globe,
  Star,
  Sparkles,
  ArrowRight,
  Image as ImageIcon,
  MessageSquare,
  MapPin,
  Megaphone,
  Verified,
  Activity
} from 'lucide-react';

// Tab component imports
import { StoryTab } from '../../components/creators/profile/StoryTab';
import { GalleryTab } from '../../components/creators/profile/GalleryTab';
import { WorkTab } from '../../components/creators/profile/WorkTab';
import { ServicesTab } from '../../components/creators/profile/ServicesTab';
import { LocalCollabHub } from '../../components/creators/profile/LocalTab';
import { ReviewsTab } from '../../components/creators/profile/ReviewsTab';
import { PackagesTab } from '../../components/creators/profile/PackagesTab';
import { SponsorTab } from '../../components/creators/profile/SponsorTab';
import { ConnectTab } from '../../components/creators/profile/ConnectTab';
import { RateCreatorModal, CollabBriefModal } from '../../components/creators/profile/ProfileModals';

// --- MAIN PAGE ---

const getFallbackCreator = (id) => {
  if (id === 'empty') {
    return {
      id: 'empty',
      name: 'Empty Creator Profile',
      slug: 'empty',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
      city: 'Delhi',
      niche: 'Demo',
      bio: '',
      isVerified: false
    };
  }
  return {
    id: 'fallback',
    name: id.charAt(0).toUpperCase() + id.slice(1),
    slug: id,
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop',
    city: 'Mumbai',
    niche: 'Lifestyle & Tech',
    bio: 'Elite storyteller and digital creator dedicated to high-impact content and cultural narratives across Bharat.',
    isVerified: true,
    followers: 130000,
    score: 85,
    er: 4.8,
    likes: 1242,
    connections: '10K+',
    tagline: 'Expert in Lifestyle & Tech Storytelling | Building authentic brand identities across Bharat.'
  };
};

const ProfileTabContent = ({ 
  activeTab, c, stats, mob, onRateClick, navigate, onPackageSelect, dsp, setBriefOpen, setMediaKitOpen, setActiveTab 
}) => {
  switch (activeTab) {
    case 'identity':
      return <IdentityTab key="tab-identity" c={c} stats={stats} onRate={onRateClick} mob={mob} setActiveTab={setActiveTab} />;
    case 'story':
      return <StoryTab key="tab-story" c={c} mob={mob} setActiveTab={setActiveTab} />;
    case 'gallery':
      return <GalleryTab key="tab-gallery" c={c} mob={mob} setActiveTab={setActiveTab} />;
    case 'work':
      return <WorkTab key="tab-work" c={c} mob={mob} setActiveTab={setActiveTab} />;
    case 'services':
      return <ServicesTab key="tab-services" c={c} mob={mob} setActiveTab={setActiveTab} />;
    case 'local':
      return <LocalCollabHub key="tab-local" c={c} mob={mob} setActiveTab={setActiveTab} />;
    case 'reviews':
      return <ReviewsTab key="tab-reviews" c={c} mob={mob} navigate={navigate} onWriteReview={onRateClick} setActiveTab={setActiveTab} />;
    case 'packages':
      return <PackagesTab key="tab-packages" c={c} mob={mob} onSelect={onPackageSelect} setActiveTab={setActiveTab} />;
    case 'sponsor':
      return <SponsorTab key="tab-sponsor" c={c} mob={mob} st={dsp} setActiveTab={setActiveTab} />;
    case 'connect':
      return <ConnectTab key="tab-connect" c={c} mob={mob} dsp={dsp} setBriefOpen={setBriefOpen} setMediaKitOpen={setMediaKitOpen} setActiveTab={setActiveTab} />;
    default:
      return null;
  }
};
ProfileTabContent.propTypes = {
  activeTab: PropTypes.string.isRequired,
  c: PropTypes.object.isRequired,
  stats: PropTypes.object.isRequired,
  mob: PropTypes.bool,
  onRateClick: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  onPackageSelect: PropTypes.func.isRequired,
  dsp: PropTypes.func.isRequired,
  setBriefOpen: PropTypes.func.isRequired,
  setMediaKitOpen: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired
};

const ProfileSkeleton = ({ id, mob }) => {
  const heroPadding = mob ? '40px 16px 60px' : '80px 0 100px';
  const containerPadding = mob ? '0 16px' : '0 24px';
  const flexDir = mob ? 'column' : 'row';
  const avatarSize = mob ? '120px' : '180px';
  const alignStyle = mob ? 'center' : 'flex-start';
  const nameWidth = mob ? '80%' : '320px';
  const bioWidth1 = mob ? '95%' : '480px';
  const bioWidth2 = mob ? '85%' : '400px';
  const statsColumns = mob ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)';
  const sliceCount = mob ? 4 : 5;
  const bodyColumns = mob ? '1fr' : '2fr 1fr';

  return (
    <div style={{ minHeight: '100vh', background: '#fcfcfc', color: '#0f172a', paddingBottom: '100px' }}>
      {/* Injecting CSS Keyframes inline */}
      <style>{`
        @keyframes cbShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer-light {
          background: linear-gradient(90deg, #f8fafc 25%, #e2e8f0 37%, #f8fafc 63%);
          background-size: 200% 100%;
          animation: cbShimmer 1.5s infinite ease-in-out;
        }
      `}</style>

      {/* SKELETON HERO COVER (LIGHT WHITE) */}
      <div style={{ background: '#ffffff', padding: heroPadding, borderBottom: '1px solid #f1f5f9', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: containerPadding, display: 'flex', flexDirection: flexDir, gap: '32px', alignItems: 'center' }}>
          
          {/* Avatar Circle Shimmer */}
          <div className="shimmer-light" style={{ width: avatarSize, height: avatarSize, borderRadius: '50%', flexShrink: 0, border: '4px solid #fff', boxShadow: '0 12px 32px rgba(0,0,0,0.05)' }} />
          
          {/* Details Shimmer */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: alignStyle, gap: '16px', width: '100%' }}>
            
            {/* Saffron accent mini-pill */}
            <div className="shimmer-light" style={{ width: '100px', height: '20px', borderRadius: '100px' }} />
            
            {/* Creator Name pulse */}
            <div className="shimmer-light" style={{ width: nameWidth, height: '40px', borderRadius: '12px' }} />
            
            {/* Bio paragraph pulses */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', alignItems: alignStyle }}>
              <div className="shimmer-light" style={{ width: bioWidth1, height: '16px', borderRadius: '8px' }} />
              <div className="shimmer-light" style={{ width: bioWidth2, height: '16px', borderRadius: '8px' }} />
            </div>

            {/* Verification & Button Group */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '12px', width: '100%', justifyContent: alignStyle }}>
              <div className="shimmer-light" style={{ width: '120px', height: '36px', borderRadius: '100px' }} />
              <div className="shimmer-light" style={{ width: '140px', height: '36px', borderRadius: '100px' }} />
            </div>

          </div>
        </div>
      </div>

      {/* STATS STRIP SHIMMER */}
      <div style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9', padding: '24px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: containerPadding, display: 'grid', gridTemplateColumns: statsColumns, gap: '16px' }}>
          {[1, 2, 3, 4, 5].slice(0, sliceCount).map(idx => (
            <div key={idx} className="shimmer-light" style={{ height: '70px', borderRadius: '16px', border: '1px solid #f1f5f9' }} />
          ))}
        </div>
      </div>

      {/* STICKY NAV TABS SHIMMER */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9', padding: '16px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: containerPadding, display: 'flex', gap: '24px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[1, 2, 3, 4, 5, 6].map(idx => (
            <div key={idx} className="shimmer-light" style={{ width: '100px', height: '32px', borderRadius: '8px', flexShrink: 0 }} />
          ))}
        </div>
      </div>

      {/* BODY COMPONENT SHIMMER */}
      <div style={{ maxWidth: '1100px', margin: '40px auto 0', padding: containerPadding }}>
        <div style={{ display: 'grid', gridTemplateColumns: bodyColumns, gap: '40px' }}>
          
          {/* Main Content Pane */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="shimmer-light" style={{ height: '350px', borderRadius: '32px' }} />
            <div className="shimmer-light" style={{ height: '220px', borderRadius: '32px' }} />
          </div>

          {/* Sidebar Connect Pane */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="shimmer-light" style={{ height: '200px', borderRadius: '32px' }} />
            <div className="shimmer-light" style={{ height: '140px', borderRadius: '32px' }} />
          </div>

        </div>
      </div>

      {/* Floating sweep loading tag */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', padding: '12px 24px', borderRadius: '100px', color: '#0f172a', fontSize: '11px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 12px 32px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
        <ShieldCheck size={14} color="#FF9431" style={{ animation: 'spin 2s infinite linear' }} />
        <span>Authenticating {id}..</span>
      </div>

    </div>
  );
};
ProfileSkeleton.propTypes = {
  id: PropTypes.string,
  mob: PropTypes.bool
};


export default function CreatorProfilePage() {
  const { id } = useParams();
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [c, setC] = useState(st?.sel?.creator || null);
  const [ld, setLd] = useState(!c);
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [activeTab, setActiveTab] = useState('identity');
  const [rateOpen, setRateOpen] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);
  const [mediaKitOpen, setMediaKitOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [navVisible, setNavVisible] = useState(true);
  const [tabScrolled, setTabScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  useEffect(() => {
    globalThis.dispatchEvent(new CustomEvent('cb-tab-change', { detail: activeTab }));
    return () => {
      globalThis.dispatchEvent(new CustomEvent('cb-tab-change', { detail: 'identity' }));
    };
  }, [activeTab]);

  useEffect(() => {
    const handleScroll = () => {
      const curY = globalThis.scrollY;
      setTabScrolled(curY > 100);
      lastY.current = curY;
    };
    globalThis.addEventListener('scroll', handleScroll, { passive: true });
    return () => globalThis.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (st?.sel?.creator?.packages && (String(st?.sel?.creator?.id) === String(id) || st?.sel?.creator?.slug === id)) {
      setC(st.sel.creator);
      setLd(false);
      return;
    }
    if (!id) return;
    setLd(true);
    const triggerFetch = async () => {
      if (id === 'fallback') {
        setC(getFallbackCreator(id));
        setLd(false);
        return;
      }
      try {
        const found = await fetchCreatorById(id);
        setC(found || getFallbackCreator(id));
      } catch (err) {
        if (import.meta.env.DEV && (err.name === 'TypeError' || err.message?.includes('Failed to fetch') || err.message?.includes('fetch'))) {
          console.warn('Creator Profile fetch warning (API sleeping/offline, using seed fallback):', err.message);
        } else {
          console.error('Creator not found, loading Elite Demo profile:', err);
        }
        setC(getFallbackCreator(id));
      } finally {
        setLd(false);
      }
    };
    triggerFetch();
  }, [id, st?.sel?.creator]);

  const stats = useMemo(() => {
    if (!c) return { followers: 0, er: 0, reach: 0, authenticity: 0, score: 0 };
    return { 
      followers: c.followers || 130000, 
      er: c.er || 4.8, 
      reach: Math.floor((c.followers || 130000) * 0.85), 
      authenticity: c.authenticity || 98.2, 
      score: c.score || 85 
    };
  }, [c]);

  const handleRateClick = () => {
    if (!st?.user) { dsp({ t: 'TOAST', d: { type: 'warn', msg: 'Please login to rate this creator' } }); return; }
    setRateOpen(true);
  };

  const handleReviewSubmit = (newReview) => {
    const updatedReviews = c.reviews ? [newReview, ...c.reviews] : [newReview];
    const updatedCreator = {
      ...c,
      reviews: updatedReviews,
      reviews_count: (c.reviews_count || (c.reviews ? c.reviews.length : 3)) + 1
    };
    setC(updatedCreator);

    // Save to LocalStorage
    const allC = LS.get('cb_creators', []);
    const idx = allC.findIndex(cr => cr.id === c.id || cr.email === c.email || cr.slug === c.slug);
    if (idx !== -1) {
      allC[idx] = updatedCreator;
      LS.set('cb_creators', allC);
    }
  };

  const handlePackageSelect = (pkg) => {
    if (!st?.user) { 
      dsp({ t: 'TOAST', d: { type: 'warn', msg: 'Please login as a Brand to book packages' } }); 
      navigate('/login');
      return; 
    }
    setSelectedPkg(pkg);
    setBriefOpen(true);
  };

  const handleMediaKitOpen = () => {
    if (!st?.user) {
      dsp({ t: 'TOAST', d: { type: 'warn', msg: 'Please login as a Brand to download the official Media Kit' } });
      navigate('/login');
      return;
    }
    setMediaKitOpen(true);
  };

  const profileJsonLd = useMemo(() => {
    if (!c) return null;
    return {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "mainEntity": {
        "@type": "Person",
        "name": c.name,
        "description": c.bio || `${c.name} is an elite storyteller and verified digital content creator on CreatorBharat.`,
        "image": c.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=0f172a&color=fff`,
        "jobTitle": c.niche || "Content Creator",
        "homeLocation": {
          "@type": "Place",
          "name": c.city || "India"
        },
        "url": typeof window !== 'undefined' ? window.location.href : `https://creatorbharat.com/creator/${c.id || c.slug || 'profile'}`,
        "interactionStatistic": [
          {
            "@type": "InteractionCounter",
            "interactionType": "https://schema.org/FollowAction",
            "userInteractionCount": stats?.followers || 12000
          }
        ]
      }
    };
  }, [c, stats]);

  const tabBarRef = useRef(null);
  const contentRef = useRef(null);

  // When tab changes: scroll to content top + scroll active tab into view in bar
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    // Scroll page so content area is just below sticky tab bar
    setTimeout(() => {
      if (tabBarRef.current) {
        const barBottom = tabBarRef.current.getBoundingClientRect().bottom;
        const scrollTarget = globalThis.scrollY + barBottom - 8;
        globalThis.scrollTo({ top: scrollTarget, behavior: 'smooth' });
      }
    }, 40);

    // Scroll active tab into view horizontally in the sticky bar (mobile)
    setTimeout(() => {
      if (tabBarRef.current) {
        const activeBtn = tabBarRef.current.querySelector(`[data-tabid="${tabId}"]`);
        if (activeBtn) activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }, 20);
  };

  if (ld) return <ProfileSkeleton id={id} mob={mob} />;
  if (!c) return <div style={{ ...W(), padding: '120px 20px', textAlign: 'center' }}><Empty title="Profile Not Found" onCta={() => navigate('/creators')} /></div>;

  // Sticky offset — always account for Navbar height so tab bar hugs just below it
  const NAVBAR_H_DESKTOP = 72;
  const NAVBAR_H_MOBILE = 60;
  const stickyTop = '0px';

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', paddingBottom: mob ? '0px' : '40px', overflow: 'visible', display: 'flex', flexDirection: 'column' }}>
      <Seo 
        title={`${c.name} (@${c.handle || 'creator'}) — Verified Profile`}
        description={c.bio || `${c.name} is an elite storytelling content creator specializing in ${Array.isArray(c.niche) ? c.niche.join(', ') : (c.niche || 'Digital Content')} from ${c.city || 'Bharat'}. View portfolio, reach stats & campaign history on CreatorBharat.`}
        image={c.photo || c.image || c.profile_pic || c.avatarUrl}
        type="profile"
        jsonLd={profileJsonLd}
      />
      <ProfileHero c={c} stats={stats} navigate={navigate} st={st} dsp={dsp} mob={mob} onRate={handleRateClick} onContact={() => setActiveTab('connect')} onMediaKit={handleMediaKitOpen} navVisible={navVisible} onBrief={handlePackageSelect} />
      
      {/* ── STICKY TAB BAR: Apple 2026 Glassmorphism Floating Pill ── */}
      <div
        ref={tabBarRef}
        style={{
          position: 'sticky',
          top: stickyTop,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          padding: mob ? '8px 12px' : '12px 24px',
          transition: 'top 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <style>{`
          @keyframes cb-tab-pop {
            0% { transform: scale(0.92); opacity: 0.6; }
            60% { transform: scale(1.05); }
            100% { transform: scale(1); opacity: 1; }
          }
          .cb-pill-btn { -webkit-tap-highlight-color: transparent; }
          .cb-pill-btn:hover .cb-pill-hover { opacity: 1 !important; }
        `}</style>

        {/* The floating pill container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: mob ? '2px' : '3px',
            padding: mob ? '5px' : '6px',
            background: tabScrolled
              ? 'rgba(255,255,255,0.96)'
              : 'rgba(255,255,255,0.82)',
            backdropFilter: 'blur(32px) saturate(200%)',
            WebkitBackdropFilter: 'blur(32px) saturate(200%)',
            borderRadius: '100px',
            border: '1px solid rgba(226,232,240,0.6)',
            boxShadow: tabScrolled
              ? '0 8px 32px rgba(15,23,42,0.16), 0 2px 8px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.95)'
              : '0 4px 24px rgba(15,23,42,0.10), 0 1px 6px rgba(15,23,42,0.05), inset 0 1px 0 rgba(255,255,255,0.95)',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            maxWidth: '100%',
            WebkitOverflowScrolling: 'touch',
            transition: 'box-shadow 0.3s ease, background 0.3s ease',
          }}
        >
          {[
            { id: 'identity',  label: 'Identity',    icon: Activity,      group: 'main' },
            { id: 'story',     label: 'Story',       icon: Globe,         group: 'main' },
            { id: 'gallery',   label: 'Gallery',     icon: ImageIcon,     group: 'main' },
            { id: 'work',      label: 'Work',        icon: Briefcase,     group: 'main' },
            { id: 'services',  label: 'Services',    icon: Sparkles,      group: 'main' },
            { id: 'local',     label: 'Local',       icon: MapPin,        group: 'main' },
            { id: 'reviews',   label: 'Reviews',     icon: Star,          group: 'main' },
            { id: 'packages',  label: 'Packages',    icon: Zap,           group: 'action' },
            { id: 'sponsor',   label: 'Sponsored',   icon: Megaphone,     group: 'action' },
            { id: 'connect',   label: 'Connect',     icon: MessageSquare, group: 'action' },
          ].map((t, idx, arr) => {
            const isActive = activeTab === t.id;
            const isAction = t.group === 'action';
            const showDivider = !mob && idx > 0 && arr[idx - 1].group !== t.group;

            const activeBg = isAction
              ? 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)'
              : 'linear-gradient(135deg, #0073b1 0%, #0ea5e9 100%)';
            const activeGlow = isAction
              ? '0 4px 14px rgba(255,148,49,0.5), 0 1px 3px rgba(0,0,0,0.1)'
              : '0 4px 14px rgba(0,115,177,0.4), 0 1px 3px rgba(0,0,0,0.1)';

            return (
              <React.Fragment key={t.id}>
                {showDivider && (
                  <div style={{
                    width: '1px',
                    height: '18px',
                    background: 'linear-gradient(180deg, transparent 0%, rgba(203,213,225,0.7) 50%, transparent 100%)',
                    flexShrink: 0,
                    margin: '0 2px',
                  }} />
                )}
                <button
                  className="cb-pill-btn"
                  data-tabid={t.id}
                  onClick={() => handleTabChange(t.id)}
                  style={{
                    position: 'relative',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: mob ? 4 : 6,
                    padding: isActive
                      ? (mob ? '7px 13px' : '8px 16px')
                      : (mob ? '7px 10px' : '8px 13px'),
                    background: isActive ? activeBg : 'transparent',
                    border: 'none',
                    borderRadius: '100px',
                    cursor: 'pointer',
                    color: isActive ? '#fff' : '#64748b',
                    fontSize: mob ? 11 : 12.5,
                    fontWeight: isActive ? 800 : 600,
                    whiteSpace: 'nowrap',
                    boxShadow: isActive ? activeGlow : 'none',
                    transition: 'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    outline: 'none',
                    letterSpacing: isActive ? '-0.01em' : '0',
                    animation: isActive ? 'cb-tab-pop 0.28s cubic-bezier(0.34,1.56,0.64,1) forwards' : 'none',
                  }}
                >
                  {/* Hover ghost for inactive */}
                  {!isActive && (
                    <span
                      className="cb-pill-hover"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '100px',
                        background: isAction ? 'rgba(255,148,49,0.08)' : 'rgba(15,23,42,0.06)',
                        opacity: 0,
                        transition: 'opacity 0.15s ease',
                        pointerEvents: 'none',
                      }}
                    />
                  )}

                  <t.icon size={mob ? 12 : 13} strokeWidth={isActive ? 2.5 : 2} style={{ flexShrink: 0 }} />

                  <span>{t.label}</span>

                  {/* AD badge */}
                  {t.id === 'sponsor' && !isActive && (
                    <span style={{
                      background: 'rgba(255,148,49,0.12)',
                      color: '#FF9431',
                      fontSize: 7.5,
                      fontWeight: 900,
                      padding: '2px 5px',
                      borderRadius: 100,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      border: '1px solid rgba(255,148,49,0.18)',
                    }}>AD</span>
                  )}
                  {/* HIRE badge */}
                  {t.id === 'connect' && !isActive && (
                    <span style={{
                      background: 'rgba(16,185,129,0.1)',
                      color: '#10B981',
                      fontSize: 7.5,
                      fontWeight: 900,
                      padding: '2px 5px',
                      borderRadius: 100,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      border: '1px solid rgba(16,185,129,0.18)',
                    }}>HIRE</span>
                  )}

                  {/* Shimmer overlay on active */}
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '100px',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 60%)',
                      pointerEvents: 'none',
                    }} />
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div ref={contentRef} id="profile-content-area" style={{ ...W(1200), padding: mob ? '0 16px 80px' : '40px 24px 0px', display: 'flex', flexDirection: 'column', flex: 1 }}>
         <AnimatePresence mode="wait">
            <ProfileTabContent 
               activeTab={activeTab}
               c={c}
               stats={stats}
               mob={mob}
               onRateClick={handleRateClick}
               navigate={navigate}
               onPackageSelect={handlePackageSelect}
               dsp={dsp}
               setBriefOpen={setBriefOpen}
               setMediaKitOpen={handleMediaKitOpen}
               setActiveTab={handleTabChange}
            />
         </AnimatePresence>
        {activeTab === 'identity' && (
         <section style={{ 
           marginTop: mob ? '24px' : '100px', 
           padding: mob ? '24px 16px' : '50px 40px', 
           background: '#0f172a', 
           position: 'relative', 
           overflow: 'hidden',
           borderTop: '1px solid rgba(255,255,255,0.05)'
         }}>
            <div style={{ position: 'absolute', top: '-150px', right: '-150px', width: '350px', height: '350px', background: '#FF9431', borderRadius: '50%', filter: 'blur(130px)', opacity: 0.08, pointerEvents: 'none' }} />
            <div style={{ 
              maxWidth: '1200px', 
              margin: '0 auto', 
              position: 'relative', 
              zIndex: 1, 
              display: 'flex', 
              flexDirection: mob ? 'column' : 'row', 
              justifyContent: 'space-between', 
              alignItems: mob ? 'stretch' : 'center',
              gap: mob ? '16px' : '48px'
            }}>
               <div style={{ flex: 1.2, textAlign: mob ? 'center' : 'left' }}>
                  <h2 style={{ 
                    fontSize: mob ? '20px' : '36px', 
                    fontWeight: 950, 
                    color: '#fff', 
                    letterSpacing: '-0.03em', 
                    marginBottom: mob ? '6px' : '12px',
                    fontFamily: 'Outfit, sans-serif',
                    lineHeight: 1.15
                  }}>
                    Ready to Scale Your <span style={{ color: '#FF9431' }}>Brand Legacy?</span>
                  </h2>
                  <p style={{ 
                    fontSize: mob ? '12px' : '15px', 
                    color: '#94a3b8', 
                    fontWeight: 500, 
                    margin: 0, 
                    lineHeight: 1.4,
                    maxWidth: mob ? '100%' : '560px'
                  }}>
                    Join the exclusive circle of Bharat's most influential voices and top-tier brands building the future of digital storytelling.
                  </p>
               </div>

               <div style={{ 
                 flex: 1, 
                 display: 'flex', 
                 flexDirection: 'row', 
                 gap: mob ? '10px' : '16px',
                 justifyContent: mob ? 'stretch' : 'flex-end',
                 alignItems: 'stretch',
                 width: mob ? '100%' : 'auto'
               }}>
                  {/* Brand Action */}
                  <div 
                    onClick={() => navigate(st?.role === 'brand' ? '/brand-dashboard' : '/creators')}
                    style={{ 
                      background: mob ? '#FF9431' : 'rgba(255,255,255,0.02)', 
                      border: mob ? 'none' : '1px solid rgba(255,255,255,0.06)', 
                      padding: mob ? '12px 10px' : '16px 20px', 
                      borderRadius: mob ? '16px' : '20px', 
                      flex: 1, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: mob ? '4px' : '10px',
                      backdropFilter: 'blur(8px)',
                      textAlign: 'center',
                      cursor: 'pointer',
                      justifyContent: 'center',
                      alignItems: 'center',
                      boxShadow: mob ? '0 4px 12px rgba(255,148,49,0.2)' : 'none',
                      transition: 'all 0.2s ease',
                      WebkitTapHighlightColor: 'transparent'
                    }}
                  >
                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                        <Briefcase size={mob ? 12 : 14} color={mob ? '#fff' : '#FF9431'} />
                        <span style={{ fontSize: mob ? '9px' : '11px', fontWeight: 900, color: mob ? '#fff' : '#FF9431', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: mob ? 0.9 : 1 }}>For Brands</span>
                     </div>
                     {!mob && <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: 1.4 }}>Hire {c?.name?.split(' ')[0] || 'elite creators'} or explore the network.</p>}
                     
                     {mob ? (
                       <span style={{ fontSize: '12px', fontWeight: 850, color: '#fff' }}>
                         {st?.role === 'brand' ? 'Console' : 'Hire Talent'}
                       </span>
                     ) : (
                       <Btn 
                         full 
                         sm 
                         style={{ background: '#FF9431', color: '#fff', borderRadius: '100px', padding: '10px 18px', fontSize: '13px', fontWeight: 800, border: 'none', boxShadow: '0 4px 12px rgba(255,148,49,0.15)' }} 
                         onClick={(e) => { e.stopPropagation(); navigate(st?.role === 'brand' ? '/brand-dashboard' : '/creators'); }}
                       >
                         {st?.role === 'brand' ? 'Brand Console' : 'Hire Creators'}
                       </Btn>
                     )}
                  </div>

                  {/* Creator Action */}
                  <div 
                    onClick={() => navigate(st?.role === 'creator' ? '/creator/profile' : '/apply')}
                    style={{ 
                      background: mob ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)', 
                      border: mob ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.06)', 
                      padding: mob ? '12px 10px' : '16px 20px', 
                      borderRadius: mob ? '16px' : '20px', 
                      flex: 1, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: mob ? '4px' : '10px',
                      backdropFilter: 'blur(8px)',
                      textAlign: 'center',
                      cursor: 'pointer',
                      justifyContent: 'center',
                      alignItems: 'center',
                      transition: 'all 0.2s ease',
                      WebkitTapHighlightColor: 'transparent'
                    }}
                  >
                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                        <Verified size={mob ? 12 : 14} color="#10B981" />
                        <span style={{ fontSize: mob ? '9px' : '11px', fontWeight: 900, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.5px' }}>For Creators</span>
                     </div>
                     {!mob && <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: 1.4 }}>Get verified and scale your profile audits.</p>}
                     
                     {mob ? (
                       <span style={{ fontSize: '12px', fontWeight: 850, color: '#fff' }}>
                         {st?.role === 'creator' ? 'Workspace' : 'Get Verified'}
                       </span>
                     ) : (
                       <Btn 
                         full 
                         sm 
                         style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', borderRadius: '100px', padding: '10px 18px', fontSize: '13px', fontWeight: 800 }} 
                         onClick={(e) => { e.stopPropagation(); navigate(st?.role === 'creator' ? '/creator/profile' : '/apply'); }}
                       >
                         {st?.role === 'creator' ? 'Edit Workspace' : 'Get Verified'}
                       </Btn>
                     )}
                  </div>
               </div>
            </div>
         </section>
      )}
      </div>

      <RateCreatorModal open={rateOpen} name={c?.name || 'Creator'} dsp={dsp} onSubmit={handleReviewSubmit} user={st?.user} onClose={() => setRateOpen(false)} />
      <CollabBriefModal open={briefOpen} pkg={selectedPkg} creatorName={c?.name || 'Creator'} dsp={dsp} onClose={() => setBriefOpen(false)} />
      {c && stats && <MediaKitPreview open={mediaKitOpen} onClose={() => setMediaKitOpen(false)} creator={c} stats={stats} />}
    </div>
  );
}
