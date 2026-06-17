import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Search, 
  Bell, 
  CheckCheck, 
  ChevronRight, 
  X,
  ExternalLink,
  ShieldAlert,
  Calendar,
  Building,
  Flag
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Seo from '@/components/common/SEO';
import { useApp } from '@/core/context';

const GOVT_CIRCULARS = [
  {
    id: 'notif-1',
    refNo: 'CB/GOVT/2026/SEC-4/082',
    date: '17-06-2026',
    department: 'Dept. of Verification & Trust',
    deptHi: 'सत्यापन एवं विश्वास विभाग',
    title: 'BharatAI Profile Verification Engine Launched Under Section 4(a) 🛡️',
    titleHi: 'धारा 4(a) के तहत भारतएआई प्रोफाइल सत्यापन प्रणाली का शुभारंभ',
    description: 'All creators operating in Tier 2 & 3 regions of India are hereby notified to claim their official verified badge by submitting authentic audience engagement proofs. Verified profiles receive priority matching in brand campaign allotment. Compliance boosts creator visibility by up to 85%.',
    pdfName: 'CB_Verification_Gazette_v3.pdf',
    status: 'ACTIVE',
    signatory: 'Dr. R. K. Sen, Joint Secretary (Creator Welfare)',
    actionText: 'Apply for Verification',
    actionPath: '/join'
  },
  {
    id: 'notif-2',
    refNo: 'CB/GOVT/2026/MKT-9/104',
    date: '16-06-2026',
    department: 'Dept. of Campaign & Escrow Operations',
    deptHi: 'अभियान एवं एस्क्रो संचालन विभाग',
    title: 'Notification: Launch of Rajasthan Regional Spotlight Campaign 🏺',
    titleHi: 'अधिसूचना: राजस्थान क्षेत्रीय अभियान आवंटन सूचना',
    description: 'Applications are invited from eligible fashion, cultural, and lifestyle creators in Rajasthan for the Jaipur Heritage Promotion Spotlight. Budget allocation is guaranteed under official escrow protection terms. Direct payouts will be executed with zero commissions. Retainers start at ₹25,000 per asset.',
    pdfName: 'CB_Raj_Spotlight_Circular.pdf',
    status: 'ACTIVE',
    signatory: 'Smt. Anjali Sharma, Director (Campaign Allocation)',
    actionText: 'View Allotments',
    actionPath: '/creators'
  },
  {
    id: 'notif-3',
    refNo: 'CB/GOVT/2026/DIR-3/011',
    date: '14-06-2026',
    department: 'Ecosystem Registry Office',
    deptHi: 'पारिस्थितिकी तंत्र रजिस्ट्री कार्यालय',
    title: 'Release of Weekly Top 100 Virality Index & Leaderboard 🏆',
    titleHi: 'साप्ताहिक शीर्ष 100 क्रिएटर्स की वायरल सूचकांक सूची जारी',
    description: 'The national registry of top performing regional creators is updated for the current cycle. Weekly statistics are logged to measure authentic organic reach. Creators appearing in the top decile are recommended for government-partnered regional campaigns.',
    pdfName: 'CB_Leaderboard_Registry_W24.pdf',
    status: 'PUBLISHED',
    signatory: 'Shri Amit Verma, Registrar (Creator Stats)',
    actionText: 'Open Leaderboard',
    actionPath: '/leaderboard'
  },
  {
    id: 'notif-4',
    refNo: 'CB/GOVT/2026/PAY-1/056',
    date: '10-06-2026',
    department: 'Finance & Payout Regulation Board',
    deptHi: 'वित्त एवं भुगतान विनियमन बोर्ड',
    title: 'Regulation: 0% Platform Commission Escrow Mandate 💳',
    titleHi: 'विनियमन: 0% एस्क्रो सुरक्षा भुगतान प्रणाली का अनिवार्य उपयोग',
    description: 'In order to protect creator revenues, the escrow payment system is updated. All campaign agreements executed on the CreatorBharat registry are mandated to secure funds in escrow. 100% payout security guarantee applies with zero platform commission deductions.',
    pdfName: 'CB_Escrow_Mandate_2026.pdf',
    status: 'MANDATED',
    signatory: 'Dr. R. K. Sen, Joint Secretary (Creator Welfare)',
    actionText: 'Read Payout Policy',
    actionPath: '/pricing'
  }
];

