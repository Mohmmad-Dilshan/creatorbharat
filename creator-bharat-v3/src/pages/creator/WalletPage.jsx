import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fmt } from '../../utils/helpers';
import { useApp } from '@/core/context';
import { Card, Btn, Bdg, Bar } from '@/components/common/Primitives';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  Download,
  Building,
  ShieldCheck,
  Zap
} from 'lucide-react';
import AuthGatekeeper from '@/components/auth/AuthGatekeeper';

const TransactionItem = ({ tx, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="transaction-item"
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div className={`tx-icon-wrap ${tx.status === 'paid' ? 'paid' : 'pending'}`}>
        {tx.status === 'paid' ? <ArrowDownLeft size={20} /> : <Clock size={20} />}
      </div>
      <div className="tx-info">
        <h5 className="tx-title">{tx.campaign}</h5>
        <div className="tx-meta">
           <span>{tx.brand}</span>
           <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#cbd5e1' }} />
           <span>{fmt.date(tx.date)}</span>
        </div>
      </div>
    </div>
    <div style={{ textAlign: 'right' }}>
      <div className="tx-amount">{tx.amount > 0 ? '+' : ''}{fmt.inr(tx.amount)}</div>
      <div style={{ marginTop: '4px' }}>
         <Bdg sm color={(() => {
            if (tx.status === 'paid') return 'green';
            if (tx.status === 'processing') return 'blue';
            return 'orange';
         })()}>
            {tx.status?.toUpperCase()}
         </Bdg>
      </div>
    </div>
  </motion.div>
);

TransactionItem.propTypes = {
  tx: PropTypes.shape({
    id: PropTypes.string.isRequired,
    campaign: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }).isRequired,
  delay: PropTypes.number
};

export default function WalletPage() {
  const { st } = useApp();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  
  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  // Auth Gatekeeper
  if (!st.user || st.role !== 'creator') {
    return <AuthGatekeeper mob={mob} />;
  }

  const earnings = [
    { id: 'tx1', campaign: 'Summer Glow Skincare', brand: 'Nykaa', amount: 15000, status: 'paid', date: '2026-04-15' },
    { id: 'tx2', campaign: 'iPhone 17 Launch', brand: 'Apple India', amount: 45000, status: 'pending', date: '2026-05-01' },
    { id: 'tx3', campaign: 'Local Food Fest', brand: 'Zomato', amount: 5000, status: 'processing', date: '2026-05-05' },
    { id: 'tx4', campaign: 'Travel Series: Goa', brand: 'MakeMyTrip', amount: 12000, status: 'paid', date: '2026-04-10' },
  ];

  const totalPaid = earnings.filter(e => e.status === 'paid').reduce((acc, curr) => acc + curr.amount, 0);
  const totalPending = earnings.filter(e => e.status !== 'paid').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="dashboard-page-container">
      
      {/* Header */}
      <div className="db-page-header">
        <div className="badge-saffron">
           <Wallet size={14} fill="#FF9431" /> TREASURY
        </div>
        <h1 className="page-title">Earnings & Wallet</h1>
        <p className="db-sub-text">Track your commercial growth and manage seamless payouts.</p>
      </div>

      {/* Top Snapshot Cards */}
      <div className="db-stat-grid">
         
         {/* Main Balance Card */}
         <div className="wallet-balance-card">
            <div className="balance-glow" />
            <div style={{ position: 'relative', zIndex: 1 }}>
               <p className="balance-label">Available for Withdrawal</p>
               <h2 className="balance-value">{fmt.inr(totalPaid)}</h2>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontSize: '14px', fontWeight: 800 }}>
                  <TrendingUp size={16} /> +₹8,450 this month
               </div>
               <button className="btn-primary-pill" style={{ width: '100%', marginTop: '32px', background: '#FF9431', boxShadow: '0 10px 30px rgba(255,148,49,0.3)' }}>
                  WITHDRAW TO BANK
               </button>
            </div>
         </div>

         {/* In-Transit Card */}
         <Card className="wallet-stat-card">
            <p className="db-sidebar-label" style={{ marginBottom: 16 }}>In-Transit (Pending)</p>
            <h2 className="db-stat-value" style={{ fontSize: 44 }}>{fmt.inr(totalPending)}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3B82F6', fontSize: '14px', fontWeight: 800, marginTop: 8 }}>
               <Clock size={16} /> 3 Campaigns active
            </div>
            <div style={{ marginTop: '32px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', fontWeight: 800, color: '#64748b' }}>
                  <span>Verification Progress</span>
                  <span>65%</span>
               </div>
               <Bar value={65} color="#3B82F6" height={6} />
            </div>
         </Card>

         {/* Performance Card */}
         <Card className="wallet-stat-card">
            <p className="db-sidebar-label" style={{ marginBottom: 16 }}>Avg. Deal Size</p>
            <h2 className="db-stat-value" style={{ fontSize: 44 }}>{fmt.inr(Math.round((totalPaid + totalPending) / 4))}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7C3AED', fontSize: '14px', fontWeight: 800, marginTop: 8 }}>
               <Zap size={16} fill="#7C3AED" /> Elite Tier Performance
            </div>
            <div style={{ marginTop: '32px', display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
               <div style={{ flex: 1, height: '40px', background: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 800, color: '#475569' }}>Q1</div>
               <div style={{ flex: 1, height: '60px', background: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 800, color: '#475569' }}>Q2</div>
               <div style={{ flex: 1, height: '80px', background: '#FF9431', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 900, color: '#fff' }}>Q3</div>
            </div>
         </Card>
      </div>

      {/* Transaction Stream & Settings */}
      <div className="db-main-grid">
         
         {/* Transaction History */}
         <div className="db-col-right" style={{ order: mob ? 2 : 1 }}>
            <div className="section-header">
               <h3 className="db-section-title">Transaction History</h3>
               <button className="btn-text-saffron">
                  <Download size={16} /> Statement
               </button>
            </div>
            
            <div className="transaction-list">
               {earnings.map((tx, i) => (
                 <TransactionItem key={tx.id} tx={tx} delay={i * 0.1} />
               ))}
            </div>

            <button className="btn-secondary-pill" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
               LOAD PREVIOUS MONTHS
            </button>
         </div>

         {/* Sidebar Tools */}
         <div className="db-col-left" style={{ order: mob ? 1 : 2 }}>
            
            {/* Payout Destination */}
            <Card className="payout-card">
               <h4 style={{ fontSize: '16px', fontWeight: 900, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Building size={18} color="#FF9431" /> Payout Destination
               </h4>
               <div className="bank-details-box">
                  <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
                     <CheckCircle2 size={18} color="#FF9431" />
                  </div>
                  <p className="db-sidebar-label" style={{ color: '#94a3b8', marginBottom: 4 }}>Primary Account</p>
                  <p style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a' }}>HDFC Bank •••• 4242</p>
                  <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, marginTop: '4px' }}>Verified & Linked</p>
               </div>
               <button style={{ width: '100%', marginTop: '16px', padding: '14px', background: 'none', border: '1px dashed #cbd5e1', borderRadius: '16px', color: '#64748b', fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}>
                  + Update Bank Details
               </button>
            </Card>

            {/* Compliance / Tax */}
            <Card className="compliance-card" style={{ marginTop: 24 }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <ShieldCheck size={20} color="#FF9431" />
                  <h4 style={{ fontSize: '16px', fontWeight: 900, color: '#9A3412' }}>GST & Tax Compliance</h4>
               </div>
               <p style={{ fontSize: '14px', color: '#9A3412', lineHeight: 1.6, fontWeight: 500, marginBottom: '24px' }}>
                 Register your GST to claim Input Tax Credit on brand commissions and professional payouts.
               </p>
               <Btn full sm className="btn-primary-pill" style={{ background: '#FF9431', border: 'none', height: 'auto', padding: 12 }}>UPDATE GST INFO</Btn>
            </Card>

            {/* Help / Dispute */}
            <div style={{ textAlign: 'center', padding: '24px 20px' }}>
               <p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>
                 Missing a payout? <button style={{ background: 'none', border: 'none', color: '#FF9431', fontWeight: 800, cursor: 'pointer', padding: 0 }}>Open Dispute</button>
               </p>
            </div>

         </div>

      </div>
    </div>
  );
}
