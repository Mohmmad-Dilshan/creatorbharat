import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../core/context';
import { LS } from '../../utils/helpers';
import { Btn, Card, Fld, Bdg } from '../../components/common/Primitives';
import { updateCreatorProfile } from '../../utils/platformService';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Lock,
  Megaphone,
  Plus,
  Trash2,
  ExternalLink,
  Loader2,
  Building2,
  CheckCircle2,
  Globe,
  MapPin,
  ChevronRight,
  CreditCard,
  Bell,
  Sparkles,
  Check,
  User
} from 'lucide-react';
import AuthGatekeeper from '../../components/auth/AuthGatekeeper';
import { changePassword, sendOtp, updatePhone, updateEmail } from '../../utils/authService';
import { useOtpTimer } from '../../hooks/useOtpTimer';
import OtpInput from '../../components/auth/views/OtpInput';
import { INDIAN_STATES, STATE_CITY_MAP, MAJOR_CITIES } from '../../utils/geo';

const T = {
  saffron: '#FF9431',
  emerald: '#10B981',
  violet: '#7C3AED',
  blue: '#3B82F6',
  navy: 'var(--db-text-primary, #0F172A)',
  slate: 'var(--db-text-secondary, #64748B)',
  bg: 'transparent',
  border: 'var(--db-card-border, #F1F5F9)'
};

const StepNavItem = ({ id, label, icon: Icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`step-nav-item ${active ? 'active' : ''}`}
    style={{ position: 'relative' }}
  >
    <div className="step-nav-icon-box">
       <Icon size={18} />
    </div>
    <span className="step-nav-label">
      {label}
    </span>
    {active && <ChevronRight size={16} className="active-chevron" style={{ opacity: 0.5, color: '#FFF' }} />}
  </button>
);

StepNavItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const ProfileInfoTabContent = ({ c, st, mob }) => {
  const { dsp } = useApp();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(c.name || '');
  const [state, setState] = useState(c.state || 'Maharashtra');
  const [city, setCity] = useState(c.city || 'Mumbai');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (c) {
      setName(c.name || '');
      setState(c.state || 'Maharashtra');
      setCity(c.city || 'Mumbai');
    }
  }, [c]);

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setState(newState);
    const citiesForState = STATE_CITY_MAP[newState] || MAJOR_CITIES;
    setCity(citiesForState[0] || '');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Full name is required and cannot be empty.');
      return;
    }

    setLoading(true);
    try {
      const enriched = await updateCreatorProfile({
        ...c,
        name: name.trim(),
        state,
        city
      });
      
      dsp({ 
        t: 'UPDATE_PROFILE', 
        profile: { name: name.trim(), state, city } 
      });

      const allCreators = LS.get('cb_creators', []);
      const updatedCreators = allCreators.map(cr => {
        if (cr.email === st.user.email) {
          return { ...cr, name: name.trim(), state, city };
        }
        return cr;
      });
      LS.set('cb_creators', updatedCreators);

      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Profile details saved successfully! 👤' } });
    } catch (err) {
      dsp({ t: 'TOAST', d: { type: 'error', msg: 'Failed to save profile: ' + err.message } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="settings-form-card card-3d-effect">
      <h3 className="db-section-title">Profile Info</h3>
      <p className="db-sub-text" style={{ marginBottom: 28 }}>
        Update your personal details, handle and location.
      </p>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#EF4444', fontSize: 13, fontWeight: 700, background: '#FEF2F2', padding: '12px 16px', borderRadius: '12px', border: '1px solid #FECACA' }}>
            <span>⚠️</span> {error}
          </div>
        )}

        <Fld 
          label="Full Name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="Aman Deep" 
          required 
        />
        
        <Fld 
          label="Email Address" 
          value={st.user?.email || ''} 
          readOnly 
          disabled
          helper="To change email, use the Account Security tab"
        />

        <Fld 
          label="Phone Number" 
          value={st.user?.phone || c.phone || ''} 
          readOnly 
          disabled
          helper="To change phone number, use the Account Security tab"
        />

        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 16 }}>
          <Fld 
            label="State" 
            value={state} 
            onChange={handleStateChange} 
            options={INDIAN_STATES} 
            required 
          />
          <Fld 
            label="City / District" 
            value={city} 
            onChange={e => setCity(e.target.value)} 
            options={STATE_CITY_MAP[state] || MAJOR_CITIES} 
            required 
          />
        </div>

        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
          <Btn lg type="submit" loading={loading} style={{ height: 'auto', padding: '16px 48px', background: 'linear-gradient(90deg, #FF9431, #EA580C)', color: '#fff', border: 'none' }}>
            Save Changes
          </Btn>
        </div>
      </form>
    </Card>
  );
};

ProfileInfoTabContent.propTypes = {
  c: PropTypes.object.isRequired,
  st: PropTypes.object.isRequired,
  mob: PropTypes.bool.isRequired
};

