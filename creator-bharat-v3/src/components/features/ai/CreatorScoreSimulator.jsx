import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  ChevronDown, 
  Zap, 
  Award, 
  TrendingUp, 
  Target, 
  Activity, 
  Shield, 
  BarChart2, 
  Sparkles 
} from 'lucide-react';
import { Card, Bdg, Btn } from '@/components/common/Primitives';

// Niche multipliers — different niches have different brand demand
const NICHE_CONFIG = {
  'Finance':   { mult: 1.35, avg_er: 5.2, demand: 'Very High' },
  'Tech':      { mult: 1.28, avg_er: 4.8, demand: 'High' },
  'Fitness':   { mult: 1.22, avg_er: 7.1, demand: 'High' },
  'Beauty':    { mult: 1.18, avg_er: 6.4, demand: 'High' },
  'Lifestyle': { mult: 1.10, avg_er: 5.9, demand: 'Medium' },
  'Travel':    { mult: 1.08, avg_er: 6.8, demand: 'Medium' },
  'Gaming':    { mult: 1.15, avg_er: 9.2, demand: 'High' },
  'Food':      { mult: 1.05, avg_er: 8.3, demand: 'Medium' },
  'Education': { mult: 1.20, avg_er: 4.5, demand: 'High' },
  'Comedy':    { mult: 0.95, avg_er: 10.1, demand: 'Medium' },
};

// Platform avg benchmarks for comparison bar
const PLATFORM_BENCHMARKS = {
  score: 54,
  engagement: 4.2,
  authenticity: 74,
  consistency: 5.8,
  followers: 85000,
};

