import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../core/context';
import { LS, fmt } from '../../utils/helpers';
import { Btn, Card, Bdg, Bar, Empty } from '../../components/common/Primitives';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  ExternalLink, 
  TrendingUp, 
  Users, 
  Zap, 
  Briefcase, 
  ChevronRight,
  Wallet,
  Star,
  CheckCircle,
  Clock,
  Sparkles,
  Lock,
  ArrowRight,
  Award,
  Globe,
  Settings,
  ChevronLeft,
  Check,
  MapPin
} from 'lucide-react';

// Walkthrough Slide Component
const WalkthroughSlide = ({ title, description, icon: Icon, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    className="walkthrough-slide-content"
  >
    <div className="slide-icon-box" style={{ background: color + '15', color: color }}>
      <Icon size={44} className="slide-icon-animate" />
    </div>
    <h3 className="slide-title">{title}</h3>
    <p className="slide-desc">{description}</p>
  </motion.div>
);

WalkthroughSlide.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.string.isRequired
};

const StatCard = ({ label, value, trend, icon: Icon, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="db-stat-card"
  >
    <div className="db-stat-trend">
       {trend} <TrendingUp size={12} />
     </div>
    <div className="db-stat-icon-box" style={{ background: color + '10', color: color }}>
       <Icon size={20} />
    </div>
    <div className="db-stat-value">{value}</div>
    <div className="db-stat-label">{label}</div>
  </motion.div>
);

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  trend: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.string.isRequired,
  delay: PropTypes.number
};

const MatchingCampaign = ({ title, brand, budget, delay = 0, isLocked = false }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className={`db-campaign-card ${isLocked ? 'card-blur-lock' : ''}`}
    whileHover={isLocked ? {} : { y: -5, borderColor: '#FF9431' }}
  >
    {isLocked && (
      <div className="card-lock-overlay">
        <Lock size={18} />
        <span>Locked</span>
      </div>
    )}
    <div className="tag-saffron-sm">NEW MATCH</div>
    <h4 className="title-sm">{title}</h4>
    <p className="sub-sm">by {brand}</p>
    <div className="card-footer-flex">
       <div className="budget-text">₹{budget}</div>
       <Btn sm variant="ghost" disabled={isLocked}>Apply Now</Btn>
    </div>
  </motion.div>
);

MatchingCampaign.propTypes = {
  title: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  budget: PropTypes.string.isRequired,
  delay: PropTypes.number,
  isLocked: PropTypes.bool
};

const WelcomeOverlay = ({ welcomeSeen, activeSlide, slides, handlePrevSlide, handleNextSlide }) => {
  if (welcomeSeen) return null;
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="welcome-carousel-overlay"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="welcome-card-box"
      >
        {/* Stepper Dots */}
        <div className="carousel-stepper">
          {slides.map((slide) => (
            <div key={slide.title} className={`step-dot ${activeSlide === slide.index ? 'active' : ''}`} />
          ))}
        </div>

        {/* Slider Viewport */}
        <div className="slide-container-wrap">
          <AnimatePresence mode="wait">
            <WalkthroughSlide 
              key={activeSlide}
              title={slides[activeSlide].title}
              description={slides[activeSlide].description}
              icon={slides[activeSlide].icon}
              color={slides[activeSlide].color}
            />
          </AnimatePresence>
        </div>

        {/* Footer Controls */}
        <div className="welcome-card-footer">
          {activeSlide > 0 ? (
            <button onClick={handlePrevSlide} className="btn-slide-back">
              <ChevronLeft size={16} /> Back
            </button>
          ) : (
            <div />
          )}
          
          <Btn 
            onClick={handleNextSlide} 
            style={{ background: '#111827', color: '#fff', borderRadius: 12, padding: '10px 24px', fontWeight: 800 }}
          >
            {activeSlide === slides.length - 1 ? 'Get Started' : 'Next'} <ArrowRight size={16} style={{ marginLeft: 6 }} />
          </Btn>
        </div>
      </motion.div>
    </motion.div>
  );
};

WelcomeOverlay.propTypes = {
  welcomeSeen: PropTypes.bool.isRequired,
  activeSlide: PropTypes.number.isRequired,
  slides: PropTypes.arrayOf(PropTypes.object).isRequired,
  handlePrevSlide: PropTypes.func.isRequired,
  handleNextSlide: PropTypes.func.isRequired
};