const SecurityTabContent = ({ st }) => {
  const { dsp } = useApp();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(null);

  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [phoneError, setPhoneError] = useState(null);
  const { timer: phoneTimer, startTimer: startPhoneTimer, isActive: isPhoneTimerActive } = useOtpTimer(30);

  const [showEmailForm, setShowEmailForm] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmailPassword, setConfirmEmailPassword] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState(null);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required.');
      return;
    }
    if (newPassword.length < 8 || newPassword.length > 128) {
      setPasswordError('New password must be between 8 and 128 characters.');
      return;
    }
    if (newPassword === currentPassword) {
      setPasswordError('New password cannot be the same as your current password.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    setPasswordLoading(true);
    try {
      await changePassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Password changed successfully! 🔑' } });
    } catch (err) {
      setPasswordError(err.message || 'Failed to change password. Please check your credentials.');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleSendPhoneOtp = async () => {
    setPhoneError(null);

    if (!newPhone || !/^[6-9]\d{9}$/.test(newPhone)) {
      setPhoneError('Please enter a valid 10-digit Indian mobile number starting with 6-9.');
      return;
    }

    setPhoneLoading(true);
    try {
      await sendOtp(newPhone);
      setOtpSent(true);
      startPhoneTimer(30);
      dsp({ t: 'TOAST', d: { type: 'info', msg: 'Demo OTP is 1234' } });
    } catch (err) {
      setPhoneError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setPhoneLoading(false);
    }
  };

  const handleVerifyPhone = async (e) => {
    e.preventDefault();
    setPhoneError(null);

    if (!otp || otp.length !== 6) {
      setPhoneError('Please enter a valid 6-digit OTP.');
      return;
    }

    setPhoneLoading(true);
    try {
      await updatePhone(newPhone, otp);
      
      dsp({ t: 'UPDATE_PROFILE', phone: newPhone });
      
      const allCreators = LS.get('cb_creators', []);
      const updated = allCreators.map(cr => {
        if (cr.email === st.user.email) {
          return { ...cr, phone: newPhone };
        }
        return cr;
      });
      LS.set('cb_creators', updated);

      setShowPhoneForm(false);
      setOtpSent(false);
      setNewPhone('');
      setOtp('');
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Mobile number updated successfully! 📱' } });
    } catch (err) {
      if (err.status === 409) {
        setPhoneError('This mobile number is already registered.');
      } else {
        setPhoneError(err.message || 'OTP verification failed. Please try 1234.');
      }
    } finally {
      setPhoneLoading(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setEmailError(null);

    if (!newEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail) || newEmail.length > 254) {
      setEmailError('Please enter a valid email address (max 254 characters).');
      return;
    }
    if (newEmail === st.user?.email) {
      setEmailError('New email cannot be the same as your current email.');
      return;
    }
    if (!confirmEmailPassword) {
      setEmailError('Current password is required to verify changes.');
      return;
    }

    setEmailLoading(true);
    try {
      await updateEmail(newEmail, confirmEmailPassword);
      
      dsp({ t: 'UPDATE_PROFILE', email: newEmail });

      const allCreators = LS.get('cb_creators', []);
      const updated = allCreators.map(cr => {
        if (cr.email === st.user.email) {
          return { ...cr, email: newEmail };
        }
        return cr;
      });
      LS.set('cb_creators', updated);

      setShowEmailForm(false);
      setNewEmail('');
      setConfirmEmailPassword('');
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Email address updated successfully! 📧' } });
    } catch (err) {
      if (err.status === 409) {
        setEmailError('This email address is already in use.');
      } else if (err.status === 401) {
        setEmailError('Incorrect password.');
      } else {
        setEmailError(err.message || 'Failed to update email. Please try again.');
      }
    } finally {
      setEmailLoading(false);
    }
  };

  const currentEmail = st.user?.email || 'verified@user.com';
  const currentPhone = st.user?.phone || st.user?.creatorProfile?.phone || 'Not configured';

  return (
    <Card className="settings-form-card card-3d-effect" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
       <div>
         <h3 className="db-section-title" style={{ margin: 0 }}>Account Security</h3>
         <p style={{ fontSize: 13, color: '#64748b', fontWeight: 500, marginTop: 6 }}>
           Manage your platform credentials and verification channels.
         </p>
       </div>
       
       <div>
          <p className="db-sidebar-label" style={{ marginBottom: 12 }}>Verified Credentials</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
             <div className="activity-item" style={{ padding: '16px 20px', background: 'rgba(15, 23, 42, 0.02)', borderRadius: '16px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                   <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>{currentEmail}</div>
                   <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 800, marginTop: '2px' }}>Primary Verification Email</div>
                </div>
                <CheckCircle2 size={20} color="#10B981" />
             </div>
             <div className="activity-item" style={{ padding: '16px 20px', background: 'rgba(15, 23, 42, 0.02)', borderRadius: '16px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                   <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>{currentPhone}</div>
                   <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 800, marginTop: '2px' }}>Verified Mobile Number</div>
                </div>
                <CheckCircle2 size={20} color="#10B981" />
             </div>
          </div>
       </div>

       <div style={{ height: '1px', background: '#e2e8f0' }} />

       <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
         <p className="db-sidebar-label" style={{ marginBottom: 4 }}>Change Password</p>
         {passwordError && (
           <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#EF4444', fontSize: 13, fontWeight: 750, background: '#FEF2F2', padding: '12px 16px', borderRadius: '12px', border: '1px solid #FECACA' }}>
             <span>⚠️</span> {passwordError}
           </div>
         )}
         <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
           <Fld label="Current Password" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="••••••••" required />
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
             <Fld label="New Password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="••••••••" required />
             <Fld label="Confirm New Password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" required />
           </div>
         </div>
         <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
           <Btn type="submit" loading={passwordLoading} style={{ background: '#0f172a', color: '#fff', borderRadius: 12, padding: '12px 24px', fontWeight: 800 }}>
             Change Password
           </Btn>
         </div>
       </form>

       <div style={{ height: '1px', background: '#e2e8f0' }} />

       <div>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <p className="db-sidebar-label" style={{ margin: 0 }}>Update Mobile Number</p>
           <Btn sm outline onClick={() => { setShowPhoneForm(!showPhoneForm); setPhoneError(null); }} style={{ borderRadius: 10 }}>
             {showPhoneForm ? 'Cancel' : 'Update'}
           </Btn>
         </div>

         {showPhoneForm && (
           <div style={{ marginTop: 16, padding: 20, background: 'rgba(15, 23, 42, 0.01)', border: '1px solid #e2e8f0', borderRadius: 16 }}>
             {phoneError && (
               <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#EF4444', fontSize: 13, fontWeight: 750, background: '#FEF2F2', padding: '12px 16px', borderRadius: '12px', border: '1px solid #FECACA', marginBottom: 16 }}>
                 <span>⚠️</span> {phoneError}
               </div>
             )}
             
             {!otpSent ? (
               <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr', gap: 12, alignItems: 'flex-end' }}>
                 <Fld 
                   label="New Mobile Number" 
                   type="tel" 
                   value={newPhone} 
                   onChange={e => {
                     const val = e.target.value.replace(/\D/g, '');
                     if (val.length <= 10) setNewPhone(val);
                   }} 
                   placeholder="9876543210" 
                 />
                 <Btn 
                   onClick={handleSendPhoneOtp} 
                   loading={phoneLoading} 
                   disabled={isPhoneTimerActive}
                   style={{ marginBottom: 18, height: 52, borderRadius: 12, background: '#0f172a', color: '#fff', fontSize: 13 }}
                 >
                   {isPhoneTimerActive ? `Resend in ${phoneTimer}s` : 'Send OTP'}
                 </Btn>
               </div>
             ) : (
               <form onSubmit={handleVerifyPhone} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                 <div style={{ color: '#475569', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>OTP sent to +91 {newPhone}. (Use demo OTP: 1234)</div>
                 <OtpInput value={otp} onChange={setOtp} error={phoneError} />
                 
                 <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                   <Btn type="submit" loading={phoneLoading} style={{ flex: 1.5, background: '#10B981', color: '#fff', borderRadius: 12, height: 52 }}>
                     Verify & Update
                   </Btn>
                   <Btn 
                     type="button" 
                     disabled={isPhoneTimerActive} 
                     onClick={handleSendPhoneOtp} 
                     style={{ flex: 1, background: '#fff', border: '1px solid #e2e8f0', color: '#64748b', borderRadius: 12, height: 52 }}
                   >
                     {isPhoneTimerActive ? `Resend in ${phoneTimer}s` : 'Resend OTP'}
                   </Btn>
                 </div>
               </form>
             )}
           </div>
         )}
       </div>

       <div style={{ height: '1px', background: '#e2e8f0' }} />

       <div>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <p className="db-sidebar-label" style={{ margin: 0 }}>Update Email Address</p>
           <Btn sm outline onClick={() => { setShowEmailForm(!showEmailForm); setEmailError(null); }} style={{ borderRadius: 10 }}>
             {showEmailForm ? 'Cancel' : 'Update'}
           </Btn>
         </div>

         {showEmailForm && (
           <form onSubmit={handleEmailSubmit} style={{ marginTop: 16, padding: 20, background: 'rgba(15, 23, 42, 0.01)', border: '1px solid #e2e8f0', borderRadius: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
             {emailError && (
               <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#EF4444', fontSize: 13, fontWeight: 750, background: '#FEF2F2', padding: '12px 16px', borderRadius: '12px', border: '1px solid #FECACA' }}>
                 <span>⚠️</span> {emailError}
               </div>
             )}
             <Fld label="New Email Address" type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="new@domain.com" required />
             <Fld label="Confirm Account Password" type="password" value={confirmEmailPassword} onChange={e => setConfirmEmailPassword(e.target.value)} placeholder="••••••••" required />
             
             <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
               <Btn type="submit" loading={emailLoading} style={{ background: '#0f172a', color: '#fff', borderRadius: 12, padding: '12px 24px', fontWeight: 800 }}>
                 Verify & Update Email
               </Btn>
             </div>
           </form>
         )}
       </div>

       <div style={{ height: '1px', background: '#e2e8f0' }} />

       <div style={{ padding: '32px', background: '#FEF2F2', borderRadius: '32px', border: '1px solid #FECACA' }}>
          <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#991B1B', marginBottom: '8px' }}>Danger Zone</h4>
          <p style={{ fontSize: '14px', color: '#B91C1C', marginBottom: '24px', lineHeight: 1.5 }}>
             Permanently delete your profile and account history from CreatorBharat. This action is irreversible.
          </p>
          <button className="btn-danger-lite">
             TERMINATE ACCOUNT
          </button>
       </div>
    </Card>
  );
};

SecurityTabContent.propTypes = {
  st: PropTypes.object.isRequired
};

// ─── BRAND PROFILE EDIT TAB ──────────────────────────────────────────────────
const BrandProfileTabContent = ({ BF, mob, upBF, saveBrandProfile, saving }) => {
  return (
    <Card className="settings-form-card card-3d-effect">
       <h3 className="db-section-title">Company Profile Details</h3>
       <p className="db-sub-text" style={{ marginBottom: 32 }}>Update your brand assets, website, and industry focus for your campaign listings.</p>
       
       <div className="form-stack">
          <Fld label="Company / Brand Name" value={BF.companyName} onChange={e => upBF('companyName', e.target.value)} placeholder="Nike India" />
          <Fld label="Brand Representative Name" value={BF.name} onChange={e => upBF('name', e.target.value)} placeholder="Rohit Sen" />
          <Fld label="Official Website URL" value={BF.website} onChange={e => upBF('website', e.target.value)} placeholder="https://nike.com" />
          <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '24px' }}>
             <Fld label="Headquarters City" value={BF.city} onChange={e => upBF('city', e.target.value)} placeholder="Mumbai" />
             <Fld label="Industry Sector" value={BF.industry} onChange={e => upBF('industry', e.target.value)} placeholder="Lifestyle & Sports" />
          </div>
          <Fld label="Brand Bio / Description" value={BF.bio} onChange={e => upBF('bio', e.target.value)} rows={4} placeholder="Premium athletic sportswear and lifestyle brand building the future of sports culture..." />
       </div>

       <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'flex-end' }}>
          <Btn lg className="btn-primary-pill" style={{ height: 'auto', padding: '16px 48px', display: 'flex', gap: 8 }} onClick={saveBrandProfile} disabled={saving}>
             {saving ? <Loader2 className="spin" size={18} /> : 'Save Brand Profile'}
          </Btn>
       </div>
    </Card>
  );
};

BrandProfileTabContent.propTypes = {
  BF: PropTypes.object.isRequired,
  mob: PropTypes.bool.isRequired,
  upBF: PropTypes.func.isRequired,
  saveBrandProfile: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

// ─── CREATOR SPONSOR SETTINGS TAB ────────────────────────────────────────────
const SPONSOR_TYPES_DEF = [
  { id: 'link', label: 'Promoted Link', icon: '🔗', color: '#3B82F6' },
  { id: 'banner', label: 'Ad Banner', icon: '🖼️', color: '#FF9431' },
  { id: 'shoutout', label: 'Shoutout Post', icon: '📣', color: '#10B981' },
];

const SponsorSettingsTab = ({ c, st, mob }) => {
  const navigate = useNavigate();
  const { dsp } = useApp();
  const isPro = st.isPro || false;
  const FREE_LIMIT = 1;

  const [posts, setPosts] = useState(() => c?.sponsoredPosts || c?.sponsored_posts || []);

  useEffect(() => {
    setPosts(c?.sponsoredPosts || c?.sponsored_posts || []);
  }, [c]);

  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState('link');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [ctaText, setCtaText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [saving, setSaving] = useState(false);

  const isLocked = !isPro && posts.length >= FREE_LIMIT;

  const savePost = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    
    const newPost = {
      id: 'sp-' + Date.now(),
      type, title: title.trim(), description: description.trim(),
      link: link.trim(), ctaText: ctaText.trim() || 'Visit Now',
      imageUrl: imageUrl.trim(),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    
    const updated = [newPost, ...posts];
    try {
      const enriched = await updateCreatorProfile({
        ...c,
        sponsoredPosts: updated
      });
      setPosts(updated);
      dsp({ t: 'LOGIN', u: { ...st.user, creatorProfile: enriched }, role: 'creator' });
      setTitle(''); setDescription(''); setLink(''); setCtaText(''); setImageUrl('');
      setShowForm(false);
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Sponsor post published! 🎉' } });
    } catch (err) {
      dsp({ t: 'TOAST', d: { type: 'error', msg: 'Failed to publish: ' + err.message } });
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async (id) => {
    const updated = posts.filter(p => p.id !== id);
    try {
      const enriched = await updateCreatorProfile({
        ...c,
        sponsoredPosts: updated
      });
      setPosts(updated);
      dsp({ t: 'LOGIN', u: { ...st.user, creatorProfile: enriched }, role: 'creator' });
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Sponsor post deleted!' } });
    } catch (err) {
      dsp({ t: 'TOAST', d: { type: 'error', msg: 'Failed to delete: ' + err.message } });
    }
  };

  return (
    <Card className="settings-form-card card-3d-effect">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
        <div>
          <h3 className="db-section-title" style={{ margin: 0 }}>Sponsored Posts Manager</h3>
          <p style={{ fontSize: 13, color: '#64748b', fontWeight: 500, marginTop: 6 }}>
            Yahan se apne public profile pe promoted links, banners aur shoutouts manage karo.
          </p>
        </div>
        <a
          href={`/creator/${c?.slug || c?.id || 'preview'}`}
          target="_blank"
          rel="noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 800, color: '#FF9431', textDecoration: 'none' }}
        >
          <ExternalLink size={14} /> Preview on Profile
        </a>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px',
        background: isPro ? '#f0fdf4' : '#fff7ed',
        border: `1px solid ${isPro ? '#6ee7b7' : '#fed7aa'}`,
        borderRadius: 16, margin: '20px 0'
      }}>
        <span style={{ fontSize: 20 }}>{isPro ? '✅' : '⚡'}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: isPro ? '#10B981' : '#FF9431' }}>
            {isPro ? 'Pro Plan — Unlimited Posts' : `Free Plan — ${posts.length}/${FREE_LIMIT} post used`}
          </div>
          <div style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>
            {isPro ? 'Unlimited sponsor posts publish kar sakte ho.' : 'Free plan mein 1 post. Unlimited ke liye upgrade karo.'}
          </div>
        </div>
        {!isPro && (
          <button onClick={() => navigate('/creator/pricing')} style={{ background: 'linear-gradient(90deg, #FF9431, #EA580C)', color: '#fff', padding: '8px 14px', borderRadius: 10, fontSize: 11, fontWeight: 900, border: 'none', cursor: 'pointer' }}>
            Upgrade →
          </button>
        )}
      </div>

      {!showForm && (
        <button
          onClick={() => { if (!isLocked) setShowForm(true); }}
          disabled={isLocked}
          style={{
            width: '100%', padding: '14px', borderRadius: 16, marginBottom: 24,
            border: `2px dashed ${isLocked ? '#e2e8f0' : '#FF9431'}`,
            background: isLocked ? '#f8fafc' : 'rgba(255,148,49,0.04)',
            color: isLocked ? '#94a3b8' : '#FF9431',
            fontWeight: 900, fontSize: 14, cursor: isLocked ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
          }}
        >
          <Plus size={18} />
          {isLocked ? 'Free limit reached — Upgrade to Pro for more posts' : 'Add New Sponsor Post'}
        </button>
      )}

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ background: 'rgba(15, 23, 42, 0.02)', borderRadius: 20, padding: mob ? 20 : 28, border: '1.5px solid #e2e8f0', marginBottom: 24 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h4 style={{ fontSize: 16, fontWeight: 900, color: '#0f172a', margin: 0 }}>New Sponsor Post</h4>
            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18 }}>✕</button>
          </div>

          <form onSubmit={savePost} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 8 }}>Post Type</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {SPONSOR_TYPES_DEF.map(t => (
                  <button key={t.id} type="button" onClick={() => setType(t.id)} style={{
                    flex: 1, padding: '10px 6px', borderRadius: 12,
                    border: `1.5px solid ${type === t.id ? t.color : '#e2e8f0'}`,
                    background: type === t.id ? t.color + '10' : '#fff',
                    cursor: 'pointer', fontSize: 11, fontWeight: 800,
                    color: type === t.id ? t.color : '#64748b',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4
                  }}>
                    <span style={{ fontSize: 18 }}>{t.icon}</span>
                    {t.label.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 8 }}>Title *</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Nykaa Sale — 30% Off" required
                style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 8 }}>Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Short description for visitors..." rows={2}
                style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 12, fontSize: 14, outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 8 }}>URL / Link</label>
                <input value={link} onChange={e => setLink(e.target.value)} placeholder="https://..." type="url"
                  style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 8 }}>CTA Button Text</label>
                <input value={ctaText} onChange={e => setCtaText(e.target.value)} placeholder="Visit Now"
                  style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 8 }}>Banner Image URL (Optional)</label>
              <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://image-url..."
                style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 12, fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" disabled={saving || !title.trim()} style={{
                flex: 1, padding: '13px', background: saving ? '#cbd5e1' : 'linear-gradient(90deg, #FF9431, #EA580C)',
                color: '#fff', border: 'none', borderRadius: 12, fontWeight: 900, fontSize: 14, cursor: 'pointer'
              }}>
                {saving ? 'Publishing...' : 'Publish Post'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} style={{
                padding: '13px 20px', background: '#fff', border: '1.5px solid #e2e8f0',
                color: '#64748b', borderRadius: 12, fontWeight: 800, fontSize: 14, cursor: 'pointer'
              }}>Cancel</button>
            </div>
          </form>
        </motion.div>
      )}

      {posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 20px', background: 'rgba(15, 23, 42, 0.02)', borderRadius: 20, border: '1.5px dashed #e2e8f0' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📢</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#475569', marginBottom: 6 }}>No sponsor posts yet</div>
          <div style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>Upar wale button se apna pehla promoted post add karo.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {posts.map((post) => {
            const typeInfo = SPONSOR_TYPES_DEF.find(t => t.id === post.type) || SPONSOR_TYPES_DEF[0];
            return (
              <motion.div key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', background: '#fff', borderRadius: 16, border: `1.5px solid ${typeInfo.color}20` }}
              >
                <span style={{ fontSize: 22, flexShrink: 0 }}>{typeInfo.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 900, color: '#0f172a', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 10, fontWeight: 900, color: typeInfo.color, textTransform: 'uppercase' }}>{typeInfo.label}</span>
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>{post.date}</span>
                    {post.link && (
                      <a href={post.link} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: '#3B82F6', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
                        <ExternalLink size={11} /> {post.link.replace('https://', '').slice(0, 22)}...
                      </a>
                    )}
                  </div>
                </div>
                <button onClick={() => deletePost(post.id)} style={{
                  background: '#fef2f2', border: 'none', borderRadius: 10,
                  padding: '8px 10px', cursor: 'pointer', color: '#ef4444', flexShrink: 0,
                  display: 'flex', alignItems: 'center'
                }}>
                  <Trash2 size={15} />
                </button>
              </motion.div>
            );
          })}
        </div>
      )}

      <div style={{ marginTop: 24, padding: '14px 18px', background: 'rgba(15, 23, 42, 0.02)', borderRadius: 14, border: '1px solid #f1f5f9' }}>
        <p style={{ fontSize: 12, color: '#64748b', fontWeight: 500, margin: 0 }}>
          💡 Ye posts aapke public profile page ke <strong>Sponsor tab</strong> mein visitors ko dikhte hain. Links real products, affiliate URLs ya brand pages pe jaate hain.
        </p>
      </div>
    </Card>
  );
};
SponsorSettingsTab.propTypes = {
  c: PropTypes.object.isRequired,
  st: PropTypes.object.isRequired,
  mob: PropTypes.bool
};

