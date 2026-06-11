import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/core/context';
import { 
  Calculator, 
  Camera as Instagram, 
  ArrowRight,
  PieChart,
  Sparkles,
  Flame,
  Lock
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

const RatingGauge = ({ score }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <div style={{ position: 'relative', width: '110px', height: '110px' }}>
        <svg width="110" height="110" style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}>
          {/* Background circle */}
          <circle
            cx="55"
            cy="55"
            r={radius}
            fill="transparent"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <motion.circle
            cx="55"
            cy="55"
            r={radius}
            fill="transparent"
            stroke="#FF9431"
            strokeWidth="8"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 8px rgba(255, 148, 49, 0.5))' }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '24px', fontWeight: 950, color: '#fff', lineHeight: 1 }}>{score}%</span>
          <span style={{ fontSize: '8px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '2px' }}>Power</span>
        </div>
      </div>
    </div>
  );
};

RatingGauge.propTypes = {
  score: PropTypes.number.isRequired
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

const AuthLockOverlay = ({ mob, navigate }) => (
  <div style={{
    position: 'absolute',
    inset: 0,
    background: 'rgba(255, 255, 255, 0.45)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    borderRadius: '48px',
    padding: mob ? '32px 20px' : '80px 40px',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.6)',
    boxShadow: '0 40px 100px rgba(0, 0, 0, 0.05)'
  }}>
    <div style={{
      width: '80px',
      height: '80px',
      background: 'linear-gradient(135deg, #FF9431, #FF5B1A)',
      borderRadius: '28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      boxShadow: '0 12px 32px rgba(255, 148, 49, 0.3)',
      marginBottom: '28px',
      animation: 'pulse 2s infinite ease-in-out'
    }}>
      <Lock size={36} style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))' }} />
    </div>

    <h2 style={{
      fontSize: mob ? '28px' : '40px',
      fontWeight: 950,
      color: '#0f172a',
      letterSpacing: '-0.03em',
      marginBottom: '16px',
      lineHeight: 1.1
    }}>
      Audited Pricing Intelligence is <span style={{ color: '#FF9431' }}>Locked</span>
    </h2>

    <p style={{
      fontSize: mob ? '14px' : '17px',
      color: '#64748b',
      maxWidth: '480px',
      lineHeight: 1.6,
      fontWeight: 500,
      marginBottom: '40px'
    }}>
      Sign up or log in to calculate accurate market rates, cinematic reel pricing, and story metrics powered by CreatorBharat Official Audit database.
    </p>

    <div style={{
      display: 'flex',
      flexDirection: mob ? 'column' : 'row',
      gap: '16px',
      width: '100%',
      maxWidth: '420px',
      justifyContent: 'center'
    }}>
      <button
        onClick={() => navigate('/login', { state: { from: '/rate-calc' } })}
        style={{
          background: '#0f172a',
          color: '#fff',
          border: 'none',
          padding: '18px 36px',
          borderRadius: '100px',
          fontWeight: 900,
          fontSize: '15px',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(15,23,42,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'all 0.3s ease',
          flex: 1
        }}
      >
        Sign In to Unlock <ArrowRight size={16} />
      </button>

      <button
        onClick={() => navigate('/register')}
        style={{
          background: '#ffffff',
          color: '#0f172a',
          border: '2px solid #e2e8f0',
          padding: '18px 36px',
          borderRadius: '100px',
          fontWeight: 900,
          fontSize: '15px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1
        }}
      >
        Create Free Account
      </button>
    </div>
  </div>
);

AuthLockOverlay.propTypes = {
  mob: PropTypes.bool.isRequired,
  navigate: PropTypes.func.isRequired
};

const RateCalcHeader = ({ mob }) => (
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
);

RateCalcHeader.propTypes = {
  mob: PropTypes.bool.isRequired
};

const RateCalcFooter = () => (
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
);

