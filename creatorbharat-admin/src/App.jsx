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
  AlertTriangle,
  XCircle,
  Eye,
  Check,
  X,
  Search,
  ChevronRight,
  Filter,
  CreditCard,
  Trash2,
  SlidersHorizontal,
  Info,
  MessageSquare,
  PlayCircle,
  Star
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
  const [brands, setBrands] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [verifications, setVerifications] = useState([]);
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState(null);

  const [blogs, setBlogs] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [reviews, setReviews] = useState([]);

  // New Search Filters
  const [blogSearch, setBlogSearch] = useState('');
  const [newsletterSearch, setNewsletterSearch] = useState('');
  const [contactSearch, setContactSearch] = useState('');
  const [podcastSearch, setPodcastSearch] = useState('');
  const [reviewSearch, setReviewSearch] = useState('');

  // Blog creation modal and form states
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

  // View Contact Message detail modal
  const [viewingContact, setViewingContact] = useState(null);
  
  const [dataLoading, setDataLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Search & Filter States
  const [creatorSearch, setCreatorSearch] = useState('');
  const [brandSearch, setBrandSearch] = useState('');
  const [campaignSearch, setCampaignSearch] = useState('');
  const [paymentSearch, setPaymentSearch] = useState('');

  // Selected Item for Drawer Details (KYC / Profile)
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Settings mock state
  const [platformFee, setPlatformFee] = useState(10);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [supportEmail, setSupportEmail] = useState('hello@creatorbharat.com');

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
      triggerToast('Welcome Back, Administrator!', 'success');
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
    setBrands([]);
    setCampaigns([]);
    setVerifications([]);
    setPayments([]);
    setStats(null);
    triggerToast('Session closed successfully', 'info');
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

      // 3. Fetch all brands
      const resBr = await fetch(`${API_BASE}/admin/brands`, { headers });
      const dataBr = await resBr.json();
      if (resBr.ok) setBrands(Array.isArray(dataBr) ? dataBr : []);

      // 4. Fetch all campaigns
      const resCam = await fetch(`${API_BASE}/campaigns`, { headers });
      const dataCam = await resCam.json();
      if (resCam.ok) setCampaigns(dataCam || []);

      // 5. Fetch all payments (Admin exclusive)
      const resPay = await fetch(`${API_BASE}/admin/payments`, { headers });
      const dataPay = await resPay.json();
      if (resPay.ok) setPayments(Array.isArray(dataPay) ? dataPay : []);

      // 6. Fetch stats and chart data (Admin exclusive)
      const resSt = await fetch(`${API_BASE}/admin/stats`, { headers });
      const dataSt = await resSt.json();
      if (resSt.ok) setStats(dataSt);

      // 7. Fetch all blogs
      const resBlog = await fetch(`${API_BASE}/admin/blogs`, { headers });
      const dataBlog = await resBlog.json();
      if (resBlog.ok) setBlogs(Array.isArray(dataBlog) ? dataBlog : []);

      // 8. Fetch all newsletters
      const resNews = await fetch(`${API_BASE}/admin/newsletters`, { headers });
      const dataNews = await resNews.json();
      if (resNews.ok) setNewsletters(Array.isArray(dataNews) ? dataNews : []);

      // 9. Fetch all contacts
      const resCont = await fetch(`${API_BASE}/admin/contacts`, { headers });
      const dataCont = await resCont.json();
      if (resCont.ok) setContacts(Array.isArray(dataCont) ? dataCont : []);

      // 10. Fetch all podcasts
      const resPod = await fetch(`${API_BASE}/admin/podcasts`, { headers });
      const dataPod = await resPod.json();
      if (resPod.ok) setPodcasts(Array.isArray(dataPod) ? dataPod : []);

      // 11. Fetch all reviews
      const resRev = await fetch(`${API_BASE}/admin/reviews`, { headers });
      const dataRev = await resRev.json();
      if (resRev.ok) setReviews(Array.isArray(dataRev) ? dataRev : []);

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
      setDrawerOpen(false);
      // Refresh database records
      fetchDashboardData();
    } catch (err) {
      triggerToast(err.message, 'error');
    }
  };

  // Toggle user suspension status
  const handleToggleSuspension = async (userId) => {
    try {
      const res = await fetch(`${API_BASE}/admin/users/suspend/${userId}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Suspension failed');
      
      triggerToast(data.message, 'success');
      fetchDashboardData();
    } catch (err) {
      triggerToast(err.message, 'error');
    }
  };

  // manual release/refund payout overrides
  const handlePaymentOverride = async (paymentId, action) => {
    try {
      const res = await fetch(`${API_BASE}/admin/payments/override`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ paymentId, action })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Override failed');
      
      triggerToast(data.message, 'success');
      fetchDashboardData();
    } catch (err) {
      triggerToast(err.message, 'error');
    }
  };

  // delete campaigns that violate terms
  const handleDeleteCampaign = async (campaignId) => {
    if (!window.confirm('Are you sure you want to terminate this campaign posting?')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/campaigns/${campaignId}`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete campaign');
      
      triggerToast('Campaign deleted successfully', 'success');
      fetchDashboardData();
    } catch (err) {
      triggerToast(err.message, 'error');
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    triggerToast('System settings saved successfully', 'success');
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    if (!blogTitle || !blogSlug || !blogBody) {
      return triggerToast('Title, Slug, and Body are required.', 'error');
    }
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      const bodyPayload = {
        title: blogTitle.trim(),
        slug: blogSlug.trim(),
        category: blogCategory,
        excerpt: blogExcerpt.trim(),
        body: blogBody.trim(),
        author: blogAuthor.trim(),
        image: blogImage || 'https://images.unsplash.com/photo-1546074177-ffedd79d494d?q=80&w=600',
        tags: blogTags.split(',').map(t => t.trim()).filter(Boolean),
        featured: blogFeatured,
        published: blogPublished
      };

      let res;
      if (editingBlog) {
        res = await fetch(`${API_BASE}/admin/blogs/${editingBlog.id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(bodyPayload)
        });
      } else {
        res = await fetch(`${API_BASE}/admin/blogs`, {
          method: 'POST',
          headers,
          body: JSON.stringify(bodyPayload)
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save blog post.');

      triggerToast(editingBlog ? 'Blog updated successfully!' : 'Blog post created successfully!', 'success');
      setBlogModalOpen(false);
      setEditingBlog(null);
      clearBlogForm();
      fetchDashboardData();
    } catch (err) {
      triggerToast(err.message, 'error');
    }
  };

  const clearBlogForm = () => {
    setBlogTitle('');
    setBlogSlug('');
    setBlogCategory('Marketing');
    setBlogExcerpt('');
    setBlogBody('');
    setBlogAuthor('CB Editorial');
    setBlogImage('');
    setBlogTags('');
    setBlogFeatured(false);
    setBlogPublished(false);
  };

  const handleOpenEditBlog = (blog) => {
    setEditingBlog(blog);
    setBlogTitle(blog.title);
    setBlogSlug(blog.slug);
    setBlogCategory(blog.category);
    setBlogExcerpt(blog.excerpt || '');
    setBlogBody(blog.body);
    setBlogAuthor(blog.author);
    setBlogImage(blog.image || '');
    setBlogTags(blog.tags?.join(', ') || '');
    setBlogFeatured(blog.featured);
    setBlogPublished(blog.published);
    setBlogModalOpen(true);
  };

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog article?')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/blogs/${blogId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete blog');
      triggerToast('Blog article deleted successfully!', 'success');
      fetchDashboardData();
    } catch (err) {
      triggerToast(err.message, 'error');
    }
  };

  const handleDeleteSubscriber = async (subId) => {
    if (!window.confirm('Remove this subscriber from list?')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/newsletters/${subId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete subscriber');
      triggerToast('Subscriber removed successfully!', 'success');
      fetchDashboardData();
    } catch (err) {
      triggerToast(err.message, 'error');
    }
  };

  const handleToggleContactRead = async (contactId) => {
    try {
      const res = await fetch(`${API_BASE}/admin/contacts/${contactId}/read`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update message status');
      fetchDashboardData();
    } catch (err) {
      triggerToast(err.message, 'error');
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (!window.confirm('Delete this contact message permanently?')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/contacts/${contactId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete contact message');
      triggerToast('Contact message deleted!', 'success');
      fetchDashboardData();
    } catch (err) {
      triggerToast(err.message, 'error');
    }
  };

  const handleTogglePodcast = async (podcastId) => {
    try {
      const res = await fetch(`${API_BASE}/admin/podcasts/toggle/${podcastId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to toggle status');
      triggerToast(data.message, 'success');
      fetchDashboardData();
    } catch (err) {
      triggerToast(err.message, 'error');
    }
  };

  const handleDeletePodcast = async (podcastId) => {
    if (!window.confirm('Are you sure you want to delete this podcast episode?')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/podcasts/${podcastId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete podcast');
      triggerToast('Podcast deleted successfully!', 'success');
      fetchDashboardData();
    } catch (err) {
      triggerToast(err.message, 'error');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review? This action is permanent.')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete review');
      triggerToast('Review deleted successfully!', 'success');
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
        background: '#f8fafc',
        color: '#0f172a',
        padding: 16,
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{
          width: '100%',
          maxWidth: 420,
          background: '#ffffff',
          border: '1px solid rgba(0,0,0,0.06)',
          borderRadius: 24,
          padding: 40,
          boxShadow: '0 20px 40px rgba(0,0,0,0.04)'
        }}>
          {/* Header logo */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 24,
              color: '#fff',
              marginBottom: 16,
              boxShadow: '0 8px 16px rgba(249, 115, 22, 0.2)'
            }}>CB</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 6px 0', color: '#0f172a' }}>Admin Control Panel</h2>
            <span style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 700 }}>CreatorBharat SaaS</span>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            
            {authError && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.05)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                color: '#ef4444',
                padding: '12px 16px',
                borderRadius: 12,
                fontSize: 13,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}>
                <AlertTriangle size={16} />
                {authError}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#475569', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Admin Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@creatorbharat.com" 
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: 12,
                    border: '1px solid #cbd5e1',
                    background: '#fff',
                    color: '#0f172a',
                    fontSize: 14,
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#475569', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: 12,
                    border: '1px solid #cbd5e1',
                    background: '#fff',
                    color: '#0f172a',
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
                padding: '14px',
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 14,
                cursor: authLoading ? 'not-allowed' : 'pointer',
                marginTop: 8,
                transition: 'opacity 0.2s',
                opacity: authLoading ? 0.7 : 1,
                boxShadow: '0 4px 12px rgba(249, 115, 22, 0.2)'
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
  const totalEscrowHoldings = stats?.counts?.escrowHoldings || 0;
  const countStats = [
    { label: 'Total Creators', value: creators.length, sub: 'Registered database row count', icon: Users, color: '#f97316' },
    { label: 'Brand Accounts', value: brands.length, sub: 'Partner companies list', icon: Building2, color: '#3b82f6' },
    { label: 'Pending Verifications', value: verifications.length, sub: 'Needs profile credential audit', icon: ShieldCheck, color: '#22c55e' },
    { label: 'Active Escrow', value: `₹${(totalEscrowHoldings / 1000).toFixed(0)}k`, sub: 'Razorpay campaign budget locks', icon: DollarSign, color: '#a855f7' }
  ];

  // SVG Chart Computations (last 6 months user signups and transaction volume curves)
  const chartData = stats?.chartData || [];
  const maxUserCount = Math.max(...chartData.map(d => d.userCount), 1);
  const maxEscrowVolume = Math.max(...chartData.map(d => d.escrowVolume), 1);

  // SVG line points creator helper
  const generateLinePoints = (data, valueKey, maxValue, width, height) => {
    if (data.length === 0) return '';
    const xStep = width / (data.length - 1);
    return data.map((d, index) => {
      const x = index * xStep;
      const y = height - (d[valueKey] / maxValue) * (height - 20) - 10;
      return `${x},${y}`;
    }).join(' ');
  };

  // Filter listings
  const filteredCreators = creators.filter(c => 
    c.name.toLowerCase().includes(creatorSearch.toLowerCase()) || 
    c.handle.toLowerCase().includes(creatorSearch.toLowerCase()) ||
    c.city?.toLowerCase().includes(creatorSearch.toLowerCase())
  );

  const filteredBrands = brands.filter(b => 
    b.companyName.toLowerCase().includes(brandSearch.toLowerCase()) || 
    b.industry?.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const filteredCampaigns = campaigns.filter(c => 
    c.title.toLowerCase().includes(campaignSearch.toLowerCase()) || 
    c.brand?.companyName.toLowerCase().includes(campaignSearch.toLowerCase())
  );

  const filteredPayments = payments.filter(p => 
    (p.razorpayOrderId && p.razorpayOrderId.toLowerCase().includes(paymentSearch.toLowerCase())) ||
    (p.razorpayId && p.razorpayId.toLowerCase().includes(paymentSearch.toLowerCase())) ||
    p.type.toLowerCase().includes(paymentSearch.toLowerCase())
  );

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      background: '#f8fafc', 
      color: '#0f172a',
      fontFamily: 'system-ui, -apple-system, sans-serif' 
    }}>
      
      {/* Toast notifications container */}
      <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 10000, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            padding: '12px 18px',
            background: '#ffffff',
            borderLeft: '4px solid ' + (t.type === 'success' ? '#22c55e' : t.type === 'error' ? '#ef4444' : '#3b82f6'),
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 650,
            color: '#1e293b',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
            animation: 'fadeIn 0.2s ease'
          }}>
            <span style={{ fontSize: 16 }}>{t.type === 'success' ? '✓' : t.type === 'error' ? '✗' : 'ℹ'}</span>
            <span>{t.msg}</span>
          </div>
        ))}
      </div>

      {/* Sidebar Nav */}
      <aside style={{
        width: 260,
        background: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        padding: '30px 20px',
        flexShrink: 0
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40, padding: '0 8px' }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: 18,
            color: '#fff',
            boxShadow: '0 4px 8px rgba(249, 115, 22, 0.2)'
          }}>CB</div>
          <div>
            <h1 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: '#0f172a' }}>CreatorBharat</h1>
            <span style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: 700 }}>Admin Console</span>
          </div>
        </div>

        {/* Menu */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { id: 'dashboard', label: 'Dashboard Overview', icon: TrendingUp },
            { id: 'verifications', label: 'Verification Queue', icon: ShieldCheck, badge: verifications.length },
            { id: 'creators', label: 'Manage Creators', icon: Users, badge: creators.length },
            { id: 'brands', label: 'Manage Brands', icon: Building2, badge: brands.length },
            { id: 'campaigns', label: 'Campaign Postings', icon: FileText, badge: campaigns.length },
            { id: 'escrows', label: 'Payments & Escrow', icon: CreditCard, badge: payments.length },
            { id: 'blogs', label: 'Manage Blogs', icon: FileText, badge: blogs.length },
            { id: 'newsletters', label: 'Newsletter Subs', icon: Mail, badge: newsletters.length },
            { id: 'contacts', label: 'Contact Queries', icon: MessageSquare, badge: contacts.filter(c => !c.read).length },
            { id: 'podcasts', label: 'Manage Podcasts', icon: PlayCircle, badge: podcasts.length },
            { id: 'reviews', label: 'Moderate Reviews', icon: Star, badge: reviews.length },
            { id: 'settings', label: 'System Settings', icon: SlidersHorizontal }
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
                  borderRadius: 12,
                  border: 'none',
                  background: active ? 'rgba(249, 115, 22, 0.08)' : 'transparent',
                  color: active ? '#f97316' : '#475569',
                  fontSize: 13,
                  fontWeight: 650,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }}
              >
                <Icon size={18} style={{ color: active ? '#f97316' : '#64748b' }} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: 20,
                    background: active ? '#f97316' : '#e2e8f0',
                    color: active ? '#fff' : '#475569',
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
            borderRadius: 12,
            border: '1px solid #fee2e2',
            background: '#fef2f2',
            color: '#ef4444',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            marginTop: 'auto',
            justifyContent: 'center'
          }}
        >
          <LogOut size={16} />
          Logout Session
        </button>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '40px 50px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, borderBottom: '1px solid #e2e8f0', paddingBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 4px 0', color: '#0f172a' }}>SaaS Console Dashboard</h2>
            <p style={{ margin: 0, fontSize: 13, color: '#64748b', fontWeight: 500 }}>Monitor verification flows, payouts, and suspend fraudulent users.</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <span style={{ 
              padding: '8px 16px', 
              background: 'rgba(34, 197, 94, 0.08)', 
              color: '#16a34a', 
              fontSize: 12, 
              fontWeight: 700, 
              borderRadius: 30,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              border: '1px solid rgba(34, 197, 94, 0.2)'
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }}></span>
              Neon Database: Connected
            </span>
          </div>
        </header>

        {/* Dashboard Overview Tab */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            
            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
              {countStats.map((st, i) => {
                const Icon = st.icon;
                return (
                  <div 
                    key={i} 
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: 20,
                      padding: 24,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 20,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.01)'
                    }}
                  >
                    <div style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: `${st.color}08`,
                      color: st.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${st.color}15`
                    }}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 2px 0', fontSize: 26, fontWeight: 800, color: '#0f172a' }}>{st.value}</h4>
                      <span style={{ display: 'block', fontSize: 13, color: '#475569', fontWeight: 700 }}>{st.label}</span>
                      <span style={{ display: 'block', fontSize: 10, color: '#64748b', marginTop: 4, fontWeight: 500 }}>{st.sub}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Graphs Grid */}
            {chartData.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {/* SVG User Growth Chart */}
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, padding: 24 }}>
                  <h3 style={{ margin: '0 0 16px 0', fontSize: 14, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5 }}>User Signup Trends (Past 6 Months)</h3>
                  <div style={{ position: 'relative', width: '100%', height: 160 }}>
                    <svg viewBox="0 0 400 160" style={{ width: '100%', height: '100%' }}>
                      <defs>
                        <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"/>
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0"/>
                        </linearGradient>
                      </defs>
                      <path 
                        d={`M 0,160 L ${generateLinePoints(chartData, 'userCount', maxUserCount, 400, 160)} L 400,160 Z`} 
                        fill="url(#userGrad)"
                      />
                      <polyline
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        points={generateLinePoints(chartData, 'userCount', maxUserCount, 400, 160)}
                      />
                      {chartData.map((d, index) => {
                        const x = index * (400 / (chartData.length - 1));
                        const y = 160 - (d.userCount / maxUserCount) * 140 - 10;
                        return (
                          <g key={index}>
                            <circle cx={x} cy={y} r="4" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
                            <text x={x} y={y - 8} fontSize="10" fontWeight="bold" textAnchor="middle" fill="#3b82f6">{d.userCount}</text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 11, fontWeight: 700, color: '#64748b' }}>
                    {chartData.map((d, i) => <span key={i}>{d.month}</span>)}
                  </div>
                </div>

                {/* SVG Escrow Volume Chart */}
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, padding: 24 }}>
                  <h3 style={{ margin: '0 0 16px 0', fontSize: 14, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5 }}>Escrow Transaction Volumes (₹)</h3>
                  <div style={{ position: 'relative', width: '100%', height: 160 }}>
                    <svg viewBox="0 0 400 160" style={{ width: '100%', height: '100%' }}>
                      <defs>
                        <linearGradient id="escrowGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f97316" stopOpacity="0.2"/>
                          <stop offset="100%" stopColor="#f97316" stopOpacity="0.0"/>
                        </linearGradient>
                      </defs>
                      <path 
                        d={`M 0,160 L ${generateLinePoints(chartData, 'escrowVolume', maxEscrowVolume, 400, 160)} L 400,160 Z`} 
                        fill="url(#escrowGrad)"
                      />
                      <polyline
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="3"
                        points={generateLinePoints(chartData, 'escrowVolume', maxEscrowVolume, 400, 160)}
                      />
                      {chartData.map((d, index) => {
                        const x = index * (400 / (chartData.length - 1));
                        const y = 160 - (d.escrowVolume / maxEscrowVolume) * 140 - 10;
                        return (
                          <g key={index}>
                            <circle cx={x} cy={y} r="4" fill="#f97316" stroke="#fff" strokeWidth="2" />
                            <text x={x} y={y - 8} fontSize="9" fontWeight="bold" textAnchor="middle" fill="#f97316">₹{(d.escrowVolume/1000).toFixed(0)}k</text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 11, fontWeight: 700, color: '#64748b' }}>
                    {chartData.map((d, i) => <span key={i}>{d.month}</span>)}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Priority verification queue */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, padding: 30 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0f172a' }}>Priority Verification Queue</h3>
                <button 
                  onClick={() => setActiveTab('verifications')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#f97316',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  View Full Queue ({verifications.length}) →
                </button>
              </div>

              {verifications.length === 0 ? (
                <div style={{ padding: '30px', textAlign: 'center', color: '#64748b', fontSize: 13, fontWeight: 500 }}>
                  🎉 No pending verifications. All creators have been reviewed!
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Creator</th>
                        <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Handle</th>
                        <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Location</th>
                        <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Documents</th>
                        <th style={{ padding: '12px 16px', textAlign: 'right', color: '#64748b', fontWeight: 700 }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {verifications.slice(0, 3).map(cr => (
                        <tr key={cr.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '16px', fontWeight: 700, color: '#0f172a' }}>{cr.name}</td>
                          <td style={{ padding: '16px', color: '#f97316', fontWeight: 700 }}>@{cr.handle}</td>
                          <td style={{ padding: '16px', color: '#475569', fontWeight: 650 }}>{cr.city || 'N/A'}, {cr.state || 'N/A'}</td>
                          <td style={{ padding: '16px' }}>
                            <span style={{ fontSize: 11, padding: '3px 8px', background: cr.aadhaarUrl ? '#dcfce7' : '#fee2e2', color: cr.aadhaarUrl ? '#15803d' : '#b91c1c', borderRadius: 20, marginRight: 6, fontWeight: 700 }}>Aadhaar</span>
                            <span style={{ fontSize: 11, padding: '3px 8px', background: cr.panUrl ? '#dcfce7' : '#fee2e2', color: cr.panUrl ? '#15803d' : '#b91c1c', borderRadius: 20, fontWeight: 700 }}>PAN</span>
                          </td>
                          <td style={{ padding: '16px', textAlign: 'right' }}>
                            <button 
                              onClick={() => {
                                setSelectedCreator(cr);
                                setDrawerOpen(true);
                              }}
                              style={{
                                padding: '6px 14px',
                                background: 'rgba(249, 115, 22, 0.08)',
                                color: '#f97316',
                                border: 'none',
                                borderRadius: 8,
                                fontSize: 12,
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 6
                              }}
                            >
                              <Eye size={14} />
                              Review KYC
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Verifications Tab */}
        {activeTab === 'verifications' && (
          <section style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, padding: 30 }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: 18, fontWeight: 800, color: '#0f172a' }}>Identity Verification Queue</h3>
            {verifications.length === 0 ? (
              <div style={{ padding: '50px 0', textAlign: 'center', color: '#64748b', fontWeight: 500 }}>
                🎉 No pending profile verification requests.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Name</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Handle</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Category Niche</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Followers</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Aadhaar / PAN</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', color: '#64748b', fontWeight: 700 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {verifications.map(cr => (
                      <tr key={cr.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '16px', fontWeight: 700, color: '#0f172a' }}>{cr.name}</td>
                        <td style={{ padding: '16px', color: '#f97316', fontWeight: 700 }}>@{cr.handle}</td>
                        <td style={{ padding: '16px' }}>
                          {cr.niche?.map((n, i) => (
                            <span key={i} style={{ padding: '2px 8px', background: '#f1f5f9', borderRadius: 20, fontSize: 10, marginRight: 4, color: '#475569', fontWeight: 700 }}>{n}</span>
                          )) || <span style={{ color: '#94a3b8' }}>None</span>}
                        </td>
                        <td style={{ padding: '16px', fontWeight: 700, color: '#475569' }}>{cr.followers.toLocaleString()}</td>
                        <td style={{ padding: '16px' }}>
                          <span style={{ fontSize: 11, padding: '3px 8px', background: cr.aadhaarUrl ? '#dcfce7' : '#fee2e2', color: cr.aadhaarUrl ? '#15803d' : '#b91c1c', borderRadius: 20, marginRight: 6, fontWeight: 700 }}>Aadhaar</span>
                          <span style={{ fontSize: 11, padding: '3px 8px', background: cr.panUrl ? '#dcfce7' : '#fee2e2', color: cr.panUrl ? '#15803d' : '#b91c1c', borderRadius: 20, fontWeight: 700 }}>PAN</span>
                        </td>
                        <td style={{ padding: '16px', textAlign: 'right' }}>
                          <button 
                            onClick={() => {
                              setSelectedCreator(cr);
                              setDrawerOpen(true);
                            }}
                            style={{
                              padding: '6px 14px',
                              background: 'linear-gradient(135deg, #f97316, #ea580c)',
                              color: '#fff',
                              border: 'none',
                              borderRadius: 8,
                              fontSize: 12,
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 6
                            }}
                          >
                            <Eye size={14} />
                            Audit Files
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
          <section style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, padding: 30 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0f172a' }}>Influencer Accounts Directory</h3>
              <div style={{ position: 'relative', width: 280 }}>
                <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  value={creatorSearch}
                  onChange={(e) => setCreatorSearch(e.target.value)}
                  placeholder="Search creators..." 
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 36px',
                    borderRadius: 10,
                    border: '1px solid #cbd5e1',
                    fontSize: 13,
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {filteredCreators.length === 0 ? (
              <div style={{ padding: '50px 0', textAlign: 'center', color: '#64748b', fontWeight: 500 }}>
                No creators matched your search query.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Name</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Handle</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Email Address</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Location</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Followers</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Badge Status</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', color: '#64748b', fontWeight: 700 }}>Ban Toggle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCreators.map(cr => (
                      <tr key={cr.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '16px', fontWeight: 700, color: '#0f172a' }}>{cr.name}</td>
                        <td style={{ padding: '16px', color: '#f97316', fontWeight: 700 }}>@{cr.handle}</td>
                        <td style={{ padding: '16px', color: '#475569', fontWeight: 650 }}>{cr.user?.email || 'N/A'}</td>
                        <td style={{ padding: '16px', color: '#475569', fontWeight: 650 }}>{cr.city || 'N/A'}, {cr.state || 'N/A'}</td>
                        <td style={{ padding: '16px', fontWeight: 700, color: '#475569' }}>{cr.followers.toLocaleString()}</td>
                        <td style={{ padding: '16px' }}>
                          <span style={{
                            padding: '3px 10px',
                            background: cr.isVerified ? 'rgba(34,197,94,0.08)' : 'rgba(245,158,11,0.08)',
                            color: cr.isVerified ? '#16a34a' : '#d97706',
                            borderRadius: 20,
                            fontSize: 11,
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4
                          }}>
                            {cr.isVerified ? <CheckCircle2 size={12} /> : null}
                            {cr.isVerified ? 'Verified' : 'Pending review'}
                          </span>
                        </td>
                        <td style={{ padding: '16px', textAlign: 'right' }}>
                          <button 
                            onClick={() => handleToggleSuspension(cr.user.id)}
                            style={{
                              padding: '5px 12px',
                              background: cr.user?.isSuspended ? 'rgba(34, 197, 94, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                              color: cr.user?.isSuspended ? '#16a34a' : '#ef4444',
                              border: 'none',
                              borderRadius: 8,
                              fontSize: 12,
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            {cr.user?.isSuspended ? 'Reactivate' : 'Suspend Ban'}
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

        {/* Brands Tab */}
        {activeTab === 'brands' && (
          <section style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, padding: 30 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0f172a' }}>Brand Partner Accounts</h3>
              <div style={{ position: 'relative', width: 280 }}>
                <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  placeholder="Search brands..." 
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 36px',
                    borderRadius: 10,
                    border: '1px solid #cbd5e1',
                    fontSize: 13,
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {filteredBrands.length === 0 ? (
              <div style={{ padding: '50px 0', textAlign: 'center', color: '#64748b', fontWeight: 500 }}>
                No brands registered in database.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Company Name</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Industry</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Email Address</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Phone</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Campaigns Posted</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', color: '#64748b', fontWeight: 700 }}>Ban Controls</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBrands.map(br => (
                      <tr key={br.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '16px', fontWeight: 700, color: '#0f172a' }}>{br.companyName}</td>
                        <td style={{ padding: '16px', color: '#475569', fontWeight: 650 }}>{br.industry || 'N/A'}</td>
                        <td style={{ padding: '16px', color: '#475569', fontWeight: 650 }}>{br.user?.email || 'N/A'}</td>
                        <td style={{ padding: '16px', color: '#475569', fontWeight: 650 }}>{br.user?.phone || 'N/A'}</td>
                        <td style={{ padding: '16px', fontWeight: 700, color: '#475569' }}>{br._count?.campaigns || 0}</td>
                        <td style={{ padding: '16px', textAlign: 'right' }}>
                          <button 
                            onClick={() => handleToggleSuspension(br.user.id)}
                            style={{
                              padding: '5px 12px',
                              background: br.user?.isSuspended ? 'rgba(34, 197, 94, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                              color: br.user?.isSuspended ? '#16a34a' : '#ef4444',
                              border: 'none',
                              borderRadius: 8,
                              fontSize: 12,
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            {br.user?.isSuspended ? 'Reactivate' : 'Suspend Ban'}
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

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <section style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, padding: 30 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0f172a' }}>Campaign Postings Board</h3>
              <div style={{ position: 'relative', width: 280 }}>
                <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  value={campaignSearch}
                  onChange={(e) => setCampaignSearch(e.target.value)}
                  placeholder="Search campaigns..." 
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 36px',
                    borderRadius: 10,
                    border: '1px solid #cbd5e1',
                    fontSize: 13,
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {filteredCampaigns.length === 0 ? (
              <div style={{ padding: '50px 0', textAlign: 'center', color: '#64748b', fontWeight: 500 }}>
                No campaigns registered in database.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Title</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Brand Partner</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Niche Categories</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Platform</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Budget (₹)</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', color: '#64748b', fontWeight: 700 }}>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCampaigns.map(cp => (
                      <tr key={cp.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '16px', fontWeight: 700, color: '#0f172a' }}>{cp.title}</td>
                        <td style={{ padding: '16px', color: '#475569', fontWeight: 650 }}>{cp.brand?.companyName || 'N/A'}</td>
                        <td style={{ padding: '16px' }}>
                          {cp.niche?.map((n, i) => (
                            <span key={i} style={{ padding: '2px 8px', background: '#f1f5f9', borderRadius: 20, fontSize: 10, marginRight: 4, color: '#475569', fontWeight: 700 }}>{n}</span>
                          )) || <span style={{ color: '#94a3b8' }}>None</span>}
                        </td>
                        <td style={{ padding: '16px' }}>
                          {cp.platform?.map((p, i) => (
                            <span key={i} style={{ padding: '2px 8px', background: 'rgba(249, 115, 22, 0.05)', color: '#f97316', borderRadius: 20, fontSize: 10, marginRight: 4, textTransform: 'capitalize', fontWeight: 700 }}>{p}</span>
                          )) || <span style={{ color: '#94a3b8' }}>None</span>}
                        </td>
                        <td style={{ padding: '16px', color: '#f97316', fontWeight: 800 }}>₹{cp.budget.toLocaleString()}</td>
                        <td style={{ padding: '16px', textAlign: 'right' }}>
                          <button 
                            onClick={() => handleDeleteCampaign(cp.id)}
                            style={{
                              padding: '6px 12px',
                              background: '#fef2f2',
                              color: '#ef4444',
                              border: '1px solid #fee2e2',
                              borderRadius: 8,
                              fontSize: 12,
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 6
                            }}
                          >
                            <Trash2 size={14} />
                            Delete
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

        {/* Escrow Payments Manager Tab */}
        {activeTab === 'escrows' && (
          <section style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, padding: 30 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0f172a' }}>Transaction Escrow Override Logs</h3>
              <div style={{ position: 'relative', width: 280 }}>
                <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  value={paymentSearch}
                  onChange={(e) => setPaymentSearch(e.target.value)}
                  placeholder="Search payments order ID..." 
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 36px',
                    borderRadius: 10,
                    border: '1px solid #cbd5e1',
                    fontSize: 13,
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {filteredPayments.length === 0 ? (
              <div style={{ padding: '50px 0', textAlign: 'center', color: '#64748b', fontWeight: 500 }}>
                No payment transactions logged in database.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Order ID</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Razorpay ID</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Type</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Amount (₹)</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Status</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', color: '#64748b', fontWeight: 700 }}>Admin Override</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map(p => (
                      <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '16px', fontWeight: 700, color: '#0f172a' }}>{p.razorpayOrderId || 'N/A'}</td>
                        <td style={{ padding: '16px', color: '#475569', fontWeight: 650 }}>{p.razorpayId || 'N/A'}</td>
                        <td style={{ padding: '16px' }}>
                          <span style={{
                            padding: '3px 8px',
                            background: '#f1f5f9',
                            borderRadius: 6,
                            fontSize: 11,
                            fontWeight: 700,
                            color: '#475569'
                          }}>{p.type}</span>
                        </td>
                        <td style={{ padding: '16px', color: '#f97316', fontWeight: 800 }}>₹{p.amount.toLocaleString()}</td>
                        <td style={{ padding: '16px' }}>
                          <span style={{
                            padding: '4px 10px',
                            background: p.status === 'PAID' ? '#dcfce7' : p.status === 'RELEASED' ? '#eff6ff' : p.status === 'PENDING' ? '#fffbeb' : '#fee2e2',
                            color: p.status === 'PAID' ? '#16a34a' : p.status === 'RELEASED' ? '#2563eb' : p.status === 'PENDING' ? '#d97706' : '#ef4444',
                            borderRadius: 20,
                            fontSize: 11,
                            fontWeight: 700
                          }}>{p.status}</span>
                        </td>
                        <td style={{ padding: '16px', textAlign: 'right' }}>
                          {p.type === 'CAMPAIGN_ESCROW' && p.status === 'PAID' ? (
                            <div style={{ display: 'inline-flex', gap: 6 }}>
                              <button 
                                onClick={() => handlePaymentOverride(p.id, 'RELEASE')}
                                style={{
                                  padding: '5px 10px',
                                  background: '#dcfce7',
                                  color: '#15803d',
                                  border: '1px solid #bbf7d0',
                                  borderRadius: 8,
                                  fontSize: 11,
                                  fontWeight: 700,
                                  cursor: 'pointer'
                                }}
                              >
                                Release
                              </button>
                              <button 
                                onClick={() => handlePaymentOverride(p.id, 'REFUND')}
                                style={{
                                  padding: '5px 10px',
                                  background: '#fee2e2',
                                  color: '#b91c1c',
                                  border: '1px solid #fecaca',
                                  borderRadius: 8,
                                  fontSize: 11,
                                  fontWeight: 700,
                                  cursor: 'pointer'
                                }}
                              >
                                Refund
                              </button>
                            </div>
                          ) : (
                            <span style={{ color: '#94a3b8', fontSize: 11, fontWeight: 650 }}>No Override Needed</span>
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

        {/* System Settings Tab */}
        {activeTab === 'settings' && (
          <section style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, padding: 40, maxWidth: 640 }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: 18, fontWeight: 800, color: '#0f172a' }}>Global SaaS System Settings</h3>
            <p style={{ margin: '0 0 30px 0', fontSize: 13, color: '#64748b', fontWeight: 500 }}>Update transaction fees, support emails, or toggle system maintenance mode.</p>
            
            <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 8 }}>PLATFORM ESCROW COMMISSION (%)</label>
                <input 
                  type="number" 
                  value={platformFee} 
                  onChange={(e) => setPlatformFee(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 12,
                    border: '1px solid #cbd5e1',
                    fontSize: 14,
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 8 }}>ADMIN & SUPPORT DISPATCH EMAIL</label>
                <input 
                  type="email" 
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 12,
                    border: '1px solid #cbd5e1',
                    fontSize: 14,
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '16px 20px', 
                border: '1px solid #fee2e2', 
                background: '#fffbfb', 
                borderRadius: 16 
              }}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: 13, fontWeight: 800, color: '#b91c1c' }}>MAINTENANCE DOWNTIME LOCK</h4>
                  <span style={{ fontSize: 11, color: '#ef4444', fontWeight: 600 }}>Toggling this puts the portal and APIs offline globally.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={maintenanceMode}
                  onChange={(e) => setMaintenanceMode(e.target.checked)}
                  style={{ width: 20, height: 20, accentColor: '#ef4444', cursor: 'pointer' }}
                />
              </div>

              <button 
                type="submit" 
                style={{
                  background: 'linear-gradient(135deg, #f97316, #ea580c)',
                  color: '#fff',
                  border: 'none',
                  padding: '14px',
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(249, 115, 22, 0.2)'
                }}
              >
                Save System Parameters
              </button>
            </form>
          </section>
        )}

        {/* Manage Blogs Tab */}
        {activeTab === 'blogs' && (
          <section style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: 20, fontWeight: 800, color: '#0f172a' }}>Blogs & Insights Editor</h3>
                <p style={{ margin: 0, fontSize: 13, color: '#64748b', fontWeight: 500 }}>Create, update, publish and delete blog posts for the main platform.</p>
              </div>
              <button 
                onClick={() => { clearBlogForm(); setEditingBlog(null); setBlogModalOpen(true); }}
                style={{
                  background: 'linear-gradient(135deg, #f97316, #ea580c)',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(249, 115, 22, 0.15)'
                }}
              >
                + Write Article
              </button>
            </div>

            {/* Filter Bar */}
            <div style={{ display: 'flex', gap: 14, marginBottom: 20, background: '#ffffff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  value={blogSearch}
                  onChange={(e) => setBlogSearch(e.target.value)}
                  placeholder="Search articles by title, author, or category..."
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 40px',
                    borderRadius: 10,
                    border: '1px solid #cbd5e1',
                    fontSize: 13,
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Table */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left', color: '#475569', fontWeight: 700 }}>
                    <th style={{ padding: '16px 24px' }}>Article Details</th>
                    <th style={{ padding: '16px' }}>Category</th>
                    <th style={{ padding: '16px' }}>Author</th>
                    <th style={{ padding: '16px' }}>Views & Likes</th>
                    <th style={{ padding: '16px' }}>Featured</th>
                    <th style={{ padding: '16px' }}>Status</th>
                    <th style={{ padding: '16px 24px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.filter(b => 
                    b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
                    b.author.toLowerCase().includes(blogSearch.toLowerCase()) ||
                    b.category.toLowerCase().includes(blogSearch.toLowerCase())
                  ).map(b => (
                    <tr key={b.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                          <img 
                            src={b.image || 'https://images.unsplash.com/photo-1546074177-ffedd79d494d?q=80&w=600'} 
                            alt={b.title} 
                            style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover', background: '#f1f5f9' }} 
                          />
                          <div>
                            <span style={{ display: 'block', fontWeight: 700, color: '#0f172a' }}>{b.title}</span>
                            <span style={{ display: 'block', fontSize: 11, color: '#64748b' }}>/{b.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px', color: '#475569', fontWeight: 600 }}>{b.category}</td>
                      <td style={{ padding: '16px', color: '#475569' }}>{b.author}</td>
                      <td style={{ padding: '16px', color: '#475569' }}>
                        <span>👁️ {b.views} views</span>
                        <span style={{ marginLeft: 10 }}>❤️ {b.likes} likes</span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: 20,
                          fontSize: 10,
                          fontWeight: 700,
                          background: b.featured ? 'rgba(234, 179, 8, 0.1)' : '#f1f5f9',
                          color: b.featured ? '#ca8a04' : '#64748b'
                        }}>{b.featured ? 'Featured' : 'Standard'}</span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <button
                          onClick={async () => {
                            try {
                              const res = await fetch(`${API_BASE}/admin/blogs/${b.id}`, {
                                method: 'PUT',
                                headers: {
                                  'Content-Type': 'application/json',
                                  'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify({ published: !b.published })
                              });
                              if (res.ok) {
                                triggerToast(`Article ${!b.published ? 'Published' : 'Unpublished'} successfully!`, 'success');
                                fetchDashboardData();
                              }
                            } catch(e) { triggerToast('Status toggle failed.', 'error'); }
                          }}
                          style={{
                            padding: '4px 10px',
                            borderRadius: 20,
                            border: 'none',
                            fontSize: 11,
                            fontWeight: 750,
                            cursor: 'pointer',
                            background: b.published ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            color: b.published ? '#16a34a' : '#dc2626'
                          }}
                        >
                          {b.published ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                        <button 
                          onClick={() => handleOpenEditBlog(b)}
                          style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: 700, cursor: 'pointer', marginRight: 14 }}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteBlog(b.id)}
                          style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {blogs.length === 0 && (
                    <tr>
                      <td colSpan="7" style={{ padding: 40, textAlign: 'center', color: '#94a3b8', fontWeight: 600 }}>No blog articles found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Newsletter Subscribers Tab */}
        {activeTab === 'newsletters' && (
          <section style={{ width: '100%' }}>
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: 20, fontWeight: 800, color: '#0f172a' }}>Newsletter Subscribers</h3>
              <p style={{ margin: 0, fontSize: 13, color: '#64748b', fontWeight: 500 }}>Track dynamic marketing list signups from footer and blog sub-forms.</p>
            </div>

            <div style={{ display: 'flex', gap: 14, marginBottom: 20, background: '#ffffff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  value={newsletterSearch}
                  onChange={(e) => setNewsletterSearch(e.target.value)}
                  placeholder="Search subscriber emails..."
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 40px',
                    borderRadius: 10,
                    border: '1px solid #cbd5e1',
                    fontSize: 13,
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left', color: '#475569', fontWeight: 700 }}>
                    <th style={{ padding: '16px 24px' }}>Subscriber Email</th>
                    <th style={{ padding: '16px' }}>Date Subscribed</th>
                    <th style={{ padding: '16px 24px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {newsletters.filter(n => 
                    n.email.toLowerCase().includes(newsletterSearch.toLowerCase())
                  ).map(n => (
                    <tr key={n.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px 24px', fontWeight: 700, color: '#0f172a' }}>{n.email}</td>
                      <td style={{ padding: '16px', color: '#64748b' }}>{new Date(n.createdAt).toLocaleDateString([], { dateStyle: 'long' })}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                        <button 
                          onClick={() => handleDeleteSubscriber(n.id)}
                          style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Unsubscribe
                        </button>
                      </td>
                    </tr>
                  ))}
                  {newsletters.length === 0 && (
                    <tr>
                      <td colSpan="3" style={{ padding: 40, textAlign: 'center', color: '#94a3b8', fontWeight: 600 }}>No subscribers registered yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Contact Queries Tab */}
        {activeTab === 'contacts' && (
          <section style={{ width: '100%' }}>
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: 20, fontWeight: 800, color: '#0f172a' }}>Public Contact Messages</h3>
              <p style={{ margin: 0, fontSize: 13, color: '#64748b', fontWeight: 500 }}>Review client and user inquiries submitted on the support page.</p>
            </div>

            <div style={{ display: 'flex', gap: 14, marginBottom: 20, background: '#ffffff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                  placeholder="Search messages by name, email, subject..."
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 40px',
                    borderRadius: 10,
                    border: '1px solid #cbd5e1',
                    fontSize: 13,
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left', color: '#475569', fontWeight: 700 }}>
                    <th style={{ padding: '16px 24px' }}>Sender</th>
                    <th style={{ padding: '16px' }}>Subject</th>
                    <th style={{ padding: '16px' }}>Date</th>
                    <th style={{ padding: '16px' }}>Read Status</th>
                    <th style={{ padding: '16px 24px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.filter(c => 
                    c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
                    c.email.toLowerCase().includes(contactSearch.toLowerCase()) ||
                    (c.subject && c.subject.toLowerCase().includes(contactSearch.toLowerCase()))
                  ).map(c => (
                    <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9', background: c.read ? 'transparent' : 'rgba(249, 115, 22, 0.02)' }}>
                      <td style={{ padding: '16px 24px' }}>
                        <div>
                          <span style={{ display: 'block', fontWeight: 700, color: '#0f172a' }}>{c.name}</span>
                          <span style={{ display: 'block', fontSize: 11, color: '#64748b' }}>{c.email}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px', color: '#475569', fontWeight: c.read ? 500 : 700 }}>{c.subject || 'Inquiry'}</td>
                      <td style={{ padding: '16px', color: '#64748b' }}>{new Date(c.createdAt).toLocaleDateString([], { dateStyle: 'medium' })}</td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: 20,
                          fontSize: 10,
                          fontWeight: 700,
                          background: c.read ? '#f1f5f9' : 'rgba(34, 197, 94, 0.1)',
                          color: c.read ? '#64748b' : '#16a34a'
                        }}>{c.read ? 'Read' : 'New message'}</span>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                        <button 
                          onClick={() => setViewingContact(c)}
                          style={{ background: 'none', border: 'none', color: '#f97316', fontWeight: 700, cursor: 'pointer', marginRight: 14 }}
                        >
                          View
                        </button>
                        <button 
                          onClick={() => handleToggleContactRead(c.id)}
                          style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: 700, cursor: 'pointer', marginRight: 14 }}
                        >
                          {c.read ? 'Mark Unread' : 'Mark Read'}
                        </button>
                        <button 
                          onClick={() => handleDeleteContact(c.id)}
                          style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {contacts.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ padding: 40, textAlign: 'center', color: '#94a3b8', fontWeight: 600 }}>No contact messages in inbox.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Manage Podcasts Tab */}
        {activeTab === 'podcasts' && (
          <section style={{ width: '100%' }}>
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: 20, fontWeight: 800, color: '#0f172a' }}>Influencer Podcasts & Audios</h3>
              <p style={{ margin: 0, fontSize: 13, color: '#64748b', fontWeight: 500 }}>Review and moderate audio files uploaded by system creators.</p>
            </div>

            <div style={{ display: 'flex', gap: 14, marginBottom: 20, background: '#ffffff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  value={podcastSearch}
                  onChange={(e) => setPodcastSearch(e.target.value)}
                  placeholder="Search podcasts by title or creator name..."
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 40px',
                    borderRadius: 10,
                    border: '1px solid #cbd5e1',
                    fontSize: 13,
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left', color: '#475569', fontWeight: 700 }}>
                    <th style={{ padding: '16px 24px' }}>Episode Detail</th>
                    <th style={{ padding: '16px' }}>Host / Creator</th>
                    <th style={{ padding: '16px' }}>Duration</th>
                    <th style={{ padding: '16px' }}>Date Uploaded</th>
                    <th style={{ padding: '16px' }}>Status</th>
                    <th style={{ padding: '16px 24px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {podcasts.filter(p => 
                    p.title.toLowerCase().includes(podcastSearch.toLowerCase()) ||
                    p.creator?.name.toLowerCase().includes(podcastSearch.toLowerCase())
                  ).map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                          <img 
                            src={p.thumbnail || 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=200'} 
                            alt={p.title} 
                            style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }} 
                          />
                          <span style={{ fontWeight: 700, color: '#0f172a' }}>{p.title}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px', color: '#475569' }}>
                        <div>
                          <span style={{ display: 'block', fontWeight: 650 }}>{p.creator?.name || 'Unknown'}</span>
                          <span style={{ display: 'block', fontSize: 11, color: '#64748b' }}>@{p.creator?.handle}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px', color: '#475569' }}>{p.duration || 'N/A'}</td>
                      <td style={{ padding: '16px', color: '#64748b' }}>{new Date(p.createdAt).toLocaleDateString([], { dateStyle: 'medium' })}</td>
                      <td style={{ padding: '16px' }}>
                        <button
                          onClick={() => handleTogglePodcast(p.id)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: 20,
                            border: 'none',
                            fontSize: 11,
                            fontWeight: 750,
                            cursor: 'pointer',
                            background: p.published ? 'rgba(34, 197, 94, 0.1)' : 'rgba(249, 115, 22, 0.1)',
                            color: p.published ? '#16a34a' : '#f97316'
                          }}
                        >
                          {p.published ? 'Published' : 'Hidden'}
                        </button>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                        <button 
                          onClick={() => handleDeletePodcast(p.id)}
                          style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {podcasts.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ padding: 40, textAlign: 'center', color: '#94a3b8', fontWeight: 600 }}>No podcasts uploaded by creators.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Moderate Reviews Tab */}
        {activeTab === 'reviews' && (
          <section style={{ width: '100%' }}>
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: 20, fontWeight: 800, color: '#0f172a' }}>Moderate Creator Reviews</h3>
              <p style={{ margin: 0, fontSize: 13, color: '#64748b', fontWeight: 500 }}>Review ratings and delete abusive or fake reviews from creator profiles.</p>
            </div>

            <div style={{ display: 'flex', gap: 14, marginBottom: 20, background: '#ffffff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  value={reviewSearch}
                  onChange={(e) => setReviewSearch(e.target.value)}
                  placeholder="Search reviews by target creator or reviewer name..."
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 40px',
                    borderRadius: 10,
                    border: '1px solid #cbd5e1',
                    fontSize: 13,
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left', color: '#475569', fontWeight: 700 }}>
                    <th style={{ padding: '16px 24px' }}>Target Creator</th>
                    <th style={{ padding: '16px' }}>Reviewer</th>
                    <th style={{ padding: '16px' }}>Rating</th>
                    <th style={{ padding: '16px' }}>Review Comment</th>
                    <th style={{ padding: '16px' }}>Date</th>
                    <th style={{ padding: '16px 24px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.filter(r => 
                    (r.creator?.name && r.creator.name.toLowerCase().includes(reviewSearch.toLowerCase())) ||
                    (r.creator?.handle && r.creator.handle.toLowerCase().includes(reviewSearch.toLowerCase())) ||
                    r.reviewerName.toLowerCase().includes(reviewSearch.toLowerCase()) ||
                    r.text.toLowerCase().includes(reviewSearch.toLowerCase())
                  ).map(r => (
                    <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px 24px' }}>
                        <div>
                          <span style={{ display: 'block', fontWeight: 700, color: '#0f172a' }}>{r.creator?.name || 'Unknown'}</span>
                          <span style={{ display: 'block', fontSize: 11, color: '#f97316', fontWeight: 700 }}>@{r.creator?.handle}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px', color: '#475569', fontWeight: 650 }}>{r.reviewerName}</td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', gap: 2 }}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              fill={i < r.rating ? '#eab308' : 'none'} 
                              color={i < r.rating ? '#eab308' : '#cbd5e1'} 
                            />
                          ))}
                        </div>
                      </td>
                      <td style={{ padding: '16px', color: '#334155', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={r.text}>
                        {r.text}
                      </td>
                      <td style={{ padding: '16px', color: '#64748b' }}>{new Date(r.createdAt).toLocaleDateString([], { dateStyle: 'medium' })}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                        <button 
                          onClick={() => handleDeleteReview(r.id)}
                          style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Delete Review
                        </button>
                      </td>
                    </tr>
                  ))}
                  {reviews.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ padding: 40, textAlign: 'center', color: '#94a3b8', fontWeight: 600 }}>No creator reviews logged yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>

      {/* Blog Editor Modal */}
      {blogModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'rgba(15, 23, 42, 0.3)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            width: '100%',
            maxWidth: 680,
            background: '#ffffff',
            borderRadius: 24,
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'fadeIn 0.2s ease'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 30px', borderBottom: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0f172a' }}>
                {editingBlog ? 'Edit Blog Article' : 'Write New Blog Article'}
              </h3>
              <button 
                onClick={() => { setBlogModalOpen(false); setEditingBlog(null); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} style={{ flex: 1, padding: 30, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#475569', marginBottom: 6 }}>ARTICLE TITLE</label>
                  <input 
                    type="text" 
                    value={blogTitle} 
                    onChange={(e) => {
                      setBlogTitle(e.target.value);
                      if (!editingBlog) {
                        setBlogSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                      }
                    }}
                    placeholder="E.g., 5 Rules to Negotiate Brand Deals"
                    required
                    style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13, outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#475569', marginBottom: 6 }}>URL SLUG</label>
                  <input 
                    type="text" 
                    value={blogSlug} 
                    onChange={(e) => setBlogSlug(e.target.value)}
                    placeholder="E.g., rules-to-negotiate-brand-deals"
                    required
                    style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13, outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#475569', marginBottom: 6 }}>CATEGORY</label>
                  <select 
                    value={blogCategory} 
                    onChange={(e) => setBlogCategory(e.target.value)}
                    style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13, outline: 'none', background: '#fff' }}
                  >
                    <option value="Marketing">Marketing</option>
                    <option value="Creator Economy">Creator Economy</option>
                    <option value="Brand Deals">Brand Deals</option>
                    <option value="Tech Updates">Tech Updates</option>
                    <option value="SaaS News">SaaS News</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#475569', marginBottom: 6 }}>AUTHOR NAME</label>
                  <input 
                    type="text" 
                    value={blogAuthor} 
                    onChange={(e) => setBlogAuthor(e.target.value)}
                    required
                    style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13, outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#475569', marginBottom: 6 }}>TAGS (COMMA SEPARATED)</label>
                  <input 
                    type="text" 
                    value={blogTags} 
                    onChange={(e) => setBlogTags(e.target.value)}
                    placeholder="E.g., influencer, marketing, pricing"
                    style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13, outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#475569', marginBottom: 6 }}>COVER IMAGE URL</label>
                <input 
                  type="text" 
                  value={blogImage} 
                  onChange={(e) => setBlogImage(e.target.value)}
                  placeholder="https://example.com/banner.jpg"
                  style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13, outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#475569', marginBottom: 6 }}>EXCERPT / SHORT SUMMARY</label>
                <input 
                  type="text" 
                  value={blogExcerpt} 
                  onChange={(e) => setBlogExcerpt(e.target.value)}
                  placeholder="Brief 1-line description of this article..."
                  style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13, outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#475569', marginBottom: 6 }}>BODY CONTENT (TEXT / MARKDOWN)</label>
                <textarea 
                  value={blogBody} 
                  onChange={(e) => setBlogBody(e.target.value)}
                  rows={8}
                  placeholder="Write complete article details here..."
                  required
                  style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13, outline: 'none', fontFamily: 'monospace' }}
                />
              </div>

              <div style={{ display: 'flex', gap: 30, background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input 
                    type="checkbox" 
                    id="blog-feat" 
                    checked={blogFeatured} 
                    onChange={(e) => setBlogFeatured(e.target.checked)} 
                    style={{ width: 16, height: 16, cursor: 'pointer' }}
                  />
                  <label htmlFor="blog-feat" style={{ fontSize: 12, fontWeight: 700, color: '#334155', cursor: 'pointer' }}>Feature on Homepage</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input 
                    type="checkbox" 
                    id="blog-pub" 
                    checked={blogPublished} 
                    onChange={(e) => setBlogPublished(e.target.checked)} 
                    style={{ width: 16, height: 16, cursor: 'pointer' }}
                  />
                  <label htmlFor="blog-pub" style={{ fontSize: 12, fontWeight: 700, color: '#334155', cursor: 'pointer' }}>Publish Immediately (Draft if unchecked)</label>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 14, justifyContent: 'flex-end', marginTop: 10 }}>
                <button 
                  type="button" 
                  onClick={() => { setBlogModalOpen(false); setEditingBlog(null); }}
                  style={{ padding: '10px 18px', background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '10px 22px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 10px rgba(34, 197, 94, 0.15)' }}
                >
                  Save Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Contact Inquiry Modal */}
      {viewingContact && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'rgba(15, 23, 42, 0.25)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            width: '100%',
            maxWidth: 500,
            background: '#ffffff',
            borderRadius: 24,
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
            padding: 30,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            animation: 'fadeIn 0.2s ease'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: 16 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0f172a' }}>Contact Inquiry Detail</h3>
                <span style={{ fontSize: 11, color: '#64748b' }}>Submitted on {new Date(viewingContact.createdAt).toLocaleString()}</span>
              </div>
              <button 
                onClick={() => setViewingContact(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <div style={{ marginBottom: 10 }}>
                <span style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#94a3b8' }}>SENDER NAME</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{viewingContact.name}</span>
              </div>
              <div style={{ marginBottom: 10 }}>
                <span style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#94a3b8' }}>EMAIL ADDRESS</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{viewingContact.email}</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#94a3b8' }}>INQUIRY SUBJECT</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#f97316' }}>{viewingContact.subject || 'Public Inquiry'}</span>
              </div>
            </div>

            <div>
              <span style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#94a3b8', marginBottom: 6 }}>MESSAGE CONTENT</span>
              <p style={{ margin: 0, fontSize: 13, color: '#334155', lineHeight: 1.6, background: '#fff', border: '1px solid #cbd5e1', padding: 14, borderRadius: 12, whiteSpace: 'pre-wrap' }}>
                {viewingContact.message}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 14, justifyContent: 'flex-end', marginTop: 10 }}>
              <button 
                onClick={() => {
                  if (!viewingContact.read) handleToggleContactRead(viewingContact.id);
                  setViewingContact(null);
                }}
                style={{ padding: '10px 18px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
              >
                Close & Mark Read
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KYC Document Audit Drawer Slide-in Modal */}
      {drawerOpen && selectedCreator && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 480,
          height: '100vh',
          background: '#ffffff',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.08)',
          borderLeft: '1px solid #e2e8f0',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideIn 0.3s ease-out'
        }}>
          {/* Drawer Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 30px', borderBottom: '1px solid #e2e8f0' }}>
            <div>
              <h3 style={{ margin: '0 0 2px 0', fontSize: 16, fontWeight: 800, color: '#0f172a' }}>Audit KYC Identity</h3>
              <span style={{ fontSize: 11, color: '#f97316', fontWeight: 700 }}>@{selectedCreator.handle}</span>
            </div>
            <button 
              onClick={() => setDrawerOpen(false)}
              style={{
                background: '#f1f5f9',
                border: 'none',
                width: 32,
                height: 32,
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b'
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Drawer Body */}
          <div style={{ flex: 1, padding: 30, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* Creator details */}
            <div style={{ background: '#f8fafc', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
                <div style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f97316, #3b82f6)',
                  color: '#fff',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18
                }}>
                  {selectedCreator.name.charAt(0)}
                </div>
                <div>
                  <h4 style={{ margin: '0 0 2px 0', fontSize: 15, fontWeight: 800, color: '#0f172a' }}>{selectedCreator.name}</h4>
                  <span style={{ fontSize: 11, color: '#64748b', fontWeight: 650 }}>{selectedCreator.city || 'N/A'}, {selectedCreator.state || 'N/A'}</span>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 12, color: '#475569', lineHeight: 1.5 }}>{selectedCreator.bio || 'No bio description provided.'}</p>
              
              {/* Creator Metadata Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <div>
                  <span style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#94a3b8' }}>FOLLOWER COUNT</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#0f172a' }}>{selectedCreator.followers ? selectedCreator.followers.toLocaleString() : '0'}</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#94a3b8' }}>ENGAGEMENT RATE</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#16a34a' }}>{selectedCreator.engagementRate || '4.2'}%</span>
                </div>
              </div>

              {/* Niche Categories */}
              {selectedCreator.niche && selectedCreator.niche.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <span style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#94a3b8', marginBottom: 6 }}>NICHES</span>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {selectedCreator.niche.map((n, idx) => (
                      <span key={idx} style={{ padding: '2px 8px', background: 'rgba(249, 115, 22, 0.05)', color: '#f97316', borderRadius: 20, fontSize: 10, fontWeight: 700 }}>
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Platforms */}
              {selectedCreator.platform && selectedCreator.platform.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <span style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#94a3b8', marginBottom: 6 }}>ACTIVE CHANNELS</span>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {selectedCreator.platform.map((p, idx) => (
                      <span key={idx} style={{ padding: '2px 8px', background: '#f1f5f9', color: '#475569', borderRadius: 20, fontSize: 10, fontWeight: 700, textTransform: 'capitalize' }}>
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Document Aadhaar */}
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#475569', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>AADHAAR CARD PROOF</label>
              {selectedCreator.aadhaarUrl ? (
                <div style={{ 
                  border: '1px dashed #cbd5e1', 
                  borderRadius: 12, 
                  padding: 16, 
                  background: '#f8fafc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <FileText size={20} style={{ color: '#f97316' }} />
                    <div>
                      <span style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#0f172a' }}>Aadhaar_Document.jpg</span>
                      <span style={{ display: 'block', fontSize: 10, color: '#64748b', fontWeight: 500 }}>Uploaded secure document</span>
                    </div>
                  </div>
                  <a 
                    href={selectedCreator.aadhaarUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{
                      padding: '5px 12px',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: 8,
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#475569',
                      textDecoration: 'none'
                    }}
                  >
                    View File
                  </a>
                </div>
              ) : (
                <div style={{ padding: 16, border: '1px dashed #fee2e2', background: '#fffbeb', borderRadius: 12, color: '#b91c1c', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <AlertTriangle size={16} />
                  No Aadhaar card document uploaded yet.
                </div>
              )}
            </div>

            {/* Document PAN */}
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#475569', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>PAN CARD PROOF</label>
              {selectedCreator.panUrl ? (
                <div style={{ 
                  border: '1px dashed #cbd5e1', 
                  borderRadius: 12, 
                  padding: 16, 
                  background: '#f8fafc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <FileText size={20} style={{ color: '#f97316' }} />
                    <div>
                      <span style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#0f172a' }}>PAN_Document.jpg</span>
                      <span style={{ display: 'block', fontSize: 10, color: '#64748b', fontWeight: 500 }}>Uploaded secure document</span>
                    </div>
                  </div>
                  <a 
                    href={selectedCreator.panUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{
                      padding: '5px 12px',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: 8,
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#475569',
                      textDecoration: 'none'
                    }}
                  >
                    View File
                  </a>
                </div>
              ) : (
                <div style={{ padding: 16, border: '1px dashed #fee2e2', background: '#fffbeb', borderRadius: 12, color: '#b91c1c', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <AlertTriangle size={16} />
                  No PAN card document uploaded yet.
                </div>
              )}
            </div>

            {/* Information warning notice */}
            <div style={{ display: 'flex', gap: 10, padding: 14, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, color: '#166534', fontSize: 11, lineHeight: 1.4, fontWeight: 600 }}>
              <Info size={18} style={{ flexShrink: 0, color: '#15803d' }} />
              <span>By clicking "Approve Verification", a congratulations email will be sent automatically and the Creator will receive their check badge.</span>
            </div>
          </div>

          {/* Drawer Actions */}
          <div style={{ padding: '24px 30px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: 12, background: '#f8fafc' }}>
            <button 
              onClick={() => handleApproveVerification(selectedCreator.id)}
              style={{
                flex: 1,
                padding: '12px',
                background: '#22c55e',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(34, 197, 94, 0.2)'
              }}
            >
              Approve Verification
            </button>
            <button 
              onClick={() => handleToggleSuspension(selectedCreator.user.id)}
              style={{
                padding: '12px 18px',
                background: '#fee2e2',
                color: '#ef4444',
                border: '1px solid #fecaca',
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer'
              }}
            >
              Reject / Ban
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
