import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context';
import { Btn } from '../Primitives';

// ── Constants ──────────────────────────────────────────────────────────────

const SPOKE_KEYS = Array.from({ length: 12 }, (_, i) => `spoke-id-${i}`);

// ── Sub-components to reduce Cognitive Complexity ────────────────────────

function StepIndicators({ step, setStep, duration }) {
  return [1, 2, 3, 4].map(i => (
    <button
      key={`step-ind-${i}`}
      onClick={() => setStep(i)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setStep(i); }}
      aria-label={`Go to step ${i}`}
      style={{
        flex: 1, height: 3, borderRadius: 10, background: 'rgba(0,0,0,0.05)',
        cursor: 'pointer', position: 'relative', overflow: 'hidden',
        border: 'none', padding: 0
      }}
    >
      {step === i && (
        <motion.div
          key={`prog-${i}`}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
          style={{ position: 'absolute', inset: 0, background: '#FF9431' }}
        />
      )}
      {step > i && <div style={{ position: 'absolute', inset: 0, background: '#FF9431' }} />}
    </button>
  ));
}

StepIndicators.propTypes = {
  step: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired
};

function PhoneMockup({ children, mob }) {
  const scale = mob ? 0.8 : 1;
  return (
    <div style={{
      width: 190, height: 380, background: '#111', borderRadius: 36, padding: 5,
      position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)',
      transform: `scale(${scale})`, transformOrigin: 'top center',
      marginBottom: mob ? -60 : 0
    }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 60, height: 16, background: '#111', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, zIndex: 10 }} />
      <div style={{ width: '100%', height: '100%', background: '#fff', borderRadius: 32, overflowY: 'hidden', position: 'relative' }}>
        {children}
      </div>
    </div>
  );
}

PhoneMockup.propTypes = {
  children: PropTypes.node,
  mob: PropTypes.bool
};

// ── Screen components ──────────────────────────────────────────────────────

