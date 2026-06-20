import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Building2, 
  ShieldCheck, 
  DollarSign, 
  FileText, 
  TrendingUp, 
  Settings, 
  LogOut,
  Lock,
  Mail,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('cb_admin_token') || '');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Login Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Dashboard Data States
  const [creators, setCreators] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [verifications, setVerifications] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Trigger notification toast helper
  const triggerToast = (msg, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Auth check & login execution
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return setAuthError('Email and password are required.');
    }
    setAuthLoading(true);
    setAuthError('');
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed');
      
      if (data.user?.role !== 'ADMIN') {
        throw new Error('Access denied. Administrator privileges required.');
      }

      localStorage.setItem('cb_admin_token', data.token);
      setToken(data.token);
      triggerToast('Logged in successfully', 'success');
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout execution
  const handleLogout = () => {
    localStorage.removeItem('cb_admin_token');
    setToken('');
    setCreators([]);
    setCampaigns([]);
    setVerifications([]);
    triggerToast('Logged out session', 'info');
  };

  // Fetch Dashboard Stats & Tables dynamically
  const fetchDashboardData = async () => {
    if (!token) return;
    setDataLoading(true);
    try {
      const headers = { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      };

      // 1. Fetch Pending Verifications Queue (Admin exclusive)
      const resVer = await fetch(`${API_BASE}/admin/verifications`, { headers });
      const dataVer = await resVer.json();
      if (resVer.ok) setVerifications(Array.isArray(dataVer) ? dataVer : []);

      // 2. Fetch all creators
      const resCre = await fetch(`${API_BASE}/creators`, { headers });
      const dataCre = await resCre.json();
      if (resCre.ok) setCreators(dataCre.creators || []);

      // 3. Fetch all campaigns
      const resCam = await fetch(`${API_BASE}/campaigns`, { headers });
      const dataCam = await resCam.json();
      if (resCam.ok) setCampaigns(dataCam || []);

    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      triggerToast('Failed to sync live database stats', 'error');
    } finally {
      setDataLoading(false);
    }
  };

  // Run initial data fetch
  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  // Execute approval tick
  const handleApproveVerification = async (creatorId) => {
    try {
      const res = await fetch(`${API_BASE}/admin/verify/${creatorId}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Verification process failed');
      
      triggerToast('Creator verified successfully', 'success');
      // Refresh database records
      fetchDashboardData();
    } catch (err) {
      triggerToast(err.message, 'error');
    }
  };

  // Render Authentication Gate if token is missing
  if (!token) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#090d16',
        color: '#f8fafc',
        padding: 16
      }}>
        <div style={{
          width: '100%',
          maxWidth: 420,
          background: '#0d1321',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 20,
          padding: 36,
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
          {/* Header logo */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #f97316, #22c55e)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 22,
              color: '#fff',
              marginBottom: 16
            }}>CB</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 6px 0' }}>CreatorBharat Admin</h2>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1.5 }}>Sign in to Control Panel</span>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            
            {authError && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid #ef4444',
                color: '#ef4444',
                padding: '12px 16px',
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <AlertTriangle size={16} />
                {authError}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Admin Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@creatorbharat.in" 
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: 10,
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.04)',
                    color: '#fff',
                    fontSize: 14,
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: 10,
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.04)',
                    color: '#fff',
                    fontSize: 14,
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={authLoading}
              style={{
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                color: '#fff',
                border: 'none',
                padding: '13px',
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 14,
                cursor: authLoading ? 'not-allowed' : 'pointer',
                marginTop: 8,
                transition: 'opacity 0.2s',
                opacity: authLoading ? 0.7 : 1
              }}
            >
              {authLoading ? 'Authorizing Gateway...' : 'Access Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Active User Stat Configurations
  const stats = [
    { label: 'Total Creators', value: creators.length, sub: 'Registered in DB', icon: Users, color: '#f97316' },
    { label: 'Active Campaigns', value: campaigns.length, sub: 'Live campaigns', icon: Building2, color: '#3b82f6' },
    { label: 'Pending Verifications', value: verifications.length, sub: 'Needs admin review', icon: ShieldCheck, color: '#22c55e' },
    { label: 'Escrow Holdings', value: '₹4.2M', sub: 'Razorpay Escrows', icon: DollarSign, color: '#a855f7' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#090d16', color: '#f8fafc' }}>
      
      {/* Toast notifications container */}
      <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 10000, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            padding: '12px 18px',
            background: '#0d1321',
            border: '1px solid ' + (t.type === 'success' ? '#22c55e' : t.type === 'error' ? '#ef4444' : '#3b82f6'),
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            animation: 'fadeIn 0.2s ease'
          }}>
            <span style={{ fontSize: 16 }}>{t.type === 'success' ? '✓' : t.type === 'error' ? '✗' : 'ℹ'}</span>
            <span>{t.msg}</span>
          </div>
        ))}
      </div>

      {/* Sidebar Nav */}
      <aside style={{
        width: 250,
        background: '#0d1321',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 16px',
        flexShrink: 0
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
            { id: 'verifications', label: 'Verification Queue', icon: ShieldCheck, badge: verifications.length },
            { id: 'creators', label: 'Manage Creators', icon: Users, badge: creators.length },
            { id: 'campaigns', label: 'Manage Campaigns', icon: Building2, badge: campaigns.length }
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
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge > 0 && (
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: 20,
                    background: active ? '#f97316' : 'rgba(255,255,255,0.08)',
                    color: active ? '#fff' : 'rgba(255,255,255,0.6)',
                    fontSize: 10,
                    fontWeight: 700
                  }}>{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          style={{
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
          }}
        >
          <LogOut size={18} />
          Logout Session
        </button>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: 40, overflowY: 'auto' }}>
        
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 4px 0' }}>SaaS Console Dashboard</h2>
            <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Manage verification queues and system parameters.</p>
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
              Neon Database: Live
            </span>
          </div>
        </header>

        {/* Overview Tab */}
        {activeTab === 'dashboard' && (
          <div>
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
                      <span style={{ display: 'block', fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 4, fontWeight: 600 }}>{st.sub}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Verification highlights card */}
            <section style={{
              background: '#0d1321',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 18,
              padding: 30
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Pending Verification Request Priority Queue</h3>
                <button 
                  onClick={() => setActiveTab('verifications')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#f97316',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  View Full Queue →
                </button>
              </div>

              {verifications.length === 0 ? (
                <div style={{ padding: '30px', textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>
                  🎉 No pending verifications. All creator profiles are verified.
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        <th style={{ padding: '12px', textAlign: 'left', color: 'rgba(255,255,255,0.4)' }}>Name</th>
                        <th style={{ padding: '12px', textAlign: 'left', color: 'rgba(255,255,255,0.4)' }}>Handle</th>
                        <th style={{ padding: '12px', textAlign: 'left', color: 'rgba(255,255,255,0.4)' }}>Location</th>
                        <th style={{ padding: '12px', textAlign: 'right', color: 'rgba(255,255,255,0.4)' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {verifications.slice(0, 3).map(cr => (
                        <tr key={cr.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <td style={{ padding: '12px', fontWeight: 600 }}>{cr.name}</td>
                          <td style={{ padding: '12px', color: '#f97316', fontWeight: 700 }}>@{cr.handle}</td>
                          <td style={{ padding: '12px', color: 'rgba(255,255,255,0.6)' }}>{cr.city || 'N/A'}, {cr.state || 'N/A'}</td>
                          <td style={{ padding: '12px', textAlign: 'right' }}>
                            <button 
                              onClick={() => handleApproveVerification(cr.id)}
                              style={{
                                padding: '6px 14px',
                                background: 'rgba(34, 197, 94, 0.12)',
                                color: '#22c55e',
                                border: 'none',
                                borderRadius: 6,
                                fontSize: 11,
                                fontWeight: 700,
                                cursor: 'pointer'
                              }}
                            >
                              Verify Account
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        )}

        {/* Verifications Tab */}
        {activeTab === 'verifications' && (
          <section style={{ background: '#0d1321', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 18, padding: 30 }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: 18, fontWeight: 700 }}>Pending Profile Verification Queue</h3>
            {verifications.length === 0 ? (
              <div style={{ padding: '50px 0', textAlign: 'center', color: 'rgba(255,255,255,0.35)' }}>
                🎉 Verification queue is currently empty.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: 10, letterSpacing: 0.5 }}>Name</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: 10, letterSpacing: 0.5 }}>Handle</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: 10, letterSpacing: 0.5 }}>Platform</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: 10, letterSpacing: 0.5 }}>Reach</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: 10, letterSpacing: 0.5 }}>Rate Card</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: 10, letterSpacing: 0.5 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {verifications.map(cr => (
                      <tr key={cr.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '14px 16px', fontWeight: 600 }}>{cr.name}</td>
                        <td style={{ padding: '14px 16px', color: '#f97316', fontWeight: 700 }}>@{cr.handle}</td>
                        <td style={{ padding: '14px 16px' }}>
                          {cr.platform?.map((p, i) => (
                            <span key={i} style={{ padding: '2px 8px', background: 'rgba(255,255,255,0.06)', borderRadius: 20, fontSize: 10, marginRight: 4, textTransform: 'capitalize' }}>{p}</span>
                          ))}
                        </td>
                        <td style={{ padding: '14px 16px', fontWeight: 600 }}>{cr.followers.toLocaleString()}</td>
                        <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.7)' }}>₹{cr.rateMin} - ₹{cr.rateMax}</td>
                        <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                          <button 
                            onClick={() => handleApproveVerification(cr.id)}
                            style={{
                              padding: '6px 14px',
                              background: '#22c55e',
                              color: '#fff',
                              border: 'none',
                              borderRadius: 6,
                              fontSize: 11,
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            Verify & Approve
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Creators Tab */}
        {activeTab === 'creators' && (
          <section style={{ background: '#0d1321', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 18, padding: 30 }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: 18, fontWeight: 700 }}>Registered Creator Directory</h3>
            {creators.length === 0 ? (
              <div style={{ padding: '50px 0', textAlign: 'center', color: 'rgba(255,255,255,0.35)' }}>
                No creators registered in database.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: 10 }}>Name</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: 10 }}>Handle</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: 10 }}>Location</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: 10 }}>Followers</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: 10 }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {creators.map(cr => (
                      <tr key={cr.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '14px 16px', fontWeight: 600 }}>{cr.name}</td>
                        <td style={{ padding: '14px 16px', color: '#f97316', fontWeight: 700 }}>@{cr.handle}</td>
                        <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.7)' }}>{cr.city || 'N/A'}, {cr.state || 'N/A'}</td>
                        <td style={{ padding: '14px 16px', fontWeight: 600 }}>{cr.followers.toLocaleString()}</td>
                        <td style={{ padding: '14px 16px' }}>
                          {cr.isVerified ? (
                            <span style={{
                              padding: '3px 10px',
                              background: 'rgba(34,197,94,0.12)',
                              color: '#22c55e',
                              borderRadius: 20,
                              fontSize: 10,
                              fontWeight: 700,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4
                            }}>
                              <CheckCircle2 size={10} /> Verified
                            </span>
                          ) : (
                            <span style={{
                              padding: '3px 10px',
                              background: 'rgba(245,158,11,0.12)',
                              color: '#f59e0b',
                              borderRadius: 20,
                              fontSize: 10,
                              fontWeight: 700
                            }}>Unverified</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <section style={{ background: '#0d1321', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 18, padding: 30 }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: 18, fontWeight: 700 }}>Active Campaign Postings</h3>
            {campaigns.length === 0 ? (
              <div style={{ padding: '50px 0', textAlign: 'center', color: 'rgba(255,255,255,0.35)' }}>
                No active campaign listings in database.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: 10 }}>Title</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: 10 }}>Brand Owner</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: 10 }}>Niche</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: 10 }}>Platform</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: 10 }}>Budget</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map(cp => (
                      <tr key={cp.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '14px 16px', fontWeight: 600 }}>{cp.title}</td>
                        <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.7)' }}>{cp.brand?.companyName || 'N/A'}</td>
                        <td style={{ padding: '14px 16px' }}>
                          {cp.niche?.map((n, i) => (
                            <span key={i} style={{ padding: '2px 8px', background: 'rgba(255,255,255,0.06)', borderRadius: 20, fontSize: 10, marginRight: 4 }}>{n}</span>
                          ))}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          {cp.platform?.map((p, i) => (
                            <span key={i} style={{ padding: '2px 8px', background: 'rgba(255,255,255,0.06)', borderRadius: 20, fontSize: 10, marginRight: 4, textTransform: 'capitalize' }}>{p}</span>
                          ))}
                        </td>
                        <td style={{ padding: '14px 16px', color: '#f97316', fontWeight: 700 }}>₹{cp.budget.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

      </main>

    </div>
  );
}
