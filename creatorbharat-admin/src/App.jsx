import React, { useState } from 'react';
import { 
  Users, 
  Building2, 
  ShieldCheck, 
  DollarSign, 
  FileText, 
  TrendingUp, 
  Settings, 
  LogOut 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'Active Creators', value: '12,482', change: '+12% this week', icon: Users, color: '#f97316' },
    { label: 'Registered Brands', value: '428', change: '+8% this week', icon: Building2, color: '#3b82f6' },
    { label: 'Verification Requests', value: '94', change: '12 pending review', icon: ShieldCheck, color: '#22c55e' },
    { label: 'Payout Escrow', value: '₹4.2M', change: 'Razorpay Connected', icon: DollarSign, color: '#a855f7' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#090d16' }}>
      
      {/* Sidebar Nav */}
      <aside style={{
        width: 250,
        background: '#0d1321',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 16px'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40, padding: '0 8px' }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: 'linear-gradient(135deg, #f97316, #22c55e)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: 16,
            color: '#fff'
          }}>CB</div>
          <div>
            <h1 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>CreatorBharat</h1>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1 }}>Control Panel</span>
          </div>
        </div>

        {/* Menu */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { id: 'dashboard', label: 'Overview', icon: TrendingUp },
            { id: 'creators', label: 'Manage Creators', icon: Users },
            { id: 'brands', label: 'Manage Brands', icon: Building2 },
            { id: 'verifications', label: 'Verifications', icon: ShieldCheck },
            { id: 'reports', label: 'Reports & Logs', icon: FileText },
            { id: 'settings', label: 'System Settings', icon: Settings }
          ].map(item => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 16px',
                  borderRadius: 10,
                  border: 'none',
                  background: active ? 'rgba(249, 115, 22, 0.15)' : 'transparent',
                  color: active ? '#f97316' : 'rgba(255,255,255,0.65)',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 16px',
          borderRadius: 10,
          border: 'none',
          background: 'rgba(239, 68, 68, 0.08)',
          color: '#ef4444',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          marginTop: 'auto'
        }}>
          <LogOut size={18} />
          Logout Session
        </button>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: 40, overflowY: 'auto' }}>
        
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 4px 0' }}>SaaS Overview</h2>
            <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Real-time statistics and administrative tools.</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <span style={{ 
              padding: '8px 16px', 
              background: 'rgba(34, 197, 94, 0.12)', 
              color: '#22c55e', 
              fontSize: 12, 
              fontWeight: 700, 
              borderRadius: 30,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }}></span>
              Server Status: Online
            </span>
          </div>
        </header>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginBottom: 40 }}>
          {stats.map((st, i) => {
            const Icon = st.icon;
            return (
              <div 
                key={i} 
                style={{
                  background: '#0d1321',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 16,
                  padding: 24,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20
                }}
              >
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `${st.color}15`,
                  color: st.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={24} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: 24, fontWeight: 800 }}>{st.value}</h4>
                  <span style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>{st.label}</span>
                  <span style={{ display: 'block', fontSize: 10, color: st.color, marginTop: 4, fontWeight: 700 }}>{st.change}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Console Section */}
        <section style={{
          background: '#0d1321',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 18,
          padding: 30
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: 18, fontWeight: 700 }}>Active Tab Console</h3>
          <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
            The administrative interface for **{activeTab.toUpperCase()}** has been successfully initialized as a modern Vite template. Backups of the older Babel standalone code are fully preserved in `local_backups/creatorbharat-admin-old` for future integrations.
          </p>
        </section>

      </main>

    </div>
  );
}
