import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../../core/context';
import { Card } from '../../common/Primitives';
import { TrustBadge, TabNavigator, TabEmptyState, GatedOverlay } from './ProfileShared';

const PackageCard = ({ p, onSelect, mob }) => (
  <Card style={{ 
    padding: mob ? '24px' : '32px', 
    borderRadius: '40px', 
    border: p.pop ? '2px solid #FF9431' : '1.5px solid #f1f5f9', 
    position: 'relative', 
    display: 'flex', 
    flexDirection: 'column', 
    background: '#fff', 
    boxShadow: p.pop ? '0 20px 40px rgba(255,148,49,0.1)' : 'none',
    width: mob ? '290px' : '100%',
    flexShrink: mob ? 0 : 1
  }}>
    {p.pop && <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#FF9431', color: '#fff', padding: '4px 16px', borderRadius: '100px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Most Popular</div>}
    <div style={{ marginBottom: '24px' }}>
      <div style={{ fontSize: '14px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{p.l}</div>
      <div style={{ fontSize: '32px', fontWeight: 950, color: '#0f172a' }}>{p.v}</div>
    </div>
    <div style={{ flex: 1, marginBottom: '32px' }}>
      {p.items.map((item) => (
        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '14px', color: '#64748b', fontWeight: 600 }}>
          <CheckCircle2 size={16} color="#10B981" /> {item}
        </div>
      ))}
    </div>
    <button 
      onClick={() => onSelect(p)} 
      style={{ width: '100%', padding: '16px', borderRadius: '100px', background: p.pop ? 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)' : '#1e293b', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      Select Package
    </button>
  </Card>
);
PackageCard.propTypes = { 
  p: PropTypes.shape({
    l: PropTypes.string.isRequired,
    v: PropTypes.string.isRequired,
    pop: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  onSelect: PropTypes.func.isRequired 
};

const CollabFAQ = ({ mob }) => (
  <div style={{ marginTop: mob ? '32px' : '80px', background: '#f8fafc', padding: mob ? '32px' : '60px', borderRadius: '40px', border: '1.5px solid #f1f5f9' }}>
     <h3 style={{ fontSize: '24px', fontWeight: 950, marginBottom: '40px', textAlign: 'center' }}>Collaboration Intelligence (FAQ)</h3>
     <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(2, 1fr)', gap: '24px' }}>
        {[
          { q: 'What is the typical turnaround time?', a: 'For cinematic reels, it is 5-7 working days. Express delivery (48hrs) is available for select packages.' },
          { q: 'How do revisions work?', a: 'Every package includes 2 rounds of creative revisions to ensure the content aligns with brand guidelines.' },
          { q: 'Are raw files provided?', a: 'Raw footage can be provided as an add-on or included in the Brand Partner tier.' },
          { q: 'Usage rights for content?', a: 'Digital usage rights for 6 months are included in all professional tiers.' }
        ].map((f) => (
          <div key={f.q.slice(0, 20)} style={{ padding: '24px', background: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
             <div style={{ fontSize: '15px', fontWeight: 950, color: '#0f172a', marginBottom: '8px' }}>{f.q}</div>
             <div style={{ fontSize: '14px', color: '#64748b', fontWeight: 500, lineHeight: 1.6 }}>{f.a}</div>
          </div>
        ))}
     </div>
  </div>
);
CollabFAQ.propTypes = { mob: PropTypes.bool };

export const PackagesTab = ({ c, mob, onSelect, setActiveTab }) => {
  const { st } = useApp();
  const navigate = useNavigate();
  const isDummy = c.id === 'fallback';
  if (!c.packages && (!c.services || c.services.length === 0) && !isDummy) return <TabEmptyState title="Packages" icon={Zap} mob={mob} setActiveTab={setActiveTab} tabId="packages" />;
  const packages = c.packages || (c.services && c.services.length > 0 ? c.services.map((s, idx) => ({
    l: s.t,
    v: s.rate ? `₹${Number(s.rate).toLocaleString('en-IN')}` : 'Custom',
    pop: idx === 1,
    items: s.d ? s.d.split(',').map(item => item.trim()) : []
  })) : [
    { l: 'Starter Boost', v: '₹12,500', pop: false, items: ['1 Cinematic Reel', '2 Sequential Stories', 'Link in Bio (24hrs)', 'Standard Captioning'] },
    { l: 'Growth Engine', v: '₹35,000', pop: true, items: ['3 Premium Reels', '5 High-Impact Stories', 'Managed Briefing', 'Analytics Report', 'Scripting Included'] },
    { l: 'Brand Partner', v: 'Custom', pop: false, items: ['Exclusive Partnership', '6 Reels per Month', 'Product Integration', 'Usage Rights (6mo)', 'Event Attendance'] }
  ]);

  const hasUser = !!st?.user;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={{ position: 'relative' }}>
        <div style={{ 
          display: mob ? 'flex' : 'grid', 
          gridTemplateColumns: mob ? 'none' : 'repeat(3, 1fr)', 
          gap: '24px', 
          overflowX: mob ? 'auto' : 'visible', 
          scrollbarWidth: 'none', 
          paddingBottom: '20px',
          filter: hasUser ? 'none' : 'blur(6px) grayscale(20%)',
          pointerEvents: hasUser ? 'auto' : 'none'
        }}>
           {packages.map((p) => (
             <PackageCard key={p.l} onSelect={onSelect} p={p} mob={mob} />
           ))}
        </div>
        {!hasUser && (
          <GatedOverlay 
            title="Collaboration Rates Gated" 
            description="Register as a verified Brand to unlock custom pricing sheets, specific campaign deliverables, and direct secure escrow bookings." 
            onCtaClick={() => navigate('/login')}
          />
        )}
      </div>
      <CollabFAQ mob={mob} />
      <div style={{ marginTop: 'auto', width: '100%' }}>
         <TrustBadge />
         <TabNavigator activeTab="packages" setActiveTab={setActiveTab} mob={mob} />
      </div>
    </motion.div>
  );
};
PackagesTab.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool, onSelect: PropTypes.func.isRequired, setActiveTab: PropTypes.func.isRequired };
