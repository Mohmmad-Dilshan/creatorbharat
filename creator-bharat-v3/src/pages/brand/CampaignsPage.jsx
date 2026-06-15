import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import {
  Zap, Search, X, Heart, Bookmark, CheckCircle2, Globe, Users, MapPin, Layers, Calendar,
  Target, Briefcase, TrendingUp, Award, Rocket, BarChart3, Lightbulb, CheckCircle, Star, Sparkles, Send, MessageSquare, Lock,
  ShieldCheck, ChevronRight, LayoutGrid
} from 'lucide-react';

import { useApp } from '../../core/context';
import { fmt, LS } from '../../utils/helpers';
import { fetchCampaigns } from '../../utils/platformService';
import { Btn, SkeletonCard, Modal, Fld } from '../../components/common/Primitives';
import EliteHeader from '../../components/layout/EliteHeader';

// Floating icons for campaigns hero
const CAMPAIGNS_BG_ICONS = [
  // Left Side
  { Icon: Target, size: 28, top: '5%', left: '2%', color: '#FF9431', delay: 0.5, rotate: -12 },
  { Icon: Briefcase, size: 26, top: '35%', left: '3%', color: '#3B82F6', delay: 1.2, rotate: 8 },
  { Icon: TrendingUp, size: 28, top: '65%', left: '2.5%', color: '#10B981', delay: 1.8, rotate: 15 },
  { Icon: Rocket, size: 26, top: '78%', left: '1.5%', color: '#8B5CF6', delay: 0.3, rotate: -10 },

  // Center-Left area
  { Icon: BarChart3, size: 28, top: '15%', left: '12%', color: '#F59E0B', delay: 2.1, rotate: 18 },
  { Icon: Lightbulb, size: 26, top: '55%', left: '15%', color: '#FF9431', delay: 0.8, rotate: -8 },

  // Right Side
  { Icon: Sparkles, size: 28, top: '10%', right: '2%', color: '#FF9431', delay: 1.5, rotate: 10 },
  { Icon: CheckCircle, size: 26, top: '40%', right: '3%', color: '#10B981', delay: 0.6, rotate: -15 },
  { Icon: Award, size: 28, top: '70%', right: '2.5%', color: '#3B82F6', delay: 2.3, rotate: 12 },
  { Icon: Star, size: 26, top: '82%', right: '1.5%', color: '#F59E0B', delay: 1.0, rotate: 20 },

  // Center-Right area
  { Icon: Send, size: 28, top: '20%', right: '12%', color: '#8B5CF6', delay: 1.8, rotate: -18 },
  { Icon: MessageSquare, size: 26, top: '60%', right: '14%', color: '#FF9431', delay: 0.4, rotate: 8 }
];