const StatusAlertBanners = ({ 
  profileCompleted, 
  verificationStatus, 
  totalSystemUsers, 
  loadingPayment, 
  handleFreeSubmit, 
  handleMockPayment, 
  navigate 
}) => {
  if (!profileCompleted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="state-alert-banner warning-glow"
      >
        <div className="alert-content-left">
          <div className="alert-icon saffron-bg-alert">
            <Star size={18} fill="#FF9431" />
          </div>
          <div>
            <h4 className="alert-heading">Complete Your Digital Portfolio Hub!</h4>
            <p className="alert-desc">Your milestones, story paragraphs, and commercial rate cards are incomplete. Fill them to unlock admin submissions.</p>
          </div>
        </div>
        <button onClick={() => navigate('/settings')} className="alert-action-btn saffron-btn">
          Setup Portfolio Builder <ChevronRight size={16} />
        </button>
      </motion.div>
    );
  }

  if (verificationStatus === 'DRAFT') {
    if (totalSystemUsers < 100) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="state-alert-banner success-glow"
        >
          <div className="alert-content-left">
            <div className="alert-icon emerald-bg-alert animate-bounce">
              <Award size={18} />
            </div>
            <div>
              <h4 className="alert-heading" style={{ color: '#10B981' }}>👑 Early Launch Offer: ₹199 Verification Waived!</h4>
              <p className="alert-desc">All requirements checked! Click below to submit your verified creator identity to the admin board for free!</p>
            </div>
          </div>
          <button onClick={handleFreeSubmit} className="alert-action-btn emerald-btn">
            Submit to Admin Vetting <ChevronRight size={16} />
          </button>
        </motion.div>
      );
    }

    return (
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="state-alert-banner warning-glow"
      >
        <div className="alert-content-left">
          <div className="alert-icon saffron-bg-alert">
            <Lock size={18} />
          </div>
          <div>
            <h4 className="alert-heading">Lock Verified Identity & Unlock Campaigns</h4>
            <p className="alert-desc">Pay the premium identity vetting fee to submit your profile for admin verification and listing.</p>
          </div>
        </div>
        <button 
          onClick={handleMockPayment} 
          disabled={loadingPayment}
          className="alert-action-btn saffron-btn"
        >
          {loadingPayment ? 'Processing...' : 'Pay ₹199 & Submit'} <ChevronRight size={16} />
        </button>
      </motion.div>
    );
  }

  if (verificationStatus === 'PENDING_APPROVAL') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="state-alert-banner info-glow"
      >
        <div className="alert-content-left">
          <div className="alert-icon blue-bg-alert pulse-animation">
            <Clock size={18} />
          </div>
          <div>
            <h4 className="alert-heading">Profile Vetting in Progress</h4>
            <p className="alert-desc">Our content audit panel is validating your account metrics. Average processing time: 2 hours.</p>
          </div>
        </div>
        <div className="alert-badge-processing">UNDER REVIEW</div>
      </motion.div>
    );
  }

  if (verificationStatus === 'APPROVED') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="state-alert-banner success-glow"
      >
        <div className="alert-content-left">
          <div className="alert-icon emerald-bg-alert">
            <CheckCircle size={18} />
          </div>
          <div>
            <h4 className="alert-heading" style={{ color: '#10B981' }}>Verified Identity Badge Active!</h4>
            <p className="alert-desc">Your portfolio is public, optimized for SEO, and fully enabled for brand bids and escrow collaborations.</p>
          </div>
        </div>
        <div className="verified-success-stamp">ACTIVE VERIFIED</div>
      </motion.div>
    );
  }

  return null;
};

StatusAlertBanners.propTypes = {
  profileCompleted: PropTypes.bool.isRequired,
  verificationStatus: PropTypes.string.isRequired,
  totalSystemUsers: PropTypes.number.isRequired,
  loadingPayment: PropTypes.bool.isRequired,
  handleFreeSubmit: PropTypes.func.isRequired,
  handleMockPayment: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired
};

