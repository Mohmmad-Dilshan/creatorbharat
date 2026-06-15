import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { MapPin, Mic2, Zap, Globe } from 'lucide-react';
import { Card } from '../../common/Primitives';
import { TabNavigator, TabEmptyState } from './ProfileShared';

export const LocalCollabHub = ({ c, mob, setActiveTab }) => {
  const isDummy = c.id === 'fallback';
  const hasLocalDetails = c.local_collab || c.local_impact_hubs?.length || c.localHubs?.length || c.regional_dialects || c.regionalDialects || c.local_voice || c.localVoice;
  if (!hasLocalDetails && !isDummy) return <TabEmptyState title="Local Collab Hub" icon={MapPin} mob={mob} setActiveTab={setActiveTab} tabId="local" />;

  const voice = c.local_voice || c.localVoice || `"I am dedicated to supporting regional startups, local businesses, and homegrown brands. Every business has a unique story that deserves to reach its target audience."`;
  const dialects = c.regional_dialects || c.regionalDialects || 'Hinglish, English, and regional dialects';
  const hubs = c.local_impact_hubs || c.localHubs || [
    { l: 'Indore', v: '85%' },
    { l: 'Bhopal', v: '72%' },
    { l: 'Ujjain', v: '64%' }
  ];

  return (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
    <div style={{ padding: mob ? '32px 24px' : '48px', borderRadius: '40px', marginBottom: '40px', border: '1.5px solid #f1f5f9', background: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '6px', height: '100%', background: '#FF9431' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ width: '40px', height: '40px', background: 'rgba(255,148,49,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Globe size={20} color="#FF9431" />
          </div>
          <span style={{ fontSize: '14px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Vocal for Local Initiative</span>
        </div>
        <h2 style={{ fontSize: mob ? '28px' : '44px', fontWeight: 950, color: '#0f172a', marginBottom: '24px', letterSpacing: '-0.04em' }}>{c.local_title || c.localTitle || "Supporting Local Businesses & Homegrown Brands"}</h2>
        <p style={{ fontSize: '18px', color: '#475569', fontWeight: 600, lineHeight: 1.6, maxWidth: '800px', fontStyle: 'italic' }}>
          {voice}
        </p>
      </div>
    </div>

    <div style={{ display: mob ? 'flex' : 'grid', gridTemplateColumns: mob ? 'none' : 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px', overflowX: mob ? 'auto' : 'visible', scrollbarWidth: 'none', paddingBottom: mob ? '12px' : '0' }}>
      <Card style={{ padding: '32px', borderRadius: '32px', border: '1.5px solid #f1f5f9', background: '#fff', flexShrink: 0, width: mob ? '260px' : 'auto' }}>
        <div style={{ width: '48px', height: '48px', background: '#f0fdf4', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <MapPin size={24} color="#10b981" />
        </div>
        <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>Store Visits & Events</h4>
        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>Offline store visits, launch events, aur local product reviews ke liye available in my active regions.</p>
      </Card>

      <Card style={{ padding: '32px', borderRadius: '32px', border: '1.5px solid #f1f5f9', background: '#fff', flexShrink: 0, width: mob ? '260px' : 'auto' }}>
        <div style={{ width: '48px', height: '48px', background: '#eff6ff', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <Mic2 size={24} color="#3b82f6" />
        </div>
        <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>Regional Voice Expertise</h4>
        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>{dialects} mein content expertise for authentic regional connection and high local trust.</p>
      </Card>

      <Card style={{ padding: '32px', borderRadius: '32px', border: '1.5px solid #f1f5f9', background: '#fff', flexShrink: 0, width: mob ? '260px' : 'auto' }}>
        <div style={{ width: '48px', height: '48px', background: '#fef2f2', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <Zap size={24} color="#ef4444" />
        </div>
        <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>Local Support Packages</h4>
        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>Homegrown startups, small budgets, aur barter collaborations ke liye special terms available.</p>
      </Card>
    </div>

    <div style={{ background: '#fff', padding: mob ? '32px 24px' : '60px', borderRadius: '40px', border: '1.5px solid #f1f5f9', textAlign: 'center', position: 'relative', overflow: 'hidden', marginBottom: '40px' }}>
       <div style={{ position: 'absolute', top: 0, left: 0, width: '6px', height: '100%', background: '#FF9431' }} />
       <h3 style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a', marginBottom: '16px' }}>{c.local_hubs_title || c.localHubsTitle || "My Hyper-Local Impact Hub"}</h3>
       <p style={{ color: '#64748b', fontWeight: 600, marginBottom: '40px', fontSize: '15px' }}>In regions mein mein active audience engagement average se 2x zyada hai.</p>
       <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '24px', maxWidth: '100%', margin: '0 auto' }}>
          {hubs.map(x => (
            <div key={x.l} style={{ padding: '24px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <div style={{ fontSize: '48px', fontWeight: 950, color: '#FF9431', lineHeight: 1, marginBottom: '8px' }}>{x.v}</div>
               <div style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', marginBottom: '4px' }}>Reach in {x.l}</div>
               <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Verified Hub Point</div>
            </div>
          ))}
       </div>
    </div>
    <TabNavigator activeTab="local" setActiveTab={setActiveTab} mob={mob} />
  </motion.div>
  );
};
LocalCollabHub.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool, setActiveTab: PropTypes.func.isRequired };
