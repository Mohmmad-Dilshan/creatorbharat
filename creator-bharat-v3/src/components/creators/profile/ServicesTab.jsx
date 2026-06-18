import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { 
  Play, Globe, Briefcase, Video, FileText, 
  Phone, Sparkles, Layers, Palette, Users, ArrowRight 
} from 'lucide-react';
import { Card } from '../../common/Primitives';
import { TrustBadge, TabNavigator } from './ProfileShared';

const getServiceMeta = (title, index) => {
  const t = String(title || '').toLowerCase();
  
  // Icon matching
  let Icon = Briefcase;
  let color = '#FF9431'; // Saffron fallback
  
  if (t.includes('video') || t.includes('reel') || t.includes('youtube') || t.includes('cinematic') || t.includes('shoot') || t.includes('camera')) {
    Icon = Video;
    color = '#FF9431';
  } else if (t.includes('design') || t.includes('graphic') || t.includes('banner') || t.includes('thumbnail') || t.includes('logo') || t.includes('photo')) {
    Icon = Palette;
    color = '#ec4899'; // Pink
  } else if (t.includes('writing') || t.includes('script') || t.includes('bio') || t.includes('text') || t.includes('copy')) {
    Icon = FileText;
    color = '#3b82f6'; // Blue
  } else if (t.includes('consult') || t.includes('strategy') || t.includes('call') || t.includes('session') || t.includes('meeting') || t.includes('mentorship')) {
    Icon = Users;
    color = '#10b981'; // Emerald Green
  } else if (t.includes('promote') || t.includes('shoutout') || t.includes('sponsor') || t.includes('ad')) {
    Icon = Sparkles;
    color = '#a855f7'; // Purple
  } else {
    // Round-robin default fallback list
    const fallbacks = [
      { i: Play, c: '#FF9431' },
      { i: Globe, c: '#0ea5e9' },
      { i: Briefcase, c: '#10b981' }
    ];
    const match = fallbacks[index % fallbacks.length];
    Icon = match.i;
    color = match.c;
  }
  
  return { Icon, color };
};

const ServiceCatalog = ({ c, mob }) => {
  const services = (c.services && c.services.length > 0) ? c.services : [
    { t: 'Cinematic Storytelling Video', d: '4K Cinematic Reels with professional color grading, native scripting, and brand integration hooks.', rate: '12000' },
    { t: 'Regional Brand Strategy Session', d: '1-on-1 strategic consultation on how to target regional Indian audiences and tier-2 city buyers.', rate: '6000' },
    { t: 'Native Product Integration', d: 'Seamless brand placement inside daily lifestyle stories and authentic community updates.', rate: '25000' }
  ];

  return (
    <div style={{ marginBottom: mob ? '32px' : '60px' }}>
       <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: 6, 
            background: 'rgba(255, 148, 49, 0.08)', color: '#FF9431',
            padding: '6px 14px', borderRadius: 100, fontSize: 11, fontWeight: 900,
            textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 12
          }}>
            💼 Professional Deliverables
          </div>
          <h3 style={{ fontSize: mob ? '24px' : '32px', fontWeight: 950, color: '#0f172a', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
            Service Catalog & Rate Card
          </h3>
          <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 600, margin: 0 }}>
             Transparent commercials and professional campaign deliverables.
          </p>
       </div>
       
       <div style={{ 
         display: 'grid', 
         gridTemplateColumns: mob ? '1fr' : '1fr 1fr', 
         gap: '20px',
         maxWidth: '100%',
         margin: '0 auto'
       }}>
          {services.map((s, idx) => {
            const { Icon, color } = getServiceMeta(s.t, idx);
            
            return (
              <motion.div 
                key={s.t || idx} 
                whileHover={{ 
                  y: -6, 
                  borderColor: color,
                  boxShadow: `0 16px 36px rgba(15, 23, 42, 0.04), 0 0 20px ${color}10` 
                }}
                style={{ 
                  padding: mob ? '24px' : '32px', 
                  borderRadius: '28px', 
                  border: '1.5px solid rgba(226, 232, 240, 0.8)', 
                  background: '#ffffff',
                  boxShadow: '0 4px 20px rgba(15, 23, 42, 0.01)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '20px',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                 {/* Subtle decorative watermark icon */}
                 <div style={{
                   position: 'absolute',
                   bottom: '-10px',
                   right: '-10px',
                   width: '60px',
                   height: '60px',
                   borderRadius: '50%',
                   background: `${color}04`,
                   pointerEvents: 'none'
                 }} />

                 <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    {/* Icon container */}
                    <div style={{ 
                      width: '48px', 
                      height: '48px', 
                      background: `${color}10`, 
                      borderRadius: '14px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                       <Icon size={22} color={color} />
                    </div>

                    <div style={{ flex: 1 }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: mob ? 'wrap' : 'nowrap', marginBottom: 8 }}>
                          <h4 style={{ fontSize: '16px', fontWeight: 950, color: '#0f172a', margin: 0, lineHeight: 1.3 }}>
                            {s.t}
                          </h4>
                          
                          {s.rate ? (
                            <div style={{ 
                              background: `${color}10`, 
                              color: color, 
                              padding: '4px 12px', 
                              borderRadius: '100px', 
                              fontSize: '13px', 
                              fontWeight: 950,
                              whiteSpace: 'nowrap'
                            }}>
                              ₹{Number(s.rate).toLocaleString('en-IN')}
                            </div>
                          ) : (
                            <div style={{ 
                              background: '#f1f5f9', 
                              color: '#64748b', 
                              padding: '4px 12px', 
                              borderRadius: '100px', 
                              fontSize: '11px', 
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              whiteSpace: 'nowrap'
                            }}>
                              Custom Quote
                            </div>
                          )}
                       </div>
                       
                       <p style={{ 
                         fontSize: '13px', 
                         color: '#64748b', 
                         lineHeight: 1.6, 
                         fontWeight: 500, 
                         margin: 0 
                       }}>
                         {s.d}
                       </p>
                    </div>
                 </div>
              </motion.div>
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
