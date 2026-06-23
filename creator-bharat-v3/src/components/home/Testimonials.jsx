import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { W } from '../../utils/helpers';
import { 
  ShieldCheck, Radio, CreditCard, Search, Send, Check, 
  ChevronLeft, ChevronRight, Star, Play, MessageSquare, 
  LineChart, Sparkles, Filter, Lock, ArrowRight, Users, Building2
} from 'lucide-react';

const CREATOR_STEPS = [
  { 
    id: 'c1', 
    title: 'Verified Identity', 
    sub: 'Get a premium verified portfolio page that stands out to global brands.', 
    badge: 'Identity', 
    icon: ShieldCheck,
    color: '#FF9431', 
    bg: 'rgba(255,148,49,0.06)',
    stepNumber: '01',
    metric: '+240% Response',
    metricLabel: 'Direct brand inquiry rate boost',
    points: [
      "Professional URL: Stand out with a clean, branded link (creatorbharat.com/username) that aggregates all your social stats in one place.",
      "Verified Badge: Earn the Golden Checkmark that elevates your credibility and ranks you higher in brand search results.",
      "Smart Media Kit: Generate a live, downloadable PDF kit summarizing your metrics, pricing, and campaign history instantly."
    ],
    proTip: "💡 Pro Tip: Custom portfolios increase brand engagement by 2.4x. Keep your active channels synchronized for the best results."
  },
  { 
    id: 'c2', 
    title: 'National Spotlight', 
    sub: 'Be featured in our exclusive podcasts and articles for maximum reach.', 
    badge: 'Spotlight', 
    icon: Radio,
    color: '#10B981', 
    bg: 'rgba(16,185,129,0.06)',
    stepNumber: '02',
    metric: '50K+ Monthly',
    metricLabel: 'Targeted brand-facing impressions',
    points: [
      "Official Podcast: Feature as a guest on our audio series broadcasted directly to marketing executives and founders.",
      "Featured Articles: Get profiled in monthly digital magazines spotlighting regional talent and high-growth niches.",
      "Homepage Banner: Secure a spot on our Brand Dashboard showcase to catch the eye of companies searching for creators."
    ],
    proTip: "💡 Spotlight Benefit: Featured creators are highlighted in our weekly 'Hot Picks' newsletter sent to over 1,200+ partner brands."
  },
  { 
    id: 'c3', 
    title: 'Direct Earnings', 
    sub: 'Collaborate directly with brands and keep 100% of your earnings.', 
    badge: 'Monetize', 
    icon: CreditCard,
    color: '#3B82F6', 
    bg: 'rgba(59,130,246,0.06)',
    stepNumber: '03',
    metric: '₹0 Fees',
    metricLabel: 'Zero platform commission on deals',
    points: [
      "100% Payout Retention: Keep every rupee of your contract budget. No hidden commissions or agency brokerage cuts.",
      "Escrow Protection: Eliminate payment default risks with automated contract milestones locked before production starts.",
      "Swift Settlements: Enjoy same-day direct bank transfers as soon as your deliverables are approved by the brand."
    ],
    proTip: "💡 Escrow Guarantee: Never start shooting video assets until the escrow lock badge lights up green on your dashboard."
  }
];

