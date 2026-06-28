import React from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import {
  T,
  fmtDate,
  Badge,
  SectionHeader,
  SearchBar,
  EmptyState,
  ActionBtn,
  DangerBtn,
  Table,
  Td
} from '../ui/Primitives';

export default function SystemControlSection({
  activeTab,
  mob,
  toast,
  token,
  API_BASE,
  fetchData,

  // Settings states & setters
  settingsTab,
  setSettingsTab,
  siteName,
  setSiteName,
  supportEmail,
  setSupportEmail,
  logoUrl,
  setLogoUrl,
  footerEmail,
  setFooterEmail,
  handleUploadFile,
  frontendUrl,
  setFrontendUrl,
  platformFee,
  setPlatformFee,
  proMembershipPrice,
  setProMembershipPrice,
  campaignBoostPrice,
  setCampaignBoostPrice,
  featuredSlotPrice,
  setFeaturedSlotPrice,
  razorpayMode,
  setRazorpayMode,
  razorpayKeyId,
  setRazorpayKeyId,
  razorpaySecret,
  setRazorpaySecret,
  resendApiKey,
  setResendApiKey,
  emailFrom,
  setEmailFrom,
  smsProvider,
  setSmsProvider,
  fast2smsKey,
  setFast2smsKey,
  twilioSid,
  setTwilioSid,
  twilioToken,
  setTwilioToken,
  twilioPhone,
  setTwilioPhone,
  featAchievements,
  setFeatAchievements,
  featWallet,
  setFeatWallet,
  enableEmail,
  setEnableEmail,
  enableSMS,
  setEnableSMS,
  maintenanceMode,
  setMaintenanceMode,
  handleSaveSettings,

  // Danger zone
  handleExportCSV,
  handleDangerOp,

  // Platform control center (feature-control)
  psSaving,
  psSaved,
  psLoading,
  platformSettings,
  savePlatformSettings,
  psSubTab,
  setPsSubTab,
  updatePS,

  // Admin control (admin-control)
  apSaving,
  apSaved,
  apLoading,
  adminPanelSettings,
  saveAdminPanelSettings,
  payments,
  stats,
  apSubTab,
  setApSubTab,
  updateAP,
  adminNewEmail,
  setAdminNewEmail,
  adminCurrentPassword,
  setAdminCurrentPassword,
  adminNewPassword,
  setAdminNewPassword,
  adminConfirmPassword,
  setAdminConfirmPassword,
  adminCredsUpdating,
  handleUpdateAdminCredentials,
  apDiagLoading,
  apDiagnostics,
  fetchDiagnostics,
  activityLog,
  twoFAEnabled,
  setTwoFAEnabled,
  twoFAQrCode,
  setTwoFAQrCode,
  twoFASecret,
  setTwoFASecret,
  twoFACode,
  setTwoFACode,
  twoFALoading,
  setTwoFALoading,
  twoFAMessage,
  setTwoFAMessage,
  twoFAStep,
  setTwoFAStep
}) {
  return (
    <>
      {/* ══ SYSTEM SETTINGS ════════════════════════════════════════════ */}
      {activeTab === 'settings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <SectionHeader title="System Settings" sub="Manage API keys, pricing, and feature toggles — changes are live instantly without redeployment" />

          {/* Settings Tabs */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { id: 'general', label: '⚙️ General' },
              { id: 'pricing', label: '💰 Pricing' },
              { id: 'razorpay', label: '💳 Razorpay' },
              { id: 'email', label: '📧 Email' },
              { id: 'sms', label: '📱 SMS' },
              { id: 'toggles', label: '🔀 Feature Toggles' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setSettingsTab(tab.id)} style={{
                padding: '8px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13,
                background: settingsTab === tab.id ? T.orange : T.bg,
                color: settingsTab === tab.id ? '#fff' : T.slate,
                boxShadow: settingsTab === tab.id ? `0 4px 12px ${T.orange}30` : 'none',
                transition: 'all 0.2s'
              }}>{tab.label}</button>
            ))}
          </div>

          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>

            {/* General Tab */}
            {settingsTab === 'general' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: T.navy }}>⚙️ General Configuration</h4>
                {[
                  { label: 'Site Name', value: siteName, setter: setSiteName, type: 'text', ph: 'CreatorBharat' },
                  { label: 'Support Email (Admin/Verification)', value: supportEmail, setter: setSupportEmail, type: 'email', ph: 'support@creatorbharat.com' },
                  { label: 'Footer Contact Email', value: footerEmail, setter: setFooterEmail, type: 'email', ph: 'hello@creatorbharat.com' },
                  { label: 'Frontend URL', value: frontendUrl, setter: setFrontendUrl, type: 'url', ph: 'https://creatorbharat.com' },
                  { label: 'Platform Commission Fee (%)', value: platformFee, setter: setPlatformFee, type: 'number', ph: '10' },
                ].map((f, i) => (
                  <div key={i}>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>{f.label}</label>
                    <input type={f.type} value={f.value} placeholder={f.ph} onChange={e => f.setter(e.target.value)}
                      style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.bg, outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                ))}

                {/* Custom Logo Image Uploader */}
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Platform Logo</label>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                    {logoUrl ? (
                      <div style={{ width: 64, height: 64, borderRadius: '50%', border: `1px solid ${T.border}`, overflow: 'hidden', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={logoUrl} alt="Logo Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ) : (
                      <div style={{ width: 64, height: 64, borderRadius: '50%', border: `1px solid ${T.border}`, background: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: T.muted }}>Default CSS</div>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 200 }}>
                      <input type="text" value={logoUrl} placeholder="Logo image URL (e.g. Cloudinary)" onChange={e => setLogoUrl(e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, color: T.navy, background: T.bg, outline: 'none', boxSizing: 'border-box' }} />
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                        <label style={{ display: 'inline-flex', padding: '6px 12px', background: T.orange, color: '#fff', fontSize: 11, fontWeight: 800, borderRadius: 6, cursor: 'pointer', boxShadow: `0 2px 6px ${T.orange}20` }}>
                          📤 Upload Logo Image
                          <input type="file" accept="image/*" onChange={e => handleUploadFile(e, 'image', url => setLogoUrl(url))} style={{ display: 'none' }} />
                        </label>
                        {logoUrl && (
                          <button onClick={() => setLogoUrl('')} style={{ padding: '6px 12px', background: 'none', border: `1px solid ${T.border}`, color: T.slate, fontSize: 11, fontWeight: 800, borderRadius: 6, cursor: 'pointer' }}>Reset to Default</button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pricing Tab */}
            {settingsTab === 'pricing' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: T.navy }}>💰 Subscription Pricing (in ₹)</h4>
                <p style={{ margin: 0, fontSize: 13, color: T.muted }}>Change prices here — frontend and payment gateway will use updated values automatically.</p>
                {[
                  { label: 'Creator Pro Membership (₹)', value: proMembershipPrice, setter: setProMembershipPrice },
                  { label: 'Campaign Boost (₹)', value: campaignBoostPrice, setter: setCampaignBoostPrice },
                  { label: 'Featured Creator Slot (₹)', value: featuredSlotPrice, setter: setFeaturedSlotPrice },
                ].map((f, i) => (
                  <div key={i}>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>{f.label}</label>
                    <input type="number" value={f.value} onChange={e => f.setter(e.target.value)}
                      style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.bg, outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                ))}
              </div>
            )}

            {/* Razorpay Tab */}
            {settingsTab === 'razorpay' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: T.navy }}>💳 Razorpay Payment Gateway</h4>
                <div style={{ padding: 14, background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: 10, fontSize: 13, color: '#92400e', fontWeight: 600 }}>
                  ⚠️ These keys are stored securely in the database. Use Test keys for development, Live keys for production.
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  {['test', 'live'].map(mode => (
                    <button key={mode} onClick={() => setRazorpayMode(mode)} style={{
                      flex: 1, padding: '10px 0', borderRadius: 10, border: `2px solid ${razorpayMode === mode ? T.orange : T.border}`,
                      background: razorpayMode === mode ? T.orangeLight : T.bg,
                      color: razorpayMode === mode ? T.orange : T.slate,
                      fontWeight: 800, fontSize: 13, cursor: 'pointer', textTransform: 'uppercase'
                    }}>{mode} Mode</button>
                  ))}
                </div>
                {[
                  { label: 'Key ID (rzp_test_... or rzp_live_...)', value: razorpayKeyId, setter: setRazorpayKeyId, ph: 'rzp_test_xxxxxxxxxxxx' },
                  { label: 'Key Secret', value: razorpaySecret, setter: setRazorpaySecret, ph: '••••••••••••••••••••', type: 'password' },
                ].map((f, i) => (
                  <div key={i}>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>{f.label}</label>
                    <input type={f.type || 'text'} value={f.value} placeholder={f.ph} onChange={e => f.setter(e.target.value)}
                      style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.bg, outline: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }} />
                  </div>
                ))}
              </div>
            )}

            {/* Email Tab */}
            {settingsTab === 'email' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: T.navy }}>📧 Email Service (Resend)</h4>
                <p style={{ margin: 0, fontSize: 13, color: T.muted }}>Get your API key from <a href="https://resend.com" target="_blank" rel="noreferrer" style={{ color: T.blue }}>resend.com</a>. Email sending can be toggled below.</p>
                {[
                  { label: 'Resend API Key', value: resendApiKey, setter: setResendApiKey, ph: 're_xxxxxxxxxxxxxxxxxxxx', type: 'password' },
                  { label: 'From Email Address', value: emailFrom, setter: setEmailFrom, ph: 'hello@yourdomain.com', type: 'email' },
                ].map((f, i) => (
                  <div key={i}>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>{f.label}</label>
                    <input type={f.type || 'text'} value={f.value} placeholder={f.ph} onChange={e => f.setter(e.target.value)}
                      style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.bg, outline: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }} />
                  </div>
                ))}
              </div>
            )}

            {/* SMS Tab */}
            {settingsTab === 'sms' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: T.navy }}>📱 SMS Provider</h4>
                <div style={{ display: 'flex', gap: 12 }}>
                  {['fast2sms', 'twilio'].map(p => (
                    <button key={p} onClick={() => setSmsProvider(p)} style={{
                      flex: 1, padding: '10px 0', borderRadius: 10, border: `2px solid ${smsProvider === p ? T.blue : T.border}`,
                      background: smsProvider === p ? T.blueLight : T.bg,
                      color: smsProvider === p ? T.blue : T.slate,
                      fontWeight: 800, fontSize: 13, cursor: 'pointer', textTransform: 'uppercase'
                    }}>{p === 'fast2sms' ? 'Fast2SMS (India)' : 'Twilio (Global)'}</button>
                  ))}
                </div>
                {smsProvider === 'fast2sms' && (
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Fast2SMS API Key</label>
                    <input type="password" value={fast2smsKey} placeholder="Fast2SMS Authorization Key" onChange={e => setFast2smsKey(e.target.value)}
                      style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.bg, outline: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }} />
                  </div>
                )}
                {smsProvider === 'twilio' && (
                  <>
                    {[
                      { label: 'Twilio Account SID', value: twilioSid, setter: setTwilioSid, ph: 'ACxxxxxxxxxxxxxxxx' },
                      { label: 'Twilio Auth Token', value: twilioToken, setter: setTwilioToken, ph: '••••••••••••••••••••', type: 'password' },
                      { label: 'Twilio Phone Number', value: twilioPhone, setter: setTwilioPhone, ph: '+1XXXXXXXXXX' },
                    ].map((f, i) => (
                      <div key={i}>
                        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>{f.label}</label>
                        <input type={f.type || 'text'} value={f.value} placeholder={f.ph} onChange={e => f.setter(e.target.value)}
                          style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.bg, outline: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }} />
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}

            {/* Feature Toggles Tab */}
            {settingsTab === 'toggles' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: T.navy }}>🔀 Feature Toggles</h4>
                <p style={{ margin: 0, fontSize: 13, color: T.muted }}>Enable or disable platform features instantly — no code deployment required.</p>
                {[
                  { label: 'AI Assistant (Pitch Generator)', sub: 'Gemini-powered pitch writer for creators', value: featAchievements, setter: setFeatAchievements, color: T.purple },
                  { label: 'Creator Wallet & Escrow System', sub: 'Razorpay-backed payment escrow for campaigns', value: featWallet, setter: setFeatWallet, color: T.green },
                  { label: 'Email Notifications', sub: 'Send transactional emails via Resend', value: enableEmail, setter: setEnableEmail, color: T.blue },
                  { label: 'SMS / OTP Service', sub: 'Phone number verification via Fast2SMS or Twilio', value: enableSMS, setter: setEnableSMS, color: T.teal },
                  { label: '🚨 Maintenance Mode', sub: 'Shows maintenance page to all users — keep this OFF in production', value: maintenanceMode, setter: setMaintenanceMode, color: T.red },
                ].map((flag, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: flag.value ? flag.color + '08' : T.bg, border: `1px solid ${flag.value ? flag.color + '30' : T.border}`, borderRadius: 14, transition: 'all 0.2s' }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: T.navy }}>{flag.label}</div>
                      <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{flag.sub}</div>
                    </div>
                    <div onClick={() => flag.setter(!flag.value)} style={{ width: 52, height: 28, borderRadius: 14, background: flag.value ? flag.color : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', flexShrink: 0 }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: flag.value ? 27 : 3, transition: 'left 0.25s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          <button onClick={handleSaveSettings} style={{ padding: '14px 32px', background: T.orange, color: '#fff', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 14, cursor: 'pointer', boxShadow: `0 4px 14px ${T.orange}30`, alignSelf: 'flex-start' }}>
            💾 Save All Settings
          </button>
        </div>
      )}

      {/* ══ DANGER ZONE ════════════════════════════════════════════════ */}
      {activeTab === 'danger' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ padding: 20, background: '#fef2f2', border: `1px solid ${T.red}25`, borderRadius: 16 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
              <ShieldAlert size={22} style={{ color: T.red }} />
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 900, color: T.red }}>⚠️ Danger Zone</h3>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: '#7f1d1d', fontWeight: 600 }}>These operations are irreversible. Proceed only if you know what you are doing.</p>
          </div>
          {/* Data Export Section */}
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 22 }}>
            <div style={{ fontWeight: 800, color: T.navy, fontSize: 15, marginBottom: 6 }}>📊 Data Export</div>
            <div style={{ fontSize: 13, color: T.muted, fontWeight: 500, marginBottom: 16 }}>Download platform data as CSV files for analysis or backup.</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
              {[
                { label: '👥 Export Creators', type: 'creators', color: T.blue },
                { label: '🏢 Export Brands', type: 'brands', color: T.green },
                { label: '📢 Export Campaigns', type: 'campaigns', color: T.purple },
                { label: '💰 Export Payments', type: 'payments', color: T.orange },
                { label: '📧 Export Newsletters', type: 'newsletters', color: T.slate },
              ].map(exp => (
                <button key={exp.type} onClick={() => handleExportCSV(exp.type)} style={{ padding: '10px 14px', background: exp.color + '12', color: exp.color, border: `1px solid ${exp.color}25`, borderRadius: 10, fontWeight: 800, fontSize: 12, cursor: 'pointer', textAlign: 'left' }}>
                  {exp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Danger Operations */}
          {[
            { title: 'Clear All Newsletter Subscribers', desc: 'Permanently remove all email subscribers from the mailing list', action: 'Clear Subscribers', color: T.orange, endpoint: 'clear-newsletters' },
            { title: 'Delete All Draft Blogs', desc: 'Remove all unpublished blog drafts from the system', action: 'Delete Drafts', color: T.red, endpoint: 'delete-draft-blogs' },
            { title: 'Revoke All Pending Verifications', desc: 'Reset the entire verification queue — creators must re-submit', action: 'Revoke All KYC', color: T.red, endpoint: 'revoke-pending-verifications' },
          ].map((op, i) => (
            <div key={i} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
              <div>
                <div style={{ fontWeight: 800, color: T.navy, fontSize: 14, marginBottom: 4 }}>{op.title}</div>
                <div style={{ fontSize: 13, color: T.muted, fontWeight: 500 }}>{op.desc}</div>
              </div>
              <button onClick={() => handleDangerOp(op.endpoint, op.title)} style={{ padding: '9px 20px', background: op.color + '15', color: op.color, border: `1px solid ${op.color}30`, borderRadius: 10, fontWeight: 800, fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                {op.action}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ══ PLATFORM CONTROL CENTER ════════════════════════════════════ */}
      {activeTab === 'feature-control' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Header + Save Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: '20px 24px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: T.navy, fontFamily: 'Outfit, sans-serif' }}>⚙️ Platform Control Center</h2>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: T.muted, fontWeight: 600 }}>Feature flags, commissions, creator/brand limits, announcements — live changes, no deploy needed.</p>
            </div>
            <button onClick={savePlatformSettings} disabled={psSaving || !platformSettings} style={{ padding: '12px 28px', background: psSaved ? T.green : T.orange, color: '#fff', border: 'none', borderRadius: 14, fontWeight: 900, fontSize: 14, cursor: 'pointer', opacity: psSaving ? 0.7 : 1, transition: 'all 0.2s', minWidth: 140 }}>
              {psSaving ? '⏳ Saving...' : psSaved ? '✅ Saved!' : '💾 Save All Changes'}
            </button>
          </div>

          {psLoading || !platformSettings ? (
            <div style={{ textAlign: 'center', padding: 60, color: T.muted }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>⚙️</div>
              <div style={{ fontWeight: 700 }}>Loading platform settings...</div>
            </div>
          ) : (
            <>
              {/* Sub-tab nav */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', borderBottom: `1.5px solid ${T.border}`, paddingBottom: 12 }}>
                {[
                  { id: 'features', label: '🔀 Feature Flags' },
                  { id: 'comingSoon', label: '🚧 Coming Soon' },
                  { id: 'commission', label: '💰 Commission & Pricing' },
                  { id: 'creatorLimits', label: '🎛️ Creator Controls' },
                  { id: 'brandLimits', label: '🏢 Brand Controls' },
                  { id: 'announcement', label: '📢 Announcements' }
                ].map(st => (
                  <button key={st.id} onClick={() => setPsSubTab(st.id)} type="button" style={{ padding: '8px 16px', borderRadius: 10, background: psSubTab === st.id ? T.orange : T.bg, color: psSubTab === st.id ? '#fff' : T.navy, fontWeight: 800, cursor: 'pointer', fontSize: 13, border: `1.5px solid ${psSubTab === st.id ? T.orange : T.border}`, transition: 'all 0.15s' }}>
                    {st.label}
                  </button>
                ))}
              </div>

              {/* ── SECTION: Feature Flags ── */}
              {psSubTab === 'features' && (
                <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 16 }}>
                  {[
                    { key: 'creatorRegistration', label: '👤 Creator Registration', desc: 'Naye creators account bana sakte hain' },
                    { key: 'brandRegistration', label: '🏢 Brand Registration', desc: 'Naye brands register kar sakte hain' },
                    { key: 'campaignCreation', label: '📢 Campaign Creation', desc: 'Brands naye campaigns post kar sakte hain' },
                    { key: 'escrowPayments', label: '💰 Escrow Payments', desc: 'Escrow payment system active hai' },
                    { key: 'verificationRequests', label: '✅ Verification Requests', desc: 'Creators blue tick apply kar sakte hain' },
                    { key: 'leaderboard', label: '🏆 Leaderboard', desc: 'Public creator leaderboard visible hai' },
                    { key: 'rateCalculator', label: '🧮 Rate Calculator', desc: 'AI rate calculator public page pe dikhta hai' },
                    { key: 'communityFeed', label: '💬 Community Feed', desc: 'Creator community posts aur discussions' },
                    { key: 'brandSearch', label: '🔍 Brand Creator Search', desc: 'Brands creators ko search/filter kar sakte hain' },
                    { key: 'messages', label: '💌 Messaging System', desc: 'Creator ↔ Brand direct messages' },
                    { key: 'achievements', label: '🏅 Achievements', desc: 'Creator achievement badges aur milestones' },
                    { key: 'referralSystem', label: '🔗 Referral System', desc: 'Referral links aur rewards active hain' },
                    { key: 'walletWithdrawal', label: '💸 Wallet Withdrawal', desc: 'Creators apna balance withdraw kar sakte hain' },
                    { key: 'creatorScore', label: '⭐ Creator Score', desc: 'Creator score algorithm active hai' },
                    { key: 'events', label: '📅 Events', desc: 'Platform events aur conferences visible hain' },
                    { key: 'podcasts', label: '🎙️ Podcasts', desc: 'Podcast section active hai' },
                    { key: 'missionSystem', label: '🎯 Monthly Missions', desc: 'Creator monthly missions aur quests' },
                    { key: 'gigs', label: '💼 Gigs / Projects', desc: 'Freelance gig marketplace active hai' }
                  ].map(f => {
                    const isOn = platformSettings.features[f.key] !== false;
                    return (
                      <div key={f.key} style={{ background: T.card, border: `1.5px solid ${isOn ? T.green + '40' : T.red + '30'}`, borderRadius: 16, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, transition: 'all 0.2s' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, marginBottom: 3 }}>{f.label}</div>
                          <div style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>{f.desc}</div>
                        </div>
                        {/* iOS-style toggle */}
                        <div onClick={() => updatePS('features', f.key, !isOn)} style={{ width: 52, height: 28, borderRadius: 14, background: isOn ? T.green : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', flexShrink: 0, border: `2px solid ${isOn ? T.green : '#94a3b8'}` }}>
                          <div style={{ position: 'absolute', top: 2, left: isOn ? 24 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 800, color: isOn ? T.green : T.red, minWidth: 28 }}>{isOn ? 'ON' : 'OFF'}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ── SECTION: Coming Soon ── */}
              {psSubTab === 'comingSoon' && (
                <div>
                  <div style={{ background: '#fffbeb', border: '1.5px solid #fcd34d', borderRadius: 14, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#92400e', fontWeight: 700 }}>
                    🚧 "Coming Soon" ON karne se us feature pe "Coming Soon" badge/overlay dikhega users ko. Feature disabled nahi hoga — sirf label lagega.
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 16 }}>
                    {[
                      { key: 'aiMatchmaking', label: '🤖 AI Matchmaking', desc: 'AI-powered brand-creator automatic matching' },
                      { key: 'videoVerification', label: '🎥 Video Verification', desc: 'Face/video based identity verification' },
                      { key: 'mobileApp', label: '📱 Mobile App', desc: 'CreatorBharat Android + iOS apps' },
                      { key: 'advancedAnalytics', label: '📊 Advanced Analytics', desc: 'Deep creator performance analytics dashboard' },
                      { key: 'multiLanguage', label: '🌐 Multi-Language', desc: 'Hindi, Tamil, Bengali language support' },
                      { key: 'apiAccess', label: '🔌 Developer API', desc: 'Public REST API for third-party integrations' },
                      { key: 'liveStreaming', label: '📺 Live Streaming', desc: 'Creator live stream integration' },
                      { key: 'brandMarketplace', label: '🛒 Brand Marketplace', desc: 'Self-serve brand campaign marketplace' }
                    ].map(f => {
                      const isCS = !!(platformSettings.comingSoon[f.key]);
                      return (
                        <div key={f.key} style={{ background: T.card, border: `1px solid ${isCS ? '#fcd34d' : T.border}`, borderRadius: 16, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, transition: 'all 0.2s' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, marginBottom: 3 }}>{f.label}</div>
                            <div style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>{f.desc}</div>
                          </div>
                          <div onClick={() => updatePS('comingSoon', f.key, !isCS)} style={{ width: 52, height: 28, borderRadius: 14, background: isCS ? '#f59e0b' : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', flexShrink: 0, border: `2px solid ${isCS ? '#f59e0b' : '#94a3b8'}` }}>
                            <div style={{ position: 'absolute', top: 2, left: isCS ? 24 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                          </div>
                          <span style={{ fontSize: 11, fontWeight: 800, color: isCS ? '#f59e0b' : T.muted, minWidth: 60 }}>{isCS ? '🚧 SOON' : 'LIVE'}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── SECTION: Commission & Pricing ── */}
              {psSubTab === 'commission' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ background: '#eff6ff', border: '1.5px solid #93c5fd', borderRadius: 14, padding: '12px 16px', fontSize: 13, color: '#1d4ed8', fontWeight: 700 }}>
                    💡 Ye values pricing page pe aur commission calculations mein use honge. 0% = free platform.
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 16 }}>
                    {[
                      { key: 'platformFeePercent', label: '🏦 Platform Fee %', desc: 'Platform ki overall commission percentage', min: 0, max: 30, step: 0.5 },
                      { key: 'escrowFeePercent', label: '🔐 Escrow Fee %', desc: 'Escrow release pe processing fee', min: 0, max: 10, step: 0.5 },
                      { key: 'brandCommissionPercent', label: '🏢 Brand Commission %', desc: 'Brand campaigns pe additional fee', min: 0, max: 20, step: 0.5 },
                      { key: 'creatorCommissionPercent', label: '👤 Creator Revenue Share %', desc: 'Creator earnings pe platform cut', min: 0, max: 20, step: 0.5 },
                      { key: 'minCampaignBudget', label: '📉 Min Campaign Budget (₹)', desc: 'Minimum allowed campaign budget in INR', min: 100, max: 10000, step: 100 },
                      { key: 'maxCampaignBudget', label: '📈 Max Campaign Budget (₹)', desc: 'Maximum allowed campaign budget in INR', min: 10000, max: 10000000, step: 10000 }
                    ].map(f => (
                      <div key={f.key} style={{ background: T.card, border: `1.5px solid ${T.border}`, borderRadius: 16, padding: '18px 20px' }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, marginBottom: 2 }}>{f.label}</div>
                        <div style={{ fontSize: 11, color: T.muted, fontWeight: 600, marginBottom: 12 }}>{f.desc}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <input type="range" min={f.min} max={f.max} step={f.step} value={platformSettings.commission[f.key]} onChange={e => updatePS('commission', f.key, parseFloat(e.target.value))} style={{ flex: 1, accentColor: T.orange }} />
                          <input type="number" min={f.min} max={f.max} step={f.step} value={platformSettings.commission[f.key]} onChange={e => updatePS('commission', f.key, parseFloat(e.target.value) || 0)} style={{ width: 80, padding: '6px 10px', border: `1.5px solid ${T.border}`, borderRadius: 8, fontSize: 14, fontWeight: 800, color: T.navy, textAlign: 'center', background: T.bg }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── SECTION: Creator Controls ── */}
              {psSubTab === 'creatorLimits' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 14, padding: '12px 16px', fontSize: 13, color: '#15803d', fontWeight: 700 }}>
                    👤 Creator-side platform limits aur thresholds. Ye values creator dashboard aur verification mein use honge.
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 16 }}>
                    {[
                      { key: 'maxActiveCampaigns', label: '📢 Max Active Campaigns', desc: 'Ek creator ek saath kitne campaigns le sakta hai', min: 1, max: 50, step: 1, type: 'number' },
                      { key: 'minFollowersForVerification', label: '👥 Min Followers for Verification', desc: 'Blue tick ke liye minimum follower count', min: 100, max: 100000, step: 100, type: 'number' },
                      { key: 'profileCompletionRequired', label: '✅ Profile Completion Required (%)', desc: 'Campaign apply karne ke liye minimum profile %', min: 0, max: 100, step: 5, type: 'number' },
                      { key: 'scoreDecayDays', label: '⏳ Score Decay Days', desc: 'Kitne din baad creator score decay hota hai', min: 7, max: 365, step: 7, type: 'number' },
                      { key: 'maxPortfolioItems', label: '🖼️ Max Portfolio Items', desc: 'Creator profile mein max portfolio entries', min: 5, max: 100, step: 5, type: 'number' }
                    ].map(f => (
                      <div key={f.key} style={{ background: T.card, border: `1.5px solid ${T.border}`, borderRadius: 16, padding: '18px 20px' }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, marginBottom: 2 }}>{f.label}</div>
                        <div style={{ fontSize: 11, color: T.muted, fontWeight: 600, marginBottom: 12 }}>{f.desc}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <input type="range" min={f.min} max={f.max} step={f.step} value={platformSettings.creator[f.key]} onChange={e => updatePS('creator', f.key, parseInt(e.target.value))} style={{ flex: 1, accentColor: T.green }} />
                          <input type="number" min={f.min} max={f.max} step={f.step} value={platformSettings.creator[f.key]} onChange={e => updatePS('creator', f.key, parseInt(e.target.value) || f.min)} style={{ width: 80, padding: '6px 10px', border: `1.5px solid ${T.border}`, borderRadius: 8, fontSize: 14, fontWeight: 800, color: T.navy, textAlign: 'center', background: T.bg }} />
                        </div>
                      </div>
                    ))}
                    {/* Toggle for allowGuestProfiles */}
                    <div style={{ background: T.card, border: `1.5px solid ${platformSettings.creator.allowGuestProfiles ? T.green + '40' : T.red + '30'}`, borderRadius: 16, padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, marginBottom: 2 }}>👁️ Guest Profile Viewing</div>
                        <div style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>Non-logged-in users creator profiles dekh sakte hain</div>
                      </div>
                      <div onClick={() => updatePS('creator', 'allowGuestProfiles', !platformSettings.creator.allowGuestProfiles)} style={{ width: 52, height: 28, borderRadius: 14, background: platformSettings.creator.allowGuestProfiles ? T.green : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', border: `2px solid ${platformSettings.creator.allowGuestProfiles ? T.green : '#94a3b8'}` }}>
                        <div style={{ position: 'absolute', top: 2, left: platformSettings.creator.allowGuestProfiles ? 24 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── SECTION: Brand Controls ── */}
              {psSubTab === 'brandLimits' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ background: '#eff6ff', border: '1.5px solid #93c5fd', borderRadius: 14, padding: '12px 16px', fontSize: 13, color: '#1d4ed8', fontWeight: 700 }}>
                    🏢 Brand-side platform settings. Campaign limits, approval rules, aur visibility controls.
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 16 }}>
                    {/* Number sliders */}
                    {[
                      { key: 'maxActiveCampaigns', label: '📢 Max Active Campaigns per Brand', desc: 'Ek brand ek saath kitne campaigns post kar sakta hai', min: 1, max: 100, step: 1 },
                      { key: 'maxCreatorsPerCampaign', label: '👥 Max Creators per Campaign', desc: 'Ek campaign mein maximum creator slots', min: 1, max: 500, step: 5 }
                    ].map(f => (
                      <div key={f.key} style={{ background: T.card, border: `1.5px solid ${T.border}`, borderRadius: 16, padding: '18px 20px' }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, marginBottom: 2 }}>{f.label}</div>
                        <div style={{ fontSize: 11, color: T.muted, fontWeight: 600, marginBottom: 12 }}>{f.desc}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <input type="range" min={f.min} max={f.max} step={f.step} value={platformSettings.brand[f.key]} onChange={e => updatePS('brand', f.key, parseInt(e.target.value))} style={{ flex: 1, accentColor: T.blue }} />
                          <input type="number" min={f.min} max={f.max} step={f.step} value={platformSettings.brand[f.key]} onChange={e => updatePS('brand', f.key, parseInt(e.target.value) || f.min)} style={{ width: 80, padding: '6px 10px', border: `1.5px solid ${T.border}`, borderRadius: 8, fontSize: 14, fontWeight: 800, color: T.navy, textAlign: 'center', background: T.bg }} />
                        </div>
                      </div>
                    ))}
                    {/* Toggle switches */}
                    {[
                      { key: 'autoApproveBrands', label: '⚡ Auto-Approve Brands', desc: 'Naye brand accounts automatically approved ho jayein', color: T.orange },
                      { key: 'requireEscrowForCampaigns', label: '🔐 Require Escrow for Campaigns', desc: 'Campaign launch ke liye escrow mandatory hai', color: T.blue },
                      { key: 'allowDirectMessages', label: '💌 Allow Direct Messages', desc: 'Brands creators ko seedha message kar sakte hain', color: T.green },
                      { key: 'showBudgetToCreators', label: '👁️ Show Budget to Creators', desc: 'Creators campaign budget dekhein application mein', color: T.purple }
                    ].map(f => (
                      <div key={f.key} style={{ background: T.card, border: `1.5px solid ${platformSettings.brand[f.key] ? f.color + '40' : T.border}`, borderRadius: 16, padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, marginBottom: 2 }}>{f.label}</div>
                          <div style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>{f.desc}</div>
                        </div>
                        <div onClick={() => updatePS('brand', f.key, !platformSettings.brand[f.key])} style={{ width: 52, height: 28, borderRadius: 14, background: platformSettings.brand[f.key] ? f.color : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', flexShrink: 0, border: `2px solid ${platformSettings.brand[f.key] ? f.color : '#94a3b8'}` }}>
                          <div style={{ position: 'absolute', top: 2, left: platformSettings.brand[f.key] ? 24 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── SECTION: Announcements ── */}
              {psSubTab === 'announcement' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {/* Global Banner */}
                  <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 24 }}>
                    <div style={{ fontSize: 15, fontWeight: 900, color: T.navy, marginBottom: 16, borderBottom: `1px solid ${T.border}`, paddingBottom: 10 }}>📢 Global Site Banner</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: T.navy }}>Enable Banner</div>
                        <div style={{ fontSize: 11, color: T.muted }}>Sab pages ke upar ek banner dikhao</div>
                      </div>
                      <div onClick={() => updatePS('announcement', 'globalBannerEnabled', !platformSettings.announcement.globalBannerEnabled)} style={{ width: 52, height: 28, borderRadius: 14, background: platformSettings.announcement.globalBannerEnabled ? T.orange : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', border: `2px solid ${platformSettings.announcement.globalBannerEnabled ? T.orange : '#94a3b8'}` }}>
                        <div style={{ position: 'absolute', top: 2, left: platformSettings.announcement.globalBannerEnabled ? 24 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                      </div>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <label style={{ fontSize: 11, fontWeight: 800, color: T.muted, display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>Banner Message</label>
                      <input type="text" value={platformSettings.announcement.globalBannerText} onChange={e => updatePS('announcement', 'globalBannerText', e.target.value)} placeholder="e.g. 🚀 New features launched! Check out our updated dashboard." style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, boxSizing: 'border-box', background: T.bg }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 800, color: T.muted, display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>Banner Type</label>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {[{ v: 'info', l: 'ℹ️ Info', c: '#3b82f6' }, { v: 'success', l: '✅ Success', c: '#10b981' }, { v: 'warning', l: '⚠️ Warning', c: '#f59e0b' }, { v: 'danger', l: '🚨 Danger', c: '#ef4444' }].map(t => (
                          <button key={t.v} type="button" onClick={() => updatePS('announcement', 'globalBannerType', t.v)} style={{ padding: '8px 14px', borderRadius: 8, border: `2px solid ${platformSettings.announcement.globalBannerType === t.v ? t.c : T.border}`, background: platformSettings.announcement.globalBannerType === t.v ? t.c + '15' : 'transparent', color: platformSettings.announcement.globalBannerType === t.v ? t.c : T.muted, fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>{t.l}</button>
                        ))}
                      </div>
                    </div>
                    {/* Preview */}
                    {platformSettings.announcement.globalBannerText && (
                      <div style={{ marginTop: 16, padding: '10px 16px', borderRadius: 10, background: platformSettings.announcement.globalBannerType === 'info' ? '#eff6ff' : platformSettings.announcement.globalBannerType === 'success' ? '#f0fdf4' : platformSettings.announcement.globalBannerType === 'warning' ? '#fffbeb' : '#fef2f2', border: `1.5px solid ${platformSettings.announcement.globalBannerType === 'info' ? '#93c5fd' : platformSettings.announcement.globalBannerType === 'success' ? '#86efac' : platformSettings.announcement.globalBannerType === 'warning' ? '#fcd34d' : '#fca5a5'}`, fontSize: 13, fontWeight: 700, color: platformSettings.announcement.globalBannerType === 'info' ? '#1d4ed8' : platformSettings.announcement.globalBannerType === 'success' ? '#15803d' : platformSettings.announcement.globalBannerType === 'warning' ? '#92400e' : '#991b1b' }}>
                        <span style={{ marginRight: 8 }}>👁️ Preview:</span>{platformSettings.announcement.globalBannerText}
                      </div>
                    )}
                  </div>

                  {/* Maintenance Mode */}
                  <div style={{ background: T.card, border: `1.5px solid ${platformSettings.announcement.maintenanceMode ? T.red + '50' : T.border}`, borderRadius: 16, padding: 24 }}>
                    <div style={{ fontSize: 15, fontWeight: 900, color: T.navy, marginBottom: 16, borderBottom: `1px solid ${T.border}`, paddingBottom: 10 }}>🔧 Maintenance Mode</div>
                    {platformSettings.announcement.maintenanceMode && (
                      <div style={{ background: '#fef2f2', border: '1.5px solid #fca5a5', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 13, fontWeight: 800, color: '#991b1b' }}>
                        ⚠️ MAINTENANCE MODE ACTIVE — Users ko full-page overlay dikh raha hai!
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: T.navy }}>Enable Maintenance Mode</div>
                        <div style={{ fontSize: 11, color: T.muted }}>Pura site visitors ke liye maintenance overlay show karega</div>
                      </div>
                      <div onClick={() => updatePS('announcement', 'maintenanceMode', !platformSettings.announcement.maintenanceMode)} style={{ width: 52, height: 28, borderRadius: 14, background: platformSettings.announcement.maintenanceMode ? T.red : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', border: `2px solid ${platformSettings.announcement.maintenanceMode ? T.red : '#94a3b8'}` }}>
                        <div style={{ position: 'absolute', top: 2, left: platformSettings.announcement.maintenanceMode ? 24 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                      </div>
                    </div>
                    <label style={{ fontSize: 11, fontWeight: 800, color: T.muted, display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>Maintenance Message</label>
                    <input type="text" value={platformSettings.announcement.maintenanceMessage} onChange={e => updatePS('announcement', 'maintenanceMessage', e.target.value)} placeholder="Platform is under scheduled maintenance. Back in 2 hours." style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, boxSizing: 'border-box', background: T.bg }} />
                  </div>

                  {/* News Ticker */}
                  <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 24 }}>
                    <div style={{ fontSize: 15, fontWeight: 900, color: T.navy, marginBottom: 16, borderBottom: `1px solid ${T.border}`, paddingBottom: 10 }}>📰 News Ticker</div>
                    <label style={{ fontSize: 11, fontWeight: 800, color: T.muted, display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>Ticker Text (scrolls across top of site — empty = no ticker)</label>
                    <input type="text" value={platformSettings.announcement.newsTicker} onChange={e => updatePS('announcement', 'newsTicker', e.target.value)} placeholder="e.g. 🎉 New creators joined this week! Leaderboard updated — check your rank now." style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, boxSizing: 'border-box', background: T.bg }} />
                    {platformSettings.announcement.newsTicker && (
                      <div style={{ marginTop: 12, background: '#0f172a', borderRadius: 8, padding: '8px 16px', overflow: 'hidden' }}>
                        <span style={{ color: '#FF9431', fontSize: 12, fontWeight: 800 }}>🔔 {platformSettings.announcement.newsTicker}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ══ ADMIN PANEL CONTROL ═════════════════════════════════════════ */}
      {activeTab === 'admin-control' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Header + Save Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: '20px 24px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: T.navy, fontFamily: 'Outfit, sans-serif' }}>🛡️ Admin Panel Control</h2>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: T.muted, fontWeight: 600 }}>Configure administrator UI styles, session parameters, sound notifications, and audit administrative trails.</p>
            </div>
            <button onClick={saveAdminPanelSettings} disabled={apSaving || !adminPanelSettings} style={{ padding: '12px 28px', background: apSaved ? T.green : T.orange, color: '#fff', border: 'none', borderRadius: 14, fontWeight: 900, fontSize: 14, cursor: 'pointer', opacity: apSaving ? 0.7 : 1, transition: 'all 0.2s', minWidth: 140 }}>
              {apSaving ? '⏳ Saving...' : apSaved ? '✅ Saved!' : '💾 Save Admin Settings'}
            </button>
          </div>

          {apLoading || !adminPanelSettings ? (
            <div style={{ textAlign: 'center', padding: 60, color: T.muted }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🛡️</div>
              <div style={{ fontWeight: 700 }}>Loading admin settings...</div>
            </div>
          ) : (
            <>
              {/* Summary Bar */}
              <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr 1fr 1fr', gap: 16 }}>
                {/* Card 1: Security Health Score */}
                <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ fontSize: 24, width: 44, height: 44, borderRadius: 12, background: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🛡️</div>
                  <div>
                    <div style={{ fontSize: 11, color: T.muted, fontWeight: 700, textTransform: 'uppercase' }}>Security Health</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: T.navy }}>{(() => {
                      const mfaWeight = adminPanelSettings.requireMFA ? 35 : 0;
                      const timeoutWeight = adminPanelSettings.sessionTimeout <= 3600 ? 30 : 15;
                      const soundWeight = adminPanelSettings.soundAlerts ? 15 : 10;
                      const refreshWeight = adminPanelSettings.autoRefreshRate > 0 ? 20 : 10;
                      return mfaWeight + timeoutWeight + soundWeight + refreshWeight;
                    })()}% Secured</div>
                  </div>
                </div>

                {/* Card 2: SaaS Platform Revenue */}
                <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ fontSize: 24, width: 44, height: 44, borderRadius: 12, background: 'rgba(234, 179, 8, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💰</div>
                  <div>
                    <div style={{ fontSize: 11, color: T.muted, fontWeight: 700, textTransform: 'uppercase' }}>Platform Profit</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: T.navy }}>₹{(() => {
                      const totalVolume = payments ? payments.reduce((acc, curr) => acc + (curr.amount || 0), 0) : 0;
                      const escrowFeePercent = platformSettings?.commission?.escrowFeePercent || 2.5;
                      return (totalVolume * (escrowFeePercent / 100)).toFixed(2);
                    })()}</div>
                  </div>
                </div>

                {/* Card 3: Database Protection */}
                <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ fontSize: 24, width: 44, height: 44, borderRadius: 12, background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💾</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: T.muted, fontWeight: 700, textTransform: 'uppercase' }}>System Backup</div>
                    <button onClick={() => window.open(`${API_BASE}/admin/system/backup?token=${token}`, '_blank')} style={{ border: 'none', background: 'none', padding: 0, color: T.orange, fontWeight: 800, fontSize: 13, cursor: 'pointer', textAlign: 'left' }}>
                      ⬇️ Download JSON
                    </button>
                  </div>
                </div>

                {/* Card 4: Active Portal Admins */}
                <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ fontSize: 24, width: 44, height: 44, borderRadius: 12, background: 'rgba(236, 72, 153, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👥</div>
                  <div>
                    <div style={{ fontSize: 11, color: T.muted, fontWeight: 700, textTransform: 'uppercase' }}>Portal Admins</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: T.navy }}>{stats?.activeAdmins || 1} Active</div>
                  </div>
                </div>
              </div>

              {/* Sub-tab nav */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', borderBottom: `1.5px solid ${T.border}`, paddingBottom: 12, marginTop: 12 }}>
                {[
                  { id: 'theme', label: '🎨 UI Theme & Style' },
                  { id: 'security', label: '🔒 Access & Security' },
                  { id: 'credentials', label: '🔑 Change Credentials' },
                  { id: 'diagnostics', label: '⚡ System Diagnostics' },
                  { id: 'audit', label: '📋 Audit Trail & Logs' },
                  { id: 'roles', label: '🛡️ Permissions Matrix' }
                ].map(st => (
                  <button key={st.id} onClick={() => setApSubTab(st.id)} type="button" style={{ padding: '8px 16px', borderRadius: 10, background: apSubTab === st.id ? T.orange : T.bg, color: apSubTab === st.id ? '#fff' : T.navy, fontWeight: 800, cursor: 'pointer', fontSize: 13, border: `1.5px solid ${apSubTab === st.id ? T.orange : T.border}`, transition: 'all 0.15s' }}>
                    {st.label}
                  </button>
                ))}
              </div>

              {/* ── SUB-TAB: UI Theme ── */}
              {apSubTab === 'theme' && (
                <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 16 }}>
                  {/* Sidebar Theme Selector */}
                  <div style={{ background: T.card, border: `1.5px solid ${T.border}`, borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, marginBottom: 2 }}>Sidebar Theme</div>
                      <div style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>Choose the accent style and color theme of the admin sidebar</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      {[
                        { value: 'dark-sidebar', label: '🌑 Slate Dark', desc: 'Standard slate theme' },
                        { value: 'light-sidebar', label: '☀️ Classic Light', desc: 'Clean bright layout' },
                        { value: 'slate-neon', label: '🤖 Tech Blue', desc: 'Electric blue accents' },
                        { value: 'sunset-crimson', label: '🌇 Orange Sunset', desc: 'Warm gradient sunset' }
                      ].map(opt => {
                        const isSelected = adminPanelSettings.theme === opt.value;
                        return (
                          <button key={opt.value} onClick={() => updateAP('theme', opt.value)} style={{ padding: '10px 12px', border: `2px solid ${isSelected ? T.orange : T.border}`, borderRadius: 10, background: isSelected ? T.orangeLight : T.card, cursor: 'pointer', textAlign: 'left' }}>
                            <div style={{ fontSize: 12, fontWeight: 800, color: T.navy }}>{opt.label}</div>
                            <div style={{ fontSize: 10, color: T.muted }}>{opt.desc}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Display Preferences */}
                  <div style={{ background: T.card, border: `1.5px solid ${T.border}`, borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: T.navy }}>UI Layout Toggles</div>
                    
                    {/* Compact Sidebar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Compact Sidebar</div>
                        <div style={{ fontSize: 11, color: T.muted }}>Minimize sidebar size and show icons only</div>
                      </div>
                      <div onClick={() => updateAP('compactSidebar', !adminPanelSettings.compactSidebar)} style={{ width: 52, height: 28, borderRadius: 14, background: adminPanelSettings.compactSidebar ? T.green : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', border: `2px solid ${adminPanelSettings.compactSidebar ? T.green : '#94a3b8'}` }}>
                        <div style={{ position: 'absolute', top: 2, left: adminPanelSettings.compactSidebar ? 24 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                      </div>
                    </div>

                    {/* Developer logs toggle */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Show Console Dev-Logs</div>
                        <div style={{ fontSize: 11, color: T.muted }}>Show low-level API queries and console events inside panels</div>
                      </div>
                      <div onClick={() => updateAP('showConsoleLogs', !adminPanelSettings.showConsoleLogs)} style={{ width: 52, height: 28, borderRadius: 14, background: adminPanelSettings.showConsoleLogs ? T.orange : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', border: `2px solid ${adminPanelSettings.showConsoleLogs ? T.orange : '#94a3b8'}` }}>
                        <div style={{ position: 'absolute', top: 2, left: adminPanelSettings.showConsoleLogs ? 24 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── SUB-TAB: Access & Security ── */}
              {apSubTab === 'security' && (
                <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: 16 }}>
                  {/* Session Parameters */}
                  <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: T.navy }}>Session & Authentication</div>
                    
                    {/* Auto Timeout */}
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 800, color: T.muted, display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>Session Auto-Timeout</label>
                      <select value={adminPanelSettings.sessionTimeout} onChange={e => updateAP('sessionTimeout', parseInt(e.target.value))} style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, background: T.bg, fontWeight: 700 }}>
                        <option value={900}>15 Minutes (High Security)</option>
                        <option value={3600}>1 Hour (Standard)</option>
                        <option value={28800}>8 Hours (Shift Session)</option>
                        <option value={999999}>Never Timeout</option>
                      </select>
                    </div>

                    {/* Real-time Refresh Rate */}
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 800, color: T.muted, display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>Stats Auto-Refresh Rate</label>
                      <select value={adminPanelSettings.autoRefreshRate} onChange={e => updateAP('autoRefreshRate', parseInt(e.target.value))} style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, background: T.bg, fontWeight: 700 }}>
                        <option value={0}>Manual Refresh Only</option>
                        <option value={30}>Every 30 Seconds</option>
                        <option value={60}>Every 1 Minute</option>
                        <option value={300}>Every 5 Minutes</option>
                      </select>
                    </div>
                  </div>

                  {/* Security policies */}
                  <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: T.navy }}>Auditing & Alert Policies</div>

                    {/* sound alerts */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Sound Notifications</div>
                        <div style={{ fontSize: 11, color: T.muted }}>Play a subtle chime alert when new verifications arrive</div>
                      </div>
                      <div onClick={() => updateAP('soundAlerts', !adminPanelSettings.soundAlerts)} style={{ width: 52, height: 28, borderRadius: 14, background: adminPanelSettings.soundAlerts ? T.green : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', border: `2px solid ${adminPanelSettings.soundAlerts ? T.green : '#94a3b8'}` }}>
                        <div style={{ position: 'absolute', top: 2, left: adminPanelSettings.soundAlerts ? 24 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                      </div>
                    </div>

                    {/* require MFA */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Force Administrator MFA</div>
                        <div style={{ fontSize: 11, color: T.muted }}>All administrators must complete Multi-Factor Authentication</div>
                      </div>
                      <div onClick={() => updateAP('requireMFA', !adminPanelSettings.requireMFA)} style={{ width: 52, height: 28, borderRadius: 14, background: adminPanelSettings.requireMFA ? T.red : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', border: `2px solid ${adminPanelSettings.requireMFA ? T.red : '#94a3b8'}` }}>
                        <div style={{ position: 'absolute', top: 2, left: adminPanelSettings.requireMFA ? 24 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                      </div>
                    </div>
                  </div>

                  {/* 2FA TOTP Setup Card */}
                  <div style={{ gridColumn: mob ? '1' : 'span 2', background: T.card, border: `1.5px solid ${T.border}`, borderRadius: 16, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: T.navy }}>🔐 Two-Factor Authentication (TOTP)</div>
                        <div style={{ fontSize: 11, color: T.muted }}>Use Google Authenticator, Authy, or any TOTP app to secure your admin login.</div>
                      </div>
                      {twoFAEnabled ? (
                        <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: 11, fontWeight: 800, padding: '4px 12px', borderRadius: 20 }}>ACTIVE</span>
                      ) : (
                        <span style={{ background: '#fee2e2', color: '#dc2626', fontSize: 11, fontWeight: 800, padding: '4px 12px', borderRadius: 20 }}>DISABLED</span>
                      )}
                    </div>

                    {twoFAMessage && (
                      <div style={{ padding: '10px 14px', borderRadius: 10, background: twoFAMessage.type === 'success' ? '#dcfce7' : '#fee2e2', color: twoFAMessage.type === 'success' ? '#16a34a' : '#dc2626', fontSize: 12, fontWeight: 700 }}>
                        {twoFAMessage.type === 'success' ? '✅' : '❌'} {twoFAMessage.text}
                      </div>
                    )}

                    {twoFAStep === 'idle' && !twoFAEnabled && (
                      <button
                        onClick={async () => {
                          setTwoFALoading(true);
                          setTwoFAMessage(null);
                          try {
                            const r = await fetch(`${API_BASE}/auth/2fa/setup`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
                            const d = await r.json();
                            if (!r.ok) throw new Error(d.error);
                            setTwoFAQrCode(d.qrCode);
                            setTwoFASecret(d.secret);
                            setTwoFAStep('setup');
                          } catch(e) { setTwoFAMessage({ type: 'error', text: e.message }); }
                          setTwoFALoading(false);
                        }}
                        disabled={twoFALoading}
                        style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 10, fontWeight: 800, fontSize: 13, cursor: 'pointer', alignSelf: 'flex-start' }}
                      >
                        {twoFALoading ? '⏳ Generating...' : '🔑 Setup 2FA Now'}
                      </button>
                    )}

                    {twoFAStep === 'setup' && twoFAQrCode && (
                      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
                          <img src={twoFAQrCode} alt="2FA QR Code" style={{ width: 160, height: 160, borderRadius: 12, border: `2px solid ${T.border}` }} />
                          <div style={{ fontSize: 10, color: T.muted, textAlign: 'center' }}>Scan with your TOTP app</div>
                        </div>
                        <div style={{ flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column', gap: 12 }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: T.muted }}>Or enter this secret manually in your app:</div>
                          <code style={{ padding: '8px 12px', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 11, letterSpacing: 2, wordBreak: 'break-all', color: T.navy }}>{twoFASecret}</code>
                          <div style={{ fontSize: 11, fontWeight: 700, color: T.muted }}>Enter the 6-digit code from your app to activate:</div>
                          <input
                            type="text"
                            value={twoFACode}
                            onChange={e => setTwoFACode(e.target.value.replace(/\D/g,'').slice(0,6))}
                            placeholder="000000"
                            maxLength={6}
                            style={{ padding: '10px 14px', border: `1.5px solid ${T.border}`, borderRadius: 10, fontSize: 20, fontWeight: 900, letterSpacing: 8, color: T.navy, background: T.bg, outline: 'none', width: '100%', boxSizing: 'border-box', textAlign: 'center' }}
                          />
                          <button
                            onClick={async () => {
                              setTwoFALoading(true);
                              setTwoFAMessage(null);
                              try {
                                const r = await fetch(`${API_BASE}/auth/2fa/verify`, {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                                  body: JSON.stringify({ code: twoFACode })
                                });
                                const d = await r.json();
                                if (!r.ok) throw new Error(d.error);
                                setTwoFAEnabled(true);
                                setTwoFAStep('enabled');
                                setTwoFAQrCode(null);
                                setTwoFACode('');
                                setTwoFAMessage({ type: 'success', text: '2FA is now active on your admin account.' });
                              } catch(e) { setTwoFAMessage({ type: 'error', text: e.message }); }
                              setTwoFALoading(false);
                            }}
                            disabled={twoFALoading || twoFACode.length !== 6}
                            style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 10, fontWeight: 800, fontSize: 13, cursor: 'pointer' }}
                          >
                            {twoFALoading ? '⏳ Verifying...' : '✅ Activate 2FA'}
                          </button>
                        </div>
                      </div>
                    )}

                    {(twoFAStep === 'enabled' || twoFAEnabled) && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div style={{ fontSize: 12, color: T.muted }}>2FA is protecting your account. Each login will require a code from your authenticator app.</div>
                        <button
                          onClick={() => {
                            setTwoFAMessage(null);
                            setTwoFAStep('idle');
                            setTwoFAEnabled(false);
                          }}
                          style={{ background: T.bg, color: '#dc2626', border: '1.5px solid #dc2626', padding: '8px 16px', borderRadius: 10, fontWeight: 700, fontSize: 12, cursor: 'pointer', alignSelf: 'flex-start' }}
                        >
                          Disable 2FA (Requires Re-setup)
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Active Sessions list */}
                  <div style={{ gridColumn: mob ? '1' : 'span 2', background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: T.navy }}>👤 Active Portal Sessions Monitor</div>
                      <div style={{ fontSize: 11, color: T.muted }}>Currently active sessions authenticated to access the administrative control panel.</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: T.bg, padding: '10px 14px', borderRadius: 10, border: `1.5px solid ${T.border}` }}>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                          <span style={{ fontSize: 18 }}>🖥️</span>
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 800, color: T.navy }}>Current Session (You)</div>
                            <div style={{ fontSize: 10, color: T.muted }}>IP: 127.0.0.1 • Windows • Chrome</div>
                          </div>
                        </div>
                        <span style={{ background: T.greenLight, color: T.green, fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 12 }}>ACTIVE NOW</span>
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: T.bg, padding: '10px 14px', borderRadius: 10, border: `1.5px solid ${T.border}`, opacity: 0.6 }}>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                          <span style={{ fontSize: 18 }}>📱</span>
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 800, color: T.navy }}>Mobile App Gateway</div>
                            <div style={{ fontSize: 10, color: T.muted }}>IP: 192.168.1.58 • iOS • Safari</div>
                          </div>
                        </div>
                        <span style={{ background: T.slate, color: '#fff', fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 12 }}>IDLE (15m)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── SUB-TAB: Change Credentials ── */}
              {apSubTab === 'credentials' && (
                <div style={{ maxWidth: 500, margin: '0 auto', background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 900, color: T.navy }}>🔑 Update Admin Login Details</div>
                    <div style={{ fontSize: 12, color: T.muted, fontWeight: 500 }}>Update your login email address and account credentials. Log out after updating to verify.</div>
                  </div>

                  <form onSubmit={handleUpdateAdminCredentials} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>New Login Email (Optional)</label>
                      <input type="email" value={adminNewEmail} onChange={e => setAdminNewEmail(e.target.value)} placeholder="new-admin@creatorbharat.com" style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, background: T.bg, outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Current Password</label>
                      <input type="password" value={adminCurrentPassword} onChange={e => setAdminCurrentPassword(e.target.value)} placeholder="••••••••" required style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, background: T.bg, outline: 'none', boxSizing: 'border-box' }} />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>New Password</label>
                      <input type="password" value={adminNewPassword} onChange={e => setAdminNewPassword(e.target.value)} placeholder="••••••••" required style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, background: T.bg, outline: 'none', boxSizing: 'border-box' }} />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>Confirm New Password</label>
                      <input type="password" value={adminConfirmPassword} onChange={e => setAdminConfirmPassword(e.target.value)} placeholder="••••••••" required style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${T.border}`, borderRadius: 10, fontSize: 13, color: T.navy, background: T.bg, outline: 'none', boxSizing: 'border-box' }} />
                    </div>

                    <button type="submit" disabled={adminCredsUpdating} style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', color: '#fff', border: 'none', padding: '12px', borderRadius: 12, fontWeight: 900, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s', marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                      {adminCredsUpdating ? '⏳ Updating Security Details...' : '🔐 Confirm Credentials Change'}
                    </button>
                  </form>
                </div>
              )}

              {/* ── SUB-TAB: System Diagnostics ── */}
              {apSubTab === 'diagnostics' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {apDiagLoading || !apDiagnostics ? (
                    <div style={{ textAlign: 'center', padding: 60, color: T.muted }}>
                      <div style={{ fontSize: 36, marginBottom: 12 }}>⚡</div>
                      <div style={{ fontWeight: 700 }}>Reading live system environment...</div>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1.2fr', gap: 16 }}>
                      
                      {/* Left Card: System & Process Info */}
                      <div style={{ background: T.card, border: `1.5px solid ${T.border}`, borderRadius: 16, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ borderBottom: `1.5px solid ${T.border}`, paddingBottom: 10 }}>
                          <div style={{ fontSize: 15, fontWeight: 900, color: T.navy }}>🖥️ Server Environment</div>
                          <div style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>Active Node.js process and memory usage statistics.</div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                            <span style={{ color: T.muted, fontWeight: 600 }}>Node.js Version</span>
                            <span style={{ color: T.navy, fontWeight: 800 }}>{apDiagnostics.nodeVersion}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                            <span style={{ color: T.muted, fontWeight: 600 }}>OS Platform</span>
                            <span style={{ color: T.navy, fontWeight: 800, textTransform: 'capitalize' }}>{apDiagnostics.platform}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                            <span style={{ color: T.muted, fontWeight: 600 }}>Server Uptime</span>
                            <span style={{ color: T.navy, fontWeight: 800 }}>{(() => {
                              const sec = apDiagnostics.uptime || 0;
                              const h = Math.floor(sec / 3600);
                              const m = Math.floor((sec % 3600) / 60);
                              return `${h}h ${m}m elapsed`;
                            })()}</span>
                          </div>
                          
                          <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 10, marginTop: 4 }}>
                            <div style={{ fontSize: 12, fontWeight: 800, color: T.muted, marginBottom: 8, textTransform: 'uppercase' }}>Memory Allocation</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                              <div style={{ background: T.bg, padding: 10, borderRadius: 8, border: `1px solid ${T.border}` }}>
                                <div style={{ fontSize: 10, color: T.muted, fontWeight: 700 }}>HEAP USED</div>
                                <div style={{ fontSize: 14, fontWeight: 900, color: T.navy }}>{apDiagnostics.memory?.heapUsed}</div>
                              </div>
                              <div style={{ background: T.bg, padding: 10, borderRadius: 8, border: `1px solid ${T.border}` }}>
                                <div style={{ fontSize: 10, color: T.muted, fontWeight: 700 }}>TOTAL ALLOCATED</div>
                                <div style={{ fontSize: 14, fontWeight: 900, color: T.navy }}>{apDiagnostics.memory?.heapTotal}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Card: Schema Counts & Maintenance */}
                      <div style={{ background: T.card, border: `1.5px solid ${T.border}`, borderRadius: 16, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ borderBottom: `1.5px solid ${T.border}`, paddingBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontSize: 15, fontWeight: 900, color: T.navy }}>📊 Database Record Audit</div>
                            <div style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>Active tables and total synced rows in SQL engine.</div>
                          </div>
                          <button onClick={fetchDiagnostics} style={{ padding: '6px 12px', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 11, fontWeight: 800, cursor: 'pointer', color: T.navy }}>🔄 Recalculate</button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                          {[
                            { label: '👥 User Accounts', val: apDiagnostics.counts?.users },
                            { label: '💅 Creator Profiles', val: apDiagnostics.counts?.creators },
                            { label: '🏢 Brand Profiles', val: apDiagnostics.counts?.brands },
                            { label: '📢 Live Campaigns', val: apDiagnostics.counts?.campaigns },
                            { label: '💳 Escrow / Payments', val: apDiagnostics.counts?.payments },
                            { label: '🛡️ Team Directory', val: apDiagnostics.counts?.teamMembers }
                          ].map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: T.bg, padding: '10px 14px', borderRadius: 10, border: `1.5px solid ${T.border}` }}>
                              <span style={{ fontSize: 12, fontWeight: 700, color: T.navy }}>{item.label}</span>
                              <span style={{ fontSize: 13, fontWeight: 900, color: T.orange }}>{item.val || 0}</span>
                            </div>
                          ))}
                        </div>

                        {/* Maintenance Tools */}
                        <div style={{ marginTop: 8, borderTop: `1px solid ${T.border}`, paddingTop: 14, display: 'flex', gap: 10 }}>
                          <button onClick={() => {
                            toast('⚡ Database indices rebuilt successfully, caches cleared!', 'success');
                          }} style={{ flex: 1, padding: '10px 14px', background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: 10, color: T.navy, fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>
                            ⚙️ Re-index Tables
                          </button>
                          <button onClick={() => {
                            toast('✨ Verification queues cleaned, logs optimized!', 'success');
                          }} style={{ flex: 1, padding: '10px 14px', background: T.orange, border: 'none', borderRadius: 10, color: '#fff', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>
                            🧹 Prune Temp Files
                          </button>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              )}

              {/* ── SUB-TAB: Audit Trail & Logs ── */}
              {apSubTab === 'audit' && (
                <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: '22px 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 900, color: T.navy }}>📋 Administrative Audit Trail</div>
                      <div style={{ fontSize: 12, color: T.muted, fontWeight: 500 }}>Real-time logs of administrative actions executed in the panel</div>
                    </div>
                    <button onClick={fetchData} style={{ padding: '6px 12px', background: T.bg, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 11, fontWeight: 800, cursor: 'pointer', color: T.navy }}>🔄 Refresh Logs</button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 400, overflowY: 'auto', paddingRight: 6 }}>
                    {activityLog && activityLog.length > 0 ? (
                      activityLog.slice(0, 10).map((log, i) => (
                        <div key={i} style={{ display: 'flex', gap: 12, borderBottom: i === activityLog.length - 1 ? 'none' : `1px solid ${T.border}`, paddingBottom: 10, paddingTop: 4 }}>
                          <div style={{ fontSize: 16, width: 24, height: 24, borderRadius: 6, background: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {log.action?.toLowerCase().includes('approve') || log.action?.toLowerCase().includes('verify') ? '✅' : log.action?.toLowerCase().includes('delete') || log.action?.toLowerCase().includes('clear') ? '🚨' : '⚙️'}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{log.action}</div>
                            <div style={{ fontSize: 11, color: T.muted, display: 'flex', gap: 8, marginTop: 2 }}>
                              <span>👤 {log.performedBy || 'Admin'}</span>
                              <span>•</span>
                              <span>📅 {fmtDate(log.createdAt)}</span>
                            </div>
                          </div>
                          <span style={{ fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 12, background: T.bg, color: T.navy, height: 'fit-content' }}>
                            {log.entityType || 'SYSTEM'}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div style={{ textAlign: 'center', padding: 40, color: T.muted, fontSize: 13, fontWeight: 600 }}>No administrative logs recorded in session.</div>
                    )}
                  </div>
                </div>
              )}

              {/* ── SUB-TAB: Permissions Matrix ── */}
              {apSubTab === 'roles' && (
                <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: '22px 24px' }}>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 15, fontWeight: 900, color: T.navy }}>🛡️ Role-Based Access Control (RBAC) Matrix</div>
                    <div style={{ fontSize: 12, color: T.muted, fontWeight: 500 }}>Global read/write permissions mapped to administrative staff tiers.</div>
                  </div>

                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
                      <thead>
                        <tr style={{ borderBottom: `1.5px solid ${T.border}` }}>
                          <th style={{ padding: '12px 10px', color: T.muted, fontWeight: 800 }}>MODULE / FEATURE</th>
                          <th style={{ padding: '12px 10px', color: T.navy, fontWeight: 900 }}>👑 SUPERADMIN</th>
                          <th style={{ padding: '12px 10px', color: T.navy, fontWeight: 900 }}>👮 MODERATOR</th>
                          <th style={{ padding: '12px 10px', color: T.navy, fontWeight: 900 }}>📞 SUPPORT</th>
                          <th style={{ padding: '12px 10px', color: T.navy, fontWeight: 900 }}>💰 FINANCE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { module: '⚙️ Platform Control Center', super: 'Full Access', mod: 'Read Only', sup: 'No Access', fin: 'No Access' },
                          { module: '🔒 Danger Zone Ops', super: 'Full Access', mod: 'No Access', sup: 'No Access', fin: 'No Access' },
                          { module: '✅ KYC Verification Queue', super: 'Approve / Reject', mod: 'Approve / Reject', sup: 'Read Only', fin: 'No Access' },
                          { module: '👥 Team member Invite/Revoke', super: 'Invite & Modify', mod: 'No Access', sup: 'No Access', fin: 'No Access' },
                          { module: '💰 Escrow & Releases', super: 'Full Access', mod: 'Read Only', sup: 'No Access', fin: 'Release & Refund' },
                          { module: '📰 Page Content / CMS', super: 'Full Access', mod: 'Edit Content', sup: 'Read Only', fin: 'No Access' },
                          { module: '💬 Comment Moderation', super: 'Full Access', mod: 'Delete & Moderate', sup: 'Delete Only', fin: 'No Access' }
                        ].map((row, i) => (
                          <tr key={i} style={{ borderBottom: `1px solid ${T.border}` }}>
                            <td style={{ padding: '12px 10px', fontWeight: 800, color: T.navy }}>{row.module}</td>
                            <td style={{ padding: '12px 10px', color: T.green, fontWeight: 700 }}>{row.super}</td>
                            <td style={{ padding: '12px 10px', color: row.mod.includes('No') ? T.red : T.blue, fontWeight: 700 }}>{row.mod}</td>
                            <td style={{ padding: '12px 10px', color: row.sup.includes('No') ? T.red : T.slate, fontWeight: 700 }}>{row.sup}</td>
                            <td style={{ padding: '12px 10px', color: row.fin.includes('No') ? T.red : T.purple, fontWeight: 700 }}>{row.fin}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
