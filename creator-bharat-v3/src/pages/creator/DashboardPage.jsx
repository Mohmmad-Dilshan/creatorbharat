import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../core/context';
import { LS, fmt } from '../../utils/helpers';
import { fetchCreators, fetchCampaigns } from '../../utils/platformService';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, ExternalLink, TrendingUp, Users, Zap, Briefcase,
  ChevronRight, Wallet, CheckCircle, Clock, Sparkles, Lock,
  ArrowRight, Award, Globe, Settings, Check, MapPin, Download,
  Trophy, X, QrCode, Star, BarChart3, Bell, Copy, Play,
  Target, Activity, IndianRupee, Heart, Eye,
  Terminal, RotateCcw, FileText, UserX
} from 'lucide-react';

// ─── Design Tokens ─────────────────────────────────────────────────────────────
const T = {
  saffron: '#FF9431',
  saffronDark: '#EA580C',
  emerald: '#10B981',
  violet: '#7C3AED',
  blue: '#3B82F6',
  navy: '#0F172A',
  slate: '#64748b',
  slateLight: '#94a3b8',
  bg: '#F8FAFC',
  card: '#FFFFFF',
  border: '#F1F5F9',
  borderMid: '#E2E8F0',
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }
});

// ─── Micro Components ───────────────────────────────────────────────────────────

