import React from 'react';
import { T } from '../../theme';
import { W } from '../../utils/helpers';
import { motion } from 'framer-motion';
import { X, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function Faq({ mob }) {
  return (
    <section style={{ padding: mob ? '60px 20px' : '100px 20px', background: '#fdfdfd', position: 'relative', overflow: 'hidden' }}>
      
      {/* Decorative Blur Backgrounds */}
      <div style={{ position: 'absolute', top: '10%', left: '-10%', width: 500, height: 500, background: 'rgba(239, 68, 68, 0.05)', filter: 'blur(100px)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: 500, height: 500, background: 'rgba(16, 185, 129, 0.05)', filter: 'blur(100px)', borderRadius: '50%' }} />

      <div style={{ ...W(1200), position: 'relative', zIndex: 1 }}>
        
        {/* REVOLUTIONARY HEADING SECTION */}
        <div
          style={{ textAlign: 'center', marginBottom: mob ? 60 : 100 }}
        >
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 20px', 
            background: '#FEF2F2', border: '1px solid #FEE2E2', borderRadius: 100, marginBottom: 24 
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444', boxShadow: '0 0 10px rgba(239, 68, 68, 0.6)' }} />
            <span style={{ fontSize: 12, fontWeight: 900, color: '#EF4444', textTransform: 'uppercase', letterSpacing: '3px' }}>The Core Problem</span>
          </div>
          
          <h2 style={{ 
            fontFamily: "'Outfit', sans-serif", 
            fontSize: mob ? 40 : 72, 
            fontWeight: 900, 
            color: '#0f172a', 
            lineHeight: 1.1, 
            letterSpacing: '-0.04em'
          }}>
            The Industry is <span style={{ color: '#cbd5e1', textDecoration: 'line-through', textDecorationColor: '#EF4444', textDecorationThickness: '4px' }}>Broken.</span> <br />
            <span style={{ background: 'linear-gradient(135deg, #FF9431 0%, #138808 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', paddingRight: '10px' }}>We're Fixing it.</span>
          </h2>
        </div>

        {/* PROBLEM VS MISSION GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 40 : 64, alignItems: 'stretch' }}>
          
          {/* THE PROBLEM */}
          <div
            style={{ 
              padding: mob ? 32 : 56, 
              borderRadius: 32, 
              background: '#fff', 
              border: '1px solid rgba(239, 68, 68, 0.2)',
              boxShadow: '0 20px 40px -10px rgba(239, 68, 68, 0.05)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
             <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 4, background: 'linear-gradient(90deg, transparent, #EF4444, transparent)' }} />
             
             <div style={{ width: 64, height: 64, borderRadius: 20, background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
               <AlertTriangle size={32} color="#EF4444" strokeWidth={2.5} />
             </div>
             
             <h3 style={{ fontSize: mob ? 28 : 36, fontWeight: 900, color: '#0f172a', marginBottom: 32, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
               Middlemen taking 30% of your hard work.
             </h3>
             
             <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 24, padding: 0 }}>
                {[
                  'No formal portfolio. Pitching via messy screenshots.',
                  'Agencies eating up to 30% of your hard-earned money.',
                  'Unprofessional communication & ghosting via chaotic DMs.',
                  'Tier 2 & 3 talent being completely ignored by national brands.',
                  'High risk of payment delays and agency frauds.'
                ].map((p, i) => (
                  <li key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', fontSize: mob ? 15 : 17, color: '#475569', fontWeight: 600, lineHeight: 1.5 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                      <X size={14} color="#EF4444" strokeWidth={3} />
                    </div>
                    {p}
                  </li>
                ))}
             </ul>
          </div>

          {/* THE MISSION */}
          <div
            style={{ 
              padding: mob ? 32 : 56, 
              borderRadius: 32, 
              background: '#0f172a', 
              color: '#fff',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              boxShadow: '0 30px 60px -15px rgba(16, 185, 129, 0.15)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
             {/* Glow effect */}
             <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, background: '#10B981', filter: 'blur(120px)', opacity: 0.2 }} />

             <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 4, background: 'linear-gradient(90deg, transparent, #10B981, transparent)' }} />
             
             <div style={{ width: 64, height: 64, borderRadius: 20, background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
               <ShieldCheck size={32} color="#10B981" strokeWidth={2.5} />
             </div>

             <h3 style={{ fontSize: mob ? 28 : 36, fontWeight: 900, color: '#fff', marginBottom: 32, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
               Empowering the Real Bharat Creator.
             </h3>
             
             <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 24, padding: 0, position: 'relative', zIndex: 2 }}>
                {[
                  'Smart Media Kit (Your elite, verified SaaS portfolio).',
                  '0% Commission. You keep exactly 100% of your earnings.',
                  'Formal dashboard for professional & safe brand deals.',
                  'National spotlight and premium visibility for local talent.',
                  'Direct connections with top brands—no middlemen.'
                ].map((p, i) => (
                  <li key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', fontSize: mob ? 15 : 17, color: '#e2e8f0', fontWeight: 500, lineHeight: 1.5 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2, boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)' }}>
                      <CheckCircle2 size={14} color="#fff" strokeWidth={3} />
                    </div>
                    {p}
                  </li>
                ))}
             </ul>
          </div>

        </div>

        {/* BOTTOM TAGLINE */}
        <div
          style={{ textAlign: 'center', marginTop: mob ? 60 : 80 }}
        >
           <div style={{ display: 'inline-block', padding: '16px 32px', background: '#fff', border: '1px solid rgba(0,0,0,0.05)', borderRadius: 100, boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
             <p style={{ fontSize: mob ? 16 : 20, fontWeight: 700, color: '#334155', fontStyle: 'italic' }}>
               <span style={{ color: '#FF9431', fontSize: 24, lineHeight: 0, verticalAlign: 'middle' }}>"</span>
               Hum middlemen ko nahi, <strong style={{ color: '#0f172a', fontWeight: 900 }}>talent</strong> ko aage badhana chahte hain.
               <span style={{ color: '#FF9431', fontSize: 24, lineHeight: 0, verticalAlign: 'middle' }}>"</span>
             </p>
           </div>
        </div>

      </div>
    </section>
  );
}
