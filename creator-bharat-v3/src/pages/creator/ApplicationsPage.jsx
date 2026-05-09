import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context';
import { scrollToTop, LS, fmt } from '../../utils/helpers';
import { Card, Bdg, Empty } from '../../components/Primitives';
import { motion } from 'framer-motion';
import { 
  Clock, 
  MessageSquare, 
  ExternalLink,
  Zap,
  TrendingUp,
  Eye
} from 'lucide-react';

const StatusTimeline = ({ status }) => {
  const steps = ['applied', 'shortlisted', 'selected', 'paid'];
  const currentIndex = steps.indexOf(status?.toLowerCase() || 'applied');
  
  return (
    <div style={{ marginTop: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
         {steps.map((s, i) => (
           <div key={s} style={{ 
             fontSize: '9px', 
             fontWeight: 900, 
             textTransform: 'uppercase', 
             color: i <= currentIndex ? '#10B981' : '#cbd5e1',
             letterSpacing: '0.05em'
           }}>
             {s}
           </div>
         ))}
      </div>
      <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '10px', display: 'flex', gap: '4px' }}>
         {steps.map((s, i) => (
           <div key={s} style={{ 
             flex: 1, 
             height: '100%', 
             background: i <= currentIndex ? '#10B981' : 'transparent',
             borderRadius: '10px',
             transition: 'all 0.5s ease'
           }} />
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
      <Card style={{ padding: mob ? '24px' : '32px', borderRadius: '32px', background: '#fff', border: '1px solid #f1f5f9' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '20px', flex: 1, minWidth: '280px' }}>
               <img src={brandImg} style={{ width: '64px', height: '64px', borderRadius: '18px', border: '1px solid #f1f5f9' }} alt="" />
               <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                     <span style={{ fontSize: '13px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase' }}>{typeof a.brand === 'object' ? a.brand.companyName : a.brand}</span>
                     <Bdg sm color="blue">Verified Brand</Bdg>
                  </div>
                  <h4 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>{a.campaignTitle}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px', color: '#64748b', fontSize: '13px', fontWeight: 700 }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> {fmt.date(a.date)}</div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Zap size={14} /> {fmt.inr(a.rate || 15000)} bid</div>
                  </div>
               </div>
            </div>

            <div style={{ textAlign: mob ? 'left' : 'right' }}>
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
         <div style={{ marginTop: '24px', padding: '20px', background: '#f8fafc', borderRadius: '20px', border: '1px solid #f1f5f9', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-10px', left: '20px', background: '#fff', border: '1px solid #f1f5f9', padding: '2px 10px', borderRadius: '100px', fontSize: '10px', fontWeight: 900, color: '#94a3b8' }}>MY PROPOSAL</div>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, fontWeight: 500 }}>"{a.pitch || 'Quick apply via swipe'}"</p>
         </div>

         <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button style={{ background: 'none', border: 'none', color: '#64748b', fontWeight: 800, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
               <MessageSquare size={16} /> Chat with Brand
            </button>
            <button onClick={() => onAction(a)} style={{ background: '#0f172a', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
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

  if (!st.user || st.role !== 'creator') return (
    <div style={{ padding: '120px 20px', textAlign: 'center' }}>
       <Empty icon="🔒" title="Access Locked" sub="Login as a creator to view your deal history." ctaLabel="Sign In Now" onCta={() => navigate('/login')} />
    </div>
  );

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', padding: mob ? '100px 20px 100px' : '120px 40px 100px' }}>
      
      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FF9431', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
           <TrendingUp size={14} /> MISSION CONTROL
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.04em' }}>Application Hub</h1>
        <p style={{ fontSize: '16px', color: '#64748b', marginTop: '4px', fontWeight: 500 }}>Track your deals from pitch to payout in real-time.</p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
         {/* Filter Bar */}
         <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '20px', marginBottom: '32px', scrollbarWidth: 'none' }}>
            <button 
              onClick={() => setFilter('')} 
              style={{ padding: '12px 24px', borderRadius: '100px', border: 'none', background: filter === '' ? '#0f172a' : '#fff', color: filter === '' ? '#fff' : '#64748b', fontSize: '13px', fontWeight: 800, cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}
            >
              All Pulsing Deals
            </button>
            {['shortlisted', 'selected', 'rejected'].map(s => (
               <button 
                 key={s} 
                 onClick={() => setFilter(s)} 
                 style={{ padding: '12px 24px', borderRadius: '100px', border: 'none', background: filter === s ? '#0f172a' : '#fff', color: filter === s ? '#fff' : '#64748b', fontSize: '13px', fontWeight: 800, cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}
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
