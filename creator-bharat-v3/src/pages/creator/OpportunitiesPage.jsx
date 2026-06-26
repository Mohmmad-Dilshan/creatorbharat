import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, Bookmark, Send, Search, Loader2, Zap, Gift, CheckCircle2, Clock, ArrowRight, Trophy, Lock, Sparkles } from 'lucide-react';
import { useApp } from '@/core/context';
import { fetchCampaigns } from '@/utils/platformService';
import { fmt, LS } from '@/utils/helpers';
import { apiCall } from '@/utils/api';
import { Btn, Card, Bdg, Fld } from '@/components/common/Primitives';
import { CreatorPageHeader } from './CreatorShellPage';
import { ENV } from '@/config/env';

const MISSIONS = [
  {
    id: 'm1',
    title: 'Refer 2 Creators',
    desc: 'Invite 2 new creators from your city to join CreatorBharat. Get ₹199 listing fee cashback per referral.',
    reward: '₹199 Cashback',
    rewardColor: '#10B981',
    icon: Gift,
    deadline: '30 Jun 2027',
    type: 'referral',
    steps: ['Share your referral link', '2 creators sign up', 'Both complete profiles', 'Cashback credited in wallet']
  },
  {
    id: 'm2',
    title: 'Post with #CreatorBharat',
    desc: 'Post 1 reel or story on Instagram/YouTube with #CreatorBharat tag. Earn direct platform credits.',
    reward: '₹500 Credits',
    rewardColor: '#FF9431',
    icon: Zap,
    deadline: '15 Jun 2027',
    type: 'content',
    steps: ['Create engaging content', 'Add #CreatorBharat hashtag', 'Submit post link below', 'Credits in 24hrs']
  },
  {
    id: 'm3',
    title: 'Complete Profile to 100%',
    desc: 'Fill all 6 profile tabs (Identity, Socials, Story, Packages, Local Hub, Sponsored Posts) to unlock Pro trial.',
    reward: '7-Day Pro Trial',
    rewardColor: '#7C3AED',
    icon: Trophy,
    deadline: '30 Jun 2027',
    type: 'profile',
    steps: ['Identity tab (name + bio)', 'Social handles + links', 'Story & milestones', 'Packages & rates', 'Local hub info', 'Add 1 sponsored post']
  },
  {
    id: 'm4',
    title: 'Apply to 3 Brand Campaigns',
    desc: 'Apply to any 3 active campaigns from the Opportunities section. Show brands you are active and ready!',
    reward: '₹100 Wallet Credit',
    rewardColor: '#3B82F6',
    icon: Briefcase,
    deadline: '30 Jun 2027',
    type: 'work',
    steps: ['Browse campaigns below', 'Apply to first campaign', 'Apply to second campaign', 'Apply to third campaign', 'Credit added automatically']
  },
  {
    id: 'm5',
    title: 'Get 1 Brand Review',
    desc: 'Complete a brand deal and request a rating from the brand on your public profile. Boosts CB Score by +10.',
    reward: '+10 CB Score',
    rewardColor: '#F59E0B',
    icon: CheckCircle2,
    deadline: '30 Jun 2027',
    type: 'review',
    steps: ['Complete any brand deal', 'Contact brand via messages', 'Request a review/rating', 'Review appears on profile']
  },
];


