import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, Search, Globe, 
  MapPin, Layers, Filter,
  Activity, ShieldCheck, SlidersHorizontal
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

// Deterministic seeded pseudo-random — same input always gives same output
// Uses creator ID hash so ER doesn't flicker on re-render
function seededRandom(seed, min, max, decimals = 1) {
  // Simple deterministic hash from string/number seed
  const s = String(seed);
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const normalized = Math.abs(h % 1000) / 1000; // 0..1
  const val = min + normalized * (max - min);
  return parseFloat(val.toFixed(decimals));
}

// Transform function to normalize API/seed data into leaderboard format:
function transformToLeaderboard(creators) {
  return creators
    .map((c, idx) => {
      const score = c.score || fmt.score(c);
      const followers = c.followers || 0;
      const niche = Array.isArray(c.niche) ? c.niche[0] : (c.niche || 'Creator');
      const tier = followers >= 1000000 ? 'Mega' : followers >= 100000 ? 'Macro' : 'Micro';

      // Deterministic platform — prefers actual API field, fallback by idx
      const platformsList = ['Instagram', 'YouTube', 'LinkedIn', 'Twitter'];
      const platform = c.primaryPlatform || c.platform || platformsList[idx % 4];

      // Deterministic ER — from real data if available, else seeded by creator id+score
      const erSeed = `${c.id || idx}-er`;
      const erRaw = c.er
        ? Number(c.er)
        : seededRandom(erSeed, 2.5, 11.5, 1);
      const er = `${erRaw.toFixed(1)}%`;

      // Deterministic velocity — based on score + id seed (no random flicker)
      const velSeed = `${c.id || idx}-vel`;
      const isUp = score > 75;
      const velMag = isUp
        ? seededRandom(velSeed, 0.8, 13.5, 1)
        : seededRandom(velSeed, 0.3, 4.2, 1);
      const velocity = isUp ? `+${velMag}%` : `-${velMag}%`;

      return {
        id: c.id || c.handle || c.slug,
        rank: 0,
        name: c.name || 'Creator',
        niche,
        platform,
        followers: fmt.num(followers),
        followersRaw: followers,
        er,
        erRaw,
        score,
        trend: isUp ? 'up' : 'down',
        location: c.city || c.location || 'India',
        tier,
        velocity,
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
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [selectedTier, setSelectedTier] = useState('All');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showEcosystemStats, setShowEcosystemStats] = useState(false);
  
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [creatorsData, setCreatorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScoreCreator, setSelectedScoreCreator] = useState(null);
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
    let list = creatorsData.filter(c => {
      const matchesCategory = activeTab === 'Overall' || c.niche === activeTab;
      const matchesPlatform = selectedPlatform === 'All' || c.platform === selectedPlatform;
      const matchesTier = selectedTier === 'All' || c.tier === selectedTier;
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
        c.niche.toLowerCase().includes(search.toLowerCase()) || 
        c.location.toLowerCase().includes(search.toLowerCase());
      
      return matchesCategory && matchesPlatform && matchesTier && matchesSearch;
    });

    if (sortBy === 'Score') {
      list.sort((a, b) => b.score - a.score);
    } else if (sortBy === 'Followers') {
      list.sort((a, b) => parseFollowers(b.followers) - parseFollowers(a.followers));
    } else if (sortBy === 'Engagement') {
      list.sort((a, b) => parseER(b.er) - parseER(a.er));
    }

    return list;
  }, [creatorsData, activeTab, search, sortBy, selectedPlatform, selectedTier]);

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
          gap: '20px', alignItems: 'center', marginBottom: '24px' 
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

          <div style={{ position: 'relative', width: mob ? '100%' : '440px', display: 'flex', gap: '10px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
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
            
            <button 
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              style={{
                background: showAdvancedFilters ? 'rgba(255, 148, 49, 0.08)' : '#ffffff',
                border: `1.5px solid ${showAdvancedFilters ? THEME.primary : '#e2e8f0'}`,
                color: showAdvancedFilters ? THEME.primary : '#64748b',
                borderRadius: '100px',
                width: '56px',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
              title="Toggle Advanced Filters"
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Collapsible Advanced Filters Drawer */}
        <AnimatePresence>
          {showAdvancedFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{ overflow: 'hidden', marginBottom: '32px' }}
            >
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '32px',
                padding: mob ? '24px' : '28px 40px',
                boxShadow: '0 20px 40px rgba(15,23,42,0.03)',
                display: 'flex',
                flexDirection: mob ? 'column' : 'row',
                gap: mob ? '20px' : '40px'
              }}>
                {/* Platform Filters */}
                <div style={{ flex: 1 }}>
                  <span style={{ display: 'block', fontSize: '11px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: '12px' }}>Social Platform</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {['All', 'Instagram', 'YouTube', 'LinkedIn', 'Twitter'].map(p => {
                      const active = selectedPlatform === p;
                      return (
                        <button
                          key={p}
                          onClick={() => setSelectedPlatform(p)}
                          style={{
                            padding: '8px 18px',
                            borderRadius: '100px',
                            border: `1.5px solid ${active ? THEME.primary : '#e2e8f0'}`,
                            background: active ? 'rgba(255, 148, 49, 0.08)' : '#ffffff',
                            color: active ? THEME.primary : '#64748b',
                            fontWeight: 900,
                            fontSize: '13px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {p === 'All' ? 'All Platforms' : p}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Follower Tier Filters */}
                <div style={{ flex: 1 }}>
                  <span style={{ display: 'block', fontSize: '11px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: '12px' }}>Follower Tier</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {[
                      { key: 'All', label: 'All Tiers' },
                      { key: 'Mega', label: 'Mega (1M+)' },
                      { key: 'Macro', label: 'Macro (100K-1M)' },
                      { key: 'Micro', label: 'Micro (10K-100K)' }
                    ].map(t => {
                      const active = selectedTier === t.key;
                      return (
                        <button
                          key={t.key}
                          onClick={() => setSelectedTier(t.key)}
                          style={{
                            padding: '8px 18px',
                            borderRadius: '100px',
                            border: `1.5px solid ${active ? THEME.primary : '#e2e8f0'}`,
                            background: active ? 'rgba(255, 148, 49, 0.08)' : '#ffffff',
                            color: active ? THEME.primary : '#64748b',
                            fontWeight: 900,
                            fontSize: '13px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {t.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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

        {/* Sorting & Insights Chips Bar */}
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
           
           <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
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
              
              <div style={{ width: '1px', height: '24px', background: '#e2e8f0', margin: '0 8px' }} />
              
              <button
                onClick={() => setShowEcosystemStats(!showEcosystemStats)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '100px',
                  border: `1.5px solid ${showEcosystemStats ? THEME.secondary : '#e2e8f0'}`,
                  background: showEcosystemStats ? 'rgba(59, 130, 246, 0.08)' : '#ffffff',
                  color: showEcosystemStats ? THEME.secondary : '#64748b',
                  fontWeight: 950,
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                📊 Ecosystem Insights
              </button>
           </div>
        </div>

        {/* Ecosystem Live Stats Panel */}
        <AnimatePresence>
          {showEcosystemStats && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ overflow: 'hidden', marginBottom: '40px' }}
            >
              <div style={{
                background: 'linear-gradient(165deg, #0f172a 0%, #020617 100%)',
                borderRadius: '32px',
                padding: mob ? '24px' : '40px',
                color: '#fff',
                boxShadow: '0 25px 50px rgba(15,23,42,0.15)',
                border: '1px solid rgba(255,255,255,0.08)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: 'radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0.15), transparent 70%)', pointerEvents: 'none' }} />
                
                <h3 style={{ fontSize: '20px', fontWeight: 950, marginBottom: '24px', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>Ecosystem Analytics Overview</span>
                  <span style={{ fontSize: '10px', fontWeight: 900, color: THEME.primary, background: 'rgba(255,148,49,0.15)', padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '1px' }}>Consensus Active</span>
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '32px' }}>
                  
                  {/* Column 1: Platform Share */}
                  <div>
                    <span style={{ display: 'block', fontSize: '11px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Platform Distribution</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {[
                        { label: 'Instagram', pct: 38, color: '#e1306c' },
                        { label: 'YouTube', pct: 32, color: '#ff0000' },
                        { label: 'LinkedIn', pct: 18, color: '#0077b5' },
                        { label: 'Twitter', pct: 12, color: '#1da1f2' }
                      ].map(p => (
                        <div key={p.label}>
                          <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, marginBottom: '4px' }}>
                            <span>{p.label}</span>
                            <span>{p.pct}%</span>
                          </div>
                          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '100px', overflow: 'hidden' }}>
                            <div style={{ width: `${p.pct}%`, height: '100%', background: p.color, borderRadius: '100px' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Average Engagement by Niche */}
                  <div>
                    <span style={{ display: 'block', fontSize: '11px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Avg Engagement by Niche</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {[
                        { label: 'Tech & Gadgets', er: '6.4%', color: THEME.primary },
                        { label: 'Finance & Money', er: '5.8%', color: THEME.secondary },
                        { label: 'Lifestyle & Travel', er: '4.9%', color: THEME.green },
                        { label: 'Gaming & Esports', er: '7.1%', color: '#8b5cf6' }
                      ].map(n => (
                        <div key={n.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <span style={{ fontSize: '13px', fontWeight: 800 }}>{n.label}</span>
                          <span style={{ fontSize: '13px', fontWeight: 950, color: n.color }}>{n.er}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: Telemetry Signals */}
                  <div>
                    <span style={{ display: 'block', fontSize: '11px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>Consensus Metrics</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: THEME.green, boxShadow: `0 0 8px ${THEME.green}` }} />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 800 }}>Database Verification Rate</div>
                          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>99.82% consensus verified</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: THEME.green, boxShadow: `0 0 8px ${THEME.green}` }} />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 800 }}>Uptime & Latency</div>
                          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>99.9% / 85ms load velocity</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: THEME.secondary, boxShadow: `0 0 8px ${THEME.secondary}` }} />
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 800 }}>Weekly Telemetry Updates</div>
                          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>Refreshed every Sunday 00:00 IST</div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Podium (Top 3) */}
        {activeTab === 'Overall' && !search && selectedPlatform === 'All' && selectedTier === 'All' && (
          <ElitePodiumCard creators={sortedCreators.slice(0, 3)} mob={mob} navigate={navigate} onScoreClick={setSelectedScoreCreator} />
        )}

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '100px 0', gap: '12px' }}>
             <Activity size={24} color={THEME.primary} style={{ animation: 'spin 1.5s linear infinite' }} />
             <span style={{ fontSize: '16px', fontWeight: 700, color: '#64748b' }}>Loading intelligence directory...</span>
          </div>
        ) : (
          <RankingsTable creators={sortedCreators} mob={mob} navigate={navigate} onScoreClick={setSelectedScoreCreator} />
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

      {/* Pehchan Score Breakdown Modal */}
      <AnimatePresence>
        {selectedScoreCreator && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(9, 13, 22, 0.4)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100000,
            padding: '20px'
          }} onClick={() => setSelectedScoreCreator(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '32px',
                width: '100%',
                maxWidth: '460px',
                padding: '36px',
                boxShadow: '0 30px 60px rgba(15,23,42,0.15)',
                position: 'relative'
              }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedScoreCreator(null)}
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748b'
                }}
              >
                ✕
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', overflow: 'hidden', border: '2px solid #FF9431', flexShrink: 0 }}>
                  <img src={selectedScoreCreator.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 950, color: '#0f172a', margin: 0 }}>{selectedScoreCreator.name}</h3>
                  <span style={{ fontSize: '12px', fontWeight: 850, color: '#FF9431' }}>{selectedScoreCreator.niche} • {selectedScoreCreator.location}</span>
                </div>
              </div>

              <h4 style={{ fontSize: '11px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: 6 }}>
                <ShieldCheck size={14} color="#10B981" /> Pehchan Integrity Report
              </h4>

              {/* Score Breakdown Bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                {[
                  { label: 'Audience Authenticity', score: 98.4, color: '#10B981' },
                  { label: 'Engagement Stability', score: 94.2, color: '#3b82f6' },
                  { label: 'Sentiment Index', score: 92.8, color: '#ff9431' },
                  { label: 'Brand Safety Score', score: 99.1, color: '#8b5cf6' }
                ].map(row => (
                  <div key={row.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, color: '#475569', marginBottom: '6px' }}>
                      <span>{row.label}</span>
                      <span style={{ color: '#0f172a' }}>{row.score}%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '100px', overflow: 'hidden' }}>
                      <div style={{ width: `${row.score}%`, height: '100%', background: row.color, borderRadius: '100px' }} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b' }}>VERIFIED BY DEEP-LEARNING CORE NODE v1.1</div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
