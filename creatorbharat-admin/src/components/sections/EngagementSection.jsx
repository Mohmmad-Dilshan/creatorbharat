import React from 'react';
import { Trash2, RefreshCw, Bell, Mail } from 'lucide-react';
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

export default function EngagementSection({
  activeTab,
  counts,
  fetchData,
  toast,
  token,
  API_BASE,

  // Activity Log
  activityLog,

  // Podcasts
  podcasts,
  clearPodcastForm,
  setEditingPodcast,
  setPodcastModalOpen,
  openEditPodcast,
  handleTogglePodcast,
  handleDeletePodcast,

  // Events
  events,
  setEditingEvent,
  setEvtTitle,
  setEvtDescription,
  setEvtDate,
  setEvtLocation,
  setEvtLink,
  setEvtImage,
  setEventModalOpen,

  // Ambassadors
  ambassadors,

  // Missions
  missions,
  setEditingMission,
  setMisTitle,
  setMisDescription,
  setMisReward,
  setMisRewardColor,
  setMisDeadline,
  setMisSteps,
  setMisActive,
  setMissionModalOpen,
  missionCompletions,

  // Notifications
  notifTargetGroup,
  setNotifTargetGroup,
  setNotifUserId,
  notifUserId,
  creators,
  brands,
  notifType,
  setNotifType,
  notifTitle,
  setNotifTitle,
  notifBody,
  setNotifBody,
  notifLink,
  setNotifLink,
  handleSendPlatformNotification,

  // Comments
  comments,
  commentSearch,
  setCommentSearch,
  filteredComments,
  handleDeleteComment,

  // Newsletters
  newsletters,
  newsletterSearch,
  setNewsletterSearch,
  filteredNewsletters,
  handleDeleteSubscriber,

  // Contacts
  contacts,
  contactSearch,
  setContactSearch,
  filteredContacts,
  handleToggleContactRead,
  handleDeleteContact
}) {
  const H = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  });

  return (
    <>
      {/* ══ ACTIVITY LOG ═══════════════════════════════════════════════ */}
      {activeTab === 'activity' && (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
          <SectionHeader
            title="Platform Activity Log"
            sub={`${activityLog.length} recent events across the platform`}
            action={
              <ActionBtn onClick={fetchData}>
                <RefreshCw size={13} /> Refresh
              </ActionBtn>
            }
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {activityLog.map((a, i) => {
              const typeColor =
                { NEW_USER: T.blue, VERIFIED: T.green, PAYMENT: T.orange, CAMPAIGN: T.purple, BLOG: T.teal }[a.type] ||
                T.slate;
              const typeLabel =
                { NEW_USER: 'USER', VERIFIED: 'KYC', PAYMENT: 'PAY', CAMPAIGN: 'CAMP', BLOG: 'BLOG' }[a.type] || a.type;
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 14,
                    alignItems: 'center',
                    padding: '12px 16px',
                    background: T.bg,
                    borderRadius: 12,
                    border: `1px solid ${T.border}`
                  }}
                >
                  <Badge color={typeColor}>{typeLabel}</Badge>
                  <span style={{ fontSize: 13, color: T.slate, fontWeight: 600, flex: 1 }}>{a.label}</span>
                  <span style={{ fontSize: 11, color: T.muted, fontWeight: 500, whiteSpace: 'nowrap' }}>
                    {fmtDate(a.time)}
                  </span>
                </div>
              );
            })}
            {activityLog.length === 0 && <EmptyState icon="📋" msg="No activity to show yet" />}
          </div>
        </div>
      )}

      {/* ══ PODCASTS ═══════════════════════════════════════════════════ */}
      {activeTab === 'podcasts' && (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
          <SectionHeader
            title="Podcast Manager"
            badge={podcasts.length}
            sub="Publish, edit or create podcast episodes for verified creators"
            action={
              <button
                onClick={() => {
                  clearPodcastForm();
                  setEditingPodcast(null);
                  setPodcastModalOpen(true);
                }}
                style={{
                  padding: '8px 18px',
                  background: T.orange,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                + New Episode
              </button>
            }
          />
          {podcasts.length === 0 ? (
            <EmptyState icon="🎙️" msg="No podcasts available" />
          ) : (
            <Table cols={['Thumbnail', 'Episode', 'Creator', 'Duration', 'Status', 'Date', { label: 'Actions', align: 'right' }]}>
              {podcasts.map((pod) => (
                <tr key={pod.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                  <Td>
                    <img
                      src={pod.thumbnail || 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=100'}
                      alt={pod.title}
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: 8,
                        objectFit: 'cover',
                        border: `1px solid ${T.border}`
                      }}
                    />
                  </Td>
                  <Td bold>
                    <span
                      style={{
                        maxWidth: 220,
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {pod.title}
                    </span>
                  </Td>
                  <Td>{pod.creator?.name || '—'}</Td>
                  <Td muted>{pod.duration}</Td>
                  <Td>
                    <Badge color={pod.published ? T.green : T.muted}>{pod.published ? 'Published' : 'Draft'}</Badge>
                  </Td>
                  <Td muted>{fmtDate(pod.createdAt)}</Td>
                  <Td right>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      <ActionBtn small onClick={() => openEditPodcast(pod)}>
                        ✎ Edit
                      </ActionBtn>
                      <ActionBtn small onClick={() => handleTogglePodcast(pod.id)}>
                        {pod.published ? '⏸ Unpublish' : '▶ Publish'}
                      </ActionBtn>
                      <DangerBtn small onClick={() => handleDeletePodcast(pod.id)}>
                        <Trash2 size={11} />
                      </DangerBtn>
                    </div>
                  </Td>
                </tr>
              ))}
            </Table>
          )}
        </div>
      )}

      {/* ══ EVENTS MANAGER ════════════════════════════════════════════ */}
      {activeTab === 'events' && (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
          <SectionHeader
            title="Events Manager"
            badge={events.length}
            sub="Create and manage public platform conferences, summits, and creator meetups"
            action={
              <button
                onClick={() => {
                  setEditingEvent(null);
                  setEvtTitle('');
                  setEvtDescription('');
                  setEvtDate('');
                  setEvtLocation('');
                  setEvtLink('');
                  setEvtImage('');
                  setEventModalOpen(true);
                }}
                style={{
                  padding: '8px 18px',
                  background: T.orange,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                + New Event
              </button>
            }
          />
          {events.length === 0 ? (
            <EmptyState icon="📅" msg="No events created yet" />
          ) : (
            <Table cols={['Banner', 'Event Title', 'Date', 'Location', 'Link', { label: 'Actions', align: 'right' }]}>
              {events.map((evt) => (
                <tr key={evt.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                  <Td>
                    <img
                      src={evt.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100'}
                      alt={evt.title}
                      style={{
                        width: 60,
                        height: 40,
                        borderRadius: 6,
                        objectFit: 'cover',
                        border: `1px solid ${T.border}`
                      }}
                    />
                  </Td>
                  <Td bold>
                    <div>{evt.title}</div>
                    <div style={{ fontSize: 11, color: T.muted, fontWeight: 550 }}>
                      {evt.description?.substring(0, 50)}...
                    </div>
                  </Td>
                  <Td bold>{evt.date}</Td>
                  <Td>{evt.location}</Td>
                  <Td>
                    {evt.link ? (
                      <a href={evt.link} target="_blank" rel="noopener noreferrer" style={{ color: T.orange, fontWeight: 700 }}>
                        Link ↗
                      </a>
                    ) : (
                      '—'
                    )}
                  </Td>
                  <Td right>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      <ActionBtn
                        small
                        onClick={() => {
                          setEditingEvent(evt);
                          setEvtTitle(evt.title || '');
                          setEvtDescription(evt.description || '');
                          setEvtDate(evt.date || '');
                          setEvtLocation(evt.location || '');
                          setEvtLink(evt.link || '');
                          setEvtImage(evt.image || '');
                          setEventModalOpen(true);
                        }}
                      >
                        ✎ Edit
                      </ActionBtn>
                      <DangerBtn
                        small
                        onClick={async () => {
                          if (!window.confirm('Delete this event permanently?')) return;
                          try {
                            const res = await fetch(`${API_BASE}/events/${evt.id}`, { method: 'DELETE', headers: H() });
                            if (res.ok) {
                              toast('Event deleted', 'success');
                              fetchData();
                            } else {
                              const d = await res.json();
                              throw new Error(d.error || 'Failed');
                            }
                          } catch (err) {
                            toast(err.message, 'error');
                          }
                        }}
                      >
                        <Trash2 size={11} />
                      </DangerBtn>
                    </div>
                  </Td>
                </tr>
              ))}
            </Table>
          )}
        </div>
      )}

      {/* ══ CAMPUS AMBASSADOR APPLICATIONS ════════════════════════════ */}
      {activeTab === 'ambassadors' && (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
          <SectionHeader
            title="Campus Ambassador Applications"
            badge={ambassadors.length}
            sub="Review submitted student profiles applying to represent CreatorBharat on campuses"
          />
          {ambassadors.length === 0 ? (
            <EmptyState icon="🎓" msg="No ambassador applications yet" />
          ) : (
            <Table
              cols={[
                'Name / Contact',
                'College / City',
                'Socials',
                'Pitch Brief',
                'Applied Date',
                'Status',
                { label: 'Actions', align: 'right' }
              ]}
            >
              {ambassadors.map((app) => (
                <tr key={app.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                  <Td bold>
                    <div>{app.name}</div>
                    <div style={{ fontSize: 11, color: T.muted, fontWeight: 550 }}>
                      {app.email} · {app.phone}
                    </div>
                  </Td>
                  <Td>
                    <div style={{ fontWeight: 700 }}>{app.college}</div>
                    <div style={{ fontSize: 11, color: T.muted }}>{app.city}</div>
                  </Td>
                  <Td>
                    <div style={{ fontSize: 12 }}>
                      {app.instagram && (
                        <div style={{ fontWeight: 600 }}>
                          Insta: <span style={{ color: T.orange }}>@{app.instagram}</span>
                        </div>
                      )}
                      {app.youtube && (
                        <div style={{ fontWeight: 600 }}>
                          YT: <span style={{ color: T.blue }}>{app.youtube}</span>
                        </div>
                      )}
                    </div>
                  </Td>
                  <Td>
                    <span
                      style={{
                        maxWidth: 180,
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                      title={app.pitch}
                    >
                      {app.pitch}
                    </span>
                  </Td>
                  <Td muted>{fmtDate(app.createdAt)}</Td>
                  <Td>
                    <Badge color={app.status === 'APPROVED' ? T.green : app.status === 'REJECTED' ? T.red : T.yellow}>
                      {app.status}
                    </Badge>
                  </Td>
                  <Td right>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      {app.status === 'PENDING' && (
                        <>
                          <button
                            onClick={async () => {
                              try {
                                const res = await fetch(`${API_BASE}/admin/ambassadors/${app.id}/status`, {
                                  method: 'POST',
                                  headers: H(),
                                  body: JSON.stringify({ status: 'APPROVED' })
                                });
                                if (res.ok) {
                                  toast('Ambassador application approved!', 'success');
                                  fetchData();
                                }
                              } catch (err) {
                                toast(err.message, 'error');
                              }
                            }}
                            style={{
                              padding: '4px 10px',
                              background: T.greenLight,
                              border: `1px solid ${T.green}20`,
                              color: T.green,
                              borderRadius: 6,
                              fontSize: 11,
                              fontWeight: 800,
                              cursor: 'pointer'
                            }}
                          >
                            ✓ Approve
                          </button>
                          <button
                            onClick={async () => {
                              try {
                                const res = await fetch(`${API_BASE}/admin/ambassadors/${app.id}/status`, {
                                  method: 'POST',
                                  headers: H(),
                                  body: JSON.stringify({ status: 'REJECTED' })
                                });
                                if (res.ok) {
                                  toast('Ambassador application rejected', 'info');
                                  fetchData();
                                }
                              } catch (err) {
                                toast(err.message, 'error');
                              }
                            }}
                            style={{
                              padding: '4px 10px',
                              background: T.redLight,
                              border: `1px solid ${T.red}20`,
                              color: T.red,
                              borderRadius: 6,
                              fontSize: 11,
                              fontWeight: 800,
                              cursor: 'pointer'
                            }}
                          >
                            ✕ Reject
                          </button>
                        </>
                      )}
                      <DangerBtn
                        small
                        onClick={async () => {
                          if (!window.confirm('Delete this application permanently?')) return;
                          try {
                            const res = await fetch(`${API_BASE}/admin/ambassadors/${app.id}`, {
                              method: 'DELETE',
                              headers: H()
                            });
                            if (res.ok) {
                              toast('Application deleted', 'success');
                              fetchData();
                            }
                          } catch (err) {
                            toast(err.message, 'error');
                          }
                        }}
                      >
                        <Trash2 size={11} />
                      </DangerBtn>
                    </div>
                  </Td>
                </tr>
              ))}
            </Table>
          )}
        </div>
      )}

      {/* ══ MONTHLY MISSIONS & COMPLETIONS ════════════════════════════ */}
      {activeTab === 'missions' && (
        <div
          style={{
            background: T.card,
            border: `1px solid ${T.border}`,
            borderRadius: 20,
            padding: 28,
            display: 'flex',
            flexDirection: 'column',
            gap: 32
          }}
        >
          {/* Part A: Missions list */}
          <div>
            <SectionHeader
              title="Monthly Platform Missions"
              badge={missions.length}
              sub="Create and manage monthly platform-wide creator tasks and rewards"
              action={
                <button
                  onClick={() => {
                    setEditingMission(null);
                    setMisTitle('');
                    setMisDescription('');
                    setMisReward('');
                    setMisRewardColor('#FF9431');
                    setMisDeadline('');
                    setMisSteps('');
                    setMisActive(true);
                    setMissionModalOpen(true);
                  }}
                  style={{
                    padding: '8px 18px',
                    background: T.orange,
                    color: '#fff',
                    border: 'none',
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  + Create Mission
                </button>
              }
            />
            {missions.length === 0 ? (
              <EmptyState icon="🎯" msg="No monthly missions defined yet" />
            ) : (
              <Table cols={['Mission Detail', 'Reward', 'Deadline', 'Status', { label: 'Actions', align: 'right' }]}>
                {missions.map((mis) => (
                  <tr key={mis.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <Td bold>
                      <div>{mis.title}</div>
                      <div style={{ fontSize: 11, color: T.muted, fontWeight: 550 }}>{mis.description}</div>
                    </Td>
                    <Td>
                      <Badge color={mis.rewardColor || T.orange}>{mis.reward}</Badge>
                    </Td>
                    <Td muted>{fmtDate(mis.deadline)}</Td>
                    <Td>
                      <Badge color={mis.active ? T.green : T.muted}>{mis.active ? 'Active' : 'Draft'}</Badge>
                    </Td>
                    <Td right>
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                        <ActionBtn
                          small
                          onClick={() => {
                            setEditingMission(mis);
                            setMisTitle(mis.title || '');
                            setMisDescription(mis.description || '');
                            setMisReward(mis.reward || '');
                            setMisRewardColor(mis.rewardColor || '#FF9431');
                            setMisDeadline(mis.deadline ? new Date(mis.deadline).toISOString().split('T')[0] : '');
                            setMisSteps(Array.isArray(mis.steps) ? mis.steps.join('\n') : '');
                            setMisActive(mis.active ?? true);
                            setMissionModalOpen(true);
                          }}
                        >
                          ✎ Edit
                        </ActionBtn>
                        <DangerBtn
                          small
                          onClick={async () => {
                            if (!window.confirm('Delete this mission?')) return;
                            try {
                              const res = await fetch(`${API_BASE}/admin/missions/${mis.id}`, {
                                method: 'DELETE',
                                headers: H()
                              });
                              if (res.ok) {
                                toast('Mission deleted', 'success');
                                fetchData();
                              }
                            } catch (err) {
                              toast(err.message, 'error');
                            }
                          }}
                        >
                          <Trash2 size={11} />
                        </DangerBtn>
                      </div>
                    </Td>
                  </tr>
                ))}
              </Table>
            )}
          </div>

          {/* Part B: Completions Proof Submissions Queue */}
          <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 28 }}>
            <SectionHeader
              title="Proof Submission Queue"
              badge={missionCompletions.length}
              sub="Verify submitted proof URLs from creators claiming mission completion rewards"
            />
            {missionCompletions.length === 0 ? (
              <EmptyState icon="⏳" msg="No completion proofs submitted yet" />
            ) : (
              <Table cols={['Creator', 'Mission', 'Submitted Proof Link', 'Status', { label: 'Review Actions', align: 'right' }]}>
                {missionCompletions.map((comp) => (
                  <tr key={comp.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <Td bold>
                      <div>{comp.creator?.name || '—'}</div>
                      <div style={{ fontSize: 11, color: T.muted, fontWeight: 550 }}>@{comp.creator?.handle}</div>
                    </Td>
                    <Td>
                      <div style={{ fontWeight: 700 }}>{comp.mission?.title}</div>
                      <div style={{ fontSize: 11, color: T.muted }}>Reward: {comp.mission?.reward}</div>
                    </Td>
                    <Td>
                      {comp.proofUrl ? (
                        <a
                          href={comp.proofUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: T.orange, fontWeight: 800, textDecoration: 'underline' }}
                        >
                          View Proof Link ↗
                        </a>
                      ) : (
                        'No Link Provided'
                      )}
                    </Td>
                    <Td>
                      <Badge
                        color={
                          comp.status === 'APPROVED' ? T.green : comp.status === 'REJECTED' ? T.red : T.yellow
                        }
                      >
                        {comp.status}
                      </Badge>
                    </Td>
                    <Td right>
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                        {comp.status === 'PENDING' && (
                          <>
                            <button
                              onClick={async () => {
                                try {
                                  const res = await fetch(`${API_BASE}/admin/missions/completions/${comp.id}/status`, {
                                    method: 'POST',
                                    headers: H(),
                                    body: JSON.stringify({ status: 'APPROVED' })
                                  });
                                  if (res.ok) {
                                    toast('Mission submission approved & reward notification sent!', 'success');
                                    fetchData();
                                  } else {
                                    const d = await res.json();
                                    throw new Error(d.error);
                                  }
                                } catch (err) {
                                  toast(err.message, 'error');
                                }
                              }}
                              style={{
                                padding: '5px 12px',
                                background: T.greenLight,
                                border: `1px solid ${T.green}20`,
                                color: T.green,
                                borderRadius: 6,
                                fontSize: 11,
                                fontWeight: 800,
                                cursor: 'pointer'
                              }}
                            >
                              ✓ Approve
                            </button>
                            <button
                              onClick={async () => {
                                try {
                                  const res = await fetch(`${API_BASE}/admin/missions/completions/${comp.id}/status`, {
                                    method: 'POST',
                                    headers: H(),
                                    body: JSON.stringify({ status: 'REJECTED' })
                                  });
                                  if (res.ok) {
                                    toast('Mission submission rejected & notification sent', 'info');
                                    fetchData();
                                  } else {
                                    const d = await res.json();
                                    throw new Error(d.error);
                                  }
                                } catch (err) {
                                  toast(err.message, 'error');
                                }
                              }}
                              style={{
                                padding: '5px 12px',
                                background: T.redLight,
                                border: `1px solid ${T.red}20`,
                                color: T.red,
                                borderRadius: 6,
                                fontSize: 11,
                                fontWeight: 800,
                                cursor: 'pointer'
                              }}
                            >
                              ✕ Reject
                            </button>
                          </>
                        )}
                      </div>
                    </Td>
                  </tr>
                ))}
              </Table>
            )}
          </div>
        </div>
      )}

      {/* ══ NOTIFICATION CENTER ═══════════════════════════════════════ */}
      {activeTab === 'admin-notifications' && (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
          <SectionHeader
            title="Notification Dispatch Center"
            sub="Send customized in-app push alerts and updates to creators or brands"
          />
          <form
            onSubmit={handleSendPlatformNotification}
            style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 650, marginTop: 20 }}
          >
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>
                Recipient Group *
              </label>
              <select
                value={notifTargetGroup}
                onChange={(e) => {
                  setNotifTargetGroup(e.target.value);
                  setNotifUserId('');
                }}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: `1px solid ${T.border}`,
                  borderRadius: 10,
                  fontSize: 13,
                  color: T.navy,
                  background: T.card,
                  outline: 'none'
                }}
              >
                <option value="ALL_CREATORS">📢 All Creators ({creators.length} users)</option>
                <option value="ALL_BRANDS">🏢 All Brands ({brands.length} users)</option>
                <option value="INDIVIDUAL">👤 Individual Creator / Brand</option>
              </select>
            </div>

            {notifTargetGroup === 'INDIVIDUAL' && (
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>
                  Select Target User *
                </label>
                <select
                  value={notifUserId}
                  onChange={(e) => setNotifUserId(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: `1px solid ${T.border}`,
                    borderRadius: 10,
                    fontSize: 13,
                    color: T.navy,
                    background: T.card,
                    outline: 'none'
                  }}
                >
                  <option value="">-- Select Recipient --</option>
                  <optgroup label="Creators">
                    {creators.map((c) => (
                      <option key={c.id} value={c.userId}>
                        {c.name} (@{c.handle})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Brands">
                    {brands.map((b) => (
                      <option key={b.id} value={b.userId}>
                        {b.companyName} (Brand)
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>
                  Alert Type / Theme *
                </label>
                <select
                  value={notifType}
                  onChange={(e) => setNotifType(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: `1px solid ${T.border}`,
                    borderRadius: 10,
                    fontSize: 13,
                    color: T.navy,
                    background: T.card,
                    outline: 'none'
                  }}
                >
                  <option value="INFO">🔵 INFO (Standard News/Info)</option>
                  <option value="SUCCESS">🟢 SUCCESS (Payments/Approve)</option>
                  <option value="WARNING">🟡 WARNING (Milestone Updates)</option>
                  <option value="DANGER">🔴 DANGER (Policy Alerts/Suspension)</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>
                  Alert Title *
                </label>
                <input
                  value={notifTitle}
                  onChange={(e) => setNotifTitle(e.target.value)}
                  required
                  placeholder="e.g. ⚡ System Scheduled Maintenance"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: `1px solid ${T.border}`,
                    borderRadius: 10,
                    fontSize: 13,
                    color: T.navy,
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>
                Notification Message *
              </label>
              <textarea
                value={notifBody}
                onChange={(e) => setNotifBody(e.target.value)}
                required
                rows={4}
                placeholder="Enter the notification content here..."
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: `1px solid ${T.border}`,
                  borderRadius: 10,
                  fontSize: 13,
                  color: T.navy,
                  outline: 'none',
                  boxSizing: 'border-box',
                  resize: 'vertical'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6, textTransform: 'uppercase' }}>
                Optional Action Link
              </label>
              <input
                value={notifLink}
                onChange={(e) => setNotifLink(e.target.value)}
                placeholder="e.g. /creator/opportunities or /brand-dashboard"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: `1px solid ${T.border}`,
                  borderRadius: 10,
                  fontSize: 13,
                  color: T.navy,
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                background: T.orange,
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                fontWeight: 800,
                fontSize: 14,
                cursor: 'pointer',
                display: 'flex',
                gap: 8,
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(255, 148, 49, 0.2)'
              }}
            >
              <Bell size={18} /> Send Notification
            </button>
          </form>
        </div>
      )}

      {/* ══ COMMENTS ═══════════════════════════════════════════════════ */}
      {activeTab === 'comments' && (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
          <SectionHeader title="Comment Moderation" badge={comments.length} sub="Remove spam or offensive blog comments" />
          <SearchBar value={commentSearch} onChange={setCommentSearch} placeholder="Search comment content or author..." />
          <Table cols={['Blog', 'Author', 'Comment', 'Date', { label: 'Action', align: 'right' }]}>
            {filteredComments.map((c) => (
              <tr key={c.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                <Td bold>
                  <span
                    style={{
                      maxWidth: 140,
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {c.blog?.title || '—'}
                  </span>
                </Td>
                <Td>{c.authorName || 'Anonymous'}</Td>
                <Td>
                  <span
                    style={{
                      maxWidth: 240,
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {c.content}
                  </span>
                </Td>
                <Td muted>{fmtDate(c.createdAt)}</Td>
                <Td right>
                  <DangerBtn small onClick={() => handleDeleteComment(c.id)}>
                    <Trash2 size={11} /> Delete
                  </DangerBtn>
                </Td>
              </tr>
            ))}
          </Table>
          {filteredComments.length === 0 && <EmptyState icon="💬" msg="No comments found" />}
        </div>
      )}

      {/* ══ NEWSLETTERS ════════════════════════════════════════════════ */}
      {activeTab === 'newsletters' && (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
          <SectionHeader title="Newsletter Subscribers" badge={newsletters.length} sub="Manage email list subscribers" />
          <SearchBar value={newsletterSearch} onChange={setNewsletterSearch} placeholder="Search email..." />
          <Table cols={['Email', 'Subscribed On', { label: 'Action', align: 'right' }]}>
            {filteredNewsletters.map((n) => (
              <tr key={n.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                <Td bold>{n.email}</Td>
                <Td muted>{fmtDate(n.createdAt)}</Td>
                <Td right>
                  <DangerBtn small onClick={() => handleDeleteSubscriber(n.id)}>
                    <Trash2 size={11} /> Remove
                  </DangerBtn>
                </Td>
              </tr>
            ))}
          </Table>
          {filteredNewsletters.length === 0 && <EmptyState icon="📧" msg="No subscribers found" />}
        </div>
      )}

      {/* ══ CONTACTS ═══════════════════════════════════════════════════ */}
      {activeTab === 'contacts' && (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
          <SectionHeader
            title="Contact Inbox"
            badge={counts.unreadContacts}
            sub={`${counts.unreadContacts} unread · ${contacts.length} total messages`}
          />
          <SearchBar value={contactSearch} onChange={setContactSearch} placeholder="Search by name, email or message..." />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filteredContacts.map((c) => (
              <div
                key={c.id}
                style={{
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                  padding: '16px 20px',
                  background: c.read ? T.bg : T.orangeLight,
                  border: `1px solid ${c.read ? T.border : T.orangeBorder}`,
                  borderRadius: 14
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: T.orange + '20',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Mail size={18} style={{ color: T.orange }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontWeight: 800, color: T.navy, fontSize: 14 }}>{c.name || 'Unknown'}</span>
                    <span style={{ fontSize: 12, color: T.muted }}>{c.email}</span>
                    {!c.read && <Badge color={T.orange}>UNREAD</Badge>}
                    <span style={{ fontSize: 11, color: T.muted, marginLeft: 'auto' }}>{fmtDate(c.createdAt)}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: T.slate, lineHeight: 1.6 }}>{c.message}</p>
                </div>
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <ActionBtn small onClick={() => handleToggleContactRead(c.id)}>
                    {c.read ? 'Mark Unread' : 'Mark Read'}
                  </ActionBtn>
                  <DangerBtn small onClick={() => handleDeleteContact(c.id)}>
                    <Trash2 size={11} />
                  </DangerBtn>
                </div>
              </div>
            ))}
          </div>
          {filteredContacts.length === 0 && <EmptyState icon="📬" msg="No messages found" />}
        </div>
      )}
    </>
  );
}
