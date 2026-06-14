import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, LayoutGroup } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calculator, Sparkles, TrendingUp, DollarSign, Users, Award, ShieldAlert } from 'lucide-react';
import { InstagramIcon as Instagram, YoutubeIcon as Youtube } from '@/components/icons/SocialIcons';
import Seo from '@/components/common/SEO';
import { Btn, Bdg } from '@/components/common/Primitives';
import { CALCULATOR_TYPES, BENCHMARKS, INDUSTRY_MULTIPLIERS } from '@/data/calculatorsData';

export default function CalculatorsHubPage() {
  const navigate = useNavigate();
  const [mob, setMob] = useState(false);
  const [activeTab, setActiveTab] = useState('er'); // 'er' | 'valuation' | 'budget'

  // State for ER Calculator
  const [erPlatform, setErPlatform] = useState('instagram'); // 'instagram' | 'youtube'
  const [erFollowers, setErFollowers] = useState(50000);
  const [erLikes, setErLikes] = useState(2400);
  const [erComments, setErComments] = useState(150);
  const [erResult, setErResult] = useState(null);

  // State for Valuation Calculator
  const [valFollowers, setValFollowers] = useState(25000);
  const [valNiche, setValNiche] = useState('tech');
  const [valContentType, setValContentType] = useState('reel');
  const [valResult, setValResult] = useState(null);

  // State for Budget Planner
  const [budTargetReach, setBudTargetReach] = useState(100000);
  const [budTier, setBudTier] = useState('micro'); // 'nano' | 'micro' | 'mid' | 'mega'
  const [budResult, setBudResult] = useState(null);

  useEffect(() => {
    const checkSize = () => setMob(window.innerWidth < 768);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Run ER calculation on input change
  useEffect(() => {
    if (erFollowers > 0) {
      const er = ((erLikes + erComments) / erFollowers) * 100;
      let benchmark = BENCHMARKS[erPlatform][1]; // Default Average
      if (erPlatform === 'instagram') {
        if (er < 1) benchmark = BENCHMARKS.instagram[0];
        else if (er >= 1 && er < 3) benchmark = BENCHMARKS.instagram[1];
        else if (er >= 3 && er < 6) benchmark = BENCHMARKS.instagram[2];
        else benchmark = BENCHMARKS.instagram[3];
      } else {
        if (er < 2) benchmark = BENCHMARKS.youtube[0];
        else if (er >= 2 && er < 5) benchmark = BENCHMARKS.youtube[1];
        else if (er >= 5 && er < 9) benchmark = BENCHMARKS.youtube[2];
        else benchmark = BENCHMARKS.youtube[3];
      }
      setErResult({
        rate: er.toFixed(2),
        rating: benchmark.rating,
        desc: benchmark.desc
      });
    }
  }, [erPlatform, erFollowers, erLikes, erComments]);

  // Run Valuation calculation on input change
  useEffect(() => {
    if (valFollowers > 0) {
      const multiplier = INDUSTRY_MULTIPLIERS[valNiche] || 1.0;
      let baseRate = 0.5; // per follower
      if (valContentType === 'story') baseRate = 0.2;
      else if (valContentType === 'reel') baseRate = 0.7;
      else if (valContentType === 'post') baseRate = 0.4;

      const estimatedBase = valFollowers * baseRate * multiplier;
      const minVal = Math.round(estimatedBase * 0.85);
      const maxVal = Math.round(estimatedBase * 1.15);

      setValResult({
        min: minVal.toLocaleString('en-IN'),
        max: maxVal.toLocaleString('en-IN')
      });
    }
  }, [valFollowers, valNiche, valContentType]);

  // Run Budget calculation on input change
  useEffect(() => {
    if (budTargetReach > 0) {
      let cpm = 200; // Default CPM
      if (budTier === 'nano') cpm = 120;
      else if (budTier === 'micro') cpm = 180;
      else if (budTier === 'mid') cpm = 250;
      else if (budTier === 'mega') cpm = 400;

      const budget = (budTargetReach / 1000) * cpm;
      setBudResult({
        total: budget.toLocaleString('en-IN'),
        creatorsNeeded: Math.ceil(budTargetReach / (budTier === 'nano' ? 5000 : budTier === 'micro' ? 20000 : budTier === 'mid' ? 80000 : 300000))
      });
    }
  }, [budTargetReach, budTier]);

  return (
    <div style={{ background: '#fcfcfc', color: '#475569', minHeight: '100vh', overflow: 'hidden' }}>
      <Seo 
        title="Creator Calculators Hub | CreatorBharat" 
        description="Free Engagement Rate, Brand Valuation, and Campaign Budget calculators for Indian creators and brands." 
      />

      {/* Hero Section */}
      <style>{`
        .calculators-landing-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
          text-align: center;
        }
        @media (min-width: 1024px) {
          .calculators-landing-grid {
            grid-template-columns: 1.15fr 0.85fr;
            text-align: left;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section style={{ 
        padding: mob ? '120px 20px 60px' : '180px 24px 120px', 
        position: 'relative', 
        overflow: 'hidden'
      }}>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 148, 49, 0.04), transparent 70%)', 
          opacity: 0.9 
        }} />
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: '4px', 
          background: 'linear-gradient(90deg, #FF9431, #e2e8f0, #10B981)' 
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <div className="calculators-landing-grid">
            {/* Left Side: Content */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: mob ? 'center' : 'flex-start', width: '100%' }}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  background: 'rgba(255, 148, 49, 0.06)', 
                  padding: '10px 20px', 
                  borderRadius: '100px', 
                  marginBottom: '28px', 
                  border: '1px solid rgba(255, 148, 49, 0.15)', 
                  backdropFilter: 'blur(10px)' 
                }}
              >
                <Calculator size={14} color="#FF9431" />
                <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#FF9431' }}>Ecosystem Free Tools</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                style={{ 
                  fontSize: mob ? '36px' : '64px', 
                  fontWeight: 950, 
                  letterSpacing: '-0.04em', 
                  lineHeight: 1.05, 
                  marginBottom: '24px',
                  fontFamily: "'Outfit', sans-serif",
                  color: '#0f172a',
                  textAlign: mob ? 'center' : 'left'
                }}
              >
                Free Influencer & <br />
                <span style={{ background: 'linear-gradient(90deg, #FF9431, #EA580C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Campaign Calculators.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1 }}
                style={{ 
                  fontSize: mob ? '14px' : '17px', 
                  color: '#475569', 
                  maxWidth: '540px', 
                  margin: '0 0 32px 0', 
                  lineHeight: 1.6, 
                  fontWeight: 600,
                  textAlign: mob ? 'center' : 'left'
                }}
              >
                Calculate critical engagement rates, estimate campaign budget valuations, and evaluate your brand deal values scientifically using real-time market averages.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: mob ? 'center' : 'flex-start' }}>
                <Btn primary onClick={() => {
                  const el = document.getElementById('calculators-switcher');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Start Calculator
                </Btn>
              </motion.div>
            </div>

            {/* Right Side: Canva Visual Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -6 }}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 24,
                padding: 12,
                boxShadow: '0 20px 40px rgba(255, 148, 49, 0.05)',
                position: 'relative',
                overflow: 'hidden',
                width: '100%'
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 80% 20%, rgba(255, 148, 49, 0.05) 0%, transparent 60%)',
                pointerEvents: 'none'
              }} />
              <div style={{
                borderRadius: 16,
                overflow: 'hidden',
                position: 'relative',
                paddingTop: '75%', // 4:3 Aspect Ratio
                background: '#f8fafc'
              }}>
                <img
                  src="/calculators_hub_hero.png"
                  alt="Rupee Coins and 3D Charts Calculator illustration"
                  style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginTop: 12, padding: '0 8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff9431' }} className="animate-pulse" />
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Metrics Engine Active</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#10B981' }}>Updated for 2026</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs Switcher */}
      <section id="calculators-switcher" style={{ padding: '40px 24px 20px', display: 'flex', justifyContent: 'center' }}>
        <LayoutGroup>
          <div style={{ 
            display: 'flex', 
            background: '#f1f5f9', 
            border: '1px solid #e2e8f0',
            padding: '6px', 
            borderRadius: '100px',
            flexDirection: mob ? 'column' : 'row',
            width: mob ? '100%' : 'auto',
            gap: '6px'
          }}>
            {CALCULATOR_TYPES.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  position: 'relative',
                  padding: '14px 28px',
                  borderRadius: '100px',
                  border: 'none',
                  background: 'transparent',
                  color: activeTab === tab.id ? '#0f172a' : '#64748b',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  zIndex: 1,
                  transition: 'color 0.3s ease'
                }}
              >
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeCalcTab" 
                    style={{ 
                      position: 'absolute', 
                      inset: 0, 
                      background: '#ffffff', 
                      border: '1.5px solid #FF9431',
                      borderRadius: '100px', 
                      zIndex: -1,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }} 
                  />
                )}
                {tab.title}
              </button>
            ))}
          </div>
        </LayoutGroup>
      </section>

      {/* Main Workspace */}
      <section style={{ padding: '40px 24px 100px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '32px',
          padding: mob ? '24px 16px' : '48px',
          boxShadow: '0 15px 40px rgba(0,0,0,0.02)'
        }}>
          {activeTab === 'er' && (
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.1fr 0.9fr', gap: '48px' }}>
              {/* Inputs */}
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '24px', fontFamily: "'Outfit', sans-serif", color: '#0f172a' }}>Calculate Engagement Rate</h3>
                
                <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                  <button
                    onClick={() => setErPlatform('instagram')}
                    style={{
                      flex: 1,
                      padding: '16px',
                      borderRadius: '16px',
                      border: `1.5px solid ${erPlatform === 'instagram' ? '#FF9431' : '#e2e8f0'}`,
                      background: erPlatform === 'instagram' ? 'rgba(255, 148, 49, 0.05)' : '#ffffff',
                      color: erPlatform === 'instagram' ? '#FF9431' : '#64748b',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Instagram size={18} /> Instagram
                  </button>
                  <button
                    onClick={() => setErPlatform('youtube')}
                    style={{
                      flex: 1,
                      padding: '16px',
                      borderRadius: '16px',
                      border: `1.5px solid ${erPlatform === 'youtube' ? '#FF9431' : '#e2e8f0'}`,
                      background: erPlatform === 'youtube' ? 'rgba(255, 148, 49, 0.05)' : '#ffffff',
                      color: erPlatform === 'youtube' ? '#FF9431' : '#64748b',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Youtube size={18} /> YouTube
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <label style={labelStyle}>{erPlatform === 'instagram' ? 'Followers' : 'Subscribers'}</label>
                    <input 
                      type="number"
                      value={erFollowers}
                      onChange={e => setErFollowers(Math.max(1, Number(e.target.value)))}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Average Likes per Post</label>
                    <input 
                      type="number"
                      value={erLikes}
                      onChange={e => setErLikes(Math.max(0, Number(e.target.value)))}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>{erPlatform === 'instagram' ? 'Average Comments per Post' : 'Average Comments per Video'}</label>
                    <input 
                      type="number"
                      value={erComments}
                      onChange={e => setErComments(Math.max(0, Number(e.target.value)))}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

              {/* Results visualization */}
              <div style={{ 
                background: '#f8fafc', 
                border: '1px solid #e2e8f0',
                borderRadius: '24px', 
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: '24px'
              }}>
                {erResult && (
                  <>
                    <div style={{ position: 'relative', width: '160px', height: '160px' }}>
                      <svg width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="80" cy="80" r="70" fill="transparent" stroke="#e2e8f0" strokeWidth="10" />
                        <motion.circle 
                          cx="80" 
                          cy="80" 
                          r="70" 
                          fill="transparent" 
                          stroke="#FF9431" 
                          strokeWidth="10" 
                          strokeDasharray={440}
                          initial={{ strokeDashoffset: 440 }}
                          animate={{ strokeDashoffset: 440 - (Math.min(Number(erResult.rate), 12) / 12) * 440 }}
                          transition={{ duration: 0.8 }}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '36px', fontWeight: 955, fontFamily: "'Outfit', sans-serif", color: '#0f172a' }}>{erResult.rate}%</span>
                        <span style={{ fontSize: '10px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1px' }}>Engagement</span>
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'inline-block', background: 'rgba(255, 148, 49, 0.1)', color: '#FF9431', padding: '6px 16px', borderRadius: '100px', fontWeight: 900, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {erResult.rating} Rating
                      </div>
                      <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6, marginTop: '16px' }}>
                        {erResult.desc}
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid #e2e8f0', width: '100%', paddingTop: '20px' }}>
                      <button 
                        onClick={() => navigate('/apply')}
                        style={{
                          background: '#ffffff',
                          border: '1px solid #e2e8f0',
                          color: '#475569',
                          width: '100%',
                          padding: '14px',
                          borderRadius: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                        }}
                      >
                        Boost engagement with CB Growth OS <TrendingUp size={16} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === 'valuation' && (
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.1fr 0.9fr', gap: '48px' }}>
              {/* Inputs */}
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '24px', fontFamily: "'Outfit', sans-serif", color: '#0f172a' }}>Valuation Estimator</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <label style={labelStyle}>Follower Count</label>
                    <input 
                      type="number"
                      value={valFollowers}
                      onChange={e => setValFollowers(Math.max(1, Number(e.target.value)))}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Your Content Niche</label>
                    <select
                      value={valNiche}
                      onChange={e => setValNiche(e.target.value)}
                      style={inputStyle}
                    >
                      <option value="tech">Tech & Gadgets (Highest Demand)</option>
                      <option value="finance">Finance & Business</option>
                      <option value="fashion">Fashion & Lifestyle</option>
                      <option value="lifestyle">Vlogging & Travel</option>
                      <option value="gaming">Gaming & Esports</option>
                      <option value="education">Education & Career</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Content Format</label>
                    <select
                      value={valContentType}
                      onChange={e => setValContentType(e.target.value)}
                      style={inputStyle}
                    >
                      <option value="story">Instagram Story / YT Short Post</option>
                      <option value="post">Image / Carousel Post</option>
                      <option value="reel">Dedicated Reel / Video Integration (High Value)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Valuation Result visualizer */}
              <div style={{ 
                background: '#f8fafc', 
                border: '1px solid #e2e8f0',
                borderRadius: '24px', 
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                gap: '24px'
              }}>
                {valResult && (
                  <>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#10B981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <DollarSign size={28} />
                    </div>

                    <div>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Estimated Post Value</span>
                      <h4 style={{ fontSize: '40px', fontWeight: 950, margin: '8px 0', fontFamily: "'Outfit', sans-serif", color: '#10B981' }}>
                        ₹{valResult.min} - ₹{valResult.max}
                      </h4>
                      <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6 }}>
                        Estimated valuation based on current CPM and local market brand campaigns in Tier 2/3 cities.
                      </p>
                    </div>

                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      background: 'rgba(255, 148, 49, 0.04)', 
                      border: '1px solid rgba(255, 148, 49, 0.1)',
                      padding: '12px 16px',
                      borderRadius: '16px',
                      textAlign: 'left'
                    }}>
                      <ShieldAlert size={20} color="#FF9431" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '12px', color: '#475569', lineHeight: 1.4 }}>
                        This is an approximation. Real values depend on your <strong>Digital Pehchan verification</strong> and brand negotiation.
                      </span>
                    </div>

                    <Btn 
                      lg 
                      onClick={() => navigate('/apply')}
                      style={{ 
                        width: '100%', 
                        background: 'linear-gradient(135deg, #FF9431, #FF5B1A)', 
                        color: '#fff',
                        borderRadius: '12px',
                        justifyContent: 'center',
                        fontWeight: 800
                      }}
                    >
                      Get Verified & Unlock Brands
                    </Btn>
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === 'budget' && (
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.1fr 0.9fr', gap: '48px' }}>
              {/* Inputs */}
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '24px', fontFamily: "'Outfit', sans-serif", color: '#0f172a' }}>Campaign Budget Planner</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <label style={labelStyle}>Target Impressions / Reach</label>
                    <input 
                      type="number"
                      value={budTargetReach}
                      onChange={e => setBudTargetReach(Math.max(1000, Number(e.target.value)))}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Preferred Influencer Tier</label>
                    <select
                      value={budTier}
                      onChange={e => setBudTier(e.target.value)}
                      style={inputStyle}
                    >
                      <option value="nano">Nano (1K - 10K followers, High ER)</option>
                      <option value="micro">Micro (10K - 100K followers, Best Value)</option>
                      <option value="mid">Mid-Tier (100K - 500K followers)</option>
                      <option value="mega">Mega / Celebs (500K+ followers, High Branding)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Budget Result visualizer */}
              <div style={{ 
                background: '#f8fafc', 
                border: '1px solid #e2e8f0',
                borderRadius: '24px', 
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                gap: '24px'
              }}>
                {budResult && (
                  <>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'rgba(99, 102, 241, 0.1)',
                      color: '#6366F1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Users size={28} />
                    </div>

                    <div>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Estimated Campaign Cost</span>
                      <h4 style={{ fontSize: '40px', fontWeight: 950, margin: '8px 0', fontFamily: "'Outfit', sans-serif", color: '#6366F1' }}>
                        ₹{budResult.total}
                      </h4>
                      <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6 }}>
                        Estimated budget to hire approx. <strong>{budResult.creatorsNeeded} creators</strong> in this category to drive {budTargetReach.toLocaleString()} impressions.
                      </p>
                    </div>

                    <Btn 
                      lg 
                      onClick={() => navigate('/brand-register')}
                      style={{ 
                        width: '100%', 
                        background: '#ffffff', 
                        color: '#475569',
                        borderRadius: '12px',
                        justifyContent: 'center',
                        fontWeight: 800,
                        border: '1.5px solid #e2e8f0',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                      }}
                    >
                      Book Free Brand Strategy Call
                    </Btn>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 900,
  color: '#475569',
  textTransform: 'uppercase',
  marginBottom: '8px',
  marginLeft: '4px',
  letterSpacing: '0.08em'
};

const inputStyle = {
  width: '100%',
  padding: '16px 20px',
  borderRadius: '14px',
  border: '1.5px solid #e2e8f0',
  background: '#ffffff',
  color: '#0f172a',
  fontSize: '15px',
  fontWeight: 600,
  outline: 'none',
  transition: 'all 0.3s ease',
  boxSizing: 'border-box'
};
