import React from 'react';
import { ExternalLink, Trash2, PlayCircle, Copy, Download, RefreshCw } from 'lucide-react';
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

export default function CmsSection({
  activeTab,
  mob,
  toast,
  FRONTEND_URL,
  
  // Blogs
  blogs,
  blogSearch,
  setBlogSearch,
  filteredBlogs,
  clearBlogForm,
  setEditingBlog,
  setBlogModalOpen,
  openEditBlog,
  handleDeleteBlog,

  // Media Library
  uploads,
  mediaSearch,
  setMediaSearch,
  filteredUploads,
  handleUploadMedia,
  handleDeleteUpload,
  fetchData,

  // Gallery
  gallery,
  gallerySearch,
  setGallerySearch,
  filteredGallery,
  clearGalleryForm,
  setEditingGallery,
  setGalleryModalOpen,
  openEditGallery,
  handleDeleteGallery,

  // Pages (visual pages editor)
  selectedPageName,
  setSelectedPageName,
  editorMode,
  setEditorMode,
  rawJsonText,
  setRawJsonText,
  jsonError,
  setJsonError,
  handleToggleMode,
  handleSavePageConfig,
  
  // Pages configurations & setters
  homeConfig,
  setHomeConfig,
  pricingConfig,
  setPricingConfig,
  calculatorConfig,
  setCalculatorConfig,
  faqsList,
  setFaqsList,
  aboutConfig,
  setAboutConfig,
  aboutSubTab,
  setAboutSubTab,
  pressList,
  setPressList,
  storiesList,
  setStoriesList,
  aiFaqList,
  setAiFaqList,
  notificationsList,
  setNotificationsList,
  officialConfig,
  setOfficialConfig,
  officialSubTab,
  setOfficialSubTab,
  verifyGuideConfig,
  setVerifyGuideConfig,
  verifyGuideSubTab,
  setVerifyGuideSubTab,
  ambassadorConfig,
  setAmbassadorConfig,
  ambassadorSubTab,
  setAmbassadorSubTab,
  contactConfig,
  setContactConfig,
  contactSubTab,
  setContactSubTab,
  creatorLandingConfig,
  setCreatorLandingConfig,
  brandLandingConfig,
  setBrandLandingConfig
}) {
  return (
    <>
      {/* ══ BLOGS ══════════════════════════════════════════════════════ */}
      {activeTab === 'blogs' && (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
          <SectionHeader title="Blog Manager" badge={blogs.length} sub="Create, edit, and publish blog articles"
            action={<button onClick={() => { clearBlogForm(); setEditingBlog(null); setBlogModalOpen(true); }} style={{ padding: '8px 18px', background: T.orange, color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>+ New Article</button>}
          />
          <SearchBar value={blogSearch} onChange={setBlogSearch} placeholder="Search blog title, category..." />
          <Table cols={['Title', 'Category', 'Author', 'Status', 'Comments', 'Date', { label: 'Actions', align: 'right' }]}>
            {filteredBlogs.map(b => (
              <tr key={b.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                <Td bold><span style={{ maxWidth: 200, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</span></Td>
                <Td><Badge color={T.purple}>{b.category}</Badge></Td>
                <Td muted>{b.author}</Td>
                <Td><Badge color={b.published ? T.green : T.muted}>{b.published ? 'Published' : 'Draft'}</Badge></Td>
                <Td>{b._count?.comments || 0}</Td>
                <Td muted>{fmtDate(b.createdAt)}</Td>
                <Td right>
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                    <a href={`${FRONTEND_URL}/blog/${b.slug}`} target="_blank" rel="noopener noreferrer" style={{ padding: '5px 10px', background: T.blueLight, color: T.blue, borderRadius: 7, fontSize: 11, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <ExternalLink size={10} />
                    </a>
                    <ActionBtn small onClick={() => openEditBlog(b)}>✎ Edit</ActionBtn>
                    <DangerBtn small onClick={() => handleDeleteBlog(b.id)}><Trash2 size={11} /></DangerBtn>
                  </div>
                </Td>
              </tr>
            ))}
          </Table>
          {filteredBlogs.length === 0 && <EmptyState icon="📝" msg="No blog articles found" />}
        </div>
      )}

      {/* ══ MEDIA LIBRARY ══════════════════════════════════════════════ */}
      {activeTab === 'media-library' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
            <SectionHeader 
              title="Ecosystem Media Library" 
              badge={uploads.length} 
              sub="Upload files to copy their absolute links for insertion in blogs, campaigns, or portfolios"
              action={
                <div style={{ display: 'flex', gap: 10 }}>
                  <button 
                    onClick={() => document.getElementById('media-library-file-input').click()}
                    style={{ padding: '8px 18px', background: T.orange, color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 800, cursor: 'pointer' }}
                  >
                    + Upload File
                  </button>
                  <input 
                    type="file" 
                    id="media-library-file-input" 
                    style={{ display: 'none' }}
                    onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        const type = file.type.startsWith('video/') ? 'video' : 'image';
                        try {
                          toast('Uploading file to system...', 'info');
                          const url = await handleUploadMedia(file, type);
                          if (url) {
                            toast('File uploaded successfully!', 'success');
                            fetchData();
                          }
                        } catch (err) {
                          toast(err.message || 'Upload failed', 'error');
                        }
                      }
                    }}
                  />
                </div>
              }
            />
            
            {/* Search & Drag Drop Zone */}
            <SearchBar value={mediaSearch} onChange={setMediaSearch} placeholder="Search files by name..." />
            
            <div 
              onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = T.orange; }}
              onDragLeave={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = T.border; }}
              onDrop={async (e) => {
                e.preventDefault();
                e.currentTarget.style.borderColor = T.border;
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  const file = e.dataTransfer.files[0];
                  const type = file.type.startsWith('video/') ? 'video' : 'image';
                  try {
                    toast('Uploading dropped file...', 'info');
                    const url = await handleUploadMedia(file, type);
                    if (url) {
                      toast('File uploaded successfully!', 'success');
                      fetchData();
                    }
                  } catch (err) {
                    toast(err.message || 'Upload failed', 'error');
                  }
                }
              }}
              style={{
                border: `2px dashed ${T.border}`,
                borderRadius: 16,
                padding: '30px 20px',
                textAlign: 'center',
                background: T.bg,
                marginBottom: 24,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => document.getElementById('media-library-file-input').click()}
            >
              <span style={{ fontSize: 24, display: 'block', marginBottom: 8 }}>📁</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: T.slate }}>Drag & Drop any image/video file here, or click to browse</span>
              <span style={{ display: 'block', fontSize: 11, color: T.muted, marginTop: 4 }}>Maximum size: Image 5MB / Video 50MB</span>
            </div>

            {/* Uploads Grid */}
            {filteredUploads.length === 0 ? (
              <EmptyState icon="📁" msg="No media files found" />
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: 20
              }}>
                {filteredUploads.map((u, i) => {
                  const isVid = u.type?.startsWith('video/') || u.name?.endsWith('.mp4') || u.name?.endsWith('.mov') || u.name?.endsWith('.avi');
                  const friendlySize = u.size ? (u.size > 1024 * 1024 ? `${(u.size / (1024 * 1024)).toFixed(1)} MB` : `${Math.round(u.size / 1024)} KB`) : '—';
                  return (
                    <div key={i} style={{
                      background: T.bg,
                      border: `1px solid ${T.border}`,
                      borderRadius: 16,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 4px 10px rgba(15,23,42,0.02)',
                      transition: 'transform 0.2s',
                      position: 'relative'
                    }} className="media-card">
                      {/* Preview container */}
                      <div style={{
                        height: 125,
                        background: '#070a13',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        position: 'relative',
                        borderBottom: `1px solid ${T.border}`
                      }}>
                        {isVid ? (
                          <video src={u.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <img src={u.url} alt={u.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        )}
                        <span 
                          style={{ position: 'absolute', top: 8, left: 8, zIndex: 5, padding: '2px 8px', background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)', color: '#fff', borderRadius: 20, fontSize: 9, fontWeight: 800, textTransform: 'uppercase' }}
                        >
                          {isVid ? 'Video' : 'Image'}
                        </span>
                      </div>

                      {/* File Details */}
                      <div style={{ padding: 14, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ marginBottom: 12 }}>
                          <h5 style={{
                            margin: '0 0 4px 0',
                            fontSize: 13,
                            fontWeight: 800,
                            color: T.navy,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }} title={u.name}>
                            {u.name}
                          </h5>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.muted, fontWeight: 600 }}>
                            <span>{friendlySize}</span>
                            <span>{fmtDate(u.createdAt)}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(u.url);
                              toast('Copied direct link to clipboard!', 'success');
                            }}
                            style={{
                              flex: 1,
                              padding: '8px 0',
                              background: T.orangeLight,
                              color: T.orange,
                              border: `1px dashed ${T.orangeBorder}`,
                              borderRadius: 8,
                              fontSize: 12,
                              fontWeight: 800,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 4
                            }}
                          >
                            <Copy size={11} /> Copy Link
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteUpload(u.name)}
                            style={{
                              padding: '8px 10px',
                              background: T.redLight,
                              color: T.red,
                              border: `1px solid ${T.red}15`,
                              borderRadius: 8,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══ GALLERY ════════════════════════════════════════════════════ */}
      {activeTab === 'gallery' && (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
          <SectionHeader title="Gallery Manager" badge={gallery.length} sub="Manage images, video clips, workshops, and ecosystem highlights"
            action={<button onClick={() => { clearGalleryForm(); setEditingGallery(null); setGalleryModalOpen(true); }} style={{ padding: '8px 18px', background: T.orange, color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>+ New Item</button>}
          />
          <SearchBar value={gallerySearch} onChange={setGallerySearch} placeholder="Search title, category, tags, or location..." />
          <Table cols={['Thumbnail', 'Title', 'Category', 'Type', 'Location', 'Date', { label: 'Actions', align: 'right' }]}>
            {filteredGallery.map(g => (
              <tr key={g.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                <Td>
                  <img src={g.thumbnail} alt={g.title} style={{ width: 50, height: 35, borderRadius: 6, objectFit: 'cover', border: `1px solid ${T.border}` }} />
                </Td>
                <Td bold>
                  <span style={{ maxWidth: 200, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.title}</span>
                </Td>
                <Td><Badge color={T.purple}>{g.category}</Badge></Td>
                <Td><Badge color={g.type === 'video' ? T.orange : T.blue}>{g.type}</Badge></Td>
                <Td muted>{g.location || '—'}</Td>
                <Td muted>{g.date}</Td>
                <Td right>
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                    {g.videoUrl && (
                      <a href={g.videoUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '5px 10px', background: T.orangeLight, color: T.orange, borderRadius: 7, fontSize: 11, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <PlayCircle size={10} /> Video
                      </a>
                    )}
                    <ActionBtn small onClick={() => openEditGallery(g)}>✎ Edit</ActionBtn>
                    <DangerBtn small onClick={() => handleDeleteGallery(g.id)}><Trash2 size={11} /></DangerBtn>
                  </div>
                </Td>
              </tr>
            ))}
          </Table>
          {filteredGallery.length === 0 && <EmptyState icon="🖼️" msg="No gallery items found" />}
        </div>
      )}

      {/* ══ DYNAMIC PAGES CONFIG MANAGER ════════════════════════════ */}
      {activeTab === 'pages' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, padding: 28 }}>
            <SectionHeader title="Dynamic Page Content Manager" sub="Manage live configurations for website and platform pages" />
            
            <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '220px 1fr', gap: 28, marginTop: 12 }}>
              {/* Left sub-sidebar navigation */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, borderRight: mob ? 'none' : `1px solid ${T.border}`, borderBottom: mob ? `1px solid ${T.border}` : 'none', paddingRight: mob ? 0 : 20, paddingBottom: mob ? 20 : 0 }}>
                <div>
                  <h4 style={{ fontSize: 11, fontWeight: 800, color: T.slate, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>🌐 Public Website</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {[
                      { id: 'home', name: 'Home Hero' },
                      { id: 'pricing', name: 'Pricing & Plans' },
                      { id: 'calculator', name: 'Rate Calculator' },
                      { id: 'faqs', name: 'FAQs List' },
                      { id: 'about', name: 'About Us' },
                      { id: 'press', name: 'Press Room' },
                      { id: 'stories', name: 'Success Stories' },
                      { id: 'ai-faq', name: 'AI FAQ Hub' },
                      { id: 'notifications', name: 'Public Notices Hub' },
                      { id: 'official', name: 'Official Profile' },
                      { id: 'verify-guide', name: 'Verification Guide' },
                      { id: 'ambassador', name: 'Campus Ambassador' },
                      { id: 'contact', name: 'Contact Page' }
                    ].map(p => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPageName(p.id)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: 8,
                          border: 'none',
                          textAlign: 'left',
                          background: selectedPageName === p.id ? T.orangeLight : 'transparent',
                          color: selectedPageName === p.id ? T.orange : T.navy,
                          fontWeight: selectedPageName === p.id ? 800 : 600,
                          cursor: 'pointer',
                          fontSize: 13,
                          transition: 'all 0.2s'
                        }}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: 11, fontWeight: 800, color: T.slate, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>🙋 For Creators</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {[
                      { id: 'creator-landing', name: 'Creator Hub' }
                    ].map(p => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPageName(p.id)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: 8,
                          border: 'none',
                          textAlign: 'left',
                          background: selectedPageName === p.id ? T.orangeLight : 'transparent',
                          color: selectedPageName === p.id ? T.orange : T.navy,
                          fontWeight: selectedPageName === p.id ? 800 : 600,
                          cursor: 'pointer',
                          fontSize: 13,
                          transition: 'all 0.2s'
                        }}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: 11, fontWeight: 800, color: T.slate, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>🏢 For Brands</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {[
                      { id: 'brand-landing', name: 'Brand Hub' }
                    ].map(p => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPageName(p.id)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: 8,
                          border: 'none',
                          textAlign: 'left',
                          background: selectedPageName === p.id ? T.orangeLight : 'transparent',
                          color: selectedPageName === p.id ? T.orange : T.navy,
                          fontWeight: selectedPageName === p.id ? 800 : 600,
                          cursor: 'pointer',
                          fontSize: 13,
                          transition: 'all 0.2s'
                        }}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side form editor */}
              <div style={{ background: T.bg, padding: 24, borderRadius: 16, border: `1px solid ${T.border}`, width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottom: `1px solid ${T.border}`, paddingBottom: 12 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 850, color: T.navy, margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Configure: {selectedPageName.replace('-', ' ')}
                  </h3>
                  <div style={{ display: 'flex', gap: 4, background: T.card, padding: 4, borderRadius: 8, border: `1px solid ${T.border}` }}>
                    <button
                      onClick={() => handleToggleMode('visual')}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 6,
                        border: 'none',
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: 'pointer',
                        background: editorMode === 'visual' ? T.orange : 'transparent',
                        color: editorMode === 'visual' ? '#fff' : T.slate,
                        transition: 'all 0.2s'
                      }}
                    >
                      🎨 Form Editor
                    </button>
                    <button
                      onClick={() => handleToggleMode('json')}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 6,
                        border: 'none',
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: 'pointer',
                        background: editorMode === 'json' ? T.orange : 'transparent',
                        color: editorMode === 'json' ? '#fff' : T.slate,
                        transition: 'all 0.2s'
                      }}
                    >
                      💻 JSON Code
                    </button>
                  </div>
                </div>

                {editorMode === 'json' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Raw JSON Editor</label>
                      <textarea
                        value={rawJsonText}
                        onChange={e => setRawJsonText(e.target.value)}
                        style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 12, fontFamily: 'monospace', color: T.navy, background: T.card, outline: 'none', minHeight: 400, boxSizing: 'border-box' }}
                      />
                      {jsonError && <p style={{ color: T.red, fontSize: 12, margin: '4px 0 0' }}>{jsonError}</p>}
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Editor form for selected page config */}
                    {selectedPageName === 'home' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Hero Title</label>
                          <input
                            type="text"
                            value={homeConfig.heroTitle || ''}
                            onChange={e => setHomeConfig({ ...homeConfig, heroTitle: e.target.value })}
                            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', boxSizing: 'border-box' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Hero Subtitle</label>
                          <textarea
                            value={homeConfig.heroSubtitle || ''}
                            onChange={e => setHomeConfig({ ...homeConfig, heroSubtitle: e.target.value })}
                            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', minHeight: 80, boxSizing: 'border-box' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>CTA Button Text</label>
                          <input
                            type="text"
                            value={homeConfig.ctaText || ''}
                            onChange={e => setHomeConfig({ ...homeConfig, ctaText: e.target.value })}
                            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', boxSizing: 'border-box' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Alert Announcement Bar</label>
                          <input
                            type="text"
                            value={homeConfig.announcement || ''}
                            onChange={e => setHomeConfig({ ...homeConfig, announcement: e.target.value })}
                            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', boxSizing: 'border-box' }}
                          />
                        </div>
                      </div>
                    )}

                    {selectedPageName === 'pricing' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                          <div>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Creator Starter Plan Fee (₹)</label>
                            <input
                              type="number"
                              value={pricingConfig.starterPrice || 0}
                              onChange={e => setPricingConfig({ ...pricingConfig, starterPrice: parseInt(e.target.value) || 0 })}
                              style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', boxSizing: 'border-box' }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Creator Pro Plan Fee (₹/month)</label>
                            <input
                              type="number"
                              value={pricingConfig.proPrice || 0}
                              onChange={e => setPricingConfig({ ...pricingConfig, proPrice: parseInt(e.target.value) || 0 })}
                              style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', boxSizing: 'border-box' }}
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Creator Pro Features List (comma separated)</label>
                          <textarea
                            value={pricingConfig.proFeatures || ''}
                            onChange={e => setPricingConfig({ ...pricingConfig, proFeatures: e.target.value })}
                            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', minHeight: 60, boxSizing: 'border-box' }}
                            placeholder="Feature 1, Feature 2, Feature 3"
                          />
                        </div>
                        <hr style={{ border: 'none', borderTop: `1px solid ${T.border}`, margin: '8px 0' }} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                          <div>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Brand Launchpad Fee (₹)</label>
                            <input
                              type="number"
                              value={pricingConfig.brandStarterPrice || 0}
                              onChange={e => setPricingConfig({ ...pricingConfig, brandStarterPrice: parseInt(e.target.value) || 0 })}
                              style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', boxSizing: 'border-box' }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Brand Enterprise Fee (₹/month)</label>
                            <input
                              type="number"
                              value={pricingConfig.brandProPrice || 0}
                              onChange={e => setPricingConfig({ ...pricingConfig, brandProPrice: parseInt(e.target.value) || 0 })}
                              style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', boxSizing: 'border-box' }}
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Brand Enterprise Features List (comma separated)</label>
                          <textarea
                            value={pricingConfig.brandProFeatures || ''}
                            onChange={e => setPricingConfig({ ...pricingConfig, brandProFeatures: e.target.value })}
                            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', minHeight: 60, boxSizing: 'border-box' }}
                            placeholder="Feature 1, Feature 2, Feature 3"
                          />
                        </div>
                      </div>
                    )}

                    {selectedPageName === 'calculator' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Base Rate Coefficient (multiplier for follower count)</label>
                          <input
                            type="number"
                            step="0.01"
                            value={calculatorConfig.rateMultiplier || 0.15}
                            onChange={e => setCalculatorConfig({ ...calculatorConfig, rateMultiplier: parseFloat(e.target.value) || 0 })}
                            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', boxSizing: 'border-box' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Instagram Niche Premium Multiplier (e.g. Beauty/Tech = 1.25)</label>
                          <input
                            type="number"
                            step="0.05"
                            value={calculatorConfig.nicheMultiplier || 1.2}
                            onChange={e => setCalculatorConfig({ ...calculatorConfig, nicheMultiplier: parseFloat(e.target.value) || 0 })}
                            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', boxSizing: 'border-box' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8, textTransform: 'uppercase' }}>Min Platform Commission Fee (INR)</label>
                          <input
                            type="number"
                            value={calculatorConfig.minFee || 500}
                            onChange={e => setCalculatorConfig({ ...calculatorConfig, minFee: parseInt(e.target.value) || 0 })}
                            style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', boxSizing: 'border-box' }}
                          />
                        </div>
                      </div>
                    )}

                    {selectedPageName === 'creator-landing' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                          <h5 style={{ fontSize: 12, fontWeight: 800, color: T.orange, marginBottom: 12, textTransform: 'uppercase' }}>Hero Section</h5>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Badge Text</label>
                              <input
                                type="text"
                                value={creatorLandingConfig.heroBadge || ''}
                                onChange={e => setCreatorLandingConfig({ ...creatorLandingConfig, heroBadge: e.target.value })}
                                style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', boxSizing: 'border-box' }}
                              />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Main Hero Title</label>
                              <input
                                type="text"
                                value={creatorLandingConfig.heroTitle || ''}
                                onChange={e => setCreatorLandingConfig({ ...creatorLandingConfig, heroTitle: e.target.value })}
                                style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', boxSizing: 'border-box' }}
                              />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Hero Subtitle</label>
                              <textarea
                                value={creatorLandingConfig.heroSubtitle || ''}
                                onChange={e => setCreatorLandingConfig({ ...creatorLandingConfig, heroSubtitle: e.target.value })}
                                style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', minHeight: 60, boxSizing: 'border-box' }}
                              />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>CTA Primary Button</label>
                                <input
                                  type="text"
                                  value={creatorLandingConfig.ctaPrimary || ''}
                                  onChange={e => setCreatorLandingConfig({ ...creatorLandingConfig, ctaPrimary: e.target.value })}
                                  style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', boxSizing: 'border-box' }}
                                />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>CTA Secondary Button</label>
                                <input
                                  type="text"
                                  value={creatorLandingConfig.ctaSecondary || ''}
                                  onChange={e => setCreatorLandingConfig({ ...creatorLandingConfig, ctaSecondary: e.target.value })}
                                  style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', boxSizing: 'border-box' }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr style={{ border: 'none', borderTop: `1px solid ${T.border}`, margin: '8px 0' }} />
                        <div>
                          <h5 style={{ fontSize: 12, fontWeight: 800, color: '#10B981', marginBottom: 12, textTransform: 'uppercase' }}>Bottom Final CTA Section</h5>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Bottom Title</label>
                              <input
                                type="text"
                                value={creatorLandingConfig.bottomTitle || ''}
                                onChange={e => setCreatorLandingConfig({ ...creatorLandingConfig, bottomTitle: e.target.value })}
                                style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', boxSizing: 'border-box' }}
                              />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Bottom Subtitle</label>
                              <textarea
                                value={creatorLandingConfig.bottomSubtitle || ''}
                                onChange={e => setCreatorLandingConfig({ ...creatorLandingConfig, bottomSubtitle: e.target.value })}
                                style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', minHeight: 60, boxSizing: 'border-box' }}
                              />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Bottom CTA Primary</label>
                                <input
                                  type="text"
                                  value={creatorLandingConfig.bottomCtaPrimary || ''}
                                  onChange={e => setCreatorLandingConfig({ ...creatorLandingConfig, bottomCtaPrimary: e.target.value })}
                                  style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', boxSizing: 'border-box' }}
                                />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Bottom CTA Secondary</label>
                                <input
                                  type="text"
                                  value={creatorLandingConfig.bottomCtaSecondary || ''}
                                  onChange={e => setCreatorLandingConfig({ ...creatorLandingConfig, bottomCtaSecondary: e.target.value })}
                                  style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', boxSizing: 'border-box' }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedPageName === 'brand-landing' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                          <h5 style={{ fontSize: 12, fontWeight: 850, color: T.orange, marginBottom: 12, textTransform: 'uppercase' }}>Hero Section</h5>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Badge Text</label>
                              <input
                                type="text"
                                value={brandLandingConfig.heroBadge || ''}
                                onChange={e => setBrandLandingConfig({ ...brandLandingConfig, heroBadge: e.target.value })}
                                style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', boxSizing: 'border-box' }}
                              />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Main Hero Title</label>
                              <input
                                type="text"
                                value={brandLandingConfig.heroTitle || ''}
                                onChange={e => setBrandLandingConfig({ ...brandLandingConfig, heroTitle: e.target.value })}
                                style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', boxSizing: 'border-box' }}
                              />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Hero Subtitle</label>
                              <textarea
                                value={brandLandingConfig.heroSubtitle || ''}
                                onChange={e => setBrandLandingConfig({ ...brandLandingConfig, heroSubtitle: e.target.value })}
                                style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', minHeight: 60, boxSizing: 'border-box' }}
                              />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>CTA Primary Button</label>
                                <input
                                  type="text"
                                  value={brandLandingConfig.ctaPrimary || ''}
                                  onChange={e => setBrandLandingConfig({ ...brandLandingConfig, ctaPrimary: e.target.value })}
                                  style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', boxSizing: 'border-box' }}
                                />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>CTA Secondary Button</label>
                                <input
                                  type="text"
                                  value={brandLandingConfig.ctaSecondary || ''}
                                  onChange={e => setBrandLandingConfig({ ...brandLandingConfig, ctaSecondary: e.target.value })}
                                  style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', boxSizing: 'border-box' }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr style={{ border: 'none', borderTop: `1px solid ${T.border}`, margin: '8px 0' }} />
                        <div>
                          <h5 style={{ fontSize: 12, fontWeight: 850, color: '#10B981', marginBottom: 12, textTransform: 'uppercase' }}>Bottom Final CTA Section</h5>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Bottom Title</label>
                              <input
                                type="text"
                                value={brandLandingConfig.bottomTitle || ''}
                                onChange={e => setBrandLandingConfig({ ...brandLandingConfig, bottomTitle: e.target.value })}
                                style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', boxSizing: 'border-box' }}
                              />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Bottom Subtitle</label>
                              <textarea
                                value={brandLandingConfig.bottomSubtitle || ''}
                                onChange={e => setBrandLandingConfig({ ...brandLandingConfig, bottomSubtitle: e.target.value })}
                                style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', minHeight: 60, boxSizing: 'border-box' }}
                              />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Bottom CTA Primary</label>
                                <input
                                  type="text"
                                  value={brandLandingConfig.bottomCtaPrimary || ''}
                                  onChange={e => setBrandLandingConfig({ ...brandLandingConfig, bottomCtaPrimary: e.target.value })}
                                  style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', boxSizing: 'border-box' }}
                                />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 8 }}>Bottom CTA Secondary</label>
                                <input
                                  type="text"
                                  value={brandLandingConfig.bottomCtaSecondary || ''}
                                  onChange={e => setBrandLandingConfig({ ...brandLandingConfig, bottomCtaSecondary: e.target.value })}
                                  style={{ width: '100%', padding: '11px 14px', border: `1px solid ${T.border}`, borderRadius: 10, fontSize: 14, color: T.navy, background: T.card, outline: 'none', boxSizing: 'border-box' }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedPageName === 'faqs' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {faqsList.map((faq, index) => (
                          <div key={index} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' }}>
                            <div style={{ position: 'absolute', top: 12, right: 12 }}>
                              <button
                                type="button"
                                onClick={() => {
                                  const newList = [...faqsList];
                                  newList.splice(index, 1);
                                  setFaqsList(newList);
                                }}
                                style={{ padding: '6px 12px', background: 'rgba(239, 68, 68, 0.1)', color: T.red, border: 'none', borderRadius: 6, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}
                              >
                                🗑️ Delete
                              </button>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12, marginBottom: 12, width: 'calc(100% - 80px)' }}>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6 }}>Category</label>
                                <input
                                  type="text"
                                  value={faq.cat || ''}
                                  onChange={e => {
                                    const newList = [...faqsList];
                                    newList[index] = { ...faq, cat: e.target.value };
                                    setFaqsList(newList);
                                  }}
                                  style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, color: T.navy, background: T.bg, outline: 'none', boxSizing: 'border-box' }}
                                />
                              </div>
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6 }}>Question</label>
                              <input
                                type="text"
                                value={faq.q || ''}
                                onChange={e => {
                                  const newList = [...faqsList];
                                  newList[index] = { ...faq, q: e.target.value };
                                  setFaqsList(newList);
                                }}
                                style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, color: T.navy, background: T.bg, outline: 'none', marginBottom: 12, boxSizing: 'border-box' }}
                              />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6 }}>Answer</label>
                              <textarea
                                value={faq.a || ''}
                                onChange={e => {
                                  const newList = [...faqsList];
                                  newList[index] = { ...faq, a: e.target.value };
                                  setFaqsList(newList);
                                }}
                                style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, color: T.navy, background: T.bg, outline: 'none', minHeight: 60, boxSizing: 'border-box' }}
                              />
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => setFaqsList([...faqsList, { cat: 'General', q: '', a: '' }])}
                          style={{ padding: '8px 16px', background: T.orangeLight, color: T.orange, border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, width: 'fit-content' }}
                        >
                          ➕ Add FAQ Item
                        </button>
                      </div>
                    )}

                    {selectedPageName === 'about' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                          {[
                            { id: 'blueprint', label: 'Blueprint' },
                            { id: 'timeline', label: 'Timeline' },
                            { id: 'philosophy', label: 'Philosophy' },
                            { id: 'leadership', label: 'Leadership' },
                            { id: 'press', label: 'Press Logos' },
                            { id: 'investor', label: 'Investor Logos' }
                          ].map(st => (
                            <button
                              key={st.id}
                              type="button"
                              onClick={() => setAboutSubTab(st.id)}
                              style={{
                                padding: '6px 12px',
                                borderRadius: 8,
                                fontSize: 12,
                                fontWeight: 700,
                                cursor: 'pointer',
                                background: aboutSubTab === st.id ? T.orange : T.card,
                                color: aboutSubTab === st.id ? '#fff' : T.slate,
                                border: `1px solid ${T.border}`
                              }}
                            >
                              {st.label}
                            </button>
                          ))}
                        </div>

                        {aboutSubTab === 'blueprint' && (
                          <div>
                            {(aboutConfig.BLUEPRINT_CARDS || []).map((card, idx) => (
                              <div key={idx} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const arr = [...(aboutConfig.BLUEPRINT_CARDS || [])];
                                    arr.splice(idx, 1);
                                    setAboutConfig({ ...aboutConfig, BLUEPRINT_CARDS: arr });
                                  }}
                                  style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: T.red, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}
                                >
                                  🗑️ Delete
                                </button>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12, width: 'calc(100% - 80px)' }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Icon (Lucide name)</label>
                                    <input type="text" value={card.icon || ''} onChange={e => {
                                      const arr = [...(aboutConfig.BLUEPRINT_CARDS || [])];
                                      arr[idx] = { ...card, icon: e.target.value };
                                      setAboutConfig({ ...aboutConfig, BLUEPRINT_CARDS: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Title</label>
                                    <input type="text" value={card.title || ''} onChange={e => {
                                      const arr = [...(aboutConfig.BLUEPRINT_CARDS || [])];
                                      arr[idx] = { ...card, title: e.target.value };
                                      setAboutConfig({ ...aboutConfig, BLUEPRINT_CARDS: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                </div>
                                <div style={{ marginTop: 12 }}>
                                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Description</label>
                                  <textarea value={card.desc || ''} onChange={e => {
                                    const arr = [...(aboutConfig.BLUEPRINT_CARDS || [])];
                                    arr[idx] = { ...card, desc: e.target.value };
                                    setAboutConfig({ ...aboutConfig, BLUEPRINT_CARDS: arr });
                                  }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, minHeight: 50, boxSizing: 'border-box' }} />
                                </div>
                              </div>
                            ))}
                            <button type="button" onClick={() => {
                              const arr = [...(aboutConfig.BLUEPRINT_CARDS || [])];
                              arr.push({ icon: 'HelpCircle', title: '', desc: '' });
                              setAboutConfig({ ...aboutConfig, BLUEPRINT_CARDS: arr });
                            }} style={{ padding: '8px 16px', background: T.orangeLight, color: T.orange, border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>➕ Add Card</button>
                          </div>
                        )}

                        {aboutSubTab === 'timeline' && (
                          <div>
                            {(aboutConfig.TIMELINE_DATA || []).map((time, idx) => (
                              <div key={idx} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const arr = [...(aboutConfig.TIMELINE_DATA || [])];
                                    arr.splice(idx, 1);
                                    setAboutConfig({ ...aboutConfig, TIMELINE_DATA: arr });
                                  }}
                                  style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: T.red, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}
                                >
                                  🗑️ Delete
                                </button>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12, width: 'calc(100% - 80px)' }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Year</label>
                                    <input type="text" value={time.year || ''} onChange={e => {
                                      const arr = [...(aboutConfig.TIMELINE_DATA || [])];
                                      arr[idx] = { ...time, year: e.target.value };
                                      setAboutConfig({ ...aboutConfig, TIMELINE_DATA: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Title</label>
                                    <input type="text" value={time.title || ''} onChange={e => {
                                      const arr = [...(aboutConfig.TIMELINE_DATA || [])];
                                      arr[idx] = { ...time, title: e.target.value };
                                      setAboutConfig({ ...aboutConfig, TIMELINE_DATA: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                </div>
                                <div style={{ marginTop: 12 }}>
                                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Description</label>
                                  <textarea value={time.desc || ''} onChange={e => {
                                    const arr = [...(aboutConfig.TIMELINE_DATA || [])];
                                    arr[idx] = { ...time, desc: e.target.value };
                                    setAboutConfig({ ...aboutConfig, TIMELINE_DATA: arr });
                                  }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, minHeight: 50, boxSizing: 'border-box' }} />
                                </div>
                              </div>
                            ))}
                            <button type="button" onClick={() => {
                              const arr = [...(aboutConfig.TIMELINE_DATA || [])];
                              arr.push({ year: '2026', title: '', desc: '' });
                              setAboutConfig({ ...aboutConfig, TIMELINE_DATA: arr });
                            }} style={{ padding: '8px 16px', background: T.orangeLight, color: T.orange, border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>➕ Add Milestone</button>
                          </div>
                        )}

                        {aboutSubTab === 'philosophy' && (
                          <div>
                            {(aboutConfig.PHILOSOPHY_PILLARS || []).map((pil, idx) => (
                              <div key={idx} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const arr = [...(aboutConfig.PHILOSOPHY_PILLARS || [])];
                                    arr.splice(idx, 1);
                                    setAboutConfig({ ...aboutConfig, PHILOSOPHY_PILLARS: arr });
                                  }}
                                  style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: T.red, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}
                                >
                                  🗑️ Delete
                                </button>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12, width: 'calc(100% - 80px)' }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Icon (Lucide name)</label>
                                    <input type="text" value={pil.icon || ''} onChange={e => {
                                      const arr = [...(aboutConfig.PHILOSOPHY_PILLARS || [])];
                                      arr[idx] = { ...pil, icon: e.target.value };
                                      setAboutConfig({ ...aboutConfig, PHILOSOPHY_PILLARS: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Title</label>
                                    <input type="text" value={pil.title || ''} onChange={e => {
                                      const arr = [...(aboutConfig.PHILOSOPHY_PILLARS || [])];
                                      arr[idx] = { ...pil, title: e.target.value };
                                      setAboutConfig({ ...aboutConfig, PHILOSOPHY_PILLARS: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                </div>
                                <div style={{ marginTop: 12 }}>
                                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Description</label>
                                  <textarea value={pil.desc || ''} onChange={e => {
                                    const arr = [...(aboutConfig.PHILOSOPHY_PILLARS || [])];
                                    arr[idx] = { ...pil, desc: e.target.value };
                                    setAboutConfig({ ...aboutConfig, PHILOSOPHY_PILLARS: arr });
                                  }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, minHeight: 50, boxSizing: 'border-box' }} />
                                </div>
                              </div>
                            ))}
                            <button type="button" onClick={() => {
                              const arr = [...(aboutConfig.PHILOSOPHY_PILLARS || [])];
                              arr.push({ id: 'p-' + Date.now(), icon: 'Compass', title: '', desc: '' });
                              setAboutConfig({ ...aboutConfig, PHILOSOPHY_PILLARS: arr });
                            }} style={{ padding: '8px 16px', background: T.orangeLight, color: T.orange, border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>➕ Add Pillar</button>
                          </div>
                        )}

                        {aboutSubTab === 'leadership' && (
                          <div>
                            {(aboutConfig.LEADERSHIP_TEAM || []).map((lead, idx) => (
                              <div key={idx} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const arr = [...(aboutConfig.LEADERSHIP_TEAM || [])];
                                    arr.splice(idx, 1);
                                    setAboutConfig({ ...aboutConfig, LEADERSHIP_TEAM: arr });
                                  }}
                                  style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: T.red, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}
                                >
                                  🗑️ Delete
                                </button>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: 'calc(100% - 80px)' }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Full Name</label>
                                    <input type="text" value={lead.name || ''} onChange={e => {
                                      const arr = [...(aboutConfig.LEADERSHIP_TEAM || [])];
                                      arr[idx] = { ...lead, name: e.target.value };
                                      setAboutConfig({ ...aboutConfig, LEADERSHIP_TEAM: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Role / Title</label>
                                    <input type="text" value={lead.role || ''} onChange={e => {
                                      const arr = [...(aboutConfig.LEADERSHIP_TEAM || [])];
                                      arr[idx] = { ...lead, role: e.target.value };
                                      setAboutConfig({ ...aboutConfig, LEADERSHIP_TEAM: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                </div>
                                <div style={{ marginTop: 12 }}>
                                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Image URL</label>
                                  <input type="text" value={lead.image || ''} onChange={e => {
                                    const arr = [...(aboutConfig.LEADERSHIP_TEAM || [])];
                                    arr[idx] = { ...lead, image: e.target.value };
                                    setAboutConfig({ ...aboutConfig, LEADERSHIP_TEAM: arr });
                                  }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                </div>
                              </div>
                            ))}
                            <button type="button" onClick={() => {
                              const arr = [...(aboutConfig.LEADERSHIP_TEAM || [])];
                              arr.push({ name: '', role: '', image: '' });
                              setAboutConfig({ ...aboutConfig, LEADERSHIP_TEAM: arr });
                            }} style={{ padding: '8px 16px', background: T.orangeLight, color: T.orange, border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>➕ Add Leader</button>
                          </div>
                        )}

                        {aboutSubTab === 'press' && (
                          <div>
                            {(aboutConfig.PRESS_LOGOS || []).map((logo, idx) => (
                              <div key={idx} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const arr = [...(aboutConfig.PRESS_LOGOS || [])];
                                    arr.splice(idx, 1);
                                    setAboutConfig({ ...aboutConfig, PRESS_LOGOS: arr });
                                  }}
                                  style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: T.red, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}
                                >
                                  🗑️ Delete
                                </button>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12, width: 'calc(100% - 80px)' }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Brand Name</label>
                                    <input type="text" value={logo.name || ''} onChange={e => {
                                      const arr = [...(aboutConfig.PRESS_LOGOS || [])];
                                      arr[idx] = { ...logo, name: e.target.value };
                                      setAboutConfig({ ...aboutConfig, PRESS_LOGOS: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Logo Image URL</label>
                                    <input type="text" value={logo.logo || ''} onChange={e => {
                                      const arr = [...(aboutConfig.PRESS_LOGOS || [])];
                                      arr[idx] = { ...logo, logo: e.target.value };
                                      setAboutConfig({ ...aboutConfig, PRESS_LOGOS: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                </div>
                              </div>
                            ))}
                            <button type="button" onClick={() => {
                              const arr = [...(aboutConfig.PRESS_LOGOS || [])];
                              arr.push({ id: 'pr-' + Date.now(), name: '', logo: '' });
                              setAboutConfig({ ...aboutConfig, PRESS_LOGOS: arr });
                            }} style={{ padding: '8px 16px', background: T.orangeLight, color: T.orange, border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>➕ Add Press Logo</button>
                          </div>
                        )}

                        {aboutSubTab === 'investor' && (
                          <div>
                            {(aboutConfig.INVESTOR_LOGOS || []).map((logo, idx) => (
                              <div key={idx} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const arr = [...(aboutConfig.INVESTOR_LOGOS || [])];
                                    arr.splice(idx, 1);
                                    setAboutConfig({ ...aboutConfig, INVESTOR_LOGOS: arr });
                                  }}
                                  style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: T.red, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}
                                >
                                  🗑️ Delete
                                </button>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12, width: 'calc(100% - 80px)' }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Investor Name</label>
                                    <input type="text" value={logo.name || ''} onChange={e => {
                                      const arr = [...(aboutConfig.INVESTOR_LOGOS || [])];
                                      arr[idx] = { ...logo, name: e.target.value };
                                      setAboutConfig({ ...aboutConfig, INVESTOR_LOGOS: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Logo Image URL</label>
                                    <input type="text" value={logo.logo || ''} onChange={e => {
                                      const arr = [...(aboutConfig.INVESTOR_LOGOS || [])];
                                      arr[idx] = { ...logo, logo: e.target.value };
                                      setAboutConfig({ ...aboutConfig, INVESTOR_LOGOS: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                </div>
                              </div>
                            ))}
                            <button type="button" onClick={() => {
                              const arr = [...(aboutConfig.INVESTOR_LOGOS || [])];
                              arr.push({ id: 'in-' + Date.now(), name: '', logo: '' });
                              setAboutConfig({ ...aboutConfig, INVESTOR_LOGOS: arr });
                            }} style={{ padding: '8px 16px', background: T.orangeLight, color: T.orange, border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>➕ Add Investor Logo</button>
                          </div>
                        )}
                      </div>
                        )}

                    {selectedPageName === 'press' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {pressList.map((item, idx) => (
                          <div key={idx} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' }}>
                            <button
                              type="button"
                              onClick={() => {
                                const arr = [...pressList];
                                arr.splice(idx, 1);
                                setPressList(arr);
                              }}
                              style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: T.red, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}
                            >
                              🗑️ Delete
                            </button>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12, width: 'calc(100% - 80px)' }}>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Date</label>
                                <input type="text" value={item.date || ''} onChange={e => {
                                  const arr = [...pressList];
                                  arr[idx] = { ...item, date: e.target.value };
                                  setPressList(arr);
                                }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Title</label>
                                <input type="text" value={item.title || ''} onChange={e => {
                                  const arr = [...pressList];
                                  arr[idx] = { ...item, title: e.target.value };
                                  setPressList(arr);
                                }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                              </div>
                            </div>
                            <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Excerpt</label>
                                <input type="text" value={item.excerpt || ''} onChange={e => {
                                  const arr = [...pressList];
                                  arr[idx] = { ...item, excerpt: e.target.value };
                                  setPressList(arr);
                                }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>URL</label>
                                <input type="text" value={item.url || ''} onChange={e => {
                                  const arr = [...pressList];
                                  arr[idx] = { ...item, url: e.target.value };
                                  setPressList(arr);
                                }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                              </div>
                            </div>
                          </div>
                        ))}
                        <button type="button" onClick={() => setPressList([...pressList, { date: '', title: '', excerpt: '', url: '' }])} style={{ padding: '8px 16px', background: T.orangeLight, color: T.orange, border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer', width: 'fit-content' }}>➕ Add Press Release</button>
                      </div>
                    )}

                    {selectedPageName === 'stories' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {storiesList.map((story, idx) => (
                          <div key={idx} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' }}>
                            <button
                              type="button"
                              onClick={() => {
                                const arr = [...storiesList];
                                arr.splice(idx, 1);
                                setStoriesList(arr);
                              }}
                              style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: T.red, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}
                            >
                              🗑️ Delete
                            </button>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, width: 'calc(100% - 80px)', marginBottom: 12 }}>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Type</label>
                                <select value={story.type || 'creator'} onChange={e => {
                                  const arr = [...storiesList];
                                  arr[idx] = { ...story, type: e.target.value };
                                  setStoriesList(arr);
                                }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }}>
                                  <option value="creator">Creator Story</option>
                                  <option value="brand">Brand Case Study</option>
                                </select>
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Creator Name</label>
                                <input type="text" value={story.creatorName || ''} onChange={e => {
                                  const arr = [...storiesList];
                                  arr[idx] = { ...story, creatorName: e.target.value };
                                  setStoriesList(arr);
                                }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Brand Name</label>
                                <input type="text" value={story.brandName || ''} onChange={e => {
                                  const arr = [...storiesList];
                                  arr[idx] = { ...story, brandName: e.target.value };
                                  setStoriesList(arr);
                                }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                              </div>
                            </div>
                            <div style={{ marginBottom: 12 }}>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Title</label>
                              <input type="text" value={story.title || ''} onChange={e => {
                                  const arr = [...storiesList];
                                  arr[idx] = { ...story, title: e.target.value };
                                  setStoriesList(arr);
                                }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Description</label>
                                <textarea value={story.description || ''} onChange={e => {
                                  const arr = [...storiesList];
                                  arr[idx] = { ...story, description: e.target.value };
                                  setStoriesList(arr);
                                }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, minHeight: 60, boxSizing: 'border-box' }} />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Testimonial Quote</label>
                                <textarea value={story.testimonial || ''} onChange={e => {
                                  const arr = [...storiesList];
                                  arr[idx] = { ...story, testimonial: e.target.value };
                                  setStoriesList(arr);
                                }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, minHeight: 60, boxSizing: 'border-box' }} />
                              </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Metrics Highlight (comma-separated)</label>
                                <input type="text" value={Array.isArray(story.metrics) ? story.metrics.join(', ') : story.metrics || ''} onChange={e => {
                                  const arr = [...storiesList];
                                  arr[idx] = { ...story, metrics: e.target.value.split(',').map(s => s.trim()).filter(Boolean) };
                                  setStoriesList(arr);
                                }} placeholder="e.g. 15% CTR, 3x Engagement" style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Image/Avatar URL</label>
                                <input type="text" value={story.avatar || ''} onChange={e => {
                                  const arr = [...storiesList];
                                  arr[idx] = { ...story, avatar: e.target.value };
                                  setStoriesList(arr);
                                }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                              </div>
                            </div>
                          </div>
                        ))}
                        <button type="button" onClick={() => setStoriesList([...storiesList, { id: 's-' + Date.now(), type: 'creator', brandName: '', creatorName: '', title: '', description: '', metrics: [], testimonial: '', avatar: '' }])} style={{ padding: '8px 16px', background: T.orangeLight, color: T.orange, border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer', width: 'fit-content' }}>➕ Add Story</button>
                      </div>
                    )}

                    {selectedPageName === 'ai-faq' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {aiFaqList.map((item, idx) => (
                          <div key={idx} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' }}>
                            <button
                              type="button"
                              onClick={() => {
                                const arr = [...aiFaqList];
                                arr.splice(idx, 1);
                                setAiFaqList(arr);
                              }}
                              style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: T.red, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}
                            >
                              🗑️ Delete
                            </button>
                            <div style={{ width: 'calc(100% - 80px)' }}>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>AI Prompt/Question</label>
                              <input type="text" value={item.q || ''} onChange={e => {
                                const arr = [...aiFaqList];
                                arr[idx] = { ...item, q: e.target.value };
                                setAiFaqList(arr);
                              }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, marginBottom: 12, boxSizing: 'border-box' }} />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>AI/System Answer</label>
                              <textarea value={item.a || ''} onChange={e => {
                                const arr = [...aiFaqList];
                                arr[idx] = { ...item, a: e.target.value };
                                setAiFaqList(arr);
                              }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, minHeight: 60, boxSizing: 'border-box' }} />
                            </div>
                          </div>
                        ))}
                        <button type="button" onClick={() => setAiFaqList([...aiFaqList, { q: '', a: '' }])} style={{ padding: '8px 16px', background: T.orangeLight, color: T.orange, border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer', width: 'fit-content' }}>➕ Add AI FAQ Item</button>
                      </div>
                    )}

                    {selectedPageName === 'notifications' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {notificationsList.map((item, idx) => (
                          <div key={idx} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' }}>
                            <button
                              type="button"
                              onClick={() => {
                                const arr = [...notificationsList];
                                arr.splice(idx, 1);
                                setNotificationsList(arr);
                              }}
                              style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: T.red, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}
                            >
                              🗑️ Delete
                            </button>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, width: 'calc(100% - 80px)', marginBottom: 12 }}>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Ref No.</label>
                                <input type="text" value={item.refNo || ''} onChange={e => {
                                  const arr = [...notificationsList];
                                  arr[idx] = { ...item, refNo: e.target.value };
                                  setNotificationsList(arr);
                                }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Date</label>
                                <input type="text" value={item.date || ''} onChange={e => {
                                  const arr = [...notificationsList];
                                  arr[idx] = { ...item, date: e.target.value };
                                  setNotificationsList(arr);
                                }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Department</label>
                                <input type="text" value={item.department || ''} onChange={e => {
                                  const arr = [...notificationsList];
                                  arr[idx] = { ...item, department: e.target.value };
                                  setNotificationsList(arr);
                                }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                              </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Title (EN)</label>
                                <input type="text" value={item.title || ''} onChange={e => {
                                  const arr = [...notificationsList];
                                  arr[idx] = { ...item, title: e.target.value };
                                  setNotificationsList(arr);
                                }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Title (HI)</label>
                                <input type="text" value={item.titleHi || ''} onChange={e => {
                                  const arr = [...notificationsList];
                                  arr[idx] = { ...item, titleHi: e.target.value };
                                  setNotificationsList(arr);
                                }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                              </div>
                            </div>
                            <div style={{ marginBottom: 12 }}>
                              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Description</label>
                              <textarea value={item.description || ''} onChange={e => {
                                const arr = [...notificationsList];
                                arr[idx] = { ...item, description: e.target.value };
                                  setNotificationsList(arr);
                              }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, minHeight: 60, boxSizing: 'border-box' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>PDF File Name</label>
                                <input type="text" value={item.pdfName || ''} onChange={e => {
                                  const arr = [...notificationsList];
                                  arr[idx] = { ...item, pdfName: e.target.value };
                                  setNotificationsList(arr);
                                }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Signatory Authority</label>
                                <input type="text" value={item.signatory || ''} onChange={e => {
                                  const arr = [...notificationsList];
                                  arr[idx] = { ...item, signatory: e.target.value };
                                  setNotificationsList(arr);
                                }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Status</label>
                                <select value={item.status || 'PUBLISHED'} onChange={e => {
                                  const arr = [...notificationsList];
                                  arr[idx] = { ...item, status: e.target.value };
                                  setNotificationsList(arr);
                                }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }}>
                                  <option value="PUBLISHED">Published</option>
                                  <option value="DRAFT">Draft</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        ))}
                        <button type="button" onClick={() => setNotificationsList([...notificationsList, { id: 'n-' + Date.now(), refNo: '', date: '', department: '', title: '', titleHi: '', description: '', pdfName: '', status: 'PUBLISHED', signatory: '' }])} style={{ padding: '8px 16px', background: T.orangeLight, color: T.orange, border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer', width: 'fit-content' }}>➕ Add Notification Circular</button>
                      </div>
                    )}

                    {selectedPageName === 'official' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                          {[
                            { id: 'bio', label: 'Handle Bio' },
                            { id: 'socials', label: 'Platforms' },
                            { id: 'highlights', label: 'Highlights Stories' },
                            { id: 'announcements', label: 'HQ Articles' },
                            { id: 'shards', label: 'Platform Shards' },
                            { id: 'portals', label: 'Portals & Routes' }
                          ].map(st => (
                            <button
                              key={st.id}
                              type="button"
                              onClick={() => setOfficialSubTab(st.id)}
                              style={{
                                padding: '6px 12px',
                                borderRadius: 8,
                                fontSize: 12,
                                fontWeight: 700,
                                cursor: 'pointer',
                                background: officialSubTab === st.id ? T.orange : T.card,
                                color: officialSubTab === st.id ? '#fff' : T.slate,
                                border: `1px solid ${T.border}`
                              }}
                            >
                              {st.label}
                            </button>
                          ))}
                        </div>

                        {officialSubTab === 'bio' && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6 }}>Display Name (EN)</label>
                                <input type="text" value={officialConfig.en?.displayName || ''} onChange={e => setOfficialConfig({ ...officialConfig, en: { ...(officialConfig.en || {}), displayName: e.target.value } })} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6 }}>Display Name (HI)</label>
                                <input type="text" value={officialConfig.hi?.displayName || ''} onChange={e => setOfficialConfig({ ...officialConfig, hi: { ...(officialConfig.hi || {}), displayName: e.target.value } })} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                              </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6 }}>Bio Description (EN)</label>
                                <textarea value={officialConfig.en?.bio || ''} onChange={e => setOfficialConfig({ ...officialConfig, en: { ...(officialConfig.en || {}), bio: e.target.value } })} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, minHeight: 60, boxSizing: 'border-box' }} />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6 }}>Bio Description (HI)</label>
                                <textarea value={officialConfig.hi?.bio || ''} onChange={e => setOfficialConfig({ ...officialConfig, hi: { ...(officialConfig.hi || {}), bio: e.target.value } })} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, minHeight: 60, boxSizing: 'border-box' }} />
                              </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6 }}>Base Posts Count</label>
                                <input type="number" value={officialConfig.baseStats?.posts || 0} onChange={e => setOfficialConfig({ ...officialConfig, baseStats: { ...(officialConfig.baseStats || {}), posts: parseInt(e.target.value) || 0 } })} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6 }}>Base Followers Count</label>
                                <input type="text" value={officialConfig.baseStats?.followers || ''} onChange={e => setOfficialConfig({ ...officialConfig, baseStats: { ...(officialConfig.baseStats || {}), followers: e.target.value } })} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6 }}>Base Following Count</label>
                                <input type="number" value={officialConfig.baseStats?.following || 0} onChange={e => setOfficialConfig({ ...officialConfig, baseStats: { ...(officialConfig.baseStats || {}), following: parseInt(e.target.value) || 0 } })} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                              </div>
                            </div>
                            <hr style={{ border: 'none', borderTop: `1px solid ${T.border}`, margin: '8px 0' }} />
                            <div>
                              <h5 style={{ fontSize: 12, fontWeight: 850, color: T.orange, marginBottom: 12 }}>Founder HQ Details</h5>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
                                <div>
                                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Founder Name</label>
                                  <input type="text" value={officialConfig.founder?.name || ''} onChange={e => setOfficialConfig({ ...officialConfig, founder: { ...(officialConfig.founder || {}), name: e.target.value } })} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Role</label>
                                  <input type="text" value={officialConfig.founder?.role || ''} onChange={e => setOfficialConfig({ ...officialConfig, founder: { ...(officialConfig.founder || {}), role: e.target.value } })} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Location</label>
                                  <input type="text" value={officialConfig.founder?.location || ''} onChange={e => setOfficialConfig({ ...officialConfig, founder: { ...(officialConfig.founder || {}), location: e.target.value } })} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                </div>
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Founder Vision</label>
                                <textarea value={officialConfig.founder?.vision || ''} onChange={e => setOfficialConfig({ ...officialConfig, founder: { ...(officialConfig.founder || {}), vision: e.target.value } })} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, minHeight: 50, boxSizing: 'border-box' }} />
                              </div>
                            </div>
                          </div>
                        )}

                        {officialSubTab === 'socials' && (
                          <div>
                            {(officialConfig.socialPlatforms || []).map((social, idx) => (
                              <div key={idx} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const arr = [...(officialConfig.socialPlatforms || [])];
                                    arr.splice(idx, 1);
                                    setOfficialConfig({ ...officialConfig, socialPlatforms: arr });
                                  }}
                                  style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: T.red, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}
                                >
                                  🗑️ Delete
                                </button>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 12, width: 'calc(100% - 80px)' }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Platform Name</label>
                                    <input type="text" value={social.platform || ''} onChange={e => {
                                      const arr = [...(socialPlatforms || [])];
                                      arr[idx] = { ...social, platform: e.target.value };
                                      setOfficialConfig({ ...officialConfig, socialPlatforms: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Display Handle</label>
                                    <input type="text" value={social.handle || ''} onChange={e => {
                                      const arr = [...(officialConfig.socialPlatforms || [])];
                                      arr[idx] = { ...social, handle: e.target.value };
                                      setOfficialConfig({ ...officialConfig, socialPlatforms: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>URL Link</label>
                                    <input type="text" value={social.url || ''} onChange={e => {
                                      const arr = [...(officialConfig.socialPlatforms || [])];
                                      arr[idx] = { ...social, url: e.target.value };
                                      setOfficialConfig({ ...officialConfig, socialPlatforms: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                </div>
                              </div>
                            ))}
                            <button type="button" onClick={() => {
                              const arr = [...(officialConfig.socialPlatforms || [])];
                              arr.push({ platform: '', handle: '', url: '' });
                              setOfficialConfig({ ...officialConfig, socialPlatforms: arr });
                            }} style={{ padding: '8px 16px', background: T.orangeLight, color: T.orange, border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>➕ Add Social Handle</button>
                          </div>
                        )}

                        {officialSubTab === 'highlights' && (
                          <div>
                            {(officialConfig.highlights || []).map((hl, idx) => (
                              <div key={idx} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const arr = [...(officialConfig.highlights || [])];
                                    arr.splice(idx, 1);
                                    setOfficialConfig({ ...officialConfig, highlights: arr });
                                  }}
                                  style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: T.red, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}
                                >
                                  🗑️ Delete
                                </button>
                                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 12, width: 'calc(100% - 80px)', marginBottom: 12 }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Story Label</label>
                                    <input type="text" value={hl.label || ''} onChange={e => {
                                      const arr = [...(officialConfig.highlights || [])];
                                      arr[idx] = { ...hl, label: e.target.value };
                                      setOfficialConfig({ ...officialConfig, highlights: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Icon (Lucide name)</label>
                                    <input type="text" value={hl.icon || ''} onChange={e => {
                                      const arr = [...(officialConfig.highlights || [])];
                                      arr[idx] = { ...hl, icon: e.target.value };
                                      setOfficialConfig({ ...officialConfig, highlights: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Theme Color Hex</label>
                                    <input type="text" value={hl.color || '#FF9431'} onChange={e => {
                                      const arr = [...(officialConfig.highlights || [])];
                                      arr[idx] = { ...hl, color: e.target.value };
                                      setOfficialConfig({ ...officialConfig, highlights: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 6 }}>Story Text Slide</label>
                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
                                    <input type="text" placeholder="Title" value={hl.stories?.[0]?.title || ''} onChange={e => {
                                      const arr = [...(officialConfig.highlights || [])];
                                      arr[idx] = { ...hl, stories: [{ title: e.target.value, text: hl.stories?.[0]?.text || '', date: hl.stories?.[0]?.date || 'Live' }] };
                                      setOfficialConfig({ ...officialConfig, highlights: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                    <input type="text" placeholder="Slide content text" value={hl.stories?.[0]?.text || ''} onChange={e => {
                                      const arr = [...(officialConfig.highlights || [])];
                                      arr[idx] = { ...hl, stories: [{ title: hl.stories?.[0]?.title || '', text: e.target.value, date: hl.stories?.[0]?.date || 'Live' }] };
                                      setOfficialConfig({ ...officialConfig, highlights: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                </div>
                              </div>
                            ))}
                            <button type="button" onClick={() => {
                              const arr = [...(officialConfig.highlights || [])];
                              arr.push({ id: 'hl-' + Date.now(), label: '', icon: 'Zap', color: '#FF9431', stories: [{ title: '', text: '', date: 'Live' }] });
                              setOfficialConfig({ ...officialConfig, highlights: arr });
                            }} style={{ padding: '8px 16px', background: T.orangeLight, color: T.orange, border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>➕ Add Highlight Story</button>
                          </div>
                        )}

                        {officialSubTab === 'announcements' && (
                          <div>
                            {(officialConfig.posts || []).map((post, idx) => (
                              <div key={idx} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const arr = [...(officialConfig.posts || [])];
                                    arr.splice(idx, 1);
                                    setOfficialConfig({ ...officialConfig, posts: arr });
                                  }}
                                  style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: T.red, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}
                                >
                                  🗑️ Delete
                                </button>
                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12, width: 'calc(100% - 80px)', marginBottom: 12 }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Post/Article Title</label>
                                    <input type="text" value={post.title || ''} onChange={e => {
                                      const arr = [...(officialConfig.posts || [])];
                                      arr[idx] = { ...post, title: e.target.value };
                                      setOfficialConfig({ ...officialConfig, posts: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Category</label>
                                    <input type="text" value={post.category || 'Announcements'} onChange={e => {
                                      const arr = [...(officialConfig.posts || [])];
                                      arr[idx] = { ...post, category: e.target.value };
                                      setOfficialConfig({ ...officialConfig, posts: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Read Time</label>
                                    <input type="text" value={post.readTime || '3 min read'} onChange={e => {
                                      const arr = [...(officialConfig.posts || [])];
                                      arr[idx] = { ...post, readTime: e.target.value };
                                      setOfficialConfig({ ...officialConfig, posts: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr', gap: 12, marginBottom: 12 }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Icon</label>
                                    <input type="text" value={post.icon || ''} onChange={e => {
                                      const arr = [...(officialConfig.posts || [])];
                                      arr[idx] = { ...post, icon: e.target.value };
                                      setOfficialConfig({ ...officialConfig, posts: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Cover Poster Image URL</label>
                                    <input type="text" value={post.image || ''} onChange={e => {
                                      const arr = [...(officialConfig.posts || [])];
                                      arr[idx] = { ...post, image: e.target.value };
                                      setOfficialConfig({ ...officialConfig, posts: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Post Date</label>
                                    <input type="text" value={post.date || ''} onChange={e => {
                                      const arr = [...(officialConfig.posts || [])];
                                      arr[idx] = { ...post, date: e.target.value };
                                      setOfficialConfig({ ...officialConfig, posts: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                </div>
                                <div style={{ marginBottom: 12 }}>
                                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Summary Excerpt</label>
                                  <input type="text" value={post.summary || ''} onChange={e => {
                                    const arr = [...(officialConfig.posts || [])];
                                    arr[idx] = { ...post, summary: e.target.value };
                                    setOfficialConfig({ ...officialConfig, posts: arr });
                                  }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Full Content Markdown</label>
                                  <textarea value={post.fullContent || ''} onChange={e => {
                                    const arr = [...(officialConfig.posts || [])];
                                    arr[idx] = { ...post, fullContent: e.target.value };
                                    setOfficialConfig({ ...officialConfig, posts: arr });
                                  }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, minHeight: 80, boxSizing: 'border-box' }} />
                                </div>
                              </div>
                            ))}
                            <button type="button" onClick={() => {
                              const arr = [...(officialConfig.posts || [])];
                              arr.push({ id: 'po-' + Date.now(), title: '', category: 'Announcements', date: 'June 2026', readTime: '3 min read', icon: 'Code2', color: '#0f172a', image: '', summary: '', fullContent: '' });
                              setOfficialConfig({ ...officialConfig, posts: arr });
                            }} style={{ padding: '8px 16px', background: T.orangeLight, color: T.orange, border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>➕ Add HQ Article</button>
                          </div>
                        )}

                        {officialSubTab === 'shards' && (
                          <div>
                            {(officialConfig.shards || []).map((sh, idx) => (
                              <div key={idx} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const arr = [...(officialConfig.shards || [])];
                                    arr.splice(idx, 1);
                                    setOfficialConfig({ ...officialConfig, shards: arr });
                                  }}
                                  style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: T.red, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}
                                >
                                  🗑️ Delete
                                </button>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', gap: 12, width: 'calc(100% - 80px)' }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Shard ID</label>
                                    <input type="text" value={sh.id || ''} onChange={e => {
                                      const arr = [...(officialConfig.shards || [])];
                                      arr[idx] = { ...sh, id: e.target.value };
                                      setOfficialConfig({ ...officialConfig, shards: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Region Name</label>
                                    <input type="text" value={sh.region || ''} onChange={e => {
                                      const arr = [...(officialConfig.shards || [])];
                                      arr[idx] = { ...sh, region: e.target.value };
                                      setOfficialConfig({ ...officialConfig, shards: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Load Factor</label>
                                    <input type="text" value={sh.load || '70%'} onChange={e => {
                                      const arr = [...(officialConfig.shards || [])];
                                      arr[idx] = { ...sh, load: e.target.value };
                                      setOfficialConfig({ ...officialConfig, shards: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Status</label>
                                    <input type="text" value={sh.status || 'Active'} onChange={e => {
                                      const arr = [...(officialConfig.shards || [])];
                                      arr[idx] = { ...sh, status: e.target.value };
                                      setOfficialConfig({ ...officialConfig, shards: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                </div>
                              </div>
                            ))}
                            <button type="button" onClick={() => {
                              const arr = [...(officialConfig.shards || [])];
                              arr.push({ id: '', region: '', status: 'Active', latency: '0ms', load: '50%' });
                              setOfficialConfig({ ...officialConfig, shards: arr });
                            }} style={{ padding: '8px 16px', background: T.orangeLight, color: T.orange, border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>➕ Add Platform Shard</button>
                          </div>
                        )}

                        {officialSubTab === 'portals' && (
                          <div>
                            {(officialConfig.portals || []).map((pt, idx) => (
                              <div key={idx} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const arr = [...(officialConfig.portals || [])];
                                    arr.splice(idx, 1);
                                    setOfficialConfig({ ...officialConfig, portals: arr });
                                  }}
                                  style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: T.red, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}
                                >
                                  🗑️ Delete
                                </button>
                                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 1fr', gap: 12, width: 'calc(100% - 80px)', marginBottom: 12 }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Portal Title</label>
                                    <input type="text" value={pt.title || ''} onChange={e => {
                                      const arr = [...(officialConfig.portals || [])];
                                      arr[idx] = { ...pt, title: e.target.value };
                                      setOfficialConfig({ ...officialConfig, portals: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Portal Route Path</label>
                                    <input type="text" value={pt.route || ''} onChange={e => {
                                      const arr = [...(officialConfig.portals || [])];
                                      arr[idx] = { ...pt, route: e.target.value };
                                      setOfficialConfig({ ...officialConfig, portals: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Tag Category</label>
                                    <input type="text" value={pt.tag || ''} onChange={e => {
                                      const arr = [...(officialConfig.portals || [])];
                                      arr[idx] = { ...pt, tag: e.target.value };
                                      setOfficialConfig({ ...officialConfig, portals: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12 }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Portal Description</label>
                                    <input type="text" value={pt.description || ''} onChange={e => {
                                      const arr = [...(officialConfig.portals || [])];
                                      arr[idx] = { ...pt, description: e.target.value };
                                      setOfficialConfig({ ...officialConfig, portals: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Icon Name</label>
                                    <input type="text" value={pt.iconName || pt.icon || ''} onChange={e => {
                                      const arr = [...(officialConfig.portals || [])];
                                      arr[idx] = { ...pt, iconName: e.target.value, icon: e.target.value };
                                      setOfficialConfig({ ...officialConfig, portals: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Accent Color Hex</label>
                                    <input type="text" value={pt.color || '#3B82F6'} onChange={e => {
                                      const arr = [...(officialConfig.portals || [])];
                                      arr[idx] = { ...pt, color: e.target.value };
                                      setOfficialConfig({ ...officialConfig, portals: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                </div>
                              </div>
                            ))}
                            <button type="button" onClick={() => {
                              const arr = [...(officialConfig.portals || [])];
                              arr.push({ id: 'po-' + Date.now(), title: '', description: '', tag: 'Ecosystem', route: '/', iconName: 'Globe', color: '#FF9431' });
                              setOfficialConfig({ ...officialConfig, portals: arr });
                            }} style={{ padding: '8px 16px', background: T.orangeLight, color: T.orange, border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>➕ Add Ecosystem Portal</button>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedPageName === 'verify-guide' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                          {[
                            { id: 'creator', label: '🙋 Creator Steps' },
                            { id: 'brand', label: '💼 Brand Steps' }
                          ].map(st => (
                            <button
                              key={st.id}
                              type="button"
                              onClick={() => setVerifyGuideSubTab(st.id)}
                              style={{
                                padding: '6px 12px',
                                borderRadius: 8,
                                fontSize: 12,
                                fontWeight: 700,
                                cursor: 'pointer',
                                background: verifyGuideSubTab === st.id ? T.orange : T.card,
                                color: verifyGuideSubTab === st.id ? '#fff' : T.slate,
                                border: `1px solid ${T.border}`
                              }}
                            >
                              {st.label}
                            </button>
                          ))}
                        </div>

                        {verifyGuideSubTab === 'creator' ? (
                          <div>
                            {(verifyGuideConfig.creatorSteps || []).map((step, idx) => (
                              <div key={idx} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const arr = [...(verifyGuideConfig.creatorSteps || [])];
                                    arr.splice(idx, 1);
                                    setVerifyGuideConfig({ ...verifyGuideConfig, creatorSteps: arr });
                                  }}
                                  style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: T.red, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}
                                >
                                  🗑️ Delete
                                </button>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', gap: 12, width: 'calc(100% - 80px)', marginBottom: 12 }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Step No.</label>
                                    <input type="text" value={step.n || ''} onChange={e => {
                                      const arr = [...(verifyGuideConfig.creatorSteps || [])];
                                      arr[idx] = { ...step, n: e.target.value };
                                      setVerifyGuideConfig({ ...verifyGuideConfig, creatorSteps: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Step Title</label>
                                    <input type="text" value={step.title || ''} onChange={e => {
                                      const arr = [...(verifyGuideConfig.creatorSteps || [])];
                                      arr[idx] = { ...step, title: e.target.value };
                                      setVerifyGuideConfig({ ...verifyGuideConfig, creatorSteps: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Icon</label>
                                    <input type="text" value={step.iconName || step.icon || ''} onChange={e => {
                                      const arr = [...(verifyGuideConfig.creatorSteps || [])];
                                      arr[idx] = { ...step, iconName: e.target.value, icon: e.target.value };
                                      setVerifyGuideConfig({ ...verifyGuideConfig, creatorSteps: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Color Hex</label>
                                    <input type="text" value={step.color || '#FF9431'} onChange={e => {
                                      const arr = [...(verifyGuideConfig.creatorSteps || [])];
                                      arr[idx] = { ...step, color: e.target.value };
                                      setVerifyGuideConfig({ ...verifyGuideConfig, creatorSteps: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Description</label>
                                  <textarea value={step.desc || ''} onChange={e => {
                                    const arr = [...(verifyGuideConfig.creatorSteps || [])];
                                    arr[idx] = { ...step, desc: e.target.value };
                                    setVerifyGuideConfig({ ...verifyGuideConfig, creatorSteps: arr });
                                  }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, minHeight: 50, boxSizing: 'border-box' }} />
                                </div>
                              </div>
                            ))}
                            <button type="button" onClick={() => {
                              const arr = [...(verifyGuideConfig.creatorSteps || [])];
                              arr.push({ n: '01', title: '', iconName: 'Zap', color: '#FF9431', desc: '' });
                              setVerifyGuideConfig({ ...verifyGuideConfig, creatorSteps: arr });
                            }} style={{ padding: '8px 16px', background: T.orangeLight, color: T.orange, border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>➕ Add Creator Step</button>
                          </div>
                        ) : (
                          <div>
                            {(verifyGuideConfig.brandSteps || []).map((step, idx) => (
                              <div key={idx} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const arr = [...(verifyGuideConfig.brandSteps || [])];
                                    arr.splice(idx, 1);
                                    setVerifyGuideConfig({ ...verifyGuideConfig, brandSteps: arr });
                                  }}
                                  style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: T.red, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}
                                >
                                  🗑️ Delete
                                </button>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', gap: 12, width: 'calc(100% - 80px)', marginBottom: 12 }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Step No.</label>
                                    <input type="text" value={step.n || ''} onChange={e => {
                                      const arr = [...(verifyGuideConfig.brandSteps || [])];
                                      arr[idx] = { ...step, n: e.target.value };
                                      setVerifyGuideConfig({ ...verifyGuideConfig, brandSteps: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Step Title</label>
                                    <input type="text" value={step.title || ''} onChange={e => {
                                      const arr = [...(verifyGuideConfig.brandSteps || [])];
                                      arr[idx] = { ...step, title: e.target.value };
                                      setVerifyGuideConfig({ ...verifyGuideConfig, brandSteps: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Icon</label>
                                    <input type="text" value={step.iconName || step.icon || ''} onChange={e => {
                                      const arr = [...(verifyGuideConfig.brandSteps || [])];
                                      arr[idx] = { ...step, iconName: e.target.value, icon: e.target.value };
                                      setVerifyGuideConfig({ ...verifyGuideConfig, brandSteps: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Color Hex</label>
                                    <input type="text" value={step.color || '#10B981'} onChange={e => {
                                      const arr = [...(verifyGuideConfig.brandSteps || [])];
                                      arr[idx] = { ...step, color: e.target.value };
                                      setVerifyGuideConfig({ ...verifyGuideConfig, brandSteps: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Description</label>
                                  <textarea value={step.desc || ''} onChange={e => {
                                    const arr = [...(verifyGuideConfig.brandSteps || [])];
                                    arr[idx] = { ...step, desc: e.target.value };
                                    setVerifyGuideConfig({ ...verifyGuideConfig, brandSteps: arr });
                                  }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, minHeight: 50, boxSizing: 'border-box' }} />
                                </div>
                              </div>
                            ))}
                            <button type="button" onClick={() => {
                              const arr = [...(verifyGuideConfig.brandSteps || [])];
                              arr.push({ n: '01', title: '', iconName: 'Users', color: '#10B981', desc: '' });
                              setVerifyGuideConfig({ ...verifyGuideConfig, brandSteps: arr });
                            }} style={{ padding: '8px 16px', background: T.orangeLight, color: T.orange, border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>➕ Add Brand Step</button>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedPageName === 'ambassador' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                          {[
                            { id: 'perks', label: '🎁 Perks & Benefits' },
                            { id: 'steps', label: '🚦 Recruitment Steps' },
                            { id: 'faqs', label: '❓ Ambassador FAQs' }
                          ].map(st => (
                            <button
                              key={st.id}
                              type="button"
                              onClick={() => setAmbassadorSubTab(st.id)}
                              style={{
                                padding: '6px 12px',
                                borderRadius: 8,
                                fontSize: 12,
                                fontWeight: 700,
                                cursor: 'pointer',
                                background: ambassadorSubTab === st.id ? T.orange : T.card,
                                color: ambassadorSubTab === st.id ? '#fff' : T.slate,
                                border: `1px solid ${T.border}`
                              }}
                            >
                              {st.label}
                            </button>
                          ))}
                        </div>

                        {ambassadorSubTab === 'perks' && (
                          <div>
                            {(ambassadorConfig.perks || []).map((perk, idx) => (
                              <div key={idx} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const arr = [...(ambassadorConfig.perks || [])];
                                    arr.splice(idx, 1);
                                    setAmbassadorConfig({ ...ambassadorConfig, perks: arr });
                                  }}
                                  style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: T.red, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}
                                >
                                  🗑️ Delete
                                </button>
                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12, width: 'calc(100% - 80px)', marginBottom: 12 }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Perk Title</label>
                                    <input type="text" value={perk.title || ''} onChange={e => {
                                      const arr = [...(ambassadorConfig.perks || [])];
                                      arr[idx] = { ...perk, title: e.target.value };
                                      setAmbassadorConfig({ ...ambassadorConfig, perks: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Icon</label>
                                    <input type="text" value={perk.iconName || perk.icon || ''} onChange={e => {
                                      const arr = [...(ambassadorConfig.perks || [])];
                                      arr[idx] = { ...perk, iconName: e.target.value, icon: e.target.value };
                                      setAmbassadorConfig({ ...ambassadorConfig, perks: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Color Hex</label>
                                    <input type="text" value={perk.color || '#FF9431'} onChange={e => {
                                      const arr = [...(ambassadorConfig.perks || [])];
                                      arr[idx] = { ...perk, color: e.target.value };
                                      setAmbassadorConfig({ ...ambassadorConfig, perks: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Description</label>
                                  <textarea value={perk.desc || ''} onChange={e => {
                                    const arr = [...(ambassadorConfig.perks || [])];
                                    arr[idx] = { ...perk, desc: e.target.value };
                                    setAmbassadorConfig({ ...ambassadorConfig, perks: arr });
                                  }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, minHeight: 50, boxSizing: 'border-box' }} />
                                </div>
                              </div>
                            ))}
                            <button type="button" onClick={() => {
                              const arr = [...(ambassadorConfig.perks || [])];
                              arr.push({ id: 'pe-' + Date.now(), title: '', iconName: 'Gift', color: '#10B981', desc: '' });
                              setAmbassadorConfig({ ...ambassadorConfig, perks: arr });
                            }} style={{ padding: '8px 16px', background: T.orangeLight, color: T.orange, border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>➕ Add Perk Card</button>
                          </div>
                        )}

                        {ambassadorSubTab === 'steps' && (
                          <div>
                            {(ambassadorConfig.steps || []).map((step, idx) => (
                              <div key={idx} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const arr = [...(ambassadorConfig.steps || [])];
                                    arr.splice(idx, 1);
                                    setAmbassadorConfig({ ...ambassadorConfig, steps: arr });
                                  }}
                                  style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: T.red, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}
                                >
                                  🗑️ Delete
                                </button>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 12, width: 'calc(100% - 80px)', marginBottom: 12 }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Step Num</label>
                                    <input type="text" value={step.num || ''} onChange={e => {
                                      const arr = [...(ambassadorConfig.steps || [])];
                                      arr[idx] = { ...step, num: e.target.value };
                                      setAmbassadorConfig({ ...ambassadorConfig, steps: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Step Title</label>
                                    <input type="text" value={step.title || ''} onChange={e => {
                                      const arr = [...(ambassadorConfig.steps || [])];
                                      arr[idx] = { ...step, title: e.target.value };
                                      setAmbassadorConfig({ ...ambassadorConfig, steps: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Description</label>
                                  <textarea value={step.desc || ''} onChange={e => {
                                    const arr = [...(ambassadorConfig.steps || [])];
                                    arr[idx] = { ...step, desc: e.target.value };
                                    setAmbassadorConfig({ ...ambassadorConfig, steps: arr });
                                  }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, minHeight: 50, boxSizing: 'border-box' }} />
                                </div>
                              </div>
                            ))}
                            <button type="button" onClick={() => {
                              const arr = [...(ambassadorConfig.steps || [])];
                              arr.push({ num: '01', title: '', desc: '' });
                              setAmbassadorConfig({ ...ambassadorConfig, steps: arr });
                            }} style={{ padding: '8px 16px', background: T.orangeLight, color: T.orange, border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>➕ Add Recruitment Step</button>
                          </div>
                        )}

                        {ambassadorSubTab === 'faqs' && (
                          <div>
                            {(ambassadorConfig.faqs || []).map((faq, idx) => (
                              <div key={idx} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const arr = [...(ambassadorConfig.faqs || [])];
                                    arr.splice(idx, 1);
                                    setAmbassadorConfig({ ...ambassadorConfig, faqs: arr });
                                  }}
                                  style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: T.red, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}
                                >
                                  🗑️ Delete
                                </button>
                                <div style={{ width: 'calc(100% - 80px)', marginBottom: 12 }}>
                                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Question</label>
                                  <input type="text" value={faq.q || ''} onChange={e => {
                                    const arr = [...(ambassadorConfig.faqs || [])];
                                    arr[idx] = { ...faq, q: e.target.value };
                                    setAmbassadorConfig({ ...ambassadorConfig, faqs: arr });
                                  }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Answer</label>
                                  <textarea value={faq.a || ''} onChange={e => {
                                    const arr = [...(ambassadorConfig.faqs || [])];
                                    arr[idx] = { ...faq, a: e.target.value };
                                    setAmbassadorConfig({ ...ambassadorConfig, faqs: arr });
                                  }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, minHeight: 60, boxSizing: 'border-box' }} />
                                </div>
                              </div>
                            ))}
                            <button type="button" onClick={() => {
                              const arr = [...(ambassadorConfig.faqs || [])];
                              arr.push({ q: '', a: '' });
                              setAmbassadorConfig({ ...ambassadorConfig, faqs: arr });
                            }} style={{ padding: '8px 16px', background: T.orangeLight, color: T.orange, border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>➕ Add FAQ Item</button>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedPageName === 'contact' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                          {[
                            { id: 'advantages', label: '⭐ Unique Advantages' },
                            { id: 'hubs', label: '🏢 Regional Hubs' },
                            { id: 'methods', label: '📞 Contact Methods' },
                            { id: 'faqs', label: '❓ FAQ Accordions' }
                          ].map(st => (
                            <button
                              key={st.id}
                              type="button"
                              onClick={() => setContactSubTab(st.id)}
                              style={{
                                padding: '6px 12px',
                                borderRadius: 8,
                                fontSize: 12,
                                fontWeight: 700,
                                cursor: 'pointer',
                                background: contactSubTab === st.id ? T.orange : T.card,
                                color: contactSubTab === st.id ? '#fff' : T.slate,
                                border: `1px solid ${T.border}`
                              }}
                            >
                              {st.label}
                            </button>
                          ))}
                        </div>

                        {contactSubTab === 'advantages' && (
                          <div>
                            {(contactConfig.advantages || []).map((adv, idx) => (
                              <div key={idx} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const arr = [...(contactConfig.advantages || [])];
                                    arr.splice(idx, 1);
                                    setContactConfig({ ...contactConfig, advantages: arr });
                                  }}
                                  style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: T.red, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}
                                >
                                  🗑️ Delete
                                </button>
                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr', gap: 12, width: 'calc(100% - 80px)', marginBottom: 12 }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Advantage Title</label>
                                    <input type="text" value={adv.title || ''} onChange={e => {
                                      const arr = [...(contactConfig.advantages || [])];
                                      arr[idx] = { ...adv, title: e.target.value };
                                      setContactConfig({ ...contactConfig, advantages: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Icon</label>
                                    <input type="text" value={adv.iconName || adv.icon || ''} onChange={e => {
                                      const arr = [...(contactConfig.advantages || [])];
                                      arr[idx] = { ...adv, iconName: e.target.value, icon: e.target.value };
                                      setContactConfig({ ...contactConfig, advantages: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Description</label>
                                  <textarea value={adv.desc || ''} onChange={e => {
                                    const arr = [...(contactConfig.advantages || [])];
                                    arr[idx] = { ...adv, desc: e.target.value };
                                    setContactConfig({ ...contactConfig, advantages: arr });
                                  }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, minHeight: 50, boxSizing: 'border-box' }} />
                                </div>
                              </div>
                            ))}
                            <button type="button" onClick={() => {
                              const arr = [...(contactConfig.advantages || [])];
                              arr.push({ id: 'ad-' + Date.now(), title: '', iconName: 'Mail', desc: '' });
                              setContactConfig({ ...contactConfig, advantages: arr });
                            }} style={{ padding: '8px 16px', background: T.orangeLight, color: T.orange, border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>➕ Add Advantage Card</button>
                          </div>
                        )}

                        {contactSubTab === 'hubs' && (
                          <div>
                            {(contactConfig.regionalHubs || []).map((hub, idx) => (
                              <div key={idx} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const arr = [...(contactConfig.regionalHubs || [])];
                                    arr.splice(idx, 1);
                                    setContactConfig({ ...contactConfig, regionalHubs: arr });
                                  }}
                                  style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: T.red, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}
                                >
                                  🗑️ Delete
                                </button>
                                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 12, width: 'calc(100% - 80px)', marginBottom: 12 }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>City</label>
                                    <input type="text" value={hub.city || ''} onChange={e => {
                                      const arr = [...(contactConfig.regionalHubs || [])];
                                      arr[idx] = { ...hub, city: e.target.value };
                                      setContactConfig({ ...contactConfig, regionalHubs: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>State</label>
                                    <input type="text" value={hub.state || ''} onChange={e => {
                                      const arr = [...(contactConfig.regionalHubs || [])];
                                      arr[idx] = { ...hub, state: e.target.value };
                                      setContactConfig({ ...contactConfig, regionalHubs: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Hub Type</label>
                                    <input type="text" value={hub.type || ''} onChange={e => {
                                      const arr = [...(contactConfig.regionalHubs || [])];
                                      arr[idx] = { ...hub, type: e.target.value };
                                      setContactConfig({ ...contactConfig, regionalHubs: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Focus Operations</label>
                                  <input type="text" value={hub.focus || ''} onChange={e => {
                                    const arr = [...(contactConfig.regionalHubs || [])];
                                    arr[idx] = { ...hub, focus: e.target.value };
                                    setContactConfig({ ...contactConfig, regionalHubs: arr });
                                  }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                </div>
                              </div>
                            ))}
                            <button type="button" onClick={() => {
                              const arr = [...(contactConfig.regionalHubs || [])];
                              arr.push({ city: '', state: '', type: 'Regional Hub', focus: '' });
                              setContactConfig({ ...contactConfig, regionalHubs: arr });
                            }} style={{ padding: '8px 16px', background: T.orangeLight, color: T.orange, border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>➕ Add Regional Hub</button>
                          </div>
                        )}

                        {contactSubTab === 'methods' && (
                          <div>
                            {(contactConfig.contactMethods || []).map((method, idx) => (
                              <div key={idx} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const arr = [...(contactConfig.contactMethods || [])];
                                    arr.splice(idx, 1);
                                    setContactConfig({ ...contactConfig, contactMethods: arr });
                                  }}
                                  style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: T.red, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}
                                >
                                  🗑️ Delete
                                </button>
                                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 1fr', gap: 12, width: 'calc(100% - 80px)', marginBottom: 12 }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Method Title</label>
                                    <input type="text" value={method.title || ''} onChange={e => {
                                      const arr = [...(contactConfig.contactMethods || [])];
                                      arr[idx] = { ...method, title: e.target.value };
                                      setContactConfig({ ...contactConfig, contactMethods: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Contact Detail Value</label>
                                    <input type="text" value={method.value || ''} onChange={e => {
                                      const arr = [...(contactConfig.contactMethods || [])];
                                      arr[idx] = { ...method, value: e.target.value };
                                      setContactConfig({ ...contactConfig, contactMethods: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Icon Name</label>
                                    <input type="text" value={method.iconName || method.icon || ''} onChange={e => {
                                      const arr = [...(contactConfig.contactMethods || [])];
                                      arr[idx] = { ...method, iconName: e.target.value, icon: e.target.value };
                                      setContactConfig({ ...contactConfig, contactMethods: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 12 }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Sub-Label Description</label>
                                    <input type="text" value={method.sub || ''} onChange={e => {
                                      const arr = [...(contactConfig.contactMethods || [])];
                                      arr[idx] = { ...method, sub: e.target.value };
                                      setContactConfig({ ...contactConfig, contactMethods: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Redirect Link URL</label>
                                    <input type="text" value={method.link || ''} onChange={e => {
                                      const arr = [...(contactConfig.contactMethods || [])];
                                      arr[idx] = { ...method, link: e.target.value };
                                      setContactConfig({ ...contactConfig, contactMethods: arr });
                                    }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                  </div>
                                </div>
                              </div>
                            ))}
                            <button type="button" onClick={() => {
                              const arr = [...(contactConfig.contactMethods || [])];
                              arr.push({ title: '', value: '', iconName: 'Mail', sub: '', link: '' });
                              setContactConfig({ ...contactConfig, contactMethods: arr });
                            }} style={{ padding: '8px 16px', background: T.orangeLight, color: T.orange, border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>➕ Add Contact Method</button>
                          </div>
                        )}

                        {contactSubTab === 'faqs' && (
                          <div>
                            {(contactConfig.faqs || []).map((faq, idx) => (
                              <div key={idx} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, marginBottom: 12, position: 'relative' }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const arr = [...(contactConfig.faqs || [])];
                                    arr.splice(idx, 1);
                                    setContactConfig({ ...contactConfig, faqs: arr });
                                  }}
                                  style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: T.red, border: 'none', borderRadius: 6, fontSize: 11, cursor: 'pointer' }}
                                >
                                  🗑️ Delete
                                </button>
                                <div style={{ width: 'calc(100% - 80px)', marginBottom: 12 }}>
                                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Question</label>
                                  <input type="text" value={faq.q || ''} onChange={e => {
                                    const arr = [...(contactConfig.faqs || [])];
                                    arr[idx] = { ...faq, q: e.target.value };
                                    setContactConfig({ ...contactConfig, faqs: arr });
                                  }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: T.slate, marginBottom: 4 }}>Answer</label>
                                  <textarea value={faq.a || ''} onChange={e => {
                                    const arr = [...(contactConfig.faqs || [])];
                                    arr[idx] = { ...faq, a: e.target.value };
                                    setContactConfig({ ...contactConfig, faqs: arr });
                                  }} style={{ width: '100%', padding: '8px 12px', border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 13, background: T.bg, minHeight: 60, boxSizing: 'border-box' }} />
                                </div>
                              </div>
                            ))}
                            <button type="button" onClick={() => {
                              const arr = [...(contactConfig.faqs || [])];
                              arr.push({ q: '', a: '' });
                              setContactConfig({ ...contactConfig, faqs: arr });
                            }} style={{ padding: '8px 16px', background: T.orangeLight, color: T.orange, border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>➕ Add FAQ Accordion</button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleSavePageConfig}
                  style={{
                    marginTop: 24,
                    padding: '12px 28px',
                    background: T.orange,
                    color: '#fff',
                    border: 'none',
                    borderRadius: 12,
                    fontWeight: 800,
                    fontSize: 14,
                    cursor: 'pointer',
                    boxShadow: `0 4px 14px ${T.orange}30`
                  }}
                >
                  Save Page Content
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
