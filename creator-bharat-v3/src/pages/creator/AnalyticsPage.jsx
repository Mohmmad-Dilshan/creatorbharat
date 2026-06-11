import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, Eye, TrendingUp, Users, Activity, Globe, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useApp } from '@/core/context';
import { LS, fmt } from '@/utils/helpers';
import { Card, Bdg, Bar } from '@/components/common/Primitives';
import { CreatorPageHeader } from './CreatorShellPage';

const StatCard = ({ label, value, trend, trendUp, icon: Icon, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <Card style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: 14, background: color + '12', color, display: 'grid', placeItems: 'center' }}>
          <Icon size={22} />
        </div>
        {trend && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 800, color: trendUp ? '#10B981' : '#EF4444' }}>
            {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {trend}
          </div>
        )}
      </div>
      <div style={{ fontSize: 28, fontWeight: 950, color: '#0f172a', marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>{label}</div>
    </Card>
  </motion.div>
);

const BarChartSimple = ({ data, label, color = '#FF9431' }) => {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <Card style={{ padding: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 900, color: '#0f172a' }}>{label}</h3>
        <Bdg color="saffron" sm>Last 7 days</Bdg>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
        {data.map((d, i) => (
          <motion.div
            key={d.label}
            initial={{ height: 0 }}
            animate={{ height: `${(d.value / max) * 100}%` }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
          >
            <div style={{ 
              width: '100%', 
              borderRadius: 8, 
              background: i === data.length - 1 ? color : color + '40',
              minHeight: 4,
              flex: 1
            }} />
          </motion.div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        {data.map(d => (
          <div key={d.label} style={{ flex: 1, textAlign: 'center', fontSize: 10, fontWeight: 700, color: '#94a3b8' }}>{d.label}</div>
        ))}
      </div>
    </Card>
  );
};

const PlatformSplit = ({ platforms }) => (
  <Card style={{ padding: 28 }}>
    <h3 style={{ fontSize: 16, fontWeight: 900, color: '#0f172a', marginBottom: 24 }}>Platform Distribution</h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {platforms.map((p, i) => (
        <div key={p.name}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, color: '#475569', marginBottom: 6 }}>
            <span>{p.name}</span>
            <span style={{ color: p.color, fontWeight: 900 }}>{p.pct}%</span>
          </div>
          <Bar value={p.pct} color={p.color} height={6} />
        </div>
      ))}
    </div>
  </Card>
);

const AudienceAge = ({ segments }) => (
  <Card style={{ padding: 28 }}>
    <h3 style={{ fontSize: 16, fontWeight: 900, color: '#0f172a', marginBottom: 24 }}>Audience Demographics</h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {segments.map(s => (
        <div key={s.label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, color: '#475569', marginBottom: 6 }}>
            <span>{s.label}</span>
            <span style={{ color: s.color, fontWeight: 900 }}>{s.pct}%</span>
          </div>
          <Bar value={s.pct} color={s.color} height={6} />
        </div>
      ))}
    </div>
  </Card>
);

const TopContent = ({ items }) => (
  <Card style={{ padding: 28 }}>
    <h3 style={{ fontSize: 16, fontWeight: 900, color: '#0f172a', marginBottom: 24 }}>Top Performing Content</h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {items.map((item, i) => (
        <div key={item.title} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, background: '#f8fafc', borderRadius: 16, border: '1px solid #f1f5f9' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: '#FF943112', display: 'grid', placeItems: 'center', color: '#FF9431', fontWeight: 950, fontSize: 16 }}>
            #{i + 1}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>{item.title}</div>
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>{item.platform} · {item.date}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 16, fontWeight: 950, color: '#0f172a' }}>{item.views}</div>
            <div style={{ fontSize: 11, color: '#10B981', fontWeight: 700 }}>+{item.er}% ER</div>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

export default function AnalyticsPage() {
  const { st } = useApp();
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  // Get creator profile data
  const allC = LS.get('cb_creators', []);
  const c = st.user?.creatorProfile || allC.find(cr => cr.email === st.user?.email) || {};
  const myApps = LS.get('cb_applications', []).filter(a => a.applicantEmail === st.user?.email);
  const isPro = st.isPro || localStorage.getItem('cb_is_pro') === 'true';

  // Derive analytics from real data
  const followers = c.followers || 125000;
  const score = c.score || fmt.score(c);
  const appsCount = myApps.length;
  const selectedCount = myApps.filter(a => a.status === 'selected').length;
  const conversionRate = appsCount > 0 ? Math.round((selectedCount / appsCount) * 100) : 0;

  // Weekly views (derived from score — mock pattern but based on real profile)
  const weeklyViews = useMemo(() => {
    const base = Math.max(score * 3, 50);
    return [
      { label: 'Mon', value: Math.round(base * 0.7) },
      { label: 'Tue', value: Math.round(base * 1.1) },
      { label: 'Wed', value: Math.round(base * 0.9) },
      { label: 'Thu', value: Math.round(base * 1.4) },
      { label: 'Fri', value: Math.round(base * 1.2) },
      { label: 'Sat', value: Math.round(base * 1.6) },
      { label: 'Sun', value: Math.round(base * 1.3) },
    ];
  }, [score]);

  const platforms = [
    { name: 'Instagram', pct: c.instagram ? 55 : 30, color: '#E1306C' },
    { name: 'YouTube', pct: c.youtube ? 35 : 20, color: '#FF0000' },
    { name: 'Other', pct: 10, color: '#64748b' },
  ];

  const ageSegments = [
    { label: '18 - 24 years', pct: 55, color: '#FF9431' },
    { label: '25 - 34 years', pct: 30, color: '#7C3AED' },
    { label: '35+ years', pct: 15, color: '#0ea5e9' },
  ];

  const topContent = [
    { title: 'Latest Brand Collaboration Reel', platform: 'Instagram', date: 'This week', views: fmt.num(followers * 0.08), er: '4.8' },
    { title: 'Behind the Scenes Vlog', platform: c.youtube ? 'YouTube' : 'Instagram', date: 'Last week', views: fmt.num(followers * 0.05), er: '3.2' },
    { title: 'Product Review Short', platform: 'Instagram', date: '2 weeks ago', views: fmt.num(followers * 0.12), er: '6.1' },
  ];

  return (
    <div className="dashboard-page-container">
      <CreatorPageHeader 
        badge="ANALYTICS" 
        title="Creator Performance" 
        subtitle="Profile views, campaign performance, and audience analytics for your creator business." 
        icon={BarChart3} 
      />

      {/* Top Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        <StatCard label="Total Reach" value={fmt.num(followers)} trend="+4.2%" trendUp icon={Users} color="#7C3AED" delay={0.05} />
        <StatCard label="Profile Views" value={fmt.num(weeklyViews.reduce((s, d) => s + d.value, 0))} trend="+12%" trendUp icon={Eye} color="#FF9431" delay={0.1} />
        <StatCard label="Engagement Rate" value={`${(c.er || 4.2).toFixed(1)}%`} trend="+0.3%" trendUp icon={Activity} color="#10B981" delay={0.15} />
        <StatCard label="Applications" value={appsCount} trend={conversionRate > 0 ? `${conversionRate}% conv` : 'New'} trendUp={conversionRate > 20} icon={TrendingUp} color="#3B82F6" delay={0.2} />
      </div>

      <div style={{ position: 'relative' }}>
        <div style={{ filter: !isPro ? 'blur(8px)' : 'none', pointerEvents: !isPro ? 'none' : 'auto', userSelect: !isPro ? 'none' : 'auto' }}>
          {/* Charts Row */}
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '2fr 1fr', gap: 24, marginBottom: 32 }}>
            <BarChartSimple data={weeklyViews} label="Profile Views (Weekly)" color="#FF9431" />
            <PlatformSplit platforms={platforms} />
          </div>

          {/* Bottom Row */}
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 24 }}>
            <AudienceAge segments={ageSegments} />
            <TopContent items={topContent} />
          </div>
        </div>

        {!isPro && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.2)', borderRadius: 24, zIndex: 10 }}>
            <div style={{ background: '#fff', padding: 32, borderRadius: 24, boxShadow: '0 20px 60px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: 360, border: '1px solid #f1f5f9' }}>
              <div style={{ width: 64, height: 64, borderRadius: 20, background: '#FF943115', color: '#FF9431', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <BarChart3 size={32} />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 900, color: '#0f172a', marginBottom: 8 }}>Advanced Analytics Locked</h3>
              <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24, fontWeight: 500, lineHeight: 1.5 }}>Upgrade to Creator Pro to unlock deep audience insights, demographic splits, and historical data trends.</p>
              <button onClick={() => navigate('/creator/pricing')} style={{ width: '100%', padding: '14px', background: '#0f172a', color: '#fff', borderRadius: 12, fontWeight: 900, border: 'none', cursor: 'pointer' }}>Upgrade to Pro</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
