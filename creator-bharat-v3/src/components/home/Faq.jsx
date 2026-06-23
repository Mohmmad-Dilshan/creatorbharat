import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { W } from '../../utils/helpers';
import { 
  X, CheckCircle2, AlertTriangle, ShieldCheck, ChevronLeft, ChevronRight, 
  Wallet, Users, Star, Shield, ArrowRight, Lock, Trophy, Sparkles, MapPin
} from 'lucide-react';

const DATA = [
  {
    id: 'problem',
    type: 'problem',
    tag: 'The Core Problem',
    tagColor: '#EF4444',
    tagBg: '#FEF2F2',
    icon: AlertTriangle,
    title: 'Middlemen taking 30% of your hard work.',
    subtitle: 'These are the 5 major roadblocks holding back regional creators.',
    points: [
      { text: 'No verified portfolio — creators send raw screenshots to brands.', highlight: false },
      { text: 'Agencies cut 15% to 30% commission without adding real value.', highlight: true },
      { text: 'Chaotic communication on DMs, leading to ghosting & payment delays.', highlight: false },
      { text: 'Tier 2 & 3 creators stay completely hidden from national brands.', highlight: false },
      { text: 'No payment protection — payouts frequently default.', highlight: true },
    ],
    borderColor: 'rgba(239, 68, 68, 0.15)',
    pointIcon: X,
    pointIconBg: '#FEF2F2',
    pointIconColor: '#EF4444'
  },
  {
    id: 'cbscore',
    type: 'fix',
    tag: 'Fix #1 — Trust & Identity',
    tagColor: '#FF9431',
    tagBg: 'rgba(255, 148, 49, 0.06)',
    icon: Star,
    title: 'CB Score + Verified Digital Identity.',
    subtitle: 'India\'s first creator trust index — a unified score showing brand capability instantly.',
    points: [
      { text: 'CB Score: Combined index based on engagement, deals, and profile activity.', highlight: true },
      { text: 'Verified Badge: Restricts access to authentic, verified creators only.', highlight: false },
      { text: 'Bharat Creator Card: QR-enabled digital ID card perfect for offline deals.', highlight: true },
      { text: 'Public Profile Page (/creator/:id): Direct access for brand discovery.', highlight: false },
      { text: 'Filters: Brands search creators instantly using CB Score thresholds.', highlight: false },
    ],
    borderColor: 'rgba(255, 148, 49, 0.2)',
    pointIcon: CheckCircle2,
    pointIconBg: 'rgba(255, 148, 49, 0.1)',
    pointIconColor: '#FF9431'
  },
  {
    id: 'earnings',
    type: 'fix',
    tag: 'Fix #2 — Earnings & Growth',
    tagColor: '#10B981',
    tagBg: 'rgba(16, 185, 129, 0.06)',
    icon: Wallet,
    title: '0% Commission. 100% Yours. Always.',
    subtitle: 'Secure escrow wallets, milestones, and direct Razorpay settlements.',
    points: [
      { text: '0% Commission: Every rupee earned from brand sponsorships is fully yours.', highlight: true },
      { text: 'Escrow Wallet: Brand locking ensures payment defaults are impossible.', highlight: true },
      { text: 'Play Buttons: Rising (10K) → Bharat (50K) → India Creator (100K) trophies.', highlight: false },
      { text: 'Monthly Missions: Complete tasks to earn cashbacks and premium features.', highlight: false },
      { text: 'Same Day Settlements: Payouts are directly sent to your bank account.', highlight: false },
    ],
    borderColor: 'rgba(16, 185, 129, 0.2)',
    pointIcon: CheckCircle2,
    pointIconBg: 'rgba(16, 185, 129, 0.1)',
    pointIconColor: '#10B981'
  },
  {
    id: 'protection',
    type: 'fix',
    tag: 'Fix #3 — Creator Protection',
    tagColor: '#7C3AED',
    tagBg: 'rgba(124, 58, 237, 0.06)',
    icon: Shield,
    title: 'Creator Union. Secure Your Voice.',
    subtitle: 'Coordinated dispute assistance, suspensions mediation, and payment recovery.',
    points: [
      { text: 'Creator Union: Collective institutional appeals against unfair channel bans.', highlight: true },
      { text: 'Crisis Alert System: Coordinated network push during copyright attacks.', highlight: false },
      { text: 'Payment Dispute Mediation: Formal recovery process for defaulting brands.', highlight: true },
      { text: 'Direct Escalation: Access to Meta/Google policy managers for resolutions.', highlight: false },
      { text: 'Automatic Enrollment: No extra cost for verified CreatorBharat members.', highlight: false },
    ],
    borderColor: 'rgba(124, 58, 237, 0.2)',
    pointIcon: CheckCircle2,
    pointIconBg: 'rgba(124, 58, 237, 0.1)',
    pointIconColor: '#7C3AED'
  },
  {
    id: 'community',
    type: 'fix',
    tag: 'Fix #4 — Network & Events',
    tagColor: '#3B82F6',
    tagBg: 'rgba(59, 130, 246, 0.06)',
    icon: Users,
    title: 'India\'s Largest Regional Network.',
    subtitle: 'Leaderboards, collaborative bundles, and invites to the National Summit.',
    points: [
      { text: 'Global Leaderboard: Real-time rankings of top creators across states.', highlight: false },
      { text: 'Co-Creation Bundles: Group together with other creators to land big deals.', highlight: true },
      { text: 'National Summit 2027: Free travel & VIP passes for elite creators.', highlight: true },
      { text: 'Direct Messaging: Secure chat between brands and verified profiles.', highlight: false },
      { text: 'Pan-India Reach: Network coverage across all 28 states of Bharat.', highlight: false },
    ],
    borderColor: 'rgba(59, 130, 246, 0.2)',
    pointIcon: CheckCircle2,
    pointIconBg: 'rgba(59, 130, 246, 0.1)',
    pointIconColor: '#3B82F6'
  },
];

