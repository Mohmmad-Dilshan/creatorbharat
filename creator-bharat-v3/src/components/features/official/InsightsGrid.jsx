import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Globe, Shield, Zap, BarChart, ChevronDown, ChevronUp, Server } from 'lucide-react';
import { OFFICIAL_DATA } from './officialData';

const REGION_DETAILS = {
  'Maharashtra': [
    { name: 'Mumbai Primary Shard (MH_01)', latency: '8ms', load: '92%' },
    { name: 'Pune Edge Sync Node (MH_02)', latency: '14ms', load: '78%' },
    { name: 'Nagpur Cache Shard (MH_03)', latency: '22ms', load: '45%' }
  ],
  'Delhi NCR': [
    { name: 'New Delhi HQ Core (DL_01)', latency: '6ms', load: '95%' },
    { name: 'Gurugram Brand Sync (DL_02)', latency: '11ms', load: '82%' },
    { name: 'Noida Escrow Ledger (DL_03)', latency: '15ms', load: '60%' }
  ],
  'Karnataka': [
    { name: 'Bengaluru Core Cluster (KA_01)', latency: '5ms', load: '98%' },
    { name: 'Mysuru Regional Node (KA_02)', latency: '18ms', load: '40%' },
    { name: 'Mangaluru Cache Edge (KA_03)', latency: '24ms', load: '52%' }
  ]
};

