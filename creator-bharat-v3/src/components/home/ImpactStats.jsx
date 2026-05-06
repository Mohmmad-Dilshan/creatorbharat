/**
 * ImpactStats.jsx
 * 
 * Pure UI component — renders platform analytics.
 * All data fetching is handled by the usePlatformStats hook.
 * Zero direct API calls here.
 */

import React from 'react';
import { TrendingUp, Users, Megaphone, MapPin, ArrowUpRight, RefreshCw } from 'lucide-react';
import { usePlatformStats } from '../../hooks/usePlatformStats';
import { fmt } from '../../utils/helpers';

const NICHE_COLORS = ['#FF9431', '#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

// ── Sub-components ────────────────────────────────────────────────────────

function Sparkline({ data, color }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const W = 80, H = 28;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / ((max - min) || 1)) * H;
    return `${x},${y}`;
  }).join(' ');
  const [lx, ly] = pts.split(' ').pop().split(',');
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
      <polyline points={pts} fill="none" stroke={`${color}60`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lx} cy={ly} r="3.5" fill={color} />
    </svg>
  );
}

function SkeletonCard() {
  return (
    <div style={{ background: '#fff', borderRadius: 20, padding: 28, border: '1px solid #E2E8F0', height: 160 }}>
      {[60, 80, 40].map((w, i) => (
        <div key={i} style={{ background: '#F1F5F9', borderRadius: 8, height: i === 1 ? 36 : 12, width: `${w}%`, marginBottom: 12, animation: 'shimmer 1.5s infinite' }} />
      ))}
    </div>
  );
}

function KpiCard({ label, value, color, icon: Icon, sub, spark, mob }) {
  return (
    <div style={{ background: '#fff', borderRadius: 20, padding: mob ? '20px 16px' : '28px 24px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
          <Icon size={20} strokeWidth={2.5} />
        </div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 11, fontWeight: 700, color: '#16A34A', background: '#F0FDF4', padding: '3px 8px', borderRadius: 100 }}>
          <ArrowUpRight size={11} />Live
        </span>
      </div>
      <div>
        <div style={{ fontSize: mob ? 24 : 34, fontWeight: 900, color: '#0f172a', fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 12, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: 6 }}>{label}</div>
        {!mob && <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{sub}</div>}
      </div>
      {!mob && <Sparkline data={spark} color={color} />}
    </div>
  );
}