// ─── NEW: CREATOR PAYOUT SETTINGS TAB ─────────────────────────────────────────
const PayoutSettingsTab = ({ c, st }) => {
  const { dsp } = useApp();
  const [loading, setLoading] = useState(false);
  const [P, setP] = useState({
    upiId: c?.upiId || '',
    bankName: c?.bankName || '',
    accountHolder: c?.accountHolder || '',
    accountNo: c?.accountNo || '',
    ifscCode: c?.ifscCode || ''
  });

  useEffect(() => {
    if (c) {
      setP({
        upiId: c.upiId || '',
        bankName: c.bankName || '',
        accountHolder: c.accountHolder || '',
        accountNo: c.accountNo || '',
        ifscCode: c.ifscCode || ''
      });
    }
  }, [c]);

  const save = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const enriched = await updateCreatorProfile({
        ...c,
        ...P
      });
      dsp({ t: 'LOGIN', u: { ...st.user, creatorProfile: enriched }, role: 'creator' });
      dsp({ t: 'TOAST', d: { type: 'success', msg: 'Payout settings saved successfully! 💳' } });
    } catch (err) {
      dsp({ t: 'TOAST', d: { type: 'error', msg: 'Failed to save payout settings: ' + err.message } });
    } finally {
      setLoading(false);
    }
  };

  const upP = (key, val) => setP(prev => ({ ...prev, [key]: val }));

  return (
    <Card className="settings-form-card card-3d-effect">
      <h3 className="db-section-title">Payout & Bank Settings</h3>
      <p className="db-sub-text" style={{ marginBottom: 28 }}>
        Define your preferred payout destinations. Funds will be released here when escrow milestones are cleared.
      </p>

      <form onSubmit={save} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Fld label="UPI ID (GPay / PhonePe / Paytm)" value={P.upiId} onChange={e => upP('upiId', e.target.value)} placeholder="aman@okaxis" />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '10px 0' }}>
          <div style={{ height: 1, flex: 1, background: '#e2e8f0' }} />
          <span style={{ fontSize: 11, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>OR Bank Account details</span>
          <div style={{ height: 1, flex: 1, background: '#e2e8f0' }} />
        </div>

        <Fld label="Account Holder Name" value={P.accountHolder} onChange={e => upP('accountHolder', e.target.value)} placeholder="Aman Deep Singh" />
        <Fld label="Bank Name" value={P.bankName} onChange={e => upP('bankName', e.target.value)} placeholder="State Bank of India" />
        
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 16 }}>
          <Fld label="Account Number" value={P.accountNo} onChange={e => upP('accountNo', e.target.value)} placeholder="30293847583" />
          <Fld label="IFSC Code" value={P.ifscCode} onChange={e => upP('ifscCode', e.target.value)} placeholder="SBIN0001234" />
        </div>

        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
          <Btn lg type="submit" loading={loading} style={{ height: 'auto', padding: '16px 48px', background: 'linear-gradient(90deg, #FF9431, #EA580C)', color: '#fff', border: 'none' }}>
            Save Payout Details
          </Btn>
        </div>
      </form>
    </Card>
  );
};