const BRAND_STEPS = [
  { 
    id: 'b1', 
    title: 'Smart Discovery', 
    sub: 'Find creators using AI-powered filters for niche, location, and reach.', 
    badge: 'Discovery', 
    icon: Search,
    color: '#FF9431', 
    bg: 'rgba(255,148,49,0.06)',
    stepNumber: '01',
    metric: '80+ Verified',
    metricLabel: 'Minimum creator trust score check',
    points: [
      "Multi-Filter Search: Instantly filter talent by language, regional micro-market, category, and engagement range.",
      "Audience Authenticity: Read automated score sheets that flags fake followers, bot interactions, and inactive users.",
      "Density Mapping: View geographic concentration maps to discover local creators who understand regional nuances."
    ],
    proTip: "💡 Discovery Tip: Combine Location and Language filters to find highly targeted regional micro-influencers for localized campaigns."
  },
  { 
    id: 'b2', 
    title: 'Direct Access', 
    sub: 'Skip agencies. Connect directly with verified creators for faster deals.', 
    badge: 'Access', 
    icon: Send,
    color: '#138808', 
    bg: 'rgba(19,136,8,0.06)',
    stepNumber: '02',
    metric: '-70% Time',
    metricLabel: 'Reduction in deal negotiation cycles',
    points: [
      "Bypass Brokerage: Send messages directly to verified creators without waiting days for agency response loops.",
      "Unified Chat: Negotiate, exchange mood boards, and track timeline milestones inside a single secure workspace.",
      "Standard Templates: Deploy pre-templated contracts that protect intellectual rights, usage terms, and delivery schedules."
    ],
    proTip: "💡 Direct Access: Creators respond within an average of 4 hours when you use the 'Direct Access Pitch' template."
  },
  { 
    id: 'b3', 
    title: 'Campaign Impact', 
    sub: 'Drive real results with our network of authentic and verified talent.', 
    badge: 'Impact', 
    icon: Check,
    color: '#3B82F6', 
    bg: 'rgba(59,130,246,0.06)',
    stepNumber: '03',
    metric: '3.8x ROI',
    metricLabel: 'Average brand campaign return rate',
    points: [
      "Live Analytics: Monitor impressions, CTR, conversion rates, and engagement live as posts go public.",
      "Automated Audits: Compare estimated reach against actual views to automatically calculate cost-per-view (CPV).",
      "Escrow Releases: Release funds in structured milestones only when agreed deliverables meet compliance checks."
    ],
    proTip: "💡 Analytics Tip: Integration with YouTube and Instagram APIs ensures that reach metrics are pulled directly, preventing manual log manipulation."
  }
];

// Interactive overlay graphic components for Creators Canvas
function CreatorCanvasGraphics({ current }) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
      {/* Step 1: Verified Identity Overlays */}
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '10%',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        border: '1.5px solid #FF9431',
        borderRadius: 14,
        padding: '10px 14px',
        boxShadow: '0 10px 30px rgba(255,148,49,0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        transform: current === 0 ? 'scale(1) translate(0, 0)' : 'scale(0.8) translate(-10px, -10px)',
        opacity: current === 0 ? 1 : 0,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,148,49,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Star size={12} color="#FF9431" fill="#FF9431" />
        </div>
        <span style={{ fontSize: 11, fontWeight: 900, color: '#0F172A' }}>Verified Badge Active</span>
      </div>

      {/* Step 2: National Spotlight Overlays */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '12%',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        border: '1.5px solid #10B981',
        borderRadius: 16,
        padding: '12px 16px',
        boxShadow: '0 12px 32px rgba(16,185,129,0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        transform: current === 1 ? 'scale(1) translate(0, 0)' : 'scale(0.8) translate(10px, -10px)',
        opacity: current === 1 ? 1 : 0,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        maxWidth: 220
      }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
          <Play size={14} fill="#FFF" />
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 11, fontWeight: 900, color: '#0F172A' }}>Creator Spotlight</div>
          {/* Simulated Audio Waveform */}
          <div style={{ display: 'flex', gap: 2, height: 10, alignItems: 'center', marginTop: 4 }}>
            {[6, 12, 8, 14, 10, 4, 8].map((h, i) => (
              <div key={i} style={{ width: 2, height: h, background: '#10B981', borderRadius: 1 }} />
            ))}
          </div>
        </div>
      </div>

      {/* Step 3: Direct Earnings Overlays */}
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '12%',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        border: '1.5px solid #3B82F6',
        borderRadius: 16,
        padding: '12px 18px',
        boxShadow: '0 12px 32px rgba(59,130,246,0.15)',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        transform: current === 2 ? 'scale(1) translate(0, 0)' : 'scale(0.8) translate(-10px, 10px)',
        opacity: current === 2 ? 1 : 0,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <span style={{ fontSize: 9, fontWeight: 900, color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '1px' }}>Sponsorship Settled</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 16, fontWeight: 950, color: '#0F172A' }}>₹75,000</span>
          <span style={{ fontSize: 9, fontWeight: 900, background: '#EFF6FF', color: '#3B82F6', padding: '2px 6px', borderRadius: 4 }}>0% Fee</span>
        </div>
      </div>
    </div>
  );
}