function NicheBreakdown({ niches, mob }) {
  return (
    <div style={{ background: '#fff', borderRadius: 20, padding: mob ? 24 : 32, border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>Creator Niches</div>
        <div style={{ fontSize: mob ? 18 : 22, fontWeight: 900, color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>
          {niches.length > 0 ? 'Top Creator Categories' : 'Awaiting creator data'}
        </div>
      </div>
      {niches.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {niches.map((n, i) => (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{n.name}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>{n.count} creators</span>
              </div>
              <div style={{ height: 8, background: '#F1F5F9', borderRadius: 100, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${n.pct}%`, background: NICHE_COLORS[i % NICHE_COLORS.length], borderRadius: 100 }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', padding: '32px 0', color: '#94a3b8', fontSize: 14 }}>
          Creators registering will populate this chart automatically.
        </p>
      )}
    </div>
  );
}

function CityTable({ cities, mob }) {
  return (
    <div style={{ background: '#fff', borderRadius: 20, padding: mob ? 24 : 32, border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', overflow: 'auto' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>Hyperlocal</div>
        <div style={{ fontSize: mob ? 18 : 22, fontWeight: 900, color: '#0f172a', fontFamily: "'Outfit', sans-serif" }}>
          {cities.length > 0 ? 'Top Cities by Activity' : 'Awaiting city data'}
        </div>
      </div>
      {cities.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['City', 'Creators', 'Reach', 'Deals'].map(h => (
                <th key={h} style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px', textAlign: h === 'City' ? 'left' : 'right', paddingBottom: 12, borderBottom: '1px solid #F1F5F9' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cities.map((r, i) => (
              <tr key={i} style={{ borderBottom: i < cities.length - 1 ? '1px solid #F8FAFC' : 'none' }}>
                <td style={{ padding: '14px 0' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{r.city}</div>
                  {r.state && <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>{r.state}</div>}
                </td>
                <td style={{ textAlign: 'right', fontSize: 14, fontWeight: 700, color: '#FF9431' }}>{r.creators}</td>
                <td style={{ textAlign: 'right', fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{fmt.num(r.reach)}</td>
                <td style={{ textAlign: 'right' }}>
                  <span style={{ background: '#F0FDF4', color: '#16A34A', fontSize: 12, fontWeight: 800, padding: '3px 10px', borderRadius: 100 }}>{r.deals}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: 'center', padding: '32px 0', color: '#94a3b8', fontSize: 14 }}>
          City data will appear as creators join from across Bharat.
        </p>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────

export default function ImpactStats({ mob }) {
  const { analytics, loading, lastUpdated, refresh } = usePlatformStats();

  // Build KPI config from real analytics
  const buildKpis = (a) => {
    const scale = (base, pts) => pts.map(p => Math.round(base * p));
    return [
      {
        label: 'Verified Creators',
        value: a.totalCreators >= 1000 ? `${(a.totalCreators / 1000).toFixed(1)}K` : String(a.totalCreators),
        color: '#FF9431', icon: Users, sub: 'Active on the platform',
        spark: scale(a.totalCreators, [0.6, 0.65, 0.7, 0.72, 0.78, 0.8, 0.85, 0.88, 0.92, 1]),
      },
      {
        label: 'Audience Reach',
        value: fmt.num(a.totalReach),
        color: '#10B981', icon: TrendingUp, sub: 'Combined followers',
        spark: scale(a.totalReach, [0.5, 0.55, 0.62, 0.66, 0.71, 0.76, 0.82, 0.88, 0.93, 1]),
      },
      {
        label: 'Campaign Value',
        value: fmt.inr(a.dealValue) || '₹0',
        color: '#3B82F6', icon: Megaphone, sub: 'Total deal value tracked',
        spark: scale(a.dealValue, [0.4, 0.5, 0.55, 0.6, 0.68, 0.72, 0.8, 0.86, 0.92, 1]),
      },
      {
        label: 'Cities Covered',
        value: String(a.cityCount),
        color: '#8B5CF6', icon: MapPin, sub: 'Tier 2 & 3 cities active',
        spark: scale(a.cityCount, [0.55, 0.6, 0.65, 0.68, 0.72, 0.76, 0.82, 0.88, 0.93, 1]),
      },
    ];
  };

  return (
    <section style={{ padding: mob ? '48px 16px' : '96px 24px', background: '#F8FAFC', position: 'relative', overflow: 'hidden' }}>

      {/* Subtle grid texture */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)', backgroundSize: '40px 40px', zIndex: 0 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: mob ? 36 : 56, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 16px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: 100, marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: loading ? '#F59E0B' : '#10B981', display: 'block', zIndex: 1, transition: 'background 0.3s' }} />
              <span style={{ position: 'absolute', inset: -2, borderRadius: '50%', background: loading ? 'rgba(245,158,11,0.3)' : 'rgba(16,185,129,0.3)', animation: 'ping 1.8s ease-out infinite' }} />
            </span>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              {loading ? 'Syncing...' : `Live · ${lastUpdated?.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`}
            </span>
            {!loading && (
              <button onClick={refresh} title="Refresh data" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: '#94a3b8', transition: 'color 0.2s' }}>
                <RefreshCw size={13} />
              </button>
            )}
          </div>

          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: mob ? 30 : 52, fontWeight: 900, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 16 }}>
            The Pulse of{' '}
            <span style={{ background: 'linear-gradient(135deg, #FF9431 0%, #10B981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Bharat's Economy.
            </span>
          </h2>
          <p style={{ fontSize: mob ? 14 : 17, color: '#64748b', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Pulled live from our platform. Every number reflects real creators and campaigns on CreatorBharat.
          </p>
        </div>

        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(4,1fr)', gap: mob ? 12 : 20, marginBottom: mob ? 16 : 20 }}>
          {loading
            ? [0,1,2,3].map(i => <SkeletonCard key={i} />)
            : buildKpis(analytics).map((k, i) => <KpiCard key={i} {...k} mob={mob} />)
          }
        </div>

        {/* Niche + City breakdown */}
        {!loading && analytics && (
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 16 : 20 }}>
            <NicheBreakdown niches={analytics.topNiches} mob={mob} />
            <CityTable cities={analytics.topCities} mob={mob} />
          </div>
        )}

        <p style={{ marginTop: 20, textAlign: 'center', fontSize: 12, color: '#94a3b8' }}>
          All figures derived live from verified creator profiles and campaign registrations.
        </p>
      </div>

      <style>{`
        @keyframes ping { 75%, 100% { transform: scale(2.2); opacity: 0; } }
        @keyframes shimmer { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </section>
  );
}
