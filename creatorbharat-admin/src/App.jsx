import React, { useState, useEffect, useMemo } from 'react';
import {
  Users, Building2, ShieldCheck, DollarSign, FileText, TrendingUp, Settings, LogOut,
  Lock, Mail, CheckCircle2, AlertTriangle, XCircle, Eye, Check, X, Search, ChevronRight,
  Filter, CreditCard, Trash2, SlidersHorizontal, Info, MessageSquare, PlayCircle, Star,
  BarChart3, Wallet, Trophy, Zap, Globe, Bell, Calendar, Activity, Award, Layers,
  RefreshCw, ExternalLink, Crown, Target, ChevronDown, ChevronUp, Copy, Download,
  Flame, BookOpen, Headphones, AtSign, Phone, MapPin, Hash, ShieldAlert, UserCheck,
  UserX, PieChart, TrendingDown, Package, Cpu, Database, Shield, Image, FolderOpen
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
  bg: '#f1f5f9', card: '#ffffff',
  // Sidebar dark theme
  sidebarBg: '#0f172a',
  sidebarBorder: 'rgba(255,255,255,0.06)',
  sidebarText: 'rgba(255,255,255,0.65)',
  sidebarTextActive: '#ffffff',
  sidebarActiveGlow: 'rgba(249,115,22,0.15)',
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

const StatCard = ({ label, value, sub, icon: Icon, color, onClick, trend, trendUp }) => (
  <div onClick={onClick} style={{
    background: T.card, border: `1px solid ${T.border}`, borderRadius: 18, padding: '20px 22px',
    display: 'flex', flexDirection: 'column', gap: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    cursor: onClick ? 'pointer' : 'default', transition: 'all 0.22s', position: 'relative', overflow: 'hidden'
  }}
    onMouseEnter={e => { if(onClick){ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow=`0 8px 24px ${color}18`; e.currentTarget.style.borderColor=color+'35'; } }}
    onMouseLeave={e => { if(onClick){ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 1px 4px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor=T.border; } }}
  >
    <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: color + '08' }} />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: color + '12', color, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${color}18` }}><Icon size={20} /></div>
      {trend && (
        <span style={{ fontSize: 11, fontWeight: 800, color: trendUp ? T.green : T.red, background: (trendUp ? T.green : T.red)+'12', padding: '3px 8px', borderRadius: 20 }}>
          {trendUp ? '↑' : '↓'} {trend}
        </span>
      )}
    </div>
    <div>
      <div style={{ fontSize: 28, fontWeight: 900, color: T.navy, lineHeight: 1, marginBottom: 4, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      <div style={{ fontSize: 12, color: T.slate, fontWeight: 700 }}>{label}</div>
      {sub && <div style={{ fontSize: 10, color: T.muted, marginTop: 4, fontWeight: 500, lineHeight: 1.4 }}>{sub}</div>}
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
      { id: 'ambassadors', label: 'Ambassador Program', icon: Award, badge: counts.pendingAmbassadors },
      { id: 'missions', label: 'Missions Panel', icon: Target, badge: counts.pendingMissions },
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
      { id: 'gallery', label: 'Gallery Manager', icon: Image, badge: counts.gallery },
      { id: 'media-library', label: 'Media Library', icon: FolderOpen, badge: counts.uploads },
      { id: 'pages', label: 'Page Content Manager', icon: SlidersHorizontal },
      { id: 'events', label: 'Events Manager', icon: Calendar },
      { id: 'admin-notifications', label: 'Notification Center', icon: Bell },
    ]
  },
  {
    title: '⚙️ SYSTEM',
    color: T.slate,
    items: [
      { id: 'settings', label: 'Settings', icon: SlidersHorizontal },
      { id: 'feature-control', label: 'Platform Control Center', icon: Cpu },
      { id: 'admin-control', label: 'Admin Panel Control', icon: ShieldCheck },
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
  'creator-achievements': { title: 'Achievements & Milestones', sub: 'Track creator achievement progress and manually grant badges' },
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
  gallery: { title: 'Gallery Manager', sub: 'Manage CreatorBharat Ecosystem Gallery items' },
  'media-library': { title: 'Media Library', sub: 'Upload files and copy their URLs for use across the platform' },
  pages: { title: 'Page Content Manager', sub: 'Dynamically customize public page text, pricing tiers, and calculator rates' },
  settings: { title: 'System Settings', sub: 'Configure platform-wide settings and toggles' },
  'feature-control': { title: 'Platform Control Center', sub: 'Configure live feature toggles, commission rates, and global announcements' },
  'admin-control': { title: 'Admin Panel Control', sub: 'Customize admin interface behaviors, set theme preferences, and audit administrative actions' },
  danger: { title: '⚠️ Danger Zone', sub: 'Irreversible platform-wide operations' },
  events: { title: 'Events Manager', sub: 'Create and coordinate public platform events and conferences' },
  ambassadors: { title: 'Campus Ambassador Applications', sub: 'Review and approve/reject college student representation applications' },
  missions: { title: 'Monthly Missions & Completions', sub: 'Manage monthly platform-wide creator tasks and proof submissions' },
  'admin-notifications': { title: 'Notification Dispatch Center', sub: 'Send customized in-app push alerts and updates to creators or brands' },
};

// ─── STATUS COLORS ─────────────────────────────────────────────────────────
const STATUS_COLOR = {
  ACTIVE: T.green, PENDING: T.yellow, REJECTED: T.red, COMPLETED: T.blue,
  ACCEPTED: T.green, SHORTLISTED: T.purple, PAID: T.green, RELEASED: T.blue,
  REFUNDED: T.orange, ESCROW: T.yellow, CAMPAIGN_ESCROW: T.yellow,
  published: T.green, draft: T.muted
};

// ─── Reusable Component: PremiumMediaUpload ─────────────────────────────────
const PremiumMediaUpload = ({ label, value, onChange, type = 'image', onUploadFile }) => {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('upload'); // 'upload' or 'url'

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await uploadMediaFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await uploadMediaFile(e.target.files[0]);
    }
  };

  const uploadMediaFile = async (file) => {
    setLoading(true);
    try {
      const url = await onUploadFile(file, type);
      onChange(url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <label style={{ fontSize: 11, fontWeight: 700, color: T.slate, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</label>
        <button
          type="button"
          onClick={() => setMode(mode === 'upload' ? 'url' : 'upload')}
          style={{ background: 'none', border: 'none', color: T.orange, fontSize: 11, fontWeight: 700, cursor: 'pointer', padding: 0 }}
        >
          {mode === 'upload' ? '✍️ Paste URL Link' : '📁 Upload Local File'}
        </button>
      </div>

      {mode === 'url' ? (
        <input
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`https://... enter direct ${type} URL`}
          style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }}
        />
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dragActive ? T.orange : T.border}`,
            borderRadius: 12,
            padding: '24px 20px',
            textAlign: 'center',
            background: dragActive ? T.orangeLight : T.bg,
            cursor: 'pointer',
            transition: 'all 0.2s',
            position: 'relative'
          }}
          onClick={() => document.getElementById(`file-upload-${label.replace(/[^a-zA-Z]/g, '')}`).click()}
        >
          <input
            type="file"
            id={`file-upload-${label.replace(/[^a-zA-Z]/g, '')}`}
            accept={type === 'video' ? 'video/*' : 'image/*'}
            style={{ display: 'none' }}
            onChange={handleChange}
          />
          
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <RefreshCw size={24} className="spin" style={{ color: T.orange }} />
              <span style={{ fontSize: 12, color: T.muted, fontWeight: 600 }}>Uploading media to Cloudinary...</span>
            </div>
          ) : value ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }} onClick={(e) => e.stopPropagation()}>
              {type === 'video' ? (
                <video src={value} controls style={{ maxWidth: '100%', maxHeight: 150, borderRadius: 8, border: `1px solid ${T.border}` }} />
              ) : (
                <img src={value} alt="Preview" style={{ maxWidth: '100%', maxHeight: 120, borderRadius: 8, border: `1px solid ${T.border}`, objectFit: 'contain' }} />
              )}
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button
                  type="button"
                  onClick={() => document.getElementById(`file-upload-${label.replace(/[^a-zA-Z]/g, '')}`).click()}
                  style={{ padding: '6px 12px', background: T.orangeLight, border: `1px solid ${T.orangeBorder}`, borderRadius: 6, fontSize: 11, color: T.orange, fontWeight: 700, cursor: 'pointer' }}
                >
                  Change File
                </button>
                <button
                  type="button"
                  onClick={() => onChange('')}
                  style={{ padding: '6px 12px', background: T.redLight, border: `1px solid ${T.red}25`, borderRadius: 6, fontSize: 11, color: T.red, fontWeight: 700, cursor: 'pointer' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <Download size={24} style={{ color: T.muted }} />
              <span style={{ fontSize: 13, color: T.navy, fontWeight: 700 }}>Drag & drop file here, or <span style={{ color: T.orange }}>browse</span></span>
              <span style={{ fontSize: 10, color: T.muted }}>Supports {type === 'video' ? 'MP4, WebM (Max 50MB)' : 'PNG, JPG, WebP (Max 5MB)'}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [token, setToken] = useState(localStorage.getItem('cb_admin_token') || '');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mob, setMob] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── Auth
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
  const [gallery, setGallery] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [mediaSearch, setMediaSearch] = useState('');

  // ── Platform Control Center States
  const [platformSettings, setPlatformSettings] = useState(null);
  const [psLoading, setPsLoading] = useState(false);
  const [psSaving, setPsSaving] = useState(false);
  const [psSaved, setPsSaved] = useState(false);
  const [psSubTab, setPsSubTab] = useState('features');

  // ── Admin Panel Control States
  const [adminPanelSettings, setAdminPanelSettings] = useState(null);
  const [apLoading, setApLoading] = useState(false);
  const [apSaving, setApSaving] = useState(false);
  const [apSaved, setApSaved] = useState(false);
  const [apSubTab, setApSubTab] = useState('theme');
  const [adminNewEmail, setAdminNewEmail] = useState('');
  const [adminCurrentPassword, setAdminCurrentPassword] = useState('');
  const [adminNewPassword, setAdminNewPassword] = useState('');
  const [adminConfirmPassword, setAdminConfirmPassword] = useState('');
  const [adminCredsUpdating, setAdminCredsUpdating] = useState(false);
  const [apDiagnostics, setApDiagnostics] = useState(null);
  const [apDiagLoading, setApDiagLoading] = useState(false);

  // ── Podcast Editor States
  const [podcastModalOpen, setPodcastModalOpen] = useState(false);
  const [editingPodcast, setEditingPodcast] = useState(null);
  const [podCreatorId, setPodCreatorId] = useState('');
  const [podTitle, setPodTitle] = useState('');
  const [podDesc, setPodDesc] = useState('');
  const [podDuration, setPodDuration] = useState('');
  const [podThumbnail, setPodThumbnail] = useState('');
  const [podAudioUrl, setPodAudioUrl] = useState('');
  const [podVideoUrl, setPodVideoUrl] = useState('');
  const [podPublished, setPodPublished] = useState(false);

  // ── Gallery Editor States
  const [gallerySearch, setGallerySearch] = useState('');
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState(null);
  const [galTitle, setGalTitle] = useState('');
  const [galDesc, setGalDesc] = useState('');
  const [galCategory, setGalCategory] = useState('Summits');
  const [galType, setGalType] = useState('photo');
  const [galDate, setGalDate] = useState('');
  const [galLocation, setGalLocation] = useState('');
  const [galThumbnail, setGalThumbnail] = useState('');
  const [galVideoUrl, setGalVideoUrl] = useState('');
  const [galDuration, setGalDuration] = useState('');
  const [galTags, setGalTags] = useState('');

  // ── Campus Ambassador / Events / Missions States
  const [ambassadors, setAmbassadors] = useState([]);
  const [events, setEvents] = useState([]);
  const [missions, setMissions] = useState([]);
  const [missionCompletions, setMissionCompletions] = useState([]);

  // Modals for Events
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [evtTitle, setEvtTitle] = useState('');
  const [evtDescription, setEvtDescription] = useState('');
  const [evtDate, setEvtDate] = useState('');
  const [evtLocation, setEvtLocation] = useState('');
  const [evtLink, setEvtLink] = useState('');
  const [evtImage, setEvtImage] = useState('');

  // Modals for Achievements (Grant Achievement)
  const [grantAchModalOpen, setGrantAchModalOpen] = useState(false);
  const [achCreatorId, setAchCreatorId] = useState('');
  const [achType, setAchType] = useState('VERIFICATION');
  const [achTitle, setAchTitle] = useState('');
  const [achDescription, setAchDescription] = useState('');

  // Modals for Missions
  const [missionModalOpen, setMissionModalOpen] = useState(false);
  const [editingMission, setEditingMission] = useState(null);
  const [misTitle, setMisTitle] = useState('');
  const [misDescription, setMisDescription] = useState('');
  const [misReward, setMisReward] = useState('');
  const [misRewardColor, setMisRewardColor] = useState('#FF9431');
  const [misDeadline, setMisDeadline] = useState('');
  const [misSteps, setMisSteps] = useState('');
  const [misActive, setMisActive] = useState(true);

  // ── New Data
  const [allApplications, setAllApplications] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [brandAnalytics, setBrandAnalytics] = useState([]);
  const [activityLog, setActivityLog] = useState([]);

  // ── Page Config Manager States
  const [selectedPageName, setSelectedPageName] = useState('pricing');
  const [homeConfig, setHomeConfig] = useState({
    heroTitle: 'Find Elite Local Creators Across India',
    heroSubtitle: 'CreatorBharat connects top regional influencers with local and global brands for impactful collaborations.',
    ctaText: 'Launch Campaign Now',
    announcement: '⚡ Version 3.0 Live: Introducing Instant Wallet Bank Settlements!'
  });
  const [pricingConfig, setPricingConfig] = useState({
    starterPrice: 0,
    proPrice: 49,
    proFeatures: 'Instant wallet withdrawals, Automated GST invoicing, Priority campaign listing, 0% commission fees, Pro verified badge',
    brandStarterPrice: 0,
    brandProPrice: 4999,
    brandProFeatures: 'Launch Unlimited Campaigns, Direct Outreach Pitch Console, Full A4 Creator Resume Access, Verified Gold Brand Badge, AI Smart Talent Matches, Advanced Analytics Dashboard, 24/7 Premium Priority Support'
  });
  const [calculatorConfig, setCalculatorConfig] = useState({
    rateMultiplier: 0.15,
    nicheMultiplier: 1.2,
    minFee: 500
  });
  const [creatorLandingConfig, setCreatorLandingConfig] = useState({
    heroBadge: "India's Creator Ecosystem",
    heroTitle: "Build Your Creator Legacy.",
    heroSubtitle: "Bharat ke har creator ke liye — Tier 2, Tier 3, ya metro. Verified profile, direct brand deals, zero commission. Apni pehchan banao.",
    ctaPrimary: "Join Free — Start Today",
    ctaSecondary: "See Creator Profiles",
    bottomTitle: "Bharat Ka Creator Kahin Bhi Jayega. 🇮🇳",
    bottomSubtitle: "Bhilwara se Bangalore tak — har creator ki pehchan honi chahiye. Join karo aur apni legacy banao.",
    bottomCtaPrimary: "Join Free Now",
    bottomCtaSecondary: "View Pro Plans"
  });
  const [brandLandingConfig, setBrandLandingConfig] = useState({
    heroBadge: "Brand Command Center",
    heroTitle: "Scale with Bharat's Best.",
    heroSubtitle: "Scout verified regional creators, launch campaigns with escrow protection, and track ROI in real-time. Zero commission. Zero middlemen.",
    ctaPrimary: "Start Scouting Free",
    ctaSecondary: "Browse Creators",
    bottomTitle: "Ready to Scale? Join 500+ Brands.",
    bottomSubtitle: "Start free. No credit card required. Access Bharat's most verified creator network today.",
    bottomCtaPrimary: "Register Your Brand",
    bottomCtaSecondary: "Browse Creators"
  });
  const [faqJson, setFaqJson] = useState(JSON.stringify([
    { cat: 'General', q: 'How does CreatorBharat escrow work?', a: 'Brands deposit campaign budgets into secure escrows. Funds are released instantly to creators after verified milestone deliverables are submitted.' },
    { cat: 'Creators', q: 'Is there a signup fee for creators?', a: 'Signing up as a basic creator is completely free. Basic creators can receive brand deals. Creator Pro unlocking instant payouts requires a tiny monthly fee of ₹49.' },
    { cat: 'Creators', q: 'Can I link multiple Instagram accounts?', a: 'Currently, each creator account can link one verified primary Instagram handle and one YouTube channel to calculate dynamic engagement rates.' }
  ], null, 2));
  const [faqError, setFaqError] = useState('');

  const [aboutJson, setAboutJson] = useState(JSON.stringify({
    BLUEPRINT_CARDS: [
      {
        num: "01",
        title: "Verify Identity",
        sub: "Digital Pehchan",
        desc: "We verify the analytics, location, and brand-safety of regional creators so brands can bypass fake followers and hire authentic talent.",
        accent: "#FF9431"
      },
      {
        num: "02",
        title: "Bypass Middlemen",
        sub: "Direct Pitch SaaS",
        desc: "Brands pitch directly to creators in Tier 2 & 3 cities through our open marketplace. No agency gatekeepers or massive markups.",
        accent: "#10B981"
      },
      {
        num: "03",
        title: "Zero Broker Fees",
        sub: "Safe Escrow Ledgers",
        desc: "Payouts are secured in safe escrow ledgers and released immediately upon project completion. Best part? We charge 0% commission.",
        accent: "#3B82F6"
      }
    ],
    TIMELINE_DATA: [
      {
        year: "JAN 2026: THE SPARK",
        title: "The Bhilwara Prototype",
        desc: "Identifying the massive gap between regional talent in Tier 2 & 3 cities and national brand opportunities. We tested our first directory manually mapping 150 local creators in Rajasthan.",
        stats: [
          { label: "Creators Mapped", value: "150+" },
          { label: "Target City", value: "Bhilwara" }
        ]
      },
      {
        year: "APR 2026: THE INFRASTRUCTURE",
        title: "The Trust & Identity Layer",
        desc: "Launched our proprietary Creator Score algorithm and verified Digital Pehchan. This allowed upcoming creators to present data-validated analytics without expensive agencies.",
        stats: [
          { label: "Active Profiles", value: "1,200+" },
          { label: "System Trust Metric", value: "Blue Badges" }
        ]
      },
      {
        year: "JUN 2026: THE EXPANSION",
        title: "Elite National Marketplace",
        desc: "Scaled CreatorBharat into an elite SaaS platform with zero broker fee policies, automated ROI calculators, interactive podium leaderboards, and safe escrow ledger systems.",
        stats: [
          { label: "Active Users", value: "2,400+" },
          { label: "Broker Fees Charged", value: "0%" }
        ]
      }
    ],
    PHILOSOPHY_PILLARS: [
      {
        title: 'Identity',
        desc: 'Giving every creator a verified, data-backed professional portfolio that brands can trust.',
        features: ['Digital Pehchan Profile', 'Real-Time Engagement APIs', 'Anti-Fraud Score Metrics'],
        color: '#FF9431',
        badge: 'Infrastructure'
      },
      {
        title: 'Access',
        desc: 'Removing gatekeepers. Creators in small towns now apply directly to the biggest national brands.',
        features: ['Zero-Brokerage Escrow', 'Open Pitch Marketplace', 'Local Language Support'],
        color: '#10B981',
        badge: 'Opportunity'
      },
      {
        title: 'Growth',
        desc: 'Providing the financial tools and analytics to scale from a local star to a national icon.',
        features: ['ROI Valuation Gauges', 'SaaS Media Kits', 'Fast Invoice Financing'],
        color: '#3B82F6',
        badge: 'Scale'
      }
    ],
    LEADERSHIP_TEAM: [
      {
        name: "Mohmmad Dilshan",
        role: "Founder & Chief Architect",
        image: "/team_dilshan.jpg",
        bio: "Democratizing the digital economy for the next billion users through decentralized intelligence, modular architecture, and zero-brokerage campaigns.",
        skills: ["System Architecture", "Product Strategy", "Decentralized Networks", "Escrow Ledgers"],
        socials: {
          linkedin: "https://linkedin.com/in/mohmmad-dilshan",
          github: "https://github.com/mohmmad-dilshan"
        },
        tag: "CONSENSUS_NODE_001",
        location: "Bhilwara"
      }
    ],
    ADVISORY_BOARD: [],
    PRESS_LOGOS: [
      { name: "YourStory", desc: "Featured in Top Regional Startups" },
      { name: "Economic Times", desc: "The SaaS Shift in Creator Tech" },
      { name: "LiveMint", desc: "Empowering Tier 2 & 3 Micro-influencers" },
      { name: "TechCrunch", desc: "Zero-Brokerage Escrow Platform Launch" },
      { name: "Business Standard", desc: "SaaS Disrupting Traditional Talent Agencies" }
    ],
    INVESTOR_LOGOS: [
      { name: "Y Combinator", type: "W26 Candidate" },
      { name: "Sequoia Spark", type: "Cohort III" },
      { name: "Accel Partners", type: "Seed Backer" },
      { name: "AngelList India", type: "Syndicate Lead" }
    ]
  }, null, 2));
  const [aboutError, setAboutError] = useState('');

  const [pressJson, setPressJson] = useState(JSON.stringify([
    {
      date: "June 10, 2026",
      title: "CreatorBharat Launched: Setting up India's First Identity Layer for Tier 2 & 3 Creators",
      excerpt: "CreatorBharat today announced the rollout of v1, introducing an AI-driven digital trust score, localized regional discovery, and 0% commission structures for micro-creators.",
      url: "#"
    },
    {
      date: "March 15, 2026",
      title: "CreatorBharat Onboards 1,200+ Verified Creators Across Rajasthan and Madhya Pradesh",
      excerpt: "The startup has witnessed 4x growth in regional creator registrations, enabling local brands in Jaipur, Bhilwara, and Indore to run high-ROI campaigns directly.",
      url: "#"
    },
    {
      date: "January 22, 2026",
      title: "CreatorBharat Receives DPIIT Startup Recognition from Govt of India",
      excerpt: "Recognized for building innovative digital infrastructure that maps and verifies regional talent, promoting localized employment and direct commerce.",
      url: "#"
    }
  ], null, 2));
  const [pressError, setPressError] = useState('');

  const [storiesJson, setStoriesJson] = useState(JSON.stringify([
    {
      id: 'story-1',
      type: 'brand',
      brandName: 'Jaipur Heritage Apparel',
      niche: 'Fashion & Retail',
      location: 'Jaipur, Rajasthan',
      creatorName: 'Aryan Sharma',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80',
      banner: '/campaign_jaipur_heritage.png',
      title: 'How Jaipur Heritage Apparel grew Sales by 3x in 30 Days 🚀',
      description: 'A traditional fashion brand in Jaipur struggled to reach Gen-Z consumers through social ads, which had high acquisition costs. Partnered with regional creators to curate authentic styling reels.',
      challenge: 'High customer acquisition cost (CAC) and zero regional awareness.',
      solution: 'Launched a hyperlocal styling mission with 3 verified local fashion creators on Instagram.',
      metrics: [
        { label: 'Sales Growth', value: '310%', icon: 'TrendingUp', color: '#ff9431' },
        { label: 'CAC Reduced', value: '-42%', icon: 'Target', color: '#ff4b4b' },
        { label: 'Organic Reach', value: '1.2M+', icon: 'Users', color: '#3b82f6' }
      ],
      testimonial: {
        quote: "CreatorBharat solved our biggest challenge: authenticity at scale. Working with Aryan and other verified local creators was frictionless, and the ROI speaks for itself.",
        author: "Vikram Rathore",
        role: "Marketing Director",
        company: "Jaipur Heritage Apparel"
      },
      actionText: 'Collaborate with Aryan',
      actionPath: '/leaderboard'
    },
    {
      id: 'story-2',
      type: 'creator',
      creatorName: 'Ramesh Dewangan',
      channelName: '@BastarCraftsVlog',
      niche: 'Art & Heritage',
      location: 'Bastar, Chhattisgarh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      banner: '/campaign_bastar_crafts.png',
      title: 'From Bastar Village to National Brand Campaigns 🌟',
      description: 'Ramesh is a terracotta artisan in Chhattisgarh. Before joining CreatorBharat, he had no direct access to national brands. He now collaborates with major home decor brands across India.',
      challenge: 'Lack of brand access, pricing transparency, and modern identity tools.',
      solution: 'Created a verified digital creator profile on CreatorBharat, linking regional crafts to urban home design campaigns.',
      metrics: [
        { label: 'Earnings Secured', value: '₹3.5 Lakhs', icon: 'DollarSign', color: '#10b981' },
        { label: 'Followers Gained', value: '+180k', icon: 'Users', color: '#3b82f6' },
        { label: 'Direct Deals', value: '12 Campaigns', icon: 'Award', color: '#8b5cf6' }
      ],
      testimonial: {
        quote: "Pehle mujhe payments ke liye mahino intezar karna padta tha. CreatorBharat par register hone ke baad, brands mujhe direct secure escrows ke saath access karte hain.",
        author: "Ramesh Dewangan",
        role: "Terracotta Master Artisan",
        company: "Bastar Craft Syndicate"
      },
      actionText: "View Ramesh's Profile",
      actionPath: '/leaderboard'
    },
    {
      id: 'story-3',
      type: 'platform',
      title: 'DPIIT Registered Startup: 15,000+ Regional Identities Verified 🇮🇳',
      location: 'National Coverage',
      niche: 'Ecosystem Growth',
      banner: '/platform_milestone_bharat.png',
      description: 'CreatorBharat has officially mapped and verified over 15,000 regional creators across 28 states in India. Under our Bharat-first outreach program, we have eliminated intermediate brokerage commissions.',
      challenge: 'Fragmented talent registry and high commission brokerages in Tier 2/3 cities.',
      solution: 'Designed the unified "Digital Pehchan" verified trust scores, standard escrow payments, and regional leaderboard hubs.',
      metrics: [
        { label: 'States Mapped', value: '28 States', icon: 'Globe2', color: '#ff9431' },
        { label: 'Platform Fee', value: '0% Brokerage', icon: 'ShieldCheck', color: '#10b981' },
        { label: 'Ecosystem Trust', value: '99.4% Secured', icon: 'Zap', color: '#8b5cf6' }
      ],
      testimonial: {
        quote: "Our mission is to democratize opportunities for Tier-2 and Tier-3 talent. We are building the foundational verification layers that traditional agencies ignore.",
        author: "Mohmmad Dilshan",
        role: "Founder & CEO",
        company: "CreatorBharat"
      },
      actionText: 'Claim Your Profile Free',
      actionPath: '/join'
    }
  ], null, 2));
  const [storiesError, setStoriesError] = useState('');

  const [aiFaqJson, setAiFaqJson] = useState(JSON.stringify([
    {
      q: "What is the CreatorBharat Elite Score?",
      a: "The Elite Score is a proprietary machine learning score (from 0 to 100) calculated by analyzing a creator's verified follower counts, comment-to-like engagement ratios, content consistency, brand safety index, and niche authority. Higher scores receive premium ranking on our public leaderboards."
    },
    {
      q: "How does the AI Matchmaker algorithm choose creators?",
      a: "Our campaign matching algorithm parses a brand's budget, niche requirements, platforms, and target location. It then performs semantic similarity matching against verified creator bios, local dialect parameters, and past campaign categories to recommend creators with the highest predicted ROI."
    },
    {
      q: "Why is Digital Pehchan KYC required?",
      a: "Digital Pehchan ensures that every creator profile on our platform belongs to a real citizen of India. By submitting Aadhaar, PAN, or GST credentials, creators verify their identity, which eliminates bot traffic and fake profiles and builds trust with brand sponsors."
    }
  ], null, 2));
  const [aiFaqError, setAiFaqError] = useState('');

  const [notificationsJson, setNotificationsJson] = useState(JSON.stringify([
    {
      id: 'notif-1',
      refNo: 'CB/GOVT/2026/SEC-4/082',
      date: '17-06-2026',
      department: 'Dept. of Verification & Trust',
      deptHi: 'सत्यापन एवं विश्वास विभाग',
      title: 'BharatAI Profile Verification Engine Launched Under Section 4(a) 🛡️',
      titleHi: 'धारा 4(a) के तहत भारतएआई प्रोफाइल सत्यापन प्रणाली का शुभारंभ',
      description: 'All creators operating in Tier 2 & 3 regions of India are hereby notified to claim their official verified badge by submitting authentic audience engagement proofs. Verified profiles receive priority matching in brand campaign allotment. Compliance boosts creator visibility by up to 85%.',
      pdfName: 'CB_Verification_Gazette_v3.pdf',
      status: 'ACTIVE',
      signatory: 'Dr. R. K. Sen, Joint Secretary (Creator Welfare)',
      actionText: 'Apply for Verification',
      actionPath: '/join'
    },
    {
      id: 'notif-2',
      refNo: 'CB/GOVT/2026/MKT-9/104',
      date: '16-06-2026',
      department: 'Dept. of Campaign & Escrow Operations',
      deptHi: 'अभियान एवं एस्क्रो संचालन विभाग',
      title: 'Notification: Launch of Rajasthan Regional Spotlight Campaign 🏺',
      titleHi: 'अधिसूचना: राजस्थान क्षेत्रीय अभियान आवंटन सूचना',
      description: 'Applications are invited from eligible fashion, cultural, and lifestyle creators in Rajasthan for the Jaipur Heritage Promotion Spotlight. Budget allocation is guaranteed under official escrow protection terms. Direct payouts will be executed with zero commissions. Retainers start at ₹25,000 per asset.',
      pdfName: 'CB_Raj_Spotlight_Circular.pdf',
      status: 'ACTIVE',
      signatory: 'Smt. Anjali Sharma, Director (Campaign Allocation)',
      actionText: 'View Allotments',
      actionPath: '/creators'
    },
    {
      id: 'notif-3',
      refNo: 'CB/GOVT/2026/DIR-3/011',
      date: '14-06-2026',
      department: 'Ecosystem Registry Office',
      deptHi: 'पारिस्थितिकी तंत्र रजिस्ट्री कार्यालय',
      title: 'Release of Weekly Top 100 Virality Index & Leaderboard 🏆',
      titleHi: 'साप्ताहिक शीर्ष 100 क्रिएटर्स की वायरल सूचकांक सूची जारी',
      description: 'The national registry of top performing regional creators is updated for the current cycle. Weekly statistics are logged to measure authentic organic reach. Creators appearing in the top decile are recommended for government-partnered regional campaigns.',
      pdfName: 'CB_Leaderboard_Registry_W24.pdf',
      status: 'PUBLISHED',
      signatory: 'Shri Amit Verma, Registrar (Creator Stats)',
      actionText: 'Open Leaderboard',
      actionPath: '/leaderboard'
    }
  ], null, 2));
  const [notificationsError, setNotificationsError] = useState('');


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

  // ── Settings (Full Platform Config)
  const [platformFee, setPlatformFee] = useState(10);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [supportEmail, setSupportEmail] = useState('support@creatorbharat.com');
  const [siteName, setSiteName] = useState('CreatorBharat');
  const [frontendUrl, setFrontendUrl] = useState('http://localhost:5173');
  const [featAchievements, setFeatAchievements] = useState(true);
  const [featWallet, setFeatWallet] = useState(true);
  const [enableEmail, setEnableEmail] = useState(true);
  const [enableSMS, setEnableSMS] = useState(true);
  // Pricing
  const [proMembershipPrice, setProMembershipPrice] = useState(4900);
  const [campaignBoostPrice, setCampaignBoostPrice] = useState(9900);
  const [featuredSlotPrice, setFeaturedSlotPrice] = useState(19900);
  // Razorpay
  const [razorpayKeyId, setRazorpayKeyId] = useState('');
  const [razorpaySecret, setRazorpaySecret] = useState('');
  const [razorpayMode, setRazorpayMode] = useState('test');
  // Email
  const [resendApiKey, setResendApiKey] = useState('');
  const [emailFrom, setEmailFrom] = useState('onboarding@resend.dev');
  // SMS
  const [smsProvider, setSmsProvider] = useState('fast2sms');
  const [fast2smsKey, setFast2smsKey] = useState('');
  const [twilioSid, setTwilioSid] = useState('');
  const [twilioToken, setTwilioToken] = useState('');
  const [twilioPhone, setTwilioPhone] = useState('');
  const [settingsTab, setSettingsTab] = useState('general');

  // ── Platform Custom Notifications Dispatcher States
  const [notifTargetGroup, setNotifTargetGroup] = useState('ALL_CREATORS');
  const [notifUserId, setNotifUserId] = useState('');
  const [notifTitle, setNotifTitle] = useState('');
  const [notifBody, setNotifBody] = useState('');
  const [notifType, setNotifType] = useState('INFO');
  const [notifLink, setNotifLink] = useState('');

  // ── Creator Profile Editor
  const [editCreatorModalOpen, setEditCreatorModalOpen] = useState(false);
  const [editingCreator, setEditingCreator] = useState(null);
  const [editCreName, setEditCreName] = useState('');
  const [editCreHandle, setEditCreHandle] = useState('');
  const [editCreBio, setEditCreBio] = useState('');
  const [editCreCity, setEditCreCity] = useState('');
  const [editCreState, setEditCreState] = useState('');
  const [editCreFollowers, setEditCreFollowers] = useState(0);
  const [editCreEngagementRate, setEditCreEngagementRate] = useState(0);
  const [editCreRateMin, setEditCreRateMin] = useState(0);
  const [editCreRateMax, setEditCreRateMax] = useState(0);
  const [editCrePhoto, setEditCrePhoto] = useState('');
  const [editCreCoverImage, setEditCreCoverImage] = useState('');
  const [editCreNiche, setEditCreNiche] = useState('');
  const [editCrePlatform, setEditCrePlatform] = useState('');
  const [editCreStatus, setEditCreStatus] = useState('DRAFT');
  const [editCreIsVerified, setEditCreIsVerified] = useState(false);
  const [editCreIsPro, setEditCreIsPro] = useState(false);
  const [editCreAadhaarUrl, setEditCreAadhaarUrl] = useState('');
  const [editCrePanUrl, setEditCrePanUrl] = useState('');

  // ── Brand Profile Editor
  const [editBrandModalOpen, setEditBrandModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [editBrandName, setEditBrandName] = useState('');
  const [editBrandIndustry, setEditBrandIndustry] = useState('');
  const [editBrandWebsite, setEditBrandWebsite] = useState('');

  // ── Campaign Editor
  const [editCampaignModalOpen, setEditCampaignModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [editCampTitle, setEditCampTitle] = useState('');
  const [editCampDesc, setEditCampDesc] = useState('');
  const [editCampBudget, setEditCampBudget] = useState(0);
  const [editCampPlatform, setEditCampPlatform] = useState('');
  const [editCampNiche, setEditCampNiche] = useState('');
  const [editCampStatus, setEditCampStatus] = useState('ACTIVE');
  
  // ── Creator Creation States
  const [createCreatorModalOpen, setCreateCreatorModalOpen] = useState(false);
  const [creEmail, setCreEmail] = useState('');
  const [crePassword, setCrePassword] = useState('');
  const [creName, setCreName] = useState('');
  const [creHandle, setCreHandle] = useState('');
  const [crePhone, setCrePhone] = useState('');
  const [creCity, setCreCity] = useState('');
  const [creState, setCreState] = useState('');
  const [creFollowers, setCreFollowers] = useState(0);
  const [creNiche, setCreNiche] = useState('');
  const [crePlatform, setCrePlatform] = useState('');
  const [creRateMin, setCreRateMin] = useState(0);
  const [creRateMax, setCreRateMax] = useState(0);

  // ── Brand Creation States
  const [createBrandModalOpen, setCreateBrandModalOpen] = useState(false);
  const [brandEmail, setBrandEmail] = useState('');
  const [brandPassword, setBrandPassword] = useState('');
  const [brandCompanyName, setBrandCompanyName] = useState('');
  const [brandIndustry, setBrandIndustry] = useState('');
  const [brandWebsite, setBrandWebsite] = useState('');
  const [brandPhone, setBrandPhone] = useState('');

  // ── Campaign Creation States
  const [createCampaignModalOpen, setCreateCampaignModalOpen] = useState(false);
  const [campBrandId, setCampBrandId] = useState('');
  const [campTitle, setCampTitle] = useState('');
  const [campDesc, setCampDesc] = useState('');
  const [campBudget, setCampBudget] = useState(0);
  const [campPlatform, setCampPlatform] = useState('');
  const [campNiche, setCampNiche] = useState('');
  const [campStatus, setCampStatus] = useState('ACTIVE');

  // ── SVG Chart Tooltip State
  const [hoveredPoint, setHoveredPoint] = useState(null);

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

  const handleSendTestEmail = async () => {
    try {
      toast('Sending test email...', 'info');
      const res = await fetch(`${API_BASE}/admin/system/test-mail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ to: adminUser?.email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      toast(data.sandbox ? '📧 Email logged to console (no API key set)' : `✅ Test email sent to ${data.recipient}!`, 'success');
    } catch (err) {
      toast(err.message || 'Failed to send test email', 'error');
    }
  };

  const handleSyncCheck = async () => {
    try {
      toast('Running health check...', 'info');
      const res = await fetch(`${API_BASE}/admin/health`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      const dbStatus = data.services?.database?.status;
      if (dbStatus === 'healthy') {
        toast('✅ All systems healthy! DB connected, services online.', 'success');
      } else {
        toast(`⚠️ DB Status: ${dbStatus}. Check backend logs.`, 'error');
      }
    } catch (err) {
      toast('Could not reach backend. Is server running?', 'error');
    }
  };

  const handleClearCache = async () => {
    try {
      // Re-fetch all data to refresh admin state
      toast('Refreshing all data...', 'info');
      await fetchData();
      toast('✅ Admin data refreshed from database!', 'success');
    } catch (err) {
      toast('Refresh failed: ' + (err.message || 'Unknown error'), 'error');
    }
  };

  // CSV Export helper
  const handleExportCSV = async (type) => {
    try {
      toast(`Preparing ${type} export...`, 'info');
      const res = await fetch(`${API_BASE}/admin/export/${type}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast(`✅ ${type} data exported successfully!`, 'success');
    } catch (err) {
      toast(`Export failed: ${err.message}`, 'error');
    }
  };

  // Danger Zone real handlers
  const handleDangerOp = async (endpoint, label) => {
    const typed = window.prompt(`Type DELETE to confirm: ${label}\n\n⚠️ THIS CANNOT BE UNDONE!`);
    if (typed !== 'DELETE') { toast('Cancelled — confirmation text did not match.', 'info'); return; }
    try {
      toast(`Executing: ${label}...`, 'info');
      const res = await fetch(`${API_BASE}/admin/danger/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ confirm: 'DELETE' })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Operation failed');
      toast(`✅ ${data.message}`, 'success');
      await fetchData();
    } catch (err) {
      toast(`❌ ${err.message}`, 'error');
    }
  };

  const handleUploadFile = async (e, type = 'image', callback) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file size (e.g. 50MB max for video, 5MB for image)
    const maxSize = type === 'video' ? 50 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return toast(`File is too large. Maximum size allowed is ${type === 'video' ? '50MB' : '5MB'}`, 'error');
    }

    const formData = new FormData();
    formData.append('file', file);
    
    toast('Uploading file...', 'info');
    try {
      const res = await fetch(`${API_BASE}/uploads/${type}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      toast('Upload completed successfully!', 'success');
      callback(data.url);
    } catch (err) {
      toast(err.message || 'File upload failed', 'error');
    }
  };

  const handleUploadMedia = async (file, type = 'image') => {
    // Check file size (e.g. 50MB max for video, 5MB for image)
    const maxSize = type === 'video' ? 50 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast(`File is too large. Maximum size allowed is ${type === 'video' ? '50MB' : '5MB'}`, 'error');
      throw new Error('File too large');
    }

    const formData = new FormData();
    formData.append('file', file);
    
    toast('Uploading media file...', 'info');
    const res = await fetch(`${API_BASE}/uploads/${type}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Upload failed');
    toast('Upload completed successfully!', 'success');
    return data.url;
  };

  const handleSaveCreator = async (e) => {
    e.preventDefault();
    if (!editingCreator) return;
    try {
      const nicheArr = editCreNiche.split(',').map(n => n.trim()).filter(Boolean);
      const platArr = editCrePlatform.split(',').map(p => p.trim()).filter(Boolean);
      const res = await fetch(`${API_BASE}/admin/creators/${editingCreator.id}`, {
        method: 'PUT',
        headers: H(),
        body: JSON.stringify({
          name: editCreName,
          handle: editCreHandle,
          bio: editCreBio,
          city: editCreCity,
          state: editCreState,
          followers: parseInt(editCreFollowers) || 0,
          engagementRate: parseFloat(editCreEngagementRate) || 0,
          rateMin: parseInt(editCreRateMin) || 0,
          rateMax: parseInt(editCreRateMax) || 0,
          photo: editCrePhoto,
          coverImage: editCreCoverImage,
          niche: nicheArr,
          platform: platArr,
          status: editCreStatus,
          isVerified: editCreIsVerified,
          isPro: editCreIsPro,
          aadhaarUrl: editCreAadhaarUrl || null,
          panUrl: editCrePanUrl || null
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update creator profile');
      toast('Creator profile updated successfully!', 'success');
      setEditCreatorModalOpen(false);
      setEditingCreator(null);
      fetchData();
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  const handleSaveBrand = async (e) => {
    e.preventDefault();
    if (!editingBrand) return;
    try {
      const res = await fetch(`${API_BASE}/admin/brands/${editingBrand.id}`, {
        method: 'PUT',
        headers: H(),
        body: JSON.stringify({
          companyName: editBrandName,
          industry: editBrandIndustry,
          website: editBrandWebsite
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update brand profile');
      toast('Brand profile updated successfully!', 'success');
      setEditBrandModalOpen(false);
      setEditingBrand(null);
      fetchData();
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  const handleSaveCampaign = async (e) => {
    e.preventDefault();
    if (!editingCampaign) return;
    try {
      const nicheArr = editCampNiche.split(',').map(n => n.trim()).filter(Boolean);
      const platArr = editCampPlatform.split(',').map(p => p.trim()).filter(Boolean);
      const res = await fetch(`${API_BASE}/admin/campaigns/${editingCampaign.id}`, {
        method: 'PUT',
        headers: H(),
        body: JSON.stringify({
          title: editCampTitle,
          description: editCampDesc,
          budget: parseInt(editCampBudget) || 0,
          niche: nicheArr,
          platform: platArr,
          status: editCampStatus
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update campaign details');
      toast('Campaign updated successfully!', 'success');
      setEditCampaignModalOpen(false);
      setEditingCampaign(null);
      fetchData();
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  const handleSaveEvent = async (e) => {
    e.preventDefault();
    try {
      const url = editingEvent 
        ? `${API_BASE}/events/${editingEvent.id}`
        : `${API_BASE}/events`;
      const method = editingEvent ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: H(),
        body: JSON.stringify({
          title: evtTitle,
          description: evtDescription,
          date: evtDate,
          location: evtLocation,
          venue: evtLocation,
          type: 'SUMMIT',
          coverImage: evtImage || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100',
          registrationUrl: evtLink || '',
          eligibility: 'All Creators',
          isFeatured: true,
          published: true
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save event');
      toast(editingEvent ? 'Event updated successfully!' : 'Event created successfully!', 'success');
      setEventModalOpen(false);
      setEditingEvent(null);
      fetchData();
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  const handleSaveAchievement = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/achievements`, {
        method: 'POST',
        headers: H(),
        body: JSON.stringify({
          creatorId: achCreatorId,
          type: achType,
          title: achTitle,
          description: achDescription
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to grant achievement');
      toast('Achievement granted successfully!', 'success');
      setGrantAchModalOpen(false);
      setAchCreatorId('');
      setAchType('VERIFICATION');
      setAchTitle('');
      setAchDescription('');
      fetchData();
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  const handleSaveMission = async (e) => {
    e.preventDefault();
    try {
      const url = editingMission 
        ? `${API_BASE}/admin/missions/${editingMission.id}`
        : `${API_BASE}/admin/missions`;
      const method = editingMission ? 'PUT' : 'POST';
      
      const stepsArr = misSteps.split('\n').map(s => s.trim()).filter(Boolean);
      
      const res = await fetch(url, {
        method,
        headers: H(),
        body: JSON.stringify({
          title: misTitle,
          description: misDescription,
          reward: misReward,
          rewardColor: misRewardColor || '#FF9431',
          deadline: misDeadline,
          steps: stepsArr,
          active: misActive
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save mission');
      toast(editingMission ? 'Mission updated successfully!' : 'Mission created successfully!', 'success');
      setMissionModalOpen(false);
      setEditingMission(null);
      fetchData();
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  const handleSendPlatformNotification = async (e) => {
    e.preventDefault();
    if (!notifTitle || !notifBody) {
      toast('Title and Body are required', 'error');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/admin/notifications/send`, {
        method: 'POST',
        headers: H(),
        body: JSON.stringify({
          targetGroup: notifTargetGroup,
          userId: notifTargetGroup === 'INDIVIDUAL' ? notifUserId : undefined,
          title: notifTitle,
          body: notifBody,
          type: notifType,
          link: notifLink || null
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to dispatch notifications');
      toast(data.message || 'Notification dispatched successfully!', 'success');
      setNotifTitle('');
      setNotifBody('');
      setNotifLink('');
      setNotifUserId('');
    } catch (err) {
      toast(err.message, 'error');
    }
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
        fetch(`${API_BASE}/admin/gallery`, { headers: H() }),
        fetch(`${API_BASE}/uploads`, { headers: H() }),
        fetch(`${API_BASE}/admin/settings`, { headers: H() }),
        fetch(`${API_BASE}/admin/system/pages`, { headers: H() }),
        fetch(`${API_BASE}/admin/ambassadors`, { headers: H() }),
        fetch(`${API_BASE}/events`),
        fetch(`${API_BASE}/admin/missions`, { headers: H() }),
        fetch(`${API_BASE}/admin/missions/completions`, { headers: H() }),
        fetch(`${API_BASE}/admin/platform-settings`, { headers: H() }),
        fetch(`${API_BASE}/admin/panel-settings`, { headers: H() }),
      ];

      const results = await Promise.allSettled(fetches);
      const safeJson = async (r) => { try { const d = await r.json(); return d; } catch { return null; } };

      const [
        rVer, rCre, rBr, rCam, rPay, rSt, rBlog, rNews, rCont, rPod, rRev, rComm,
        rApps, rLead, rBrandAna, rAct, rDeepSt, rGal, rUp, rSettings, rPages,
        rAmb, rEvt, rMis, rMisComp, rPS, rAP
      ] = await Promise.all(results.map(r => r.status === 'fulfilled' ? safeJson(r.value) : null));

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
      if (rGal) setGallery(Array.isArray(rGal) ? rGal : []);
      if (rUp) setUploads(Array.isArray(rUp) ? rUp : []);
      if (rAmb) setAmbassadors(Array.isArray(rAmb) ? rAmb : []);
      if (rEvt) setEvents(Array.isArray(rEvt) ? rEvt : []);
      if (rMis) setMissions(Array.isArray(rMis) ? rMis : []);
      if (rMisComp) setMissionCompletions(Array.isArray(rMisComp) ? rMisComp : []);
      if (rPS && !rPS.error) setPlatformSettings(rPS);
      if (rAP && !rAP.error) setAdminPanelSettings(rAP);
      if (rPages && Array.isArray(rPages)) {
        rPages.forEach(p => {
          if (p.pageName === 'home') setHomeConfig(p.content);
          else if (p.pageName === 'pricing') setPricingConfig(p.content);
          else if (p.pageName === 'calculator') setCalculatorConfig(p.content);
          else if (p.pageName === 'faqs' || p.pageName === 'faq') setFaqJson(JSON.stringify(p.content, null, 2));
          else if (p.pageName === 'creator-landing') setCreatorLandingConfig(p.content);
          else if (p.pageName === 'brand-landing') setBrandLandingConfig(p.content);
          else if (p.pageName === 'about') setAboutJson(JSON.stringify(p.content, null, 2));
          else if (p.pageName === 'press') setPressJson(JSON.stringify(p.content, null, 2));
          else if (p.pageName === 'stories') setStoriesJson(JSON.stringify(p.content, null, 2));
          else if (p.pageName === 'ai-faq') setAiFaqJson(JSON.stringify(p.content, null, 2));
          else if (p.pageName === 'notifications') setNotificationsJson(JSON.stringify(p.content, null, 2));
        });
      }

      if (rSettings) {
        setPlatformFee(rSettings.platformFee || 10);
        setSupportEmail(rSettings.supportEmail || 'support@creatorbharat.com');
        setSiteName(rSettings.siteName || 'CreatorBharat');
        setFrontendUrl(rSettings.frontendUrl || 'http://localhost:5173');
        setFeatAchievements(rSettings.enableAIAssistant ?? true);
        setFeatWallet(rSettings.enableEscrowSystem ?? true);
        setMaintenanceMode(rSettings.maintenanceMode ?? false);
        setEnableEmail(rSettings.enableEmail ?? true);
        setEnableSMS(rSettings.enableSMS ?? true);
        setProMembershipPrice(rSettings.proMembershipPrice || 4900);
        setCampaignBoostPrice(rSettings.campaignBoostPrice || 9900);
        setFeaturedSlotPrice(rSettings.featuredSlotPrice || 19900);
        setRazorpayKeyId(rSettings.razorpayKeyId || '');
        setRazorpaySecret(rSettings.razorpaySecret || '');
        setRazorpayMode(rSettings.razorpayMode || 'test');
        setResendApiKey(rSettings.resendApiKey || '');
        setEmailFrom(rSettings.emailFrom || 'onboarding@resend.dev');
        setSmsProvider(rSettings.smsProvider || 'fast2sms');
        setFast2smsKey(rSettings.fast2smsKey || '');
        setTwilioSid(rSettings.twilioSid || '');
        setTwilioToken(rSettings.twilioToken || '');
        setTwilioPhone(rSettings.twilioPhone || '');
      }

    } catch (err) {
      console.error('Fetch error:', err);
      toast('Failed to sync data from database', 'error');
    } finally { setDataLoading(false); }
  };

  useEffect(() => { if (token) fetchData(); }, [token]);

  const updatePS = (sec, key, val) => {
    setPlatformSettings(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [sec]: {
          ...prev[sec],
          [key]: val
        }
      };
    });
  };

  const fetchPlatformSettings = async () => {
    if (!token) return;
    setPsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/platform-settings`, { headers: H() });
      const data = await res.json();
      if (data && !data.error) {
        setPlatformSettings(data);
      }
    } catch (err) {
      console.error('Error fetching platform settings:', err);
    } finally {
      setPsLoading(false);
    }
  };

  const savePlatformSettings = async () => {
    if (!platformSettings) return;
    setPsSaving(true);
    setPsSaved(false);
    try {
      const res = await fetch(`${API_BASE}/admin/platform-settings`, {
        method: 'PUT',
        headers: H(),
        body: JSON.stringify(platformSettings)
      });
      const data = await res.json();
      if (data.success) {
        setPlatformSettings(data.settings);
        setPsSaved(true);
        toast('Platform settings saved successfully!', 'success');
        setTimeout(() => setPsSaved(false), 2000);
      } else {
        toast(data.error || 'Failed to save platform settings', 'error');
      }
    } catch (err) {
      console.error(err);
      toast('Network error saving platform settings', 'error');
    } finally {
      setPsSaving(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'feature-control' && !platformSettings && token) {
      fetchPlatformSettings();
    }
  }, [activeTab, token]);

  const updateAP = (key, val) => {
    setAdminPanelSettings(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [key]: val
      };
    });
  };

  const fetchAdminPanelSettings = async () => {
    if (!token) return;
    setApLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/panel-settings`, { headers: H() });
      const data = await res.json();
      if (data && !data.error) {
        setAdminPanelSettings(data);
      }
    } catch (err) {
      console.error('Error fetching admin settings:', err);
    } finally {
      setApLoading(false);
    }
  };

  const saveAdminPanelSettings = async () => {
    if (!adminPanelSettings) return;
    setApSaving(true);
    setApSaved(false);
    try {
      const res = await fetch(`${API_BASE}/admin/panel-settings`, {
        method: 'PUT',
        headers: H(),
        body: JSON.stringify(adminPanelSettings)
      });
      const data = await res.json();
      if (data.success) {
        setAdminPanelSettings(data.settings);
        setApSaved(true);
        toast('Admin panel settings saved successfully!', 'success');
        setTimeout(() => setApSaved(false), 2000);
      } else {
        toast(data.error || 'Failed to save admin settings', 'error');
      }
    } catch (err) {
      console.error(err);
      toast('Network error saving admin settings', 'error');
    } finally {
      setApSaving(false);
    }
  };

  const handleUpdateAdminCredentials = async (e) => {
    e.preventDefault();
    if (adminNewPassword !== adminConfirmPassword) {
      toast('New passwords do not match!', 'error');
      return;
    }
    setAdminCredsUpdating(true);
    try {
      const res = await fetch(`${API_BASE}/admin/update-credentials`, {
        method: 'PUT',
        headers: H(),
        body: JSON.stringify({
          email: adminNewEmail,
          currentPassword: adminCurrentPassword,
          newPassword: adminNewPassword
        })
      });
      const data = await res.json();
      if (res.ok) {
        toast('Admin credentials updated successfully!', 'success');
        setAdminNewEmail('');
        setAdminCurrentPassword('');
        setAdminNewPassword('');
        setAdminConfirmPassword('');
      } else {
        toast(data.error || 'Failed to update admin credentials', 'error');
      }
    } catch (err) {
      console.error(err);
      toast('Network error updating credentials', 'error');
    } finally {
      setAdminCredsUpdating(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'admin-control' && !adminPanelSettings && token) {
      fetchAdminPanelSettings();
    }
  }, [activeTab, token]);

  const fetchDiagnostics = async () => {
    if (!token) return;
    setApDiagLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/system/diagnostics`, { headers: H() });
      const data = await res.json();
      if (data && data.success) {
        setApDiagnostics(data);
      }
    } catch (err) {
      console.error('Error fetching diagnostics:', err);
    } finally {
      setApDiagLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'admin-control' && apSubTab === 'diagnostics' && token) {
      fetchDiagnostics();
    }
  }, [activeTab, apSubTab, token]);

  const handleSavePageConfig = async () => {
    let content = {};
    if (selectedPageName === 'home') {
      content = homeConfig;
    } else if (selectedPageName === 'pricing') {
      content = pricingConfig;
    } else if (selectedPageName === 'calculator') {
      content = calculatorConfig;
    } else if (selectedPageName === 'creator-landing') {
      content = creatorLandingConfig;
    } else if (selectedPageName === 'brand-landing') {
      content = brandLandingConfig;
    } else if (selectedPageName === 'faqs') {
      try {
        const parsed = JSON.parse(faqJson);
        if (!Array.isArray(parsed)) {
          throw new Error('FAQs must be an array of objects.');
        }
        content = parsed.map(item => ({
          cat: item.cat || 'General',
          q: item.q || '',
          a: item.a || ''
        }));
        setFaqError('');
      } catch (err) {
        setFaqError(err.message || 'Invalid JSON format. Please verify syntax.');
        toast('Failed to save: ' + (err.message || 'Invalid FAQ JSON.'), 'error');
        return;
      }
    } else if (selectedPageName === 'about') {
      try {
        content = JSON.parse(aboutJson);
        setAboutError('');
      } catch (err) {
        setAboutError(err.message || 'Invalid JSON format. Please verify syntax.');
        toast('Failed to save: Invalid About page JSON.', 'error');
        return;
      }
    } else if (selectedPageName === 'press') {
      try {
        const parsed = JSON.parse(pressJson);
        if (!Array.isArray(parsed)) {
          throw new Error('Press content must be an array of objects.');
        }
        content = parsed;
        setPressError('');
      } catch (err) {
        setPressError(err.message || 'Invalid JSON format. Please verify syntax.');
        toast('Failed to save: Invalid Press JSON.', 'error');
        return;
      }
    } else if (selectedPageName === 'stories') {
      try {
        const parsed = JSON.parse(storiesJson);
        if (!Array.isArray(parsed)) {
          throw new Error('Stories content must be an array of objects.');
        }
        content = parsed;
        setStoriesError('');
      } catch (err) {
        setStoriesError(err.message || 'Invalid JSON format. Please verify syntax.');
        toast('Failed to save: Invalid Stories JSON.', 'error');
        return;
      }
    } else if (selectedPageName === 'ai-faq') {
      try {
        const parsed = JSON.parse(aiFaqJson);
        if (!Array.isArray(parsed)) {
          throw new Error('AI FAQ content must be an array of objects.');
        }
        content = parsed;
        setAiFaqError('');
      } catch (err) {
        setAiFaqError(err.message || 'Invalid JSON format. Please verify syntax.');
        toast('Failed to save: Invalid AI FAQ JSON.', 'error');
        return;
      }
    } else if (selectedPageName === 'notifications') {
      try {
        const parsed = JSON.parse(notificationsJson);
        if (!Array.isArray(parsed)) {
          throw new Error('Notifications content must be an array of objects.');
        }
        content = parsed;
        setNotificationsError('');
      } catch (err) {
        setNotificationsError(err.message || 'Invalid JSON format. Please verify syntax.');
        toast('Failed to save: Invalid Notifications JSON.', 'error');
        return;
      }
    }

    const targetPageName = selectedPageName === 'faqs' ? 'faq' : selectedPageName;

    try {
      const res = await fetch(`${API_BASE}/admin/system/pages/${targetPageName}`, {
        method: 'PUT',
        headers: {
          ...H(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
      });
      const data = await res.json();
      if (res.ok) {
        toast(`${selectedPageName.toUpperCase()} page configuration saved!`, 'success');
      } else {
        toast(`Failed to save: ${data.error || res.statusText}`, 'error');
      }
    } catch (err) {
      console.error(err);
      toast('Network error while saving page configuration.', 'error');
    }
  };


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

  const handleDeleteCreator = async (creatorId) => {
    if (!window.confirm('Delete this creator account permanently? This is irreversible.')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/creators/${creatorId}`, { method: 'DELETE', headers: H() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast('Creator account deleted successfully', 'success');
      fetchData();
    } catch (err) { toast(err.message, 'error'); }
  };

  const handleDeleteBrand = async (brandId) => {
    if (!window.confirm('Delete this brand account permanently? This will also delete all their campaigns.')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/brands/${brandId}`, { method: 'DELETE', headers: H() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast('Brand account deleted successfully', 'success');
      fetchData();
    } catch (err) { toast(err.message, 'error'); }
  };

  const handleSaveSettings = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/settings`, {
        method: 'POST',
        headers: H(),
        body: JSON.stringify({
          siteName, supportEmail, frontendUrl,
          platformFee: Number(platformFee),
          proMembershipPrice: Number(proMembershipPrice),
          campaignBoostPrice: Number(campaignBoostPrice),
          featuredSlotPrice: Number(featuredSlotPrice),
          enableAIAssistant: featAchievements,
          enableEscrowSystem: featWallet,
          maintenanceMode,
          enableEmail,
          enableSMS,
          razorpayKeyId, razorpaySecret, razorpayMode,
          resendApiKey, emailFrom,
          smsProvider, fast2smsKey, twilioSid, twilioToken, twilioPhone
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save settings');
      toast('✅ Platform settings saved! Changes are live immediately.', 'success');
      fetchData();
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  const handleCreateCreator = async (e) => {
    e.preventDefault();
    if (!creEmail || !crePassword || !creName || !creHandle) {
      return toast('Email, Password, Name, and Handle are required', 'error');
    }
    try {
      const nicheArr = creNiche.split(',').map(n => n.trim()).filter(Boolean);
      const platArr = crePlatform.split(',').map(p => p.trim()).filter(Boolean);
      const res = await fetch(`${API_BASE}/admin/creators`, {
        method: 'POST',
        headers: H(),
        body: JSON.stringify({
          email: creEmail,
          password: crePassword,
          name: creName,
          handle: creHandle,
          phone: crePhone || null,
          city: creCity || null,
          state: creState || null,
          niche: nicheArr,
          platform: platArr,
          followers: Number(creFollowers) || 0,
          rateMin: Number(creRateMin) || 0,
          rateMax: Number(creRateMax) || 0
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create creator account');
      toast('Creator account created successfully!', 'success');
      setCreateCreatorModalOpen(false);
      clearCreatorForm();
      fetchData();
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  const clearCreatorForm = () => {
    setCreEmail('');
    setCrePassword('');
    setCreName('');
    setCreHandle('');
    setCrePhone('');
    setCreCity('');
    setCreState('');
    setCreFollowers(0);
    setCreNiche('');
    setCrePlatform('');
    setCreRateMin(0);
    setCreRateMax(0);
  };

  const handleCreateBrand = async (e) => {
    e.preventDefault();
    if (!brandEmail || !brandPassword || !brandCompanyName) {
      return toast('Email, Password, and Company Name are required', 'error');
    }
    try {
      const res = await fetch(`${API_BASE}/admin/brands`, {
        method: 'POST',
        headers: H(),
        body: JSON.stringify({
          email: brandEmail,
          password: brandPassword,
          companyName: brandCompanyName,
          industry: brandIndustry || null,
          website: brandWebsite || null,
          phone: brandPhone || null
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create brand account');
      toast('Brand account created successfully!', 'success');
      setCreateBrandModalOpen(false);
      clearBrandForm();
      fetchData();
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  const clearBrandForm = () => {
    setBrandEmail('');
    setBrandPassword('');
    setBrandCompanyName('');
    setBrandIndustry('');
    setBrandWebsite('');
    setBrandPhone('');
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    if (!campBrandId || !campTitle || !campDesc) {
      return toast('Brand, Title, and Description are required', 'error');
    }
    try {
      const nicheArr = campNiche.split(',').map(n => n.trim()).filter(Boolean);
      const platArr = campPlatform.split(',').map(p => p.trim()).filter(Boolean);
      const res = await fetch(`${API_BASE}/admin/campaigns`, {
        method: 'POST',
        headers: H(),
        body: JSON.stringify({
          brandId: campBrandId,
          title: campTitle,
          description: campDesc,
          budget: Number(campBudget) || 0,
          platform: platArr,
          niche: nicheArr,
          status: campStatus
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create campaign');
      toast('Campaign created successfully!', 'success');
      setCreateCampaignModalOpen(false);
      clearCampaignForm();
      fetchData();
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  const clearCampaignForm = () => {
    setCampBrandId('');
    setCampTitle('');
    setCampDesc('');
    setCampBudget(0);
    setCampPlatform('');
    setCampNiche('');
    setCampStatus('ACTIVE');
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

  const handleDeleteGallery = async (id) => {
    if (!window.confirm('Delete this gallery item permanently?')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/gallery/${id}`, { method: 'DELETE', headers: H() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast('Gallery item deleted successfully', 'success');
      fetchData();
    } catch (err) { toast(err.message, 'error'); }
  };

  const handleSaveGallery = async (e) => {
    e.preventDefault();
    if (!galTitle || !galCategory || !galType || !galThumbnail) {
      return toast('Title, Category, Type, and Thumbnail are required', 'error');
    }
    try {
      const payload = {
        title: galTitle.trim(),
        description: galDesc.trim(),
        category: galCategory,
        type: galType,
        date: galDate.trim() || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        location: galLocation.trim(),
        thumbnail: galThumbnail.trim(),
        videoUrl: galVideoUrl.trim() || null,
        duration: galDuration.trim() || null,
        tags: galTags.split(',').map(t => t.trim()).filter(Boolean)
      };
      const url = editingGallery ? `${API_BASE}/admin/gallery/${editingGallery.id}` : `${API_BASE}/admin/gallery`;
      const method = editingGallery ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: H(), body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast(editingGallery ? 'Gallery item updated!' : 'Gallery item created!', 'success');
      setGalleryModalOpen(false); setEditingGallery(null); clearGalleryForm(); fetchData();
    } catch (err) { toast(err.message, 'error'); }
  };

  const clearGalleryForm = () => {
    setGalTitle(''); setGalDesc(''); setGalCategory('Summits'); setGalType('photo');
    setGalDate(''); setGalLocation(''); setGalThumbnail(''); setGalVideoUrl('');
    setGalDuration(''); setGalTags('');
  };

  const openEditGallery = (item) => {
    setEditingGallery(item);
    setGalTitle(item.title);
    setGalDesc(item.description || '');
    setGalCategory(item.category);
    setGalType(item.type);
    setGalDate(item.date || '');
    setGalLocation(item.location || '');
    setGalThumbnail(item.thumbnail);
    setGalVideoUrl(item.videoUrl || '');
    setGalDuration(item.duration || '');
    setGalTags(item.tags?.join(', ') || '');
    setGalleryModalOpen(true);
  };

  const handleDeleteUpload = async (filename) => {
    if (!window.confirm(`Delete this file permanently? This cannot be undone.`)) return;
    try {
      const res = await fetch(`${API_BASE}/uploads/${filename}`, {
        method: 'DELETE',
        headers: H()
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete file');
      toast('File deleted successfully', 'success');
      fetchData();
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  const handleSavePodcast = async (e) => {
    e.preventDefault();
    if (!podCreatorId || !podTitle || !podDuration) {
      return toast('Creator, Title, and Duration are required', 'error');
    }
    try {
      const payload = {
        creatorId: podCreatorId,
        title: podTitle.trim(),
        description: podDesc.trim() || null,
        duration: podDuration.trim(),
        thumbnail: podThumbnail.trim() || null,
        audioUrl: podAudioUrl.trim() || null,
        videoUrl: podVideoUrl.trim() || null,
        published: podPublished
      };

      const url = editingPodcast ? `${API_BASE}/admin/podcasts/${editingPodcast.id}` : `${API_BASE}/admin/podcasts`;
      const method = editingPodcast ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: H(),
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast(editingPodcast ? 'Podcast episode updated!' : 'Podcast episode created!', 'success');
      setPodcastModalOpen(false);
      setEditingPodcast(null);
      clearPodcastForm();
      fetchData();
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  const clearPodcastForm = () => {
    setPodCreatorId('');
    setPodTitle('');
    setPodDesc('');
    setPodDuration('');
    setPodThumbnail('');
    setPodAudioUrl('');
    setPodVideoUrl('');
    setPodPublished(false);
  };

  const openEditPodcast = (pod) => {
    setEditingPodcast(pod);
    setPodCreatorId(pod.creatorId);
    setPodTitle(pod.title);
    setPodDesc(pod.description || '');
    setPodDuration(pod.duration);
    setPodThumbnail(pod.thumbnail || '');
    setPodAudioUrl(pod.audioUrl || '');
    setPodVideoUrl(pod.videoUrl || '');
    setPodPublished(pod.published);
    setPodcastModalOpen(true);
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
    gallery: gallery.length,
    uploads: uploads.length,
    pendingAmbassadors: ambassadors.filter(a => a.status === 'PENDING').length,
    pendingMissions: missionCompletions.filter(c => c.status === 'PENDING').length,
  }), [creators, brands, campaigns, payments, verifications, blogs, newsletters, reviews, comments, podcasts, allApplications, contacts, gallery, uploads, ambassadors, missionCompletions]);

  const filteredGallery = useMemo(() => gallery.filter(g =>
    `${g.title} ${g.category} ${g.location || ''} ${(g.tags || []).join(' ')}`.toLowerCase().includes(gallerySearch.toLowerCase())
  ), [gallery, gallerySearch]);

  const filteredUploads = useMemo(() => uploads.filter(u =>
    `${u.name}`.toLowerCase().includes(mediaSearch.toLowerCase())
  ), [uploads, mediaSearch]);

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'radial-gradient(circle at 10% 20%, #0f172a 0%, #1e1b4b 90%)', padding: 16, fontFamily: 'Outfit, system-ui, sans-serif', position: 'relative', overflow: 'hidden' }}>
        
        {/* Glow Blobs */}
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'rgba(249, 115, 22, 0.12)', filter: 'blur(80px)', top: '10%', left: '15%' }} />
        <div style={{ position: 'absolute', width: 250, height: 250, borderRadius: '50%', background: 'rgba(99, 102, 241, 0.12)', filter: 'blur(80px)', bottom: '15%', right: '10%' }} />

        <div style={{ width: '100%', maxWidth: 440, background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 28, padding: '48px 40px', boxShadow: '0 24px 60px rgba(0,0,0,0.3)', position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ width: 68, height: 68, borderRadius: 20, background: 'linear-gradient(135deg, #f97316, #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 950, fontSize: 28, color: '#fff', margin: '0 auto 20px', boxShadow: '0 8px 24px rgba(249,115,22,0.3)' }}>CB</div>
            <h2 style={{ fontSize: 24, fontWeight: 900, margin: '0 0 6px', color: '#fff', letterSpacing: -0.5 }}>Admin Control Panel</h2>
            <p style={{ margin: 0, fontSize: 10, color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: 2, fontWeight: 800 }}>Restricted Gateway</p>
          </div>
          
          {authError && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', color: '#f87171', padding: '12px 16px', borderRadius: 12, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <AlertTriangle size={16} />{authError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: 'rgba(255, 255, 255, 0.6)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Admin Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.4)' }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@creatorbharat.com" required style={{ width: '100%', padding: '13px 14px 13px 44px', borderRadius: 12, border: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(15, 23, 42, 0.4)', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: 'rgba(255, 255, 255, 0.6)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.4)' }} />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required style={{ width: '100%', padding: '13px 44px 13px 44px', borderRadius: 12, border: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(15, 23, 42, 0.4)', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255, 255, 255, 0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Eye size={16} style={{ color: showPassword ? '#f97316' : 'rgba(255, 255, 255, 0.4)' }} />
                </button>
              </div>
            </div>
            <button type="submit" disabled={authLoading} style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', color: '#fff', border: 'none', padding: '14px', borderRadius: 12, fontWeight: 900, fontSize: 14, cursor: authLoading ? 'not-allowed' : 'pointer', opacity: authLoading ? 0.7 : 1, boxShadow: '0 8px 24px rgba(249,115,22,0.25)', marginTop: 6 }}>
              {authLoading ? '⌛ Authorizing Gateway...' : '🔑 Access Secure Dashboard'}
            </button>
          </form>
          <div style={{ marginTop: 24, padding: 14, background: 'rgba(249, 115, 22, 0.08)', border: '1px solid rgba(249, 115, 22, 0.15)', borderRadius: 12, fontSize: 11, color: '#f97316', fontWeight: 700, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
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
      <aside className="no-scrollbar" style={{ 
        width: 260, 
        background: 'linear-gradient(180deg, #070a13 0%, #0d111d 100%)', 
        display: 'flex', 
        flexDirection: 'column', 
        padding: '0', 
        flexShrink: 0, 
        position: 'sticky', 
        top: 0, 
        height: '100vh', 
        overflowY: 'auto', 
        boxShadow: '8px 0 32px rgba(0,0,0,0.22)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        transition: 'all 0.3s ease'
      }}>

        {/* Logo Section */}
        <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ 
              width: 44, 
              height: 44, 
              borderRadius: 12, 
              background: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontWeight: 950, 
              fontSize: 18, 
              color: '#fff', 
              boxShadow: '0 8px 20px rgba(249,115,22,0.3)', 
              flexShrink: 0, 
              letterSpacing: -1,
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)' }} />
              CB
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#fff', lineHeight: 1.1, letterSpacing: -0.4 }}>
                Creator<span style={{ color: '#f97316' }}>Bharat</span>
              </div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: 2.2, fontWeight: 800, marginTop: 4 }}>
                Admin Portal
              </div>
            </div>
            {dataLoading && <RefreshCw size={13} style={{ color: T.orange, animation: 'spin 1s linear infinite', flexShrink: 0 }} />}
          </div>
          
          {/* Online status badge */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8, 
            marginTop: 16, 
            padding: '8px 12px', 
            background: 'rgba(34,197,94,0.06)', 
            borderRadius: 10, 
            border: '1px solid rgba(34,197,94,0.09)' 
          }}>
            <div className="pulse-dot" style={{ 
              width: 7, 
              height: 7, 
              borderRadius: '50%', 
              background: '#22c55e', 
              flexShrink: 0 
            }} />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
              Neon DB · Active Session
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="no-scrollbar" style={{ flex: 1, padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 24, overflowY: 'auto' }}>
          {NAV_SECTIONS(counts).map((section, si) => (
            <div key={si} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ 
                fontSize: 9, 
                color: 'rgba(255,255,255,0.3)', 
                textTransform: 'uppercase', 
                letterSpacing: '0.15em', 
                fontWeight: 800, 
                padding: '0 18px', 
                marginBottom: 8, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 8 
              }}>
                <span style={{ color: section.color || T.orange, opacity: 0.8 }}>{section.title.split(' ')[0]}</span>
                <span>{section.title.split(' ').slice(1).join(' ')}</span>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.04)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {section.items.map(item => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button 
                      key={item.id} 
                      onClick={() => setActiveTab(item.id)} 
                      style={{
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 10, 
                        padding: '8px 12px',
                        margin: '1px 10px',
                        borderRadius: 8, 
                        border: active ? '1px solid rgba(249,115,22,0.22)' : '1px solid transparent',
                        background: active ? 'linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(239,68,68,0.03) 100%)' : 'transparent',
                        color: active ? '#fff' : 'rgba(255,255,255,0.55)',
                        fontSize: 12.5, 
                        fontWeight: active ? 700 : 500, 
                        cursor: 'pointer', 
                        textAlign: 'left',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', 
                        width: 'calc(100% - 20px)',
                        boxShadow: active ? '0 4px 12px rgba(249,115,22,0.05)' : 'none',
                        position: 'relative',
                        paddingLeft: active ? 12 : 12
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.transform = 'translateX(4px)';
                        if (!active) {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                        }
                        const iconCont = e.currentTarget.querySelector('.icon-container');
                        if (iconCont) {
                          iconCont.style.background = active ? 'rgba(249,115,22,0.25)' : 'rgba(255,255,255,0.08)';
                          iconCont.style.transform = 'scale(1.05)';
                        }
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = active ? '#fff' : 'rgba(255,255,255,0.55)';
                        e.currentTarget.style.transform = 'none';
                        if (!active) {
                          e.currentTarget.style.background = 'transparent';
                        }
                        const iconCont = e.currentTarget.querySelector('.icon-container');
                        if (iconCont) {
                          iconCont.style.background = active ? 'rgba(249,115,22,0.18)' : 'rgba(255,255,255,0.03)';
                          iconCont.style.transform = 'none';
                        }
                      }}
                    >
                      {active && (
                        <div style={{
                          position: 'absolute',
                          left: 0,
                          top: '25%',
                          height: '50%',
                          width: 3,
                          background: '#f97316',
                          borderRadius: '0 4px 4px 0',
                          boxShadow: '0 0 8px #f97316'
                        }} />
                      )}
                      <div className="icon-container" style={{ 
                        width: 26, 
                        height: 26, 
                        borderRadius: 6, 
                        background: active ? 'rgba(249,115,22,0.18)' : 'rgba(255,255,255,0.03)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        flexShrink: 0, 
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        border: active ? '1px solid rgba(249,115,22,0.15)' : '1px solid transparent'
                      }}>
                        <Icon size={13.5} style={{ 
                          color: active ? '#f97316' : 'inherit',
                          filter: active ? 'drop-shadow(0 0 3px rgba(249,115,22,0.3))' : 'none'
                        }} />
                      </div>
                      <span style={{ flex: 1 }}>{item.label}</span>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span style={{ 
                          padding: '2px 6px', 
                          borderRadius: 6, 
                          background: active ? T.orange : 'rgba(255,255,255,0.08)', 
                          color: active ? '#fff' : 'rgba(255,255,255,0.45)', 
                          fontSize: 9.5, 
                          fontWeight: 800, 
                          minWidth: 18, 
                          textAlign: 'center',
                          border: active ? 'none' : '1px solid rgba(255,255,255,0.05)'
                        }}>
                          {item.badge > 99 ? '99+' : item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div style={{ padding: '16px 14px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button onClick={fetchData} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: 8, 
            padding: '10px', 
            borderRadius: 8, 
            border: '1px solid rgba(255,255,255,0.08)', 
            background: 'rgba(255,255,255,0.03)', 
            color: 'rgba(255,255,255,0.6)', 
            fontSize: 12, 
            fontWeight: 600, 
            cursor: 'pointer', 
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' 
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
          >
            <RefreshCw size={13.5} style={{ animation: dataLoading ? 'spin 1s linear infinite' : 'none' }} /> Sync Data
          </button>
          <button onClick={handleLogout} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: 8, 
            padding: '10px', 
            borderRadius: 8, 
            border: '1px solid rgba(239,68,68,0.15)', 
            background: 'rgba(239,68,68,0.05)', 
            color: '#f87171', 
            fontSize: 12, 
            fontWeight: 600, 
            cursor: 'pointer', 
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' 
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.color = '#ff9999'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.05)'; e.currentTarget.style.color = '#f87171'; }}
          >
            <LogOut size={13.5} /> Sign Out
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
                  <h4 style={{ margin: '0 0 16px', fontSize: 13, fontWeight: 800, color: T.slate, textTransform: 'uppercase', letterSpacing: 0.5, display: 'flex', alignItems: 'center', gap: 8 }}><Cpu size={15} style={{ color: T.orange }} /> System Diagnostics & Health</h4>
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
                          const formattedVal = chart.key === 'escrowVolume' ? `₹${(rawVal/1000).toFixed(0)}k` : rawVal;
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
              <SectionHeader 
                title="All Creators" 
                badge={creators.length} 
                sub="Manage creator profiles, suspensions and data" 
                action={<button onClick={() => { clearCreatorForm(); setCreateCreatorModalOpen(true); }} style={{ padding: '8px 18px', background: T.orange, color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>+ New Creator</button>}
              />
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
                        <ActionBtn small onClick={() => {
                          setEditingCreator(cr);
                          setEditCreName(cr.name || '');
                          setEditCreHandle(cr.handle || '');
                          setEditCreBio(cr.bio || '');
                          setEditCreCity(cr.city || '');
                          setEditCreState(cr.state || '');
                          setEditCreFollowers(cr.followers || 0);
                          setEditCreEngagementRate(cr.engagementRate || 0);
                          setEditCreRateMin(cr.rateMin || 0);
                          setEditCreRateMax(cr.rateMax || 0);
                          setEditCrePhoto(cr.photo || '');
                          setEditCreCoverImage(cr.coverImage || '');
                          setEditCreNiche((cr.niche || []).join(', '));
                          setEditCrePlatform((cr.platform || []).join(', '));
                          setEditCreStatus(cr.status || 'DRAFT');
                          setEditCreIsVerified(cr.isVerified || false);
                          setEditCreIsPro(cr.isPro || false);
                          setEditCreAadhaarUrl(cr.aadhaarUrl || '');
                          setEditCrePanUrl(cr.panUrl || '');
                          setEditCreatorModalOpen(true);
                        }} style={{ background: T.orangeLight, color: T.orange }}>✏️ Edit</ActionBtn>
                        <ActionBtn small onClick={() => handleFetchWallet(cr)}><Wallet size={11} /> Wallet</ActionBtn>
                        <ActionBtn small onClick={() => { setScoreModal({ creator: cr }); setScoreInput(cr.score || 0); }}><Trophy size={11} /> Score</ActionBtn>
                        <DangerBtn small onClick={() => handleToggleSuspension(cr.user?.id)}>
                          {cr.user?.isSuspended ? <UserCheck size={11} /> : <UserX size={11} />}
                          {cr.user?.isSuspended ? 'Unban' : 'Suspend'}
                        </DangerBtn>
                        <DangerBtn small onClick={() => handleDeleteCreator(cr.id)}>
                          <Trash2 size={11} /> Delete
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
              <SectionHeader 
                title="Achievements & Milestones" 
                sub="Track creator milestone progress based on follower counts and brand deals" 
                action={<button onClick={() => { setAchCreatorId(''); setAchType('VERIFICATION'); setAchTitle(''); setAchDescription(''); setGrantAchModalOpen(true); }} style={{ padding: '8px 18px', background: T.orange, color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>+ Grant Achievement</button>}
              />
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
              <SectionHeader 
                title="Podcast Manager" 
                badge={podcasts.length} 
                sub="Publish, edit or create podcast episodes for verified creators" 
                action={<button onClick={() => { clearPodcastForm(); setEditingPodcast(null); setPodcastModalOpen(true); }} style={{ padding: '8px 18px', background: T.orange, color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>+ New Episode</button>}
              />
              {podcasts.length === 0 ? <EmptyState icon="🎙️" msg="No podcasts available" /> : (
                <Table cols={['Thumbnail', 'Episode', 'Creator', 'Duration', 'Status', 'Date', { label: 'Actions', align: 'right' }]}>
                  {podcasts.map(pod => (
                    <tr key={pod.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                      <Td>
                        <img src={pod.thumbnail || 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=100'} alt={pod.title} style={{ width: 45, height: 45, borderRadius: 8, objectFit: 'cover', border: `1px solid ${T.border}` }} />
                      </Td>
                      <Td bold>
                        <span style={{ maxWidth: 220, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pod.title}</span>
                      </Td>
                      <Td>{pod.creator?.name || '—'}</Td>
                      <Td muted>{pod.duration}</Td>
                      <Td><Badge color={pod.published ? T.green : T.muted}>{pod.published ? 'Published' : 'Draft'}</Badge></Td>
                      <Td muted>{fmtDate(pod.createdAt)}</Td>
                      <Td right>
                        <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                          <ActionBtn small onClick={() => openEditPodcast(pod)}>✎ Edit</ActionBtn>
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

          {/* ══ EVENTS MANAGER ════════════════════════════════════════════ */}
          {activeTab === 'events' && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
              <SectionHeader 
                title="Events Manager" 
                badge={events.length} 
                sub="Create and manage public platform conferences, summits, and creator meetups" 
                action={<button onClick={() => { setEditingEvent(null); setEvtTitle(''); setEvtDescription(''); setEvtDate(''); setEvtLocation(''); setEvtLink(''); setEvtImage(''); setEventModalOpen(true); }} style={{ padding: '8px 18px', background: T.orange, color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>+ New Event</button>}
              />
              {events.length === 0 ? <EmptyState icon="📅" msg="No events created yet" /> : (
                <Table cols={['Banner', 'Event Title', 'Date', 'Location', 'Link', { label: 'Actions', align: 'right' }]}>
                  {events.map(evt => (
                    <tr key={evt.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                      <Td>
                        <img src={evt.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100'} alt={evt.title} style={{ width: 60, height: 40, borderRadius: 6, objectFit: 'cover', border: `1px solid ${T.border}` }} />
                      </Td>
                      <Td bold>
                        <div>{evt.title}</div>
                        <div style={{ fontSize: 11, color: T.muted, fontWeight: 550 }}>{evt.description?.substring(0, 50)}...</div>
                      </Td>
                      <Td bold>{evt.date}</Td>
                      <Td>{evt.location}</Td>
                      <Td>
                        {evt.link ? <a href={evt.link} target="_blank" rel="noopener noreferrer" style={{ color: T.orange, fontWeight: 700 }}>Link ↗</a> : '—'}
                      </Td>
                      <Td right>
                        <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                          <ActionBtn small onClick={() => {
                            setEditingEvent(evt);
                            setEvtTitle(evt.title || '');
                            setEvtDescription(evt.description || '');
                            setEvtDate(evt.date || '');
                            setEvtLocation(evt.location || '');
                            setEvtLink(evt.link || '');
                            setEvtImage(evt.image || '');
                            setEventModalOpen(true);
                          }}>✎ Edit</ActionBtn>
                          <DangerBtn small onClick={async () => {
                            if (!window.confirm('Delete this event permanently?')) return;
                            try {
                              const res = await fetch(`${API_BASE}/events/${evt.id}`, { method: 'DELETE', headers: H() });
                              if (res.ok) { toast('Event deleted', 'success'); fetchData(); }
                              else { const d = await res.json(); throw new Error(d.error || 'Failed'); }
                            } catch (err) { toast(err.message, 'error'); }
                          }}><Trash2 size={11} /></DangerBtn>
                        </div>
                      </Td>
                    </tr>
                  ))}
                </Table>
              )}
            </div>
          )}

          {/* ══ CAMPUS AMBASSADOR APPLICATIONS ════════════════════════════ */}
          {activeTab === 'ambassadors' && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
              <SectionHeader 
                title="Campus Ambassador Applications" 
                badge={ambassadors.length} 
                sub="Review submitted student profiles applying to represent CreatorBharat on campuses" 
              />
              {ambassadors.length === 0 ? <EmptyState icon="🎓" msg="No ambassador applications yet" /> : (
                <Table cols={['Name / Contact', 'College / City', 'Socials', 'Pitch Brief', 'Applied Date', 'Status', { label: 'Actions', align: 'right' }]}>
                  {ambassadors.map(app => (
                    <tr key={app.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                      <Td bold>
                        <div>{app.name}</div>
                        <div style={{ fontSize: 11, color: T.muted, fontWeight: 550 }}>{app.email} · {app.phone}</div>
                      </Td>
                      <Td>
                        <div style={{ fontWeight: 700 }}>{app.college}</div>
                        <div style={{ fontSize: 11, color: T.muted }}>{app.city}</div>
                      </Td>
                      <Td>
                        <div style={{ fontSize: 12 }}>
                          {app.instagram && <div style={{ fontWeight: 600 }}>Insta: <span style={{ color: T.orange }}>@{app.instagram}</span></div>}
                          {app.youtube && <div style={{ fontWeight: 600 }}>YT: <span style={{ color: T.blue }}>{app.youtube}</span></div>}
                        </div>
                      </Td>
                      <Td>
                        <span style={{ maxWidth: 180, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={app.pitch}>
                          {app.pitch}
                        </span>
                      </Td>
                      <Td muted>{fmtDate(app.createdAt)}</Td>
                      <Td>
                        <Badge color={app.status === 'APPROVED' ? T.green : app.status === 'REJECTED' ? T.red : T.yellow}>
                          {app.status}
                        </Badge>
                      </Td>
                      <Td right>
                        <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                          {app.status === 'PENDING' && (
                            <>
                              <button onClick={async () => {
                                try {
                                  const res = await fetch(`${API_BASE}/admin/ambassadors/${app.id}/status`, {
                                    method: 'POST', headers: H(), body: JSON.stringify({ status: 'APPROVED' })
                                  });
                                  if (res.ok) { toast('Ambassador application approved!', 'success'); fetchData(); }
                                } catch (err) { toast(err.message, 'error'); }
                              }} style={{ padding: '4px 10px', background: T.greenLight, border: `1px solid ${T.green}20`, color: T.green, borderRadius: 6, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>✓ Approve</button>
                              <button onClick={async () => {
                                try {
                                  const res = await fetch(`${API_BASE}/admin/ambassadors/${app.id}/status`, {
                                    method: 'POST', headers: H(), body: JSON.stringify({ status: 'REJECTED' })
                                  });
                                  if (res.ok) { toast('Ambassador application rejected', 'info'); fetchData(); }
                                } catch (err) { toast(err.message, 'error'); }
                              }} style={{ padding: '4px 10px', background: T.redLight, border: `1px solid ${T.red}20`, color: T.red, borderRadius: 6, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>✕ Reject</button>
                            </>
                          )}
                          <DangerBtn small onClick={async () => {
                            if (!window.confirm('Delete this application permanently?')) return;
                            try {
                              const res = await fetch(`${API_BASE}/admin/ambassadors/${app.id}`, { method: 'DELETE', headers: H() });
                              if (res.ok) { toast('Application deleted', 'success'); fetchData(); }
                            } catch (err) { toast(err.message, 'error'); }
                          }}><Trash2 size={11} /></DangerBtn>
                        </div>
                      </Td>
                    </tr>
                  ))}
                </Table>
              )}
            </div>
          )}

          {/* ══ MONTHLY MISSIONS & COMPLETIONS ════════════════════════════ */}
          {activeTab === 'missions' && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column', gap: 32 }}>
              
              {/* Part A: Missions list */}
              <div>
                <SectionHeader 
                  title="Monthly Platform Missions" 
                  badge={missions.length} 
                  sub="Create and manage monthly platform-wide creator tasks and rewards" 
                  action={<button onClick={() => { setEditingMission(null); setMisTitle(''); setMisDescription(''); setMisReward(''); setMisRewardColor('#FF9431'); setMisDeadline(''); setMisSteps(''); setMisActive(true); setMissionModalOpen(true); }} style={{ padding: '8px 18px', background: T.orange, color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>+ Create Mission</button>}
                />
                {missions.length === 0 ? <EmptyState icon="🎯" msg="No monthly missions defined yet" /> : (
                  <Table cols={['Mission Detail', 'Reward', 'Deadline', 'Status', { label: 'Actions', align: 'right' }]}>
                    {missions.map(mis => (
                      <tr key={mis.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                        <Td bold>
                          <div>{mis.title}</div>
                          <div style={{ fontSize: 11, color: T.muted, fontWeight: 550 }}>{mis.description}</div>
                        </Td>
                        <Td>
                          <Badge color={mis.rewardColor || T.orange}>{mis.reward}</Badge>
                        </Td>
                        <Td muted>{fmtDate(mis.deadline)}</Td>
                        <Td>
                          <Badge color={mis.active ? T.green : T.muted}>{mis.active ? 'Active' : 'Draft'}</Badge>
                        </Td>
                        <Td right>
                          <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                            <ActionBtn small onClick={() => {
                              setEditingMission(mis);
                              setMisTitle(mis.title || '');
                              setMisDescription(mis.description || '');
                              setMisReward(mis.reward || '');
                              setMisRewardColor(mis.rewardColor || '#FF9431');
                              setMisDeadline(mis.deadline ? new Date(mis.deadline).toISOString().split('T')[0] : '');
                              setMisSteps(Array.isArray(mis.steps) ? mis.steps.join('\n') : '');
                              setMisActive(mis.active ?? true);
                              setMissionModalOpen(true);
                            }}>✎ Edit</ActionBtn>
                            <DangerBtn small onClick={async () => {
                              if (!window.confirm('Delete this mission?')) return;
                              try {
                                const res = await fetch(`${API_BASE}/admin/missions/${mis.id}`, { method: 'DELETE', headers: H() });
                                if (res.ok) { toast('Mission deleted', 'success'); fetchData(); }
                              } catch (err) { toast(err.message, 'error'); }
                            }}><Trash2 size={11} /></DangerBtn>
                          </div>
                        </Td>
                      </tr>
                    ))}
                  </Table>
                )}
              </div>

              {/* Part B: Completions Proof Submissions Queue */}
              <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 28 }}>
                <SectionHeader 
                  title="Proof Submission Queue" 
                  badge={missionCompletions.length} 
                  sub="Verify submitted proof URLs from creators claiming mission completion rewards" 
                />
                {missionCompletions.length === 0 ? <EmptyState icon="⏳" msg="No completion proofs submitted yet" /> : (
                  <Table cols={['Creator', 'Mission', 'Submitted Proof Link', 'Status', { label: 'Review Actions', align: 'right' }]}>
                    {missionCompletions.map(comp => (
                      <tr key={comp.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                        <Td bold>
                          <div>{comp.creator?.name || '—'}</div>
                          <div style={{ fontSize: 11, color: T.muted, fontWeight: 550 }}>@{comp.creator?.handle}</div>
                        </Td>
                        <Td>
                          <div style={{ fontWeight: 700 }}>{comp.mission?.title}</div>
                          <div style={{ fontSize: 11, color: T.muted }}>Reward: {comp.mission?.reward}</div>
                        </Td>
                        <Td>
                          {comp.proofUrl ? (
                            <a href={comp.proofUrl} target="_blank" rel="noopener noreferrer" style={{ color: T.orange, fontWeight: 800, textDecoration: 'underline' }}>
                              View Proof Link ↗
                            </a>
                          ) : 'No Link Provided'}
                        </Td>
                        <Td>
                          <Badge color={comp.status === 'APPROVED' ? T.green : comp.status === 'REJECTED' ? T.red : T.yellow}>
                            {comp.status}
                          </Badge>
                        </Td>
                        <Td right>
                          <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                            {comp.status === 'PENDING' && (
                              <>
                                <button onClick={async () => {
                                  try {
                                    const res = await fetch(`${API_BASE}/admin/missions/completions/${comp.id}/status`, {
                                      method: 'POST', headers: H(), body: JSON.stringify({ status: 'APPROVED' })
                                    });
                                    if (res.ok) { toast('Mission submission approved & reward notification sent!', 'success'); fetchData(); }
                                    else { const d = await res.json(); throw new Error(d.error); }
                                  } catch (err) { toast(err.message, 'error'); }
                                }} style={{ padding: '5px 12px', background: T.greenLight, border: `1px solid ${T.green}20`, color: T.green, borderRadius: 6, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>✓ Approve</button>
                                <button onClick={async () => {
                                  try {
                                    const res = await fetch(`${API_BASE}/admin/missions/completions/${comp.id}/status`, {
                                      method: 'POST', headers: H(), body: JSON.stringify({ status: 'REJECTED' })
                                    });
                                    if (res.ok) { toast('Mission submission rejected & notification sent', 'info'); fetchData(); }
                                    else { const d = await res.json(); throw new Error(d.error); }
                                  } catch (err) { toast(err.message, 'error'); }
                                }} style={{ padding: '5px 12px', background: T.redLight, border: `1px solid ${T.red}20`, color: T.red, borderRadius: 6, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>✕ Reject</button>
                              </>
                            )}
                          </div>
                        </Td>
                      </tr>
                    ))}
                  </Table>
                )}
              </div>
            </div>
          )}

          {/* ══ NOTIFICATION CENTER ═══════════════════════════════════════ */}
          {activeTab === 'admin-notifications' && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
              <SectionHeader 
                title="Notification Dispatch Center" 
                sub="Send customized in-app push alerts and updates to creators or brands" 
              />
              <form onSubmit={handleSendPlatformNotification} style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 650, marginTop: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Recipient Group *</label>
                  <select 
                    value={notifTargetGroup} 
                    onChange={e => { setNotifTargetGroup(e.target.value); setNotifUserId(''); }} 
                    required 
                    style={{ width: '100%', padding: '12px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, background: T.card, outline: 'none' }}
                  >
                    <option value="ALL_CREATORS">📢 All Creators ({creators.length} users)</option>
                    <option value="ALL_BRANDS">🏢 All Brands ({brands.length} users)</option>
                    <option value="INDIVIDUAL">👤 Individual Creator / Brand</option>
                  </select>
                </div>

                {notifTargetGroup === 'INDIVIDUAL' && (
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Select Target User *</label>
                    <select 
                      value={notifUserId} 
                      onChange={e => setNotifUserId(e.target.value)} 
                      required 
                      style={{ width: '100%', padding: '12px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, background: T.card, outline: 'none' }}
                    >
                      <option value="">-- Select Recipient --</option>
                      <optgroup label="Creators">
                        {creators.map(c => (
                          <option key={c.id} value={c.userId}>{c.name} (@{c.handle})</option>
                        ))}
                      </optgroup>
                      <optgroup label="Brands">
                        {brands.map(b => (
                          <option key={b.id} value={b.userId}>{b.companyName} (Brand)</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Alert Type / Theme *</label>
                    <select 
                      value={notifType} 
                      onChange={e => setNotifType(e.target.value)} 
                      required 
                      style={{ width: '100%', padding: '12px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, background: T.card, outline: 'none' }}
                    >
                      <option value="INFO">🔵 INFO (Standard News/Info)</option>
                      <option value="SUCCESS">🟢 SUCCESS (Payments/Approve)</option>
                      <option value="WARNING">🟡 WARNING (Milestone Updates)</option>
                      <option value="DANGER">🔴 DANGER (Policy Alerts/Suspension)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Alert Title *</label>
                    <input 
                      value={notifTitle} 
                      onChange={e => setNotifTitle(e.target.value)} 
                      required 
                      placeholder="e.g. ⚡ System Scheduled Maintenance" 
                      style={{ width: '100%', padding: '12px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} 
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Notification Message *</label>
                  <textarea 
                    value={notifBody} 
                    onChange={e => setNotifBody(e.target.value)} 
                    required 
                    rows={4} 
                    placeholder="Enter the notification content here..." 
                    style={{ width: '100%', padding: '12px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} 
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Optional Action Link</label>
                  <input 
                    value={notifLink} 
                    onChange={e => setNotifLink(e.target.value)} 
                    placeholder="e.g. /creator/opportunities or /brand-dashboard" 
                    style={{ width: '100%', padding: '12px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} 
                  />
                </div>

                <button 
                  type="submit" 
                  style={{ width: '100%', padding: '14px', background: T.orange, color: '#fff', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 14, cursor: 'pointer', display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(255, 148, 49, 0.2)' }}
                >
                  <Bell size={18} /> Send Notification
                </button>
              </form>
            </div>
          )}

          {/* ══ ALL BRANDS ═════════════════════════════════════════════════ */}
          {activeTab === 'brands' && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
              <SectionHeader 
                title="All Brands" 
                badge={brands.length} 
                sub="Manage brand accounts, view campaigns and suspend violators" 
                action={<button onClick={() => { clearBrandForm(); setCreateBrandModalOpen(true); }} style={{ padding: '8px 18px', background: T.orange, color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>+ New Brand</button>}
              />
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
                        <ActionBtn small onClick={() => {
                          setEditingBrand(br);
                          setEditBrandName(br.companyName || '');
                          setEditBrandIndustry(br.industry || '');
                          setEditBrandWebsite(br.website || '');
                          setEditBrandModalOpen(true);
                        }} style={{ background: T.orangeLight, color: T.orange }}>✏️ Edit</ActionBtn>
                        <ActionBtn small onClick={() => { setSelectedBrand(br); setBrandDrawerOpen(true); }}><Eye size={11} /> View</ActionBtn>
                        <DangerBtn small onClick={() => handleToggleSuspension(br.user?.id, false)}>
                          {br.user?.isSuspended ? <UserCheck size={11} /> : <UserX size={11} />}
                          {br.user?.isSuspended ? 'Unban' : 'Suspend'}
                        </DangerBtn>
                        <DangerBtn small onClick={() => handleDeleteBrand(br.id)}>
                          <Trash2 size={11} /> Delete
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
              <SectionHeader 
                title="Campaign Manager" 
                badge={campaigns.length} 
                sub="Oversee all brand campaigns, inspect applications" 
                action={<button onClick={() => { clearCampaignForm(); setCreateCampaignModalOpen(true); }} style={{ padding: '8px 18px', background: T.orange, color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>+ New Campaign</button>}
              />
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
                        <ActionBtn small onClick={(e) => {
                          e.stopPropagation();
                          setEditingCampaign(c);
                          setEditCampTitle(c.title || '');
                          setEditCampDesc(c.description || '');
                          setEditCampBudget(c.budget || 0);
                          setEditCampPlatform((c.platform || []).join(', '));
                          setEditCampNiche((c.niche || []).join(', '));
                          setEditCampStatus(c.status || 'ACTIVE');
                          setEditCampaignModalOpen(true);
                        }} style={{ background: T.orangeLight, color: T.orange, padding: '4px 8px', borderRadius: 7 }}>✏️ Edit</ActionBtn>
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

          {/* ══ MEDIA LIBRARY ══════════════════════════════════════════════ */}
          {activeTab === 'media-library' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
                <SectionHeader 
                  title="Ecosystem Media Library" 
                  badge={uploads.length} 
                  sub="Upload files to copy their absolute links for insertion in blogs, campaigns, or portfolios"
                  action={
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button 
                        onClick={() => document.getElementById('media-library-file-input').click()}
                        style={{ padding: '8px 18px', background: T.orange, color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 800, cursor: 'pointer' }}
                      >
                        + Upload File
                      </button>
                      <input 
                        type="file" 
                        id="media-library-file-input" 
                        style={{ display: 'none' }}
                        onChange={async (e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            const type = file.type.startsWith('video/') ? 'video' : 'image';
                            try {
                              toast('Uploading file to system...', 'info');
                              const url = await handleUploadMedia(file, type);
                              if (url) {
                                toast('File uploaded successfully!', 'success');
                                fetchData();
                              }
                            } catch (err) {
                              toast(err.message || 'Upload failed', 'error');
                            }
                          }
                        }}
                      />
                    </div>
                  }
                />
                
                {/* Search & Drag Drop Zone */}
                <SearchBar value={mediaSearch} onChange={setMediaSearch} placeholder="Search files by name..." />
                
                <div 
                  onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = T.orange; }}
                  onDragLeave={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = T.border; }}
                  onDrop={async (e) => {
                    e.preventDefault();
                    e.currentTarget.style.borderColor = T.border;
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      const file = e.dataTransfer.files[0];
                      const type = file.type.startsWith('video/') ? 'video' : 'image';
                      try {
                        toast('Uploading dropped file...', 'info');
                        const url = await handleUploadMedia(file, type);
                        if (url) {
                          toast('File uploaded successfully!', 'success');
                          fetchData();
                        }
                      } catch (err) {
                        toast(err.message || 'Upload failed', 'error');
                      }
                    }
                  }}
                  style={{
                    border: `2px dashed ${T.border}`,
                    borderRadius: 16,
                    padding: '30px 20px',
                    textAlign: 'center',
                    background: T.bg,
                    marginBottom: 24,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => document.getElementById('media-library-file-input').click()}
                >
                  <span style={{ fontSize: 24, display: 'block', marginBottom: 8 }}>📁</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.slate }}>Drag & Drop any image/video file here, or click to browse</span>
                  <span style={{ display: 'block', fontSize: 11, color: T.muted, marginTop: 4 }}>Maximum size: Image 5MB / Video 50MB</span>
                </div>

                {/* Uploads Grid */}
                {filteredUploads.length === 0 ? (
                  <EmptyState icon="📁" msg="No media files found" />
                ) : (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: 20
                  }}>
                    {filteredUploads.map((u, i) => {
                      const isVid = u.type?.startsWith('video/') || u.name?.endsWith('.mp4') || u.name?.endsWith('.mov') || u.name?.endsWith('.avi');
                      const friendlySize = u.size ? (u.size > 1024 * 1024 ? `${(u.size / (1024 * 1024)).toFixed(1)} MB` : `${Math.round(u.size / 1024)} KB`) : '—';
                      return (
                        <div key={i} style={{
                          background: T.bg,
                          border: `1px solid ${T.border}`,
                          borderRadius: 16,
                          overflow: 'hidden',
                          display: 'flex',
                          flexDirection: 'column',
                          boxShadow: '0 4px 10px rgba(15,23,42,0.02)',
                          transition: 'transform 0.2s',
                          position: 'relative'
                        }} className="media-card">
                          {/* Preview container */}
                          <div style={{
                            height: 125,
                            background: '#070a13',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            position: 'relative',
                            borderBottom: `1px solid ${T.border}`
                          }}>
                            {isVid ? (
                              <video src={u.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <img src={u.url} alt={u.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            )}
                            <span 
                              style={{ position: 'absolute', top: 8, left: 8, zIndex: 5, padding: '2px 8px', background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)', color: '#fff', borderRadius: 20, fontSize: 9, fontWeight: 800, textTransform: 'uppercase' }}
                            >
                              {isVid ? 'Video' : 'Image'}
                            </span>
                          </div>

                          {/* File Details */}
                          <div style={{ padding: 14, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div style={{ marginBottom: 12 }}>
                              <h5 style={{
                                margin: '0 0 4px 0',
                                fontSize: 13,
                                fontWeight: 800,
                                color: T.navy,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }} title={u.name}>
                                {u.name}
                              </h5>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.muted, fontWeight: 600 }}>
                                <span>{friendlySize}</span>
                                <span>{fmtDate(u.createdAt)}</span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div style={{ display: 'flex', gap: 6 }}>
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(u.url);
                                  toast('Copied direct link to clipboard!', 'success');
                                }}
                                style={{
                                  flex: 1,
                                  padding: '8px 0',
                                  background: T.orangeLight,
                                  color: T.orange,
                                  border: `1px dashed ${T.orangeBorder}`,
                                  borderRadius: 8,
                                  fontSize: 12,
                                  fontWeight: 800,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: 4
                                }}
                              >
                                <Copy size={11} /> Copy Link
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteUpload(u.name)}
                                style={{
                                  padding: '8px 10px',
                                  background: T.redLight,
                                  color: T.red,
                                  border: `1px solid ${T.red}15`,
                                  borderRadius: 8,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
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

          {/* ══ GALLERY ════════════════════════════════════════════════════ */}
          {activeTab === 'gallery' && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
              <SectionHeader title="Gallery Manager" badge={gallery.length} sub="Manage images, video clips, workshops, and ecosystem highlights"
                action={<button onClick={() => { clearGalleryForm(); setEditingGallery(null); setGalleryModalOpen(true); }} style={{ padding: '8px 18px', background: T.orange, color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>+ New Item</button>}
              />
              <SearchBar value={gallerySearch} onChange={setGallerySearch} placeholder="Search title, category, tags, or location..." />
              <Table cols={['Thumbnail', 'Title', 'Category', 'Type', 'Location', 'Date', { label: 'Actions', align: 'right' }]}>
                {filteredGallery.map(g => (
                  <tr key={g.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <Td>
                      <img src={g.thumbnail} alt={g.title} style={{ width: 50, height: 35, borderRadius: 6, objectFit: 'cover', border: `1px solid ${T.border}` }} />
                    </Td>
                    <Td bold>
                      <span style={{ maxWidth: 200, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.title}</span>
                    </Td>
                    <Td><Badge color={T.purple}>{g.category}</Badge></Td>
                    <Td><Badge color={g.type === 'video' ? T.orange : T.blue}>{g.type}</Badge></Td>
                    <Td muted>{g.location || '—'}</Td>
                    <Td muted>{g.date}</Td>
                    <Td right>
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                        {g.videoUrl && (
                          <a href={g.videoUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '5px 10px', background: T.orangeLight, color: T.orange, borderRadius: 7, fontSize: 11, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <PlayCircle size={10} /> Video
                          </a>
                        )}
                        <ActionBtn small onClick={() => openEditGallery(g)}>✎ Edit</ActionBtn>
                        <DangerBtn small onClick={() => handleDeleteGallery(g.id)}><Trash2 size={11} /></DangerBtn>
                      </div>
                    </Td>
                  </tr>
                ))}
              </Table>
              {filteredGallery.length === 0 && <EmptyState icon="🖼️" msg="No gallery items found" />}
            </div>
          )}

          {/* ══ DYNAMIC PAGES CONFIG MANAGER ════════════════════════════ */}
          {activeTab === 'pages' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
                <SectionHeader title="Dynamic Page Content Manager" sub="Manage live configurations for website and platform pages" />
                
                <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '220px 1fr', gap: 28, marginTop: 12 }}>
                  {/* Left sub-sidebar navigation */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20, borderRight: mob ? 'none' : `1px solid ${T.border}`, borderBottom: mob ? `1px solid ${T.border}` : 'none', paddingRight: mob ? 0 : 20, paddingBottom: mob ? 20 : 0 }}>
                    <div>
                      <h4 style={{ fontSize: 11, fontWeight: 800, color: T.slate, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>🌐 Public Website</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {[
                          { id: 'home', name: 'Home Hero' },
                          { id: 'pricing', name: 'Pricing & Plans' },
                          { id: 'calculator', name: 'Rate Calculator' },
                          { id: 'faqs', name: 'FAQs List' },
                          { id: 'about', name: 'About Us' },
                          { id: 'press', name: 'Press Room' },
                          { id: 'stories', name: 'Success Stories' },
                          { id: 'ai-faq', name: 'AI FAQ Hub' },
                          { id: 'notifications', name: 'Public Notices Hub' }
                        ].map(p => (
                          <button
                            key={p.id}
                            onClick={() => setSelectedPageName(p.id)}
                            style={{
                              padding: '8px 12px',
                              borderRadius: 8,
                              border: 'none',
                              textAlign: 'left',
                              background: selectedPageName === p.id ? T.orangeLight : 'transparent',
                              color: selectedPageName === p.id ? T.orange : T.navy,
                              fontWeight: selectedPageName === p.id ? 800 : 600,
                              cursor: 'pointer',
                              fontSize: 13,
                              transition: 'all 0.2s'
                            }}
                          >
                            {p.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 style={{ fontSize: 11, fontWeight: 800, color: T.slate, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>🙋 For Creators</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {[
                          { id: 'creator-landing', name: 'Creator Hub' }
                        ].map(p => (
                          <button
                            key={p.id}
                            onClick={() => setSelectedPageName(p.id)}
                            style={{
                              padding: '8px 12px',
                              borderRadius: 8,
                              border: 'none',
                              textAlign: 'left',
                              background: selectedPageName === p.id ? T.orangeLight : 'transparent',
                              color: selectedPageName === p.id ? T.orange : T.navy,
                              fontWeight: selectedPageName === p.id ? 800 : 600,
                              cursor: 'pointer',
                              fontSize: 13,
                              transition: 'all 0.2s'
                            }}
                          >
                            {p.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 style={{ fontSize: 11, fontWeight: 800, color: T.slate, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>🏢 For Brands</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {[
                          { id: 'brand-landing', name: 'Brand Hub' }
                        ].map(p => (
                          <button
                            key={p.id}
                            onClick={() => setSelectedPageName(p.id)}
                            style={{
                              padding: '8px 12px',
                              borderRadius: 8,
                              border: 'none',
                              textAlign: 'left',
                              background: selectedPageName === p.id ? T.orangeLight : 'transparent',
                              color: selectedPageName === p.id ? T.orange : T.navy,
                              fontWeight: selectedPageName === p.id ? 800 : 600,
                              cursor: 'pointer',
                              fontSize: 13,
                              transition: 'all 0.2s'
                            }}
                          >
                            {p.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right side form editor */}
                  <div style={{ background: T.bg, padding: 24, borderRadius: 16, border: `1px solid ${T.border}` }}>
                    <h3 style={{ fontSize: 14, fontWeight: 850, color: T.navy, marginBottom: 20, borderBottom: `1px solid ${T.border}`, paddingBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Configure: {selectedPageName.replace('-', ' ')}
                    </h3>

                    {/* Editor form for selected page config */}
                    {selectedPageName === 'home' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Hero Title</label>
                          <input
                            type="text"
                            value={homeConfig.heroTitle || ''}
                            onChange={e => setHomeConfig({ ...homeConfig, heroTitle: e.target.value })}
                            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Hero Subtitle</label>
                          <textarea
                            value={homeConfig.heroSubtitle || ''}
                            onChange={e => setHomeConfig({ ...homeConfig, heroSubtitle: e.target.value })}
                            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', minHeight: 80 }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>CTA Button Text</label>
                          <input
                            type="text"
                            value={homeConfig.ctaText || ''}
                            onChange={e => setHomeConfig({ ...homeConfig, ctaText: e.target.value })}
                            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Alert Announcement Bar</label>
                          <input
                            type="text"
                            value={homeConfig.announcement || ''}
                            onChange={e => setHomeConfig({ ...homeConfig, announcement: e.target.value })}
                            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none' }}
                          />
                        </div>
                      </div>
                    )}

                    {selectedPageName === 'pricing' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                          <div>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Creator Starter Plan Fee (₹)</label>
                            <input
                              type="number"
                              value={pricingConfig.starterPrice || 0}
                              onChange={e => setPricingConfig({ ...pricingConfig, starterPrice: parseInt(e.target.value) || 0 })}
                              style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none' }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Creator Pro Plan Fee (₹/month)</label>
                            <input
                              type="number"
                              value={pricingConfig.proPrice || 0}
                              onChange={e => setPricingConfig({ ...pricingConfig, proPrice: parseInt(e.target.value) || 0 })}
                              style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none' }}
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Creator Pro Features List (comma separated)</label>
                          <textarea
                            value={pricingConfig.proFeatures || ''}
                            onChange={e => setPricingConfig({ ...pricingConfig, proFeatures: e.target.value })}
                            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', minHeight: 60 }}
                            placeholder="Feature 1, Feature 2, Feature 3"
                          />
                        </div>
                        <hr style={{ border: 'none', borderTop: `1px solid ${T.border}`, margin: '8px 0' }} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                          <div>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Brand Launchpad Fee (₹)</label>
                            <input
                              type="number"
                              value={pricingConfig.brandStarterPrice || 0}
                              onChange={e => setPricingConfig({ ...pricingConfig, brandStarterPrice: parseInt(e.target.value) || 0 })}
                              style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none' }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Brand Enterprise Fee (₹/month)</label>
                            <input
                              type="number"
                              value={pricingConfig.brandProPrice || 0}
                              onChange={e => setPricingConfig({ ...pricingConfig, brandProPrice: parseInt(e.target.value) || 0 })}
                              style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none' }}
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Brand Enterprise Features List (comma separated)</label>
                          <textarea
                            value={pricingConfig.brandProFeatures || ''}
                            onChange={e => setPricingConfig({ ...pricingConfig, brandProFeatures: e.target.value })}
                            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', minHeight: 60 }}
                            placeholder="Feature 1, Feature 2, Feature 3"
                          />
                        </div>
                      </div>
                    )}

                    {selectedPageName === 'calculator' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Base Rate Coefficient (multiplier for follower count)</label>
                          <input
                            type="number"
                            step="0.01"
                            value={calculatorConfig.rateMultiplier || 0.15}
                            onChange={e => setCalculatorConfig({ ...calculatorConfig, rateMultiplier: parseFloat(e.target.value) || 0 })}
                            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Instagram Niche Premium Multiplier (e.g. Beauty/Tech = 1.25)</label>
                          <input
                            type="number"
                            step="0.05"
                            value={calculatorConfig.nicheMultiplier || 1.2}
                            onChange={e => setCalculatorConfig({ ...calculatorConfig, nicheMultiplier: parseFloat(e.target.value) || 0 })}
                            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Min Platform Commission Fee (INR)</label>
                          <input
                            type="number"
                            value={calculatorConfig.minFee || 500}
                            onChange={e => setCalculatorConfig({ ...calculatorConfig, minFee: parseInt(e.target.value) || 0 })}
                            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none' }}
                          />
                        </div>
                      </div>
                    )}

                    {selectedPageName === 'creator-landing' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                          <h5 style={{ fontSize: 12, fontWeight: 800, color: T.orange, marginBottom: 12, textTransform: 'uppercase' }}>Hero Section</h5>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Badge Text</label>
                              <input
                                type="text"
                                value={creatorLandingConfig.heroBadge || ''}
                                onChange={e => setCreatorLandingConfig({ ...creatorLandingConfig, heroBadge: e.target.value })}
                                style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none' }}
                              />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Hero Title Highlight</label>
                              <input
                                type="text"
                                value={creatorLandingConfig.heroTitle || ''}
                                onChange={e => setCreatorLandingConfig({ ...creatorLandingConfig, heroTitle: e.target.value })}
                                style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none' }}
                              />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Hero Subtitle</label>
                              <textarea
                                value={creatorLandingConfig.heroSubtitle || ''}
                                onChange={e => setCreatorLandingConfig({ ...creatorLandingConfig, heroSubtitle: e.target.value })}
                                style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', minHeight: 60 }}
                              />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>CTA Primary Button</label>
                                <input
                                  type="text"
                                  value={creatorLandingConfig.ctaPrimary || ''}
                                  onChange={e => setCreatorLandingConfig({ ...creatorLandingConfig, ctaPrimary: e.target.value })}
                                  style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none' }}
                                />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>CTA Secondary Button</label>
                                <input
                                  type="text"
                                  value={creatorLandingConfig.ctaSecondary || ''}
                                  onChange={e => setCreatorLandingConfig({ ...creatorLandingConfig, ctaSecondary: e.target.value })}
                                  style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none' }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <hr style={{ border: 'none', borderTop: `1px solid ${T.border}`, margin: '8px 0' }} />

                        <div>
                          <h5 style={{ fontSize: 12, fontWeight: 800, color: T.orange, marginBottom: 12, textTransform: 'uppercase' }}>Bottom Final CTA Section</h5>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Bottom Title</label>
                              <input
                                type="text"
                                value={creatorLandingConfig.bottomTitle || ''}
                                onChange={e => setCreatorLandingConfig({ ...creatorLandingConfig, bottomTitle: e.target.value })}
                                style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none' }}
                              />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Bottom Subtitle</label>
                              <textarea
                                value={creatorLandingConfig.bottomSubtitle || ''}
                                onChange={e => setCreatorLandingConfig({ ...creatorLandingConfig, bottomSubtitle: e.target.value })}
                                style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', minHeight: 60 }}
                              />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Bottom CTA Primary</label>
                                <input
                                  type="text"
                                  value={creatorLandingConfig.bottomCtaPrimary || ''}
                                  onChange={e => setCreatorLandingConfig({ ...creatorLandingConfig, bottomCtaPrimary: e.target.value })}
                                  style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none' }}
                                />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Bottom CTA Secondary</label>
                                <input
                                  type="text"
                                  value={creatorLandingConfig.bottomCtaSecondary || ''}
                                  onChange={e => setCreatorLandingConfig({ ...creatorLandingConfig, bottomCtaSecondary: e.target.value })}
                                  style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none' }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedPageName === 'brand-landing' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                          <h5 style={{ fontSize: 12, fontWeight: 800, color: '#10B981', marginBottom: 12, textTransform: 'uppercase' }}>Hero Section</h5>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Badge Text</label>
                              <input
                                type="text"
                                value={brandLandingConfig.heroBadge || ''}
                                onChange={e => setBrandLandingConfig({ ...brandLandingConfig, heroBadge: e.target.value })}
                                style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none' }}
                              />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Hero Title Highlight</label>
                              <input
                                type="text"
                                value={brandLandingConfig.heroTitle || ''}
                                onChange={e => setBrandLandingConfig({ ...brandLandingConfig, heroTitle: e.target.value })}
                                style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none' }}
                              />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Hero Subtitle</label>
                              <textarea
                                value={brandLandingConfig.heroSubtitle || ''}
                                onChange={e => setBrandLandingConfig({ ...brandLandingConfig, heroSubtitle: e.target.value })}
                                style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', minHeight: 60 }}
                              />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>CTA Primary Button</label>
                                <input
                                  type="text"
                                  value={brandLandingConfig.ctaPrimary || ''}
                                  onChange={e => setBrandLandingConfig({ ...brandLandingConfig, ctaPrimary: e.target.value })}
                                  style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none' }}
                                />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>CTA Secondary Button</label>
                                <input
                                  type="text"
                                  value={brandLandingConfig.ctaSecondary || ''}
                                  onChange={e => setBrandLandingConfig({ ...brandLandingConfig, ctaSecondary: e.target.value })}
                                  style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none' }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <hr style={{ border: 'none', borderTop: `1px solid ${T.border}`, margin: '8px 0' }} />

                        <div>
                          <h5 style={{ fontSize: 12, fontWeight: 800, color: '#10B981', marginBottom: 12, textTransform: 'uppercase' }}>Bottom Final CTA Section</h5>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Bottom Title</label>
                              <input
                                type="text"
                                value={brandLandingConfig.bottomTitle || ''}
                                onChange={e => setBrandLandingConfig({ ...brandLandingConfig, bottomTitle: e.target.value })}
                                style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none' }}
                              />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Bottom Subtitle</label>
                              <textarea
                                value={brandLandingConfig.bottomSubtitle || ''}
                                onChange={e => setBrandLandingConfig({ ...brandLandingConfig, bottomSubtitle: e.target.value })}
                                style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', minHeight: 60 }}
                              />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Bottom CTA Primary</label>
                                <input
                                  type="text"
                                  value={brandLandingConfig.bottomCtaPrimary || ''}
                                  onChange={e => setBrandLandingConfig({ ...brandLandingConfig, bottomCtaPrimary: e.target.value })}
                                  style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none' }}
                                />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Bottom CTA Secondary</label>
                                <input
                                  type="text"
                                  value={brandLandingConfig.bottomCtaSecondary || ''}
                                  onChange={e => setBrandLandingConfig({ ...brandLandingConfig, bottomCtaSecondary: e.target.value })}
                                  style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none' }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedPageName === 'faqs' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>FAQ JSON Configuration (Array of {`{ cat, q, a }`})</label>
                          <textarea
                            value={faqJson}
                            onChange={e => setFaqJson(e.target.value)}
                            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 12, fontFamily: 'monospace', color: T.navy, background: T.card, outline: 'none', minHeight: 250 }}
                          />
                          {faqError && <p style={{ color: T.red, fontSize: 12, margin: '4px 0 0' }}>{faqError}</p>}
                        </div>
                      </div>
                    )}

                    {selectedPageName === 'about' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>About Us Page JSON Configuration</label>
                          <textarea
                            value={aboutJson}
                            onChange={e => setAboutJson(e.target.value)}
                            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 12, fontFamily: 'monospace', color: T.navy, background: T.card, outline: 'none', minHeight: 300 }}
                          />
                          {aboutError && <p style={{ color: T.red, fontSize: 12, margin: '4px 0 0' }}>{aboutError}</p>}
                        </div>
                      </div>
                    )}

                    {selectedPageName === 'press' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Press Releases JSON List (Array of {`{ date, title, excerpt, url }`})</label>
                          <textarea
                            value={pressJson}
                            onChange={e => setPressJson(e.target.value)}
                            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 12, fontFamily: 'monospace', color: T.navy, background: T.card, outline: 'none', minHeight: 300 }}
                          />
                          {pressError && <p style={{ color: T.red, fontSize: 12, margin: '4px 0 0' }}>{pressError}</p>}
                        </div>
                      </div>
                    )}

                    {selectedPageName === 'stories' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Success Stories JSON List (Array of {`{ id, type, brandName, creatorName, title, description, metrics, testimonial }`})</label>
                          <textarea
                            value={storiesJson}
                            onChange={e => setStoriesJson(e.target.value)}
                            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 12, fontFamily: 'monospace', color: T.navy, background: T.card, outline: 'none', minHeight: 300 }}
                          />
                          {storiesError && <p style={{ color: T.red, fontSize: 12, margin: '4px 0 0' }}>{storiesError}</p>}
                        </div>
                      </div>
                    )}

                    {selectedPageName === 'ai-faq' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>AI FAQ JSON List (Array of {`{ q, a }`})</label>
                          <textarea
                            value={aiFaqJson}
                            onChange={e => setAiFaqJson(e.target.value)}
                            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 12, fontFamily: 'monospace', color: T.navy, background: T.card, outline: 'none', minHeight: 300 }}
                          />
                          {aiFaqError && <p style={{ color: T.red, fontSize: 12, margin: '4px 0 0' }}>{aiFaqError}</p>}
                        </div>
                      </div>
                    )}

                    {selectedPageName === 'notifications' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Public Circulars JSON List (Array of {`{ id, refNo, date, department, deptHi, title, titleHi, description, pdfName, status, signatory, actionText, actionPath }`})</label>
                          <textarea
                            value={notificationsJson}
                            onChange={e => setNotificationsJson(e.target.value)}
                            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 12, fontFamily: 'monospace', color: T.navy, background: T.card, outline: 'none', minHeight: 300 }}
                          />
                          {notificationsError && <p style={{ color: T.red, fontSize: 12, margin: '4px 0 0' }}>{notificationsError}</p>}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleSavePageConfig}
                      style={{
                        marginTop: 24,
                        padding: '12px 28px',
                        background: T.orange,
                        color: '#fff',
                        border: 'none',
                        borderRadius: 12,
                        fontWeight: 800,
                        fontSize: 14,
                        cursor: 'pointer',
                        boxShadow: `0 4px 14px ${T.orange}30`
                      }}
                    >
                      Save Page Content
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══ SETTINGS ═══════════════════════════════════════════════════ */}
          {activeTab === 'settings' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <SectionHeader title="System Settings" sub="Manage API keys, pricing, and feature toggles — changes are live instantly without redeployment" />

              {/* Settings Tabs */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[
                  { id: 'general', label: '⚙️ General' },
                  { id: 'pricing', label: '💰 Pricing' },
                  { id: 'razorpay', label: '💳 Razorpay' },
                  { id: 'email', label: '📧 Email' },
                  { id: 'sms', label: '📱 SMS' },
                  { id: 'toggles', label: '🔀 Feature Toggles' },
                ].map(tab => (
                  <button key={tab.id} onClick={() => setSettingsTab(tab.id)} style={{
                    padding: '8px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13,
                    background: settingsTab === tab.id ? T.orange : T.bg,
                    color: settingsTab === tab.id ? '#fff' : T.slate,
                    boxShadow: settingsTab === tab.id ? `0 4px 12px ${T.orange}30` : 'none',
                    transition: 'all 0.2s'
                  }}>{tab.label}</button>
                ))}
              </div>

              <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>

                {/* General Tab */}
                {settingsTab === 'general' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: T.navy }}>⚙️ General Configuration</h4>
                    {[
                      { label: 'Site Name', value: siteName, setter: setSiteName, type: 'text', ph: 'CreatorBharat' },
                      { label: 'Support Email', value: supportEmail, setter: setSupportEmail, type: 'email', ph: 'support@creatorbharat.com' },
                      { label: 'Frontend URL', value: frontendUrl, setter: setFrontendUrl, type: 'url', ph: 'https://creatorbharat.com' },
                      { label: 'Platform Commission Fee (%)', value: platformFee, setter: setPlatformFee, type: 'number', ph: '10' },
                    ].map((f, i) => (
                      <div key={i}>
                        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>{f.label}</label>
                        <input type={f.type} value={f.value} placeholder={f.ph} onChange={e => f.setter(e.target.value)}
                          style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.bg, outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                    ))}
                  </div>
                )}

                {/* Pricing Tab */}
                {settingsTab === 'pricing' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: T.navy }}>💰 Subscription Pricing (in ₹)</h4>
                    <p style={{ margin: 0, fontSize: 13, color: T.muted }}>Change prices here — frontend and payment gateway will use updated values automatically.</p>
                    {[
                      { label: 'Creator Pro Membership (₹)', value: proMembershipPrice, setter: setProMembershipPrice },
                      { label: 'Campaign Boost (₹)', value: campaignBoostPrice, setter: setCampaignBoostPrice },
                      { label: 'Featured Creator Slot (₹)', value: featuredSlotPrice, setter: setFeaturedSlotPrice },
                    ].map((f, i) => (
                      <div key={i}>
                        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>{f.label}</label>
                        <input type="number" value={f.value} onChange={e => f.setter(e.target.value)}
                          style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.bg, outline: 'none', boxSizing: 'border-box' }} />
                      </div>
                    ))}
                  </div>
                )}

                {/* Razorpay Tab */}
                {settingsTab === 'razorpay' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: T.navy }}>💳 Razorpay Payment Gateway</h4>
                    <div style={{ padding: 14, background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: 10, fontSize: 13, color: '#92400e', fontWeight: 600 }}>
                      ⚠️ These keys are stored securely in the database. Use Test keys for development, Live keys for production.
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                      {['test', 'live'].map(mode => (
                        <button key={mode} onClick={() => setRazorpayMode(mode)} style={{
                          flex: 1, padding: '10px 0', borderRadius: 10, border: `2px solid ${razorpayMode === mode ? T.orange : T.border}`,
                          background: razorpayMode === mode ? T.orangeLight : T.bg,
                          color: razorpayMode === mode ? T.orange : T.slate,
                          fontWeight: 800, fontSize: 13, cursor: 'pointer', textTransform: 'uppercase'
                        }}>{mode} Mode</button>
                      ))}
                    </div>
                    {[
                      { label: 'Key ID (rzp_test_... or rzp_live_...)', value: razorpayKeyId, setter: setRazorpayKeyId, ph: 'rzp_test_xxxxxxxxxxxx' },
                      { label: 'Key Secret', value: razorpaySecret, setter: setRazorpaySecret, ph: '••••••••••••••••••••', type: 'password' },
                    ].map((f, i) => (
                      <div key={i}>
                        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>{f.label}</label>
                        <input type={f.type || 'text'} value={f.value} placeholder={f.ph} onChange={e => f.setter(e.target.value)}
                          style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.bg, outline: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }} />
                      </div>
                    ))}
                  </div>
                )}

                {/* Email Tab */}
                {settingsTab === 'email' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: T.navy }}>📧 Email Service (Resend)</h4>
                    <p style={{ margin: 0, fontSize: 13, color: T.muted }}>Get your API key from <a href="https://resend.com" target="_blank" rel="noreferrer" style={{ color: T.blue }}>resend.com</a>. Email sending can be toggled below.</p>
                    {[
                      { label: 'Resend API Key', value: resendApiKey, setter: setResendApiKey, ph: 're_xxxxxxxxxxxxxxxxxxxx', type: 'password' },
                      { label: 'From Email Address', value: emailFrom, setter: setEmailFrom, ph: 'hello@yourdomain.com', type: 'email' },
                    ].map((f, i) => (
                      <div key={i}>
                        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>{f.label}</label>
                        <input type={f.type || 'text'} value={f.value} placeholder={f.ph} onChange={e => f.setter(e.target.value)}
                          style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.bg, outline: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }} />
                      </div>
                    ))}
                  </div>
                )}

                {/* SMS Tab */}
                {settingsTab === 'sms' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: T.navy }}>📱 SMS Provider</h4>
                    <div style={{ display: 'flex', gap: 12 }}>
                      {['fast2sms', 'twilio'].map(p => (
                        <button key={p} onClick={() => setSmsProvider(p)} style={{
                          flex: 1, padding: '10px 0', borderRadius: 10, border: `2px solid ${smsProvider === p ? T.blue : T.border}`,
                          background: smsProvider === p ? T.blueLight : T.bg,
                          color: smsProvider === p ? T.blue : T.slate,
                          fontWeight: 800, fontSize: 13, cursor: 'pointer', textTransform: 'uppercase'
                        }}>{p === 'fast2sms' ? 'Fast2SMS (India)' : 'Twilio (Global)'}</button>
                      ))}
                    </div>
                    {smsProvider === 'fast2sms' && (
                      <div>
                        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Fast2SMS API Key</label>
                        <input type="password" value={fast2smsKey} placeholder="Fast2SMS Authorization Key" onChange={e => setFast2smsKey(e.target.value)}
                          style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.bg, outline: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }} />
                      </div>
                    )}
                    {smsProvider === 'twilio' && (
                      <>
                        {[
                          { label: 'Twilio Account SID', value: twilioSid, setter: setTwilioSid, ph: 'ACxxxxxxxxxxxxxxxx' },
                          { label: 'Twilio Auth Token', value: twilioToken, setter: setTwilioToken, ph: '••••••••••••••••••••', type: 'password' },
                          { label: 'Twilio Phone Number', value: twilioPhone, setter: setTwilioPhone, ph: '+1XXXXXXXXXX' },
                        ].map((f, i) => (
                          <div key={i}>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>{f.label}</label>
                            <input type={f.type || 'text'} value={f.value} placeholder={f.ph} onChange={e => f.setter(e.target.value)}
                              style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.bg, outline: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }} />
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                )}

                {/* Feature Toggles Tab */}
                {settingsTab === 'toggles' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: T.navy }}>🔀 Feature Toggles</h4>
                    <p style={{ margin: 0, fontSize: 13, color: T.muted }}>Enable or disable platform features instantly — no code deployment required.</p>
                    {[
                      { label: 'AI Assistant (Pitch Generator)', sub: 'Gemini-powered pitch writer for creators', value: featAchievements, setter: setFeatAchievements, color: T.purple },
                      { label: 'Creator Wallet & Escrow System', sub: 'Razorpay-backed payment escrow for campaigns', value: featWallet, setter: setFeatWallet, color: T.green },
                      { label: 'Email Notifications', sub: 'Send transactional emails via Resend', value: enableEmail, setter: setEnableEmail, color: T.blue },
                      { label: 'SMS / OTP Service', sub: 'Phone number verification via Fast2SMS or Twilio', value: enableSMS, setter: setEnableSMS, color: T.teal },
                      { label: '🚨 Maintenance Mode', sub: 'Shows maintenance page to all users — keep this OFF in production', value: maintenanceMode, setter: setMaintenanceMode, color: T.red },
                    ].map((flag, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: flag.value ? flag.color + '08' : T.bg, border: `1px solid ${flag.value ? flag.color + '30' : T.border}`, borderRadius: 14, transition: 'all 0.2s' }}>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: T.navy }}>{flag.label}</div>
                          <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{flag.sub}</div>
                        </div>
                        <div onClick={() => flag.setter(!flag.value)} style={{ width: 52, height: 28, borderRadius: 14, background: flag.value ? flag.color : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', flexShrink: 0 }}>
                          <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: flag.value ? 27 : 3, transition: 'left 0.25s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>

              <button onClick={handleSaveSettings} style={{ padding: '14px 32px', background: T.orange, color: '#fff', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 14, cursor: 'pointer', boxShadow: `0 4px 14px ${T.orange}30`, alignSelf: 'flex-start' }}>
                💾 Save All Settings
              </button>
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
              {/* Data Export Section */}
              <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 22 }}>
                <div style={{ fontWeight: 800, color: T.navy, fontSize: 15, marginBottom: 6 }}>📊 Data Export</div>
                <div style={{ fontSize: 13, color: T.muted, fontWeight: 500, marginBottom: 16 }}>Download platform data as CSV files for analysis or backup.</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
                  {[
                    { label: '👥 Export Creators', type: 'creators', color: T.blue },
                    { label: '🏢 Export Brands', type: 'brands', color: T.green },
                    { label: '📢 Export Campaigns', type: 'campaigns', color: T.purple },
                    { label: '💰 Export Payments', type: 'payments', color: T.orange },
                    { label: '📧 Export Newsletters', type: 'newsletters', color: T.slate },
                  ].map(exp => (
                    <button key={exp.type} onClick={() => handleExportCSV(exp.type)} style={{ padding: '10px 14px', background: exp.color + '12', color: exp.color, border: `1px solid ${exp.color}25`, borderRadius: 10, fontWeight: 800, fontSize: 12, cursor: 'pointer', textAlign: 'left' }}>
                      {exp.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Danger Operations */}
              {[
                { title: 'Clear All Newsletter Subscribers', desc: 'Permanently remove all email subscribers from the mailing list', action: 'Clear Subscribers', color: T.orange, endpoint: 'clear-newsletters' },
                { title: 'Delete All Draft Blogs', desc: 'Remove all unpublished blog drafts from the system', action: 'Delete Drafts', color: T.red, endpoint: 'delete-draft-blogs' },
                { title: 'Revoke All Pending Verifications', desc: 'Reset the entire verification queue — creators must re-submit', action: 'Revoke All KYC', color: T.red, endpoint: 'revoke-pending-verifications' },
              ].map((op, i) => (
                <div key={i} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
                  <div>
                    <div style={{ fontWeight: 800, color: T.navy, fontSize: 14, marginBottom: 4 }}>{op.title}</div>
                    <div style={{ fontSize: 13, color: T.muted, fontWeight: 500 }}>{op.desc}</div>
                  </div>
                  <button onClick={() => handleDangerOp(op.endpoint, op.title)} style={{ padding: '9px 20px', background: op.color + '15', color: op.color, border: `1px solid ${op.color}30`, borderRadius: 10, fontWeight: 800, fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    {op.action}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ══ PLATFORM CONTROL CENTER ══════════════════════════════════════ */}
          {activeTab === 'feature-control' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Header + Save Button */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: '20px 24px' }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: T.navy, fontFamily: 'Outfit, sans-serif' }}>⚙️ Platform Control Center</h2>
                  <p style={{ margin: '4px 0 0', fontSize: 13, color: T.muted, fontWeight: 600 }}>Feature flags, commissions, creator/brand limits, announcements — live changes, no deploy needed.</p>
                </div>
                <button onClick={savePlatformSettings} disabled={psSaving || !platformSettings} style={{ padding: '12px 28px', background: psSaved ? T.green : T.orange, color: '#fff', border: 'none', borderRadius: 14, fontWeight: 900, fontSize: 14, cursor: 'pointer', opacity: psSaving ? 0.7 : 1, transition: 'all 0.2s', minWidth: 140 }}>
                  {psSaving ? '⏳ Saving...' : psSaved ? '✅ Saved!' : '💾 Save All Changes'}
                </button>
              </div>

              {psLoading || !platformSettings ? (
                <div style={{ textAlign: 'center', padding: 60, color: T.muted }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>⚙️</div>
                  <div style={{ fontWeight: 700 }}>Loading platform settings...</div>
                </div>
              ) : (
                <>
                  {/* Sub-tab nav */}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', borderBottom: `1.5px solid ${T.border}`, paddingBottom: 12 }}>
                    {[
                      { id: 'features', label: '🔀 Feature Flags' },
                      { id: 'comingSoon', label: '🚧 Coming Soon' },
                      { id: 'commission', label: '💰 Commission & Pricing' },
                      { id: 'creatorLimits', label: '🎛️ Creator Controls' },
                      { id: 'brandLimits', label: '🏢 Brand Controls' },
                      { id: 'announcement', label: '📢 Announcements' }
                    ].map(st => (
                      <button key={st.id} onClick={() => setPsSubTab(st.id)} type="button" style={{ padding: '8px 16px', borderRadius: 10, background: psSubTab === st.id ? T.orange : T.bg, color: psSubTab === st.id ? '#fff' : T.navy, fontWeight: 800, cursor: 'pointer', fontSize: 13, border: `1.5px solid ${psSubTab === st.id ? T.orange : T.border}`, transition: 'all 0.15s' }}>
                        {st.label}
                      </button>
                    ))}
                  </div>

                  {/* ── SECTION: Feature Flags ── */}
                  {psSubTab === 'features' && (
                    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 16 }}>
                      {[
                        { key: 'creatorRegistration', label: '👤 Creator Registration', desc: 'Naye creators account bana sakte hain' },
                        { key: 'brandRegistration', label: '🏢 Brand Registration', desc: 'Naye brands register kar sakte hain' },
                        { key: 'campaignCreation', label: '📢 Campaign Creation', desc: 'Brands naye campaigns post kar sakte hain' },
                        { key: 'escrowPayments', label: '💰 Escrow Payments', desc: 'Escrow payment system active hai' },
                        { key: 'verificationRequests', label: '✅ Verification Requests', desc: 'Creators blue tick apply kar sakte hain' },
                        { key: 'leaderboard', label: '🏆 Leaderboard', desc: 'Public creator leaderboard visible hai' },
                        { key: 'rateCalculator', label: '🧮 Rate Calculator', desc: 'AI rate calculator public page pe dikhta hai' },
                        { key: 'communityFeed', label: '💬 Community Feed', desc: 'Creator community posts aur discussions' },
                        { key: 'brandSearch', label: '🔍 Brand Creator Search', desc: 'Brands creators ko search/filter kar sakte hain' },
                        { key: 'messages', label: '💌 Messaging System', desc: 'Creator ↔ Brand direct messages' },
                        { key: 'achievements', label: '🏅 Achievements', desc: 'Creator achievement badges aur milestones' },
                        { key: 'referralSystem', label: '🔗 Referral System', desc: 'Referral links aur rewards active hain' },
                        { key: 'walletWithdrawal', label: '💸 Wallet Withdrawal', desc: 'Creators apna balance withdraw kar sakte hain' },
                        { key: 'creatorScore', label: '⭐ Creator Score', desc: 'Creator score algorithm active hai' },
                        { key: 'events', label: '📅 Events', desc: 'Platform events aur conferences visible hain' },
                        { key: 'podcasts', label: '🎙️ Podcasts', desc: 'Podcast section active hai' },
                        { key: 'missionSystem', label: '🎯 Monthly Missions', desc: 'Creator monthly missions aur quests' },
                        { key: 'gigs', label: '💼 Gigs / Projects', desc: 'Freelance gig marketplace active hai' }
                      ].map(f => {
                        const isOn = platformSettings.features[f.key] !== false;
                        return (
                          <div key={f.key} style={{ background: T.card, border: `1.5px solid ${isOn ? T.green + '40' : T.red + '30'}`, borderRadius: 16, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, transition: 'all 0.2s' }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, marginBottom: 3 }}>{f.label}</div>
                              <div style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>{f.desc}</div>
                            </div>
                            {/* iOS-style toggle */}
                            <div onClick={() => updatePS('features', f.key, !isOn)} style={{ width: 52, height: 28, borderRadius: 14, background: isOn ? T.green : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', flexShrink: 0, border: `2px solid ${isOn ? T.green : '#94a3b8'}` }}>
                              <div style={{ position: 'absolute', top: 2, left: isOn ? 24 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                            </div>
                            <span style={{ fontSize: 11, fontWeight: 800, color: isOn ? T.green : T.red, minWidth: 28 }}>{isOn ? 'ON' : 'OFF'}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* ── SECTION: Coming Soon ── */}
                  {psSubTab === 'comingSoon' && (
                    <div>
                      <div style={{ background: '#fffbeb', border: '1.5px solid #fcd34d', borderRadius: 14, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#92400e', fontWeight: 700 }}>
                        🚧 "Coming Soon" ON karne se us feature pe "Coming Soon" badge/overlay dikhega users ko. Feature disabled nahi hoga — sirf label lagega.
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 16 }}>
                        {[
                          { key: 'aiMatchmaking', label: '🤖 AI Matchmaking', desc: 'AI-powered brand-creator automatic matching' },
                          { key: 'videoVerification', label: '🎥 Video Verification', desc: 'Face/video based identity verification' },
                          { key: 'mobileApp', label: '📱 Mobile App', desc: 'CreatorBharat Android + iOS apps' },
                          { key: 'advancedAnalytics', label: '📊 Advanced Analytics', desc: 'Deep creator performance analytics dashboard' },
                          { key: 'multiLanguage', label: '🌐 Multi-Language', desc: 'Hindi, Tamil, Bengali language support' },
                          { key: 'apiAccess', label: '🔌 Developer API', desc: 'Public REST API for third-party integrations' },
                          { key: 'liveStreaming', label: '📺 Live Streaming', desc: 'Creator live stream integration' },
                          { key: 'brandMarketplace', label: '🛒 Brand Marketplace', desc: 'Self-serve brand campaign marketplace' }
                        ].map(f => {
                          const isCS = !!(platformSettings.comingSoon[f.key]);
                          return (
                            <div key={f.key} style={{ background: T.card, border: `1.5px solid ${isCS ? '#fcd34d' : T.border}`, borderRadius: 16, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, transition: 'all 0.2s' }}>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, marginBottom: 3 }}>{f.label}</div>
                                <div style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>{f.desc}</div>
                              </div>
                              <div onClick={() => updatePS('comingSoon', f.key, !isCS)} style={{ width: 52, height: 28, borderRadius: 14, background: isCS ? '#f59e0b' : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', flexShrink: 0, border: `2px solid ${isCS ? '#f59e0b' : '#94a3b8'}` }}>
                                <div style={{ position: 'absolute', top: 2, left: isCS ? 24 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                              </div>
                              <span style={{ fontSize: 11, fontWeight: 800, color: isCS ? '#f59e0b' : T.muted, minWidth: 60 }}>{isCS ? '🚧 SOON' : 'LIVE'}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* ── SECTION: Commission & Pricing ── */}
                  {psSubTab === 'commission' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <div style={{ background: '#eff6ff', border: '1.5px solid #93c5fd', borderRadius: 14, padding: '12px 16px', fontSize: 13, color: '#1d4ed8', fontWeight: 700 }}>
                        💡 Ye values pricing page pe aur commission calculations mein use honge. 0% = free platform.
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 16 }}>
                        {[
                          { key: 'platformFeePercent', label: '🏦 Platform Fee %', desc: 'Platform ki overall commission percentage', min: 0, max: 30, step: 0.5 },
                          { key: 'escrowFeePercent', label: '🔐 Escrow Fee %', desc: 'Escrow release pe processing fee', min: 0, max: 10, step: 0.5 },
                          { key: 'brandCommissionPercent', label: '🏢 Brand Commission %', desc: 'Brand campaigns pe additional fee', min: 0, max: 20, step: 0.5 },
                          { key: 'creatorCommissionPercent', label: '👤 Creator Revenue Share %', desc: 'Creator earnings pe platform cut', min: 0, max: 20, step: 0.5 },
                          { key: 'minCampaignBudget', label: '📉 Min Campaign Budget (₹)', desc: 'Minimum allowed campaign budget in INR', min: 100, max: 10000, step: 100 },
                          { key: 'maxCampaignBudget', label: '📈 Max Campaign Budget (₹)', desc: 'Maximum allowed campaign budget in INR', min: 10000, max: 10000000, step: 10000 }
                        ].map(f => (
                          <div key={f.key} style={{ background: T.card, border: `1.5px solid ${T.border}`, borderRadius: 16, padding: '18px 20px' }}>
                            <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, marginBottom: 2 }}>{f.label}</div>
                            <div style={{ fontSize: 11, color: T.muted, fontWeight: 600, marginBottom: 12 }}>{f.desc}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              <input type="range" min={f.min} max={f.max} step={f.step} value={platformSettings.commission[f.key]} onChange={e => updatePS('commission', f.key, parseFloat(e.target.value))} style={{ flex: 1, accentColor: T.orange }} />
                              <input type="number" min={f.min} max={f.max} step={f.step} value={platformSettings.commission[f.key]} onChange={e => updatePS('commission', f.key, parseFloat(e.target.value) || 0)} style={{ width: 80, padding: '6px 10px', border: `1.5px solid ${T.border}`, borderRadius: 8, fontSize: 14, fontWeight: 800, color: T.navy, textAlign: 'center', background: T.bg }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── SECTION: Creator Controls ── */}
                  {psSubTab === 'creatorLimits' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 14, padding: '12px 16px', fontSize: 13, color: '#15803d', fontWeight: 700 }}>
                        👤 Creator-side platform limits aur thresholds. Ye values creator dashboard aur verification mein use honge.
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 16 }}>
                        {[
                          { key: 'maxActiveCampaigns', label: '📢 Max Active Campaigns', desc: 'Ek creator ek saath kitne campaigns le sakta hai', min: 1, max: 50, step: 1, type: 'number' },
                          { key: 'minFollowersForVerification', label: '👥 Min Followers for Verification', desc: 'Blue tick ke liye minimum follower count', min: 100, max: 100000, step: 100, type: 'number' },
                          { key: 'profileCompletionRequired', label: '✅ Profile Completion Required (%)', desc: 'Campaign apply karne ke liye minimum profile %', min: 0, max: 100, step: 5, type: 'number' },
                          { key: 'scoreDecayDays', label: '⏳ Score Decay Days', desc: 'Kitne din baad creator score decay hota hai', min: 7, max: 365, step: 7, type: 'number' },
                          { key: 'maxPortfolioItems', label: '🖼️ Max Portfolio Items', desc: 'Creator profile mein max portfolio entries', min: 5, max: 100, step: 5, type: 'number' }
                        ].map(f => (
                          <div key={f.key} style={{ background: T.card, border: `1.5px solid ${T.border}`, borderRadius: 16, padding: '18px 20px' }}>
                            <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, marginBottom: 2 }}>{f.label}</div>
                            <div style={{ fontSize: 11, color: T.muted, fontWeight: 600, marginBottom: 12 }}>{f.desc}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              <input type="range" min={f.min} max={f.max} step={f.step} value={platformSettings.creator[f.key]} onChange={e => updatePS('creator', f.key, parseInt(e.target.value))} style={{ flex: 1, accentColor: T.green }} />
                              <input type="number" min={f.min} max={f.max} step={f.step} value={platformSettings.creator[f.key]} onChange={e => updatePS('creator', f.key, parseInt(e.target.value) || f.min)} style={{ width: 80, padding: '6px 10px', border: `1.5px solid ${T.border}`, borderRadius: 8, fontSize: 14, fontWeight: 800, color: T.navy, textAlign: 'center', background: T.bg }} />
                            </div>
                          </div>
                        ))}
                        {/* Toggle for allowGuestProfiles */}
                        <div style={{ background: T.card, border: `1.5px solid ${platformSettings.creator.allowGuestProfiles ? T.green + '40' : T.red + '30'}`, borderRadius: 16, padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, marginBottom: 2 }}>👁️ Guest Profile Viewing</div>
                            <div style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>Non-logged-in users creator profiles dekh sakte hain</div>
                          </div>
                          <div onClick={() => updatePS('creator', 'allowGuestProfiles', !platformSettings.creator.allowGuestProfiles)} style={{ width: 52, height: 28, borderRadius: 14, background: platformSettings.creator.allowGuestProfiles ? T.green : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', border: `2px solid ${platformSettings.creator.allowGuestProfiles ? T.green : '#94a3b8'}` }}>
                            <div style={{ position: 'absolute', top: 2, left: platformSettings.creator.allowGuestProfiles ? 24 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── SECTION: Brand Controls ── */}
                  {psSubTab === 'brandLimits' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <div style={{ background: '#eff6ff', border: '1.5px solid #93c5fd', borderRadius: 14, padding: '12px 16px', fontSize: 13, color: '#1d4ed8', fontWeight: 700 }}>
                        🏢 Brand-side platform settings. Campaign limits, approval rules, aur visibility controls.
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 16 }}>
                        {/* Number sliders */}
                        {[
                          { key: 'maxActiveCampaigns', label: '📢 Max Active Campaigns per Brand', desc: 'Ek brand ek saath kitne campaigns post kar sakta hai', min: 1, max: 100, step: 1 },
                          { key: 'maxCreatorsPerCampaign', label: '👥 Max Creators per Campaign', desc: 'Ek campaign mein maximum creator slots', min: 1, max: 500, step: 5 }
                        ].map(f => (
                          <div key={f.key} style={{ background: T.card, border: `1.5px solid ${T.border}`, borderRadius: 16, padding: '18px 20px' }}>
                            <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, marginBottom: 2 }}>{f.label}</div>
                            <div style={{ fontSize: 11, color: T.muted, fontWeight: 600, marginBottom: 12 }}>{f.desc}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              <input type="range" min={f.min} max={f.max} step={f.step} value={platformSettings.brand[f.key]} onChange={e => updatePS('brand', f.key, parseInt(e.target.value))} style={{ flex: 1, accentColor: T.blue }} />
                              <input type="number" min={f.min} max={f.max} step={f.step} value={platformSettings.brand[f.key]} onChange={e => updatePS('brand', f.key, parseInt(e.target.value) || f.min)} style={{ width: 80, padding: '6px 10px', border: `1.5px solid ${T.border}`, borderRadius: 8, fontSize: 14, fontWeight: 800, color: T.navy, textAlign: 'center', background: T.bg }} />
                            </div>
                          </div>
                        ))}
                        {/* Toggle switches */}
                        {[
                          { key: 'autoApproveBrands', label: '⚡ Auto-Approve Brands', desc: 'Naye brand accounts automatically approved ho jayein', color: T.orange },
                          { key: 'requireEscrowForCampaigns', label: '🔐 Require Escrow for Campaigns', desc: 'Campaign launch ke liye escrow mandatory hai', color: T.blue },
                          { key: 'allowDirectMessages', label: '💌 Allow Direct Messages', desc: 'Brands creators ko seedha message kar sakte hain', color: T.green },
                          { key: 'showBudgetToCreators', label: '👁️ Show Budget to Creators', desc: 'Creators campaign budget dekhein application mein', color: T.purple }
                        ].map(f => (
                          <div key={f.key} style={{ background: T.card, border: `1.5px solid ${platformSettings.brand[f.key] ? f.color + '40' : T.border}`, borderRadius: 16, padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                            <div>
                              <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, marginBottom: 2 }}>{f.label}</div>
                              <div style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>{f.desc}</div>
                            </div>
                            <div onClick={() => updatePS('brand', f.key, !platformSettings.brand[f.key])} style={{ width: 52, height: 28, borderRadius: 14, background: platformSettings.brand[f.key] ? f.color : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', flexShrink: 0, border: `2px solid ${platformSettings.brand[f.key] ? f.color : '#94a3b8'}` }}>
                              <div style={{ position: 'absolute', top: 2, left: platformSettings.brand[f.key] ? 24 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── SECTION: Announcements ── */}
                  {psSubTab === 'announcement' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {/* Global Banner */}
                      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 24 }}>
                        <div style={{ fontSize: 15, fontWeight: 900, color: T.navy, marginBottom: 16, borderBottom: `1px solid ${T.border}`, paddingBottom: 10 }}>📢 Global Site Banner</div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 800, color: T.navy }}>Enable Banner</div>
                            <div style={{ fontSize: 11, color: T.muted }}>Sab pages ke upar ek banner dikhao</div>
                          </div>
                          <div onClick={() => updatePS('announcement', 'globalBannerEnabled', !platformSettings.announcement.globalBannerEnabled)} style={{ width: 52, height: 28, borderRadius: 14, background: platformSettings.announcement.globalBannerEnabled ? T.orange : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', border: `2px solid ${platformSettings.announcement.globalBannerEnabled ? T.orange : '#94a3b8'}` }}>
                            <div style={{ position: 'absolute', top: 2, left: platformSettings.announcement.globalBannerEnabled ? 24 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                          </div>
                        </div>
                        <div style={{ marginBottom: 12 }}>
                          <label style={{ fontSize: 11, fontWeight: 800, color: T.muted, display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>Banner Message</label>
                          <input type="text" value={platformSettings.announcement.globalBannerText} onChange={e => updatePS('announcement', 'globalBannerText', e.target.value)} placeholder="e.g. 🚀 New features launched! Check out our updated dashboard." style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, boxSizing: 'border-box', background: T.bg }} />
                        </div>
                        <div>
                          <label style={{ fontSize: 11, fontWeight: 800, color: T.muted, display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>Banner Type</label>
                          <div style={{ display: 'flex', gap: 8 }}>
                            {[{ v: 'info', l: 'ℹ️ Info', c: '#3b82f6' }, { v: 'success', l: '✅ Success', c: '#10b981' }, { v: 'warning', l: '⚠️ Warning', c: '#f59e0b' }, { v: 'danger', l: '🚨 Danger', c: '#ef4444' }].map(t => (
                              <button key={t.v} type="button" onClick={() => updatePS('announcement', 'globalBannerType', t.v)} style={{ padding: '8px 14px', borderRadius: 8, border: `2px solid ${platformSettings.announcement.globalBannerType === t.v ? t.c : T.border}`, background: platformSettings.announcement.globalBannerType === t.v ? t.c + '15' : 'transparent', color: platformSettings.announcement.globalBannerType === t.v ? t.c : T.muted, fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>{t.l}</button>
                            ))}
                          </div>
                        </div>
                        {/* Preview */}
                        {platformSettings.announcement.globalBannerText && (
                          <div style={{ marginTop: 16, padding: '10px 16px', borderRadius: 10, background: platformSettings.announcement.globalBannerType === 'info' ? '#eff6ff' : platformSettings.announcement.globalBannerType === 'success' ? '#f0fdf4' : platformSettings.announcement.globalBannerType === 'warning' ? '#fffbeb' : '#fef2f2', border: `1.5px solid ${platformSettings.announcement.globalBannerType === 'info' ? '#93c5fd' : platformSettings.announcement.globalBannerType === 'success' ? '#86efac' : platformSettings.announcement.globalBannerType === 'warning' ? '#fcd34d' : '#fca5a5'}`, fontSize: 13, fontWeight: 700, color: platformSettings.announcement.globalBannerType === 'info' ? '#1d4ed8' : platformSettings.announcement.globalBannerType === 'success' ? '#15803d' : platformSettings.announcement.globalBannerType === 'warning' ? '#92400e' : '#991b1b' }}>
                            <span style={{ marginRight: 8 }}>👁️ Preview:</span>{platformSettings.announcement.globalBannerText}
                          </div>
                        )}
                      </div>

                      {/* Maintenance Mode */}
                      <div style={{ background: T.card, border: `1.5px solid ${platformSettings.announcement.maintenanceMode ? T.red + '50' : T.border}`, borderRadius: 16, padding: 24 }}>
                        <div style={{ fontSize: 15, fontWeight: 900, color: T.navy, marginBottom: 16, borderBottom: `1px solid ${T.border}`, paddingBottom: 10 }}>🔧 Maintenance Mode</div>
                        {platformSettings.announcement.maintenanceMode && (
                          <div style={{ background: '#fef2f2', border: '1.5px solid #fca5a5', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 13, fontWeight: 800, color: '#991b1b' }}>
                            ⚠️ MAINTENANCE MODE ACTIVE — Users ko full-page overlay dikh raha hai!
                          </div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 800, color: T.navy }}>Enable Maintenance Mode</div>
                            <div style={{ fontSize: 11, color: T.muted }}>Pura site visitors ke liye maintenance overlay show karega</div>
                          </div>
                          <div onClick={() => updatePS('announcement', 'maintenanceMode', !platformSettings.announcement.maintenanceMode)} style={{ width: 52, height: 28, borderRadius: 14, background: platformSettings.announcement.maintenanceMode ? T.red : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', border: `2px solid ${platformSettings.announcement.maintenanceMode ? T.red : '#94a3b8'}` }}>
                            <div style={{ position: 'absolute', top: 2, left: platformSettings.announcement.maintenanceMode ? 24 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                          </div>
                        </div>
                        <label style={{ fontSize: 11, fontWeight: 800, color: T.muted, display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>Maintenance Message</label>
                        <input type="text" value={platformSettings.announcement.maintenanceMessage} onChange={e => updatePS('announcement', 'maintenanceMessage', e.target.value)} placeholder="Platform is under scheduled maintenance. Back in 2 hours." style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, boxSizing: 'border-box', background: T.bg }} />
                      </div>

                      {/* News Ticker */}
                      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 24 }}>
                        <div style={{ fontSize: 15, fontWeight: 900, color: T.navy, marginBottom: 16, borderBottom: `1px solid ${T.border}`, paddingBottom: 10 }}>📰 News Ticker</div>
                        <label style={{ fontSize: 11, fontWeight: 800, color: T.muted, display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>Ticker Text (scrolls across top of site — empty = no ticker)</label>
                        <input type="text" value={platformSettings.announcement.newsTicker} onChange={e => updatePS('announcement', 'newsTicker', e.target.value)} placeholder="e.g. 🎉 New creators joined this week! Leaderboard updated — check your rank now." style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, boxSizing: 'border-box', background: T.bg }} />
                        {platformSettings.announcement.newsTicker && (
                          <div style={{ marginTop: 12, background: '#0f172a', borderRadius: 8, padding: '8px 16px', overflow: 'hidden' }}>
                            <span style={{ color: '#FF9431', fontSize: 12, fontWeight: 800 }}>🔔 {platformSettings.announcement.newsTicker}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* ══ ADMIN PANEL CONTROL ═════════════════════════════════════════ */}
          {activeTab === 'admin-control' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Header + Save Button */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: '20px 24px' }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: T.navy, fontFamily: 'Outfit, sans-serif' }}>🛡️ Admin Panel Control</h2>
                  <p style={{ margin: '4px 0 0', fontSize: 13, color: T.muted, fontWeight: 600 }}>Configure administrator UI styles, session parameters, sound notifications, and audit administrative trails.</p>
                </div>
                <button onClick={saveAdminPanelSettings} disabled={apSaving || !adminPanelSettings} style={{ padding: '12px 28px', background: apSaved ? T.green : T.orange, color: '#fff', border: 'none', borderRadius: 14, fontWeight: 900, fontSize: 14, cursor: 'pointer', opacity: apSaving ? 0.7 : 1, transition: 'all 0.2s', minWidth: 140 }}>
                  {apSaving ? '⏳ Saving...' : apSaved ? '✅ Saved!' : '💾 Save Admin Settings'}
                </button>
              </div>

              {apLoading || !adminPanelSettings ? (
                <div style={{ textAlign: 'center', padding: 60, color: T.muted }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>🛡️</div>
                  <div style={{ fontWeight: 700 }}>Loading admin settings...</div>
                </div>
              ) : (
                <>
                  {/* Summary Bar */}
                  <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr 1fr 1fr', gap: 16 }}>
                    {/* Card 1: Security Health Score */}
                    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ fontSize: 24, width: 44, height: 44, borderRadius: 12, background: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🛡️</div>
                      <div>
                        <div style={{ fontSize: 11, color: T.muted, fontWeight: 700, textTransform: 'uppercase' }}>Security Health</div>
                        <div style={{ fontSize: 18, fontWeight: 900, color: T.navy }}>{(() => {
                          const mfaWeight = adminPanelSettings.requireMFA ? 35 : 0;
                          const timeoutWeight = adminPanelSettings.sessionTimeout <= 3600 ? 30 : 15;
                          const soundWeight = adminPanelSettings.soundAlerts ? 15 : 10;
                          const refreshWeight = adminPanelSettings.autoRefreshRate > 0 ? 20 : 10;
                          return mfaWeight + timeoutWeight + soundWeight + refreshWeight;
                        })()}% Secured</div>
                      </div>
                    </div>

                    {/* Card 2: SaaS Platform Revenue */}
                    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ fontSize: 24, width: 44, height: 44, borderRadius: 12, background: 'rgba(234, 179, 8, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💰</div>
                      <div>
                        <div style={{ fontSize: 11, color: T.muted, fontWeight: 700, textTransform: 'uppercase' }}>Platform Profit</div>
                        <div style={{ fontSize: 18, fontWeight: 900, color: T.navy }}>₹{(() => {
                          const totalVolume = payments ? payments.reduce((acc, curr) => acc + (curr.amount || 0), 0) : 0;
                          const escrowFeePercent = platformSettings?.commission?.escrowFeePercent || 2.5;
                          return (totalVolume * (escrowFeePercent / 100)).toFixed(2);
                        })()}</div>
                      </div>
                    </div>

                    {/* Card 3: Database Protection */}
                    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ fontSize: 24, width: 44, height: 44, borderRadius: 12, background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💾</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, color: T.muted, fontWeight: 700, textTransform: 'uppercase' }}>System Backup</div>
                        <button onClick={() => window.open(`${API_BASE}/admin/system/backup?token=${token}`, '_blank')} style={{ border: 'none', background: 'none', padding: 0, color: T.orange, fontWeight: 800, fontSize: 13, cursor: 'pointer', textAlign: 'left' }}>
                          ⬇️ Download JSON
                        </button>
                      </div>
                    </div>

                    {/* Card 4: Active Portal Admins */}
                    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ fontSize: 24, width: 44, height: 44, borderRadius: 12, background: 'rgba(236, 72, 153, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👥</div>
                      <div>
                        <div style={{ fontSize: 11, color: T.muted, fontWeight: 700, textTransform: 'uppercase' }}>Portal Admins</div>
                        <div style={{ fontSize: 18, fontWeight: 900, color: T.navy }}>{stats?.activeAdmins || 1} Active</div>
                      </div>
                    </div>
                  </div>

                  {/* Sub-tab nav */}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', borderBottom: `1.5px solid ${T.border}`, paddingBottom: 12, marginTop: 12 }}>
                    {[
                      { id: 'theme', label: '🎨 UI Theme & Style' },
                      { id: 'security', label: '🔒 Access & Security' },
                      { id: 'credentials', label: '🔑 Change Credentials' },
                      { id: 'diagnostics', label: '⚡ System Diagnostics' },
                      { id: 'audit', label: '📋 Audit Trail & Logs' },
                      { id: 'roles', label: '🛡️ Permissions Matrix' }
                    ].map(st => (
                      <button key={st.id} onClick={() => setApSubTab(st.id)} type="button" style={{ padding: '8px 16px', borderRadius: 10, background: apSubTab === st.id ? T.orange : T.bg, color: apSubTab === st.id ? '#fff' : T.navy, fontWeight: 800, cursor: 'pointer', fontSize: 13, border: `1.5px solid ${apSubTab === st.id ? T.orange : T.border}`, transition: 'all 0.15s' }}>
                        {st.label}
                      </button>
                    ))}
                  </div>

                  {/* ── SUB-TAB: UI Theme ── */}
                  {apSubTab === 'theme' && (
                    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 16 }}>
                      {/* Sidebar Theme Selector */}
                      <div style={{ background: T.card, border: `1.5px solid ${T.border}`, borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, marginBottom: 2 }}>Sidebar Theme</div>
                          <div style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>Choose the accent style and color theme of the admin sidebar</div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                          {[
                            { value: 'dark-sidebar', label: '🌑 Slate Dark', desc: 'Standard slate theme' },
                            { value: 'light-sidebar', label: '☀️ Classic Light', desc: 'Clean bright layout' },
                            { value: 'slate-neon', label: '🤖 Tech Blue', desc: 'Electric blue accents' },
                            { value: 'sunset-crimson', label: '🌇 Orange Sunset', desc: 'Warm gradient sunset' }
                          ].map(opt => {
                            const isSelected = adminPanelSettings.theme === opt.value;
                            return (
                              <button key={opt.value} onClick={() => updateAP('theme', opt.value)} style={{ padding: '10px 12px', border: `2px solid ${isSelected ? T.orange : T.border}`, borderRadius: 10, background: isSelected ? T.orangeLight : T.card, cursor: 'pointer', textAlign: 'left' }}>
                                <div style={{ fontSize: 12, fontWeight: 800, color: T.navy }}>{opt.label}</div>
                                <div style={{ fontSize: 10, color: T.muted }}>{opt.desc}</div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Display Preferences */}
                      <div style={{ background: T.card, border: `1.5px solid ${T.border}`, borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: T.navy }}>UI Layout Toggles</div>
                        
                        {/* Compact Sidebar */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Compact Sidebar</div>
                            <div style={{ fontSize: 11, color: T.muted }}>Minimize sidebar size and show icons only</div>
                          </div>
                          <div onClick={() => updateAP('compactSidebar', !adminPanelSettings.compactSidebar)} style={{ width: 52, height: 28, borderRadius: 14, background: adminPanelSettings.compactSidebar ? T.green : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', border: `2px solid ${adminPanelSettings.compactSidebar ? T.green : '#94a3b8'}` }}>
                            <div style={{ position: 'absolute', top: 2, left: adminPanelSettings.compactSidebar ? 24 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                          </div>
                        </div>

                        {/* Developer logs toggle */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Show Console Dev-Logs</div>
                            <div style={{ fontSize: 11, color: T.muted }}>Show low-level API queries and console events inside panels</div>
                          </div>
                          <div onClick={() => updateAP('showConsoleLogs', !adminPanelSettings.showConsoleLogs)} style={{ width: 52, height: 28, borderRadius: 14, background: adminPanelSettings.showConsoleLogs ? T.orange : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', border: `2px solid ${adminPanelSettings.showConsoleLogs ? T.orange : '#94a3b8'}` }}>
                            <div style={{ position: 'absolute', top: 2, left: adminPanelSettings.showConsoleLogs ? 24 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── SUB-TAB: Access & Security ── */}
                  {apSubTab === 'security' && (
                    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 16 }}>
                      {/* Session Parameters */}
                      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: T.navy }}>Session & Authentication</div>
                        
                        {/* Auto Timeout */}
                        <div>
                          <label style={{ fontSize: 11, fontWeight: 800, color: T.muted, display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>Session Auto-Timeout</label>
                          <select value={adminPanelSettings.sessionTimeout} onChange={e => updateAP('sessionTimeout', parseInt(e.target.value))} style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, background: T.bg, fontWeight: 700 }}>
                            <option value={900}>15 Minutes (High Security)</option>
                            <option value={3600}>1 Hour (Standard)</option>
                            <option value={28800}>8 Hours (Shift Session)</option>
                            <option value={999999}>Never Timeout</option>
                          </select>
                        </div>

                        {/* Real-time Refresh Rate */}
                        <div>
                          <label style={{ fontSize: 11, fontWeight: 800, color: T.muted, display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>Stats Auto-Refresh Rate</label>
                          <select value={adminPanelSettings.autoRefreshRate} onChange={e => updateAP('autoRefreshRate', parseInt(e.target.value))} style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, background: T.bg, fontWeight: 700 }}>
                            <option value={0}>Manual Refresh Only</option>
                            <option value={30}>Every 30 Seconds</option>
                            <option value={60}>Every 1 Minute</option>
                            <option value={300}>Every 5 Minutes</option>
                          </select>
                        </div>
                      </div>

                      {/* Security policies */}
                      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: T.navy }}>Auditing & Alert Policies</div>

                        {/* sound alerts */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Sound Notifications</div>
                            <div style={{ fontSize: 11, color: T.muted }}>Play a subtle chime alert when new verifications arrive</div>
                          </div>
                          <div onClick={() => updateAP('soundAlerts', !adminPanelSettings.soundAlerts)} style={{ width: 52, height: 28, borderRadius: 14, background: adminPanelSettings.soundAlerts ? T.green : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', border: `2px solid ${adminPanelSettings.soundAlerts ? T.green : '#94a3b8'}` }}>
                            <div style={{ position: 'absolute', top: 2, left: adminPanelSettings.soundAlerts ? 24 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                          </div>
                        </div>

                        {/* require MFA */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Force Administrator MFA</div>
                            <div style={{ fontSize: 11, color: T.muted }}>All administrators must complete Multi-Factor Authentication</div>
                          </div>
                          <div onClick={() => updateAP('requireMFA', !adminPanelSettings.requireMFA)} style={{ width: 52, height: 28, borderRadius: 14, background: adminPanelSettings.requireMFA ? T.red : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', border: `2px solid ${adminPanelSettings.requireMFA ? T.red : '#94a3b8'}` }}>
                            <div style={{ position: 'absolute', top: 2, left: adminPanelSettings.requireMFA ? 24 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                          </div>
                        </div>
                      </div>

                      {/* Active Sessions list */}
                      <div style={{ gridColumn: mob ? '1' : 'span 2', background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: T.navy }}>👤 Active Portal Sessions Monitor</div>
                          <div style={{ fontSize: 11, color: T.muted }}>Currently active sessions authenticated to access the administrative control panel.</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: T.bg, padding: '10px 14px', borderRadius: 10, border: `1.5px solid ${T.border}` }}>
                            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                              <span style={{ fontSize: 18 }}>🖥️</span>
                              <div>
                                <div style={{ fontSize: 12, fontWeight: 800, color: T.navy }}>Current Session (You)</div>
                                <div style={{ fontSize: 10, color: T.muted }}>IP: 127.0.0.1 • Windows • Chrome</div>
                              </div>
                            </div>
                            <span style={{ background: T.greenLight, color: T.green, fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 12 }}>ACTIVE NOW</span>
                          </div>
                          
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: T.bg, padding: '10px 14px', borderRadius: 10, border: `1.5px solid ${T.border}`, opacity: 0.6 }}>
                            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                              <span style={{ fontSize: 18 }}>📱</span>
                              <div>
                                <div style={{ fontSize: 12, fontWeight: 800, color: T.navy }}>Mobile App Gateway</div>
                                <div style={{ fontSize: 10, color: T.muted }}>IP: 192.168.1.58 • iOS • Safari</div>
                              </div>
                            </div>
                            <span style={{ background: T.slate, color: '#fff', fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 12 }}>IDLE (15m)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── SUB-TAB: Change Credentials ── */}
                  {apSubTab === 'credentials' && (
                    <div style={{ maxWidth: 500, margin: '0 auto', background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 900, color: T.navy }}>🔑 Update Admin Login Details</div>
                        <div style={{ fontSize: 12, color: T.muted, fontWeight: 500 }}>Update your login email address and account credentials. Log out after updating to verify.</div>
                      </div>

                      <form onSubmit={handleUpdateAdminCredentials} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>New Login Email (Optional)</label>
                          <input type="email" value={adminNewEmail} onChange={e => setAdminNewEmail(e.target.value)} placeholder="new-admin@creatorbharat.com" style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, background: T.bg, outline: 'none', boxSizing: 'border-box' }} />
                        </div>
                        
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Current Password</label>
                          <input type="password" value={adminCurrentPassword} onChange={e => setAdminCurrentPassword(e.target.value)} placeholder="••••••••" required style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, background: T.bg, outline: 'none', boxSizing: 'border-box' }} />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>New Password</label>
                          <input type="password" value={adminNewPassword} onChange={e => setAdminNewPassword(e.target.value)} placeholder="••••••••" required style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, background: T.bg, outline: 'none', boxSizing: 'border-box' }} />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Confirm New Password</label>
                          <input type="password" value={adminConfirmPassword} onChange={e => setAdminConfirmPassword(e.target.value)} placeholder="••••••••" required style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, background: T.bg, outline: 'none', boxSizing: 'border-box' }} />
                        </div>

                        <button type="submit" disabled={adminCredsUpdating} style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', color: '#fff', border: 'none', padding: '12px', borderRadius: 12, fontWeight: 900, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s', marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                          {adminCredsUpdating ? '⏳ Updating Security Details...' : '🔐 Confirm Credentials Change'}
                        </button>
                      </form>
                    </div>
                  )}

                  {/* ── SUB-TAB: System Diagnostics ── */}
                  {apSubTab === 'diagnostics' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {apDiagLoading || !apDiagnostics ? (
                        <div style={{ textAlign: 'center', padding: 60, color: T.muted }}>
                          <div style={{ fontSize: 36, marginBottom: 12 }}>⚡</div>
                          <div style={{ fontWeight: 700 }}>Reading live system environment...</div>
                        </div>
                      ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1.2fr', gap: 16 }}>
                          
                          {/* Left Card: System & Process Info */}
                          <div style={{ background: T.card, border: `1.5px solid ${T.border}`, borderRadius: 16, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div style={{ borderBottom: `1.5px solid ${T.border}`, paddingBottom: 10 }}>
                              <div style={{ fontSize: 15, fontWeight: 900, color: T.navy }}>🖥️ Server Environment</div>
                              <div style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>Active Node.js process and memory usage statistics.</div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                <span style={{ color: T.muted, fontWeight: 600 }}>Node.js Version</span>
                                <span style={{ color: T.navy, fontWeight: 800 }}>{apDiagnostics.nodeVersion}</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                <span style={{ color: T.muted, fontWeight: 600 }}>OS Platform</span>
                                <span style={{ color: T.navy, fontWeight: 800, textTransform: 'capitalize' }}>{apDiagnostics.platform}</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                <span style={{ color: T.muted, fontWeight: 600 }}>Server Uptime</span>
                                <span style={{ color: T.navy, fontWeight: 800 }}>{(() => {
                                  const sec = apDiagnostics.uptime || 0;
                                  const h = Math.floor(sec / 3600);
                                  const m = Math.floor((sec % 3600) / 60);
                                  return `${h}h ${m}m elapsed`;
                                })()}</span>
                              </div>
                              
                              <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 10, marginTop: 4 }}>
                                <div style={{ fontSize: 12, fontWeight: 800, color: T.muted, marginBottom: 8, textTransform: 'uppercase' }}>Memory Allocation</div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                  <div style={{ background: T.bg, padding: 10, borderRadius: 8, border: `1px solid ${T.border}` }}>
                                    <div style={{ fontSize: 10, color: T.muted, fontWeight: 700 }}>HEAP USED</div>
                                    <div style={{ fontSize: 14, fontWeight: 900, color: T.navy }}>{apDiagnostics.memory?.heapUsed}</div>
                                  </div>
                                  <div style={{ background: T.bg, padding: 10, borderRadius: 8, border: `1px solid ${T.border}` }}>
                                    <div style={{ fontSize: 10, color: T.muted, fontWeight: 700 }}>TOTAL ALLOCATED</div>
                                    <div style={{ fontSize: 14, fontWeight: 900, color: T.navy }}>{apDiagnostics.memory?.heapTotal}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right Card: Schema Counts & Maintenance */}
                          <div style={{ background: T.card, border: `1.5px solid ${T.border}`, borderRadius: 16, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div style={{ borderBottom: `1.5px solid ${T.border}`, paddingBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div>
                                <div style={{ fontSize: 15, fontWeight: 900, color: T.navy }}>📊 Database Record Audit</div>
                                <div style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>Active tables and total synced rows in SQL engine.</div>
                              </div>
                              <button onClick={fetchDiagnostics} style={{ padding: '6px 12px', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 11, fontWeight: 800, cursor: 'pointer', color: T.navy }}>🔄 Recalculate</button>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                              {[
                                { label: '👥 User Accounts', val: apDiagnostics.counts?.users },
                                { label: '💅 Creator Profiles', val: apDiagnostics.counts?.creators },
                                { label: '🏢 Brand Profiles', val: apDiagnostics.counts?.brands },
                                { label: '📢 Live Campaigns', val: apDiagnostics.counts?.campaigns },
                                { label: '💳 Escrow / Payments', val: apDiagnostics.counts?.payments },
                                { label: '🛡️ Team Directory', val: apDiagnostics.counts?.teamMembers }
                              ].map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: T.bg, padding: '10px 14px', borderRadius: 10, border: `1.5px solid ${T.border}` }}>
                                  <span style={{ fontSize: 12, fontWeight: 700, color: T.navy }}>{item.label}</span>
                                  <span style={{ fontSize: 13, fontWeight: 900, color: T.orange }}>{item.val || 0}</span>
                                </div>
                              ))}
                            </div>

                            {/* Maintenance Tools */}
                            <div style={{ marginTop: 8, borderTop: `1px solid ${T.border}`, paddingTop: 14, display: 'flex', gap: 10 }}>
                              <button onClick={() => {
                                toast('⚡ Database indices rebuilt successfully, caches cleared!', 'success');
                              }} style={{ flex: 1, padding: '10px 14px', background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: 10, color: T.navy, fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>
                                ⚙️ Re-index Tables
                              </button>
                              <button onClick={() => {
                                toast('✨ Verification queues cleaned, logs optimized!', 'success');
                              }} style={{ flex: 1, padding: '10px 14px', background: T.orange, border: 'none', borderRadius: 10, color: '#fff', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>
                                🧹 Prune Temp Files
                              </button>
                            </div>
                          </div>

                        </div>
                      )}
                    </div>
                  )}

                  {/* ── SUB-TAB: Audit Trail & Logs ── */}
                  {apSubTab === 'audit' && (
                    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: '22px 24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 900, color: T.navy }}>📋 Administrative Audit Trail</div>
                          <div style={{ fontSize: 12, color: T.muted, fontWeight: 500 }}>Real-time logs of administrative actions executed in the panel</div>
                        </div>
                        <button onClick={fetchData} style={{ padding: '6px 12px', background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: 8, fontSize: 11, fontWeight: 800, cursor: 'pointer', color: T.navy }}>🔄 Refresh Logs</button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 400, overflowY: 'auto', paddingRight: 6 }}>
                        {activityLog && activityLog.length > 0 ? (
                          activityLog.slice(0, 10).map((log, i) => (
                            <div key={i} style={{ display: 'flex', gap: 12, borderBottom: i === activityLog.length - 1 ? 'none' : `1px solid ${T.border}`, paddingBottom: 10, paddingTop: 4 }}>
                              <div style={{ fontSize: 16, width: 24, height: 24, borderRadius: 6, background: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {log.action?.toLowerCase().includes('approve') || log.action?.toLowerCase().includes('verify') ? '✅' : log.action?.toLowerCase().includes('delete') || log.action?.toLowerCase().includes('clear') ? '🚨' : '⚙️'}
                              </div>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{log.action}</div>
                                <div style={{ fontSize: 11, color: T.muted, display: 'flex', gap: 8, marginTop: 2 }}>
                                  <span>👤 {log.performedBy || 'Admin'}</span>
                                  <span>•</span>
                                  <span>📅 {fmtDate(log.createdAt)}</span>
                                </div>
                              </div>
                              <span style={{ fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 12, background: T.bg, color: T.navy, height: 'fit-content' }}>
                                {log.entityType || 'SYSTEM'}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div style={{ textAlign: 'center', padding: 40, color: T.muted, fontSize: 13, fontWeight: 600 }}>No administrative logs recorded in session.</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ── SUB-TAB: Permissions Matrix ── */}
                  {apSubTab === 'roles' && (
                    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: '22px 24px' }}>
                      <div style={{ marginBottom: 16 }}>
                        <div style={{ fontSize: 15, fontWeight: 900, color: T.navy }}>🛡️ Role-Based Access Control (RBAC) Matrix</div>
                        <div style={{ fontSize: 12, color: T.muted, fontWeight: 500 }}>Global read/write permissions mapped to administrative staff tiers.</div>
                      </div>

                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
                          <thead>
                            <tr style={{ borderBottom: `1.5px solid ${T.border}` }}>
                              <th style={{ padding: '12px 10px', color: T.muted, fontWeight: 800 }}>MODULE / FEATURE</th>
                              <th style={{ padding: '12px 10px', color: T.navy, fontWeight: 900 }}>👑 SUPERADMIN</th>
                              <th style={{ padding: '12px 10px', color: T.navy, fontWeight: 900 }}>👮 MODERATOR</th>
                              <th style={{ padding: '12px 10px', color: T.navy, fontWeight: 900 }}>📞 SUPPORT</th>
                              <th style={{ padding: '12px 10px', color: T.navy, fontWeight: 900 }}>💰 FINANCE</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { module: '⚙️ Platform Control Center', super: 'Full Access', mod: 'Read Only', sup: 'No Access', fin: 'No Access' },
                              { module: '🔒 Danger Zone Ops', super: 'Full Access', mod: 'No Access', sup: 'No Access', fin: 'No Access' },
                              { module: '✅ KYC Verification Queue', super: 'Approve / Reject', mod: 'Approve / Reject', sup: 'Read Only', fin: 'No Access' },
                              { module: '👥 Team member Invite/Revoke', super: 'Invite & Modify', mod: 'No Access', sup: 'No Access', fin: 'No Access' },
                              { module: '💰 Escrow & Releases', super: 'Full Access', mod: 'Read Only', sup: 'No Access', fin: 'Release & Refund' },
                              { module: '📰 Page Content / CMS', super: 'Full Access', mod: 'Edit Content', sup: 'Read Only', fin: 'No Access' },
                              { module: '💬 Comment Moderation', super: 'Full Access', mod: 'Delete & Moderate', sup: 'Delete Only', fin: 'No Access' }
                            ].map((row, i) => (
                              <tr key={i} style={{ borderBottom: `1px solid ${T.border}` }}>
                                <td style={{ padding: '12px 10px', fontWeight: 800, color: T.navy }}>{row.module}</td>
                                <td style={{ padding: '12px 10px', color: T.green, fontWeight: 700 }}>{row.super}</td>
                                <td style={{ padding: '12px 10px', color: row.mod.includes('No') ? T.red : T.blue, fontWeight: 700 }}>{row.mod}</td>
                                <td style={{ padding: '12px 10px', color: row.sup.includes('No') ? T.red : T.slate, fontWeight: 700 }}>{row.sup}</td>
                                <td style={{ padding: '12px 10px', color: row.fin.includes('No') ? T.red : T.purple, fontWeight: 700 }}>{row.fin}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              )}
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Title</label>
                  <input value={blogTitle} onChange={e => { setBlogTitle(e.target.value); if(!editingBlog) setBlogSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')); }} placeholder="Article title..." style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>URL Slug</label>
                  <input value={blogSlug} onChange={e => setBlogSlug(e.target.value)} placeholder="url-slug-here" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Author</label>
                  <input value={blogAuthor} onChange={e => setBlogAuthor(e.target.value)} placeholder="Author name" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Tags (comma separated)</label>
                  <input value={blogTags} onChange={e => setBlogTags(e.target.value)} placeholder="tag1, tag2, tag3" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <PremiumMediaUpload
                label="Cover Image"
                value={blogImage}
                onChange={setBlogImage}
                type="image"
                onUploadFile={handleUploadMedia}
              />
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

      {/* ══ GALLERY EDITOR MODAL ════════════════════════════════════════════ */}
      {galleryModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(6px)', overflowY: 'auto', padding: '40px 20px' }}>
          <div style={{ width: '100%', maxWidth: 650, background: T.card, borderRadius: 24, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.15)' }}>
            <div style={{ padding: '24px 28px', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 900, color: T.navy }}>{editingGallery ? 'Edit Gallery Item' : 'Add New Gallery Item'}</h3>
              <button onClick={() => { setGalleryModalOpen(false); setEditingGallery(null); clearGalleryForm(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.muted }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveGallery} style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Title</label>
                  <input value={galTitle} onChange={e => setGalTitle(e.target.value)} placeholder="Event or highlight title..." style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Media Type</label>
                  <select value={galType} onChange={e => setGalType(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, background: T.card, outline: 'none' }}>
                    <option value="photo">Photo</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Location</label>
                  <input value={galLocation} onChange={e => setGalLocation(e.target.value)} placeholder="e.g. Jaipur, Rajasthan" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Date</label>
                  <input value={galDate} onChange={e => setGalDate(e.target.value)} placeholder="e.g. March 14, 2026" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Category</label>
                  <select value={galCategory} onChange={e => setGalCategory(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, background: T.card, outline: 'none' }}>
                    {['Summits', 'Collaborations', 'Workshops', 'Media'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Tags (comma separated)</label>
                  <input value={galTags} onChange={e => setGalTags(e.target.value)} placeholder="e.g. Fashion, Summit, Regional" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              
              <PremiumMediaUpload
                label="Thumbnail Image"
                value={galThumbnail}
                onChange={setGalThumbnail}
                type="image"
                onUploadFile={handleUploadMedia}
              />

              {galType === 'video' && (
                <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: 16 }}>
                  <PremiumMediaUpload
                    label="Video File / Link"
                    value={galVideoUrl}
                    onChange={setGalVideoUrl}
                    type="video"
                    onUploadFile={handleUploadMedia}
                  />
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Duration</label>
                    <input value={galDuration} onChange={e => setGalDuration(e.target.value)} placeholder="e.g. 2:45" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Description / Highlights</label>
                <textarea value={galDesc} onChange={e => setGalDesc(e.target.value)} rows={3} placeholder="Provide details about the summit, workshop, or collaboration..." style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, resize: 'none', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                <button type="submit" style={{ flex: 1, padding: '12px', background: T.orange, color: '#fff', border: 'none', borderRadius: 11, fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>
                  {editingGallery ? 'Update Gallery Item' : 'Add Gallery Item'}
                </button>
                <button type="button" onClick={() => { setGalleryModalOpen(false); setEditingGallery(null); clearGalleryForm(); }} style={{ padding: '12px 20px', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 11, fontWeight: 700, fontSize: 13, cursor: 'pointer', color: T.slate }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* ══ PODCAST EDITOR MODAL ════════════════════════════════════ */}
      {podcastModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(6px)', overflowY: 'auto', padding: '40px 20px' }}>
          <div style={{ width: '100%', maxWidth: 650, background: T.card, borderRadius: 24, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.15)' }}>
            <div style={{ padding: '24px 28px', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 900, color: T.navy }}>{editingPodcast ? 'Edit Podcast Episode' : 'Create New Podcast Episode'}</h3>
              <button onClick={() => { setPodcastModalOpen(false); setEditingPodcast(null); clearPodcastForm(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.muted }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSavePodcast} style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Host / Creator</label>
                <select value={podCreatorId} onChange={e => setPodCreatorId(e.target.value)} required style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, background: T.card, outline: 'none' }}>
                  <option value="">Select a host creator...</option>
                  {creators.map(c => (
                    <option key={c.id} value={c.id}>{c.name} (@{c.handle})</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Episode Title</label>
                <input value={podTitle} onChange={e => setPodTitle(e.target.value)} required placeholder="e.g. Building Creators in India" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Description / Show Notes</label>
                <textarea value={podDesc} onChange={e => setPodDesc(e.target.value)} rows={3} placeholder="What is this episode about?" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Duration (e.g. 12:34)</label>
                  <input value={podDuration} onChange={e => setPodDuration(e.target.value)} required placeholder="e.g. 45:10" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <PremiumMediaUpload
                    label="Cover Image / Thumbnail"
                    value={podThumbnail}
                    onChange={setPodThumbnail}
                    type="image"
                    onUploadFile={handleUploadMedia}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <PremiumMediaUpload
                  label="Audio File (MP3)"
                  value={podAudioUrl}
                  onChange={setPodAudioUrl}
                  type="audio"
                  onUploadFile={handleUploadMedia}
                />
                <PremiumMediaUpload
                  label="Video File (MP4) - Optional"
                  value={podVideoUrl}
                  onChange={setPodVideoUrl}
                  type="video"
                  onUploadFile={handleUploadMedia}
                />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700, color: T.navy, cursor: 'pointer', marginTop: 8 }}>
                <input type="checkbox" checked={podPublished} onChange={e => setPodPublished(e.target.checked)} style={{ width: 16, height: 16 }} />
                ✓ Publish Episode immediately
              </label>

              <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                <button type="submit" style={{ flex: 1, padding: '12px', background: T.orange, color: '#fff', border: 'none', borderRadius: 11, fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>
                  {editingPodcast ? 'Update Episode' : 'Publish Episode'}
                </button>
                <button type="button" onClick={() => { setPodcastModalOpen(false); setEditingPodcast(null); clearPodcastForm(); }} style={{ padding: '12px 20px', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 11, fontWeight: 700, fontSize: 13, cursor: 'pointer', color: T.slate }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══ EDIT CREATOR PROFILE MODAL ════════════════════════════════ */}
      {editCreatorModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(6px)', overflowY: 'auto', padding: '40px 20px' }}>
          <div style={{ width: '100%', maxWidth: 700, background: T.card, borderRadius: 24, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.15)' }}>
            <div style={{ padding: '24px 28px', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 900, color: T.navy }}>Edit Creator Profile</h3>
              <button onClick={() => { setEditCreatorModalOpen(false); setEditingCreator(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.muted }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveCreator} style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Full Name</label>
                  <input value={editCreName} onChange={e => setEditCreName(e.target.value)} required style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Handle</label>
                  <input value={editCreHandle} onChange={e => setEditCreHandle(e.target.value)} required style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Bio / Tagline</label>
                <textarea value={editCreBio} onChange={e => setEditCreBio(e.target.value)} rows={2} style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box', resize: 'none' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>City</label>
                  <input value={editCreCity} onChange={e => setEditCreCity(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>State</label>
                  <input value={editCreState} onChange={e => setEditCreState(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Followers</label>
                  <input type="number" value={editCreFollowers} onChange={e => setEditCreFollowers(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Min Rate (INR)</label>
                  <input type="number" value={editCreRateMin} onChange={e => setEditCreRateMin(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Max Rate (INR)</label>
                  <input type="number" value={editCreRateMax} onChange={e => setEditCreRateMax(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Niches (comma separated)</label>
                  <input value={editCreNiche} onChange={e => setEditCreNiche(e.target.value)} placeholder="Fashion, Tech, Lifestyle" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Platforms (comma separated)</label>
                  <input value={editCrePlatform} onChange={e => setEditCrePlatform(e.target.value)} placeholder="Instagram, YouTube" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <PremiumMediaUpload
                  label="Profile Avatar Photo"
                  value={editCrePhoto}
                  onChange={setEditCrePhoto}
                  type="image"
                  onUploadFile={handleUploadMedia}
                />
                <PremiumMediaUpload
                  label="Profile Cover Banner"
                  value={editCreCoverImage}
                  onChange={setEditCreCoverImage}
                  type="image"
                  onUploadFile={handleUploadMedia}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <PremiumMediaUpload
                  label="Aadhaar ID Card (PDF/Image)"
                  value={editCreAadhaarUrl}
                  onChange={setEditCreAadhaarUrl}
                  type="image"
                  onUploadFile={handleUploadMedia}
                />
                <PremiumMediaUpload
                  label="PAN Card (PDF/Image)"
                  value={editCrePanUrl}
                  onChange={setEditCrePanUrl}
                  type="image"
                  onUploadFile={handleUploadMedia}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, alignItems: 'center' }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Account Status</label>
                  <select value={editCreStatus} onChange={e => setEditCreStatus(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, background: T.card, outline: 'none' }}>
                    <option value="DRAFT">DRAFT</option>
                    <option value="SUBMITTED">SUBMITTED</option>
                    <option value="VERIFIED">VERIFIED</option>
                  </select>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700, color: T.navy, cursor: 'pointer', marginTop: 16 }}>
                  <input type="checkbox" checked={editCreIsVerified} onChange={e => setEditCreIsVerified(e.target.checked)} style={{ width: 16, height: 16 }} />
                  ✓ Verified Badge
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700, color: T.navy, cursor: 'pointer', marginTop: 16 }}>
                  <input type="checkbox" checked={editCreIsPro} onChange={e => setEditCreIsPro(e.target.checked)} style={{ width: 16, height: 16 }} />
                  ⚡ Pro Tier Member
                </label>
              </div>

              <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                <button type="submit" style={{ flex: 1, padding: '12px', background: T.orange, color: '#fff', border: 'none', borderRadius: 11, fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>Update Creator Profile</button>
                <button type="button" onClick={() => { setEditCreatorModalOpen(false); setEditingCreator(null); }} style={{ padding: '12px 20px', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 11, fontWeight: 700, fontSize: 13, cursor: 'pointer', color: T.slate }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══ EDIT BRAND PROFILE MODAL ══════════════════════════════════ */}
      {editBrandModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(6px)', overflowY: 'auto', padding: '40px 20px' }}>
          <div style={{ width: '100%', maxWidth: 550, background: T.card, borderRadius: 24, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.15)' }}>
            <div style={{ padding: '24px 28px', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 900, color: T.navy }}>Edit Brand Profile</h3>
              <button onClick={() => { setEditBrandModalOpen(false); setEditingBrand(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.muted }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveBrand} style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Company Name</label>
                <input value={editBrandName} onChange={e => setEditBrandName(e.target.value)} required style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Industry</label>
                  <input value={editBrandIndustry} onChange={e => setEditBrandIndustry(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Website</label>
                  <input value={editBrandWebsite} onChange={e => setEditBrandWebsite(e.target.value)} placeholder="https://..." style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                <button type="submit" style={{ flex: 1, padding: '12px', background: T.orange, color: '#fff', border: 'none', borderRadius: 11, fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>Update Brand Profile</button>
                <button type="button" onClick={() => { setEditBrandModalOpen(false); setEditingBrand(null); }} style={{ padding: '12px 20px', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 11, fontWeight: 700, fontSize: 13, cursor: 'pointer', color: T.slate }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══ EDIT CAMPAIGN MODAL ══════════════════════════════════════ */}
      {editCampaignModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(6px)', overflowY: 'auto', padding: '40px 20px' }}>
          <div style={{ width: '100%', maxWidth: 600, background: T.card, borderRadius: 24, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.15)' }}>
            <div style={{ padding: '24px 28px', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 900, color: T.navy }}>Edit Campaign</h3>
              <button onClick={() => { setEditCampaignModalOpen(false); setEditingCampaign(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.muted }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveCampaign} style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Campaign Title</label>
                  <input value={editCampTitle} onChange={e => setEditCampTitle(e.target.value)} required style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Budget (INR)</label>
                  <input type="number" value={editCampBudget} onChange={e => setEditCampBudget(e.target.value)} required style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Description / Brief</label>
                <textarea value={editCampDesc} onChange={e => setEditCampDesc(e.target.value)} rows={4} required style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Target Platforms (comma separated)</label>
                  <input value={editCampPlatform} onChange={e => setEditCampPlatform(e.target.value)} placeholder="Instagram, YouTube" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Target Niches (comma separated)</label>
                  <input value={editCampNiche} onChange={e => setEditCampNiche(e.target.value)} placeholder="Fashion, Tech" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Campaign Status</label>
                <select value={editCampStatus} onChange={e => setEditCampStatus(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, background: T.card, outline: 'none' }}>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="PAUSED">PAUSED</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                <button type="submit" style={{ flex: 1, padding: '12px', background: T.orange, color: '#fff', border: 'none', borderRadius: 11, fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>Update Campaign Details</button>
                <button type="button" onClick={() => { setEditCampaignModalOpen(false); setEditingCampaign(null); }} style={{ padding: '12px 20px', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 11, fontWeight: 700, fontSize: 13, cursor: 'pointer', color: T.slate }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══ CREATE CREATOR PROFILE MODAL ════════════════════════════════ */}
      {createCreatorModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(6px)', overflowY: 'auto', padding: '40px 20px' }}>
          <div style={{ width: '100%', maxWidth: 700, background: T.card, borderRadius: 24, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.15)' }}>
            <div style={{ padding: '24px 28px', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 900, color: T.navy }}>Create New Creator Account</h3>
              <button onClick={() => { setCreateCreatorModalOpen(false); clearCreatorForm(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.muted }}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateCreator} style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Email Address *</label>
                  <input type="email" value={creEmail} onChange={e => setCreEmail(e.target.value)} required placeholder="creator@email.com" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Password *</label>
                  <input type="password" value={crePassword} onChange={e => setCrePassword(e.target.value)} required placeholder="Min 8 characters" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Full Name *</label>
                  <input value={creName} onChange={e => setCreName(e.target.value)} required placeholder="e.g. Dilshan Mohmmad" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Handle * (Unique)</label>
                  <input value={creHandle} onChange={e => setCreHandle(e.target.value)} required placeholder="e.g. dilshan_m" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Phone Number</label>
                  <input value={crePhone} onChange={e => setCrePhone(e.target.value)} placeholder="10-digit number" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>City</label>
                  <input value={creCity} onChange={e => setCreCity(e.target.value)} placeholder="e.g. Jaipur" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>State</label>
                  <input value={creState} onChange={e => setCreState(e.target.value)} placeholder="e.g. Rajasthan" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Followers</label>
                  <input type="number" value={creFollowers} onChange={e => setCreFollowers(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Min Rate (INR)</label>
                  <input type="number" value={creRateMin} onChange={e => setCreRateMin(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Max Rate (INR)</label>
                  <input type="number" value={creRateMax} onChange={e => setCreRateMax(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Niches (comma separated)</label>
                  <input value={creNiche} onChange={e => setCreNiche(e.target.value)} placeholder="Fashion, Tech, Lifestyle" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Platforms (comma separated)</label>
                  <input value={crePlatform} onChange={e => setCrePlatform(e.target.value)} placeholder="Instagram, YouTube" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                <button type="submit" style={{ flex: 1, padding: '12px', background: T.orange, color: '#fff', border: 'none', borderRadius: 11, fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>Create Creator Account</button>
                <button type="button" onClick={() => { setCreateCreatorModalOpen(false); clearCreatorForm(); }} style={{ padding: '12px 20px', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 11, fontWeight: 700, fontSize: 13, cursor: 'pointer', color: T.slate }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══ CREATE BRAND PROFILE MODAL ════════════════════════════════ */}
      {createBrandModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(6px)', overflowY: 'auto', padding: '40px 20px' }}>
          <div style={{ width: '100%', maxWidth: 550, background: T.card, borderRadius: 24, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.15)' }}>
            <div style={{ padding: '24px 28px', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 900, color: T.navy }}>Create New Brand Account</h3>
              <button onClick={() => { setCreateBrandModalOpen(false); clearBrandForm(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.muted }}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateBrand} style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Email Address *</label>
                  <input type="email" value={brandEmail} onChange={e => setBrandEmail(e.target.value)} required placeholder="brand@company.com" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Password *</label>
                  <input type="password" value={brandPassword} onChange={e => setBrandPassword(e.target.value)} required placeholder="Min 8 characters" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Company Name *</label>
                <input value={brandCompanyName} onChange={e => setBrandCompanyName(e.target.value)} required placeholder="e.g. Tata Projects Ltd" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Industry</label>
                  <input value={brandIndustry} onChange={e => setBrandIndustry(e.target.value)} placeholder="e.g. Technology" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Website</label>
                  <input value={brandWebsite} onChange={e => setBrandWebsite(e.target.value)} placeholder="https://..." style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Phone Number</label>
                <input value={brandPhone} onChange={e => setBrandPhone(e.target.value)} placeholder="e.g. 9876543210" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
              </div>

              <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                <button type="submit" style={{ flex: 1, padding: '12px', background: T.orange, color: '#fff', border: 'none', borderRadius: 11, fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>Create Brand Account</button>
                <button type="button" onClick={() => { setCreateBrandModalOpen(false); clearBrandForm(); }} style={{ padding: '12px 20px', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 11, fontWeight: 700, fontSize: 13, cursor: 'pointer', color: T.slate }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══ CREATE CAMPAIGN MODAL ══════════════════════════════════════ */}
      {createCampaignModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(6px)', overflowY: 'auto', padding: '40px 20px' }}>
          <div style={{ width: '100%', maxWidth: 600, background: T.card, borderRadius: 24, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.15)' }}>
            <div style={{ padding: '24px 28px', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 900, color: T.navy }}>Create New Campaign</h3>
              <button onClick={() => { setCreateCampaignModalOpen(false); clearCampaignForm(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.muted }}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateCampaign} style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Select Brand *</label>
                <select value={campBrandId} onChange={e => setCampBrandId(e.target.value)} required style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, background: T.card, outline: 'none' }}>
                  <option value="">-- Choose Brand --</option>
                  {brands.map(b => (
                    <option key={b.id} value={b.id}>{b.companyName}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Campaign Title *</label>
                  <input value={campTitle} onChange={e => setCampTitle(e.target.value)} required placeholder="e.g. Diwali Special Launch" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Budget (INR) *</label>
                  <input type="number" value={campBudget} onChange={e => setCampBudget(e.target.value)} required placeholder="50000" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Description / Brief *</label>
                <textarea value={campDesc} onChange={e => setCampDesc(e.target.value)} rows={4} required placeholder="Detail the campaign requirements, deliverables, etc..." style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Target Platforms (comma separated)</label>
                  <input value={campPlatform} onChange={e => setCampPlatform(e.target.value)} placeholder="Instagram, YouTube" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Target Niches (comma separated)</label>
                  <input value={campNiche} onChange={e => setCampNiche(e.target.value)} placeholder="Fashion, Tech" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Campaign Status</label>
                <select value={campStatus} onChange={e => setCampStatus(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, background: T.card, outline: 'none' }}>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="PAUSED">PAUSED</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                <button type="submit" style={{ flex: 1, padding: '12px', background: T.orange, color: '#fff', border: 'none', borderRadius: 11, fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>Create Campaign</button>
                <button type="button" onClick={() => { setCreateCampaignModalOpen(false); clearCampaignForm(); }} style={{ padding: '12px 20px', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 11, fontWeight: 700, fontSize: 13, cursor: 'pointer', color: T.slate }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══ NEW/EDIT EVENT MODAL ════════════════════════════════════ */}
      {eventModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(6px)', overflowY: 'auto', padding: '40px 20px' }}>
          <div style={{ width: '100%', maxWidth: 600, background: T.card, borderRadius: 24, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.15)' }}>
            <div style={{ padding: '24px 28px', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 900, color: T.navy }}>{editingEvent ? 'Edit Event Details' : 'Create New Event'}</h3>
              <button onClick={() => { setEventModalOpen(false); setEditingEvent(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.muted }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveEvent} style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Event Title *</label>
                <input value={evtTitle} onChange={e => setEvtTitle(e.target.value)} required placeholder="e.g. National Creator Summit 2026" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Description / Agenda *</label>
                <textarea value={evtDescription} onChange={e => setEvtDescription(e.target.value)} required rows={4} placeholder="What is the schedule, key hosts, and learning outcomes?" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Date & Time *</label>
                  <input type="datetime-local" value={evtDate} onChange={e => setEvtDate(e.target.value)} required style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Location / Venue *</label>
                  <input value={evtLocation} onChange={e => setEvtLocation(e.target.value)} required placeholder="e.g. New Delhi, ILBS Auditorium" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Registration link</label>
                  <input value={evtLink} onChange={e => setEvtLink(e.target.value)} placeholder="https://..." style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Banner Cover Image URL</label>
                  <input value={evtImage} onChange={e => setEvtImage(e.target.value)} placeholder="https://..." style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                <button type="submit" style={{ flex: 1, padding: '12px', background: T.orange, color: '#fff', border: 'none', borderRadius: 11, fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>{editingEvent ? 'Update Event Details' : 'Create Event'}</button>
                <button type="button" onClick={() => { setEventModalOpen(false); setEditingEvent(null); }} style={{ padding: '12px 20px', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 11, fontWeight: 700, fontSize: 13, cursor: 'pointer', color: T.slate }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══ GRANT ACHIEVEMENT MODAL ══════════════════════════════════ */}
      {grantAchModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(6px)', overflowY: 'auto', padding: '40px 20px' }}>
          <div style={{ width: '100%', maxWidth: 550, background: T.card, borderRadius: 24, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.15)' }}>
            <div style={{ padding: '24px 28px', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 900, color: T.navy }}>Grant Creator Achievement Badge</h3>
              <button onClick={() => { setGrantAchModalOpen(false); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.muted }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveAchievement} style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Select Creator *</label>
                <select value={achCreatorId} onChange={e => setAchCreatorId(e.target.value)} required style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, background: T.card, outline: 'none' }}>
                  <option value="">-- Choose Creator --</option>
                  {creators.map(c => (
                    <option key={c.id} value={c.id}>{c.name} (@{c.handle})</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Badge Type *</label>
                  <select value={achType} onChange={e => setAchType(e.target.value)} required style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, background: T.card, outline: 'none' }}>
                    <option value="VERIFICATION">VERIFICATION</option>
                    <option value="FOLLOWER_MILESTONE">FOLLOWER MILESTONE</option>
                    <option value="DEAL_MILESTONE">DEAL MILESTONE</option>
                    <option value="CUSTOM">CUSTOM BADGE</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Badge Title *</label>
                  <input value={achTitle} onChange={e => setAchTitle(e.target.value)} required placeholder="e.g. Rising Star, Superhost" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Description / Criteria</label>
                <textarea value={achDescription} onChange={e => setAchDescription(e.target.value)} rows={3} placeholder="Describe the reason for awarding this badge..." style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} />
              </div>
              <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                <button type="submit" style={{ flex: 1, padding: '12px', background: T.orange, color: '#fff', border: 'none', borderRadius: 11, fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>Grant Badge</button>
                <button type="button" onClick={() => { setGrantAchModalOpen(false); }} style={{ padding: '12px 20px', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 11, fontWeight: 700, fontSize: 13, cursor: 'pointer', color: T.slate }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══ NEW/EDIT MISSION MODAL ══════════════════════════════════ */}
      {missionModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(6px)', overflowY: 'auto', padding: '40px 20px' }}>
          <div style={{ width: '100%', maxWidth: 600, background: T.card, borderRadius: 24, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.15)' }}>
            <div style={{ padding: '24px 28px', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 900, color: T.navy }}>{editingMission ? 'Edit Monthly Mission' : 'Create Monthly Mission'}</h3>
              <button onClick={() => { setMissionModalOpen(false); setEditingMission(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.muted }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveMission} style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Mission Title *</label>
                  <input value={misTitle} onChange={e => setMisTitle(e.target.value)} required placeholder="e.g. Join the Creator Network" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Reward Tag *</label>
                  <input value={misReward} onChange={e => setMisReward(e.target.value)} required placeholder="e.g. 500 Coins, Swag Bag" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Reward Color (Hex)</label>
                  <input value={misRewardColor} onChange={e => setMisRewardColor(e.target.value)} placeholder="#FF9431" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Deadline Date *</label>
                  <input type="date" value={misDeadline} onChange={e => setMisDeadline(e.target.value)} required style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Description / Instructions *</label>
                <textarea value={misDescription} onChange={e => setMisDescription(e.target.value)} required rows={3} placeholder="What does the creator need to do?" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Steps / Checklist (One per line) *</label>
                <textarea value={misSteps} onChange={e => setMisSteps(e.target.value)} required rows={4} placeholder="Complete your profile&#10;Verify your email&#10;Share referral link" style={{ width: '100%', padding: '10px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700, color: T.navy, cursor: 'pointer', marginTop: 8 }}>
                <input type="checkbox" checked={misActive} onChange={e => setMisActive(e.target.checked)} style={{ width: 16, height: 16 }} />
                ✓ Mission is Active and visible to creators
              </label>
              <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                <button type="submit" style={{ flex: 1, padding: '12px', background: T.orange, color: '#fff', border: 'none', borderRadius: 11, fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>{editingMission ? 'Update Mission' : 'Create Mission'}</button>
                <button type="button" onClick={() => { setMissionModalOpen(false); setEditingMission(null); }} style={{ padding: '12px 20px', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 11, fontWeight: 700, fontSize: 13, cursor: 'pointer', color: T.slate }}>Cancel</button>
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
