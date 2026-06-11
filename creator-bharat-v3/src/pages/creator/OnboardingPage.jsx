import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, Globe, Image, BriefcaseBusiness, MapPin, ShieldCheck,
  CheckCircle2, ArrowRight, Circle
} from 'lucide-react';
import { Btn, Card, Bdg } from '@/components/common/Primitives';
import { useApp } from '@/core/context';
import { LS, fmt } from '@/utils/helpers';

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
    check: (c) => !!(c?.full_story?.p1 && c?.milestones?.length > 0),
  },
  {
    id: 'packages',
    tab: 'packages',
    title: 'Services & Rates',
    description: 'Set your brand collaboration packages, rates, and deliverables. Brands see this to pitch you.',
    icon: BriefcaseBusiness,
    color: '#10B981',
    required: true,
    check: (c) => !!(c?.rateMin && c?.services?.length > 0),
  },
  {
    id: 'local',
    tab: 'local',
    title: 'Local Hub',
    description: 'Define your regional dialects, active cities, and local market reach.',
    icon: MapPin,
    color: '#F59E0B',
    required: false,
    check: (c) => !!(c?.local_voice || c?.local_impact_hubs?.length > 0),
  },
  {
    id: 'verification',
    tab: null,
    title: 'Submit for Verification',
    description: 'Once all required tabs are filled, submit your profile for admin review and get your Elite Badge.',
    icon: ShieldCheck,
    color: '#0f172a',
    required: false,
    check: () => localStorage.getItem('cb_verification_status') !== 'DRAFT',
  },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { st } = useApp();
  const [expanded, setExpanded] = useState(null);

  const allC = LS.get('cb_creators', []);
  const c = st.user?.creatorProfile || allC.find(cr => cr.email === st.user?.email) || {};
  const comp = fmt.completeness(c);

  const completedCount = STEPS.filter(s => s.check(c)).length;
  const requiredDone = STEPS.filter(s => s.required).every(s => s.check(c));

  const handleStepClick = (step) => {
    if (step.tab) {
      navigate(`/creator/profile?tab=${step.tab}`);
    } else {
      navigate('/creator/dashboard');
    }
  };

  return (
    <div className="dashboard-page-container">
      {/* Header */}
      <div className="db-page-header">
        <div className="badge-saffron">
          <ShieldCheck size={14} fill="#FF9431" /> CREATOR SETUP
        </div>
        <h1 className="page-title">Complete Your Workspace</h1>
        <p className="db-sub-text">Fill all required sections to unlock verification and brand deals.</p>
      </div>

      {/* Progress Summary */}
      <Card style={{ padding: 28, marginBottom: 28, background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>
              Overall Completion
            </div>
            <div style={{ fontSize: 32, fontWeight: 950, color: '#FF9431' }}>
              {comp.pct}% <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>complete</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>{completedCount}/{STEPS.length} steps done</div>
            {requiredDone ? (
              <Bdg color="green" sm>✓ Ready to Submit</Bdg>
            ) : (
              <Bdg color="saffron" sm>Required steps pending</Bdg>
            )}
          </div>
        </div>
        <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 100, overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${comp.pct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ height: '100%', background: 'linear-gradient(90deg, #FF9431, #10B981)', borderRadius: 100 }}
          />
        </div>
      </Card>

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {STEPS.map((step, i) => {
          const done = step.check(c);
          const isExpanded = expanded === step.id;
          const Icon = step.icon;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card style={{
                padding: 24,
                border: done ? '1.5px solid #10B98130' : step.required ? '1.5px solid #FF943120' : '1px solid #f1f5f9',
                background: done ? '#f0fdf4' : '#fff',
                cursor: 'pointer'
              }}
                onClick={() => setExpanded(isExpanded ? null : step.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  {/* Status icon */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                    background: done ? '#10B98112' : step.color + '12',
                    color: done ? '#10B981' : step.color,
                    display: 'grid', placeItems: 'center'
                  }}>
                    {done ? <CheckCircle2 size={22} /> : <Icon size={22} />}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 16, fontWeight: 900, color: '#0f172a' }}>{step.title}</span>
                      {step.required && !done && (
                        <span style={{ fontSize: 10, fontWeight: 900, color: '#FF9431', background: '#FF943112', padding: '2px 8px', borderRadius: 100 }}>REQUIRED</span>
                      )}
                      {done && <Bdg sm color="green">Done ✓</Bdg>}
                    </div>
                    <p style={{ fontSize: 13, color: '#64748b', fontWeight: 500, margin: 0, lineHeight: 1.5 }}>
                      {step.description}
                    </p>
                  </div>

                  <div style={{ color: '#94a3b8', fontSize: 20, transform: isExpanded ? 'rotate(90deg)' : 'none', transition: '0.2s' }}>›</div>
                </div>

                {/* Expanded CTA */}
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #f1f5f9' }}
                    onClick={e => e.stopPropagation()}
                  >
                    <Btn
                      lg
                      onClick={() => handleStepClick(step)}
                      style={{
                        background: done ? '#f8fafc' : step.color,
                        color: done ? '#64748b' : '#fff',
                        borderRadius: 14,
                        border: done ? '1px solid #f1f5f9' : 'none'
                      }}
                    >
                      {done ? `Edit ${step.title}` : `Complete ${step.title}`} <ArrowRight size={16} />
                    </Btn>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Final CTA */}
      <div style={{ marginTop: 32, padding: 32, background: '#f8fafc', borderRadius: 28, border: '1px solid #f1f5f9', textAlign: 'center' }}>
        {requiredDone ? (
          <>
            <div style={{ fontSize: 20, fontWeight: 950, color: '#0f172a', marginBottom: 10 }}>
              🎉 All required steps complete!
            </div>
            <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24, fontWeight: 500 }}>
              Your profile is ready for admin review. Head to your dashboard to submit for verification.
            </p>
            <Btn lg onClick={() => navigate('/creator/dashboard')} style={{ background: '#10B981', color: '#fff', borderRadius: 100 }}>
              Go to Dashboard <ArrowRight size={18} />
            </Btn>
          </>
        ) : (
          <>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>
              Complete {STEPS.filter(s => s.required && !s.check(c)).length} more required step{STEPS.filter(s => s.required && !s.check(c)).length > 1 ? 's' : ''} to unlock verification
            </div>
            <p style={{ fontSize: 13, color: '#64748b', fontWeight: 500, marginBottom: 20 }}>
              Verified creators get 3x more brand deals and access to all campaigns.
            </p>
            <Btn lg onClick={() => navigate('/creator/profile')} style={{ background: '#0f172a', color: '#fff', borderRadius: 100 }}>
              Open Profile Builder <ArrowRight size={18} />
            </Btn>
          </>
        )}
      </div>
    </div>
  );
}