const RateCalcInputConsole = ({ F, setF, mob }) => (
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

        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '40px' }}>
           <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                 <label htmlFor="followers" style={{ fontSize: '13px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Follower Count</label>
                 <input 
                   id="followers-val"
                   name="followers_val"
                   type="number" 
                   value={F.followers} 
                   onChange={e => setF({...F, followers: Math.max(0, Number.parseInt(e.target.value, 10) || 0)})}
                   style={{ width: '120px', padding: '6px 12px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', fontWeight: 800, textAlign: 'right', outline: 'none' }}
                 />
              </div>
              <input 
                id="followers"
                name="followers"
                type="range" 
                min="1000" 
                max="2000000" 
                step="5000"
                value={F.followers} 
                onChange={e => setF({...F, followers: Number.parseInt(e.target.value, 10) || 1000})}
                style={{ width: '100%', height: '6px', borderRadius: '10px', background: '#e2e8f0', appearance: 'none', outline: 'none', cursor: 'pointer', accentColor: '#FF9431' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', fontWeight: 700, marginTop: '8px' }}>
                 <span>1K</span>
                 <span>500K</span>
                 <span>1M</span>
                 <span>2M</span>
              </div>
           </div>
           <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                 <label htmlFor="er" style={{ fontSize: '13px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Engagement Rate (%)</label>
                 <input 
                   id="er-val"
                   name="er_val"
                   type="number" 
                   step="0.1"
                   value={F.er} 
                   onChange={e => setF({...F, er: Math.max(0, Number.parseFloat(e.target.value) || 0)})}
                   style={{ width: '80px', padding: '6px 12px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', fontWeight: 800, textAlign: 'right', outline: 'none' }}
                 />
              </div>
              <input 
                id="er"
                name="er"
                type="range" 
                min="0.1" 
                max="20" 
                step="0.1"
                value={F.er} 
                onChange={e => setF({...F, er: Number.parseFloat(e.target.value) || 0.1})}
                style={{ width: '100%', height: '6px', borderRadius: '10px', background: '#e2e8f0', appearance: 'none', outline: 'none', cursor: 'pointer', accentColor: '#FF9431' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', fontWeight: 700, marginTop: '8px' }}>
                 <span>0.1%</span>
                 <span>5%</span>
                 <span>10%</span>
                 <span>20%</span>
              </div>
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
);

RateCalcInputConsole.propTypes = {
  F: PropTypes.object.isRequired,
  setF: PropTypes.func.isRequired,
  mob: PropTypes.bool.isRequired
};

const RateCalcResultsConsole = ({ result, mob, navigate }) => (
  <div>
     {result ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
           <div style={{ background: 'linear-gradient(165deg, #090d16 0%, #030408 100%)', borderRadius: '40px', padding: mob ? '32px' : '48px', color: '#fff', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,148,49,0.15)', boxShadow: '0 30px 80px rgba(255,148,49,0.15)' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'radial-gradient(circle at 100% 0%, rgba(255, 148, 49, 0.2), transparent 70%)' }} />
              
              <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.2fr 0.8fr', gap: '24px', alignItems: 'center' }}>
                <div>
                   <div style={{ fontSize: '11px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>Estimated Base Rate</div>
                   <div style={{ fontSize: mob ? '40px' : '54px', fontWeight: 950, letterSpacing: '-0.04em', marginBottom: '24px' }}>
                      <RollingNumber value={result.post} />
                   </div>
                </div>
                <div style={{ display: 'flex', justifyContent: mob ? 'flex-start' : 'flex-end' }}>
                   <RatingGauge score={result.power} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '24px' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '16px' }}>
                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Min. Expected</span>
                    <span style={{ fontSize: '16px', fontWeight: 800 }}>₹{fmt.num(result.post * 0.85)}</span>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '16px' }}>
                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Max. Potential</span>
                    <span style={{ fontSize: '16px', fontWeight: 800 }}>₹{fmt.num(result.post * 1.25)}</span>
                 </div>
              </div>

              <Btn 
                full lg 
                onClick={() => navigate('/apply')}
                style={{ marginTop: '40px', background: '#FF9431', color: '#fff', border: 'none', borderRadius: '100px', padding: '20px', fontWeight: 950, boxShadow: '0 10px 30px rgba(255,148,49,0.3)' }}
              >
                 Claim My Elite Profile <ArrowRight size={20} />
              </Btn>
           </div>

           <div style={{ marginTop: '40px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Suggested Content Mix</h3>
              <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '16px' }}>
                 <ContentCard title="Video Reel / Video integration" amount={Math.round(result.post * 1.5)} demand="High" icon={Instagram} delay={0.1} />
                 <ContentCard title="Static Post / Series Post" amount={result.post} demand="Medium" icon={Instagram} delay={0.2} />
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
);

RateCalcResultsConsole.propTypes = {
  result: PropTypes.object,
  mob: PropTypes.bool.isRequired,
  navigate: PropTypes.func.isRequired
};

export default function RateCalcPage() {
  const navigate = useNavigate();
  const { st } = useApp();
  const isAuth = !!st?.user;
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
      <RateCalcHeader mob={mob} />

      {/* Main App Container */}
      <main style={{ maxWidth: '1100px', margin: mob ? '-40px auto 120px' : '-80px auto 120px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
         <div style={{ background: '#fff', borderRadius: '48px', padding: mob ? '24px' : '60px', boxShadow: '0 40px 100px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', position: 'relative', overflow: 'hidden' }}>
            
            {/* Glassmorphic AuthLock Overlay */}
            {!isAuth && <AuthLockOverlay mob={mob} navigate={navigate} />}

            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.2fr 0.8fr', gap: mob ? '40px' : '80px' }}>
               
               {/* Left: Input Console */}
               <RateCalcInputConsole F={F} setF={setF} mob={mob} />

               {/* Right: Results Display */}
               <RateCalcResultsConsole result={result} mob={mob} navigate={navigate} />
            </div>
         </div>
      </main>

      {/* Trust Footer */}
      <RateCalcFooter />
    </div>
  );
}
