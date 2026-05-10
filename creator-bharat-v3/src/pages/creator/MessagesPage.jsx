import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  MoreVertical, 
  Phone, 
  Smile, 
  Paperclip,
  CheckCheck,
  ShieldCheck,
  Zap,
  Lock,
  ChevronLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const MessageBubble = ({ msg, isMe }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: isMe ? 'flex-end' : 'flex-start',
      marginBottom: '20px'
    }}
  >
    <div style={{ 
      maxWidth: '85%', 
      padding: '14px 20px', 
      borderRadius: isMe ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
      background: isMe ? '#0f172a' : '#fff',
      color: isMe ? '#fff' : '#0f172a',
      boxShadow: isMe ? '0 10px 25px rgba(15,23,42,0.1)' : '0 10px 25px rgba(0,0,0,0.02)',
      fontSize: '15px',
      fontWeight: 500,
      lineHeight: 1.5,
      border: isMe ? 'none' : '1px solid #f1f5f9'
    }}>
      {msg.text}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>
      {msg.time} {isMe && <CheckCheck size={14} color="#3B82F6" />}
    </div>
  </motion.div>
);

MessageBubble.propTypes = {
  msg: PropTypes.object.isRequired,
  isMe: PropTypes.bool
};

export default function MessagesPage() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const scrollRef = useRef(null);

  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to CreatorBharat Secure Node. All protocol sessions are 256-bit encrypted.", time: "10:00 AM", isMe: false },
    { id: 2, text: "Status: Connection Established. How can HQ assist you today?", time: "10:42 AM", isMe: false },
  ]);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    return () => globalThis.removeEventListener('resize', h);
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg = {
      id: Date.now(),
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    
    setMessages([...messages, newMsg]);
    setInputText('');
    
    // HQ Reply simulation
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Command received. Synchronizing with regional nodes...",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false
      }]);
    }, 1200);
  };

  return (
    <div style={{ height: '100vh', background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Top Header - Immersive */}
      <div style={{ padding: mob ? '12px 16px' : '20px 40px', background: '#fff', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 100 }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => navigate(-1)} style={{ background: '#f8fafc', border: '1px solid #f1f5f9', padding: '8px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <ChevronLeft size={20} color="#0f172a" />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
               <div style={{ width: mob ? '40px' : '48px', height: mob ? '40px' : '48px', borderRadius: '14px', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
                  <Zap size={24} fill="#FF9431" color="#FF9431" />
               </div>
               <div>
                  <div style={{ fontSize: mob ? '16px' : '18px', fontWeight: 900, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    CreatorBharat HQ <ShieldCheck size={16} color="#3B82F6" />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
                    <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 800 }}>SECURE NODE ACTIVE</span>
                  </div>
               </div>
            </div>
         </div>
         <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ padding: '10px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #f1f5f9', cursor: 'pointer' }}><Phone size={20} color="#64748b" /></div>
            <div style={{ padding: '10px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #f1f5f9', cursor: 'pointer' }}><MoreVertical size={20} color="#64748b" /></div>
         </div>
      </div>

      {/* Main Chat Area */}
      <div 
        ref={scrollRef}
        style={{ flex: 1, overflowY: 'auto', padding: mob ? '20px' : '40px 10% 20px', display: 'flex', flexDirection: 'column', background: '#fcfcfc', scrollbarWidth: 'none' }}
      >
        <div style={{ textAlign: 'center', margin: '40px 0' }}>
           <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                 <Lock size={20} color="#3B82F6" />
              </div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', letterSpacing: '0.05em' }}>END-TO-END ENCRYPTED SESSION</div>
              <div style={{ maxWidth: '280px', fontSize: '11px', color: '#94a3b8', lineHeight: 1.5 }}>Messages are secured using 256-bit protocol encryption. Only authorized nodes can access this channel.</div>
           </div>
        </div>

        {messages.map(msg => (
          <MessageBubble key={msg.id} msg={msg} isMe={msg.isMe} />
        ))}
      </div>

      {/* Input Field - Fixed at Bottom */}
      <div style={{ padding: mob ? '16px' : '32px 10% 48px', background: '#fff', borderTop: '1px solid #f1f5f9' }}>
         <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ flex: 1, background: '#f8fafc', borderRadius: '24px', border: '1.5px solid #f1f5f9', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
               <div style={{ cursor: 'pointer', color: '#64748b' }}><Paperclip size={20} /></div>
               <input 
                 type="text" 
                 value={inputText}
                 onChange={(e) => setInputText(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                 placeholder="Message CreatorBharat HQ..." 
                 style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: '16px', fontWeight: 600, padding: '10px 0' }}
               />
               <div style={{ cursor: 'pointer', color: '#64748b' }}><Smile size={20} /></div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              style={{ width: '56px', height: '56px', borderRadius: '20px', background: '#0f172a', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 8px 24px rgba(15,23,42,0.15)' }}
            >
              <Send size={24} color="#fff" />
            </motion.button>
         </div>
      </div>
    </div>
  );
}
