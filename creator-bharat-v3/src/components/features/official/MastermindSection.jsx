import React from 'react';
import PropTypes from 'prop-types';
import { ShieldCheck, MapPin, Award, Mail, History, TrendingUp } from 'lucide-react';
import { LinkedinIcon } from '@/components/icons/SocialIcons';
import { OFFICIAL_DATA } from './officialData';

const DilshanImg = "https://ui-avatars.com/api/?name=Mohmmad+Dilshan&background=0f172a&color=fff&size=512";

export default function MastermindSection({ mob }) {
  return (
    <div style={{ padding: '40px 0' }}>
       {/* Elite Founder Card */}
       <div style={{ 
          background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)', 
          borderRadius: '32px', 
          padding: mob ? '32px 24px' : '48px', 
          color: '#fff', 
          marginBottom: '40px', 
          position: 'relative', 
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(15,23,42,0.4)',
          border: '1px solid rgba(255,255,255,0.05)'
       }}>
          {/* Background Decor */}
          <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '200px', height: '200px', background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)', opacity: 0.15, zIndex: 0 }} />
          <div style={{ position: 'absolute', left: '-20px', bottom: '-20px', opacity: 0.03 }}><ShieldCheck size={200} /></div>

          <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: '40px', alignItems: mob ? 'center' : 'flex-start', position: 'relative', zIndex: 1 }}>
             {/* Founder Photo */}
             <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{ 
                  width: '180px', 
                  height: '180px', 
                  borderRadius: '24px', 
                  overflow: 'hidden', 
                  border: '4px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                }}>
                   <img src={DilshanImg} alt="Mohmmad Dilshan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ 
                  position: 'absolute', 
                  bottom: '-10px', 
                  right: '-10px', 
                  background: '#3B82F6', 
                  color: '#fff', 
                  padding: '6px 12px', 
                  borderRadius: '100px', 
                  fontSize: '10px', 
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 4px 12px rgba(59,130,246,0.5)'
                }}>
                   <ShieldCheck size={12} fill="#fff" color="#3B82F6" /> VERIFIED FOUNDER
                </div>
             </div>

             {/* Founder Info */}
             <div style={{ flex: 1, textAlign: mob ? 'center' : 'left' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
                   <h4 style={{ fontSize: '32px', fontWeight: 950, letterSpacing: '-0.03em' }}>{OFFICIAL_DATA.founder.name}</h4>
                   <div style={{ color: '#3B82F6', fontSize: '14px', fontWeight: 850, letterSpacing: '1px' }}>{OFFICIAL_DATA.founder.role.toUpperCase()}</div>
                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: mob ? 'center' : 'flex-start', gap: '6px', color: '#94a3b8', fontSize: '12px', marginTop: '4px' }}>
                      <MapPin size={14} /> {OFFICIAL_DATA.founder.location}
                   </div>
                </div>
                <p style={{ fontSize: '16px', opacity: 0.9, lineHeight: 1.7, marginBottom: '28px', maxWidth: '500px', fontWeight: 500 }}>
                   "{OFFICIAL_DATA.founder.vision}"
                </p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: mob ? 'center' : 'flex-start', gap: '12px', marginBottom: '32px' }}>
                   {OFFICIAL_DATA.founder.achievements.map((a) => (
                     <div key={a} style={{ background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <Award size={16} color="#FFD700" /> {a}
                     </div>
                   ))}
                </div>

                <div style={{ display: 'flex', justifyContent: mob ? 'center' : 'flex-start', gap: '16px' }}>
                   <button style={{ background: '#fff', color: '#0f172a', border: 'none', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <LinkedinIcon size={18} /> Connect
                   </button>
                   <button style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Mail size={18} /> Contact
                   </button>
                </div>
             </div>
          </div>
       </div>

       {/* Updates Grid */}
       <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '20px' }}>
          <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
             <History size={24} color="#64748b" style={{ marginBottom: '16px' }} />
             <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '8px' }}>PAST UPDATES</div>
             <div style={{ fontSize: '12px', color: '#64748b' }}>• Migration to V3.0 (April)<br/>• Security Audit V2 (Jan)<br/>• Global Shard Beta (Dec)</div>
          </div>
          <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
             <TrendingUp size={24} color="#3B82F6" style={{ marginBottom: '16px' }} />
             <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '8px' }}>FUTURE FEATURES</div>
             <div style={{ fontSize: '12px', color: '#64748b' }}>• AI Reputation Score<br/>• Real-time Settlement<br/>• Node Marketplace</div>
          </div>
       </div>
    </div>
  );
}

MastermindSection.propTypes = {
  mob: PropTypes.bool.isRequired
};
