import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Award, TrendingUp, Sparkles } from 'lucide-react';

export default function CampaignPipelineVisualizer() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "1. Verified Pehchan",
      tag: "Verification Layer",
      desc: "Creators link their official analytics. Our algorithm audits their active engagement, niche consistency, and assigns verified trust badges (Verified, Elite, Enterprise).",
      metric: "99.2% Fraud Detection Accuracy",
      icon: Award,
      color: "#FF9431"
    },
    {
      title: "2. Precision Discovery",
      tag: "SaaS Search Engine",
      desc: "Brands utilize advanced filters targeting Tier 2 & 3 districts, specific language demographics, and audience metrics to instantly discover matching local storytellers.",
      metric: "Filter across 150+ Districts",
      icon: Globe,
      color: "#10B981"
    },
    {
      title: "3. Escrow Security",
      tag: "Zero-Brokerage Escrow",
      desc: "Contracts are established immediately on-platform. Brands secure campaign funds inside our automated escrow ledger. Absolutely 0% agency fees are cut.",
      metric: "100% Secure Milestone Release",
      icon: TrendingUp,
      color: "#3B82F6"
    },
    {
      title: "4. Direct Campaign ROI",
      tag: "Real-Time Tracking",
      desc: "Campaign execution goes live. Deliverables and performance analytics are captured by the platform dashboard, and funds are automatically disbursed upon completion.",
      metric: "Real-Time Tracking & Post Audits",
      icon: Sparkles,
      color: "#a855f7"
    }
  ];

  return (
    <div className="pipeline-container" style={{
      background: '#0a0a0a',
      borderRadius: '60px',
      padding: '80px 60px',
      color: '#fff',
      margin: '0 auto 90px',
      maxWidth: '1200px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Glow decorative */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255, 148, 49, 0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div style={{ textAlign: 'center', marginBottom: '60px', position: 'relative', zIndex: 2 }}>
        <span style={{ fontSize: '11px', fontWeight: 900, color: '#FF9431', background: 'rgba(255,148,49,0.1)', padding: '6px 16px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Ecosystem Workflow</span>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 950, letterSpacing: '-0.04em', margin: '16px 0 12px', color: '#fff' }}>The Creator-Brand Pipeline</h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', maxWidth: '600px', margin: '0 auto' }}>How CreatorBharat powers seamless campaigns with absolute transparency. Click any step to inspect the infrastructure.</p>
      </div>

      <div className="pipeline-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '48px', alignItems: 'center', position: 'relative', zIndex: 2 }}>
        {/* Step list selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCurrent = activeStep === idx;
            return (
              <button
                key={step.title}
                onClick={() => setActiveStep(idx)}
                style={{
                  textAlign: 'left',
                  background: isCurrent ? 'rgba(255,255,255,0.03)' : 'transparent',
                  border: isCurrent ? '1.5px solid rgba(255,255,255,0.08)' : '1.5px solid transparent',
                  borderRadius: '24px',
                  padding: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  outline: 'none',
                  width: '100%'
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '16px',
                  background: isCurrent ? step.color : 'rgba(255,255,255,0.02)',
                  color: isCurrent ? '#fff' : 'rgba(255,255,255,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}>
                  <Icon size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 900, color: isCurrent ? step.color : 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px' }}>{step.tag}</div>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: isCurrent ? '#fff' : 'rgba(255,255,255,0.6)', marginTop: '4px' }}>{step.title}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed state view */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="pipeline-detail-card"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '36px',
              padding: '48px',
              minHeight: '340px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <div>
              <span style={{ fontSize: '11px', fontWeight: 900, color: steps[activeStep].color, background: `${steps[activeStep].color}15`, padding: '6px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {steps[activeStep].tag}
              </span>
              <h3 style={{ fontSize: '28px', fontWeight: 950, color: '#fff', marginTop: '24px', marginBottom: '16px', letterSpacing: '-0.02em' }}>{steps[activeStep].title}</h3>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: 0 }}>{steps[activeStep].desc}</p>
            </div>

            <div style={{ marginTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>System Metric:</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: steps[activeStep].color, marginTop: '4px' }}>{steps[activeStep].metric}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: 800 }}>
                <span>Interactive Tooltip</span>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
