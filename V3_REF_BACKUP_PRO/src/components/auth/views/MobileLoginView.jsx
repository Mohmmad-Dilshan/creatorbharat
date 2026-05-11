import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Phone, ArrowLeft } from 'lucide-react';
import { Btn, Fld } from '@/components/common/Primitives';
import { useApp } from '@/core/context';

const MobileLoginView = ({ onBack, onSuccess, themeColor }) => {
  const { dsp } = useApp();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendOTP = () => {
    if (phone.length < 10) {
      setError('Enter valid 10-digit number');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setStep(2);
      setLoading(false);
      setError(null);
      dsp({ t: 'TOAST', d: { type: 'info', msg: 'Demo OTP is 1234' } });
    }, 800);
  };

  const verifyOTP = () => {
    if (otp !== '1234') {
      setError('Invalid OTP');
      dsp({ t: 'TOAST', d: { type: 'error', msg: 'Invalid OTP. Use 1234' } });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      onSuccess({ phone, role: 'user', id: 'm-' + Date.now() });
      setLoading(false);
    }, 1000);
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <button 
        type="button"
        onClick={onBack} 
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#64748B', fontSize: 13, fontWeight: 700, marginBottom: 20, cursor: 'pointer' }}
      >
        <ArrowLeft size={16} /> Back to Login
      </button>
      
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 950, color: '#111827', marginBottom: 6, letterSpacing: '-0.5px' }}>Mobile Login</h2>
        <p style={{ color: '#64748B', fontSize: 14, fontWeight: 650 }}>
          {step === 1 ? 'Enter your registered mobile number.' : `Enter the code sent to +91 ${phone}`}
        </p>
      </div>

      {step === 1 ? (
        <div style={{ display: 'grid', gap: 16 }}>
          <Fld 
            label="Mobile Number" 
            type="tel" 
            icon={Phone} 
            value={phone} 
            onChange={e => {
              const val = e.target.value.replaceAll(/\D/g, '');
              if (val.length <= 10) setPhone(val);
            }} 
            placeholder="9876543210" 
            error={error}
          />
          <Btn lg full loading={loading} onClick={sendOTP} style={{ background: '#111827', color: '#fff', borderRadius: 12, height: 52 }}>
            Get OTP
          </Btn>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          <Fld label="Enter OTP" type="number" value={otp} onChange={e => setOtp(e.target.value)} placeholder="1234" error={error} />
          <Btn lg full loading={loading} onClick={verifyOTP} style={{ background: themeColor || '#10B981', color: '#fff', borderRadius: 12, height: 52 }}>
            Verify & Login
          </Btn>
          <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#3B82F6', fontSize: 13, fontWeight: 700, textAlign: 'center', cursor: 'pointer' }}>Resend OTP</button>
        </div>
      )}
    </motion.div>
  );
};

MobileLoginView.propTypes = {
  onBack: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  themeColor: PropTypes.string
};

export default MobileLoginView;
