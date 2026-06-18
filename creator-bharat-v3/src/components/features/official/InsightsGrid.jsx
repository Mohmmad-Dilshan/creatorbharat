import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Globe, Shield, Zap, BarChart, ChevronDown, ChevronUp, Server } from 'lucide-react';
import { OFFICIAL_DATA } from './officialData';

const REGION_DETAILS = {
  'Maharashtra': [
    { name: 'Mumbai Entertainment & Tech Hub', latency: '3.4K+ Creators', load: '98%' },
    { name: 'Pune Lifestyle & Fashion Hub', latency: '1.6K+ Creators', load: '90%' },
    { name: 'Nagpur Micro-Influencer Circle', latency: '0.8K+ Creators', load: '75%' }
  ],
  'Delhi NCR': [
    { name: 'Delhi Lifestyle & Food Hub', latency: '2.5K+ Creators', load: '95%' },
    { name: 'Gurugram Corporate & Tech Hub', latency: '1.2K+ Creators', load: '88%' },
    { name: 'Noida Fashion & Creative Circle', latency: '0.8K+ Creators', load: '80%' }
  ],
  'Karnataka': [
    { name: 'Bengaluru Tech & Gaming Hub', latency: '2.8K+ Creators', load: '97%' },
    { name: 'Mysuru Regional Content Circle', latency: '0.7K+ Creators', load: '70%' },
    { name: 'Mangaluru Micro-Influencer Circle', latency: '0.4K+ Creators', load: '65%' }
  ]
};

export default function InsightsGrid({ mob, creators = [] }) {
  const [expandedRegion, setExpandedRegion] = useState(null);

  const regionStats = useMemo(() => {
    const counts = {
      'Maharashtra': 0,
      'Delhi NCR': 0,
      'Karnataka': 0
    };

    const subCounts = {
      'Mumbai Entertainment & Tech Hub': 0,
      'Pune Lifestyle & Fashion Hub': 0,
      'Nagpur Micro-Influencer Circle': 0,
      'Delhi Lifestyle & Food Hub': 0,
      'Gurugram Corporate & Tech Hub': 0,
      'Noida Fashion & Creative Circle': 0,
      'Bengaluru Tech & Gaming Hub': 0,
      'Mysuru Regional Content Circle': 0,
      'Mangaluru Micro-Influencer Circle': 0
    };

    creators.forEach(c => {
      const state = (c.state || '').toLowerCase().trim();
      const city = (c.city || '').toLowerCase().trim();

      // Maharashtra
      if (state === 'maharashtra' || ['mumbai', 'bombay', 'pune', 'nagpur'].includes(city)) {
        counts['Maharashtra'] += 1;
        if (city === 'mumbai' || city === 'bombay') {
          subCounts['Mumbai Entertainment & Tech Hub'] += 1;
        } else if (city === 'pune') {
          subCounts['Pune Lifestyle & Fashion Hub'] += 1;
        } else if (city === 'nagpur') {
          subCounts['Nagpur Micro-Influencer Circle'] += 1;
        }
      }
      // Delhi NCR
      else if (['delhi', 'delhi ncr', 'ncr'].includes(state) || ['delhi', 'new delhi', 'gurugram', 'gurgaon', 'noida'].includes(city)) {
        counts['Delhi NCR'] += 1;
        if (city === 'delhi' || city === 'new delhi') {
          subCounts['Delhi Lifestyle & Food Hub'] += 1;
        } else if (city === 'gurugram' || city === 'gurgaon') {
          subCounts['Gurugram Corporate & Tech Hub'] += 1;
        } else if (city === 'noida') {
          subCounts['Noida Fashion & Creative Circle'] += 1;
        }
      }
      // Karnataka
      else if (state === 'karnataka' || ['bangalore', 'bengaluru', 'mysuru', 'mysore', 'mangaluru', 'mangalore'].includes(city)) {
        counts['Karnataka'] += 1;
        if (city === 'bangalore' || city === 'bengaluru') {
          subCounts['Bengaluru Tech & Gaming Hub'] += 1;
        } else if (city === 'mysuru' || city === 'mysore') {
          subCounts['Mysuru Regional Content Circle'] += 1;
        } else if (city === 'mangaluru' || city === 'mangalore') {
          subCounts['Mangaluru Micro-Influencer Circle'] += 1;
        }
      }
    });

    return { counts, subCounts };
  }, [creators]);

  const toggleRegion = (regionName) => {
    setExpandedRegion(prev => prev === regionName ? null : regionName);
  };

  return (
    <div style={{ padding: '40px 0' }}>
      {/* Top Level Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
         {[
           { l: 'Network Reach', v: '85.4M', i: Globe, c: '#3B82F6', t: '+4.2%', d: [25, 45, 30, 60, 50, 70, 65, 85, 75, 92] },
           { l: 'Campaigns Run', v: '1,200+', i: Shield, c: '#10B981', t: '+12.1%', d: [15, 30, 20, 50, 40, 65, 60, 78, 70, 95] },
           { l: 'Escrow Settled', v: '₹2.5Cr', i: Zap, c: '#FF9431', t: '+8.4%', d: [35, 40, 32, 58, 48, 72, 60, 80, 75, 88] }
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
            <div style={{ fontSize: '16px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}><BarChart size={20} color="#3B82F6" /> REGIONAL PERFORMANCE HUBS</div>
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
                           {(() => {
                             const baseCountMap = { 'Maharashtra': 5800, 'Delhi NCR': 4500, 'Karnataka': 3900 };
                             const totalCount = baseCountMap[reg.name] + (regionStats.counts[reg.name] || 0);
                             const displayCount = (totalCount / 1000).toFixed(1) + 'K';
                             return (
                               <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>{displayCount}</div>
                             );
                           })()}
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
                        <Server size={12} /> REGIONAL CREATOR DENSITY
                      </div>
                      
                      {details.map(node => {
                        const baseSubMap = {
                          'Mumbai Entertainment & Tech Hub': 3400,
                          'Pune Lifestyle & Fashion Hub': 1600,
                          'Nagpur Micro-Influencer Circle': 800,
                          'Delhi Lifestyle & Food Hub': 2500,
                          'Gurugram Corporate & Tech Hub': 1200,
                          'Noida Fashion & Creative Circle': 800,
                          'Bengaluru Tech & Gaming Hub': 2800,
                          'Mysuru Regional Content Circle': 700,
                          'Mangaluru Micro-Influencer Circle': 400
                        };
                        const totalSubCount = baseSubMap[node.name] + (regionStats.subCounts[node.name] || 0);
                        const displaySubReach = (totalSubCount / 1000).toFixed(1) + 'K+';

                        return (
                          <div key={node.name} style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', justifyContent: 'space-between', alignItems: mob ? 'flex-start' : 'center', gap: '8px', padding: '10px 12px', background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>{node.name}</span>
                            <div style={{ display: 'flex', gap: '16px', fontSize: '11.5px', color: '#475569', fontWeight: 600 }}>
                              <span>Creators: <strong style={{ color: '#10B981' }}>{displaySubReach}</strong></span>
                              <span>Active: <strong style={{ color: '#3B82F6' }}>{node.load}</strong></span>
                            </div>
                          </div>
                        );
                      })}
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
  mob: PropTypes.bool.isRequired,
  creators: PropTypes.array
};