function IdentityScreen() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 60, background: 'linear-gradient(45deg, #FF9431, #DC2626)', position: 'relative', flexShrink: 0 }}>
        <div style={{ position: 'absolute', bottom: -20, left: 16, width: 40, height: 40, borderRadius: '50%', border: '2px solid #fff', background: '#eee' }}>
          <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} alt="" />
        </div>
      </div>
      <div style={{ padding: 16, paddingTop: 28, flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 900 }}>Aryan Sharma ✅</div>
        <div style={{ fontSize: 7, color: '#FF9431', fontWeight: 900 }}>FASHION • JAIPUR</div>
        <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          <div style={{ background: '#f8f9fa', padding: 6, borderRadius: 8, textAlign: 'center', border: '1px solid rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 9, fontWeight: 900 }}>450k+</div>
            <div style={{ fontSize: 5, opacity: 0.5 }}>REACH</div>
          </div>
          <div style={{ background: '#f8f9fa', padding: 6, borderRadius: 8, textAlign: 'center', border: '1px solid rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 9, fontWeight: 900 }}>8.2%</div>
            <div style={{ fontSize: 5, opacity: 0.5 }}>ENGAGE</div>
          </div>
        </div>
        <div style={{ marginTop: 10, height: 28, background: '#111', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 8, fontWeight: 800 }}>Connect Now</div>
        <p style={{ fontSize: 7, color: 'rgba(0,0,0,0.5)', marginTop: 8, lineHeight: 1.3 }}>
          Capturing Bharat's authentic style. 🇮🇳 Fashion & Lifestyle.
        </p>
        <div style={{ marginTop: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div
                key={`gallery-item-${i}`}
                style={{
                  aspectRatio: '1', background: '#eee', borderRadius: 4,
                  backgroundImage: `url(https://picsum.photos/100/100?random=${i})`, backgroundSize: 'cover'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TrustScreen() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%', padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ width: 54, height: 54, background: '#F0FDF4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 22 }}>🛡️</span>
      </div>
      <div style={{ fontSize: 11, fontWeight: 900, color: '#111', marginBottom: 4 }}>Verification Audit</div>
      <div style={{ fontSize: 7, color: 'rgba(0,0,0,0.4)', marginBottom: 16 }}>BharatAI Security Active</div>
      <div style={{ width: '100%', height: 6, background: '#eee', borderRadius: 10, position: 'relative', overflow: 'hidden' }}>
        <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} transition={{ duration: 1 }} style={{ position: 'absolute', inset: 0, background: '#10B981' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 6, fontSize: 8, fontWeight: 900 }}>
        <span>TRUST SCORE</span>
        <span style={{ color: '#10B981' }}>92/100</span>
      </div>
      <div style={{ marginTop: 24, padding: '10px', background: '#F0FDF4', border: '1px solid #10B981', borderRadius: 12, fontSize: 8, fontWeight: 800, color: '#10B981', width: '100%' }}>
        Verified Profile Issued ✅
      </div>
    </motion.div>
  );
}

function CommunityScreen() {
  const items = [
    { icon: '🎙️', title: 'National Spotlight', sub: 'Podcast Feature', bg: '#F0F9FF', border: '#0EA5E9', text: '#0369A1' },
    { icon: '📖', title: 'Learning Hub', sub: 'Growth Articles', bg: '#FDF2F8', border: '#DB2777', text: '#9D174D' },
    { icon: '👥', title: 'Elite Network', sub: 'Pro Community', bg: '#F5F3FF', border: '#7C3AED', text: '#5B21B6' },
  ];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, fontWeight: 900, marginBottom: 12 }}>Growth & Community</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        {items.map(item => (
          <div key={item.title} style={{ padding: 10, background: item.bg, borderRadius: 12, border: `1px solid ${item.border}`, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14 }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: 8, fontWeight: 900, color: item.text }}>{item.title}</div>
              <div style={{ fontSize: 6, opacity: 0.6 }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, padding: 10, background: '#111', borderRadius: 10, color: '#fff', textAlign: 'center' }}>
        <div style={{ fontSize: 8, fontWeight: 900 }}>Tier 2 & 3 Support</div>
        <div style={{ fontSize: 5, opacity: 0.6 }}>LOCAL ASSISTANCE</div>
      </div>
    </motion.div>
  );
}

function VisionScreen() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 16, textAlign: 'center', background: '#fff' }}>
      <div style={{ position: 'relative', width: 50, height: 50, borderRadius: '50%', padding: 2, overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.08)', marginBottom: 12 }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: '200%', height: '200%', background: 'conic-gradient(from 0deg, #FF9431, #fff, #128807, #fff, #FF9431)', animation: 'spinBorder 4s linear infinite', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '33.33%', background: '#FF9431' }} />
          <div style={{ position: 'absolute', top: '33.33%', left: 0, right: 0, height: '33.34%', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '25%', height: '25%', borderRadius: '50%', border: '1px solid #000080', position: 'relative' }}>
              {SPOKE_KEYS.map((key, i) => (
                <div
                  key={key}
                  style={{
                    position: 'absolute', top: '50%', left: '50%', width: '100%', height: 1,
                    background: '#000080', transform: `translate(-50%,-50%) rotate(${i * 15}deg)`
                  }}
                />
              ))}
            </div>
          </div>
          <div style={{ position: 'absolute', top: '66.67%', left: 0, right: 0, height: '33.33%', background: '#128807' }} />
        </div>
      </div>
      <div style={{ fontSize: 16, fontWeight: 900, color: '#111', marginBottom: 12 }}>CreatorBharat</div>
      <h4 style={{ fontSize: 11, fontWeight: 800, color: 'rgba(0,0,0,0.4)', marginBottom: 6, textTransform: 'uppercase' }}>Our Mission</h4>
      <p style={{ fontSize: 9, color: 'rgba(0,0,0,0.6)', lineHeight: 1.5, fontWeight: 600 }}>
        To build a Bharat where every local talent becomes a global brand. 🇮🇳
      </p>
      <div style={{ marginTop: 20, width: '100%', height: 2, background: 'linear-gradient(90deg, #FF9431, #DC2626)', borderRadius: 10 }} />
      <div style={{ marginTop: 10, fontSize: 8, fontWeight: 900, color: '#111', textTransform: 'uppercase' }}>100M+ Creators • 1 Mission</div>
    </motion.div>
  );
}

// ── Layout sections ────────────────────────────────────────────────────────

function PhoneShowcase({ mob, step, setStep, duration }) {
  return (
    <div style={{
      flex: mob ? 'none' : 1.1,
      height: mob ? '50%' : 'auto',
      background: '#F8FAFC', padding: mob ? '40px 20px 0px' : 32,
      position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center'
    }}>
      <div style={{ width: '100%', textAlign: 'left', marginBottom: mob ? 10 : 20 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 12px', background: 'rgba(255,148,49,0.1)', color: '#FF9431', borderRadius: 100, fontSize: 9, fontWeight: 900, textTransform: 'uppercase', marginBottom: 8 }}>
          <span style={{ width: 6, height: 6, background: '#FF9431', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} /> Bharat's Creator Ecosystem
        </div>
        <h2 style={{ fontSize: mob ? 18 : 22, fontWeight: 900, color: '#111', marginBottom: 6 }}>The Future of <span style={{ color: '#FF9431' }}>Bharat's</span> Creators</h2>
      </div>

      <PhoneMockup mob={mob}>
        {step === 1 && <IdentityScreen />}
        {step === 2 && <TrustScreen />}
        {step === 3 && <CommunityScreen />}
        {step === 4 && <VisionScreen />}
      </PhoneMockup>

      {!mob && (
        <div style={{ display: 'flex', gap: 6, marginTop: 24, width: '100%' }}>
          <StepIndicators step={step} setStep={setStep} duration={duration} />
        </div>
      )}
    </div>
  );
}

PhoneShowcase.propTypes = {
  mob: PropTypes.bool.isRequired,
  step: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired
};

function VisionCopy({ mob, step, setStep, duration, handleJoin }) {
  const getTitle = () => {
    if (step === 1) return "Identity: Own Your Digital Estate";
    if (step === 2) return "Trust: The Gold Standard";
    if (step === 3) return "Impact: National Spotlight";
    return "Vision: Empowering 100M Creators";
  };

  const getDesc = () => {
    if (step === 1) return "A professional portfolio that turns your followers into your digital estate. You own your data, always.";
    if (step === 2) return "Get verified by BharatAI. We prove your authenticity to the world so you get the respect you deserve.";
    if (step === 3) return "Get featured on our National Podcast, access elite learning resources, and join a verified network.";
    return "Our ultimate goal is to bridge the gap between local talent and global success. Bharat creators deserve the best.";
  };

  return (
    <div style={{
      flex: mob ? 1 : 0.9,
      padding: mob ? '20px 32px' : 40,
      display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#fff',
      borderLeft: mob ? 'none' : '1px solid rgba(0,0,0,0.05)',
      borderTop: mob ? '1px solid rgba(0,0,0,0.05)' : 'none',
      overflowY: 'auto'
    }}>
      <div style={{ marginBottom: mob ? 16 : 32 }}>
        <h3 style={{ fontSize: mob ? 17 : 19, fontWeight: 900, color: '#111', marginBottom: 8 }}>
          {getTitle()}
        </h3>
        <p style={{ fontSize: mob ? 13 : 14, color: 'rgba(0,0,0,0.5)', lineHeight: 1.4, fontWeight: 600 }}>
          {getDesc()}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Btn lg style={{ width: '100%', background: '#111', color: '#fff', borderRadius: 100, fontWeight: 900, padding: mob ? '12px' : '16px' }} onClick={handleJoin}>Join the Revolution ⚡</Btn>
      </div>

      {mob && (
        <div style={{ display: 'flex', gap: 6, marginTop: 24, width: '100%' }}>
          <StepIndicators step={step} setStep={setStep} duration={duration} />
        </div>
      )}

      {!mob && (
        <div style={{ marginTop: 40, padding: 20, background: '#F8FAFC', borderRadius: 20, border: '1px solid rgba(0,0,0,0.05)' }}>
          <p style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)', fontWeight: 800, textTransform: 'uppercase', marginBottom: 8 }}>Building Bharat together</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#111' }}>The OS for the next billion creators.</span>
          </div>
        </div>
      )}
    </div>
  );
}

VisionCopy.propTypes = {
  mob: PropTypes.bool.isRequired,
  step: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  handleJoin: PropTypes.func.isRequired
};

// ── Main Component ─────────────────────────────────────────────────────────

export default function DemoModal({ open }) {
  const { dsp } = useApp();
  const [step, setStep] = useState(1);
  const [mob, setMob] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const STEP_DURATION = 5000;

  useEffect(() => {
    const h = () => setMob(window.innerWidth < 768);
    window.addEventListener('resize', h);

    if (!open) return () => window.removeEventListener('resize', h);

    const timer = setInterval(() => {
      setStep(s => (s < 4 ? s + 1 : 1));
    }, STEP_DURATION);

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', h);
    };
  }, [open, step]);

  if (!open) return null;

  const handleJoin = () => {
    dsp({ t: 'GO', p: 'apply' });
    dsp({ t: 'UI', v: { demoModal: false } });
    navigate('/apply');
  };

  const close = () => dsp({ t: 'UI', v: { demoModal: false } });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)',
          backdropFilter: 'blur(12px)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: mob ? 0 : 20
        }}
        onClick={close}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          style={{
            width: '100%', maxWidth: 1000, background: '#fff',
            borderRadius: mob ? 0 : 40,
            overflow: 'hidden', position: 'relative', boxShadow: '0 40px 120px rgba(0,0,0,0.5)',
            display: 'flex', flexDirection: mob ? 'column' : 'row',
            height: mob ? '100%' : 580,
            maxHeight: mob ? '100vh' : '90vh'
          }}
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={close}
            aria-label="Close demo"
            style={{ position: 'absolute', top: mob ? 16 : 20, right: mob ? 16 : 20, width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.05)', border: 'none', cursor: 'pointer', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 300, color: '#111' }}
          >
            ×
          </button>

          <PhoneShowcase mob={mob} step={step} setStep={setStep} duration={STEP_DURATION} />
          <VisionCopy mob={mob} step={step} setStep={setStep} duration={STEP_DURATION} handleJoin={handleJoin} />

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

DemoModal.propTypes = {
  open: PropTypes.bool.isRequired
};
