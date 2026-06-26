import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  ShieldCheck, 
  Briefcase, 
  CheckCircle2, 
  Wallet, 
  Trash2, 
  ArrowRight, 
  Check, 
  X, 
  TrendingUp,
  Cpu
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Seo from '@/components/common/SEO';
import { LS } from '@/utils/helpers';
import { useApp } from '@/core/context';

const DEFAULT_BRAND_NOTIFS = [
  {
    id: 'b-notif-welcome',
    type: 'welcome',
    category: 'platform',
    title: 'Welcome to Brand Command Center! 🛡️',
    msg: 'Launch your first campaign brief, search our database of verified regional creators, and track ROI signals in real-time.',
    time: 'Just now',
    read: false,
    actionText: 'Create Campaign',
    actionPath: '/campaign-builder'
  },
  {
    id: 'b-notif-application',
    type: 'application',
    category: 'pitch',
    title: 'New Creator Pitch Received 🚀',
    msg: 'Rahul Sharma (@rahul_creates, Fitness, CB Score 92) has submitted a pitch for your summer campaign.',
    time: '4 hours ago',
    read: false,
    actionText: 'Review Applications',
    actionPath: '/brand-applications'
  },
  {
    id: 'b-notif-escrow',
    type: 'payment',
    category: 'payment',
    title: 'Escrow Deposit Confirmed 💳',
    msg: 'Your milestone deposit of ₹15,000 for campaign activewear was safely received in the escrow wallet.',
    time: '1 day ago',
    read: true,
    actionText: 'View Dashboard',
    actionPath: '/brand-dashboard'
  },
  {
    id: 'b-notif-campaign-live',
    type: 'selected',
    category: 'campaign',
    title: 'Campaign Brief Approved! 🌟',
    msg: 'Your campaign brief "Jaipur Handicrafts Spotlight" went live. Eligible creators in Rajasthan are notified.',
    time: '2 days ago',
    read: true,
    actionText: 'Manage Campaigns',
    actionPath: '/campaigns'
  }
];

const iconMap = {
  application: Briefcase,
  selected: CheckCircle2,
  payment: Wallet,
  verification: ShieldCheck,
  welcome: Bell,
  analytics: TrendingUp,
  system: Cpu
};

const categoryColorMap = {
  platform: { bg: 'rgba(59,130,246,0.08)', text: '#3b82f6', border: 'rgba(59,130,246,0.2)' },
  pitch: { bg: 'rgba(236,72,153,0.08)', text: '#ec4899', border: 'rgba(236,72,153,0.2)' },
  payment: { bg: 'rgba(16,185,129,0.08)', text: '#10b981', border: 'rgba(16,185,129,0.2)' },
  campaign: { bg: 'rgba(255,148,49,0.08)', text: '#FF9431', border: 'rgba(255,148,49,0.2)' }
};

