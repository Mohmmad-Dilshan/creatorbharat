import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LiveAnalyticsPulse() {
  const [activeTab, setActiveTab] = useState('reach');
  const [brokerageVal, setBrokerageVal] = useState(150000); // 1.5 Lakh Campaign Value

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      borderRadius: '32px',
      padding: '32px',
      backdropFilter: 'blur(30px)',
      marginTop: '60px',
      boxShadow: '0 24px 80px rgba(0, 0, 0, 0.4)'
    }}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {[
          { id: 'reach', label: '⚡ Regional Coverage' },
          { id: 'savings', label: '💰 Brokerage Calculator' },
          { id: 'campaigns', label: '🎯 Live Engagements' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: '10px 20px',
              borderRadius: '100px',
              border: activeTab === t.id ? '1px solid rgba(255,148,49,0.3)' : '1px solid rgba(255,255,255,0.06)',
              background: activeTab === t.id ? 'rgba(255,148,49,0.1)' : 'transparent',
              color: activeTab === t.id ? '#FF9431' : 'rgba(255,255,255,0.6)',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === 'reach' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              {[
                { zone: 'Tier-2 Hubs', percentage: '45%', cities: 'Bhilwara, Jaipur, Indore' },
                { zone: 'Tier-3 Towns', percentage: '40%', cities: 'Udaipur, Kota, Dewas' },
                { zone: 'Metros Coverage', percentage: '15%', cities: 'Mumbai, Delhi, Bangalore' }
              ].map(item => (
                <div key={item.zone} style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>{item.zone}</div>
                  <div style={{ fontSize: '32px', fontWeight: 950, color: '#fff', margin: '8px 0', fontFamily: "'Outfit', sans-serif" }}>{item.percentage}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{item.cities}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'savings' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', marginBottom: '12px' }}>
                  <span style={{ fontWeight: 800, fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>CAMPAIGN BUDGET:</span>
                  <span style={{ fontWeight: 950, color: '#FF9431', fontFamily: "'Outfit', sans-serif" }}>₹{brokerageVal.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="1000000"
                  step="10000"
                  value={brokerageVal}
                  onChange={(e) => setBrokerageVal(Number(e.target.value))}
                  style={{
                    width: '100%',
                    height: '6px',
                    borderRadius: '3px',
                    background: 'rgba(255,255,255,0.1)',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '8px', fontWeight: 900 }}>
                  <span>₹20,000</span>
                  <span>₹10,00,000</span>
                </div>
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.15)', borderRadius: '24px', padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', color: '#10B981', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Net Brokerage Saved</div>
                <div style={{ fontSize: '40px', fontWeight: 950, color: '#10B981', margin: '8px 0', fontFamily: "'Outfit', sans-serif" }}>₹{(brokerageVal * 0.18).toLocaleString('en-IN')}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Saved via our 0% Broker Fee Infrastructure vs typical agencies charging 18%</div>
              </div>
            </div>
          )}

          {activeTab === 'campaigns' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {[
                { client: 'Agri-Tech Brand', town: 'Jaipur Rural', reach: '500K+', status: 'Completed' },
                { client: 'Regional E-Commerce', town: 'Bhilwara Town', reach: '200K+', status: 'Active' },
                { client: 'D2C Retailer', town: 'Indore Suburban', reach: '1.2M+', status: 'Escrow Secured' }
              ].map((c) => (
                <div key={c.client} style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 900, color: '#fff' }}>{c.client}</span>
                      <span style={{ fontSize: '9px', fontWeight: 900, color: c.status === 'Active' ? '#FF9431' : '#10B981', background: c.status === 'Active' ? 'rgba(255,148,49,0.1)' : 'rgba(16,185,129,0.1)', padding: '4px 8px', borderRadius: '100px', textTransform: 'uppercase' }}>{c.status}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '6px' }}>{c.town}</div>
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 950, color: '#fff', marginTop: '16px', fontFamily: "'Outfit', sans-serif" }}>{c.reach} <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Target Reach</span></div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
