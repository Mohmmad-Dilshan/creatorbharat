import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/core/context';
import { scrollToTop, LS, fmt } from '../../utils/helpers';
import { Card, Bdg, Empty } from '@/components/common/Primitives';
import { motion } from 'framer-motion';
import { 
  Clock, 
  MessageSquare, 
  ExternalLink,
  Zap,
  TrendingUp,
  Eye
} from 'lucide-react';
import AuthGatekeeper from '@/components/auth/AuthGatekeeper';

const StatusTimeline = ({ status }) => {
  const steps = ['applied', 'shortlisted', 'selected', 'paid'];
  const currentIndex = steps.indexOf(status?.toLowerCase() || 'applied');
  
  return (
    <div className="status-timeline-container">
      <div className="timeline-labels">
         {steps.map((s, i) => (
           <div key={s} className={`timeline-label ${i <= currentIndex ? 'active' : ''}`}>
              {s}
           </div>
         ))}
      </div>
      <div className="timeline-track">
         {steps.map((s, i) => (
           <div key={s} className={`timeline-segment ${i <= currentIndex ? 'active' : ''}`} />
         ))}
      </div>
    </div>
  );
};

StatusTimeline.propTypes = {
  status: PropTypes.string
};

const ApplicationCard = ({ app: a, mob, onAction, delay = 0 }) => {
  const brandImg = `https://ui-avatars.com/api/?name=${encodeURIComponent(typeof a.brand === 'object' ? a.brand.companyName : a.brand)}&background=f8fafc&color=111&size=100`;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="activity-item" style={{ padding: mob ? '24px' : '32px', display: 'block' }}>
         <div className="header-content" style={{ alignItems: 'flex-start' }}>
            <div className="item-left" style={{ flex: 1, minWidth: '280px' }}>
               <img src={brandImg} className="tx-icon-wrap" style={{ width: 64, height: 64, borderRadius: 18 }} alt="" />
               <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                     <span className="badge-saffron" style={{ fontSize: 13 }}>{typeof a.brand === 'object' ? a.brand.companyName : a.brand}</span>
                     <Bdg sm color="blue">Verified Brand</Bdg>
                  </div>
                  <h4 className="page-title" style={{ fontSize: 20 }}>{a.campaignTitle}</h4>
                  <div className="tx-meta" style={{ marginTop: 12 }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> {fmt.date(a.date)}</div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Zap size={14} /> {fmt.inr(a.rate || 15000)} bid</div>
                  </div>
               </div>
            </div>

            <div className="item-right" style={{ textAlign: mob ? 'left' : 'right' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontWeight: 800, fontSize: '12px', marginBottom: '8px', justifyContent: mob ? 'flex-start' : 'flex-end' }}>
                  <Eye size={14} /> Brand viewed 2h ago
               </div>
               <Bdg lg color={(() => {
                  if (a.status === 'selected') return 'green';
                  if (a.status === 'shortlisted') return 'purple';
                  return 'blue';
               })()}>
                  { (a.status || 'applied').toUpperCase() }
               </Bdg>
            </div>
         </div>

         {/* Status Timeline */}
         <StatusTimeline status={a.status} />

         {/* Pitch Preview */}
         <div className="app-pitch-box">
            <div className="pitch-badge">MY PROPOSAL</div>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, fontWeight: 500 }}>"{a.pitch || 'Quick apply via swipe'}"</p>
         </div>

         <div className="header-actions" style={{ justifyContent: 'flex-end', marginTop: 24 }}>
            <button className="btn-text-slate" style={{ fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer' }}>
               <MessageSquare size={16} /> Chat with Brand
            </button>
            <button onClick={() => onAction(a)} className="btn-primary-pill" style={{ padding: '10px 20px', fontSize: 13 }}>
               Full Brief <ExternalLink size={14} />
            </button>
         </div>
      </Card>
    </motion.div>
  );
};

ApplicationCard.propTypes = {
  app: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    brand: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    campaignTitle: PropTypes.string.isRequired,
    date: PropTypes.string,
    rate: PropTypes.number,
    status: PropTypes.string,
    pitch: PropTypes.string
  }).isRequired,
  mob: PropTypes.bool,
  onAction: PropTypes.func.isRequired,
  delay: PropTypes.number
};

export default function ApplicationsPage() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const myApps = LS.get('cb_applications', []).filter(a => a.applicantEmail === st.user?.email);
  const filtered = filter ? myApps.filter(a => (a.status || 'applied') === filter) : myApps;

  // Auth Gatekeeper
  if (!st.user || st.role !== 'creator') {
    return <AuthGatekeeper mob={mob} />;
  }

  return (
    <div className="dashboard-page-container">
      
      {/* Header */}
      <div className="db-page-header">
        <div className="badge-saffron">
           <TrendingUp size={14} /> MISSION CONTROL
        </div>
        <h1 className="page-title">Application Hub</h1>
        <p className="db-sub-text">Track your deals from pitch to payout in real-time.</p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
         {/* Filter Bar */}
         <div className="filter-pill-bar">
            <button 
              onClick={() => setFilter('')} 
              className={`filter-pill ${filter === '' ? 'active' : ''}`}
            >
              All Pulsing Deals
            </button>
            {['shortlisted', 'selected', 'rejected'].map(s => (
               <button 
                 key={s} 
                 onClick={() => setFilter(s)} 
                 className={`filter-pill ${filter === s ? 'active' : ''}`}
               >
                 {s.toUpperCase()}
               </button>
            ))}
         </div>

         {filtered.length === 0 ? (
           <div style={{ padding: '80px 0' }}>
              <Empty 
                icon="📊" 
                title="No Active Pulses" 
                sub="Your applications matching this status will appear here. Keep applying to scale!" 
                ctaLabel="Find New Opportunities" 
                onCta={() => { dsp({ t: 'GO', p: 'campaigns' }); navigate('/campaigns'); scrollToTop(); }} 
              />
           </div>
         ) : (
           <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {filtered.map((a, i) => (
                <ApplicationCard key={a.id} app={a} mob={mob} delay={i * 0.1} onAction={(app) => { dsp({ t: 'GO', p: 'campaigns', sel: app }); navigate('/campaigns'); scrollToTop(); }} />
              ))}
           </div>
         )}
      </div>
    </div>
  );
}