export default function NotificationsPage() {
  const navigate = useNavigate();
  const { st } = useApp();
  const [notifications, setNotifications] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      const { apiCall } = await import('@/utils/api');
      const data = await apiCall('/notifications');
      const backendNotifs = (data.notifications || []).map(n => ({
        id: n.id,
        type: n.type?.toLowerCase() || 'info',
        category: n.type === 'PAYMENT' ? 'payment' : n.type === 'CAMPAIGN' ? 'pitch' : 'platform',
        title: n.title,
        msg: n.body,
        time: new Date(n.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
        read: n.isRead,
        actionPath: n.link || null,
        _backendId: n.id
      }));

      if (backendNotifs.length > 0) {
        setNotifications(backendNotifs);
      } else {
        const localNotifs = LS.get('cb_notifications', DEFAULT_BRAND_NOTIFS);
        setNotifications(localNotifs);
      }
    } catch {
      const localNotifs = LS.get('cb_notifications', DEFAULT_BRAND_NOTIFS);
      setNotifications(localNotifs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  const filteredNotifications = useMemo(() => {
    if (activeFilter === 'all') return notifications;
    if (activeFilter === 'unread') return notifications.filter(n => !n.read);
    return notifications.filter(n => n.category === activeFilter || n.type === activeFilter);
  }, [notifications, activeFilter]);

  const handleMarkRead = async (id) => {
    const notif = notifications.find(n => n.id === id);
    const backendId = notif?._backendId || id;
    try {
      const { apiCall } = await import('@/utils/api');
      await apiCall(`/notifications/${backendId}/read`, { method: 'PUT' });
    } catch { /* non-fatal */ }
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    LS.set('cb_notifications', updated);
  };

  const handleMarkAllRead = async () => {
    try {
      const { apiCall } = await import('@/utils/api');
      await apiCall('/notifications/read-all', { method: 'PUT' });
    } catch { /* non-fatal */ }
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    LS.set('cb_notifications', updated);
  };

  const handleDeleteNotif = async (id) => {
    const notif = notifications.find(n => n.id === id);
    const backendId = notif?._backendId || id;
    try {
      const { apiCall } = await import('@/utils/api');
      await apiCall(`/notifications/${backendId}`, { method: 'DELETE' });
    } catch { /* non-fatal */ }
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    LS.set('cb_notifications', updated);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Outfit, system-ui, sans-serif' }}>
      <Seo 
        title="Brand Notifications - Command Alerts" 
        description="Stay updated with incoming pitches, applications, milestone payouts, and campaign approvals."
      />

      {/* Header Block */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(16,185,129,0.08)', borderRadius: 100, marginBottom: '12px' }}>
            <span style={{ width: 6, height: 6, background: '#10b981', borderRadius: '50%' }} />
            <span style={{ fontSize: '10px', fontWeight: 950, color: '#10b981', textTransform: 'uppercase', letterSpacing: '1px' }}>Brand System Alerts</span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', margin: 0, letterSpacing: '-0.8px' }}>
            Brand Notifications
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
              transition: '0.2s',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.color = '#10b981'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#475569'; }}
          >
            <CheckCircle2 size={16} />
            <span>Mark All Read</span>
          </button>
        )}
      </div>

      {/* Filters Navigation */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '24px', scrollbarWidth: 'none' }}>
        {[
          { id: 'all', label: 'All Alerts' },
          { id: 'unread', label: `Unread (${unreadCount})` },
          { id: 'pitch', label: 'Pitches' },
          { id: 'payment', label: 'Escrow Payouts' },
          { id: 'campaign', label: 'Campaigns' }
        ].map(tab => {
          const active = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              style={{
                padding: '10px 18px',
                background: active ? '#0f172a' : '#fff',
                border: active ? '1.5px solid #0f172a' : '1.5px solid #e2e8f0',
                borderRadius: '100px',
                color: active ? '#fff' : '#64748b',
                fontSize: '13px',
                fontWeight: 850,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Notifications Stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <AnimatePresence initial={false}>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(item => {
              const catColors = categoryColorMap[item.category] || { bg: 'rgba(59,130,246,0.08)', text: '#3b82f6', border: 'rgba(59,130,246,0.2)' };
              const Icon = iconMap[item.type] || Bell;
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  style={{
                    background: '#fff',
                    border: !item.read ? '1.5px solid rgba(16,185,129,0.25)' : '1.5px solid #e2e8f0',
                    borderRadius: '20px',
                    padding: '20px',
                    position: 'relative',
                    display: 'flex',
                    gap: '16px',
                    opacity: !item.read ? 1 : 0.85,
                    boxSizing: 'border-box',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.01)'
                  }}
                >
                  {/* Left Icon */}
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: catColors.bg,
                    border: `1.5px solid ${catColors.border}`,
                    color: catColors.text,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={18} />
                  </div>

                  {/* Body Content */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '11px', fontWeight: 900, color: catColors.text, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {item.category || item.type}
                      </span>
                      <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>• {item.time || item.timestamp}</span>
                      {!item.read && (
                        <span style={{
                          background: '#e6f7ed',
                          color: '#10b981',
                          fontSize: '9px',
                          fontWeight: 950,
                          padding: '2px 8px',
                          borderRadius: '100px',
                          textTransform: 'uppercase'
                        }}>
                          New
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                      {item.title}
                    </h3>
                    
                    <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.5, margin: 0, fontWeight: 550 }}>
                      {item.msg || item.description}
                    </p>

                    {/* Action */}
                    {(item.actionPath || item.actionText) && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '8px' }}>
                        <button
                          onClick={() => {
                            handleMarkRead(item.id);
                            if (item.actionPath) navigate(item.actionPath);
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
                            gap: 4
                          }}
                        >
                          <span>{item.actionText || 'View Details'}</span>
                          <ArrowRight size={12} />
                        </button>

                        {!item.read && (
                          <button
                            onClick={() => handleMarkRead(item.id)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#64748b',
                              fontSize: '12px',
                              fontWeight: 800,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 2
                            }}
                          >
                            <Check size={14} />
                            <span>Mark read</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Close / Dismiss */}
                  <button
                    onClick={() => handleDeleteNotif(item.id)}
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
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
            <div style={{
              background: '#fff',
              border: '1.5px dashed #cbd5e1',
              borderRadius: '20px',
              padding: '48px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              color: '#64748b'
            }}>
              <Bell size={28} style={{ opacity: 0.4 }} />
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', margin: '0 0 4px 0' }}>All Clear!</h4>
                <p style={{ fontSize: '13px', margin: 0, fontWeight: 550 }}>No notifications found. Check back later for new updates.</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
