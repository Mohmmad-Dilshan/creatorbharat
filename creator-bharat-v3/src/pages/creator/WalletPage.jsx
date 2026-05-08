import React, { useState } from 'react';
import { fmt } from '../../utils/helpers';
import { Card, Btn } from '../../components/Primitives';
import { 
  Wallet, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2, 
  CreditCard,
  TrendingUp
} from 'lucide-react';

export default function WalletPage() {
  const [mob] = useState(globalThis.innerWidth < 768);

  const earnings = [
    { id: 'tx1', campaign: 'Summer Glow Skincare', brand: 'Nykaa', amount: 15000, status: 'paid', date: '2026-04-15' },
    { id: 'tx2', campaign: 'iPhone 17 Launch', brand: 'Apple India', amount: 45000, status: 'pending', date: '2026-05-01' },
    { id: 'tx3', campaign: 'Local Food Fest', brand: 'Zomato', amount: 5000, status: 'processing', date: '2026-05-05' },
  ];

  const totalPaid = earnings.filter(e => e.status === 'paid').reduce((acc, curr) => acc + curr.amount, 0);
  const totalPending = earnings.filter(e => e.status !== 'paid').reduce((acc, curr) => acc + curr.amount, 0);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'paid': return <CheckCircle2 size={16} color="#10B981" />;
      case 'pending': return <Clock size={16} color="#f59e0b" />;
      case 'processing': return <Clock size={16} color="#3b82f6" />;
      default: return null;
    }
  };

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Wallet Header */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 13, fontWeight: 800, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>Finance Central</p>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#111', fontFamily: "'Outfit', sans-serif" }}>Earnings & Wallet</h1>
        <p style={{ fontSize: 15, color: '#64748b', marginTop: 4, fontWeight: 500 }}>Track your payouts and manage your commercial performance.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: 24, marginBottom: 32 }}>
        {/* Total Earning Card */}
        <Card style={{ padding: '24px', background: '#111', color: '#fff', borderRadius: 28, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1 }}><Wallet size={120} color="#fff" /></div>
          <p style={{ fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: 12 }}>Lifetime Earnings</p>
          <div style={{ fontSize: 36, fontWeight: 900, marginBottom: 8 }}>{fmt.inr(totalPaid + totalPending)}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10B981', fontSize: 13, fontWeight: 700 }}>
            <TrendingUp size={14} /> +12% from last month
          </div>
        </Card>

        {/* Pending Payout Card */}
        <Card style={{ padding: '24px', background: '#fff', borderRadius: 28, border: '1px solid rgba(0,0,0,0.05)' }}>
          <p style={{ fontSize: 12, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 12 }}>Pending Payouts</p>
          <div style={{ fontSize: 36, fontWeight: 900, marginBottom: 8, color: '#111' }}>{fmt.inr(totalPending)}</div>
          <p style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>2 deals in pipeline</p>
        </Card>

        {/* Wallet Balance Card */}
        <Card style={{ padding: '24px', background: '#fff', borderRadius: 28, border: '1px solid rgba(0,0,0,0.05)' }}>
          <p style={{ fontSize: 12, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 12 }}>Available Balance</p>
          <div style={{ fontSize: 36, fontWeight: 900, marginBottom: 8, color: '#111' }}>{fmt.inr(totalPaid * 0.2)}</div>
          <Btn sm style={{ borderRadius: 8, background: '#111', color: '#fff', fontSize: 11 }}>WITHDRAW NOW</Btn>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.8fr 1.2fr', gap: 24 }}>
        {/* Transaction History */}
        <Card style={{ padding: '32px', background: '#fff', borderRadius: 28, border: '1px solid rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 900, fontFamily: "'Outfit', sans-serif" }}>Transaction History</h3>
            <button style={{ background: 'none', border: 'none', color: '#FF9431', fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>Download CSV</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {earnings.map(tx => (
              <div key={tx.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#f8fafc', borderRadius: 20, border: '1px solid rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111', border: '1px solid #f1f5f9' }}>
                    {tx.status === 'paid' ? <ArrowDownLeft size={20} color="#10B981" /> : <Clock size={20} color="#f59e0b" />}
                  </div>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 800, color: '#111' }}>{tx.campaign}</p>
                    <p style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>{tx.brand} • {fmt.date(tx.date)}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 16, fontWeight: 900, color: '#111' }}>+{fmt.inr(tx.amount)}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end', marginTop: 4 }}>
                    {getStatusIcon(tx.status)}
                    <span style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: tx.status === 'paid' ? '#10B981' : '#94a3b8' }}>{tx.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Payment Methods */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Card style={{ padding: '24px', background: '#fff', borderRadius: 28, border: '1px solid rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 900, marginBottom: 20, fontFamily: "'Outfit', sans-serif" }}>Payout Method</h3>
            <div style={{ padding: '20px', background: '#f8fafc', borderRadius: 20, border: '1.5px solid #FF9431', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 40, height: 40, background: '#FF9431', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <CreditCard size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 800, color: '#111' }}>HDFC Bank •••• 4242</p>
                <p style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700 }}>Primary Account</p>
              </div>
              <CheckCircle2 size={20} color="#FF9431" />
            </div>
            <button style={{ width: '100%', marginTop: 16, padding: '12px', background: 'none', border: '1px dashed #cbd5e1', borderRadius: 12, color: '#64748b', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>+ ADD NEW METHOD</button>
          </Card>

          <Card style={{ padding: '24px', background: '#EEF2FF', borderRadius: 28, border: '1px solid #C7D2FE', color: '#3730A3' }}>
            <h3 style={{ fontSize: 16, fontWeight: 900, marginBottom: 8, fontFamily: "'Outfit', sans-serif" }}>Tax Identity (GST)</h3>
            <p style={{ fontSize: 12, color: 'rgba(55, 48, 163, 0.7)', lineHeight: 1.5, marginBottom: 20 }}>Upload your GST certificate to claim input tax credits on campaign payouts.</p>
            <Btn sm style={{ background: '#3730A3', color: '#fff', borderRadius: 10 }}>UPDATE GST DETAILS</Btn>
          </Card>
        </div>
      </div>
    </div>
  );
}
