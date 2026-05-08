import React, { useState, useEffect } from 'react';
import { fmt, W } from '../../utils/helpers';
import { Card, Btn, Bdg, Bar } from '../../components/Primitives';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2, 
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  Download,
  Building,
  ShieldCheck,
  Zap
} from 'lucide-react';

const TransactionItem = ({ tx, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '20px', 
      background: '#fff', 
      borderRadius: '24px', 
      border: '1px solid #f1f5f9',
      marginBottom: '12px'
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{ 
        width: '48px', 
        height: '48px', 
        borderRadius: '14px', 
        background: tx.status === 'paid' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: tx.status === 'paid' ? '#10B981' : '#f59e0b' 
      }}>
        {tx.status === 'paid' ? <ArrowDownLeft size={20} /> : <Clock size={20} />}
      </div>
      <div>
        <h5 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>{tx.campaign}</h5>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#94a3b8', fontWeight: 700 }}>
           <span>{tx.brand}</span>
           <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#cbd5e1' }} />
           <span>{fmt.date(tx.date)}</span>
        </div>
      </div>
    </div>
    <div style={{ textAlign: 'right' }}>
      <div style={{ fontSize: '18px', fontWeight: 950, color: '#0f172a' }}>{tx.amount > 0 ? '+' : ''}{fmt.inr(tx.amount)}</div>
      <div style={{ marginTop: '4px' }}>
         <Bdg sm color={tx.status === 'paid' ? 'green' : (tx.status === 'processing' ? 'blue' : 'orange')}>
            {tx.status?.toUpperCase()}
         </Bdg>
      </div>
    </div>
  </motion.div>
);

