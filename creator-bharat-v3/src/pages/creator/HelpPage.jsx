import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LifeBuoy, BookOpen, ShieldAlert, MessageCircle, Mail, ChevronDown, ExternalLink, Zap, HelpCircle, FileText } from 'lucide-react';
import { Card, Btn, Bdg } from '@/components/common/Primitives';
import { CreatorPageHeader } from './CreatorShellPage';

const CREATOR_FAQS = [
  { q: 'Mera profile kab verify hoga?', a: 'Profile submit karne ke baad humari team 2-24 ghante mein review karti hai. Agar sab documents sahi hain toh aapko verified badge mil jayega. Incomplete profiles reject ho sakte hain.' },
  { q: 'Payment kaise milega brand deal ke baad?', a: 'Brand deal complete hone ke baad payment aapke Wallet mein reflect hota hai. Aap "Withdraw to Bank" button se apne linked bank account mein instant transfer kar sakte hain.' },
  { q: 'Kya main multiple niches select kar sakta hoon?', a: 'Haan! Profile Builder mein aap 3 niches tak select kar sakte hain. Ye aapki discovery ko improve karta hai aur zyada brands aapko find kar sakte hain.' },
  { q: 'Creator Score kaise badhaye?', a: 'Score badhane ke liye: (1) Profile 100% complete karo, (2) Instagram/YouTube link karo, (3) Services aur rates set karo, (4) Bio mein 50+ characters likho, (5) Gallery images add karo.' },
  { q: 'Brand ne payment nahi kiya toh kya karu?', a: 'Dispute Support section mein jaake issue raise karo. Humari team 24 ghante mein investigate karegi. Escrow system mein brand ka payment pehle se locked hota hai.' },
  { q: 'Kya mera data safe hai?', a: 'Bilkul. Hum AES-256 encryption use karte hain. Aapka personal data kabhi bhi third parties ke saath share nahi hota bina aapki permission ke.' },
];

const FAQItem = ({ q, a, delay = 0 }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      style={{ background: open ? '#fff' : '#f8fafc', borderRadius: 20, border: `1.5px solid ${open ? '#FF9431' : '#f1f5f9'}`, marginBottom: 10, overflow: 'hidden', transition: 'all 0.3s ease' }}
    >
      <button onClick={() => setOpen(!open)} style={{ width: '100%', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', paddingRight: 12 }}>{q}</span>
        <ChevronDown size={18} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: '0.3s', color: open ? '#FF9431' : '#94a3b8', flexShrink: 0 }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ padding: '0 24px 20px' }}
          >
            <div style={{ padding: 20, background: '#f8fafc', borderRadius: 16, fontSize: 14, color: '#475569', lineHeight: 1.7, fontWeight: 500 }}>
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const QuickAction = ({ icon: Icon, title, desc, onClick, color = '#FF9431' }) => (
  <motion.button
    whileHover={{ y: -4 }}
    onClick={onClick}
    style={{ padding: 24, background: '#fff', borderRadius: 24, border: '1px solid #f1f5f9', cursor: 'pointer', textAlign: 'left', display: 'flex', gap: 16, alignItems: 'flex-start', width: '100%', transition: '0.2s' }}
  >
    <div style={{ width: 44, height: 44, borderRadius: 14, background: color + '12', color, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
      <Icon size={22} />
    </div>
    <div>
      <div style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 13, color: '#64748b', fontWeight: 500, lineHeight: 1.5 }}>{desc}</div>
    </div>
  </motion.button>
);

export default function HelpPage() {
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);

  React.useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  return (
    <div className="dashboard-page-container">
      <CreatorPageHeader 
        badge="CREATOR HELP" 
        title="Help & Support Center" 
        subtitle="Guides, FAQs, and direct support — sab kuch ek jagah." 
        icon={LifeBuoy} 
      />

      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.5fr 1fr', gap: 32 }}>
        
        {/* Left: FAQs */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <HelpCircle size={20} color="#FF9431" />
            <h3 style={{ fontSize: 18, fontWeight: 900, color: '#0f172a' }}>Creator FAQs</h3>
          </div>
          
          {CREATOR_FAQS.map((faq, i) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} delay={i * 0.04} />
          ))}
        </div>

        {/* Right: Quick Actions + Contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          <div style={{ marginBottom: 8 }}>
            <h3 style={{ fontSize: 16, fontWeight: 900, color: '#0f172a', marginBottom: 16 }}>Quick Actions</h3>
          </div>

          <QuickAction 
            icon={BookOpen} 
            title="Creator Guidelines" 
            desc="Content quality, brand safety, delivery standards." 
            onClick={() => navigate('/creator/guidelines')} 
          />
          <QuickAction 
            icon={ShieldAlert} 
            title="Raise a Dispute" 
            desc="Payment issues, brand communication problems." 
            onClick={() => navigate('/creator/contact')} 
            color="#EF4444"
          />
          <QuickAction 
            icon={FileText} 
            title="Platform Terms" 
            desc="Terms of service, privacy policy, refund policy." 
            onClick={() => navigate('/creator/terms')} 
            color="#3B82F6"
          />
          <QuickAction 
            icon={Zap} 
            title="Score Guide" 
            desc="How Creator Score works and how to improve it." 
            onClick={() => navigate('/creator/score')} 
            color="#10B981"
          />

          {/* Contact Card */}
          <Card style={{ padding: 32, background: '#0f172a', color: '#fff', borderRadius: 28, marginTop: 8, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: '#FF9431', borderRadius: '50%', opacity: 0.1, filter: 'blur(30px)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <MessageCircle size={20} color="#FF9431" />
                <span style={{ fontSize: 14, fontWeight: 900 }}>Direct Support</span>
              </div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 24 }}>
                Koi bhi sawal ho — humari team hamesha ready hai help karne ke liye.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Btn full onClick={() => navigate('/creator/contact')} style={{ background: '#FF9431', color: '#fff', borderRadius: 14, fontWeight: 900 }}>
                  <Mail size={16} /> Contact Support
                </Btn>
                <div style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
                  support@creatorbharat.com · Mon-Sat 10am-7pm
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
