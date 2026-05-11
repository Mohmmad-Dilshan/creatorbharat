import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Calculator, 
  Camera as Instagram, 
  ArrowRight,
  PieChart,
  Sparkles,
  Flame
} from 'lucide-react';
import { Btn, Bdg } from '@/components/common/Primitives';
import { fmt } from '../../utils/helpers';
import Seo from '@/components/common/SEO';

const RollingNumber = ({ value }) => {
  const [display, setDisplay] = useState(value);
  
  useEffect(() => {
    let start = display;
    const end = value;
    const duration = 500;
    let startTime = null;

    const animate = (now) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.floor(start + (end - start) * progress);
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <span>₹{display.toLocaleString('en-IN')}</span>;
};

RollingNumber.propTypes = {
  value: PropTypes.number.isRequired
};

const ContentCard = ({ title, amount, demand, icon: Icon, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    style={{
      background: '#fff',
      padding: '24px',
      borderRadius: '28px',
      border: '1px solid #f1f5f9',
      boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
       <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#FF943115', color: '#FF9431', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={20} />
       </div>
       <Bdg sm color={demand === 'High' ? 'orange' : 'green'}>{demand} Demand</Bdg>
    </div>
    <div style={{ fontSize: '14px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</div>
    <div style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.02em', marginTop: '4px' }}>
       <RollingNumber value={amount} />
    </div>
  </motion.div>
);

ContentCard.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  demand: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  delay: PropTypes.number
};

export default function RateCalcPage() {
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [F, setF] = useState({ platform: 'Instagram', followers: 25000, niche: 'Lifestyle', er: 4.2 });
  const [result, setResult] = useState(null);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const calculateRates = () => {
    const f = Number(F.followers);
    const er = Number(F.er);
    
    const pmult = { Instagram: 1, YouTube: 1.8, LinkedIn: 2.5, Twitter: 0.8 }[F.platform] || 1;
    const nmult = { Finance: 2.2, Tech: 1.9, Fashion: 1.3, Travel: 1.5, Gaming: 1.4, Beauty: 1.2, Lifestyle: 1.1 }[F.niche] || 1;
    
    let ebonus = 1;
    if (er >= 10) ebonus = 1.6;
    else if (er >= 6) ebonus = 1.3;
    else if (er < 2) ebonus = 0.7;

    const base = f * 0.018; 
    const post = Math.round(base * pmult * nmult * ebonus / 100) * 100;
    
    setResult({
      post,
      reel: Math.round(post * 1.7 / 100) * 100,
      story: Math.round(post * 0.4 / 100) * 100,
      integration: Math.round(post * 3.2 / 100) * 100,
      power: Math.min(Math.round((er * 10) + (nmult * 10)), 100)
    });
  };

  useEffect(() => {
    calculateRates();
  }, [F]);

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh' }}>
      <Seo 
        title="Creator Rate Calculator"
        description="Calculate your worth with our data-driven influencer rate calculator. Based on real brand deals from across Bharat."
        keywords="creator rate calculator, influencer earnings, brand deal calculator india"
      />
      
      {/* Cinematic Header */}
      <section style={{ 
        background: '#050505', 
        padding: mob ? '120px 20px 60px' : '160px 24px 100px', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255, 148, 49, 0.12), transparent 70%)', opacity: 0.8 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #FF9431, #fff, #10B981)' }} />
        
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px', 
              background: 'rgba(255, 255, 255, 0.05)', 
              padding: '10px 20px', 
              borderRadius: '100px',
              marginBottom: '32px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Calculator size={16} color="#FF9431" />
            <span style={{ fontSize: '13px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Creator Value Intelligence</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(48px, 8vw, 84px)', fontWeight: 950, color: '#fff', marginBottom: '24px', letterSpacing: '-0.05em', lineHeight: 0.95 }}
          >
            Quantify Your <br />
            <span style={{ background: 'linear-gradient(90deg, #FF9431, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Social Equity.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: mob ? '16px' : '20px', color: 'rgba(255, 255, 255, 0.6)', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}
          >
            Use real-time algorithms powered by 25,000+ Bharat creators to calculate exactly what you should be charging brands.
          </motion.p>
        </div>
      </section>

      {/* Main App Container */}
      <main style={{ maxWidth: '1100px', margin: mob ? '-40px auto 120px' : '-80px auto 120px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
         <div style={{ background: '#fff', borderRadius: '48px', padding: mob ? '24px' : '60px', boxShadow: '0 40px 100px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.2fr 0.8fr', gap: mob ? '40px' : '80px' }}>
               
               {/* Left: Input Console */}
               <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                     Campaign Intel <Calculator size={20} color="#FF9431" />
                  </h2>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                     <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                        <legend style={{ fontSize: '13px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', display: 'block' }}>Primary Platform</legend>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
                           {['Instagram', 'YouTube', 'LinkedIn', 'Twitter'].map(p => {
                               const active = F.platform === p;
                               return (
                                  <button
                                    key={p}
                                    onClick={() => setF({...F, platform: p})}
                                    style={{
                                      padding: '16px',
                                      borderRadius: '20px',
                                      border: `2px solid ${active ? '#FF9431' : '#f1f5f9'}`,
                                      background: active ? '#FF943110' : 'transparent',
                                      color: active ? '#FF9431' : '#64748b',
                                      fontWeight: 900,
                                      fontSize: '14px',
                                      cursor: 'pointer',
                                      transition: 'all 0.3s ease'
                                    }}
                                  >
                                    {p}
                                  </button>
                               );
                           })}
                        </div>
                     </fieldset>

                     <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px' }}>
                        <div>
                           <label htmlFor="followers" style={{ fontSize: '13px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', display: 'block' }}>Follower Count</label>
                           <input 
                             id="followers"
                             type="number" 
                             value={F.followers} 
                             onChange={e => setF({...F, followers: e.target.value})}
                             style={{ width: '100%', padding: '18px 24px', borderRadius: '20px', border: '2px solid #f1f5f9', background: '#f8fafc', fontSize: '18px', fontWeight: 900, outline: 'none', color: '#0f172a' }}
                           />
                        </div>
                        <div>
                           <label htmlFor="er" style={{ fontSize: '13px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', display: 'block' }}>Engagement Rate (%)</label>
                           <input 
                             id="er"
                             type="number" 
                             value={F.er} 
                             onChange={e => setF({...F, er: e.target.value})}
                             style={{ width: '100%', padding: '18px 24px', borderRadius: '20px', border: '2px solid #f1f5f9', background: '#f8fafc', fontSize: '18px', fontWeight: 900, outline: 'none', color: '#0f172a' }}
                           />
                        </div>
                     </div>

                     <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                        <legend style={{ fontSize: '13px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', display: 'block' }}>Content Niche</legend>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                           {['Lifestyle', 'Finance', 'Tech', 'Fashion', 'Travel', 'Gaming', 'Beauty'].map(n => {
                               const active = F.niche === n;
                               return (
                                  <button
                                    key={n}
                                    onClick={() => setF({...F, niche: n})}
                                    style={{
                                      padding: '10px 20px',
                                      borderRadius: '100px',
                                      border: `1.5px solid ${active ? '#0f172a' : '#f1f5f9'}`,
                                      background: active ? '#0f172a' : 'transparent',
                                      color: active ? '#fff' : '#64748b',
                                      fontWeight: 800,
                                      fontSize: '13px',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s ease'
                                    }}
                                  >
                                    {n}
                                  </button>
                               );
                           })}
                        </div>
                     </fieldset>
                  </div>
               </div>

               {/* Right: Results Display */}
               <div>
                  {result ? (
                     <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                        <div style={{ background: '#0f172a', borderRadius: '40px', padding: mob ? '32px' : '48px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                           <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'radial-gradient(circle at 100% 0%, rgba(255, 148, 49, 0.2), transparent 70%)' }} />
                           
                           <div style={{ fontSize: '12px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>Estimated Rate</div>
                           <div style={{ fontSize: mob ? '48px' : '64px', fontWeight: 950, letterSpacing: '-0.04em', marginBottom: '32px' }}>
                              <RollingNumber value={result.post} />
                           </div>

                           <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
                                 <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Min. Expected</span>
                                 <span style={{ fontSize: '16px', fontWeight: 800 }}>₹{fmt.num(result.post * 0.8)}</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
                                 <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Max. Potential</span>
                                 <span style={{ fontSize: '16px', fontWeight: 800 }}>₹{fmt.num(result.post * 1.3)}</span>
                              </div>
                           </div>

                           <Btn 
                             full lg 
                             onClick={() => navigate('/apply')}
                             style={{ marginTop: '40px', background: '#FF9431', color: '#fff', border: 'none', borderRadius: '100px', padding: '20px', fontWeight: 950 }}
                           >
                              Claim My Elite Profile <ArrowRight size={20} />
                           </Btn>
                        </div>

                        <div style={{ marginTop: '40px' }}>
                           <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Suggested Content Mix</h3>
                           <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '16px' }}>
                              <ContentCard title="Video Reel" amount={Math.round(result.post * 1.5)} demand="High" icon={Instagram} delay={0.1} />
                              <ContentCard title="Series Post" amount={result.post} demand="Medium" icon={Instagram} delay={0.2} />
                           </div>
                        </div>
                     </motion.div>
                  ) : (
                     <div style={{ height: '100%', minHeight: '400px', background: '#f8fafc', borderRadius: '40px', border: '2px dashed #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                           <PieChart size={32} color="#cbd5e1" />
                        </div>
                        <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>Analysis Pending</h3>
                        <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6 }}>Fill in your metrics to generate an AI-driven market rate assessment.</p>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </main>

      {/* Trust Footer */}
      <section style={{ padding: '0 24px 120px', textAlign: 'center' }}>
         <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#94a3b8' }}>
                  <Sparkles size={20} />
                  <span style={{ fontSize: '14px', fontWeight: 700 }}>AI Price Discovery</span>
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#94a3b8' }}>
                  <Flame size={20} />
                  <span style={{ fontSize: '14px', fontWeight: 700 }}>Bharat Market Real-time</span>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
