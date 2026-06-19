import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, FileCheck2, CreditCard, BadgeCheck, CheckCircle2, Clock, AlertCircle, ArrowRight, Zap } from 'lucide-react';
import { useApp } from '@/core/context';
import { LS, fmt } from '@/utils/helpers';
import { Card, Btn, Bdg, Bar } from '@/components/common/Primitives';
import { CreatorPageHeader } from './CreatorShellPage';

const STEPS = [
  { id: 'profile', label: 'Profile Complete', desc: 'All 5 tabs filled: Identity, Social, Story, Packages, Local Hub', icon: FileCheck2 },
  { id: 'submit', label: 'Submitted for Review', desc: 'Profile sent to admin verification queue', icon: CreditCard },
  { id: 'review', label: 'Under Review', desc: 'Admin team auditing your content and metrics', icon: Clock },
  { id: 'approved', label: 'Verified & Live', desc: 'Elite badge active, profile public, campaigns unlocked', icon: BadgeCheck },
];

function getStepIndex(status) {
  if (status === 'APPROVED') return 4;
  if (status === 'PENDING_APPROVAL') return 2;
  return 0; // DRAFT
}

export default function VerificationPage() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const [status, setStatus] = useState(() => localStorage.getItem('cb_verification_status') || 'DRAFT');
  const profileCompleted = localStorage.getItem('cb_profile_completed') === 'true';
  const currentStep = getStepIndex(status);

  // Check profile completeness
  const allC = LS.get('cb_creators', []);
  const c = st.user?.creatorProfile || allC.find(cr => cr.email === st.user?.email) || {};
  const comp = fmt.completeness(c);

  const handleSubmitReview = () => {
    localStorage.setItem('cb_verification_status', 'PENDING_APPROVAL');
    setStatus('PENDING_APPROVAL');
    if (dsp) {
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Profile submitted for review! Admin team will verify soon.' } });
    }
  };

  return (
    <div className="dashboard-page-container">
      <CreatorPageHeader 
        badge="VERIFICATION" 
        title="Profile Verification Status" 
        subtitle="Track your verification journey from profile completion to elite badge activation." 
        icon={ShieldCheck} 
      />

      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.5fr 1fr', gap: 32 }}>
        
        {/* Left: Status Timeline */}
        <Card style={{ padding: mob ? 28 : 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: status === 'APPROVED' ? '#10B98112' : '#FF943112', color: status === 'APPROVED' ? '#10B981' : '#FF9431', display: 'grid', placeItems: 'center' }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 900, color: '#0f172a', margin: 0 }}>Verification Pipeline</h3>
              <p style={{ fontSize: 13, color: '#64748b', fontWeight: 600, margin: 0 }}>
                {status === 'APPROVED' ? 'Your profile is verified and live!' : 
                 status === 'PENDING_APPROVAL' ? 'Under admin review...' : 
                 'Complete your profile to begin'}
              </p>
            </div>
          </div>

          {/* Timeline Steps */}
          <div style={{ position: 'relative', paddingLeft: 24 }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: 11, top: 0, bottom: 0, width: 2, background: '#f1f5f9' }} />
            
            {STEPS.map((step, i) => {
              const isComplete = i < currentStep;
              const isCurrent = i === currentStep || (i === 1 && currentStep === 2);
              const Icon = step.icon;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{ display: 'flex', gap: 20, marginBottom: 36, position: 'relative', zIndex: 1 }}
                >
                  {/* Dot */}
                  <div style={{ 
                    width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                    background: isComplete ? '#10B981' : isCurrent ? '#3B82F6' : '#e2e8f0',
                    display: 'grid', placeItems: 'center', color: '#fff',
                    boxShadow: isCurrent ? '0 0 0 6px rgba(59,130,246,0.15)' : 'none',
                    border: isComplete || isCurrent ? 'none' : '2px solid #cbd5e1'
                  }}>
                    {isComplete && <CheckCircle2 size={14} />}
                    {isCurrent && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />}
                  </div>

                  {/* Content */}
                  <div style={{ opacity: (!isComplete && !isCurrent) ? 0.5 : 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <h4 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', margin: 0 }}>{step.label}</h4>
                      {isComplete && <Bdg sm color="green">Done</Bdg>}
                      {isCurrent && <Bdg sm color="blue">Current</Bdg>}
                    </div>
                    <p style={{ fontSize: 13, color: '#64748b', fontWeight: 500, margin: 0, lineHeight: 1.5 }}>{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Action Button */}
          {status === 'DRAFT' && !profileCompleted && (
            <Btn full lg onClick={() => navigate('/creator/profile')} style={{ background: 'linear-gradient(90deg, #FF9431, #EA580C)', color: '#fff', border: 'none', borderRadius: 16, marginTop: 16 }}>
              Complete Profile Builder <ArrowRight size={18} />
            </Btn>
          )}
          {status === 'DRAFT' && profileCompleted && (
            <Btn full lg onClick={handleSubmitReview} style={{ background: 'linear-gradient(90deg, #FF9431, #EA580C)', color: '#fff', border: 'none', borderRadius: 16, marginTop: 16 }}>
              Submit for Verification <ArrowRight size={18} />
            </Btn>
          )}
          {status === 'APPROVED' && (
            <Btn full lg onClick={() => navigate(`/creator/${c.handle || c.id || 'elite'}`)} style={{ background: 'linear-gradient(90deg, #10B981, #059669)', color: '#fff', border: 'none', borderRadius: 16, marginTop: 16 }}>
              View Live Public Profile <ArrowRight size={18} />
            </Btn>
          )}
        </Card>

        {/* Right: Profile Strength + Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Profile Strength */}
          <Card style={{ padding: 28 }}>
            <h4 style={{ fontSize: 16, fontWeight: 900, color: '#0f172a', marginBottom: 20 }}>Profile Strength</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, fontWeight: 700 }}>
              <span style={{ color: '#64748b' }}>Completion</span>
              <span style={{ color: '#FF9431', fontWeight: 900 }}>{comp.pct}%</span>
            </div>
            <Bar value={comp.pct} color={comp.pct >= 80 ? '#10B981' : '#FF9431'} height={8} />
            
            {comp.missing.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <p style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 10 }}>Missing Items:</p>
                {comp.missing.map(m => (
                  <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <AlertCircle size={12} color="#FF9431" />
                    <span style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>{m}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Benefits Card */}
          <Card className="card-3d-effect" style={{ padding: 28, background: 'linear-gradient(135deg, rgba(255, 148, 49, 0.06), rgba(16, 185, 129, 0.03))', border: '1px solid rgba(255,148,49,0.15)', borderRadius: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <Zap size={18} color="#FF9431" fill="#FF9431" />
              <span style={{ fontSize: 14, fontWeight: 900, color: 'var(--db-text-primary, #0f172a)' }}>Verified Badge Benefits</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Public profile on /creators marketplace',
                'Apply to unlimited brand campaigns',
                'Direct brand messaging unlocked',
                'Elite blue badge on all pages',
                'Priority in search results',
                'Wallet & payout system enabled'
              ].map(b => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CheckCircle2 size={14} color="#10B981" />
                  <span style={{ fontSize: 13, color: 'var(--db-text-secondary, #475569)', fontWeight: 600 }}>{b}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