export default function WalletPage() {
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  
  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const earnings = [
    { id: 'tx1', campaign: 'Summer Glow Skincare', brand: 'Nykaa', amount: 15000, status: 'paid', date: '2026-04-15' },
    { id: 'tx2', campaign: 'iPhone 17 Launch', brand: 'Apple India', amount: 45000, status: 'pending', date: '2026-05-01' },
    { id: 'tx3', campaign: 'Local Food Fest', brand: 'Zomato', amount: 5000, status: 'processing', date: '2026-05-05' },
    { id: 'tx4', campaign: 'Travel Series: Goa', brand: 'MakeMyTrip', amount: 12000, status: 'paid', date: '2026-04-10' },
  ];

  const totalPaid = earnings.filter(e => e.status === 'paid').reduce((acc, curr) => acc + curr.amount, 0);
  const totalPending = earnings.filter(e => e.status !== 'paid').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', padding: mob ? '100px 20px 100px' : '120px 40px 100px' }}>
      
      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FF9431', fontWeight: 900, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
           <Wallet size={14} fill="#FF9431" /> TREASURY
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.04em' }}>Earnings & Wallet</h1>
        <p style={{ fontSize: '16px', color: '#64748b', marginTop: '4px', fontWeight: 500 }}>Track your commercial growth and manage seamless payouts.</p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
         {/* Top Snapshot Cards */}
         <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
            
            {/* Main Balance Card */}
            <Card style={{ padding: '40px', background: '#050505', color: '#fff', borderRadius: '40px', position: 'relative', overflow: 'hidden' }}>
               <div style={{ position: 'absolute', top: -30, right: -30, width: '140px', height: '140px', background: '#FF9431', borderRadius: '50%', opacity: 0.15, filter: 'blur(50px)' }} />
               <div style={{ position: 'relative', zIndex: 1 }}>
                  <p style={{ fontSize: '12px', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Available for Withdrawal</p>
                  <h2 style={{ fontSize: '44px', fontWeight: 950, marginBottom: '8px' }}>{fmt.inr(totalPaid)}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontSize: '14px', fontWeight: 800 }}>
                     <TrendingUp size={16} /> +₹8,450 this month
                  </div>
                  <button style={{ width: '100%', marginTop: '32px', background: '#FF9431', color: '#fff', border: 'none', padding: '16px', borderRadius: '100px', fontWeight: 950, fontSize: '14px', cursor: 'pointer', boxShadow: '0 10px 30px rgba(255,148,49,0.3)' }}>
                     WITHDRAW TO BANK
                  </button>
               </div>
            </Card>

            {/* In-Transit Card */}
            <Card style={{ padding: '40px', background: '#fff', borderRadius: '40px', border: '1px solid #f1f5f9' }}>
               <p style={{ fontSize: '12px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>In-Transit (Pending)</p>
               <h2 style={{ fontSize: '44px', fontWeight: 950, color: '#0f172a', marginBottom: '8px' }}>{fmt.inr(totalPending)}</h2>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3B82F6', fontSize: '14px', fontWeight: 800 }}>
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
            <Card style={{ padding: '40px', background: '#fff', borderRadius: '40px', border: '1px solid #f1f5f9' }}>
               <p style={{ fontSize: '12px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Avg. Deal Size</p>
               <h2 style={{ fontSize: '44px', fontWeight: 950, color: '#0f172a', marginBottom: '8px' }}>{fmt.inr(Math.round((totalPaid + totalPending) / 4))}</h2>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7C3AED', fontSize: '14px', fontWeight: 800 }}>
                  <Zap size={16} fill="#7C3AED" /> Elite Tier Performance
               </div>
               <div style={{ marginTop: '32px', display: 'flex', gap: '8px' }}>
                  <div style={{ flex: 1, height: '40px', background: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 800, color: '#475569' }}>Q1</div>
                  <div style={{ flex: 1, height: '60px', background: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 800, color: '#475569' }}>Q2</div>
                  <div style={{ flex: 1, height: '80px', background: '#FF9431', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 900, color: '#fff' }}>Q3</div>
               </div>
            </Card>
         </div>

         {/* Transaction Stream & Settings */}
         <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.8fr 1fr', gap: '48px' }}>
            
            {/* Transaction History */}
            <div>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a' }}>Transaction History</h3>
                  <button style={{ background: 'none', border: 'none', color: '#FF9431', fontWeight: 800, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                     <Download size={16} /> Statement
                  </button>
               </div>
               
               <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {earnings.map((tx, i) => (
                    <TransactionItem key={tx.id} tx={tx} delay={i * 0.1} />
                  ))}
               </div>

               <button style={{ width: '100%', padding: '16px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '100px', color: '#64748b', fontWeight: 800, fontSize: '14px', marginTop: '12px', cursor: 'pointer' }}>
                  LOAD PREVIOUS MONTHS
               </button>
            </div>

            {/* Sidebar Tools */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
               
               {/* Payout Destination */}
               <Card style={{ padding: '32px', borderRadius: '32px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 900, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                     <Building size={18} color="#FF9431" /> Payout Destination
                  </h4>
                  <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '24px', border: '2px solid #FF9431', position: 'relative' }}>
                     <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
                        <CheckCircle2 size={18} color="#FF9431" />
                     </div>
                     <p style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Primary Account</p>
                     <p style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a' }}>HDFC Bank •••• 4242</p>
                     <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, marginTop: '4px' }}>Verified & Linked</p>
                  </div>
                  <button style={{ width: '100%', marginTop: '16px', padding: '14px', background: 'none', border: '1px dashed #cbd5e1', borderRadius: '16px', color: '#64748b', fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}>
                     + Update Bank Details
                  </button>
               </Card>

               {/* Compliance / Tax */}
               <Card style={{ padding: '32px', borderRadius: '32px', background: 'linear-gradient(135deg, #FFF9F2 0%, #FFF2E5 100%)', border: '1px solid #FFEDD5' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                     <ShieldCheck size={20} color="#FF9431" />
                     <h4 style={{ fontSize: '16px', fontWeight: 900, color: '#9A3412' }}>GST & Tax Compliance</h4>
                  </div>
                  <p style={{ fontSize: '14px', color: '#9A3412', lineHeight: 1.6, fontWeight: 500, marginBottom: '24px' }}>
                    Register your GST to claim Input Tax Credit on brand commissions and professional payouts.
                  </p>
                  <Btn full sm style={{ background: '#FF9431', color: '#fff', borderRadius: '12px', fontWeight: 900 }}>UPDATE GST INFO</Btn>
               </Card>

               {/* Help / Dispute */}
               <div style={{ textAlign: 'center', padding: '0 20px' }}>
                  <p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>
                    Missing a payout? <button style={{ background: 'none', border: 'none', color: '#FF9431', fontWeight: 800, cursor: 'pointer', padding: 0 }}>Open Dispute</button>
                  </p>
               </div>

            </div>

         </div>
      </div>
    </div>
  );
}
