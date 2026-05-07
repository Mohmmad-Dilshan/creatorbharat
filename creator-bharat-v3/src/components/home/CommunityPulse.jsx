import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { W, fmt } from '../../utils/helpers';
import { User, Radio, CreditCard, ArrowRight, CheckCircle } from 'lucide-react';
import MiniIndiaMap from '../MiniIndiaMap';
import { usePlatformStats } from '../../hooks/usePlatformStats';

// Step config — static content only, stats injected from real data
const STEP_CONFIG = [
  {
    id: 'step-01',
    n: '01',
    tag: 'Identity',
    h: 'Build Your Verified Identity',
    d: 'Get a premium, verified portfolio page that brands instantly trust. Your digital identity, your story — on a platform built for Bharat.',
    icon: User,
    color: '#FF9431',
    bg: 'rgba(255,148,49,0.08)',
  },
  {
    id: 'step-02',
    n: '02',
    tag: 'Spotlight',
    h: 'Get National Spotlight',
    d: 'Podcasts, articles, and featured placements — we amplify Tier 2 & 3 creator stories to a national audience. Local voice, national reach.',
    icon: Radio,
    color: '#10B981',
    bg: 'rgba(16,185,129,0.08)',
  },
  {
    id: 'step-03',
    n: '03',
    tag: 'Monetize',
    h: 'Direct Deals, 0% Commission',
    d: 'No middlemen. Connect with brands directly and keep 100% of what you earn. We are not an agency — we are your growth partner.',
    icon: CreditCard,
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.08)',
  },
];

// Merge static config with real analytics
function buildSteps(analytics) {
  if (!analytics) {
    return STEP_CONFIG.map(s => ({ ...s, stat: '...', statLoading: true }));
  }
  return [
    {
      ...STEP_CONFIG[0],
      stat: analytics.totalCreators > 0
        ? `${analytics.totalCreators.toLocaleString('en-IN')} profiles live`
        : 'Be the first to join',
    },
    {
      ...STEP_CONFIG[1],
      stat: analytics.totalReach > 0
        ? `${fmt.num(analytics.totalReach)} combined audience reach`
        : 'Growing network',
    },
    {
      ...STEP_CONFIG[2],
      stat: analytics.dealValue > 0
        ? `${fmt.inr(analytics.dealValue)} deals facilitated`
        : '0% commission always',
    },
  ];
}

