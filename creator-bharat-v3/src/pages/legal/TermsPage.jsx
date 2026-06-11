import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, CheckCircle2, AlertCircle } from 'lucide-react';
import Seo from '@/components/common/SEO';

const SECTIONS = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'escrow', title: '2. The Escrow Contract' },
  { id: 'fees', title: '3. Fees & Zero Commission' },
  { id: 'off-platform', title: '4. Off-Platform Bans' },
  { id: 'liability', title: '5. Limitation of Liability' },
  { id: 'disputes', title: '6. Dispute Resolution' },
];

export default function TermsPage() {
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
      <Seo title="Terms of Service | CreatorBharat" description="CreatorBharat Terms of Service and Escrow Marketplace Rules." />
      
      {/* HEADER */}
      <div style={{ background: '#0f172a', paddingTop: mob ? 100 : 140, paddingBottom: mob ? 60 : 80, paddingLeft: 20, paddingRight: 20 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: 100, marginBottom: 24, border: '1px solid rgba(59,130,246,0.2)' }}>
            <ShieldAlert size={16} color="#3B82F6" />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#3B82F6', textTransform: 'uppercase', letterSpacing: 1.5 }}>Legal Framework</span>
          </div>
          <h1 style={{ fontSize: mob ? 36 : 56, fontWeight: 950, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 20px 0' }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', margin: 0 }}>Last Updated: June 1, 2026</p>
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
          
          <div style={{ background: 'rgba(255, 148, 49, 0.1)', borderLeft: '4px solid #FF9431', padding: 24, borderRadius: '0 16px 16px 0', marginBottom: 40 }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 18, fontWeight: 800, color: '#9A3412', margin: '0 0 8px 0' }}>
              <AlertCircle size={20} /> Important Notice
            </h4>
            <p style={{ margin: 0, color: '#9A3412', fontSize: 15 }}>
              CreatorBharat is an <strong>Escrow-backed Marketplace</strong>. By using our platform, you agree to our strict zero-tolerance policy against off-platform payments and fake engagement metrics.
            </p>
          </div>

          <section id="acceptance" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>1. Acceptance of Terms</h2>
            <p>By accessing or using CreatorBharat (the "Platform"), you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you must not access the Platform. The Platform connects verified Brands with verified Creators for influencer marketing campaigns.</p>
          </section>

          <section id="escrow" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>2. The Escrow Contract</h2>
            <p>To protect both parties, all campaign payments are processed via our secure Escrow system powered by Razorpay.</p>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li><strong>Brand Deposit:</strong> A brand must deposit 100% of the campaign funds into Escrow before a Creator begins work.</li>
              <li><strong>Creator Guarantee:</strong> Once funds are in Escrow, the Creator is guaranteed payment upon successful delivery of the agreed-upon content.</li>
              <li><strong>72-Hour Auto-Approval:</strong> If a Creator submits their deliverable and the Brand does not request a revision or approve it within 72 hours, the Escrow will automatically release funds to the Creator.</li>
            </ul>
          </section>

          <section id="fees" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>3. Fees & Zero Commission</h2>
            <p>CreatorBharat takes pride in a <strong>0% Commission Policy</strong> for Creators.</p>
            <p>Brands pay a nominal platform fee per transaction to cover Escrow gateway charges, GST, and trust & safety overheads. Creators receive 100% of their negotiated payout directly to their verified bank accounts.</p>
          </section>

          <section id="off-platform" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>4. Off-Platform Bans</h2>
            <p>To maintain a safe ecosystem, attempting to bypass the CreatorBharat Escrow system is strictly prohibited.</p>
            <div style={{ display: 'flex', gap: 12, background: '#fff', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0', marginTop: 16 }}>
              <div style={{ flexShrink: 0 }}><AlertCircle color="#EF4444" /></div>
              <div>
                <strong style={{ color: '#0f172a', display: 'block', marginBottom: 4 }}>Immediate Termination</strong>
                <span style={{ fontSize: 14 }}>If a Brand or Creator is caught soliciting direct payments outside of CreatorBharat after discovering each other on the Platform, both accounts will be permanently banned, and the Creator's CB Score will be reduced to 0.</span>
              </div>
            </div>
          </section>

          <section id="liability" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>5. Limitation of Liability</h2>
            <p>CreatorBharat acts as a technology intermediary. We do not endorse any specific Brand or Creator. While we enforce strict verification, we are not liable for the content produced, product claims, or any reputational damage resulting from a campaign.</p>
          </section>

          <section id="disputes" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>6. Dispute Resolution</h2>
            <p>If a dispute arises (e.g., Creator fails to deliver, or Brand rejects valid work), either party can trigger a dispute. Our internal Trust & Safety team will review the original campaign brief, the chat logs, and the submitted content. The team's decision on Escrow fund distribution will be final and binding within 24 hours of the dispute being raised.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
