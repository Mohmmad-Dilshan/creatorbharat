import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../core/context';
import { LS } from '../../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, Star, CheckCircle2, Lock, Zap, Award,
  Crown, Target, Users, Gift, TrendingUp, MapPin,
  Medal, Sparkles, ChevronRight, ArrowRight, Clock
} from 'lucide-react';
import AuthGatekeeper from '../../components/auth/AuthGatekeeper';
import Seo from '../../components/common/SEO';

// ─── Play Button Card ──────────────────────────────────────────────────────────
const PlayButtonCard = ({ milestone, followers, deals }) => {
  const { id, title, emoji, followerTarget, dealTarget, reward, swagItems, color, bgGrad } = milestone;
  
  const followerPct = Math.min(100, Math.round((followers / followerTarget) * 100));
  const dealsMet = !dealTarget || deals >= dealTarget;
  const earned = followers >= followerTarget && dealsMet;
  const inProgress = !earned && followers > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: earned ? -6 : -3, scale: earned ? 1.02 : 1.01 }}
      transition={{ duration: 0.4 }}
      style={{
        background: earned ? bgGrad : '#fff',
        borderRadius: 28,
        border: earned ? `2px solid ${color}40` : '1.5px solid #e2e8f0',
        padding: '28px 24px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: earned ? `0 20px 60px ${color}25` : '0 4px 20px rgba(15,23,42,0.06)'
      }}
    >
      {/* Glow effect for earned */}
      {earned && (
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 200, height: 200,
          background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
          pointerEvents: 'none'
        }} />
      )}

      {/* Status badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div style={{
          fontSize: 40,
          filter: earned ? 'none' : 'grayscale(0.4)',
          lineHeight: 1
        }}>{emoji}</div>
        <div style={{
          padding: '6px 14px', borderRadius: 100,
          background: earned ? `${color}20` : inProgress ? 'rgba(255,148,49,0.1)' : '#f1f5f9',
          border: `1px solid ${earned ? color + '40' : inProgress ? 'rgba(255,148,49,0.2)' : '#e2e8f0'}`,
          fontSize: 11, fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase',
          color: earned ? color : inProgress ? '#FF9431' : '#94a3b8'
        }}>
          {earned ? '✓ EARNED' : inProgress ? 'IN PROGRESS' : 'LOCKED'}
        </div>
      </div>

      {/* Title & description */}
      <h3 style={{
        fontSize: 18, fontWeight: 950, color: earned ? '#fff' : '#0f172a',
        marginBottom: 6, letterSpacing: '-0.02em'
      }}>{title}</h3>
      
      <p style={{
        fontSize: 13, fontWeight: 600,
        color: earned ? 'rgba(255,255,255,0.75)' : '#64748b',
        marginBottom: 20, lineHeight: 1.5
      }}>
        Reach {(followerTarget / 1000).toFixed(0)}K followers
        {dealTarget && ` + ${dealTarget} completed brand deals`}
      </p>

      {/* Progress bar */}
      {!earned && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>
              {followers.toLocaleString()} / {followerTarget.toLocaleString()} followers
            </span>
            <span style={{ fontSize: 12, fontWeight: 900, color: '#FF9431' }}>{followerPct}%</span>
          </div>
          <div style={{ height: 8, background: '#f1f5f9', borderRadius: 100, overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${followerPct}%` }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              style={{ height: '100%', background: `linear-gradient(90deg, ${color}, ${color}CC)`, borderRadius: 100 }}
            />
          </div>
          {dealTarget && (
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 16, height: 16, borderRadius: '50%',
                background: dealsMet ? '#10B981' : '#f1f5f9',
                border: `1px solid ${dealsMet ? '#10B981' : '#e2e8f0'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                {dealsMet && <CheckCircle2 size={10} color="#fff" />}
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: dealsMet ? '#10B981' : '#94a3b8' }}>
                {deals}/{dealTarget} brand deals completed
              </span>
            </div>
          )}
        </div>
      )}

      {/* Reward section */}
      <div style={{
        background: earned ? 'rgba(255,255,255,0.15)' : '#f8fafc',
        borderRadius: 16, padding: '16px 20px',
        border: earned ? '1px solid rgba(255,255,255,0.2)' : '1px solid #f1f5f9',
        marginBottom: earned ? 20 : 0
      }}>
        <p style={{
          fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em',
          color: earned ? 'rgba(255,255,255,0.7)' : '#94a3b8', marginBottom: 8
        }}>
          🎁 Physical Reward
        </p>
        <p style={{
          fontSize: 13, fontWeight: 800,
          color: earned ? '#fff' : '#0f172a', marginBottom: 10
        }}>{reward}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {swagItems.map((item, i) => (
            <span key={i} style={{
              fontSize: 11, fontWeight: 700,
              padding: '4px 10px', borderRadius: 100,
              background: earned ? 'rgba(255,255,255,0.2)' : `${color}15`,
              color: earned ? '#fff' : color,
              border: `1px solid ${earned ? 'rgba(255,255,255,0.25)' : color + '30'}`
            }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      {earned && (
        <button style={{
          width: '100%', padding: '14px 20px', borderRadius: 16,
          background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.3)',
          color: '#fff', fontSize: 14, fontWeight: 900, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          backdropFilter: 'blur(8px)'
        }}>
          🎉 Claim Your Swag Kit <ArrowRight size={16} />
        </button>
      )}
    </motion.div>
  );
};

PlayButtonCard.propTypes = {
  milestone: PropTypes.object.isRequired,
  followers: PropTypes.number.isRequired,
  deals: PropTypes.number.isRequired
};

// ─── Platform Award Badge ──────────────────────────────────────────────────────
const AwardBadge = ({ award, idx }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: idx * 0.1 }}
    whileHover={{ y: -4 }}
    style={{
      background: '#fff', borderRadius: 20, padding: '20px',
      border: '1.5px solid #e2e8f0', textAlign: 'center',
      boxShadow: '0 4px 20px rgba(15,23,42,0.05)'
    }}
  >
    <div style={{ fontSize: 32, marginBottom: 10 }}>{award.emoji}</div>
    <p style={{ fontSize: 13, fontWeight: 900, color: '#0f172a', marginBottom: 4 }}>{award.title}</p>
    <p style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, marginBottom: 8 }}>{award.date}</p>
    <div style={{
      display: 'inline-block', padding: '4px 12px', borderRadius: 100,
      background: 'rgba(255,148,49,0.1)', color: '#FF9431',
      fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em'
    }}>
      {award.type}
    </div>
  </motion.div>
);

