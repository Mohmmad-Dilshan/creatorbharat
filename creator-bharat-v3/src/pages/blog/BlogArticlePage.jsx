import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  Bookmark,
  ArrowLeft,
  Share2,
  Clock,
  Calendar,
  ThumbsUp,
  Zap,
  Check,
  ChevronRight,
  Hash,
  Copy,
  ChevronUp,
  Play,
  RotateCcw,
  Volume2,
  CheckCircle
} from 'lucide-react';

import { Bdg, Btn } from '../../components/Primitives';
import { 
  TwitterIcon, 
  LinkedinIcon, 
  FacebookIcon 
} from '../../components/icons/SocialIcons';
import { useParams, Link } from 'react-router-dom';
import { blogData } from '../../data/blogData';

const BRAND_ORANGE = '#FF9431';

/** 
 * PROFESSIONAL ARTICLE VIEW
 * - Dynamic Reading Time
 * - Sticky Back Navigation
 * - Floating Back-to-top
 * - Premium Typography
 */

const Breadcrumbs = ({ category, title, mob }) => (
  <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '30px', color: '#94a3b8' }}>
    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
    <ChevronRight size={12} />
    <Link to="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>Journal</Link>
    <ChevronRight size={12} />
    <span style={{ color: BRAND_ORANGE }}>{category}</span>
    {!mob && (
      <>
        <ChevronRight size={12} />
        <span style={{ color: '#000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{title}</span>
      </>
    )}
  </nav>
);

Breadcrumbs.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  mob: PropTypes.bool.isRequired
};

const AuthorCard = ({ author, mob }) => (
  <motion.section 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    style={{ margin: '80px 0', padding: '50px', border: '1px solid #000', background: '#fff', position: 'relative', boxShadow: '20px 20px 0px #f1f5f9' }}
  >
    <div style={{ position: 'absolute', top: '-20px', left: '40px', background: '#000', color: '#fff', padding: '8px 20px', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
      The Author
    </div>
    <Link 
      to={author?.name === 'CreatorBharat' ? "/official-profile" : "#"} 
      style={{ 
        textDecoration: 'none', 
        cursor: author?.name === 'CreatorBharat' ? 'pointer' : 'default',
        display: 'flex', gap: '40px', alignItems: 'center', flexDirection: mob ? 'column' : 'row', textAlign: mob ? 'center' : 'left' 
      }}
    >
        <motion.div 
          whileHover={author?.name === 'CreatorBharat' ? { scale: 1.05 } : {}}
          style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '38px', flexShrink: 0, border: `3px solid ${BRAND_ORANGE}`, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        >
        {author?.avatar}
        </motion.div>
      <div>
        <h4 style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', fontWeight: 900, marginBottom: '15px', color: '#000' }}>
          {author?.name}
          {author?.name === 'CreatorBharat' && <CheckCircle size={18} color={BRAND_ORANGE} style={{ marginLeft: '10px' }} />}
        </h4>
        <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.7, marginBottom: '20px' }}>{author?.bio}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: mob ? 'center' : 'flex-start', gap: '20px' }}>
          <div style={{ fontSize: '14px', fontWeight: 900, color: BRAND_ORANGE, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{author?.role}</div>
          <span style={{ color: '#e2e8f0', height: '15px', width: '1px', background: '#e2e8f0' }}></span>
          <div style={{ display: 'flex', gap: '15px' }}>
             <motion.div whileHover={{ y: -3 }}><TwitterIcon size={16} style={{ cursor: 'pointer', color: '#64748b' }} /></motion.div>
             <motion.div whileHover={{ y: -3 }}><LinkedinIcon size={16} style={{ cursor: 'pointer', color: '#64748b' }} /></motion.div>
          </div>
        </div>
      </div>
    </Link>
  </motion.section>
);

AuthorCard.propTypes = {
  author: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    bio: PropTypes.string,
    role: PropTypes.string
  }).isRequired,
  mob: PropTypes.bool.isRequired
};

