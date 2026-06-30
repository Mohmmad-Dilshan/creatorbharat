import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  Activity, 
  CheckCircle2, 
  FileText, 
  Share2, 
  Verified, 
  MapPin, 
  ShieldCheck, 
  UserCheck,
  Globe,
  ArrowRight,
  Shield,
  Phone,
  AtSign,
  MessageCircle,
  Lock
} from 'lucide-react';
import { useApp } from '../../../core/context';
import { Card } from '../../common/Primitives';
import { GatedOverlay, TrustBadge, TabNavigator } from './ProfileShared';

export const QuickConnectHub = ({ c, mob, dsp, onBrief, onMediaKit }) => {
  const { st } = useApp();
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');
  const [dlStatus, setDlStatus] = useState('idle'); // idle, loading, done

  React.useEffect(() => {
    const draft = localStorage.getItem(`draft_campaign_${c.id}`);
    if (draft) {
      setMsg(draft);
      localStorage.removeItem(`draft_campaign_${c.id}`);
    }
  }, [c.id]);

  const handleSend = () => {
    if(!msg.trim()) return;
    dsp({ t: 'TOAST', d: { type: 'success', msg: 'Message sent to ' + c.name } });
    setMsg('');
  };

  const handleMediaKit = () => {
    setDlStatus('loading');
    dsp({ t: 'TOAST', d: { type: 'info', msg: 'Generating Elite Media Kit...' } });
    
    setTimeout(() => {
       setDlStatus('done');
       dsp({ t: 'TOAST', d: { 
         type: 'success', 
         msg: 'Media Kit Ready! Click to view.',
         action: { label: 'View Now', onClick: onMediaKit }
       } });
    }, 2500);
  };

  let dlText = 'Download Media Kit';
  if (dlStatus === 'loading') dlText = 'Preparing PDF...';
  else if (dlStatus === 'done') dlText = 'Media Kit Downloaded';

  const hasUser = !!st?.user;

  return (
    <div id="quick-connect" style={{ marginTop: mob ? '20px' : '0', position: 'relative' }}>
       <div style={{ 
         display: 'grid', 
         gridTemplateColumns: mob ? '1fr' : '1.5fr 1fr', 
         gap: '32px', 
         marginBottom: '32px',
         filter: hasUser ? 'none' : 'blur(6px) grayscale(20%)',
         pointerEvents: hasUser ? 'auto' : 'none'
       }}>
          {/* Messaging Core */}
          <Card style={{ padding: mob ? '32px' : '48px', borderRadius: '40px', border: '1.5px solid #f1f5f9', background: '#fff', position: 'relative', overflow: 'hidden' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ width: '40px', height: '40px', background: '#0073b110', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <MessageSquare size={20} color="#0073b1" />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a' }}>Direct Line to {c.name}</h3>
             </div>
              <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '32px', fontWeight: 500, lineHeight: 1.6 }}>
                "Professional collaborations start with a conversation. Main typically <b>24 ghanton</b> ke andar reply karta hoon professional inquiries ke liye."
             </p>
             
             <div>
                <div style={{ marginBottom: '16px' }}>
                   <div style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px', textAlign: 'left' }}>
                      Select Campaign Template (Tap to Fill)
                   </div>
                   <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', paddingBottom: '4px' }}>
                      {[
                        { label: '📦 Product Review', text: (name) => `Hi ${name}, we love your content and would like to send you our latest product for a cinematic unboxing and review reel. Let us know if you accept barter/paid campaigns!` },
                        { label: '🎥 Reels Integration', text: (name) => `Hi ${name}, we are planning a dedicated brand integration in one of your upcoming Reels. We want to highlight our key features in your signature storytelling style.` },
                        { label: '📍 Store Launch/Visit', text: (name) => `Hi ${name}, we are hosting a launch event for our new store in your city and would love to invite you for an offline visit and social coverage.` },
                        { label: '📢 Social Shoutout', text: (name) => `Hi ${name}, we want to sponsor a quick shoutout post or story highlight promoting our upcoming summer drop/discount code.` }
                      ].map(t => (
                         <button
                            key={t.label}
                            type="button"
                            onClick={() => setMsg(t.text(c.name || 'Creator'))}
                            style={{
                               padding: '8px 16px',
                               background: '#f1f5f9',
                               border: '1px solid #e2e8f0',
                               borderRadius: '100px',
                               fontSize: '12px',
                               fontWeight: 700,
                               color: '#475569',
                               cursor: 'pointer',
                               whiteSpace: 'nowrap',
                               transition: 'all 0.2s',
                               outline: 'none'
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#e2e8f0'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#f1f5f9'; }}
                         >
                            {t.label}
                         </button>
                      ))}
                   </div>
                </div>

                <textarea 
                   value={msg}
                   onChange={e => setMsg(e.target.value)}
                   placeholder="Hi, I'm interested in collaborating on..." 
                   style={{ width: '100%', height: '140px', padding: '20px 24px', borderRadius: '24px', border: '1.5px solid #e2e8f0', background: '#f8fafc', fontSize: '15px', outline: 'none', resize: 'none', color: '#1e293b', fontWeight: 500, transition: 'border-color 0.2s', marginBottom: '16px' }} 
                />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '50%' }} />
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Available Now</span>
                   </div>
                   <button 
                      onClick={handleSend}
                      style={{ background: 'linear-gradient(135deg, #FF9431 0%, #EA580C 100%)', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '100px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 24px rgba(234, 88, 12, 0.25)' }}
                   >
                      Send Message <Send size={16} />
                   </button>
                </div>
             </div>

             <div style={{ marginTop: '32px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {[{ l: 'Response Rate', v: '98%' }, { l: 'Avg Time', v: '4h' }, { l: 'Verified', v: 'Yes' }].map(i => (
                   <div key={i.l}>
                      <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>{i.l}</div>
                      <div style={{ fontSize: '16px', fontWeight: 950, color: '#0f172a' }}>{i.v}</div>
                   </div>
                ))}
             </div>
          </Card>

          {/* Quick Actions Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
             <Card style={{ padding: '24px', borderRadius: '32px', border: '1.5px solid #f1f5f9', background: '#fff' }}>
                <div style={{ fontSize: '12px', fontWeight: 950, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '1px' }}>Quick Toolkit</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button 
                      onClick={handleMediaKit} 
                      disabled={dlStatus === 'loading'}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: dlStatus === 'done' ? '#10B98110' : '#f8fafc', border: `1.5px solid ${dlStatus === 'done' ? '#10B98120' : '#f1f5f9'}`, borderRadius: '16px', cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'all 0.3s' }}
                    >
                       {dlStatus === 'loading' && (
                         <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                           <Activity size={18} color="#FF9431" />
                         </motion.div>
                       )}
                       {dlStatus === 'done' && <CheckCircle2 size={18} color="#10B981" />}
                       {dlStatus === 'idle' && <FileText size={18} color="#64748b" />}
                       
                       <span style={{ fontSize: '14px', fontWeight: 800, color: dlStatus === 'done' ? '#10B981' : '#475569' }}>
                         {dlText}
                       </span>
                       {dlStatus === 'done' && <ArrowRight size={14} color="#10B981" style={{ marginLeft: 'auto' }} />}
                    </button>
                   <button onClick={() => { navigator.clipboard.writeText(globalThis.location.href); dsp({ t: 'TOAST', d: { type: 'success', msg: 'Profile link copied!' } }); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: '#f8fafc', border: '1.5px solid #f1f5f9', borderRadius: '16px', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
                      <Share2 size={18} color="#64748b" />
                      <span style={{ fontSize: '14px', fontWeight: 800, color: '#475569' }}>Copy Profile Link</span>
                   </button>
                </div>
             </Card>

             {/* Direct Contact Card */}
              {(st?.user?.role === 'BRAND' || st?.user?.role === 'ADMIN' || (st?.user?.email && st?.user?.email === c?.email)) ? (
                (c?.contactPhone || c?.contactEmail || c?.contactTelegram) && (
                  <Card style={{ padding: '24px', borderRadius: '32px', border: '1.5px solid #10B98130', background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', alignItems: 'center', gap: 4, background: '#10B98115', border: '1px solid #10B98130', padding: '4px 10px', borderRadius: 100 }}>
                      <Shield size={12} color="#10B981" />
                      <span style={{ fontSize: 10, fontWeight: 900, color: '#10B981', textTransform: 'uppercase' }}>Verified Access</span>
                    </div>
                    
                    <div style={{ fontSize: '11px', fontWeight: 950, color: '#047857', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '1px' }}>Direct Contact Info</div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                       {c?.contactPhone && (
                         <div>
                           <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2px' }}>Phone / WhatsApp</div>
                           <div style={{ fontSize: '14px', fontWeight: 850, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                             <Phone size={14} color="#64748b" />
                             <a href={`https://wa.me/${String(c.contactPhone).replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#0073b1', textDecoration: 'none', fontWeight: 900 }}>
                               {c.contactPhone}
                             </a>
                           </div>
                         </div>
                       )}
                       
                       {c?.contactEmail && (
                         <div>
                           <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2px' }}>Deal Email</div>
                           <div style={{ fontSize: '14px', fontWeight: 850, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                             <AtSign size={14} color="#64748b" />
                             <a href={`mailto:${c.contactEmail}`} style={{ color: '#0073b1', textDecoration: 'none', fontWeight: 900 }}>
                               {c.contactEmail}
                             </a>
                           </div>
                         </div>
                       )}
 
                       {c?.contactTelegram && (
                         <div>
                           <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2px' }}>Telegram Handle</div>
                           <div style={{ fontSize: '14px', fontWeight: 850, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                             <MessageCircle size={14} color="#64748b" />
                             <a href={`https://t.me/${String(c.contactTelegram).replace('@', '')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#0073b1', textDecoration: 'none', fontWeight: 900 }}>
                               {c.contactTelegram}
                             </a>
                           </div>
                         </div>
                       )}
 
                       {c.contactAvailability && (
                         <div>
                           <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2px' }}>Best Time to Contact</div>
                           <div style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>
                             {c.contactAvailability}
                           </div>
                         </div>
                       )}
 
                       <div>
                         <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2px' }}>Preferred Channel</div>
                         <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', textTransform: 'capitalize' }}>
                           {c.contactMethod || 'WhatsApp'}
                         </div>
                       </div>
                    </div>
                  </Card>
                )
              ) : (
                <Card style={{ padding: '24px', borderRadius: '32px', border: '1.5px solid #e2e8f0', background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', alignItems: 'center', gap: 4, background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '4px 10px', borderRadius: 100 }}>
                    <Lock size={12} color="#64748b" />
                    <span style={{ fontSize: 10, fontWeight: 900, color: '#64748b', textTransform: 'uppercase' }}>Gated Data</span>
                  </div>
                  
                  <div style={{ fontSize: '11px', fontWeight: 950, color: '#64748b', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '1px' }}>Direct Contact Info</div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                     <div>
                       <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>Phone & Email</div>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px', fontWeight: 600 }}>
                         <Lock size={14} color="#94a3b8" />
                         ••••••••••••
                       </div>
                     </div>
                     
                     <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0', lineHeight: 1.5, fontWeight: 550 }}>
                       Upgrade to a verified <strong>Brand account</strong> to access direct contact details of this creator.
                     </p>
                  </div>
                </Card>
              )}

             {/* Regional Identity */}
             <div style={{ padding: '32px', background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', borderRadius: '32px', color: '#0f172a', border: '1.5px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 20px 40px rgba(15,23,42,0.03)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.05 }}><MapPin size={100} color="#FF9431" /></div>
                <div style={{ fontSize: '11px', fontWeight: 950, color: '#FF9431', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <Verified size={14} /> Regional Identity
                </div>
                <div style={{ fontSize: '18px', fontWeight: 950, color: '#0f172a', marginBottom: '4px' }}>{c?.city || 'Bengaluru'}</div>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 650 }}>Active in South & West Bharat Hubs</div>
             </div>

             {/* Global Compatibility */}
             <div style={{ padding: '32px', background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', borderRadius: '32px', color: '#0f172a', border: '1.5px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 20px 40px rgba(15,23,42,0.03)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.05 }}><Globe size={100} color="#3b82f6" /></div>
                <div style={{ fontSize: '11px', fontWeight: 950, color: '#3b82f6', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <Globe size={14} /> Global Capability
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2px' }}>Timezone</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>India (IST — UTC+5:30)</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2px' }}>Invoicing & Payments</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>PayPal, Stripe, SWIFT Accepted</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2px' }}>Logistics support</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>DHL & FedEx International Shipping</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2px' }}>Remote Meetings</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>Google Meet, Zoom, Slack</div>
                  </div>
                </div>
             </div>
          </div>
       </div>
       {!hasUser && (
         <GatedOverlay 
           title="Direct Communication Locked" 
           description="Join the platform as a verified Brand to send direct proposals, negotiate terms, and download official creator media kits." 
           onCtaClick={() => navigate('/login')}
         />
       )}

       {/* Professional Trust Bar */}
       <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
          {[
            { t: 'Secure Payments', d: 'Escrow protection for all brand collaborations.', i: ShieldCheck, c: '#10B981' },
            { t: 'Verified Metrics', d: 'Real-time audience and engagement data auditing.', i: Activity, c: '#FF9431' },
            { t: 'Elite Support', d: 'Dedicated manager for high-value partnerships.', i: UserCheck, c: '#3b82f6' }
          ].map(p => (
            <div key={p.t} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px', background: '#f8fafc', borderRadius: '24px', border: '1.5px solid #f1f5f9' }}>
               <div style={{ width: '40px', height: '40px', background: '#fff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <p.i size={20} color={p.c} />
               </div>
               <div>
                  <div style={{ fontSize: '14px', fontWeight: 950, color: '#0f172a' }}>{p.t}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>{p.d}</div>
               </div>
            </div>
          ))}
       </div>
    </div>
  );
};
QuickConnectHub.propTypes = { c: PropTypes.object.isRequired, mob: PropTypes.bool, dsp: PropTypes.func.isRequired, onBrief: PropTypes.func.isRequired, onMediaKit: PropTypes.func.isRequired };

export const ConnectTab = ({ c, mob, dsp, setBriefOpen, setMediaKitOpen, setActiveTab }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
       <QuickConnectHub 
         c={c} 
         mob={mob} 
         dsp={dsp} 
         onBrief={() => setBriefOpen(true)} 
         onMediaKit={() => setMediaKitOpen(true)} 
       />
       <div style={{ marginTop: 'auto', width: '100%' }}>
          <TrustBadge />
          <TabNavigator activeTab="connect" setActiveTab={setActiveTab} mob={mob} />
       </div>
    </motion.div>
  );
};
ConnectTab.propTypes = {
  c: PropTypes.object.isRequired,
  mob: PropTypes.bool,
  dsp: PropTypes.func.isRequired,
  setBriefOpen: PropTypes.func.isRequired,
  setMediaKitOpen: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired
};
