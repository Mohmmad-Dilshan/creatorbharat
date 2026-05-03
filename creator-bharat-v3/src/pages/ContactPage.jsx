import React, { useState, useEffect } from 'react';
import { useApp } from '../context';
import { T } from '../theme';
import { W, scrollToTop, LS } from '../utils/helpers';
import { Btn, SH, Fld, Card } from '../components/Primitives';

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
    if (!F.name || !F.email || !F.message) { toast('Please fill all required fields', 'error'); return; }
    setLoading(true);
    setTimeout(() => {
      LS.push('cb_contacts', { ...F, id: 'c-' + Date.now(), date: new Date().toISOString() });
      setSent(true); setLoading(false);
      toast('Message sent! We will reply within 24 hours.', 'success');
    }, 800);
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Premium Header */}
      <div style={{ background: '#050505', padding: mob ? '120px 20px 60px' : '160px 20px 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,148,49,0.1), transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #FF9431, #fff, #128807)' }} />
        
        <div style={W()}>
           <SH eyebrow="Direct Channel" title="Let's Connect Bharat" sub="Have questions about monetization or brand deals? Hum aapki madad ke liye taiyaar hain." light center mb={0} />
        </div>
      </div>

      <div style={{ padding: mob ? '40px 20px' : '80px 20px', background: '#FAFAFA' }}>
        <div style={W()}>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.5fr 1fr', gap: 48 }}>
            <Card className="au" style={{ padding: mob ? '32px 24px' : '48px', background: '#fff' }}>
              {sent ? (
                <div className="si" style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div style={{ width: 80, height: 80, background: 'rgba(16,185,129,0.1)', color: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, margin: '0 auto 24px' }}>✓</div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 900, color: '#111', marginBottom: 12 }}>Message Received!</h3>
                  <p style={{ fontSize: 16, color: T.t2, marginBottom: 32, lineHeight: 1.6 }}>Humara team aapse 24 ghante ke andar contact karega. Tab tak dashboard check karein.</p>
                  <Btn lg onClick={() => dsp({ t: 'GO', p: 'home' })} style={{ borderRadius: 100, padding: '16px 48px' }}>Back to Home</Btn>
                </div>
              ) : (
                <div className="ai">
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 900, color: '#111', marginBottom: 32 }}>Send us a message</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 20 }}>
                    <Fld label="Full Name" value={F.name} onChange={e => upF('name', e.target.value)} placeholder="e.g. Ravi Kumar" required />
                    <Fld label="Email Address" type="email" value={F.email} onChange={e => upF('email', e.target.value)} placeholder="ravi@email.com" required />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 20 }}>
                    <Fld label="I am a..." value={F.type} onChange={e => upF('type', e.target.value)} options={['Creator', 'Brand', 'Investor', 'Press', 'Other']} />
                    <Fld label="Subject" value={F.subject} onChange={e => upF('subject', e.target.value)} placeholder="Inquiry about..." />
                  </div>
                  <Fld label="Your Message" value={F.message} onChange={e => upF('message', e.target.value)} rows={6} placeholder="Hum aapki kaise help kar sakte hain?" required />
                  <Btn full lg loading={loading} onClick={submit} style={{ height: 60, borderRadius: 100, fontSize: 17 }}>Submit Message 🚀</Btn>
                </div>
              )}
            </Card>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
               {[
                 { icon: '✉️', t: 'Support Email', d: 'support@creatorbharat.in', sub: 'For creator queries' },
                 { icon: '💼', t: 'Business Inquiry', d: 'brands@creatorbharat.in', sub: 'For agency partnerships' },
                 { icon: '📱', t: 'Instagram DM', d: '@creatorbharat', sub: 'Fastest response' },
                 { icon: '📍', t: 'Headquarters', d: 'Pink City, Jaipur, Rajasthan', sub: 'Digital Hub' }
               ].map((item, i) => (
                 <Card key={item.t} className={`au d${i+1}`} style={{ padding: '24px', display: 'flex', gap: 20, alignItems: 'center' }}>
                   <div style={{ width: 56, height: 56, borderRadius: 16, background: T.bg2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{item.icon}</div>
                   <div>
                      <p style={{ fontWeight: 800, color: '#111', fontSize: 16 }}>{item.t}</p>
                      <p style={{ fontSize: 14, color: T.gd, fontWeight: 700, marginTop: 2 }}>{item.d}</p>
                      <p style={{ fontSize: 12, color: T.t3, marginTop: 2 }}>{item.sub}</p>
                   </div>
                 </Card>
               ))}
               
               <div style={{ marginTop: 24, padding: '32px', background: 'linear-gradient(135deg, #FF9431, #FF6B00)', borderRadius: 32, color: '#fff', textAlign: 'center' }}>
                  <h4 style={{ fontSize: 18, fontWeight: 900, marginBottom: 8 }}>Ready to Join?</h4>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 24 }}>Start your journey as a verified creator today.</p>
                  <Btn variant="white" full onClick={() => dsp({ t: 'GO', p: 'apply' })}>Register Now</Btn>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
