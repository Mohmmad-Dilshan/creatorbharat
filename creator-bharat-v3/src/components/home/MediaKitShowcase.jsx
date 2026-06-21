import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { W } from '../../utils/helpers';
import { 
  Sparkles, CheckCircle2, Star, Eye, Users, BarChart3, 
  MapPin, ShieldAlert, Award, LayoutGrid 
} from 'lucide-react';

const CREATORS = [
  {
    name: 'Amit Sharma',
    handle: '@amit_vlogs',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit',
    category: 'Travel & Lifestyle',
    location: 'Jaipur, RJ',
    followers: '240K',
    engagement: '5.8%',
    views: '85K',
    cbscore: '92',
    color: '#FF9431',
    bg: 'rgba(255,148,49,0.06)',
    demographics: [
      { name: '18-24 Yrs', percent: 65 },
      { name: '25-34 Yrs', percent: 25 },
      { name: 'Others', percent: 10 }
    ],
    cities: [
      { name: 'Jaipur', percent: 45 },
      { name: 'Delhi', percent: 25 },
      { name: 'Mumbai', percent: 15 }
    ]
  },
  {
    name: 'Neha Verma',
    handle: '@neha_beauty',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Neha',
    category: 'Beauty & Fashion',
    location: 'Indore, MP',
    followers: '310K',
    engagement: '7.2%',
    views: '115K',
    cbscore: '95',
    color: '#E1306C',
    bg: 'rgba(225,48,108,0.06)',
    demographics: [
      { name: '18-24 Yrs', percent: 75 },
      { name: '25-34 Yrs', percent: 18 },
      { name: 'Others', percent: 7 }
    ],
    cities: [
      { name: 'Indore', percent: 40 },
      { name: 'Bhopal', percent: 30 },
      { name: 'Pune', percent: 20 }
    ]
  },
  {
    name: 'Rajesh Kumar',
    handle: '@tech_bharat',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
    category: 'Tech & Gadgets',
    location: 'Patna, BR',
    followers: '180K',
    engagement: '4.9%',
    views: '92K',
    cbscore: '89',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.06)',
    demographics: [
      { name: '18-24 Yrs', percent: 55 },
      { name: '25-34 Yrs', percent: 35 },
      { name: 'Others', percent: 10 }
    ],
    cities: [
      { name: 'Patna', percent: 50 },
      { name: 'Ranchi', percent: 25 },
      { name: 'Kolkata', percent: 15 }
    ]
  }
];

