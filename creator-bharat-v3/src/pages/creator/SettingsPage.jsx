import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useApp } from '@/core/context';
import { LS, fmt } from '../../utils/helpers';
import { Btn, Card, Fld, Bdg, Ring, Bar } from '@/components/common/Primitives';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Globe, 
  Wallet, 
  Shield, 
  Camera, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  Zap,
  Lock,
  BookOpen,
  Image as ImageIcon,
  Layers,
  Plus,
  Trash2,
  MapPin
} from 'lucide-react';
import AuthGatekeeper from '@/components/auth/AuthGatekeeper';

const StepNavItem = ({ id, label, icon: Icon, active, completed, onClick }) => (
  <button
    onClick={onClick}
    className={`step-nav-item ${active ? 'active' : ''} ${completed ? 'completed' : ''}`}
  >
    <div className="step-nav-icon-box">
       {completed && !active ? <CheckCircle2 size={18} /> : <Icon size={18} />}
    </div>
    <span className="step-nav-label">
      {label}
    </span>
    {active && <ChevronRight size={16} className="active-chevron" style={{ opacity: 0.5, color: '#FFF' }} />}
  </button>
);

StepNavItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  active: PropTypes.bool.isRequired,
  completed: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default function SettingsPage() {
  const { st, dsp } = useApp();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [tab, setTab] = useState('identity');

  // Self-healing creator profile resolution
  const allC = LS.get('cb_creators', []);
  const c = st.user?.creatorProfile || st.creatorProfile || allC.find(cr => cr.email === st.user?.email) || {
    name: st.user?.name || '',
    email: st.user?.email || '',
    bio: '',
    city: '',
    state: '',
    instagram: '',
    youtube: '',
    rateMin: '',
    rateMax: '',
    portfolio: '',
    followers: 125000,
    score: 85,
    gallery: [],
    full_story: { p1: '', quote: '', p2: '', p3: '' },
    milestones: [],
    services: [],
    awards: [],
    collabs: []
  };

  const [F, setF] = useState({ 
    name: c?.name || '', 
    bio: c?.bio || '', 
    city: c?.city || '', 
    state: c?.state || '', 
    instagram: c?.instagram || '', 
    youtube: c?.youtube || '', 
    rateMin: c?.rateMin || '', 
    rateMax: c?.rateMax || '',
    portfolio: c?.portfolio || '',
    gallery: [
      c?.gallery?.[0] || '',
      c?.gallery?.[1] || '',
      c?.gallery?.[2] || '',
      c?.gallery?.[3] || ''
    ],
    storyP1: c?.full_story?.p1 || '',
    storyQuote: c?.full_story?.quote || '',
    storyP2: c?.full_story?.p2 || '',
    storyP3: c?.full_story?.p3 || '',
    philosophy: c?.philosophy || '',
    aiMatch: c?.ai_intel?.match || '',
    aiSummary: c?.ai_intel?.summary || '',
    aiSafety: c?.ai_intel?.stats?.[0]?.v || '',
    aiRetention: c?.ai_intel?.stats?.[1]?.v || '',
    aiRoi: c?.ai_intel?.stats?.[2]?.v || '',
    localVoice: c?.local_voice || '',
    localPenetration: c?.local_penetration || '',
    regionalDialects: c?.regional_dialects || '',
    localHubs: c?.local_impact_hubs?.length ? [...c.local_impact_hubs] : [
      { l: 'Indore', v: '85%' },
      { l: 'Bhopal', v: '72%' },
      { l: 'Ujjain', v: '64%' }
    ],
    awards: c?.awards?.length ? [...c.awards] : [
      { t: 'Regional Pioneer', o: 'CreatorBharat', y: '2024' },
      { t: 'Elite Hub Verified', o: 'Gov of Rajasthan', y: '2023' },
      { t: 'Cultural Impact', o: 'Jaipur Literature Festival', y: '2025' }
    ],
    collabs: c?.collabs?.length ? [...c.collabs] : [
      { p: 'Rajasthan Tourism Govt', l: 'Government Partner', d: 'Official campaign promoting local heritage and rural homestays.' },
      { p: 'MS Dhoni / Seven brand', l: 'Celebrity Linkup', d: 'Co-starred in the regional sportswear launch campaign.' },
      { p: 'TEDx Jaipur', l: 'Keynote Feature', d: 'Delivered a talk on the power of regional dialects in storytelling.' }
    ],
    milestones: c?.milestones?.length ? [...c.milestones] : [
      { y: '2022', t: 'The Foundation', d: '' },
      { y: '2023', t: 'First Success', d: '' },
      { y: '2024', t: 'Scaling Up', d: '' },
      { y: '2025', t: 'Elite Status', d: '' }
    ],
    services: c?.services?.length ? [...c.services] : [
      { t: 'Cinematic Reel', d: 'Brand integration in high-fidelity 4K video reel.', rate: '12000' },
      { t: 'Product Placement', d: 'Seamless product placement in community posts.', rate: '6000' },
      { t: 'Full YouTube Review', d: 'Dedicated 5-minute product breakdown and tech specs.', rate: '25000' }
    ],
    viralContent: c?.viral_content?.length ? c.viral_content.map(v => typeof v === 'object' ? { views: v.views || '', img: v.img || '' } : { views: `${v}M`, img: '' }) : [
      { views: '1.2M', img: '' },
      { views: '3.5M', img: '' },
      { views: '5.8M', img: '' }
    ],
    caseStudies: c?.case_studies?.length ? c.case_studies.map(cs => ({
      title: cs.title || '',
      brand: cs.brand || '',
      r1_label: cs.results?.[0]?.l || 'Reach',
      r1_val: cs.results?.[0]?.v || '',
      r2_label: cs.results?.[1]?.l || 'ROI',
      r2_val: cs.results?.[1]?.v || ''
    })) : [
      { title: '', brand: '', r1_label: 'Reach', r1_val: '', r2_label: 'ROI', r2_val: '' },
      { title: '', brand: '', r1_label: 'Sales', r1_val: '', r2_label: 'Clicks', r2_val: '' },
      { title: '', brand: '', r1_label: 'Views', r1_val: '', r2_label: 'Shares', r2_val: '' }
    ]
  });

  // Sync inputs if creator profile updates in context
  useEffect(() => {
    if (c) {
      setF(p => ({
        ...p,
        name: c.name || '',
        bio: c.bio || '',
        city: c.city || '',
        state: c.state || '',
        instagram: c.instagram || '',
        youtube: c.youtube || '',
        rateMin: c.rateMin || '',
        rateMax: c.rateMax || '',
        portfolio: c.portfolio || '',
        gallery: [
          c?.gallery?.[0] || '',
          c?.gallery?.[1] || '',
          c?.gallery?.[2] || '',
          c?.gallery?.[3] || ''
        ],
        storyP1: c?.full_story?.p1 || '',
        storyQuote: c?.full_story?.quote || '',
        storyP2: c?.full_story?.p2 || '',
        storyP3: c?.full_story?.p3 || '',
        philosophy: c.philosophy || '',
        aiMatch: c?.ai_intel?.match || '',
        aiSummary: c?.ai_intel?.summary || '',
        aiSafety: c?.ai_intel?.stats?.[0]?.v || '',
        aiRetention: c?.ai_intel?.stats?.[1]?.v || '',
        aiRoi: c?.ai_intel?.stats?.[2]?.v || '',
        localVoice: c.local_voice || '',
        localPenetration: c.local_penetration || '',
        regionalDialects: c.regional_dialects || '',
        localHubs: c?.local_impact_hubs?.length ? [...c.local_impact_hubs] : p.localHubs,
        awards: c?.awards?.length ? [...c.awards] : p.awards,
        collabs: c?.collabs?.length ? [...c.collabs] : p.collabs,
        milestones: c?.milestones?.length ? [...c.milestones] : p.milestones,
        services: c?.services?.length ? [...c.services] : p.services,
        viralContent: c?.viral_content?.length ? c.viral_content.map(v => typeof v === 'object' ? { views: v.views || '', img: v.img || '' } : { views: `${v}M`, img: '' }) : p.viralContent,
        caseStudies: c?.case_studies?.length ? c.case_studies.map(cs => ({
          title: cs.title || '',
          brand: cs.brand || '',
          r1_label: cs.results?.[0]?.l || 'Reach',
          r1_val: cs.results?.[0]?.v || '',
          r2_label: cs.results?.[1]?.l || 'ROI',
          r2_val: cs.results?.[1]?.v || ''
        })) : p.caseStudies
      }));
    }
  }, [st.user?.creatorProfile]);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const upF = (k, v) => setF(p => ({ ...p, [k]: v }));
  
  const upGallery = (idx, val) => {
    setF(p => {
      const copy = [...p.gallery];
      copy[idx] = val;
      return { ...p, gallery: copy };
    });
  };

  const upMilestone = (idx, field, val) => {
    setF(p => {
      const copy = [...p.milestones];
      copy[idx] = { ...copy[idx], [field]: val };
      return { ...p, milestones: copy };
    });
  };

  const upService = (idx, field, val) => {
    setF(p => {
      const copy = [...p.services];
      copy[idx] = { ...copy[idx], [field]: val };
      return { ...p, services: copy };
    });
  };

  const upAward = (idx, field, val) => {
    setF(p => {
      const copy = [...p.awards];
      copy[idx] = { ...copy[idx], [field]: val };
      return { ...p, awards: copy };
    });
  };

  const upCollab = (idx, field, val) => {
    setF(p => {
      const copy = [...p.collabs];
      copy[idx] = { ...copy[idx], [field]: val };
      return { ...p, collabs: copy };
    });
  };

  const upLocalHub = (idx, field, val) => {
    setF(p => {
      const copy = [...p.localHubs];
      copy[idx] = { ...copy[idx], [field]: val };
      return { ...p, localHubs: copy };
    });
  };

  const upViralContent = (idx, field, val) => {
    setF(p => {
      const copy = [...p.viralContent];
      copy[idx] = { ...copy[idx], [field]: val };
      return { ...p, viralContent: copy };
    });
  };

  const upCaseStudy = (idx, field, val) => {
    setF(p => {
      const copy = [...p.caseStudies];
      copy[idx] = { ...copy[idx], [field]: val };
      return { ...p, caseStudies: copy };
    });
  };

  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type, msg } });

  // Auth Gatekeeper
  if (!st.user || st.role !== 'creator') {
    return <AuthGatekeeper mob={mob} />;
  }

  const saveProfile = () => {
    if (st.role === 'creator') {
      const allC = LS.get('cb_creators', []);
      const existingIdx = allC.findIndex(cr => cr.email === st.user?.email);
      
      const filteredGallery = F.gallery.filter(Boolean);
      const filteredMilestones = F.milestones.filter(m => m.y && m.t);
      const filteredServices = F.services.filter(s => s.t && s.rate);
      const filteredAwards = F.awards.filter(a => a.t && a.y);
      const filteredCollabs = F.collabs.filter(col => col.p && col.l);
      const filteredLocalHubs = F.localHubs.filter(h => h.l && h.v);
      const filteredViral = F.viralContent.filter(v => v.views);
      const filteredCaseStudies = F.caseStudies.filter(cs => cs.title && cs.brand).map(cs => ({
        title: cs.title,
        brand: cs.brand,
        results: [
          { l: cs.r1_label || 'Reach', v: cs.r1_val || 'N/A' },
          { l: cs.r2_label || 'ROI', v: cs.r2_val || 'N/A' }
        ]
      }));

      const updatedProfile = { 
        ...c, 
        name: F.name,
        bio: F.bio,
        city: F.city,
        state: F.state,
        instagram: F.instagram,
        youtube: F.youtube,
        rateMin: F.rateMin,
        rateMax: F.rateMax,
        portfolio: F.portfolio,
        gallery: filteredGallery,
        full_story: {
          p1: F.storyP1,
          quote: F.storyQuote,
          p2: F.storyP2,
          p3: F.storyP3
        },
        awards: filteredAwards,
        collabs: filteredCollabs,
        milestones: filteredMilestones,
        services: filteredServices,
        viral_content: filteredViral,
        case_studies: filteredCaseStudies,
        philosophy: F.philosophy,
        ai_intel: F.aiMatch && F.aiSummary ? {
          match: F.aiMatch,
          summary: F.aiSummary,
          stats: [
            { l: 'Brand Safety', v: F.aiSafety || '99% Secure' },
            { l: 'Retention Score', v: F.aiRetention || 'Excellent' },
            { l: 'ROI Potential', v: F.aiRoi || '5.2x' }
          ]
        } : null,
        local_voice: F.localVoice,
        local_penetration: F.localPenetration,
        regional_dialects: F.regionalDialects,
        local_impact_hubs: filteredLocalHubs,
        local_collab: !!(F.localVoice || filteredLocalHubs.length > 0),
        email: st.user?.email,
        photo: c.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(F.name || st.user.name)}`
      };
      
      if (existingIdx !== -1) {
        allC[existingIdx] = updatedProfile;
      } else {
        allC.push({ ...updatedProfile, id: 'c-' + Date.now() });
      }
      LS.set('cb_creators', allC);
      
      // Auto complete profile status if all primary fields filled (including milestones and services)
      const isProfileDone = !!(
        F.name && 
        F.bio && 
        (F.instagram || F.youtube) && 
        F.rateMin &&
        F.storyP1 &&
        filteredMilestones.length > 0 &&
        filteredServices.length > 0
      );
      
      if (isProfileDone) {
        localStorage.setItem('cb_profile_completed', 'true');
      } else {
        localStorage.setItem('cb_profile_completed', 'false');
      }

      // Synchronize in the global app context
      dsp({ t: 'LOGIN', u: { ...st.user, creatorProfile: updatedProfile }, role: 'creator' });
      
      toast('Creator profile synchronized with Cloud!', 'success');
    }
  };

  const comp = c ? fmt.completeness(c) : { pct: 0, missing: [] };
  const score = c?.score || 85;

  return (
    <div className="dashboard-page-container">
      
      {/* Header */}
      <div className="db-page-header">
        <div className="badge-saffron">
           <Shield size={14} fill="#FF9431" /> SECURE CONSOLE
        </div>
        <h1 className="page-title">Profile Builder</h1>
        <p className="db-sub-text">Build your digital portfolio and unlock verified admin vetting status.</p>
      </div>

      <div className="db-main-grid">
         
         {/* Sidebar Progression */}
         {!mob ? (
            <div className="db-col-left">
               <Card className="settings-sidebar-card">
                  <div className="card-header-center">
                     <p className="db-sidebar-label">Identity Strength</p>
                     <div className="ring-container">
                        <Ring score={score} size={140} strokeWidth={12} color="#FF9431" />
                     </div>
                     <Bdg color="saffron" lg>Elite Creator</Bdg>
                  </div>

                  <div className="progress-box">
                     <div className="progress-labels">
                        <span className="label">Completion</span>
                        <span className="value">{comp.pct}%</span>
                     </div>
                     <Bar value={comp.pct} color="#FF9431" height={6} />
                  </div>

                  <div className="tasks-box" style={{ marginTop: 32 }}>
                     <StepNavItem id="identity" label="Basic Identity" icon={User} active={tab === 'identity'} completed={!!(F.name && F.bio)} onClick={() => setTab('identity')} />
                     <StepNavItem id="social" label="Social Ecosystem" icon={Globe} active={tab === 'social'} completed={!!(F.instagram || F.youtube || F.gallery.some(Boolean))} onClick={() => setTab('social')} />
                     <StepNavItem id="story" label="Journey Milestones" icon={BookOpen} active={tab === 'story'} completed={!!(F.storyP1 && F.milestones.some(m => m.t))} onClick={() => setTab('story')} />
                     <StepNavItem id="packages" label="Commercial Services" icon={Layers} active={tab === 'packages'} completed={!!(F.rateMin && F.services.some(s => s.t))} onClick={() => setTab('packages')} />
                     <StepNavItem id="local" label="Local Hub" icon={MapPin} active={tab === 'local'} completed={!!(F.localVoice || F.localHubs?.some(h => h.l))} onClick={() => setTab('local')} />
                     <StepNavItem id="security" label="Account Security" icon={Lock} active={tab === 'security'} completed={true} onClick={() => setTab('security')} />
                  </div>
               </Card>

               <Card className="promo-card-dark" style={{ marginTop: 24, padding: 32, background: '#0F172A', color: '#FFF', borderRadius: 32 }}>
                  <div className="promo-header" style={{ marginBottom: 16 }}>
                     <Sparkles size={18} color="#FF9431" fill="#FF9431" />
                     <span style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase' }}>Pro Checklist</span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                    Fill out all tabs including your Journey Milestones and Services to unlock the "Submit to Admin" badge on your dashboard!
                  </p>
               </Card>
            </div>
         ) : (
            <div className="settings-mobile-tabs-container" style={{ width: '100%', marginBottom: 20 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: '12px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>Consolidated Completion</span>
                  <span style={{ fontSize: '14px', fontWeight: 950, color: '#FF9431' }}>{comp.pct}%</span>
               </div>
               <Bar value={comp.pct} color="#FF9431" height={4} />

               {/* Swipeable Tab Selector row */}
               <div className="settings-mobile-scroll-row" style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '16px 0 4px', scrollbarWidth: 'none' }}>
                  <button onClick={() => setTab('identity')} style={{ flexShrink: 0, padding: '10px 16px', borderRadius: 100, border: tab === 'identity' ? '1px solid #FF9431' : '1px solid #e2e8f0', background: tab === 'identity' ? 'rgba(255,148,49,0.1)' : '#fff', color: tab === 'identity' ? '#FF9431' : '#64748b', fontSize: '13px', fontWeight: 800 }}>
                     Identity {!!(F.name && F.bio) && '✓'}
                  </button>
                  <button onClick={() => setTab('social')} style={{ flexShrink: 0, padding: '10px 16px', borderRadius: 100, border: tab === 'social' ? '1px solid #FF9431' : '1px solid #e2e8f0', background: tab === 'social' ? 'rgba(255,148,49,0.1)' : '#fff', color: tab === 'social' ? '#FF9431' : '#64748b', fontSize: '13px', fontWeight: 800 }}>
                     Socials {!!(F.instagram || F.youtube || F.gallery.some(Boolean)) && '✓'}
                  </button>
                  <button onClick={() => setTab('story')} style={{ flexShrink: 0, padding: '10px 16px', borderRadius: 100, border: tab === 'story' ? '1px solid #FF9431' : '1px solid #e2e8f0', background: tab === 'story' ? 'rgba(255,148,49,0.1)' : '#fff', color: tab === 'story' ? '#FF9431' : '#64748b', fontSize: '13px', fontWeight: 800 }}>
                     Story {!!(F.storyP1 && F.milestones.some(m => m.t)) && '✓'}
                  </button>
                  <button onClick={() => setTab('packages')} style={{ flexShrink: 0, padding: '10px 16px', borderRadius: 100, border: tab === 'packages' ? '1px solid #FF9431' : '1px solid #e2e8f0', background: tab === 'packages' ? 'rgba(255,148,49,0.1)' : '#fff', color: tab === 'packages' ? '#FF9431' : '#64748b', fontSize: '13px', fontWeight: 800 }}>
                     Packages {!!(F.rateMin && F.services.some(s => s.t)) && '✓'}
                  </button>
                  <button onClick={() => setTab('local')} style={{ flexShrink: 0, padding: '10px 16px', borderRadius: 100, border: tab === 'local' ? '1px solid #FF9431' : '1px solid #e2e8f0', background: tab === 'local' ? 'rgba(255,148,49,0.1)' : '#fff', color: tab === 'local' ? '#FF9431' : '#64748b', fontSize: '13px', fontWeight: 800 }}>
                     Local Hub {!!(F.localVoice || F.localHubs?.some(h => h.l)) && '✓'}
                  </button>
                  <button onClick={() => setTab('security')} style={{ flexShrink: 0, padding: '10px 16px', borderRadius: 100, border: tab === 'security' ? '1px solid #FF9431' : '1px solid #e2e8f0', background: tab === 'security' ? 'rgba(255,148,49,0.1)' : '#fff', color: tab === 'security' ? '#FF9431' : '#64748b', fontSize: '13px', fontWeight: 800 }}>
                     Security ✓
                  </button>
               </div>
            </div>
         )}

         {/* Form Area */}
         <div className="db-col-right">
            <AnimatePresence mode="wait">
               
               {/* 1. Basic Identity Tab */}
               {tab === 'identity' && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="identity">
                   <Card className="settings-form-card">
                      <h3 className="db-section-title">Step 1: Personal Identity</h3>
                      
                      <div className="profile-visual-box">
                         <div className="avatar-preview-wrap">
                            <img src={c?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(st.user.name)}`} alt="" />
                         </div>
                         <div className="visual-actions">
                            <button className="btn-primary-pill">
                               <Camera size={14} /> Update Visual
                            </button>
                            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', fontWeight: 600 }}>JPEG/PNG up to 2MB allowed.</p>
                         </div>
                      </div>

                      <div className="form-stack">
                         <Fld label="Full Name" value={F.name} onChange={e => upF('name', e.target.value)} placeholder="Amit Sharma" />
                         <Fld label="Cinematic Bio" value={F.bio} onChange={e => upF('bio', e.target.value)} rows={4} placeholder="I create high-impact tech reviews for regional India..." />
                         <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px' }}>
                            <Fld label="Base City" value={F.city} onChange={e => upF('city', e.target.value)} placeholder="Jaipur" />
                            <Fld label="State / Region" value={F.state} onChange={e => upF('state', e.target.value)} placeholder="Rajasthan" />
                         </div>
                         
                         <div style={{ marginTop: '24px', borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
                            <p style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', marginBottom: 16, textTransform: 'uppercase' }}>Content Philosophy & Brand-Fit Intel</p>
                            <Fld label="Mera Content Philosophy (The 'Why')" value={F.philosophy} onChange={e => upF('philosophy', e.target.value)} rows={3} placeholder="Content creation isn't just about demonstrating silicon specifications or horsepower; it's about building a desire..." />
                            
                            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px', marginTop: '16px' }}>
                               <Fld label="AI Brand-Fit Match %" value={F.aiMatch} onChange={e => upF('aiMatch', e.target.value)} placeholder="98%" />
                               <Fld label="Why You Fit Brands (Summary)" value={F.aiSummary} onChange={e => upF('aiSummary', e.target.value)} placeholder="Vibrant Cinematic Editing, Luxury Niche Authority, and High Conversion ROI Potential" />
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '16px', marginTop: '16px' }}>
                               <Fld label="Brand Safety" value={F.aiSafety} onChange={e => upF('aiSafety', e.target.value)} placeholder="99% Secure" />
                               <Fld label="Retention Score" value={F.aiRetention} onChange={e => upF('aiRetention', e.target.value)} placeholder="Excellent" />
                               <Fld label="ROI Potential" value={F.aiRoi} onChange={e => upF('aiRoi', e.target.value)} placeholder="5.2x" />
                            </div>
                         </div>
                      </div>

                      <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'flex-end' }}>
                         <Btn lg className="btn-primary-pill" style={{ height: 'auto', padding: '16px 48px' }} onClick={saveProfile}>Save Identity</Btn>
                      </div>
                   </Card>
                 </motion.div>
               )}

               {/* 2. Social Ecosystem & Gallery Tab */}
               {tab === 'social' && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="social">
                   <Card className="settings-form-card">
                      <h3 className="db-section-title">Step 2: Social Ecosystem & Gallery</h3>
                      <p className="db-sub-text" style={{ marginBottom: 40 }}>Link your active social channels and showcase your past brand visuals in the image gallery.</p>
                      
                      <div className="form-stack">
                         <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px' }}>
                            <Fld label="Instagram Profile Handle" value={F.instagram} onChange={e => upF('instagram', e.target.value)} placeholder="@username" />
                            <Fld label="YouTube Channel Link" value={F.youtube} onChange={e => upF('youtube', e.target.value)} placeholder="https://youtube.com/c/..." />
                         </div>
                         <Fld label="Portfolio / Website URL" value={F.portfolio} onChange={e => upF('portfolio', e.target.value)} placeholder="https://mywork.com" />
                         
                         <div style={{ marginTop: 24 }}>
                            <p style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', marginBottom: 16, textTransform: 'uppercase' }}>Gallery Portfolio Links (Up to 4)</p>
                            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 16 }}>
                               {[0, 1, 2, 3].map(idx => (
                                 <Fld 
                                   key={idx}
                                   label={`Portfolio Image URL ${idx + 1}`} 
                                   value={F.gallery[idx]} 
                                   onChange={e => upGallery(idx, e.target.value)} 
                                   placeholder="https://images.unsplash.com/..." 
                                 />
                               ))}
                            </div>
                         </div>
                      </div>

                      <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <button onClick={() => setTab('identity')} className="btn-text-slate">Previous Step</button>
                         <Btn lg className="btn-primary-pill" style={{ height: 'auto', padding: '16px 48px' }} onClick={saveProfile}>Sync Social Hub</Btn>
                      </div>
                   </Card>
                 </motion.div>
               )}

               {/* 3. Journey Milestones Tab */}
               {tab === 'story' && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="story">
                   <Card className="settings-form-card">
                      <h3 className="db-section-title">Step 3: Journey Milestones & Bio</h3>
                      <p className="db-sub-text" style={{ marginBottom: 40 }}>Write your rich biography paragraphs and declare up to 4 historical milestones to construct your My Story tab.</p>
                      
                      <div className="form-stack">
                         <Fld label="Biography Intro Paragraph" value={F.storyP1} onChange={e => upF('storyP1', e.target.value)} rows={3} placeholder="Mera safar Hapur ki galiyon se shuru hua jahan..." />
                         <Fld label="Featured Dynamic Quote" value={F.storyQuote} onChange={e => upF('storyQuote', e.target.value)} placeholder="Content is a connection that touches hearts." />
                         <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px' }}>
                            <Fld label="Biography Middle Paragraph" value={F.storyP2} onChange={e => upF('storyP2', e.target.value)} rows={3} placeholder="Shuruat mein mere paas sirf ek camera aur sapna tha..." />
                            <Fld label="Biography Conclusion Paragraph" value={F.storyP3} onChange={e => upF('storyP3', e.target.value)} rows={3} placeholder="Aaj scale karte hue, Bharat ki regional voice banana agla aim hai..." />
                         </div>

                         <div style={{ marginTop: 32 }}>
                            <p style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', marginBottom: 16, textTransform: 'uppercase' }}>Key Achievements & Awards (Up to 3)</p>
                            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
                               {[0, 1, 2].map(idx => {
                                 const award = F.awards[idx] || { t: '', o: '', y: '' };
                                 return (
                                   <div key={idx} style={{ padding: 20, background: '#f8fafc', borderRadius: 16, border: '1px solid #f1f5f9' }}>
                                      <Fld label={`Award Title ${idx + 1}`} value={award.t} onChange={e => upAward(idx, 't', e.target.value)} placeholder="Youth Icon Award" />
                                      <Fld label="Issuer Organization" value={award.o} onChange={e => upAward(idx, 'o', e.target.value)} placeholder="Govt of Rajasthan" style={{ marginTop: 8 }} />
                                      <Fld label="Year" value={award.y} onChange={e => upAward(idx, 'y', e.target.value)} placeholder="2024" style={{ marginTop: 8 }} />
                                   </div>
                                 );
                               })}
                            </div>
                         </div>

                         <div style={{ marginTop: 32 }}>
                            <p style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', marginBottom: 16, textTransform: 'uppercase' }}>Elite Partnerships & Public Collaborations (Up to 3)</p>
                            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
                               {[0, 1, 2].map(idx => {
                                 const collab = F.collabs[idx] || { p: '', l: '', d: '' };
                                 return (
                                   <div key={idx} style={{ padding: 20, background: '#f8fafc', borderRadius: 16, border: '1px solid #f1f5f9' }}>
                                      <Fld label={`Partner/Org Name ${idx + 1}`} value={collab.p} onChange={e => upCollab(idx, 'p', e.target.value)} placeholder="Rajasthan Tourism Govt" />
                                      <Fld label="Collab Type / Label" value={collab.l} onChange={e => upCollab(idx, 'l', e.target.value)} placeholder="Government Partner" style={{ marginTop: 8 }} />
                                      <Fld label="Highlight Description" value={collab.d} onChange={e => upCollab(idx, 'd', e.target.value)} placeholder="Official campaign promoting local heritage." style={{ marginTop: 8 }} />
                                   </div>
                                 );
                               })}
                            </div>
                         </div>

                         <div style={{ marginTop: 32 }}>
                            <p style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', marginBottom: 16, textTransform: 'uppercase' }}>Creator Journey Timeline (4 Milestones)</p>
                            
                            {F.milestones.map((m, idx) => (
                              <div key={idx} style={{ padding: 20, background: '#f8fafc', borderRadius: 16, border: '1px solid #f1f5f9', marginBottom: 16 }}>
                                 <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 16, marginBottom: 12 }}>
                                    <Fld label="Year" value={m.y} onChange={e => upMilestone(idx, 'y', e.target.value)} placeholder="2022" />
                                    <Fld label="Chapter Title" value={m.t} onChange={e => upMilestone(idx, 't', e.target.value)} placeholder="First Viral Short" />
                                 </div>
                                 <Fld label="Chapter Details" value={m.d} onChange={e => upMilestone(idx, 'd', e.target.value)} placeholder="Crossed 100K views by highlighting regional monuments..." />
                              </div>
                            ))}
                         </div>
                      </div>

                      <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <button onClick={() => setTab('social')} className="btn-text-slate">Previous Step</button>
                         <Btn lg className="btn-primary-pill" style={{ height: 'auto', padding: '16px 48px' }} onClick={saveProfile}>Sync Journey Chapters</Btn>
                      </div>
                   </Card>
                 </motion.div>
               )}

               {/* 4. Commercial Services Tab */}
               {tab === 'packages' && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="packages">
                   <Card className="settings-form-card">
                      <h3 className="db-section-title">Step 4: Commercial Deliverables</h3>
                      <p className="db-sub-text" style={{ marginBottom: 40 }}>Define your rate range and custom sponsorship deliverables packages to feed your public Rate Kits.</p>
                      
                      <div className="form-stack">
                         <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px', marginBottom: 24 }}>
                            <Fld label="Reel Minimum Rate (₹)" type="number" value={F.rateMin} onChange={e => upF('rateMin', e.target.value)} placeholder="8,000" />
                            <Fld label="Reel Maximum Rate (₹)" type="number" value={F.rateMax} onChange={e => upF('rateMax', e.target.value)} placeholder="25,000" />
                         </div>

                         <div>
                            <p style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', marginBottom: 16, textTransform: 'uppercase' }}>Professional Service Deliverables (3 Packages)</p>
                            
                            {F.services.map((s, idx) => (
                              <div key={idx} style={{ padding: 20, background: '#f8fafc', borderRadius: 16, border: '1px solid #f1f5f9', marginBottom: 16 }}>
                                 <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 150px', gap: 16, marginBottom: 12 }}>
                                    <Fld label="Package Deliverable Title" value={s.t} onChange={e => upService(idx, 't', e.target.value)} placeholder="Cinematic Storytelling" />
                                    <Fld label="Deliverable Rate (₹)" type="number" value={s.rate} onChange={e => upService(idx, 'rate', e.target.value)} placeholder="12000" />
                                 </div>
                                 <Fld label="Package Description & Inclusions" value={s.d} onChange={e => upService(idx, 'd', e.target.value)} placeholder="4K dynamic reel editing, color grading, and native scripting." />
                              </div>
                            ))}
                         </div>

                         <div style={{ marginTop: 32 }}>
                            <p style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', marginBottom: 16, textTransform: 'uppercase' }}>Viral Content Hits (Up to 3 Reels/Videos)</p>
                            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
                               {[0, 1, 2].map(idx => {
                                 const viral = F.viralContent[idx] || { views: '', img: '' };
                                 return (
                                   <div key={idx} style={{ padding: 20, background: '#f8fafc', borderRadius: 16, border: '1px solid #f1f5f9' }}>
                                      <Fld label={`Video ${idx + 1} Views`} value={viral.views} onChange={e => upViralContent(idx, 'views', e.target.value)} placeholder="1.2M" />
                                      <Fld label="Cover Image URL" value={viral.img} onChange={e => upViralContent(idx, 'img', e.target.value)} placeholder="https://images.unsplash.com/..." style={{ marginTop: 8 }} />
                                   </div>
                                 );
                               })}
                            </div>
                         </div>

                         <div style={{ marginTop: 32 }}>
                            <p style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', marginBottom: 16, textTransform: 'uppercase' }}>Brand Case Studies (Up to 3 Collaborations)</p>
                            
                            {F.caseStudies.map((cs, idx) => (
                              <div key={idx} style={{ padding: 20, background: '#f8fafc', borderRadius: 16, border: '1px solid #f1f5f9', marginBottom: 16 }}>
                                 <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 12 }}>
                                    <Fld label="Campaign/Collab Title" value={cs.title} onChange={e => upCaseStudy(idx, 'title', e.target.value)} placeholder="Jaipur Heritage Launch" />
                                    <Fld label="Brand Name" value={cs.brand} onChange={e => upCaseStudy(idx, 'brand', e.target.value)} placeholder="OYO Rooms" />
                                 </div>
                                 <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(4, 1fr)', gap: 12 }}>
                                    <Fld label="Metric 1 Label" value={cs.r1_label} onChange={e => upCaseStudy(idx, 'r1_label', e.target.value)} placeholder="Reach" />
                                    <Fld label="Metric 1 Value" value={cs.r1_val} onChange={e => upCaseStudy(idx, 'r1_val', e.target.value)} placeholder="2.1M" />
                                    <Fld label="Metric 2 Label" value={cs.r2_label} onChange={e => upCaseStudy(idx, 'r2_label', e.target.value)} placeholder="ROI" />
                                    <Fld label="Metric 2 Value" value={cs.r2_val} onChange={e => upCaseStudy(idx, 'r2_val', e.target.value)} placeholder="4.2x" />
                                 </div>
                              </div>
                            ))}
                         </div>
                      </div>

                      <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <button onClick={() => setTab('story')} className="btn-text-slate">Previous Step</button>
                         <Btn lg className="btn-primary-pill" style={{ height: 'auto', padding: '16px 48px' }} onClick={saveProfile}>Sync Deliverables</Btn>
                      </div>
                   </Card>
                 </motion.div>
               )}

               {/* 5. Local Hub Tab */}
                {tab === 'local' && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="local">
                    <Card className="settings-form-card">
                       <h3 className="db-section-title">Step 5: Local Collab Hub</h3>
                       <p className="db-sub-text" style={{ marginBottom: 40 }}>Define your regional dialects, active local hubs, and regional voice statement to attract hyper-local sponsorships.</p>
                       
                       <div className="form-stack">
                          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px', marginBottom: 24 }}>
                             <Fld label="Regional Dialects / Languages" value={F.regionalDialects} onChange={e => upF('regionalDialects', e.target.value)} placeholder="Bhojpuri, Marwari, Hinglish" />
                             <Fld label="Local Market Penetration %" value={F.localPenetration} onChange={e => upF('localPenetration', e.target.value)} placeholder="85%" />
                          </div>

                          <Fld label="Vocal for Local / Regional Voice Statement" value={F.localVoice} onChange={e => upF('localVoice', e.target.value)} type="textarea" rows={3} placeholder="Main local brands aur startups ko support karne ke liye hamesha ready hoon..." />

                          <div style={{ marginTop: 32 }}>
                             <p style={{ fontSize: 13, fontWeight: 900, color: '#FF9431', marginBottom: 16, textTransform: 'uppercase' }}>Active Local Hubs & Reach (Up to 3 Cities)</p>
                             <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
                                {[0, 1, 2].map(idx => {
                                  const hub = F.localHubs[idx] || { l: '', v: '' };
                                  return (
                                    <div key={idx} style={{ padding: 20, background: '#f8fafc', borderRadius: 16, border: '1px solid #f1f5f9' }}>
                                       <Fld label={`Hub City ${idx + 1}`} value={hub.l} onChange={e => upLocalHub(idx, 'l', e.target.value)} placeholder={idx === 0 ? 'Indore' : idx === 1 ? 'Bhopal' : 'Ujjain'} />
                                       <Fld label="Hub Reach / Engagement %" value={hub.v} onChange={e => upLocalHub(idx, 'v', e.target.value)} placeholder={idx === 0 ? '85%' : idx === 1 ? '72%' : '64%'} style={{ marginTop: 8 }} />
                                    </div>
                                  );
                                })}
                             </div>
                          </div>
                       </div>

                       <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <button onClick={() => setTab('packages')} className="btn-text-slate">Previous Step</button>
                          <Btn lg className="btn-primary-pill" style={{ height: 'auto', padding: '16px 48px' }} onClick={saveProfile}>Sync Local Hub</Btn>
                       </div>
                    </Card>
                  </motion.div>
                )}

                {/* 5. Security Tab */}
               {tab === 'security' && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="security">
                   <Card className="settings-form-card">
                      <h3 className="db-section-title">Account Security</h3>
                      
                      <div style={{ marginBottom: '40px' }}>
                         <p className="db-sidebar-label" style={{ marginBottom: 12 }}>Verified Credentials</p>
                         <div className="activity-item" style={{ padding: '20px 24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                               <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{st.user.email}</div>
                               <div style={{ fontSize: '12px', color: '#10B981', fontWeight: 800, marginTop: '4px' }}>Primary Verification Email</div>
                            </div>
                            <CheckCircle2 size={24} color="#10B981" />
                         </div>
                      </div>

                      <div style={{ padding: '32px', background: '#FEF2F2', borderRadius: '32px', border: '1px solid #FECACA' }}>
                         <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#991B1B', marginBottom: '8px' }}>Danger Zone</h4>
                         <p style={{ fontSize: '14px', color: '#B91C1C', marginBottom: '24px', lineHeight: 1.5 }}>
                            Permanently delete your identity, media kit, and application history from CreatorBharat. This action is irreversible.
                         </p>
                         <button className="btn-danger-lite">
                            TERMINATE IDENTITY
                         </button>
                      </div>
                   </Card>
                 </motion.div>
               )}
            </AnimatePresence>
         </div>

      </div>
    </div>
  );
}
