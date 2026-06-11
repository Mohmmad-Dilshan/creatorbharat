import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Users, Megaphone, Shield, ArrowRight, ShieldCheck } from 'lucide-react';
import { Card, Btn, Bdg } from '../common/Primitives';
import { useApp } from '@/core/context';

export default function CreatorUnionAlert({ mob }) {
  const navigate = useNavigate();
  const { st } = useApp();

  // Smart navigation based on login state
  const handleJoinUnion = () => {
    if (st?.user && st?.role === 'creator') {
      // Already a creator → go to their dashboard/community
      navigate('/creator/dashboard');
    } else if (st?.user && st?.role === 'brand') {
      // Brand → show them creator landing page
      navigate('/creator-hub');
    } else {
      // Guest → sign up as creator
      navigate('/apply');
    }
  };

  const isCreator = st?.user && st?.role === 'creator';
  const btnLabel = isCreator ? 'Go to My Dashboard →' : 'Join the Union Free →';

  return (
    <section style={{ padding: mob ? '60px 20px' : '100px 40px', background: '#fcfcfc', borderBottom: '1px solid #f1f5f9' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#EF4444', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <AlertTriangle size={14} />
          </motion.div>
          Creator Union — Crisis Protection Active
        </div>

        <h2 style={{ fontSize: mob ? '32px' : '52px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.04em', marginBottom: '24px', lineHeight: 1.1 }}>
          Never face a{' '}
          <span style={{ color: '#EF4444' }}>payment default</span>{' '}
          alone again.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          
          {/* Left: Info */}
          <div>
            <p style={{ fontSize: mob ? '16px' : '18px', color: '#475569', lineHeight: 1.7, fontWeight: 500, marginBottom: '32px' }}>
              CreatorBharat acts as your <strong style={{ color: '#0f172a' }}>collective union</strong>. If a brand defaults, breaches contract, or violates creator rights — our Crisis Alert system notifies the entire network and initiates legal mediation on your behalf.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
              {[
                { icon: Shield, text: 'Escrow-backed contracts ensure 100% payment safety.', color: '#EF4444' },
                { icon: Megaphone, text: 'Community-wide brand blacklisting for bad actors.', color: '#F59E0B' },
                { icon: Users, text: 'Free legal mediation support for all verified creators.', color: '#10B981' },
                { icon: ShieldCheck, text: 'Collective appeal filing on Instagram/YouTube suspensions.', color: '#3B82F6' },
              ].map((item) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: item.color + '12', color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <item.icon size={20} />
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', lineHeight: 1.4 }}>{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button — smart navigation */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Btn
                lg
                onClick={handleJoinUnion}
                style={{
                  background: '#EF4444',
                  color: '#fff',
                  borderRadius: '100px',
                  padding: mob ? '16px 32px' : '18px 40px',
                  fontSize: mob ? '15px' : '17px',
                  fontWeight: 950,
                  boxShadow: '0 15px 30px rgba(239,68,68,0.25)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                {btnLabel}
              </Btn>
            </motion.div>

            {/* Sub text based on login */}
            <p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600, marginTop: '14px' }}>
              {isCreator
                ? 'You are already part of the Creator Union ✓'
                : 'Free to join · No credit card required · Instant access'}
            </p>
          </div>

          {/* Right: Live Crisis Feed */}
          <Card style={{ padding: '32px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <motion.div
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444', boxShadow: '0 0 8px #EF4444' }}
                />
                <span style={{ fontSize: '13px', fontWeight: 900, color: '#991B1B', textTransform: 'uppercase', letterSpacing: '1px' }}>Live Crisis Feed</span>
              </div>
              <Bdg color="red" sm>Protected</Bdg>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { brand: 'Brand X', issue: 'Payment Default (₹40,000)', status: 'Blacklisted', time: '2h ago' },
                { brand: 'Agency Y', issue: 'Unfair Contract Terms', status: 'Under Review', time: '5h ago' },
                { brand: 'StartupZ', issue: 'Non-payment after delivery', status: 'Resolved ✓', time: 'Yesterday' },
              ].map((alert) => (
                <motion.div
                  key={alert.brand}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  style={{ padding: '18px 20px', background: '#fff', borderRadius: '18px', boxShadow: '0 4px 12px rgba(239,68,68,0.05)', border: '1px solid #FEE2E2' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 900, color: '#0f172a', fontSize: '15px' }}>{alert.brand}</span>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: alert.status === 'Blacklisted' ? '#EF4444' : alert.status.includes('Resolved') ? '#10B981' : '#F59E0B', background: alert.status === 'Blacklisted' ? '#FEF2F2' : alert.status.includes('Resolved') ? '#F0FDF4' : '#FFFBEB', padding: '3px 10px', borderRadius: '100px' }}>{alert.status}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>{alert.issue}</span>
                    <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>{alert.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Join CTA inside card */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={handleJoinUnion}
              style={{ width: '100%', marginTop: '20px', padding: '14px', borderRadius: '18px', background: '#EF4444', color: '#fff', border: 'none', fontWeight: 900, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 8px 20px rgba(239,68,68,0.2)' }}
            >
              <Shield size={16} /> Protect My Creator Rights
            </motion.button>
          </Card>

        </div>
      </div>
    </section>
  );
}
