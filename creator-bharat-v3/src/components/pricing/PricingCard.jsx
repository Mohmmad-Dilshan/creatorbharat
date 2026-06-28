import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { Btn } from '@/components/common/Primitives';

export default function PricingCard({ plan, delay = 0, navigate, onSelectPlan }) {
  const isPro = plan.id === 'pro' || plan.id === 'brand_pro';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: isPro ? '#fff' : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        borderRadius: '40px',
        padding: '56px 40px',
        border: `1.5px solid ${isPro ? '#FF9431' : 'rgba(0,0,0,0.04)'}`,
        boxShadow: isPro ? '0 40px 80px rgba(255, 148, 49, 0.12)' : '0 20px 40px rgba(0,0,0,0.02)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        zIndex: isPro ? 2 : 1
      }}
    >
      {isPro && (
        <div style={{ 
          position: 'absolute', 
          top: '-20px', 
          left: '50%', 
          transform: 'translateX(-50%)',
          background: 'linear-gradient(90deg, #FF9431, #EA580C)', 
          color: '#fff', 
          padding: '8px 20px', 
          borderRadius: '100px', 
          fontSize: '12px', 
          fontWeight: 950,
          letterSpacing: '0.1em',
          boxShadow: '0 10px 20px rgba(255, 148, 49, 0.3)',
          whiteSpace: 'nowrap'
        }}>
          ELITE SELECTION
        </div>
      )}

      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '28px', fontWeight: 950, color: '#0f172a', marginBottom: '12px', letterSpacing: '-0.02em' }}>{plan.name}</h3>
        <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.6', margin: 0, fontWeight: 500 }}>{plan.desc}</p>
        
        {plan.promo && (
          <div style={{
            marginTop: '16px',
            padding: '12px 16px',
            background: 'linear-gradient(90deg, #10B98115, #05966915)',
            border: '1.5px dashed #10B98140',
            borderRadius: '16px',
            color: '#059669',
            fontSize: '13px',
            fontWeight: 850,
            lineHeight: 1.4,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Sparkles size={14} color="#10B981" style={{ flexShrink: 0 }} />
            <span>{plan.promo}</span>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span style={{ fontSize: '64px', fontWeight: 950, color: isPro ? '#FF9431' : '#0f172a', letterSpacing: '-0.05em' }}>{plan.price}</span>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#94a3b8' }}>/{plan.period}</span>
        </div>
      </div>

      <div style={{ flex: 1, marginBottom: '48px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {plan.features.map((feature) => (
          <div key={feature} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ 
              width: '24px', 
              height: '24px', 
              background: isPro ? '#FF943115' : '#10B98115', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '2px'
            }}>
              <Check size={14} color={isPro ? '#FF9431' : '#10B981'} strokeWidth={3} />
            </div>
            <span style={{ fontSize: '15px', color: '#475569', fontWeight: 600, lineHeight: '1.5' }}>{feature}</span>
          </div>
        ))}
      </div>

      <Btn 
        full 
        lg={isPro}
        onClick={() => onSelectPlan ? onSelectPlan(plan) : navigate('/join')}
        style={{
          padding: '20px',
          borderRadius: '100px',
          background: isPro ? '#0f172a' : '#fff',
          color: isPro ? '#fff' : '#0f172a',
          border: isPro ? 'none' : '1.5px solid #f1f5f9',
          fontSize: '16px',
          fontWeight: 950,
          boxShadow: isPro ? '0 15px 30px rgba(15, 23, 42, 0.2)' : 'none'
        }}
      >
        {plan.cta} <ArrowRight size={18} />
      </Btn>
    </motion.div>
  );
}

PricingCard.propTypes = {
  plan: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    cta: PropTypes.string.isRequired,
    promo: PropTypes.string
  }).isRequired,
  delay: PropTypes.number,
  navigate: PropTypes.func.isRequired,
  onSelectPlan: PropTypes.func
};

