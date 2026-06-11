import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../core/context';
import { LS } from '../../utils/helpers';
import { Btn, Card, Fld, Bdg } from '../../components/common/Primitives';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Lock,
  Megaphone,
  Plus,
  Trash2,
  ExternalLink,
  Loader2,
  Building2,
  CheckCircle2,
  Globe,
  MapPin,
  ChevronRight
} from 'lucide-react';
import AuthGatekeeper from '../../components/auth/AuthGatekeeper';

const StepNavItem = ({ id, label, icon: Icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`step-nav-item ${active ? 'active' : ''}`}
    style={{ position: 'relative' }}
  >
    <div className="step-nav-icon-box">
       <Icon size={18} />
    </div>
    <span className="step-nav-label">
      {label}
    </span>
    {active && <ChevronRight size={16} className="active-chevron" style={{ opacity: 0.5, color: '#FFF' }} />}
  </button>
);

StepNavItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const SecurityTabContent = ({ st }) => {
  return (
    <Card className="settings-form-card card-3d-effect">
       <h3 className="db-section-title">Account Security</h3>
       
       <div style={{ marginBottom: '40px' }}>
          <p className="db-sidebar-label" style={{ marginBottom: 12 }}>Verified Credentials</p>
          <div className="activity-item" style={{ padding: '20px 24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{st.user?.email || 'verified@user.com'}</div>
                <div style={{ fontSize: '12px', color: '#10B981', fontWeight: 800, marginTop: '4px' }}>Primary Verification Email</div>
             </div>
             <CheckCircle2 size={24} color="#10B981" />
          </div>
       </div>

       <div style={{ padding: '32px', background: '#FEF2F2', borderRadius: '32px', border: '1px solid #FECACA' }}>
          <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#991B1B', marginBottom: '8px' }}>Danger Zone</h4>
          <p style={{ fontSize: '14px', color: '#B91C1C', marginBottom: '24px', lineHeight: 1.5 }}>
             Permanently delete your profile and account history from CreatorBharat. This action is irreversible.
          </p>
          <button className="btn-danger-lite">
             TERMINATE ACCOUNT
          </button>
       </div>
    </Card>
  );
};

SecurityTabContent.propTypes = {
  st: PropTypes.object.isRequired
};

// ─── BRAND PROFILE EDIT TAB ──────────────────────────────────────────────────
const BrandProfileTabContent = ({ BF, mob, upBF, saveBrandProfile, saving }) => {
  return (
    <Card className="settings-form-card card-3d-effect">
       <h3 className="db-section-title">Company Profile Details</h3>
       <p className="db-sub-text" style={{ marginBottom: 32 }}>Update your brand assets, website, and industry focus for your campaign listings.</p>
       
       <div className="form-stack">
          <Fld label="Company / Brand Name" value={BF.companyName} onChange={e => upBF('companyName', e.target.value)} placeholder="Nike India" />
          <Fld label="Brand Representative Name" value={BF.name} onChange={e => upBF('name', e.target.value)} placeholder="Rohit Sen" />
          <Fld label="Official Website URL" value={BF.website} onChange={e => upBF('website', e.target.value)} placeholder="https://nike.com" />
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px' }}>
             <Fld label="Headquarters City" value={BF.city} onChange={e => upBF('city', e.target.value)} placeholder="Mumbai" />
             <Fld label="Industry Sector" value={BF.industry} onChange={e => upBF('industry', e.target.value)} placeholder="Lifestyle & Sports" />
          </div>
          <Fld label="Brand Bio / Description" value={BF.bio} onChange={e => upBF('bio', e.target.value)} rows={4} placeholder="Premium athletic sportswear and lifestyle brand building the future of sports culture..." />
       </div>

       <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'flex-end' }}>
          <Btn lg className="btn-primary-pill" style={{ height: 'auto', padding: '16px 48px', display: 'flex', gap: 8 }} onClick={saveBrandProfile} disabled={saving}>
             {saving ? <Loader2 className="spin" size={18} /> : 'Save Brand Profile'}
          </Btn>
       </div>
    </Card>
  );
};