const CheckboxItem = ({ checked, label, desc }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
     <div style={{ width: 24, height: 24, borderRadius: '50%', background: checked ? 'rgba(16,185,129,0.1)' : 'rgba(241,245,249,1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: checked ? '#10B981' : '#94a3b8' }}>
        {checked ? <Check size={14} strokeWidth={3} /> : <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#94a3b8' }} />}
     </div>
     <div>
        <span style={{ fontSize: 14, fontWeight: 700, color: checked ? '#0f172a' : '#64748b' }}>{label}</span>
        <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>{desc}</p>
     </div>
  </div>
);

CheckboxItem.propTypes = {
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired
};

const DraftComplianceTracker = ({ hasIdentity, hasSocials, hasStory, hasServices, allChecksComplete, handleFreeSubmit, navigate }) => {
  return (
    <Card className="profile-strength-card" style={{ padding: 28 }}>
       <h3 style={{ fontSize: 18, fontWeight: 900, color: '#0f172a', marginBottom: 6 }}>Portfolio Vetting Checklist</h3>
       <p style={{ fontSize: 13, color: '#64748b', fontWeight: 500, marginBottom: 24 }}>Complete these essential metrics to launch your public page.</p>
       
       <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <CheckboxItem checked={hasIdentity} label="Basic Identity & Bio" desc="Full name and detailed bio setup" />
          <CheckboxItem checked={hasSocials} label="Social Ecosystem handles" desc="YouTube or Instagram handles linked" />
          <CheckboxItem checked={hasStory} label="Biography & Story chapters" desc="Chapters of milestones configured" />
          <CheckboxItem checked={hasServices} label="Commercial Rate packages" desc="Configure at least 1 custom deliverable" />
       </div>

       {allChecksComplete ? (
         <Btn lg className="payout-confirm-btn animate-pulse" style={{ marginTop: 28, width: '100%', background: '#FF9431', color: '#fff' }} onClick={handleFreeSubmit}>
            SUBMIT TO ADMIN FOR FREE AUDIT!
         </Btn>
       ) : (
         <Btn lg className="payout-confirm-btn" style={{ marginTop: 28, width: '100%', background: '#0f172a', color: '#fff' }} onClick={() => navigate('/settings')}>
           Build Missing Portfolio Sections
         </Btn>
       )}
    </Card>
  );
};

DraftComplianceTracker.propTypes = {
  hasIdentity: PropTypes.bool.isRequired,
  hasSocials: PropTypes.bool.isRequired,
  hasStory: PropTypes.bool.isRequired,
  hasServices: PropTypes.bool.isRequired,
  allChecksComplete: PropTypes.bool.isRequired,
  handleFreeSubmit: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired
};

const TimelineStep = ({ completed, active, title, desc, icon: Icon }) => {
  const getBadgeBg = () => {
    if (completed) return '#10B981';
    if (active) return '#3B82F6';
    return '#cbd5e1';
  };
  
  return (
    <div style={{ display: 'flex', gap: 16, position: 'relative', zIndex: 1, opacity: (!completed && !active) ? 0.5 : 1 }}>
       <div 
         style={{ 
           width: 18, 
           height: 18, 
           borderRadius: '50%', 
           background: getBadgeBg(), 
           display: 'flex', 
           alignItems: 'center', 
           justifyContent: 'center', 
           color: '#fff',
           boxShadow: active ? '0 0 12px rgba(59,130,246,0.5)' : 'none'
         }} 
         className={active ? 'pulse-animation' : ''}
       >
          {completed ? <Check size={10} strokeWidth={3} /> : <Icon size={10} />}
       </div>
       <div>
          <h5 style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', margin: 0 }}>{title}</h5>
          <p style={{ fontSize: 12, color: active ? '#3B82F6' : '#64748b', fontWeight: active ? 600 : 400, marginTop: 4, margin: 0 }}>{desc}</p>
       </div>
    </div>
  );
};

TimelineStep.propTypes = {
  completed: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired
};

const PendingComplianceTracker = () => {
  return (
    <Card className="profile-strength-card" style={{ padding: 28 }}>
       <h3 style={{ fontSize: 18, fontWeight: 900, color: '#0f172a', marginBottom: 6 }}>Verification Progress Tracker</h3>
       <p style={{ fontSize: 13, color: '#64748b', fontWeight: 500, marginBottom: 24 }}>Your live application is currently moving through the editorial queue.</p>
       
       <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'relative', paddingLeft: 12 }}>
          <div style={{ position: 'absolute', left: 20, top: 8, bottom: 8, width: 2, background: '#e2e8f0' }} />
          
          <TimelineStep completed={true} active={false} title="Step 1: Portfolio Hydration Completed" desc="4 tabs of story milestone and brand deliverables connected successfully." icon={Check} />
          <TimelineStep completed={true} active={false} title="Step 2: Early Wave Freemium Waived" desc="Vetting fee of ₹199 waived. Registered as early pioneer creator." icon={Check} />
          <TimelineStep completed={false} active={true} title="Step 3: Manual Compliance Audit" desc="Editorial vetting board validating social statistics. Estimated wait: 2 hours." icon={Clock} />
          <TimelineStep completed={false} active={false} title="Step 4: Elite Creator Badge Activated" desc="Your profile is certified on Bharat Marketplace catalog." icon={Star} />
       </div>
    </Card>
  );
};

const ApprovedComplianceTracker = () => {
  return (
    <Card className="profile-strength-card" style={{ padding: 28 }}>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 900, color: '#0f172a', margin: 0 }}>Audience Demographics</h3>
          <Bdg color="green">Live API</Bdg>
       </div>
       
       <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 800, color: '#475569', marginBottom: 6 }}>
                <span>Age 18 - 24 years</span>
                <span style={{ color: '#FF9431' }}>65%</span>
             </div>
             <Bar value={65} color="#FF9431" height={8} />
          </div>

          <div>
             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 800, color: '#475569', marginBottom: 6 }}>
                <span>Age 25 - 34 years</span>
                <span style={{ color: '#7C3AED' }}>25%</span>
             </div>
             <Bar value={25} color="#7C3AED" height={8} />
          </div>

          <div>
             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 800, color: '#475569', marginBottom: 6 }}>
                <span>Age 35+ years</span>
                <span style={{ color: '#0ea5e9' }}>10%</span>
             </div>
             <Bar value={10} color="#0ea5e9" height={8} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 12, padding: 16, background: '#f8fafc', borderRadius: 16, border: '1px solid #f1f5f9' }}>
             <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 950, color: '#FF9431' }}>4.8%</div>
                <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700 }}>ENGAGEMENT</span>
             </div>
             <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 950, color: '#10B981' }}>92%</div>
                <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700 }}>POSITIVE SENTIMENT</span>
             </div>
          </div>
       </div>
    </Card>
  );
};

