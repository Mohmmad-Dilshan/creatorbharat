import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context';
import { Btn } from '../Primitives';

export default function DemoModal({ open }) {
  const { dsp } = useApp();
  const [step, setStep] = useState(1);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ 
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', 
          backdropFilter: 'blur(12px)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
        }}
        onClick={() => dsp({ t: 'UI', v: { demoModal: false } })}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          style={{ 
            width: '100%', maxWidth: 1000, background: '#fff', borderRadius: 40, 
            overflow: 'hidden', position: 'relative', boxShadow: '0 40px 120px rgba(0,0,0,0.5)',
            display: 'flex', flexDirection: window.innerWidth < 768 ? 'column' : 'row', 
            height: window.innerWidth < 768 ? 'auto' : 580
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* FLOATING CLOSE BUTTON */}
          <button 
            onClick={() => dsp({ t: 'UI', v: { demoModal: false } })}
            style={{ position: 'absolute', top: 20, right: 20, width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.05)', border: 'none', cursor: 'pointer', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 300, color: '#111' }}
          >
            ×
          </button>

          {/* LEFT: THE INTERACTIVE SHOWCASE */}
          <div style={{ flex: 1.1, background: '#F8FAFC', padding: 24, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 12px', background: 'rgba(255,148,49,0.1)', color: '#FF9431', borderRadius: 100, fontSize: 9, fontWeight: 900, textTransform: 'uppercase', marginBottom: 12 }}>
                <span style={{ width: 6, height: 6, background: '#FF9431', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} /> Creator-First Vision
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: '#111', marginBottom: 6 }}>Your <span style={{ color: '#FF9431' }}>Identity</span>, Our Mission</h2>
              <p style={{ color: 'rgba(0,0,0,0.5)', fontWeight: 600, fontSize: 12, marginBottom: 16 }}>Built for the 100M+ creators of Bharat.</p>
            </div>

            {/* MOCKUP CONTAINER (SMALLER) */}
            <div style={{ flex: 1, background: '#fff', borderRadius: 20, border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden', padding: 8 }}>
               {step === 1 && <MediaKitDemo />}
               {step === 2 && <AuditDemo />}
               {step === 3 && <BrandDealDemo />}
            </div>

            {/* STEP CONTROLS */}
            <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
               {[1,2,3].map(i => (
                 <div key={i} onClick={() => setStep(i)} style={{ flex: 1, height: 3, borderRadius: 10, background: step === i ? '#FF9431' : 'rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'all 0.3s' }} />
               ))}
            </div>
          </div>

          {/* RIGHT: ACTION & INFO */}
          <div style={{ flex: 0.9, padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#fff', borderLeft: '1px solid rgba(0,0,0,0.05)' }}>
             <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 19, fontWeight: 900, color: '#111', marginBottom: 12 }}>
                   {step === 1 && "Identity: More than a Link"}
                   {step === 2 && "Verification: Real Influence"}
                   {step === 3 && "Economy: Direct Brand Power"}
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.5)', lineHeight: 1.5, fontWeight: 600 }}>
                   {step === 1 && "We believe you are a brand. Get a professional portfolio that showcases your unique story to the world."}
                   {step === 2 && "No more fake numbers. Get audited by our AI and earn the badge that brands actually trust."}
                   {step === 3 && "Skip the agencies. Connect directly with national brands and keep 100% of your hard-earned money."}
                </p>
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Btn lg style={{ width: '100%', background: '#111', color: '#fff', borderRadius: 100, fontWeight: 900, padding: '16px' }} onClick={() => dsp({ t: 'GO', p: 'apply' })}>Claim Your Creator Identity ⚡</Btn>
             </div>

             <div style={{ marginTop: 40, padding: 20, background: '#F8FAFC', borderRadius: 20, border: '1px solid rgba(0,0,0,0.05)' }}>
                <p style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)', fontWeight: 800, textTransform: 'uppercase', marginBottom: 8 }}>Trusted by 10k+ Creators</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                   <div style={{ display: 'flex' }}>
                      {[1,2,3].map(i => <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: '#eee', border: '2px solid #fff', marginLeft: i > 1 ? -10 : 0 }} />)}
                   </div>
                   <span style={{ fontSize: 12, fontWeight: 800, color: '#111' }}>Join the revolution today.</span>
                </div>
             </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function MediaKitDemo() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px 0' }}
    >
      {/* IPHONE MOCKUP (SHRUNK) */}
      <div style={{ 
        width: 190, height: 380, background: '#111', borderRadius: 36, padding: 5, 
        position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)' 
      }}>
        {/* NOTCH */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 60, height: 16, background: '#111', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, zIndex: 10 }} />
        
        {/* SCREEN */}
        <div style={{ width: '100%', height: '100%', background: '#fff', borderRadius: 32, overflowY: 'auto', position: 'relative', scrollbarWidth: 'none' }}>
           {/* HEADER */}
           <div style={{ height: 60, background: 'linear-gradient(45deg, #FF9431, #DC2626)', position: 'relative' }}>
              <div style={{ position: 'absolute', bottom: -20, left: 14, width: 40, height: 40, borderRadius: '50%', border: '2px solid #fff', overflow: 'hidden', background: '#eee' }}>
                 <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
           </div>
           
           <div style={{ padding: '24px 14px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                 <h4 style={{ fontSize: 11, fontWeight: 900, color: '#111' }}>Aryan Sharma</h4>
                 <span style={{ fontSize: 10 }}>✅</span>
              </div>
              <p style={{ fontSize: 7, color: '#FF9431', fontWeight: 900, textTransform: 'uppercase', marginTop: 2 }}>Fashion • Jaipur</p>
              
              <p style={{ fontSize: 8, color: 'rgba(0,0,0,0.6)', fontWeight: 600, marginTop: 8, lineHeight: 1.2 }}>
                 Capturing Bharat's authentic style. 🇮🇳 Fashion & Lifestyle hacks.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 12 }}>
                 <div style={{ background: '#F8FAFC', padding: 6, borderRadius: 10, textAlign: 'center' }}>
                    <div style={{ fontSize: 10, fontWeight: 900, color: '#111' }}>450k+</div>
                    <div style={{ fontSize: 5, fontWeight: 800, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase' }}>Reach</div>
                 </div>
                 <div style={{ background: '#F0FDF4', padding: 6, borderRadius: 10, textAlign: 'center' }}>
                    <div style={{ fontSize: 10, fontWeight: 900, color: '#10B981' }}>8.2%</div>
                    <div style={{ fontSize: 5, fontWeight: 800, color: 'rgba(16,185,129,0.5)', textTransform: 'uppercase' }}>Engage</div>
                 </div>
              </div>

              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 5 }}>
                 <div style={{ padding: '6px', background: '#111', color: '#fff', borderRadius: 6, fontSize: 8, fontWeight: 800, textAlign: 'center' }}>Connect</div>
                 <div style={{ padding: '6px', background: '#F1F5F9', color: '#111', borderRadius: 6, fontSize: 8, fontWeight: 800, textAlign: 'center' }}>📸 Instagram</div>
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}

function AuditDemo() {
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setProg(p => (p < 92 ? p + 1 : 92)), 30);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
       <div style={{ position: 'relative', width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg style={{ position: 'absolute', width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
             <circle cx="60" cy="60" r="50" fill="none" stroke="#eee" strokeWidth="10" />
             <circle cx="60" cy="60" r="50" fill="none" stroke="#10B981" strokeWidth="10" strokeDasharray="314" strokeDashoffset={314 - (314 * prog) / 100} strokeLinecap="round" />
          </svg>
          <div style={{ textAlign: 'center' }}>
             <div style={{ fontSize: 24, fontWeight: 900, color: '#111' }}>{prog}%</div>
             <div style={{ fontSize: 8, fontWeight: 900, color: '#10B981' }}>QUALITY</div>
          </div>
       </div>
       <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ height: 6, width: '100%', background: '#f5f5f5', borderRadius: 10, position: 'relative', overflow: 'hidden' }}>
             <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} style={{ position: 'absolute', inset: 0, background: '#FF9431' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontWeight: 900, color: 'rgba(0,0,0,0.4)' }}>
             <span>AUTHENTICITY</span>
             <span>85%</span>
          </div>
       </div>
    </motion.div>
  );
}

function BrandDealDemo() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
       <div style={{ padding: '12px', background: '#F0FDF4', borderRadius: 12, border: '1.5px solid #10B981', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: '#10B981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>🤝</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 900, color: '#111' }}>Nike India Proposal</div>
            <div style={{ fontSize: 10, color: '#10B981', fontWeight: 800 }}>Verified • ₹50,000</div>
          </div>
       </div>
       <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, overflowY: 'auto', paddingRight: 4 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ alignSelf: i % 2 === 0 ? 'flex-end' : 'flex-start', padding: '10px 12px', borderRadius: 12, background: i % 2 === 0 ? '#111' : '#f5f5f5', color: i % 2 === 0 ? '#fff' : '#111', fontSize: 11, maxWidth: '85%', fontWeight: 600 }}>
               {i === 1 && "Hey! Loved your recent travel reel. Can we collaborate?"}
               {i === 2 && "Sure! Check my Smart Media Kit for rates and data."}
               {i === 3 && "Perfect. Sending the contract through the dashboard."}
            </div>
          ))}
       </div>
    </motion.div>
  );
}
