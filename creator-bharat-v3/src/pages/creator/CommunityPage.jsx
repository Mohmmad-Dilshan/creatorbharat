import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, MessageSquare, Search, Users, ExternalLink,
  MapPin, Star, Filter, Loader2, UserPlus, Handshake,
  SlidersHorizontal, Globe, Award, Sparkles, Compass
} from 'lucide-react';
import { useApp } from '@/core/context';
import { fetchCreators } from '@/utils/platformService';
import { apiCall } from '@/utils/api';
import { fmt } from '@/utils/helpers';
import { Btn, Card, Bdg, Fld } from '@/components/common/Primitives';
import { CreatorPageHeader } from './CreatorShellPage';

// ─── Creator Profile Card (Creator-to-Creator view) ──────────────────────────
const CreatorNetworkCard = ({ creator, saved, onSave, onChat, onView, delay = 0 }) => {
  const niche = Array.isArray(creator.niche) ? creator.niche[0] : (creator.niche || 'Creator');
  const photo = creator.photo || creator.image || creator.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name || 'C')}&background=FF9431&color=fff`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="card-3d-effect"
    >
      <Card style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }} onClick={onView}>
        {/* Cover / Photo */}
        <div style={{ position: 'relative', height: 160, background: '#0f172a', overflow: 'hidden', flexShrink: 0 }}>
          <img
            src={photo}
            alt={creator.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
          {/* Save button */}
          <button
            onClick={(e) => { e.stopPropagation(); onSave(); }}
            style={{
              position: 'absolute', top: 12, right: 12,
              width: 36, height: 36, borderRadius: '50%',
              background: saved ? '#EF444420' : 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              border: saved ? '1px solid #EF4444' : '1px solid rgba(255,255,255,0.2)',
              display: 'grid', placeItems: 'center', cursor: 'pointer',
              zIndex: 5
            }}
          >
            <Heart size={16} fill={saved ? '#EF4444' : 'none'} color={saved ? '#EF4444' : '#fff'} />
          </button>
          {/* Niche badge */}
          <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
            <span style={{ background: 'rgba(255,148,49,0.9)', color: '#fff', fontSize: 10, fontWeight: 900, padding: '4px 10px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {niche}
            </span>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: '16px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <h3 style={{ fontSize: 17, fontWeight: 900, color: '#0f172a', margin: 0 }}>{creator.name}</h3>
            <div style={{ fontSize: 13, fontWeight: 900, color: '#FF9431' }}>{creator.score || fmt.score(creator)}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b', fontWeight: 600, marginBottom: 12 }}>
            <MapPin size={12} /> {creator.city || 'India'} · {fmt.num(creator.followers || 0)} followers
          </div>
          <p style={{ fontSize: 13, color: '#64748b', fontWeight: 500, lineHeight: 1.5, margin: '0 0 16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {creator.bio || 'Creator on CreatorBharat platform.'}
          </p>

          {/* Actions — Creator-specific (no brand pitch) */}
          <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
            <Btn
              sm
              onClick={(e) => { e.stopPropagation(); onSave(); }}
              style={{ flex: 1, borderRadius: 12, background: saved ? '#EF444412' : '#f8fafc', color: saved ? '#EF4444' : '#0f172a', border: saved ? '1px solid #EF444430' : '1px solid #f1f5f9', fontSize: 12 }}
            >
              <Heart size={13} fill={saved ? 'currentColor' : 'none'} /> {saved ? 'Saved' : 'Save'}
            </Btn>
            <Btn
              sm
              onClick={(e) => { e.stopPropagation(); onChat(); }}
              style={{ flex: 1, borderRadius: 12, background: '#0f172a', color: '#fff', fontSize: 12 }}
            >
              <MessageSquare size={13} /> Connect
            </Btn>
            <Btn
              sm
              onClick={(e) => { e.stopPropagation(); onView(); }}
              style={{ borderRadius: 12, fontSize: 12 }}
            >
              <ExternalLink size={13} />
            </Btn>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

CreatorNetworkCard.propTypes = {
  creator: PropTypes.object.isRequired,
  saved: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onChat: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
  delay: PropTypes.number
};

// ─── Individual Creator Detail View ──────────────────────────────────────────
const CreatorDetailView = ({ creator, saved, onSave, onBack, navigate }) => {
  const niche = Array.isArray(creator.niche) ? creator.niche[0] : (creator.niche || 'Creator');
  const photo = creator.photo || creator.image || creator.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name || 'C')}&background=FF9431&color=fff`;

  return (
    <div className="dashboard-page-container">
      <div style={{ marginBottom: 24 }}>
        <button
          onClick={onBack}
          style={{ background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: 12, padding: '8px 16px', fontSize: 13, fontWeight: 800, color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
        >
          ← Back to Network
        </button>
      </div>

      <Card style={{ padding: 0, overflow: 'hidden' }} className="card-3d-effect">
        {/* Hero */}
        <div style={{ position: 'relative', height: 200, background: '#0f172a' }}>
          <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
            <Bdg color="saffron" sm>{niche}</Bdg>
            <h1 style={{ fontSize: 32, fontWeight: 950, color: '#fff', margin: '8px 0 4px', letterSpacing: '-0.02em' }}>{creator.name}</h1>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
              {creator.city || 'India'} · {fmt.num(creator.followers || 0)} followers
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: 28 }}>
          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
            {[
              { l: 'Followers', v: fmt.num(creator.followers || 0) },
              { l: 'CB Score', v: creator.score || fmt.score(creator) },
              { l: 'ER', v: `${(creator.er || 4.2).toFixed(1)}%` },
            ].map(s => (
              <div key={s.l} style={{ textAlign: 'center', padding: 16, background: '#f8fafc', borderRadius: 16, border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: 22, fontWeight: 950, color: '#0f172a' }}>{s.v}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Bio */}
          {creator.bio && (
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: 13, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 10 }}>About</h4>
              <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.7, fontWeight: 500 }}>{creator.bio}</p>
            </div>
          )}

          {/* Actions — Creator-to-Creator */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Btn
              lg
              onClick={onSave}
              style={{ borderRadius: 14, background: saved ? '#EF444412' : '#f8fafc', color: saved ? '#EF4444' : '#0f172a', border: saved ? '1px solid #EF444430' : '1px solid #f1f5f9' }}
            >
              <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
              {saved ? 'Saved' : 'Save Creator'}
            </Btn>
            <Btn
              lg
              onClick={() => navigate('/creator/messages')}
              style={{ borderRadius: 14, background: '#0f172a', color: '#fff' }}
            >
              <MessageSquare size={16} /> Start Chat
            </Btn>
            <Btn
              lg
              onClick={() => navigate(`/creator/c/${creator.handle || creator.id}`)}
              style={{ borderRadius: 14 }}
            >
              <ExternalLink size={16} /> Full Profile
            </Btn>
          </div>

          {/* Collab suggestion */}
          <div style={{ marginTop: 24, padding: 20, background: 'linear-gradient(135deg, #FF943108, #FF943104)', borderRadius: 20, border: '1px solid #FF943120' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <Handshake size={18} color="#FF9431" />
              <span style={{ fontSize: 14, fontWeight: 900, color: '#0f172a' }}>Propose Collaboration</span>
            </div>
            <p style={{ fontSize: 13, color: '#64748b', fontWeight: 500, lineHeight: 1.5, margin: '0 0 14px' }}>
              Create a co-creation bundle with {creator.name?.split(' ')[0]} — combine your niches for a joint brand pitch.
            </p>
            <Btn sm onClick={() => navigate('/creator/messages')} style={{ borderRadius: 12, background: '#FF9431', color: '#fff' }}>
              <UserPlus size={14} /> Propose Bundle
            </Btn>
          </div>
        </div>
      </Card>
    </div>
  );
};

CreatorDetailView.propTypes = {
  creator: PropTypes.object.isRequired,
  saved: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired
};

const timeAgo = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHr / 24);

  if (diffSec < 60) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${diffDays}d ago`;
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CommunityPage() {
  const { id } = useParams();
  const { st, dsp } = useApp();
  const navigate = useNavigate();

  // Search & Filter States
  const [tab, setTab] = useState('network'); // 'network' | 'feed'
  const [posts, setPosts] = useState([]);
  const [feedLoading, setFeedLoading] = useState(false);
  const [newPostText, setNewPostText] = useState('');
  const [submittingPost, setSubmittingPost] = useState(false);

  const [q, setQ] = useState('');
  const [niche, setNiche] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [erFilter, setErFilter] = useState(0);
  const [sortBy, setSortBy] = useState('score');

  const [showFilters, setShowFilters] = useState(false);
  const [allCreators, setAllCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(12);
  const [mob, setMob] = useState(globalThis.innerWidth < 768);

  const loadFeed = () => {
    setFeedLoading(true);
    apiCall('/community/posts')
      .then(res => {
        if (Array.isArray(res)) setPosts(res);
        setFeedLoading(false);
      })
      .catch(err => {
        console.error('Failed to load feed:', err);
        setFeedLoading(false);
      });
  };

  useEffect(() => {
    if (tab === 'feed') {
      loadFeed();
    }
  }, [tab]);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    setSubmittingPost(true);
    apiCall('/community/posts', {
      method: 'POST',
      body: JSON.stringify({ content: newPostText })
    })
      .then(newPost => {
        setPosts(prev => [newPost, ...prev]);
        setNewPostText('');
        setSubmittingPost(false);
        dsp({ t: 'TOAST', d: { type: 'success', msg: 'Post shared in community!' } });
      })
      .catch(err => {
        console.error('Failed to create post:', err);
        setSubmittingPost(false);
        dsp({ t: 'TOAST', d: { type: 'error', msg: 'Failed to share post.' } });
      });
  };

  const handleLikePost = (postId) => {
    apiCall(`/community/posts/${postId}/like`, { method: 'POST' })
      .then(res => {
        if (res && res.success) {
          setPosts(prev => prev.map(p => {
            if (p.id === postId) {
              return {
                ...p,
                likesCount: res.likesCount,
                likedByMe: res.likedByMe
              };
            }
            return p;
          }));
        }
      })
      .catch(err => console.error('Failed to like post:', err));
  };

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  // Fetch creators
  useEffect(() => {
    let cancelled = false;
    fetchCreators({ limit: 100 })
      .then(list => { if (!cancelled) setAllCreators(list || []); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  // Advanced Multi-Criteria Filter Logic
  const filtered = useMemo(() => {
    const term = q.toLowerCase();
    const loc = locationFilter.toLowerCase();
    
    let list = allCreators.filter(c => {
      if (c.email === st.user?.email) return false; // exclude self

      // Search term (name, city, state, niche)
      if (term && !(c.name || '').toLowerCase().includes(term) &&
          !(c.city || '').toLowerCase().includes(term) &&
          !String(c.niche || '').toLowerCase().includes(term)) return false;

      // Niche Select filter
      if (niche) {
        const cn = Array.isArray(c.niche) ? c.niche : [c.niche];
        if (!cn.some(n => (n || '').toLowerCase().includes(niche.toLowerCase()))) return false;
      }

      // Location Filter (HQ / City)
      if (loc && !(c.city || '').toLowerCase().includes(loc) && !(c.state || '').toLowerCase().includes(loc)) return false;

      // Platform filter
      if (platformFilter !== 'all') {
        const cp = Array.isArray(c.platform) ? c.platform.map(p => p.toLowerCase()) : [String(c.platform).toLowerCase()];
        if (!cp.some(p => p.includes(platformFilter.toLowerCase()))) return false;
      }

      // Follower Tier Filter
      if (tierFilter !== 'all') {
        const followers = c.followers || 0;
        if (tierFilter === 'nano' && followers >= 10000) return false;
        if (tierFilter === 'micro' && (followers < 10000 || followers >= 50000)) return false;
        if (tierFilter === 'mid' && (followers < 50000 || followers >= 100000)) return false;
        if (tierFilter === 'mega' && followers < 100000) return false;
      }

      // ER filter
      if (erFilter > 0) {
        const er = c.er || 4.2;
        if (er < erFilter) return false;
      }

      return true;
    });

    // Sorting Logic
    return [...list].sort((a, b) => {
      if (sortBy === 'followers') return (b.followers || 0) - (a.followers || 0);
      if (sortBy === 'er') return (b.er || 4.2) - (a.er || 4.2);
      // Default: Highest Score
      return (b.score || fmt.score(b)) - (a.score || fmt.score(a));
    });
  }, [allCreators, q, niche, locationFilter, platformFilter, tierFilter, erFilter, sortBy, st.user?.email]);

  // Niches for filter
  const niches = useMemo(() => {
    const set = new Set();
    allCreators.forEach(c => {
      const n = Array.isArray(c.niche) ? c.niche[0] : c.niche;
      if (n) set.add(n);
    });
    return Array.from(set).slice(0, 8);
  }, [allCreators]);

  const selected = id ? allCreators.find(c => c.id === id || c.handle === id || c.slug === id) : null;

  if (selected) {
    return (
      <CreatorDetailView
        creator={selected}
        saved={st.saved.includes(selected.id)}
        onSave={() => {
          const isSaved = st.saved.includes(selected.id);
          dsp({ t: 'SAVE', id: selected.id });
          if (isSaved) {
            apiCall(`/saved/${selected.id}`, { method: 'DELETE' }).catch(() => {});
          } else {
            apiCall('/saved', { method: 'POST', body: JSON.stringify({ targetId: selected.id }) }).catch(() => {});
          }
        }}
        onBack={() => navigate('/creator/community')}
        navigate={navigate}
      />
    );
  }

  const visible = filtered.slice(0, limit);

  return (
    <div className="dashboard-page-container">
      <CreatorPageHeader
        badge="CREATOR COMMUNITY"
        title={tab === 'network' ? "Creator Network" : "Community Feed"}
        subtitle={tab === 'network' ? "Connect with other verified creators — collaborate, co-create, and grow together." : "Share updates, ask questions, and interact with the creator community."}
        icon={tab === 'network' ? Users : Compass}
      />

      {/* Tab Switcher */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, borderBottom: '1px solid #e2e8f0', paddingBottom: 12 }}>
        <button
          onClick={() => setTab('network')}
          style={{
            padding: '10px 20px',
            background: 'none',
            border: 'none',
            borderBottom: tab === 'network' ? '3px solid #FF9431' : '3px solid transparent',
            color: tab === 'network' ? '#FF9431' : '#64748b',
            fontWeight: 800,
            fontSize: 15,
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <Users size={16} />
          Creator Network
        </button>
        <button
          onClick={() => setTab('feed')}
          style={{
            padding: '10px 20px',
            background: 'none',
            border: 'none',
            borderBottom: tab === 'feed' ? '3px solid #FF9431' : '3px solid transparent',
            color: tab === 'feed' ? '#FF9431' : '#64748b',
            fontWeight: 800,
            fontSize: 15,
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <Compass size={16} />
          Community Feed
        </button>
      </div>

      {tab === 'network' ? (
        <>
          {/* Main Search Bar & Filter Toggle */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <Fld
                label=""
                icon={Search}
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search by name, city, niche..."
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              style={{ 
                padding: '12px 18px', 
                borderRadius: 14, 
                border: `1.5px solid ${showFilters ? '#FF9431' : '#e2e8f0'}`, 
                background: showFilters ? 'rgba(255,148,49,0.1)' : '#f8fafc', 
                color: showFilters ? '#FF9431' : '#0f172a', 
                display: 'flex', 
                alignItems: 'center', 
                gap: 8, 
                fontSize: 14, 
                fontWeight: 800, 
                cursor: 'pointer',
                height: '46px',
                transition: 'all 0.3s'
              }}
            >
              <SlidersHorizontal size={16} />
              {!mob && 'Advanced Filters'}
            </button>
          </div>

          {/* EXPANDABLE SAAS FILTER DRAWER */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ overflow: 'hidden', marginBottom: 24 }}
              >
                <div style={{ 
                  background: '#f8fafc', 
                  border: '1.5px solid #e2e8f0', 
                  borderRadius: 24, 
                  padding: mob ? '20px' : '28px',
                  display: 'grid',
                  gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)',
                  gap: 20
                }}>
                  {/* Col 1: Location & Platform */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 6 }}>HQ City / State</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Jaipur, Indore" 
                        value={locationFilter}
                        onChange={e => setLocationFilter(e.target.value)}
                        style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 12, fontSize: 13, outline: 'none', background: '#fff', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 6 }}>Social Network</label>
                      <select 
                        value={platformFilter}
                        onChange={e => setPlatformFilter(e.target.value)}
                        style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 12, fontSize: 13, outline: 'none', background: '#fff', cursor: 'pointer' }}
                      >
                        <option value="all">All Platforms</option>
                        <option value="instagram">Instagram</option>
                        <option value="youtube">YouTube</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="twitter">Twitter / X</option>
                      </select>
                    </div>
                  </div>

                  {/* Col 2: Follower Tier & Min ER */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 6 }}>Follower Tier</label>
                      <select
                        value={tierFilter}
                        onChange={e => setTierFilter(e.target.value)}
                        style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 12, fontSize: 13, outline: 'none', background: '#fff', cursor: 'pointer' }}
                      >
                        <option value="all">All Tiers</option>
                        <option value="nano">Nano (&lt; 10K)</option>
                        <option value="micro">Micro (10K - 50K)</option>
                        <option value="mid">Mid-Tier (50K - 100K)</option>
                        <option value="mega">Mega (100K+)</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 6 }}>Min Engagement Rate (ER)</label>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {[0, 3, 5, 8].map(er => (
                          <button 
                            key={er} 
                            onClick={() => setErFilter(er)}
                            style={{
                              flex: 1, padding: '8px', borderRadius: 10,
                              border: `1.5px solid ${erFilter === er ? '#FF9431' : '#e2e8f0'}`,
                              background: erFilter === er ? 'rgba(255,148,49,0.1)' : '#fff',
                              color: erFilter === er ? '#FF9431' : '#64748b',
                              fontSize: 12, fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s'
                            }}
                          >
                            {er === 0 ? 'All' : `>${er}%`}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Col 3: Sorting & Clear */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'space-between' }}>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 6 }}>Sort Results By</label>
                      <select 
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                        style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 12, fontSize: 13, outline: 'none', background: '#fff', cursor: 'pointer' }}
                      >
                        <option value="score">Highest CB Score</option>
                        <option value="followers">Most Followers</option>
                        <option value="er">Highest Engagement</option>
                      </select>
                    </div>
                    
                    <button
                      onClick={() => {
                        setLocationFilter('');
                        setPlatformFilter('all');
                        setTierFilter('all');
                        setErFilter(0);
                        setSortBy('score');
                        setNiche('');
                      }}
                      style={{
                        padding: '12px', borderRadius: 12, border: 'none',
                        background: '#e2e8f0', color: '#475569', fontSize: 12, fontWeight: 900,
                        cursor: 'pointer', transition: '0.2s', width: '100%'
                      }}
                      onMouseEnter={e => e.target.style.background = '#cbd5e1'}
                      onMouseLeave={e => e.target.style.background = '#e2e8f0'}
                    >
                      Reset All Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Niche quick filters */}
          {niches.length > 0 && !showFilters && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
              <button
                onClick={() => setNiche('')}
                style={{ padding: '6px 14px', borderRadius: 100, border: 'none', background: !niche ? '#0f172a' : '#f1f5f9', color: !niche ? '#fff' : '#64748b', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}
              >
                All Niches
              </button>
              {niches.map(n => (
                <button
                  key={n}
                  onClick={() => setNiche(niche === n ? '' : n)}
                  style={{ padding: '6px 14px', borderRadius: 100, border: 'none', background: niche === n ? '#FF9431' : '#f1f5f9', color: niche === n ? '#fff' : '#64748b', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}
                >
                  {n}
                </button>
              ))}
            </div>
          )}

          {/* Stats bar */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 28, padding: '14px 20px', background: '#f8fafc', borderRadius: 16, border: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>
              <span style={{ fontWeight: 900, color: '#0f172a' }}>{filtered.length}</span> creators found
            </div>
            <div style={{ width: 1, background: '#e2e8f0' }} />
            <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>
              <span style={{ fontWeight: 900, color: '#FF9431' }}>{st.saved.length}</span> saved in library
            </div>
          </div>

          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0', color: '#94a3b8' }}>
              <Loader2 size={24} className="spin" style={{ marginRight: 12 }} />
              <span style={{ fontSize: 15, fontWeight: 700 }}>Loading creators...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: '#94a3b8' }}>
              <Users size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
              <p style={{ fontSize: 18, fontWeight: 800, color: '#475569' }}>No creators found</p>
              <p style={{ fontSize: 14, fontWeight: 500 }}>Try a different search or niche filter.</p>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: mob ? 12 : 24 }}>
                {visible.map((creator, i) => (
                  <CreatorNetworkCard
                    key={creator.id || i}
                    creator={creator}
                    saved={st.saved.includes(creator.id)}
                    onSave={() => {
                      const isSaved = st.saved.includes(creator.id);
                      dsp({ t: 'SAVE', id: creator.id });
                      if (isSaved) {
                        apiCall(`/saved/${creator.id}`, { method: 'DELETE' }).catch(() => {});
                      } else {
                        apiCall('/saved', { method: 'POST', body: JSON.stringify({ targetId: creator.id }) }).catch(() => {});
                      }
                    }}
                    onChat={() => navigate('/creator/messages')}
                    onView={() => navigate(`/creator/community/${creator.handle || creator.id}`)}
                    delay={i * 0.04}
                  />
                ))}
              </div>

              {visible.length < filtered.length && (
                <div style={{ textAlign: 'center', marginTop: 32 }}>
                  <button
                    onClick={() => setLimit(prev => prev + 12)}
                    style={{ padding: '14px 40px', borderRadius: 100, background: '#0f172a', color: '#fff', fontSize: 14, fontWeight: 900, border: 'none', cursor: 'pointer' }}
                  >
                    Load More Creators
                  </button>
                  <p style={{ marginTop: 12, fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>
                    Showing {visible.length} of {filtered.length}
                  </p>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {/* Post Creator Card */}
          <Card style={{ padding: 20, marginBottom: 24, background: '#fff', borderRadius: 20, border: '1.5px solid #e2e8f0' }}>
            <form onSubmit={handleCreatePost}>
              <div style={{ display: 'flex', gap: 16 }}>
                <img
                  src={st.user?.photo || st.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(st.user?.name || 'Me')}&background=FF9431&color=fff`}
                  alt="My Profile"
                  style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <textarea
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    placeholder="What's happening in your creator journey?"
                    style={{
                      width: '100%',
                      minHeight: 80,
                      border: 'none',
                      outline: 'none',
                      fontSize: 15,
                      resize: 'none',
                      color: '#0f172a',
                      fontWeight: 500,
                      boxSizing: 'border-box'
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, borderTop: '1px solid #f1f5f9', paddingTop: 12 }}>
                    <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>
                      {newPostText.length} / 500 characters
                    </span>
                    <Btn
                      sm
                      type="submit"
                      disabled={submittingPost || !newPostText.trim()}
                      style={{
                        background: '#FF9431',
                        color: '#fff',
                        borderRadius: 12,
                        padding: '8px 18px',
                        fontWeight: 850,
                        opacity: (!newPostText.trim() || submittingPost) ? 0.6 : 1
                      }}
                    >
                      {submittingPost ? <Loader2 size={14} className="spin" /> : 'Post to Feed'}
                    </Btn>
                  </div>
                </div>
              </div>
            </form>
          </Card>

          {/* Feed Listing */}
          {feedLoading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0', color: '#94a3b8' }}>
              <Loader2 size={24} className="spin" style={{ marginRight: 12 }} />
              <span style={{ fontSize: 15, fontWeight: 700 }}>Loading community feed...</span>
            </div>
          ) : posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
              <MessageSquare size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
              <p style={{ fontSize: 18, fontWeight: 800, color: '#475569' }}>No posts yet</p>
              <p style={{ fontSize: 14, fontWeight: 500 }}>Be the first one to share an update!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {posts.map((post) => {
                const creatorPhoto = post.creator?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.creator?.name || 'C')}&background=FF9431&color=fff`;
                return (
                  <Card key={post.id} style={{ padding: 20, background: '#fff', borderRadius: 20, border: '1.5px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <img
                        src={creatorPhoto}
                        alt={post.creator?.name}
                        style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ fontWeight: 800, color: '#0f172a', fontSize: 15 }}>
                                {post.creator?.name}
                              </span>
                              {post.creator?.isVerified && (
                                <span style={{ background: '#FF943120', color: '#FF9431', fontSize: 9, fontWeight: 900, padding: '2px 6px', borderRadius: 4, textTransform: 'uppercase' }}>
                                  Verified
                                </span>
                              )}
                            </div>
                            <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>
                              @{post.creator?.handle || 'creator'} · {timeAgo(post.createdAt)}
                            </span>
                          </div>
                        </div>
                        <p style={{ fontSize: 14, color: '#334155', fontWeight: 500, lineHeight: 1.6, marginTop: 10, marginBottom: 16, whiteSpace: 'pre-wrap' }}>
                          {post.content}
                        </p>
                        {post.imageUrl && (
                          <img
                            src={post.imageUrl}
                            alt="Post attachment"
                            style={{ width: '100%', maxHeight: 300, objectFit: 'cover', borderRadius: 12, marginBottom: 16 }}
                          />
                        )}
                        <div style={{ display: 'flex', gap: 24, borderTop: '1px solid #f1f5f9', paddingTop: 12 }}>
                          <button
                            onClick={() => handleLikePost(post.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 6,
                              color: post.likedByMe ? '#EF4444' : '#64748b',
                              fontSize: 13,
                              fontWeight: 700,
                              padding: 0
                            }}
                          >
                            <Heart size={16} fill={post.likedByMe ? '#EF4444' : 'none'} />
                            {post.likesCount || 0} Likes
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