const GlassCard = ({ children, style = {}, className = '', hover = false, onClick }) => (
  <motion.div
    whileHover={hover ? { y: -4, boxShadow: '0 25px 50px -12px rgba(15,23,42,0.08)' } : {}}
    onClick={onClick}
    style={{
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(20px)',
      borderRadius: 24,
      border: '1.5px solid rgba(255, 255, 255, 0.7)',
      boxShadow: '0 10px 30px -10px rgba(15,23,42,0.04), 0 1px 3px rgba(15,23,42,0.02)',
      overflow: 'hidden',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      ...style
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const Tag = ({ children, color = T.saffron, bg }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '3px 10px', borderRadius: 100,
    fontSize: 10, fontWeight: 900, letterSpacing: '0.05em',
    color, background: bg || color + '12',
    border: `1px solid ${color}22`
  }}>
    {children}
  </span>
);

const Divider = ({ style = {} }) => (
  <div style={{ height: 1, background: 'rgba(15, 23, 42, 0.05)', margin: '0', ...style }} />
);

// ─── StatCard ───────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, icon: Icon, color, delay = 0, locked = false }) => {
  const tints = {
    [T.emerald]: 'linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(255,255,255,0.9) 100%)',
    [T.violet]: 'linear-gradient(135deg, rgba(124,116,240,0.06) 0%, rgba(255,255,255,0.9) 100%)',
    [T.saffron]: 'linear-gradient(135deg, rgba(255,148,49,0.06) 0%, rgba(255,255,255,0.9) 100%)',
    [T.blue]: 'linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(255,255,255,0.9) 100%)',
  };
  
  const tint = locked ? 'rgba(255,255,255,0.85)' : (tints[color] || 'rgba(255,255,255,0.85)');

  return (
    <motion.div {...fadeUp(delay)}>
      <GlassCard
        hover
        style={{
          padding: '20px 22px',
          background: tint,
          border: locked ? '1.5px solid rgba(15,23,42,0.04)' : `1.5px solid ${color}20`
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 800, color: T.slateLight, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 8px' }}>
              {label}
            </p>
            <p style={{ fontSize: 26, fontWeight: 950, color: locked ? T.slateLight : T.navy, margin: 0, letterSpacing: '-0.02em', lineHeight: 1, fontFamily: 'Outfit, sans-serif' }}>
              {locked ? '—' : value}
            </p>
            {sub && !locked && (
              <p style={{ fontSize: 11, fontWeight: 800, color: color, margin: '6px 0 0', display: 'flex', alignItems: 'center', gap: 3 }}>
                <TrendingUp size={11} /> {sub}
              </p>
            )}
          </div>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: locked ? '#f1f5f9' : color + '12',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            border: locked ? '1px solid #e2e8f0' : `1px solid ${color}25`
          }}>
            <Icon size={18} color={locked ? T.slateLight : color} />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

// ─── Instagram-Style Profile Card ──────────────────────────────────────────────
const ProfileHeroCard = ({ creator, verificationStatus, score, navigate, mob, dsp }) => {
  const name = creator?.name || 'Creator';
  const handle = creator?.handle || '@' + (creator?.name?.toLowerCase()?.replace(/\s+/g, '_') || 'elite_creator');
  const isVerified = verificationStatus === 'APPROVED';
  const followers = creator?.followers || 0;
  const following = Math.floor(followers * 0.1);
  const postsCount = creator?.gallery?.filter(Boolean)?.length || 0;

  return (
    <motion.div {...fadeUp(0.05)}>
      <div style={{
        background: 'linear-gradient(135deg, #0b0f19 0%, #111827 100%)',
        borderRadius: 24,
        padding: '24px',
        border: '1.5px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 20px 40px -15px rgba(0,0,0,0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow Effects */}
        <div style={{ position: 'absolute', top: -50, right: -50, width: 150, height: 150, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255, 148, 49, 0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -50, left: -50, width: 150, height: 150, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124, 116, 240, 0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        {/* Tri-color Accent Bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #FF9431 33%, #FFFFFF 33%, #FFFFFF 66%, #10B981 66%)' }} />

        {/* Profile Info Header */}
        <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', alignItems: 'center', gap: 20 }}>
          {/* Avatar with dynamic ring */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              padding: 3,
              background: 'linear-gradient(135deg, #FF9431, #EA580C, #8B5CF6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src={creator?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=FF9431&color=fff&size=90&bold=true`}
                alt={name}
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '3px solid #111827' }}
              />
            </div>
            {isVerified && (
              <div style={{
                position: 'absolute', bottom: 4, right: 4,
                width: 24, height: 24, borderRadius: '50%',
                background: '#10B981', border: '2px solid #111827',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 8px rgba(16,185,129,0.4)'
              }}>
                <Check size={12} color="#fff" strokeWidth={3.5} />
              </div>
            )}
          </div>

          {/* Title & Hub info */}
          <div style={{ flex: 1, textAlign: mob ? 'center' : 'left' }}>
            <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', alignItems: 'center', gap: 8 }}>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: '#fff', margin: 0, fontFamily: 'Outfit, sans-serif' }}>
                {name}
              </h2>
              {isVerified ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 100, fontSize: 10, fontWeight: 800, background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <ShieldCheck size={10} fill="#10B981" color="#111827" /> Verified Partner
                </span>
              ) : (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 100, fontSize: 10, fontWeight: 800, background: 'rgba(255,148,49,0.15)', color: '#FF9431', border: '1px solid rgba(255,148,49,0.2)' }}>
                  Elite Candidate
                </span>
              )}
            </div>
            <p style={{ fontSize: 13, color: '#94a3b8', margin: '4px 0 0', fontWeight: 600 }}>
              {handle}
            </p>
            <p style={{ fontSize: 12, color: '#64748b', margin: '4px 0 0', fontWeight: 500 }}>
              📍 {creator?.city || 'Jaipur Hub'}, {creator?.state || 'Rajasthan'} · <span style={{ color: '#FF9431' }}>{Array.isArray(creator?.niche) ? creator.niche.join(', ') : creator?.niche || 'Digital Creator'}</span>
            </p>
          </div>
        </div>

        {/* Stats Grid - Instagram style */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.04)',
          borderRadius: 16,
          padding: '12px 10px',
          margin: '20px 0',
          textAlign: 'center'
        }}>
          {[
            { label: 'Followers', value: fmt.num(followers) },
            { label: 'Following', value: fmt.num(following) },
            { label: 'Posts', value: postsCount },
            { label: 'CB Score', value: score },
          ].map((s, idx) => (
            <div key={s.label} style={{ borderRight: idx < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <p style={{ fontSize: 18, fontWeight: 900, color: '#fff', margin: 0, fontFamily: 'Outfit, sans-serif' }}>{s.value}</p>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '2px 0 0' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => {
              const allC = JSON.parse(localStorage.getItem('cb_creators') || '[]');
              const activeC = creator || allC.find(cr => cr.email === st.user?.email) || {};
              navigate(`/creator/c/${activeC.id || 'elite'}`);
            }}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: 12,
              background: 'linear-gradient(135deg, #FF9431, #EA580C)',
              border: 'none',
              color: '#fff',
              fontSize: 13,
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              boxShadow: '0 8px 16px rgba(255,148,49,0.2)'
            }}
          >
            <Eye size={14} /> View My Profile
          </button>
          
          <button
            onClick={() => navigate('/creator/profile')}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: 12,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#d1d5db',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6
            }}
          >
            <Settings size={14} /> Edit Profile Hub
          </button>

          <button
            onClick={() => {
              const activeId = creator?.id || 'elite';
              navigator.clipboard.writeText(`https://creatorbharat.com/c/${activeId}`);
              dsp({ t: 'TOAST', d: { type: 'success', msg: 'Profile link copied to clipboard! 📋' } });
            }}
            style={{
              width: 42,
              borderRadius: 12,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#9ca3af',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Copy Share Link"
          >
            <Copy size={14} />
          </button>
        </div>

      </div>
    </motion.div>
  );
};

// ─── Trial / Portfolio Status Banner ───────────────────────────────────────────
const PortfolioBanner = ({ verificationStatus, portfolioActive, navigate }) => {
  if (portfolioActive) {
    const expiryTimestamp = parseInt(localStorage.getItem('cb_portfolio_expiry') || '0');
    const expiryDate = expiryTimestamp 
      ? new Date(expiryTimestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
      : new Date(Date.now() + 63072000000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }); // fallback 2 years
      
    return (
      <motion.div {...fadeUp(0.08)}>
        <div style={{
          background: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)', 
          borderRadius: 18, padding: '16px 20px', marginBottom: 16,
          border: '1.5px solid #6EE7B7',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 22 }}>⚡</span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 900, color: '#065F46', margin: '0 0 2px' }}>
                Creator Portfolio Hub Live & Active
              </p>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#047857', margin: 0 }}>
                Your elite listing is visible to premium brands · Visible until {expiryDate}
              </p>
            </div>
          </div>
          <div style={{
            padding: '7px 14px', borderRadius: 12, background: '#059669', color: '#fff', fontSize: 11, fontWeight: 900, letterSpacing: '0.05em'
          }}>
            LISTING LIVE
          </div>
        </div>
      </motion.div>
    );
  }

  if (verificationStatus !== 'APPROVED') return null;
  
  const trialStart = parseInt(localStorage.getItem('cb_trial_start') || '0');
  const daysUsed = trialStart ? Math.floor((Date.now() - trialStart) / 86400000) : 0;
  const daysLeft = Math.max(0, 30 - daysUsed);
  const isExpired = verificationStatus === 'APPROVED' && daysLeft === 0;
  const isTrialActive = verificationStatus === 'APPROVED' && daysLeft > 0;

  if (!isExpired && !isTrialActive) return null;

  const config = isExpired
    ? { emoji: '⚠️', bg: 'linear-gradient(135deg, #FEF2F2, #FEE2E2)', border: '#FCA5A5', textColor: '#DC2626', subColor: '#EF4444', msg: 'Trial Expired — Portfolio Hidden', sub: 'Pay ₹199 once to stay live for 2 years', btn: 'Activate — ₹199', btnBg: '#DC2626' }
    : daysLeft < 7
    ? { emoji: '⏳', bg: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)', border: '#FCD34D', textColor: '#D97706', subColor: '#B45309', msg: `Trial ending — ${daysLeft} days left`, sub: 'Pay ₹199 now to keep your listing live', btn: 'Pay ₹199 →', btnBg: T.saffron }
    : { emoji: '🎉', bg: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)', border: '#86EFAC', textColor: '#065F46', subColor: '#047857', msg: `30-Day Trial Active · ${daysLeft} days remaining`, sub: 'After trial, pay ₹199 once to stay visible for 2 years', btn: 'Learn More', btnBg: T.emerald };

  return (
    <motion.div {...fadeUp(0.08)}>
      <div style={{
        background: config.bg, borderRadius: 18, padding: '16px 20px', marginBottom: 16,
        border: `1.5px solid ${config.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 22 }}>{config.emoji}</span>
          <div>
            <p style={{ fontSize: 14, fontWeight: 900, color: config.textColor, margin: '0 0 2px' }}>{config.msg}</p>
            <p style={{ fontSize: 12, fontWeight: 600, color: config.subColor, margin: 0 }}>{config.sub}</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/creator/monetization')}
          style={{ padding: '9px 18px', borderRadius: 12, background: config.btnBg, border: 'none', color: '#fff', fontSize: 13, fontWeight: 800, cursor: 'pointer', flexShrink: 0 }}
        >
          {config.btn}
        </button>
      </div>
    </motion.div>
  );
};

// ─── Status Alert Banner ─────────────────────────────────────────────────────
const StatusBanner = ({ profileCompleted, verificationStatus, totalSystemUsers, loadingPayment, handleFreeSubmit, handleMockPayment, navigate }) => {
  if (!profileCompleted) return (
    <motion.div {...fadeUp(0.06)}>
      <div style={{ background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)', borderRadius: 18, padding: '16px 20px', marginBottom: 16, border: '1.5px solid #FCD34D', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 22 }}>⚡</span>
          <div>
            <p style={{ fontSize: 14, fontWeight: 900, color: '#D97706', margin: '0 0 2px' }}>Complete your Digital Portfolio Hub</p>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#B45309', margin: 0 }}>Fill all 6 profile tabs to unlock admin verification & marketplace listing</p>
          </div>
        </div>
        <button onClick={() => navigate('/creator/profile')} style={{ padding: '9px 18px', borderRadius: 12, background: T.saffron, border: 'none', color: '#fff', fontSize: 13, fontWeight: 800, cursor: 'pointer', flexShrink: 0 }}>
          Setup Profile →
        </button>
      </div>
    </motion.div>
  );

  if (verificationStatus === 'DRAFT') {
    if (totalSystemUsers < 100) return (
      <motion.div {...fadeUp(0.06)}>
        <div style={{ background: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)', borderRadius: 18, padding: '16px 20px', marginBottom: 16, border: '1.5px solid #86EFAC', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 22 }}>👑</span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 900, color: '#065F46', margin: '0 0 2px' }}>Early Launch Offer — ₹199 Fee Waived!</p>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#047857', margin: 0 }}>All checks complete. Submit your profile to admin for free!</p>
            </div>
          </div>
          <button onClick={handleFreeSubmit} style={{ padding: '9px 18px', borderRadius: 12, background: T.emerald, border: 'none', color: '#fff', fontSize: 13, fontWeight: 800, cursor: 'pointer', flexShrink: 0 }}>Submit Free →</button>
        </div>
      </motion.div>
    );
    return (
      <motion.div {...fadeUp(0.06)}>
        <div style={{ background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)', borderRadius: 18, padding: '16px 20px', marginBottom: 16, border: '1.5px solid #FCD34D', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 22 }}>🔒</span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 900, color: '#D97706', margin: '0 0 2px' }}>Pay ₹199 · Unlock Verified Identity + Campaigns</p>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#B45309', margin: 0 }}>One-time vetting fee to submit for admin verification and go live</p>
            </div>
          </div>
          <button onClick={handleMockPayment} disabled={loadingPayment} style={{ padding: '9px 18px', borderRadius: 12, background: T.saffron, border: 'none', color: '#fff', fontSize: 13, fontWeight: 800, cursor: loadingPayment ? 'not-allowed' : 'pointer', flexShrink: 0, opacity: loadingPayment ? 0.7 : 1 }}>
            {loadingPayment ? '⏳ Processing…' : 'Pay ₹199 & Submit →'}
          </button>
        </div>
      </motion.div>
    );
  }
  if (verificationStatus === 'PENDING_APPROVAL') return (
    <motion.div {...fadeUp(0.06)}>
      <div style={{ background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)', borderRadius: 18, padding: '16px 20px', marginBottom: 16, border: '1.5px solid #93C5FD', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} style={{ fontSize: 22, display: 'block' }}>⚙️</motion.span>
          <div>
            <p style={{ fontSize: 14, fontWeight: 900, color: '#1E40AF', margin: '0 0 2px' }}>Profile Under Admin Review</p>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#3B82F6', margin: 0 }}>Our editorial board is validating your metrics · Est. 2 hours</p>
          </div>
        </div>
        <div style={{ padding: '7px 14px', borderRadius: 12, background: '#1E40AF', color: '#fff', fontSize: 11, fontWeight: 900, letterSpacing: '0.05em' }}>UNDER REVIEW</div>
      </div>
    </motion.div>
  );
  return null;
};

// ─── Compliance / Profile Checklist ────────────────────────────────────────────
const ProfileChecklist = ({ hasIdentity, hasSocials, hasStory, hasServices, allChecksComplete, verificationStatus, handleFreeSubmit, navigate }) => {
  const items = [
    { done: hasIdentity, label: 'Identity & Bio', desc: 'Name, bio, city filled in' },
    { done: hasSocials, label: 'Social Handles', desc: 'Instagram or YouTube linked' },
    { done: hasStory, label: 'Story & Milestones', desc: 'Brand story chapters added' },
    { done: hasServices, label: 'Rate Packages', desc: '1+ commercial deliverable set' },
  ];
  const count = items.filter(i => i.done).length;
  const pct = Math.round((count / items.length) * 100);

  if (verificationStatus === 'APPROVED') {
    return (
      <GlassCard style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 900, color: T.navy, margin: 0 }}>Audience Demographics</h3>
          <Tag color={T.emerald}>LIVE</Tag>
        </div>
        {[
          { label: 'Age 18–24', pct: 65, color: T.saffron },
          { label: 'Age 25–34', pct: 25, color: T.violet },
          { label: 'Age 35+', pct: 10, color: T.blue },
        ].map(d => (
          <div key={d.label} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 800, color: T.slate, marginBottom: 6 }}>
              <span>{d.label}</span><span style={{ color: d.color }}>{d.pct}%</span>
            </div>
            <div style={{ height: 8, borderRadius: 100, background: '#F1F5F9', overflow: 'hidden' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${d.pct}%` }} transition={{ delay: 0.3, duration: 0.8 }} style={{ height: '100%', borderRadius: 100, background: d.color }} />
            </div>
          </div>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 4, padding: 16, background: T.bg, borderRadius: 14 }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 22, fontWeight: 950, color: T.saffron, margin: 0 }}>4.8%</p>
            <p style={{ fontSize: 10, fontWeight: 800, color: T.slateLight, margin: '3px 0 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Engagement</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 22, fontWeight: 950, color: T.emerald, margin: 0 }}>92%</p>
            <p style={{ fontSize: 10, fontWeight: 800, color: T.slateLight, margin: '3px 0 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sentiment</p>
          </div>
        </div>
      </GlassCard>
    );
  }

  if (verificationStatus === 'PENDING_APPROVAL') {
    const steps = [
      { done: true, active: false, label: 'Portfolio Hydration', desc: 'Story, milestones & brand deliverables connected' },
      { done: true, active: false, label: 'Fee Processed', desc: 'Early pioneer wave — ₹199 fee waived successfully' },
      { done: false, active: true, label: 'Manual Compliance Audit', desc: 'Editorial board validating social stats · ~2 hours' },
      { done: false, active: false, label: 'Elite Badge Activated', desc: 'Profile certified on Bharat Marketplace catalog' },
    ];
    return (
      <GlassCard style={{ padding: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 900, color: T.navy, margin: '0 0 6px' }}>Verification Progress</h3>
        <p style={{ fontSize: 12, color: T.slate, fontWeight: 600, margin: '0 0 20px' }}>Your application is moving through editorial queue</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, paddingBottom: i < steps.length - 1 ? 20 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: s.done ? T.emerald : s.active ? T.blue : T.borderMid, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: s.active ? `0 0 0 4px ${T.blue}20` : 'none' }}>
                  {s.done ? <Check size={11} color="#fff" strokeWidth={3} /> : <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.active ? '#fff' : T.slateLight }} />}
                </div>
                {i < steps.length - 1 && <div style={{ width: 2, flex: 1, background: s.done ? T.emerald + '40' : T.border, marginTop: 4 }} />}
              </div>
              <div style={{ paddingTop: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 800, color: s.active ? T.blue : s.done ? T.navy : T.slateLight, margin: '0 0 2px' }}>{s.label}</p>
                <p style={{ fontSize: 11, color: T.slateLight, fontWeight: 600, margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    );
  }

  // DRAFT state
  return (
    <GlassCard style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 900, color: T.navy, margin: '0 0 2px' }}>Portfolio Checklist</h3>
          <p style={{ fontSize: 12, color: T.slate, fontWeight: 600, margin: 0 }}>{count}/{items.length} sections complete</p>
        </div>
        <div style={{ width: 44, height: 44, borderRadius: '50%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={44} height={44} style={{ position: 'absolute' }}>
            <circle cx={22} cy={22} r={18} fill="none" stroke={T.border} strokeWidth={4} />
            <motion.circle cx={22} cy={22} r={18} fill="none" stroke={pct === 100 ? T.emerald : T.saffron} strokeWidth={4} strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 18}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 18 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 18 * (1 - pct / 100) }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ transformOrigin: 'center', transform: 'rotate(-90deg)', transformBox: 'fill-box' }}
            />
          </svg>
          <span style={{ fontSize: 11, fontWeight: 900, color: pct === 100 ? T.emerald : T.saffron, position: 'relative', zIndex: 1 }}>{pct}%</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 12, background: item.done ? T.emerald + '08' : T.bg, border: `1px solid ${item.done ? T.emerald + '20' : T.border}` }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: item.done ? T.emerald + '15' : T.border, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {item.done ? <Check size={12} color={T.emerald} strokeWidth={3} /> : <div style={{ width: 5, height: 5, borderRadius: '50%', background: T.slateLight }} />}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: item.done ? T.navy : T.slate, margin: 0 }}>{item.label}</p>
              <p style={{ fontSize: 11, color: T.slateLight, margin: 0 }}>{item.desc}</p>
            </div>
            {item.done && <CheckCircle size={14} color={T.emerald} />}
          </div>
        ))}
      </div>
      <button
        onClick={allChecksComplete ? handleFreeSubmit : () => navigate('/creator/profile')}
        style={{
          marginTop: 16, width: '100%', padding: '13px 20px', borderRadius: 14,
          background: allChecksComplete ? `linear-gradient(135deg, ${T.emerald}, #059669)` : `linear-gradient(135deg, ${T.navy}, #1E293B)`,
          border: 'none', color: '#fff', fontSize: 14, fontWeight: 900, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
        }}
      >
        {allChecksComplete ? '🚀 Submit for Admin Audit' : 'Complete Missing Sections →'}
      </button>
    </GlassCard>
  );
};