const MissionCard = ({ mission, completed, onComplete }) => {
  const [expanded, setExpanded] = useState(false);
  const [proofUrl, setProofUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const Icon = mission.icon || Trophy;
  const rewardColor = mission.rewardColor || '#FF9431';

  const isDynamic = !!mission.createdAt; // dynamic missions have createdAt
  const status = isDynamic ? mission.status : (completed ? 'APPROVED' : 'NOT_STARTED');

  const stepsList = Array.isArray(mission.steps) 
    ? mission.steps 
    : (typeof mission.steps === 'string' 
        ? JSON.parse(mission.steps) 
        : ['Follow the instructions and submit your proof below']);

  const handleDynamicSubmit = (e) => {
    e.preventDefault();
    if (!proofUrl.trim()) return;
    setSubmitting(true);
    onComplete(mission.id, proofUrl.trim())
      .then(() => setProofUrl(''))
      .finally(() => setSubmitting(false));
  };

  const statusColor = status === 'APPROVED' ? 'green' : status === 'PENDING' ? 'blue' : status === 'REJECTED' ? 'red' : 'saffron';
  const statusText = status === 'APPROVED' ? 'Done ✓' : status === 'PENDING' ? 'Under Review' : status === 'REJECTED' ? 'Rejected (Try Again)' : mission.reward;

  return (
    <Card style={{ padding: 24, border: status === 'APPROVED' ? '1.5px solid #10B98130' : '1px solid #f1f5f9', background: status === 'APPROVED' ? '#f0fdf4' : '#fff' }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ width: 48, height: 48, borderRadius: 16, background: rewardColor + '12', color: rewardColor, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
          {status === 'APPROVED' ? <CheckCircle2 size={24} color="#10B981" /> : <Icon size={24} />}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
            <h4 style={{ fontSize: 16, fontWeight: 900, color: '#0f172a', margin: 0 }}>{mission.title}</h4>
            <Bdg sm color={statusColor}>{statusText}</Bdg>
          </div>
          <p style={{ fontSize: 13, color: '#64748b', fontWeight: 500, lineHeight: 1.5, margin: '0 0 12px' }}>{mission.desc || mission.description}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 700, color: '#94a3b8' }}>
              <Clock size={12} /> Deadline: {isDynamic ? new Date(mission.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : mission.deadline}
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              style={{ background: 'none', border: 'none', color: '#FF9431', fontSize: 12, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              {expanded ? 'Hide steps' : 'View steps'} <ArrowRight size={12} style={{ transform: expanded ? 'rotate(90deg)' : 'none', transition: '0.2s' }} />
            </button>
          </div>

          {expanded && (
            <div style={{ marginTop: 16, padding: 16, background: '#f8fafc', borderRadius: 14, border: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 10 }}>Steps to complete:</div>
              {stepsList.map((step, i) => (
                <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#FF943112', color: '#FF9431', display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 900, flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>{step}</span>
                </div>
              ))}
              
              {!isDynamic && status !== 'APPROVED' && (
                <Btn full sm onClick={() => onComplete(mission.id)} style={{ marginTop: 12, background: rewardColor, color: '#fff', borderRadius: 12 }}>
                  Mark as Complete
                </Btn>
              )}

              {isDynamic && (status === 'NOT_STARTED' || status === 'REJECTED') && (
                <form onSubmit={handleDynamicSubmit} style={{ marginTop: 16, borderTop: '1px solid #e2e8f0', paddingTop: 16 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 900, color: '#475569', marginBottom: 8 }}>SUBMIT VERIFICATION PROOF</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input
                      type="url"
                      placeholder="Paste link to your post, story, or proof URL..."
                      value={proofUrl}
                      onChange={(e) => setProofUrl(e.target.value)}
                      required
                      style={{
                        flex: 1,
                        padding: '10px 14px',
                        border: '1.5px solid #e2e8f0',
                        borderRadius: 12,
                        fontSize: 13,
                        outline: 'none',
                        background: '#fff'
                      }}
                    />
                    <Btn sm type="submit" disabled={submitting} style={{ background: '#FF9431', color: '#fff', borderRadius: 12 }}>
                      {submitting ? <Loader2 size={14} className="spin" /> : 'Submit'}
                    </Btn>
                  </div>
                </form>
              )}

              {isDynamic && status === 'PENDING' && (
                <div style={{ marginTop: 12, padding: '10px 14px', background: '#eff6ff', borderRadius: 12, border: '1px solid #bfdbfe', fontSize: 13, color: '#1e40af', fontWeight: 600 }}>
                  ⏳ Proof submitted! Admin verification is pending.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function OpportunitiesPage() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [tab, setTab] = useState('campaigns'); // 'campaigns' | 'gigs' | 'missions'
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [pitchText, setPitchText] = useState('');
  const [pitchDialect, setPitchDialect] = useState('English');
  const [aiPitchLoading, setAiPitchLoading] = useState(false);
  const [completedMissions, setCompletedMissions] = useState(() => 
    JSON.parse(localStorage.getItem('cb_completed_missions') || '[]')
  );
  const [dbMissions, setDbMissions] = useState([]);
  const [missionsLoading, setMissionsLoading] = useState(false);

  const [gigs, setGigs] = useState([]);
  const [loadingGigs, setLoadingGigs] = useState(false);
  const [submittingMilestone, setSubmittingMilestone] = useState(null);
  const [proofText, setProofText] = useState('');
  const [proofUrl, setProofUrl] = useState('');
  const [isSubmittingProof, setIsSubmittingProof] = useState(false);

  const loadMissions = () => {
    setMissionsLoading(true);
    apiCall('/missions')
      .then(res => {
        if (Array.isArray(res)) setDbMissions(res);
      })
      .catch(err => console.error('Failed to load missions:', err))
      .finally(() => setMissionsLoading(false));
  };

  const loadGigs = async () => {
    setLoadingGigs(true);
    try {
      const token = localStorage.getItem('cb_token');
      const res = await fetch(ENV.apiUrl + '/gigs/me', {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      const data = await res.json();
      if (res.ok) {
        setGigs(data);
      }
    } catch (err) {
      console.error('Failed to load gigs:', err);
    } finally {
      setLoadingGigs(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchCampaigns()
      .then(list => { if (!cancelled) setAllCampaigns(list || []); })
      .catch(() => { if (!cancelled) setAllCampaigns([]); })
      .finally(() => { if (!cancelled) setLoading(false); });

    if (localStorage.getItem('cb_token')) {
      loadGigs();
    }

    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (tab === 'gigs') {
      loadGigs();
    } else if (tab === 'missions') {
      loadMissions();
    }
  }, [tab]);

  const campaigns = useMemo(() => {
    const term = q.toLowerCase();
    return allCampaigns.filter(c =>
      !term ||
      (c.title || '').toLowerCase().includes(term) ||
      (c.brand || '').toLowerCase().includes(term) ||
      (c.targetCity || '').toLowerCase().includes(term)
    );
  }, [q, allCampaigns]);

  const apply = (campaign) => {
    if (!st.isPro && st.applied.length >= 3) {
      setShowUpgradeModal(true);
      return;
    }
    setSelectedCampaign(campaign);
    setPitchText(`Hi ${campaign.brand} Team,\n\nI would love to collaborate on your "${campaign.title}" campaign! As a verified creator, I specialize in producing highly engaging visual content and can build direct brand equity with my audience.\n\nLooking forward to hearing from you!`);
  };

  const handleAiPitch = async () => {
    if (!selectedCampaign) return;
    setAiPitchLoading(true);
    try {
      const data = await apiCall('/ai/pitch-assistant', {
        method: 'POST',
        body: {
          creatorName: st.user?.name || 'Verified Creator',
          creatorNiches: st.user?.creator?.niche?.join(', ') || 'Lifestyle',
          brandName: selectedCampaign.brand,
          campaignTitle: selectedCampaign.title,
          campaignBrief: selectedCampaign.desc || selectedCampaign.description || 'Brand collaboration',
          dialect: pitchDialect
        }
      });
      setPitchText(data.pitch || '');
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'AI Pitch generated! ✨' } });
    } catch (err) {
      dsp({ t: 'TOAST', d: { type: 'error', msg: err.message || 'AI pitch generation failed' } });
    } finally {
      setAiPitchLoading(false);
    }
  };

  const submitPitch = async () => {
    if (!selectedCampaign) return;
    if (!pitchText.trim()) {
      dsp({ t: 'TOAST', d: { type: 'error', msg: 'Please write a pitch or use AI to generate one.' } });
      return;
    }
    
    setLoading(true);
    try {
      const token = localStorage.getItem('cb_token');
      const res = await fetch(ENV.apiUrl + '/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          campaignId: selectedCampaign.id,
          message: pitchText.trim(),
          proposedRate: selectedCampaign.budget || 5000
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit application.');

      dsp({ t: 'APPLY', id: selectedCampaign.id });
      dsp({ t: 'TOAST', d: { type: 'success', msg: `Applied to ${selectedCampaign.title}!` } });
      setSelectedCampaign(null);
    } catch (err) {
      dsp({ t: 'TOAST', d: { type: 'error', msg: err.message } });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProof = async () => {
    if (!submittingMilestone) return;
    if (!proofText.trim() && !proofUrl.trim()) {
      dsp({ t: 'TOAST', d: { type: 'error', msg: 'Please provide either a message or link as proof of work.' } });
      return;
    }

    setIsSubmittingProof(true);
    try {
      const token = localStorage.getItem('cb_token');
      const { gigId, milestoneId } = submittingMilestone;
      const res = await fetch(ENV.apiUrl + `/gigs/${gigId}/milestones/${milestoneId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          proofText: proofText.trim(),
          proofUrl: proofUrl.trim()
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit milestone proof');

      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Milestone proof submitted successfully! 🚀' } });
      setSubmittingMilestone(null);
      setProofText('');
      setProofUrl('');
      loadGigs();
    } catch (err) {
      dsp({ t: 'TOAST', d: { type: 'error', msg: err.message } });
    } finally {
      setIsSubmittingProof(false);
    }
  };

  const completeMission = async (missionId, proofUrl) => {
    const isDynamic = dbMissions.some(m => m.id === missionId);
    if (!isDynamic) {
      const updated = [...completedMissions, missionId];
      setCompletedMissions(updated);
      localStorage.setItem('cb_completed_missions', JSON.stringify(updated));
      const mission = MISSIONS.find(m => m.id === missionId);
      
      // Update streak
      const newStreak = Math.ceil(updated.length / 2);
      localStorage.setItem('cb_mission_streak', String(newStreak));

      dsp({ t: 'TOAST', d: { type: 'success', msg: `Mission complete! ${mission?.reward} earned 🎉` } });
      return;
    }

    try {
      const res = await apiCall(`/missions/${missionId}/complete`, {
        method: 'POST',
        body: JSON.stringify({ proofUrl })
      });
      if (res) {
        dsp({ t: 'TOAST', d: { type: 'success', msg: 'Mission proof submitted for review! 🚀' } });
        loadMissions();
      }
    } catch (err) {
      console.error('Failed to complete mission:', err);
      dsp({ t: 'TOAST', d: { type: 'error', msg: err.message || 'Submission failed' } });
    }
  };

  return (
    <div className="dashboard-page-container">
      <CreatorPageHeader
        badge="CREATOR OPPORTUNITIES"
        title="Deals & Missions"
        subtitle="Brand campaigns + monthly platform missions — earn more, grow faster."
        icon={Briefcase}
      />

      {/* Tab Switcher */}
      <div style={{ display: 'flex', background: '#f1f5f9', padding: 4, borderRadius: 16, width: 'fit-content', marginBottom: 28, gap: 4 }}>
        {[
          { id: 'campaigns', label: '🎯 Brand Campaigns', count: campaigns.length },
          { id: 'gigs', label: '💼 Live Contracts', count: gigs.length },
          { id: 'missions', label: '⚡ Monthly Missions', count: dbMissions.length > 0 ? dbMissions.length : MISSIONS.length },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '10px 20px', borderRadius: 12, border: 'none', cursor: 'pointer',
              background: tab === t.id ? '#fff' : 'transparent',
              color: tab === t.id ? '#0f172a' : '#64748b',
              fontSize: 14, fontWeight: 800,
              boxShadow: tab === t.id ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              display: 'flex', alignItems: 'center', gap: 8
            }}
          >
            {t.label}
            <span style={{ background: tab === t.id ? '#FF943120' : '#e2e8f0', color: tab === t.id ? '#FF9431' : '#94a3b8', padding: '2px 8px', borderRadius: 100, fontSize: 11, fontWeight: 900 }}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* CAMPAIGNS TAB */}
      {tab === 'campaigns' && (
        <>
          <div style={{ maxWidth: 520, marginBottom: 24 }}>
            <Fld label="Search opportunities" icon={Search} value={q} onChange={e => setQ(e.target.value)} placeholder="Search brands, city, campaign..." />
          </div>

          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0', color: '#94a3b8' }}>
              <Loader2 size={24} className="spin" style={{ marginRight: 12 }} />
              <span style={{ fontSize: 15, fontWeight: 700 }}>Loading campaigns...</span>
            </div>
          ) : campaigns.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: '#94a3b8' }}>
              <Briefcase size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
              <p style={{ fontSize: 18, fontWeight: 800, color: '#475569' }}>No campaigns found</p>
              <p style={{ fontSize: 14, fontWeight: 500 }}>Try a different search or check back later.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {campaigns.map(campaign => {
                const applied = st.applied.includes(campaign.id);
                const saved = st.saved.includes(campaign.id);
                return (
                  <Card key={campaign.id} style={{ padding: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 20 }}>
                      <Bdg color={campaign.status === 'active' || campaign.status === 'live' ? 'green' : 'blue'}>{campaign.status || 'active'}</Bdg>
                      <button
                        onClick={() => dsp({ t: 'SAVE', id: campaign.id })}
                        style={{ border: '1px solid #e2e8f0', background: saved ? '#FF943112' : '#fff', color: saved ? '#FF9431' : '#64748b', width: 40, height: 40, borderRadius: 12, display: 'grid', placeItems: 'center', cursor: 'pointer' }}
                        aria-label="Save campaign"
                      >
                        <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <h3 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 950, color: '#0f172a' }}>{campaign.title}</h3>
                    <p style={{ margin: 0, color: '#64748b', fontWeight: 700 }}>{campaign.brand} · {campaign.targetCity || 'India'}</p>
                    <div style={{ margin: '22px 0', fontSize: 28, fontWeight: 950, color: '#0f172a' }}>{fmt.inr(campaign.budget || campaign.budgetMin)}</div>
                    <Btn full onClick={() => apply(campaign)} disabled={applied} style={{ background: applied ? '#e2e8f0' : '#0f172a', color: applied ? '#64748b' : '#fff', borderRadius: 14 }}>
                      {applied ? 'Applied ✓' : 'Apply with Pitch'} <Send size={16} />
                    </Btn>
                  </Card>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* LIVE CONTRACTS TAB */}
      {tab === 'gigs' && (
        <div>
          {loadingGigs ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0', color: '#94a3b8' }}>
              <Loader2 size={24} className="spin" style={{ marginRight: 12 }} />
              <span style={{ fontSize: 15, fontWeight: 700 }}>Loading contract gigs...</span>
            </div>
          ) : gigs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: '#94a3b8' }}>
              <Briefcase size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
              <p style={{ fontSize: 18, fontWeight: 800, color: '#475569' }}>No active gigs</p>
              <p style={{ fontSize: 14, fontWeight: 500 }}>Accept brand bids to kickstart a live milestone-based contract!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {gigs.map(gig => (
                <Card key={gig.id} style={{ padding: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '20px' }}>
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>Campaign Gig Contract</span>
                      <h3 style={{ fontSize: 18, fontWeight: 950, color: '#0f172a', margin: '4px 0 0' }}>{gig.campaign?.title}</h3>
                      <p style={{ fontSize: 13, color: '#64748b', margin: '4px 0 0', fontWeight: 600 }}>Brand Partner: <strong style={{ color: '#FF9431' }}>{gig.campaign?.brand?.companyName || 'Brand Partner'}</strong></p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Bdg color={gig.status === 'COMPLETED' ? 'green' : 'blue'}>{gig.status}</Bdg>
                      <div style={{ fontSize: '18px', fontWeight: 950, color: '#0f172a' }}>
                        ₹{gig.campaign?.budget?.toLocaleString() || '5,000'}
                      </div>
                    </div>
                  </div>

                  {/* Milestones wizard flow */}
                  <div style={{ fontSize: '13px', fontWeight: 900, color: '#475569', textTransform: 'uppercase', marginBottom: '16px' }}>Escrow Milestones Checklist</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {gig.milestones.map((ms, idx) => (
                      <div key={ms.id} style={{
                        display: 'flex', gap: '16px', alignItems: 'flex-start',
                        background: ms.status === 'APPROVED' ? '#f0fdf4' : ms.status === 'SUBMITTED' ? '#eff6ff' : '#f8fafc',
                        padding: '16px', borderRadius: '16px', border: '1px solid',
                        borderColor: ms.status === 'APPROVED' ? '#10b98120' : ms.status === 'SUBMITTED' ? '#3b82f620' : '#e2e8f0'
                      }}>
                        <div style={{
                          width: '24px', height: '24px', borderRadius: '50%',
                          background: ms.status === 'APPROVED' ? '#10B981' : ms.status === 'SUBMITTED' ? '#3B82F6' : '#94a3b8',
                          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '11px', fontWeight: 900, flexShrink: 0
                        }}>
                          {ms.status === 'APPROVED' ? '✓' : idx + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                            <div>
                              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: 0 }}>{ms.title}</h4>
                              {ms.description && <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0', fontWeight: 550, lineHeight: 1.4 }}>{ms.description}</p>}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>₹{ms.amount?.toLocaleString()}</span>
                              <Bdg sm color={ms.status === 'APPROVED' ? 'green' : ms.status === 'SUBMITTED' ? 'blue' : 'slate'}>
                                {ms.status === 'APPROVED' ? 'Released ✓' : ms.status === 'SUBMITTED' ? 'Under Review' : 'Pending'}
                              </Bdg>
                            </div>
                          </div>

                          {/* Render submitted proof details if any */}
                          {ms.status === 'SUBMITTED' && (
                            <div style={{ marginTop: '12px', padding: '10px 12px', background: '#fff', borderRadius: '10px', border: '1px solid #3b82f615', fontSize: '12px' }}>
                              <strong style={{ color: '#3b82f6' }}>Submitted Proof: </strong>
                              {ms.proofText && <span>"{ms.proofText}" </span>}
                              {ms.proofUrl && <a href={ms.proofUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#FF9431', fontWeight: 800, textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>Link ↗</a>}
                            </div>
                          )}

                          {/* Submit Action Button */}
                          {ms.status === 'PENDING' && (
                            <button
                              onClick={() => setSubmittingMilestone({ gigId: gig.id, milestoneId: ms.id })}
                              style={{
                                marginTop: '12px', background: '#0f172a', color: '#fff',
                                border: 'none', borderRadius: '100px', padding: '8px 16px',
                                fontSize: '12px', fontWeight: 800, cursor: 'pointer'
                              }}
                            >
                              Submit Verification Proof 🚀
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MISSIONS TAB */}
      {tab === 'missions' && (
        <div>
          {/* Mission Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
            {[
              { label: 'Available', value: dbMissions.length > 0 ? dbMissions.length : MISSIONS.length, color: '#FF9431' },
              { label: 'Completed', value: dbMissions.length > 0 ? dbMissions.filter(m => m.status === 'APPROVED').length : completedMissions.length, color: '#10B981' },
              { label: 'Rewards Earned', value: dbMissions.length > 0 ? '₹' + (dbMissions.filter(m => m.status === 'APPROVED').length * 199) : (completedMissions.length > 0 ? '₹' + (completedMissions.length * 199) : '₹0'), color: '#7C3AED' },
              { label: 'Monthly Streak', value: `${localStorage.getItem('cb_mission_streak') || (completedMissions.length > 0 ? Math.ceil(completedMissions.length / 2) : 0)} Months 🔥`, color: '#EC4899' },
            ].map(s => (
              <Card key={s.label} style={{ padding: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 950, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginTop: 4 }}>{s.label}</div>
              </Card>
            ))}
          </div>

          {missionsLoading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 0', color: '#94a3b8' }}>
              <Loader2 size={24} className="spin" style={{ marginRight: 12 }} />
              <span style={{ fontSize: 14, fontWeight: 700 }}>Loading monthly missions...</span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {(dbMissions.length > 0 ? dbMissions : MISSIONS).map(mission => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  completed={dbMissions.length > 0 ? mission.status === 'APPROVED' : completedMissions.includes(mission.id)}
                  onComplete={completeMission}
                />
              ))}
            </div>
          )}

          <div style={{ marginTop: 24, padding: 20, background: '#f8fafc', borderRadius: 20, border: '1px solid #f1f5f9', textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>
              More missions coming every month. Complete all to earn the <strong style={{ color: '#FF9431' }}>Mission Master Badge</strong> 🏅
            </div>
          </div>
        </div>
      )}
      
      {/* Collab Pitch Modal */}
      <AnimatePresence>
        {selectedCampaign && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
            onClick={() => setSelectedCampaign(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ background: '#fff', borderRadius: 32, padding: 32, maxWidth: 550, width: '100%', boxShadow: '0 40px 80px rgba(0,0,0,0.2)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontSize: 20, fontWeight: 950, color: '#0f172a', margin: 0 }}>Apply to {selectedCampaign.brand}</h3>
                <button 
                  onClick={() => setSelectedCampaign(null)}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: 20, fontWeight: 900, cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', marginBottom: '24px', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Campaign Deal</div>
                <div style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a' }}>{selectedCampaign.title}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#FF9431', marginTop: 4 }}>Budget: {fmt.inr(selectedCampaign.budget || selectedCampaign.budgetMin)}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, gap: 12, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <label style={{ fontSize: '11px', fontWeight: 900, color: '#475569', textTransform: 'uppercase', margin: 0 }}>Your Pitch Proposal</label>
                      <select
                        value={pitchDialect}
                        onChange={e => setPitchDialect(e.target.value)}
                        style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          color: '#475569',
                          border: '1.5px solid #e2e8f0',
                          borderRadius: '8px',
                          padding: '4px 8px',
                          background: '#fff',
                          outline: 'none',
                          cursor: 'pointer',
                          fontFamily: 'inherit'
                        }}
                      >
                        <option value="English">English</option>
                        <option value="Hinglish">Hinglish</option>
                        <option value="Hindi">Hindi (नमस्ते)</option>
                        <option value="Rajasthani">Rajasthani (खम्मा घणी)</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={handleAiPitch}
                      disabled={aiPitchLoading}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(255, 148, 49, 0.08)',
                        color: '#FF9431',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '6px 12px',
                        fontSize: '11px',
                        fontWeight: 900,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#FF9431'; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 148, 49, 0.08)'; e.currentTarget.style.color = '#FF9431'; }}
                    >
                      <Sparkles size={11} fill="currentColor" />
                      {aiPitchLoading ? 'Writing...' : 'Write Pitch with AI ✨'}
                    </button>
                  </div>
                  <textarea
                    value={pitchText}
                    onChange={e => setPitchText(e.target.value)}
                    rows={6}
                    placeholder="Tell the brand why you are a perfect fit for this campaign..."
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '16px',
                      border: '1.5px solid #e2e8f0',
                      outline: 'none',
                      fontSize: '14px',
                      color: '#0f172a',
                      fontWeight: 500,
                      resize: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                  <button onClick={() => setSelectedCampaign(null)} style={{ flex: 1, padding: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#64748b', borderRadius: '100px', cursor: 'pointer', fontWeight: 800, fontSize: 14 }}>Cancel</button>
                  <button onClick={submitPitch} style={{ flex: 1, padding: '12px', border: 'none', background: '#0f172a', color: '#fff', borderRadius: '100px', cursor: 'pointer', fontWeight: 950, fontSize: 14 }}>Submit Proposal Pitch</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upgrade Modal */}
      <AnimatePresence>
        {showUpgradeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
            onClick={() => setShowUpgradeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ background: '#fff', borderRadius: 32, padding: 40, maxWidth: 400, width: '100%', textAlign: 'center', boxShadow: '0 40px 80px rgba(0,0,0,0.2)' }}
            >
              <div style={{ width: 64, height: 64, borderRadius: 20, background: '#FF943112', display: 'grid', placeItems: 'center', margin: '0 auto 20px', color: '#FF9431' }}>
                <Lock size={28} />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 950, color: '#0f172a', marginBottom: 10 }}>Campaign Limit Reached</h3>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, marginBottom: 8 }}>
                Free plan mein aap sirf <strong>3 campaigns</strong> apply kar sakte hain.
              </p>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, marginBottom: 28 }}>
                Pro upgrade karke <strong>unlimited brand collaborations</strong> aur <strong>premium campaign brief access</strong> unlock karein.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Btn full lg onClick={() => navigate('/creator/pricing')} style={{ background: '#FF9431', color: '#fff', borderRadius: 100, fontWeight: 950 }}>
                  Upgrade to Pro
                </Btn>
                <button onClick={() => setShowUpgradeModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Milestone Proof Submission Modal */}
      <AnimatePresence>
        {submittingMilestone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
            onClick={() => setSubmittingMilestone(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ background: '#fff', borderRadius: 32, padding: 32, maxWidth: 500, width: '100%', boxShadow: '0 40px 80px rgba(0,0,0,0.15)' }}
            >
              <h3 style={{ fontSize: 20, fontWeight: 950, color: '#0f172a', marginBottom: 6 }}>Submit Milestone Deliverable</h3>
              <p style={{ fontSize: 13, color: '#64748b', fontWeight: 550, marginBottom: 20 }}>Provide links or confirmation details of your completed milestone task for brand approval and instant escrow release.</p>

              <div className="form-stack" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Fld 
                  label="Work Verification Link (Instagram post/reel/drive link)" 
                  value={proofUrl} 
                  onChange={e => setProofUrl(e.target.value)} 
                  placeholder="https://instagram.com/p/..." 
                />
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Submission Message</label>
                  <textarea
                    value={proofText}
                    onChange={e => setProofText(e.target.value)}
                    rows={4}
                    placeholder="Provide details about the work, caption notes, or verification updates..."
                    style={{
                      width: '100%', padding: '14px', borderRadius: '16px', border: '1.5px solid #e2e8f0',
                      outline: 'none', fontSize: '14px', color: '#0f172a', fontWeight: 500, resize: 'none', boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                  <button onClick={() => setSubmittingMilestone(null)} style={{ flex: 1, padding: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#64748b', borderRadius: '100px', cursor: 'pointer', fontWeight: 800, fontSize: 14 }}>Cancel</button>
                  <button 
                    onClick={handleSubmitProof} 
                    disabled={isSubmittingProof}
                    style={{ flex: 1, padding: '12px', border: 'none', background: '#FF9431', color: '#fff', borderRadius: '100px', cursor: 'pointer', fontWeight: 950, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    {isSubmittingProof && <Loader2 size={16} className="animate-spin" />}
                    Submit Proof
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
