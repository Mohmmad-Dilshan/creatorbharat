import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';
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

  const getTabStyle = (tabId) => {
    const active = activeTab === tabId;
    return {
      padding: '12px 24px',
      borderRadius: '100px',
      border: active ? 'none' : '1.5px solid #e2e8f0',
      background: active ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' : '#fff',
      color: active ? '#fff' : '#475569',
      fontSize: '13px',
      fontWeight: 800,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      boxShadow: active ? '0 10px 20px rgba(15,23,42,0.15)' : 'none',
      transition: 'all 0.25s ease',
      whiteSpace: 'nowrap'
    };
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      paddingTop: '130px',
      paddingBottom: '80px',
      fontFamily: 'Outfit, system-ui, sans-serif'
    }}>
      <Seo 
        title="Success Stories & Case Studies" 
        description="See how brand managers, regional creators, and the CreatorBharat platform collaborate to build India's largest verified creator trust ecosystem."
      />

      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 20px', boxSizing: 'border-box' }}>
        
        {/* Dynamic Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(255,148,49,0.08)', borderRadius: 100, marginBottom: '16px' }}>
            <span style={{ width: 6, height: 6, background: '#FF9431', borderRadius: '50%' }} />
            <span style={{ fontSize: '10px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1px' }}>Ecosystem Impacts</span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 950, color: '#0f172a', margin: '0 0 16px 0', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
            Stories of Growth & Impact
          </h1>
          <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '620px', margin: '0 auto', fontWeight: 600, lineHeight: 1.6 }}>
            Real case studies from India's rising creator ecosystem. Choose a filter below to explore stories of brand ROI, creator careers, and platform milestones.
          </p>
        </div>

        {/* Dynamic Category Tab Switcher */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          overflowX: 'auto',
          paddingBottom: '16px',
          marginBottom: '48px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          <button onClick={() => setActiveTab('all')} style={getTabStyle('all')}>
            🌟 All Stories
          </button>
          <button onClick={() => setActiveTab('brand')} style={getTabStyle('brand')}>
            💼 Brand Success
          </button>
          <button onClick={() => setActiveTab('creator')} style={getTabStyle('creator')}>
            🚀 Creator Growth
          </button>
          <button onClick={() => setActiveTab('platform')} style={getTabStyle('platform')}>
            🇮🇳 CreatorBharat Milestones
          </button>
        </div>

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
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '32px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 45px rgba(15,23,42,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative'
                  }}
                >
                  {/* Banner Header Image with overlay */}
                  <div style={{ height: '260px', position: 'relative', overflow: 'hidden' }}>
                    <img src={story.banner} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(15,23,42,0.85) 100%)' }} />
                    
                    {/* Category Type Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '24px',
                      left: '24px',
                      background: badgeBg,
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
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
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: dotBg }} />
                      {badgeText}
                    </div>

                    {/* Niche & Location */}
                    <div style={{
                      position: 'absolute',
                      top: '24px',
                      right: '24px',
                      background: 'rgba(255, 255, 255, 0.9)',
                      padding: '6px 14px',
                      borderRadius: '100px',
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#0f172a',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                    }}>
                      {story.niche}
                    </div>

                    {/* Dynamic Title Overlay */}
                    <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
                      <h2 style={{ fontSize: 'clamp(20px, 3.5vw, 26px)', fontWeight: 950, color: '#fff', margin: 0, letterSpacing: '-0.5px', lineHeight: 1.2 }}>
                        {story.title}
                      </h2>
                    </div>
                  </div>

                  {/* Content Block */}
                  <div style={{ padding: '36px', boxSizing: 'border-box' }}>
                    
                    {/* Dynamic Metrics Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '20px',
                      background: '#f8fafc',
                      border: '1.5px dashed #e2e8f0',
                      borderRadius: '24px',
                      padding: '24px',
                      marginBottom: '32px'
                    }}>
                      {story.metrics.map(m => {
                        const MetricIcon = m.icon;
                        return (
                          <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                            <div style={{
                              width: '46px',
                              height: '46px',
                              borderRadius: '14px',
                              background: '#fff',
                              border: '1px solid #cbd5e1',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: m.color,
                              flexShrink: 0
                            }}>
                              <MetricIcon size={22} />
                            </div>
                            <div>
                              <div style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a', lineHeight: 1.1 }}>
                                {m.value}
                              </div>
                              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', marginTop: 3 }}>
                                {m.label}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Rationale and Details */}
                    <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, margin: '0 0 32px 0', fontWeight: 550 }}>
                      {story.description}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                      <div>
                        <h4 style={{ fontSize: '12px', fontWeight: 950, color: '#64748b', textTransform: 'uppercase', margin: '0 0 8px 0', letterSpacing: '0.8px' }}>
                          {story.type === 'platform' ? 'Ecosystem Challenge' : 'The Challenge'}
                        </h4>
                        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
                          {story.challenge}
                        </p>
                      </div>
                      <div>
                        <h4 style={{ fontSize: '12px', fontWeight: 950, color: solutionColor, textTransform: 'uppercase', margin: '0 0 8px 0', letterSpacing: '0.8px' }}>
                          {story.type === 'platform' ? 'Our Implementation' : 'The Solution'}
                        </h4>
                        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
                          {story.solution}
                        </p>
                      </div>
                    </div>

                    {/* Custom dynamic card Footer */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1.5px solid #f1f5f9',
                      paddingTop: '24px',
                      flexWrap: 'wrap',
                      gap: '16px'
                    }}>
                      {/* Dynamic credit label */}
                      {story.type === 'brand' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={story.avatar} alt="" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 0 8px rgba(0,0,0,0.08)' }} />
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>{story.creatorName}</div>
                            <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800 }}>VERIFIED SPONSOR • {story.location}</div>
                          </div>
                        </div>
                      )}

                      {story.type === 'creator' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={story.avatar} alt="" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 0 8px rgba(0,0,0,0.08)' }} />
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>{story.creatorName}</div>
                            <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 800 }}>{story.channelName} • {story.location}</div>
                          </div>
                        </div>
                      )}

                      {story.type === 'platform' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                            background: 'rgba(255,148,49,0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ff9431'
                          }}>
                            <ShieldCheck size={20} />
                          </div>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>Verified Bharat Startup</div>
                            <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800 }}>DPIIT REGISTERED ECOSYSTEM</div>
                          </div>
                        </div>
                      )}

                      {/* Direct action CTA */}
                      <button
                        onClick={() => navigate(story.actionPath)}
                        style={{
                          background: '#0f172a',
                          color: '#fff',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '100px',
                          fontSize: '13px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 8,
                          boxShadow: '0 8px 20px rgba(15,23,42,0.1)',
                          transition: 'all 0.25s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#FF9431';
                          e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,148,49,0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#0f172a';
                          e.currentTarget.style.boxShadow = '0 8px 20px rgba(15,23,42,0.1)';
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

      </div>
    </div>
  );
}