const CampaignsFloatingIcons = ({ mob }) => {
  if (mob) return null;

  return (
    <div className="campaigns-floating-icons-container" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {CAMPAIGNS_BG_ICONS.map((ico, index) => {
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
            key={`campaigns-bg-icon-${index}`}
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
            className="floating-campaign-btn"
            >
              <Icon size={size} color={color} strokeWidth={1.8} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

CampaignsFloatingIcons.propTypes = {
  mob: PropTypes.bool
};

// ----------------------------------------------------------------------
// MOCK DATA & COMPONENTS FOR MOBILE GRAPHIC
// ----------------------------------------------------------------------
const MOCK_CAMPAIGNS = [
  {
    title: 'boAt Airdopes Launch',
    niche: 'Tech & Lifestyle',
    payout: '₹1,00,000',
    slots: 8,
    imgIdx: 1,
    brand: 'boAt Lifestyle'
  },
  {
    title: 'Jaipur Heritage Promotion',
    niche: 'Travel & Food',
    payout: '₹75,000',
    slots: 15,
    imgIdx: 0,
    brand: 'Rajasthan Tourism'
  },
  {
    title: 'Bastar Handicrafts Campaign',
    niche: 'Culture & Art',
    payout: '₹50,000',
    slots: 20,
    imgIdx: 2,
    brand: 'Bastar Crafts'
  },
  {
    title: 'Bharat Mobility Expo',
    niche: 'Automotive & Tech',
    payout: '₹1,20,000',
    slots: 10,
    imgIdx: 3,
    brand: 'Bharat Mobility'
  }
];

const MobileCampaignDeck = () => {
  const [deckIdx, setDeckIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDeckIdx(prev => (prev + 1) % MOCK_CAMPAIGNS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <AnimatePresence mode="wait">
        {MOCK_CAMPAIGNS.map((c, i) => {
          if (i !== deckIdx) return null;
          const cover = COVERS[c.imgIdx];

          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '20px',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ position: 'relative', height: '110px', borderRadius: '12px', overflow: 'hidden' }}>
                <img src={cover} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                <div style={{ position: 'absolute', top: '8px', left: '8px', background: '#FF9431', color: '#fff', padding: '2px 8px', borderRadius: '100px', fontSize: '7px', fontWeight: 900 }}>
                  {c.niche}
                </div>
              </div>

              <div style={{ padding: '4px 2px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{c.brand}</div>
                <h4 style={{ fontSize: '12px', fontWeight: 950, color: '#fff', marginTop: '2px', marginBottom: '8px', lineHeight: 1.2 }}>{c.title}</h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '6px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <div style={{ fontSize: '6px', color: 'rgba(255, 255, 255, 0.4)', fontWeight: 900 }}>EST. PAYOUT</div>
                    <div style={{ fontSize: '10px', fontWeight: 950, color: '#fff' }}>{c.payout}</div>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '6px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <div style={{ fontSize: '6px', color: 'rgba(255, 255, 255, 0.4)', fontWeight: 900 }}>AVAILABILITY</div>
                    <div style={{ fontSize: '10px', fontWeight: 950, color: '#FF9431' }}>{c.slots} SLOTS</div>
                  </div>
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #FF9431 0%, #ff6b00 100%)',
                color: '#fff',
                fontSize: '10px',
                fontWeight: 950,
                textAlign: 'center',
                padding: '8px',
                borderRadius: '10px',
                cursor: 'pointer',
                marginTop: '4px'
              }}>
                Apply Now ⚡
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

const DesktopCampaignDashboard = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % MOCK_CAMPAIGNS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '480px', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Glow effect behind dashboard */}
      <div style={{
        position: 'absolute',
        top: '10%', right: '-5%',
        width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(255, 148, 49, 0.15) 0%, transparent 70%)',
        filter: 'blur(40px)',
        zIndex: 0,
      }} />

      {/* Main Dashboard Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          width: '100%',
          height: '100%',
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(24px)',
          border: '1.5px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          boxShadow: '0 40px 80px rgba(0, 0, 0, 0.35)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 2,
        }}
      >
        {/* Browser Header */}
        <div style={{
          padding: '14px 20px',
          borderBottom: '1.5px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(15, 23, 42, 0.4)',
        }}>
          {/* Window control dots */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
          </div>
          {/* Mock URL bar */}
          <div style={{
            flex: 1,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '100px',
            padding: '4px 16px',
            fontSize: '9px',
            color: 'rgba(255, 255, 255, 0.4)',
            textAlign: 'left',
            fontFamily: 'monospace',
          }}>
            creatorbharat.com/marketplace
          </div>
        </div>

        {/* Dashboard Content */}
        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Metrics Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { label: 'Active Deals', value: '1.2K+', color: '#3B82F6' },
              { label: 'Escrow Locked', value: '₹15.4L', color: '#10B981' },
              { label: 'Platform Fee', value: '0%', color: '#FF9431' },
            ].map(m => (
              <div key={m.label} style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1.5px solid rgba(255, 255, 255, 0.04)',
                borderRadius: '12px',
                padding: '10px',
                textAlign: 'left',
              }}>
                <div style={{ fontSize: '8px', fontWeight: 900, color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{m.label}</div>
                <div style={{ fontSize: '16px', fontWeight: 950, color: '#fff', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: m.color, display: 'inline-block' }} />
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Section title */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '10px', fontWeight: 900, color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Featured Brand Campaigns
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulsing-glow 2s infinite' }} />
              <span style={{ fontSize: '8px', fontWeight: 900, color: '#10b981', textTransform: 'uppercase' }}>Live feed</span>
            </div>
          </div>

          {/* List of active deals (interactive carousel) */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              {MOCK_CAMPAIGNS.map((c, idx) => {
                if (idx !== activeIdx) return null;
                const cover = COVERS[c.imgIdx];

                return (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '16px',
                      padding: '12px',
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'center',
                    }}
                  >
                    {/* Campaign Image */}
                    <div style={{ width: '100px', height: '100px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={cover} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                    </div>

                    {/* Campaign Info */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', textAlign: 'left' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontSize: '7px', fontWeight: 900, background: 'rgba(255,148,49,0.15)', color: '#FF9431', padding: '2px 6px', borderRadius: '4px' }}>{c.niche}</span>
                          <span style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.4)', fontWeight: 800 }}>{c.brand}</span>
                        </div>
                        <h4 style={{ fontSize: '13px', fontWeight: 950, color: '#fff', margin: 0, lineHeight: 1.25 }}>{c.title}</h4>
                      </div>

                      <div style={{ display: 'flex', gap: '12px' }}>
                        <div>
                          <div style={{ fontSize: '6px', color: 'rgba(255, 255, 255, 0.4)', fontWeight: 900 }}>EST. PAYOUT</div>
                          <div style={{ fontSize: '11px', fontWeight: 950, color: '#fff' }}>{c.payout}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '6px', color: 'rgba(255, 255, 255, 0.4)', fontWeight: 900 }}>AVAILABILITY</div>
                          <div style={{ fontSize: '11px', fontWeight: 950, color: '#FF9431' }}>{c.slots} SLOTS</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Floating Overlapping Badges on Desktop */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '-24px',
          right: '-24px',
          background: '#0f172a',
          border: '1.5px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          borderRadius: '16px',
          padding: '12px 18px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          zIndex: 3,
          minWidth: '160px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <Zap size={10} color="#3B82F6" />
          <span style={{ fontSize: '8px', fontWeight: 900, color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Live Collaborations</span>
        </div>
        <div style={{ fontSize: '18px', fontWeight: 950, color: '#fff' }}>1.2K+ Deals</div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
        style={{
          position: 'absolute',
          bottom: '-16px',
          left: '-24px',
          background: '#fff',
          border: '1px solid #e2e8f0',
          boxShadow: '0 20px 40px rgba(15, 23, 42, 0.06)',
          borderRadius: '16px',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 3,
        }}
      >
        <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ShieldCheck size={14} color="#10B981" />
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '8px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>Escrow Protected</div>
          <div style={{ fontSize: '13px', fontWeight: 950, color: '#0f172a' }}>100% Guaranteed</div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 1 }}
        style={{
          position: 'absolute',
          bottom: '80px',
          right: '-20px',
          background: 'linear-gradient(135deg, #FF9431 0%, #ff6b00 100%)',
          boxShadow: '0 16px 36px rgba(255,148,49,0.25)',
          borderRadius: '14px',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 3,
        }}
      >
        <Sparkles size={14} color="#fff" />
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '7px', fontWeight: 900, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase' }}>Avg Creator Payout</div>
          <div style={{ fontSize: '12px', fontWeight: 950, color: '#fff' }}>₹45K per Deal</div>
        </div>
      </motion.div>
    </div>
  );
};

// ----------------------------------------------------------------------
// 1. BRAND TOKENS
// ----------------------------------------------------------------------

const THEME = {
  primary: '#FF9431',
  dark: '#0f172a',
  blue: '#3B82F6',
  success: '#10B981',
  bg: '#f8fafc',
  surface: '#ffffff',
  border: '#e2e8f0',
  text: '#0f172a',
  textSec: '#64748b',
  accent: 'linear-gradient(135deg, #FF9431 0%, #FFB366 100%)',
  radius: '24px',
  shadow: '0 20px 50px rgba(15, 23, 42, 0.05)'
};

const COVERS = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'
];

// ----------------------------------------------------------------------
// 2. ELITE COMPONENTS
// ----------------------------------------------------------------------

const MarketplaceStats = ({ isMob }) => {
  const stats = [
    { 
      label: 'Active Deals', 
      value: '1.2K+', 
      color: '#3B82F6', 
      icon: Zap, 
      desc: 'Live verified campaigns' 
    },
    { 
      label: 'Avg. Payout', 
      value: '₹45K', 
      color: '#10B981', 
      icon: TrendingUp, 
      desc: 'Avg brand contract value' 
    },
    { 
      label: 'Top Brands', 
      value: '450+', 
      color: '#FF9431', 
      icon: Users, 
      desc: 'Active partners on board' 
    },
    { 
      label: 'Success Rate', 
      value: '98%', 
      color: '#8B5CF6', 
      icon: CheckCircle2, 
      desc: 'Campaign completion rate' 
    }
  ];

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: isMob ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
      gap: isMob ? '16px' : '24px', 
      marginBottom: isMob ? '40px' : '64px',
      marginTop: isMob ? '16px' : '24px'
    }}>
      {stats.map((s, idx) => {
        const IconComponent = s.icon;
        return (
          <motion.div 
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            whileHover={{ y: -6, scale: 1.02 }}
            style={{ 
              background: '#fff', 
              padding: isMob ? '20px 16px' : '28px 24px', 
              borderRadius: '24px', 
              border: '1.5px solid rgba(226, 232, 240, 0.8)', 
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.02)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              cursor: 'pointer'
            }}
          >
            {/* Ambient background accent */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '120px',
              height: '120px',
              background: `radial-gradient(circle, ${s.color}0a 0%, transparent 70%)`,
              borderRadius: '50%',
              pointerEvents: 'none'
            }} />
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '16px' }}>
              <div style={{
                width: isMob ? '36px' : '44px',
                height: isMob ? '36px' : '44px',
                borderRadius: '12px',
                background: `${s.color}0e`,
                border: `1px solid ${s.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <IconComponent size={isMob ? 18 : 22} color={s.color} strokeWidth={2} />
              </div>
              
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: s.color,
                boxShadow: `0 0 10px ${s.color}`,
                display: 'inline-block'
              }} />
            </div>

            <div>
              <div style={{ 
                fontSize: '10px', 
                fontWeight: 900, 
                color: '#94a3b8', 
                textTransform: 'uppercase', 
                letterSpacing: '1.2px', 
                marginBottom: '6px' 
              }}>
                {s.label}
              </div>
              <div style={{ 
                fontSize: isMob ? '22px' : '32px', 
                fontWeight: 950, 
                color: '#0f172a',
                lineHeight: 1.1,
                letterSpacing: '-0.02em'
              }}>
                {s.value}
              </div>
              <div style={{ 
                fontSize: '10px', 
                color: '#64748b', 
                marginTop: '6px',
                fontWeight: 600,
                display: isMob ? 'none' : 'block' 
              }}>
                {s.desc}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const PublicLandingCard = ({ isMob }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
    style={{ 
      background: THEME.dark, borderRadius: THEME.radius, padding: isMob ? '32px 24px' : '60px', 
      gridColumn: isMob ? 'span 1' : 'span 2', position: 'relative', overflow: 'hidden', 
      display: 'flex', flexDirection: isMob ? 'column' : 'row', alignItems: 'center', gap: '40px',
      border: 'none', boxShadow: '0 40px 80px rgba(0,0,0,0.2)'
    }}
  >
    <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40%', background: `linear-gradient(90deg, transparent, rgba(255,148,49,0.05))`, pointerEvents: 'none' }} />
    <div style={{ zIndex: 1, flex: 1 }}>
       <div style={{ color: THEME.primary, fontWeight: 950, letterSpacing: '4px', fontSize: '11px', marginBottom: '16px' }}>FOR BRANDS & AGENCIES</div>
       <h2 style={{ fontSize: isMob ? '32px' : '56px', fontWeight: 950, color: '#fff', lineHeight: 1.05, marginBottom: '20px', letterSpacing: '-0.04em' }}>
         Scale Your <br/> <span style={{ color: THEME.primary }}>Brand Impact.</span>
       </h2>
       <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: isMob ? '16px' : '18px', lineHeight: 1.6, marginBottom: '40px', maxWidth: '500px' }}>Post your campaign and reach India's most influential creators. Start your discovery journey today.</p>
       <div style={{ display: 'flex', gap: '12px', flexDirection: isMob ? 'column' : 'row' }}>
          <Btn lg style={{ background: THEME.primary, color: '#fff', padding: '16px 32px', borderRadius: '12px', fontWeight: 950 }}>Create Campaign</Btn>
          <Btn lg style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '16px 32px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 950 }}>Partner with Us</Btn>
       </div>
    </div>
    {!isMob && (
      <div style={{ flex: 1, position: 'relative', height: '400px' }}>
         <img src={COVERS[3]} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '32px', filter: 'brightness(0.8)' }} alt="" />
         <div style={{ position: 'absolute', top: '-20px', right: '-20px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            <div style={{ fontSize: '10px', color: THEME.primary, fontWeight: 900, marginBottom: '8px' }}>MONTHLY REACH</div>
            <div style={{ fontSize: '24px', color: '#fff', fontWeight: 950 }}>2.4M+</div>
         </div>
         <div style={{ position: 'absolute', bottom: '20px', left: '-40px', background: '#fff', padding: '20px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: THEME.primary, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Zap size={20} color="#fff" />
            </div>
            <div>
               <div style={{ fontSize: '13px', fontWeight: 950, color: THEME.dark }}>Growth Accelerated</div>
               <div style={{ fontSize: '11px', color: THEME.textSec, fontWeight: 700 }}>AI Optimized Discovery</div>
            </div>
         </div>
      </div>
    )}
  </motion.div>
);

const FinalDiscoveryCard = ({ isMob }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
    style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: THEME.radius, padding: isMob ? '32px 24px' : '80px', 
      gridColumn: isMob ? 'span 1' : 'span 2', position: 'relative', overflow: 'hidden', 
      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
      border: 'none', boxShadow: '0 40px 100px rgba(0,0,0,0.3)', marginTop: '40px'
    }}
  >
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(255,148,49,0.1), transparent 50%)' }} />
    <div style={{ zIndex: 1 }}>
       <div style={{ color: THEME.primary, fontWeight: 950, letterSpacing: '6px', fontSize: '11px', marginBottom: '24px' }}>READY TO LAUNCH?</div>
       <h2 style={{ fontSize: isMob ? '36px' : '64px', fontWeight: 950, color: '#fff', lineHeight: 1.05, marginBottom: '32px', letterSpacing: '-0.04em' }}>
         Don't Just Discover. <br/> <span style={{ color: THEME.primary }}>Own the Conversation.</span>
       </h2>
       <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: isMob ? '16px' : '20px', lineHeight: 1.6, marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>Join 500+ elite brands already scaling with CreatorBharat. Your next viral campaign starts here.</p>
       <div style={{ display: 'flex', gap: '20px', flexDirection: isMob ? 'column' : 'row', justifyContent: 'center' }}>
          <Btn lg style={{ background: THEME.primary, color: '#fff', padding: '18px 48px', borderRadius: '16px', fontWeight: 950, fontSize: '18px' }}>Get Started Now</Btn>
          <Btn lg style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '18px 48px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 950, fontSize: '18px' }}>Talk to Expert</Btn>
       </div>
    </div>
  </motion.div>
);

const MarketplaceBenefits = ({ isMob }) => (
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: isMob ? '1fr' : 'repeat(4, 1fr)', 
    gap: '24px', 
    gridColumn: isMob ? 'span 1' : 'span 2',
    marginTop: '60px',
    marginBottom: '20px'
  }}>
    {[
      { t: 'Secure Escrow', d: 'Payments released only on milestone completion.', i: <CheckCircle2 size={24} /> },
      { t: 'AI Matching', d: 'Find creators that align perfectly with your brand DNA.', i: <Zap size={24} /> },
      { t: 'Live Analytics', d: 'Track every impression and conversion in real-time.', i: <Globe size={24} /> },
      { t: 'Legal Ready', d: 'Automated contracts and compliance for all deals.', i: <Users size={24} /> }
    ].map(b => (
      <div key={b.t} style={{ background: '#fff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
        <div style={{ color: THEME.primary, marginBottom: '20px' }}>{b.i}</div>
        <div style={{ fontSize: '16px', fontWeight: 950, color: THEME.dark, marginBottom: '8px' }}>{b.t}</div>
        <div style={{ fontSize: '13px', color: THEME.textSec, lineHeight: 1.5, fontWeight: 500 }}>{b.d}</div>
      </div>
    ))}
  </div>
);

const CategorySpotlightCard = ({ isMob }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
    style={{ 
      background: '#fff', borderRadius: THEME.radius, padding: isMob ? '32px 24px' : '60px', 
      gridColumn: isMob ? 'span 1' : 'span 2', position: 'relative', overflow: 'hidden', 
      display: 'flex', flexDirection: isMob ? 'column' : 'row', alignItems: 'center', gap: '40px',
      border: '1px solid #e2e8f0', boxShadow: '0 30px 60px rgba(0,0,0,0.05)', marginTop: '40px'
    }}
  >
    <div style={{ flex: 1 }}>
       <div style={{ color: THEME.primary, fontWeight: 950, letterSpacing: '4px', fontSize: '11px', marginBottom: '16px' }}>TRENDING NICHES</div>
       <h2 style={{ fontSize: isMob ? '32px' : '48px', fontWeight: 950, color: THEME.dark, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.03em' }}>
         Explore the <br/> <span style={{ color: THEME.primary }}>Creator Ecosystem.</span>
       </h2>
       <p style={{ color: THEME.textSec, fontSize: '17px', lineHeight: 1.6, marginBottom: '32px', fontWeight: 500 }}>From Tech-Geeks to Lifestyle-Gurus, discover creators who don't just post content, but build communities.</p>
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {['TECH', 'FASHION', 'AUTO', 'TRAVEL', 'FOOD', 'GAMING'].map(n => (
            <div key={n} style={{ background: '#f8fafc', padding: '10px', borderRadius: '12px', textAlign: 'center', fontSize: '10px', fontWeight: 950, color: THEME.dark, border: '1px solid #f1f5f9' }}>{n}</div>
          ))}
       </div>
    </div>
    {!isMob && (
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', height: '300px' }}>
         <img src={COVERS[0]} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} alt="" />
         <img src={COVERS[1]} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px', marginTop: '20px' }} alt="" />
      </div>
    )}
  </motion.div>
);

const EliteDealCard = ({ campaign, index, onApply, isMob, onDetails, isGuest, isSwipe = false, onSwipe }) => {
  const cover = COVERS[index % COVERS.length];
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const { st, dsp } = useApp();
  const navigate = useNavigate();

  const hasApplied = useMemo(() => {
    return st.applied?.includes(campaign.id);
  }, [st.applied, campaign.id]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 100) onSwipe?.('right', campaign);
    else if (info.offset.x < -100) onSwipe?.('left', campaign);
  };

  const [isSaved, setIsSaved] = useState(() => {
    const savedList = JSON.parse(localStorage.getItem('cb_saved_campaigns') || '[]');
    return savedList.includes(campaign.id);
  });

  const handleSave = (e) => {
    e.stopPropagation();
    if (!st.user) {
      dsp?.({ t: 'TOAST', d: { type: 'error', msg: 'Please login as a Creator to save campaigns.' } });
      return navigate('/login');
    }
    if (st.role !== 'creator') {
      dsp?.({ t: 'TOAST', d: { type: 'error', msg: 'Only Creators can save campaigns. Please login as a Creator.' } });
      return;
    }
    
    const savedList = JSON.parse(localStorage.getItem('cb_saved_campaigns') || '[]');
    let newList;
    if (isSaved) {
      newList = savedList.filter(id => id !== campaign.id);
      setIsSaved(false);
      dsp?.({ t: 'TOAST', d: { type: 'success', msg: `Removed ${campaign.title} from bookmarks.` } });
    } else {
      newList = [...savedList, campaign.id];
      setIsSaved(true);
      dsp?.({ t: 'TOAST', d: { type: 'success', msg: `Saved ${campaign.title} to bookmarks.` } });
    }
    localStorage.setItem('cb_saved_campaigns', JSON.stringify(newList));
  };

  return (
    <motion.div 
      drag={isSwipe ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      style={{ 
        x, rotate, opacity, 
        background: '#fff', 
        borderRadius: THEME.radius, 
        overflow: 'hidden', 
        boxShadow: hovered ? '0 30px 60px rgba(0,0,0,0.12)' : '0 10px 30px rgba(0,0,0,0.04)', 
        border: `1px solid ${hovered ? THEME.primary : '#f1f5f9'}`, 
        display: 'flex', flexDirection: 'column', height: '100%', 
        position: 'relative', cursor: isSwipe ? 'grab' : 'pointer', 
        transition: isSwipe ? 'none' : 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' 
      }}
      onMouseEnter={() => !isSwipe && setHovered(true)} onMouseLeave={() => !isSwipe && setHovered(false)}
      onClick={() => !isSwipe && onDetails(campaign)}
    >
      <div style={{ position: 'relative', height: isMob ? '160px' : '280px', overflow: 'hidden' }}>
        <motion.img src={cover} animate={{ scale: hovered ? 1.1 : 1 }} transition={{ duration: 1.2 }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(15, 23, 42, 0.4) 100%)' }} />
        
        <div style={{ position: 'absolute', top: isMob ? '12px' : '20px', left: isMob ? '12px' : '20px', display: 'flex', gap: '8px' }}>
           <div style={{ background: '#fff', color: THEME.dark, padding: '4px 10px', borderRadius: '100px', fontSize: '9px', fontWeight: 900, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>{campaign.niche?.[0] || 'LIFESTYLE'}</div>
        </div>
      </div>

      <div style={{ padding: isMob ? '16px' : '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMob ? '8px' : '12px', marginBottom: isMob ? '12px' : '16px' }}>
           <div style={{ width: isMob ? '32px' : '40px', height: isMob ? '32px' : '40px', background: '#f8fafc', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 950, fontSize: isMob ? '14px' : '18px', color: THEME.dark, border: '1px solid #e2e8f0' }}>{campaign.brand?.companyName?.[0] || 'B'}</div>
           <div>
              <div style={{ fontSize: isMob ? '12px' : '14px', fontWeight: 800, color: THEME.dark }}>{campaign.brand?.companyName || 'Elite Brand'}</div>
              <div style={{ fontSize: isMob ? '9px' : '11px', color: '#10B981', fontWeight: 900, letterSpacing: '0.5px' }}>VERIFIED ADVERTISER</div>
           </div>
        </div>

        <h3 style={{ fontSize: isMob ? '15px' : '24px', fontWeight: 950, color: THEME.dark, lineHeight: 1.2, marginBottom: isMob ? '12px' : '24px', letterSpacing: '-0.02em' }}>{campaign.title}</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: isMob ? '8px' : '16px', marginBottom: isMob ? '16px' : '32px' }}>
           <div style={{ background: '#f8fafc', padding: isMob ? '8px 12px' : '16px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
             <div style={{ fontSize: '8px', color: '#94a3b8', fontWeight: 900, letterSpacing: '1px', marginBottom: '2px' }}>EST. PAYOUT</div>
             <div style={{ fontSize: isMob ? '12px' : '18px', fontWeight: 950, color: THEME.dark }}>{fmt.inr(campaign.budgetMax)}</div>
           </div>
           <div style={{ background: '#f8fafc', padding: isMob ? '8px 12px' : '16px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
             <div style={{ fontSize: '8px', color: '#94a3b8', fontWeight: 900, letterSpacing: '1px', marginBottom: '2px' }}>AVAILABILITY</div>
             <div style={{ fontSize: isMob ? '12px' : '18px', fontWeight: 950, color: THEME.primary }}>{campaign.slots || 10} SLOTS</div>
           </div>
        </div>

        {!isSwipe && (
          <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
             <Btn 
               full lg 
               onClick={(e) => { e.stopPropagation(); if (!hasApplied) onApply(campaign); }} 
               style={{ 
                 background: hasApplied ? '#10B981' : THEME.dark, 
                 color: '#fff', 
                 border: 'none', 
                 fontWeight: 950, 
                 flex: 1, 
                 borderRadius: isMob ? '10px' : '14px',
                 fontSize: isMob ? '12px' : '14px', 
                 height: isMob ? '44px' : '56px',
                 padding: 0, 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'center',
                 gap: '6px',
                 cursor: hasApplied ? 'default' : 'pointer'
               }}
             >
               {hasApplied ? (
                 <>
                   <CheckCircle size={isMob ? 14 : 16} />
                   Applied
                 </>
               ) : (
                 <>
                   {st.role !== 'creator' && <Lock size={isMob ? 12 : 14} />}
                   {(!st.user) ? 'Unlock to Apply' : (st.role !== 'creator' ? 'Creator Only' : 'Apply Now')}
                 </>
               )}
             </Btn>
             <button 
               onClick={handleSave}
               style={{ 
                 width: isMob ? '44px' : '56px', height: isMob ? '44px' : '56px', 
                 borderRadius: isMob ? '10px' : '14px', border: '1px solid #e2e8f0', 
                 background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                 color: isSaved ? '#FF9431' : '#94a3b8', cursor: 'pointer',
                 flexShrink: 0
               }}
             >
               <Bookmark size={20} fill={isSaved ? '#FF9431' : 'none'} color={isSaved ? '#FF9431' : '#94a3b8'} />
             </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ----------------------------------------------------------------------
// 3. ELITE SUB-COMPONENTS
// ----------------------------------------------------------------------

const SearchBar = ({ mob, q, onSearch, onClickPrompt }) => {
  const [focused, setFocused] = useState(false);
  const { st } = useApp();
  const isCreator = st.user && st.role === 'creator';

  return (
    <div 
      onClick={(e) => {
        if (!isCreator) {
          e.preventDefault();
          e.stopPropagation();
          onClickPrompt();
        }
      }}
      style={{ 
        width: '100%', 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        background: focused ? '#fff' : '#f8fafc', 
        borderRadius: mob ? '14px' : '18px', 
        padding: mob ? '12px 16px' : '14px 24px', 
        border: '1.5px solid',
        borderColor: focused ? '#FF9431' : 'rgba(226, 232, 240, 0.8)',
        boxShadow: focused ? '0 0 0 3px rgba(255, 148, 49, 0.15)' : 'none',
        transition: 'all 0.25s ease',
        cursor: isCreator ? 'text' : 'pointer'
      }}
    >
      <Search size={18} color={focused ? '#FF9431' : '#64748b'} style={{ marginRight: '12px', transition: 'color 0.25s ease' }} />
      <input 
        value={q || ''} 
        onChange={e => onSearch(e.target.value)} 
        onFocus={(e) => {
          if (!isCreator) {
            e.target.blur();
            onClickPrompt();
          } else {
            setFocused(true);
          }
        }}
        onBlur={() => setFocused(false)}
        placeholder={mob ? 'Search...' : 'Search campaigns, brands, or niches...'} 
        readOnly={!isCreator}
        style={{ 
          flex: 1, 
          border: 'none', 
          background: 'none', 
          outline: 'none', 
          fontWeight: 600, 
          fontSize: mob ? '14px' : '16px', 
          color: '#0f172a',
          cursor: isCreator ? 'text' : 'pointer'
        }} 
      />
      {q && isCreator && (
        <button 
          onClick={() => onSearch('')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            color: '#94a3b8'
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#0f172a'}
          onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

const ViewModeToggle = ({ mob, viewMode, setViewMode }) => (
  <div style={{ 
    width: mob ? '100%' : 'auto', 
    display: 'flex', 
    background: 'rgba(241, 245, 249, 0.8)', 
    padding: '4px', 
    borderRadius: mob ? '14px' : '16px',
    border: '1px solid rgba(226, 232, 240, 0.8)',
    position: 'relative'
  }}>
    {['grid', 'swipe'].map(m => {
      const isActive = viewMode === m;
      return (
        <button 
          key={m}
          onClick={() => setViewMode(m)} 
          style={{ 
            flex: mob ? 1 : 'none', 
            padding: mob ? '12px' : '10px 24px', 
            borderRadius: mob ? '10px' : '12px', 
            border: 'none', 
            background: 'transparent', 
            fontWeight: 800, 
            fontSize: '13px', 
            color: isActive ? '#fff' : '#475569', 
            cursor: 'pointer', 
            transition: 'color 0.3s ease',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            zIndex: 1
          }}
        >
          {isActive && (
            <motion.div
              layoutId="activeViewTab"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                borderRadius: mob ? '10px' : '12px',
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)',
                zIndex: -1
              }}
            />
          )}
          {m === 'grid' ? <LayoutGrid size={14} color={isActive ? '#fff' : '#64748b'} /> : <Sparkles size={14} color={isActive ? '#fff' : '#64748b'} />}
          <span>{m.charAt(0).toUpperCase() + m.slice(1)}</span>
        </button>
      );
    })}
  </div>
);

const FilterBar = ({ mob, cpf, dsp, viewMode, setViewMode, onClickPrompt }) => (
  <div style={{ 
    width: '100%', 
    position: 'sticky', 
    top: mob ? '10px' : '24px', 
    zIndex: 1000, 
    padding: mob ? '0 10px' : '0 20px',
    marginBottom: mob ? '24px' : '40px'
  }}>
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      background: 'rgba(255, 255, 255, 0.85)', 
      backdropFilter: 'blur(24px)',
      borderRadius: mob ? '20px' : '24px', 
      padding: mob ? '10px' : '14px 20px', 
      border: '1.5px solid rgba(255, 255, 255, 0.6)',
      display: 'flex', 
      gap: mob ? '10px' : '20px', 
      alignItems: 'center', 
      flexDirection: mob ? 'column' : 'row',
      boxShadow: '0 25px 60px rgba(15, 23, 42, 0.08)'
    }}>
       <SearchBar mob={mob} q={cpf.q} onSearch={v => dsp({ t: 'CPF', v: { q: v } })} onClickPrompt={onClickPrompt} />
       <ViewModeToggle mob={mob} viewMode={viewMode} setViewMode={setViewMode} />
    </div>
  </div>
);

const CampaignDetailsModal = ({ open, campaign, onClose, onApply, isMob }) => {
  const { st } = useApp();
  return (
    <Modal open={open} title='Campaign Intelligence' onClose={onClose} width={800}>
      {campaign && (
        <div style={{ display: 'flex', flexDirection: isMob ? 'column' : 'row', gap: '40px', padding: '20px' }}>
          <div style={{ flex: 1 }}>
             <img src={COVERS[0]} alt="Campaign Cover" style={{ width: '100%', height: '200px', borderRadius: '24px', objectFit: 'cover', marginBottom: '24px' }} />
             <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                <div style={{ flex: 1, background: '#f8fafc', padding: '16px', borderRadius: '20px', textAlign: 'center' }}><Users size={20} color={THEME.blue} style={{ marginBottom: '8px' }} /><div style={{ fontSize: '10px', opacity: 0.5 }}>TARGET</div><div style={{ fontWeight: 950 }}>18-35</div></div>
                <div style={{ flex: 1, background: '#f8fafc', padding: '16px', borderRadius: '20px', textAlign: 'center' }}><MapPin size={20} color={THEME.primary} style={{ marginBottom: '8px' }} /><div style={{ fontSize: '10px', opacity: 0.5 }}>REGION</div><div style={{ fontWeight: 950 }}>India</div></div>
                <div style={{ flex: 1, background: '#f8fafc', padding: '16px', borderRadius: '20px', textAlign: 'center' }}><Layers size={20} color={THEME.success} style={{ marginBottom: '8px' }} /><div style={{ fontSize: '10px', opacity: 0.5 }}>NICHE</div><div style={{ fontWeight: 950 }}>Tech</div></div>
             </div>
             <h3 style={{ fontSize: '24px', fontWeight: 950, marginBottom: '16px' }}>Campaign Brief</h3>
             <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '15px' }}>{campaign.title}. The brand is looking for authentic storytelling. Submission deadline is strict. Ensure high-quality lighting and clear audio for video deliverables.</p>
          </div>
          <div style={{ flex: 0.6, background: '#f8fafc', borderRadius: '24px', padding: '32px', border: '1px solid #f1f5f9' }}>
             <h4 style={{ fontWeight: 950, fontSize: '18px', marginBottom: '24px' }}>Deliverables</h4>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '8px', height: '8px', background: THEME.primary, borderRadius: '50%' }} /> <div style={{ fontSize: '14px', fontWeight: 700 }}>1x Instagram Reel</div></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '8px', height: '8px', background: THEME.primary, borderRadius: '50%' }} /> <div style={{ fontSize: '14px', fontWeight: 700 }}>2x Story Sets</div></div>
             </div>
             <div style={{ height: '1px', background: '#e2e8f0', margin: '32px 0' }} />
             <h4 style={{ fontWeight: 950, fontSize: '18px', marginBottom: '24px' }}>Timeline</h4>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}><Calendar size={16} color={THEME.primary} /> <span style={{ fontSize: '14px', fontWeight: 700 }}>Starts: Next Week</span></div>
             <Btn 
               full lg 
               style={{ 
                 marginTop: '40px', 
                 background: st.applied?.includes(campaign.id) ? '#10B981' : THEME.dark,
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 gap: '6px'
               }} 
               onClick={() => { if (!st.applied?.includes(campaign.id)) onApply(campaign); }}
             >
               {st.applied?.includes(campaign.id) ? (
                 <>
                   <CheckCircle size={isMob ? 14 : 16} />
                   Applied
                 </>
               ) : (
                 <>
                   {st.role !== 'creator' && <Lock size={16} />}
                   {(!st.user) ? 'Unlock to Apply' : (st.role !== 'creator' ? 'Creator Only' : 'Apply Now')}
                 </>
               )}
             </Btn>
          </div>
        </div>
      )}
    </Modal>
  );
};

const CampaignApplyModal = ({ open, isDone, onClose, form, setForm, onSubmit, mob }) => (
  <Modal open={open} title='Submit Pitch' onClose={onClose} width={650}>
    {isDone ? (
      <div style={{ textAlign: 'center', padding: '80px 40px' }}>
        <div style={{ width: '100px', height: '100px', background: 'rgba(16,185,129,0.1)', color: THEME.success, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}><CheckCircle2 size={48} /></div>
        <h3 style={{ fontSize: '32px', fontWeight: 950, marginBottom: '16px' }}>Pitch Sent!</h3>
        <Btn full lg onClick={onClose}>Back to Discovery</Btn>
      </div>
    ) : (
      <div style={{ padding: '20px' }}>
         <Fld label='Elite Pitch Proposal *' value={form.pitch} onChange={e => setForm(p => ({ ...p, pitch: e.target.value }))} rows={5} placeholder='How will you add value?' />
         <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '32px', marginTop: '32px' }}>
            <Fld label='Proposed Rate (₹)' type='number' value={form.rate} onChange={e => setForm(p => ({ ...p, rate: e.target.value }))} />
            <Fld label='Portfolio' value={form.portfolio} onChange={e => setForm(p => ({ ...p, portfolio: e.target.value }))} />
         </div>
         <Btn full lg style={{ marginTop: '56px', height: '72px', borderRadius: '24px', fontSize: '18px' }} onClick={onSubmit}>Submit Pitch 🚀</Btn>
      </div>
    )}
  </Modal>
);

const CreatorLoginPromptModal = ({ open, onClose, onLogin }) => (
  <Modal open={open} title='Creator Access Required' onClose={onClose} width={450}>
    <div style={{ textAlign: 'center', padding: '32px 16px' }}>
      <div style={{ 
        width: '80px', 
        height: '80px', 
        background: 'rgba(255, 148, 49, 0.1)', 
        color: '#FF9431', 
        borderRadius: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        margin: '0 auto 24px' 
      }}>
        <Lock size={36} />
      </div>
      <h3 style={{ fontSize: '22px', fontWeight: 950, color: '#0f172a', marginBottom: '12px' }}>
        Unlock Premium Search
      </h3>
      <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6, marginBottom: '32px' }}>
        Searching and applying to elite brand deals is exclusive to registered creators. Sign in or register to get started!
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Btn lg full onClick={onLogin} style={{ background: '#FF9431', color: '#fff', fontWeight: 950 }}>
          Login as Creator 🚀
        </Btn>
        <button 
          onClick={onClose}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#64748b', 
            fontSize: '13px', 
            fontWeight: 700, 
            cursor: 'pointer', 
            padding: '8px'
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </Modal>
);

// ----------------------------------------------------------------------
// 4. PAGE MASTER
// ----------------------------------------------------------------------

const DiscoveryGridView = ({ mob, loading, filtered, isGuest, onApply, setDetailsModal }) => (
  <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fill, minmax(380px, 1fr))', gap: mob ? '24px' : '40px' }}>
     <PublicLandingCard isMob={mob} />
     {loading ? [1, 2, 3].map(it => <SkeletonCard key={it} />) : 
      filtered.map((it, idx) => (
        <EliteDealCard key={it.id} campaign={it} index={idx} isGuest={isGuest} onApply={onApply} isMob={mob} onDetails={setDetailsModal} />
      ))}
     <MarketplaceBenefits isMob={mob} />
     <CategorySpotlightCard isMob={mob} />
     <FinalDiscoveryCard isMob={mob} />
  </div>
);

const DiscoverySwipeView = ({ mob, filtered, swipeIdx, setSwipeIdx, onApply, setDetailsModal, isGuest }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: mob ? '10px 0' : '40px 0' }}>
     <div style={{ position: 'relative', width: mob ? '100%' : '500px', height: mob ? '380px' : '500px' }}>
        <AnimatePresence>
          {filtered.length > 0 && swipeIdx < filtered.length ? (
            filtered.slice(swipeIdx, swipeIdx + 2).reverse().map((it, idx) => (
              <motion.div 
                key={it.id} 
                style={{ position: 'absolute', width: '100%', height: '100%', zIndex: idx === 1 ? 2 : 1 }} 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: idx === 1 ? 1 : 0.95, opacity: 1, y: idx === 1 ? 0 : 20 }}
                exit={{ x: 500, opacity: 0, rotate: 45 }}
                transition={{ duration: 0.4 }}
              >
                <EliteDealCard 
                  campaign={it} 
                  index={swipeIdx + (1 - idx)} 
                  isGuest={isGuest} 
                  onApply={onApply} 
                  isMob={mob} 
                  onDetails={setDetailsModal} 
                  isSwipe={true}
                  onSwipe={(dir) => {
                    if (dir === 'right') onApply(it);
                    setSwipeIdx(p => p + 1);
                  }}
                />
              </motion.div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '100px 0', width: '100%' }}>
              <DiscoveryEmptyState mob={mob} />
            </div>
          )}
        </AnimatePresence>
     </div>
     
     {filtered.length > 0 && swipeIdx < filtered.length && (
       <div style={{ display: 'flex', gap: mob ? '20px' : '32px', marginTop: mob ? '16px' : '32px' }}>
          <button 
            onClick={() => setSwipeIdx(p => p + 1)}
            style={{ width: mob ? '56px' : '80px', height: mob ? '56px' : '80px', borderRadius: '50%', background: '#fff', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', cursor: 'pointer' }}
          >
            <X size={mob ? 22 : 32} color={THEME.textSec} />
          </button>
          <button 
            onClick={() => onApply(filtered[swipeIdx])}
            style={{ width: mob ? '56px' : '80px', height: mob ? '56px' : '80px', borderRadius: '50%', background: THEME.primary, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(255,148,49,0.2)', cursor: 'pointer' }}
          >
            <Heart size={mob ? 22 : 32} color='#fff' fill='#fff' />
          </button>
       </div>
     )}
  </div>
);

const DiscoveryEmptyState = ({ mob }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: mob ? '40px 20px' : '100px 0', textAlign: 'center' }}>
    <div style={{ width: '120px', height: '120px', background: '#f8fafc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}><Search size={48} color='#cbd5e1' /></div>
    <h3 style={{ fontSize: '24px', fontWeight: 950, color: THEME.dark }}>No deals found</h3>
    <p style={{ color: THEME.textSec, marginTop: '8px' }}>Try adjusting your filters to find elite opportunities.</p>
  </div>
);

export default function CampaignsPage() {
  const navigate = useNavigate();
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [viewMode, setViewMode] = useState('grid');
  const [swipeIdx, setSwipeIdx] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailsModal, setDetailsModal] = useState(null);
  const [applyModal, setApplyModal] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [form, setForm] = useState({ pitch: '', portfolio: '', rate: '' });
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const { cpf, user } = st;
  const isGuest = !user;

  useEffect(() => {
    const handle = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', handle);
    setLoading(true);
    fetchCampaigns({ limit: 100 }).then(res => { setData(res); setLoading(false); }).catch(() => setLoading(false));
    return () => globalThis.removeEventListener('resize', handle);
  }, []);

  const filtered = useMemo(() => {
    return data.filter(it => {
      const q = (cpf.q || '').toLowerCase();
      if (q && !(it.title || '').toLowerCase().includes(q) && !(typeof it.brand === 'object' ? it.brand.companyName : (it.brand || '')).toLowerCase().includes(q)) return false;
      if (cpf.niche && !(Array.isArray(it.niche) ? it.niche : [it.niche]).includes(cpf.niche)) return false;
      return true;
    });
  }, [data, cpf.q, cpf.niche]);

  const onApply = (it) => {
    if (!st.user) {
      dsp?.({ t: 'TOAST', d: { type: 'error', msg: 'Please login as a Creator to apply.' } });
      return navigate('/login');
    }
    if (st.role !== 'creator') {
      dsp?.({ t: 'TOAST', d: { type: 'error', msg: 'Only Creators can apply to campaigns. Please login as a Creator.' } });
      return;
    }
    setApplyModal(it); setDetailsModal(null); setIsDone(false); setForm({ pitch: '', portfolio: '', rate: '' });
  };

  const onSubmit = (target) => {
    if (!user) return navigate('/login');
    if (st.role !== 'creator') {
      dsp?.({ t: 'TOAST', d: { type: 'error', msg: 'Only Creators can submit pitches.' } });
      return;
    }
    const campaign = target || applyModal;
    const newApp = {
      id: `app-${Date.now()}`,
      campaignId: campaign?.id,
      campaignTitle: campaign?.title || 'Campaign',
      brand: typeof campaign?.brand === 'object' ? campaign.brand.companyName : (campaign?.brand || 'Brand'),
      applicantEmail: user?.email,
      status: 'applied',
      date: new Date().toISOString(),
      rate: Number(form.rate) || campaign?.budgetMax || campaign?.budget || 15000,
      pitch: form.pitch || 'Applied via Campaign Marketplace'
    };
    
    // Prevent duplicate applications
    const existing = LS.get('cb_applications', []);
    if (!existing.find(a => a.campaignId === campaign?.id && a.applicantEmail === user?.email)) {
      LS.push('cb_applications', newApp);
    }
    
    dsp({ t: 'APPLY', id: campaign?.id }); 
    setIsDone(true);
    dsp({ t: 'TOAST', d: { type: 'success', msg: `Applied for ${campaign?.title}` } });
  };

  return (
    <div style={{ background: THEME.bg, minHeight: '100vh', width: '100%', overflowX: 'hidden', color: THEME.text }}>
      {/* ═══════════════════════════════════════════════
          WORLD-CLASS CINEMATIC CAMPAIGNS HERO
      ═══════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        minHeight: mob ? 'auto' : '620px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        borderBottom: '1px solid #e2e8f0',
        padding: mob ? '100px 20px 60px' : '140px 24px 90px',
        width: '100%',
        boxSizing: 'border-box',
      }}>

        {/* ── Full-bleed brand marketing background on right ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/brand_landing_hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: mob ? 'center top' : 'right center',
          opacity: mob ? 0.35 : 0.9,
          zIndex: 0,
        }} />

        {/* ── White → transparent gradient mask (left to right) ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: mob
            ? 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.96) 100%)'
            : 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 30%, rgba(255,255,255,0.6) 58%, rgba(255,255,255,0) 80%)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />

        {/* Ambient Glowing Blobs on Mobile */}
        {mob && (
          <>
            <div style={{
              position: 'absolute',
              top: '-10%',
              right: '-10%',
              width: '280px',
              height: '280px',
              background: 'radial-gradient(circle, rgba(255, 148, 49, 0.12) 0%, transparent 70%)',
              filter: 'blur(40px)',
              zIndex: 1,
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-10%',
              left: '-10%',
              width: '280px',
              height: '280px',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
              filter: 'blur(40px)',
              zIndex: 1,
              pointerEvents: 'none'
            }} />
          </>
        )}

        {/* ── Top accent stripe (Tricolor) ── */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #FF9431 0%, #ffffff 50%, #128807 100%)',
          zIndex: 10,
        }} />

        {/* ── Content Layer ── */}
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
          padding: mob ? '0 4px' : '0 24px',
          position: 'relative',
          zIndex: 5,
          boxSizing: 'border-box',
        }}>
          <div className="campaigns-hero-grid" style={{
            display: 'grid',
            gridTemplateColumns: mob ? '1fr' : '1.15fr 0.85fr',
            gap: mob ? '40px' : '48px',
            alignItems: 'center',
            width: '100%',
          }}>
            {/* Left Column: Hero Text & Actions */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: mob ? 'center' : 'flex-start',
              textAlign: mob ? 'center' : 'left',
              width: '100%',
            }}>
              {/* Live badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 20px',
                  background: 'rgba(255,148,49,0.06)',
                  border: '1.5px solid rgba(255,148,49,0.15)',
                  borderRadius: '100px',
                  marginBottom: '28px',
                }}
              >
                <span style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'block' }} />
                  <span className="pulsing-glow" style={{
                    position: 'absolute',
                    inset: '-4px',
                    borderRadius: '50%',
                    border: '2px solid #10B981',
                    opacity: 0.5,
                  }} />
                </span>
                <span style={{ fontSize: '11px', fontWeight: 950, color: '#FF9431', letterSpacing: '3px', textTransform: 'uppercase' }}>
                  Live Opportunities Hub
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  fontSize: mob ? '38px' : '74px',
                  fontWeight: 950,
                  color: '#0f172a',
                  letterSpacing: '-0.05em',
                  lineHeight: 1.0,
                  marginBottom: '28px',
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Campaign <br />
                <span style={{
                  background: 'linear-gradient(135deg, #FF9431 0%, #ff6b00 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  position: 'relative',
                  display: 'inline-block'
                }}>
                  Marketplace.
                  {mob && (
                    <span style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      width: '100%',
                      height: '4px',
                      background: 'linear-gradient(90deg, #FF9431 0%, #10B981 100%)',
                      borderRadius: '2px'
                    }} />
                  )}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={mob ? {
                  fontSize: '14px',
                  color: '#475569',
                  maxWidth: '560px',
                  marginBottom: '32px',
                  fontWeight: 600,
                  lineHeight: 1.6,
                  letterSpacing: '0.01em',
                  background: 'rgba(255, 255, 255, 0.65)',
                  backdropFilter: 'blur(10px)',
                  border: '1.5px solid rgba(255, 255, 255, 0.8)',
                  borderRadius: '20px',
                  padding: '16px 20px',
                  textAlign: 'center',
                  boxShadow: '0 8px 32px rgba(15, 23, 42, 0.03)',
                  boxSizing: 'border-box'
                } : {
                  fontSize: '18px',
                  color: '#475569',
                  maxWidth: '560px',
                  marginBottom: '40px',
                  fontWeight: 600,
                  lineHeight: 1.65,
                  letterSpacing: '0.01em',
                }}
              >
                The gateway to premium influencer commerce. Access{' '}
                <span style={{ 
                  background: 'linear-gradient(135deg, #FF9431 0%, #ff7b00 100%)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 800 
                }}>
                  high-ticket collaborations
                </span>
                , verified brand deals, and secure escrow contracts with{' '}
                <span style={{ 
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 800 
                }}>
                  zero middleman fees
                </span>
                .
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{
                  display: 'flex',
                  gap: '14px',
                  flexDirection: mob ? 'column' : 'row',
                  width: mob ? '100%' : 'auto',
                  marginBottom: '48px',
                }}
              >
                <Btn
                  lg
                  onClick={() => navigate('/brand-register')}
                  style={{
                    background: '#FF9431',
                    color: '#fff',
                    padding: '16px 32px',
                    borderRadius: '14px',
                    fontWeight: 950,
                    fontSize: '15px',
                    width: mob ? '100%' : 'auto',
                    boxShadow: '0 16px 36px rgba(255,148,49,0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  Create Campaign <ChevronRight size={18} />
                </Btn>
                <Btn
                  lg
                  onClick={() => navigate('/creators')}
                  style={{
                    background: '#fff',
                    color: '#0f172a',
                    padding: '16px 32px',
                    borderRadius: '14px',
                    border: '1.5px solid #e2e8f0',
                    fontWeight: 950,
                    fontSize: '15px',
                    width: mob ? '100%' : 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Explore Creators
                </Btn>
              </motion.div>

              {/* Trust Badge Row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                  justifyContent: mob ? 'center' : 'flex-start',
                }}
              >
                {[
                  { icon: <ShieldCheck size={14} />, label: 'Escrow Secured', color: '#10B981' },
                  { icon: <Zap size={14} />, label: 'Direct Apply', color: '#FF9431' },
                  { icon: <CheckCircle size={14} />, label: 'Verified Brands', color: '#3B82F6' },
                  { icon: <Sparkles size={14} />, label: 'Zero Agent Fees', color: '#8B5CF6' },
                ].map(b => (
                  <div key={b.label} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 14px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '100px',
                    fontSize: '12px',
                    fontWeight: 800,
                    color: '#475569',
                  }}>
                    <span style={{ color: b.color }}>{b.icon}</span>
                    {b.label}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column: Visual Mockup (Desktop Dashboard or Mobile Smartphone) */}
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 10,
            }}>
              {mob ? (
                /* Mobile only: Advanced Interactive Smartphone UI Mockup with Centered Badges */
                <div style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: '10px',
                  position: 'relative',
                }}>
                  {/* Glowing ring under phone */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '240px',
                    height: '240px',
                    background: 'radial-gradient(circle, rgba(255,148,49,0.15) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                    zIndex: 0,
                    pointerEvents: 'none',
                  }} />

                  {/* Badge ABOVE Mockup */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(16px)',
                      border: '1.5px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 8px 20px rgba(15, 23, 42, 0.05)',
                      borderRadius: '100px',
                      padding: '6px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      zIndex: 3,
                      marginBottom: '16px',
                    }}
                  >
                    <ShieldCheck size={12} color="#10B981" />
                    <span style={{ fontSize: '9px', fontWeight: 950, color: '#0f172a', letterSpacing: '0.5px' }}>Escrow Secured</span>
                  </motion.div>

                  {/* Smartphone device container */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    style={{
                      width: '100%',
                      maxWidth: '290px',
                      height: '350px',
                      background: '#0f172a',
                      borderRadius: '32px',
                      border: '4px solid rgba(255, 255, 255, 0.15)',
                      boxShadow: '0 24px 48px rgba(0, 0, 0, 0.25)',
                      overflow: 'hidden',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      zIndex: 2,
                    }}
                  >
                    {/* iOS style notch/island */}
                    <div style={{
                      position: 'absolute',
                      top: '6px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '90px',
                      height: '16px',
                      background: '#000',
                      borderRadius: '100px',
                      zIndex: 10,
                    }} />

                    {/* Simulated Screen Header */}
                    <div style={{
                      padding: '24px 16px 8px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'rgba(15, 23, 42, 0.95)',
                      backdropFilter: 'blur(8px)',
                    }}>
                      <span style={{ fontSize: '11px', fontWeight: 950, color: '#fff', letterSpacing: '0.5px' }}>
                        Creator<span style={{ color: '#FF9431' }}>Bharat</span>
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981', display: 'block' }} />
                        <span style={{ fontSize: '8px', fontWeight: 900, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Live Hub</span>
                      </div>
                    </div>

                    {/* Simulated Categories bar */}
                    <div style={{
                      display: 'flex',
                      gap: '6px',
                      padding: '8px 12px',
                      background: 'rgba(15, 23, 42, 0.5)',
                      overflowX: 'auto',
                      scrollbarWidth: 'none',
                    }}>
                      {['Verified Only', 'High Payout', 'Trending'].map((tabName, index) => (
                        <div key={tabName} style={{
                          padding: '4px 10px',
                          borderRadius: '100px',
                          fontSize: '8px',
                          fontWeight: 900,
                          background: index === 0 ? 'rgba(255, 148, 49, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                          color: index === 0 ? '#FF9431' : 'rgba(255, 255, 255, 0.5)',
                          border: index === 0 ? '1px solid rgba(255, 148, 49, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                          whiteSpace: 'nowrap',
                        }}>
                          {tabName}
                        </div>
                      ))}
                    </div>

                    {/* Simulated sliding deck viewport */}
                    <div style={{ flex: 1, padding: '8px 12px 16px', position: 'relative', overflow: 'hidden' }}>
                      <MobileCampaignDeck />
                    </div>
                  </motion.div>

                  {/* Badges BELOW Mockup */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '12px',
                    marginTop: '20px',
                    width: '100%',
                    zIndex: 3,
                  }}>
                    <motion.div
                      animate={{ y: [0, 6, 0] }}
                      transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.85)',
                        backdropFilter: 'blur(16px)',
                        border: '1.5px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: '0 8px 20px rgba(15, 23, 42, 0.05)',
                        borderRadius: '100px',
                        padding: '6px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <TrendingUp size={12} color="#FF9431" />
                      <span style={{ fontSize: '9px', fontWeight: 950, color: '#0f172a' }}>₹45K Avg Payout</span>
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 1 }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.85)',
                        backdropFilter: 'blur(16px)',
                        border: '1.5px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: '0 8px 20px rgba(15, 23, 42, 0.05)',
                        borderRadius: '100px',
                        padding: '6px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Zap size={12} color="#3B82F6" />
                      <span style={{ fontSize: '9px', fontWeight: 950, color: '#0f172a' }}>1.2K+ Live Deals</span>
                    </motion.div>
                  </div>
                </div>
              ) : (
                /* Desktop only: Advanced Interactive Command Center Mockup Dashboard */
                <DesktopCampaignDashboard />
              )}
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <MarketplaceStats isMob={mob} />
      </div>

      <FilterBar mob={mob} cpf={cpf} dsp={dsp} viewMode={viewMode} setViewMode={setViewMode} onClickPrompt={() => setShowLoginPrompt(true)} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: mob ? '40px 20px 120px' : '60px 20px 120px', position: 'relative', zIndex: 1 }}>
        {viewMode === 'grid' ? (
          <DiscoveryGridView 
            mob={mob} loading={loading} filtered={filtered} isGuest={isGuest} onApply={onApply} setDetailsModal={setDetailsModal} 
          />
        ) : (
          <DiscoverySwipeView 
            mob={mob} filtered={filtered} swipeIdx={swipeIdx} setSwipeIdx={setSwipeIdx} onApply={onApply} setDetailsModal={setDetailsModal} isGuest={isGuest}
          />
        )}
      </div>

      <CampaignDetailsModal 
        open={!!detailsModal} 
        campaign={detailsModal} 
        onClose={() => setDetailsModal(null)} 
        onApply={onApply} 
        isMob={mob} 
        isGuest={isGuest} 
      />

      <CampaignApplyModal
        open={!!applyModal}
        isDone={isDone}
        onClose={() => setApplyModal(null)}
        form={form}
        setForm={setForm}
        onSubmit={() => onSubmit(applyModal)}
        mob={mob}
      />

      <CreatorLoginPromptModal
        open={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        onLogin={() => {
          setShowLoginPrompt(false);
          navigate('/login');
        }}
      />
      <style>{`
        .campaigns-hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 48px;
          align-items: center;
          width: 100%;
          text-align: left;
        }
        .campaigns-hero-graphic {
          width: 100%;
          position: relative;
          max-width: 550px;
          margin: 0 auto;
        }
        @keyframes pulsing-glow {
          0% {
            transform: scale(0.9);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.4);
            opacity: 0.1;
          }
          100% {
            transform: scale(0.9);
            opacity: 0.6;
          }
        }
        .pulsing-glow {
          animation: pulsing-glow 2s infinite ease-in-out;
        }
        .floating-campaign-btn:hover {
          background: #fff !important;
          border-color: rgba(0, 0, 0, 0.08) !important;
          box-shadow: 0 16px 36px rgba(0,0,0,0.06) !important;
        }
        @media (max-width: 1024px) {
          .campaigns-hero-grid {
            grid-template-columns: 1fr;
            gap: 32px;
            text-align: center;
          }
        }
        @media (max-width: 1200px) {
          .campaigns-floating-icons-container {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

EliteDealCard.propTypes = { campaign: PropTypes.object, index: PropTypes.number, onApply: PropTypes.func, isMob: PropTypes.bool, onDetails: PropTypes.func, isGuest: PropTypes.bool, isSwipe: PropTypes.bool, onSwipe: PropTypes.func };
PublicLandingCard.propTypes = { isMob: PropTypes.bool };
FilterBar.propTypes = { mob: PropTypes.bool, cpf: PropTypes.object, dsp: PropTypes.func, viewMode: PropTypes.string, setViewMode: PropTypes.func, onClickPrompt: PropTypes.func };
CampaignDetailsModal.propTypes = { open: PropTypes.bool, campaign: PropTypes.object, onClose: PropTypes.func, onApply: PropTypes.func, isMob: PropTypes.bool, isGuest: PropTypes.bool };
CampaignApplyModal.propTypes = { open: PropTypes.bool, isDone: PropTypes.bool, onClose: PropTypes.func, form: PropTypes.object, setForm: PropTypes.func, onSubmit: PropTypes.func, mob: PropTypes.bool };
CreatorLoginPromptModal.propTypes = { open: PropTypes.bool, onClose: PropTypes.func, onLogin: PropTypes.func };
FinalDiscoveryCard.propTypes = { isMob: PropTypes.bool };
CategorySpotlightCard.propTypes = { isMob: PropTypes.bool };
MarketplaceStats.propTypes = { isMob: PropTypes.bool };
MarketplaceBenefits.propTypes = { isMob: PropTypes.bool };
SearchBar.propTypes = { mob: PropTypes.bool, q: PropTypes.string, onSearch: PropTypes.func, onClickPrompt: PropTypes.func };
ViewModeToggle.propTypes = { mob: PropTypes.bool, viewMode: PropTypes.string, setViewMode: PropTypes.func };
DiscoveryGridView.propTypes = { mob: PropTypes.bool, loading: PropTypes.bool, filtered: PropTypes.array, isGuest: PropTypes.bool, onApply: PropTypes.func, setDetailsModal: PropTypes.func };
DiscoverySwipeView.propTypes = { mob: PropTypes.bool, filtered: PropTypes.array, swipeIdx: PropTypes.number, setSwipeIdx: PropTypes.func, onApply: PropTypes.func, setDetailsModal: PropTypes.func, isGuest: PropTypes.bool };
DiscoveryEmptyState.propTypes = { mob: PropTypes.bool };