export default function NotificationsHub() {
  const navigate = useNavigate();
  const { dsp } = useApp();
  const [circulars, setCirculars] = useState(GOVT_CIRCULARS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDept, setActiveDept] = useState('all');
  const [selectedCircular, setSelectedCircular] = useState(null);

  useEffect(() => {
    if (selectedCircular) {
      dsp({ t: 'UI', v: { hideNav: true } });
    } else {
      dsp({ t: 'UI', v: { hideNav: false } });
    }
    return () => {
      dsp({ t: 'UI', v: { hideNav: false } });
    };
  }, [selectedCircular, dsp]);

  const filteredCirculars = useMemo(() => {
    return circulars.filter(c => {
      const matchesSearch = 
        c.refNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDept = activeDept === 'all' || c.department.includes(activeDept);
      
      return matchesSearch && matchesDept;
    });
  }, [circulars, searchTerm, activeDept]);

  return (
    <div className="gazette-wrapper">
      <style>{`
        .gazette-wrapper {
          min-height: 100vh;
          background: #f1f5f9;
          padding-top: 110px;
          padding-bottom: 130px; /* Clears floating mobile dock navigation */
          font-family: "Times New Roman", Times, serif;
          color: #1e293b;
        }
        @media (min-width: 768px) {
          .gazette-wrapper {
            padding-bottom: 80px;
          }
        }
      `}</style>
      <Seo 
        title="Official Gazette - Notification Board" 
        description="Official circulars, notifications, and gazette orders from the Creator State Authority of Bharat."
      />

      {/* Tricolor Ribbon at Top of Page */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '6px',
        background: 'linear-gradient(90deg, #FF9431 33%, #FFFFFF 33%, #FFFFFF 66%, #138808 66%)',
        zIndex: 1000
      }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 16px', boxSizing: 'border-box' }}>
        
        {/* Government Portal Header */}
        <div style={{
          background: '#ffffff',
          border: '2px solid #cbd5e1',
          borderBottom: '4px double #475569',
          borderRadius: '8px 8px 0 0',
          padding: '24px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
        }}>
          {/* Stylized State Seal */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '14px', gap: '10px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '2px solid #1e293b',
              background: '#FFF7ED',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FF9431',
              fontWeight: 900
            }}>
              <Flag size={28} style={{ transform: 'rotate(-10deg)', color: '#FF9431' }} />
            </div>
          </div>
          
          <h2 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 800, letterSpacing: '2px', color: '#475569', textTransform: 'uppercase' }}>
            सृजक राज्य प्राधिकरण · भारत सरकार
          </h2>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 900, letterSpacing: '1.5px', color: '#1e293b', textTransform: 'uppercase' }}>
            Creator State Authority of Bharat
          </h1>
          <p style={{ margin: '0 0 16px 0', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Official Gazette & Notification Board · प्राधिकृत प्रकाशन
          </p>
          
          <div style={{ height: '1px', background: '#e2e8f0', margin: '0 auto 16px', width: '80%' }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#475569', fontWeight: 700, flexWrap: 'wrap', gap: 10 }}>
            <span>BOARD NO: CSAB-2026/GZ-04</span>
            <span style={{ color: '#138808' }}>● SYSTEM ONLINE</span>
            <span>ISSUE DATE: 17 JUN 2026</span>
          </div>
        </div>

        {/* Latest Flash Marquee Ticker */}
        <div style={{
          background: '#1e293b',
          color: '#f8fafc',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontSize: '13px',
          fontWeight: 700,
          border: '2px solid #1e293b',
          borderTop: 'none',
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
          overflow: 'hidden'
        }}>
          <span style={{ background: '#ef4444', color: '#fff', padding: '2px 8px', borderRadius: '2px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
            Flash Order
          </span>
          <marquee scrollamount="4" style={{ margin: 0 }}>
            ALERT: Under Section 4(a), all Indian creators are requested to claim their verified profile status. Escrow security mandate is strictly active. Direct campaigns from Tier 2 & 3 districts are now onboarding.
          </marquee>
        </div>

        {/* Filters and Controls */}
        <div style={{
          background: '#ffffff',
          border: '2px solid #cbd5e1',
          borderTop: 'none',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
        }}>
          {/* Search bar */}
          <div style={{ position: 'relative', display: 'flex', width: '100%' }}>
            <Search size={16} style={{ position: 'absolute', left: 14, top: 14, color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search Gazette orders by Ref No, Title, keyword..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 40px',
                background: '#f8fafc',
                border: '1.5px solid #cbd5e1',
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'inherit',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={e => e.currentTarget.style.borderColor = '#1e293b'}
              onBlur={e => e.currentTarget.style.borderColor = '#cbd5e1'}
            />
          </div>

          {/* Department Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
            {[
              { id: 'all', label: 'All Departments / सभी विभाग' },
              { id: 'Verification', label: 'Verification & Trust' },
              { id: 'Campaign', label: 'Campaigns & Allotment' },
              { id: 'Finance', label: 'Finance & Payments' }
            ].map(tab => {
              const active = activeDept === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveDept(tab.id)}
                  style={{
                    padding: '8px 16px',
                    background: active ? '#1e293b' : '#f8fafc',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '4px',
                    color: active ? '#fff' : '#475569',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gazette Main Table */}
        <div style={{
          background: '#ffffff',
          border: '2px solid #cbd5e1',
          borderTop: 'none',
          borderRadius: '0 0 8px 8px',
          overflowX: 'auto',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontSize: '14px'
          }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
                <th style={{ padding: '16px 20px', fontWeight: 800, color: '#475569', width: '150px' }}>Circular ID</th>
                <th style={{ padding: '16px 20px', fontWeight: 800, color: '#475569', width: '100px' }}>Issue Date</th>
                <th style={{ padding: '16px 20px', fontWeight: 800, color: '#475569', width: '180px' }}>Department</th>
                <th style={{ padding: '16px 20px', fontWeight: 800, color: '#475569' }}>Subject (विवरण)</th>
                <th style={{ padding: '16px 20px', fontWeight: 800, color: '#475569', width: '140px', textAlign: 'center' }}>Official Order</th>
              </tr>
            </thead>
            <tbody>
              {filteredCirculars.length > 0 ? (
                filteredCirculars.map(c => (
                  <tr 
                    key={c.id} 
                    style={{ borderBottom: '1px solid #e2e8f0', cursor: 'pointer', transition: 'background 0.2s' }}
                    onClick={() => setSelectedCircular(c)}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#FFFbeb'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#ffffff'}
                  >
                    <td style={{ padding: '16px 20px', fontWeight: 700, color: '#1e293b' }}>
                      {c.refNo}
                    </td>
                    <td style={{ padding: '16px 20px', color: '#64748b', fontWeight: 600 }}>{c.date}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 700, fontSize: '13px', color: '#334155' }}>{c.department}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: 2 }}>{c.deptHi}</div>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{c.title}</div>
                      <div style={{ fontSize: '12px', color: '#64748b', fontStyle: 'italic' }}>{c.titleHi}</div>
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCircular(c);
                        }}
                        style={{
                          background: '#fee2e2',
                          border: '1px solid #fecaca',
                          color: '#dc2626',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6
                        }}
                      >
                        <FileText size={13} />
                        <span>View Gazette</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ padding: '48px 24px', textAlign: 'center', color: '#94a3b8' }}>
                    <ShieldAlert size={36} style={{ marginBottom: 12, opacity: 0.4 }} />
                    <div style={{ fontWeight: 700, fontSize: '16px', color: '#475569' }}>No Circulars Matching Search Criteria</div>
                    <div style={{ fontSize: '13px', marginTop: 4 }}>सर्च फिल्टर से मेल खाने वाला कोई दस्तावेज़ नहीं मिला।</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Disclaimer */}
        <div style={{ marginTop: '24px', textAlign: 'center', color: '#64748b', fontSize: '12px', lineHeight: '1.6', fontWeight: 600 }}>
          <p>Disclaimer: This is the official digital bulletin for the CreatorBharat registry. All published circulars carry legal standing for onboarding participants.</p>
          <p>अस्वीकरण: यह सृजकभारत रजिस्ट्री का आधिकारिक डिजिटल बुलेटिन है। सभी प्रकाशित आदेश मान्य एवं लागू हैं।</p>
        </div>
      </div>

      {/* Gazette Circular Paper Modal PopUp */}
      <AnimatePresence>
        {selectedCircular && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15,23,42,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 9999,
            overflowY: 'auto'
          }}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              style={{
                background: '#faf9f6', // Parchment Paper color
                border: '2px solid #475569',
                borderRadius: '8px',
                width: '100%',
                maxWidth: '680px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
                position: 'relative',
                overflow: 'hidden',
                fontFamily: '"Times New Roman", Times, serif'
              }}
            >
              {/* Paper Top Tricolor Border */}
              <div style={{ height: '4px', background: 'linear-gradient(90deg, #FF9431 33%, #FFFFFF 33%, #FFFFFF 66%, #138808 66%)' }} />

              {/* Close Button */}
              <button 
                onClick={() => setSelectedCircular(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: '#f1f5f9',
                  border: '1.5px solid #cbd5e1',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  color: '#475569',
                  transition: '0.15s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.color = '#dc2626'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#475569'; }}
              >
                <X size={16} />
              </button>

              {/* Gazette Circular Content */}
              <div style={{ padding: '40px', boxSizing: 'border-box' }}>
                
                {/* Paper Header */}
                <div style={{ textAlign: 'center', borderBottom: '2px solid #1e293b', paddingBottom: '20px', marginBottom: '24px' }}>
                  <h3 style={{ margin: '0 0 4px', fontSize: '13px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
                    THE GAZETTE OF BHARAT · भारत का राजपत्र
                  </h3>
                  <h2 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', color: '#1e293b' }}>
                    CREATOR STATE AUTHORITY
                  </h2>
                  <h4 style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: '#64748b', letterSpacing: '1.5px' }}>
                    PUBLISHED BY AUTHORITY / प्राधिकार से प्रकाशित
                  </h4>
                </div>

                {/* Meta details */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '24px', borderBottom: '1px dashed #cbd5e1', paddingBottom: '12px' }}>
                  <div>
                    <div>ORDER REF: {selectedCircular.refNo}</div>
                    <div style={{ marginTop: 4 }}>DEPT: {selectedCircular.department}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div>DATE: {selectedCircular.date}</div>
                    <div style={{ color: '#138808', marginTop: 4 }}>STATUS: {selectedCircular.status}</div>
                  </div>
                </div>

                {/* Circular Title (Bilingual) */}
                <div style={{ marginBottom: '24px' }}>
                  <h1 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', margin: '0 0 8px', lineHeight: 1.3 }}>
                    {selectedCircular.title}
                  </h1>
                  <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#475569', margin: 0, lineHeight: 1.3, fontStyle: 'italic' }}>
                    {selectedCircular.titleHi}
                  </h2>
                </div>

                {/* Body Text */}
                <div style={{ 
                  fontSize: '14.5px', 
                  color: '#1e293b', 
                  lineHeight: '1.8', 
                  fontWeight: 500, 
                  textAlign: 'justify', 
                  whiteSpace: 'pre-line',
                  marginBottom: '32px',
                  background: 'radial-gradient(circle, rgba(255,148,49,0.01) 0%, transparent 80%)',
                  padding: '10px'
                }}>
                  {selectedCircular.description}
                </div>

                {/* Signatory Seal Stamp Area */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
                  
                  {/* Round Seal Watermark Mock */}
                  <div style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    border: '2px dashed rgba(255, 148, 49, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255, 148, 49, 0.5)',
                    fontSize: '9px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    transform: 'rotate(-15deg)',
                    userSelect: 'none'
                  }}>
                    <span>STATE SEAL</span>
                    <span style={{ fontSize: '7px', marginTop: 2 }}>APPROVED</span>
                    <span style={{ fontSize: '6px' }}>SEC-WELFARE</span>
                  </div>

                  {/* Signature block */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontStyle: 'italic', fontSize: '14px', fontFamily: '"Brush Script MT", cursive, sans-serif', color: '#475569', marginBottom: 4 }}>
                      {selectedCircular.signatory.split(',')[0]}
                    </div>
                    <div style={{ height: '1.5px', background: '#94a3b8', width: '160px', marginLeft: 'auto', marginBottom: 6 }} />
                    <div style={{ fontSize: '12px', fontWeight: 900, color: '#1e293b' }}>
                      {selectedCircular.signatory}
                    </div>
                    <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginTop: 2 }}>
                      Creator State Authority of Bharat
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div style={{ display: 'flex', gap: 12, marginTop: '36px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
                  <button
                    onClick={() => {
                      setSelectedCircular(null);
                      navigate(selectedCircular.actionPath);
                    }}
                    style={{
                      background: '#1e293b',
                      color: '#fff',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '4px',
                      fontSize: '13px',
                      fontWeight: 800,
                      fontFamily: 'inherit',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <span>Execute Gazette Order</span>
                    <ExternalLink size={13} />
                  </button>

                  <button
                    onClick={() => {
                      alert(`Gazette order ${selectedCircular.refNo} has been downloaded as PDF (mock).`);
                    }}
                    style={{
                      background: '#ffffff',
                      color: '#475569',
                      border: '1.5px solid #cbd5e1',
                      padding: '10px 20px',
                      borderRadius: '4px',
                      fontSize: '13px',
                      fontWeight: 800,
                      fontFamily: 'inherit',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <Download size={13} />
                    <span>Download Circular</span>
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
