import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Compass, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Target, 
  Globe, 
  Users, 
  Rocket, 
  ArrowRight,
  Calculator,
  Award
} from 'lucide-react';
import CreatorScoreSimulator from '../ai/CreatorScoreSimulator';

export default function EcosystemPortals({ mob }) {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const portals = [
    {
      id: 'brand',
      title: 'Brand Partnership Portal',
      description: 'Discover regional talent, manage campaigns, and unlock premium creator searches with zero agency commission.',
      tag: 'Brands & Agencies',
      route: '/brand',
      icon: Users,
      color: '#3B82F6', // Blue
      gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.05) 100%)',
      glow: 'rgba(59, 130, 246, 0.15)'
    },
    {
      id: 'creator',
      title: 'Creator Onboarding Hub',
      description: 'Join the premier creator network of Bharat. Set up your official profile, lock in secure escrows, and claim campaigns.',
      tag: 'Creators & Influencers',
      route: '/creator-hub',
      icon: Rocket,
      color: '#10B981', // Green
      gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)',
      glow: 'rgba(16, 185, 129, 0.15)'
    },
    {
      id: 'verify',
      title: 'Identity Verification Guide',
      description: 'Find out how to qualify for the verified blue tick badge and gain elite credentials on the platform.',
      tag: 'Trust & Reputation',
      route: '/verify-guide',
      icon: ShieldCheck,
      color: '#FF9431', // Saffron/Orange
      gradient: 'linear-gradient(135deg, rgba(255, 148, 49, 0.05) 0%, rgba(234, 88, 12, 0.05) 100%)',
      glow: 'rgba(255, 148, 49, 0.15)'
    },
    {
      id: 'leaderboard',
      title: 'Ecosystem Trust Leaderboard',
      description: 'Check out the highest scoring and most reliable creators across different states of India based on verified campaign stats.',
      tag: 'Rankings',
      route: '/leaderboard',
      icon: Award,
      color: '#a855f7', // Purple
      gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)',
      glow: 'rgba(168, 85, 247, 0.15)'
    },
    {
      id: 'rate',
      title: 'AI Rate & Pay Calculator',
      description: 'Obtain instant estimated commercial rates for campaigns based on market reach, niche, and content types.',
      tag: 'Earning Analytics',
      route: '/rate-calc',
      icon: Calculator,
      color: '#06b6d4', // Cyan
      gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(8, 145, 178, 0.05) 100%)',
      glow: 'rgba(6, 182, 212, 0.15)'
    },
    {
      id: 'stories',
      title: 'Bharat Success Stories',
      description: 'Explore verified case studies, testimonial logs, and campaign results showing how brands scaled with regional creators.',
      tag: 'Case Studies',
      route: '/stories',
      icon: TrendingUp,
      color: '#ec4899', // Pink
      gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(219, 39, 119, 0.05) 100%)',
      glow: 'rgba(236, 72, 153, 0.15)'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      
      {/* Intro section banner */}
      <div style={{
        background: '#ffffff',
        border: '1.5px solid #e2e8f0',
        borderRadius: '32px',
        padding: mob ? '32px 20px' : '44px 40px',
        textAlign: 'left',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(0,0,0,0.015)'
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(255, 148, 49, 0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'rgba(255, 148, 49, 0.1)',
            color: '#FF9431',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Compass size={20} />
          </div>
          <span style={{ fontSize: '11px', fontWeight: 900, color: '#FF9431', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            Ecosystem Directory
          </span>
        </div>

        <h2 style={{ fontSize: mob ? '22px' : '28px', fontWeight: 950, color: '#0f172a', margin: '0 0 12px 0', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
          Official Portals & Tools
        </h2>
        <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, margin: 0, maxWidth: '640px', fontWeight: 500 }}>
          Welcome to the official CreatorBharat hub registry. Here you can navigate directly to specialized consoles, run earnings simulations, and explore real-time community statistics.
        </p>
      </div>

      {/* Grid of Portals */}
      <div>
        <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', marginBottom: '24px', letterSpacing: '1px', textTransform: 'uppercase' }}>
          EXPLORE CHANNELS
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: mob ? '1fr' : '1fr 1fr',
          gap: '24px'
        }}>
          {portals.map((portal) => {
            const Icon = portal.icon;
            const isHovered = hoveredCard === portal.id;
            
            return (
              <div
                key={portal.id}
                onMouseEnter={() => setHoveredCard(portal.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => {
                  navigate(portal.route);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  background: isHovered ? '#f8fafc' : '#ffffff',
                  border: isHovered ? `1.5px solid ${portal.color}` : '1.5px solid #e2e8f0',
                  borderRadius: '24px',
                  padding: '28px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '220px',
                  boxShadow: isHovered ? `0 15px 35px ${portal.glow}` : '0 4px 20px rgba(0, 0, 0, 0.015)',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <div>
                  {/* Badge & Icon Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <span style={{
                      fontSize: '9px',
                      fontWeight: 900,
                      color: portal.color,
                      background: 'rgba(255, 255, 255, 0.7)',
                      border: `1px solid ${portal.color}35`,
                      padding: '4px 10px',
                      borderRadius: '100px',
                      letterSpacing: '0.8px',
                      textTransform: 'uppercase'
                    }}>
                      {portal.tag}
                    </span>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: '#ffffff',
                      border: isHovered ? `1.5px solid ${portal.color}` : '1.5px solid #cbd5e1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: portal.color,
                      transform: isHovered ? 'scale(1.1) rotate(6deg)' : 'scale(1)',
                      transition: 'all 0.25s'
                    }}>
                      <Icon size={18} />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: 950,
                    color: '#0f172a',
                    margin: '0 0 10px 0',
                    lineHeight: 1.3,
                    letterSpacing: '-0.01em'
                  }}>
                    {portal.title}
                  </h4>
                  <p style={{
                    fontSize: '12px',
                    color: '#475569',
                    lineHeight: 1.6,
                    margin: 0,
                    fontWeight: 500
                  }}>
                    {portal.description}
                  </p>
                </div>

                {/* Footer Link */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: 900,
                  color: portal.color,
                  marginTop: '24px'
                }}>
                  <span>LAUNCH CONSOLE</span>
                  <motion.div
                    animate={{ x: isHovered ? 4 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <ArrowRight size={14} />
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ borderTop: '1px solid #e2e8f0', margin: '16px 0' }} />

      {/* Simulator Portal */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(168, 85, 247, 0.1)',
            color: '#a855f7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={16} />
          </div>
          <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>
            Interactive Diagnostics
          </h3>
        </div>

        <CreatorScoreSimulator mob={mob} />
      </div>

    </div>
  );
}

EcosystemPortals.propTypes = {
  mob: PropTypes.bool.isRequired
};
