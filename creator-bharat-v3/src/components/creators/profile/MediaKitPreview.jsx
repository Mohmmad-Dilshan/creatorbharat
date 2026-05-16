import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Download, 
  X, 
  PieChart, 
  TrendingUp, 
  Globe,
  Activity,
  Zap,
  Star
} from 'lucide-react';
import { fmt } from '@/utils/helpers';

const StatBox = ({ label, value, icon: Icon, color }) => (
  <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '24px', border: '1.5px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '8px' }}>
     <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '24px', height: '24px', background: `${color}10`, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <Icon size={12} color={color} />
        </div>
        <span style={{ fontSize: '10px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
     </div>
     <div style={{ fontSize: '22px', fontWeight: 950, color: '#0f172a' }}>{value}</div>
  </div>
);
StatBox.propTypes = { label: PropTypes.string.isRequired, value: PropTypes.string.isRequired, icon: PropTypes.elementType.isRequired, color: PropTypes.string.isRequired };

const SectionTitle = ({ children, icon: Icon }) => (
  <h3 style={{ fontSize: '18px', fontWeight: 950, color: '#0f172a', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
     <div style={{ width: '32px', height: '32px', background: '#FF943110', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={16} color="#FF9431" />
     </div>
     {children}
  </h3>
);
SectionTitle.propTypes = { children: PropTypes.node.isRequired, icon: PropTypes.elementType.isRequired };

export const MediaKitPreview = ({ open, onClose, creator, stats }) => {
  const [step, setStep] = useState(0); 
  
  useEffect(() => {
    if (open) {
      setStep(0);
      const t1 = setTimeout(() => setStep(1), 1200);
      const t2 = setTimeout(() => setStep(2), 2800);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [open]);

  if (!open) return null;

  const socialList = [
    { type: 'Instagram', handle: `@${creator.slug || 'creator'}`, count: fmt.num(stats.followers), color: '#E4405F' },
    { type: 'YouTube', handle: creator.name, count: '120K', color: '#FF0000' },
    { type: 'LinkedIn', handle: creator.name, count: '15K', color: '#0077B5' },
    { type: 'Twitter', handle: `@${creator.slug || 'creator'}`, count: '42K', color: '#1DA1F2' }
  ];

  const handlePrint = () => {
    const content = document.getElementById('media-kit-export-container');
    if (!content) return;

    const printWindow = document.createElement('iframe');
    printWindow.style.position = 'absolute';
    printWindow.style.top = '-1000px';
    printWindow.style.left = '-1000px';
    document.body.appendChild(printWindow);

    const doc = printWindow.contentWindow.document;
    
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map(s => s.outerHTML)
      .join('');

    doc.open();
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Creator Portfolio - ${creator.name}</title>
          ${styles}
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800;900&display=swap');
            
            * { 
              box-sizing: border-box !important; 
              -webkit-print-color-adjust: exact !important; 
              print-color-adjust: exact !important; 
            }

            html, body { 
              margin: 0 !important; 
              padding: 0 !important; 
              background: #fff !important;
              width: 210mm;
              font-family: 'Inter', sans-serif;
            }

            /* CRITICAL: Flatten all scrollable areas for print */
            div, section, article {
              overflow: visible !important;
              height: auto !important;
              max-height: none !important;
              position: static !important;
            }

            #media-kit-export-container { 
              width: 210mm !important; 
              min-height: 297mm !important; 
              height: auto !important;
              margin: 0 !important; 
              padding: 0 !important;
              box-shadow: none !important; 
              border: none !important;
              background: white !important;
              display: block !important;
              position: relative !important;
              overflow: visible !important;
            }

            /* High-fidelity section guards */
            .printable-section { 
              page-break-inside: avoid !important; 
              break-inside: avoid !important; 
              margin: 0 !important;
              padding: 60px 80px !important;
              width: 100% !important;
              display: block !important;
              background: white !important;
            }

            @page { 
              size: A4 portrait; 
              margin: 0 !important; 
            }

            /* Premium Typography */
            h1 { font-size: 64px !important; letter-spacing: -3px !important; line-height: 1 !important; margin: 0 0 20px 0 !important; }
            h2 { font-size: 22px !important; letter-spacing: -0.5px !important; margin: 0 0 15px 0 !important; }
            
            /* DP Correction */
            .print-dp { 
               width: 180px !important; 
               height: 180px !important; 
               border-radius: 40px !important; 
               object-fit: cover !important; 
               border: 6px solid rgba(255,255,255,0.1) !important;
               box-shadow: 0 15px 30px rgba(0,0,0,0.2) !important;
               display: block !important;
               visibility: visible !important;
            }

            /* Grid Layout for Print */
            .grid-container {
               display: grid !important;
               grid-template-columns: 1.5fr 1fr !important;
               gap: 60px !important;
            }

            /* Remove scrollbars and UI chrome */
            ::-webkit-scrollbar { display: none !important; }
            .no-print { display: none !important; }
          </style>
        </head>
        <body>
          <div id="media-kit-export-container">
            ${content.innerHTML}
          </div>
          <script>
            window.onload = () => {
              // Final check to ensure all images are rendered
              const images = document.getElementsByTagName('img');
              const promises = Array.from(images).map(img => {
                if (img.complete) return Promise.resolve();
                return new Promise(resolve => { img.onload = resolve; img.onerror = resolve; });
              });

              Promise.all(promises).then(() => {
                setTimeout(() => {
                  window.print();
                  setTimeout(() => { window.frameElement.remove(); }, 500);
                }, 1000);
              });
            };
          </script>
        </body>
      </html>
    `;
    doc.open();
    doc.documentElement.innerHTML = html;
    doc.close();
  };

  return (
    <div id="media-kit-modal-overlay" style={{ position: 'fixed', inset: 0, zIndex: 20000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
       <motion.div 
         initial={{ opacity: 0 }} 
         animate={{ opacity: 1 }} 
         exit={{ opacity: 0 }} 
         onClick={onClose}
         style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.96)', backdropFilter: 'blur(20px)' }} 
       />
       
       <motion.div 
         initial={{ opacity: 0, scale: 0.95, y: 30 }}
         animate={{ opacity: 1, scale: 1, y: 0 }}
         style={{ 
           width: '100%', 
           maxWidth: step === 2 ? '1100px' : '500px', 
           maxHeight: '94vh',
           background: '#fff', 
           borderRadius: '48px', 
           position: 'relative', 
           zIndex: 1, 
           overflow: 'hidden',
           display: 'flex',
           flexDirection: 'column',
           boxShadow: '0 60px 150px rgba(0,0,0,0.7)',
           transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
         }}
       >
          {/* Header */}
          <div style={{ padding: '24px 40px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', background: '#FF9431', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <ShieldCheck size={24} color="#fff" />
                </div>
                <div>
                   <h2 style={{ fontSize: '18px', fontWeight: 950, color: '#0f172a', letterSpacing: '-0.5px' }}>CreatorBharat <span style={{ color: '#FF9431' }}>Elite Audit</span></h2>
                   <p style={{ fontSize: '10px', color: '#10B981', fontWeight: 900, letterSpacing: '1.5px' }}>SYSTEM VERSION 4.2 // MASTER CONFIG</p>
                </div>
             </div>
             <button onClick={onClose} style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f8fafc', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                <X size={20} color="#64748b" />
             </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: step === 2 ? '0' : '80px 40px' }}>
             <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div key="step-0" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} style={{ textAlign: 'center' }}>
                     <div style={{ position: 'relative', width: '140px', height: '140px', margin: '0 auto 40px' }}>
                        <motion.div 
                          animate={{ rotate: 360 }} 
                          transition={{ repeat: Infinity, duration: 4, ease: "linear" }} 
                          style={{ position: 'absolute', inset: 0, border: '5px dashed #FF9431', borderRadius: '50%', opacity: 0.4 }} 
                        />
                        <div style={{ position: 'absolute', inset: '15px', background: 'linear-gradient(135deg, #FF9431, #FF5C00)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 15px 30px rgba(255,148,49,0.3)' }}>
                           <Activity size={50} color="#fff" />
                        </div>
                     </div>
                     <h3 style={{ fontSize: '32px', fontWeight: 950, color: '#0f172a', marginBottom: '16px' }}>Auditing Intelligence</h3>
                     <p style={{ fontSize: '18px', color: '#64748b', fontWeight: 500, maxWidth: '400px', margin: '0 auto' }}>Scanning 150+ social signals and real-time conversion patterns.</p>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div key="step-1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ textAlign: 'center' }}>
                     <motion.div 
                       animate={{ scale: [1, 1.1, 1] }} 
                       transition={{ repeat: Infinity, duration: 2 }}
                       style={{ width: '120px', height: '120px', background: '#0f172a', borderRadius: '40px', margin: '0 auto 40px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 30px 60px rgba(0,0,0,0.2)' }}
                     >
                        <Zap size={56} color="#FF9431" fill="#FF9431" />
                     </motion.div>
                     <h3 style={{ fontSize: '32px', fontWeight: 950, color: '#0f172a', marginBottom: '16px' }}>Elite Generation</h3>
                     <p style={{ fontSize: '18px', color: '#64748b', fontWeight: 500 }}>Formatting your professional audit into a brand-ready Creator Resume.</p>
                     <div style={{ maxWidth: '350px', margin: '40px auto 0' }}>
                        <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '100px', overflow: 'hidden' }}>
                           <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5 }} style={{ height: '100%', background: 'linear-gradient(90deg, #FF9431, #FF5C00)' }} />
                        </div>
                     </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '40px' }}>
                     {/* PDF RESUME CONTAINER */}
                     <div id="media-kit-export-container" style={{ maxWidth: '950px', margin: '0 auto', background: '#fff', borderRadius: '40px', boxShadow: '0 50px 120px rgba(0,0,0,0.15)', border: '1.5px solid #f1f5f9', overflow: 'hidden' }}>
                        
                        {/* HERO HEADER */}
                        <div style={{ background: '#0f172a', padding: '100px 80px', position: 'relative', color: '#fff', overflow: 'hidden' }}>
                           <div style={{ position: 'absolute', top: '-150px', left: '-50px', width: '500px', height: '500px', background: '#FF9431', borderRadius: '50%', filter: 'blur(180px)', opacity: 0.12 }} />
                           
                           <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ maxWidth: '550px' }}>
                                 <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'rgba(255,148,49,0.2)', borderRadius: '100px', color: '#FF9431', fontSize: '14px', fontWeight: 950, marginBottom: '32px', border: '1px solid rgba(255,148,49,0.4)', letterSpacing: '1px' }}>
                                    <Star size={16} fill="#FF9431" /> ELITE AUDITED RESUME
                                 </div>
                                 <h1 style={{ fontSize: '72px', fontWeight: 950, letterSpacing: '-0.05em', lineHeight: 0.85, marginBottom: '24px' }}>{creator.name}</h1>
                                 <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                                    {['Tech & Gadgets', 'Business Strategy', 'Creative Arts'].map(tag => (
                                       <span key={tag} style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '12px', fontWeight: 800, color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)' }}>{tag}</span>
                                    ))}
                                 </div>
                                 <p style={{ fontSize: '20px', color: '#cbd5e1', fontWeight: 500, lineHeight: 1.5, opacity: 0.9 }}>
                                    {creator.bio || 'Elite storyteller and digital architect dedicated to crafting high-impact narratives for global brands.'}
                                 </p>
                              </div>
                              <div style={{ width: '220px', height: '220px', borderRadius: '50px', border: '8px solid rgba(255,255,255,0.08)', overflow: 'hidden', transform: 'rotate(4deg)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', background: '#1e293b' }}>
                                 <img 
                                    src={creator.photo} 
                                    crossOrigin="anonymous"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                    className="print-dp" 
                                    alt="dp" 
                                 />
                              </div>
                           </div>
                        </div>

                        {/* DATA ANALYTICS */}
                        <div style={{ padding: '80px' }}>
                           <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '80px' }}>
                              
                              {/* CORE METRICS */}
                              <div className="printable-section">
                                 <SectionTitle icon={TrendingUp}>Performance Audit</SectionTitle>
                                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '60px' }}>
                                    <StatBox label="Total Reach" value={fmt.num(stats.followers)} icon={Globe} color="#3b82f6" />
                                    <StatBox label="Engagements" value={fmt.num(stats.followers * 0.12)} icon={Zap} color="#FF9431" />
                                    <StatBox label="Audience Trust" value="98.2%" icon={ShieldCheck} color="#10B981" />
                                    <StatBox label="Conversion Potential" value="High" icon={TrendingUp} color="#8b5cf6" />
                                 </div>

                                 <SectionTitle icon={Star}>Past Collaborations</SectionTitle>
                                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '60px' }}>
                                    {['Samsung', 'Nike', 'BMW', 'Apple', 'Coca Cola', 'Adobe'].map(brand => (
                                       <div key={brand} style={{ padding: '16px', background: '#f8fafc', borderRadius: '16px', border: '1.5px solid #f1f5f9', textAlign: 'center', fontSize: '13px', fontWeight: 900, color: '#64748b' }}>
                                          {brand}
                                       </div>
                                    ))}
                                 </div>

                                 <SectionTitle icon={Zap}>Digital Footprint</SectionTitle>
                                 <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                    {socialList.map(s => (
                                       <div key={s.type} style={{ padding: '24px', background: '#f8fafc', borderRadius: '24px', border: '1.5px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                             <div style={{ width: '40px', height: '40px', background: s.color, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: `0 8px 16px ${s.color}30` }}>
                                                {s.type[0]}
                                             </div>
                                             <div>
                                                <div style={{ fontSize: '16px', fontWeight: 950, color: '#0f172a' }}>{s.type}</div>
                                                <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>{s.handle}</div>
                                             </div>
                                          </div>
                                          <div style={{ textAlign: 'right' }}>
                                             <div style={{ fontSize: '18px', fontWeight: 950, color: '#0f172a' }}>{s.count}</div>
                                             <div style={{ fontSize: '10px', color: '#10B981', fontWeight: 900 }}>REAL-TIME SYNC</div>
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              </div>

                              {/* AUDIENCE ARCHITECTURE */}
                              <div className="printable-section">
                                 <SectionTitle icon={PieChart}>Audience Architecture</SectionTitle>
                                 <div style={{ background: '#f8fafc', padding: '40px', borderRadius: '40px', border: '1.5px solid #f1f5f9', marginBottom: '60px' }}>
                                    <div style={{ marginBottom: '40px' }}>
                                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                          <span style={{ fontSize: '14px', fontWeight: 950, color: '#0f172a' }}>Geographic Heatmap</span>
                                          <span style={{ fontSize: '14px', fontWeight: 950, color: '#FF9431' }}>Reach</span>
                                       </div>
                                       {[
                                          { c: creator.city || 'Mumbai', p: '48%' },
                                          { c: 'Delhi NCR', p: '32%' },
                                          { c: 'Bangalore', p: '20%' }
                                       ].map(item => (
                                          <div key={item.c} style={{ marginBottom: '20px' }}>
                                             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', fontWeight: 800, color: '#64748b' }}>
                                                <span>{item.c}</span>
                                                <span>{item.p}</span>
                                             </div>
                                             <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '100px', overflow: 'hidden' }}>
                                                <div style={{ height: '100%', background: 'linear-gradient(90deg, #FF9431, #FF5C00)', width: item.p }} />
                                             </div>
                                          </div>
                                       ))}
                                    </div>

                                    <div style={{ fontSize: '14px', fontWeight: 950, color: '#0f172a', marginBottom: '20px' }}>Gender Breakdown</div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                       <div style={{ padding: '24px', background: '#fff', borderRadius: '24px', textAlign: 'center', border: '1.5px solid #e2e8f0' }}>
                                          <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 900, marginBottom: '6px' }}>MALE</div>
                                          <div style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a' }}>68%</div>
                                       </div>
                                       <div style={{ padding: '24px', background: '#fff', borderRadius: '24px', textAlign: 'center', border: '1.5px solid #e2e8f0' }}>
                                          <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 900, marginBottom: '6px' }}>FEMALE</div>
                                          <div style={{ fontSize: '24px', fontWeight: 950, color: '#0f172a' }}>32%</div>
                                       </div>
                                    </div>
                                 </div>

                                 <SectionTitle icon={Globe}>Verified Channels</SectionTitle>
                                 <div style={{ padding: '32px', background: 'linear-gradient(135deg, #0f172a, #1e293b)', borderRadius: '40px', color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: '#FF9431', borderRadius: '50%', filter: 'blur(40px)', opacity: 0.2 }} />
                                    <div style={{ width: '100px', height: '100px', background: '#fff', borderRadius: '20px', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                                       {/* QR Placeholder */}
                                       <div style={{ width: '100%', height: '100%', border: '4px solid #0f172a', display: 'flex', flexWrap: 'wrap' }}>
                                          {['q1','q2','q3','q4','q5','q6','q7','q8','q9','q10','q11','q12','q13','q14','q15','q16'].map((id, i) => (
                                             <div key={id} style={{ width: '25%', height: '25%', background: (i % 3 === 0 || i % 7 === 0) ? '#0f172a' : 'transparent' }} />
                                          ))}
                                       </div>
                                    </div>
                                    <div style={{ fontSize: '14px', fontWeight: 950, marginBottom: '8px' }}>SCAN FOR LIVE AUDIT</div>
                                    <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>CreatorBharat.com/{creator.slug || 'verify'}</div>
                                 </div>
                              </div>
                           </div>

                           {/* FOOTER VERIFICATION */}
                           <div style={{ marginTop: '100px', borderTop: '2.5px solid #f1f5f9', padding: '50px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <div style={{ display: 'flex', gap: '20px' }}>
                                 <div style={{ width: '60px', height: '60px', background: '#0f172a', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ShieldCheck size={32} color="#FF9431" />
                                 </div>
                                 <div>
                                    <div style={{ fontSize: '18px', fontWeight: 950, color: '#0f172a' }}>Verified Creator Resume</div>
                                    <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 700 }}>© {new Date().getFullYear()} CreatorBharat Intelligence System. All data is verified.</div>
                                 </div>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                 <div style={{ fontSize: '12px', fontWeight: 950, color: '#0f172a', letterSpacing: '2px' }}>PRO AUDIT v4.2</div>
                                 <div style={{ fontSize: '10px', color: '#cbd5e1', fontWeight: 800 }}>UID: {Math.random().toString(36).substring(2, 15).toUpperCase()}</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>

          {/* Footer */}
          {step === 2 && (
             <div className="no-print" style={{ padding: '24px 40px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '16px', background: '#fff' }}>
                <button onClick={handlePrint} style={{ flex: 1, padding: '18px', borderRadius: '100px', background: '#FF9431', color: '#fff', border: 'none', fontWeight: 950, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 15px 30px rgba(255,148,49,0.3)', fontSize: '16px' }}>
                   <Download size={22} /> Export & Download Creator Resume
                </button>
                <button onClick={onClose} style={{ padding: '18px 40px', borderRadius: '100px', background: '#f8fafc', color: '#64748b', border: '1.5px solid #f1f5f9', fontWeight: 950, cursor: 'pointer', fontSize: '16px' }}>
                   Close
                </button>
             </div>
          )}
       </motion.div>
    </div>
  );
};

MediaKitPreview.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  creator: PropTypes.object.isRequired,
  stats: PropTypes.object.isRequired
};
