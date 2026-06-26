const fs = require('fs');
const APP_PATH = 'd:/creatorbharat-1/creatorbharat-admin/src/App.jsx';
let content = fs.readFileSync(APP_PATH, 'utf8');

const OLD = `      {/* CSS for spin animation */}`;

const FEATURE_CONTROL_PANEL = `      {/* ══ PLATFORM CONTROL CENTER ══════════════════════════════════════ */}
          {activeTab === 'feature-control' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Header + Save Button */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: T.card, border: \`1px solid \${T.border}\`, borderRadius: 20, padding: '20px 24px' }}>
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
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', borderBottom: \`1.5px solid \${T.border}\`, paddingBottom: 12 }}>
                    {[
                      { id: 'features', label: '🔀 Feature Flags' },
                      { id: 'comingSoon', label: '🚧 Coming Soon' },
                      { id: 'commission', label: '💰 Commission & Pricing' },
                      { id: 'creatorLimits', label: '🎛️ Creator Controls' },
                      { id: 'brandLimits', label: '🏢 Brand Controls' },
                      { id: 'announcement', label: '📢 Announcements' }
                    ].map(st => (
                      <button key={st.id} onClick={() => setPsSubTab(st.id)} type="button" style={{ padding: '8px 16px', borderRadius: 10, border: 'none', background: psSubTab === st.id ? T.orange : T.bg, color: psSubTab === st.id ? '#fff' : T.navy, fontWeight: 800, cursor: 'pointer', fontSize: 13, border: \`1.5px solid \${psSubTab === st.id ? T.orange : T.border}\`, transition: 'all 0.15s' }}>
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
                          <div key={f.key} style={{ background: T.card, border: \`1.5px solid \${isOn ? T.green + '40' : T.red + '30'}\`, borderRadius: 16, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, transition: 'all 0.2s' }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, marginBottom: 3 }}>{f.label}</div>
                              <div style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>{f.desc}</div>
                            </div>
                            {/* iOS-style toggle */}
                            <div onClick={() => updatePS('features', f.key, !isOn)} style={{ width: 52, height: 28, borderRadius: 14, background: isOn ? T.green : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', flexShrink: 0, border: \`2px solid \${isOn ? T.green : '#94a3b8'}\` }}>
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
                            <div key={f.key} style={{ background: T.card, border: \`1.5px solid \${isCS ? '#fcd34d' : T.border}\`, borderRadius: 16, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, transition: 'all 0.2s' }}>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, marginBottom: 3 }}>{f.label}</div>
                                <div style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>{f.desc}</div>
                              </div>
                              <div onClick={() => updatePS('comingSoon', f.key, !isCS)} style={{ width: 52, height: 28, borderRadius: 14, background: isCS ? '#f59e0b' : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', flexShrink: 0, border: \`2px solid \${isCS ? '#f59e0b' : '#94a3b8'}\` }}>
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
                          <div key={f.key} style={{ background: T.card, border: \`1.5px solid \${T.border}\`, borderRadius: 16, padding: '18px 20px' }}>
                            <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, marginBottom: 2 }}>{f.label}</div>
                            <div style={{ fontSize: 11, color: T.muted, fontWeight: 600, marginBottom: 12 }}>{f.desc}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              <input type="range" min={f.min} max={f.max} step={f.step} value={platformSettings.commission[f.key]} onChange={e => updatePS('commission', f.key, parseFloat(e.target.value))} style={{ flex: 1, accentColor: T.orange }} />
                              <input type="number" min={f.min} max={f.max} step={f.step} value={platformSettings.commission[f.key]} onChange={e => updatePS('commission', f.key, parseFloat(e.target.value) || 0)} style={{ width: 80, padding: '6px 10px', border: \`1.5px solid \${T.border}\`, borderRadius: 8, fontSize: 14, fontWeight: 800, color: T.navy, textAlign: 'center', background: T.bg }} />
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
                          <div key={f.key} style={{ background: T.card, border: \`1.5px solid \${T.border}\`, borderRadius: 16, padding: '18px 20px' }}>
                            <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, marginBottom: 2 }}>{f.label}</div>
                            <div style={{ fontSize: 11, color: T.muted, fontWeight: 600, marginBottom: 12 }}>{f.desc}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              <input type="range" min={f.min} max={f.max} step={f.step} value={platformSettings.creator[f.key]} onChange={e => updatePS('creator', f.key, parseInt(e.target.value))} style={{ flex: 1, accentColor: T.green }} />
                              <input type="number" min={f.min} max={f.max} step={f.step} value={platformSettings.creator[f.key]} onChange={e => updatePS('creator', f.key, parseInt(e.target.value) || f.min)} style={{ width: 80, padding: '6px 10px', border: \`1.5px solid \${T.border}\`, borderRadius: 8, fontSize: 14, fontWeight: 800, color: T.navy, textAlign: 'center', background: T.bg }} />
                            </div>
                          </div>
                        ))}
                        {/* Toggle for allowGuestProfiles */}
                        <div style={{ background: T.card, border: \`1.5px solid \${platformSettings.creator.allowGuestProfiles ? T.green + '40' : T.red + '30'}\`, borderRadius: 16, padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, marginBottom: 2 }}>👁️ Guest Profile Viewing</div>
                            <div style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>Non-logged-in users creator profiles dekh sakte hain</div>
                          </div>
                          <div onClick={() => updatePS('creator', 'allowGuestProfiles', !platformSettings.creator.allowGuestProfiles)} style={{ width: 52, height: 28, borderRadius: 14, background: platformSettings.creator.allowGuestProfiles ? T.green : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', border: \`2px solid \${platformSettings.creator.allowGuestProfiles ? T.green : '#94a3b8'}\` }}>
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
                          <div key={f.key} style={{ background: T.card, border: \`1.5px solid \${T.border}\`, borderRadius: 16, padding: '18px 20px' }}>
                            <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, marginBottom: 2 }}>{f.label}</div>
                            <div style={{ fontSize: 11, color: T.muted, fontWeight: 600, marginBottom: 12 }}>{f.desc}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              <input type="range" min={f.min} max={f.max} step={f.step} value={platformSettings.brand[f.key]} onChange={e => updatePS('brand', f.key, parseInt(e.target.value))} style={{ flex: 1, accentColor: T.blue }} />
                              <input type="number" min={f.min} max={f.max} step={f.step} value={platformSettings.brand[f.key]} onChange={e => updatePS('brand', f.key, parseInt(e.target.value) || f.min)} style={{ width: 80, padding: '6px 10px', border: \`1.5px solid \${T.border}\`, borderRadius: 8, fontSize: 14, fontWeight: 800, color: T.navy, textAlign: 'center', background: T.bg }} />
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
                          <div key={f.key} style={{ background: T.card, border: \`1.5px solid \${platformSettings.brand[f.key] ? f.color + '40' : T.border}\`, borderRadius: 16, padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                            <div>
                              <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, marginBottom: 2 }}>{f.label}</div>
                              <div style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>{f.desc}</div>
                            </div>
                            <div onClick={() => updatePS('brand', f.key, !platformSettings.brand[f.key])} style={{ width: 52, height: 28, borderRadius: 14, background: platformSettings.brand[f.key] ? f.color : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', flexShrink: 0, border: \`2px solid \${platformSettings.brand[f.key] ? f.color : '#94a3b8'}\` }}>
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
                      <div style={{ background: T.card, border: \`1.5px solid \${T.border}\`, borderRadius: 16, padding: 24 }}>
                        <div style={{ fontSize: 15, fontWeight: 900, color: T.navy, marginBottom: 16, borderBottom: \`1px solid \${T.border}\`, paddingBottom: 10 }}>📢 Global Site Banner</div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 800, color: T.navy }}>Enable Banner</div>
                            <div style={{ fontSize: 11, color: T.muted }}>Sab pages ke upar ek banner dikhao</div>
                          </div>
                          <div onClick={() => updatePS('announcement', 'globalBannerEnabled', !platformSettings.announcement.globalBannerEnabled)} style={{ width: 52, height: 28, borderRadius: 14, background: platformSettings.announcement.globalBannerEnabled ? T.orange : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', border: \`2px solid \${platformSettings.announcement.globalBannerEnabled ? T.orange : '#94a3b8'}\` }}>
                            <div style={{ position: 'absolute', top: 2, left: platformSettings.announcement.globalBannerEnabled ? 24 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                          </div>
                        </div>
                        <div style={{ marginBottom: 12 }}>
                          <label style={{ fontSize: 11, fontWeight: 800, color: T.muted, display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>Banner Message</label>
                          <input type="text" value={platformSettings.announcement.globalBannerText} onChange={e => updatePS('announcement', 'globalBannerText', e.target.value)} placeholder="e.g. 🚀 New features launched! Check out our updated dashboard." style={{ width: '100%', padding: '10px 14px', border: \`1.5px solid \${T.border}\`, borderRadius: 10, fontSize: 13, color: T.navy, boxSizing: 'border-box', background: T.bg }} />
                        </div>
                        <div>
                          <label style={{ fontSize: 11, fontWeight: 800, color: T.muted, display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>Banner Type</label>
                          <div style={{ display: 'flex', gap: 8 }}>
                            {[{ v: 'info', l: 'ℹ️ Info', c: '#3b82f6' }, { v: 'success', l: '✅ Success', c: '#10b981' }, { v: 'warning', l: '⚠️ Warning', c: '#f59e0b' }, { v: 'danger', l: '🚨 Danger', c: '#ef4444' }].map(t => (
                              <button key={t.v} type="button" onClick={() => updatePS('announcement', 'globalBannerType', t.v)} style={{ padding: '8px 14px', borderRadius: 8, border: \`2px solid \${platformSettings.announcement.globalBannerType === t.v ? t.c : T.border}\`, background: platformSettings.announcement.globalBannerType === t.v ? t.c + '15' : 'transparent', color: platformSettings.announcement.globalBannerType === t.v ? t.c : T.muted, fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>{t.l}</button>
                            ))}
                          </div>
                        </div>
                        {/* Preview */}
                        {platformSettings.announcement.globalBannerText && (
                          <div style={{ marginTop: 16, padding: '10px 16px', borderRadius: 10, background: platformSettings.announcement.globalBannerType === 'info' ? '#eff6ff' : platformSettings.announcement.globalBannerType === 'success' ? '#f0fdf4' : platformSettings.announcement.globalBannerType === 'warning' ? '#fffbeb' : '#fef2f2', border: \`1.5px solid \${platformSettings.announcement.globalBannerType === 'info' ? '#93c5fd' : platformSettings.announcement.globalBannerType === 'success' ? '#86efac' : platformSettings.announcement.globalBannerType === 'warning' ? '#fcd34d' : '#fca5a5'}\`, fontSize: 13, fontWeight: 700, color: platformSettings.announcement.globalBannerType === 'info' ? '#1d4ed8' : platformSettings.announcement.globalBannerType === 'success' ? '#15803d' : platformSettings.announcement.globalBannerType === 'warning' ? '#92400e' : '#991b1b' }}>
                            <span style={{ marginRight: 8 }}>👁️ Preview:</span>{platformSettings.announcement.globalBannerText}
                          </div>
                        )}
                      </div>

                      {/* Maintenance Mode */}
                      <div style={{ background: T.card, border: \`1.5px solid \${platformSettings.announcement.maintenanceMode ? T.red + '50' : T.border}\`, borderRadius: 16, padding: 24 }}>
                        <div style={{ fontSize: 15, fontWeight: 900, color: T.navy, marginBottom: 16, borderBottom: \`1px solid \${T.border}\`, paddingBottom: 10 }}>🔧 Maintenance Mode</div>
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
                          <div onClick={() => updatePS('announcement', 'maintenanceMode', !platformSettings.announcement.maintenanceMode)} style={{ width: 52, height: 28, borderRadius: 14, background: platformSettings.announcement.maintenanceMode ? T.red : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', border: \`2px solid \${platformSettings.announcement.maintenanceMode ? T.red : '#94a3b8'}\` }}>
                            <div style={{ position: 'absolute', top: 2, left: platformSettings.announcement.maintenanceMode ? 24 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }} />
                          </div>
                        </div>
                        <label style={{ fontSize: 11, fontWeight: 800, color: T.muted, display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>Maintenance Message</label>
                        <input type="text" value={platformSettings.announcement.maintenanceMessage} onChange={e => updatePS('announcement', 'maintenanceMessage', e.target.value)} placeholder="Platform is under scheduled maintenance. Back in 2 hours." style={{ width: '100%', padding: '10px 14px', border: \`1.5px solid \${T.border}\`, borderRadius: 10, fontSize: 13, color: T.navy, boxSizing: 'border-box', background: T.bg }} />
                      </div>

                      {/* News Ticker */}
                      <div style={{ background: T.card, border: \`1.5px solid \${T.border}\`, borderRadius: 16, padding: 24 }}>
                        <div style={{ fontSize: 15, fontWeight: 900, color: T.navy, marginBottom: 16, borderBottom: \`1px solid \${T.border}\`, paddingBottom: 10 }}>📰 News Ticker</div>
                        <label style={{ fontSize: 11, fontWeight: 800, color: T.muted, display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>Ticker Text (scrolls across top of site — empty = no ticker)</label>
                        <input type="text" value={platformSettings.announcement.newsTicker} onChange={e => updatePS('announcement', 'newsTicker', e.target.value)} placeholder="e.g. 🎉 New creators joined this week! Leaderboard updated — check your rank now." style={{ width: '100%', padding: '10px 14px', border: \`1.5px solid \${T.border}\`, borderRadius: 10, fontSize: 13, color: T.navy, boxSizing: 'border-box', background: T.bg }} />
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

      {/* CSS for spin animation */}`;

if (content.includes(OLD)) {
  content = content.replace(OLD, FEATURE_CONTROL_PANEL);
  fs.writeFileSync(APP_PATH, content, 'utf8');
  console.log('SUCCESS! Feature Control Center panel added. Line count:', content.split('\n').length);
} else {
  console.log('ERROR: Target not found!');
}