const ComplianceTracker = ({ 
  verificationStatus, 
  hasIdentity, 
  hasSocials, 
  hasStory, 
  hasServices, 
  allChecksComplete, 
  handleFreeSubmit, 
  navigate 
}) => {
  if (verificationStatus === 'DRAFT') {
    return (
      <DraftComplianceTracker 
        hasIdentity={hasIdentity} 
        hasSocials={hasSocials} 
        hasStory={hasStory} 
        hasServices={hasServices} 
        allChecksComplete={allChecksComplete} 
        handleFreeSubmit={handleFreeSubmit} 
        navigate={navigate} 
      />
    );
  }
  if (verificationStatus === 'PENDING_APPROVAL') {
    return <PendingComplianceTracker />;
  }
  return <ApprovedComplianceTracker />;
};

ComplianceTracker.propTypes = {
  verificationStatus: PropTypes.string.isRequired,
  hasIdentity: PropTypes.bool.isRequired,
  hasSocials: PropTypes.bool.isRequired,
  hasStory: PropTypes.bool.isRequired,
  hasServices: PropTypes.bool.isRequired,
  allChecksComplete: PropTypes.bool.isRequired,
  handleFreeSubmit: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired
};

const DeveloperAdminController = ({ 
  profileCompleted, 
  verificationStatus, 
  updateProfileComplete, 
  updateVerification, 
  handleResetAll 
}) => {
  return (
    <div className="dev-admin-controller-bar">
       <div className="dev-control-title">
         <Settings size={14} className="spin-slow" /> Dev State Controller
       </div>
       <div className="dev-btn-stack">
         <button 
           onClick={() => { updateProfileComplete(false); updateVerification('DRAFT'); }}
           className={`dev-btn ${profileCompleted ? '' : 'active'}`}
         >
           1. Incomplete Profile
         </button>
         <button 
           onClick={() => { updateProfileComplete(true); updateVerification('DRAFT'); }}
           className={`dev-btn ${profileCompleted && verificationStatus === 'DRAFT' ? 'active' : ''}`}
         >
           2. Setup Complete (Pending Submit)
         </button>
         <button 
           onClick={() => { updateProfileComplete(true); updateVerification('PENDING_APPROVAL'); }}
           className={`dev-btn ${verificationStatus === 'PENDING_APPROVAL' ? 'active' : ''}`}
         >
           3. Review Queue
         </button>
         <button 
           onClick={() => { updateProfileComplete(true); updateVerification('APPROVED'); }}
           className={`dev-btn ${verificationStatus === 'APPROVED' ? 'active' : ''}`}
         >
           4. Approved (Verified⭐)
         </button>
         <button onClick={handleResetAll} className="dev-btn dev-reset">
           Reset Onboarding Walkthrough
         </button>
       </div>
    </div>
  );
};