export default function CommunityPulse({ mob, go }) {
  const [activeStep, setActiveStep] = useState(null);
  const { analytics } = usePlatformStats();
  const steps = buildSteps(analytics);

  const handleCtaHoverStart = (e) => {
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = '0 16px 40px rgba(255,148,49,0.4)';
  };
  const handleCtaHoverEnd = (e) => {
    e.currentTarget.style.transform = 'none';
    e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,148,49,0.3)';
  };

  return (
    <section style={{ padding: mob ? '48px 16px' : '96px 24px', background: '#fff', position: 'relative', overflow: 'hidden' }}>

      {/* Subtle dot-grid background */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px', zIndex: 0 }} />

      <div style={{ ...W(), maxWidth: 1200, position: 'relative', zIndex: 1, boxSizing: 'border-box' }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: mob ? 48 : 80, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 32, flexWrap: mob ? 'wrap' : 'nowrap' }}>

          {/* Left: orange border line + text */}
          <div style={{ borderLeft: '4px solid #FF9431', paddingLeft: mob ? 20 : 32, flex: 1, minWidth: 0 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: '#FFF7ED', border: '1px solid #FFEDD5', borderRadius: 100, marginBottom: 20 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#C2410C', textTransform: 'uppercase', letterSpacing: '1.5px' }}>How it Works</span>
            </div>

            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mob ? 30 : 56, fontWeight: 900, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20 }}>
              The Creator Success{' '}
              <span style={{ background: 'linear-gradient(135deg, #FF9431 0%, #10B981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Roadmap.
              </span>
            </h2>
            <p style={{ fontSize: mob ? 15 : 18, color: '#64748b', lineHeight: 1.7, maxWidth: 540, fontWeight: 400, margin: 0 }}>
              India's first step-by-step growth path built exclusively for local creators. From zero to verified — we are with you at every step.
            </p>
          </div>

          {/* Right: Mini India 3D Map */}
          {!mob && (
            <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, paddingTop: 8 }}>
              <MiniIndiaMap width={160} height={195} />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Bharat</span>
            </div>
          )}
        </div>


        {/* ── Steps ── */}
        {mob ? (
          /* MOBILE: Stacked cards */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  aria-expanded={activeStep === i}
                  aria-label={`Step ${s.n}: ${s.h}`}
                  style={{
                    background: '#fff',
                    border: `1.5px solid ${activeStep === i ? s.color : '#E2E8F0'}`,
                    borderRadius: 20,
                    padding: '24px 20px',
                    display: 'flex',
                    gap: 16,
                    alignItems: 'flex-start',
                    transition: 'all 0.25s',
                    boxShadow: activeStep === i ? `0 8px 32px ${s.color}20` : '0 2px 8px rgba(0,0,0,0.03)',
                    textAlign: 'left',
                    width: '100%',
                    cursor: 'pointer'
                  }}
                  onClick={() => setActiveStep(activeStep === i ? null : i)}
                >
                  {/* Icon block */}
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0 }}>
                    <Icon size={22} strokeWidth={2.5} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: s.color, textTransform: 'uppercase', letterSpacing: '1px' }}>Step {s.n}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, background: s.bg, color: s.color, padding: '2px 8px', borderRadius: 100 }}>{s.tag}</span>
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 6, fontFamily: "'Outfit', sans-serif" }}>{s.h}</h3>
                    {activeStep === i && (
                      <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{s.d}</p>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: activeStep === i ? 12 : 0 }}>
                      <CheckCircle size={12} color={s.color} />
                      <span style={{ fontSize: 11, fontWeight: 700, color: s.color }}>{s.stat}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* DESKTOP: Alternating timeline */
          <div style={{ position: 'relative' }}>
            {/* Center spine */}
            <div style={{
              position: 'absolute', left: '50%', top: 40, bottom: 40,
              width: 2,
              background: 'linear-gradient(to bottom, #FF9431 0%, #10B981 50%, #3B82F6 100%)',
              transform: 'translateX(-50%)',
              opacity: 0.15,
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
              {steps.map((s, i) => {
                const Icon = s.icon;
                const isLeft = i % 2 === 0;

                return (
                  <div
                    key={s.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 80px 1fr',
                      alignItems: 'center',
                      gap: 0,
                    }}
                  >
                    {/* Left content */}
                    <div style={{ textAlign: isLeft ? 'right' : 'left', padding: isLeft ? '0 48px 0 0' : 0, opacity: isLeft ? 1 : 0.15, transition: 'opacity 0.3s' }}>
                      {isLeft && <StepContent s={s} isLeft />}
                    </div>

                    {/* Center node */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 2 }}>
                      <div style={{
                        width: 64, height: 64,
                        borderRadius: '50%',
                        background: '#fff',
                        border: `3px solid ${s.color}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: s.color,
                        boxShadow: `0 0 0 6px ${s.color}15, 0 8px 24px ${s.color}20`,
                        transition: 'all 0.3s',
                      }}>
                        <Icon size={26} strokeWidth={2.5} />
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 900, color: '#94a3b8', letterSpacing: '1px' }}>STEP {s.n}</div>
                    </div>

                    {/* Right content */}
                    <div style={{ textAlign: isLeft ? 'left' : 'right', padding: isLeft ? '0 0 0 48px' : '0 48px 0 0', opacity: isLeft ? 0.15 : 1, transition: 'opacity 0.3s' }}>
                      {!isLeft && <StepContent s={s} isLeft={false} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <div style={{ textAlign: 'center', marginTop: mob ? 48 : 80 }}>
          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <p style={{ fontSize: mob ? 14 : 16, color: '#94a3b8', fontWeight: 400 }}>
              Ready to start your journey?
            </p>
            <button
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: mob ? '14px 28px' : '16px 36px',
                background: 'linear-gradient(135deg, #FF9431, #FF6B00)',
                color: '#fff',
                fontWeight: 800, fontSize: mob ? 14 : 16,
                border: 'none', borderRadius: 100,
                cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(255,148,49,0.3)',
                transition: 'all 0.3s',
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseOver={handleCtaHoverStart}
              onMouseOut={handleCtaHoverEnd}
              onFocus={handleCtaHoverStart}
              onBlur={handleCtaHoverEnd}
              onClick={() => go ? go('apply') : null}
            >
              Start Your Creator Journey <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes flagShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </section>
  );
}

CommunityPulse.propTypes = {
  mob: PropTypes.bool,
  go: PropTypes.func
};

// ── Reusable step card content ──────────────────────────────
function StepContent({ s, isLeft }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: isLeft ? 'flex-end' : 'flex-start' }}>
      {/* Tag pill */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', background: s.bg, borderRadius: 100 }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: s.color, textTransform: 'uppercase', letterSpacing: '1px' }}>{s.tag}</span>
      </div>

      {/* Title */}
      <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 30, fontWeight: 900, color: '#0f172a', lineHeight: 1.2, margin: 0, textAlign: isLeft ? 'right' : 'left' }}>
        {s.h}
      </h3>

      {/* Description */}
      <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7, maxWidth: 400, margin: 0, textAlign: isLeft ? 'right' : 'left' }}>
        {s.d}
      </p>

      {/* Stat pill */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <CheckCircle size={14} color={s.color} />
        <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.stat}</span>
      </div>
    </div>
  );
}

StepContent.propTypes = {
  s: PropTypes.shape({
    tag: PropTypes.string,
    h: PropTypes.string,
    d: PropTypes.string,
    stat: PropTypes.string,
    color: PropTypes.string,
    bg: PropTypes.string
  }).isRequired,
  isLeft: PropTypes.bool.isRequired
};