// ─── NEW: CREATOR NOTIFICATIONS TAB ───────────────────────────────────────────
const NotificationsSettingsTab = () => {
  const { dsp } = useApp();
  const [prefs, setPrefs] = useState(() => {
    try {
      const saved = localStorage.getItem('cb_notification_preferences');
      return saved ? JSON.parse(saved) : { email: true, whatsapp: true, sms: false, push: true };
    } catch (_) {
      return { email: true, whatsapp: true, sms: false, push: true };
    }
  });

  const toggle = (key) => {
    const updated = { ...prefs, [key]: !prefs[key] };
    setPrefs(updated);
    localStorage.setItem('cb_notification_preferences', JSON.stringify(updated));
    dsp({ t: 'TOAST', d: { type: 'success', msg: `Notification preference updated!` } });
  };

  const Switch = ({ active, onToggle }) => (
    <div 
      onClick={onToggle}
      style={{
        width: 44,
        height: 24,
        borderRadius: 100,
        background: active ? '#10B981' : '#cbd5e1',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background-color 0.25s'
      }}
    >
      <motion.div 
        layout
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: '#fff',
          position: 'absolute',
          top: 3,
          left: active ? 23 : 3,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      />
    </div>
  );

  return (
    <Card className="settings-form-card card-3d-effect">
      <h3 className="db-section-title">Notification Settings</h3>
      <p className="db-sub-text" style={{ marginBottom: 28 }}>
        Choose how you want to be alerted about campaign updates, brand pitches, and payment milestones.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { key: 'email', label: 'Email Notifications', desc: 'Receive daily updates about campaign invites and new payouts.', icon: '📧' },
          { key: 'whatsapp', label: 'WhatsApp Alerts', desc: 'Get instant notifications on your WhatsApp for direct brand pitches.', icon: '💬' },
          { key: 'push', label: 'Browser Push Notifications', desc: 'Real-time alert inside the browser when a brand reviews your application.', icon: '🔔' },
          { key: 'sms', label: 'SMS Alerts', desc: 'Receive offline SMS alerts for escrow releases.', icon: '📱' },
        ].map(item => (
          <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '16px 20px', background: 'rgba(15, 23, 42, 0.02)', borderRadius: 16, border: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 900, color: '#0f172a' }}>{item.label}</div>
                <div style={{ fontSize: 12, color: '#64748b', fontWeight: 650, marginTop: 2 }}>{item.desc}</div>
              </div>
            </div>
            <Switch active={prefs[item.key]} onToggle={() => toggle(item.key)} />
          </div>
        ))}
      </div>
    </Card>
  );
};

