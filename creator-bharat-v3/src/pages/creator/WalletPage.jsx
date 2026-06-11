import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { fmt, LS } from '../../utils/helpers';
import { useApp } from '@/core/context';
import { Card, Btn, Bdg, Bar } from '@/components/common/Primitives';
import { motion, AnimatePresence } from 'framer-motion';
import Seo from '@/components/common/SEO';
import { 
  Wallet, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  Building,
  ShieldCheck,
  Zap,
  X,
  ArrowRight
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
      <div className="tx-amount" style={{ color: tx.amount < 0 ? '#ef4444' : '#1e293b' }}>
        {tx.amount > 0 ? '+' : ''}{fmt.inr(tx.amount)}
      </div>
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
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [filter, setFilter] = useState('ALL'); // ALL, PAID, PENDING
  const [modalOpen, setModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawing, setWithdrawing] = useState(false);
  const [subTab, setSubTab] = useState('transactions'); // 'transactions' | 'referrals'
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const isPro = st.isPro || localStorage.getItem('cb_is_pro') === 'true';
  const myCreators = LS.get('cb_creators', []);
  const c = st.user?.creatorProfile || myCreators.find(cr => cr.email === st.user?.email) || {};

  // Stateful ledger with local storage syncing
  const [ledger, setLedger] = useState(() => {
    const saved = localStorage.getItem('cb_ledger_payouts');
    if (saved) return JSON.parse(saved);
    const initialLedger = [
      { id: 'tx1', campaign: 'Summer Glow Skincare', brand: 'Nykaa', amount: 15000, status: 'paid', date: '2026-04-15' },
      { id: 'tx2', campaign: 'iPhone 17 Launch', brand: 'Apple India', amount: 45000, status: 'pending', date: '2026-05-01' },
      { id: 'tx3', campaign: 'Local Food Fest', brand: 'Zomato', amount: 5000, status: 'processing', date: '2026-05-05' },
      { id: 'tx4', campaign: 'Travel Series: Goa', brand: 'MakeMyTrip', amount: 12000, status: 'paid', date: '2026-04-10' },
    ];
    localStorage.setItem('cb_ledger_payouts', JSON.stringify(initialLedger));
    return initialLedger;
  });

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type, msg } });

  // Auth Gatekeeper
  if (!st.user || st.role !== 'creator') {
    return <AuthGatekeeper mob={mob} />;
  }

  // Calculate sums
  const totalPaid = ledger.filter(e => e.status === 'paid').reduce((acc, curr) => acc + curr.amount, 0);
  const totalPending = ledger.filter(e => e.status !== 'paid' && e.amount > 0).reduce((acc, curr) => acc + curr.amount, 0);

  // Apply filters
  const filteredLedger = ledger.filter(tx => {
    if (filter === 'PAID') return tx.status === 'paid';
    if (filter === 'PENDING') return tx.status === 'pending' || tx.status === 'processing';
    return true;
  });

  const handleWithdrawalSubmit = (e) => {
    e.preventDefault();
    const amount = Number(withdrawAmount);
    
    if (!withdrawAmount || Number.isNaN(amount) || amount <= 0) {
      toast('Please enter a valid amount to withdraw.', 'error');
      return;
    }
    if (amount > totalPaid) {
      toast('Insufficient available balance to initiate withdrawal.', 'error');
      return;
    }

    setWithdrawing(true);
    setTimeout(() => {
      // Create new transaction in ledger
      const newTx = {
        id: 'tx-' + Date.now(),
        campaign: 'Bank Payout Settlement',
        brand: 'Razorpay Instant Payouts',
        amount: -amount,
        status: 'processing',
        date: new Date().toISOString().split('T')[0]
      };
      
      // Also adjust NYKAA and other paid ones by creating an offsetting transaction
      // For visual simplicity in the dashboard, we reduce the balance by subtracting
      const updatedLedger = [
        newTx,
        ...ledger.map(t => {
          // If we had simple transactions, we keep them but balance will dynamically recalculate 
          // because totalPaid subtracts negative amounts too!
          return t;
        })
      ];
      
      setLedger(updatedLedger);
      localStorage.setItem('cb_ledger_payouts', JSON.stringify(updatedLedger));
      
      setWithdrawing(false);
      setModalOpen(false);
      setWithdrawAmount('');
      toast(`Withdrawal of ${fmt.inr(amount)} initiated successfully via Razorpay!`, 'success');
    }, 2000);
  };

  return (
    <div className="dashboard-page-container">
      <Seo title="Wallet & Earnings | CreatorBharat" description="Track your creator earnings and manage payouts securely." />
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
                  <TrendingUp size={16} /> Instant bank settlements enabled
               </div>
               <button 
                 onClick={() => {
                   if (!isPro) {
                     setShowUpgradeModal(true);
                     return;
                   }
                   setModalOpen(true);
                 }}
                 className="btn-primary-pill" 
                 disabled={totalPaid <= 0}
                 style={{ 
                   width: '100%', 
                   marginTop: '32px', 
                   background: totalPaid <= 0 ? '#cbd5e1' : '#FF9431', 
                   boxShadow: totalPaid <= 0 ? 'none' : '0 10px 30px rgba(255,148,49,0.3)',
                   cursor: totalPaid <= 0 ? 'not-allowed' : 'pointer'
                 }}
               >
                  WITHDRAW TO BANK
               </button>
            </div>
         </div>

         {/* In-Transit Card */}
         <Card className="wallet-stat-card">
            <p className="db-sidebar-label" style={{ marginBottom: 16 }}>In-Transit (Pending)</p>
            <h2 className="db-stat-value" style={{ fontSize: 44 }}>{fmt.inr(totalPending)}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3B82F6', fontSize: '14px', fontWeight: 800, marginTop: 8 }}>
               <Clock size={16} /> Escrow safety verified
            </div>
            <div style={{ marginTop: '32px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', fontWeight: 800, color: '#64748b' }}>
                  <span>Verification Progress</span>
                  <span>100% Secure</span>
               </div>
               <Bar value={100} color="#3B82F6" height={6} />
            </div>
         </Card>

         {/* Performance Card */}
         <Card className="wallet-stat-card">
            <p className="db-sidebar-label" style={{ marginBottom: 16 }}>Avg. Deal Size</p>
            <h2 className="db-stat-value" style={{ fontSize: 44 }}>{fmt.inr(19250)}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7C3AED', fontSize: '14px', fontWeight: 800, marginTop: 8 }}>
               <Zap size={16} fill="#7C3AED" /> Elite Tier Performance
            </div>
            <div style={{ marginTop: '32px', display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
               <div style={{ flex: 1, height: '40px', background: 'var(--db-header-border, #f8fafc)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 800, color: 'var(--db-text-secondary, #475569)' }}>Q1</div>
               <div style={{ flex: 1, height: '60px', background: 'var(--db-header-border, #f8fafc)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 800, color: 'var(--db-text-secondary, #475569)' }}>Q2</div>
               <div style={{ flex: 1, height: '80px', background: '#FF9431', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 900, color: '#fff' }}>Q3</div>
            </div>
         </Card>
      </div>

      {/* Sub-Tab Switcher */}
      <div style={{ display: 'flex', background: 'var(--db-header-border, rgba(15, 23, 42, 0.05))', padding: 4, borderRadius: 16, width: 'fit-content', marginBottom: 28, gap: 4 }}>
        <button
          onClick={() => setSubTab('transactions')}
          style={{
            padding: '10px 20px', borderRadius: 12, border: 'none', cursor: 'pointer',
            background: subTab === 'transactions' ? 'var(--db-card-bg, #fff)' : 'transparent',
            color: subTab === 'transactions' ? 'var(--db-text-primary, #0f172a)' : 'var(--db-text-secondary, #64748b)',
            fontSize: 14, fontWeight: 800,
            boxShadow: subTab === 'transactions' ? '0 2px 8px rgba(0,0,0,0.04)' : 'none'
          }}
        >
          💰 Transaction History
        </button>
        <button
          onClick={() => setSubTab('referrals')}
          style={{
            padding: '10px 20px', borderRadius: 12, border: 'none', cursor: 'pointer',
            background: subTab === 'referrals' ? 'var(--db-card-bg, #fff)' : 'transparent',
            color: subTab === 'referrals' ? 'var(--db-text-primary, #0f172a)' : 'var(--db-text-secondary, #64748b)',
            fontSize: 14, fontWeight: 800,
            boxShadow: subTab === 'referrals' ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          🤝 Referral Rewards
          <Bdg color="green" sm>₹199/ref</Bdg>
        </button>
      </div>

      {/* Transaction Stream & Settings */}
      {subTab === 'transactions' && (
      <div className="db-main-grid">
         
         {/* Transaction History */}
         <div className="db-col-right" style={{ order: mob ? 2 : 1 }}>
            <div className="section-header flex-column-mobile" style={{ alignItems: 'flex-start', gap: 12 }}>
               <div>
                 <h3 className="db-section-title">Transaction History</h3>
                 <p className="db-sub-text" style={{ margin: 0 }}>View escrow balances and past payments</p>
               </div>
               
               {/* Categories Filters Tab */}
               <div className="ledger-filter-tabs">
                 <button onClick={() => setFilter('ALL')} className={`filter-tab-btn ${filter === 'ALL' ? 'active' : ''}`}>All</button>
                 <button onClick={() => setFilter('PAID')} className={`filter-tab-btn ${filter === 'PAID' ? 'active' : ''}`}>Paid</button>
                 <button onClick={() => setFilter('PENDING')} className={`filter-tab-btn ${filter === 'PENDING' ? 'active' : ''}`}>Pending</button>
               </div>
            </div>
            
            <div className="transaction-list" style={{ marginTop: 24 }}>
               {filteredLedger.length === 0 ? (
                 <div style={{ padding: '60px 20px', textAlignment: 'center', color: '#94a3b8', fontWeight: 600 }}>
                   No transactions matched the selected filter.
                 </div>
               ) : (
                 filteredLedger.map((tx, i) => (
                   <TransactionItem key={tx.id} tx={tx} delay={i * 0.05} />
                 ))
               )}
            </div>
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
         </div>
      </div>
      )}

      {/* Referrals Sub-Tab Content */}
      {subTab === 'referrals' && (
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '2.2fr 1fr', gap: 32, marginTop: 16 }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Card style={{ padding: 32, borderRadius: 28, background: '#fff', border: '1px solid #f1f5f9' }}>
              <h3 style={{ fontSize: 18, fontWeight: 950, color: '#0f172a', marginBottom: 12 }}>Invite Creators & Earn Cashback</h3>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, fontWeight: 500, marginBottom: 24 }}>
                Aapke referral link se join karne wale har creator par aapko ₹199 cashback milega, jab wo apna profile verify karwa lenge. Ye cashback seedhe aapke wallet balance mein add ho jayega!
              </p>

              <div>
                <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'block', marginBottom: 8 }}>Mera Personal Referral Link</label>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <input 
                    type="text" 
                    readOnly 
                    value={`https://creatorbharat.com/join?ref=${c?.slug || 'elite-creator'}`}
                    style={{ flex: 1, padding: '14px 20px', border: '1px solid #e2e8f0', borderRadius: 16, background: '#f8fafc', fontSize: 14, fontWeight: 700, color: '#475569', outline: 'none' }}
                  />
                  <Btn onClick={() => { navigator.clipboard.writeText(`https://creatorbharat.com/join?ref=${c?.slug || 'elite-creator'}`); toast('Referral link copied to clipboard!', 'success'); }} style={{ background: '#0f172a', color: '#fff', borderRadius: 16, padding: '14px 24px', fontWeight: 800 }}>Copy</Btn>
                </div>
              </div>
            </Card>

            <Card style={{ padding: 32, borderRadius: 28, background: '#fff', border: '1px solid #f1f5f9' }}>
              <h3 style={{ fontSize: 18, fontWeight: 950, color: '#0f172a', marginBottom: 24 }}>Referral Network Status</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { name: 'Rahul Verma', niche: 'Tech Creator', city: 'Jaipur', status: 'verified', amount: '₹199' },
                  { name: 'Priya Singh', niche: 'Fashion Creator', city: 'Indore', status: 'verified', amount: '₹199' },
                  { name: 'Devendra Yadav', niche: 'Food Vlogger', city: 'Udaipur', status: 'pending', amount: 'Pending Verification' }
                ].map((ref, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, background: '#f8fafc', borderRadius: 20, border: '1px solid #f1f5f9' }}>
                    <div>
                      <h4 style={{ fontSize: 14, fontWeight: 850, color: '#0f172a', margin: '0 0 4px' }}>{ref.name}</h4>
                      <p style={{ fontSize: 12, color: '#64748b', fontWeight: 650, margin: 0 }}>{ref.niche} · {ref.city}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ display: 'block', fontSize: 14, fontWeight: 900, color: ref.status === 'verified' ? '#10B981' : '#FF9431' }}>{ref.amount}</span>
                      <Bdg color={ref.status === 'verified' ? 'green' : 'orange'} sm style={{ marginTop: 4 }}>{ref.status === 'verified' ? 'VERIFIED ✓' : 'PENDING PROFILE ⏳'}</Bdg>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Card style={{ padding: 24, borderRadius: 24, background: '#fff', border: '1px solid #f1f5f9' }}>
              <h4 style={{ fontSize: 15, fontWeight: 900, color: '#0f172a', marginBottom: 16 }}>Invite via Email</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <input 
                  type="email" 
                  placeholder="friend@example.com" 
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid #cbd5e1', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                />
                <Btn full style={{ background: '#FF9431', color: '#fff', borderRadius: 16, padding: '12px', fontWeight: 850 }} onClick={() => toast('Referral invitation sent successfully!', 'success')}>
                  Send Invitation
                </Btn>
              </div>
            </Card>

            <Card style={{ padding: 24, borderRadius: 24, background: '#0f172a', color: '#fff', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.15 }}><Zap size={100} color="#FF9431" /></div>
              <h4 style={{ fontSize: 15, fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', marginBottom: 12 }}>Referral Milestone</h4>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, fontWeight: 500, marginBottom: 16 }}>
                Refer 5 creators and complete your master checklist to unlock the <strong>Community Star Badge</strong>!
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 11, fontWeight: 800, color: '#FF9431' }}>
                <span>Milestone Progress</span>
                <span>2/5 Referred</span>
              </div>
              <Bar value={40} color="#FF9431" height={4} />
            </Card>
          </div>
        </div>
      )}

      {/* 4. PREMIUM BANK WITHDRAWAL SLIDE-OUT PANEL */}
      <AnimatePresence>
        {modalOpen && (
          <>
            {/* Backdrop Lock */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !withdrawing && setModalOpen(false)}
              className="modal-backdrop-shroud"
            />

            {/* Slide-out modal */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="payout-slide-panel"
            >
              <div className="slide-panel-header">
                <h3 className="panel-title">Initiate Payout</h3>
                <button 
                  onClick={() => setModalOpen(false)} 
                  disabled={withdrawing}
                  className="close-panel-btn"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleWithdrawalSubmit} className="slide-panel-body">
                
                {/* Balance display card */}
                <div className="panel-balance-indicator">
                  <span>Available Balance</span>
                  <h3>{fmt.inr(totalPaid)}</h3>
                </div>

                <div className="form-group-panel" style={{ marginTop: 32 }}>
                  <label htmlFor="withdraw-amount" className="panel-input-label">AMOUNT TO WITHDRAW (₹)</label>
                  <div className="amount-input-wrap">
                    <span className="currency-prefix">₹</span>
                    <input 
                      id="withdraw-amount"
                      type="number" 
                      value={withdrawAmount} 
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="Enter amount..."
                      disabled={withdrawing}
                      className="amount-text-field"
                    />
                  </div>
                  <div className="quick-amount-buttons">
                    <button type="button" onClick={() => setWithdrawAmount(String(Math.floor(totalPaid / 2)))} className="quick-amt-btn">50%</button>
                    <button type="button" onClick={() => setWithdrawAmount(String(totalPaid))} className="quick-amt-btn">Max</button>
                  </div>
                </div>

                <div className="form-group-panel" style={{ marginTop: 32 }}>
                  <span className="panel-input-label" style={{ display: 'block' }}>DESTINATION BANK ACCOUNT</span>
                  <div className="destination-bank-row">
                    <Building size={20} color="#FF9431" />
                    <div>
                      <strong>HDFC Bank •••• 4242</strong>
                      <p>Primary Instant Settlement</p>
                    </div>
                  </div>
                </div>

                {/* Submit action */}
                <div className="panel-submit-footer">
                  <Btn 
                    type="submit" 
                    disabled={withdrawing}
                    className="payout-confirm-btn"
                  >
                    {withdrawing ? (
                      <span className="flex-align-center" style={{ justifyContent: 'center' }}>
                        <div className="dev-spinner" /> Settling with Razorpay...
                      </span>
                    ) : (
                      <span className="flex-align-center" style={{ justifyContent: 'center' }}>
                        Initiate Instant Settlement <ArrowRight size={16} style={{ marginLeft: 6 }} />
                      </span>
                    )}
                  </Btn>
                  
                  <div className="secure-payout-text">
                    <ShieldCheck size={14} color="#10B981" /> Secured by Razorpay Escrow Network.
                  </div>
                </div>

              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Pro Upgrade Modal */}
      <AnimatePresence>
        {showUpgradeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
            onClick={() => setShowUpgradeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ background: '#fff', borderRadius: 32, padding: 40, maxWidth: 400, width: '100%', textAlign: 'center', boxShadow: '0 40px 80px rgba(0,0,0,0.2)' }}
            >
              <div style={{ width: 64, height: 64, borderRadius: 20, background: '#FF943112', display: 'grid', placeItems: 'center', margin: '0 auto 20px', color: '#FF9431' }}>
                <Zap size={28} fill="#FF9431" />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 950, color: '#0f172a', marginBottom: 10 }}>Pro Settlement Required</h3>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, marginBottom: 8 }}>
                Free plan creators can receive escrow payments but instant payouts are locked.
              </p>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, marginBottom: 28 }}>
                Upgrade to <strong>Creator Pro</strong> to enable instant bank withdrawals, automated GST invoicing, and zero transaction fees.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Btn full lg onClick={() => navigate('/creator/monetization')} style={{ background: '#FF9431', color: '#fff', borderRadius: 100, fontWeight: 950 }}>
                  Upgrade to Pro (₹49/mo)
                </Btn>
                <button onClick={() => setShowUpgradeModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .flex-column-mobile {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        @media (max-width: 768px) {
          .flex-column-mobile {
            flex-direction: column;
            align-items: flex-start;
          }
          .ledger-filter-tabs {
            margin-top: 12px;
            width: 100%;
          }
        }

        /* LEDGER CATEGORY FILTER TABS */
        .ledger-filter-tabs {
          display: flex;
          background: #f1f5f9;
          padding: 4px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .filter-tab-btn {
          border: none;
          background: transparent;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 850;
          color: #64748b;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-tab-btn.active {
          background: #ffffff;
          color: #FF9431;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        /* BANK PAYOUT SLIDE PANEL */
        .modal-backdrop-shroud {
          position: fixed;
          inset: 0;
          background: rgba(17, 24, 39, 0.25);
          backdrop-filter: blur(12px);
          z-index: 1000;
        }

        .payout-slide-panel {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          max-width: 440px;
          background: #ffffff;
          box-shadow: -10px 0 40px rgba(17, 24, 39, 0.1);
          z-index: 1001;
          display: flex;
          flex-direction: column;
          border-left: 1px solid #f1f5f9;
          animation-fill-mode: forwards;
        }

        .slide-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 32px;
          border-bottom: 1px solid #f1f5f9;
        }

        .panel-title {
          font-size: 20px;
          font-weight: 950;
          color: #0f172a;
          letter-spacing: -0.4px;
          margin: 0;
        }

        .close-panel-btn {
          border: none;
          background: none;
          color: #64748b;
          cursor: pointer;
          padding: 6px;
          border-radius: 99px;
          display: grid;
          place-items: center;
          transition: background 0.2s ease;
        }

        .close-panel-btn:hover {
          background: #f1f5f9;
        }

        .slide-panel-body {
          padding: 32px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .panel-balance-indicator {
          background: linear-gradient(135deg, rgba(255, 148, 49, 0.04) 0%, rgba(255, 148, 49, 0.01) 100%);
          border: 1px solid rgba(255, 148, 49, 0.15);
          border-radius: 20px;
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
        }

        .panel-balance-indicator span {
          font-size: 12px;
          font-weight: 850;
          color: #FF9431;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .panel-balance-indicator h3 {
          font-size: 28px;
          font-weight: 950;
          color: #0f172a;
          margin: 6px 0 0 0;
          letter-spacing: -0.5px;
        }

        .panel-input-label {
          font-size: 11px;
          font-weight: 900;
          color: #64748b;
          letter-spacing: 0.8px;
          display: block;
          margin-bottom: 12px;
        }

        .amount-input-wrap {
          display: flex;
          align-items: center;
          border: 1px solid #cbd5e1;
          border-radius: 16px;
          padding: 14px 20px;
          background: #f8fafc;
          transition: border-color 0.2s ease;
        }

        .amount-input-wrap:focus-within {
          border-color: #FF9431;
        }

        .currency-prefix {
          font-size: 20px;
          font-weight: 950;
          color: #0f172a;
          margin-right: 8px;
        }

        .amount-text-field {
          border: none;
          background: transparent;
          font-size: 20px;
          font-weight: 950;
          color: #0f172a;
          width: 100%;
          outline: none;
        }

        .quick-amount-buttons {
          display: flex;
          gap: 8px;
          margin-top: 10px;
        }

        .quick-amt-btn {
          background: #f1f5f9;
          border: none;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 850;
          color: #64748b;
          border-radius: 8px;
          cursor: pointer;
        }

        .quick-amt-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .destination-bank-row {
          display: flex;
          align-items: center;
          gap: 16px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 16px;
        }

        .destination-bank-row strong {
          font-size: 14px;
          font-weight: 850;
          color: #0f172a;
        }

        .destination-bank-row p {
          font-size: 12px;
          color: #64748b;
          margin: 2px 0 0 0;
          font-weight: 600;
        }

        .panel-submit-footer {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .payout-confirm-btn {
          width: 100%;
          background: #111827;
          color: #ffffff;
          padding: 18px;
          border-radius: 16px;
          font-weight: 900;
          font-size: 15px;
          border: none;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(17, 24, 39, 0.15);
        }

        .secure-payout-text {
          font-size: 12px;
          color: #10B981;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .dev-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 1s linear infinite;
          margin-right: 8px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

