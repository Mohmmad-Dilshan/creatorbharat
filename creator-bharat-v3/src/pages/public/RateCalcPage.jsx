import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  Camera as Instagram, 
  Video as Youtube, 
  Briefcase as Linkedin, 
  Globe as Twitter, 
  TrendingUp, 
  ArrowRight,
  PieChart,
  Sparkles,
  Flame,
  Globe
} from 'lucide-react';
import { Btn, Card, Bdg } from '../../components/Primitives';
import { fmt } from '../../utils/helpers';

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
  const [F, setF] = useState({ platform: 'Instagram', followers: 25000, niche: 'Lifestyle', er: 4.2 });
  const [result, setResult] = useState(null);

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
    <div style={{ background: '#fcfcfc', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Header Section */}
      <section style={{ 
        background: '#050505', 
        padding: '180px 24px 120px', 
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
            style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.6)', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}
          >
            Use real-time algorithms powered by 25,000+ Bharat creators to calculate exactly what you should be charging brands.
          </motion.p>
        </div>
      </section>

      {/* Main Console */}
      <section style={{ padding: '0 24px 120px', marginTop: '-60px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '48px', alignItems: 'start' }}>
           
           {/* Control Hub */}
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             style={{ 
               background: '#fff', 
               borderRadius: '40px', 
               padding: '48px', 
               boxShadow: '0 40px 100px rgba(0,0,0,0.06)',
               border: '1px solid #f1f5f9'
             }}
           >
              <h3 style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a', marginBottom: '40px', letterSpacing: '-0.02em' }}>Audit Parameters</h3>
              
              {/* Platform Chips */}
              <div style={{ marginBottom: '40px' }}>
                 <div style={{ display: 'block', fontSize: '13px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '0.05em' }}>Deployment Platform</div>
                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                    {[
                      { id: 'Instagram', icon: Instagram },
                      { id: 'YouTube', icon: Youtube },
                      { id: 'LinkedIn', icon: Linkedin },
                      { id: 'Twitter', icon: Twitter }
                    ].map(p => (
                      <button
                        key={p.id}
                        onClick={() => setF({ ...F, platform: p.id })}
                        style={{
                          height: '64px',
                          borderRadius: '16px',
                          border: '2px solid ' + (F.platform === p.id ? '#FF9431' : '#f1f5f9'),
                          background: F.platform === p.id ? '#FF943108' : '#fff',
                          color: F.platform === p.id ? '#FF9431' : '#94a3b8',
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                         <p.icon size={22} strokeWidth={2.5} />
                      </button>
                    ))}
                 </div>
              </div>

              {/* Followers Input */}
              <div style={{ marginBottom: '40px' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
                    <label htmlFor="followersRange" style={{ fontSize: '13px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Follower Reach</label>
                    <span style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a' }}>{fmt.num(F.followers)}</span>
                 </div>
                 <input 
                   id="followersRange"
                   type="range" min="1000" max="1000000" step="1000"
                   value={F.followers}
                   onChange={(e) => setF({ ...F, followers: e.target.value })}
                   style={{ width: '100%', accentColor: '#FF9431', height: '6px', borderRadius: '100px', cursor: 'pointer' }}
                 />
              </div>

              {/* Engagement Input */}
              <div style={{ marginBottom: '40px' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
                    <label htmlFor="erRange" style={{ fontSize: '13px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Engagement Pulse</label>
                    <span style={{ fontSize: '24px', fontWeight: 950, color: '#10B981' }}>{F.er}%</span>
                 </div>
                 <input 
                   id="erRange"
                   type="range" min="0.5" max="25" step="0.1"
                   value={F.er}
                   onChange={(e) => setF({ ...F, er: e.target.value })}
                   style={{ width: '100%', accentColor: '#10B981', height: '6px', borderRadius: '100px', cursor: 'pointer' }}
                 />
              </div>

              {/* Niche Grid */}
              <div>
                 <div style={{ display: 'block', fontSize: '13px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '0.05em' }}>Content Niche</div>
                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {['Lifestyle', 'Finance', 'Tech', 'Gaming', 'Beauty', 'Travel', 'Food'].map(n => (
                      <button
                        key={n}
                        onClick={() => setF({ ...F, niche: n })}
                        style={{
                          padding: '12px 20px',
                          borderRadius: '100px',
                          border: '1.5px solid ' + (F.niche === n ? '#0f172a' : '#f1f5f9'),
                          background: F.niche === n ? '#0f172a' : 'transparent',
                          color: F.niche === n ? '#fff' : '#64748b',
                          fontSize: '13px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                         {n}
                      </button>
                    ))}
                 </div>
              </div>
           </motion.div>

           {/* Results Dashboard */}
           <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Negotiation Score Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ 
                  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
                  borderRadius: '32px', 
                  padding: '32px', 
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                 <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}><Sparkles size={120} /></div>
                 <div style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0 }}>
                    <svg style={{ transform: 'rotate(-90deg)', width: '80px', height: '80px' }}>
                       <circle cx="40" cy="40" r="34" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
                       <motion.circle 
                         cx="40" cy="40" r="34" 
                         stroke="#FF9431" strokeWidth="8" fill="none"
                         strokeDasharray="213.6"
                         initial={{ strokeDashoffset: 213.6 }}
                         animate={{ strokeDashoffset: 213.6 - (213.6 * (result?.power || 0) / 100) }}
                         transition={{ duration: 1 }}
                       />
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 950 }}>
                       {result?.power}%
                    </div>
                 </div>
                 <div style={{ position: 'relative', zIndex: 1 }}>
                    <h4 style={{ fontSize: '18px', fontWeight: 950, marginBottom: '4px' }}>Market Leverage</h4>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, fontWeight: 500 }}>
                       Based on {F.niche} niche metrics. Your high {F.er}% engagement gives you a <strong>Premium Rating</strong>.
                    </p>
                 </div>
              </motion.div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                 <ContentCard title="Static Post" amount={result?.post || 0} demand="Medium" icon={PieChart} delay={0.1} />
                 <ContentCard title="Cinematic Reel" amount={result?.reel || 0} demand="High" icon={Flame} delay={0.2} />
                 <ContentCard title="Story Set (3x)" amount={result?.story || 0} demand="High" icon={Globe} delay={0.3} />
                 <ContentCard title="Full Integration" amount={result?.integration || 0} demand="Elite" icon={TrendingUp} delay={0.4} />
              </div>

              {/* Optimization Advice */}
              <Card style={{ padding: '32px', borderRadius: '32px', background: '#F0FDF4', border: '1px solid #DCFCE7' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <Sparkles size={20} color="#166534" fill="#166534" />
                    <h4 style={{ fontSize: '15px', fontWeight: 900, color: '#166534', textTransform: 'uppercase' }}>Growth Advice</h4>
                 </div>
                 <p style={{ fontSize: '14px', color: '#166534', lineHeight: 1.6, fontWeight: 600 }}>
                    In the {F.niche} niche, creators with your reach are currently seeing a <strong>22% increase</strong> in deal closures by offering bundled Reel + Story packages.
                 </p>
              </Card>

              {/* Onboarding Bridge */}
              <motion.div
                whileHover={{ y: -5 }}
                style={{ 
                  background: '#050505', 
                  borderRadius: '32px', 
                  padding: '40px', 
                  textAlign: 'center',
                  color: '#fff',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}
              >
                 <h4 style={{ fontSize: '22px', fontWeight: 950, marginBottom: '12px', letterSpacing: '-0.02em' }}>Ready to Book at these Rates?</h4>
                 <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginBottom: '32px', fontWeight: 500 }}>
                    Create your professional Smart Media Kit in 2 minutes and start sharing these data-backed rates with brands.
                 </p>
                 <Btn full lg style={{ padding: '20px', borderRadius: '100px', background: '#FF9431', color: '#fff', fontSize: '16px', fontWeight: 950 }}>
                    Claim My Elite Profile <ArrowRight size={20} />
                 </Btn>
              </motion.div>
           </div>

        </div>
      </section>

    </div>
  );
}