const CommentsSection = ({ mob }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    { id: 'c1', name: 'Arjun Mehta', date: '2 hours ago', text: 'Incredible insights! We are definitely seeing this shift in our logistics data as well. Tier 3 is the new Tier 1.', avatar: 'AM', likes: 12, isLiked: false },
    { id: 'c2', name: 'Priya Sharma', date: '5 hours ago', text: 'The part about cultural resonance is so true. Standard global strategies just don’t work in Bharat.', avatar: 'PS', likes: 8, isLiked: false }
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleLike = (id) => {
    setComments(prev => prev.map(c => 
      c.id === id ? { ...c, likes: c.isLiked ? c.likes - 1 : c.likes + 1, isLiked: !c.isLiked } : c
    ));
  };

  const handleDelete = (id) => {
    setComments(prev => prev.filter(c => c.id !== id));
  };

  const startEdit = (comment) => {
    setEditingId(comment.id);
    setEditText(comment.text);
  };

  const saveEdit = () => {
    setComments(prev => prev.map(c => c.id === editingId ? { ...c, text: editText } : c));
    setEditingId(null);
  };

  const handlePost = () => {
    if (!newComment.trim()) return;
    setComments([{ id: Date.now().toString(), name: 'You (Guest)', date: 'Just now', text: newComment, avatar: 'U' }, ...comments]);
    setNewComment('');
  };

  return (
    <section style={{ 
      marginTop: '100px', 
      padding: mob ? '30px 20px' : '60px 50px', 
      border: '1px solid #000', 
      background: '#fff', 
      position: 'relative', 
      boxShadow: '20px 20px 0px #f1f5f9' 
    }}>
      <div style={{ 
        position: 'absolute', 
        top: '-20px', 
        left: mob ? '20px' : '40px', 
        background: '#000', 
        color: '#fff', 
        padding: '8px 25px', 
        fontSize: '12px', 
        fontWeight: 900, 
        textTransform: 'uppercase', 
        letterSpacing: '0.2em' 
      }}>
        Reader Discussion ({comments.length})
      </div>

      <div style={{ marginBottom: '50px' }}>
        <h4 style={{ fontFamily: '"Playfair Display", serif', fontSize: '24px', fontWeight: 900, marginBottom: '20px' }}>Join the Conversation</h4>
        <textarea 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="What's your take on the Bharat revolution?" 
          style={{ 
            width: '100%', 
            height: '120px', 
            padding: '20px', 
            border: '1px solid #e2e8f0', 
            borderRadius: '12px', 
            fontSize: '16px', 
            fontFamily: 'inherit',
            resize: 'none',
            marginBottom: '20px',
            outline: 'none',
            transition: 'border-color 0.3s'
          }}
          onFocus={(e) => e.target.style.borderColor = BRAND_ORANGE}
          onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={handlePost} style={{ padding: '12px 30px', background: BRAND_ORANGE, color: '#fff', border: 'none', fontWeight: 900, cursor: 'pointer', borderRadius: '8px' }}>POST COMMENT</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {comments.map((comment) => (
          <div key={comment.id} style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '40px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '14px', flexShrink: 0 }}>
              {comment.avatar}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontWeight: 900, fontSize: '15px' }}>{comment.name}</span>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>{comment.date}</span>
              </div>
              
              {editingId === comment.id ? (
                <div style={{ marginBottom: '15px' }}>
                  <textarea 
                    value={editText} 
                    onChange={(e) => setEditText(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #FF9431', outline: 'none', minHeight: '60px' }}
                  />
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button onClick={saveEdit} style={{ background: BRAND_ORANGE, color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 900, cursor: 'pointer' }}>SAVE</button>
                    <button onClick={() => setEditingId(null)} style={{ background: '#f1f5f9', border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 900, cursor: 'pointer' }}>CANCEL</button>
                  </div>
                </div>
              ) : (
                <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, margin: 0 }}>{comment.text}</p>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '12px' }}>
                <button 
                  onClick={() => handleLike(comment.id)}
                  style={{ 
                    background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', 
                    fontSize: '12px', fontWeight: 800, color: comment.isLiked ? BRAND_ORANGE : '#64748b', cursor: 'pointer' 
                  }}
                >
                  <ThumbsUp size={14} fill={comment.isLiked ? BRAND_ORANGE : 'none'} /> {comment.likes}
                </button>
                <button style={{ background: 'none', border: 'none', fontSize: '12px', fontWeight: 800, color: '#64748b', cursor: 'pointer' }}>REPLY</button>
                
                {comment.avatar === 'U' && !editingId && (
                  <>
                    <button onClick={() => startEdit(comment)} style={{ background: 'none', border: 'none', fontSize: '11px', fontWeight: 900, color: BRAND_ORANGE, cursor: 'pointer', marginLeft: 'auto' }}>EDIT</button>
                    <button onClick={() => handleDelete(comment.id)} style={{ background: 'none', border: 'none', fontSize: '11px', fontWeight: 900, color: '#ef4444', cursor: 'pointer' }}>DELETE</button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

CommentsSection.propTypes = {
  mob: PropTypes.bool.isRequired
};

const Masthead = ({ mob }) => (
  <section style={{ 
    padding: mob ? '24px 0 16px' : '60px 0 40px', 
    textAlign: mob ? 'left' : 'center', 
    borderBottom: '2px solid #000', 
    background: '#fff',
    paddingLeft: mob ? '24px' : '0',
    margin: '0 24px'
  }}>
    <h2 style={{ 
      fontFamily: '"Playfair Display", serif', 
      fontSize: mob ? '20px' : '72px', 
      fontWeight: 900, 
      margin: 0, 
      color: '#0f172a', 
      letterSpacing: mob ? '-0.02em' : '-0.06em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: mob ? 'flex-start' : 'center',
      gap: '12px',
      textTransform: 'uppercase'
    }}>
      {mob && <div style={{ width: '4px', height: '20px', background: BRAND_ORANGE }}></div>}
      The Bharat <span style={{ color: BRAND_ORANGE }}>Journal.</span>
    </h2>
    {!mob && (
      <p style={{ fontSize: '11px', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.6em', marginTop: '15px' }}>
        GLOBAL DISPATCH • ELITE CREATOR INTELLIGENCE • {new Date().getFullYear()}
      </p>
    )}
  </section>
);

const StickyHeader = ({ mob, article, isSaved, setIsSaved, handleShare, copied, claps, handleClap }) => (
  <header style={{ 
    padding: '12px 0', 
    background: 'rgba(255, 255, 255, 0.95)', 
    backdropFilter: 'blur(20px)', 
    position: 'sticky', 
    top: mob ? '64px' : '80px', 
    zIndex: 100, 
    borderBottom: '1px solid #f1f5f9' 
  }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px' }}>
      <Link to="/blog" style={{ textDecoration: 'none', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 900, letterSpacing: '0.1em' }}>
        <ArrowLeft size={14} color={BRAND_ORANGE} /> BACK TO JOURNAL
      </Link>
      {!mob && article && (
         <div style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a', maxWidth: '500px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
           Current: {article.title}
         </div>
      )}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {mob && (
          <button onClick={handleClap} style={{ border: 'none', background: claps > 0 ? BRAND_ORANGE : '#f8fafc', padding: '8px 12px', borderRadius: '10px', cursor: 'pointer', color: claps > 0 ? '#fff' : '#000', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: 900 }}>
            <ThumbsUp size={14} fill={claps > 0 ? '#fff' : 'none'} /> {claps > 0 ? claps : ''}
          </button>
        )}
        <button onClick={() => setIsSaved(!isSaved)} style={{ border: 'none', background: '#f8fafc', padding: '8px', borderRadius: '10px', cursor: 'pointer', color: isSaved ? BRAND_ORANGE : '#0f172a' }}>
          <Bookmark size={16} fill={isSaved ? BRAND_ORANGE : 'none'} />
        </button>
        <button onClick={handleShare} style={{ border: 'none', background: copied ? '#22c55e' : '#f8fafc', padding: '8px', borderRadius: '10px', cursor: 'pointer', color: copied ? '#fff' : '#000', transition: 'all 0.3s' }}>
          {copied ? <Check size={16} /> : <Share2 size={16} />}
        </button>
      </div>
    </div>
  </header>
);

const HeroSection = ({ article, mob, readingTime, liveCount }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
    <Breadcrumbs category={article.category} title={article.title} mob={mob} />
    <div style={{ textAlign: mob ? 'left' : 'center', marginBottom: mob ? '40px' : '100px' }}>
      <Bdg color="orange" style={{ marginBottom: mob ? '15px' : '40px', padding: '8px 24px', letterSpacing: '0.2em' }}>{article.category.toUpperCase()}</Bdg>
      <h1 style={{ 
        fontFamily: '"Playfair Display", serif', 
        fontSize: mob ? '36px' : '92px', 
        fontWeight: 900, 
        lineHeight: 0.9, 
        marginBottom: '40px', 
        color: '#0f172a', 
        letterSpacing: mob ? '-0.02em' : '-0.07em' 
      }}>
        {article.title}
      </h1>
      <div style={{ 
        display: 'flex', 
        justifyContent: mob ? 'flex-start' : 'center', 
        alignItems: 'center', 
        gap: '40px', 
        color: '#94a3b8', 
        fontSize: '12px', 
        fontWeight: 900, 
        textTransform: 'uppercase',
        letterSpacing: '0.2em'
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={14} color={BRAND_ORANGE} /> {article.date}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={14} color={BRAND_ORANGE} /> {readingTime} MIN READ</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#22c55e' }}>
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%' }} 
          />
          {liveCount} READING NOW
        </div>
      </div>
    </div>
  </motion.div>
);

const RelatedContent = ({ slug, mob }) => (
  <section style={{ paddingTop: '80px', marginTop: '80px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
      <h4 style={{ fontFamily: '"Playfair Display", serif', fontSize: mob ? '32px' : '48px', fontWeight: 900, margin: 0 }}>Further Reading</h4>
      {!mob && <Link to="/blog" style={{ fontSize: '13px', fontWeight: 900, color: BRAND_ORANGE, textDecoration: 'none', letterSpacing: '0.1em' }}>VIEW ALL JOURNAL →</Link>}
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '30px' }}>
      {blogData.filter(b => b.slug !== slug).slice(0, 2).map(rel => (
        <Link key={rel.id} to={`/blog/${rel.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <div style={{ height: mob ? '200px' : '280px', background: '#f8fafc', marginBottom: '20px', borderRadius: '24px', overflow: 'hidden', border: '1px solid #f1f5f9', position: 'relative' }}>
            <img src={rel.image} alt={rel.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: '15px', left: '15px' }}>
              <Bdg color="orange">{rel.category}</Bdg>
            </div>
          </div>
          <h5 style={{ fontFamily: '"Playfair Display", serif', fontSize: '24px', fontWeight: 900, lineHeight: 1.2, margin: '0 0 10px 0', color: '#0f172a' }}>{rel.title}</h5>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{rel.excerpt}</p>
        </Link>
      ))}
    </div>
  </section>
);


const AudioReader = ({ mob }) => (
  <div style={{ 
    margin: '30px 0', 
    padding: '20px', 
    background: '#f8fafc', 
    borderRadius: '20px', 
    border: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    justifyContent: mob ? 'center' : 'flex-start'
  }}>
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#000', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
    >
      <Play size={20} fill="#fff" />
    </motion.button>
    <div style={{ flex: 1, display: mob ? 'none' : 'block' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '11px', fontWeight: 900, color: '#94a3b8' }}>
        <span>LISTEN TO THIS ARTICLE</span>
        <span>12:45 / 15:00</span>
      </div>
      <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '40%', height: '100%', background: BRAND_ORANGE }}></div>
      </div>
    </div>
    {!mob && (
      <div style={{ display: 'flex', gap: '15px', color: '#64748b' }}>
        <RotateCcw size={18} />
        <Volume2 size={18} />
      </div>
    )}
  </div>
);

AudioReader.propTypes = {
  mob: PropTypes.bool.isRequired
};

const TableOfContents = ({ toc, activeId }) => {
  if (!toc || toc.length === 0) return null;
  return (
    <div style={{ marginBottom: '60px' }}>
      <h5 style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.1em', color: '#94a3b8', marginBottom: '20px' }}>TABLE OF CONTENTS</h5>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {toc.map(item => (
          <li key={item.id}>
            <a 
              href={`#${item.id}`} 
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (el) globalThis.scrollTo({ top: el.offsetTop - 120, behavior: 'smooth' });
              }}
              style={{ 
                textDecoration: 'none', 
                fontSize: '13px', 
                fontWeight: activeId === item.id ? 900 : 600, 
                color: activeId === item.id ? BRAND_ORANGE : '#64748b',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: activeId === item.id ? BRAND_ORANGE : 'transparent' }}></div>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

TableOfContents.propTypes = {
  toc: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })),
  activeId: PropTypes.string
};

const MarketplaceSpotlight = ({ data, mob }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    style={{ 
      margin: '60px 0', 
      background: '#fff', 
      border: '2px solid #000', 
      borderRadius: '24px', 
      overflow: 'hidden', 
      display: 'flex', 
      flexDirection: mob ? 'column' : 'row',
      boxShadow: '10px 10px 0px #f1f5f9'
    }}
  >
    <div style={{ flex: 1, padding: mob ? '30px' : '40px' }}>
      <div style={{ display: 'inline-block', padding: '4px 12px', background: '#000', color: '#fff', fontSize: '10px', fontWeight: 900, marginBottom: '20px', borderRadius: '4px' }}>RECOMMENDED FOR YOU</div>
      <h4 style={{ fontFamily: '"Playfair Display", serif', fontSize: '24px', fontWeight: 900, marginBottom: '10px' }}>{data.title}</h4>
      <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '25px', lineHeight: 1.5 }}>{data.desc}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ fontSize: '24px', fontWeight: 900 }}>{data.price}</div>
        <Link to="/marketplace">
          <button style={{ padding: '12px 24px', background: BRAND_ORANGE, color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 900, cursor: 'pointer' }}>Get it Now</button>
        </Link>
      </div>
    </div>
    <div style={{ width: mob ? '100%' : '300px', height: mob ? '200px' : 'auto', background: `url(${data.image}) center/cover` }}></div>
  </motion.div>
);

MarketplaceSpotlight.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
  mob: PropTypes.bool.isRequired
};

const ClapSystem = ({ claps, handleClap, mob }) => (
  <div style={{ 
    position: mob ? 'fixed' : 'relative', 
    bottom: mob ? '100px' : 'auto', 
    left: mob ? '50%' : 'auto',
    transform: mob ? 'translateX(-50%)' : 'none',
    zIndex: mob ? 2500 : 1,
    display: 'flex',
    flexDirection: mob ? 'row' : 'column',
    alignItems: 'center',
    gap: '10px',
    background: mob ? '#fff' : 'transparent',
    padding: mob ? '10px 20px' : 0,
    borderRadius: mob ? '40px' : 0,
    boxShadow: mob ? '0 10px 25px rgba(0,0,0,0.1)' : 'none'
  }}>
    <motion.button 
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.5 }}
      onClick={handleClap}
      style={{ 
        width: '64px', height: '64px', borderRadius: '50%', 
        background: claps > 0 ? BRAND_ORANGE : '#fff', 
        border: '1.5px solid #000', 
        cursor: 'pointer', 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        boxShadow: claps > 0 ? `0 10px 20px ${BRAND_ORANGE}40` : '0 4px 12px rgba(0,0,0,0.05)'
      }}
    >
      <ThumbsUp size={24} fill={claps > 0 ? '#fff' : 'none'} color={claps > 0 ? '#fff' : '#000'} />
      {claps > 0 && (
        <motion.div 
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: -50, opacity: 0 }}
          style={{ position: 'absolute', fontWeight: 900, color: BRAND_ORANGE, fontSize: '20px' }}
        >
          +{claps}
        </motion.div>
      )}
    </motion.button>
    <div style={{ fontSize: '12px', fontWeight: 900, color: '#000' }}>{1.2 + (claps/1000)}k</div>
  </div>
);

ClapSystem.propTypes = {
  claps: PropTypes.number.isRequired,
  handleClap: PropTypes.func.isRequired,
  mob: PropTypes.bool.isRequired
};

const ArticleBody = ({ article, mob, handleShare, copied }) => (
  <article className="journal-content" style={{ fontSize: '21px', lineHeight: 1.8, color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>
    <style>
      {`
        .article-body p:first-of-type::first-letter {
          float: left; font-family: "Playfair Display", serif; font-size: 110px; line-height: 85px; padding-top: 10px; padding-right: 20px; font-weight: 900; color: #000;
        }
        .journal-content h2 {
          font-family: "Playfair Display", serif; font-size: ${mob ? '32px' : '48px'}; font-weight: 900; margin: 80px 0 30px; border-bottom: 4px solid #000; padding-bottom: 20px; letter-spacing: -0.03em; color: #0f172a; scroll-margin-top: 120px;
        }
        .journal-content h3 {
          font-family: "Playfair Display", serif; font-size: 32px; font-weight: 900; margin: 60px 0 25px; color: #0f172a; letter-spacing: -0.02em; scroll-margin-top: 120px;
        }
        .journal-content blockquote {
          font-family: "Playfair Display", serif; font-style: italic; font-size: 32px; border-left: 12px solid ${BRAND_ORANGE}; padding: 40px 0 40px 50px; margin: 80px 0; background: #fffaf5; color: #000; line-height: 1.4; font-weight: 800;
        }
        .journal-content p { margin-bottom: 40px; color: #334155; }
        .journal-content a {
          color: ${BRAND_ORANGE}; text-decoration: none; font-weight: 800; border-bottom: 2px solid rgba(255, 148, 49, 0.2); transition: all 0.3s;
        }
        .journal-content a:hover {
          background: rgba(255, 148, 49, 0.1); border-bottom-color: ${BRAND_ORANGE};
        }
        .journal-content .quick-take {
          background: #f8fafc; border: 1px solid #e2e8f0; padding: 40px; border-radius: 24px; margin-bottom: 60px; font-size: 18px; line-height: 1.6; color: #0f172a; position: relative;
        }
        .journal-content .quick-take strong { color: ${BRAND_ORANGE}; font-weight: 900; display: block; margin-bottom: 10px; font-size: 14px; letter-spacing: 0.1em; }
        .journal-content .the-end { display: flex; align-items: center; gap: 20px; margin-top: 100px; color: #cbd5e1; }
        .journal-content .the-end::before, .journal-content .the-end::after { content: ''; flex: 1; height: 1px; background: currentColor; }
      `}
    </style>
    
    <AudioReader mob={mob} />
    
    <div className="article-body" dangerouslySetInnerHTML={{ __html: article.content }} />
    
    {article.marketLink && <MarketplaceSpotlight data={article.marketLink} mob={mob} />}
    
    <section style={{ margin: '60px 0', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {article.tags?.map(tag => (
        <Link key={tag} to="/blog" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '10px 20px', border: '1px solid #000', fontSize: '13px', fontWeight: 800, color: '#000', background: '#fff' }}>
            <Hash size={12} color={BRAND_ORANGE} /> {tag.toUpperCase()}
          </div>
        </Link>
      ))}
    </section>

    <div className="the-end">
      <span style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em' }}>The Bharat Journal Dispatch</span>
    </div>
    
    <AuthorCard author={article.author} mob={mob} />
  </article>
);

ArticleBody.propTypes = {
  article: PropTypes.object.isRequired,
  mob: PropTypes.bool.isRequired,
  handleShare: PropTypes.func.isRequired,
  copied: PropTypes.bool.isRequired
};

const DesktopSidebar = ({ subscribed, handleSubscribe, email, setEmail }) => (
  <div style={{ marginBottom: '40px' }}>
    <div style={{ background: '#000', padding: '40px 30px', color: '#fff' }}>
      <Zap size={28} color={BRAND_ORANGE} style={{ marginBottom: '20px' }} />
      <h4 style={{ fontFamily: '"Playfair Display", serif', fontSize: '24px', fontWeight: 900, marginBottom: '20px' }}>Stay Ahead.</h4>
      {subscribed ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <Check size={24} color={BRAND_ORANGE} style={{ marginBottom: '10px' }} />
          <div style={{ fontWeight: 900, fontSize: '18px' }}>WELCOME!</div>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '10px' }}>Check your inbox soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubscribe}>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '25px' }}>Get the exclusive "Bharat Intelligence" report delivered to your inbox every Monday.</p>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="EMAIL ADDRESS" 
            style={{ width: '100%', padding: '15px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '13px', fontWeight: 700, marginBottom: '15px', outline: 'none' }} 
          />
          <Btn full type="submit" style={{ background: BRAND_ORANGE, color: '#000', border: 'none', borderRadius: 0, fontWeight: 900 }}>SUBSCRIBE FREE</Btn>
          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '15px', textAlign: 'center' }}>No spam. Unsubscribe anytime.</p>
        </form>
      )}
    </div>
  </div>
);

