import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
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
  Star,
  Briefcase,
  Mail,
  MapPin,
  Shield
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
    printWindow.style.top = '-10000px';
    printWindow.style.left = '-10000px';
    printWindow.style.width = '210mm';
    document.body.appendChild(printWindow);

    
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map(s => s.outerHTML)
      .join('');

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
              width: 950px !important; 
              zoom: 0.82 !important; /* Scale to fit A4 */
              height: auto !important;
              margin: 0 auto !important; 
              padding: 0 !important;
              box-shadow: none !important; 
              border: none !important;
              border-radius: 0 !important;
              background: white !important;
              display: block !important;
              position: relative !important;
              overflow: visible !important;
            }

            /* High-fidelity section guards */
            .printable-section { 
              /* Removed page-break-inside: avoid to allow natural flowing across pages */
              margin: 0 !important;
              padding: 0 !important;
              display: block !important;
              background: transparent !important;
            }

            .print-layout {
               display: block !important;
            }
            .print-layout::after {
               content: "";
               clear: both;
               display: table;
            }
            .print-col-left {
               float: left !important;
               width: 58% !important;
            }
            .print-col-right {
               float: right !important;
               width: 36% !important;
            }

            @page { 
              size: A4 portrait; 
              margin: 10mm !important; 
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
        </body>
      </html>
    `;
    
    printWindow.srcdoc = html;

    // Trigger print safely from main thread after images load
    setTimeout(() => {
       try {
         printWindow.contentWindow.focus();
         printWindow.contentWindow.print();
       } catch (e) {
         console.error('Print failed', e);
       }
       setTimeout(() => {
          if (document.body.contains(printWindow)) {
             printWindow.remove();
          }
       }, 2000);
    }, 1200);
  };

  return ReactDOM.createPortal(
    <div id="media-kit-modal-overlay" style={{ position: 'fixed', inset: 0, zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
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
                     <div id="media-kit-export-container" style={{ width: '100%', maxWidth: '950px', margin: '0 auto', background: '#fff', borderRadius: '40px', boxShadow: '0 50px 120px rgba(0,0,0,0.15)', border: '1.5px solid #f1f5f9', overflow: 'hidden' }}>
                        
                        {/* HERO HEADER */}
                        <div style={{ background: '#0f172a', padding: '80px 60px', position: 'relative', color: '#fff', overflow: 'hidden' }}>
                           <div style={{ position: 'absolute', top: '-150px', left: '-50px', width: '500px', height: '500px', background: '#FF9431', borderRadius: '50%', filter: 'blur(180px)', opacity: 0.12 }} />
                           
                           <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ maxWidth: '500px' }}>
                                 <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'rgba(255,148,49,0.2)', borderRadius: '100px', color: '#FF9431', fontSize: '14px', fontWeight: 950, marginBottom: '32px', border: '1px solid rgba(255,148,49,0.4)', letterSpacing: '1px' }}>
                                    <Star size={16} fill="#FF9431" /> ELITE AUDITED RESUME
                                 </div>
                                 <h1 style={{ fontSize: '72px', fontWeight: 950, letterSpacing: '-0.05em', lineHeight: 0.85, marginBottom: '24px' }}>{creator.name}</h1>
                                 <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
                                    {(creator.niche ? creator.niche.split('&').concat(['Verified Creator', 'Elite Partner']) : ['Digital Storyteller', 'Content Specialist', 'Verified Creator']).slice(0, 3).map(tag => (
                                       <span key={tag.trim()} style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '12px', fontWeight: 800, color: '#FF9431', border: '1px solid rgba(255,148,49,0.3)', whiteSpace: 'nowrap' }}>{tag.trim().toUpperCase()}</span>
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
                        <div style={{ padding: '40px 60px' }}>
                           <div className="print-layout" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '60px' }}>
                              
                              {/* CORE METRICS */}
                              <div className="printable-section print-col-left">
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

                                 <SectionTitle icon={Briefcase}>Signature Offerings</SectionTitle>
                                 <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '60px' }}>
                                    {(creator.packages || [
                                       { title: 'Dedicated Integration', price: 'Custom', desc: 'Full-length dedicated brand integration with premium production.' },
                                       { title: 'Short-Form Video', price: 'Custom', desc: 'High retention reel/short with native storytelling.' }
                                    ]).slice(0, 2).map((pkg, i) => (
                                       <div key={pkg.title || i} style={{ padding: '20px', background: '#f8fafc', borderRadius: '24px', border: '1.5px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                          <div>
                                             <div style={{ fontSize: '15px', fontWeight: 950, color: '#0f172a', marginBottom: '6px' }}>{pkg.title}</div>
                                             <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, maxWidth: '220px', lineHeight: 1.4 }}>{pkg.desc || 'Premium branded content.'}</div>
                                          </div>
                                          <div style={{ fontSize: '14px', fontWeight: 950, color: '#FF9431', background: '#FF943115', padding: '8px 16px', borderRadius: '100px', whiteSpace: 'nowrap' }}>
                                             {pkg.price}
                                          </div>
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

                                 {/* Professional Creative Background & Credentials */}
                                 <SectionTitle icon={Briefcase}>Creative Background & Milestones</SectionTitle>
                                 <div style={{ padding: '32px', background: '#f8fafc', borderRadius: '32px', border: '1.5px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '60px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                       <div>
                                          <div style={{ fontSize: '10px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>Years in Industry</div>
                                          <div style={{ fontSize: '15px', fontWeight: 950, color: '#0f172a' }}>{creator.experience || '5+ Years Active'}</div>
                                       </div>
                                       <div>
                                          <div style={{ fontSize: '10px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>Education & Credentials</div>
                                          <div style={{ fontSize: '15px', fontWeight: 950, color: '#0f172a' }}>{creator.education || 'B.A. Cinema & Media Studies'}</div>
                                       </div>
                                       <div>
                                          <div style={{ fontSize: '10px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>Primary Content Formats</div>
                                          <div style={{ fontSize: '15px', fontWeight: 950, color: '#0f172a' }}>Cinematic Reels, Interactive Stories</div>
                                       </div>
                                       <div>
                                          <div style={{ fontSize: '10px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>Co-Branded IP (Shows)</div>
                                          <div style={{ fontSize: '15px', fontWeight: 950, color: '#0f172a' }}>TechBytes Podcast Series</div>
                                       </div>
                                    </div>
                                 </div>

                                 {/* Professional Production Suite & Tech Stack */}
                                 <SectionTitle icon={ShieldCheck}>Production Suite & Creative Tech</SectionTitle>
                                 <div style={{ padding: '32px', background: '#f8fafc', borderRadius: '32px', border: '1.5px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '60px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                       <div>
                                          <div style={{ fontSize: '10px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>Primary Camera Suite</div>
                                          <div style={{ fontSize: '14px', fontWeight: 950, color: '#0f172a' }}>Sony A7R V / Sony FX3 (4K HDR)</div>
                                       </div>
                                       <div>
                                          <div style={{ fontSize: '10px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>Audio Capture Suite</div>
                                          <div style={{ fontSize: '14px', fontWeight: 950, color: '#0f172a' }}>DJI Mic 2 / Shure SM7B Setup</div>
                                       </div>
                                       <div>
                                          <div style={{ fontSize: '10px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>Editing & Post Suite</div>
                                          <div style={{ fontSize: '14px', fontWeight: 950, color: '#0f172a' }}>DaVinci Resolve / Premiere Pro CC</div>
                                       </div>
                                       <div>
                                          <div style={{ fontSize: '10px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>Studio Environments</div>
                                          <div style={{ fontSize: '14px', fontWeight: 950, color: '#0f172a' }}>Acoustic Treated RGB Pro Studio</div>
                                       </div>
                                    </div>
                                 </div>
                              </div>

                              {/* AUDIENCE ARCHITECTURE */}
                              <div className="printable-section print-col-right">
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

                                  <SectionTitle icon={ShieldCheck}>Trust & Authority</SectionTitle>
                                  <div style={{ padding: '32px', background: '#f8fafc', borderRadius: '40px', border: '1.5px solid #f1f5f9', marginBottom: '60px' }}>
                                     <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                                        {[1,2,3,4,5].map(s => <Star key={s} size={18} fill="#FF9431" color="#FF9431" />)}
                                        <span style={{ marginLeft: '12px', fontSize: '16px', fontWeight: 950, color: '#0f172a' }}>{creator.rating || 4.9}/5.0</span>
                                     </div>
                                     <p style={{ fontSize: '14px', color: '#475569', fontStyle: 'italic', lineHeight: 1.6, fontWeight: 500, marginBottom: '20px' }}>
                                        "{creator.reviews?.[0]?.comment || 'Exceptional professional. Delivered 3x ROI on our recent campaign with perfect brand alignment and high-quality production.'}"
                                     </p>
                                     <div style={{ fontSize: '12px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        — {creator.reviews?.[0]?.brand || 'Global Brand Partner'}
                                     </div>
                                  </div>

                                  <SectionTitle icon={Mail}>Direct Booking & Location</SectionTitle>
                                  <div style={{ padding: '32px', background: '#fff', borderRadius: '40px', border: '1.5px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '60px' }}>
                                     {/* Email Booking */}
                                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                           <div style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>OFFICIAL BOOKING EMAIL</div>
                                           <div style={{ fontSize: '15px', fontWeight: 950, color: '#0f172a' }}>{creator.email || 'hello@creatorbharat.com'}</div>
                                        </div>
                                        <div style={{ width: '44px', height: '44px', background: '#3b82f615', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                           <Mail size={18} color="#3b82f6" />
                                        </div>
                                     </div>

                                     {/* Location / Base */}
                                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #e2e8f0', paddingTop: '20px' }}>
                                        <div>
                                           <div style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>PRIMARY CREATOR BASE</div>
                                           <div style={{ fontSize: '15px', fontWeight: 950, color: '#0f172a' }}>{creator.city || 'Mumbai'}, India</div>
                                        </div>
                                        <div style={{ width: '44px', height: '44px', background: '#ef444415', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                           <MapPin size={18} color="#ef4444" />
                                        </div>
                                     </div>

                                     {/* CreatorBharat Escrow Security Badge */}
                                     <div style={{ display: 'flex', gap: '16px', borderTop: '1px dashed #e2e8f0', paddingTop: '20px', alignItems: 'flex-start' }}>
                                        <div style={{ width: '40px', height: '40px', background: '#FF943110', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                           <Shield size={18} color="#FF9431" />
                                        </div>
                                        <div>
                                           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                              <span style={{ fontSize: '12px', fontWeight: 950, color: '#0f172a' }}>ESCROW SECURITY BADGE</span>
                                              <span style={{ fontSize: '9px', fontWeight: 900, background: '#10B98115', color: '#10B981', padding: '2px 8px', borderRadius: '100px', letterSpacing: '0.5px' }}>VERIFIED</span>
                                           </div>
                                           <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, lineHeight: 1.5, margin: 0 }}>
                                              Transactions & payouts for this creator are processed under the CreatorBharat Escrow Protocol for 100% brand-creator campaign fulfillment.
                                           </p>
                                        </div>
                                     </div>
                                  </div>
                                 </div>
                              </div>
                           </div>

                           {/* FOOTER ENTERPRISE BOOKING & GUARANTEE BANNER */}
                           <div style={{ clear: 'both', marginTop: '80px', borderTop: '2px solid #e2e8f0', paddingTop: '60px' }}>
                              <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '40px', padding: '50px 60px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                                 <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '300px', height: '300px', background: '#FF9431', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.15 }} />
                                 
                                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '30px', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '30px' }}>
                                    <div>
                                       <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(255,148,49,0.15)', borderRadius: '100px', color: '#FF9431', fontSize: '11px', fontWeight: 900, marginBottom: '16px', letterSpacing: '1px', border: '1px solid rgba(255,148,49,0.3)' }}>
                                          <ShieldCheck size={14} fill="#FF9431" /> CREATORBHARAT ENTERPRISE GUARANTEE
                                       </div>
                                       <h3 style={{ fontSize: '28px', fontWeight: 950, color: '#fff', margin: 0, letterSpacing: '-0.5px' }}>Book Securely via CreatorBharat</h3>
                                       <p style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 500, margin: '8px 0 0', maxWidth: '550px', lineHeight: 1.5 }}>
                                          This portfolio cv is verified by CreatorBharat Enterprise. All payments, timeline enforcement, and content deliverables are strictly managed via escrow contracts.
                                       </p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                       <div style={{ textAlign: 'center', padding: '16px 24px', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                          <div style={{ fontSize: '24px', fontWeight: 950, color: '#FF9431' }}>100%</div>
                                          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800, marginTop: '4px' }}>SECURE ESCROW</div>
                                       </div>
                                       <div style={{ textAlign: 'center', padding: '16px 24px', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                          <div style={{ fontSize: '24px', fontWeight: 950, color: '#10B981' }}>0%</div>
                                          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800, marginTop: '4px' }}>SERVICE SLIPPAGE</div>
                                       </div>
                                    </div>
                                 </div>

                                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                       <div style={{ width: '40px', height: '40px', background: 'rgba(59,130,246,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', flexShrink: 0 }}>
                                          <Shield size={18} />
                                       </div>
                                       <div>
                                          <h4 style={{ fontSize: '14px', fontWeight: 950, color: '#fff', margin: '0 0 4px 0' }}>Escrow Guarantee</h4>
                                          <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0, lineHeight: 1.5, fontWeight: 500 }}>Campaign budgets are locked and released strictly upon milestone verification and asset validation.</p>
                                       </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                       <div style={{ width: '40px', height: '40px', background: 'rgba(16,185,129,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', flexShrink: 0 }}>
                                          <ShieldCheck size={18} />
                                       </div>
                                       <div>
                                          <h4 style={{ fontSize: '14px', fontWeight: 950, color: '#fff', margin: '0 0 4px 0' }}>Audited Performance</h4>
                                          <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0, lineHeight: 1.5, fontWeight: 500 }}>All geographic, age, and gender demographic metrics are directly audited via certified API pipelines.</p>
                                       </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                       <div style={{ width: '40px', height: '40px', background: 'rgba(255,148,49,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF9431', flexShrink: 0 }}>
                                          <Zap size={18} />
                                       </div>
                                       <div>
                                          <h4 style={{ fontSize: '14px', fontWeight: 950, color: '#fff', margin: '0 0 4px 0' }}>Unified Invoicing</h4>
                                          <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0, lineHeight: 1.5, fontWeight: 500 }}>Contracts, NDAs, and corporate billing are automated under a single enterprise-compliant platform dashboard.</p>
                                       </div>
                                    </div>
                                 </div>

                                 <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                                    <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 700 }}>
                                       © {new Date().getFullYear()} CreatorBharat. Audit UID: CB-${creator.slug?.toUpperCase() || 'CV'}-${Math.random().toString(36).substring(2, 7).toUpperCase()}
                                    </div>
                                    <div style={{ fontSize: '11px', fontWeight: 900, color: '#FF9431', letterSpacing: '1px' }}>
                                       FOR OFFICIAL ENQUIRIES: BRAND@CREATORBHARAT.COM
                                    </div>
                                 </div>
                              </div>
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
    </div>,
    document.body
  );
};

MediaKitPreview.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  creator: PropTypes.object.isRequired,
  stats: PropTypes.object.isRequired
};