BrandProfileTabContent.propTypes = {
  BF: PropTypes.object.isRequired,
  mob: PropTypes.bool.isRequired,
  upBF: PropTypes.func.isRequired,
  saveBrandProfile: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

// ─── CREATOR SPONSOR SETTINGS TAB ────────────────────────────────────────────
const SPONSOR_TYPES_DEF = [
  { id: 'link', label: 'Promoted Link', icon: '🔗', color: '#3B82F6' },
  { id: 'banner', label: 'Ad Banner', icon: '🖼️', color: '#FF9431' },
  { id: 'shoutout', label: 'Shoutout Post', icon: '📣', color: '#10B981' },
];

const SponsorSettingsTab = ({ c, st, mob }) => {
  const navigate = useNavigate();
  const isPro = st.isPro || false;
  const FREE_LIMIT = 1;
  const STORAGE_KEY = `cb_sponsor_posts_${c?.id || c?.slug || c?.email || 'default'}`;

  const [posts, setPosts] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch (_) { return []; }
  });

  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState('link');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [ctaText, setCtaText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [saving, setSaving] = useState(false);

  const isLocked = !isPro && posts.length >= FREE_LIMIT;

  const savePost = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    setTimeout(() => {
      const newPost = {
        id: 'sp-' + Date.now(),
        type, title: title.trim(), description: description.trim(),
        link: link.trim(), ctaText: ctaText.trim() || 'Visit Now',
        imageUrl: imageUrl.trim(),
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      };
      const updated = [newPost, ...posts];
      setPosts(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setTitle(''); setDescription(''); setLink(''); setCtaText(''); setImageUrl('');
      setShowForm(false);
      setSaving(false);
    }, 600);
  };

  const deletePost = (id) => {
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <Card className="settings-form-card card-3d-effect">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
        <div>
          <h3 className="db-section-title" style={{ margin: 0 }}>Sponsored Posts Manager</h3>
          <p style={{ fontSize: 13, color: '#64748b', fontWeight: 500, marginTop: 6 }}>
            Yahan se apne public profile pe promoted links, banners aur shoutouts manage karo.
          </p>
        </div>
        <a
          href={`/creator/${c?.slug || c?.id || 'preview'}`}
          target="_blank"
          rel="noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 800, color: '#FF9431', textDecoration: 'none' }}
        >
          <ExternalLink size={14} /> Preview on Profile
        </a>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px',
        background: isPro ? '#f0fdf4' : '#fff7ed',
        border: `1px solid ${isPro ? '#6ee7b7' : '#fed7aa'}`,
        borderRadius: 16, margin: '20px 0'
      }}>
        <span style={{ fontSize: 20 }}>{isPro ? '✅' : '⚡'}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: isPro ? '#10B981' : '#FF9431' }}>
            {isPro ? 'Pro Plan — Unlimited Posts' : `Free Plan — ${posts.length}/${FREE_LIMIT} post used`}
          </div>
          <div style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>
            {isPro ? 'Unlimited sponsor posts publish kar sakte ho.' : 'Free plan mein 1 post. Unlimited ke liye upgrade karo.'}
          </div>
        </div>
        {!isPro && (
          <button onClick={() => navigate('/creator/pricing')} style={{ background: '#0f172a', color: '#fff', padding: '8px 14px', borderRadius: 10, fontSize: 11, fontWeight: 900, border: 'none', cursor: 'pointer' }}>
            Upgrade →
          </button>
        )}
      </div>

      {!showForm && (
        <button
          onClick={() => { if (!isLocked) setShowForm(true); }}
          disabled={isLocked}
          style={{
            width: '100%', padding: '14px', borderRadius: 16, marginBottom: 24,
            border: `2px dashed ${isLocked ? '#e2e8f0' : '#FF9431'}`,
            background: isLocked ? '#f8fafc' : 'rgba(255,148,49,0.04)',
            color: isLocked ? '#94a3b8' : '#FF9431',
            fontWeight: 900, fontSize: 14, cursor: isLocked ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
          }}
        >
          <Plus size={18} />
          {isLocked ? 'Free limit reached — Upgrade to Pro for more posts' : 'Add New Sponsor Post'}
        </button>
      )}

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ background: '#f8fafc', borderRadius: 20, padding: mob ? 20 : 28, border: '1.5px solid #e2e8f0', marginBottom: 24 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h4 style={{ fontSize: 16, fontWeight: 900, color: '#0f172a', margin: 0 }}>New Sponsor Post</h4>
            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18 }}>✕</button>
          </div>

          <form onSubmit={savePost} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 8 }}>Post Type</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {SPONSOR_TYPES_DEF.map(t => (
                  <button key={t.id} type="button" onClick={() => setType(t.id)} style={{
                    flex: 1, padding: '10px 6px', borderRadius: 12,
                    border: `1.5px solid ${type === t.id ? t.color : '#e2e8f0'}`,
                    background: type === t.id ? t.color + '10' : '#fff',
                    cursor: 'pointer', fontSize: 11, fontWeight: 800,
                    color: type === t.id ? t.color : '#64748b',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4
                  }}>
                    <span style={{ fontSize: 18 }}>{t.icon}</span>
                    {t.label.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 8 }}>Title *</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Nykaa Sale — 30% Off" required
                style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 8 }}>Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Short description for visitors..." rows={2}
                style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 12, fontSize: 14, outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 8 }}>URL / Link</label>
                <input value={link} onChange={e => setLink(e.target.value)} placeholder="https://..." type="url"
                  style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 8 }}>CTA Button Text</label>
                <input value={ctaText} onChange={e => setCtaText(e.target.value)} placeholder="Visit Now"
                  style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 8 }}>Banner Image URL (Optional)</label>
              <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://image-url..."
                style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" disabled={saving || !title.trim()} style={{
                flex: 1, padding: '13px', background: saving ? '#94a3b8' : '#0f172a',
                color: '#fff', border: 'none', borderRadius: 12, fontWeight: 900, fontSize: 14, cursor: 'pointer'
              }}>
                {saving ? 'Publishing...' : 'Publish Post'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} style={{
                padding: '13px 20px', background: '#fff', border: '1.5px solid #e2e8f0',
                color: '#64748b', borderRadius: 12, fontWeight: 800, fontSize: 14, cursor: 'pointer'
              }}>Cancel</button>
            </div>
          </form>
        </motion.div>
      )}

      {posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 20px', background: '#f8fafc', borderRadius: 20, border: '1.5px dashed #e2e8f0' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📢</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#475569', marginBottom: 6 }}>No sponsor posts yet</div>
          <div style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>Upar wale button se apna pehla promoted post add karo.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {posts.map((post) => {
            const typeInfo = SPONSOR_TYPES_DEF.find(t => t.id === post.type) || SPONSOR_TYPES_DEF[0];
            return (
              <motion.div key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', background: '#fff', borderRadius: 16, border: `1.5px solid ${typeInfo.color}20` }}
              >
                <span style={{ fontSize: 22, flexShrink: 0 }}>{typeInfo.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 900, color: '#0f172a', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 10, fontWeight: 900, color: typeInfo.color, textTransform: 'uppercase' }}>{typeInfo.label}</span>
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>{post.date}</span>
                    {post.link && (
                      <a href={post.link} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: '#3B82F6', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
                        <ExternalLink size={11} /> {post.link.replace('https://', '').slice(0, 22)}...
                      </a>
                    )}
                  </div>
                </div>
                <button onClick={() => deletePost(post.id)} style={{
                  background: '#fef2f2', border: 'none', borderRadius: 10,
                  padding: '8px 10px', cursor: 'pointer', color: '#ef4444', flexShrink: 0,
                  display: 'flex', alignItems: 'center'
                }}>
                  <Trash2 size={15} />
                </button>
              </motion.div>
            );
          })}
        </div>
      )}

      <div style={{ marginTop: 24, padding: '14px 18px', background: '#f8fafc', borderRadius: 14, border: '1px solid #f1f5f9' }}>
        <p style={{ fontSize: 12, color: '#64748b', fontWeight: 500, margin: 0 }}>
          💡 Ye posts aapke public profile page ke <strong>Sponsor tab</strong> mein visitors ko dikhte hain. Links real products, affiliate URLs ya brand pages pe jaate hain.
        </p>
      </div>
    </Card>
  );
};
SponsorSettingsTab.propTypes = {
  c: PropTypes.object.isRequired,
  st: PropTypes.object.isRequired,
  mob: PropTypes.bool
};

