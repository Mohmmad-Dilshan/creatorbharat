import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LifeBuoy, BookOpen, ShieldAlert, MessageCircle, Mail, ChevronDown, 
  ExternalLink, Zap, HelpCircle, FileText, Send, Sparkles, User, Bot, Search, Trash2
} from 'lucide-react';
import { Card, Btn, Bdg } from '@/components/common/Primitives';
import { CreatorPageHeader } from './CreatorShellPage';

const T = {
  saffron: '#FF9431',
  emerald: '#10B981',
  violet: '#7C3AED',
  blue: '#3B82F6',
  navy: '#0F172A',
  slate: '#64748B',
  bg: '#F8FAFC',
  border: '#F1F5F9'
};

const CREATOR_FAQS = [
  { q: 'Mera profile kab verify hoga?', a: 'Profile submit karne ke baad humari team 2-24 ghante mein review karti hai. Agar sab details sahi hain aur social account authentic hai toh verification check mark instant active ho jata hai.' },
  { q: 'Payment kaise milega brand deal ke baad?', a: 'Campaign milestones deliver karne ke baad brand approved status verify karta hai aur funds instant aapke Wallet mein credit ho jaate hain. Wahan se direct bank payout process hota hai.' },
  { q: 'Kya main multiple niches select kar sakta hoon?', a: 'Haan! Profile Builder settings mein jaake aap Category selector se 3 categories/niches tak connect kar sakte hain, jisse brand discovery filter reach badhti hai.' },
  { q: 'Creator Score kaise badhaye?', a: 'Creator Score improve karne ke liye: Profile metrics completness check, Active social handle integration, Rate card packages update, and delivery timelines adhere karein.' },
  { q: 'Brand ne payment dispute kiya toh kya hoga?', a: 'Escrow settings safety protocol ensures contract funding release. Dispute Support option se ticket initiate karein, humari legal team escrow details evaluate karke resolve karegi.' },
  { q: 'Kya bank details edit karna safe hai?', a: 'Bilkul. Payout system configurations AES-256 standards support karti hain. Bank information update validation OTP verification process require karti hai.' }
];

