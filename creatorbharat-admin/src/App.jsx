import React, { useState, useEffect, useMemo } from 'react';
import {
  Users, Building2, ShieldCheck, DollarSign, FileText, TrendingUp, Settings, LogOut,
  Lock, Mail, CheckCircle2, AlertTriangle, XCircle, Eye, Check, X, Search, ChevronRight,
  Filter, CreditCard, Trash2, SlidersHorizontal, Info, MessageSquare, PlayCircle, Star,
  BarChart3, Wallet, Trophy, Zap, Globe, Bell, Calendar, Activity, Award, Layers,
  RefreshCw, ExternalLink, Crown, Target, ChevronDown, ChevronUp, Copy, Download,
  Flame, BookOpen, Headphones, AtSign, Phone, MapPin, Hash, ShieldAlert, UserCheck,
  UserX, PieChart, TrendingDown, Package, Cpu, Database, Shield
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5173' : 'https://creatorbharat.com');

// ─── Helper: format INR ──────────────────────────────────────────────────────
const fmtINR = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;
const fmtNum = (n) => Number(n || 0).toLocaleString('en-IN');
const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

// ─── Design tokens ───────────────────────────────────────────────────────────
const T = {
  orange: '#f97316', orangeLight: 'rgba(249,115,22,0.08)', orangeBorder: 'rgba(249,115,22,0.2)',
  blue: '#3b82f6', blueLight: 'rgba(59,130,246,0.08)',
  green: '#22c55e', greenLight: 'rgba(34,197,94,0.08)',
  purple: '#8b5cf6', purpleLight: 'rgba(139,92,246,0.08)',
  red: '#ef4444', redLight: 'rgba(239,68,68,0.08)',
  yellow: '#f59e0b', yellowLight: 'rgba(245,158,11,0.08)',
  teal: '#14b8a6', tealLight: 'rgba(20,184,166,0.08)',
  navy: '#0f172a', slate: '#475569', muted: '#64748b', border: '#e2e8f0',
  bg: '#f8fafc', card: '#ffffff'
};

// ─── Reusable Components ──────────────────────────────────────────────────────
const Badge = ({ color = T.orange, children, size = 'sm' }) => (
  <span style={{
    padding: size === 'sm' ? '2px 8px' : '4px 12px',
    background: color + '15',
    color,
    borderRadius: 20,
    fontSize: size === 'sm' ? 10 : 12,
    fontWeight: 800,
    border: `1px solid ${color}25`,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    whiteSpace: 'nowrap'
  }}>{children}</span>
);

const StatCard = ({ label, value, sub, icon: Icon, color, onClick }) => (
  <div onClick={onClick} style={{
    background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 24,
    display: 'flex', alignItems: 'center', gap: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
    cursor: onClick ? 'pointer' : 'default', transition: 'all 0.2s',
  }}
    onMouseEnter={e => onClick && (e.currentTarget.style.borderColor = color + '40')}
    onMouseLeave={e => onClick && (e.currentTarget.style.borderColor = T.border)}
  >
    <div style={{
      width: 52, height: 52, borderRadius: 14, background: color + '12', color,
      display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${color}20`, flexShrink: 0
    }}><Icon size={24} /></div>
    <div>
      <h4 style={{ margin: '0 0 2px', fontSize: 26, fontWeight: 800, color: T.navy, fontFamily: 'system-ui' }}>{value}</h4>
      <span style={{ display: 'block', fontSize: 13, color: T.slate, fontWeight: 700 }}>{label}</span>
      {sub && <span style={{ display: 'block', fontSize: 10, color: T.muted, marginTop: 3, fontWeight: 500 }}>{sub}</span>}
    </div>
  </div>
);

const SectionHeader = ({ title, sub, action, badge }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: T.navy }}>{title}</h3>
        {badge !== undefined && badge > 0 && (
          <span style={{ padding: '2px 10px', background: T.orange + '15', color: T.orange, borderRadius: 20, fontSize: 11, fontWeight: 800 }}>{badge}</span>
        )}
      </div>
      {sub && <p style={{ margin: '4px 0 0', fontSize: 13, color: T.muted, fontWeight: 500 }}>{sub}</p>}
    </div>
    {action}
  </div>
);

const SearchBar = ({ value, onChange, placeholder }) => (
  <div style={{ position: 'relative', marginBottom: 20 }}>
    <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: T.muted }} />
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || 'Search...'} style={{
      width: '100%', padding: '10px 14px 10px 40px', border: `1px solid ${T.border}`,
      borderRadius: 12, fontSize: 13, color: T.navy, background: '#fff', outline: 'none', boxSizing: 'border-box'
    }} />
  </div>
);

const EmptyState = ({ icon, msg }) => (
  <div style={{ padding: '60px 0', textAlign: 'center', color: T.muted }}>
    <div style={{ fontSize: 40, marginBottom: 12 }}>{icon || '📭'}</div>
    <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{msg || 'No data available'}</p>
  </div>
);

const ActionBtn = ({ onClick, color = T.orange, children, small }) => (
  <button onClick={onClick} style={{
    padding: small ? '5px 12px' : '7px 16px', background: color + '12', color, border: `1px solid ${color}25`,
    borderRadius: 8, fontSize: small ? 11 : 12, fontWeight: 700, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 5, transition: 'all 0.15s', whiteSpace: 'nowrap'
  }}>{children}</button>
);

const DangerBtn = ({ onClick, children, small }) => (
  <button onClick={onClick} style={{
    padding: small ? '5px 12px' : '7px 16px', background: T.red + '10', color: T.red, border: `1px solid ${T.red}25`,
    borderRadius: 8, fontSize: small ? 11 : 12, fontWeight: 700, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 5
  }}>{children}</button>
);

const TableHead = ({ cols }) => (
  <thead>
    <tr style={{ borderBottom: `1px solid ${T.border}` }}>
      {cols.map((c, i) => (
        <th key={i} style={{ padding: '12px 16px', textAlign: typeof c === 'object' ? c.align || 'left' : 'left', color: T.muted, fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {typeof c === 'object' ? c.label : c}
        </th>
      ))}
    </tr>
  </thead>
);

const Table = ({ cols, children, style }) => (
  <div style={{ overflowX: 'auto', ...style }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
      <TableHead cols={cols} />
      <tbody>{children}</tbody>
    </table>
  </div>
);

const Td = ({ children, right, bold, muted, style }) => (
  <td style={{ padding: '14px 16px', textAlign: right ? 'right' : 'left', color: muted ? T.muted : bold ? T.navy : T.slate, fontWeight: bold ? 700 : 500, ...style }}>{children}</td>
);

// ─── Sidebar Nav Config ───────────────────────────────────────────────────────
const NAV_SECTIONS = (counts) => [
  {
    title: '📊 CORE',
    color: T.orange,
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
      { id: 'activity', label: 'Activity Log', icon: Activity },
    ]
  },
  {
    title: '👤 CREATOR SYSTEM',
    color: T.blue,
    items: [
      { id: 'verifications', label: 'KYC Verifications', icon: ShieldCheck, badge: counts.pendingVerifications },
      { id: 'creators', label: 'All Creators', icon: Users, badge: counts.creators },
      { id: 'creator-wallets', label: 'Creator Wallets', icon: Wallet, badge: counts.payments },
      { id: 'creator-score', label: 'Creator Score', icon: Trophy },
      { id: 'creator-achievements', label: 'Achievements', icon: Award },
      { id: 'creator-reviews', label: 'Creator Reviews', icon: Star, badge: counts.reviews },
      { id: 'podcasts', label: 'Podcasts', icon: Headphones, badge: counts.podcasts },
      { id: 'leaderboard', label: 'Leaderboard', icon: Crown },
    ]
  },
  {
    title: '🏢 BRAND SYSTEM',
    color: T.purple,
    items: [
      { id: 'brands', label: 'All Brands', icon: Building2, badge: counts.brands },
      { id: 'campaigns', label: 'Campaign Manager', icon: Target, badge: counts.campaigns },
      { id: 'applications', label: 'All Applications', icon: Layers, badge: counts.applications },
      { id: 'brand-analytics', label: 'Brand Analytics', icon: BarChart3 },
      { id: 'escrows', label: 'Payments & Escrow', icon: CreditCard, badge: counts.payments },
    ]
  },
  {
    title: '📝 CONTENT & MARKETING',
    color: T.green,
    items: [
      { id: 'blogs', label: 'Blog Manager', icon: BookOpen, badge: counts.blogs },
      { id: 'comments', label: 'Comment Moderation', icon: MessageSquare, badge: counts.comments },
      { id: 'newsletters', label: 'Newsletter Subs', icon: Mail, badge: counts.newsletters },
      { id: 'contacts', label: 'Contact Inbox', icon: Bell, badge: counts.unreadContacts },
    ]
  },
  {
    title: '⚙️ SYSTEM',
    color: T.slate,
    items: [
      { id: 'settings', label: 'Settings', icon: SlidersHorizontal },
      { id: 'danger', label: 'Danger Zone', icon: ShieldAlert },
    ]
  }
];

// ─── Tab Label Helper ─────────────────────────────────────────────────────────
const TAB_META = {
  dashboard: { title: 'Dashboard Overview', sub: 'Real-time platform metrics and priority actions' },
  activity: { title: 'Platform Activity Log', sub: 'Live feed of all recent platform events' },
  verifications: { title: 'KYC Verification Queue', sub: 'Review and approve creator identity documents' },
  creators: { title: 'All Creators', sub: 'Manage creator profiles, scores and suspensions' },
  'creator-wallets': { title: 'Creator Wallets', sub: 'View transaction history and wallet balances per creator' },
  'creator-score': { title: 'Creator Score Manager', sub: 'Manually adjust or audit creator platform scores' },
  'creator-achievements': { title: 'Achievements & Milestones', sub: 'Track creator achievement progress' },
  'creator-reviews': { title: 'Creator Reviews', sub: 'Moderate brand reviews given to creators' },
  podcasts: { title: 'Podcast Manager', sub: 'Publish, unpublish, or delete podcast episodes' },
  leaderboard: { title: 'Leaderboard Management', sub: 'Top verified creators by score and followers' },
  brands: { title: 'All Brands', sub: 'Manage brand accounts, suspensions and campaigns' },
  campaigns: { title: 'Campaign Manager', sub: 'Oversee all brand campaign postings and pitches' },
  applications: { title: 'All Campaign Applications', sub: 'Platform-wide creator pitch submissions' },
  'brand-analytics': { title: 'Brand Analytics', sub: 'Campaign spend, applications and performance per brand' },
  escrows: { title: 'Payments & Escrow', sub: 'Override campaign escrow releases and refunds' },
  blogs: { title: 'Blog Manager', sub: 'Create, edit, publish and delete blog articles' },
  comments: { title: 'Comment Moderation', sub: 'Remove spam or offensive blog comments' },
  newsletters: { title: 'Newsletter Subscribers', sub: 'View and manage email list' },
  contacts: { title: 'Contact Inbox', sub: 'Reply to or delete user contact messages' },
  settings: { title: 'System Settings', sub: 'Configure platform-wide settings and toggles' },
  danger: { title: '⚠️ Danger Zone', sub: 'Irreversible platform-wide operations' },
};

// ─── STATUS COLORS ─────────────────────────────────────────────────────────
const STATUS_COLOR = {
  ACTIVE: T.green, PENDING: T.yellow, REJECTED: T.red, COMPLETED: T.blue,
  ACCEPTED: T.green, SHORTLISTED: T.purple, PAID: T.green, RELEASED: T.blue,
  REFUNDED: T.orange, ESCROW: T.yellow, CAMPAIGN_ESCROW: T.yellow,
  published: T.green, draft: T.muted
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [token, setToken] = useState(localStorage.getItem('cb_admin_token') || '');
  const [activeTab, setActiveTab] = useState('dashboard');

  // ── Auth
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // ── Core Data
  const [creators, setCreators] = useState([]);
  const [brands, setBrands] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [verifications, setVerifications] = useState([]);
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState(null);
  const [deepStats, setDeepStats] = useState(null);

  // ── Content Data
  const [blogs, setBlogs] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);

  // ── New Data
  const [allApplications, setAllApplications] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [brandAnalytics, setBrandAnalytics] = useState([]);
  const [activityLog, setActivityLog] = useState([]);

  // ── Search States
  const [creatorSearch, setCreatorSearch] = useState('');
  const [brandSearch, setBrandSearch] = useState('');
  const [campaignSearch, setCampaignSearch] = useState('');
  const [paymentSearch, setPaymentSearch] = useState('');
  const [blogSearch, setBlogSearch] = useState('');
  const [commentSearch, setCommentSearch] = useState('');
  const [newsletterSearch, setNewsletterSearch] = useState('');
  const [contactSearch, setContactSearch] = useState('');
  const [appSearch, setAppSearch] = useState('');
  const [leaderSearch, setLeaderSearch] = useState('');
  const [brandAnalyticSearch, setBrandAnalyticSearch] = useState('');

  // ── Creator Wallet drill-down
  const [selectedWalletCreator, setSelectedWalletCreator] = useState(null);
  const [walletTxns, setWalletTxns] = useState([]);
  const [walletLoading, setWalletLoading] = useState(false);

  // ── Creator Score modal
  const [scoreModal, setScoreModal] = useState(null); // { creator }
  const [scoreInput, setScoreInput] = useState('');
  const [scoreReason, setScoreReason] = useState('');

  // ── KYC Drawer
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  // ── Brand Drawer
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandDrawerOpen, setBrandDrawerOpen] = useState(false);

  // ── Contact Detail Modal
  const [viewingContact, setViewingContact] = useState(null);

  // ── Campaign Applications accordion
  const [expandedCampaignId, setExpandedCampaignId] = useState(null);
  const [campaignApplications, setCampaignApplications] = useState([]);
  const [appsLoading, setAppsLoading] = useState(false);

  // ── Blog Editor
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogSlug, setBlogSlug] = useState('');
  const [blogCategory, setBlogCategory] = useState('Marketing');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogBody, setBlogBody] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('CB Editorial');
  const [blogImage, setBlogImage] = useState('');
  const [blogTags, setBlogTags] = useState('');
  const [blogFeatured, setBlogFeatured] = useState(false);
  const [blogPublished, setBlogPublished] = useState(false);

  // ── Settings
  const [platformFee, setPlatformFee] = useState(10);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [supportEmail, setSupportEmail] = useState('hello@creatorbharat.com');
  const [featAchievements, setFeatAchievements] = useState(true);
  const [featCommunity, setFeatCommunity] = useState(true);
  const [featWallet, setFeatWallet] = useState(true);

  // ── UI
  const [dataLoading, setDataLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  // ─── Toast Helper ───────────────────────────────────────────────────────────
  const toast = (msg, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  // ─── Auth ───────────────────────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return setAuthError('Email and password are required.');
    setAuthLoading(true); setAuthError('');
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed');
      if (data.user?.role !== 'ADMIN') throw new Error('Access denied. Administrator privileges required.');
      localStorage.setItem('cb_admin_token', data.token);
      setToken(data.token);
      toast('Welcome Back, Administrator! 🛡️', 'success');
    } catch (err) { setAuthError(err.message); }
    finally { setAuthLoading(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem('cb_admin_token');
    setToken('');
    setCreators([]); setBrands([]); setCampaigns([]); setVerifications([]);
    setPayments([]); setStats(null); setDeepStats(null);
    toast('Session closed', 'info');
  };

  // ─── Auth Headers Helper ────────────────────────────────────────────────────
  const H = () => ({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });

  // ─── Data Fetch ─────────────────────────────────────────────────────────────
  const fetchData = async () => {
    if (!token) return;
    setDataLoading(true);
    try {
      const fetches = [
        fetch(`${API_BASE}/admin/verifications`, { headers: H() }),
        fetch(`${API_BASE}/creators`, { headers: H() }),
        fetch(`${API_BASE}/admin/brands`, { headers: H() }),
        fetch(`${API_BASE}/campaigns`, { headers: H() }),
        fetch(`${API_BASE}/admin/payments`, { headers: H() }),
        fetch(`${API_BASE}/admin/stats`, { headers: H() }),
        fetch(`${API_BASE}/admin/blogs`, { headers: H() }),
        fetch(`${API_BASE}/admin/newsletters`, { headers: H() }),
        fetch(`${API_BASE}/admin/contacts`, { headers: H() }),
        fetch(`${API_BASE}/admin/podcasts`, { headers: H() }),
        fetch(`${API_BASE}/admin/reviews`, { headers: H() }),
        fetch(`${API_BASE}/admin/comments`, { headers: H() }),
        fetch(`${API_BASE}/admin/applications`, { headers: H() }),
        fetch(`${API_BASE}/admin/leaderboard`, { headers: H() }),
        fetch(`${API_BASE}/admin/brand-analytics`, { headers: H() }),
        fetch(`${API_BASE}/admin/platform/activity`, { headers: H() }),
        fetch(`${API_BASE}/admin/platform/stats/deep`, { headers: H() }),
      ];

      const results = await Promise.allSettled(fetches);
      const safeJson = async (r) => { try { const d = await r.json(); return d; } catch { return null; } };

      const [rVer, rCre, rBr, rCam, rPay, rSt, rBlog, rNews, rCont, rPod, rRev, rComm,
        rApps, rLead, rBrandAna, rAct, rDeepSt] = await Promise.all(results.map(r => r.status === 'fulfilled' ? safeJson(r.value) : null));

      if (rVer) setVerifications(Array.isArray(rVer) ? rVer : []);
      if (rCre) setCreators(rCre.creators || (Array.isArray(rCre) ? rCre : []));
      if (rBr) setBrands(Array.isArray(rBr) ? rBr : []);
      if (rCam) setCampaigns(Array.isArray(rCam) ? rCam : []);
      if (rPay) setPayments(Array.isArray(rPay) ? rPay : []);
      if (rSt) setStats(rSt);
      if (rBlog) setBlogs(Array.isArray(rBlog) ? rBlog : []);
      if (rNews) setNewsletters(Array.isArray(rNews) ? rNews : []);
      if (rCont) setContacts(Array.isArray(rCont) ? rCont : []);
      if (rPod) setPodcasts(Array.isArray(rPod) ? rPod : []);
      if (rRev) setReviews(Array.isArray(rRev) ? rRev : []);
      if (rComm) setComments(Array.isArray(rComm) ? rComm : []);
      if (rApps) setAllApplications(Array.isArray(rApps) ? rApps : []);
      if (rLead) setLeaderboard(Array.isArray(rLead) ? rLead : []);
      if (rBrandAna) setBrandAnalytics(Array.isArray(rBrandAna) ? rBrandAna : []);
      if (rAct) setActivityLog(Array.isArray(rAct) ? rAct : []);
      if (rDeepSt) setDeepStats(rDeepSt);

    } catch (err) {
      console.error('Fetch error:', err);
      toast('Failed to sync data from database', 'error');
    } finally { setDataLoading(false); }
  };

  useEffect(() => { if (token) fetchData(); }, [token]);

  // ─── API Actions ────────────────────────────────────────────────────────────
  const handleApproveVerification = async (creatorId) => {
    try {
      const res = await fetch(`${API_BASE}/admin/verify/${creatorId}`, { method: 'POST', headers: H() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast('Creator verified successfully ✓', 'success');
      setDrawerOpen(false);
      fetchData();
    } catch (err) { toast(err.message, 'error'); }
  };

  const handleRejectVerification = async (creatorId, reason) => {
    try {
      const res = await fetch(`${API_BASE}/admin/verify/reject/${creatorId}`, {
        method: 'POST', headers: H(), body: JSON.stringify({ reason })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast('Verification rejected & documents reset', 'success');
      setDrawerOpen(false); setShowRejectForm(false);
      fetchData();
    } catch (err) { toast(err.message, 'error'); }
  };

  const handleToggleSuspension = async (userId, isCreator = true) => {
    try {
      const res = await fetch(`${API_BASE}/admin/users/suspend/${userId}`, { method: 'POST', headers: H() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast(data.message, 'success');
      fetchData();
    } catch (err) { toast(err.message, 'error'); }
  };

  const handleDeleteCampaign = async (campaignId) => {
    if (!window.confirm('Delete this campaign? This is permanent.')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/campaigns/${campaignId}`, { method: 'DELETE', headers: H() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast('Campaign deleted', 'success');
      fetchData();
    } catch (err) { toast(err.message, 'error'); }
  };

  const handlePaymentOverride = async (paymentId, action) => {
    try {
      const res = await fetch(`${API_BASE}/admin/payments/override`, {
        method: 'POST', headers: H(), body: JSON.stringify({ paymentId, action })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast(data.message, 'success');
      fetchData();
    } catch (err) { toast(err.message, 'error'); }
  };

  const handleUpdateAppStatus = async (appId, status) => {
    try {
      const res = await fetch(`${API_BASE}/admin/applications/${appId}/status`, {
        method: 'POST', headers: H(), body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast(`Status updated to ${status}`, 'success');
      setCampaignApplications(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
      setAllApplications(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
    } catch (err) { toast(err.message, 'error'); }
  };

  const handleToggleExpand = async (campaignId) => {
    if (expandedCampaignId === campaignId) { setExpandedCampaignId(null); return; }
    setExpandedCampaignId(campaignId); setCampaignApplications([]); setAppsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/campaigns/${campaignId}/applications`, { headers: H() });
      const data = await res.json();
      if (res.ok) setCampaignApplications(Array.isArray(data) ? data : []);
      else toast(data.error || 'Failed to fetch applications', 'error');
    } catch { toast('Failed to fetch applications', 'error'); }
    finally { setAppsLoading(false); }
  };

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm('Delete this blog article permanently?')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/blogs/${blogId}`, { method: 'DELETE', headers: H() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast('Blog deleted successfully', 'success');
      fetchData();
    } catch (err) { toast(err.message, 'error'); }
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    if (!blogTitle || !blogSlug || !blogBody) return toast('Title, Slug, Body are required', 'error');
    try {
      const payload = {
        title: blogTitle.trim(), slug: blogSlug.trim(), category: blogCategory,
        excerpt: blogExcerpt.trim(), body: blogBody.trim(), author: blogAuthor.trim(),
        image: blogImage || 'https://images.unsplash.com/photo-1546074177-ffedd79d494d?q=80&w=600',
        tags: blogTags.split(',').map(t => t.trim()).filter(Boolean),
        featured: blogFeatured, published: blogPublished
      };
      const url = editingBlog ? `${API_BASE}/admin/blogs/${editingBlog.id}` : `${API_BASE}/admin/blogs`;
      const method = editingBlog ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: H(), body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast(editingBlog ? 'Blog updated!' : 'Blog created!', 'success');
      setBlogModalOpen(false); setEditingBlog(null); clearBlogForm(); fetchData();
    } catch (err) { toast(err.message, 'error'); }
  };

  const clearBlogForm = () => {
    setBlogTitle(''); setBlogSlug(''); setBlogCategory('Marketing'); setBlogExcerpt('');
    setBlogBody(''); setBlogAuthor('CB Editorial'); setBlogImage(''); setBlogTags('');
    setBlogFeatured(false); setBlogPublished(false);
  };

  const openEditBlog = (blog) => {
    setEditingBlog(blog); setBlogTitle(blog.title); setBlogSlug(blog.slug);
    setBlogCategory(blog.category); setBlogExcerpt(blog.excerpt || ''); setBlogBody(blog.body);
    setBlogAuthor(blog.author); setBlogImage(blog.image || '');
    setBlogTags(blog.tags?.join(', ') || ''); setBlogFeatured(blog.featured); setBlogPublished(blog.published);
    setBlogModalOpen(true);
  };

  const handleDeleteComment = async (id) => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/comments/${id}`, { method: 'DELETE', headers: H() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast('Comment deleted', 'success'); fetchData();
    } catch (err) { toast(err.message, 'error'); }
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm('Delete this review? Permanent.')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/reviews/${id}`, { method: 'DELETE', headers: H() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast('Review removed', 'success'); fetchData();
    } catch (err) { toast(err.message, 'error'); }
  };

  const handleDeleteSubscriber = async (id) => {
    if (!window.confirm('Remove subscriber?')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/newsletters/${id}`, { method: 'DELETE', headers: H() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast('Subscriber removed', 'success'); fetchData();
    } catch (err) { toast(err.message, 'error'); }
  };

  const handleToggleContactRead = async (id) => {
    try {
      await fetch(`${API_BASE}/admin/contacts/${id}/read`, { method: 'PUT', headers: H() });
      fetchData();
    } catch { }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/contacts/${id}`, { method: 'DELETE', headers: H() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast('Message deleted', 'success'); fetchData();
    } catch (err) { toast(err.message, 'error'); }
  };

  const handleTogglePodcast = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/admin/podcasts/toggle/${id}`, { method: 'POST', headers: H() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast(data.message, 'success'); fetchData();
    } catch (err) { toast(err.message, 'error'); }
  };

  const handleDeletePodcast = async (id) => {
    if (!window.confirm('Delete this podcast episode?')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/podcasts/${id}`, { method: 'DELETE', headers: H() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast('Podcast deleted', 'success'); fetchData();
    } catch (err) { toast(err.message, 'error'); }
  };

  const handleFetchWallet = async (creator) => {
    setSelectedWalletCreator(creator); setWalletTxns([]); setWalletLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/creators/${creator.id}/transactions`, { headers: H() });
      const data = await res.json();
      if (res.ok) setWalletTxns(Array.isArray(data) ? data : []);
      else toast(data.error || 'Failed to fetch transactions', 'error');
    } catch { toast('Failed to fetch wallet data', 'error'); }
    finally { setWalletLoading(false); }
  };

  const handleAdjustScore = async () => {
    if (!scoreModal || !scoreInput) return toast('Score value is required', 'error');
    try {
      const res = await fetch(`${API_BASE}/admin/creators/${scoreModal.creator.id}/score`, {
        method: 'POST', headers: H(), body: JSON.stringify({ score: Number(scoreInput), reason: scoreReason })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast(data.message, 'success');
      setScoreModal(null); setScoreInput(''); setScoreReason('');
      fetchData();
    } catch (err) { toast(err.message, 'error'); }
  };

  // ─── Computed Counts ─────────────────────────────────────────────────────────
  const counts = useMemo(() => ({
    creators: creators.length,
    brands: brands.length,
    campaigns: campaigns.length,
    payments: payments.length,
    pendingVerifications: verifications.length,
    blogs: blogs.length,
    newsletters: newsletters.length,
    reviews: reviews.length,
    comments: comments.length,
    podcasts: podcasts.length,
    applications: allApplications.length,
    unreadContacts: contacts.filter(c => !c.read).length,
  }), [creators, brands, campaigns, payments, verifications, blogs, newsletters, reviews, comments, podcasts, allApplications, contacts]);

  // ─── Filter Helpers ───────────────────────────────────────────────────────────
  const filteredCreators = useMemo(() => creators.filter(c =>
    `${c.name} ${c.handle} ${c.city || ''}`.toLowerCase().includes(creatorSearch.toLowerCase())
  ), [creators, creatorSearch]);

  const filteredBrands = useMemo(() => brands.filter(b =>
    `${b.companyName} ${b.industry || ''}`.toLowerCase().includes(brandSearch.toLowerCase())
  ), [brands, brandSearch]);

  const filteredCampaigns = useMemo(() => campaigns.filter(c =>
    `${c.title} ${c.brand?.companyName || ''}`.toLowerCase().includes(campaignSearch.toLowerCase())
  ), [campaigns, campaignSearch]);

  const filteredPayments = useMemo(() => payments.filter(p =>
    `${p.type} ${p.razorpayId || ''} ${p.status}`.toLowerCase().includes(paymentSearch.toLowerCase())
  ), [payments, paymentSearch]);

  const filteredBlogs = useMemo(() => blogs.filter(b =>
    `${b.title} ${b.category} ${b.author}`.toLowerCase().includes(blogSearch.toLowerCase())
  ), [blogs, blogSearch]);

  const filteredComments = useMemo(() => comments.filter(c =>
    `${c.content || ''} ${c.authorName || ''} ${c.blog?.title || ''}`.toLowerCase().includes(commentSearch.toLowerCase())
  ), [comments, commentSearch]);

  const filteredNewsletters = useMemo(() => newsletters.filter(n =>
    `${n.email || ''}`.toLowerCase().includes(newsletterSearch.toLowerCase())
  ), [newsletters, newsletterSearch]);

  const filteredContacts = useMemo(() => contacts.filter(c =>
    `${c.name || ''} ${c.email || ''} ${c.message || ''}`.toLowerCase().includes(contactSearch.toLowerCase())
  ), [contacts, contactSearch]);

  const filteredApps = useMemo(() => allApplications.filter(a =>
    `${a.creator?.name || ''} ${a.campaign?.title || ''} ${a.status}`.toLowerCase().includes(appSearch.toLowerCase())
  ), [allApplications, appSearch]);

  const filteredLeaderboard = useMemo(() => leaderboard.filter(c =>
    `${c.name} ${c.handle}`.toLowerCase().includes(leaderSearch.toLowerCase())
  ), [leaderboard, leaderSearch]);

  const filteredBrandAnalytics = useMemo(() => brandAnalytics.filter(b =>
    `${b.companyName} ${b.industry || ''}`.toLowerCase().includes(brandAnalyticSearch.toLowerCase())
  ), [brandAnalytics, brandAnalyticSearch]);

  // ─── SVG Chart Helper ─────────────────────────────────────────────────────────
  const genPoints = (data, key, maxVal, w, h) => {
    if (data.length < 2) return '';
    const step = w / (data.length - 1);
    return data.map((d, i) => {
      const x = i * step;
      const y = h - ((d[key] || 0) / maxVal) * (h - 20) - 10;
      return `${x},${y}`;
    }).join(' ');
  };

  // ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
  if (!token) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #fff7ed 100%)', padding: 16, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ width: '100%', maxWidth: 440, background: T.card, border: `1px solid ${T.border}`, borderRadius: 28, padding: 48, boxShadow: '0 24px 60px rgba(0,0,0,0.06)' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, background: 'linear-gradient(135deg, #f97316, #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 26, color: '#fff', margin: '0 auto 16px', boxShadow: '0 8px 20px rgba(249,115,22,0.25)' }}>CB</div>
            <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 6px', color: T.navy }}>Admin Control Panel</h2>
            <p style={{ margin: 0, fontSize: 11, color: T.muted, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700 }}>CreatorBharat SaaS Platform</p>
          </div>
          {authError && (
            <div style={{ background: T.redLight, border: `1px solid ${T.red}25`, color: T.red, padding: '12px 16px', borderRadius: 12, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <AlertTriangle size={16} />{authError}
            </div>
          )}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Admin Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: T.muted }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@creatorbharat.com" style={{ width: '100%', padding: '12px 14px 12px 42px', borderRadius: 12, border: `1px solid ${T.border}`, background: '#fff', color: T.navy, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: T.muted }} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', padding: '12px 14px 12px 42px', borderRadius: 12, border: `1px solid ${T.border}`, background: '#fff', color: T.navy, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>
            <button type="submit" disabled={authLoading} style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', color: '#fff', border: 'none', padding: '14px', borderRadius: 12, fontWeight: 800, fontSize: 14, cursor: authLoading ? 'not-allowed' : 'pointer', opacity: authLoading ? 0.7 : 1, boxShadow: '0 4px 16px rgba(249,115,22,0.25)', marginTop: 6 }}>
              {authLoading ? 'Authorizing...' : '🔐 Access Dashboard'}
            </button>
          </form>
          <div style={{ marginTop: 24, padding: 14, background: T.orangeLight, border: `1px solid ${T.orangeBorder}`, borderRadius: 12, fontSize: 11, color: T.orange, fontWeight: 700, textAlign: 'center' }}>
            🛡️ Restricted to authorized administrators only
          </div>
        </div>
      </div>
    );
  }

  // ─── MAIN DASHBOARD LAYOUT ────────────────────────────────────────────────────
  const chartData = stats?.chartData || [];
  const maxUser = Math.max(...chartData.map(d => d.userCount || 0), 1);
  const maxEscrow = Math.max(...chartData.map(d => d.escrowVolume || 0), 1);

  const meta = TAB_META[activeTab] || { title: activeTab, sub: '' };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: T.bg, color: T.navy, fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* ── Toast Container ────────────────────────────────────────────────── */}
      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {toasts.map(t => (
          <div key={t.id} style={{ padding: '12px 18px', background: T.card, borderLeft: `4px solid ${t.type === 'success' ? T.green : t.type === 'error' ? T.red : T.blue}`, borderRadius: 10, fontSize: 13, fontWeight: 700, color: T.navy, display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 10px 30px rgba(0,0,0,0.1)', minWidth: 260 }}>
            <span>{t.type === 'success' ? '✓' : t.type === 'error' ? '✗' : 'ℹ'}</span>
            {t.msg}
          </div>
        ))}
      </div>

      {/* ── SIDEBAR ────────────────────────────────────────────────────────── */}
      <aside className="no-scrollbar" style={{ width: 268, background: T.card, borderRight: `1px solid ${T.border}`, display: 'flex', flexDirection: 'column', padding: '24px 16px', flexShrink: 0, position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32, padding: '0 8px' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #f97316, #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18, color: '#fff', boxShadow: '0 4px 12px rgba(249,115,22,0.25)', flexShrink: 0 }}>CB</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 900, color: T.navy, lineHeight: 1.2 }}>CreatorBharat</div>
            <div style={{ fontSize: 9, color: T.muted, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 800 }}>Admin Console</div>
          </div>
          {dataLoading && <RefreshCw size={14} style={{ color: T.orange, animation: 'spin 1s linear infinite', marginLeft: 'auto' }} />}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {NAV_SECTIONS(counts).map((section, si) => (
            <div key={si}>
              <div style={{ fontSize: 9, color: T.muted, textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: 900, padding: '0 12px', marginBottom: 6 }}>{section.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {section.items.map(item => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
                      borderRadius: 10, border: 'none',
                      background: active ? T.orange + '12' : 'transparent',
                      color: active ? T.orange : T.slate,
                      fontSize: 13, fontWeight: active ? 800 : 600, cursor: 'pointer', textAlign: 'left',
                      transition: 'all 0.15s', width: '100%'
                    }}>
                      <Icon size={15} style={{ flexShrink: 0 }} />
                      <span style={{ flex: 1, fontSize: 12.5 }}>{item.label}</span>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span style={{ padding: '1px 7px', borderRadius: 20, background: active ? T.orange : '#e2e8f0', color: active ? '#fff' : T.slate, fontSize: 10, fontWeight: 800 }}>{item.badge}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
          <button onClick={fetchData} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px', borderRadius: 10, border: `1px solid ${T.border}`, background: T.bg, color: T.slate, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
            <RefreshCw size={14} /> Refresh Data
          </button>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px', borderRadius: 10, border: '1px solid #fee2e2', background: '#fef2f2', color: T.red, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
            <LogOut size={14} /> Logout Session
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ────────────────────────────────────────────────────── */}
      <main style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* Top Header Bar */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: `1px solid ${T.border}`, background: T.card, position: 'sticky', top: 0, zIndex: 100 }}>
          <div>
            <h2 style={{ margin: '0 0 2px', fontSize: 20, fontWeight: 900, color: T.navy }}>{meta.title}</h2>
            <p style={{ margin: 0, fontSize: 12, color: T.muted, fontWeight: 500 }}>{meta.sub}</p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ padding: '6px 14px', background: T.greenLight, color: T.green, fontSize: 11, fontWeight: 800, borderRadius: 30, display: 'flex', alignItems: 'center', gap: 6, border: `1px solid ${T.green}25` }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.green }}></span>
              Live · Neon DB Connected
            </span>
            <a href={FRONTEND_URL} target="_blank" rel="noopener noreferrer" style={{ padding: '6px 14px', background: T.orangeLight, color: T.orange, fontSize: 11, fontWeight: 800, borderRadius: 30, textDecoration: 'none', border: `1px solid ${T.orangeBorder}`, display: 'flex', alignItems: 'center', gap: 6 }}>
              <ExternalLink size={11} /> Visit Site
            </a>
          </div>
        </header>

        {/* Content */}
        <div style={{ padding: '32px 40px', flex: 1 }}>

          {/* ══ DASHBOARD ══════════════════════════════════════════════════ */}
          {activeTab === 'dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {/* Deep Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                <StatCard label="Total Creators" value={fmtNum(deepStats?.creators?.total || creators.length)} sub={`${deepStats?.creators?.verified || 0} verified · ${deepStats?.creators?.pending || verifications.length} pending`} icon={Users} color={T.orange} onClick={() => setActiveTab('creators')} />
                <StatCard label="Brand Accounts" value={fmtNum(deepStats?.brands?.total || brands.length)} sub="Partner companies" icon={Building2} color={T.blue} onClick={() => setActiveTab('brands')} />
                <StatCard label="Active Campaigns" value={fmtNum(deepStats?.campaigns?.active || campaigns.length)} sub={`${deepStats?.campaigns?.total || campaigns.length} total`} icon={Target} color={T.purple} onClick={() => setActiveTab('campaigns')} />
                <StatCard label="KYC Pending" value={fmtNum(verifications.length)} sub="Requires review" icon={ShieldCheck} color={T.yellow} onClick={() => setActiveTab('verifications')} />
                <StatCard label="Escrow Held" value={fmtINR(stats?.counts?.escrowHoldings)} sub="Active campaign locks" icon={Wallet} color={T.green} onClick={() => setActiveTab('escrows')} />
                <StatCard label="Applications" value={fmtNum(deepStats?.applications?.total || allApplications.length)} sub={`${deepStats?.applications?.accepted || 0} accepted`} icon={Layers} color={T.teal} onClick={() => setActiveTab('applications')} />
                <StatCard label="Blog Articles" value={fmtNum(deepStats?.content?.published || blogs.filter(b => b.published).length)} sub={`${blogs.length} total`} icon={BookOpen} color={T.blue} onClick={() => setActiveTab('blogs')} />
                <StatCard label="Unread Contacts" value={fmtNum(counts.unreadContacts)} sub="Need response" icon={Bell} color={T.red} onClick={() => setActiveTab('contacts')} />
              </div>

              {/* Charts */}
              {chartData.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  {[
                    { key: 'userCount', label: 'User Signups (6 Months)', color: T.blue, max: maxUser },
                    { key: 'escrowVolume', label: 'Escrow Volume ₹ (6 Months)', color: T.orange, max: maxEscrow }
                  ].map((chart, ci) => (
                    <div key={ci} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 24 }}>
                      <h4 style={{ margin: '0 0 16px', fontSize: 13, fontWeight: 800, color: T.slate, textTransform: 'uppercase', letterSpacing: 0.5 }}>{chart.label}</h4>
                      <svg viewBox="0 0 400 160" style={{ width: '100%', height: 140 }}>
                        <defs>
                          <linearGradient id={`grad${ci}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={chart.color} stopOpacity="0.2" />
                            <stop offset="100%" stopColor={chart.color} stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d={`M 0,160 L ${genPoints(chartData, chart.key, chart.max, 400, 160)} L 400,160 Z`} fill={`url(#grad${ci})`} />
                        <polyline fill="none" stroke={chart.color} strokeWidth="2.5" points={genPoints(chartData, chart.key, chart.max, 400, 160)} />
                        {chartData.map((d, i) => {
                          const x = i * (400 / Math.max(chartData.length - 1, 1));
                          const y = 160 - ((d[chart.key] || 0) / chart.max) * 140 - 10;
                          return <circle key={i} cx={x} cy={y} r="3.5" fill={chart.color} stroke="#fff" strokeWidth="2" />;
                        })}
                      </svg>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontWeight: 700, color: T.muted, marginTop: 6 }}>
                        {chartData.map((d, i) => <span key={i}>{d.month}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Priority Verification Queue Preview */}
              <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
                <SectionHeader title="Priority Verification Queue" sub="First 5 pending KYC requests" action={<ActionBtn onClick={() => setActiveTab('verifications')}>View All ({verifications.length}) →</ActionBtn>} />
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
                          <ActionBtn onClick={() => { setSelectedCreator(cr); setDrawerOpen(true); }}><Eye size={13} /> Review KYC</ActionBtn>
                        </Td>
                      </tr>
                    ))}
                  </Table>
                )}
              </div>

              {/* Recent Activity Preview */}
              <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
                <SectionHeader title="Recent Activity" sub="Last 8 platform events" action={<ActionBtn onClick={() => setActiveTab('activity')}>View Full Log →</ActionBtn>} />
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
          )}

          {/* ══ ACTIVITY LOG ═══════════════════════════════════════════════ */}
          {activeTab === 'activity' && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
              <SectionHeader title="Platform Activity Log" sub={`${activityLog.length} recent events across the platform`} action={<ActionBtn onClick={fetchData}><RefreshCw size={13} /> Refresh</ActionBtn>} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {activityLog.map((a, i) => {
                  const typeColor = { NEW_USER: T.blue, VERIFIED: T.green, PAYMENT: T.orange, CAMPAIGN: T.purple, BLOG: T.teal }[a.type] || T.slate;
                  const typeLabel = { NEW_USER: 'USER', VERIFIED: 'KYC', PAYMENT: 'PAY', CAMPAIGN: 'CAMP', BLOG: 'BLOG' }[a.type] || a.type;
                  return (
                    <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '12px 16px', background: T.bg, borderRadius: 12, border: `1px solid ${T.border}` }}>
                      <Badge color={typeColor}>{typeLabel}</Badge>
                      <span style={{ fontSize: 13, color: T.slate, fontWeight: 600, flex: 1 }}>{a.label}</span>
                      <span style={{ fontSize: 11, color: T.muted, fontWeight: 500, whiteSpace: 'nowrap' }}>{fmtDate(a.time)}</span>
                    </div>
                  );
                })}
                {activityLog.length === 0 && <EmptyState icon="📋" msg="No activity to show yet" />}
              </div>
            </div>
          )}

          {/* ══ VERIFICATIONS ══════════════════════════════════════════════ */}
          {activeTab === 'verifications' && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
              <SectionHeader title="KYC Verification Queue" badge={verifications.length} sub="Approve or reject creator identity documents" />
              {verifications.length === 0 ? <EmptyState icon="✅" msg="No pending verifications. All creators have been reviewed!" /> : (
                <Table cols={['Creator', 'Handle', 'Category', 'Followers', 'Aadhaar / PAN', { label: 'Actions', align: 'right' }]}>
                  {verifications.map(cr => (
                    <tr key={cr.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                      <Td bold>{cr.name}</Td>
                      <Td><span style={{ color: T.orange, fontWeight: 700 }}>@{cr.handle}</span></Td>
                      <Td>{(cr.niche || []).slice(0, 2).map((n, i) => <Badge key={i} color={T.blue}>{n}</Badge>)}</Td>
                      <Td>{fmtNum(cr.followers)}</Td>
                      <Td>
                        <Badge color={cr.aadhaarUrl ? T.green : T.red}>Aadhaar</Badge>{' '}
                        <Badge color={cr.panUrl ? T.green : T.red}>PAN</Badge>
                      </Td>
                      <Td right>
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                          <a href={`${FRONTEND_URL}/creator/${cr.id}`} target="_blank" rel="noopener noreferrer" style={{ padding: '6px 12px', background: T.blueLight, color: T.blue, border: 'none', borderRadius: 8, fontSize: 11, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                            <ExternalLink size={11} /> Visit
                          </a>
                          <ActionBtn onClick={() => { setSelectedCreator(cr); setDrawerOpen(true); }}><Eye size={13} /> Review KYC</ActionBtn>
                        </div>
                      </Td>
                    </tr>
                  ))}
                </Table>
              )}
            </div>
          )}

          {/* ══ ALL CREATORS ═══════════════════════════════════════════════ */}
          {activeTab === 'creators' && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
              <SectionHeader title="All Creators" badge={creators.length} sub="Manage creator profiles, suspensions and data" />
              <SearchBar value={creatorSearch} onChange={setCreatorSearch} placeholder="Search by name, handle, or city..." />
              <Table cols={['Creator', 'Handle', 'Location', 'Followers', 'Verified', 'Status', { label: 'Actions', align: 'right' }]}>
                {filteredCreators.map(cr => (
                  <tr key={cr.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <Td bold>{cr.name}</Td>
                    <Td><span style={{ color: T.orange, fontWeight: 700 }}>@{cr.handle}</span></Td>
                    <Td muted>{cr.city || '—'}, {cr.state || '—'}</Td>
                    <Td bold>{fmtNum(cr.followers)}</Td>
                    <Td><Badge color={cr.isVerified ? T.green : T.muted}>{cr.isVerified ? '✓ Verified' : 'Unverified'}</Badge></Td>
                    <Td><Badge color={cr.user?.isSuspended ? T.red : T.green}>{cr.user?.isSuspended ? 'Suspended' : 'Active'}</Badge></Td>
                    <Td right>
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                        <a href={`${FRONTEND_URL}/creator/${cr.id}`} target="_blank" rel="noopener noreferrer" style={{ padding: '5px 10px', background: T.blueLight, color: T.blue, borderRadius: 7, fontSize: 11, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <ExternalLink size={10} /> Profile
                        </a>
                        <ActionBtn small onClick={() => handleFetchWallet(cr)}><Wallet size={11} /> Wallet</ActionBtn>
                        <ActionBtn small onClick={() => { setScoreModal({ creator: cr }); setScoreInput(cr.score || 0); }}><Trophy size={11} /> Score</ActionBtn>
                        <DangerBtn small onClick={() => handleToggleSuspension(cr.user?.id)}>
                          {cr.user?.isSuspended ? <UserCheck size={11} /> : <UserX size={11} />}
                          {cr.user?.isSuspended ? 'Unban' : 'Suspend'}
                        </DangerBtn>
                      </div>
                    </Td>
                  </tr>
                ))}
              </Table>
              {filteredCreators.length === 0 && <EmptyState icon="👤" msg="No creators match your search" />}
            </div>
          )}

          {/* ══ CREATOR WALLETS ════════════════════════════════════════════ */}
          {activeTab === 'creator-wallets' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {!selectedWalletCreator ? (
                <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
                  <SectionHeader title="Creator Wallets" sub="Click on a creator to view their transaction history" />
                  <SearchBar value={creatorSearch} onChange={setCreatorSearch} placeholder="Search creator..." />
                  <Table cols={['Creator', 'Handle', 'Niche', 'Followers', 'Verified', { label: 'View Wallet', align: 'right' }]}>
                    {filteredCreators.map(cr => (
                      <tr key={cr.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                        <Td bold>{cr.name}</Td>
                        <Td><span style={{ color: T.orange, fontWeight: 700 }}>@{cr.handle}</span></Td>
                        <Td>{(cr.niche || []).slice(0, 2).map((n, i) => <Badge key={i} color={T.purple} size="sm">{n}</Badge>)}</Td>
                        <Td bold>{fmtNum(cr.followers)}</Td>
                        <Td><Badge color={cr.isVerified ? T.green : T.muted}>{cr.isVerified ? '✓' : '—'}</Badge></Td>
                        <Td right><ActionBtn onClick={() => handleFetchWallet(cr)}><Wallet size={12} /> View Wallet</ActionBtn></Td>
                      </tr>
                    ))}
                  </Table>
                </div>
              ) : (
                <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
                  <SectionHeader
                    title={`Wallet: ${selectedWalletCreator.name}`}
                    sub={`@${selectedWalletCreator.handle} · All payment transactions`}
                    action={<ActionBtn onClick={() => { setSelectedWalletCreator(null); setWalletTxns([]); }}>← Back to All Creators</ActionBtn>}
                  />
                  {walletLoading ? <EmptyState icon="⏳" msg="Loading transactions..." /> : walletTxns.length === 0 ? (
                    <EmptyState icon="💰" msg="No transactions found for this creator" />
                  ) : (
                    <Table cols={['Campaign', 'Brand', 'Amount', 'Type', 'Status', 'Date']}>
                      {walletTxns.map(tx => (
                        <tr key={tx.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                          <Td bold>{tx.campaign?.title || '—'}</Td>
                          <Td>{tx.brand?.companyName || '—'}</Td>
                          <Td bold><span style={{ color: T.green }}>{fmtINR(tx.amount)}</span></Td>
                          <Td><Badge color={T.blue}>{tx.type}</Badge></Td>
                          <Td><Badge color={STATUS_COLOR[tx.status] || T.muted}>{tx.status}</Badge></Td>
                          <Td muted>{fmtDate(tx.createdAt)}</Td>
                        </tr>
                      ))}
                    </Table>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ══ CREATOR SCORE ══════════════════════════════════════════════ */}
          {activeTab === 'creator-score' && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
              <SectionHeader title="Creator Score Manager" sub="View and manually adjust creator platform scores" />
              <SearchBar value={creatorSearch} onChange={setCreatorSearch} placeholder="Search creator..." />
              <Table cols={['Creator', 'Handle', 'Score', 'Followers', 'Verified', { label: 'Adjust Score', align: 'right' }]}>
                {filteredCreators.map(cr => (
                  <tr key={cr.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <Td bold>{cr.name}</Td>
                    <Td><span style={{ color: T.orange, fontWeight: 700 }}>@{cr.handle}</span></Td>
                    <Td>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, color: T.navy, fontSize: 14 }}>
                        <Trophy size={14} style={{ color: T.yellow }} />
                        {cr.score || 0}
                      </span>
                    </Td>
                    <Td>{fmtNum(cr.followers)}</Td>
                    <Td><Badge color={cr.isVerified ? T.green : T.muted}>{cr.isVerified ? '✓' : '—'}</Badge></Td>
                    <Td right>
                      <ActionBtn onClick={() => { setScoreModal({ creator: cr }); setScoreInput(String(cr.score || 0)); setScoreReason(''); }}>
                        <Trophy size={12} /> Adjust Score
                      </ActionBtn>
                    </Td>
                  </tr>
                ))}
              </Table>
            </div>
          )}

          {/* ══ CREATOR ACHIEVEMENTS ═══════════════════════════════════════ */}
          {activeTab === 'creator-achievements' && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
              <SectionHeader title="Achievements & Milestones" sub="Track creator milestone progress based on follower counts and brand deals" />
              <div style={{ marginBottom: 20, padding: 16, background: T.orangeLight, borderRadius: 12, border: `1px solid ${T.orangeBorder}` }}>
                <p style={{ margin: 0, fontSize: 13, color: T.orange, fontWeight: 700 }}>ℹ️ Achievements are automatically unlocked when creators hit follower + deal milestones. Verified creators get physical swag shipped to them.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                {[
                  { emoji: '🎥', title: 'Rising Star', followerTarget: 1000, color: T.blue },
                  { emoji: '⚡', title: 'Creator Pro', followerTarget: 10000, color: T.purple },
                  { emoji: '🏆', title: 'Bharat Elite', followerTarget: 100000, color: T.orange },
                  { emoji: '👑', title: 'Legend', followerTarget: 1000000, color: T.yellow },
                ].map((m, i) => {
                  const earned = creators.filter(c => c.followers >= m.followerTarget && c.isVerified);
                  return (
                    <div key={i} style={{ padding: 20, background: T.bg, borderRadius: 16, border: `1px solid ${T.border}` }}>
                      <div style={{ fontSize: 32, marginBottom: 10 }}>{m.emoji}</div>
                      <h4 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 800, color: T.navy }}>{m.title}</h4>
                      <p style={{ margin: '0 0 12px', fontSize: 12, color: T.muted, fontWeight: 500 }}>{fmtNum(m.followerTarget)}+ followers required</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Badge color={m.color}>{earned.length} creators earned</Badge>
                        <span style={{ fontSize: 11, color: T.muted }}>of {creators.length} total</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 24 }}>
                <h4 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 800, color: T.navy }}>Top Creators by Followers</h4>
                <Table cols={['Creator', 'Followers', 'Verified', 'Score', 'Milestone']}>
                  {[...creators].sort((a, b) => (b.followers || 0) - (a.followers || 0)).slice(0, 15).map(cr => {
                    const milestone = cr.followers >= 1000000 ? { emoji: '👑', label: 'Legend', color: T.yellow } :
                      cr.followers >= 100000 ? { emoji: '🏆', label: 'Bharat Elite', color: T.orange } :
                        cr.followers >= 10000 ? { emoji: '⚡', label: 'Creator Pro', color: T.purple } :
                          cr.followers >= 1000 ? { emoji: '🎥', label: 'Rising Star', color: T.blue } :
                            { emoji: '🌱', label: 'Budding', color: T.muted };
                    return (
                      <tr key={cr.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                        <Td bold>{cr.name} <span style={{ color: T.orange, fontWeight: 700 }}>@{cr.handle}</span></Td>
                        <Td bold>{fmtNum(cr.followers)}</Td>
                        <Td><Badge color={cr.isVerified ? T.green : T.muted}>{cr.isVerified ? '✓' : '—'}</Badge></Td>
                        <Td bold>{cr.score || 0}</Td>
                        <Td><Badge color={milestone.color}>{milestone.emoji} {milestone.label}</Badge></Td>
                      </tr>
                    );
                  })}
                </Table>
              </div>
            </div>
          )}

          {/* ══ CREATOR REVIEWS ════════════════════════════════════════════ */}
          {activeTab === 'creator-reviews' && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
              <SectionHeader title="Creator Reviews" badge={reviews.length} sub="Brand reviews submitted for creators — moderate spam" />
              {reviews.length === 0 ? <EmptyState icon="⭐" msg="No reviews yet" /> : (
                <Table cols={['Creator', 'Brand', 'Rating', 'Review', 'Date', { label: 'Action', align: 'right' }]}>
                  {reviews.map(rv => (
                    <tr key={rv.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                      <Td bold>{rv.creator?.name || '—'}</Td>
                      <Td>{rv.brand?.companyName || '—'}</Td>
                      <Td><span style={{ color: T.yellow, fontWeight: 800 }}>{'★'.repeat(Math.min(rv.r || 0, 5))}</span> {rv.r}/5</Td>
                      <Td><span style={{ maxWidth: 200, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{rv.t || '—'}</span></Td>
                      <Td muted>{fmtDate(rv.createdAt)}</Td>
                      <Td right><DangerBtn small onClick={() => handleDeleteReview(rv.id)}><Trash2 size={11} /> Delete</DangerBtn></Td>
                    </tr>
                  ))}
                </Table>
              )}
            </div>
          )}

          {/* ══ PODCASTS ═══════════════════════════════════════════════════ */}
          {activeTab === 'podcasts' && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
              <SectionHeader title="Podcast Manager" badge={podcasts.length} sub="Control podcast episode visibility and cleanup" />
              {podcasts.length === 0 ? <EmptyState icon="🎙️" msg="No podcasts available" /> : (
                <Table cols={['Episode', 'Creator', 'Status', 'Date', { label: 'Actions', align: 'right' }]}>
                  {podcasts.map(pod => (
                    <tr key={pod.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                      <Td bold>{pod.title}</Td>
                      <Td>{pod.creator?.name || '—'}</Td>
                      <Td><Badge color={pod.published ? T.green : T.muted}>{pod.published ? 'Published' : 'Draft'}</Badge></Td>
                      <Td muted>{fmtDate(pod.createdAt)}</Td>
                      <Td right>
                        <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                          <ActionBtn small onClick={() => handleTogglePodcast(pod.id)}>
                            {pod.published ? '⏸ Unpublish' : '▶ Publish'}
                          </ActionBtn>
                          <DangerBtn small onClick={() => handleDeletePodcast(pod.id)}><Trash2 size={11} /></DangerBtn>
                        </div>
                      </Td>
                    </tr>
                  ))}
                </Table>
              )}
            </div>
          )}

          {/* ══ LEADERBOARD ════════════════════════════════════════════════ */}
          {activeTab === 'leaderboard' && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
              <SectionHeader title="Leaderboard Management" badge={leaderboard.length} sub="Top 100 verified creators ranked by score and followers" action={<ActionBtn onClick={fetchData}><RefreshCw size={13} /> Refresh</ActionBtn>} />
              <SearchBar value={leaderSearch} onChange={setLeaderSearch} placeholder="Search creator..." />
              <Table cols={['Rank', 'Creator', 'Handle', 'Score', 'Followers', 'Brand Deals', 'Location', { label: 'Actions', align: 'right' }]}>
                {filteredLeaderboard.map((cr, i) => (
                  <tr key={cr.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <Td bold>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                      </span>
                    </Td>
                    <Td bold>{cr.name}</Td>
                    <Td><span style={{ color: T.orange, fontWeight: 700 }}>@{cr.handle}</span></Td>
                    <Td bold><span style={{ color: T.yellow }}>{cr.score || 0}</span></Td>
                    <Td>{fmtNum(cr.followers)}</Td>
                    <Td>{cr._count?.applications || 0}</Td>
                    <Td muted>{cr.city || '—'}</Td>
                    <Td right>
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                        <a href={`${FRONTEND_URL}/creator/${cr.id}`} target="_blank" rel="noopener noreferrer" style={{ padding: '5px 10px', background: T.blueLight, color: T.blue, borderRadius: 7, fontSize: 11, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <ExternalLink size={10} /> Visit
                        </a>
                        <ActionBtn small onClick={() => { setScoreModal({ creator: cr }); setScoreInput(String(cr.score || 0)); }}>
                          <Trophy size={11} /> Score
                        </ActionBtn>
                      </div>
                    </Td>
                  </tr>
                ))}
              </Table>
              {filteredLeaderboard.length === 0 && <EmptyState icon="🏆" msg="No verified creators in leaderboard yet" />}
            </div>
          )}

          {/* ══ ALL BRANDS ═════════════════════════════════════════════════ */}
          {activeTab === 'brands' && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
              <SectionHeader title="All Brands" badge={brands.length} sub="Manage brand accounts, view campaigns and suspend violators" />
              <SearchBar value={brandSearch} onChange={setBrandSearch} placeholder="Search brand name or industry..." />
              <Table cols={['Brand', 'Industry', 'Email', 'Campaigns', 'Status', { label: 'Actions', align: 'right' }]}>
                {filteredBrands.map(br => (
                  <tr key={br.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <Td bold>{br.companyName}</Td>
                    <Td>{br.industry || '—'}</Td>
                    <Td muted>{br.user?.email || '—'}</Td>
                    <Td bold>{br._count?.campaigns || 0}</Td>
                    <Td><Badge color={br.user?.isSuspended ? T.red : T.green}>{br.user?.isSuspended ? 'Suspended' : 'Active'}</Badge></Td>
                    <Td right>
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                        <a href={`${FRONTEND_URL}/brand/dashboard`} target="_blank" rel="noopener noreferrer" style={{ padding: '5px 10px', background: T.blueLight, color: T.blue, borderRadius: 7, fontSize: 11, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <ExternalLink size={10} /> Dashboard
                        </a>
                        <ActionBtn small onClick={() => { setSelectedBrand(br); setBrandDrawerOpen(true); }}><Eye size={11} /> View</ActionBtn>
                        <DangerBtn small onClick={() => handleToggleSuspension(br.user?.id, false)}>
                          {br.user?.isSuspended ? <UserCheck size={11} /> : <UserX size={11} />}
                          {br.user?.isSuspended ? 'Unban' : 'Suspend'}
                        </DangerBtn>
                      </div>
                    </Td>
                  </tr>
                ))}
              </Table>
              {filteredBrands.length === 0 && <EmptyState icon="🏢" msg="No brands match your search" />}
            </div>
          )}

          {/* ══ CAMPAIGNS ══════════════════════════════════════════════════ */}
          {activeTab === 'campaigns' && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
              <SectionHeader title="Campaign Manager" badge={campaigns.length} sub="Oversee all brand campaigns, inspect applications" />
              <SearchBar value={campaignSearch} onChange={setCampaignSearch} placeholder="Search campaign or brand..." />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {filteredCampaigns.map(c => (
                  <div key={c.id} style={{ border: `1px solid ${T.border}`, borderRadius: 14, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', cursor: 'pointer', background: expandedCampaignId === c.id ? T.orangeLight : T.card }} onClick={() => handleToggleExpand(c.id)}>
                      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flex: 1 }}>
                        <div>
                          <div style={{ fontWeight: 800, color: T.navy, fontSize: 14 }}>{c.title}</div>
                          <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>by {c.brand?.companyName || '—'} · {fmtDate(c.createdAt)}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <Badge color={STATUS_COLOR[c.status] || T.muted}>{c.status || 'ACTIVE'}</Badge>
                        {c.budget && <Badge color={T.green}>₹{fmtNum(c.budget)}</Badge>}
                        <span style={{ fontSize: 11, color: T.orange, fontWeight: 700 }}>Applications ↕</span>
                        {expandedCampaignId === c.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        <DangerBtn small onClick={(e) => { e.stopPropagation(); handleDeleteCampaign(c.id); }}><Trash2 size={11} /></DangerBtn>
                      </div>
                    </div>
                    {expandedCampaignId === c.id && (
                      <div style={{ borderTop: `1px solid ${T.border}`, padding: '16px 20px', background: T.bg }}>
                        {appsLoading ? <EmptyState icon="⏳" msg="Loading applications..." /> :
                          campaignApplications.length === 0 ? <EmptyState icon="📭" msg="No applications yet for this campaign" /> : (
                            <Table cols={['Creator', 'Pitch', 'Rating', 'Status', { label: 'Override Status', align: 'right' }]}>
                              {campaignApplications.map(app => (
                                <tr key={app.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                                  <Td bold>{app.creator?.name || '—'} <span style={{ color: T.orange }}>@{app.creator?.handle}</span></Td>
                                  <Td><span style={{ maxWidth: 200, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.pitch || '—'}</span></Td>
                                  <Td>{app.rating ? `${app.rating}/5 ★` : '—'}</Td>
                                  <Td><Badge color={STATUS_COLOR[app.status] || T.muted}>{app.status}</Badge></Td>
                                  <Td right>
                                    <div style={{ display: 'flex', gap: 5 }}>
                                      {['ACCEPTED', 'REJECTED', 'SHORTLISTED', 'PENDING'].filter(s => s !== app.status).map(s => (
                                        <ActionBtn key={s} small onClick={() => handleUpdateAppStatus(app.id, s)} color={STATUS_COLOR[s] || T.muted}>{s}</ActionBtn>
                                      ))}
                                    </div>
                                  </Td>
                                </tr>
                              ))}
                            </Table>
                          )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {filteredCampaigns.length === 0 && <EmptyState icon="🎯" msg="No campaigns found" />}
            </div>
          )}

          {/* ══ ALL APPLICATIONS ═══════════════════════════════════════════ */}
          {activeTab === 'applications' && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
              <SectionHeader title="All Campaign Applications" badge={allApplications.length} sub="Platform-wide view of all creator pitches" />
              <SearchBar value={appSearch} onChange={setAppSearch} placeholder="Search by creator, campaign, or status..." />
              <Table cols={['Creator', 'Campaign', 'Brand', 'Status', 'Rating', 'Date', { label: 'Override', align: 'right' }]}>
                {filteredApps.map(app => (
                  <tr key={app.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <Td bold>{app.creator?.name || '—'} <span style={{ color: T.orange, fontSize: 11 }}>@{app.creator?.handle}</span></Td>
                    <Td bold>{app.campaign?.title || '—'}</Td>
                    <Td muted>{app.campaign?.brand?.companyName || '—'}</Td>
                    <Td><Badge color={STATUS_COLOR[app.status] || T.muted}>{app.status}</Badge></Td>
                    <Td>{app.rating ? `${app.rating}★` : '—'}</Td>
                    <Td muted>{fmtDate(app.createdAt)}</Td>
                    <Td right>
                      <div style={{ display: 'flex', gap: 4 }}>
                        {['ACCEPTED', 'REJECTED', 'PENDING'].filter(s => s !== app.status).map(s => (
                          <ActionBtn key={s} small onClick={() => handleUpdateAppStatus(app.id, s)} color={STATUS_COLOR[s] || T.muted}>{s}</ActionBtn>
                        ))}
                      </div>
                    </Td>
                  </tr>
                ))}
              </Table>
              {filteredApps.length === 0 && <EmptyState icon="📋" msg="No applications match your search" />}
            </div>
          )}

          {/* ══ BRAND ANALYTICS ════════════════════════════════════════════ */}
          {activeTab === 'brand-analytics' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
                <StatCard label="Total Brands" value={brands.length} icon={Building2} color={T.blue} />
                <StatCard label="Total Campaigns" value={campaigns.length} icon={Target} color={T.purple} />
                <StatCard label="Total Applications" value={allApplications.length} icon={Layers} color={T.orange} />
                <StatCard label="Total Escrow" value={fmtINR(payments.reduce((s, p) => s + (p.type === 'CAMPAIGN_ESCROW' ? p.amount : 0), 0))} icon={DollarSign} color={T.green} />
              </div>
              <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
                <SectionHeader title="Brand Performance Breakdown" sub="Campaign counts, applications received, and budget spent per brand" />
                <SearchBar value={brandAnalyticSearch} onChange={setBrandAnalyticSearch} placeholder="Search brand..." />
                <Table cols={['Brand', 'Industry', 'Total Campaigns', 'Applications', 'Budget Spent', 'Status', { label: 'Actions', align: 'right' }]}>
                  {filteredBrandAnalytics.map(b => (
                    <tr key={b.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                      <Td bold>{b.companyName}</Td>
                      <Td muted>{b.industry || '—'}</Td>
                      <Td bold>{b.totalCampaigns}</Td>
                      <Td>{b.totalApplications}</Td>
                      <Td bold><span style={{ color: T.green }}>{fmtINR(b.totalBudgetSpent)}</span></Td>
                      <Td><Badge color={b.isSuspended ? T.red : T.green}>{b.isSuspended ? 'Suspended' : 'Active'}</Badge></Td>
                      <Td right>
                        <ActionBtn small onClick={() => { setActiveTab('campaigns'); setCampaignSearch(b.companyName); }}><Target size={11} /> Campaigns</ActionBtn>
                      </Td>
                    </tr>
                  ))}
                </Table>
              </div>
            </div>
          )}

          {/* ══ PAYMENTS & ESCROW ══════════════════════════════════════════ */}
          {activeTab === 'escrows' && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
              <SectionHeader title="Payments & Escrow" badge={payments.length} sub="Override campaign escrow releases and refunds" />
              <SearchBar value={paymentSearch} onChange={setPaymentSearch} placeholder="Search by type, ID, or status..." />
              <Table cols={['Order ID', 'Brand', 'Amount', 'Type', 'Status', 'Date', { label: 'Override', align: 'right' }]}>
                {filteredPayments.map(p => (
                  <tr key={p.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <Td muted><code style={{ fontSize: 11 }}>{p.razorpayOrderId?.slice(0, 18) || p.id?.slice(0, 12)}…</code></Td>
                    <Td bold>{p.brand?.companyName || '—'}</Td>
                    <Td bold><span style={{ color: T.green }}>{fmtINR(p.amount)}</span></Td>
                    <Td><Badge color={T.blue}>{p.type}</Badge></Td>
                    <Td><Badge color={STATUS_COLOR[p.status] || T.muted}>{p.status}</Badge></Td>
                    <Td muted>{fmtDate(p.createdAt)}</Td>
                    <Td right>
                      {p.type === 'CAMPAIGN_ESCROW' && p.status === 'PAID' && (
                        <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                          <ActionBtn small onClick={() => handlePaymentOverride(p.id, 'RELEASE')} color={T.green}>Release</ActionBtn>
                          <ActionBtn small onClick={() => handlePaymentOverride(p.id, 'REFUND')} color={T.yellow}>Refund</ActionBtn>
                        </div>
                      )}
                    </Td>
                  </tr>
                ))}
              </Table>
              {filteredPayments.length === 0 && <EmptyState icon="💳" msg="No payments match your search" />}
            </div>
          )}

          {/* ══ BLOGS ══════════════════════════════════════════════════════ */}
          {activeTab === 'blogs' && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
              <SectionHeader title="Blog Manager" badge={blogs.length} sub="Create, edit, and publish blog articles"
                action={<button onClick={() => { clearBlogForm(); setEditingBlog(null); setBlogModalOpen(true); }} style={{ padding: '8px 18px', background: T.orange, color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>+ New Article</button>}
              />
              <SearchBar value={blogSearch} onChange={setBlogSearch} placeholder="Search blog title, category..." />
              <Table cols={['Title', 'Category', 'Author', 'Status', 'Comments', 'Date', { label: 'Actions', align: 'right' }]}>
                {filteredBlogs.map(b => (
                  <tr key={b.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <Td bold><span style={{ maxWidth: 200, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</span></Td>
                    <Td><Badge color={T.purple}>{b.category}</Badge></Td>
                    <Td muted>{b.author}</Td>
                    <Td><Badge color={b.published ? T.green : T.muted}>{b.published ? 'Published' : 'Draft'}</Badge></Td>
                    <Td>{b._count?.comments || 0}</Td>
                    <Td muted>{fmtDate(b.createdAt)}</Td>
                    <Td right>
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                        <a href={`${FRONTEND_URL}/blog/${b.slug}`} target="_blank" rel="noopener noreferrer" style={{ padding: '5px 10px', background: T.blueLight, color: T.blue, borderRadius: 7, fontSize: 11, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <ExternalLink size={10} />
                        </a>
                        <ActionBtn small onClick={() => openEditBlog(b)}>✎ Edit</ActionBtn>
                        <DangerBtn small onClick={() => handleDeleteBlog(b.id)}><Trash2 size={11} /></DangerBtn>
                      </div>
                    </Td>
                  </tr>
                ))}
              </Table>
              {filteredBlogs.length === 0 && <EmptyState icon="📝" msg="No blog articles found" />}
            </div>
          )}

          {/* ══ COMMENTS ═══════════════════════════════════════════════════ */}
          {activeTab === 'comments' && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
              <SectionHeader title="Comment Moderation" badge={comments.length} sub="Remove spam or offensive blog comments" />
              <SearchBar value={commentSearch} onChange={setCommentSearch} placeholder="Search comment content or author..." />
              <Table cols={['Blog', 'Author', 'Comment', 'Date', { label: 'Action', align: 'right' }]}>
                {filteredComments.map(c => (
                  <tr key={c.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <Td bold><span style={{ maxWidth: 140, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.blog?.title || '—'}</span></Td>
                    <Td>{c.authorName || 'Anonymous'}</Td>
                    <Td><span style={{ maxWidth: 240, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.content}</span></Td>
                    <Td muted>{fmtDate(c.createdAt)}</Td>
                    <Td right><DangerBtn small onClick={() => handleDeleteComment(c.id)}><Trash2 size={11} /> Delete</DangerBtn></Td>
                  </tr>
                ))}
              </Table>
              {filteredComments.length === 0 && <EmptyState icon="💬" msg="No comments found" />}
            </div>
          )}

          {/* ══ NEWSLETTERS ════════════════════════════════════════════════ */}
          {activeTab === 'newsletters' && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
              <SectionHeader title="Newsletter Subscribers" badge={newsletters.length} sub="Manage email list subscribers" />
              <SearchBar value={newsletterSearch} onChange={setNewsletterSearch} placeholder="Search email..." />
              <Table cols={['Email', 'Subscribed On', { label: 'Action', align: 'right' }]}>
                {filteredNewsletters.map(n => (
                  <tr key={n.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <Td bold>{n.email}</Td>
                    <Td muted>{fmtDate(n.createdAt)}</Td>
                    <Td right><DangerBtn small onClick={() => handleDeleteSubscriber(n.id)}><Trash2 size={11} /> Remove</DangerBtn></Td>
                  </tr>
                ))}
              </Table>
              {filteredNewsletters.length === 0 && <EmptyState icon="📧" msg="No subscribers found" />}
            </div>
          )}

          {/* ══ CONTACTS ═══════════════════════════════════════════════════ */}
          {activeTab === 'contacts' && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
              <SectionHeader title="Contact Inbox" badge={counts.unreadContacts} sub={`${counts.unreadContacts} unread · ${contacts.length} total messages`} />
              <SearchBar value={contactSearch} onChange={setContactSearch} placeholder="Search by name, email or message..." />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {filteredContacts.map(c => (
                  <div key={c.id} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '16px 20px', background: c.read ? T.bg : T.orangeLight, border: `1px solid ${c.read ? T.border : T.orangeBorder}`, borderRadius: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: T.orange + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mail size={18} style={{ color: T.orange }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4 }}>
                        <span style={{ fontWeight: 800, color: T.navy, fontSize: 14 }}>{c.name || 'Unknown'}</span>
                        <span style={{ fontSize: 12, color: T.muted }}>{c.email}</span>
                        {!c.read && <Badge color={T.orange}>UNREAD</Badge>}
                        <span style={{ fontSize: 11, color: T.muted, marginLeft: 'auto' }}>{fmtDate(c.createdAt)}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: 13, color: T.slate, lineHeight: 1.6 }}>{c.message}</p>
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                      <ActionBtn small onClick={() => handleToggleContactRead(c.id)}>{c.read ? 'Mark Unread' : 'Mark Read'}</ActionBtn>
                      <DangerBtn small onClick={() => handleDeleteContact(c.id)}><Trash2 size={11} /></DangerBtn>
                    </div>
                  </div>
                ))}
              </div>
              {filteredContacts.length === 0 && <EmptyState icon="📬" msg="No messages found" />}
            </div>
          )}

          {/* ══ SETTINGS ═══════════════════════════════════════════════════ */}
          {activeTab === 'settings' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
                <SectionHeader title="Platform Settings" sub="Configure global platform behavior" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  {[
                    { label: 'Platform Commission Fee (%)', value: platformFee, setter: setPlatformFee, type: 'number' },
                    { label: 'Support Email', value: supportEmail, setter: setSupportEmail, type: 'email' },
                  ].map((field, i) => (
                    <div key={i}>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>{field.label}</label>
                      <input type={field.type} value={field.value} onChange={e => field.setter(e.target.value)} style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.bg, outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <h4 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 800, color: T.navy }}>Feature Flags</h4>
                  {[
                    { label: 'Creator Achievements System', value: featAchievements, setter: setFeatAchievements },
                    { label: 'Community Forum', value: featCommunity, setter: setFeatCommunity },
                    { label: 'Creator Wallet & Payouts', value: featWallet, setter: setFeatWallet },
                    { label: 'Maintenance Mode', value: maintenanceMode, setter: setMaintenanceMode },
                  ].map((flag, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 12 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>{flag.label}</span>
                      <div onClick={() => flag.setter(!flag.value)} style={{ width: 48, height: 26, borderRadius: 13, background: flag.value ? T.green : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: flag.value ? 25 : 3, transition: 'left 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => toast('Settings saved! (Frontend-only demo)', 'success')} style={{ marginTop: 20, padding: '12px 28px', background: T.orange, color: '#fff', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 14, cursor: 'pointer', boxShadow: `0 4px 14px ${T.orange}30` }}>
                  Save Settings
                </button>
              </div>
            </div>
          )}

          {/* ══ DANGER ZONE ════════════════════════════════════════════════ */}
          {activeTab === 'danger' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ padding: 20, background: '#fef2f2', border: `1px solid ${T.red}25`, borderRadius: 16 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                  <ShieldAlert size={22} style={{ color: T.red }} />
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 900, color: T.red }}>⚠️ Danger Zone</h3>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: '#7f1d1d', fontWeight: 600 }}>These operations are irreversible. Proceed only if you know what you are doing.</p>
              </div>
              {[
                { title: 'Clear All Newsletter Subscribers', desc: 'Permanently remove all email subscribers from the mailing list', action: 'Clear Subscribers', color: T.orange },
                { title: 'Delete All Draft Blogs', desc: 'Remove all unpublished blog drafts from the system', action: 'Delete Drafts', color: T.red },
                { title: 'Revoke All Pending Verifications', desc: 'Reset the entire verification queue — creators must re-submit', action: 'Revoke All KYC', color: T.red },
              ].map((op, i) => (
                <div key={i} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
                  <div>
                    <div style={{ fontWeight: 800, color: T.navy, fontSize: 14, marginBottom: 4 }}>{op.title}</div>
                    <div style={{ fontSize: 13, color: T.muted, fontWeight: 500 }}>{op.desc}</div>
                  </div>
                  <button onClick={() => { if (window.confirm(`Are you absolutely sure? This cannot be undone.`)) toast('Operation executed (demo mode)', 'info'); }} style={{ padding: '9px 20px', background: op.color + '15', color: op.color, border: `1px solid ${op.color}30`, borderRadius: 10, fontWeight: 800, fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    {op.action}
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      {/* ══ KYC DRAWER ═══════════════════════════════════════════════════════ */}
      {drawerOpen && selectedCreator && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
          <div onClick={() => { setDrawerOpen(false); setShowRejectForm(false); setRejectionReason(''); }} style={{ flex: 1, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)' }} />
          <div style={{ width: 420, background: T.card, display: 'flex', flexDirection: 'column', boxShadow: '-20px 0 60px rgba(0,0,0,0.12)', overflowY: 'auto' }}>
            {/* Drawer Header */}
            <div style={{ padding: '24px 28px', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 900, color: T.navy }}>KYC Audit: {selectedCreator.name}</h3>
                <p style={{ margin: 0, fontSize: 12, color: T.muted }}>@{selectedCreator.handle}</p>
              </div>
              <button onClick={() => { setDrawerOpen(false); setShowRejectForm(false); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.muted }}><X size={20} /></button>
            </div>

            {/* Creator Info */}
            <div style={{ padding: '24px 28px', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { label: 'Full Name', value: selectedCreator.name },
                  { label: 'Handle', value: `@${selectedCreator.handle}` },
                  { label: 'Email', value: selectedCreator.user?.email || '—' },
                  { label: 'Phone', value: selectedCreator.user?.phone || '—' },
                  { label: 'City / State', value: `${selectedCreator.city || '—'}, ${selectedCreator.state || '—'}` },
                  { label: 'Followers', value: fmtNum(selectedCreator.followers) },
                  { label: 'Niche', value: (selectedCreator.niche || []).join(', ') || '—' },
                  { label: 'Bio', value: selectedCreator.bio || '—' },
                ].map((f, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: T.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>{f.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>{f.value}</div>
                  </div>
                ))}

                {/* Document Links */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
                  {[
                    { label: 'Aadhaar', url: selectedCreator.aadhaarUrl },
                    { label: 'PAN Card', url: selectedCreator.panUrl }
                  ].map((doc, i) => (
                    <a key={i} href={doc.url || '#'} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: doc.url ? T.greenLight : T.redLight, border: `1px solid ${doc.url ? T.green : T.red}25`, borderRadius: 10, textDecoration: 'none', color: doc.url ? T.green : T.red, fontSize: 12, fontWeight: 800 }}>
                      {doc.url ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                      {doc.label}
                    </a>
                  ))}
                </div>
                <a href={`${FRONTEND_URL}/creator/${selectedCreator.id}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: T.blueLight, border: `1px solid ${T.blue}25`, borderRadius: 10, textDecoration: 'none', color: T.blue, fontSize: 12, fontWeight: 800 }}>
                  <ExternalLink size={14} /> View Live Profile on Frontend
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ padding: '20px 28px', borderTop: `1px solid ${T.border}`, background: T.bg }}>
              {showRejectForm ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <label style={{ fontSize: 11, fontWeight: 800, color: T.slate, textTransform: 'uppercase' }}>Rejection Reason</label>
                  <textarea value={rejectionReason} onChange={e => setRejectionReason(e.target.value)} placeholder="e.g. Documents are blurry, name mismatch on ID..." rows={3} style={{ width: '100%', padding: '10px 12px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, resize: 'none', outline: 'none', boxSizing: 'border-box' }} />
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={() => { handleRejectVerification(selectedCreator.id, rejectionReason || 'Documents invalid. Please re-upload.'); }} style={{ flex: 1, padding: '11px', background: T.red, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>Send Rejection</button>
                    <button onClick={() => { setShowRejectForm(false); setRejectionReason(''); }} style={{ padding: '11px 16px', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer', color: T.slate }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={() => handleApproveVerification(selectedCreator.id)} style={{ flex: 1, padding: '11px', background: T.green, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 800, fontSize: 13, cursor: 'pointer', boxShadow: `0 4px 12px ${T.green}30` }}>✓ Approve Verification</button>
                    <button onClick={() => setShowRejectForm(true)} style={{ flex: 1, padding: '11px', background: T.orange, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>✗ Reject KYC</button>
                  </div>
                  <button onClick={() => handleToggleSuspension(selectedCreator.user?.id)} style={{ width: '100%', padding: '10px', background: T.redLight, color: T.red, border: `1px solid ${T.red}25`, borderRadius: 10, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
                    {selectedCreator.user?.isSuspended ? '↑ Unsuspend Account' : '⛔ Suspend / Ban Account'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══ BRAND DRAWER ═══════════════════════════════════════════════════ */}
      {brandDrawerOpen && selectedBrand && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
          <div onClick={() => setBrandDrawerOpen(false)} style={{ flex: 1, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)' }} />
          <div style={{ width: 420, background: T.card, display: 'flex', flexDirection: 'column', boxShadow: '-20px 0 60px rgba(0,0,0,0.12)', overflowY: 'auto' }}>
            <div style={{ padding: '24px 28px', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 900, color: T.navy }}>{selectedBrand.companyName}</h3>
                <p style={{ margin: 0, fontSize: 12, color: T.muted }}>{selectedBrand.industry || 'Brand Account'}</p>
              </div>
              <button onClick={() => setBrandDrawerOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.muted }}><X size={20} /></button>
            </div>
            <div style={{ padding: '24px 28px', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { label: 'Company', value: selectedBrand.companyName },
                  { label: 'Industry', value: selectedBrand.industry || '—' },
                  { label: 'Email', value: selectedBrand.user?.email || '—' },
                  { label: 'Website', value: selectedBrand.website || '—' },
                  { label: 'Campaigns', value: selectedBrand._count?.campaigns || 0 },
                  { label: 'Status', value: selectedBrand.user?.isSuspended ? '⛔ Suspended' : '✓ Active' },
                  { label: 'Registered', value: fmtDate(selectedBrand.createdAt) },
                ].map((f, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: T.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>{f.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>{f.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: '20px 28px', borderTop: `1px solid ${T.border}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={() => { setActiveTab('campaigns'); setCampaignSearch(selectedBrand.companyName); setBrandDrawerOpen(false); }} style={{ padding: '11px', background: T.purpleLight, color: T.purple, border: 'none', borderRadius: 10, fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>View Campaigns</button>
              <button onClick={() => handleToggleSuspension(selectedBrand.user?.id)} style={{ padding: '11px', background: T.redLight, color: T.red, border: `1px solid ${T.red}25`, borderRadius: 10, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
                {selectedBrand.user?.isSuspended ? '↑ Unsuspend Brand' : '⛔ Suspend Brand Account'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ SCORE ADJUSTMENT MODAL ═════════════════════════════════════════ */}
      {scoreModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(6px)' }}>
          <div style={{ width: 420, background: T.card, borderRadius: 24, padding: 32, boxShadow: '0 30px 80px rgba(0,0,0,0.15)' }}>
            <h3 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 900, color: T.navy }}>Adjust Creator Score</h3>
            <p style={{ margin: '0 0 24px', fontSize: 13, color: T.muted }}>Creator: <strong>{scoreModal.creator.name}</strong> (@{scoreModal.creator.handle})</p>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>New Score (0 - 1000)</label>
              <input type="number" min="0" max="1000" value={scoreInput} onChange={e => setScoreInput(e.target.value)} style={{ width: '100%', padding: '12px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 16, fontWeight: 800, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Reason (Optional)</label>
              <input type="text" value={scoreReason} onChange={e => setScoreReason(e.target.value)} placeholder="e.g. Bonus for viral campaign performance..." style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={handleAdjustScore} style={{ flex: 1, padding: '12px', background: T.orange, color: '#fff', border: 'none', borderRadius: 11, fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>Update Score</button>
              <button onClick={() => { setScoreModal(null); setScoreInput(''); setScoreReason(''); }} style={{ padding: '12px 20px', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 11, fontWeight: 700, fontSize: 13, cursor: 'pointer', color: T.slate }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ══ BLOG EDITOR MODAL ══════════════════════════════════════════════ */}
      {blogModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(6px)', overflowY: 'auto', padding: '40px 20px' }}>
          <div style={{ width: '100%', maxWidth: 700, background: T.card, borderRadius: 24, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.15)' }}>
            <div style={{ padding: '24px 28px', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 900, color: T.navy }}>{editingBlog ? 'Edit Blog Article' : 'Create New Blog Article'}</h3>
              <button onClick={() => { setBlogModalOpen(false); setEditingBlog(null); clearBlogForm(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.muted }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveBlog} style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'Title', value: blogTitle, setter: setBlogTitle, placeholder: 'Article title...' },
                { label: 'URL Slug', value: blogSlug, setter: setBlogSlug, placeholder: 'url-slug-here' },
                { label: 'Author', value: blogAuthor, setter: setBlogAuthor, placeholder: 'Author name' },
                { label: 'Image URL', value: blogImage, setter: setBlogImage, placeholder: 'https://...' },
                { label: 'Tags (comma separated)', value: blogTags, setter: setBlogTags, placeholder: 'tag1, tag2, tag3' },
              ].map((f, i) => (
                <div key={i}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>{f.label}</label>
                  <input value={f.value} onChange={e => f.setter(e.target.value)} placeholder={f.placeholder} style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Category</label>
                <select value={blogCategory} onChange={e => setBlogCategory(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, background: T.card, outline: 'none' }}>
                  {['Marketing', 'Creator Economy', 'Brand Strategy', 'Platform Updates', 'Tips & Tricks', 'Success Stories'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Excerpt</label>
                <textarea value={blogExcerpt} onChange={e => setBlogExcerpt(e.target.value)} rows={2} placeholder="Short description..." style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, resize: 'none', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Body Content (HTML or Markdown)</label>
                <textarea value={blogBody} onChange={e => setBlogBody(e.target.value)} rows={10} placeholder="<h2>Section Title</h2><p>Content...</p>" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 12, color: T.navy, resize: 'vertical', outline: 'none', fontFamily: 'monospace', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', gap: 20 }}>
                {[
                  { label: 'Featured Article', value: blogFeatured, setter: setBlogFeatured },
                  { label: 'Published', value: blogPublished, setter: setBlogPublished },
                ].map((toggle, i) => (
                  <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 13, fontWeight: 700, color: T.navy }}>
                    <input type="checkbox" checked={toggle.value} onChange={e => toggle.setter(e.target.checked)} style={{ width: 16, height: 16, cursor: 'pointer' }} />
                    {toggle.label}
                  </label>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                <button type="submit" style={{ flex: 1, padding: '12px', background: T.orange, color: '#fff', border: 'none', borderRadius: 11, fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>
                  {editingBlog ? 'Update Article' : 'Publish Article'}
                </button>
                <button type="button" onClick={() => { setBlogModalOpen(false); setEditingBlog(null); clearBlogForm(); }} style={{ padding: '12px 20px', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 11, fontWeight: 700, fontSize: 13, cursor: 'pointer', color: T.slate }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSS for spin animation */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        * { box-sizing: border-box; }
        body { margin: 0; }
        tr:hover { background: rgba(248, 250, 252, 0.8); }
      `}</style>
    </div>
  );
}
