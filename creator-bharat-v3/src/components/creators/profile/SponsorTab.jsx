import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrustBadge, TabNavigator } from './ProfileShared';

const SPONSOR_TYPES = [
  { id: 'link', label: 'Promoted Link', icon: '🔗', desc: 'Kisi bhi website / app / product ka link promote karo', color: '#3B82F6' },
  { id: 'banner', label: 'Ad Banner', icon: '🖼️', desc: 'Image banner with CTA button — brand awareness ke liye', color: '#FF9431' },
  { id: 'shoutout', label: 'Shoutout Post', icon: '📣', desc: 'Kisi brand, creator ya product ka text shoutout', color: '#10B981' },
];

const SponsorPostCard = ({ post, isOwner, onDelete, mob }) => {
  const typeInfo = SPONSOR_TYPES.find(t => t.id === post.type) || SPONSOR_TYPES[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: '#fff',
        borderRadius: 24,
        border: `1.5px solid ${typeInfo.color}20`,
        padding: mob ? '20px' : '28px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
      }}
    >
      {/* Accent top line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: typeInfo.color, borderRadius: '24px 24px 0 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <span style={{ fontSize: 22 }}>{typeInfo.icon}</span>
          <div>
            <span style={{ fontSize: 10, fontWeight: 900, color: typeInfo.color, textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block' }}>
              {typeInfo.label}
            </span>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8' }}>{post.date}</span>
          </div>
        </div>
        {isOwner && (
          <button
            onClick={() => onDelete(post.id)}
            style={{ background: '#fef2f2', border: 'none', borderRadius: 10, padding: '6px 12px', fontSize: 11, fontWeight: 800, color: '#ef4444', cursor: 'pointer' }}
          >
            Remove
          </button>
        )}
      </div>

      {/* Banner image */}
      {post.imageUrl && (
        <div style={{ width: '100%', height: 160, borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>
          <img src={post.imageUrl} alt="Sponsor banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      <h4 style={{ fontSize: 18, fontWeight: 900, color: '#0f172a', marginBottom: 8 }}>{post.title}</h4>
      <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, fontWeight: 550, marginBottom: post.link ? 16 : 0 }}>
        {post.description}
      </p>

      {post.link && (
        <a
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: typeInfo.color, color: '#fff',
            padding: '10px 20px', borderRadius: 100,
            fontSize: 13, fontWeight: 800, textDecoration: 'none',
            marginTop: 4
          }}
        >
          {post.ctaText || 'Visit Now'} →
        </a>
      )}

      {/* Sponsored label */}
      <div style={{ position: 'absolute', bottom: 12, right: 16, fontSize: 9, fontWeight: 900, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '1px' }}>
        SPONSORED
      </div>
    </motion.div>
  );
};
SponsorPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  isOwner: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  mob: PropTypes.bool
};

const AddSponsorModal = ({ onClose, onAdd, existingCount, isPro }) => {
  const navigate = useNavigate();
  const [type, setType] = useState('link');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [ctaText, setCtaText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [saving, setSaving] = useState(false);

  const FREE_LIMIT = 1;
  const isLocked = !isPro && existingCount >= FREE_LIMIT;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    setTimeout(() => {
      onAdd({
        id: 'sp-' + Date.now(),
        type,
        title: title.trim(),
        description: description.trim(),
        link: link.trim(),
        ctaText: ctaText.trim() || 'Visit Now',
        imageUrl: imageUrl.trim(),
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      });
      setSaving(false);
      onClose();
    }, 800);
  };

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={e => e.stopPropagation()}
        style={{ background: '#fff', borderRadius: 28, padding: 36, maxWidth: 520, width: '100%', boxShadow: '0 40px 80px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h3 style={{ fontSize: 20, fontWeight: 950, color: '#0f172a', margin: 0 }}>Add Sponsor Post</h3>
          <button onClick={onClose} style={{ background: '#f8fafc', border: 'none', borderRadius: 10, width: 36, height: 36, display: 'grid', placeItems: 'center', cursor: 'pointer', fontSize: 18, color: '#64748b' }}>✕</button>
        </div>

        {isLocked ? (
          <div style={{ textAlign: 'center', padding: '32px 16px' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
            <h4 style={{ fontSize: 18, fontWeight: 900, color: '#0f172a', marginBottom: 8 }}>Pro Feature</h4>
            <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24, lineHeight: 1.6 }}>
              Free plan mein sirf 1 sponsor post allowed hai. Unlimited posts ke liye Pro upgrade karo.
            </p>
            <button onClick={() => navigate('/creator/pricing')} style={{ display: 'inline-block', background: '#0f172a', color: '#fff', padding: '12px 28px', borderRadius: 100, fontWeight: 900, fontSize: 14, border: 'none', cursor: 'pointer' }}>
              Upgrade to Pro →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Type selector */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 10 }}>Post Type</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {SPONSOR_TYPES.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setType(t.id)}
                    style={{
                      flex: 1, padding: '10px 6px', borderRadius: 12,
                      border: `1.5px solid ${type === t.id ? t.color : '#e2e8f0'}`,
                      background: type === t.id ? t.color + '10' : '#fff',
                      cursor: 'pointer', fontSize: 11, fontWeight: 800,
                      color: type === t.id ? t.color : '#64748b',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{t.icon}</span>
                    {t.label.split(' ')[0]}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 8, fontWeight: 500 }}>
                {SPONSOR_TYPES.find(t => t.id === type)?.desc}
              </p>
            </div>

            {/* Title */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 8 }}>
                Title <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Nykaa New Launch — 20% Off"
                required
                style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 14, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            {/* Description */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 8 }}>Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Brief description jo visitor ko action lene ke liye inspire kare..."
                rows={3}
                style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 14, fontSize: 14, outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
              />
            </div>

            {/* Link */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 8 }}>URL / Link</label>
              <input
                value={link}
                onChange={e => setLink(e.target.value)}
                placeholder="https://..."
                type="url"
                style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 14, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            {/* CTA Text */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 8 }}>CTA Button Text</label>
                <input
                  value={ctaText}
                  onChange={e => setCtaText(e.target.value)}
                  placeholder="Visit Now"
                  style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 14, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 8 }}>Image URL (Optional)</label>
                <input
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  placeholder="https://image..."
                  style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e2e8f0', borderRadius: 14, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving || !title.trim()}
              style={{ width: '100%', padding: '16px', background: saving ? '#94a3b8' : '#0f172a', color: '#fff', border: 'none', borderRadius: 14, fontWeight: 900, fontSize: 15, cursor: saving ? 'not-allowed' : 'pointer', marginTop: 4 }}
            >
              {saving ? 'Adding...' : 'Publish Sponsor Post'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
AddSponsorModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  existingCount: PropTypes.number.isRequired,
  isPro: PropTypes.bool
};