CreatorCanvasGraphics.propTypes = {
  current: PropTypes.number.isRequired
};

// Interactive overlay graphic components for Brands Canvas
function BrandCanvasGraphics({ current }) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
      {/* Step 1: Smart Discovery Overlays */}
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '10%',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        border: '1.5px solid #FF9431',
        borderRadius: 14,
        padding: '10px 14px',
        boxShadow: '0 10px 30px rgba(255,148,49,0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        transform: current === 0 ? 'scale(1) translate(0, 0)' : 'scale(0.8) translate(-10px, -10px)',
        opacity: current === 0 ? 1 : 0,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <Filter size={14} color="#FF9431" />
        <span style={{ fontSize: 11, fontWeight: 900, color: '#0F172A' }}>Filter: Jaipur, 80+ Score</span>
      </div>

      {/* Step 2: Direct Access Overlays */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '12%',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        border: '1.5px solid #138808',
        borderRadius: 16,
        padding: '12px 16px',
        boxShadow: '0 15px 35px rgba(19,136,8,0.15)',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        transform: current === 1 ? 'scale(1) translate(0, 0)' : 'scale(0.8) translate(10px, -10px)',
        opacity: current === 1 ? 1 : 0,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        maxWidth: 240
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid #E2E8F0', paddingBottom: 6 }}>
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#138808', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 8, fontWeight: 900 }}>B</div>
          <span style={{ fontSize: 10, fontWeight: 900, color: '#1F2937' }}>Brand Partner</span>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', marginLeft: 'auto' }} />
        </div>
        <div style={{ fontSize: 11, color: '#475569', fontWeight: 600, lineHeight: 1.3, textAlign: 'left' }}>
          "Hey Amit, checked your CB Score profile. Let's start the campaign!"
        </div>
      </div>

      {/* Step 3: Campaign Impact Overlays */}
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '12%',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        border: '1.5px solid #3B82F6',
        borderRadius: 16,
        padding: '14px 18px',
        boxShadow: '0 15px 35px rgba(59,130,246,0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        transform: current === 2 ? 'scale(1) translate(0, 0)' : 'scale(0.8) translate(-10px, 10px)',
        opacity: current === 2 ? 1 : 0,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 900, color: '#0F172A' }}>+48% Conversions</span>
            <span style={{ fontSize: 9, fontWeight: 800, color: '#10B981', background: '#E6FDF5', padding: '1px 5px', borderRadius: 4 }}>+12%</span>
          </div>
          {/* Mini line graph inside overlay */}
          <svg width="100" height="20" style={{ marginTop: 4 }}>
            <path d="M0,18 Q20,5 40,12 T80,2 T100,5" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
            <path d="M0,18 Q20,5 40,12 T80,2 T100,5 L100,20 L0,20 Z" fill="rgba(59, 130, 246, 0.05)" />
            <circle cx="80" cy="2" r="2.5" fill="#3B82F6" />
          </svg>
          <span style={{ fontSize: 9, fontWeight: 600, color: '#64748B', marginTop: 2 }}>ROI: 3.8x (Industry High)</span>
        </div>
      </div>
    </div>
  );
}

BrandCanvasGraphics.propTypes = {
  current: PropTypes.number.isRequired
};