DeveloperAdminController.propTypes = {
  profileCompleted: PropTypes.bool.isRequired,
  verificationStatus: PropTypes.string.isRequired,
  updateProfileComplete: PropTypes.func.isRequired,
  updateVerification: PropTypes.func.isRequired,
  handleResetAll: PropTypes.func.isRequired
};

const getInitialWelcomeSeen = () => localStorage.getItem('cb_welcome_seen') === 'true';
const getInitialProfileCompleted = () => localStorage.getItem('cb_profile_completed') === 'true';
const getInitialVerificationStatus = () => localStorage.getItem('cb_verification_status') || 'DRAFT';

const resetCreatorStorage = (st, dsp) => {
  localStorage.removeItem('cb_welcome_seen');
  localStorage.removeItem('cb_profile_completed');
  localStorage.removeItem('cb_verification_status');
  if (st.role !== 'creator') return;

  const allC = LS.get('cb_creators', []);
  const existingIdx = allC.findIndex(cr => cr.email === st.user?.email);
  if (existingIdx === -1) return;

  allC[existingIdx] = {
    ...allC[existingIdx],
    name: st.user?.name || '',
    bio: '',
    milestones: [],
    services: [],
    full_story: { p1: '', quote: '', p2: '', p3: '' }
  };
  LS.set('cb_creators', allC);
  dsp({ t: 'LOGIN', u: { ...st.user, creatorProfile: allC[existingIdx] }, role: 'creator' });
};

const getStatusColor = (status) => {
  if (status === 'selected') return 'green';
  if (status === 'shortlisted') return 'purple';
  return 'blue';
};

const getCreatorProfile = (st) => {
  const allC = LS.get('cb_creators', []);
  return st.user?.creatorProfile || st.creatorProfile || allC.find(cr => cr.email === st.user?.email);
};

const getMyApps = (st) => {
  return LS.get('cb_applications', []).filter(a => a.applicantEmail === st.user?.email);
};

const checkProfileFlags = (c) => {
  const hasIdentity = !!(c?.name && c?.bio);
  const hasSocials = !!(c?.instagram || c?.youtube);
  const hasStory = !!(c?.full_story?.p1 && c?.milestones?.length > 0);
  const hasServices = !!(c?.rateMin && c?.services?.length > 0);
  const allChecksComplete = hasIdentity && hasSocials && hasStory && hasServices;
  return { hasIdentity, hasSocials, hasStory, hasServices, allChecksComplete };
};

const saveVerificationStatus = (status, setStatus) => {
  setStatus(status);
  localStorage.setItem('cb_verification_status', status);
};

const saveProfileComplete = (val, setProfileCompleted) => {
  setProfileCompleted(val);
  localStorage.setItem('cb_profile_completed', val ? 'true' : 'false');
};

const advanceWelcomeSlide = (activeSlide, setActiveSlide, setWelcomeSeen, toast) => {
  if (activeSlide < 2) {
    setActiveSlide(activeSlide + 1);
  } else {
    localStorage.setItem('cb_welcome_seen', 'true');
    setWelcomeSeen(true);
    toast('Welcome onboarding complete! Let\'s build your legacy.', 'success');
  }
};

const handleMockPaymentAction = (setLoadingPayment, updateVerification, toast) => {
  setLoadingPayment(true);
  setTimeout(() => {
    setLoadingPayment(false);
    updateVerification('PENDING_APPROVAL');
    toast('Verification fee paid! Profile submitted for Review.', 'success');
  }, 1500);
};

const handleFreeSubmitAction = (updateVerification, toast) => {
  updateVerification('PENDING_APPROVAL');
  toast('Launch Offer Applied! Profile submitted for review.', 'success');
};

const handleResetAllAction = (st, dsp, setWelcomeSeen, setProfileCompleted, setVerificationStatus, setActiveSlide, toast) => {
  resetCreatorStorage(st, dsp);
  setWelcomeSeen(false);
  setProfileCompleted(false);
  setVerificationStatus('DRAFT');
  setActiveSlide(0);
  toast('Ecosystem states reset for local testing!', 'info');
};