// ─── NEW: BILLING SETTINGS TAB ───────────────────────────────────────────────
const BillingSettingsTab = ({ isPro, handleUpgradeClick }) => {
  return (
    <Card className="settings-form-card card-3d-effect">
      <h3 className="db-section-title">Subscription & Billing</h3>
      <p className="db-sub-text" style={{ marginBottom: 28 }}>Manage your CreatorBharat membership and billing history.</p>

      {/* Subscription Card */}
      <div 
        style={{
          background: isPro ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(16, 185, 129, 0.02))' : 'linear-gradient(135deg, rgba(255, 148, 49, 0.06), rgba(255, 148, 49, 0.02))',
          borderRadius: 24,
          padding: 28,
          color: 'var(--db-text-primary, #0f172a)',
          border: `1.5px solid ${isPro ? '#10B981' : '#FF9431'}`,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--db-card-shadow)'
        }}
      >
        <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: isPro ? 'radial-gradient(circle, rgba(16,185,129,0.1), transparent 70%)' : 'radial-gradient(circle, rgba(255,148,49,0.1), transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
          <div>
            <span style={{ fontSize: 10, fontWeight: 900, background: isPro ? '#10B981' : 'rgba(255,148,49,0.1)', color: isPro ? '#fff' : '#FF9431', padding: '4px 10px', borderRadius: 100, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {isPro ? 'PRO ACTIVE' : 'FREE TIER'}
            </span>
            <h4 style={{ fontSize: 24, fontWeight: 950, margin: '8px 0 2px', fontFamily: 'Outfit', color: 'var(--db-text-primary, #0f172a)' }}>
              {isPro ? 'Creator Pro Plan' : 'Free Basic Listing'}
            </h4>
            <p style={{ fontSize: 12, color: 'var(--db-text-secondary, #475569)', margin: 0, fontWeight: 600 }}>
              {isPro ? 'Valid until June 2027 · Renewal: ₹0' : 'Upgrade to unlock verified discovery & analytics'}
            </p>
          </div>
          <div style={{ fontSize: 28, fontWeight: 950, fontFamily: 'Outfit', color: 'var(--db-text-primary, #0f172a)' }}>
            {isPro ? '₹0' : '₹199'}<span style={{ fontSize: 13, fontWeight: 700, color: 'var(--db-text-secondary, #475569)' }}> / lifetime</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Marketplace Search Indexing', free: true, pro: true },
            { label: 'Campaign Proposals', free: '1/month', pro: 'Unlimited' },
            { label: 'Interactive 3D Analytics & Charts', free: false, pro: true },
            { label: 'Verification Badge (Elite Blue Tick)', free: false, pro: true },
            { label: 'Priority Search Discovery Rank', free: false, pro: true },
            { label: 'Withdraw Payouts Instantly', free: true, pro: true },
          ].map((feat, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--db-text-secondary, #475569)', fontWeight: 600 }}>
              <div style={{ width: 16, height: 16, borderRadius: '50%', background: (typeof feat.free === 'string' || feat.free) ? '#10B981' : '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 10, color: '#fff' }}>✓</span>
              </div>
              <span style={{ flex: 1 }}>{feat.label}</span>
              <span style={{ fontSize: 11, fontWeight: 900, color: '#FF9431' }}>
                {isPro ? (feat.pro === true ? 'Yes' : feat.pro) : (feat.free === true ? 'Yes' : feat.free === false ? 'No' : feat.free)}
              </span>
            </div>
          ))}
        </div>

        {!isPro && (
          <button 
            onClick={handleUpgradeClick}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 14,
              background: 'linear-gradient(135deg, #FF9431, #EA580C)',
              color: '#fff',
              fontWeight: 950,
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              boxShadow: '0 8px 20px rgba(255,148,49,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}
          >
            <Sparkles size={16} fill="#fff" /> Upgrade to Pro Elite
          </button>
        )}
      </div>
    </Card>
  );
};
BillingSettingsTab.propTypes = {
  isPro: PropTypes.bool.isRequired,
  handleUpgradeClick: PropTypes.func.isRequired
};