export default function MediaKitShowcase({ mob, go }) {
  const [activeCreator, setActiveCreator] = useState(0);
  const [activeTab, setActiveTab] = useState('stats'); // 'stats' or 'demographics'
  const [customColor, setCustomColor] = useState(null); // Custom color override

  const creator = CREATORS[activeCreator];
  const accentColor = customColor || creator.color;

  const handleCreatorChange = (idx) => {
    setActiveCreator(idx);
    setCustomColor(null); // Reset color override when switching creators
  };

  return (
    <section style={{ 
      padding: mob ? '48px 16px' : '80px 24px', 
      background: '#ffffff', 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      {/* Decorative background grid elements */}
      <div style={{ 
        position: 'absolute', inset: 0, 
        backgroundImage: 'radial-gradient(rgba(0,0,0,0.02) 1.2px, transparent 1.2px)', 
        backgroundSize: '32px 32px', opacity: 0.8, pointerEvents: 'none' 
      }} />

      <div style={{ ...W(), maxWidth: 1240, position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: mob ? 40 : 60 }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', 
            background: 'rgba(255, 148, 49, 0.08)', border: '1px solid rgba(255, 148, 49, 0.25)', 
            borderRadius: 100, marginBottom: 16
          }}>
            <Sparkles size={12} color="#FF9431" />
            <span style={{ fontSize: 10, fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '2px' }}>
              Live Product Preview
            </span>
          </div>

          <h2 style={{ 
            fontFamily: "'Outfit', sans-serif", 
            fontSize: mob ? 32 : 52, 
            fontWeight: 950, 
            color: '#0f172a', 
            lineHeight: 1.15, 
            letterSpacing: '-0.03em', 
            marginBottom: 16 
          }}>
            Smart Media Kits.{mob && <br />}
            <span style={{ background: 'linear-gradient(135deg, #FF9431 0%, #138808 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}> Built for Bharat's Elite.</span>
          </h2>

          <p style={{ 
            fontSize: mob ? 14 : 16, 
            fontWeight: 600, 
            color: '#64748b', 
            maxWidth: 680, 
            margin: '0 auto', 
            lineHeight: 1.6 
          }}>
            A live, verified creator media kit that pulls real-time analytics, audience density maps, and past campaign outcomes directly into a professional booking link.
          </p>
        </div>

        {/* Layout Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: mob ? '1fr' : '1.1fr 0.9fr',
          gap: mob ? 40 : 56,
          alignItems: 'stretch'
        }}>
          
          {/* Left Column: Interactive Controls */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'left'
          }}>
            {/* Step 1: Select Creator Profile */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 11, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 12, display: 'block' }}>
                1. Select Creator Profile
              </label>
              <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: 10 }}>
                {CREATORS.map((c, idx) => (
                  <button
                    key={c.name}
                    onClick={() => handleCreatorChange(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '12px 18px',
                      borderRadius: 16,
                      background: activeCreator === idx ? '#0F172A' : '#F8FAFC',
                      border: `1.5px solid ${activeCreator === idx ? '#0F172A' : '#E2E8F0'}`,
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      flex: 1,
                      textAlign: 'left'
                    }}
                    className="mediakit-control-btn"
                  >
                    <div style={{ width: 36, height: 36, borderRadius: 10, overflow: 'hidden', border: `1.5px solid ${activeCreator === idx ? c.color : 'transparent'}`, background: '#fff', flexShrink: 0 }}>
                      <img src={c.avatar} style={{ width: '100%', height: '100%' }} alt={`${c.name}'s Showcase Avatar`} loading="lazy" />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 850, color: activeCreator === idx ? '#fff' : '#0f172a' }}>{c.name}</div>
                      <div style={{ fontSize: 10, fontWeight: 600, color: activeCreator === idx ? 'rgba(255,255,255,0.6)' : '#64748b', marginTop: 1 }}>{c.category.split('&')[0]}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Kit Theme Color */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 11, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 12, display: 'block' }}>
                2. Select Custom Branding Color
              </label>
              <div style={{ display: 'flex', gap: 12 }}>
                {[creator.color, '#3B82F6', '#10B981', '#7C3AED', '#0F172A'].map((col) => (
                  <button
                    key={col}
                    onClick={() => setCustomColor(col)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: col,
                      border: `3px solid ${accentColor === col ? '#E2E8F0' : 'transparent'}`,
                      cursor: 'pointer',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
                      transition: 'transform 0.2s',
                      transform: accentColor === col ? 'scale(1.15)' : 'scale(1)'
                    }}
                    className="color-picker-btn"
                  />
                ))}
              </div>
            </div>

            {/* Step 3: Toggle Analytics View */}
            <div style={{ marginBottom: 32 }}>
              <label style={{ fontSize: 11, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 12, display: 'block' }}>
                3. Preview Data Tab
              </label>
              <div style={{ 
                display: 'inline-flex', 
                background: '#F1F5F9', 
                padding: 4, 
                borderRadius: 12, 
                gap: 4,
                border: '1px solid #E2E8F0'
              }}>
                <button
                  onClick={() => setActiveTab('stats')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: 'none',
                    background: activeTab === 'stats' ? '#fff' : 'transparent',
                    color: activeTab === 'stats' ? '#0f172a' : '#64748b',
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 800,
                    boxShadow: activeTab === 'stats' ? '0 4px 10px rgba(0,0,0,0.04)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  <BarChart3 size={14} />
                  <span>Performance Stats</span>
                </button>
                <button
                  onClick={() => setActiveTab('demographics')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: 'none',
                    background: activeTab === 'demographics' ? '#fff' : 'transparent',
                    color: activeTab === 'demographics' ? '#0f172a' : '#64748b',
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 800,
                    boxShadow: activeTab === 'demographics' ? '0 4px 10px rgba(0,0,0,0.04)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  <Users size={14} />
                  <span>Audience Demographics</span>
                </button>
              </div>
            </div>

            {/* Value Checkpoint Info */}
            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: 20,
              padding: '18px 20px',
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start'
            }}>
              <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <h4 style={{ fontSize: 13, fontWeight: 900, color: '#0f172a', margin: '0 0 4px 0' }}>Live API Integration</h4>
                <p style={{ fontSize: 12, color: '#64748b', fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
                  Stat modules connect directly to YouTube & Instagram Graph APIs. Data is refreshed every 24 hours, ensuring zero screenshot manipulations.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Glassmorphic Media Kit Preview Card */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}>
            {/* Soft Ambient color glow background matching creator color */}
            <div style={{
              position: 'absolute',
              width: 320,
              height: 320,
              background: `radial-gradient(circle, ${accentColor}15 0%, transparent 70%)`,
              filter: 'blur(40px)',
              pointerEvents: 'none',
              zIndex: 0
            }} />

            {/* Main Portfolio Card Preview Container */}
            <div style={{
              width: '100%',
              maxWidth: 420,
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.85) 100%)',
              backdropFilter: 'blur(24px)',
              border: '1.5px solid rgba(255,255,255,0.6)',
              borderRadius: 32,
              boxShadow: '0 30px 60px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
              padding: mob ? 20 : 28,
              boxSizing: 'border-box',
              position: 'relative',
              zIndex: 2,
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: 20
            }}>
              {/* Creator Card Header */}
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: 20, overflow: 'hidden', border: `2.5px solid ${accentColor}`, background: '#fff', flexShrink: 0 }}>
                  <img src={creator.avatar} style={{ width: '100%', height: '100%' }} alt={`${creator.name}'s Showcase Card Preview Avatar`} loading="lazy" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <div style={{ fontSize: 18, fontWeight: 950, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Outfit', sans-serif" }}>
                    {creator.name}
                    <div style={{ 
                      width: 14, height: 14, borderRadius: '50%', background: accentColor, 
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center' 
                    }}>
                      <span style={{ fontSize: 8, color: '#fff', fontWeight: 900, marginTop: -1 }}>✓</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B' }}>
                    {creator.handle} • {creator.category}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    <MapPin size={10} color="#64748B" />
                    <span style={{ fontSize: 10, fontWeight: 800, color: '#64748B' }}>{creator.location}</span>
                  </div>
                </div>
              </div>

              {/* Verified Sub-link preview */}
              <div style={{ 
                background: 'rgba(0,0,0,0.03)', 
                border: '1px solid rgba(0,0,0,0.04)',
                borderRadius: 12, 
                padding: '8px 12px', 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#64748B' }}>
                  creatorbharat.com<span style={{ color: '#0F172A', fontWeight: 900 }}>/{creator.handle.replace('@', '')}</span>
                </span>
                <span style={{ fontSize: 9, fontWeight: 900, background: '#fff', color: accentColor, border: `1px solid ${accentColor}30`, padding: '2px 8px', borderRadius: 100 }}>
                  Active Portfolio
                </span>
              </div>

              {/* Dynamic stats / demographics panels with animated updates */}
              <div style={{ minHeight: 150 }}>
                {activeTab === 'stats' ? (
                  /* PERFORMANCE STATS VIEW */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {/* Stat Item 1: Followers */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #E2E8F0', paddingBottom: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Users size={14} color={accentColor} />
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>Total Reach</span>
                      </div>
                      <span style={{ fontSize: 15, fontWeight: 950, color: '#0F172A' }}>{creator.followers}</span>
                    </div>

                    {/* Stat Item 2: Engagement */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #E2E8F0', paddingBottom: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Star size={14} color={accentColor} />
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>Avg Engagement</span>
                      </div>
                      <span style={{ fontSize: 15, fontWeight: 950, color: '#0F172A' }}>{creator.engagement}</span>
                    </div>

                    {/* Stat Item 3: Avg Views */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Eye size={14} color={accentColor} />
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>Avg Video Views</span>
                      </div>
                      <span style={{ fontSize: 15, fontWeight: 950, color: '#0F172A' }}>{creator.views}</span>
                    </div>
                  </div>
                ) : (
                  /* AUDIENCE DEMOGRAPHICS VIEW */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {/* Top Cities bars */}
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 900, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                        Top Regional Cities
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {creator.cities.map((city) => (
                          <div key={city.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 11, fontWeight: 800, color: '#475569', width: 60, flexShrink: 0 }}>{city.name}</span>
                            <div style={{ flex: 1, height: 6, background: '#EFF6FF', borderRadius: 3, overflow: 'hidden' }}>
                              <div style={{ height: '100%', background: accentColor, width: `${city.percent}%`, borderRadius: 3 }} />
                            </div>
                            <span style={{ fontSize: 11, fontWeight: 900, color: '#0F172A', width: 30, textAlign: 'right' }}>{city.percent}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Age Demographics segments */}
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 900, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                        Age Group Splits
                      </div>
                      <div style={{ display: 'flex', gap: 10 }}>
                        {creator.demographics.map((demo) => (
                          <div key={demo.name} style={{ flex: 1, background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.03)', borderRadius: 10, padding: '8px', textAlign: 'center' }}>
                            <div style={{ fontSize: 13, fontWeight: 950, color: '#0F172A' }}>{demo.percent}%</div>
                            <div style={{ fontSize: 8, fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', marginTop: 2 }}>{demo.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Past collaborations brand list */}
              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 14 }}>
                <div style={{ fontSize: 9, fontWeight: 900, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                  Past Brand Partners
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.6, filter: 'grayscale(100%)' }}>
                  {['Nykaa', 'Mamaearth', 'Lenskart'].map((b) => (
                    <span key={b} style={{ fontSize: 12, fontWeight: 900, color: '#334155', fontFamily: "'Outfit', sans-serif" }}>{b}</span>
                  ))}
                </div>
              </div>

              {/* Verified Trust Score Badge */}
              <div style={{ 
                background: accentColor === creator.color ? creator.bg : 'rgba(0,0,0,0.02)', 
                border: `1px solid ${accentColor === creator.color ? `${creator.color}25` : 'rgba(0,0,0,0.05)'}`,
                borderRadius: 16, 
                padding: '10px 14px', 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Award size={16} color={accentColor} />
                  <span style={{ fontSize: 11, fontWeight: 900, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>CB Trust score</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 950, color: accentColor, fontFamily: "'Outfit', sans-serif" }}>
                  {creator.cbscore}/100
                </span>
              </div>

              <button 
                onClick={() => go && go('join')}
                style={{
                  background: '#0F172A',
                  color: '#fff',
                  border: 'none',
                  padding: '14px',
                  borderRadius: 14,
                  fontSize: 13,
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(15,23,42,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'all 0.25s',
                  fontFamily: "'Outfit', sans-serif"
                }}
                className="mediakit-book-btn"
              >
                <span>Book Direct Collaboration</span>
                <Sparkles size={13} color={accentColor} />
              </button>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .mediakit-control-btn:hover {
          background: #f1f5f9 !important;
          border-color: #cbd5e1 !important;
        }
        .mediakit-book-btn:hover {
          background: #1e293b !important;
          transform: translateY(-1px);
        }
        .color-picker-btn:hover {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
}

MediaKitShowcase.propTypes = {
  mob: PropTypes.bool,
  go: PropTypes.func
};
