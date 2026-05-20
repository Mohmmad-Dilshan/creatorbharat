import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/core/context';
import { useFeaturedCreators } from '../../hooks/useFeaturedCreators';
import { useStateCreatorCounts } from '../../hooks/useStateCreatorCounts';
import { motion } from 'framer-motion';
import { 
  Video, Mic, Play, Camera, Headphones, Music, Film, Tv, Radio, 
  Sparkles, Heart, Globe, MessageSquare, Award, Star, Share2, Compass, Layers
} from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from '../../components/icons/SocialIcons';

// Home section components
import Hero from '../../components/home/Hero';
import FeaturedCreators from '../../components/home/FeaturedCreators';
import ImpactStats from '../../components/home/ImpactStats';
import IndiaMap3D from '../../components/IndiaMap3D/IndiaMap3D';
import CommunityPulse from '../../components/home/CommunityPulse';
import PlatformShowcase from '../../components/home/PlatformShowcase';
import Manifesto from '../../components/home/Manifesto';
import Testimonials from '../../components/home/Testimonials';
import Faq from '../../components/home/Faq';
import Cta from '../../components/home/Cta';
import Seo from '@/components/common/SEO';

const PAGE_BG_ICONS = [
  // Left Side
  { Icon: Mic, size: 28, top: '1200px', left: '1.5%', color: '#EA580C', delay: 1.5, rotate: 12 },
  { Icon: Play, size: 36, top: '2200px', left: '2.5%', color: '#FF9431', delay: 0.8, rotate: -8 },
  { Icon: Globe, size: 28, top: '3400px', left: '1%', color: '#3B82F6', delay: 2.2, rotate: 20 },
  { Icon: YoutubeIcon, size: 34, top: '4800px', left: '2%', color: '#EF4444', delay: 1.2, rotate: 8 },
  { Icon: Film, size: 28, top: '6200px', left: '1.5%', color: '#8B5CF6', delay: 2.5, rotate: -18 },
  { Icon: Award, size: 30, top: '7600px', left: '2.5%', color: '#10B981', delay: 0.3, rotate: 15 },
  { Icon: MessageSquare, size: 26, top: '9000px', left: '1.2%', color: '#3B82F6', delay: 1.8, rotate: -10 },
  { Icon: Layers, size: 28, top: '10500px', left: '2%', color: '#FF9431', delay: 2.8, rotate: 12 },
  { Icon: Radio, size: 26, top: '12000px', left: '1.8%', color: '#EA580C', delay: 0.5, rotate: -15 },

  // Right Side
  { Icon: Headphones, size: 26, top: '1400px', right: '1.8%', color: '#3B82F6', delay: 1.8, rotate: -10 },
  { Icon: InstagramIcon, size: 28, top: '2600px', right: '2.5%', color: '#E1306C', delay: 2.5, rotate: -18 },
  { Icon: Music, size: 26, top: '3900px', right: '1.5%', color: '#FF9431', delay: 0.9, rotate: -8 },
  { Icon: Tv, size: 28, top: '5400px', right: '2%', color: '#8B5CF6', delay: 1.2, rotate: 8 },
  { Icon: Sparkles, size: 26, top: '6900px', right: '1%', color: '#10B981', delay: 1.7, rotate: 12 },
  { Icon: Star, size: 28, top: '8300px', right: '2.2%', color: '#FF9431', delay: 0.3, rotate: 18 },
  { Icon: Heart, size: 24, top: '9800px', right: '1.8%', color: '#E1306C', delay: 2.8, rotate: -15 },
  { Icon: Share2, size: 26, top: '11200px', right: '2.5%', color: '#3B82F6', delay: 0.7, rotate: 10 },
  { Icon: Compass, size: 28, top: '12600px', right: '1.5%', color: '#10B981', delay: 2.1, rotate: -12 }
];

