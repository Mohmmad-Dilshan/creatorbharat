import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Target, Users, DollarSign, Award, ChevronRight, Filter, ShieldCheck, Globe2, Zap, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Seo from '@/components/common/SEO';

const ALL_STORIES = [
  {
    id: 'story-1',
    type: 'brand',
    brandName: 'Jaipur Heritage Apparel',
    niche: 'Fashion & Retail',
    location: 'Jaipur, Rajasthan',
    creatorName: 'Aryan Sharma',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80',
    title: 'How Jaipur Heritage Apparel grew Sales by 3x in 30 Days 🚀',
    description: 'A traditional fashion brand in Jaipur struggled to reach Gen-Z consumers through standard social ads, which had high acquisition costs. Partnered with regional creators to curate authentic styling reels.',
    challenge: 'High customer acquisition cost (CAC) and zero regional awareness.',
    solution: 'Launched a hyperlocal styling mission with 3 verified local fashion creators on Instagram.',
    metrics: [
      { label: 'Sales Growth', value: '310%', icon: TrendingUp, color: '#10b981' },
      { label: 'CAC Reduced', value: '-42%', icon: Target, color: '#ef4444' },
      { label: 'Organic Reach', value: '1.2M+', icon: Users, color: '#3b82f6' }
    ],
    actionText: 'Collaborate with Aryan',
    actionPath: '/creators'
  },
  {
    id: 'story-2',
    type: 'creator',
    creatorName: 'Ramesh Dewangan',
    channelName: '@BastarCraftsVlog',
    niche: 'Art & Heritage',
    location: 'Bastar, Chhattisgarh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1590073844006-33379778ae09?w=800&q=80',
    title: 'From Bastar Village to National Brand Campaigns 🌟',
    description: 'Ramesh is a terracotta artisan in Chhattisgarh. Before joining CreatorBharat, he had no direct access to national brands. He now collaborates with major home decor brands across India.',
    challenge: 'Lack of brand access, pricing transparency, and modern identity tools.',
    solution: 'Created a verified digital creator profile on CreatorBharat, linking regional crafts to urban home design campaigns.',
    metrics: [
      { label: 'Earnings Secured', value: '₹3.5 Lakhs', icon: DollarSign, color: '#10b981' },
      { label: 'Followers Gained', value: '+180k', icon: Users, color: '#3b82f6' },
      { label: 'Direct Deals', value: '12 Campaigns', icon: Award, color: '#8b5cf6' }
    ],
    actionText: 'View Ramesh\'s Profile',
    actionPath: '/leaderboard'
  },
  {
    id: 'story-3',
    type: 'platform',
    title: 'DPIIT Registered Startup: 15,000+ Regional Identities Verified 🇮🇳',
    location: 'National Coverage',
    niche: 'Ecosystem Growth',
    banner: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80',
    description: 'CreatorBharat has officially mapped and verified over 15,000 regional creators across 28 states in India. Under our Bharat-first outreach program, we have eliminated intermediate brokerage commissions.',
    challenge: 'Fragmented talent registry and high commission brokerages in Tier 2/3 cities.',
    solution: 'Designed the unified "Digital Pehchan" verified trust scores, standard escrow payments, and regional leaderboard hubs.',
    metrics: [
      { label: 'States Mapped', value: '28 States', icon: Globe2, color: '#ff9431' },
      { label: 'Platform Fee', value: '0% Brokerage', icon: ShieldCheck, color: '#10b981' },
      { label: 'Ecosystem Trust', value: '99.4% Secured', icon: Zap, color: '#8b5cf6' }
    ],
    actionText: 'Claim Your Profile Free',
    actionPath: '/join'
  },
  {
    id: 'story-4',
    type: 'brand',
    brandName: 'BharatRide Logistics',
    niche: 'Tech & Mobility',
    location: 'Indore, Madhya Pradesh',
    creatorName: 'Priya Verma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    title: 'Building Hyperlocal Brand Trust in Madhya Pradesh 🛡️',
    description: 'BharatRide needed rapid driver and passenger registrations across Indore and Bhopal. They launched humorous regional reaction campaigns using local MP creators.',
    challenge: 'High competition with international brands in regional markets.',
    solution: 'CreatorBharat matched the brand with MP-dialect micro-creators, resulting in highly organic, localized YouTube integration.',
    metrics: [
      { label: 'App Installs', value: '45k+', icon: TrendingUp, color: '#10b981' },
      { label: 'Driver Signups', value: '+180%', icon: Target, color: '#f59e0b' },
      { label: 'Regional Views', value: '2.5M+', icon: Users, color: '#8b5cf6' }
    ],
    actionText: 'Collaborate with Priya',
    actionPath: '/creators'
  },
  {
    id: 'story-5',
    type: 'creator',
    creatorName: 'Kabir Negi',
    channelName: '@PahadiVlogger',
    niche: 'Travel & Lifestyle',
    location: 'Dehradun, Uttarakhand',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
    title: 'Securing Financial Autonomy in Uttarakhand Hills 🏔️',
    description: 'Kabir represents the travel and eco-tourism voice of Uttarakhand. By leveraging CreatorBharat\'s escrow wallet and zero platform commission structure, he earned corporate sponsorship contracts.',
    challenge: 'Delayed payments and lack of professional brand pitch materials.',
    solution: 'Used CreatorBharat\'s media kit generator and secure escrow milestone features to close deals with eco-tourism resorts.',
    metrics: [
      { label: 'Monthly Earnings', value: '₹85,000+', icon: DollarSign, color: '#10b981' },
      { label: 'Brand Sponsors', value: '8 Partners', icon: Award, color: '#ff9431' },
      { label: 'Engagement Rate', value: '11.8%', icon: TrendingUp, color: '#ef4444' }
    ],
    actionText: 'View Kabir\'s Profile',
    actionPath: '/leaderboard'
  }
];

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
            {filteredStories.map((story, idx) => (
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
                    background: story.type === 'brand' ? 'rgba(59,130,246,0.15)' : story.type === 'creator' ? 'rgba(16,185,129,0.15)' : 'rgba(255,148,49,0.15)',
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
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: story.type === 'brand' ? '#3b82f6' : story.type === 'creator' ? '#10b981' : '#ff9431' }} />
                    {story.type === 'brand' ? 'Brand ROI' : story.type === 'creator' ? 'Creator Career' : 'Platform Milestone'}
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
                      <h4 style={{ fontSize: '12px', fontWeight: 950, color: story.type === 'brand' ? '#3b82f6' : story.type === 'creator' ? '#10b981' : '#ff9431', textTransform: 'uppercase', margin: '0 0 8px 0', letterSpacing: '0.8px' }}>
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
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