// ─── Profile Views Counter Card ────────────────────────────────────────────────
const ProfileViewsCard = ({ views, mob }) => {
  // Sparkline coordinates for a beautiful wave
  const sparklineData = "M 10 40 Q 30 20, 50 35 T 90 15 T 130 38 T 170 10 T 210 25 T 250 8";
  
  return (
    <GlassCard style={{ padding: 24, position: 'relative', overflow: 'hidden' }}>
      {/* Glow */}
      <div style={{ position: 'absolute', top: -30, left: -30, width: 90, height: 90, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <h3 style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 4px' }}>
            Profile Views
          </h3>
          <p style={{ fontSize: 32, fontWeight: 950, color: T.navy, margin: 0, fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}>
            {views.toLocaleString()}
          </p>
        </div>
        
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: 'rgba(59, 130, 246, 0.08)',
          border: '1px solid rgba(59, 130, 246, 0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Eye size={18} color="#3B82F6" />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 18 }}>
        <span style={{ fontSize: 10, fontWeight: 800, color: '#10B981', background: 'rgba(16,185,129,0.1)', padding: '2px 8px', borderRadius: 100, display: 'inline-flex', alignItems: 'center', gap: 2 }}>
          <TrendingUp size={10} /> +38 today
        </span>
        <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>
          ↑ 18% this week
        </span>
      </div>

      {/* Sparkline Graph */}
      <div style={{ height: 50, width: '100%', marginTop: 8 }}>
        <svg viewBox="0 0 260 50" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <defs>
            <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          
          {/* Shaded Area */}
          <path
            d={`${sparklineData} L 250 50 L 10 50 Z`}
            fill="url(#sparklineGrad)"
          />
          
          {/* Animated Line */}
          <motion.path
            d={sparklineData}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          
          {/* Glowing dot on last coordinate */}
          <motion.circle
            cx="250"
            cy="8"
            r="4"
            fill="#3B82F6"
            stroke="#fff"
            strokeWidth="1.5"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </svg>
      </div>
    </GlassCard>
  );
};

// ─── Milestone Progress ─────────────────────────────────────────────────────────
const MilestoneCard = ({ followers, deals, navigate }) => {
  const MILESTONES = [
    { label: 'Rising Creator', required: 10000, emoji: '🌱', color: T.emerald, reward: 'Starter Swag Kit (Stickers & Diary)' },
    { label: 'Bharat Creator', required: 50000, emoji: '🏆', color: T.saffron, reward: 'Rising Swag Kit (T-Shirt & Trophy)' },
    { label: 'India Creator', required: 100000, emoji: '🇮🇳', color: T.violet, reward: 'Elite Swag Kit (India Flag Trophy)' },
  ];
  const current = followers || 0;
  const next = MILESTONES.find(m => current < m.required) || MILESTONES[MILESTONES.length - 1];
  const achieved = MILESTONES.filter(m => current >= m.required);
  const pct = Math.min(100, Math.round((current / next.required) * 100));

  return (
    <GlassCard style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 900, color: T.navy, margin: '0 0 2px', fontFamily: 'Outfit, sans-serif' }}>Milestone Tracker</h3>
          <p style={{ fontSize: 12, color: T.slate, fontWeight: 600, margin: 0 }}>Next Goal: {next.emoji} {next.label}</p>
        </div>
        <Tag color={next.color}>{pct}% complete</Tag>
      </div>
      
      <div style={{ height: 8, borderRadius: 100, background: T.border, overflow: 'hidden', marginBottom: 10 }}>
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.3, duration: 1 }} style={{ height: '100%', borderRadius: 100, background: `linear-gradient(90deg, ${next.color}, ${next.color}aa)` }} />
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700, color: T.slateLight, marginBottom: 14 }}>
        <span>{fmt.num(current)} followers</span>
        <span>{fmt.num(Math.max(0, next.required - current))} to go</span>
      </div>

      <div style={{ background: T.bg, padding: 12, borderRadius: 14, border: `1.5px dashed ${next.color}25`, marginBottom: 16 }}>
        <p style={{ fontSize: 10, fontWeight: 800, color: T.slate, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 4px' }}>
          🎁 Target Reward
        </p>
        <p style={{ fontSize: 12, fontWeight: 800, color: T.navy, margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Award size={14} color={next.color} /> {next.reward}
        </p>
      </div>

      {achieved.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
          {achieved.map(m => (
            <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', background: m.color + '10', borderRadius: 100, fontSize: 11, fontWeight: 800, color: m.color, border: `1px solid ${m.color}20` }}>
              <CheckCircle size={10} /> {m.emoji} {m.label}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate('/creator/opportunities')}
        style={{
          width: '100%',
          padding: '11px',
          borderRadius: 12,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(15,23,42,0.08)',
          color: T.navy,
          fontSize: 12,
          fontWeight: 800,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          transition: '0.2s'
        }}
      >
        <Trophy size={14} color={T.saffron} /> View Achievements Hub →
      </button>
    </GlassCard>
  );
};

// ─── CB Official Follow Card ────────────────────────────────────────────────────
const CBOfficialCard = ({ followingCB, onToggleFollow, navigate, mob }) => (
  <motion.div {...fadeUp(0.25)}>
    <div style={{
      background: 'linear-gradient(135deg, #0b0f19 0%, #1e1b4b 100%)',
      borderRadius: 20,
      padding: '20px',
      border: '1.5px solid rgba(139, 92, 246, 0.15)',
      boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: 'linear-gradient(135deg, #FF9431, #EA580C)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 8px 16px rgba(255,148,49,0.3)'
        }}>
          <span style={{ fontSize: 22 }}>🇮🇳</span>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 15, fontWeight: 900, color: '#fff', margin: 0, fontFamily: 'Outfit, sans-serif' }}>@CreatorBharat Official</p>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', margin: '2px 0 0' }}>Join India's premium creator network, platform updates & exclusive campaigns</p>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={onToggleFollow}
          style={{
            flex: 1.2,
            padding: '10px 14px',
            borderRadius: 12,
            background: followingCB ? 'rgba(255,255,255,0.06)' : 'linear-gradient(135deg, #FF9431, #EA580C)',
            border: followingCB ? '1px solid rgba(255,255,255,0.1)' : 'none',
            color: '#fff',
            fontSize: 12,
            fontWeight: 800,
            cursor: 'pointer',
            transition: '0.2s',
            whiteSpace: 'nowrap'
          }}
        >
          {followingCB ? '✓ Following Page' : '+ Follow Page'}
        </button>

        <a
          href="https://wa.me/918000000000"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1.5,
            padding: '10px 14px',
            borderRadius: 12,
            background: 'linear-gradient(135deg, #10B981, #059669)',
            border: 'none',
            color: '#fff',
            fontSize: 12,
            fontWeight: 800,
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            boxShadow: '0 8px 16px rgba(16,185,129,0.2)'
          }}
        >
          💬 Join WhatsApp Group
        </a>
      </div>
    </div>
  </motion.div>
);

// ─── Campaigns Section ──────────────────────────────────────────────────────────
const CampaignCard = ({ title, brand, budget, isLocked, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={isLocked ? {} : { y: -3 }}
    style={{
      background: '#fff', borderRadius: 20, padding: '18px 20px',
      border: '1.5px solid rgba(241, 245, 249, 0.8)',
      boxShadow: '0 8px 20px rgba(15,23,42,0.03)',
      position: 'relative', overflow: 'hidden', cursor: isLocked ? 'not-allowed' : 'pointer',
      filter: isLocked ? 'blur(2.5px)' : 'none',
      flexShrink: 0, width: 260,
    }}
  >
    {isLocked && (
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(248,250,252,0.6)', backdropFilter: 'blur(2px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, zIndex: 2 }}>
        <Lock size={18} color={T.saffron} />
        <span style={{ fontSize: 11, fontWeight: 800, color: T.slate }}>Locked</span>
      </div>
    )}
    
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
      <div style={{ width: 36, height: 36, borderRadius: 12, background: 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 900, flexShrink: 0 }}>
        {brand[0].toUpperCase()}
      </div>
      <div>
        <p style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 170 }}>{brand}</p>
        <Tag color={T.saffron} bg="rgba(255,148,49,0.06)">Niche Match</Tag>
      </div>
    </div>

    <p style={{ fontSize: 14, fontWeight: 900, color: T.navy, margin: '0 0 12px', minHeight: 40, lineHeight: 1.4 }}>{title}</p>
    <Divider />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
      <p style={{ fontSize: 15, fontWeight: 950, color: T.emerald, margin: 0 }}>₹{budget}</p>
      <Tag color={T.blue}>Apply Now</Tag>
    </div>
  </motion.div>
);

