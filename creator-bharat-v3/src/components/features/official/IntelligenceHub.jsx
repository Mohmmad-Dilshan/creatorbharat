import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Database, Server, ExternalLink } from 'lucide-react';
import { OFFICIAL_DATA } from './officialData';

export default function IntelligenceHub({ mob }) {
  return (
    <div style={{ padding: '40px 0' }}>
       <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '2px', color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>REGIONAL CREATOR HUBS</h3>
          <p style={{ color: '#475569', fontSize: '14px', marginTop: '4px' }}>Active creator hubs and platform performance directory.</p>
       </div>
       
       {/* Shard Directory */}
       <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '32px', padding: mob ? '20px' : '32px', marginBottom: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', padding: '0 8px' }}>
             <div style={{ fontSize: '14px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a' }}>
               <Server size={18} color="#3B82F6" /> ACTIVE CREATOR HUBS
             </div>
             <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, letterSpacing: '0.5px' }}>SYNCED REAL-TIME</div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
             {OFFICIAL_DATA.shards.map((shard) => {
               const loadPercent = parseInt(shard.load) || 50;
               const isActive = shard.status === 'Active';
               const barColor = loadPercent > 80 ? '#FF9431' : loadPercent > 50 ? '#3B82F6' : '#10B981';

               return (
                 <div 
                   key={shard.id} 
                   style={{ 
                     display: 'flex', 
                     flexDirection: mob ? 'column' : 'row',
                     alignItems: mob ? 'stretch' : 'center', 
                     justifyContent: 'space-between', 
                     padding: '20px', 
                     background: '#f8fafc', 
                     borderRadius: '20px', 
                     border: '1px solid #e2e8f0',
                     gap: mob ? '16px' : '24px',
                     transition: 'all 0.2s ease'
                   }}
                   onMouseEnter={e => {
                     e.currentTarget.style.borderColor = '#cbd5e1';
                     e.currentTarget.style.background = '#f1f5f9';
                   }}
                   onMouseLeave={e => {
                     e.currentTarget.style.borderColor = '#e2e8f0';
                     e.currentTarget.style.background = '#f8fafc';
                   }}
                 >
                    {/* Node Info & Icon */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1.5 }}>
                       <div style={{ 
                         width: '44px', 
                         height: '44px', 
                         borderRadius: '12px', 
                         background: isActive ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 148, 49, 0.12)', 
                         display: 'flex', 
                         alignItems: 'center', 
                         justifyContent: 'center',
                         border: `1.5px solid ${isActive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 148, 49, 0.2)'}`
                       }}>
                          <Database size={20} color={isActive ? '#10B981' : '#FF9431'} />
                       </div>
                       <div>
                          <div style={{ fontSize: '15px', fontWeight: 850, color: '#0f172a' }}>{shard.region}</div>
                          <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>Hub ID: {shard.id}_CB_001</div>
                       </div>
                    </div>

                    {/* Status & Latency */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1.2 }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <motion.span
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: isActive ? '#10B981' : '#FF9431',
                              boxShadow: `0 0 10px ${isActive ? '#10B981' : '#FF9431'}`,
                              display: 'inline-block'
                            }}
                          />
                          <div>
                            <div style={{ fontSize: '12.5px', fontWeight: 900, color: isActive ? '#10B981' : '#FF9431' }}>
                              {shard.status.toUpperCase()}
                            </div>
                            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Reach: {shard.latency}</div>
                          </div>
                       </div>
                    </div>

                    {/* Load & Capacity Meter */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1.8 }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', letterSpacing: '0.5px' }}>HUB ENGAGEMENT</span>
                         <span style={{ fontSize: '11.5px', fontFamily: 'monospace', fontWeight: 800, color: barColor }}>{shard.load}</span>
                       </div>
                       <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '100px', overflow: 'hidden' }}>
                         <div style={{ width: `${loadPercent}%`, height: '100%', background: barColor, borderRadius: '100px', transition: 'width 0.6s ease' }} />
                       </div>
                    </div>

                    {/* Stats Action Button */}
                    <button style={{ 
                      background: '#ffffff', 
                      border: '1.5px solid #cbd5e1', 
                      padding: '8px 16px', 
                      borderRadius: '10px', 
                      fontSize: '11px', 
                      fontWeight: 800, 
                      color: '#334155',
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#0f172a';
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.borderColor = '#0f172a';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#ffffff';
                      e.currentTarget.style.color = '#334155';
                      e.currentTarget.style.borderColor = '#cbd5e1';
                    }}
                    >
                      DIAGNOSTICS
                    </button>
                 </div>
               );
             })}
          </div>
       </div>

       {/* Protocol CTA */}
       <div style={{ background: 'linear-gradient(90deg, #f8fafc 0%, #f1f5f9 100%)', border: '1px solid #e2e8f0', borderRadius: '28px', padding: mob ? '24px' : '32px 40px', display: 'flex', flexDirection: mob ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', gap: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.02)' }}>
          <div>
             <div style={{ color: '#0f172a', fontSize: '18px', fontWeight: 900, letterSpacing: '-0.02em', fontFamily: 'Outfit, sans-serif' }}>CreatorBharat v1.0 Ecosystem Guidelines</div>
             <div style={{ color: '#475569', fontSize: '13px', marginTop: '4px', fontWeight: 550 }}>Explore direct campaign matching and creator success protocols.</div>
          </div>
          <button style={{ 
            background: 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)', 
            color: '#fff', 
            padding: '14px 28px', 
            borderRadius: '14px', 
            border: 'none', 
            fontWeight: 800, 
            fontSize: '13.5px',
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            cursor: 'pointer', 
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 15px rgba(255, 148, 49, 0.3)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
             VIEW GUIDELINES <ExternalLink size={15} />
          </button>
       </div>
    </div>
  );
}

IntelligenceHub.propTypes = {
  mob: PropTypes.bool.isRequired
};