export default function SettingsPage() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [saving, setSaving] = useState(false);

  const role = st.user?.role || 'creator';

  // State for tabs
  const [tab, setTab] = useState(role === 'brand' ? 'brandProfile' : 'sponsor');

  // Creator state
  const allCreators = LS.get('cb_creators', []);
  const creatorProfile = st.user?.creatorProfile || allCreators.find(cr => cr.email === st.user?.email) || {};

  // Brand state (form inputs)
  const [BF, setBF] = useState({
    companyName: st.user?.companyName || '',
    name: st.user?.name || '',
    website: st.user?.website || '',
    city: st.user?.city || '',
    industry: st.user?.industry || '',
    bio: st.user?.bio || ''
  });

  // Sync brand state when context loads
  useEffect(() => {
    if (st.user && role === 'brand') {
      setBF({
        companyName: st.user.companyName || '',
        name: st.user.name || '',
        website: st.user.website || '',
        city: st.user.city || '',
        industry: st.user.industry || '',
        bio: st.user.bio || ''
      });
    }
  }, [st.user]);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const upBF = (k, v) => setBF(p => ({ ...p, [k]: v }));

  const saveBrandProfile = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600)); // simulate saving
    
    const updatedUser = {
      ...st.user,
      companyName: BF.companyName,
      name: BF.name,
      website: BF.website,
      city: BF.city,
      industry: BF.industry,
      bio: BF.bio
    };

    // Update global context & local storage
    dsp({ t: 'LOGIN', u: updatedUser, role: 'brand' });
    LS.set('cb_user', updatedUser); // Sync local storage for persistence

    dsp({ t: 'TOAST', d: { type: 'success', msg: 'Brand profile updated successfully!' } });
    setSaving(false);
  };

  if (!st.user) {
    return <AuthGatekeeper mob={mob} />;
  }

  // Sidebar link structures based on role
  const steps = role === 'brand' ? [
    { id: 'brandProfile', label: 'Company Profile', icon: Building2 },
    { id: 'security', label: 'Account Security', icon: Lock }
  ] : [
    { id: 'sponsor', label: 'Sponsored Posts', icon: Megaphone },
    { id: 'security', label: 'Account Security', icon: Lock }
  ];

  return (
    <div className="dashboard-page-container">
      <div className="db-page-header">
        <div className="badge-saffron">
           <Shield size={14} fill="#FF9431" /> CONSOLE SETTINGS
        </div>
        <h1 className="page-title">Account Settings</h1>
        <p className="db-sub-text">Manage your preferences, details, and platform security credentials.</p>
      </div>

      <div className="db-main-grid">
         {/* Left: Settings navigation list */}
         {!mob && (
            <div className="db-col-left">
               <Card className="settings-sidebar-card">
                  <p className="db-sidebar-label" style={{ paddingLeft: 12, marginBottom: 12 }}>Settings Group</p>
                  <div className="tasks-box">
                     {steps.map(step => (
                        <StepNavItem 
                          key={step.id}
                          id={step.id}
                          label={step.label}
                          icon={step.icon}
                          active={tab === step.id}
                          onClick={() => setTab(step.id)}
                        />
                     ))}
                  </div>
               </Card>
            </div>
         )}

         {/* Mobile Tab Selector */}
         {mob && (
            <div className="settings-mobile-tabs-container" style={{ width: '100%', marginBottom: 20 }}>
               <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '8px 0', scrollbarWidth: 'none' }}>
                  {steps.map(step => (
                     <button 
                       key={step.id} 
                       onClick={() => setTab(step.id)}
                       style={{
                         flexShrink: 0,
                         padding: '10px 16px',
                         borderRadius: 100,
                         border: tab === step.id ? '1px solid #FF9431' : '1px solid #e2e8f0',
                         background: tab === step.id ? 'rgba(255,148,49,0.1)' : '#fff',
                         color: tab === step.id ? '#FF9431' : '#64748b',
                         fontSize: '13px',
                         fontWeight: 800
                       }}
                     >
                        {step.label}
                     </button>
                  ))}
               </div>
            </div>
         )}

         {/* Right Content Area */}
         <div className="db-col-right">
            <AnimatePresence mode="wait">
               {tab === 'brandProfile' && role === 'brand' && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="brandProfile">
                     <BrandProfileTabContent BF={BF} mob={mob} upBF={upBF} saveBrandProfile={saveBrandProfile} saving={saving} />
                  </motion.div>
               )}

               {tab === 'sponsor' && role === 'creator' && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="sponsor">
                     <SponsorSettingsTab c={creatorProfile} st={st} mob={mob} />
                  </motion.div>
               )}

               {tab === 'security' && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="security">
                     <SecurityTabContent st={st} />
                  </motion.div>
               )}
            </AnimatePresence>
         </div>

      </div>
    </div>
  );
}
