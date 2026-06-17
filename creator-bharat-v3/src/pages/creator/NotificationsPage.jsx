import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Wallet, 
  Briefcase, 
  Trash2, 
  ArrowRight, 
  Check, 
  X, 
  Sparkles,
  Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Seo from '@/components/common/SEO';
import { LS } from '@/utils/helpers';
import { useApp } from '@/core/context';

const DEFAULT_CREATOR_NOTIFS = [
  {
    id: 'c-notif-welcome',
    type: 'welcome',
    category: 'platform',
    title: 'Welcome to Creator Hub! 🚀',
    msg: 'Complete your profile information, connect your social profiles, and calculate your Creator Score to unlock premium brand matching briefs.',
    time: 'Just now',
    read: false,
    actionText: 'Build Profile',
    actionPath: '/creator/profile'
  },
  {
    id: 'c-notif-shortlist',
    type: 'shortlist',
    category: 'campaign',
    title: 'You are Shortlisted! 🎉',
    msg: 'Congratulations! You have been shortlisted by "FitIndie Nutrition" for the upcoming summer activewear campaign.',
    time: '2 hours ago',
    read: false,
    actionText: 'View Campaign',
    actionPath: '/creator/opportunities'
  },
  {
    id: 'c-notif-escrow',
    type: 'payment',
    category: 'payment',
    title: 'Milestone Payout Deposited 💳',
    msg: 'FitIndie nutrition has deposited ₹15,000 in escrow for your first video milestone. Payout is guaranteed upon submission.',
    time: '1 day ago',
    read: true,
    actionText: 'Check Wallet',
    actionPath: '/creator/wallet'
  },
  {
    id: 'c-notif-badge',
    type: 'verification',
    category: 'platform',
    title: 'Creator Score Updated! 🌟',
    msg: 'Your consistency rating increased! Your Creator Score is now 84, placing you in the top 15% of regional lifestyle creators.',
    time: '3 days ago',
    read: true,
    actionText: 'Check Creator Score',
    actionPath: '/creator/score'
  }
];

const iconMap = {
  shortlist: Star,
  selected: CheckCircle2,
  payment: Wallet,
  verification: ShieldCheck,
  welcome: Bell,
  achievement: Award
};

const categoryColorMap = {
  platform: { bg: 'rgba(59,130,246,0.08)', text: '#3b82f6', border: 'rgba(59,130,246,0.2)' },
  campaign: { bg: 'rgba(255,148,49,0.08)', text: '#FF9431', border: 'rgba(255,148,49,0.2)' },
  payment: { bg: 'rgba(16,185,129,0.08)', text: '#10b981', border: 'rgba(16,185,129,0.2)' }
};

export default function NotificationsPage() {
  const navigate = useNavigate();
  const { st } = useApp();
  const [notifications, setNotifications] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    // Attempt to read notifications from localStorage or generate defaults
    const localNotifs = LS.get('cb_notifications', []);
    const creatorSpecificNotifs = localNotifs.filter(n => n.id.startsWith('n-') || n.id.startsWith('ns-') || n.id.startsWith('c-'));
    
    if (creatorSpecificNotifs.length > 0) {
      setNotifications(creatorSpecificNotifs);
    } else {
      // Merge defaults with any welcome/other notifs
      const initial = [...DEFAULT_CREATOR_NOTIFS];
      setNotifications(initial);
      LS.set('cb_notifications', initial);
    }
  }, []);

  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  const filteredNotifications = useMemo(() => {
    if (activeFilter === 'all') return notifications;
    if (activeFilter === 'unread') return notifications.filter(n => !n.read);
    return notifications.filter(n => n.category === activeFilter || n.type === activeFilter);
  }, [notifications, activeFilter]);

  const handleMarkRead = (id) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    LS.set('cb_notifications', updated);
  };

  const handleMarkAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    LS.set('cb_notifications', updated);
  };

  const handleDeleteNotif = (id) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    LS.set('cb_notifications', updated);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Outfit, system-ui, sans-serif' }}>
      <Seo 
        title="Creator Notifications - Workspace Updates" 
        description="Stay updated with your active campaigns, shortlist statuses, payouts, and milestones."
      />

      {/* Header Block */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(255,148,49,0.08)', borderRadius: 100, marginBottom: '12px' }}>
            <span style={{ width: 6, height: 6, background: '#FF9431', borderRadius: '50%' }} />
            <span style={{ fontSize: '10px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1px' }}>Creator Alerts</span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', margin: 0, letterSpacing: '-0.8px' }}>
            Workspace Notifications
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
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#FF9431'; e.currentTarget.style.color = '#FF9431'; }}
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
          { id: 'campaign', label: 'Campaign Briefs' },
          { id: 'payment', label: 'Payouts & Escrow' },
          { id: 'platform', label: 'System & Score' }
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
              const catColors = categoryColorMap[item.category] || { bg: 'rgba(124,58,237,0.08)', text: '#7c3aed', border: 'rgba(124,58,237,0.2)' };
              const Icon = iconMap[item.type] || Bell;
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  style={{
                    background: '#fff',
                    border: !item.read ? '1.5px solid rgba(255,148,49,0.25)' : '1.5px solid #e2e8f0',
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
                          background: '#fff3e6',
                          color: '#FF9431',
                          fontSize: '9px',
                          fontWeight: 950,
                          padding: '2px 8px',
                          borderRadius: '100px',
                          textTransform: 'uppercase'
                        }}>
                          Unread
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