export default function InsightsGrid({ mob }) {
  const [expandedRegion, setExpandedRegion] = useState(null);

  const toggleRegion = (regionName) => {
    setExpandedRegion(prev => prev === regionName ? null : regionName);
  };

  return (
    <div style={{ padding: '40px 0' }}>
      {/* Top Level Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
         {[
           { l: 'Network Reach', v: '85.4M', i: Globe, c: '#3B82F6', t: '+4.2%', d: [25, 45, 30, 60, 50, 70, 65, 85, 75, 92] },
           { l: 'Trust Handshakes', v: '12.4M', i: Shield, c: '#10B981', t: '+12.1%', d: [15, 30, 20, 50, 40, 65, 60, 78, 70, 95] },
           { l: 'Protocol Revenue', v: '₹4.8Cr', i: Zap, c: '#FF9431', t: '+8.4%', d: [35, 40, 32, 58, 48, 72, 60, 80, 75, 88] }
         ].map((s) => {
           const id = s.l.replace(/\s+/g, '');
           const dataPoints = s.d;
           const pathD = `M ${dataPoints.map((val, idx) => `${(idx / (dataPoints.length - 1)) * 100} ${45 - (val / 100) * 35}`).join(' L ')}`;
           const areaD = `M 0 45 L ${dataPoints.map((val, idx) => `${(idx / (dataPoints.length - 1)) * 100} ${45 - (val / 100) * 35}`).join(' L ')} L 100 45 Z`;
           const endY = 45 - (dataPoints[dataPoints.length - 1] / 100) * 35;

           return (
             <div 
               key={s.l} 
               style={{ 
                 background: '#ffffff', 
                 padding: '24px', 
                 borderRadius: '24px', 
                 border: '1px solid #e2e8f0', 
                 boxShadow: '0 8px 25px rgba(0,0,0,0.02)',
                 transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                 position: 'relative',
                 overflow: 'hidden'
               }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.transform = 'translateY(-4px)';
                 e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.04)';
                 e.currentTarget.style.background = '#f8fafc';
                 e.currentTarget.style.borderColor = '#cbd5e1';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.transform = 'translateY(0)';
                 e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.02)';
                 e.currentTarget.style.background = '#ffffff';
                 e.currentTarget.style.borderColor = '#e2e8f0';
               }}
             >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                   <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${s.c}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${s.c}20` }}><s.i size={22} color={s.c} /></div>
                   <div style={{ fontSize: '11px', fontWeight: 850, color: s.c, background: `${s.c}12`, padding: '4px 8px', borderRadius: '6px' }}>{s.t}</div>
                </div>
                
                <div style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>{s.v}</div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', letterSpacing: '0.5px', marginBottom: '16px' }}>{s.l.toUpperCase()}</div>

                {/* Interactive Sparkline SVG Graph */}
                <div style={{ width: '100%', height: '45px', display: 'block' }}>
                   <svg width="100%" height="45" viewBox="0 0 100 45" style={{ overflow: 'visible' }}>
                     <defs>
                       <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
                         <stop offset="0%" stopColor={s.c} stopOpacity="0.25" />
                         <stop offset="100%" stopColor={s.c} stopOpacity="0.0" />
                       </linearGradient>
                     </defs>
                     <path
                       d={areaD}
                       fill={`url(#grad-${id})`}
                     />
                     <path
                       d={pathD}
                       fill="none"
                       stroke={s.c}
                       strokeWidth="2.5"
                       strokeLinecap="round"
                       strokeLinejoin="round"
                      // Subtle glow filter
                      style={{ filter: `drop-shadow(0 2px 4px ${s.c}40)` }}
                     />
                     <circle
                       cx="100"
                       cy={endY}
                       r="3.5"
                       fill={s.c}
                       stroke="#ffffff"
                       strokeWidth="1.5"
                     />
                   </svg>
                </div>
             </div>
           );
         })}
      </div>

      {/* Regional Performance Panel */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '32px', padding: mob ? '24px' : '32px', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '16px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}><BarChart size={20} color="#3B82F6" /> REGIONAL PERFORMANCE SHARDS</div>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>CLICK ROW TO EXPAND</span>
         </div>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {OFFICIAL_DATA.analytics.regions.map((reg) => {
              const isExpanded = expandedRegion === reg.name;
              const details = REGION_DETAILS[reg.name] || [];

              return (
                <div key={reg.name} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                  <div 
                    onClick={() => toggleRegion(reg.name)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      padding: '16px', 
                      borderRadius: '16px',
                      cursor: 'pointer',
                      background: isExpanded ? '#f1f5f9' : 'transparent',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isExpanded) e.currentTarget.style.background = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                      if (!isExpanded) e.currentTarget.style.background = 'transparent';
                    }}
                  >
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6', boxShadow: '0 0 8px #3B82F6' }} />
                        <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{reg.name}</div>
                     </div>
                     <div style={{ display: 'flex', gap: mob ? '16px' : '32px', alignItems: 'center' }}>
                        <div style={{ textAlign: 'right' }}>
                           <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>{reg.count}</div>
                           <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700 }}>CREATORS</div>
                        </div>
                        <div style={{ color: '#10B981', fontSize: '13px', fontWeight: 800 }}>{reg.trend}</div>
                        {isExpanded ? <ChevronUp size={18} color="#64748b" /> : <ChevronDown size={18} color="#64748b" />}
                     </div>
                  </div>

                  {/* Expanded Region Node Details */}
                  {isExpanded && (
                    <div style={{ 
                      padding: '8px 16px 20px 36px',
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '12px',
                      background: '#f8fafc',
                      borderBottomLeftRadius: '16px',
                      borderBottomRightRadius: '16px',
                      marginTop: '-8px'
                    }}>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', letterSpacing: '0.5px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Server size={12} /> SYNCED SHARD EDGE DETAILS
                      </div>
                      
                      {details.map(node => (
                        <div key={node.name} style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', justifyContent: 'space-between', alignItems: mob ? 'flex-start' : 'center', gap: '8px', padding: '10px 12px', background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>{node.name}</span>
                          <div style={{ display: 'flex', gap: '16px', fontSize: '11.5px', color: '#475569', fontWeight: 600 }}>
                            <span>Latency: <strong style={{ color: '#10B981' }}>{node.latency}</strong></span>
                            <span>Load: <strong style={{ color: '#94a3b8' }}>{node.load}</strong></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
         </div>
      </div>
    </div>
  );
}

InsightsGrid.propTypes = {
  mob: PropTypes.bool.isRequired
};
