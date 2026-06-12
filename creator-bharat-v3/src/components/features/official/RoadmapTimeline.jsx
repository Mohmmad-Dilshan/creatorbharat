import React from 'react';
import { Code2, Cpu, Globe, Rocket } from 'lucide-react';

export default function RoadmapTimeline() {
  const roadmapSteps = [
    { id: 'v3', t: 'V3.0 Core Sync', d: 'Q2 2024', s: 'COMPLETE', c: '#10B981', icon: Code2 },
    { id: 'ai', t: 'AI Matching Engine', d: 'Q3 2024', s: 'BETA', c: '#FF9431', icon: Cpu },
    { id: 'sync', t: 'Global Sync Node', d: 'Q4 2024', s: 'PENDING', c: '#3B82F6', icon: Globe },
    { id: 'v4', t: 'Protocol V4 Launch', d: '2025', s: 'PLANNED', c: '#7C3AED', icon: Rocket }
  ];

  return (
    <div style={{ padding: '40px 0', maxWidth: '600px', margin: '0 auto' }}>
      {roadmapSteps.map((item, i, arr) => (
        <div key={item.id} style={{ display: 'flex', gap: '20px', marginBottom: '32px', position: 'relative' }}>
           {i < arr.length - 1 && <div style={{ position: 'absolute', left: '20px', top: '40px', bottom: '-32px', width: '2px', background: '#f1f5f9' }} />}
           <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: `${item.c}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' , zIndex: 1, border: `1px solid ${item.c}20` }}>
              <item.icon size={20} color={item.c} />
           </div>
           <div>
              <div style={{ fontSize: '11px', fontWeight: 900, color: item.c }}>{item.d} • {item.s}</div>
              <div style={{ fontSize: '16px', fontWeight: 700, marginTop: '2px' }}>{item.t}</div>
           </div>
        </div>
      ))}
    </div>
  );
}