const FAQItem = ({ q, a, idx }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.04 }}
      style={{
        background: open ? '#ffffff' : '#F8FAFC',
        borderRadius: 20,
        border: `1.5px solid ${open ? T.saffron : '#F1F5F9'}`,
        marginBottom: 12,
        overflow: 'hidden',
        boxShadow: open ? '0 10px 25px rgba(255,148,49,0.04)' : 'none',
        transition: 'all 0.3s ease'
      }}
    >
      <button 
        onClick={() => setOpen(!open)} 
        style={{ width: '100%', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ fontSize: 14, fontWeight: 800, color: T.navy, paddingRight: 12 }}>{q}</span>
        <ChevronDown size={18} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: '0.3s', color: open ? T.saffron : T.slate, flexShrink: 0 }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ padding: '0 24px 20px' }}
          >
            <div style={{ padding: 18, background: '#F8FAFC', borderRadius: 16, fontSize: 13, color: '#475569', lineHeight: 1.6, fontWeight: 500 }}>
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function HelpPage() {
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [searchVal, setSearchVal] = useState('');
  
  // AI Chat Assistant State
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Namaste! Main CreatorBharat Assistant hoon. Main aapki kya sahayata kar sakta hoon?', time: 'Just now' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [botTyping, setBotTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, botTyping]);

  const filteredFaqs = useMemo(() => {
    if (!searchVal.trim()) return CREATOR_FAQS;
    const q = searchVal.toLowerCase();
    return CREATOR_FAQS.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
  }, [searchVal]);

  const presetQueries = [
    { label: 'Verification Process', q: 'Verification review kitna time leta hai?' },
    { label: 'Escrow Payments', q: 'Brand payout release rule kya hai?' },
    { label: 'Creator Score Guide', q: 'Score profile parameters kya hain?' }
  ];

  const handleSendQuery = (text) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMsg = { sender: 'user', text, time: 'Just now' };
    setMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setBotTyping(true);

    // Simulate AI thinking and typing response
    setTimeout(() => {
      let reply = "Mujhe lagta hai aapko support desk help ticket verify karni chahiye. Support agent se direct connect karne ke liye niche check box options toggle karein.";
      const q = text.toLowerCase();
      
      if (q.includes('verify') || q.includes('verification')) {
        reply = "Verification process 2 se 24 ghante leta hai. Admin team details inspect karke blue elite check badge profile link par active kar deti hai.";
      } else if (q.includes('pay') || q.includes('payment') || q.includes('escrow')) {
        reply = "Payment security Razorpay Escrow networks release par handle hoti hai. Delivery status verified check approve hone par balance wallet transfer credit hota hai.";
      } else if (q.includes('score')) {
        reply = "Score improve karne ke liye: Profile sections compleltion (Identity, social links, rate settings, bio description) fully configure update karein.";
      }
      
      setMessages(prev => [...prev, { sender: 'bot', text: reply, time: 'Just now' }]);
      setBotTyping(false);
    }, 1200);
  };

  return (
    <div className="dashboard-page-container" style={{ paddingBottom: '100px' }}>
      <CreatorPageHeader 
        badge="CREATOR SUPPORT" 
        title="Help & Support Desk" 
        subtitle="Learn platform workflows, search guidelines, and chat with Support AI." 
        icon={LifeBuoy} 
      />

      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.35fr 1fr', gap: 32, alignItems: 'start' }}>
        
        {/* Left column: Searchable FAQs & AI assistant */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          
          {/* AI Chat Assistant Panel */}
          <Card style={{ padding: 28, background: '#ffffff', display: 'flex', flexDirection: 'column', height: 420 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1.5px solid #F1F5F9', paddingBottom: 14, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, #FF9431, #EA580C)', color: '#fff', display: 'grid', placeItems: 'center' }}>
                <Sparkles size={16} fill="#fff" />
              </div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 900, color: T.navy, margin: 0 }}>Ask CreatorHub AI</h3>
                <p style={{ fontSize: 10, color: T.emerald, margin: 0, fontWeight: 800 }}>● ONLINE UPDATES READY</p>
              </div>
            </div>

            {/* Chat message thread area */}
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: 4, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16, scrollbarWidth: 'thin' }}>
              {messages.map((m, idx) => {
                const isBot = m.sender === 'bot';
                return (
                  <div key={idx} style={{ display: 'flex', justifyContent: isBot ? 'flex-start' : 'flex-end', gap: 8, maxWidth: '85%', alignSelf: isBot ? 'flex-start' : 'flex-end' }}>
                    {isBot && (
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: T.bg, border: '1px solid #e2e8f0', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                        <Bot size={14} color={T.saffron} />
                      </div>
                    )}
                    <div style={{
                      padding: '10px 14px',
                      borderRadius: 18,
                      borderTopLeftRadius: isBot ? 4 : 18,
                      borderTopRightRadius: isBot ? 18 : 4,
                      background: isBot ? '#F8FAFC' : 'linear-gradient(135deg, #FF9431, #EA580C)',
                      color: isBot ? '#334155' : '#ffffff',
                      fontSize: 13,
                      fontWeight: 600,
                      lineHeight: 1.4,
                      border: isBot ? '1px solid #E2E8F0' : 'none'
                    }}>
                      {m.text}
                    </div>
                  </div>
                );
              })}
              {botTyping && (
                <div style={{ display: 'flex', gap: 8, alignSelf: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: T.bg, border: '1px solid #e2e8f0', display: 'grid', placeItems: 'center' }}>
                    <Bot size={14} color={T.saffron} />
                  </div>
                  <div style={{ padding: '10px 18px', borderRadius: 18, borderTopLeftRadius: 4, background: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', gap: 4, alignItems: 'center' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.saffron, animation: 'pulse 1.2s infinite' }} />
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.saffron, animation: 'pulse 1.2s infinite 0.2s' }} />
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.saffron, animation: 'pulse 1.2s infinite 0.4s' }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Presets and text input */}
            <div>
              {messages.length === 1 && (
                <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 12, paddingBottom: 2 }}>
                  {presetQueries.map((pq, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendQuery(pq.q)}
                      style={{
                        padding: '6px 12px', background: T.bg, border: '1px solid #E2E8F0',
                        borderRadius: 100, fontSize: 11, fontWeight: 800, color: T.slate,
                        cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap'
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = T.saffron}
                      onMouseLeave={e => e.currentTarget.style.borderColor = '#E2E8F0'}
                    >
                      {pq.label}
                    </button>
                  ))}
                </div>
              )}
              <form 
                onSubmit={e => { e.preventDefault(); handleSendQuery(chatInput); }}
                style={{ display: 'flex', gap: 10, background: '#F8FAFC', padding: 4, borderRadius: 14, border: '1.5px solid #F1F5F9' }}
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Ask a question or request assistance..."
                  style={{ flex: 1, border: 'none', background: 'none', padding: '10px 14px', fontSize: 13, outline: 'none', fontWeight: 600, color: T.navy }}
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  style={{
                    width: 38, height: 38, borderRadius: 10, background: chatInput.trim() ? T.navy : T.slate + '20',
                    color: '#fff', border: 'none', display: 'grid', placeItems: 'center', cursor: chatInput.trim() ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s'
                  }}
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </Card>

          {/* Searchable FAQ Accordion list */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <HelpCircle size={18} color={T.saffron} />
                <h3 style={{ fontSize: 16, fontWeight: 900, color: T.navy, margin: 0 }}>Searchable FAQ Database</h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '6px 12px', borderRadius: 100, width: 220 }}>
                <Search size={14} color={T.slate} />
                <input
                  type="text"
                  placeholder="Filter questions..."
                  value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                  style={{ border: 'none', background: 'none', fontSize: 12, outline: 'none', fontWeight: 600, width: '100%', color: T.navy }}
                />
              </div>
            </div>

            {filteredFaqs.length === 0 ? (
              <Card style={{ padding: 40, textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>🔍</div>
                <h5 style={{ fontSize: 14, fontWeight: 800, color: T.navy, margin: '0 0 4px' }}>No matches found</h5>
                <p style={{ fontSize: 12, color: T.slate, margin: 0, fontWeight: 500 }}>Try searching with different terms or type your question to the AI assistant above.</p>
              </Card>
            ) : (
              <div>
                {filteredFaqs.map((faq, i) => (
                  <FAQItem key={faq.q} q={faq.q} a={faq.a} idx={i} />
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right column: Quick actions and escalation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          <h3 style={{ fontSize: 13, fontWeight: 900, color: T.navy, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 4px' }}>Documentation</h3>
          
          {[
            { label: 'Creator Guidelines', desc: 'Read code of conduct, content safety rules & deliverables rules.', icon: BookOpen, path: '/creator/guidelines', color: T.saffron },
            { label: 'Score Guide', desc: 'Learn how creator score works and how to reach the top ranks.', icon: Zap, path: '/creator/score', color: T.emerald },
            { label: 'Platform Legal Terms', desc: 'Terms of service, escrow contracts, and policies.', icon: FileText, path: '/creator/terms', color: T.blue }
          ].map(action => (
            <motion.button
              key={action.label}
              whileHover={{ y: -3, boxShadow: '0 10px 25px rgba(0,0,0,0.04)' }}
              onClick={() => navigate(action.path)}
              style={{
                display: 'flex', gap: 14, padding: 18, background: '#ffffff',
                border: '1.5px solid #F1F5F9', borderRadius: 20, cursor: 'pointer',
                textAlign: 'left', transition: 'all 0.2s ease', width: '100%'
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 12, background: action.color + '12', color: action.color, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <action.icon size={18} />
              </div>
              <div>
                <h4 style={{ fontSize: 14, fontWeight: 900, color: T.navy, margin: '0 0 4px' }}>{action.label}</h4>
                <p style={{ fontSize: 11, color: T.slate, fontWeight: 650, margin: 0, lineHeight: 1.4 }}>{action.desc}</p>
              </div>
            </motion.button>
          ))}

          {/* Contact ticket escalation */}
          <Card style={{ padding: 28, background: '#0F172A', color: '#ffffff', borderRadius: 24, marginTop: 12, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,148,49,0.15), transparent 70%)', pointerEvents: 'none' }} />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <ShieldAlert size={18} color={T.saffron} />
              <h4 style={{ fontSize: 14, fontWeight: 900, color: '#fff', margin: 0 }}>Dispute Resolution Desk</h4>
            </div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontWeight: 500, marginBottom: 20 }}>
              Need assistance with an active brand contract, payment Release, or escrow dispute? Open a ticket directly.
            </p>
            <Btn full onClick={() => navigate('/creator/contact')} style={{ background: T.saffron, color: '#fff', borderRadius: 12, fontWeight: 900 }}>
              <Mail size={14} /> Open Support Ticket
            </Btn>
          </Card>

        </div>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