// Custom Visual Poster Components
function ProblemLeakageGraphic() {
  return (
    <div style={{
      width: '100%',
      padding: '24px',
      background: '#FFF',
      borderRadius: '20px',
      border: '1.5px dashed rgba(239, 68, 68, 0.25)',
      boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
      position: 'relative'
    }}>
      <div style={{ fontSize: 11, fontWeight: 900, color: '#EF4444', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
        <AlertTriangle size={14} /> MIDDLEMAN TRAP (30% LOSS)
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC', padding: '12px 16px', borderRadius: 12, border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>Brand Payment</span>
          <span style={{ fontSize: 13, fontWeight: 900, color: '#0F172A' }}>₹1,00,000</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FEF2F2', padding: '12px 16px', borderRadius: 12, border: '1px solid #FEE2E2', position: 'relative' }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: '#EF4444' }}>Agency Commission (30%)</span>
          <span style={{ fontSize: 13, fontWeight: 900, color: '#EF4444' }}>-₹30,000</span>
        </div>
        <div style={{ height: 1.5, background: 'repeating-linear-gradient(90deg, #E2E8F0, #E2E8F0 4px, transparent 4px, transparent 8px)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFF', padding: '12px 16px', borderRadius: 12, border: '1.5px solid #EF4444' }}>
          <span style={{ fontSize: 12, fontWeight: 900, color: '#EF4444' }}>Net Creator Payout</span>
          <span style={{ fontSize: 14, fontWeight: 950, color: '#EF4444' }}>₹70,000</span>
        </div>
      </div>
    </div>
  );
}

function BharatCreatorCardGraphic() {
  return (
    <div style={{
      width: '100%',
      padding: '24px',
      background: 'linear-gradient(135deg, #FFF8F3 0%, #FFF 100%)',
      borderRadius: '20px',
      border: '1.5px solid rgba(255, 148, 49, 0.3)',
      boxShadow: '0 12px 36px rgba(255, 148, 49, 0.08)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Sparkles background */}
      <div style={{ position: 'absolute', top: 12, right: 12, color: '#FF9431', opacity: 0.8 }}>
        <Sparkles size={20} className="floating-sparkle" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #FF9431, #EA580C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, color: '#fff' }}>
          CB
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 900, color: '#0F172A' }}>Bharat Creator Pass</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
            <span style={{ fontSize: 10, fontWeight: 800, color: '#10B981', textTransform: 'uppercase' }}>Verified Profile</span>
          </div>
        </div>
      </div>

      <div style={{ background: '#FFF', border: '1px solid #F1F5F9', borderRadius: 14, padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px' }}>Trust Index</div>
          <div style={{ fontSize: 16, fontWeight: 950, color: '#0F172A', marginTop: 2 }}>CB Score: 88</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{ fontSize: 9, fontWeight: 900, background: '#EFF6FF', color: '#2563EB', padding: '2px 8px', borderRadius: 100, textTransform: 'uppercase' }}>Elite Level</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginTop: 4 }}>Top 2% Creator</span>
        </div>
      </div>

      {/* Mock QR Code simulation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', marginTop: 16, borderTop: '1px dashed #E2E8F0', paddingTop: 14 }}>
        <div style={{ fontSize: 10, color: '#64748B', fontWeight: 600 }}>Scan Card to Collaborate</div>
        <div style={{ width: 32, height: 32, border: '2px solid #0F172A', padding: 2, display: 'flex', flexWrap: 'wrap', gap: 1, background: '#FFF', cursor: 'pointer' }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} style={{ width: 7, height: 7, background: (i % 2 === 0 || i === 0 || i === 8) ? '#0F172A' : '#FFF' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function EscrowInvoiceGraphic() {
  return (
    <div style={{
      width: '100%',
      padding: '24px',
      background: '#FFF',
      borderRadius: '20px',
      border: '1.5px solid rgba(16, 185, 129, 0.3)',
      boxShadow: '0 12px 36px rgba(16, 185, 129, 0.06)',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 900, color: '#10B981', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
          SECURED TRANSACTION
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#ECFDF5', padding: '2px 8px', borderRadius: 100 }}>
          <Lock size={10} color="#10B981" />
          <span style={{ fontSize: 10, fontWeight: 900, color: '#10B981' }}>Escrow Locked</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, borderBottom: '1px solid #F1F5F9', paddingBottom: 8 }}>
          <span style={{ color: '#64748B', fontWeight: 600 }}>Brand Deposit</span>
          <span style={{ color: '#0F172A', fontWeight: 800 }}>₹1,00,000</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, borderBottom: '1px solid #F1F5F9', paddingBottom: 8 }}>
          <span style={{ color: '#64748B', fontWeight: 600 }}>CreatorBharat Fee</span>
          <span style={{ color: '#10B981', fontWeight: 900 }}>₹0 (0% commission)</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 900, paddingTop: 6 }}>
          <span style={{ color: '#0F172A' }}>Creator Payout</span>
          <span style={{ color: '#10B981' }}>₹1,00,000</span>
        </div>
      </div>

      <div style={{ marginTop: 18, background: '#F0FDF4', border: '1px solid #DCFCE7', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckCircle2 size={12} color="#FFF" />
        </div>
        <span style={{ fontSize: 11, fontWeight: 800, color: '#14532D' }}>Settled instantly via Razorpay</span>
      </div>
    </div>
  );
}

function UnionShieldGraphic() {
  return (
    <div style={{
      width: '100%',
      padding: '24px',
      background: 'linear-gradient(135deg, #F9F5FF 0%, #FFF 100%)',
      borderRadius: '20px',
      border: '1.5px solid rgba(124, 58, 237, 0.3)',
      boxShadow: '0 12px 36px rgba(124, 58, 237, 0.06)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      position: 'relative'
    }}>
      <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
        <ShieldCheck size={26} color="#7C3AED" strokeWidth={2.5} />
      </div>
      <div style={{ fontSize: 14, fontWeight: 950, color: '#0F172A', fontFamily: "'Outfit', sans-serif" }}>Creator Union Member Pass</div>
      <div style={{ fontSize: 10, color: '#7C3AED', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', marginTop: 2 }}>ID: CB-UNION-2027</div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
        <div style={{ background: '#FFF', border: '1px solid #ECE9F9', borderRadius: 8, padding: '8px 12px', fontSize: 11, fontWeight: 700, color: '#5B21B6', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7C3AED' }} /> Verified Policy Appeals Active
        </div>
        <div style={{ background: '#FFF', border: '1px solid #ECE9F9', borderRadius: 8, padding: '8px 12px', fontSize: 11, fontWeight: 700, color: '#5B21B6', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7C3AED' }} /> Escalation Mediation Enabled
        </div>
      </div>
    </div>
  );
}

function SummitTicketGraphic() {
  return (
    <div style={{
      width: '100%',
      background: 'linear-gradient(135deg, #EFF6FF 0%, #FFF 100%)',
      borderRadius: '20px',
      border: '1.5px solid rgba(59, 130, 246, 0.3)',
      boxShadow: '0 12px 36px rgba(59, 130, 246, 0.06)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Top Holographic header */}
      <div style={{ background: 'linear-gradient(90deg, #3B82F6, #1D4ED8)', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#FFF' }}>
        <span style={{ fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>National Summit 2027</span>
        <Trophy size={14} />
      </div>

      <div style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Ticket Class</div>
            <div style={{ fontSize: 16, fontWeight: 950, color: '#1E3A8A', fontFamily: "'Outfit', sans-serif", marginTop: 2 }}>VIP INVITATION</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Venue</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#1E3A8A', marginTop: 2, display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'flex-end' }}>
              <MapPin size={10} /> New Delhi
            </div>
          </div>
        </div>

        {/* Ticket Perforation Stub simulation */}
        <div style={{ height: 1, borderTop: '1px dashed #BFDBFE', position: 'relative', margin: '14px 0' }}>
          <div style={{ position: 'absolute', left: -26, top: -6, width: 12, height: 12, borderRadius: '50%', background: '#F1F5F9', borderRight: '1.5px solid rgba(59, 130, 246, 0.3)' }} />
          <div style={{ position: 'absolute', right: -26, top: -6, width: 12, height: 12, borderRadius: '50%', background: '#F1F5F9', borderLeft: '1.5px solid rgba(59, 130, 246, 0.3)' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Access Code</div>
            <div style={{ fontSize: 11, fontWeight: 900, color: '#1E3A8A', marginTop: 1 }}>CB-SUMMIT-2027-VIP</div>
          </div>
          {/* Simulated Barcode */}
          <div style={{ display: 'flex', gap: 2, height: 24, alignItems: 'center' }}>
            {[2, 4, 1, 3, 1, 4, 2, 3, 1, 4].map((w, i) => (
              <div key={i} style={{ width: w, height: '100%', background: '#1E3A8A' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Faq({ mob }) {
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [direction, setDirection] = useState('next');

  const goTo = (idx, dir = 'next') => {
    if (idx === current || flipping) return;
    setDirection(dir);
    setFlipping(true);
    setTimeout(() => {
      setCurrent(idx);
      setFlipping(false);
    }, 160);
  };

  const next = () => goTo((current + 1) % DATA.length, 'next');
  const prev = () => goTo((current - 1 + DATA.length) % DATA.length, 'prev');

  const getAnimation = () => {
    if (flipping) {
      return direction === 'next' ? 'flipOutLeft 0.16s ease forwards' : 'flipOutRight 0.16s ease forwards';
    }
    return direction === 'next' ? 'flipInRight 0.18s ease forwards' : 'flipInLeft 0.18s ease forwards';
  };

  const renderActiveGraphic = () => {
    switch (DATA[current].id) {
      case 'problem': return <ProblemLeakageGraphic />;
      case 'cbscore': return <BharatCreatorCardGraphic />;
      case 'earnings': return <EscrowInvoiceGraphic />;
      case 'protection': return <UnionShieldGraphic />;
      case 'community': return <SummitTicketGraphic />;
      default: return null;
    }
  };

  const PointIcon = DATA[current].pointIcon;

  return (
    <section style={{ padding: mob ? '20px 16px 40px' : '40px 24px 80px', background: '#f8fafc', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background blurs */}
      <div style={{ position: 'absolute', top: '10%', left: '-10%', width: 500, height: 500, background: 'rgba(239, 68, 68, 0.03)', filter: 'blur(120px)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: 500, height: 500, background: 'rgba(16, 185, 129, 0.03)', filter: 'blur(120px)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ ...W(1200), position: 'relative', zIndex: 1 }}>
        
        {/* Unified Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: mob ? 32 : 48 }}
        >
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', 
            background: 'rgba(255, 148, 49, 0.08)', border: '1px solid rgba(255, 148, 49, 0.25)', borderRadius: 100, marginBottom: 16
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF9431' }} />
            <span style={{ fontSize: 10, fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px' }}>
              Ecosystem Showcase
            </span>
          </div>

          <h2 style={{ 
            fontFamily: "'Outfit', sans-serif", 
            fontSize: mob ? 30 : 52, 
            fontWeight: 950, 
            color: '#0f172a', 
            lineHeight: 1.15, 
            letterSpacing: '-0.03em',
            marginBottom: 16
          }}>
            The Industry is{' '}
            <span style={{ color: '#EF4444', textDecoration: 'line-through', textDecorationColor: '#EF4444', textDecorationThickness: mob ? '3px' : '5px' }}>Broken.</span>
            <br />
            <span style={{ background: 'linear-gradient(135deg, #FF9431 0%, #10B981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              We're Fixing it.
            </span>
          </h2>
          <p style={{ fontSize: mob ? 14 : 16, color: '#64748b', fontWeight: 600, maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
            Explore how CreatorBharat resolves critical creator pain points directly through a secure, commission-free platform.
          </p>
        </motion.div>

        {/* Mobile Tab Swipeable Pills */}
        {mob && (
          <div style={{ 
            display: 'flex', 
            gap: 8, 
            overflowX: 'auto', 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            paddingBottom: 16,
            marginBottom: 20
          }} className="no-scrollbar">
            {DATA.map((d, i) => {
              const Icon = d.icon;
              const isSelected = i === current;
              const label = i === 0 ? 'Problem' : d.tag.split('—')[1]?.trim() || d.tag;
              return (
                <button
                  key={d.id}
                  onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '10px 18px',
                    borderRadius: 100,
                    background: isSelected ? d.tagColor : '#fff',
                    border: `1px solid ${isSelected ? d.tagColor : '#E2E8F0'}`,
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 800,
                    color: isSelected ? '#fff' : '#64748b',
                    whiteSpace: 'nowrap',
                    boxShadow: isSelected ? `0 4px 12px ${d.tagColor}25` : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon size={14} strokeWidth={2.5} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Unified Premium SaaS Dashboard Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 24,
            boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.05)',
            display: 'grid',
            gridTemplateColumns: mob ? '1fr' : '320px 1fr',
            minHeight: 520,
            overflow: 'hidden',
            padding: 12,
            gap: 12
          }}
        >
          {/* Desktop Left Sidebar Tabs */}
          {!mob && (
            <div style={{
              background: '#f8fafc',
              border: '1px solid #f1f5f9',
              borderRadius: 18,
              padding: '16px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8
            }}>
              <div style={{ padding: '0 12px 8px', borderBottom: '1px solid #e2e8f0', marginBottom: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Ecosystem Status</span>
              </div>
              {DATA.map((d, i) => {
                const Icon = d.icon;
                const isSelected = i === current;
                const label = i === 0 ? 'The Problem' : d.tag.split('—')[1]?.trim() || d.tag;
                const accent = d.tagColor;
                return (
                  <button
                    key={d.id}
                    onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '14px 16px',
                      borderRadius: 12,
                      background: isSelected ? '#ffffff' : 'transparent',
                      border: `1.5px solid ${isSelected ? accent : 'transparent'}`,
                      cursor: 'pointer',
                      textAlign: 'left',
                      boxShadow: isSelected ? '0 10px 20px rgba(0,0,0,0.02)' : 'none',
                      transition: 'all 0.2s ease',
                      width: '100%'
                    }}
                    className="saas-tab-btn"
                  >
                    <div style={{ 
                      width: 32, height: 32, borderRadius: 8, 
                      background: isSelected ? `${accent}15` : '#f1f5f9',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={16} color={isSelected ? accent : '#64748b'} strokeWidth={2.5} />
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontSize: 13, fontWeight: 900, color: isSelected ? '#0f172a' : '#475569' }}>{label}</div>
                      <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {d.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Right Panel Canvas: Presentation Split Grid */}
          <div style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            border: '1px solid #f1f5f9',
            borderRadius: 18,
            padding: mob ? '24px 16px' : '40px 48px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div 
              style={{ 
                animation: getAnimation(),
                display: 'grid',
                gridTemplateColumns: mob ? '1fr' : '1.1fr 0.9fr',
                gap: mob ? 28 : 40,
                alignItems: 'center',
                width: '100%'
              }}
            >
              {/* Slide Text Content */}
              <div>
                <div style={{ 
                  display: 'inline-flex', alignItems: 'center', gap: 6, 
                  padding: '4px 12px', borderRadius: 100, marginBottom: 16,
                  background: DATA[current].tagBg,
                  border: `1.5px solid ${DATA[current].tagColor}25`,
                  width: 'fit-content'
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: DATA[current].tagColor }} />
                  <span style={{ fontSize: 10, fontWeight: 900, color: DATA[current].tagColor, textTransform: 'uppercase', letterSpacing: '2px' }}>
                    {DATA[current].tag}
                  </span>
                </div>

                <h3 style={{ 
                  fontFamily: "'Outfit', sans-serif", 
                  fontSize: mob ? 22 : 32, 
                  fontWeight: 950, 
                  color: '#0f172a', 
                  lineHeight: 1.2, 
                  marginBottom: 10 
                }}>
                  {DATA[current].title}
                </h3>
                <p style={{ fontSize: mob ? 13 : 14, color: '#64748b', fontWeight: 600, marginBottom: 24, lineHeight: 1.5 }}>
                  {DATA[current].subtitle}
                </p>

                {/* Checklist points */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {DATA[current].points.map((p, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{ 
                        width: 18, height: 18, borderRadius: '50%', 
                        background: DATA[current].pointIconBg, 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        marginTop: 2, flexShrink: 0 
                      }}>
                        <PointIcon size={10} color={DATA[current].pointIconColor} strokeWidth={3} />
                      </div>
                      <span style={{ 
                        fontSize: mob ? 12 : 13, 
                        fontWeight: p.highlight ? 800 : 600, 
                        color: p.highlight ? '#0F172A' : '#475569',
                        lineHeight: 1.4
                      }}>
                        {p.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slide Graphic Poster Asset */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                {renderActiveGraphic()}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom tagline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ textAlign: 'center', marginTop: mob ? 36 : 48 }}
        >
           <div style={{ display: 'inline-block', padding: '12px 28px', background: '#fff', border: '1px solid rgba(0,0,0,0.05)', borderRadius: 100, boxShadow: '0 8px 24px rgba(0,0,0,0.02)' }}>
             <p style={{ fontSize: mob ? 13 : 16, fontWeight: 800, color: '#334155', fontStyle: 'italic', margin: 0 }}>
               <span style={{ color: '#FF9431', fontSize: 22, lineHeight: 0, verticalAlign: 'middle' }}>&ldquo;</span>
               {' '}Hum middlemen ko nahi,{' '}
               <strong style={{ color: '#0f172a', fontWeight: 900 }}>talent</strong>{' '}
               ko aage badhana chahte hain.{' '}
               <span style={{ color: '#FF9431', fontSize: 22, lineHeight: 0, verticalAlign: 'middle' }}>&rdquo;</span>
             </p>
           </div>
        </motion.div>

      </div>

      <style>{`
        @keyframes flipOutLeft  { from{opacity:1;transform:rotateY(0deg) scale(1)} to{opacity:0;transform:rotateY(-30deg) scale(0.96)} }
        @keyframes flipOutRight { from{opacity:1;transform:rotateY(0deg) scale(1)} to{opacity:0;transform:rotateY(30deg) scale(0.96)} }
        @keyframes flipInRight  { from{opacity:0;transform:rotateY(20deg) scale(0.96)} to{opacity:1;transform:rotateY(0deg) scale(1)} }
        @keyframes flipInLeft   { from{opacity:0;transform:rotateY(-20deg) scale(0.96)} to{opacity:1;transform:rotateY(0deg) scale(1)} }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.25); }
        }
        @keyframes float-sparkle {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          50% { transform: translateY(-4px) rotate(15deg) scale(1.1); }
        }
        .floating-sparkle {
          animation: float-sparkle 3s ease-in-out infinite;
        }
        .saas-tab-btn {
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .saas-tab-btn:hover {
          background: #ffffff !important;
          border-color: #cbd5e1 !important;
          transform: translateX(2px);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

Faq.propTypes = {
  mob: PropTypes.bool
};
