import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, Eye, TrendingUp, Users, Activity, Globe, 
  ArrowUpRight, ArrowDownRight, Sparkles, Lock, ShieldCheck, 
  Award, Heart, Calendar, HelpCircle, Share2, Compass, Play
} from 'lucide-react';
import { useApp } from '@/core/context';
import { LS, fmt } from '@/utils/helpers';
import { Card, Bdg, Bar } from '@/components/common/Primitives';
import { CreatorPageHeader } from './CreatorShellPage';

// ─── Design Colors ───
const T = {
  saffron: '#FF9431',
  emerald: '#10B981',
  violet: '#7C3AED',
  blue: '#3B82F6',
  pink: '#EC4899',
  navy: '#0F172A',
  slate: '#64748B',
  bg: '#F8FAFC',
  border: '#F1F5F9'
};

// ─── StatCard ───
const StatCard = ({ label, value, trend, trendUp, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    whileHover={{ y: -4, boxShadow: '0 20px 35px -10px rgba(15,23,42,0.06)' }}
    style={{
      background: '#ffffff',
      borderRadius: 24,
      padding: 24,
      border: '1.5px solid #F1F5F9',
      boxShadow: '0 8px 30px rgba(15,23,42,0.02)',
      cursor: 'pointer',
      transition: 'box-shadow 0.3s ease, border-color 0.3s ease'
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
      <div style={{ width: 48, height: 48, borderRadius: 16, background: color + '12', color, display: 'grid', placeItems: 'center', border: `1px solid ${color}22` }}>
        <Icon size={22} />
      </div>
      {trend && (
        <span style={{ 
          display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 900, 
          color: trendUp ? T.emerald : '#EF4444', background: trendUp ? '#10B98110' : '#EF444410',
          padding: '4px 10px', borderRadius: 100
        }}>
          {trendUp ? '↑' : '↓'} {trend}
        </span>
      )}
    </div>
    <div style={{ fontSize: 32, fontWeight: 950, color: T.navy, marginBottom: 4, fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}>{value}</div>
    <div style={{ fontSize: 13, fontWeight: 700, color: T.slate, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
  </motion.div>
);

// ─── SVG Interactive Area Chart ───
const PerformanceChart = ({ color = T.saffron }) => {
  const [activeRange, setActiveRange] = useState('7d');
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const data = useMemo(() => {
    if (activeRange === '30d') {
      return [
        { label: 'Week 1', views: 8200 },
        { label: 'Week 2', views: 11400 },
        { label: 'Week 3', views: 14800 },
        { label: 'Week 4', views: 19500 }
      ];
    }
    return [
      { label: 'Mon', views: 1200 },
      { label: 'Tue', views: 1800 },
      { label: 'Wed', views: 1500 },
      { label: 'Thu', views: 2400 },
      { label: 'Fri', views: 2100 },
      { label: 'Sat', views: 3200 },
      { label: 'Sun', views: 2800 }
    ];
  }, [activeRange]);

  const maxVal = Math.max(...data.map(d => d.views), 1);
  const width = 500;
  const height = 180;
  const padding = 20;

  const points = useMemo(() => {
    const step = (width - padding * 2) / (data.length - 1);
    return data.map((d, i) => {
      const x = padding + i * step;
      const y = height - padding - ((d.views / maxVal) * (height - padding * 2));
      return { x, y, label: d.label, val: d.views };
    });
  }, [data, maxVal, width, height]);

  const pathD = useMemo(() => {
    if (points.length === 0) return '';
    return points.reduce((acc, p, i) => {
      return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, '');
  }, [points]);

  const areaD = useMemo(() => {
    if (points.length === 0) return '';
    return `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;
  }, [points, pathD]);

  return (
    <Card style={{ padding: 28, position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 900, color: T.navy, margin: 0 }}>Views Over Time</h3>
          <p style={{ fontSize: 12, color: T.slate, margin: '2px 0 0', fontWeight: 650 }}>Organic reach performance analysis</p>
        </div>
        <div style={{ display: 'flex', background: '#F1F5F9', padding: 4, borderRadius: 12 }}>
          {['7d', '30d'].map(r => (
            <button
              key={r}
              onClick={() => { setActiveRange(r); setHoveredIdx(null); }}
              style={{
                border: 'none', background: activeRange === r ? '#ffffff' : 'transparent',
                color: activeRange === r ? T.navy : T.slate, padding: '6px 14px', borderRadius: 8,
                fontSize: 12, fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: activeRange === r ? '0 2px 6px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%', height: height }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={color} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
          <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#E2E8F0" strokeWidth="1" />

          {/* Area */}
          <path d={areaD} fill="url(#chartGrad)" />

          {/* Line */}
          <path d={pathD} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />

          {/* Dots */}
          {points.map((p, idx) => (
            <circle
              key={idx}
              cx={p.x}
              cy={p.y}
              r={hoveredIdx === idx ? 6 : 4}
              fill={color}
              stroke="#ffffff"
              strokeWidth="2"
              style={{ cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            />
          ))}
        </svg>

        {/* Floating Tooltip */}
        {hoveredIdx !== null && (
          <div style={{
            position: 'absolute',
            top: points[hoveredIdx].y - 45,
            left: `${(points[hoveredIdx].x / width) * 100}%`,
            transform: 'translateX(-50%)',
            background: T.navy,
            color: '#fff',
            padding: '6px 12px',
            borderRadius: 8,
            fontSize: 11,
            fontWeight: 800,
            boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
            zIndex: 10,
            whiteSpace: 'nowrap',
            pointerEvents: 'none'
          }}>
            {points[hoveredIdx].label}: {points[hoveredIdx].val.toLocaleString()} views
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, borderTop: '1px solid #F1F5F9', paddingTop: 16 }}>
        {data.map((d, i) => (
          <span key={i} style={{ fontSize: 11, fontWeight: 800, color: T.slate }}>{d.label}</span>
        ))}
      </div>
    </Card>
  );
};

// ─── SVG Interactive Donut/Pie Chart ───
const PlatformDonut = ({ platforms }) => {
  const total = platforms.reduce((s, p) => s + p.pct, 0);
  let accumulatedPercent = 0;

  return (
    <Card style={{ padding: 28 }}>
      <h3 style={{ fontSize: 16, fontWeight: 900, color: T.navy, marginBottom: 20 }}>Platform Distribution</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
        
        {/* SVG Donut */}
        <div style={{ width: 120, height: 120, position: 'relative' }}>
          <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F1F5F9" strokeWidth="3" />
            {platforms.map((p, idx) => {
              const dashArray = `${p.pct} ${100 - p.pct}`;
              const strokeDashoffset = 100 - accumulatedPercent;
              accumulatedPercent += p.pct;

              return (
                <circle
                  key={idx}
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke={p.color}
                  strokeWidth="3.2"
                  strokeDasharray={dashArray}
                  strokeDashoffset={strokeDashoffset}
                />
              );
            })}
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 18, fontWeight: 950, color: T.navy, fontFamily: 'Outfit' }}>{total}%</span>
            <span style={{ fontSize: 9, fontWeight: 800, color: T.slate, textTransform: 'uppercase' }}>Active</span>
          </div>
        </div>

        {/* Legend */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, minWidth: 140 }}>
          {platforms.map(p => (
            <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 12, height: 12, borderRadius: 4, background: p.color }} />
              <div style={{ flex: 1, fontSize: 13, fontWeight: 700, color: T.navy }}>{p.name}</div>
              <div style={{ fontSize: 13, fontWeight: 900, color: p.color }}>{p.pct}%</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default function AnalyticsPage() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [activeTab, setActiveTab] = useState('overview');
  const [upgrading, setUpgrading] = useState(false);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const allC = LS.get('cb_creators', []);
  const c = st.user?.creatorProfile || allC.find(cr => cr.email === st.user?.email) || {};
  const myApps = LS.get('cb_applications', []).filter(a => a.applicantEmail === st.user?.email);
  const isPro = st.isPro || localStorage.getItem('cb_is_pro') === 'true';

  const followers = c.followers || 125000;
  const score = c.score || fmt.score(c);
  const appsCount = myApps.length;
  const selectedCount = myApps.filter(a => a.status === 'selected').length;
  const conversionRate = appsCount > 0 ? Math.round((selectedCount / appsCount) * 100) : 0;

  const platforms = [
    { name: 'Instagram', pct: c.instagram ? 55 : 45, color: '#E1306C' },
    { name: 'YouTube', pct: c.youtube ? 35 : 40, color: '#FF0000' },
    { name: 'Other Channels', pct: 10, color: '#3B82F6' },
  ];

  const ageSegments = [
    { label: 'Age 18 - 24 years', pct: 62, color: T.saffron },
    { label: 'Age 25 - 34 years', pct: 28, color: T.violet },
    { label: 'Age 35+ years', pct: 10, color: T.blue },
  ];

  const topContent = [
    { title: 'Summer Fashion Style Guide Reel', platform: 'Instagram', date: '4 days ago', views: fmt.num(followers * 0.12), er: '5.2' },
    { title: 'Tech Unboxing & Honest Setup Review', platform: c.youtube ? 'YouTube' : 'Instagram', date: '1 week ago', views: fmt.num(followers * 0.08), er: '4.1' },
    { title: 'Insta Vlogging: Day in Jaipur Hub', platform: 'Instagram', date: '2 weeks ago', views: fmt.num(followers * 0.15), er: '6.8' },
  ];

  // Simulating Razorpay Pro Upgrade Checkout
  const handleUpgrade = () => {
    setUpgrading(true);
    setTimeout(() => {
      localStorage.setItem('cb_is_pro', 'true');
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Subscribed to Creator Pro successfully! 🎉' } });
      setUpgrading(false);
      // Force reload or state update
      window.location.reload();
    }, 1800);
  };

  return (
    <div className="dashboard-page-container" style={{ paddingBottom: '100px' }}>
      <CreatorPageHeader 
        badge="ANALYTICS ENGINE" 
        title="Performance & Insights" 
        subtitle="Track reach, platform engagement metrics, and regional audience trends." 
        icon={BarChart3} 
      />

      {/* Navigation Sub-Tabs */}
      <div style={{ display: 'flex', gap: 12, borderBottom: '1.5px solid #F1F5F9', marginBottom: 28, overflowX: 'auto', paddingBottom: 2 }}>
        {[
          { id: 'overview', label: 'Overview', icon: Activity },
          { id: 'demographics', label: 'Audience Demographics', icon: Users },
          { id: 'content', label: 'Top Performing Content', icon: Play }
        ].map(t => {
          const ActiveIcon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '12px 18px',
                border: 'none', background: 'none', color: isActive ? T.saffron : T.slate,
                fontWeight: isActive ? 900 : 700, fontSize: 13, cursor: 'pointer',
                borderBottom: `2.5px solid ${isActive ? T.saffron : 'transparent'}`,
                transition: 'all 0.2s', paddingBottom: 12, whiteSpace: 'nowrap'
              }}
            >
              <ActiveIcon size={15} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* ── Tabs Content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === 'overview' && (
            <div>
              {/* Top Stats Strip */}
              <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
                <StatCard label="Total Followers" value={fmt.num(followers)} trend="4.8%" trendUp icon={Users} color={T.violet} delay={0.05} />
                <StatCard label="Monthly Impressions" value="482.4K" trend="12.4%" trendUp icon={Eye} color={T.saffron} delay={0.1} />
                <StatCard label="Avg Engagement" value={`${(c.er || 4.8).toFixed(1)}%`} trend="0.5%" trendUp icon={Activity} color={T.emerald} delay={0.15} />
                <StatCard label="Collab Conversions" value={`${conversionRate}%`} trend="Elite Tier" trendUp icon={TrendingUp} color={T.blue} delay={0.2} />
              </div>

              {/* Pro Lock Container */}
              <div style={{ position: 'relative' }}>
                <div style={{ filter: !isPro ? 'blur(8px)' : 'none', pointerEvents: !isPro ? 'none' : 'auto', userSelect: !isPro ? 'none' : 'auto' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.7fr 1fr', gap: 24 }}>
                    <PerformanceChart color={T.saffron} />
                    <PlatformDonut platforms={platforms} />
                  </div>
                </div>

                {/* Pro Lock Overlay Card */}
                {!isPro && (
                  <div style={{ position: 'absolute', inset: -8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.4)', borderRadius: 28, zIndex: 10 }}>
                    <div style={{
                      background: '#ffffff', padding: '40px 36px', borderRadius: 28,
                      boxShadow: '0 30px 70px rgba(15,23,42,0.15), 0 0 1px rgba(15,23,42,0.1)',
                      textAlign: 'center', maxWidth: 400, border: '1.5px solid #F1F5F9'
                    }}>
                      <div style={{ width: 64, height: 64, borderRadius: 22, background: 'linear-gradient(135deg, #FF9431, #EA580C)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 20px rgba(255,148,49,0.3)' }}>
                        <Sparkles size={28} />
                      </div>
                      <h3 style={{ fontSize: 20, fontWeight: 950, color: T.navy, marginBottom: 8, fontFamily: 'Outfit, sans-serif' }}>Unlock Advanced Analytics</h3>
                      <p style={{ fontSize: 13, color: T.slate, marginBottom: 28, fontWeight: 600, lineHeight: 1.6 }}>
                        Upgrade to Creator Pro to unlock interactive performance charts, historical visitor analytics, and distribution data.
                      </p>
                      <button
                        onClick={handleUpgrade}
                        disabled={upgrading}
                        style={{
                          width: '100%', padding: '14px 20px', background: upgrading ? T.slate : T.navy,
                          color: '#fff', borderRadius: 14, fontWeight: 900, fontSize: 14,
                          border: 'none', cursor: upgrading ? 'not-allowed' : 'pointer',
                          boxShadow: '0 10px 20px rgba(15,23,42,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                          transition: 'all 0.2s'
                        }}
                      >
                        {upgrading ? (
                          <>⏳ Connecting to Razorpay...</>
                        ) : (
                          <>
                            <Sparkles size={16} fill="#fff" /> Upgrade to Pro — ₹199
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'demographics' && (
            <div style={{ position: 'relative' }}>
              <div style={{ filter: !isPro ? 'blur(8px)' : 'none', pointerEvents: !isPro ? 'none' : 'auto', userSelect: !isPro ? 'none' : 'auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1.2fr', gap: 24 }}>
                  <AudienceAge segments={ageSegments} />
                  
                  {/* Top locations card */}
                  <Card style={{ padding: 28 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 900, color: T.navy, marginBottom: 20 }}>Top Indian Hubs</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {[
                        { name: 'Delhi NCR', count: '42%', val: 42, color: T.saffron },
                        { name: 'Mumbai Hub', count: '28%', val: 28, color: T.violet },
                        { name: 'Jaipur Hub', count: '18%', val: 18, color: T.emerald },
                        { name: 'Lucknow Circle', count: '12%', val: 12, color: T.blue }
                      ].map(loc => (
                        <div key={loc.name}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, color: T.navy, marginBottom: 6 }}>
                            <span>{loc.name}</span>
                            <span style={{ fontWeight: 900, color: loc.color }}>{loc.count}</span>
                          </div>
                          <Bar value={loc.val} color={loc.color} height={6} />
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>

              {!isPro && (
                <div style={{ position: 'absolute', inset: -8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.4)', borderRadius: 28, zIndex: 10 }}>
                  <div style={{
                    background: '#ffffff', padding: '40px 36px', borderRadius: 28,
                    boxShadow: '0 30px 70px rgba(15,23,42,0.15)',
                    textAlign: 'center', maxWidth: 400, border: '1.5px solid #F1F5F9'
                  }}>
                    <Lock size={26} color={T.saffron} style={{ marginBottom: 14 }} />
                    <h3 style={{ fontSize: 18, fontWeight: 950, color: T.navy, marginBottom: 8, fontFamily: 'Outfit, sans-serif' }}>Demographics Locked</h3>
                    <p style={{ fontSize: 13, color: T.slate, marginBottom: 20, fontWeight: 600 }}>Upgrade to unlock age, gender, and geographical distribution metrics.</p>
                    <button onClick={handleUpgrade} style={{ width: '100%', padding: '12px 18px', background: T.navy, color: '#fff', borderRadius: 12, fontWeight: 900, border: 'none', cursor: 'pointer' }}>Upgrade Now</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'content' && (
            <div style={{ position: 'relative' }}>
              <div style={{ filter: !isPro ? 'blur(8px)' : 'none', pointerEvents: !isPro ? 'none' : 'auto', userSelect: !isPro ? 'none' : 'auto' }}>
                <TopContent items={topContent} />
              </div>

              {!isPro && (
                <div style={{ position: 'absolute', inset: -8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.4)', borderRadius: 28, zIndex: 10 }}>
                  <div style={{
                    background: '#ffffff', padding: '40px 36px', borderRadius: 28,
                    boxShadow: '0 30px 70px rgba(15,23,42,0.15)',
                    textAlign: 'center', maxWidth: 400, border: '1.5px solid #F1F5F9'
                  }}>
                    <Lock size={26} color={T.saffron} style={{ marginBottom: 14 }} />
                    <h3 style={{ fontSize: 18, fontWeight: 950, color: T.navy, marginBottom: 8, fontFamily: 'Outfit, sans-serif' }}>Content Analytics Locked</h3>
                    <p style={{ fontSize: 13, color: T.slate, marginBottom: 20, fontWeight: 600 }}>Identify which posts drive the highest conversion rates and brand value.</p>
                    <button onClick={handleUpgrade} style={{ width: '100%', padding: '12px 18px', background: T.navy, color: '#fff', borderRadius: 12, fontWeight: 900, border: 'none', cursor: 'pointer' }}>Upgrade Now</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