// ─── NEW: CHECKOUT MODAL ──────────────────────────────────────────────────────
const UpgradeModal = ({ isOpen, onClose, onPaymentSuccess }) => {
  const [step, setStep] = useState('summary'); // summary -> processing -> success
  const [method, setMethod] = useState('upi');

  if (!isOpen) return null;

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onPaymentSuccess();
        onClose();
        setStep('summary');
      }, 1800);
    }, 2000);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(8px)' }}>
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0 }}
        style={{
          background: '#fff',
          borderRadius: 28,
          padding: 32,
          maxWidth: 400,
          width: '100%',
          boxShadow: '0 30px 60px rgba(0,0,0,0.25)',
          color: '#0f172a',
          position: 'relative'
        }}
      >
        {step !== 'processing' && (
          <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: '#94a3b8', fontSize: 18, cursor: 'pointer' }}>✕</button>
        )}

        {step === 'summary' && (
          <div>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(255,148,49,0.1)', color: '#FF9431', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Sparkles size={24} fill="currentColor" />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 950, textAlign: 'center', margin: '0 0 4px', fontFamily: 'Outfit' }}>Razorpay Secure Payment</h3>
            <p style={{ fontSize: 13, color: '#64748b', textAlign: 'center', margin: '0 0 24px', fontWeight: 600 }}>Upgrade to Creator Pro Lifetime Plan</p>

            <div style={{ background: '#f8fafc', padding: 18, borderRadius: 16, border: '1px solid #e2e8f0', marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 800, color: '#64748b', marginBottom: 8 }}>
                <span>Order ID</span>
                <span style={{ color: '#0f172a' }}>CB-PRO-{Date.now().toString().slice(-6)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 800, color: '#64748b', marginBottom: 12 }}>
                <span>Package Plan</span>
                <span style={{ color: '#0f172a' }}>Pro Elite Lifetime</span>
              </div>
              <div style={{ height: 1, background: '#e2e8f0', marginBottom: 12 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 950, color: '#0f172a' }}>
                <span>Total Amount</span>
                <span style={{ color: '#10B981' }}>₹199.00</span>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 11, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: 8 }}>Select Payment Method</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { id: 'upi', label: 'UPI (Google Pay / PhonePe)', sub: 'Fast & Secure instant checkout', icon: '⚡' },
                  { id: 'card', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay', icon: '💳' },
                ].map(m => (
                  <div 
                    key={m.id} 
                    onClick={() => setMethod(m.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 14,
                      border: `1.5px solid ${method === m.id ? '#FF9431' : '#e2e8f0'}`,
                      background: method === m.id ? 'rgba(255,148,49,0.04)' : '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{m.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 900, color: '#0f172a' }}>{m.label}</div>
                      <div style={{ fontSize: 11, color: '#64748b', fontWeight: 650 }}>{m.sub}</div>
                    </div>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', border: `1.5px solid ${method === m.id ? '#FF9431' : '#cbd5e1'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {method === m.id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF9431' }} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={handlePay}
              style={{
                width: '100%', padding: '16px', borderRadius: 14, background: 'linear-gradient(90deg, #FF9431, #EA580C)',
                color: '#fff', fontSize: 14, fontWeight: 950, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: '0 8px 24px rgba(255,148,49,0.2)'
              }}
            >
              Secure Checkout — Pay ₹199
            </button>
          </div>
        )}

        {step === 'processing' && (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ display: 'inline-block', width: 48, height: 48, borderRadius: '50%', border: '4px solid rgba(255,148,49,0.1)', borderTopColor: '#FF9431', animation: 'spin 1s linear infinite' }} />
            <h4 style={{ fontSize: 16, fontWeight: 950, marginTop: 24, marginBlockEnd: 4, fontFamily: 'Outfit' }}>Processing Transaction...</h4>
            <p style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Please do not close or reload this page.</p>
          </div>
        )}

        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 28 }}>✓</div>
            <h4 style={{ fontSize: 18, fontWeight: 950, marginBlockEnd: 4, fontFamily: 'Outfit', color: '#10B981' }}>Payment Successful!</h4>
            <p style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginBlockEnd: 0 }}>Welcome to Creator Pro Elite. Your dashboard has been unlocked.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
UpgradeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onPaymentSuccess: PropTypes.func.isRequired
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function SettingsPage() {
  const { st, dsp } = useApp();
  const navigate = useNavigate();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [saving, setSaving] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

  const role = st.user?.role || 'creator';
  const isPro = st.isPro || localStorage.getItem('cb_is_pro') === 'true';
  const location = useLocation();

  // State for tabs (reads location.state for defaultTab)
  const [tab, setTab] = useState(() => {
    if (role === 'brand') return 'brandProfile';
    return location.state?.defaultTab || 'profile';
  });

  // Creator state
  const allCreators = LS.get('cb_creators', []);
  const creatorProfile = st.user?.creatorProfile || allCreators.find(cr => cr.email === st.user?.email) || {};

  // Brand state (form inputs)
  const [BF, setBF] = useState({
    companyName: st.user?.companyName || '',
    name: st.user?.name || '',
    website: st.user?.website || '',
    city: st.user?.city || '',
    industry: st.user?.industry || '',
    bio: st.user?.bio || ''
  });

  // Sync brand state when context loads
  useEffect(() => {
    if (st.user && role === 'brand') {
      setBF({
        companyName: st.user.companyName || '',
        name: st.user.name || '',
        website: st.user.website || '',
        city: st.user.city || '',
        industry: st.user.industry || '',
        bio: st.user.bio || ''
      });
    }
  }, [st.user, role]);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const upBF = (k, v) => setBF(p => ({ ...p, [k]: v }));

  const saveBrandProfile = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600)); // simulate saving
    
    const updatedUser = {
      ...st.user,
      companyName: BF.companyName,
      name: BF.name,
      website: BF.website,
      city: BF.city,
      industry: BF.industry,
      bio: BF.bio
    };

    // Update global context & local storage
    dsp({ t: 'LOGIN', u: updatedUser, role: 'brand' });
    LS.set('cb_user', updatedUser); // Sync local storage for persistence

    dsp({ t: 'TOAST', d: { type: 'success', msg: 'Brand profile updated successfully!' } });
    setSaving(false);
  };

  const handlePaymentSuccess = () => {
    dsp({ t: 'SET_PRO' });
    localStorage.setItem('cb_portfolio_active', 'true');
    localStorage.setItem('cb_verification_status', 'APPROVED');
    dsp({ t: 'TOAST', d: { type: 'success', msg: 'Subscribed to Creator Pro successfully! 🎉' } });
  };

  if (!st.user) {
    return <AuthGatekeeper mob={mob} />;
  }

  // Sidebar link structures based on role
  const steps = role === 'brand' ? [
    { id: 'brandProfile', label: 'Company Profile', icon: Building2 },
    { id: 'security', label: 'Account Security', icon: Lock }
  ] : [
    { id: 'profile', label: 'Profile Info', icon: User },
    { id: 'sponsor', label: 'Sponsored Posts', icon: Megaphone },
    { id: 'payout', label: 'Payout Settings', icon: CreditCard },
    { id: 'notifications', label: 'Notification Prefs', icon: Bell },
    { id: 'billing', label: 'Billing & Sub', icon: Sparkles },
    { id: 'security', label: 'Account Security', icon: Lock }
  ];

  return (
    <div className="dashboard-page-container">
      <div className="db-page-header">
        <div className="badge-saffron">
           <Shield size={14} fill="#FF9431" /> CONSOLE SETTINGS
        </div>
        <h1 className="page-title">Account Settings</h1>
        <p className="db-sub-text">Manage your preferences, details, and platform security credentials.</p>
      </div>

      <div className="db-main-grid">
         {/* Left: Settings navigation list */}
         {!mob && (
            <div className="db-col-left">
               <Card className="settings-sidebar-card">
                  <p className="db-sidebar-label" style={{ paddingLeft: 12, marginBottom: 12 }}>Settings Group</p>
                  <div className="tasks-box">
                     {steps.map(step => (
                        <StepNavItem 
                          key={step.id}
                          id={step.id}
                          label={step.label}
                          icon={step.icon}
                          active={tab === step.id}
                          onClick={() => setTab(step.id)}
                        />
                     ))}
                  </div>
               </Card>
            </div>
         )}

         {/* Mobile Tab Selector */}
         {mob && (
            <div className="settings-mobile-tabs-container" style={{ width: '100%', marginBottom: 20 }}>
               <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '8px 0', scrollbarWidth: 'none' }}>
                  {steps.map(step => (
                     <button 
                       key={step.id} 
                       onClick={() => setTab(step.id)}
                       style={{
                         flexShrink: 0,
                         padding: '10px 16px',
                         borderRadius: 100,
                         border: tab === step.id ? '1px solid #FF9431' : '1px solid #e2e8f0',
                         background: tab === step.id ? 'rgba(255,148,49,0.1)' : '#fff',
                         color: tab === step.id ? '#FF9431' : '#64748b',
                         fontSize: '13px',
                         fontWeight: 800
                       }}
                     >
                        {step.label}
                     </button>
                  ))}
               </div>
            </div>
         )}

         {/* Right Content Area */}
         <div className="db-col-right">
            <AnimatePresence mode="wait">
               {tab === 'brandProfile' && role === 'brand' && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="brandProfile">
                     <BrandProfileTabContent BF={BF} mob={mob} upBF={upBF} saveBrandProfile={saveBrandProfile} saving={saving} />
                  </motion.div>
               )}

                {tab === 'profile' && role === 'creator' && (
                   <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="profile">
                      <ProfileInfoTabContent c={creatorProfile} st={st} mob={mob} />
                   </motion.div>
                )}

                {tab === 'sponsor' && role === 'creator' && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="sponsor">
                     <SponsorSettingsTab c={creatorProfile} st={st} mob={mob} />
                  </motion.div>
               )}

               {tab === 'payout' && role === 'creator' && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="payout">
                     <PayoutSettingsTab c={creatorProfile} st={st} />
                  </motion.div>
               )}

               {tab === 'notifications' && role === 'creator' && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="notifications">
                     <NotificationsSettingsTab />
                  </motion.div>
               )}

               {tab === 'billing' && role === 'creator' && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="billing">
                     <BillingSettingsTab isPro={isPro} handleUpgradeClick={() => setIsUpgradeOpen(true)} />
                  </motion.div>
               )}

               {tab === 'security' && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="security">
                     <SecurityTabContent st={st} />
                  </motion.div>
               )}
            </AnimatePresence>
         </div>

      </div>

      <AnimatePresence>
        {isUpgradeOpen && (
          <UpgradeModal 
            isOpen={isUpgradeOpen} 
            onClose={() => setIsUpgradeOpen(false)} 
            onPaymentSuccess={handlePaymentSuccess} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
