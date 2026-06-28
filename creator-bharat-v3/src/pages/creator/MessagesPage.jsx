import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, MoreVertical, Smile, Paperclip,
  CheckCheck, ShieldCheck, Zap, ChevronLeft,
  Search, Plus, Users, Lock, ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/core/context';
import { LS } from '@/utils/helpers';
import { Bdg, Btn } from '@/components/common/Primitives';
import { useMessageLimit } from '@/hooks/useMessageLimit';
import { io } from 'socket.io-client';
import { apiCall } from '@/utils/api';
import { ENV } from '@/config/env';

// Default conversations
const DEFAULT_CONVERSATIONS = [
  { id: 'hq', name: 'CreatorBharat HQ', avatar: null, isHQ: true, lastMsg: 'Welcome to the secure node.', time: '10:00 AM', unread: 1 },
  { id: 'nykaa', name: 'Nykaa Brand Team', avatar: null, lastMsg: 'We loved your portfolio!', time: '2:30 PM', unread: 2 },
  { id: 'samsung', name: 'Samsung India', avatar: null, lastMsg: 'Campaign brief attached.', time: 'Yesterday', unread: 0 },
];

const DEFAULT_MESSAGES = {
  hq: [
    { id: 1, text: "Welcome to CreatorBharat Secure Node. All sessions are encrypted.", time: "10:00 AM", isMe: false },
    { id: 2, text: "How can we help you today?", time: "10:01 AM", isMe: false },
  ],
  nykaa: [
    { id: 1, text: "Hi! We saw your profile and loved your content style.", time: "2:30 PM", isMe: false },
    { id: 2, text: "Would you be interested in our Summer Glow campaign?", time: "2:31 PM", isMe: false },
  ],
  samsung: [
    { id: 1, text: "Hello! We're launching a new product and looking for tech creators.", time: "Yesterday", isMe: false },
  ]
};

const AUTO_REPLIES = {
  hq: "Command received. Our team will respond shortly.",
  nykaa: "Thanks for your message! Our brand team will review and get back within 24 hours.",
  samsung: "Message received. A campaign manager will connect with you soon."
};

const MessageBubble = ({ msg }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: msg.isMe ? 'flex-end' : 'flex-start', marginBottom: 16 }}>
    <div style={{ 
      maxWidth: '80%', padding: '12px 18px', 
      borderRadius: msg.isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
      background: msg.isMe ? '#0f172a' : '#f8fafc',
      color: msg.isMe ? '#fff' : '#0f172a',
      border: msg.isMe ? 'none' : '1px solid #f1f5f9',
      fontSize: 14, fontWeight: 500, lineHeight: 1.5
    }}>
      {msg.text}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>
      {msg.time} {msg.isMe && <CheckCheck size={12} color="#3B82F6" />}
    </div>
  </div>
);

const ConversationItem = ({ conv, active, onClick, mob }) => (
  <button
    onClick={onClick}
    style={{
      width: '100%', display: 'flex', gap: 14, padding: '14px 16px',
      borderRadius: 16, border: 'none', cursor: 'pointer', textAlign: 'left',
      background: active ? '#FF943108' : 'transparent',
      borderLeft: active ? '3px solid #FF9431' : '3px solid transparent',
      transition: '0.2s'
    }}
  >
    <div style={{ width: 44, height: 44, borderRadius: 14, background: conv.isHQ ? '#0f172a' : '#f8fafc', display: 'grid', placeItems: 'center', flexShrink: 0, color: conv.isHQ ? '#FF9431' : '#64748b', fontWeight: 900, fontSize: 16, border: conv.isHQ ? 'none' : '1px solid #f1f5f9' }}>
      {conv.isHQ ? <Zap size={20} /> : conv.name[0]}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>{conv.name}</span>
        <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>{conv.time}</span>
      </div>
      <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {conv.lastMsg}
      </div>
    </div>
    {conv.unread > 0 && (
      <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#FF9431', color: '#fff', fontSize: 10, fontWeight: 900, display: 'grid', placeItems: 'center', flexShrink: 0, alignSelf: 'center' }}>
        {conv.unread}
      </div>
    )}
  </button>
);

