import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Globe, Rocket } from 'lucide-react';

export default function RoadmapTimeline() {
  const [hoveredStepId, setHoveredStepId] = useState(null);

  const roadmapSteps = [
    { 
      id: 'v1', 
      t: 'v1.0 Platform Launch', 
      d: 'Q2 2026', 
      s: 'COMPLETE', 
      c: '#10B981', 
      icon: Code2,
      desc: 'Ecosystem launch: Direct brand-creator matching engine, secure escrow payment systems, and verified analytics live across India.'
    },
    { 
      id: 'ai', 
      t: 'AI Discovery V2', 
      d: 'Q3 2026', 
      s: 'BETA', 
      c: '#FF9431', 
      icon: Cpu,
      desc: 'Advanced matching engine matching brands to target demographics with semantic search and predictive conversion metrics.'
    },
    { 
      id: 'sync', 
      t: 'Regional Hub Expansion', 
      d: 'Q4 2026', 
      s: 'PENDING', 
      c: '#3B82F6', 
      icon: Globe,
      desc: 'Expanding regional hubs in Tier-2/3 cities. Localized creator communities and brand meetups in Maharashtra, UP, and Karnataka.'
    },
    { 
      id: 'v2', 
      t: 'Escrow Dispute Courts', 
      d: '2027', 
      s: 'PLANNED', 
      c: '#7C3AED', 
      icon: Rocket,
      desc: 'Automated contract resolutions, community dispute boards, and instant payouts based on automated performance metrics.'
    }
  ];

  return (
    <div style={{ padding: '40px 0', maxWidth: '650px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
         <h3 style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '2px', color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>LAUNCH ROADMAP</h3>
         <p style={{ color: '#475569', fontSize: '14px', marginTop: '4px' }}>Our technical expansion stages and milestones.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {roadmapSteps.map((item, i, arr) => {
          const isHovered = hoveredStepId === item.id;
          const isCompleted = item.s === 'COMPLETE';

          return (
            <div key={item.id} style={{ display: 'flex', gap: '24px', position: 'relative', paddingBottom: i < arr.length - 1 ? '40px' : '0' }}>
               
               {/* Glowing Line Segment Connector */}
               {i < arr.length - 1 && (
                 <div style={{ 
                   position: 'absolute', 
                   left: '21px', 
                   top: '44px', 
                   bottom: 0, 
                   width: '3px', 
                   background: isCompleted 
                     ? `linear-gradient(to bottom, ${item.c}, ${arr[i+1].c}50)` 
                     : 'linear-gradient(to bottom, #cbd5e1 50%, transparent 50%)',
                   backgroundSize: isCompleted ? 'auto' : '3px 12px', // dashed effect for pending
                   opacity: 0.8,
                   zIndex: 0
                 }} />
               )}

               {/* Glowing Node */}
               <motion.div 
                 animate={isCompleted ? { boxShadow: [`0 0 8px ${item.c}40`, `0 0 16px ${item.c}70`, `0 0 8px ${item.c}40`] } : {}}
                 transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                 style={{ 
                   width: '46px', 
                   height: '46px', 
                   borderRadius: '14px', 
                   background: '#ffffff', 
                   display: 'flex', 
                   alignItems: 'center', 
                   justifyContent: 'center', 
                   zIndex: 1, 
                   border: `2px solid ${item.c}`,
                   boxShadow: `0 4px 12px ${item.c}20`,
                   cursor: 'pointer',
                   flexShrink: 0
                 }}
               >
                 <item.icon size={20} color={item.c} />
               </motion.div>

               {/* Capsule Card */}
               <motion.div
                 onMouseEnter={() => setHoveredStepId(item.id)}
                 onMouseLeave={() => setHoveredStepId(null)}
                 style={{
                   flex: 1,
                   background: '#ffffff',
                   border: isHovered ? `1.5px solid ${item.c}` : '1.5px solid #e2e8f0',
                   borderRadius: '24px',
                   padding: '24px',
                   boxShadow: isHovered 
                     ? `0 15px 35px ${item.c}12, 0 5px 15px rgba(0,0,0,0.03)` 
                     : '0 4px 20px rgba(0,0,0,0.02)',
                   transform: isHovered ? 'translateX(6px)' : 'translateX(0)',
                   transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                   position: 'relative',
                   textAlign: 'left'
                 }}
               >
                 {/* Card Accent Border Indicator */}
                 <div style={{
                   position: 'absolute',
                   left: 0,
                   top: '24px',
                   bottom: '24px',
                   width: '4px',
                   borderRadius: '0 4px 4px 0',
                   background: item.c
                 }} />

                 {/* Top Badge & Date Row */}
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingLeft: '10px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 900, color: item.c, textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {item.d}
                    </span>
                    <span style={{ 
                      fontSize: '9px', 
                      fontWeight: 900, 
                      color: item.c, 
                      background: `${item.c}12`, 
                      padding: '4px 10px', 
                      borderRadius: '100px', 
                      letterSpacing: '0.5px' 
                     }}>
                      {item.s}
                    </span>
                 </div>

                 {/* Card Body */}
                 <div style={{ paddingLeft: '10px' }}>
                    <h4 style={{ fontSize: '17px', fontWeight: 900, color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.02em', fontFamily: 'Outfit, sans-serif' }}>
                      {item.t}
                    </h4>
                    <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: 1.6, fontWeight: 550 }}>
                      {item.desc}
                    </p>
                 </div>
               </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
