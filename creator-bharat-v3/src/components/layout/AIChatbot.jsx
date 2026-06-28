import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const API_BASE = import.meta.env.VITE_API_URL || 'https://creatorbharat.onrender.com/api';

const QUICK_QUESTIONS = [
  'CB Score kya hota hai?',
  'Pro plan kitna hai?',
  'Verification kaise hoti hai?',
  'Brand deals kaise milte hain?',
];

export default function AIChatbot({ mob }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    {
      id: 'init',
      role: 'assistant',
      content: 'Namaste! 🇮🇳 Main **BharatAI** hoon — CreatorBharat ka official AI assistant.\n\nAap kuch bhi pooch sakte ho — pricing, verification, CB Score, brand deals, ya platform ke baare mein kuch bhi!',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const send = async (text) => {
    const userMsg = (text || input).trim();
    if (!userMsg || loading) return;

    const newMsgs = [...msgs, { id: `u-${Date.now()}`, role: 'user', content: userMsg }];
    setMsgs(newMsgs);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: newMsgs.slice(-8).map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      const reply = data.reply || 'Kuch technical issue aa gaya. Thodi der baad try karo! 🙏';

      setMsgs(prev => [...prev, { id: `a-${Date.now()}`, role: 'assistant', content: reply }]);
      if (!open) setUnread(u => u + 1);
    } catch {
      setMsgs(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: 'Network issue lag raha hai. Please check your connection ya contact@creatorbharat.com pe reach karo! 🙏',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = (content) => {
    // Simple markdown: **bold**
    return content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>');
  };

  return (
    <>
      {/* FAB Button */}
      <div
        style={{
          position: 'fixed',
          bottom: mob ? 100 : 32,
          right: mob ? 16 : 32,
          zIndex: 9000,
        }}
      >
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close AI Assistant' : 'Open AI Assistant'}
          style={{
            width: mob ? 52 : 64,
            height: mob ? 52 : 64,
            borderRadius: '50%',
            background: open
              ? '#1e293b'
              : 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)',
            border: 'none',
            cursor: 'pointer',
            boxShadow: open
              ? '0 8px 24px rgba(0,0,0,0.3)'
              : '0 12px 32px rgba(255,148,49,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            transform: open ? 'scale(0.95)' : 'scale(1)',
            position: 'relative',
          }}
        >
          <span style={{ fontSize: mob ? 22 : 28, lineHeight: 1 }}>
            {open ? '✕' : '🤖'}
          </span>
          {!open && unread > 0 && (
            <span
              style={{
                position: 'absolute',
                top: -4,
                right: -4,
                background: '#ef4444',
                color: '#fff',
                borderRadius: '50%',
                width: 20,
                height: 20,
                fontSize: 11,
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #fff',
              }}
            >
              {unread}
            </span>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: mob ? 168 : 112,
            right: mob ? 12 : 32,
            left: mob ? 12 : 'auto',
            width: mob ? 'auto' : 400,
            height: mob ? 520 : 580,
            background: '#ffffff',
            borderRadius: 28,
            boxShadow: '0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
            zIndex: 8999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'chatSlideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          <style>{`
            @keyframes chatSlideUp {
              from { opacity: 0; transform: translateY(20px) scale(0.95); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes typingDot {
              0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
              40% { transform: scale(1); opacity: 1; }
            }
          `}</style>

          {/* Header */}
          <div
            style={{
              padding: '18px 20px',
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF9431, #EA580C)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              🤖
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#fff', fontWeight: 900, fontSize: 15, fontFamily: "'Outfit', sans-serif" }}>
                BharatAI Assistant
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#22c55e',
                    boxShadow: '0 0 6px #22c55e',
                    display: 'inline-block',
                  }}
                />
                <span style={{ color: '#94a3b8', fontSize: 12, fontWeight: 600 }}>
                  Online • Powered by Gemini AI
                </span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: 8,
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '6px 8px',
                fontSize: 14,
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              background: '#f8fafc',
            }}
          >
            {msgs.map((m) => (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                  gap: 8,
                  alignItems: 'flex-end',
                }}
              >
                {m.role === 'assistant' && (
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #FF9431, #EA580C)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      flexShrink: 0,
                    }}
                  >
                    🤖
                  </div>
                )}
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '10px 14px',
                    borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
                    background: m.role === 'user'
                      ? 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)'
                      : '#ffffff',
                    color: m.role === 'user' ? '#fff' : '#1e293b',
                    fontSize: 13.5,
                    fontWeight: 500,
                    lineHeight: 1.55,
                    boxShadow: m.role === 'user'
                      ? '0 4px 12px rgba(255,148,49,0.3)'
                      : '0 2px 8px rgba(0,0,0,0.06)',
                    border: m.role === 'assistant' ? '1px solid #f1f5f9' : 'none',
                  }}
                  dangerouslySetInnerHTML={{ __html: renderContent(m.content) }}
                />
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FF9431, #EA580C)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  🤖
                </div>
                <div
                  style={{
                    background: '#fff',
                    borderRadius: '4px 18px 18px 18px',
                    padding: '12px 16px',
                    border: '1px solid #f1f5f9',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    display: 'flex',
                    gap: 4,
                    alignItems: 'center',
                  }}
                >
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: '#FF9431',
                        display: 'inline-block',
                        animation: `typingDot 1.2s ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Questions */}
          {msgs.length <= 2 && !loading && (
            <div
              style={{
                padding: '8px 12px',
                borderTop: '1px solid #f1f5f9',
                display: 'flex',
                gap: 6,
                flexWrap: 'wrap',
                background: '#fff',
              }}
            >
              {QUICK_QUESTIONS.map(q => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: '#FF9431',
                    background: 'rgba(255,148,49,0.08)',
                    border: '1px solid rgba(255,148,49,0.2)',
                    borderRadius: 100,
                    padding: '5px 10px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            style={{
              padding: '12px 16px',
              borderTop: '1px solid #f1f5f9',
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              background: '#fff',
            }}
          >
            <input
              ref={inputRef}
              id="bharatai-input"
              name="bharatai-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
              placeholder="Kuch bhi poochho..."
              disabled={loading}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: 100,
                border: '1.5px solid #e2e8f0',
                outline: 'none',
                fontSize: 13.5,
                fontWeight: 500,
                color: '#1e293b',
                background: '#f8fafc',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => (e.target.style.borderColor = '#FF9431')}
              onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: loading || !input.trim()
                  ? '#e2e8f0'
                  : 'linear-gradient(135deg, #FF9431, #EA580C)',
                color: loading || !input.trim() ? '#94a3b8' : '#fff',
                border: 'none',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                transition: 'all 0.2s',
                flexShrink: 0,
                boxShadow: loading || !input.trim() ? 'none' : '0 4px 12px rgba(255,148,49,0.35)',
              }}
            >
              ➤
            </button>
          </div>

          {/* Footer */}
          <div
            style={{
              padding: '6px 16px 10px',
              background: '#fff',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: 10.5, color: '#cbd5e1', fontWeight: 600 }}>
              BharatAI by CreatorBharat • Powered by Gemini
            </span>
          </div>
        </div>
      )}
    </>
  );
}

AIChatbot.propTypes = {
  mob: PropTypes.bool,
};
