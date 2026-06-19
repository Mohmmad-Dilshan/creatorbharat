import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers, Zap, ShoppingBag, Plus } from 'lucide-react';
import { Card, Btn, Bdg } from '../common/Primitives';
import { useApp } from '@/core/context';

export default function CoCreationBundles({ mob }) {
  const navigate = useNavigate();
  const { st } = useApp();

  // Smart navigation for bundle purchase
  const handleBuyBundle = (bundle) => {
    if (st?.user && st?.role === 'brand') {
      // Brand logged in → go to campaign builder to create this type of campaign
      navigate('/campaign-builder');
    } else if (st?.user && st?.role === 'creator') {
      // Creator → show them co-creation community
      navigate('/creator/community');
    } else {
      // Guest → join as brand to purchase
      navigate('/brand-register');
    }
  };
  const bundles = [
    {
      title: 'Startup Growth Bundle',
      creators: ['Tech Reviewer', 'Business Coach', 'Lifestyle Vlogger'],
      reach: '500K+',
      price: '₹75,000'
    },
    {
      title: 'Festive Mega Launch',
      creators: ['Fashion Influencer', 'Makeup Artist', 'Photographer'],
      reach: '1M+',
      price: '₹1,50,000'
    }
  ];

  return (
    <section style={{ padding: mob ? '60px 20px' : '100px 40px', background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#8B5CF6', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', background: '#F5F3FF', padding: '8px 16px', borderRadius: '100px' }}>
            <Layers size={14} /> Co-Creation Bundles
          </div>
          <h2 style={{ fontSize: mob ? '32px' : '48px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.04em', marginBottom: '16px' }}>
            Deploy <span style={{ color: '#8B5CF6' }}>Creator Squads</span> with One Click.
          </h2>
          <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '600px', margin: '0 auto', fontWeight: 500, lineHeight: 1.6 }}>
            Don't waste time negotiating with 10 different creators. Our pre-packaged bundles deliver guaranteed ROI and massive reach instantly.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(2, 1fr)', gap: '32px' }}>
          {bundles.map((bundle, i) => (
            <Card key={i} style={{ padding: '32px', background: '#fff', borderRadius: '32px', border: '1px solid #ede9fe', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)', borderRadius: '50%', transform: 'translate(30%, -30%)' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', marginBottom: '8px' }}>{bundle.title}</h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Bdg color="purple"><Zap size={12} style={{ display: 'inline', marginRight: 4 }}/> {bundle.reach} Reach</Bdg>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Fixed Price</span>
                  <div style={{ fontSize: '24px', fontWeight: 950, color: '#8B5CF6' }}>{bundle.price}</div>
                </div>
              </div>
              
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '20px', marginBottom: '32px' }}>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '12px' }}>Squad Includes</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {bundle.creators.map((c, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', padding: '8px 12px', borderRadius: '8px', border: '1px solid #f1f5f9', fontSize: '14px', fontWeight: 700, color: '#475569' }}>
                      <Plus size={14} color="#8B5CF6"/> {c}
                    </div>
                  ))}
                </div>
              </div>
              
              <Btn full lg onClick={() => handleBuyBundle(bundle)} style={{ background: '#8B5CF6', color: '#fff', borderRadius: '16px' }}>
                <ShoppingBag size={18} />
                {st?.user && st?.role === 'brand' ? 'Launch Similar Campaign' : st?.user && st?.role === 'creator' ? 'Find Co-Creators' : 'Join as Brand to Purchase'}
              </Btn>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