DesktopSidebar.propTypes = {
  subscribed: PropTypes.bool.isRequired,
  handleSubscribe: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired
};

const BlogHeroFigure = ({ article, mob, readingTime, liveCount }) => (
  <>
    <HeroSection article={article} mob={mob} readingTime={readingTime} liveCount={liveCount} />
    <motion.figure 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      style={{ width: '100%', height: mob ? '350px' : '750px', marginBottom: '80px', overflow: 'hidden', border: '1px solid #f1f5f9', margin: '0 0 80px 0', position: 'relative', background: '#f8fafc', borderRadius: '24px' }}
    >
      <img 
        src={article.image} 
        alt={article.title} 
        loading="eager" 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        width={1200}
        height={800}
      />
      <div style={{ position: 'absolute', bottom: '20px', right: '20px', background: '#000', color: '#fff', padding: '5px 15px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}>
        Editorial Dispatch
      </div>
    </motion.figure>
  </>
);

BlogHeroFigure.propTypes = {
  article: PropTypes.object.isRequired,
  mob: PropTypes.bool.isRequired,
  readingTime: PropTypes.number.isRequired,
  liveCount: PropTypes.number.isRequired
};

const SocialSidebar = ({ claps, handleClap, handleShare, copied }) => (
  <aside style={{ position: 'sticky', top: '100px', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <ClapSystem claps={claps} handleClap={handleClap} mob={false} />
    <div style={{ height: '40px' }} />
    <motion.div whileHover={{ scale: 1.1 }} style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><TwitterIcon size={20} /></motion.div>
    <motion.div whileHover={{ scale: 1.1 }} style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><LinkedinIcon size={20} /></motion.div>
    <motion.div whileHover={{ scale: 1.1 }} style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><FacebookIcon size={20} /></motion.div>
    <motion.div onClick={handleShare} whileHover={{ scale: 1.1 }} style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: copied ? '#22c55e' : '#fff' }}><Copy size={20} color={copied ? '#fff' : '#000'} /></motion.div>
  </aside>
);

SocialSidebar.propTypes = {
  claps: PropTypes.number.isRequired,
  handleClap: PropTypes.func.isRequired,
  handleShare: PropTypes.func.isRequired,
  copied: PropTypes.bool.isRequired
};

const useBlogArticleLogic = (slug, article) => {
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [liveCount, setLiveCount] = useState(Math.floor(Math.random() * 10) + 12);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [claps, setClaps] = useState(0);
  const [activeId, setActiveId] = useState('');

  const readingTime = useMemo(() => {
    if (!article) return 0;
    const words = article.content.split(' ').length;
    return Math.ceil(words / 200);
  }, [article]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveCount(prev => Math.min(30, Math.max(5, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | The Bharat Journal`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', article.excerpt);
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": article.title,
        "image": [article.image],
        "datePublished": article.date,
        "author": [{ "@type": "Person", "name": article.author.name }]
      });
      document.head.appendChild(script);
      return () => { script.remove(); };
    }
  }, [article]);

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    const s = () => {
      setShowBackToTop(globalThis.scrollY > 500);
      
      // TOC Tracking
      if (article?.toc) {
        const offsets = article.toc.map(item => {
          const el = document.getElementById(item.id);
          return el ? { id: item.id, offset: el.offsetTop - 150 } : null;
        }).filter(Boolean);
        
        const current = offsets.reverse().find(o => globalThis.scrollY >= o.offset);
        if (current) setActiveId(current.id);
      }
    };
    
    globalThis.addEventListener('resize', h, { passive: true });
    globalThis.addEventListener('scroll', s, { passive: true });
    globalThis.scrollTo(0, 0);
    return () => {
      globalThis.removeEventListener('resize', h);
      globalThis.removeEventListener('scroll', s);
    };
  }, [slug, article]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: article?.title, url: globalThis.location.href }).catch(console.error);
    } else {
      navigator.clipboard.writeText(globalThis.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => { setSubscribed(false); setEmail(''); }, 5000);
    }
  };

  const handleClap = () => setClaps(prev => prev + 1);

  return { mob, isSaved, setIsSaved, copied, showBackToTop, scaleX, liveCount, subscribed, email, setEmail, readingTime, handleShare, handleSubscribe, claps, handleClap, activeId };
};

const BlogArticleView = ({ 
  article, slug, mob, isSaved, setIsSaved, copied, showBackToTop, scaleX, 
  liveCount, subscribed, email, setEmail, readingTime, handleShare, handleSubscribe,
  claps, handleClap, activeId
}) => (
  <div style={{ background: '#fff', minHeight: '100vh', paddingBottom: '100px' }}>
    <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '5px', background: BRAND_ORANGE, transformOrigin: '0%', zIndex: 2000, scaleX }} />
    
    <Masthead mob={mob} />
    <StickyHeader 
      mob={mob} 
      article={article} 
      isSaved={isSaved} 
      setIsSaved={setIsSaved} 
      handleShare={handleShare} 
      copied={copied} 
      claps={claps} 
      handleClap={handleClap} 
    />

    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
      <BlogHeroFigure article={article} mob={mob} readingTime={readingTime} liveCount={liveCount} />

      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '80px 1fr 280px', gap: mob ? '30px' : '60px' }}>
        {mob ? (
          null
        ) : (
          <SocialSidebar claps={claps} handleClap={handleClap} handleShare={handleShare} copied={copied} />
        )}

        <div style={{ flex: 1 }}>
          <ArticleBody article={article} mob={mob} handleShare={handleShare} copied={copied} />
          
          {/* In-Content Newsletter */}
          <section style={{ 
            margin: mob ? '30px 0' : '60px 0', 
            padding: mob ? '25px 20px' : '50px', 
            background: '#0f172a', 
            color: '#fff', 
            borderRadius: '24px', 
            textAlign: 'center', 
            position: 'relative', 
            overflow: 'hidden' 
          }}>
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: BRAND_ORANGE, filter: 'blur(100px)', opacity: 0.2 }}></div>
            
            {subscribed ? (
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                <div style={{ width: '50px', height: '50px', background: BRAND_ORANGE, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
                  <Check size={24} color="#fff" />
                </div>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '22px', fontWeight: 900 }}>You're In!</h3>
                <p style={{ color: '#94a3b8', marginTop: '8px', fontSize: '13px' }}>Welcome to the elite circle.</p>
              </motion.div>
            ) : (
              <>
                <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(255,148,49,0.2)', color: BRAND_ORANGE, borderRadius: '20px', fontSize: '9px', fontWeight: 900, marginBottom: '10px', letterSpacing: '0.1em' }}>JOIN 5,000+ CREATORS</div>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: mob ? '28px' : '36px', fontWeight: 900, marginBottom: '5px', lineHeight: 1.1 }}>Stay in the Loop.</h3>
                <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '15px', maxWidth: '400px', margin: '0 auto 15px', lineHeight: 1.4 }}>Get the latest insights on the Bharat creator economy delivered weekly.</p>
                <form onSubmit={handleSubscribe} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                  <div style={{ position: 'relative', width: mob ? '100%' : '300px' }}>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address" 
                      style={{ padding: '12px 15px', paddingLeft: '40px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none', width: '100%', fontSize: '14px' }} 
                    />
                    <Zap size={14} color={BRAND_ORANGE} style={{ position: 'absolute', left: '15px', top: '15px' }} />
                  </div>
                  <button type="submit" style={{ padding: '12px 24px', borderRadius: '10px', background: BRAND_ORANGE, color: '#fff', border: 'none', fontWeight: 900, cursor: 'pointer', width: mob ? '100%' : 'auto', fontSize: '14px' }}>SUBSCRIBE</button>
                </form>
                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '10px' }}>No spam. Unsubscribe anytime.</p>
              </>
            )}
          </section>

          <CommentsSection mob={mob} />

          {/* Article Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginTop: '80px', borderTop: '1px solid #f1f5f9', paddingTop: '40px' }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Previous</span>
              <h4 style={{ fontSize: mob ? '14px' : '16px', fontWeight: 800, marginTop: '8px', color: '#0f172a', cursor: 'pointer' }}>Growth Strategies for 2026</h4>
            </div>
            <div style={{ flex: 1, textAlign: 'right' }}>
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Next Up</span>
              <h4 style={{ fontSize: mob ? '14px' : '16px', fontWeight: 800, marginTop: '8px', color: BRAND_ORANGE, cursor: 'pointer' }}>Monetizing Tier 3 Audiences</h4>
            </div>
          </div>

          <RelatedContent slug={slug} mob={mob} />
        </div>

        {mob ? (
          null
        ) : (
          <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
            <TableOfContents toc={article.toc} activeId={activeId} />
            <DesktopSidebar 
              subscribed={subscribed} 
              handleSubscribe={handleSubscribe} 
              email={email} 
              setEmail={setEmail} 
            />
          </aside>
        )}
      </div>
    </main>

    {/* Floating Back to Top */}
    {showBackToTop && (
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => globalThis.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ position: 'fixed', bottom: '100px', right: '30px', width: '50px', height: '50px', background: '#000', color: '#fff', borderRadius: '50%', border: 'none', cursor: 'pointer', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <ChevronUp size={24} />
      </motion.button>
    )}
  </div>
);

BlogArticleView.propTypes = {
  article: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  mob: PropTypes.bool.isRequired,
  isSaved: PropTypes.bool.isRequired,
  setIsSaved: PropTypes.func.isRequired,
  copied: PropTypes.bool.isRequired,
  showBackToTop: PropTypes.bool.isRequired,
  scaleX: PropTypes.object.isRequired,
  liveCount: PropTypes.number.isRequired,
  subscribed: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  readingTime: PropTypes.number.isRequired,
  handleShare: PropTypes.func.isRequired,
  handleSubscribe: PropTypes.func.isRequired,
  claps: PropTypes.number.isRequired,
  handleClap: PropTypes.func.isRequired,
  activeId: PropTypes.string
};

export default function BlogArticlePage() {
  const { slug } = useParams();
  const article = useMemo(() => blogData?.find(b => b.slug === slug), [slug]);
  
  const { 
    mob, isSaved, setIsSaved, copied, showBackToTop, scaleX, 
    liveCount, subscribed, email, setEmail, readingTime, 
    handleShare, handleSubscribe, claps, handleClap, activeId
  } = useBlogArticleLogic(slug, article);

  if (!article) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h1>Not Found</h1></div>;

  return (
    <BlogArticleView 
      article={article}
      slug={slug}
      mob={mob}
      isSaved={isSaved}
      setIsSaved={setIsSaved}
      copied={copied}
      showBackToTop={showBackToTop}
      scaleX={scaleX}
      liveCount={liveCount}
      subscribed={subscribed}
      email={email}
      setEmail={setEmail}
      readingTime={readingTime}
      handleShare={handleShare}
      handleSubscribe={handleSubscribe}
      claps={claps}
      handleClap={handleClap}
      activeId={activeId}
    />
  );
}

Masthead.propTypes = { mob: PropTypes.bool.isRequired };
StickyHeader.propTypes = { 
  mob: PropTypes.bool.isRequired, 
  article: PropTypes.object, 
  isSaved: PropTypes.bool, 
  setIsSaved: PropTypes.func, 
  handleShare: PropTypes.func, 
  copied: PropTypes.bool,
  claps: PropTypes.number,
  handleClap: PropTypes.func
};
HeroSection.propTypes = { article: PropTypes.object, mob: PropTypes.bool.isRequired, readingTime: PropTypes.number, liveCount: PropTypes.number };
RelatedContent.propTypes = { slug: PropTypes.string, mob: PropTypes.bool.isRequired };