export default function MessagesPage() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const { getLimitInfo } = useMessageLimit();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [activeConv, setActiveConv] = useState('hq');
  const [showList, setShowList] = useState(!mob);
  const [inputText, setInputText] = useState('');
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [allMessages, setAllMessages] = useState({});
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const socketRef = useRef(null);
  const activeConvRef = useRef(activeConv);

  const limitInfo = getLimitInfo();

  useEffect(() => {
    activeConvRef.current = activeConv;
  }, [activeConv]);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [allMessages, activeConv]);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('cb_token');
    if (!token) return;

    const socketUrl = (ENV?.apiUrl || 'http://localhost:4000/api').replace(/\/api\/?$/, '');
    const socket = io(socketUrl, {
      auth: { token },
      transports: ['websocket']
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('receive_message', (msg) => {
      const currentActiveConv = activeConvRef.current;
      const partnerId = st.user?.role === 'BRAND' ? msg.creatorId : msg.brandId;

      if (partnerId === currentActiveConv) {
        setAllMessages(prev => ({
          ...prev,
          [currentActiveConv]: [...(prev[currentActiveConv] || []), msg]
        }));
      }

      setConversations(prev => {
        const hasConv = prev.some(c => c.id === partnerId);
        if (hasConv) {
          return prev.map(c => {
            if (c.id === partnerId) {
              return {
                ...c,
                lastMsg: msg.text,
                time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                unread: partnerId === currentActiveConv ? 0 : c.unread + 1
              };
            }
            return c;
          }).sort((a, b) => new Date(b.time) - new Date(a.time));
        } else {
          loadConversations();
          return prev;
        }
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const res = await apiCall('/messages/conversations');
      const merged = [...res];
      if (!merged.some(c => c.id === 'hq')) {
        merged.push({
          id: 'hq',
          name: 'CreatorBharat HQ',
          photo: null,
          isHQ: true,
          lastMsg: 'Welcome to the secure node.',
          time: '10:00 AM',
          unread: 0
        });
      }
      setConversations(merged);

      // Parse target chat from URL query parameters
      const params = new URLSearchParams(globalThis.location.search);
      const targetChat = params.get('chat');
      let activeId = merged[0]?.id || 'hq';

      if (targetChat) {
        if (merged.some(c => c.id === targetChat)) {
          activeId = targetChat;
        } else {
          try {
            const path = st.role === 'CREATOR' ? `/brands/${targetChat}` : `/creators/${targetChat}`;
            const profile = await apiCall(path);
            if (profile) {
              const newConv = {
                id: profile.id,
                name: profile.name,
                photo: profile.photo,
                handle: profile.handle,
                lastMsg: 'Starting a new conversation...',
                time: 'Just now',
                unread: 0
              };
              merged.unshift(newConv);
              setConversations(merged);
              activeId = profile.id;
            }
          } catch (err) {
            console.error('Failed to fetch target chat profile:', err);
          }
        }
      }

      setActiveConv(activeId);
      if (activeId !== 'hq') {
        loadHistory(activeId);
      } else {
        setAllMessages(prev => ({
          ...prev,
          hq: [
            { id: 1, text: "Welcome to CreatorBharat Secure Node. All sessions are encrypted.", time: "10:00 AM", isMe: false },
            { id: 2, text: "How can we help you today?", time: "10:01 AM", isMe: false }
          ]
        }));
      }
      setLoading(false);
    } catch (err) {
      console.error('Failed to load conversations:', err);
      setConversations(DEFAULT_CONVERSATIONS);
      setAllMessages(DEFAULT_MESSAGES);
      setLoading(false);
    }
  };

  const loadHistory = async (convId) => {
    if (!convId || convId === 'hq') return;
    try {
      const res = await apiCall(`/messages/history/${convId}`);
      setAllMessages(prev => ({
        ...prev,
        [convId]: res
      }));
      await apiCall(`/messages/read/${convId}`, { method: 'POST' });
    } catch (err) {
      console.error(`Failed to load history for ${convId}:`, err);
    }
  };

  const selectConv = (id) => {
    setActiveConv(id);
    if (mob) setShowList(false);
    if (id !== 'hq') {
      loadHistory(id);
    }
    setConversations(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    if (activeConv === 'hq') {
      const newMsg = { id: Date.now(), text: inputText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isMe: true };
      setAllMessages(prev => ({ ...prev, hq: [...(prev.hq || []), newMsg] }));
      setInputText('');
      setTimeout(() => {
        const reply = { id: Date.now() + 1, text: "Command received. Our team will respond shortly.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isMe: false };
        setAllMessages(prev => ({ ...prev, hq: [...(prev.hq || []), reply] }));
      }, 1500);
      return;
    }

    const socket = socketRef.current;
    if (socket && socket.connected) {
      socket.emit('send_message', {
        receiverId: activeConv,
        text: inputText
      }, (response) => {
        if (response && response.success) {
          const newMsg = response.message;
          setAllMessages(prev => ({
            ...prev,
            [activeConv]: [...(prev[activeConv] || []), newMsg]
          }));
          setConversations(prev => prev.map(c => {
            if (c.id === activeConv) {
              return {
                ...c,
                lastMsg: newMsg.text,
                time: new Date(newMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                unread: 0
              };
            }
            return c;
          }));
        }
      });
    }
    setInputText('');
  };

  const messages = allMessages[activeConv] || [];
  const activeConvData = conversations.find(c => c.id === activeConv);

  // selectConv is defined above

  // Upgrade prompt modal
  const UpgradeModal = () => (
    <AnimatePresence>
      {showUpgradePrompt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
          onClick={() => setShowUpgradePrompt(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            style={{ background: '#fff', borderRadius: 32, padding: 40, maxWidth: 400, width: '100%', textAlign: 'center', boxShadow: '0 40px 80px rgba(0,0,0,0.2)' }}
          >
            <div style={{ width: 64, height: 64, borderRadius: 20, background: '#FF943112', display: 'grid', placeItems: 'center', margin: '0 auto 20px', color: '#FF9431' }}>
              <Lock size={28} />
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 950, color: '#0f172a', marginBottom: 10 }}>Message Limit Reached</h3>
            <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, marginBottom: 8 }}>
              Free plan mein sirf <strong>{limitInfo.limit} conversations</strong> allowed hain.
            </p>
            <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, marginBottom: 28 }}>
              Pro upgrade karo aur <strong>unlimited brands</strong> se directly baat karo.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Btn full lg onClick={() => navigate('/creator/pricing')} style={{ background: '#FF9431', color: '#fff', borderRadius: 100, fontWeight: 950 }}>
                <Zap size={18} /> Upgrade to Pro
              </Btn>
              <button onClick={() => setShowUpgradePrompt(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
    <UpgradeModal />
    <div style={{ height: 'calc(100vh - 80px)', display: 'flex', background: '#fff', borderRadius: 24, overflow: 'hidden', border: '1px solid #f1f5f9' }}>
      
      {/* Conversation List */}
      {(showList || !mob) && (
        <div style={{ width: mob ? '100%' : 320, borderRight: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', background: '#fff' }}>
          <div style={{ padding: '20px 16px', borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 900, color: '#0f172a', margin: 0 }}>Messages</h3>
              <Bdg sm color="saffron">{conversations.reduce((s, c) => s + c.unread, 0)} new</Bdg>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', borderRadius: 12, padding: '10px 14px', border: '1px solid #f1f5f9' }}>
              <Search size={16} color="#94a3b8" style={{ marginRight: 8 }} />
              <input placeholder="Search conversations..." style={{ border: 'none', background: 'none', outline: 'none', fontSize: 13, fontWeight: 600, width: '100%', color: '#0f172a' }} />
            </div>

            {/* Message limit indicator for free users */}
            {!limitInfo.isUnlimited && (
              <div style={{ marginTop: 12, padding: '10px 14px', background: limitInfo.remaining === 0 ? '#FEF2F2' : '#FFF7ED', borderRadius: 12, border: `1px solid ${limitInfo.remaining === 0 ? '#FECACA' : '#FED7AA'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: limitInfo.remaining === 0 ? '#EF4444' : '#FF9431' }}>
                    {limitInfo.remaining === 0 ? '🔒 Limit reached' : `💬 ${limitInfo.remaining} chats left`}
                  </span>
                  <button
                    onClick={() => navigate('/creator/pricing')}
                    style={{ fontSize: 11, fontWeight: 900, color: '#FF9431', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                  >
                    Upgrade <ArrowRight size={11} />
                  </button>
                </div>
                <div style={{ height: 4, background: '#f1f5f9', borderRadius: 100, marginTop: 6, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: limitInfo.remaining === 0 ? '#EF4444' : '#FF9431', borderRadius: 100, width: `${(limitInfo.used / limitInfo.limit) * 100}%`, transition: '0.3s' }} />
                </div>
              </div>
            )}
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
            {conversations.map(conv => (
              <ConversationItem key={conv.id} conv={conv} active={activeConv === conv.id} onClick={() => selectConv(conv.id)} mob={mob} />
            ))}
          </div>
        </div>
      )}

      {/* Chat Window */}
      {(!showList || !mob) && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Chat Header */}
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 14 }}>
            {mob && (
              <button onClick={() => setShowList(true)} style={{ background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: 10, width: 36, height: 36, display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
                <ChevronLeft size={18} />
              </button>
            )}
            <div style={{ width: 40, height: 40, borderRadius: 12, background: activeConvData?.isHQ ? '#0f172a' : '#f8fafc', display: 'grid', placeItems: 'center', color: activeConvData?.isHQ ? '#FF9431' : '#64748b', fontWeight: 900, border: activeConvData?.isHQ ? 'none' : '1px solid #f1f5f9' }}>
              {activeConvData?.isHQ ? <Zap size={18} /> : (activeConvData?.name || 'C')[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 6 }}>
                {activeConvData?.name || 'Chat'} 
                {activeConvData?.isHQ && <ShieldCheck size={14} color="#3B82F6" />}
              </div>
              <div style={{ fontSize: 11, color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} /> Online
              </div>
            </div>
            <button style={{ background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: 10, width: 36, height: 36, display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
              <MoreVertical size={18} color="#64748b" />
            </button>
          </div>

          {/* Chat Window Body */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              filter: (activeConv !== 'hq' && !st.isPro) ? 'blur(10px)' : 'none',
              pointerEvents: (activeConv !== 'hq' && !st.isPro) ? 'none' : 'auto',
              userSelect: (activeConv !== 'hq' && !st.isPro) ? 'none' : 'auto'
            }}>
              {/* Messages */}
              <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ textAlign: 'center', margin: '20px 0 32px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#f8fafc', padding: '8px 16px', borderRadius: 100, border: '1px solid #f1f5f9' }}>
                    <ShieldCheck size={14} color="#3B82F6" />
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>End-to-end encrypted</span>
                  </div>
                </div>
                {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
              </div>

              {/* Input */}
              <div style={{ padding: '16px 24px', borderTop: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: '#f8fafc', borderRadius: 20, padding: '8px 16px', border: '1px solid #f1f5f9' }}>
                    <Paperclip size={18} color="#94a3b8" style={{ cursor: 'pointer', marginRight: 10 }} />
                    <input 
                      value={inputText}
                      onChange={e => setInputText(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSend()}
                      placeholder="Type a message..."
                      style={{ flex: 1, border: 'none', background: 'none', outline: 'none', fontSize: 14, fontWeight: 600, padding: '8px 0' }}
                    />
                    <Smile size={18} color="#94a3b8" style={{ cursor: 'pointer' }} />
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSend}
                    style={{ width: 48, height: 48, borderRadius: 16, background: '#0f172a', border: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  >
                    <Send size={20} color="#fff" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Direct Chat Lock Overlay */}
            {activeConv !== 'hq' && st.user?.role !== 'BRAND' && !st.isPro && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.4)', zIndex: 10 }}>
                <div style={{ background: '#fff', padding: 32, borderRadius: 24, boxShadow: '0 20px 60px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: 360, border: '1px solid #f1f5f9' }}>
                  <div style={{ width: 64, height: 64, borderRadius: 20, background: '#FF943115', color: '#FF9431', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <Lock size={32} />
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 900, color: '#0f172a', marginBottom: 8 }}>Direct Chat Locked</h3>
                  <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24, fontWeight: 500, lineHeight: 1.5 }}>
                    Free accounts mein direct brand messages block hotey hain. Pro upgrade karke direct brand chat access unlock karein.
                  </p>
                  <button onClick={() => navigate('/creator/pricing')} style={{ width: '100%', padding: '14px', background: '#0f172a', color: '#fff', borderRadius: 12, fontWeight: 900, border: 'none', cursor: 'pointer' }}>Upgrade to Pro</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    </>
  );
}
