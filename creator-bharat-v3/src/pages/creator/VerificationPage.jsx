import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, FileCheck2, CreditCard, BadgeCheck, CheckCircle2, Clock, AlertCircle, ArrowRight, Zap } from 'lucide-react';
import { useApp } from '@/core/context';
import { LS, fmt } from '@/utils/helpers';
import { Card, Btn, Bdg, Bar } from '@/components/common/Primitives';
import { CreatorPageHeader } from './CreatorShellPage';
import { uploadFile } from '@/utils/uploadService';
import { updateCreatorProfile } from '@/utils/platformService';

const STEPS = [
  { id: 'profile', label: 'Profile Complete', desc: 'All 5 tabs filled: Identity, Social, Story, Packages, Local Hub', icon: FileCheck2 },
  { id: 'submit', label: 'Submitted for Review', desc: 'Profile sent to admin verification queue', icon: CreditCard },
  { id: 'review', label: 'Under Review', desc: 'Admin team auditing your content and metrics', icon: Clock },
  { id: 'approved', label: 'Verified & Live', desc: 'Elite badge active, profile public, campaigns unlocked', icon: BadgeCheck },
];

function getStepIndex(status) {
  if (status === 'APPROVED' || status === 'VERIFIED') return 4;
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

  // Fetch creator profile from App Context or LocalStorage fallback
  const allC = LS.get('cb_creators', []);
  const c = st.user?.creatorProfile || allC.find(cr => cr.email === st.user?.email) || {};

  const [status, setStatus] = useState(c.status || 'DRAFT');
  const [aadhaarUrl, setAadhaarUrl] = useState(c.aadhaarUrl || '');
  const [panUrl, setPanUrl] = useState(c.panUrl || '');
  const [uploadingAadhaar, setUploadingAadhaar] = useState(false);
  const [uploadingPan, setUploadingPan] = useState(false);

  useEffect(() => {
    if (c.status) {
      setStatus(c.status);
    }
  }, [c.status]);

  const profileCompleted = localStorage.getItem('cb_profile_completed') === 'true' || fmt.completeness(c).pct >= 85;
  const currentStep = getStepIndex(status);
  const comp = fmt.completeness(c);

  const handleAadhaarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAadhaar(true);
    dsp({ t: 'TOAST', d: { type: 'info', msg: 'Uploading Aadhaar document...' } });
    try {
      const res = await uploadFile(file);
      setAadhaarUrl(res.url);
      await updateCreatorProfile({
        ...c,
        aadhaarUrl: res.url
      });
      dsp({ 
        t: 'UPDATE_PROFILE', 
        profile: { aadhaarUrl: res.url } 
      });
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Aadhaar document uploaded!' } });
    } catch (err) {
      dsp({ t: 'TOAST', d: { type: 'error', msg: err.message || 'Upload failed' } });
    } finally {
      setUploadingAadhaar(false);
    }
  };

  const handlePanUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPan(true);
    dsp({ t: 'TOAST', d: { type: 'info', msg: 'Uploading PAN document...' } });
    try {
      const res = await uploadFile(file);
      setPanUrl(res.url);
      await updateCreatorProfile({
        ...c,
        panUrl: res.url
      });
      dsp({ 
        t: 'UPDATE_PROFILE', 
        profile: { panUrl: res.url } 
      });
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'PAN document uploaded!' } });
    } catch (err) {
      dsp({ t: 'TOAST', d: { type: 'error', msg: err.message || 'Upload failed' } });
    } finally {
      setUploadingPan(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!aadhaarUrl || !panUrl) {
      dsp({ t: 'TOAST', d: { type: 'error', msg: 'Please upload both Aadhaar and PAN documents for verification.' } });
      return;
    }
    dsp({ t: 'TOAST', d: { type: 'info', msg: 'Submitting verification request...' } });
    try {
      const updatedProfile = await updateCreatorProfile({
        ...c,
        aadhaarUrl,
        panUrl,
        status: 'PENDING_APPROVAL'
      });
      
      // Update global context state
      dsp({ 
        t: 'UPDATE_PROFILE', 
        profile: { 
          status: 'PENDING_APPROVAL',
          aadhaarUrl,
          panUrl
        } 
      });
      
      setStatus('PENDING_APPROVAL');
      localStorage.setItem('cb_verification_status', 'PENDING_APPROVAL');
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Profile submitted for review! Admin team will verify soon.' } });
    } catch (err) {
      dsp({ t: 'TOAST', d: { type: 'error', msg: err.message || 'Submission failed. Please try again.' } });
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

          {/* KYC Documents Upload Section */}
          {status === 'DRAFT' && (
            <div style={{ marginTop: 28, paddingTop: 28, borderTop: '1px dashed #e2e8f0', marginBottom: 20 }}>
              <h4 style={{ fontSize: 15, fontWeight: 900, color: '#0f172a', marginBottom: 6 }}>KYC Document Verification</h4>
              <p style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginBottom: 16 }}>Please upload scanned copies/photos of your Aadhaar & PAN card to request trust badge verification.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 20 }}>
                {/* Aadhaar Upload Box */}
                <div style={{ border: '2px dashed #cbd5e1', borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', position: 'relative' }}>
                  <input type="file" id="aadhaar-file-upload" accept="image/*,application/pdf" style={{ display: 'none' }} onChange={handleAadhaarUpload} />
                  {aadhaarUrl ? (
                    <div style={{ textAlign: 'center' }}>
                      <CheckCircle2 size={32} color="#10B981" style={{ margin: '0 auto 8px' }} />
                      <span style={{ fontSize: 13, fontWeight: 800, color: '#1e293b' }}>Aadhaar Card Uploaded</span>
                      <button type="button" onClick={() => setAadhaarUrl('')} style={{ border: 'none', background: 'transparent', color: '#ef4444', fontSize: 11, fontWeight: 900, cursor: 'pointer', display: 'block', margin: '6px auto 0' }}>Remove</button>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center' }}>
                      <Btn onClick={() => document.getElementById('aadhaar-file-upload').click()} disabled={uploadingAadhaar} style={{ height: 38, borderRadius: 10, background: '#fff', border: '1px solid #cbd5e1', color: '#1e293b', fontSize: 12, fontWeight: 800 }}>
                        {uploadingAadhaar ? 'Uploading...' : 'Upload Aadhaar'}
                      </Btn>
                      <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 6, fontWeight: 600 }}>PDF or Image (up to 5MB)</p>
                    </div>
                  )}
                </div>

                {/* PAN Upload Box */}
                <div style={{ border: '2px dashed #cbd5e1', borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', position: 'relative' }}>
                  <input type="file" id="pan-file-upload" accept="image/*,application/pdf" style={{ display: 'none' }} onChange={handlePanUpload} />
                  {panUrl ? (
                    <div style={{ textAlign: 'center' }}>
                      <CheckCircle2 size={32} color="#10B981" style={{ margin: '0 auto 8px' }} />
                      <span style={{ fontSize: 13, fontWeight: 800, color: '#1e293b' }}>PAN Card Uploaded</span>
                      <button type="button" onClick={() => setPanUrl('')} style={{ border: 'none', background: 'transparent', color: '#ef4444', fontSize: 11, fontWeight: 900, cursor: 'pointer', display: 'block', margin: '6px auto 0' }}>Remove</button>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center' }}>
                      <Btn onClick={() => document.getElementById('pan-file-upload').click()} disabled={uploadingPan} style={{ height: 38, borderRadius: 10, background: '#fff', border: '1px solid #cbd5e1', color: '#1e293b', fontSize: 12, fontWeight: 800 }}>
                        {uploadingPan ? 'Uploading...' : 'Upload PAN'}
                      </Btn>
                      <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 6, fontWeight: 600 }}>PDF or Image (up to 5MB)</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Under Review Document State */}
          {status === 'PENDING_APPROVAL' && (
            <div style={{ marginTop: 28, paddingTop: 28, borderTop: '1px dashed #e2e8f0', marginBottom: 20 }}>
              <h4 style={{ fontSize: 15, fontWeight: 900, color: '#0f172a', marginBottom: 8 }}>Submitted KYC Documents</h4>
              <p style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginBottom: 16 }}>Your verification documents have been securely uploaded to the admin review queue.</p>
              <div style={{ display: 'flex', gap: 12 }}>
                {aadhaarUrl && <a href={aadhaarUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, fontWeight: 900, color: '#FF9431', textDecoration: 'none', background: '#FF943112', padding: '8px 16px', borderRadius: 10 }}>View Aadhaar Card</a>}
                {panUrl && <a href={panUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, fontWeight: 900, color: '#FF9431', textDecoration: 'none', background: '#FF943112', padding: '8px 16px', borderRadius: 10 }}>View PAN Card</a>}
              </div>
            </div>
          )}

          {/* Action Button */}
          {/* Action Button */}
          {status === 'DRAFT' && !profileCompleted && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.04)',
              border: '1.5px solid rgba(239, 68, 68, 0.15)',
              borderRadius: 16,
              padding: 16,
              marginTop: 20,
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start'
            }}>
              <AlertCircle size={20} color="#EF4444" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <h4 style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 900, color: '#991B1B' }}>Verification Locked</h4>
                <p style={{ margin: 0, fontSize: 12, color: '#B91C1C', fontWeight: 650, lineHeight: 1.4 }}>
                  You must complete at least 85% of your profile strength to submit for verification (Current: {comp.pct}%). Please fill out all tabs in the Profile Builder to unlock submission.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/creator/profile')}
                  style={{
                    background: '#EF4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 100,
                    padding: '6px 14px',
                    fontSize: 11,
                    fontWeight: 800,
                    cursor: 'pointer',
                    marginTop: 10
                  }}
                >
                  Open Profile Builder →
                </button>
              </div>
            </div>
          )}
          {status === 'DRAFT' && (
            <Btn 
              full 
              lg 
              onClick={handleSubmitReview} 
              style={{ 
                background: (!aadhaarUrl || !panUrl || !profileCompleted) ? '#e2e8f0' : 'linear-gradient(90deg, #FF9431, #EA580C)', 
                color: (!aadhaarUrl || !panUrl || !profileCompleted) ? '#94a3b8' : '#fff', 
                border: 'none', 
                borderRadius: 16, 
                marginTop: 16, 
                cursor: (!aadhaarUrl || !panUrl || !profileCompleted) ? 'not-allowed' : 'pointer' 
              }} 
              disabled={!aadhaarUrl || !panUrl || !profileCompleted}
            >
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
