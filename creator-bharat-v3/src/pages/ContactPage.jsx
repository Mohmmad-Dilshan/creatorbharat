import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T, W, scrollToTop, LS } from '../theme';
import { Btn, SH, Fld } from '../components/Primitives';

export default function ContactPage() {
  const { dsp, st } = useApp();
  const [mob, setMob] = useState(window.innerWidth < 768);
  const [F, setF] = useState({ name: '', email: '', type: 'Creator', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const upF = (k, v) => setF(p => ({ ...p, [k]: v }));
  const toast = (msg, type) => dsp({ t: 'TOAST', d: { type, msg } });

  const submit = () => {
    if (!F.name || !F.email || !F.message) { toast('Fill all required fields', 'error'); return; }
    setLoading(true);
    setTimeout(() => {
      LS.push('cb_contacts', { ...F, id: 'c-' + Date.now(), date: new Date().toISOString() });
      setSent(true); setLoading(false);
      toast('Message sent! We will reply within 24 hours.', 'success');
    }, 600);
  };

  return (
    <div style={{ background: '#fff' }}>
      <div style={{ background: T.n8, padding: mob ? '40px 20px' : '56px 20px' }}>
        <div style={W()}><SH eyebrow="Get In Touch" title="Contact Us" sub="Questions, partnerships, or just want to say hi." light mb={0} /></div>
      </div>
      <div style={{ padding: mob ? '40px 20px' : '64px 20px' }}>
        <div style={W()}>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.5fr 1fr', gap: 40 }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontSize: 24, color: T.n8, marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ fontSize: 14, color: T.t2 }}>We typically reply within 24 hours.</p>
              </div>
            ) : (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 14 }}>
                  <Fld label="Your Name *" value={F.name} onChange={e => upF('name', e.target.value)} placeholder="Ravi Kumar" required />
                  <Fld label="Email *" type="email" value={F.email} onChange={e => upF('email', e.target.value)} placeholder="ravi@email.com" required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 14 }}>
                  <Fld label="I am a..." value={F.type} onChange={e => upF('type', e.target.value)} options={['Creator', 'Brand', 'Investor', 'Press', 'Other']} />
                  <Fld label="Subject" value={F.subject} onChange={e => upF('subject', e.target.value)} placeholder="Subject" />
                </div>
                <Fld label="Message *" value={F.message} onChange={e => upF('message', e.target.value)} rows={5} placeholder="Your message..." required />
                <Btn full lg loading={loading} onClick={submit}>Send Message</Btn>
              </div>
            )}
            <div>
              {[{ icon: '✉', t: 'Email', d: 'hello@creatorbharat.in' }, { icon: '📱', t: 'Instagram', d: '@creatorbharat' }, { icon: '📍', t: 'Location', d: 'Jaipur, Rajasthan 302001' }].map(item => (
                <div key={item.t} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 24 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: T.ga, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
                  <div><p style={{ fontWeight: 700, color: T.n8, fontSize: 14 }}>{item.t}</p><p style={{ fontSize: 13, color: T.t2, marginTop: 2 }}>{item.d}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
