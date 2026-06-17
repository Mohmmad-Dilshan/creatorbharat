import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Database, Server, ExternalLink } from 'lucide-react';
import { OFFICIAL_DATA } from './officialData';

export default function IntelligenceHub({ mob }) {
  return (
    <div style={{ padding: '40px 0' }}>
       <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '2px', color: '#fff', fontFamily: 'Outfit, sans-serif' }}>PROTOCOL ARCHITECTURE</h3>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>Decentralized node distribution & regional sharding status.</p>
       </div>
       
       {/* Shard Directory */}
       <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '32px', padding: mob ? '20px' : '32px', marginBottom: '32px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', padding: '0 8px' }}>
             <div style={{ fontSize: '14px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
               <Server size={18} color="#3B82F6" /> ACTIVE SHARD DIRECTORY
             </div>
             <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.5px' }}>REFRESHING IN 12s...</div>
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
                     background: 'rgba(255, 255, 255, 0.03)', 
                     borderRadius: '20px', 
                     border: '1px solid rgba(255, 255, 255, 0.05)',
                     gap: mob ? '16px' : '24px',
                     transition: 'all 0.2s ease'
                   }}
                   onMouseEnter={e => {
                     e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                     e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                   }}
                   onMouseLeave={e => {
                     e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                     e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
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
                          <div style={{ fontSize: '15px', fontWeight: 850, color: '#fff' }}>{shard.region}</div>
                          <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}>Node ID: {shard.id}_PROT_001</div>
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
                            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>Latency: {shard.latency}</div>
                          </div>
                       </div>
                    </div>

                    {/* Load & Capacity Meter */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1.8 }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <span style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.5px' }}>CAPACITY LOAD</span>
                         <span style={{ fontSize: '11.5px', fontFamily: 'monospace', fontWeight: 800, color: barColor }}>{shard.load}</span>
                       </div>
                       <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '100px', overflow: 'hidden' }}>
                         <div style={{ width: `${loadPercent}%`, height: '100%', background: barColor, borderRadius: '100px', transition: 'width 0.6s ease' }} />
                       </div>
                    </div>

                    {/* Stats Action Button */}
                    <button style={{ 
                      background: 'rgba(255, 255, 255, 0.05)', 
                      border: '1.5px solid rgba(255, 255, 255, 0.08)', 
                      padding: '8px 16px', 
                      borderRadius: '10px', 
                      fontSize: '11px', 
                      fontWeight: 800, 
                      color: '#fff',
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.style.color = '#0f172a';
                      e.currentTarget.style.borderColor = '#fff';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
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
       <div style={{ background: 'linear-gradient(90deg, #0f172a 0%, #1a2235 100%)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '28px', padding: mob ? '24px' : '32px 40px', display: 'flex', flexDirection: mob ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', gap: '20px', boxShadow: '0 15px 35px rgba(0,0,0,0.3)' }}>
          <div>
             <div style={{ color: '#fff', fontSize: '18px', fontWeight: 900, letterSpacing: '-0.02em', fontFamily: 'Outfit, sans-serif' }}>Protocol v1.0 Technical Whitepaper</div>
             <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', marginTop: '4px', fontWeight: 550 }}>Explore the consensus logic and trust-score algorithms.</div>
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
             VIEW DOCS <ExternalLink size={15} />
          </button>
       </div>
    </div>
  );
}

IntelligenceHub.propTypes = {
  mob: PropTypes.bool.isRequired
};
