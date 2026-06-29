import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Globe, Image, BriefcaseBusiness, MapPin, ShieldCheck,
  CheckCircle2, ArrowRight, Circle, Lock, Sparkles, Check, ChevronDown
} from 'lucide-react';
import { useApp } from '@/core/context';
import { LS, fmt } from '@/utils/helpers';
import { updateCreatorProfile } from '@/utils/platformService';

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
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }
});

const STEPS = [
  {
    id: 'identity',
    tab: 'identity',
    title: 'Identity & Bio',
    description: 'Add your full name, handle, profile photo, city, state, and a compelling bio.',
    icon: User,
    color: '#FF9431',
    required: true,
    check: (c) => !!(c?.name && c?.bio),
  },
  {
    id: 'social',
    tab: 'social',
    title: 'Social Handles',
    description: 'Link your Instagram and/or YouTube channel. This is how brands verify your reach.',
    icon: Globe,
    color: '#3B82F6',
    required: true,
    check: (c) => !!(c?.instagram || c?.youtube),
  },
  {
    id: 'story',
    tab: 'story',
    title: 'Story & Milestones',
    description: 'Write your creator journey — biography paragraphs, career milestones, and achievements.',
    icon: Image,
    color: '#7C3AED',
    required: true,
    check: (c) => !!((c?.full_story?.p1 || c?.fullStory?.p1) && (c?.milestones?.length > 0 || c?.awards?.length > 0)),
  },
  {
    id: 'packages',
    tab: 'packages',
    title: 'Services & Rates',
    description: 'Set your brand collaboration packages, rates, and deliverables. Brands see this to pitch you.',
    icon: BriefcaseBusiness,
    color: '#10B981',
    required: true,
    check: (c) => !!((c?.rateMin || c?.rate_min) && (c?.services?.length > 0 || c?.packages?.length > 0)),
  },
  {
    id: 'local',
    tab: 'local',
    title: 'Local Hub',
    description: 'Define your regional dialects, active cities, and local market reach.',
    icon: MapPin,
    color: '#F59E0B',
    required: false,
    check: (c) => !!(c?.local_voice || c?.localVoice || c?.local_impact_hubs?.some(h => h.l) || c?.localHubs?.some(h => h.l) || c?.local_hubs?.some(h => h.l) || c?.regionalDialects?.length || c?.regional_dialects?.length),
  },
  {
    id: 'verification',
    tab: null,
    title: 'Submit for Verification',
    description: 'Once all required tabs are filled, submit your profile for admin review and get your Elite Badge.',
    icon: ShieldCheck,
    color: '#0f172a',
    required: false,
    check: (c) => !!((c?.status && c?.status !== 'DRAFT') || (localStorage.getItem('cb_verification_status') && localStorage.getItem('cb_verification_status') !== 'DRAFT')),
  },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { st, dsp } = useApp();
  const [expanded, setExpanded] = useState(null);
  const [mob, setMob] = useState(() => globalThis.innerWidth < 768);

  const allC = LS.get('cb_creators', []);
  const c = st.user?.creatorProfile || allC.find(cr => cr.email === st.user?.email) || {
    name: st.user?.name || '',
    handle: st.user?.handle || '',
    email: st.user?.email || '',
    city: st.user?.city || '',
    state: st.user?.state || '',
    phone: st.user?.phone || ''
  };
  const comp = fmt.completeness(c);
  const stepsToCount = STEPS.filter(s => s.id !== 'verification');
  const completedCount = STEPS.filter(s => s.check(c)).length;
  const completedStepsCount = stepsToCount.filter(s => s.check(c)).length;
  const pct = Math.round((completedStepsCount / stepsToCount.length) * 100);
  const requiredDone = STEPS.filter(s => s.required).every(s => s.check(c));

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const handleStepClick = (step) => {
    if (step.tab) {
      navigate(`/creator/profile?tab=${step.tab}`);
    } else {
      navigate('/creator/dashboard');
    }
  };

  // Radial progress calculations
  const radius = 54;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div style={{ background: 'var(--db-bg, #F0F2F7)', minHeight: '100%', padding: mob ? '16px' : '32px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        
        {/* Header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 32 }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '3px 10px',
            borderRadius: 100,
            fontSize: 10,
            fontWeight: 900,
            letterSpacing: '0.05em',
            color: T.saffron,
            background: 'rgba(255,148,49,0.08)',
            border: `1px solid rgba(255,148,49,0.2)`
          }}>
            <ShieldCheck size={10} fill={T.saffron} color="#F0F2F7" /> CREATOR SETUP
          </span>
          <h1 style={{ fontSize: mob ? '26px' : '32px', fontWeight: 950, color: T.navy, margin: '8px 0 2px', letterSpacing: '-0.03em', fontFamily: 'Outfit, sans-serif' }}>
            Complete Your Workspace
          </h1>
          <p style={{ fontSize: 13, color: T.slate, fontWeight: 600, margin: 0 }}>
            Fill all required sections to unlock verified credentials, search marketplace listings, and earn brand deals.
          </p>
        </motion.div>

        {/* 2-Column Responsive Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1.6fr', gap: 28, alignItems: 'start' }}>
          
          {/* COLUMN 1: Progress Summary Widget */}
          <motion.div {...fadeUp(0.05)}>
            <div style={{
              background: 'linear-gradient(135deg, #FFF8F0 0%, #FFF1E5 100%)',
              borderRadius: 24,
              padding: '28px 24px',
              border: '1.5px solid rgba(255,148,49,0.2)',
              boxShadow: '0 20px 40px rgba(255,148,49,0.05)',
              color: '#0F172A',
              position: 'sticky',
              top: 24,
              textAlign: 'center'
            }}>
              {/* Glow effects */}
              <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255, 148, 49, 0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
              
              <p style={{ fontSize: 11, fontWeight: 900, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 20px' }}>
                Overall Completion
              </p>

              {/* Radial Progress Ring */}
              <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width={140} height={140} style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx={70} cy={70} r={radius} fill="none" stroke="rgba(15,23,42,0.05)" strokeWidth={strokeWidth} />
                  <motion.circle
                    cx={70}
                    cy={70}
                    r={radius}
                    fill="none"
                    stroke={pct === 100 ? T.emerald : T.saffron}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </svg>
                <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 28, fontWeight: 950, color: '#0F172A', letterSpacing: '-0.02em', fontFamily: 'Outfit, sans-serif' }}>
                    {pct}%
                  </span>
                  <span style={{ fontSize: 9, color: '#475569', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em', marginTop: -2 }}>
                    Finished
                  </span>
                </div>
              </div>

              {/* Status Details */}
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: '#0F172A', margin: '0 0 6px', fontFamily: 'Outfit, sans-serif' }}>
                  {completedCount} of {STEPS.length} Completed
                </h3>
                <p style={{ fontSize: 12, color: '#475569', fontWeight: 600, margin: '0 0 16px', lineHeight: 1.5 }}>
                  {requiredDone ? 'Excellent work! All required sections are complete.' : 'Complete all mandatory sections to submit for admin review.'}
                </p>
                
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  {requiredDone ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 12px', borderRadius: 100, fontSize: 11, fontWeight: 900, background: 'rgba(16,185,129,0.15)', color: T.emerald, border: `1px solid rgba(16,185,129,0.3)` }}>
                      ✓ READY TO SUBMIT
                    </span>
                  ) : (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 12px', borderRadius: 100, fontSize: 11, fontWeight: 900, background: 'rgba(255,148,49,0.15)', color: T.saffron, border: `1px solid rgba(255,148,49,0.3)` }}>
                      ⏳ REQUIRED PENDING
                    </span>
                  )}
                </div>
              </div>

              {/* Button */}
              {requiredDone ? (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={async () => {
                    try {
                      localStorage.setItem('cb_verification_status', 'PENDING_APPROVAL');
                      localStorage.setItem('cb_profile_completed', 'true');
                      await updateCreatorProfile({
                        ...c,
                        status: 'PENDING_APPROVAL'
                      });
                      if (dsp) {
                        dsp({ t: 'TOAST', d: { type: 'success', msg: 'Profile submitted for approval! 🎉' } });
                      }
                      navigate('/creator/verification');
                    } catch (err) {
                      console.error('Failed to submit onboarding status:', err);
                      if (dsp) {
                        dsp({ t: 'TOAST', d: { type: 'error', msg: 'Error submitting profile. Please try again.' } });
                      }
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: 14,
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    border: 'none',
                    color: '#fff',
                    fontSize: 13,
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    boxShadow: '0 8px 20px rgba(16,185,129,0.25)'
                  }}
                >
                  Submit for Approval <ArrowRight size={14} />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const firstPending = STEPS.find(s => !s.check(c) && s.required);
                    if (firstPending) {
                      setExpanded(firstPending.id);
                      if (firstPending.tab) {
                        navigate(`/creator/profile?tab=${firstPending.tab}`);
                      }
                    } else {
                      navigate('/creator/profile');
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: 14,
                    background: 'linear-gradient(135deg, #FF9431, #EA580C)',
                    border: 'none',
                    color: '#fff',
                    fontSize: 13,
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    boxShadow: '0 8px 20px rgba(255,148,49,0.25)'
                  }}
                >
                  Complete Next Step <ArrowRight size={14} />
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* COLUMN 2: Timeline Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
            
            {/* Connecting line */}
            {!mob && (
              <div style={{
                position: 'absolute',
                left: 32,
                top: 24,
                bottom: 24,
                width: 2,
                background: 'linear-gradient(180deg, #10B981 0%, #10B981 60%, #E2E8F0 100%)',
                zIndex: 1,
                opacity: 0.6
              }} />
            )}

            {STEPS.map((step, i) => {
              const done = step.check(c);
              const isExpanded = expanded === step.id;
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.id}
                  {...fadeUp(0.08 + i * 0.05)}
                  style={{
                    display: 'flex',
                    gap: mob ? 12 : 24,
                    paddingBottom: i < STEPS.length - 1 ? 24 : 0,
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  {/* Timeline Circle */}
                  {!mob && (
                    <div style={{
                      width: 66,
                      display: 'flex',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: done ? T.emerald : step.required ? T.saffron : T.slateLight,
                        border: '4px solid #F0F2F7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        boxShadow: done ? '0 0 10px rgba(16,185,129,0.3)' : step.required ? '0 0 10px rgba(255,148,49,0.3)' : 'none'
                      }}>
                        {done ? <Check size={14} strokeWidth={3} /> : <span style={{ fontSize: 11, fontWeight: 900 }}>{i + 1}</span>}
                      </div>
                    </div>
                  )}

                  {/* Step Glass Card */}
                  <div style={{ flex: 1 }}>
                    <div
                      onClick={() => setExpanded(isExpanded ? null : step.id)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.82)',
                        backdropFilter: 'blur(24px) saturate(120%)',
                        borderRadius: 20,
                        border: done ? `1px solid rgba(16, 185, 129, 0.25)` : isExpanded ? `1px solid ${step.color}45` : '1px solid rgba(255, 255, 255, 0.45)',
                        boxShadow: done 
                          ? '0 6px 20px -8px rgba(16,185,129,0.1), inset 0 1px 1px rgba(255,255,255,0.8)'
                          : '0 8px 24px -10px rgba(15,23,42,0.05), inset 0 1px 1.5px rgba(255,255,255,0.85)',
                        padding: '20px 22px',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{
                          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                          background: done ? 'rgba(16,185,129,0.08)' : step.color + '12',
                          color: done ? T.emerald : step.color,
                          display: 'grid', placeItems: 'center',
                          border: done ? `1px solid rgba(16,185,129,0.15)` : `1px solid ${step.color}15`
                        }}>
                          <Icon size={20} />
                        </div>

                        <div style={{ flex: 1, overflow: 'hidden' }}>
                          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 2 }}>
                            <span style={{ fontSize: 15, fontWeight: 900, color: T.navy, fontFamily: 'Outfit, sans-serif' }}>{step.title}</span>
                            {step.required && !done && (
                              <span style={{ fontSize: 9, fontWeight: 900, color: T.saffron, background: 'rgba(255,148,49,0.08)', padding: '2px 8px', borderRadius: 100, border: `1px solid rgba(255,148,49,0.15)` }}>REQUIRED</span>
                            )}
                            {done && (
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '2px 8px', borderRadius: 100, fontSize: 9, fontWeight: 900, background: 'rgba(16,185,129,0.08)', color: T.emerald, border: `1px solid rgba(16,185,129,0.15)` }}>
                                DONE ✓
                              </span>
                            )}
                          </div>
                          <p style={{ fontSize: 12.5, color: T.slate, fontWeight: 500, margin: 0, lineHeight: 1.5 }}>
                            {step.description}
                          </p>
                        </div>

                        <div style={{ color: T.slateLight, display: 'flex', alignItems: 'center', transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}>
                          <ChevronDown size={18} />
                        </div>
                      </div>

                      {/* Expandable Inner Action */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            style={{ overflow: 'hidden' }}
                            onClick={e => e.stopPropagation()}
                          >
                            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(15,23,42,0.04)', display: 'flex', justifyContent: 'flex-end' }}>
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleStepClick(step)}
                                style={{
                                  padding: '10px 18px',
                                  borderRadius: 10,
                                  background: done ? 'rgba(15,23,42,0.03)' : step.color,
                                  border: done ? '1px solid rgba(15,23,42,0.08)' : 'none',
                                  color: done ? T.slate : '#fff',
                                  fontSize: 12.5,
                                  fontWeight: 800,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 6,
                                  boxShadow: done ? 'none' : `0 6px 15px ${step.color}25`
                                }}
                              >
                                {done ? `Edit Details` : `Complete Section`} <ArrowRight size={14} />
                              </motion.button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                </motion.div>
              );
            })}

          </div>

        </div>

      </div>
    </div>
  );
}
