import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, Search, Globe, 
  MapPin, Layers, Filter,
  Activity, ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Btn, Card } from '@/components/common/Primitives';
import Seo from '@/components/common/SEO';
import { fetchCreators } from '@/utils/platformService';
import { fmt } from '@/utils/helpers';

// Extracted Feature Components
import LeaderboardHero from '@/components/features/leaderboard/LeaderboardHero';
import ElitePodiumCard from '@/components/features/leaderboard/ElitePodiumCard';
import RankingsTable from '@/components/features/leaderboard/RankingsTable';

const THEME = {
  primary: '#FF9431',
  secondary: '#3b82f6',
  dark: '#0f172a',
  border: '#e2e8f0',
  green: '#10b981',
  red: '#f43f5e'
};

const categories = ['Overall', 'Tech', 'Finance', 'Lifestyle', 'Gaming', 'Travel', 'Beauty', 'Fitness', 'Food'];

// Transform function to normalize API/seed data into leaderboard format:
function transformToLeaderboard(creators) {
  return creators
    .map(c => {
      const score = c.score || fmt.score(c);
      const followers = c.followers || 0;
      const niche = Array.isArray(c.niche) ? c.niche[0] : (c.niche || 'Creator');
      const tier = followers >= 1000000 ? 'Mega' : followers >= 100000 ? 'Macro' : 'Micro';
      return {
        id: c.id || c.handle || c.slug,
        rank: 0,
        name: c.name || 'Creator',
        niche,
        followers: fmt.num(followers),
        followersRaw: followers,
        er: c.er ? `${Number(c.er).toFixed(1)}%` : `${(Math.random() * 8 + 3).toFixed(1)}%`,
        erRaw: c.er || (Math.random() * 8 + 3),
        score,
        trend: score > 80 ? 'up' : 'down',
        location: c.city || c.location || 'India',
        tier,
        velocity: score > 80 ? `+${(Math.random() * 12 + 1).toFixed(1)}%` : `-${(Math.random() * 3 + 0.5).toFixed(1)}%`,
        avatar: c.photo || c.image || c.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name || 'C')}&background=FF9431&color=fff`
      };
    })
    .sort((a, b) => b.score - a.score)
    .map((c, i) => ({ ...c, rank: i + 1 }));
}

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('Overall');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('Score'); // 'Score' | 'Followers' | 'Engagement'
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [creatorsData, setCreatorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const labelMap = {
    Score: 'Impact Score',
    Followers: 'Total Followers',
    Engagement: 'Engagement Rate'
  };

  useEffect(() => {
    const handle = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', handle);
    return () => globalThis.removeEventListener('resize', handle);
  }, []);

  // Fetch real creators and transform for leaderboard
  useEffect(() => {
    let cancelled = false;
    fetchCreators({ limit: 100 })
      .then(list => {
        if (!cancelled) {
          setCreatorsData(transformToLeaderboard(list));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const parseFollowers = (str) => {
    if (typeof str === 'number') return str;
    if (typeof str === 'string') {
      if (str.endsWith('M')) return Number.parseFloat(str) * 1000000;
      if (str.endsWith('K')) return Number.parseFloat(str) * 1000;
      if (str.endsWith('Cr')) return Number.parseFloat(str) * 10000000;
      if (str.endsWith('L')) return Number.parseFloat(str) * 100000;
    }
    return Number.parseFloat(str) || 0;
  };

  const parseER = (str) => Number.parseFloat(str) || 0;

  const sortedCreators = useMemo(() => {
    let list = creatorsData.filter(c => 
      (activeTab === 'Overall' || c.niche === activeTab) &&
      (c.name.toLowerCase().includes(search.toLowerCase()) || 
       c.niche.toLowerCase().includes(search.toLowerCase()) || 
       c.location.toLowerCase().includes(search.toLowerCase()))
    );

    if (sortBy === 'Score') {
      list.sort((a, b) => b.score - a.score);
    } else if (sortBy === 'Followers') {
      list.sort((a, b) => parseFollowers(b.followers) - parseFollowers(a.followers));
    } else if (sortBy === 'Engagement') {
      list.sort((a, b) => parseER(b.er) - parseER(a.er));
    }

    return list;
  }, [creatorsData, activeTab, search, sortBy]);

  const leaderboardJsonLd = useMemo(() => {
    if (!sortedCreators || sortedCreators.length === 0) return null;
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "CreatorBharat Top 100 Creators Leaderboard",
      "description": "Definitive real-time rankings of India's leading influencers, sorted by AI engagement and suitability scores.",
      "url": "https://creatorbharat.com/leaderboard",
      "itemListElement": sortedCreators.slice(0, 10).map((c, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Person",
          "name": c.name,
          "url": `https://creatorbharat.com/creator/${c.id}`,
          "jobTitle": c.niche || "Content Creator",
          "homeLocation": {
            "@type": "Place",
            "name": c.location || "India"
          }
        }
      }))
    };
  }, [sortedCreators]);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', overflowX: 'hidden' }}>
      <Seo 
        title="Elite Leaderboard"
        description="Access verified real-time rankings of Bharat's leading influencers. Powered by proprietary engagement intelligence."
        jsonLd={leaderboardJsonLd}
      />
      
      <LeaderboardHero mob={mob} />

      <main style={{ maxWidth: '1120px', margin: mob ? '-30px auto 120px' : '-60px auto 120px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        
        {/* Floating Advanced Toolbar */}
        <div style={{ 
          background: '#ffffff', padding: mob ? '16px' : '12px 12px 12px 32px', 
          borderRadius: '40px', boxShadow: '0 20px 40px rgba(15,23,42,0.05)', 
          border: '1px solid #e2e8f0', display: 'flex', flexDirection: mob ? 'column' : 'row', 
          gap: '20px', alignItems: 'center', marginBottom: '56px' 
        }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', width: '100%', padding: '4px 0', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: THEME.dark, fontWeight: 950, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginRight: '12px' }}>
               <Filter size={16} style={{ color: THEME.primary }} /> Filter
            </div>
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveTab(cat)} 
                style={{ 
                  padding: '10px 24px', 
                  borderRadius: '100px', 
                  border: 'none', 
                  background: activeTab === cat ? THEME.primary : 'transparent', 
                  color: activeTab === cat ? '#fff' : '#64748b', 
                  fontSize: '14px', 
                  fontWeight: 850, 
                  cursor: 'pointer', 
                  transition: '0.2s', 
                  whiteSpace: 'nowrap' 
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: mob ? '100%' : '380px' }}>
            <Search style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={20} />
            <input 
              placeholder="Search by name, niche or location..." 
              value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '18px 24px 18px 56px', 
                borderRadius: '100px', 
                border: '1px solid #e2e8f0', 
                background: '#ffffff', 
                color: THEME.dark,
                fontSize: '15px', 
                fontWeight: 600, 
                outline: 'none', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)' 
              }} 
            />
          </div>
        </div>

        {/* Intelligence Pulse Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '20px', marginBottom: '56px' }}>
           {[
             { label: 'Network Reach', val: '420M+', icon: <Globe />, color: THEME.secondary },
             { label: 'Verified Creators', val: '12,402', icon: <ShieldCheck />, color: THEME.green },
             { label: 'Avg ROI Delta', val: '+24.8%', icon: <Activity />, color: THEME.primary }
           ].map((item) => (
             <div key={item.label} style={{ background: '#ffffff', padding: '28px', borderRadius: '32px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.015)' }}>
                <div style={{ width: '56px', height: '56px', background: item.color + '10', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color }}>{item.icon}</div>
                <div>
                   <div style={{ fontSize: '11px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{item.label}</div>
                   <div style={{ fontSize: '24px', fontWeight: 950, color: THEME.dark }}>{item.val}</div>
                </div>
             </div>
           ))}
        </div>

        {/* Sorting Chips Bar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px',
          padding: '0 8px'
        }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Sort Intelligence By:</span>
           </div>
           <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Score', 'Followers', 'Engagement'].map(s => {
                  const active = sortBy === s;
                  return (
                     <button
                       key={s}
                       onClick={() => setSortBy(s)}
                       style={{
                         padding: '10px 20px',
                         borderRadius: '100px',
                         border: `1.5px solid ${active ? THEME.primary : '#e2e8f0'}`,
                         background: active ? 'rgba(255, 148, 49, 0.08)' : '#ffffff',
                         color: active ? THEME.primary : '#64748b',
                         fontWeight: 900,
                         fontSize: '13px',
                         cursor: 'pointer',
                         transition: 'all 0.2s ease',
                         display: 'flex',
                         alignItems: 'center',
                         gap: '6px'
                       }}
                     >
                       {s === 'Score' && <Crown size={14} />}
                       {s === 'Followers' && <Layers size={14} />}
                       {s === 'Engagement' && <Activity size={14} />}
                       {labelMap[s]}
                     </button>
                  );
              })}
           </div>
        </div>

        {/* Podium (Top 3) */}
        {activeTab === 'Overall' && !search && (
          <ElitePodiumCard creators={sortedCreators.slice(0, 3)} mob={mob} navigate={navigate} />
        )}

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '100px 0', gap: '12px' }}>
             <Activity size={24} color={THEME.primary} style={{ animation: 'spin 1.5s linear infinite' }} />
             <span style={{ fontSize: '16px', fontWeight: 700, color: '#64748b' }}>Loading intelligence directory...</span>
          </div>
        ) : (
          <RankingsTable creators={sortedCreators} mob={mob} navigate={navigate} />
        )}

        {/* Methodology Section */}
        <section style={{ 
          marginTop: '140px', 
          padding: mob ? '40px 20px' : '100px 80px', 
          background: '#0a0f1d', 
          borderRadius: '64px', 
          position: 'relative', 
          overflow: 'hidden',
          border: '1px solid rgba(255,148,49,0.1)'
        }}>
           <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.05, background: 'radial-gradient(circle at 100% 0%, #fff, transparent 50%)' }} />
           
           <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '80px', position: 'relative', zIndex: 1 }}>
              <div>
                 <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.03)', padding: '10px 20px', borderRadius: '100px', marginBottom: '32px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <Activity size={16} color={THEME.primary} />
                    <span style={{ fontSize: '11px', fontWeight: 950, color: '#fff', textTransform: 'uppercase', letterSpacing: '2px' }}>Scoring Protocol</span>
                 </div>
                 <h2 style={{ fontSize: mob ? '40px' : '64px', fontWeight: 950, color: '#fff', letterSpacing: '-0.05em', lineHeight: 0.9, marginBottom: '32px' }}>The Math behind <br/><span style={{ color: THEME.primary }}>the Magic.</span></h2>
                 <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: '48px' }}>We don't just count followers. Our AI engine weights sentiment, retention, and conversion velocity to find true influence.</p>
                 
                 <div style={{ display: 'grid', gap: '32px' }}>
                    {[
                      { title: 'Audience Purity', val: '99.4%', desc: 'Proprietary bot-detection filters.' },
                      { title: 'Sentiment Score', val: 'High', desc: 'Natural language processing on comments.' },
                      { title: 'Economic Value', val: '$2.4M', desc: 'Projected revenue impact per post.' }
                    ].map((m) => (
                       <div key={m.title} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '16px' }}>
                          <div>
                             <div style={{ fontSize: '18px', fontWeight: 950, color: '#fff' }}>{m.title}</div>
                             <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{m.desc}</div>
                          </div>
                          <div style={{ fontSize: '20px', fontWeight: 950, color: THEME.primary }}>{m.val}</div>
                       </div>
                    ))}
                 </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                 <div style={{ background: 'rgba(255,255,255,0.02)', padding: '48px', borderRadius: '48px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ fontSize: '28px', fontWeight: 950, color: '#fff', marginBottom: '24px' }}>Want to see the full data set?</h3>
                    <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '40px', lineHeight: 1.6 }}>Enterprise brands get access to deep-dive analytics, engagement histories, and historical conversion data for all 10k+ verified creators.</p>
                    <button 
                      onClick={() => navigate('/contact')}
                      style={{ 
                        width: '100%', 
                        background: '#ffffff', 
                        color: '#090d16', 
                        border: 'none',
                        fontWeight: 950, 
                        borderRadius: '16px', 
                        padding: '20px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        transition: '0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#FF9431';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#ffffff';
                        e.currentTarget.style.color = '#090d16';
                      }}
                    >
                      Request Enterprise Access
                    </button>
                 </div>
              </div>
           </div>
        </section>

        {/* Final Interactive CTA */}
        <section style={{ marginTop: '140px', textAlign: 'center' }}>
           <div style={{ padding: mob ? '80px 24px' : '120px 48px', borderRadius: '64px', background: `linear-gradient(135deg, ${THEME.primary} 0%, #EA580C 100%)`, color: '#fff', position: 'relative', overflow: 'hidden' }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} style={{ position: 'absolute', top: -150, right: -150, opacity: 0.1, pointerEvents: 'none' }}><Globe size={500} /></motion.div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                 <h2 style={{ fontSize: mob ? '48px' : '72px', fontWeight: 950, marginBottom: '24px', letterSpacing: '-0.05em', lineHeight: 0.9 }}>Join Bharat's <br/> Hall of Fame.</h2>
                 <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.85)', maxWidth: '700px', margin: '0 auto 48px', fontWeight: 500 }}>Join the circle of Bharat's most influential creators. Apply for official verification today.</p>
                 <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <button 
                      onClick={() => navigate('/join')} 
                      style={{ 
                        background: '#fff', 
                        color: '#EA580C', 
                        borderRadius: '100px', 
                        fontWeight: 950, 
                        padding: '20px 56px', 
                        fontSize: '18px', 
                        border: 'none', 
                        cursor: 'pointer',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        transition: '0.2s'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      Apply for Verification
                    </button>
                 </div>
              </div>
           </div>
        </section>

      </main>
    </div>
  );
}