AwardBadge.propTypes = {
  award: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired
};

// ─── Task Badge ────────────────────────────────────────────────────────────────
const TaskBadge = ({ badge, earned }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    style={{
      background: earned ? 'linear-gradient(135deg, #f0fdf4, #dcfce7)' : '#f8fafc',
      borderRadius: 16, padding: '16px',
      border: earned ? '1.5px solid #bbf7d0' : '1.5px solid #e2e8f0',
      textAlign: 'center',
      opacity: earned ? 1 : 0.6
    }}
  >
    <div style={{ fontSize: 28, marginBottom: 8, filter: earned ? 'none' : 'grayscale(1)' }}>{badge.emoji}</div>
    <p style={{ fontSize: 12, fontWeight: 900, color: earned ? '#065f46' : '#94a3b8', marginBottom: 4 }}>{badge.title}</p>
    <p style={{ fontSize: 10, color: earned ? '#10B981' : '#cbd5e1', fontWeight: 700 }}>{badge.condition}</p>
    {earned && (
      <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <CheckCircle2 size={12} color="#10B981" />
        <span style={{ fontSize: 10, fontWeight: 900, color: '#10B981' }}>EARNED</span>
      </div>
    )}
  </motion.div>
);

TaskBadge.propTypes = {
  badge: PropTypes.object.isRequired,
  earned: PropTypes.bool.isRequired
};

