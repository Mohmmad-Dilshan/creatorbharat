import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Crown, 
  TrendingUp, 
  Search, 
  ArrowUpRight,
  Zap,
  Globe
} from 'lucide-react';
import { Btn, Card, Bdg } from '@/components/common/Primitives';
import { useNavigate } from 'react-router-dom';
import Seo from '@/components/common/SEO';

const categories = ['Overall', 'Tech', 'Finance', 'Lifestyle', 'Gaming', 'Travel', 'Beauty'];

const creatorsData = [
  { id: 1, rank: 1, name: 'Arjun Mehta', niche: 'Finance', followers: '1.2M', er: '8.4%', score: 98, avatar: 'AM' },
  { id: 2, rank: 2, name: 'Sanya Iyer', niche: 'Lifestyle', followers: '850K', er: '12.1%', score: 96, avatar: 'SI' },
  { id: 3, rank: 3, name: 'Kabir Singh', niche: 'Tech', followers: '920K', er: '6.2%', score: 94, avatar: 'KS' },
  { id: 4, rank: 4, name: 'Priya Sharma', niche: 'Beauty', followers: '1.5M', er: '4.8%', score: 91, avatar: 'PS' },
  { id: 5, rank: 5, name: 'Rohan Das', niche: 'Gaming', followers: '440K', er: '15.2%', score: 89, avatar: 'RD' },
  { id: 6, rank: 6, name: 'Ishita Vyas', niche: 'Travel', followers: '320K', er: '11.8%', score: 88, avatar: 'IV' },
  { id: 7, rank: 7, name: 'Vikram Seth', niche: 'Finance', followers: '580K', er: '7.9%', score: 87, avatar: 'VS' },
  { id: 8, rank: 8, name: 'Ananya Rao', niche: 'Lifestyle', followers: '1.1M', er: '5.1%', score: 85, avatar: 'AR' },
];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('Overall');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredCreators = creatorsData.filter(c => 
    (activeTab === 'Overall' || c.niche === activeTab) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', overflowX: 'hidden' }}>
      <Seo 
        title="Creator Leaderboard"
        description="Discover the most influential voices shaping the digital landscape of Bharat. Ranked by engagement, trust, and impact."
        keywords="creator leaderboard, top influencers india, top creators bharat"
      />
      
      {/* Hero Section */}
      <section style={{ 
        background: '#050505', 
        padding: '160px 24px 100px', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255, 148, 49, 0.1), transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(to top, #fcfcfc, transparent)' }} />
        
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
            <Trophy size={16} color="#FF9431" />
            <span style={{ fontSize: '13px', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Bharat's Elite 100</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: 'clamp(40px, 8vw, 84px)', fontWeight: 950, color: '#fff', marginBottom: '24px', letterSpacing: '-0.05em', lineHeight: 0.95 }}
          >
            The Creator <br />
            <span style={{ background: 'linear-gradient(90deg, #FF9431, #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Hall of Fame.</span>
          </motion.h1>
          <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.5)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>
            Discover the most influential voices shaping the digital landscape of Bharat. Ranked by engagement, trust, and impact.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main style={{ maxWidth: '1100px', margin: '-40px auto 120px', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        
        {/* Toolbar */}
        <div style={{ 
          background: '#fff', 
          padding: '24px', 
          borderRadius: '32px', 
          boxShadow: '0 20px 50px rgba(0,0,0,0.06)',
          border: '1px solid #f1f5f9',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '48px'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '100px',
                  border: 'none',
                  background: activeTab === cat ? '#0f172a' : 'transparent',
                  color: activeTab === cat ? '#fff' : '#64748b',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', minWidth: '280px' }}>
            <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
            <input 
              type="text" 
              placeholder="Search creator name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '14px 14px 14px 48px', 
                borderRadius: '100px', 
                border: '1px solid #f1f5f9', 
                background: '#f8fafc',
                fontSize: '15px',
                fontWeight: 600,
                outline: 'none'
              }} 
            />
          </div>
        </div>

        {/* Podium (Top 3) */}
        {activeTab === 'Overall' && !search && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '64px' }}>
            {creatorsData.slice(0, 3).map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                style={{
                  background: i === 0 ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' : '#fff',
                  padding: '40px',
                  borderRadius: '40px',
                  border: '1px solid ' + (i === 0 ? '#1e293b' : '#f1f5f9'),
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.05)'
                }}
              >
                {i === 0 && <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}><Crown size={150} /></div>}
                
                <div 
                  role="img"
                  aria-label={`Avatar of ${c.name}`}
                  style={{ 
                    width: '80px', height: '80px', background: i === 0 ? '#ea580c' : '#f1f5f9', 
                    borderRadius: '50%', margin: '0 auto 24px', display: 'flex', alignItems: 'center', 
                    justifyContent: 'center', fontSize: '24px', fontWeight: 950, color: i === 0 ? '#fff' : '#0f172a',
                    border: '4px solid ' + (i === 0 ? 'rgba(255,255,255,0.2)' : '#fff'),
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                  }}
                >
                  {c.avatar}
                </div>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: i === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(234, 88, 12, 0.12)', padding: '6px 12px', borderRadius: '100px', marginBottom: '16px' }}>
                  <Crown size={14} color={i === 0 ? '#FF9431' : '#EA580C'} />
                  <span style={{ fontSize: '11px', fontWeight: 900, color: i === 0 ? '#fff' : '#C2410C', textTransform: 'uppercase' }}>Rank #{c.rank}</span>
                </div>

                <h3 style={{ fontSize: '24px', fontWeight: 950, color: i === 0 ? '#fff' : '#0f172a', marginBottom: '8px' }}>{c.name}</h3>
                <p style={{ fontSize: '15px', color: i === 0 ? 'rgba(255,255,255,0.6)' : '#64748b', marginBottom: '32px', fontWeight: 600 }}>{c.niche} Creator from Bharat</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', textAlign: 'left', background: i === 0 ? 'rgba(255,255,255,0.05)' : '#f1f5f9', padding: '20px', borderRadius: '24px' }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 900, color: i === 0 ? 'rgba(255,255,255,0.6)' : '#475569', textTransform: 'uppercase', marginBottom: '4px' }}>Reach</div>
                    <div style={{ fontSize: '18px', fontWeight: 900, color: i === 0 ? '#fff' : '#0f172a' }}>{c.followers}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 900, color: i === 0 ? 'rgba(255,255,255,0.6)' : '#475569', textTransform: 'uppercase', marginBottom: '4px' }}>Power Score</div>
                    <div style={{ fontSize: '18px', fontWeight: 900, color: i === 0 ? '#10b981' : '#059669' }}>{c.score}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Table View */}
        <div style={{ background: '#fff', borderRadius: '40px', border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.04)' }}>
           <div style={{ padding: '32px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '20px', fontWeight: 950, color: '#0f172a' }}>Leaderboard Rankings</h4>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748b', fontWeight: 600 }}><Zap size={14} color="#FF9431" /> Updated hourly</div>
              </div>
           </div>

           <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                 <thead>
                    <tr style={{ background: '#f8fafc' }}>
                       <th style={{ padding: '20px 32px', textAlign: 'left', fontSize: '12px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>Rank</th>
                       <th style={{ padding: '20px 32px', textAlign: 'left', fontSize: '12px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>Creator</th>
                       <th style={{ padding: '20px 32px', textAlign: 'left', fontSize: '12px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>Engagement</th>
                       <th style={{ padding: '20px 32px', textAlign: 'left', fontSize: '12px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>Followers</th>
                       <th style={{ padding: '20px 32px', textAlign: 'left', fontSize: '12px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>Score</th>
                       <th style={{ padding: '20px 32px', textAlign: 'right' }}></th>
                    </tr>
                 </thead>
                 <tbody>
                    {filteredCreators.map((c, i) => (
                       <motion.tr 
                         key={c.id}
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: i * 0.05 }}
                         style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }}
                         whileHover={{ background: '#f8fafc' }}
                         onClick={() => navigate(`/creator/${c.id}`)}
                       >
                          <td style={{ padding: '24px 32px', fontSize: '16px', fontWeight: 900, color: '#0f172a' }}>#{c.rank}</td>
                          <td style={{ padding: '24px 32px' }}>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#64748b' }}>{c.avatar}</div>
                                <div>
                                   <div style={{ fontWeight: 800, color: '#0f172a' }}>{c.name}</div>
                                   <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>{c.niche}</div>
                                </div>
                             </div>
                          </td>
                          <td style={{ padding: '24px 32px' }}>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontWeight: 900 }}>
                                <TrendingUp size={16} /> {c.er}
                             </div>
                          </td>
                          <td style={{ padding: '24px 32px', fontWeight: 700, color: '#64748b' }}>{c.followers}</td>
                          <td style={{ padding: '24px 32px' }}>
                             <Bdg color={c.score > 90 ? 'green' : 'orange'} sm>{c.score}</Bdg>
                          </td>
                          <td style={{ padding: '24px 32px', textAlign: 'right' }}>
                             <button 
                               aria-label={`View ${c.name}'s profile`}
                               style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', border: 'none', cursor: 'pointer' }}
                             >
                                <ArrowUpRight size={18} />
                             </button>
                          </td>
                       </motion.tr>
                    ))}
                 </tbody>
              </table>
           </div>

           {filteredCreators.length === 0 && (
             <div style={{ padding: '80px', textAlign: 'center' }}>
                <Search size={48} color="#f1f5f9" style={{ marginBottom: '16px' }} />
                <h5 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a' }}>No creators found</h5>
                <p style={{ color: '#94a3b8', fontWeight: 600 }}>Try adjusting your search or category filters.</p>
             </div>
           )}
        </div>

        {/* Call to Action */}
        <section style={{ marginTop: '80px', textAlign: 'center' }}>
           <Card style={{ 
             padding: '80px 40px', 
             borderRadius: '48px', 
             background: 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)',
             color: '#fff',
             position: 'relative',
             overflow: 'hidden'
           }}>
              <div style={{ position: 'absolute', top: -50, right: -50, opacity: 0.1 }}><Globe size={300} /></div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                 <h2 style={{ fontSize: '48px', fontWeight: 950, marginBottom: '20px', letterSpacing: '-0.04em' }}>Join the Bharat Elite.</h2>
                 <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 40px', fontWeight: 500 }}>
                    Are you a creator with a unique voice and high engagement? Apply for verification and claim your spot on the leaderboard.
                 </p>
                 <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    <Btn lg onClick={() => navigate('/apply')} style={{ background: '#fff', color: '#EA580C', borderRadius: '100px', fontWeight: 950, padding: '20px 40px' }}>Apply for Verification</Btn>
                    <Btn lg onClick={() => navigate('/about')} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', fontWeight: 950, padding: '20px 40px' }}>Learn More</Btn>
                 </div>
              </div>
           </Card>
        </section>

      </main>

    </div>
  );
}

