import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { SEED_CREATORS } from '@/data/seedData';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreatorNetworkCanvas({ mob }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  
  const [hoveredCreator, setHoveredCreator] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let width = canvas.width = containerRef.current.clientWidth || 400;
    let height = mob ? 320 : 450;
    canvas.height = height;

    // Resolve creators list for canvas nodes
    const sampleCreators = SEED_CREATORS.slice(0, 10).map((c, i) => {
      const followersRaw = c.followers || 100000;
      const radius = mob 
        ? (followersRaw >= 1000000 ? 24 : followersRaw >= 100000 ? 18 : 14)
        : (followersRaw >= 1000000 ? 32 : followersRaw >= 100000 ? 24 : 18);
      
      const platforms = ['Instagram', 'YouTube', 'LinkedIn', 'Twitter'];
      const platform = c.primaryPlatform || c.platform || platforms[i % 4];

      // Preload image
      const img = new Image();
      img.src = c.photo || c.image || c.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=FF9431&color=fff`;
      img.crossOrigin = 'anonymous';

      return {
        id: c.id,
        name: c.name,
        city: c.city || 'India',
        niche: Array.isArray(c.niche) ? c.niche[0] : (c.niche || 'Creator'),
        followers: followersRaw >= 1000000 ? `${(followersRaw / 1000000).toFixed(1)}M` : `${(followersRaw / 1000).toFixed(0)}K`,
        platform,
        radius,
        x: Math.random() * (width - radius * 2) + radius,
        y: Math.random() * (height - radius * 2) + radius,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        image: img,
        imageLoaded: false,
        pulseScale: 1
      };
    });

    // Mark preloaded images as loaded
    sampleCreators.forEach(node => {
      node.image.onload = () => {
        node.imageLoaded = true;
      };
    });

    let mouse = { x: -1000, y: -1000, active: false, radius: 120 };

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      width = canvas.width = containerRef.current.clientWidth || 400;
      height = mob ? 320 : 450;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    const getMouseCoords = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const handleMouseMove = (e) => {
      const coords = getMouseCoords(e);
      mouse.x = coords.x;
      mouse.y = coords.y;
      mouse.active = true;

      // Check if mouse is hovering over any creator node
      let foundHover = false;
      sampleCreators.forEach(node => {
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < node.radius) {
          foundHover = true;
          setHoveredCreator(node);
          // Position tooltip above the node, bounding x to prevent canvas overflow
          const containerWidth = containerRef.current?.clientWidth || 320;
          const boundedX = Math.max(110, Math.min(containerWidth - 110, node.x));
          setTooltipPos({ 
            x: boundedX, 
            y: node.y - node.radius - 12
          });
        }
      });

      if (!foundHover) {
        setHoveredCreator(null);
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
      setHoveredCreator(null);
    };

    const handleCanvasClick = (e) => {
      const coords = getMouseCoords(e);
      sampleCreators.forEach(node => {
        const dx = node.x - coords.x;
        const dy = node.y - coords.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < node.radius) {
          navigate(`/creator/${node.id}`);
          globalThis.window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleCanvasClick);
    
    // Add touch support
    canvas.addEventListener('touchstart', handleMouseMove, { passive: true });
    canvas.addEventListener('touchmove', handleMouseMove, { passive: true });
    canvas.addEventListener('touchend', handleMouseLeave, { passive: true });

    // Node physics simulation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw connection links between nodes
      for (let i = 0; i < sampleCreators.length; i++) {
        for (let j = i + 1; j < sampleCreators.length; j++) {
          const n1 = sampleCreators[i];
          const n2 = sampleCreators[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = mob ? 110 : 160;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            // Dynamic saffron-blue gradient connector lines
            const grad = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
            grad.addColorStop(0, `rgba(255, 148, 49, ${alpha})`);
            grad.addColorStop(1, `rgba(59, 130, 246, ${alpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }

      // 2. Draw connections to mouse cursor
      if (mouse.active) {
        sampleCreators.forEach(node => {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.25;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(255, 148, 49, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      }

      // 3. Update and draw nodes
      sampleCreators.forEach(node => {
        // Physics update
        node.x += node.vx;
        node.y += node.vy;

        // Collision with walls
        if (node.x - node.radius < 0) {
          node.x = node.radius;
          node.vx *= -1;
        } else if (node.x + node.radius > width) {
          node.x = width - node.radius;
          node.vx *= -1;
        }

        if (node.y - node.radius < 0) {
          node.y = node.radius;
          node.vy *= -1;
        } else if (node.y + node.radius > height) {
          node.y = height - node.radius;
          node.vy *= -1;
        }

        // Attraction to mouse
        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius && dist > 10) {
            const force = (mouse.radius - dist) / mouse.radius * 0.15;
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;
          }
        }

        // Max speed lock
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        const maxSpeed = 1.2;
        if (speed > maxSpeed) {
          node.vx = (node.vx / speed) * maxSpeed;
          node.vy = (node.vy / speed) * maxSpeed;
        }

        // Pulse effect on hover
        const isHovered = hoveredCreator && hoveredCreator.id === node.id;
        if (isHovered) {
          node.pulseScale += (1.12 - node.pulseScale) * 0.1;
        } else {
          node.pulseScale += (1.0 - node.pulseScale) * 0.1;
        }

        const currentRad = node.radius * node.pulseScale;

        // Draw node glowing aura
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRad + 4, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? 'rgba(255, 148, 49, 0.15)' : 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
        ctx.strokeStyle = isHovered ? '#FF9431' : 'rgba(0,0,0,0.06)';
        ctx.lineWidth = isHovered ? 2.5 : 1.5;
        ctx.stroke();

        // Draw creator profile picture cropped
        ctx.save();
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRad - 1.5, 0, Math.PI * 2);
        ctx.clip();

        if (node.imageLoaded) {
          ctx.drawImage(
            node.image, 
            node.x - currentRad, 
            node.y - currentRad, 
            currentRad * 2, 
            currentRad * 2
          );
        } else {
          // Fallback colored initials
          ctx.fillStyle = '#FF9431';
          ctx.fill();
          ctx.font = `bold ${currentRad * 0.7}px Outfit, sans-serif`;
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(node.name.charAt(0), node.x, node.y);
        }
        ctx.restore();

        // Draw small platform indicator circle on the corner of the node
        const badgeAngle = Math.PI / 4;
        const badgeX = node.x + Math.cos(badgeAngle) * (currentRad - 2);
        const badgeY = node.y + Math.sin(badgeAngle) * (currentRad - 2);
        const badgeRad = mob ? 7 : 9;

        ctx.beginPath();
        ctx.arc(badgeX, badgeY, badgeRad, 0, Math.PI * 2);
        ctx.fillStyle = node.platform === 'YouTube' ? '#ff0000' : node.platform === 'Instagram' ? '#e1306c' : node.platform === 'LinkedIn' ? '#0077b5' : '#1da1f2';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
        canvas.removeEventListener('click', handleCanvasClick);
        canvas.removeEventListener('touchstart', handleMouseMove);
        canvas.removeEventListener('touchmove', handleMouseMove);
        canvas.removeEventListener('touchend', handleMouseLeave);
      }
      cancelAnimationFrame(animationId);
    };
  }, [mob, navigate, hoveredCreator]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', borderRadius: '32px', background: 'transparent', overflow: 'hidden' }}>
      
      {/* Top telemetry signal bar */}
      <div style={{
        padding: '12px 20px',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(248, 250, 252, 0.85)',
        backdropFilter: 'blur(12px)',
        fontSize: '11px',
        fontWeight: 800,
        color: '#64748b'
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 6px #10B981' }} />
          CANVAS_ENGINE: 60FPS
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Users size={12} />
          ACTIVE CREATORS
        </span>
      </div>

      <canvas 
        ref={canvasRef} 
        style={{ 
          display: 'block', 
          cursor: hoveredCreator ? 'pointer' : 'default',
          background: 'transparent' 
        }} 
      />

      {/* Floating Canvas Tooltip for Hovered Node */}
      <AnimatePresence>
        {hoveredCreator && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: tooltipPos.y + 10, x: tooltipPos.x }}
            animate={{ opacity: 1, scale: 1, y: tooltipPos.y, x: tooltipPos.x }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 18, stiffness: 200 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              transform: 'translate(-50%, -100%)',
              background: '#0f172a',
              color: '#ffffff',
              padding: '16px 20px',
              borderRadius: '20px',
              boxShadow: '0 15px 30px rgba(15,23,42,0.18)',
              border: '1px solid rgba(255,255,255,0.08)',
              width: '200px',
              pointerEvents: 'none',
              zIndex: 10
            }}
          >
            <div style={{ fontWeight: 950, fontSize: '15px', color: '#fff', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {hoveredCreator.name}
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
            </div>
            
            <div style={{ fontSize: '11px', color: '#FF9431', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '12px' }}>
              {hoveredCreator.niche} • {hoveredCreator.platform}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Reach</span>
                <span style={{ fontWeight: 850 }}>{hoveredCreator.followers}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>HQ Hub</span>
                <span style={{ fontWeight: 850 }}>{hoveredCreator.city}</span>
              </div>
            </div>
            
            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: '12px', fontWeight: 700 }}>
              TAP NODE TO OPEN PROFILE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

CreatorNetworkCanvas.propTypes = {
  mob: PropTypes.bool.isRequired
};
