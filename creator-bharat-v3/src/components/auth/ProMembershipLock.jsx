import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/core/context';
import { Btn } from '@/components/common/Primitives';
import { Lock, Sparkles, BarChart3, CalendarDays, Inbox } from 'lucide-react';

const ProMembershipLock = ({ children }) => {
  const { st } = useApp();
  const navigate = useNavigate();

  const isPro = st.isPro || localStorage.getItem('cb_is_pro') === 'true';

  if (isPro) return children;

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Blurred background glimpse */}
      <div style={{ filter: 'blur(10px)', pointerEvents: 'none', userSelect: 'none', opacity: 0.35, position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {children}
      </div>

      {/* Modern Glass Lock Overlay */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        style={{ 
          background: 'rgba(255, 255, 255, 0.85)',
          border: '1.5px solid rgba(255, 148, 49, 0.15)',
          borderRadius: '32px',
          padding: '40px 32px',
          maxWidth: '480px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 30px 60px rgba(15,23,42,0.1)',
          backdropFilter: 'blur(16px)',
          zIndex: 10,
          position: 'relative'
        }}
      >
        <div style={{ 
          width: '64px', height: '64px', background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(255,148,49,0.1) 100%)', 
          borderRadius: '20px', display: 'flex', alignItems: 'center', 
          justifyContent: 'center', margin: '0 auto 24px', color: '#8B5CF6'
        }}>
          <Sparkles size={28} />
        </div>

        <h3 style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a', marginBottom: '8px', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.5px' }}>
          Upgrade to Pro Membership
        </h3>
        <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 650, marginBottom: '28px', lineHeight: 1.5 }}>
          Unlock premium campaigns, real-time analytics, content schedules, and direct brand pitch inbox.
        </p>

        {/* Feature List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36, textAlign: 'left', background: '#f8fafc', padding: 20, borderRadius: 20, border: '1px solid #e2e8f0' }}>
          {[
            { icon: BarChart3, title: 'Real-time Analytics', desc: 'Detailed visitor logs, conversion rates, and ER metrics.' },
            { icon: CalendarDays, title: 'Campaign Content Calendar', desc: 'Plan shoots, manage deadlines, and track posting dates.' },
            { icon: Inbox, title: 'Direct Brand Pitch Inbox', desc: 'Chat directly with premium brands and receive custom contract offers.' }
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: '#fff', border: '1px solid #e2e8f0', display: 'grid', placeItems: 'center', color: '#ff9431', flexShrink: 0 }}>
                <item.icon size={16} />
              </div>
              <div>
                <h4 style={{ fontSize: 13, fontWeight: 900, color: '#1e293b', margin: '0 0 2px' }}>{item.title}</h4>
                <p style={{ fontSize: 11, color: '#64748b', fontWeight: 600, margin: 0, lineHeight: 1.4 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Btn full lg onClick={() => navigate('/creator/monetization')} style={{ background: 'linear-gradient(135deg, #FF9431 0%, #8B5CF6 100%)', border: 'none', borderRadius: '100px', height: '56px', fontWeight: 900 }}>
            Upgrade to Pro Now
          </Btn>
          <Btn full lg variant="ghost" onClick={() => navigate('/creator/dashboard')} style={{ borderRadius: '100px', color: '#475569', fontWeight: 800 }}>
            Back to Dashboard
          </Btn>
        </div>
      </motion.div>
    </div>
  );
};

ProMembershipLock.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProMembershipLock;
