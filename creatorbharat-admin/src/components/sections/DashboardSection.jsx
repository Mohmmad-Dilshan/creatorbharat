import React from 'react';
import {
  Users, Building2, ShieldCheck, Target, Wallet, Layers, BookOpen, Bell,
  Cpu, SlidersHorizontal, Mail, CheckCircle2, Database, ShieldAlert
} from 'lucide-react';
import { T, fmtINR, fmtNum, fmtDate, StatCard, SectionHeader, EmptyState, ActionBtn, Badge, Table, Td } from '../ui/Primitives';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const DashboardSection = ({
  deepStats,
  creators,
  brands,
  campaigns,
  verifications,
  stats,
  allApplications,
  blogs,
  counts,
  chartData,
  maxUser,
  maxEscrow,
  hoveredPoint,
  setHoveredPoint,
  genPoints,
  activityLog,
  maintenanceMode,
  setMaintenanceMode,
  token,
  toast,
  setActiveTab,
  setSelectedCreator,
  setDrawerOpen,
  handleSendTestEmail,
  handleSyncCheck,
  handleClearCache,
  fetchData,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Deep Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <StatCard label="Total Creators" value={fmtNum(deepStats?.creators?.total || creators.length)} sub={`${deepStats?.creators?.verified || 0} verified · ${deepStats?.creators?.pending || verifications.length} pending`} icon={Users} color={T.orange} onClick={() => setActiveTab('creators')} trend="+12.4%" trendUp={true} />
        <StatCard label="Brand Accounts" value={fmtNum(deepStats?.brands?.total || brands.length)} sub="Partner companies" icon={Building2} color={T.blue} onClick={() => setActiveTab('brands')} trend="+8.1%" trendUp={true} />
        <StatCard label="Active Campaigns" value={fmtNum(deepStats?.campaigns?.active || campaigns.length)} sub={`${deepStats?.campaigns?.total || campaigns.length} total`} icon={Target} color={T.purple} onClick={() => setActiveTab('campaigns')} trend="+19.5%" trendUp={true} />
        <StatCard label="KYC Pending" value={fmtNum(verifications.length)} sub="Requires review" icon={ShieldCheck} color={T.yellow} onClick={() => setActiveTab('verifications')} trend={verifications.length > 0 ? `${verifications.length} waiting` : 'Clear'} trendUp={verifications.length === 0} />
        <StatCard label="Escrow Held" value={fmtINR(stats?.counts?.escrowHoldings)} sub="Active campaign locks" icon={Wallet} color={T.green} onClick={() => setActiveTab('escrows')} trend="+24.8%" trendUp={true} />
        <StatCard label="Applications" value={fmtNum(deepStats?.applications?.total || allApplications.length)} sub={`${deepStats?.applications?.accepted || 0} accepted`} icon={Layers} color={T.teal} onClick={() => setActiveTab('applications')} trend="+31.2%" trendUp={true} />
        <StatCard label="Blog Articles" value={fmtNum(deepStats?.content?.published || blogs.filter(b => b.published).length)} sub={`${blogs.length} total`} icon={BookOpen} color={T.blue} onClick={() => setActiveTab('blogs')} trend="+4" trendUp={true} />
        <StatCard label="Unread Contacts" value={fmtNum(counts.unreadContacts)} sub="Need response" icon={Bell} color={T.red} onClick={() => setActiveTab('contacts')} trend={counts.unreadContacts > 0 ? 'Action' : '0'} trendUp={counts.unreadContacts === 0} />
      </div>

      {/* Advanced Diagnostics & Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
        {/* Diagnostics */}
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.02)' }}>
          <h4 style={{ margin: '0 0 16px', fontSize: 13, fontWeight: 800, color: T.slate, textTransform: 'uppercase', letterSpacing: 0.5, display: 'flex', alignItems: 'center', gap: 8 }}><Cpu size={15} style={{ color: T.orange }} /> System Diagnostics &amp; Health</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { name: 'Neon DB (PostgreSQL)', desc: 'Neon Serverless Cloud', status: 'Operational', latency: '8ms', color: T.green },
              { name: 'Express Core API', desc: 'Running on Port 4000', status: 'Operational', latency: '12ms', color: T.green },
              { name: 'Resend Mail Delivery', desc: 'SMTP Transactional Mailer', status: 'Active (Sandbox)', latency: '40ms', color: T.green },
              { name: 'WebSocket Cluster', desc: 'Socket.io Server Engine', status: 'Connected', latency: '5ms', color: T.green }
            ].map((srv, idx) => (
              <div key={idx} style={{ padding: '12px 14px', background: T.bg, borderRadius: 12, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: srv.color, boxShadow: `0 0 6px ${srv.color}`, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 800, color: T.navy, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{srv.name}</div>
                  <div style={{ fontSize: 9.5, color: T.muted, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{srv.desc}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span style={{ fontSize: 9.5, fontWeight: 800, color: T.slate, display: 'block' }}>{srv.status}</span>
                  <span style={{ fontSize: 8.5, fontWeight: 600, color: T.muted }}>{srv.latency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Hub */}
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.02)' }}>
          <h4 style={{ margin: '0 0 16px', fontSize: 13, fontWeight: 800, color: T.slate, textTransform: 'uppercase', letterSpacing: 0.5, display: 'flex', alignItems: 'center', gap: 8 }}><SlidersHorizontal size={15} style={{ color: T.blue }} /> Global Command Hub</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <button onClick={handleSendTestEmail} style={{ padding: '10px 14px', background: T.blueLight, color: T.blue, border: `1px solid ${T.blue}20`, borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = T.blue + '15'}
              onMouseLeave={e => e.currentTarget.style.background = T.blueLight}
            >
              <Mail size={14} /> Send Test Mail
            </button>
            <button onClick={handleSyncCheck} style={{ padding: '10px 14px', background: T.greenLight, color: T.green, border: `1px solid ${T.green}20`, borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = T.green + '15'}
              onMouseLeave={e => e.currentTarget.style.background = T.greenLight}
            >
              <CheckCircle2 size={14} /> Run Integrity
            </button>
            <button onClick={handleClearCache} style={{ padding: '10px 14px', background: T.purpleLight, color: T.purple, border: `1px solid ${T.purple}20`, borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = T.purple + '15'}
              onMouseLeave={e => e.currentTarget.style.background = T.purpleLight}
            >
              <Database size={14} /> Reset Cache
            </button>
            <button onClick={() => {
              setMaintenanceMode(!maintenanceMode);
              toast(`Maintenance mode ${!maintenanceMode ? 'ENABLED ⚠️' : 'DISABLED ✓'}`, 'info');
            }} style={{ padding: '10px 14px', background: maintenanceMode ? T.red + '15' : T.yellowLight, color: maintenanceMode ? T.red : T.yellow, border: `1px solid ${maintenanceMode ? T.red : T.yellow}20`, borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = maintenanceMode ? T.red + '25' : T.yellow + '15'}
              onMouseLeave={e => e.currentTarget.style.background = maintenanceMode ? T.red + '15' : T.yellowLight}
            >
              <ShieldAlert size={14} /> {maintenanceMode ? 'Disable Maint.' : 'Maint. Toggle'}
            </button>
            <button onClick={async () => {
              toast('Running email drip...', 'info');
              try {
                const res = await fetch(`${API}/admin/drip/run`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } });
                const data = await res.json();
                if (res.ok) toast(`Drip done — Sent: ${data.sent}, Errors: ${data.errors}`, 'success');
                else toast(data.error || 'Drip failed', 'error');
              } catch { toast('Drip network error', 'error'); }
            }} style={{ padding: '10px 14px', background: T.orangeLight || '#fff4ed', color: '#f97316', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(249,115,22,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = T.orangeLight || '#fff4ed'}
            >
              <Mail size={14} /> Run Email Drip
            </button>
          </div>
        </div>
      </div>

      {/* Charts */}
      {chartData.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 20 }}>
          {[
            { key: 'userCount', label: 'User Signups (6 Months)', color: T.blue, max: maxUser },
            { key: 'escrowVolume', label: 'Escrow Volume (6 Months)', color: T.green, max: maxEscrow }
          ].map((chart, ci) => (
            <div key={ci} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 24, position: 'relative' }}>
              <h4 style={{ margin: '0 0 16px', fontSize: 13, fontWeight: 800, color: T.slate, textTransform: 'uppercase', letterSpacing: 0.5 }}>{chart.label}</h4>
              <svg viewBox="0 0 400 160" style={{ width: '100%', height: 140, overflow: 'visible' }}>
                <defs>
                  <linearGradient id={`grad${ci}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chart.color} stopOpacity="0.18" />
                    <stop offset="100%" stopColor={chart.color} stopOpacity="0" />
                  </linearGradient>
                  <filter id={`glow${ci}`} x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor={chart.color} floodOpacity="0.25" />
                  </filter>
                </defs>
                {/* Horizontal gridlines */}
                <line x1="0" y1="38" x2="400" y2="38" stroke="rgba(0,0,0,0.04)" strokeDasharray="4 4" />
                <line x1="0" y1="76" x2="400" y2="76" stroke="rgba(0,0,0,0.04)" strokeDasharray="4 4" />
                <line x1="0" y1="114" x2="400" y2="114" stroke="rgba(0,0,0,0.04)" strokeDasharray="4 4" />

                {/* Hover vertical line */}
                {hoveredPoint && hoveredPoint.chartIndex === ci && (
                  <line x1={hoveredPoint.x} y1="10" x2={hoveredPoint.x} y2="150" stroke={chart.color} strokeWidth="1.2" strokeDasharray="3 3" opacity="0.5" style={{ transition: 'all 0.1s' }} />
                )}

                <path d={`M 0,160 L ${genPoints(chartData, chart.key, chart.max, 400, 160)} L 400,160 Z`} fill={`url(#grad${ci})`} />
                <polyline fill="none" stroke={chart.color} strokeWidth="3" filter={`url(#glow${ci})`} points={genPoints(chartData, chart.key, chart.max, 400, 160)} />
                {chartData.map((d, i) => {
                  const x = i * (400 / Math.max(chartData.length - 1, 1));
                  const y = 160 - ((d[chart.key] || 0) / chart.max) * 140 - 10;
                  const rawVal = d[chart.key] || 0;
                  const formattedVal = chart.key === 'escrowVolume' ? `\u20B9${(rawVal/1000).toFixed(0)}k` : rawVal;
                  const isHovered = hoveredPoint?.chartIndex === ci && hoveredPoint?.pointIndex === i;
                  return (
                    <g key={i}>
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? "6" : "4"}
                        fill={chart.color}
                        stroke="#fff"
                        strokeWidth="2.5"
                        style={{ cursor: 'pointer', transition: 'all 0.15s' }}
                        onMouseEnter={() => setHoveredPoint({ chartIndex: ci, pointIndex: i, x, y, value: formattedVal, label: d.month })}
                        onMouseLeave={() => setHoveredPoint(null)}
                      />
                    </g>
                  );
                })}

                {/* Interactive Floating Tooltip Card */}
                {hoveredPoint && hoveredPoint.chartIndex === ci && (
                  <g style={{ pointerEvents: 'none' }}>
                    <rect
                      x={Math.max(10, Math.min(310, hoveredPoint.x - 45))}
                      y={Math.max(5, hoveredPoint.y - 38)}
                      width="90"
                      height="30"
                      rx="6"
                      fill={T.navy}
                      opacity="0.95"
                    />
                    <text
                      x={Math.max(55, Math.min(355, hoveredPoint.x))}
                      y={Math.max(24, hoveredPoint.y - 19)}
                      textAnchor="middle"
                      fill="#fff"
                      fontSize="10"
                      fontWeight="800"
                    >
                      {hoveredPoint.label}: {hoveredPoint.value}
                    </text>
                  </g>
                )}
              </svg>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontWeight: 800, color: T.muted, marginTop: 6 }}>
                {chartData.map((d, i) => <span key={i}>{d.month}</span>)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Priority Verification Queue Preview */}
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
        <SectionHeader title="Priority Verification Queue" sub="First 5 pending KYC requests" action={<ActionBtn onClick={() => setActiveTab('verifications')}>View All ({verifications.length}) &rarr;</ActionBtn>} />
        {verifications.length === 0 ? <EmptyState icon="✅" msg="All creators reviewed! No pending verifications." /> : (
          <Table cols={['Creator', 'Handle', 'Location', 'Docs', { label: 'Action', align: 'right' }]}>
            {verifications.slice(0, 5).map(cr => (
              <tr key={cr.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                <Td bold>{cr.name}</Td>
                <Td><span style={{ color: T.orange, fontWeight: 700 }}>@{cr.handle}</span></Td>
                <Td muted>{cr.city || '—'}, {cr.state || '—'}</Td>
                <Td>
                  <Badge color={cr.aadhaarUrl ? T.green : T.red}>Aadhaar</Badge>{' '}
                  <Badge color={cr.panUrl ? T.green : T.red}>PAN</Badge>
                </Td>
                <Td right>
                  <ActionBtn onClick={() => { setSelectedCreator(cr); setDrawerOpen(true); }}><span style={{ fontSize: 13 }}>&#128065;</span> Review KYC</ActionBtn>
                </Td>
              </tr>
            ))}
          </Table>
        )}
      </div>

      {/* Recent Activity Preview */}
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
        <SectionHeader title="Recent Activity" sub="Last 8 platform events" action={<ActionBtn onClick={() => setActiveTab('activity')}>View Full Log &rarr;</ActionBtn>} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {activityLog.slice(0, 8).map((a, i) => {
            const typeColor = { NEW_USER: T.blue, VERIFIED: T.green, PAYMENT: T.orange, CAMPAIGN: T.purple, BLOG: T.teal }[a.type] || T.slate;
            return (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 14px', background: T.bg, borderRadius: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: typeColor, flexShrink: 0 }}></div>
                <span style={{ fontSize: 13, color: T.slate, fontWeight: 600, flex: 1 }}>{a.label}</span>
                <span style={{ fontSize: 11, color: T.muted, fontWeight: 500, whiteSpace: 'nowrap' }}>{fmtDate(a.time)}</span>
              </div>
            );
          })}
          {activityLog.length === 0 && <EmptyState icon="📋" msg="No activity yet" />}
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
