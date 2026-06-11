import React, { useEffect } from 'react';
import { Building2, ShieldCheck, Clock, Ban } from 'lucide-react';
import Seo from '@/components/common/SEO';

const SECTIONS = [
  { id: 'escrow-first', title: '1. Escrow-First Policy' },
  { id: 'auto-approval', title: '2. 72-Hour Auto-Approval' },
  { id: 'scope-creep', title: '3. No Scope Creep' },
  { id: 'professionalism', title: '4. Respecting Talent' }
];

export default function BrandGuidelinesPage() {
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
      <Seo title="Brand Guidelines | CreatorBharat" description="Strict rules for brands hiring creators through the CreatorBharat Escrow platform." />
      
      {/* HEADER */}
      <div style={{ background: '#0f172a', paddingTop: mob ? 100 : 140, paddingBottom: mob ? 60 : 80, paddingLeft: 20, paddingRight: 20 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(255, 148, 49, 0.1)', borderRadius: 100, marginBottom: 24, border: '1px solid rgba(255,148,49,0.2)' }}>
            <Building2 size={16} color="#FF9431" />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#FF9431', textTransform: 'uppercase', letterSpacing: 1.5 }}>Brand Rules</span>
          </div>
          <h1 style={{ fontSize: mob ? 36 : 56, fontWeight: 950, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 20px 0' }}>
            Brand Guidelines
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', margin: 0, maxWidth: 600 }}>
            CreatorBharat protects creators from non-payment and scope creep. Here are the rules for verified brands.
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
          
          <div style={{ background: 'rgba(255, 148, 49, 0.05)', borderLeft: '4px solid #FF9431', padding: 24, borderRadius: '0 16px 16px 0', marginBottom: 40 }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 18, fontWeight: 800, color: '#9A3412', margin: '0 0 8px 0' }}>
              <ShieldCheck size={20} /> The Orange Tick
            </h4>
            <p style={{ margin: 0, color: '#9A3412', fontSize: 15 }}>
              Your verified status signals trust to creators. Violating these rules will result in the loss of your Orange Tick and suspension of your hiring privileges.
            </p>
          </div>

          <section id="escrow-first" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>1. Escrow-First Policy</h2>
            <p>Creators will not begin work until 100% of the agreed campaign funds are deposited into the CreatorBharat Razorpay Escrow.</p>
            <p>Attempting to ask a creator to "work first, get paid later" outside the platform violates our core safety principle. If reported, your account will be penalized.</p>
          </section>

          <section id="auto-approval" style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', margin: 0 }}>2. 72-Hour Auto-Approval</h2>
              <div style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#16A34A', padding: '4px 12px', borderRadius: 100, fontSize: 13, fontWeight: 800 }}><Clock size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: '-2px' }}/> TIME LIMIT</div>
            </div>
            <p>When a creator submits a draft or final deliverable, you have exactly 72 hours to review it. You must either "Approve" or "Request Revision."</p>
            <p>If you ignore the submission for 72 hours, the platform assumes you are satisfied, and the Escrow funds are <strong>automatically released</strong> to the creator. This ensures creators are not left waiting for weeks for payment.</p>
          </section>

          <section id="scope-creep" style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', margin: 0 }}>3. No Scope Creep</h2>
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#DC2626', padding: '4px 12px', borderRadius: 100, fontSize: 13, fontWeight: 800 }}><Ban size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: '-2px' }}/> PROHIBITED</div>
            </div>
            <p>The campaign brief agreed upon <em>before</em> the Escrow deposit is the binding contract. You cannot demand new requirements, extra posts, or massive script overhauls after the creator has already filmed based on the original brief.</p>
            <p>If you request changes outside the original scope, the creator has the right to refuse. If you open a dispute, our Trust & Safety team will side with the creator based on the original brief.</p>
          </section>

          <section id="professionalism" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>4. Respecting Talent</h2>
            <p>Creators are creative professionals. Feedback should be constructive and respectful. Abusive language, unreasonable demands, or attempting to micromanage a creator's established voice will not be tolerated.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