// ─── Quick Actions Grid ─────────────────────────────────────────────────────────
const QuickActions = ({ navigate, isLocked }) => {
  const actions = [
    { label: 'Opportunities', icon: Zap, color: T.saffron, path: '/creator/opportunities', locked: isLocked },
    { label: 'Analytics', icon: BarChart3, color: T.violet, path: '/creator/analytics', locked: isLocked },
    { label: 'Wallet', icon: IndianRupee, color: T.emerald, path: '/creator/wallet', locked: false },
    { label: 'Achievements', icon: Trophy, color: '#F59E0B', path: '/creator/achievements', locked: false },
    { label: 'Messages', icon: Bell, color: T.blue, path: '/creator/messages', locked: false },
    { label: 'Monetization', icon: Activity, color: '#EC4899', path: '/creator/monetization', locked: false },
  ];
  return (
    <GlassCard style={{ padding: 20 }}>
      <h3 style={{ fontSize: 13, fontWeight: 900, color: T.navy, margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Quick Access</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {actions.map(a => (
          <motion.button
            key={a.label}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => !a.locked && navigate(a.path)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              padding: '14px 8px', borderRadius: 16,
              background: a.locked ? T.bg : a.color + '08',
              border: `1.5px solid ${a.locked ? T.border : a.color + '20'}`,
              cursor: a.locked ? 'not-allowed' : 'pointer',
              opacity: a.locked ? 0.5 : 1, position: 'relative'
            }}
          >
            {a.locked && <Lock size={10} color={T.slateLight} style={{ position: 'absolute', top: 8, right: 8 }} />}
            <div style={{ width: 36, height: 36, borderRadius: 12, background: a.locked ? T.borderMid : a.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <a.icon size={17} color={a.locked ? T.slateLight : a.color} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 800, color: a.locked ? T.slateLight : T.navy, textAlign: 'center', lineHeight: 1.2 }}>{a.label}</span>
          </motion.button>
        ))}
      </div>
    </GlassCard>
  );
};

