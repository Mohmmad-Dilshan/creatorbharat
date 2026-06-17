import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle2, Briefcase, Star, Wallet, ShieldCheck, X, Trash2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LS } from '@/utils/helpers';
import { useApp } from '@/core/context';

// Generate notifications from user activity
function generateNotifications(role, email) {
  const notifications = LS.get('cb_notifications', []);
  
  // Auto-generate from applications if none exist
  if (notifications.length === 0) {
    const apps = LS.get('cb_applications', []);
    const generated = [];

    if (role === 'creator') {
      // Creator notifications from their applications
      apps.filter(a => a.applicantEmail === email).forEach(app => {
        if (app.status === 'shortlisted') {
          generated.push({ id: 'n-' + app.id, type: 'shortlist', title: 'Shortlisted!', msg: `You were shortlisted for "${app.campaignTitle}"`, time: app.date, read: false });
        }
        if (app.status === 'selected') {
          generated.push({ id: 'ns-' + app.id, type: 'selected', title: 'Selected!', msg: `Congratulations! You were selected for "${app.campaignTitle}"`, time: app.date, read: false });
        }
      });
      // Default welcome notification
      if (generated.length === 0) {
        generated.push({ id: 'n-welcome', type: 'welcome', title: 'Welcome to CreatorBharat!', msg: 'Complete your profile to unlock brand deals.', time: new Date().toISOString(), read: false });
      }
    } else if (role === 'brand') {
      // Brand notifications from applications to their campaigns
      const myCamps = LS.get('cb_campaigns', []).filter(c => c.brandEmail === email);
      const campIds = myCamps.map(c => c.id);
      const brandApps = apps.filter(a => campIds.includes(a.campaignId));
      brandApps.slice(0, 5).forEach(app => {
        generated.push({ id: 'nb-' + app.id, type: 'application', title: 'New Application', msg: `${app.applicantName || 'A creator'} applied to "${app.campaignTitle}"`, time: app.date, read: false });
      });
      if (generated.length === 0) {
        generated.push({ id: 'n-brand-welcome', type: 'welcome', title: 'Welcome Brand Partner!', msg: 'Launch your first campaign to start receiving applications.', time: new Date().toISOString(), read: false });
      }
    }

    if (generated.length > 0) {
      LS.set('cb_notifications', generated);
      return generated;
    }
  }

  return notifications;
}

const iconMap = {
  shortlist: Star,
  selected: CheckCircle2,
  application: Briefcase,
  payment: Wallet,
  verification: ShieldCheck,
  welcome: Bell
};

const colorMap = {
  shortlist: '#7C3AED',
  selected: '#10B981',
  application: '#FF9431',
  payment: '#3B82F6',
  verification: '#10B981',
  welcome: '#FF9431'
};

export default function NotificationDropdown() {
  const { st } = useApp();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    if (st.user) {
      setNotifications(generateNotifications(st.role, st.user.email));
    }
  }, [st.user, st.role]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    LS.set('cb_notifications', updated);
  };

  const clearAll = () => {
    setNotifications([]);
    LS.set('cb_notifications', []);
    setOpen(false);
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button 
        className="db-icon-btn" 
        onClick={() => setOpen(!open)}
        style={{ position: 'relative' }}
      >
        <Bell size={17} />
        {unreadCount > 0 && (
          <div style={{ position: 'absolute', top: 7, right: 7, width: 8, height: 8, background: '#FF9431', borderRadius: '50%', border: '2px solid #fff' }} />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 10px)',
              right: 0,
              width: 340,
              maxHeight: 440,
              background: '#fff',
              borderRadius: 16,
              border: '1.5px solid #E8EDF5',
              boxShadow: '0 20px 60px rgba(15,23,42,0.12), 0 4px 16px rgba(15,23,42,0.06)',
              overflow: 'hidden',
              zIndex: 999999
            }}
          >
            {/* Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: 16, fontWeight: 900, color: '#0f172a', margin: 0 }}>Notifications</h4>
              <div style={{ display: 'flex', gap: 8 }}>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} style={{ background: 'none', border: 'none', color: '#FF9431', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>Mark all read</button>
                )}
                <button onClick={clearAll} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 4 }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* List */}
            <div style={{ maxHeight: 340, overflowY: 'auto', padding: '8px' }}>
              {notifications.length === 0 ? (
                <div style={{ padding: '48px 24px', textAlign: 'center', color: '#94a3b8' }}>
                  <Bell size={32} style={{ marginBottom: 12, opacity: 0.3 }} />
                  <p style={{ fontSize: 14, fontWeight: 700 }}>No notifications yet</p>
                </div>
              ) : (
                notifications.map(n => {
                  const Icon = iconMap[n.type] || Bell;
                  const color = colorMap[n.type] || '#64748b';
                  return (
                    <div
                      key={n.id}
                      style={{
                        display: 'flex',
                        gap: 14,
                        padding: '14px 16px',
                        borderRadius: 16,
                        background: n.read ? 'transparent' : '#FF943108',
                        marginBottom: 4,
                        transition: '0.2s'
                      }}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: 12, background: color + '12', color, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                        <Icon size={16} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 800, color: '#0f172a', marginBottom: 2 }}>{n.title}</div>
                        <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500, lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.msg}</div>
                      </div>
                      {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF9431', marginTop: 6, flexShrink: 0 }} />}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer to View All */}
            <div style={{ padding: '12px', borderTop: '1px solid #f1f5f9', background: '#f8fafc', textAlign: 'center' }}>
              <button
                onClick={() => {
                  setOpen(false);
                  if (st.role === 'creator') {
                    navigate('/creator/notifications');
                  } else if (st.role === 'brand') {
                    navigate('/brand/notifications');
                  } else {
                    navigate('/notifications');
                  }
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FF9431',
                  fontSize: '12.5px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4
                }}
              >
                <span>View All Alerts</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