const SLIDES = [
  {
    index: 0,
    title: "Namaste, Creator! 🇮🇳",
    description: "Welcome to CreatorBharat V3—the elite club of Bharat's top 1% content creators. Let's establish your cinematic digital footprint.",
    icon: Sparkles,
    color: "#FF9431"
  },
  {
    index: 1,
    title: "Interactive Live Resume 📸",
    description: "Forget boring old PDFs. Build an ultra-modern portfolio synced directly with your YouTube and Instagram API counters.",
    icon: Globe,
    color: "#7C3AED"
  },
  {
    index: 2,
    title: "Verified Escrow Payouts 🔒",
    description: "Bid directly on premium briefs. Once hired, your payouts are locked in digital escrow before you upload a single asset.",
    icon: ShieldCheck,
    color: "#10B981"
  }
];

export default function DashboardPage() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();

  // 1. Initial State Hydration with local storage
  const [welcomeSeen, setWelcomeSeen] = useState(getInitialWelcomeSeen);
  const [profileCompleted, setProfileCompleted] = useState(getInitialProfileCompleted);
  const [verificationStatus, setVerificationStatus] = useState(getInitialVerificationStatus);

  const [activeSlide, setActiveSlide] = useState(0);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [totalSystemUsers] = useState(97); 

  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type, msg } });

  // Sync state to local storage when changed
  const updateVerification = (status) => saveVerificationStatus(status, setVerificationStatus);
  const updateProfileComplete = (val) => saveProfileComplete(val, setProfileCompleted);

  // Safe Creator Profile & Apps Fetch
  const c = getCreatorProfile(st);
  const myApps = getMyApps(st);
  const score = c ? (c.score || fmt.score(c)) : 0;

  // Calculate live checklists from current form state
  const { hasIdentity, hasSocials, hasStory, hasServices, allChecksComplete } = checkProfileFlags(c);

  useEffect(() => {
    // Keep profile completed synced
    if (allChecksComplete !== profileCompleted) {
      updateProfileComplete(allChecksComplete);
    }
  }, [allChecksComplete]);

  const handleNextSlide = () => advanceWelcomeSlide(activeSlide, setActiveSlide, setWelcomeSeen, toast);
  const handlePrevSlide = () => {
    if (activeSlide > 0) setActiveSlide(activeSlide - 1);
  };

  const handleMockPayment = () => handleMockPaymentAction(setLoadingPayment, updateVerification, toast);
  const handleFreeSubmit = () => handleFreeSubmitAction(updateVerification, toast);
  const handleResetAll = () => handleResetAllAction(st, dsp, setWelcomeSeen, setProfileCompleted, setVerificationStatus, setActiveSlide, toast);

  const isLocked = verificationStatus !== 'APPROVED';

  return (
    <div className="dashboard-page-container">
      
      {/* 1. PREMIUM WELCOME CAROUSEL OVERLAY */}
      <AnimatePresence>
        <WelcomeOverlay 
          welcomeSeen={welcomeSeen} 
          activeSlide={activeSlide} 
          slides={SLIDES} 
          handlePrevSlide={handlePrevSlide} 
          handleNextSlide={handleNextSlide} 
        />
      </AnimatePresence>

      {/* Top Header Section */}
      <div className="db-page-header">
        <div className="header-content">
           <div className="title-stack">
              <div className="badge-saffron">
                 <Zap size={14} fill="#FF9431" /> CREATOR HUB
              </div>
              <h1 className="page-title flex-align-center">
                Namaste, {(c?.name || st.user?.name || 'Creator').split(' ')[0]}!
                {verificationStatus === 'APPROVED' && (
                  <span className="badge-golden-tick" title="Verified Elite Profile">
                    <ShieldCheck size={18} fill="#FF9431" color="#fff" />
                  </span>
                )}
              </h1>
           </div>
           <div className="header-actions">
              <button 
                onClick={() => navigate(`/creator/${c?.id || 'elite'}`)} 
                className="btn-secondary-pill"
                disabled={isLocked}
                style={{ opacity: isLocked ? 0.5 : 1, cursor: isLocked ? 'not-allowed' : 'pointer' }}
              >
                <ExternalLink size={16} /> Public Profile
              </button>
              <button 
                onClick={() => navigate('/campaigns')} 
                className="btn-primary-pill"
                disabled={isLocked}
                style={{ opacity: isLocked ? 0.5 : 1, cursor: isLocked ? 'not-allowed' : 'pointer' }}
              >
                Explore Deals
              </button>
           </div>
        </div>
      </div>

      <div className="db-page-content">
         
         {/* 2. DYNAMIC STATE BANNER SWITCHBOARD */}
         <StatusAlertBanners 
           profileCompleted={profileCompleted} 
           verificationStatus={verificationStatus} 
           totalSystemUsers={totalSystemUsers} 
           loadingPayment={loadingPayment} 
           handleFreeSubmit={handleFreeSubmit} 
           handleMockPayment={handleMockPayment} 
           navigate={navigate} 
         />

         {/* Stats Grid */}
         <div className="db-stat-grid">
            <StatCard label="Active Deals" value={isLocked ? "0" : myApps.filter(a => a.status === 'selected').length} trend="+0%" icon={Briefcase} color="#10B981" delay={0.1} />
            <StatCard label="Followers" value={isLocked ? "0" : fmt.num(c?.followers || 125000)} trend="+4.2%" icon={Users} color="#7C3AED" delay={0.2} />
            <StatCard label="Elite Score" value={isLocked ? "0" : score} trend="Verified" icon={ShieldCheck} color="#FF9431" delay={0.3} />
            <StatCard label="Wallet" value={isLocked ? "₹0" : "₹12,450"} trend="+₹2,450" icon={Wallet} color="#3B82F6" delay={0.4} />
         </div>

         {/* Interactive Checklist & Review Tracking Column */}
         <div className="db-main-grid" style={{ marginBottom: 32 }}>
            
            {/* Left Box: Pehchan Compliance Hub */}
            <div className="db-col-left">
               <ComplianceTracker 
                 verificationStatus={verificationStatus} 
                 hasIdentity={hasIdentity} 
                 hasSocials={hasSocials} 
                 hasStory={hasStory} 
                 hasServices={hasServices} 
                 allChecksComplete={allChecksComplete} 
                 handleFreeSubmit={handleFreeSubmit} 
                 navigate={navigate} 
               />
            </div>

            {/* Right Box: Target Indian Geographies / Activity Pulse */}
            <div className="db-col-right">
               {isLocked ? (
                 <Card className="activity-card" style={{ padding: 28, height: '100%', minHeight: 320, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', background: '#f8fafc', border: '1.5px dashed #cbd5e1' }}>
                    <div style={{ width: 64, height: 64, borderRadius: 20, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.05)', marginBottom: 20 }}>
                       <Lock size={28} color="#FF9431" />
                    </div>
                    <h4 style={{ fontSize: 16, fontWeight: 950, color: '#0f172a', marginBottom: 8 }}>Ecosystem Analytics Locked</h4>
                    <p style={{ fontSize: 13, color: '#94a3b8', maxWidth: 280, margin: '0 auto', lineHeight: 1.5 }}>
                       Audience geography split and live sponsorship earnings will activate once your profile gets approved by the admin board!
                    </p>
                 </Card>
               ) : (
                 <Card className="activity-card" style={{ padding: 28 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                       <h3 style={{ fontSize: 18, fontWeight: 900, color: '#0f172a', margin: 0 }}>Top Indian Geographies</h3>
                       <MapPin size={18} color="#FF9431" />
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#f8fafc', borderRadius: 12 }}>
                          <span style={{ fontSize: 13, fontWeight: 800, color: '#475569' }}>1. Delhi NCR</span>
                          <span style={{ fontSize: 13, fontWeight: 900, color: '#0f172a' }}>42% Reach</span>
                       </div>
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#f8fafc', borderRadius: 12 }}>
                          <span style={{ fontSize: 13, fontWeight: 800, color: '#475569' }}>2. Mumbai Hub</span>
                          <span style={{ fontSize: 13, fontWeight: 900, color: '#0f172a' }}>28% Reach</span>
                       </div>
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#f8fafc', borderRadius: 12 }}>
                          <span style={{ fontSize: 13, fontWeight: 800, color: '#475569' }}>3. Jaipur (Rajasthan)</span>
                          <span style={{ fontSize: 13, fontWeight: 900, color: '#0f172a' }}>18% Reach</span>
                       </div>
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#f8fafc', borderRadius: 12 }}>
                          <span style={{ fontSize: 13, fontWeight: 800, color: '#475569' }}>4. Lucknow (Uttar Pradesh)</span>
                          <span style={{ fontSize: 13, fontWeight: 900, color: '#0f172a' }}>12% Reach</span>
                       </div>
                    </div>
                 </Card>
               )}
            </div>

         </div>

         {/* 3. Matching Campaigns */}
         <div className="db-section">
            <div className="section-header">
               <h3 className="db-section-title">Matching Campaigns</h3>
               <button className="btn-text-saffron" onClick={() => navigate('/campaigns')} disabled={isLocked}>
                  See all <ChevronRight size={16} />
               </button>
            </div>
            <div className="db-horizontal-scroll">
               <MatchingCampaign title="Tech Review Series" brand="Boat Audio" budget="15,000" delay={0.5} isLocked={isLocked} />
               <MatchingCampaign title="Regional Lifestyle" brand="Myntra" budget="8,000" delay={0.6} isLocked={isLocked} />
               <MatchingCampaign title="Gaming Shorts" brand="Redbull" budget="12,500" delay={0.7} isLocked={isLocked} />
               <MatchingCampaign title="Financial Literacy" brand="Groww" budget="20,000" delay={0.8} isLocked={isLocked} />
            </div>
         </div>

         <div className="db-main-grid">
            {/* Left Column: Public Media Kit */}
            <div className="db-col-left">
               <motion.div
                 whileHover={isLocked ? {} : { y: -5 }}
                 className={`media-kit-promo-card ${isLocked ? 'blurred-card-wrapper' : ''}`}
               >
                  {isLocked && (
                    <div className="card-absolute-lock-shroud">
                      <Lock size={32} />
                      <p>Media Kit Locked</p>
                    </div>
                  )}
                  <div className="promo-glow" />
                  <div className="promo-content">
                     <div className="promo-header">
                        <Star size={24} fill="#FF9431" color="#FF9431" />
                        <h3>Elite Media Kit</h3>
                     </div>
                     <p>
                        Your professional portfolio is ready. Share this cinematic link with brands to showcase your worth.
                     </p>
                     <div className="copy-link-wrap">
                        <div className="link-text">
                           creatorbharat.in/c/{c?.id || 'elite'}
                        </div>
                        <button 
                          onClick={() => { navigator.clipboard.writeText(`https://creatorbharat.in/c/${c?.id || 'elite'}`); toast('Link Copied!', 'success'); }}
                          className="copy-btn"
                          disabled={isLocked}
                        >
                           COPY
                        </button>
                     </div>
                  </div>
               </motion.div>
            </div>

            {/* Right Column: Applications Pulse */}
            <div className="db-col-right">
               <Card className={`activity-card ${isLocked ? 'blurred-card-wrapper' : ''}`}>
                  {isLocked && (
                    <div className="card-absolute-lock-shroud">
                      <Lock size={32} />
                      <p>Complete Review to Access Applications Pulse</p>
                    </div>
                  )}
                  <div className="card-header-flex">
                     <h3 className="card-title">Application Pulse</h3>
                     <Btn sm variant="ghost" onClick={() => navigate('/applications')} disabled={isLocked}>View Pulse</Btn>
                  </div>
                  
                  {myApps.length === 0 ? (
                    <Empty 
                      icon="📊" 
                      title="No Pulse Yet" 
                      sub="Once you apply to campaigns, you will see real-time status updates here." 
                      ctaLabel="Find Campaigns" 
                      onCta={() => navigate('/campaigns')} 
                    />
                  ) : (
                    <div className="activity-list">
                       {myApps.slice(0, 5).map(a => (
                         <div key={a.id} className="activity-item">
                            <div className="item-left">
                               <div className="icon-wrap">
                                  <Briefcase size={20} color="#64748b" />
                                </div>
                               <div className="item-info">
                                  <h5 className="item-title">{a.campaignTitle}</h5>
                                  <p className="item-sub">{typeof a.brand === 'object' ? a.brand.companyName : a.brand}</p>
                                </div>
                            </div>
                            <div className="item-right">
                               <Bdg color={getStatusColor(a.status)}>
                                  {a.status?.toUpperCase() || 'SENT'}
                                </Bdg>
                               <p className="date-text">{fmt.date(a.date)}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                  )}
               </Card>
            </div>
         </div>
      </div>

      {/* 3. SECRET DEVELOPER ADMIN CONTROLLER PANEL (FLOATING CONTROL BAR) */}
      <DeveloperAdminController 
        profileCompleted={profileCompleted} 
        verificationStatus={verificationStatus} 
        updateProfileComplete={updateProfileComplete} 
        updateVerification={updateVerification} 
        handleResetAll={handleResetAll} 
      />

      {/* CSS tokens and custom scoped walkthrough layouts */}
      <style>{`
        .flex-align-center {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .badge-golden-tick {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 148, 49, 0.12);
          border-radius: 999px;
          padding: 6px;
          border: 1px solid rgba(255, 148, 49, 0.25);
          animation: scaleUp 0.3s ease;
        }

        @keyframes scaleUp {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .pulse-animation {
          animation: pulseGlow 1.5s infinite;
        }

        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
          70% { box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
      `}</style>
    </div>
  );
}
