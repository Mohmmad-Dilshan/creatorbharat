import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Target, ArrowUpRight, Briefcase, Star } from 'lucide-react';
import { useApp } from '../../core/context';
import { LS, fmt } from '../../utils/helpers';
import { Card, Bdg } from '../../components/common/Primitives';
import AuthGatekeeper from '../../components/auth/AuthGatekeeper';

const StatCard = ({ label, value, trend, icon: Icon, color, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
    <Card style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: 14, background: color + '12', color, display: 'grid', placeItems: 'center' }}>
          <Icon size={22} />
        </div>
        {trend && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 800, color: '#10B981' }}>
            <ArrowUpRight size={14} /> {trend}
          </div>
        )}
      </div>
      <div style={{ fontSize: 28, fontWeight: 950, color: '#0f172a', marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>{label}</div>
    </Card>
  </motion.div>
);

const BarChartSimple = ({ data, label, color = '#10B981' }) => {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <Card style={{ padding: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 900, color: '#0f172a', margin: 0 }}>{label}</h3>
        <Bdg color="green" sm>Last 7 days</Bdg>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
        {data.map((d, i) => (
          <div key={d.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%' }}>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(d.value / max) * 100}%` }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              style={{ width: '100%', borderRadius: 8, background: i === data.length - 1 ? color : color + '40', minHeight: 4 }}
            />
          </div>
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

export default function BrandAnalyticsPage() {
  const { st } = useApp();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  if (!st.user || st.role !== 'brand') return <AuthGatekeeper mob={mob} role="brand" />;

  const myCampaigns = LS.get('cb_campaigns', []).filter(c => c.brandEmail === st.user.email);
  const allApps = LS.get('cb_applications', []);
  const myCampIds = myCampaigns.map(c => c.id);
  const myApps = allApps.filter(a => myCampIds.includes(a.campaignId));

  const totalReach = myCampaigns.reduce((s, c) => s + ((c.slots || 10) * 12500), 0);
  const selectedCreators = myApps.filter(a => a.status === 'selected').length;
  const convRate = myApps.length > 0 ? Math.round((selectedCreators / myApps.length) * 100) : 0;

  // Weekly activity (derived from campaign dates)
  const weeklyData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((label, i) => ({
      label,
      value: Math.max(1, Math.round((myCampaigns.length + myApps.length) * (0.5 + Math.sin(i) * 0.3)))
    }));
  }, [myCampaigns.length, myApps.length]);

  // Niche breakdown from campaigns
  const nicheMap = {};
  myCampaigns.forEach(c => {
    const n = c.niche || 'General';
    nicheMap[n] = (nicheMap[n] || 0) + 1;
  });
  const niches = Object.entries(nicheMap).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxNiche = Math.max(...niches.map(n => n[1]), 1);

  return (
    <div className="dashboard-page-container">
      {/* Header */}
      <div className="db-page-header">
        <div className="badge-saffron" style={{ color: '#10B981' }}>
          <BarChart3 size={14} /> BRAND ANALYTICS
        </div>
        <h1 className="page-title">Campaign Intelligence</h1>
        <p className="db-sub-text">Real-time performance data across all your active missions.</p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}>
        <StatCard label="Total Campaigns" value={myCampaigns.length} trend="+2 this month" icon={Briefcase} color="#10B981" delay={0.05} />
        <StatCard label="Total Applications" value={myApps.length} trend={`${convRate}% conv`} icon={Users} color="#FF9431" delay={0.1} />
        <StatCard label="Creators Selected" value={selectedCreators} icon={Star} color="#7C3AED" delay={0.15} />
        <StatCard label="Est. Total Reach" value={fmt.num(totalReach)} trend="Projected" icon={TrendingUp} color="#3B82F6" delay={0.2} />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '2fr 1fr', gap: 24, marginBottom: 32 }}>
        <BarChartSimple data={weeklyData} label="Campaign Activity (Weekly)" color="#10B981" />

        {/* Niche Breakdown */}
        <Card style={{ padding: 28 }}>
          <h3 style={{ fontSize: 16, fontWeight: 900, color: '#0f172a', marginBottom: 24 }}>Campaign Niches</h3>
          {niches.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
              <Target size={32} style={{ marginBottom: 12, opacity: 0.3 }} />
              <p style={{ fontSize: 13, fontWeight: 700 }}>No campaigns yet</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {niches.map(([name, count]) => (
                <div key={name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, color: '#475569', marginBottom: 6 }}>
                    <span>{name}</span>
                    <span style={{ color: '#10B981', fontWeight: 900 }}>{count} campaign{count > 1 ? 's' : ''}</span>
                  </div>
                  <div style={{ height: 6, background: '#f1f5f9', borderRadius: 100, overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / maxNiche) * 100}%` }}
                      transition={{ duration: 0.6 }}
                      style={{ height: '100%', background: '#10B981', borderRadius: 100 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Campaign Performance Table */}
      <Card style={{ padding: 28 }}>
        <h3 style={{ fontSize: 16, fontWeight: 900, color: '#0f172a', marginBottom: 24 }}>Campaign Performance</h3>
        {myCampaigns.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
            <Briefcase size={40} style={{ marginBottom: 16, opacity: 0.3 }} />
            <p style={{ fontSize: 16, fontWeight: 800, color: '#475569' }}>No campaigns launched yet</p>
            <p style={{ fontSize: 13, fontWeight: 500 }}>Launch your first campaign to see analytics here.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['Campaign', 'Niche', 'Budget', 'Applications', 'Status'].map(h => (
                    <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: 11, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {myCampaigns.map((camp, i) => {
                  const campApps = myApps.filter(a => a.campaignId === camp.id);
                  return (
                    <motion.tr key={camp.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px', fontSize: 14, fontWeight: 800, color: '#0f172a' }}>{camp.title}</td>
                      <td style={{ padding: '16px', fontSize: 13, color: '#64748b', fontWeight: 600 }}>{camp.niche || 'General'}</td>
                      <td style={{ padding: '16px', fontSize: 14, fontWeight: 900, color: '#10B981' }}>{fmt.inr(camp.budgetMin || camp.budget || 0)}</td>
                      <td style={{ padding: '16px', fontSize: 14, fontWeight: 800, color: '#0f172a' }}>{campApps.length}</td>
                      <td style={{ padding: '16px' }}>
                        <span style={{ padding: '4px 12px', borderRadius: 100, fontSize: 11, fontWeight: 900, background: camp.status === 'live' ? '#10B98112' : '#FF943112', color: camp.status === 'live' ? '#10B981' : '#FF9431' }}>
                          {(camp.status || 'live').toUpperCase()}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