// ─── Summit Invitation ─────────────────────────────────────────────────────────
const SummitInvitation = ({ cbScore }) => {
  const qualifies = cbScore >= 90;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: qualifies 
          ? 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        borderRadius: 28, padding: '32px',
        border: qualifies ? '1.5px solid rgba(147, 51, 234, 0.25)' : '1.5px solid #e2e8f0',
        position: 'relative', overflow: 'hidden'
      }}
    >
      {qualifies && (
        <>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15), transparent)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, background: 'radial-gradient(circle, rgba(255, 148, 49, 0.15), transparent)', borderRadius: '50%', pointerEvents: 'none' }} />
        </>
      )}
      
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 48, lineHeight: 1 }}>🎪</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <h3 style={{ fontSize: 20, fontWeight: 950, color: qualifies ? '#581C87' : '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
              Jaipur Creator Summit 2027
            </h3>
            {qualifies && (
              <span style={{ padding: '4px 12px', borderRadius: 100, background: 'rgba(147, 51, 234, 0.1)', color: '#9333EA', fontSize: 10, fontWeight: 900, letterSpacing: '0.06em' }}>
                INVITED ✓
              </span>
            )}
          </div>
          <p style={{ fontSize: 14, color: qualifies ? '#6B21A8' : '#64748b', fontWeight: 600, lineHeight: 1.6, marginBottom: 16 }}>
            India's biggest creator gathering — Top 50 creators (by CB Score) get <strong style={{ color: qualifies ? '#EA580C' : '#0f172a' }}>free travel + stay + live Play Button ceremony</strong>. Brand speed-networking sessions included.
          </p>
          
          {qualifies ? (
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {['✈️ Free Travel', '🏨 Premium Stay', '🏆 Live Trophy', '🤝 Brand Meets'].map(perk => (
                <span key={perk} style={{ padding: '6px 14px', borderRadius: 100, background: 'rgba(255,255,255,0.6)', color: '#581C87', fontSize: 12, fontWeight: 700, border: '1px solid rgba(147, 51, 234, 0.15)' }}>
                  {perk}
                </span>
              ))}
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>Your CB Score: <strong style={{ color: '#0f172a' }}>{cbScore}</strong></span>
                <span style={{ fontSize: 13, fontWeight: 900, color: '#FF9431' }}>Need 90+ for invite</span>
              </div>
              <div style={{ height: 8, background: '#e2e8f0', borderRadius: 100, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (cbScore / 100) * 100)}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
                  style={{ height: '100%', background: cbScore >= 80 ? 'linear-gradient(90deg, #FF9431, #EA580C)' : 'linear-gradient(90deg, #94a3b8, #64748b)', borderRadius: 100 }}
                />
              </div>
              <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 8, fontWeight: 600 }}>
                Improve your CB Score by completing missions, getting brand deals, and growing your community.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

SummitInvitation.propTypes = {
  cbScore: PropTypes.number.isRequired
};

// ─── Main Achievements Page ────────────────────────────────────────────────────
const PLAY_BUTTON_MILESTONES = [
  {
    id: 'rising',
    emoji: '🎖️',
    title: 'Rising Creator Button',
    followerTarget: 10000,
    dealTarget: null,
    reward: 'Starter Swag Kit',
    swagItems: ['Stickers Pack', 'Welcome Card', 'CB Diary', 'Thank You Note'],
    color: '#10B981',
    bgGrad: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%)'
  },
  {
    id: 'bharat',
    emoji: '🏆',
    title: 'Bharat Creator Button',
    followerTarget: 50000,
    dealTarget: 3,
    reward: 'Rising Swag Kit',
    swagItems: ['CB T-shirt', 'Premium Notebook', 'Custom Trophy', 'Brand Certificate'],
    color: '#FF9431',
    bgGrad: 'linear-gradient(135deg, #92400e 0%, #b45309 50%, #d97706 100%)'
  },
  {
    id: 'india',
    emoji: '👑',
    title: 'India Creator Button',
    followerTarget: 100000,
    dealTarget: null,
    reward: 'Elite Swag Kit',
    swagItems: ['India Flag Trophy', 'National Campaign', 'Elite Certificate', 'Priority Features'],
    color: '#8B5CF6',
    bgGrad: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #7c3aed 100%)'
  }
];

const PLATFORM_AWARDS = [
  { emoji: '⭐', title: 'Top Creator — Jaipur Hub', date: 'March 2026', type: 'Regional Award' },
  { emoji: '🔥', title: 'Most Engaged Creator', date: 'April 2026', type: 'Platform Award' },
  { emoji: '🌟', title: 'Brand Favourite Creator', date: 'May 2026', type: 'Brand Award' }
];

const TASK_BADGES = [
  { emoji: '🎯', title: 'Mission Master', condition: 'Complete 5 monthly missions', key: 'mission_master' },
  { emoji: '💼', title: 'Brand Champion', condition: 'Complete 10 brand deals', key: 'brand_champion' },
  { emoji: '🤝', title: 'Referral Hero', condition: 'Refer 5+ creators', key: 'referral_hero' },
  { emoji: '📍', title: 'Local Legend', condition: '3 local hub deals', key: 'local_legend' },
  { emoji: '⭐', title: 'Community Star', condition: '100+ platform followers', key: 'community_star' },
  { emoji: '🚀', title: 'Profile Elite', condition: '100% profile complete', key: 'profile_elite' }
];

export default function AchievementsPage() {
  const { st } = useApp();
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [activeSection, setActiveSection] = useState('milestones');

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  if (!st.user || st.role !== 'creator') return <AuthGatekeeper mob={mob} />;

  const allC = LS.get('cb_creators', []);
  const c = allC.find(cr => cr.email === st.user?.email) || st.user?.creatorProfile || {};
  const followers = c?.followers || 0;
  const deals = c?.case_studies?.length || 0;
  const cbScore = c?.score || 0;
  const profileComplete = localStorage.getItem('cb_profile_completed') === 'true';

  // Calculate earned badges
  const earnedBadges = {
    mission_master: ['m1','m2','m3','m4','m5'].filter(id => localStorage.getItem(`cb_mission_${id}`) === 'true').length >= 5,
    brand_champion: deals >= 10,
    referral_hero: (LS.get('cb_referrals', []).length) >= 5,
    local_legend: (c?.local_impact_hubs?.filter(h => h.l)?.length || 0) >= 3,
    community_star: (LS.get('cb_following', [])?.length || 0) >= 100,
    profile_elite: profileComplete
  };

  const totalMilestones = PLAY_BUTTON_MILESTONES.filter(m => followers >= m.followerTarget && (!m.dealTarget || deals >= m.dealTarget)).length;
  const totalBadges = Object.values(earnedBadges).filter(Boolean).length;

  const SECTIONS = [
    { id: 'milestones', label: '🏆 Play Buttons', icon: Trophy },
    { id: 'awards', label: '⭐ Awards', icon: Star },
    { id: 'badges', label: '🎯 Badges', icon: Medal },
    { id: 'summit', label: '🎪 Summit', icon: Award }
  ];

  return (
    <div className="dashboard-page-container">
      <Seo title="Achievements — CreatorBharat" description="Your creator achievements, play buttons, awards, and milestones on CreatorBharat." />
      
      {/* Header */}
      <div className="db-page-header">
        <div className="badge-saffron">
          <Trophy size={14} fill="#FF9431" /> CREATOR ACHIEVEMENTS
        </div>
        <h1 className="page-title">Your Achievements</h1>
        <p className="db-sub-text">Track your Play Button milestones, platform awards, and task badges. Every achievement is a step toward India Creator Summit 2027!</p>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Followers', value: followers >= 1000 ? `${(followers/1000).toFixed(1)}K` : followers, icon: Users, color: '#3B82F6' },
          { label: 'Brand Deals', value: deals, icon: Zap, color: '#FF9431' },
          { label: 'Play Buttons', value: `${totalMilestones}/3`, icon: Trophy, color: '#10B981' },
          { label: 'Badges Earned', value: `${totalBadges}/${TASK_BADGES.length}`, icon: Star, color: '#8B5CF6' }
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            style={{
              background: '#fff', borderRadius: 20, padding: '20px 24px',
              border: '1.5px solid #f1f5f9', boxShadow: '0 4px 20px rgba(15,23,42,0.04)'
            }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 12, background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <stat.icon size={20} color={stat.color} />
            </div>
            <p style={{ fontSize: 24, fontWeight: 950, color: '#0f172a', margin: '0 0 4px', letterSpacing: '-0.02em' }}>{stat.value}</p>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Section Tabs */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 32, paddingBottom: 4, scrollbarWidth: 'none' }}>
        {SECTIONS.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            style={{
              flexShrink: 0, padding: '10px 20px', borderRadius: 100, cursor: 'pointer',
              border: activeSection === section.id ? '1.5px solid #FF9431' : '1.5px solid #e2e8f0',
              background: activeSection === section.id ? 'rgba(255,148,49,0.1)' : '#fff',
              color: activeSection === section.id ? '#FF9431' : '#64748b',
              fontSize: 13, fontWeight: 800, transition: 'all 0.2s'
            }}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <AnimatePresence mode="wait">

        {/* Play Button Milestones */}
        {activeSection === 'milestones' && (
          <motion.div key="milestones" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 950, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                🏆 Creator Play Buttons
              </h2>
              <p style={{ fontSize: 14, color: '#64748b', fontWeight: 600, margin: 0 }}>
                Physical recognition milestones — like YouTube Play Buttons but for India's regional creators!
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: 20 }}>
              {PLAY_BUTTON_MILESTONES.map(milestone => (
                <PlayButtonCard key={milestone.id} milestone={milestone} followers={followers} deals={deals} />
              ))}
            </div>

            {/* How to earn section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ marginTop: 24, background: '#f8fafc', borderRadius: 20, padding: '24px', border: '1px solid #f1f5f9' }}
            >
              <h3 style={{ fontSize: 15, fontWeight: 900, color: '#0f172a', marginBottom: 16 }}>How to earn faster?</h3>
              <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: 12 }}>
                {[
                  { emoji: '📱', tip: 'Post consistently — 4-5x per week on Instagram & YouTube Shorts', action: 'View Opportunities', path: '/creator/opportunities' },
                  { emoji: '🤝', tip: 'Complete brand deals — each deal counts toward Bharat Button qualification', action: 'Browse Campaigns', path: '/creator/opportunities' },
                  { emoji: '🌟', tip: 'Refer other creators — build community and earn referral rewards simultaneously', action: 'View Wallet', path: '/creator/wallet' }
                ].map((item, idx) => (
                  <div key={idx} style={{ padding: '16px', background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{item.emoji}</div>
                    <p style={{ fontSize: 12, color: '#475569', fontWeight: 600, lineHeight: 1.6, marginBottom: 12 }}>{item.tip}</p>
                    <button onClick={() => navigate(item.path)} style={{
                      fontSize: 11, fontWeight: 800, color: '#FF9431', background: 'none', border: 'none',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, padding: 0
                    }}>
                      {item.action} <ChevronRight size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Platform Awards */}
        {activeSection === 'awards' && (
          <motion.div key="awards" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 950, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                ⭐ Platform Awards
              </h2>
              <p style={{ fontSize: 14, color: '#64748b', fontWeight: 600, margin: 0 }}>
                Awards given by CreatorBharat team for outstanding contributions
              </p>
            </div>

            {PLATFORM_AWARDS.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(3, 1fr)', gap: 16 }}>
                {PLATFORM_AWARDS.map((award, idx) => <AwardBadge key={idx} award={award} idx={idx} />)}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f8fafc', borderRadius: 20, border: '1px dashed #e2e8f0' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🌟</div>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: '#0f172a', marginBottom: 8 }}>No Awards Yet</h3>
                <p style={{ fontSize: 14, color: '#64748b', fontWeight: 600 }}>Keep growing your creator journey — platform awards are coming your way!</p>
              </div>
            )}

            {/* Upcoming awards info */}
            <div style={{ marginTop: 24, background: 'linear-gradient(135deg, rgba(255,148,49,0.05), rgba(234,88,12,0.03))', borderRadius: 20, padding: 24, border: '1px solid rgba(255,148,49,0.15)' }}>
              <h3 style={{ fontSize: 15, fontWeight: 900, color: '#0f172a', marginBottom: 12 }}>🏅 Upcoming Award Categories</h3>
              <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(2, 1fr)', gap: 10 }}>
                {[
                  'Top Creator — Monthly (by CB Score)',
                  'Best Local Creator — By City/Hub',
                  'Brand Favourite Creator — By Brand Votes',
                  'Most Engaged Creator — By Engagement Rate',
                  'Rising Star — New Creators (< 6 months)',
                  'Community Builder — Most Referrals'
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF9431', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Task Badges */}
        {activeSection === 'badges' && (
          <motion.div key="badges" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 950, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                🎯 Task Achievement Badges
              </h2>
              <p style={{ fontSize: 14, color: '#64748b', fontWeight: 600, margin: 0 }}>
                {totalBadges}/{TASK_BADGES.length} badges earned — Complete tasks to unlock all!
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: 16 }}>
              {TASK_BADGES.map(badge => (
                <TaskBadge key={badge.key} badge={badge} earned={earnedBadges[badge.key] || false} />
              ))}
            </div>

            {/* How to earn badges */}
            <div style={{ marginTop: 24, background: '#f8fafc', borderRadius: 20, padding: 24, border: '1px solid #f1f5f9' }}>
              <h3 style={{ fontSize: 15, fontWeight: 900, color: '#0f172a', marginBottom: 12 }}>Quick Actions to Earn Badges</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {[
                  { label: 'Complete Missions', path: '/creator/opportunities' },
                  { label: 'Apply to Campaigns', path: '/creator/opportunities' },
                  { label: 'Refer Creators', path: '/creator/wallet' },
                  { label: 'Complete Profile', path: '/creator/profile' }
                ].map((action, idx) => (
                  <button key={idx} onClick={() => navigate(action.path)} style={{
                    padding: '10px 18px', borderRadius: 100, background: '#fff',
                    border: '1.5px solid #e2e8f0', fontSize: 13, fontWeight: 700,
                    color: '#0f172a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                    transition: 'all 0.2s'
                  }}>
                    {action.label} <ArrowRight size={14} color="#FF9431" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Summit */}
        {activeSection === 'summit' && (
          <motion.div key="summit" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 950, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                🎪 Jaipur Creator Summit 2027
              </h2>
              <p style={{ fontSize: 14, color: '#64748b', fontWeight: 600, margin: 0 }}>
                India's biggest creator gathering — exclusive invitation for Top 50 creators!
              </p>
            </div>

            <SummitInvitation cbScore={cbScore} />

            {/* Summit details */}
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(2, 1fr)', gap: 20 }}>
              <div style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1.5px solid #e2e8f0' }}>
                <h3 style={{ fontSize: 15, fontWeight: 900, color: '#0f172a', marginBottom: 16 }}>📅 Event Details</h3>
                {[
                  { label: 'Date', value: 'March 15-16, 2027' },
                  { label: 'Venue', value: 'JW Marriott, Jaipur' },
                  { label: 'Attendees', value: 'Top 50 Creators + 200+ Brands' },
                  { label: 'Entry', value: 'By CB Score Invitation Only' }
                ].map((detail, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: idx < 3 ? '1px solid #f1f5f9' : 'none' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8' }}>{detail.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#0f172a' }}>{detail.value}</span>
                  </div>
                ))}
              </div>
              
              <div style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1.5px solid #e2e8f0' }}>
                <h3 style={{ fontSize: 15, fontWeight: 900, color: '#0f172a', marginBottom: 16 }}>🎁 What You Get</h3>
                {[
                  '✈️ Free flight tickets (economy class)',
                  '🏨 2-night premium hotel stay',
                  '🏆 Live Play Button ceremony on stage',
                  '🤝 Brand speed-networking (5 min/brand)',
                  '📸 Professional photography session',
                  '🎤 Keynote panel participation'
                ].map((perk, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: idx < 5 ? '1px solid #f1f5f9' : 'none' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 20, background: 'linear-gradient(135deg, rgba(255,148,49,0.05), transparent)', borderRadius: 20, padding: 24, border: '1px solid rgba(255,148,49,0.15)' }}>
              <p style={{ fontSize: 14, color: '#92400e', fontWeight: 700, margin: 0 }}>
                💡 <strong>Pro tip:</strong> Focus on completing brand deals and monthly missions — they're the fastest way to improve your CB Score and secure your invitation!
              </p>
              <button onClick={() => navigate('/creator/score')} style={{
                marginTop: 12, display: 'flex', alignItems: 'center', gap: 6,
                background: 'none', border: 'none', color: '#FF9431', fontSize: 13,
                fontWeight: 800, cursor: 'pointer', padding: 0
              }}>
                View My CB Score Breakdown <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
