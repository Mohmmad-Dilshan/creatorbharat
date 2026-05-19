import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Sparkles, TrendingUp, Megaphone, Check, CheckCheck, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Seo from '@/components/common/SEO';

const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    category: 'platform',
    title: 'BharatAI Profile Verification Engine Launched! 🛡️',
    description: 'Creators from Tier 2 & 3 cities can now claim their official verified badge by submitting audience engagement proofs. Increase brand trust by up to 85% today.',
    timestamp: '2 hours ago',
    unread: true,
    icon: ShieldIcon,
    actionText: 'Get Verified Now',
    actionPath: '/join'
  },
  {
    id: 'notif-2',
    category: 'campaign',
    title: 'New Hyperlocal Campaign: Jaipur Handicrafts 🏺',
    description: 'A major heritage brand is seeking 25 fashion & lifestyle creators in Rajasthan for a premium regional spotlight campaign. Budget allocation starts at ₹25,000 per video.',
    timestamp: '5 hours ago',
    unread: true,
    icon: Megaphone,
    actionText: 'Browse Campaigns',
    actionPath: '/creators'
  },
  {
    id: 'notif-3',
    category: 'community',
    title: 'Top 100 Creators Leaderboard is Live! 🏆',
    description: 'Check out the active virality index of regional Indian creators on our weekly leaderboard. Real-time statistics, monthly engagement multipliers, and platform earnings are fully transparent.',
    timestamp: '1 day ago',
    unread: false,
    icon: TrendingUp,
    actionText: 'View Leaderboard',
    actionPath: '/leaderboard'
  },
  {
    id: 'notif-4',
    category: 'payment',
    title: '0% Middleman Escrow System Integrated 💳',
    description: 'We have updated our secure payment terms. Brands can deposit milestones directly into the escrow wallet. 100% payout guarantee with zero platform fees for verified creators.',
    timestamp: '3 days ago',
    unread: false,
    icon: CreditIcon,
    actionText: 'Learn Monetization',
    actionPath: '/pricing'
  }
];

function ShieldIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function CreditIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

export default function NotificationsHub() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState('all');

  const unreadCount = useMemo(() => {
    return notifications.filter(n => n.unread).length;
  }, [notifications]);

  const filteredNotifications = useMemo(() => {
    if (activeFilter === 'all') return notifications;
    return notifications.filter(n => n.category === activeFilter);
  }, [notifications, activeFilter]);

  const handleMarkAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleDeleteNotif = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getCategoryColor = (cat) => {
    if (cat === 'platform') return { bg: 'rgba(59,130,246,0.08)', text: '#3b82f6', border: 'rgba(59,130,246,0.2)' };
    if (cat === 'campaign') return { bg: 'rgba(236,72,153,0.08)', text: '#ec4899', border: 'rgba(236,72,153,0.2)' };
    if (cat === 'community') return { bg: 'rgba(139,92,246,0.08)', text: '#8b5cf6', border: 'rgba(139,92,246,0.2)' };
    return { bg: 'rgba(16,185,129,0.08)', text: '#10b981', border: 'rgba(16,185,129,0.2)' };
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      paddingTop: '120px',
      paddingBottom: '80px',
      fontFamily: 'Outfit, system-ui, sans-serif'
    }}>
      <Seo 
        title="Notifications Hub - Platform Announcements" 
        description="Stay updated with new regional campaigns, verified creator milestones, and secure payout upgrades in CreatorBharat."
      />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', boxSizing: 'border-box' }}>
        
        {/* Header Block */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '40px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(255,148,49,0.08)', borderRadius: 100, marginBottom: '12px' }}>
              <span style={{ width: 6, height: 6, background: '#FF9431', borderRadius: '50%' }} />
              <span style={{ fontSize: '10px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1px' }}>Ecosystem Updates</span>
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 950, color: '#0f172a', margin: 0, letterSpacing: '-1px' }}>
              Announcements & Alerts
            </h1>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 20px',
                background: '#fff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '100px',
                color: '#475569',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#FF9431'; e.currentTarget.style.color = '#FF9431'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#475569'; }}
            >
              <CheckCheck size={16} />
              <span>Mark All as Read</span>
            </button>
          )}
        </div>

        {/* Filters Navigation */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '16px',
          marginBottom: '24px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          {[
            { id: 'all', label: 'All Updates', icon: Bell },
            { id: 'platform', label: 'Platform Features', icon: Sparkles },
            { id: 'campaign', label: 'Campaign Invites', icon: Megaphone },
            { id: 'community', label: 'Community Hub', icon: TrendingUp },
            { id: 'payment', label: 'Payout Alerts', icon: CreditIcon }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 18px',
                  background: active ? '#0f172a' : '#fff',
                  border: active ? '1.5px solid #0f172a' : '1.5px solid #e2e8f0',
                  borderRadius: '100px',
                  color: active ? '#fff' : '#64748b',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.01)',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Notifications Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <AnimatePresence initial={false}>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(item => {
                const colors = getCategoryColor(item.category);
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: '#fff',
                      border: item.unread ? '1.5px solid rgba(255,148,49,0.3)' : '1.5px solid #e2e8f0',
                      borderRadius: '24px',
                      padding: '24px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                      position: 'relative',
                      display: 'flex',
                      gap: '18px',
                      opacity: item.unread ? 1 : 0.8,
                      boxSizing: 'border-box'
                    }}
                  >
                    {/* Category Icon Badge */}
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '16px',
                      background: colors.bg,
                      border: `1.5px solid ${colors.border}`,
                      color: colors.text,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={20} />
                    </div>

                    {/* Content Block */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '11px', fontWeight: 950, color: colors.text, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {item.category}
                        </span>
                        <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>• {item.timestamp}</span>
                        {item.unread && (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: '#ffeedd',
                            color: '#FF9431',
                            fontSize: '9px',
                            fontWeight: 950,
                            padding: '3px 8px',
                            borderRadius: '100px',
                            textTransform: 'uppercase'
                          }}>
                            New Alert
                          </span>
                        )}
                      </div>

                      <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.3px' }}>
                        {item.title}
                      </h3>
                      
                      <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, margin: 0, fontWeight: 550 }}>
                        {item.description}
                      </p>

                      {/* Call-to-Action Link */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
                        <button
                          onClick={() => {
                            handleMarkAsRead(item.id);
                            navigate(item.actionPath);
                          }}
                          style={{
                            background: '#0f172a',
                            color: '#fff',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '100px',
                            fontSize: '12px',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6
                          }}
                        >
                          <span>{item.actionText}</span>
                          <ArrowRight size={12} />
                        </button>

                        {item.unread && (
                          <button
                            onClick={() => handleMarkAsRead(item.id)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#64748b',
                              fontSize: '12px',
                              fontWeight: 800,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4
                            }}
                          >
                            <Check size={14} />
                            <span>Mark as read</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Close button to dismiss */}
                    <button
                      onClick={() => handleDeleteNotif(item.id)}
                      style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'transparent',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  background: '#fff',
                  border: '1.5px dashed #cbd5e1',
                  borderRadius: '24px',
                  padding: '60px 40px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748b'
                }}>
                  <Bell size={28} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: '0 0 6px 0' }}>
                    All Caught Up!
                  </h3>
                  <p style={{ fontSize: '14px', color: '#64748b', margin: 0, fontWeight: 550 }}>
                    No announcements found in this category. Check back soon for new campaigns and verified updates!
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