// ─── Geography Panel ────────────────────────────────────────────────────────────
const GeographyPanel = ({ isLocked }) => {
  const geos = [
    { city: 'Delhi NCR', pct: 42, flag: '🏙️' },
    { city: 'Mumbai Hub', pct: 28, flag: '🌆' },
    { city: 'Jaipur, Rajasthan', pct: 18, flag: '🏯' },
    { city: 'Lucknow, UP', pct: 12, flag: '🕌' },
  ];
  if (isLocked) return (
    <GlassCard style={{ padding: 24, minHeight: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: T.bg }}>
      <div style={{ width: 52, height: 52, borderRadius: 16, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        <Lock size={24} color={T.saffron} />
      </div>
      <h4 style={{ fontSize: 15, fontWeight: 900, color: T.navy, margin: '0 0 6px' }}>Analytics Locked</h4>
      <p style={{ fontSize: 12, color: T.slateLight, margin: 0, maxWidth: 220, lineHeight: 1.5 }}>Geography & reach data activates after admin approval</p>
    </GlassCard>
  );
  return (
    <GlassCard style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 900, color: T.navy, margin: 0 }}>Top Geographies</h3>
        <MapPin size={16} color={T.saffron} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {geos.map((g, i) => (
          <div key={g.city} style={{ padding: '10px 14px', borderRadius: 12, background: i === 0 ? T.saffron + '06' : T.bg, border: `1px solid ${i === 0 ? T.saffron + '20' : T.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: T.navy }}>{g.flag} {g.city}</span>
              <span style={{ fontSize: 13, fontWeight: 900, color: i === 0 ? T.saffron : T.navy }}>{g.pct}%</span>
            </div>
            <div style={{ height: 4, borderRadius: 100, background: T.borderMid, overflow: 'hidden' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${g.pct}%` }} transition={{ delay: 0.4 + i * 0.1, duration: 0.7 }} style={{ height: '100%', borderRadius: 100, background: i === 0 ? T.saffron : '#94A3B8' }} />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

// ─── Application Pulse ──────────────────────────────────────────────────────────
const ApplicationPulse = ({ myApps, isLocked, navigate }) => {
  const statusColor = s => s === 'selected' ? T.emerald : s === 'shortlisted' ? T.violet : T.blue;
  return (
    <GlassCard style={{ padding: 24, position: 'relative', overflow: 'hidden' }}>
      {isLocked && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(248,250,252,0.85)', backdropFilter: 'blur(6px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, zIndex: 2, borderRadius: 18 }}>
          <Lock size={28} color={T.saffron} />
          <p style={{ fontSize: 13, fontWeight: 800, color: T.slate, textAlign: 'center', maxWidth: 200 }}>Get verified to track your applications</p>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 900, color: T.navy, margin: 0 }}>Application Pulse</h3>
        <button onClick={() => navigate('/creator/applications')} style={{ background: 'none', border: 'none', color: T.saffron, fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
          View all <ChevronRight size={14} />
        </button>
      </div>
      {myApps.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '30px 0' }}>
          <p style={{ fontSize: 36, margin: '0 0 10px' }}>📊</p>
          <p style={{ fontSize: 14, fontWeight: 800, color: T.navy, margin: '0 0 4px' }}>No Applications Yet</p>
          <p style={{ fontSize: 12, color: T.slateLight, margin: '0 0 16px' }}>Apply to campaigns to track them here</p>
          <button onClick={() => navigate('/creator/opportunities')} style={{ padding: '9px 18px', borderRadius: 12, background: T.saffron, border: 'none', color: '#fff', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>Find Campaigns</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {myApps.slice(0, 4).map(a => (
            <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 12, background: T.bg }}>
              <div style={{ width: 36, height: 36, borderRadius: 12, background: T.saffron + '10', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Briefcase size={16} color={T.saffron} />
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <p style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.campaignTitle}</p>
                <p style={{ fontSize: 11, color: T.slateLight, margin: 0 }}>{typeof a.brand === 'object' ? a.brand.companyName : a.brand}</p>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: 100, fontSize: 10, fontWeight: 900, color: statusColor(a.status), background: statusColor(a.status) + '12', border: `1px solid ${statusColor(a.status)}20`, flexShrink: 0 }}>
                {a.status?.toUpperCase() || 'SENT'}
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
};

// ─── Media Kit Card ─────────────────────────────────────────────────────────────
const MediaKitCard = ({ creator, isLocked, navigate, toast }) => (
  <div style={{
    background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
    borderRadius: 20, padding: 24, border: '1px solid rgba(255,255,255,0.06)',
    position: 'relative', overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(15,23,42,0.05)'
  }}>
    {isLocked && (
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(4px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, zIndex: 2, borderRadius: 18 }}>
        <Lock size={28} color={T.saffron} />
        <p style={{ fontSize: 13, fontWeight: 800, color: 'rgba(255,255,255,0.7)', textAlign: 'center', maxWidth: 180 }}>Get verified to unlock your media kit</p>
      </div>
    )}
    <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,148,49,0.12), transparent 70%)', pointerEvents: 'none' }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
      <Star size={18} fill={T.saffron} color={T.saffron} />
      <h3 style={{ fontSize: 16, fontWeight: 900, color: '#fff', margin: 0 }}>Elite Media Kit</h3>
    </div>
    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 600, margin: '0 0 16px', lineHeight: 1.6 }}>
      Share your cinematic profile link with brands to showcase your full worth
    </p>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', marginBottom: 12 }}>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: 0, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>creatorbharat.com/c/{creator?.id || 'elite'}</p>
      <button onClick={() => { navigator.clipboard.writeText(`https://creatorbharat.com/c/${creator?.id || 'elite'}`); toast('Link copied!', 'success'); }} style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
        <Copy size={12} />
      </button>
    </div>
    <button onClick={() => !isLocked && navigate('/creator/analytics')} disabled={isLocked} style={{ width: '100%', padding: '11px 16px', borderRadius: 12, background: isLocked ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #FF9431, #EA580C)', border: 'none', color: '#fff', fontSize: 13, fontWeight: 800, cursor: isLocked ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
      <Download size={14} /> Download Media Kit
    </button>
  </div>
);

// ─── Dev Controller ─────────────────────────────────────────────────────────────
const DevBar = ({ profileCompleted, verificationStatus, updateProfileComplete, updateVerification, handleResetAll }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Determine active simulation states
  const isNoProfile = !profileCompleted && verificationStatus === 'DRAFT';
  const isDraft = profileCompleted && verificationStatus === 'DRAFT';
  const isPending = profileCompleted && verificationStatus === 'PENDING_APPROVAL';
  const isApproved = profileCompleted && verificationStatus === 'APPROVED';

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 99999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            onClick={() => setIsOpen(true)}
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              background: '#0F172A',
              border: '1.5px solid rgba(255, 148, 49, 0.4)',
              color: '#FF9431',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(255, 148, 49, 0.2)',
              position: 'relative'
            }}
            whileHover={{ scale: 1.05, borderColor: '#FF9431', boxShadow: '0 8px 35px rgba(255, 148, 49, 0.35)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings size={22} className="spin-slow" />
            <span style={{ position: 'absolute', top: -3, right: -3, display: 'flex', height: 10, width: 10 }}>
              <span style={{ animate: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite', position: 'absolute', inlineSize: '100%', blockSize: '100%', borderRadius: '9999px', backgroundColor: '#EF4444', opacity: 0.75 }} />
              <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '9999px', height: 10, width: 10, backgroundColor: '#EF4444' }} />
            </span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.93 }}
            transition={{ type: 'spring', damping: 20, stiffness: 220 }}
            style={{
              width: 320,
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(16px)',
              border: '1.5px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 24,
              padding: 20,
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 148, 49, 0.05)',
              color: '#fff',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 10, background: 'rgba(255, 148, 49, 0.15)', color: '#FF9431' }}>
                  <Settings size={16} className="spin-slow" />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: 13, fontWeight: 900, color: '#fff', letterSpacing: '0.01em' }}>CB Developer Tools</h4>
                  <p style={{ margin: 0, fontSize: 10, color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>Simulate creator dashboard states</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 8, color: 'rgba(255,255,255,0.5)', cursor: 'pointer', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Presets List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {[
                { 
                  label: '1. No Profile', 
                  desc: 'Simulate new signup. Shows Profile Checklist.',
                  icon: Lock,
                  color: '#94A3B8',
                  active: isNoProfile,
                  action: () => { updateProfileComplete(false); updateVerification('DRAFT'); } 
                },
                { 
                  label: '2. Draft State', 
                  desc: 'Profile completed. Ready to submit details.',
                  icon: Sparkles,
                  color: '#A78BFA',
                  active: isDraft,
                  action: () => { updateProfileComplete(true); updateVerification('DRAFT'); } 
                },
                { 
                  label: '3. Pending Approval', 
                  desc: 'Submitted. Simulates review state (locked kit).',
                  icon: Clock,
                  color: '#FBBF24',
                  active: isPending,
                  action: () => { updateProfileComplete(true); updateVerification('PENDING_APPROVAL'); } 
                },
                { 
                  label: '4. Approved Creator', 
                  desc: 'Verified SaaS profile. Full features active.',
                  icon: CheckCircle,
                  color: '#34D399',
                  active: isApproved,
                  action: () => { updateProfileComplete(true); updateVerification('APPROVED'); } 
                },
              ].map(b => {
                const IconComponent = b.icon;
                return (
                  <button
                    key={b.label}
                    onClick={b.action}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '10px 14px',
                      borderRadius: 14,
                      background: b.active ? 'rgba(255, 148, 49, 0.12)' : 'rgba(255,255,255,0.03)',
                      border: b.active ? '1.5px solid rgba(255, 148, 49, 0.4)' : '1.5px solid rgba(255,255,255,0.05)',
                      color: b.active ? '#FF9431' : 'rgba(255,255,255,0.8)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      width: '100%',
                      boxShadow: b.active ? '0 4px 15px rgba(255, 148, 49, 0.1)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!b.active) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.color = '#fff';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!b.active) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: 8, background: b.active ? 'rgba(255, 148, 49, 0.15)' : 'rgba(255,255,255,0.05)', color: b.active ? '#FF9431' : b.color }}>
                      <IconComponent size={14} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                      <span style={{ fontSize: 11, fontWeight: 800 }}>{b.label}</span>
                      <span style={{ fontSize: 9, color: b.active ? 'rgba(255, 148, 49, 0.75)' : 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{b.desc}</span>
                    </div>
                    {b.active && (
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF9431', boxShadow: '0 0 8px #FF9431' }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 12, gap: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>System Reset</span>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>Clears local storage</span>
              </div>
              <button 
                onClick={handleResetAll} 
                style={{ 
                  padding: '6px 12px', 
                  borderRadius: 8, 
                  background: 'rgba(239,68,68,0.15)', 
                  border: '1px solid rgba(239,68,68,0.3)', 
                  color: '#FCA5A5', 
                  fontSize: 10, 
                  fontWeight: 800, 
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(239,68,68,0.25)';
                  e.currentTarget.style.borderColor = 'rgba(239,68,68,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(239,68,68,0.15)';
                  e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)';
                }}
              >
                Reset All
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-slow {
          animation: spinSlow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};


// ─── Helpers ────────────────────────────────────────────────────────────────────
const getCreatorProfile = st => {
  const allC = LS.get('cb_creators', []);
  return st.user?.creatorProfile || st.creatorProfile || allC.find(cr => cr.email === st.user?.email);
};
const getMyApps = st => LS.get('cb_applications', []).filter(a => a.applicantEmail === st.user?.email);
const checkFlags = c => {
  const hasIdentity = !!(c?.name && c?.bio);
  const hasSocials = !!(c?.instagram || c?.youtube);
  const hasStory = !!(c?.full_story?.p1 && c?.milestones?.length > 0);
  const hasServices = !!(c?.rateMin && c?.services?.length > 0);
  return { hasIdentity, hasSocials, hasStory, hasServices, allChecksComplete: hasIdentity && hasSocials && hasStory && hasServices };
};

const SLIDES = [
  { index: 0, title: 'Namaste, Creator! 🇮🇳', description: "Welcome to CreatorBharat V3 — India's elite creator economy platform. Let's build your digital legacy.", icon: Sparkles, color: T.saffron },
  { index: 1, title: 'Live Interactive Portfolio 📸', description: "Build a cinematic portfolio synced with your YouTube & Instagram counters. Brands discover you.", icon: Globe, color: T.violet },
  { index: 2, title: 'Escrow-Backed Deals 🔒', description: "Apply to verified brand briefs. Get paid via secure escrow — before uploading a single asset.", icon: ShieldCheck, color: T.emerald },
];

export default function DashboardPage() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();

  const [welcomeSeen, setWelcomeSeen] = useState(() => localStorage.getItem('cb_welcome_seen') === 'true');
  const [profileCompleted, setProfileCompleted] = useState(() => localStorage.getItem('cb_profile_completed') === 'true');
  const [verificationStatus, setVerificationStatus] = useState(() => localStorage.getItem('cb_verification_status') || 'DRAFT');
  const [activeSlide, setActiveSlide] = useState(0);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [totalSystemUsers, setTotalSystemUsers] = useState(0);
  const [matchingCampaigns, setMatchingCampaigns] = useState([]);
  const [portfolioActive, setPortfolioActive] = useState(() => localStorage.getItem('cb_portfolio_active') === 'true');
  const [mob, setMob] = useState(() => globalThis.innerWidth < 768);
  const [profileViews, setProfileViews] = useState(() => {
    const v = localStorage.getItem('cb_profile_views');
    if (!v) {
      localStorage.setItem('cb_profile_views', '1248');
      return 1248;
    }
    return parseInt(v);
  });

  const followingCB = st.follows?.includes('creatorbharat-official') || false;

  const toast = useCallback((msg, type) => dsp({ t: 'TOAST', d: { type, msg } }), [dsp]);
  
  const updateVerification = v => { 
    setVerificationStatus(v); 
    localStorage.setItem('cb_verification_status', v); 
    if (v === 'APPROVED') {
      if (!localStorage.getItem('cb_trial_start')) {
        localStorage.setItem('cb_trial_start', String(Date.now()));
      }
    } else {
      localStorage.removeItem('cb_trial_start');
    }
  };
  
  const updateProfileComplete = v => { setProfileCompleted(v); localStorage.setItem('cb_profile_completed', v ? 'true' : 'false'); };

  const c = getCreatorProfile(st);
  const myApps = getMyApps(st);
  const score = c ? (c.score || fmt.score(c)) : 0;
  const { hasIdentity, hasSocials, hasStory, hasServices, allChecksComplete } = checkFlags(c);
  const isLocked = verificationStatus !== 'APPROVED';

  // Increment profile views on visit
  useEffect(() => {
    const v = parseInt(localStorage.getItem('cb_profile_views') || '1248');
    const newViews = v + 1;
    localStorage.setItem('cb_profile_views', String(newViews));
    setProfileViews(newViews);
  }, []);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  useEffect(() => {
    if (allChecksComplete !== profileCompleted) updateProfileComplete(allChecksComplete);
  }, [allChecksComplete]);

  useEffect(() => {
    let cancelled = false;
    fetchCreators({ limit: 200 }).then(l => { if (!cancelled) setTotalSystemUsers(l.length); }).catch(() => {});
    fetchCampaigns().then(list => {
      if (cancelled) return;
      const niche = Array.isArray(c?.niche) ? c.niche : [c?.niche].filter(Boolean);
      let matched = list;
      if (niche.length) matched = list.filter(camp => niche.some(n => (camp.niche || camp.title || '').toLowerCase().includes(n.toLowerCase())));
      setMatchingCampaigns((matched.length ? matched : list).slice(0, 4));
    }).catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const handleNextSlide = () => {
    if (activeSlide < SLIDES.length - 1) { setActiveSlide(activeSlide + 1); }
    else { localStorage.setItem('cb_welcome_seen', 'true'); setWelcomeSeen(true); toast('Welcome! Let\'s build your legacy.', 'success'); }
  };
  const handleMockPayment = () => {
    setLoadingPayment(true);
    setTimeout(() => { 
      setLoadingPayment(false); 
      updateVerification('APPROVED'); 
      setPortfolioActive(true);
      localStorage.setItem('cb_portfolio_active', 'true');
      localStorage.setItem('cb_portfolio_expiry', String(Date.now() + 63072000000)); // 2 years
      toast('₹199 paid! Your creator listing is now active! 🎉', 'success'); 
    }, 1500);
  };
  const handleFreeSubmit = () => { updateVerification('PENDING_APPROVAL'); toast('Profile submitted for review!', 'success'); };
  
  const handleResetAll = () => {
    localStorage.removeItem('cb_welcome_seen'); 
    localStorage.removeItem('cb_profile_completed'); 
    localStorage.removeItem('cb_verification_status');
    localStorage.removeItem('cb_trial_start');
    localStorage.removeItem('cb_portfolio_active');
    localStorage.removeItem('cb_portfolio_expiry');
    setWelcomeSeen(false); 
    setProfileCompleted(false); 
    setVerificationStatus('DRAFT'); 
    setPortfolioActive(false);
    setActiveSlide(0);
    toast('State reset!', 'info');
  };
  
  const handleToggleCB = () => {
    dsp({ t: 'FOLLOW', id: 'creatorbharat-official' });
    toast(!followingCB ? '🎉 Now following @CreatorBharat!' : 'Unfollowed @CreatorBharat', !followingCB ? 'success' : 'info');
  };

  return (
    <div style={{ background: 'var(--db-bg, #F0F2F7)', minHeight: '100%', paddingBottom: mob ? '100px' : '40px' }}>

      {/* ── Welcome Onboarding Overlay ── */}
      <AnimatePresence>
        {!welcomeSeen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.75)', backdropFilter: 'blur(8px)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 200 }}
              style={{ background: '#fff', borderRadius: 28, padding: 36, maxWidth: 440, width: '100%', boxShadow: '0 40px 80px rgba(0,0,0,0.4)' }}
            >
              {/* Stepper */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 32, justifyContent: 'center' }}>
                {SLIDES.map((s, i) => (
                  <div key={s.index} style={{ height: 4, borderRadius: 100, background: i <= activeSlide ? T.saffron : T.border, width: i === activeSlide ? 28 : 10, transition: 'all 0.3s' }} />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={activeSlide} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} style={{ textAlign: 'center' }}>
                  <div style={{ width: 80, height: 80, borderRadius: 24, background: SLIDES[activeSlide].color + '12', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    {React.createElement(SLIDES[activeSlide].icon, { size: 36, color: SLIDES[activeSlide].color })}
                  </div>
                  <h2 style={{ fontSize: 22, fontWeight: 950, color: T.navy, margin: '0 0 10px', letterSpacing: '-0.02em' }}>{SLIDES[activeSlide].title}</h2>
                  <p style={{ fontSize: 14, color: T.slate, fontWeight: 600, lineHeight: 1.6, margin: '0 0 28px' }}>{SLIDES[activeSlide].description}</p>
                </motion.div>
              </AnimatePresence>

              <div style={{ display: 'flex', gap: 10 }}>
                {activeSlide > 0 && (
                  <button onClick={() => setActiveSlide(activeSlide - 1)} style={{ flex: 1, padding: '13px', borderRadius: 14, background: T.bg, border: `1.5px solid ${T.borderMid}`, color: T.slate, fontSize: 14, fontWeight: 800, cursor: 'pointer' }}>Back</button>
                )}
                <button onClick={handleNextSlide} style={{ flex: 2, padding: '13px', borderRadius: 14, background: T.navy, border: 'none', color: '#fff', fontSize: 14, fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  {activeSlide === SLIDES.length - 1 ? 'Get Started 🚀' : 'Next'} {activeSlide < SLIDES.length - 1 && <ArrowRight size={16} />}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Page Content ── */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: mob ? '16px' : '32px' }}>

        {/* Page Header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <Tag color={T.saffron} bg="rgba(255,148,49,0.08)"><Zap size={10} fill={T.saffron} /> CREATOR CONSOLE</Tag>
              <h1 style={{ fontSize: mob ? 24 : 32, fontWeight: 950, color: T.navy, margin: '8px 0 2px', letterSpacing: '-0.03em', display: 'flex', alignItems: 'center', gap: 10 }}>
                Namaste, {(c?.name || st.user?.name || 'Creator').split(' ')[0]}!
                {verificationStatus === 'APPROVED' && <ShieldCheck size={26} fill={T.saffron} color="#fff" style={{ filter: 'drop-shadow(0 4px 8px rgba(255,148,49,0.2))' }} />}
              </h1>
              <p style={{ fontSize: 13, color: T.slate, fontWeight: 600, margin: 0 }}>
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button 
                onClick={() => navigate('/creator/settings')} 
                style={{ 
                  width: 44, height: 44, borderRadius: 14, background: T.card, 
                  border: `1.5px solid ${T.border}`, display: 'flex', alignItems: 'center', 
                  justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(15,23,42,0.03)',
                  transition: '0.2s'
                }}
              >
                <Settings size={18} color={T.slate} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Status + Trial Banners */}
        <StatusBanner
          profileCompleted={profileCompleted}
          verificationStatus={verificationStatus}
          totalSystemUsers={totalSystemUsers}
          loadingPayment={loadingPayment}
          handleFreeSubmit={handleFreeSubmit}
          handleMockPayment={handleMockPayment}
          navigate={navigate}
        />
        <PortfolioBanner verificationStatus={verificationStatus} portfolioActive={portfolioActive} navigate={navigate} />

        {/* ── Main 2-Column Responsive Grid ── */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: mob ? '1fr' : '1.85fr 1fr', 
          gap: 24,
          alignItems: 'start'
        }}>
          
          {/* COLUMN 1: Main Feeds & Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* Profile Hero Panel */}
            <ProfileHeroCard creator={c} verificationStatus={verificationStatus} score={score} navigate={navigate} mob={mob} dsp={dsp} />

            {/* Stat Cards - responsive 2x2 on mobile, 1x4 on desktop */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(4, 1fr)', 
              gap: 16 
            }}>
              <StatCard label="Active Deals" value={myApps.filter(a => a.status === 'selected').length} sub="+2 this week" icon={Briefcase} color={T.emerald} delay={0.1} locked={isLocked} />
              <StatCard label="Followers" value={fmt.num(c?.followers || 0)} sub="+4.2% growth" icon={Users} color={T.violet} delay={0.15} locked={isLocked} />
              <StatCard label="CB Score" value={score} sub="Elite tier" icon={ShieldCheck} color={T.saffron} delay={0.2} locked={isLocked} />
              <StatCard label="Wallet" value="₹12,450" sub="+₹2,450 today" icon={IndianRupee} color={T.blue} delay={0.25} locked={isLocked} />
            </div>

            {/* Matching Campaigns */}
            <motion.div {...fadeUp(0.28)}>
              <GlassCard style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 900, color: T.navy, margin: '0 0 2px' }}>Matching Campaigns</h3>
                    <p style={{ fontSize: 12, color: T.slate, fontWeight: 600, margin: 0 }}>Based on your niche & hub location</p>
                  </div>
                  <button onClick={() => navigate('/creator/opportunities')} style={{ background: 'none', border: 'none', color: T.saffron, fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                    See all <ChevronRight size={14} />
                  </button>
                </div>
                <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'thin' }}>
                  {matchingCampaigns.length > 0 ? matchingCampaigns.map((camp, i) => (
                    <CampaignCard key={camp.id || i} title={camp.title || 'Campaign'} brand={camp.brand || 'Brand'} budget={fmt.inr(camp.budget || camp.budgetMin || 10000).replace('₹', '')} isLocked={isLocked} delay={0.3 + i * 0.08} />
                  )) : [1, 2, 3].map(i => (
                    <CampaignCard key={i} title="New Campaign Available" brand="Brand Partner" budget="20,000" isLocked={true} delay={0.3 + i * 0.08} />
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Geography & Application Pulse side-by-side or stacked on mobile */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: mob ? '1fr' : '1fr 1.2fr', 
              gap: 24 
            }}>
              <motion.div {...fadeUp(0.3)}>
                <GeographyPanel isLocked={isLocked} />
              </motion.div>
              <motion.div {...fadeUp(0.32)}>
                <ApplicationPulse myApps={myApps} isLocked={isLocked} navigate={navigate} />
              </motion.div>
            </div>

          </div>

          {/* COLUMN 2: Sidebar Widgets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* Quick Access Grid */}
            <motion.div {...fadeUp(0.2)}>
              <QuickActions navigate={navigate} isLocked={isLocked} />
            </motion.div>

            {/* Profile Views Sparkline Widget */}
            <motion.div {...fadeUp(0.21)}>
              <ProfileViewsCard views={profileViews} mob={mob} />
            </motion.div>

            {/* Checklist Progress Panel */}
            <motion.div {...fadeUp(0.22)}>
              <ProfileChecklist
                hasIdentity={hasIdentity} hasSocials={hasSocials} hasStory={hasStory} hasServices={hasServices}
                allChecksComplete={allChecksComplete} verificationStatus={verificationStatus}
                handleFreeSubmit={handleFreeSubmit} navigate={navigate}
              />
            </motion.div>

            {/* Milestone Tracker Card */}
            <motion.div {...fadeUp(0.26)}>
              <MilestoneCard followers={c?.followers || 0} deals={myApps.filter(a => a.status === 'selected').length} navigate={navigate} />
            </motion.div>

            {/* CB Official Follow Card */}
            <CBOfficialCard followingCB={followingCB} onToggleFollow={handleToggleCB} navigate={navigate} mob={mob} />

            {/* Media Kit Card */}
            <motion.div {...fadeUp(0.35)}>
              <MediaKitCard creator={c} isLocked={isLocked} navigate={navigate} toast={toast} />
            </motion.div>

          </div>

        </div>

      </div>

      {/* Dev Bar */}
      {import.meta.env.DEV && (
        <DevBar
          profileCompleted={profileCompleted}
          verificationStatus={verificationStatus}
          updateProfileComplete={updateProfileComplete}
          updateVerification={updateVerification}
          handleResetAll={handleResetAll}
        />
      )}

      <style>{`
        .db-layout { isolation: isolate; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { height: 4px; width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 100px; }
        @media (max-width: 480px) {
          h1 { font-size: 22px !important; }
        }
      `}</style>
    </div>
  );
}