export default function CreatorScoreSimulator({ mob }) {
  const [nicheOpen, setNicheOpen] = useState(false);
  const [niche, setNiche] = useState('Lifestyle');

  // Simulator State
  const [followers, setFollowers] = useState(50000);
  const [engagement, setEngagement] = useState(4.5);
  const [consistency, setConsistency] = useState(8);
  const [authenticity, setAuthenticity] = useState(85);

  // Real-time Score Calculations
  const calculations = useMemo(() => {
    const nicheCfg = NICHE_CONFIG[niche] || NICHE_CONFIG['Lifestyle'];

    // Core score formula
    const logF = Math.log10(followers);
    const scoreVal = (engagement * 3) + (consistency * 3.5) + ((authenticity - 50) * 0.6) + (logF * 3.5);
    const finalScore = Math.min(100, Math.max(10, Math.round(scoreVal)));

    // Pillar scores (0-100 each) for breakdown bars
    const pillars = {
      engagement: Math.min(100, Math.round((engagement / 15) * 100)),
      consistency: Math.round((consistency / 10) * 100),
      authenticity: Math.round(((authenticity - 50) / 50) * 100),
      reach: Math.min(100, Math.round((logF / Math.log10(1000000)) * 100)),
    };

    // Tier
    let tier = 'Evolving Tier';
    let tierColor = '#94a3b8';
    let tierIcon = '🌱';
    if (finalScore >= 90) { tier = 'Elite Concierge'; tierColor = '#a855f7'; tierIcon = '👑'; }
    else if (finalScore >= 75) { tier = 'Premium Verified'; tierColor = '#FF9431'; tierIcon = '⚡'; }
    else if (finalScore >= 60) { tier = 'Rising Star'; tierColor = '#10B981'; tierIcon = '🚀'; }

    // Pay estimation with niche multiplier
    const baseRate = followers * (engagement / 100) * 1.8;
    const scoreMult = finalScore / 70;
    const constMult = consistency / 7.5;
    let pay = baseRate * scoreMult * constMult * nicheCfg.mult;
    pay = Math.max(2500, Math.round(pay / 500) * 500);
    let formattedPay = `₹${pay.toLocaleString('en-IN')}`;
    if (pay >= 100000) formattedPay = `₹${(pay / 100000).toFixed(2)}L`;

    // Monthly earning estimate (avg 4 posts/month)
    const monthlyPay = pay * 4;
    let formattedMonthly = `₹${monthlyPay.toLocaleString('en-IN')}`;
    if (monthlyPay >= 100000) formattedMonthly = `₹${(monthlyPay / 100000).toFixed(1)}L/mo`;

    const matchRate = Math.min(99, Math.round(75 + (finalScore * 0.24)));

    // vs platform average
    const vsAvg = {
      score: finalScore - PLATFORM_BENCHMARKS.score,
      engagement: engagement - PLATFORM_BENCHMARKS.engagement,
      authenticity: authenticity - PLATFORM_BENCHMARKS.authenticity,
    };

    // AI tips based on lowest pillar
    const lowestPillar = Object.entries(pillars).sort((a, b) => a[1] - b[1])[0][0];
    const tips = {
      engagement: 'Boost engagement with Q&A stickers, polls, and reply-to-comment videos.',
      consistency: 'Post daily for 21 days to build content rhythm and trigger algorithm boosts.',
      authenticity: 'Remove inactive followers and avoid follow-for-follow tactics.',
      reach: 'Collaborate with 2-3 creators in your niche to cross-pollinate audiences.',
    };

    return {
      score: finalScore, tier, tierColor, tierIcon,
      pay: formattedPay, monthlyPay: formattedMonthly,
      matchRate, pillars, vsAvg,
      nicheDemand: nicheCfg.demand,
      nicheAvgEr: nicheCfg.avg_er,
      topTip: tips[lowestPillar],
      weakestPillar: lowestPillar,
    };
  }, [followers, engagement, consistency, authenticity, niche]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.2fr 1fr', gap: mob ? 20 : 28, alignItems: 'start' }}>
      {/* LEFT: Simulator Inputs */}
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <Card style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: mob ? 16 : 32, borderRadius: 28, position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
          <div style={{ position: 'absolute', top: -1, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255, 148, 49, 0.2), transparent)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255, 148, 49, 0.08)', display: 'grid', placeItems: 'center', color: '#FF9431' }}>
              <Cpu size={22} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: 18, fontWeight: 900, color: '#0f172a', margin: 0 }}>AI Score Simulator</h2>
              <p style={{ fontSize: 12, color: '#64748b', margin: '2px 0 0 0', fontWeight: 600 }}>Tune your metrics — see your score update live</p>
            </div>
          </div>

          {/* Niche Selector */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 800, color: '#475569', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1, textAlign: 'left' }}>Your Content Niche</label>
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setNicheOpen(p => !p)}
                style={{
                  width: '100%', padding: '12px 16px', background: '#ffffff',
                  border: `1px solid ${nicheOpen ? '#FF9431' : '#e2e8f0'}`,
                  borderRadius: 12, color: '#0f172a', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  fontSize: 14, fontWeight: 800, transition: 'border-color 0.2s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.01)'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {niche}
                  <span style={{
                    fontSize: 10, fontWeight: 900, padding: '2px 8px', borderRadius: 100,
                    background: NICHE_CONFIG[niche]?.demand === 'Very High' ? 'rgba(168,85,247,0.1)' :
                      NICHE_CONFIG[niche]?.demand === 'High' ? 'rgba(16,185,129,0.1)' : 'rgba(0,0,0,0.05)',
                    color: NICHE_CONFIG[niche]?.demand === 'Very High' ? '#a855f7' :
                      NICHE_CONFIG[niche]?.demand === 'High' ? '#10B981' : '#64748b',
                    textTransform: 'uppercase', letterSpacing: 1
                  }}>
                    {NICHE_CONFIG[niche]?.demand} demand
                  </span>
                </span>
                <ChevronDown size={16} color="#94a3b8" style={{ transform: nicheOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              <AnimatePresence>
                {nicheOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    style={{
                      position: 'absolute', top: '110%', left: 0, right: 0, zIndex: 50,
                      background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 16,
                      overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
                    }}
                  >
                    {Object.keys(NICHE_CONFIG).map(n => (
                      <button
                        key={n}
                        onClick={() => { setNiche(n); setNicheOpen(false); }}
                        style={{
                          width: '100%', padding: '11px 16px', background: n === niche ? 'rgba(255,148,49,0.05)' : 'none',
                          border: 'none', borderBottom: '1px solid #f1f5f9', color: n === niche ? '#FF9431' : '#475569',
                          cursor: 'pointer', textAlign: 'left', fontSize: 14, fontWeight: 700,
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                        }}
                      >
                        {n}
                        <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700 }}>avg ER {NICHE_CONFIG[n].avg_er}%</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sliders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Followers */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 800, color: '#0f172a' }}>Follower Reach</label>
                <span style={{ fontSize: 14, fontWeight: 900, color: '#FF9431' }}>
                  {followers >= 100000 ? `${(followers / 100000).toFixed(1)}L` : followers.toLocaleString('en-IN')}
                  {followers > PLATFORM_BENCHMARKS.followers
                    ? <span style={{ fontSize: 10, color: '#10B981', marginLeft: 6, fontWeight: 900 }}>↑ above avg</span>
                    : <span style={{ fontSize: 10, color: '#f59e0b', marginLeft: 6, fontWeight: 900 }}>↓ below avg</span>
                  }
                </span>
              </div>
              <input type="range" min="5000" max="1000000" step="5000" value={followers}
                onChange={e => setFollowers(Number(e.target.value))}
                style={{ width: '100%', height: mob ? 8 : 6, borderRadius: 3, accentColor: '#FF9431', background: '#e2e8f0', outline: 'none', cursor: 'pointer' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b', marginTop: 4, fontWeight: 700 }}>
                <span>5K</span><span>500K</span><span>1M+</span>
              </div>
            </div>

            {/* Engagement */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 800, color: '#0f172a' }}>Engagement Rate</label>
                <span style={{ fontSize: 14, fontWeight: 900, color: '#FF9431' }}>
                  {engagement.toFixed(1)}%
                  {engagement >= calculations.nicheAvgEr
                    ? <span style={{ fontSize: 10, color: '#10B981', marginLeft: 6, fontWeight: 900 }}>↑ niche avg {calculations.nicheAvgEr}%</span>
                    : <span style={{ fontSize: 10, color: '#f59e0b', marginLeft: 6, fontWeight: 900 }}>↓ niche avg {calculations.nicheAvgEr}%</span>
                  }
                </span>
              </div>
              <input type="range" min="0.5" max="15.0" step="0.1" value={engagement}
                onChange={e => setEngagement(Number(e.target.value))}
                style={{ width: '100%', height: mob ? 8 : 6, borderRadius: 3, accentColor: '#FF9431', background: '#e2e8f0', outline: 'none', cursor: 'pointer' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b', marginTop: 4, fontWeight: 700 }}>
                <span>0.5%</span><span>7.5%</span><span>15%</span>
              </div>
            </div>

            {/* Consistency */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 800, color: '#0f172a' }}>Content Consistency</label>
                <span style={{ fontSize: 14, fontWeight: 900, color: '#FF9431' }}>{consistency}/10</span>
              </div>
              <input type="range" min="1" max="10" step="1" value={consistency}
                onChange={e => setConsistency(Number(e.target.value))}
                style={{ width: '100%', height: mob ? 8 : 6, borderRadius: 3, accentColor: '#FF9431', background: '#e2e8f0', outline: 'none', cursor: 'pointer' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b', marginTop: 4, fontWeight: 700 }}>
                <span>Irregular</span><span>Steady</span><span>Daily</span>
              </div>
            </div>

            {/* Authenticity */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 800, color: '#0f172a' }}>Audience Authenticity</label>
                <span style={{ fontSize: 14, fontWeight: 900, color: '#FF9431' }}>{authenticity}% Real</span>
              </div>
              <input type="range" min="50" max="100" step="1" value={authenticity}
                onChange={e => setAuthenticity(Number(e.target.value))}
                style={{ width: '100%', height: mob ? 8 : 6, borderRadius: 3, accentColor: '#FF9431', background: '#e2e8f0', outline: 'none', cursor: 'pointer' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b', marginTop: 4, fontWeight: 700 }}>
                <span>50% Flagged</span><span>75% Good</span><span>100% Elite</span>
              </div>
            </div>
          </div>

          {/* AI Tip Box */}
          <div style={{ marginTop: 24, padding: '14px 16px', background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.15)', borderRadius: 14, display: 'flex', gap: 10, alignItems: 'flex-start', textAlign: 'left' }}>
            <Zap size={16} color="#a855f7" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 11, fontWeight: 900, color: '#a855f7', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
                AI TIP — Improve {calculations.weakestPillar}
              </div>
              <p style={{ margin: 0, fontSize: 12, color: '#475569', lineHeight: 1.5, fontWeight: 650 }}>
                {calculations.topTip}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* RIGHT: Results Panel */}
      <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Score Ring Card */}
        <Card style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: mob ? 20 : 24, borderRadius: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
          <Bdg color="purple" sm style={{ marginBottom: 14 }}>REAL-TIME AI SCORE</Bdg>

          <div style={{ position: 'relative', width: 130, height: 130, display: 'grid', placeItems: 'center', marginBottom: 12 }}>
            <svg width="130" height="130" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="50" cy="50" r="42" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
              <motion.circle cx="50" cy="50" r="42" stroke="url(#aiGrad)" strokeWidth="8" fill="transparent"
                strokeDasharray={263.8}
                animate={{ strokeDashoffset: 263.8 - (263.8 * calculations.score) / 100 }}
                transition={{ type: 'spring', stiffness: 50, damping: 14 }}
                strokeLinecap="round" />
              <defs>
                <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF9431" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <motion.span
                key={calculations.score}
                initial={{ scale: 1.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                style={{ fontSize: 34, fontWeight: 955, color: '#0f172a', letterSpacing: '-1px', lineHeight: 1 }}
              >
                {calculations.score}
              </motion.span>
              <span style={{ fontSize: 9, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>/ 100</span>
            </div>
          </div>

          <div style={{ fontSize: 16, fontWeight: 950, color: calculations.tierColor, marginBottom: 4 }}>
            {calculations.tierIcon} {calculations.tier}
          </div>
          <div style={{ fontSize: 11, color: '#64748b', fontWeight: 700, marginBottom: 16 }}>
            {calculations.vsAvg.score >= 0
              ? <span style={{ color: '#10B981' }}>+{calculations.vsAvg.score} pts above platform avg</span>
              : <span style={{ color: '#f59e0b' }}>{calculations.vsAvg.score} pts below platform avg</span>
            }
          </div>

          {/* 4 metrics grid */}
          <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: 'PER POST', value: calculations.pay, color: '#0f172a', icon: <Award size={12} color="#FF9431" /> },
              { label: 'MONTHLY EST.', value: calculations.monthlyPay, color: '#10B981', icon: <TrendingUp size={12} color="#10B981" /> },
              { label: 'CAMPAIGN MATCH', value: `${calculations.matchRate}%`, color: '#a855f7', icon: <Target size={12} color="#a855f7" /> },
              { label: 'NICHE DEMAND', value: calculations.nicheDemand, color: '#FF9431', icon: <Activity size={12} color="#FF9431" /> },
            ].map((m, i) => (
              <div key={i} style={{ padding: '10px 12px', background: '#f8fafc', borderRadius: 12, border: '1px solid #f1f5f9', textAlign: 'left' }}>
                <div style={{ fontSize: 9, color: '#64748b', fontWeight: 900, letterSpacing: 0.5, marginBottom: 5, display: 'flex', alignItems: 'center', gap: 4 }}>
                  {m.icon} {m.label}
                </div>
                <div style={{ fontSize: 15, fontWeight: 950, color: m.color }}>{m.value}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Score Pillar Breakdown */}
        <Card style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: mob ? 16 : 20, borderRadius: 20, boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Shield size={16} color="#FF9431" />
            <span style={{ fontSize: 13, fontWeight: 900, color: '#0f172a' }}>Score Breakdown</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Engagement', value: calculations.pillars.engagement, color: '#FF9431' },
              { label: 'Consistency', value: calculations.pillars.consistency, color: '#a855f7' },
              { label: 'Authenticity', value: calculations.pillars.authenticity, color: '#10B981' },
              { label: 'Reach', value: calculations.pillars.reach, color: '#0ea5e9' },
            ].map(p => (
              <div key={p.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 12, color: '#475569', fontWeight: 700 }}>{p.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 900, color: p.color }}>{p.value}</span>
                </div>
                <div style={{ height: 6, background: '#f1f5f9', borderRadius: 100, overflow: 'hidden' }}>
                  <motion.div
                    animate={{ width: `${p.value}%` }}
                    transition={{ type: 'spring', stiffness: 60, damping: 14 }}
                    style={{ height: '100%', background: p.color, borderRadius: 100, opacity: 0.85 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Platform Benchmark */}
        <Card style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: mob ? 16 : 20, borderRadius: 20, boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <BarChart2 size={16} color="#a855f7" />
            <span style={{ fontSize: 13, fontWeight: 900, color: '#0f172a' }}>vs Platform Average</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: 'Creator Score', you: calculations.score, avg: PLATFORM_BENCHMARKS.score, unit: '' },
              { label: 'Engagement Rate', you: engagement, avg: PLATFORM_BENCHMARKS.engagement, unit: '%' },
              { label: 'Authenticity', you: authenticity, avg: PLATFORM_BENCHMARKS.authenticity, unit: '%' },
            ].map(b => {
              const isAbove = b.you >= b.avg;
              const maxVal = Math.max(b.you, b.avg) * 1.2;
              return (
                <div key={b.label} style={{ padding: '10px 12px', background: '#f8fafc', borderRadius: 10, border: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: '#475569', fontWeight: 700 }}>{b.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 900, color: isAbove ? '#10B981' : '#f59e0b' }}>
                      {isAbove ? '↑' : '↓'} {b.you}{b.unit} vs {b.avg}{b.unit}
                    </span>
                  </div>
                  <div style={{ position: 'relative', height: 6, background: '#f1f5f9', borderRadius: 100 }}>
                    {/* platform avg marker */}
                    <div style={{
                      position: 'absolute', top: -3, width: 2, height: 12, background: '#94a3b8', borderRadius: 1,
                      left: `${(b.avg / maxVal) * 100}%`
                    }} />
                    <motion.div
                      animate={{ width: `${Math.min(100, (b.you / maxVal) * 100)}%` }}
                      transition={{ type: 'spring', stiffness: 60, damping: 14 }}
                      style={{ height: '100%', background: isAbove ? '#10B981' : '#f59e0b', borderRadius: 100, opacity: 0.8 }}
                    />
                  </div>
                  <div style={{ fontSize: 10, color: '#64748b', marginTop: 4, fontWeight: 700, textAlign: 'left' }}>
                    Platform avg marker ↑
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Pro CTA */}
        <div style={{ background: 'linear-gradient(135deg, rgba(255,148,49,0.04), rgba(168,85,247,0.04))', border: '1px solid rgba(255,148,49,0.1)', borderRadius: 18, padding: '16px 18px', display: 'flex', alignItems: 'flex-start', gap: 12, textAlign: 'left' }}>
          <Sparkles size={18} color="#FF9431" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <h4 style={{ margin: '0 0 4px 0', fontSize: 13, fontWeight: 900, color: '#0f172a' }}>Lock in your real score</h4>
            <p style={{ margin: 0, fontSize: 12, color: '#475569', lineHeight: 1.5, fontWeight: 650 }}>
              Connect your socials to get your actual verified AI score — not an estimate.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

CreatorScoreSimulator.propTypes = {
  mob: PropTypes.bool.isRequired,
};
