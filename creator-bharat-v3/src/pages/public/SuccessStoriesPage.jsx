import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowUpRight, Quote, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Seo from '@/components/common/SEO';

// Import Externalized Data
import { ALL_STORIES } from '@/data/successStoriesData';

export default function SuccessStoriesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all'); // all, brand, creator, platform

  const filteredStories = useMemo(() => {
    if (activeTab === 'all') return ALL_STORIES;
    return ALL_STORIES.filter(s => s.type === activeTab);
  }, [activeTab]);

  const [mob, setMob] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getTabStyle = (tabId) => {
    const active = activeTab === tabId;
    return {
      padding: '12px 28px',
      borderRadius: '100px',
      border: active ? '1px solid #FF9431' : '1px solid #e2e8f0',
      background: active ? 'linear-gradient(135deg, #FF9431 0%, #ff7b00 100%)' : '#ffffff',
      color: active ? '#fff' : '#475569',
      fontSize: '13px',
      fontWeight: 850,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      boxShadow: active ? '0 8px 25px rgba(255, 148, 49, 0.2)' : '0 4px 10px rgba(0, 0, 0, 0.02)',
      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      whiteSpace: 'nowrap',
    };
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      fontFamily: 'Outfit, system-ui, sans-serif'
    }}>
      <Seo 
        title="Success Stories & Case Studies" 
        description="See how brand managers, regional creators, and the CreatorBharat platform collaborate to build India's largest verified creator trust ecosystem."
      />

      {/* Injecting CSS classes for premium horizontal layout and responsiveness */}
      <style>{`
        .case-study-card {
          display: flex;
          flex-direction: row;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.015);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .case-study-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 30px 60px rgba(15,23,42,0.08);
          border-color: rgba(255, 148, 49, 0.25);
        }
        .case-study-image-wrapper {
          width: 42%;
          min-width: 360px;
          position: relative;
          overflow: hidden;
          background: #090d16;
        }
        .case-study-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .case-study-card:hover .case-study-image {
          transform: scale(1.03);
        }
        .case-study-content {
          width: 58%;
          padding: 40px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        @media (max-width: 960px) {
          .case-study-card {
            flex-direction: column !important;
          }
          .case-study-image-wrapper {
            width: 100% !important;
            height: 280px !important;
            min-width: 0 !important;
          }
          .case-study-content {
            width: 100% !important;
            padding: 24px !important;
          }
        }
        .success-landing-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
          text-align: center;
        }
        @media (min-width: 1024px) {
          .success-landing-grid {
            grid-template-columns: 1.15fr 0.85fr;
            text-align: left;
          }
        }
      `}</style>

      {/* Premium Split Hero Section */}
      <section style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', padding: mob ? '90px 20px 60px' : '130px 24px 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255, 148, 49, 0.04), transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #FF9431, #e2e8f0, #10B981)' }} />
        
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <div className="success-landing-grid">
            {/* Left Column (55% width) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: mob ? 'center' : 'flex-start', width: '100%' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(255,148,49,0.08)', borderRadius: 100, marginBottom: '24px', border: '1px solid rgba(255, 148, 49, 0.2)' }}>
                <span style={{ width: 6, height: 6, background: '#FF9431', borderRadius: '50%', boxShadow: '0 0 6px #FF9431' }} />
                <span style={{ fontSize: '10px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1px' }}>Ecosystem Impact Report</span>
              </div>
              <h1 style={{ fontSize: mob ? '36px' : '64px', fontWeight: 950, color: '#0f172a', margin: '0 0 24px 0', letterSpacing: '-0.04em', lineHeight: 1.05, textAlign: mob ? 'center' : 'left', fontFamily: "'Outfit', sans-serif" }}>
                Stories of <br />
                <span style={{ background: 'linear-gradient(90deg, #FF9431, #EA580C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Growth & Impact.</span>
              </h1>
              <p style={{ fontSize: mob ? '14px' : '17px', color: '#475569', maxWidth: '540px', margin: '0 0 40px 0', fontWeight: 600, lineHeight: 1.6, textAlign: mob ? 'center' : 'left', fontFamily: "'Outfit', sans-serif" }}>
                Real case studies from India's rising creator ecosystem. Explore verified brand campaigns, creator career boosts, and platform verification milestones.
              </p>

              {/* Dynamic Category Tab Switcher inside Hero */}
              <div style={{
                display: 'flex',
                gap: '12px',
                overflowX: 'auto',
                width: '100%',
                paddingBottom: '8px',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}>
                <button onClick={() => setActiveTab('all')} style={getTabStyle('all')}>
                  🌟 All Stories
                </button>
                <button onClick={() => setActiveTab('brand')} style={getTabStyle('brand')}>
                  💼 Brand Campaigns
                </button>
                <button onClick={() => setActiveTab('creator')} style={getTabStyle('creator')}>
                  🚀 Creator Boost
                </button>
                <button onClick={() => setActiveTab('platform')} style={getTabStyle('platform')}>
                  🇮🇳 Platform Node
                </button>
              </div>
            </div>

            {/* Right Column (45% width) */}
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
                  src="/success_stories_hero.png"
                  alt="Ecosystem Growth Collage"
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
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Verified Growth Index</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#10B981' }}>+42.8% Average ROI</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '60px 20px 80px', boxSizing: 'border-box' }}>
        
        {/* Stories List Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          <AnimatePresence mode="popLayout">
            {filteredStories.map((story) => {
              let badgeBg = 'rgba(255,148,49,0.15)';
              let dotBg = '#ff9431';
              let badgeText = 'Platform Milestone';
              let solutionColor = '#ff9431';

              if (story.type === 'brand') {
                badgeBg = 'rgba(59,130,246,0.15)';
                dotBg = '#3b82f6';
                badgeText = 'Brand ROI';
                solutionColor = '#3b82f6';
              } else if (story.type === 'creator') {
                badgeBg = 'rgba(16,185,129,0.15)';
                dotBg = '#10b981';
                badgeText = 'Creator Career';
                solutionColor = '#10b981';
              }

              return (
                <motion.div
                  key={story.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="case-study-card"
                >
                  {/* Left Column: Image Poster Panel */}
                  <div className="case-study-image-wrapper">
                    <img src={story.banner} alt={story.title} className="case-study-image" />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(9,13,22,0.9) 100%)' }} />
                    
                    {/* Category Type Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '24px',
                      left: '24px',
                      background: badgeBg,
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      padding: '8px 16px',
                      borderRadius: '100px',
                      fontSize: '11px',
                      fontWeight: 950,
                      color: '#fff',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: dotBg, boxShadow: `0 0 6px ${dotBg}` }} />
                      {badgeText}
                    </div>

                    {/* Location Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '24px',
                      right: '24px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      padding: '6px 14px',
                      borderRadius: '100px',
                      fontSize: '11px',
                      fontWeight: 850,
                      color: '#0f172a',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4
                    }}>
                      <MapPin size={11} style={{ color: '#64748b' }} />
                      {story.location}
                    </div>

                    {/* Banner Card Title */}
                    <div style={{ position: 'absolute', bottom: '28px', left: '28px', right: '28px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
                        {story.niche}
                      </span>
                      <h2 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 950, color: '#fff', margin: 0, letterSpacing: '-0.5px', lineHeight: 1.25 }}>
                        {story.title}
                      </h2>
                    </div>
                  </div>

                  {/* Right Column: Case Study Details Panel */}
                  <div className="case-study-content">
                    <div>
                      {/* Main Paragraph */}
                      <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, margin: '0 0 28px 0', fontWeight: 550 }}>
                        {story.description}
                      </p>

                      {/* Dynamic Metrics Grid */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                        gap: '16px',
                        background: 'rgba(248, 250, 252, 0.7)',
                        border: '1px solid #e2e8f0',
                        borderRadius: '20px',
                        padding: '18px',
                        marginBottom: '28px'
                      }}>
                        {story.metrics.map(m => {
                          const MetricIcon = m.icon;
                          return (
                            <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                background: '#fff',
                                border: '1px solid #e2e8f0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: m.color,
                                flexShrink: 0,
                                boxShadow: '0 4px 10px rgba(0,0,0,0.02)'
                              }}>
                                <MetricIcon size={18} />
                              </div>
                              <div>
                                <div style={{ fontSize: '20px', fontWeight: 950, color: '#0f172a', lineHeight: 1.1 }}>
                                  {m.value}
                                </div>
                                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', marginTop: 2, letterSpacing: '0.5px' }}>
                                  {m.label}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Details Box */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '28px' }}>
                        <div style={{ background: '#fcfcfc', border: '1px solid #f1f5f9', borderRadius: '16px', padding: '16px 20px' }}>
                          <h4 style={{ fontSize: '10px', fontWeight: 950, color: '#64748b', textTransform: 'uppercase', margin: '0 0 6px 0', letterSpacing: '0.8px' }}>
                            {story.type === 'platform' ? 'Ecosystem Challenge' : 'The Challenge'}
                          </h4>
                          <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
                            {story.challenge}
                          </p>
                        </div>
                        <div style={{ background: '#fcfcfc', border: '1px solid #f1f5f9', borderRadius: '16px', padding: '16px 20px' }}>
                          <h4 style={{ fontSize: '10px', fontWeight: 950, color: solutionColor, textTransform: 'uppercase', margin: '0 0 6px 0', letterSpacing: '0.8px' }}>
                            {story.type === 'platform' ? 'Our Implementation' : 'The Solution'}
                          </h4>
                          <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
                            {story.solution}
                          </p>
                        </div>
                      </div>

                      {/* Testimonial Quote Bubble */}
                      {story.testimonial && (
                        <div style={{
                          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                          borderLeft: `3px solid ${story.type === 'brand' ? '#3b82f6' : story.type === 'creator' ? '#10b981' : '#ff9431'}`,
                          borderRadius: '16px',
                          padding: '18px 20px',
                          marginBottom: '28px',
                          position: 'relative'
                        }}>
                          <div style={{ position: 'absolute', top: '12px', right: '16px', opacity: 0.06, color: '#0f172a' }}>
                            <Quote size={28} />
                          </div>
                          <p style={{
                            fontSize: '13px',
                            color: '#475569',
                            lineHeight: 1.6,
                            margin: '0 0 10px 0',
                            fontStyle: 'italic',
                            fontWeight: 550
                          }}>
                            "{story.testimonial.quote}"
                          </p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a' }}>{story.testimonial.author}</span>
                            <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#cbd5e1' }} />
                            <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748b' }}>{story.testimonial.role}, {story.testimonial.company}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Footer - Brand and Creator verification profiles + CTA */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid #f1f5f9',
                      paddingTop: '20px',
                      flexWrap: 'wrap',
                      gap: '16px'
                    }}>
                      {/* Dynamic Credit Badge */}
                      {story.type === 'brand' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={story.avatar} alt="" style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 0 8px rgba(0,0,0,0.06)' }} />
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>{story.creatorName}</div>
                            <div style={{ fontSize: '9px', color: '#64748b', fontWeight: 850, letterSpacing: '0.5px' }}>VERIFIED PARTNER • {story.location}</div>
                          </div>
                        </div>
                      )}

                      {story.type === 'creator' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={story.avatar} alt="" style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 0 8px rgba(0,0,0,0.06)' }} />
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>{story.creatorName}</div>
                            <div style={{ fontSize: '9px', color: '#10b981', fontWeight: 850, letterSpacing: '0.5px' }}>{story.channelName} • VERIFIED</div>
                          </div>
                        </div>
                      )}

                      {story.type === 'platform' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: 'rgba(255,148,49,0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ff9431'
                          }}>
                            <ShieldCheck size={18} />
                          </div>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>Verified Bharat Startup</div>
                            <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 850, letterSpacing: '0.5px' }}>DPIIT REGISTERED SYSTEM</div>
                          </div>
                        </div>
                      )}

                      {/* Action CTA Button */}
                      <button
                        onClick={() => navigate(story.actionPath)}
                        style={{
                          background: '#090d16',
                          color: '#fff',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '100px',
                          fontSize: '13px',
                          fontWeight: 850,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 8,
                          boxShadow: '0 8px 20px rgba(9,13,22,0.1)',
                          transition: 'all 0.25s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#FF9431';
                          e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,148,49,0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#090d16';
                          e.currentTarget.style.boxShadow = '0 8px 20px rgba(9,13,22,0.1)';
                        }}
                      >
                        <span>{story.actionText}</span>
                        <ArrowUpRight size={14} />
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Call to Action Section */}
        <div style={{
          background: '#090d16',
          border: '1px solid rgba(255, 148, 49, 0.15)',
          borderRadius: '40px',
          padding: '60px 40px',
          textAlign: 'center',
          marginTop: '80px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Glowing blur effects */}
          <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255, 148, 49, 0.1) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(255,148,49,0.08)', borderRadius: 100, marginBottom: '20px' }}>
            <Sparkles size={12} style={{ color: '#FF9431' }} />
            <span style={{ fontSize: '10px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1px' }}>Ecosystem Outreach</span>
          </div>
          
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 950, color: '#fff', margin: '0 0 16px 0', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
            Ready to Write Your Success Story?
          </h2>
          <p style={{ fontSize: '15px', color: '#94a3b8', maxWidth: '540px', margin: '0 auto 32px', fontWeight: 550, lineHeight: 1.6 }}>
            Whether you are a national brand looking for regional ROI, or a creator looking to secure brand sponsorships with zero brokerage fee.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/join')}
              style={{
                background: '#FF9431',
                color: '#fff',
                border: 'none',
                padding: '16px 36px',
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(255, 148, 49, 0.25)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(255, 148, 49, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 148, 49, 0.25)';
              }}
            >
              Get Verified Profile
            </button>
            <button
              onClick={() => navigate('/contact')}
              style={{
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '16px 36px',
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: 900,
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Launch Brand Campaign
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
