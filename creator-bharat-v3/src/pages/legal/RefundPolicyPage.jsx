import React, { useEffect } from 'react';
import { IndianRupee, RotateCcw, AlertCircle, Scale } from 'lucide-react';
import Seo from '@/components/common/SEO';

const SECTIONS = [
  { id: 'escrow-mechanics', title: '1. How Escrow Works' },
  { id: 'brand-refunds', title: '2. When Brands Get Refunded' },
  { id: 'creator-guarantee', title: '3. When Creators Get Paid' },
  { id: 'disputes', title: '4. Dispute Timeline' }
];

export default function RefundPolicyPage() {
  const mob = window.innerWidth < 768;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: 100 }}>
      <Seo title="Refund & Escrow Policy | CreatorBharat" description="Understand how our zero-risk Escrow system protects your money." />
      
      {/* HEADER */}
      <div style={{ background: '#0f172a', paddingTop: mob ? 100 : 140, paddingBottom: mob ? 60 : 80, paddingLeft: 20, paddingRight: 20 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(255, 148, 49, 0.1)', borderRadius: 100, marginBottom: 24, border: '1px solid rgba(255,148,49,0.2)' }}>
            <IndianRupee size={16} color="#FF9431" />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#FF9431', textTransform: 'uppercase', letterSpacing: 1.5 }}>Financial Security</span>
          </div>
          <h1 style={{ fontSize: mob ? 36 : 56, fontWeight: 950, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 20px 0' }}>
            Refund & Escrow Policy
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', margin: 0, maxWidth: 600 }}>
            Zero risk for brands. Guaranteed payments for creators.
          </p>
        </div>
      </div>

      {/* CONTENT LAYOUT */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 20px', display: 'flex', gap: 60, flexDirection: mob ? 'column' : 'row' }}>
        
        {/* SIDEBAR */}
        {!mob && (
          <div style={{ width: 260, flexShrink: 0 }}>
            <div style={{ position: 'sticky', top: 120 }}>
              <h4 style={{ fontSize: 12, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Contents</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {SECTIONS.map(s => (
                  <button 
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    style={{ background: 'none', border: 'none', textAlign: 'left', padding: 0, fontSize: 15, fontWeight: 600, color: '#475569', cursor: 'pointer', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#0f172a'}
                    onMouseLeave={e => e.currentTarget.style.color = '#475569'}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MAIN TEXT */}
        <div style={{ flex: 1, fontSize: 16, color: '#334155', lineHeight: 1.8 }}>
          
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: 24, borderRadius: 16, marginBottom: 40, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: 12, borderRadius: 12 }}>
              <Scale size={24} color="#3B82F6" />
            </div>
            <div>
              <h4 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0' }}>The Escrow Philosophy</h4>
              <p style={{ margin: 0, color: '#475569', fontSize: 15 }}>
                CreatorBharat holds campaign funds in a neutral Razorpay Escrow account. The money is never released to the creator until the brand approves the work, but it is also securely locked away from the brand so the creator knows they will definitely get paid.
              </p>
            </div>
          </div>

          <section id="escrow-mechanics" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>1. How Escrow Works</h2>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>Brand deposits funds via UPI/Card/NetBanking.</li>
              <li>Funds are held securely by Razorpay Nodal Accounts.</li>
              <li>Creator submits the final deliverable link/video file.</li>
              <li>Brand clicks "Approve".</li>
              <li>Funds are instantly routed to the Creator's bank account via RazorpayX.</li>
            </ul>
          </section>

          <section id="brand-refunds" style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', margin: 0 }}>2. When Brands Get Refunded</h2>
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#DC2626', padding: '4px 12px', borderRadius: 100, fontSize: 13, fontWeight: 800 }}><RotateCcw size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: '-2px' }}/> REFUND</div>
            </div>
            <p>Brands are entitled to a 100% refund of their Escrow deposit under the following conditions:</p>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li><strong>Ghosting:</strong> The Creator fails to submit any work within 48 hours past the agreed deadline.</li>
              <li><strong>Breach of Brief:</strong> The Creator submits work that completely ignores the fundamental requirements of the campaign brief, and refuses to provide a revision.</li>
              <li><strong>Mutual Cancellation:</strong> Both the Brand and Creator agree to cancel the campaign before the content is published.</li>
            </ul>
            <p style={{ fontSize: 14, color: '#64748b', marginTop: 12 }}>* Refunds take 5-7 business days to reflect in the original payment source.</p>
          </section>

          <section id="creator-guarantee" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>3. When Creators Get Paid</h2>
            <p>We protect creators from "hit and run" brands.</p>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li><strong>Completion:</strong> If you deliver exactly what was in the brief, you will be paid. A brand cannot deny payment simply because they "changed their mind" about the campaign strategy.</li>
              <li><strong>72-Hour Auto-Approval:</strong> If you submit the work through the platform and the brand ignores it for 72 hours, our system automatically releases the Escrow funds to your wallet.</li>
            </ul>
          </section>

          <section id="disputes" style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', margin: 0 }}>4. Dispute Timeline</h2>
              <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#D97706', padding: '4px 12px', borderRadius: 100, fontSize: 13, fontWeight: 800 }}><AlertCircle size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: '-2px' }}/> FAST RESOLUTION</div>
            </div>
            <p>If a brand requests a refund but the creator disputes it, the funds are frozen. Our Trust & Safety team steps in.</p>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li><strong>Hour 0:</strong> Dispute raised. Both parties submit evidence (chat logs, brief, submitted video).</li>
              <li><strong>Hour 24:</strong> CreatorBharat team reviews the evidence against the original contract.</li>
              <li><strong>Hour 48:</strong> Final, binding decision is made. Funds are either refunded to the Brand or released to the Creator.</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}