function Heading({ mob }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ textAlign: 'center', marginBottom: mob ? 32 : 44 }}
    >
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 16px',
        background: '#fff', border: '1px solid rgba(0,0,0,0.06)', 
        borderRadius: 100, marginBottom: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
      }}>
        <Star size={12} color="#FF9431" fill="#FF9431" />
        <span style={{ fontSize: 10, fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '2.5px' }}>Platform Blueprint</span>
      </div>

      <h2 style={{
        fontFamily: "'Outfit', sans-serif", fontSize: mob ? 32 : 44, fontWeight: 950,
        color: '#0f172a', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 16
      }}>
        The Ecosystem of {mob && <br />}
        <span style={{ background: 'linear-gradient(135deg, #FF9431, #138808)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Trust & Growth.</span>
      </h2>

      <p style={{ fontSize: mob ? 14 : 16, fontWeight: 600, color: '#64748b', maxWidth: 650, margin: '0 auto', lineHeight: 1.6 }}>
        A unified platform helping regional creators build, spotlight, and monetize, and helping brands discover, connect, and scale with absolute security.
      </p>
    </motion.div>
  );
}

Heading.propTypes = {
  mob: PropTypes.bool
};

export default function Testimonials({ mob }) {
  const [activeTab, setActiveTab] = useState('creator');
  const [current, setCurrent] = useState(0);

  const steps = activeTab === 'creator' ? CREATOR_STEPS : BRAND_STEPS;

  const handleTabChange = (tab) => {
    if (activeTab === tab) return;
    setActiveTab(tab);
    setCurrent(0);
  };

  const handleStepClick = (idx) => {
    setCurrent(idx);
  };

  return (
    <section style={{ 
      padding: mob ? '20px 16px 20px' : '40px 24px 40px', 
      background: '#f8fafc', position: 'relative', overflow: 'hidden' 
    }}>
      {/* Grid background */}
      <div style={{ 
        position: 'absolute', inset: 0, 
        backgroundImage: 'radial-gradient(#e2e8f0 1.2px, transparent 1.2px)', 
        backgroundSize: '32px 32px', opacity: 0.3, pointerEvents: 'none' 
      }} />
      <div style={{ 
        position: 'absolute', top: '15%', right: '-5%', width: 450, height: 450, 
        background: 'radial-gradient(circle, rgba(255,148,49,0.05) 0%, transparent 70%)', 
        filter: 'blur(100px)', pointerEvents: 'none' 
      }} />

      <div style={{ ...W(), maxWidth: 1240, position: 'relative', zIndex: 1 }}>
        <Heading mob={mob} />

        {/* Horizontal tab selector */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ textAlign: 'center', marginBottom: mob ? 32 : 48 }}
        >
          <div style={{ 
            display: 'inline-flex', 
            background: 'rgba(241, 245, 249, 0.65)', 
            backdropFilter: 'blur(10px)',
            padding: 6, 
            borderRadius: 20, 
            gap: 6,
            border: '1px solid rgba(226, 232, 240, 0.8)',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)',
            flexDirection: 'row', // Always horizontal row
            width: mob ? '100%' : 'auto',
            maxWidth: mob ? '100%' : 540
          }}>
            <button
              onClick={() => handleTabChange('creator')}
              style={{
                padding: mob ? '10px 14px' : '14px 32px', 
                borderRadius: 16, 
                border: activeTab === 'creator' ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid transparent',
                background: activeTab === 'creator' ? 'rgba(15, 23, 42, 0.95)' : 'transparent',
                backdropFilter: activeTab === 'creator' ? 'blur(8px)' : 'none',
                color: activeTab === 'creator' ? '#fff' : '#475569',
                cursor: 'pointer', 
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                alignItems: 'center',
                gap: mob ? 8 : 12,
                textAlign: 'left',
                boxShadow: activeTab === 'creator' ? '0 8px 24px rgba(15,23,42,0.18)' : 'none',
                flex: 1,
                justifyContent: mob ? 'center' : 'flex-start'
              }}
              className="premium-tab-btn"
            >
              <Users size={mob ? 16 : 18} color={activeTab === 'creator' ? '#FF9431' : '#64748b'} strokeWidth={2.5} />
              <div>
                <div style={{ fontSize: mob ? 12 : 15, fontWeight: 900, fontFamily: "'Outfit', sans-serif" }}>For Creators</div>
                <div style={{ fontSize: mob ? 9 : 10, fontWeight: 600, color: activeTab === 'creator' ? 'rgba(255,255,255,0.6)' : '#94a3b8', marginTop: 1 }}>Build & Monetize</div>
              </div>
            </button>
            <button
              onClick={() => handleTabChange('brand')}
              style={{
                padding: mob ? '10px 14px' : '14px 32px', 
                borderRadius: 16, 
                border: activeTab === 'brand' ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid transparent',
                background: activeTab === 'brand' ? 'rgba(15, 23, 42, 0.95)' : 'transparent',
                backdropFilter: activeTab === 'brand' ? 'blur(8px)' : 'none',
                color: activeTab === 'brand' ? '#fff' : '#475569',
                cursor: 'pointer', 
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                alignItems: 'center',
                gap: mob ? 8 : 12,
                textAlign: 'left',
                boxShadow: activeTab === 'brand' ? '0 8px 24px rgba(15,23,42,0.18)' : 'none',
                flex: 1,
                justifyContent: mob ? 'center' : 'flex-start'
              }}
              className="premium-tab-btn"
            >
              <Building2 size={mob ? 16 : 18} color={activeTab === 'brand' ? '#10B981' : '#64748b'} strokeWidth={2.5} />
              <div>
                <div style={{ fontSize: mob ? 12 : 15, fontWeight: 900, fontFamily: "'Outfit', sans-serif" }}>For Brands</div>
                <div style={{ fontSize: mob ? 9 : 10, fontWeight: 600, color: activeTab === 'brand' ? 'rgba(255,255,255,0.6)' : '#94a3b8', marginTop: 1 }}>Discover & Scale</div>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Unified Premium SaaS Marketing Billboard Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: '#ffffff',
            border: '1.5px solid #e2e8f0',
            borderRadius: 32,
            boxShadow: '0 30px 60px rgba(15, 23, 42, 0.05)',
            position: 'relative',
            minHeight: mob ? 'auto' : 580,
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: mob ? '1fr' : '1.15fr 0.85fr',
            alignItems: 'stretch'
          }}
        >
          {/* Left Column: Headline, Checklist & Interactive Feature Badges */}
          <div style={{ 
            padding: mob ? '32px 20px' : '56px 48px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
            background: '#ffffff'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 16
            }}>
              <div style={{ 
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', 
                background: steps[current].bg, border: `1px solid ${steps[current].color}30`, borderRadius: 100,
                width: 'fit-content'
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: steps[current].color }} />
                <span style={{ fontSize: 10, fontWeight: 900, color: steps[current].color, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                  {steps[current].badge} Pillar
                </span>
              </div>
              <div style={{ 
                fontSize: 11, 
                fontWeight: 900, 
                color: '#94a3b8', 
                letterSpacing: '1.5px', 
                textTransform: 'uppercase',
                fontFamily: "'Outfit', sans-serif"
              }}>
                Step {steps[current].stepNumber} of 03
              </div>
            </div>

            <h3 style={{ 
              fontFamily: "'Outfit', sans-serif", 
              fontSize: mob ? 28 : 42, 
              fontWeight: 950, 
              color: '#0f172a', 
              lineHeight: 1.15, 
              letterSpacing: '-0.03em',
              marginBottom: 12
            }}>
              {steps[current].title}
            </h3>

            <p style={{ fontSize: mob ? 14 : 16, color: '#475569', fontWeight: 600, lineHeight: 1.6, marginBottom: 18, maxWidth: 520 }}>
              {steps[current].sub}
            </p>

            {/* Performance Metric Badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 16px',
              background: `${steps[current].color}05`,
              border: `1.5px dashed ${steps[current].color}40`,
              borderRadius: 16,
              marginBottom: 24,
              width: 'fit-content'
            }}>
              <span style={{ 
                fontFamily: "'Outfit', sans-serif",
                fontSize: 16, 
                fontWeight: 950, 
                color: steps[current].color 
              }}>
                {steps[current].metric}
              </span>
              <div style={{ width: 1.5, height: 16, background: '#cbd5e1' }} />
              <span style={{ fontSize: 11, fontWeight: 800, color: '#475569', fontFamily: "'Outfit', sans-serif" }}>
                {steps[current].metricLabel}
              </span>
            </div>

            {/* Checklist details to fill empty space and provide rich product copy */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 14, 
              marginBottom: 28,
              textAlign: 'left'
            }}>
              {steps[current].points.map((point, index) => {
                const parts = point.split(':');
                const title = parts[0];
                const desc = parts.slice(1).join(':');
                return (
                  <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ 
                      width: 18, height: 18, borderRadius: '50%', 
                      background: `${steps[current].color}15`, 
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: 2
                    }}>
                      <Check size={10} color={steps[current].color} strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#475569', lineHeight: 1.5 }}>
                      <strong style={{ color: '#0f172a', fontWeight: 850 }}>{title}:</strong>{desc}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Pro Tip Box */}
            <div style={{
              padding: '14px 18px',
              background: '#f8fafc',
              borderLeft: `4px solid ${steps[current].color}`,
              borderRadius: '4px 12px 12px 4px',
              marginBottom: 28,
              fontSize: 12,
              fontWeight: 700,
              color: '#334155',
              lineHeight: 1.5,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10
            }}>
              <span>{steps[current].proTip}</span>
            </div>

            {/* Horizontal Interactive Tab Badge List (SaaS Billboard Style) */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'row', // Always horizontal row to look clean on mobile
              gap: mob ? 8 : 12, 
              width: '100%',
              marginTop: 'auto'
            }}>
              {steps.map((step, idx) => {
                const StepIcon = step.icon;
                const isSelected = idx === current;
                return (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: mob ? 6 : 10,
                      padding: mob ? '10px 8px' : '14px 20px',
                      borderRadius: 14,
                      background: isSelected ? 'rgba(255, 255, 255, 0.85)' : 'rgba(248, 250, 252, 0.45)',
                      backdropFilter: 'blur(12px)',
                      border: `1.5px solid ${isSelected ? step.color : 'rgba(226, 232, 240, 0.7)'}`,
                      boxShadow: isSelected ? `0 8px 24px ${step.color}15` : 'none',
                      cursor: 'pointer',
                      fontSize: mob ? 10 : 13,
                      fontWeight: 800,
                      color: isSelected ? step.color : '#64748b',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      flex: 1,
                      outline: 'none',
                      justifyContent: 'center'
                    }}
                    className="billboard-badge-btn"
                  >
                    <StepIcon size={mob ? 14 : 16} strokeWidth={2.5} />
                    <span>{step.badge}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Blended Graphic Poster Canvas */}
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            background: '#ffffff',
            borderLeft: mob ? 'none' : '1px solid #e2e8f0',
            borderTop: mob ? '1px solid #e2e8f0' : 'none',
            height: mob ? 300 : 'auto'
          }}>
            {/* Real Human Model Image */}
            <img 
              src={activeTab === 'creator' ? '/about_hero_model.jpg' : '/about_workspace.jpg'} 
              alt={activeTab === 'creator' ? "Indian Creator using the CreatorBharat platform" : "Brand workspace collaboration portal"} 
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.98) contrast(1.02)'
              }}
            />

            {/* Subtle card shade overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(15,23,42,0.15) 0%, transparent 40%)',
              pointerEvents: 'none',
              zIndex: 3
            }} />

            {/* Dynamic canvas badge overlays */}
            {activeTab === 'creator' ? (
              <CreatorCanvasGraphics current={current} />
            ) : (
              <BrandCanvasGraphics current={current} />
            )}
          </div>
        </motion.div>
      </div>

      <style>{`
        .billboard-badge-btn {
          outline: none;
        }
        .billboard-badge-btn:hover {
          background: #f1f5f9 !important;
          border-color: #cbd5e1 !important;
          transform: translateY(-1px);
        }
        .premium-tab-btn:hover {
          background-color: rgba(15, 23, 42, 0.05);
        }
      `}</style>
    </section>
  );
}

Testimonials.propTypes = {
  mob: PropTypes.bool
};
