import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Play, Globe, Briefcase } from 'lucide-react';
import { Card } from '../../common/Primitives';
import { TrustBadge, TabNavigator } from './ProfileShared';

const ServiceCatalog = ({ c, mob }) => {
  const services = (c.services && c.services.length > 0) ? c.services : [
    { t: 'Cinematic Storytelling', d: '4K Cinematic Reels with professional grading and scripting.', i: Play, c: '#FF9431' },
    { t: 'Regional Strategy', d: 'Consultation on how to launch products in local markets.', i: Globe, c: '#0ea5e9' },
    { t: 'Product Integration', d: 'Seamless product placement in authentic life scenarios.', i: Briefcase, c: '#10b981' }
  ];

  return (
    <div style={{ marginBottom: mob ? '24px' : '60px' }}>
       <h3 style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', marginBottom: '32px', textAlign: 'center' }}>Professional Service Catalog</h3>
       <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '24px' }}>
          {services.map((s, idx) => {
            const defaultIcons = [Play, Globe, Briefcase];
            const defaultColors = ['#FF9431', '#0ea5e9', '#10b981'];
            const Icon = s.i || defaultIcons[idx % defaultIcons.length];
            const color = s.c || defaultColors[idx % defaultColors.length];
            
            return (
              <Card key={s.t} style={{ padding: '40px', borderRadius: '32px', border: '1.5px solid #f1f5f9', textAlign: 'center' }}>
                 <div style={{ width: '60px', height: '60px', background: `${color}10`, borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <Icon size={28} color={color} />
                 </div>
                 <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginBottom: '8px' }}>{s.t}</h4>
                 {s.rate && (
                   <div style={{ fontSize: '18px', fontWeight: 950, color: '#FF9431', marginBottom: '16px' }}>
                     ₹{Number(s.rate).toLocaleString('en-IN')}
                   </div>
                 )}
                 <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>{s.d}</p>
              </Card>
            );
          })}
       </div>
    </div>
  );
};
ServiceCatalog.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool };

export const ServicesTab = ({ c, mob, setActiveTab }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <ServiceCatalog c={c} mob={mob} />
      <div style={{ marginTop: 'auto', width: '100%' }}>
         <TrustBadge />
         <TabNavigator activeTab="services" setActiveTab={setActiveTab} mob={mob} />
      </div>
    </motion.div>
  );
};
ServicesTab.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool, setActiveTab: PropTypes.func.isRequired };
