import React from 'react';
import { ShieldCheck, Target, Zap, MessageSquare, Briefcase, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Section = ({ icon: Icon, title, content }) => (
  <div style={{ marginBottom: '48px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
      <div style={{ width: '48px', height: '48px', background: '#FF943110', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={24} color="#FF9431" />
      </div>
      <h2 style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a' }}>{title}</h2>
    </div>
    <div style={{ paddingLeft: '64px' }}>
      {content.map((p, i) => (
        <p key={p.substring(0, 20) + i} style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.7, marginBottom: '16px', fontWeight: 500 }}>{p}</p>
      ))}
    </div>
  </div>
);

Section.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.string).isRequired
};

const BrandGuidelinesPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh' }}>
      {/* HERO SECTION */}
      <section style={{ background: '#0f172a', padding: '100px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: '#FF9431', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.1 }} />
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 148, 49, 0.1)', padding: '8px 20px', borderRadius: '100px', marginBottom: '24px' }}>
             <ShieldCheck size={16} color="#FF9431" />
             <span style={{ fontSize: '12px', fontWeight: 900, color: '#FF9431', textTransform: 'uppercase', letterSpacing: '1px' }}>Official Policy</span>
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: 950, color: '#fff', marginBottom: '24px', letterSpacing: '-0.04em' }}>Brand <span style={{ color: '#FF9431' }}>Excellence</span> Guidelines</h1>
          <p style={{ fontSize: '18px', color: '#94a3b8', fontWeight: 500, lineHeight: 1.6 }}>Framework for successful collaborations and professional engagement on India's premier creator platform.</p>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 20px' }}>
        <Section 
          icon={Target}
          title="1. Campaign Objectives & Briefing"
          content={[
            "Clear communication is the foundation of any successful campaign. Brands must provide detailed briefs that outline goals, deliverables, and timelines.",
            "Honesty regarding brand values and expectations helps creators produce content that resonates authentically with their audience.",
            "Avoid ambiguous instructions; specific creative direction leads to higher quality output and fewer revisions."
          ]}
        />

        <Section 
          icon={Zap}
          title="2. Creative Freedom & Authenticity"
          content={[
            "CreatorBharat thrives on authenticity. Brands should trust creators to interpret the brand message in their unique voice and style.",
            "While brand safety is paramount, over-scripting can lead to disengaged content. Aim for a balance between brand messaging and creator creativity.",
            "Respect the creator's audience knowledge—they know what works best for their community."
          ]}
        />

        <Section 
          icon={Briefcase}
          title="3. Professional Engagement & Payments"
          content={[
            "Timely responses to creator inquiries and draft submissions are essential for maintaining campaign momentum.",
            "All payments must be handled through the official CreatorBharat Escrow system to ensure security for both parties.",
            "Respect agreed-upon timelines. Delays in feedback can impact a creator's publishing schedule and campaign performance."
          ]}
        />

        <Section 
          icon={MessageSquare}
          title="4. Feedback & Revisions"
          content={[
            "Constructive feedback should be provided clearly and in a single consolidated batch whenever possible.",
            "Respect the revision limits set in the creator's packages. Excessive revision requests beyond the scope should be compensated fairly.",
            "Maintain a professional tone in all communications. We foster a community of mutual respect."
          ]}
        />

        <Section 
          icon={Star}
          title="5. Rights & Usage"
          content={[
            "Clearly define the usage rights for the content produced (e.g., social media vs. print ads).",
            "Creators retain the moral rights to their work unless explicitly agreed otherwise in a high-tier partnership agreement.",
            "Whitelisting or boosting creator content should be discussed and agreed upon during the briefing phase."
          ]}
        />

        <div style={{ marginTop: '80px', padding: '40px', background: '#f8fafc', borderRadius: '32px', border: '1.5px solid #f1f5f9', textAlign: 'center' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', marginBottom: '16px' }}>Need assistance with your campaign?</h3>
          <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '24px', fontWeight: 500 }}>Our Elite Brand Support team is here to help you navigate the creator ecosystem.</p>
          <button 
            onClick={() => navigate('/contact')}
            style={{ padding: '16px 32px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '100px', fontSize: '15px', fontWeight: 800, cursor: 'pointer' }}
          >
            Contact Brand Support
          </button>
        </div>
      </section>
    </div>
  );
};

export default BrandGuidelinesPage;
