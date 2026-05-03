import React, { useState, useEffect, useRef } from 'react';

export default function AIChatbot({ mob }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role: 'assistant', content: 'Namaste! 🇮🇳 Main CreatorBharat ka AI assistant hoon.' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { 
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' }); 
  }, [msgs]);

  const send = async () => {
    if (!input.trim() || loading) return;
    setMsgs([...msgs, { role: 'user', content: input.trim() }]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      setMsgs(prev => [...prev, { role: 'assistant', content: 'Sahi sawal hai! Main development mein hoon, jald batata hoon. 🙏' }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <div style={{ position: 'fixed', bottom: mob ? 140 : 32, right: mob ? 12 : 32, zIndex: 8500 }}>
        <button 
          onClick={() => setOpen(!open)} 
          style={{ 
            width: mob ? 42 : 64, height: mob ? 42 : 64, 
            borderRadius: '50%', background: '#111', border: 'none', 
            cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontSize: mob ? 18 : 28 
          }}
        >
          {open ? '×' : '🤖'}
        </button>
      </div>
      {open && (
        <div style={{ 
          position: 'fixed', bottom: mob ? 160 : 112, 
          right: mob ? 12 : 32, left: mob ? 12 : 'auto', 
          width: mob ? 'auto' : 380, height: mob ? 450 : 500, 
          background: '#fff', borderRadius: 32, 
          boxShadow: '0 30px 60px rgba(0,0,0,0.2)', zIndex: 8500, 
          display: 'flex', flexDirection: 'column', overflow: 'hidden', 
          border: '1px solid rgba(0,0,0,0.05)' 
        }}>
          <div style={{ padding: '24px', background: '#111', color: '#fff' }}>
             <span style={{ fontWeight: 900 }}>BharatAI Assistant</span>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {msgs.map((m, i) => (
              <div 
                key={i} 
                style={{ 
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', 
                  maxWidth: '80%', padding: '12px 16px', borderRadius: 20, 
                  background: m.role === 'user' ? '#111' : '#F3F4F6', 
                  color: m.role === 'user' ? '#fff' : '#111', 
                  fontSize: 14, fontWeight: 600 
                }}
              >
                {m.content}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding: 20, borderTop: '1px solid #eee', display: 'flex', gap: 10 }}>
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && send()} 
              placeholder="Type message..." 
              style={{ flex: 1, padding: '12px', borderRadius: 100, border: '1px solid #ddd', outline: 'none' }} 
            />
            <button onClick={send} style={{ width: 44, height: 44, borderRadius: '50%', background: '#111', color: '#fff', border: 'none' }}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}