export const SponsorTab = ({ c, mob, setActiveTab }) => {
  const STORAGE_KEY = `cb_sponsor_posts_${c?.id || c?.slug || 'default'}`;

  // Load posts from localStorage — demo posts for fallback/preview creators
  const posts = (() => {
    if (c?.sponsored_posts && c.sponsored_posts.length > 0) {
      return c.sponsored_posts;
    }
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) return parsed;
      }
    } catch (_) { /* ignore */ }
    if (c?.id === 'fallback' || !c?.email) {
      return [
        {
          id: 'sp-demo-1', type: 'link',
          title: 'Nykaa Summer Collection — Flat 30% Off',
          description: 'Meri favourite beauty brand ka summer sale chal raha hai. Is link se extra 30% discount milega — limited time offer!',
          link: 'https://nykaa.com', ctaText: 'Shop Now', imageUrl: '', date: '12 Jun 2026'
        },
        {
          id: 'sp-demo-2', type: 'shoutout',
          title: 'Shoutout: @BharatStartups Podcast',
          description: 'Ye podcast sunna chahiye — India ke young founders ki real stories. Weekly episodes, amazing guests. Highly recommend!',
          link: 'https://bharatstartups.in', ctaText: 'Listen Now', imageUrl: '', date: '8 Jun 2026'
        }
      ];
    }
    return [];
  })();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>

      {/* Section heading */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 24 }}>📢</span>
          <h2 style={{ fontSize: mob ? 22 : 28, fontWeight: 950, color: '#0f172a', margin: 0 }}>
            Sponsored Content
          </h2>
        </div>
        <p style={{ fontSize: 14, color: '#64748b', fontWeight: 500, margin: 0 }}>
          Creator ke promoted products, links aur shoutouts — unke audience ke liye.
        </p>
      </div>

      {/* Empty state */}
      {posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f8fafc', borderRadius: 24, border: '1.5px dashed #e2e8f0' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📢</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#475569', marginBottom: 6 }}>No sponsored content yet</div>
          <div style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>Creator ne abhi koi promoted post share nahi kiya.</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {posts.map(post => {
            const typeInfo = SPONSOR_TYPES.find(t => t.id === post.type) || SPONSOR_TYPES[0];
            return (
              <motion.div
                key={post.id}
                whileHover={{ y: -4 }}
                style={{
                  background: '#fff', borderRadius: 24,
                  border: `1.5px solid ${typeInfo.color}20`,
                  padding: mob ? '20px' : '26px',
                  position: 'relative', overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                }}
              >
                {/* Top accent */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: typeInfo.color, borderRadius: '24px 24px 0 0' }} />

                {/* Type + date */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <span style={{ fontSize: 18 }}>{typeInfo.icon}</span>
                  <span style={{ fontSize: 10, fontWeight: 900, color: typeInfo.color, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                    {typeInfo.label}
                  </span>
                  <span style={{ marginLeft: 'auto', fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>{post.date}</span>
                </div>

                {/* Banner image */}
                {post.imageUrl && (
                  <div style={{ width: '100%', height: 150, borderRadius: 14, overflow: 'hidden', marginBottom: 14 }}>
                    <img src={post.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}

                {/* Title */}
                <h4 style={{ fontSize: 17, fontWeight: 900, color: '#0f172a', marginBottom: 8, lineHeight: 1.3 }}>
                  {post.title}
                </h4>

                {/* Description */}
                {post.description && (
                  <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, fontWeight: 500, marginBottom: post.link ? 16 : 0 }}>
                    {post.description}
                  </p>
                )}

                {/* CTA Button */}
                {post.link && (
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      background: typeInfo.color, color: '#fff',
                      padding: '9px 18px', borderRadius: 100,
                      fontSize: 13, fontWeight: 800, textDecoration: 'none'
                    }}
                  >
                    {post.ctaText || 'Visit Now'} →
                  </a>
                )}

                {/* Sponsored watermark */}
                <div style={{ position: 'absolute', bottom: 10, right: 14, fontSize: 9, fontWeight: 900, color: '#e2e8f0', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  SPONSORED
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <TrustBadge />
      <TabNavigator activeTab="sponsor" setActiveTab={setActiveTab} mob={mob} />
    </motion.div>
  );
};
SponsorTab.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool, setActiveTab: PropTypes.func.isRequired };