const FloatingBackground = ({ mob }) => {
  if (mob) return null;

  return (
    <div className="home-floating-bg-icons" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {PAGE_BG_ICONS.map((ico) => {
        const { Icon, size, top, left, right, color, delay, rotate } = ico;
        const style = {
          position: 'absolute',
          top,
          left,
          right,
          pointerEvents: 'none'
        };

        return (
          <motion.div
            key={`bg-icon-${color}-${top}-${left || right}`}
            style={style}
            initial={{ y: 0, rotate }}
            animate={{
              y: [0, -12, 0],
              rotate: [rotate, rotate + 4, rotate],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay,
            }}
          >
            <div style={{
              width: size + 24,
              height: size + 24,
              background: 'rgba(255, 255, 255, 0.75)',
              border: '1.5px solid rgba(0, 0, 0, 0.04)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
              backdropFilter: 'blur(12px)',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="floating-creator-btn"
            >
              <Icon size={size} color={color} strokeWidth={1.8} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

FloatingBackground.propTypes = {
  mob: PropTypes.bool
};

export default function HomePage() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [mob, setMob] = useState(window.innerWidth < 768);

  // All data fetching via hooks — zero raw API calls in this file
  const { creators, loading } = useFeaturedCreators(10);
  const { stateCounts } = useStateCreatorCounts();

  useEffect(() => {
    const onResize = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', onResize);

    // Setup high-performance intersection observer for smooth scroll reveals
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    // Wait a brief tick for DOM rendering, then query and observe
    const timer = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal-on-scroll');
      revealElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const go = (path, sel) => {
    // Standardize path with leading slash if it's a direct route
    const targetPath = path.startsWith('/') ? path : `/${path}`;
    
    if (path === 'creator-profile') {
      const id = sel?.creator?.id || sel?.id;
      if (id) {
        dsp({ t: 'GO', p: 'creator-profile', sel });
        navigate(`/creator/${id}`);
      } else {
        navigate('/creators');
      }
    } else {
      // Use standard GO action for context-aware navigation
      dsp({ t: 'GO', p: path.replace(/^\//, ''), sel });
      navigate(targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Section list — add/remove/reorder here only
  const sections = [
    { id: 'hero',      comp: <Hero mob={mob} st={st} dsp={dsp} go={go} /> },
    { id: 'creators',  comp: <FeaturedCreators mob={mob} creators={creators} go={go} loading={loading} /> },
    { id: 'impact',    comp: <ImpactStats mob={mob} /> },
    { id: 'map',       comp: <IndiaMap3D mob={mob} stateCounts={stateCounts} onSelectState={s => { dsp({ t: 'CF', v: { state: s, district: '' } }); go('creators'); }} /> },
    { id: 'roadmap',   comp: <CommunityPulse mob={mob} go={go} /> },
    { id: 'showcase',  comp: <PlatformShowcase mob={mob} /> },
    { id: 'manifesto', comp: <Manifesto mob={mob} /> },
    { id: 'blueprint', comp: <Testimonials mob={mob} /> },
    { id: 'faq',       comp: <Faq mob={mob} /> },
    { id: 'cta',       comp: <Cta mob={mob} go={go} /> },
  ];

  return (
    <div style={{ background: '#fff', position: 'relative' }}>
      <Seo 
        title="India's Premier Creator Ecosystem"
        description="Discover and collaborate with Bharat's top content creators. 2,400+ verified creators from Jaipur, Mumbai, Delhi & beyond."
        keywords="creator bharat, indian influencers, tier 2 creators, jaipur influencers, influencer marketing india"
      />
      <FloatingBackground mob={mob} />
      {sections.map(s => (
        <div 
          key={s.id} 
          id={s.id} 
          className={s.id === 'hero' ? '' : 'reveal-on-scroll'} 
          style={{ position: 'relative' }}
        >
          {s.comp}
        </div>
      ))}
      <style>{`
        .floating-creator-btn:hover {
          background: #fff !important;
          border-color: rgba(0, 0, 0, 0.08) !important;
          box-shadow: 0 16px 36px rgba(0,0,0,0.06) !important;
        }
        @media (max-width: 1200px) {
          .home-floating-bg-icons {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

