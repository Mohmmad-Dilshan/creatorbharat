"use client";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./IndiaMap3D.module.css";

const GEOJSON_URL = "/india_states.json";

const FLAG_COLORS = ["#FF9933", "#FFFFFF", "#138808"];

export default function IndiaMap3D({ mob, onSelectState, stateCounts = {} }) {
  const svgRef  = useRef(null);
  const wrapRef = useRef(null);
  const [selectedState, setSelectedState] = useState(null);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "center center"]
  });

  // Original Scroll-Triggered Presence
  const scale = useTransform(scrollYProgress, [0, 1], mob ? [1, 1] : [0.7, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], mob ? [1, 1] : [0, 1]);

  useEffect(() => {
    let cancelled = false;
    async function init() {
      try {
        const d3Module = await import("d3");
        const d3 = d3Module.default || d3Module;
        
        const res = await fetch(GEOJSON_URL);
        if (!res.ok) throw new Error("Map fetch failed: " + res.status);
        const geojson = await res.json();
        
        if (cancelled) return;
        const features = geojson.features || (Array.isArray(geojson) ? geojson : []);
        
        if (features.length === 0) throw new Error("No features found in GeoJSON");

        if (svgRef.current) {
          drawMap(d3, features);
        } else {
          setTimeout(() => {
            if (!cancelled && svgRef.current) drawMap(d3, features);
          }, 200);
        }
        setLoading(false);
      } catch (e) {
        console.error("IndiaMap3D Error:", e);
        setLoading(false);
      }
    }
    init();
    return () => { cancelled = true; };
  }, []);

  function drawMap(d3, features) {
    const svgEl = svgRef.current;
    if (!svgEl) return;
    const W = 560, H = 640;
    const projection = d3.geoMercator()
      .center([82.5, 22.5])
      .scale(950)
      .translate([W / 2, H / 2]);
    const pathGen = d3.geoPath().projection(projection);
    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();

    const mapG = svg.append("g").attr("id","mapG");

    mapG.selectAll("path")
      .data(features)
      .join("path")
      .attr("d", pathGen)
      .attr("fill", (_,i) => FLAG_COLORS[i % FLAG_COLORS.length])
      .attr("stroke", "#000080")
      .attr("stroke-width", 0.5)
      .attr("stroke-opacity", 0.2)
      .style("cursor", "pointer")
      .on("click", function(event, d) {
        let name = d.properties.name || "";
        
        // Normalize names to match ALL_STATES
        if (name === "Orissa") name = "Odisha";
        if (name === "Uttaranchal") name = "Uttarakhand";
        
        setSelectedState(name);
        if (onSelectState) onSelectState(name);
        d3.selectAll("path").attr("stroke-width", 0.5).attr("stroke-opacity", 0.2);
        d3.select(this).attr("stroke-width", 2).attr("stroke-opacity", 1).attr("stroke", "#000080");
        setTimeout(() => setSelectedState(null), 3000);
      });
  }

  return (
    <section ref={wrapRef} className={styles.mapSection}>
      <motion.div style={{ scale, opacity }} className={styles.contentWrap}>
        <div className={styles.header}>
          <span className={styles.tag}>Network</span>
          <h2 className={styles.title}>The Heart of <span className={styles.accent}>Bharat</span></h2>
          <p className={styles.sub}>Connecting 28 States & 8 Union Territories</p>
          <div className={styles.flagLine} />
        </div>

        <div className={styles.svgWrap} style={{ height: mob ? '450px' : '640px', position: 'relative' }}>
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, background: 'transparent' }}
            >
               <div style={{ width: 48, height: 48, borderRadius: '50%', border: '4px solid rgba(255,153,51,0.2)', borderTopColor: '#FF9933', borderRightColor: '#FFFFFF', borderBottomColor: '#138808', animation: 'spin 1s linear infinite' }} />
               <p style={{ marginTop: 16, fontSize: 13, fontWeight: 900, color: 'rgba(255,255,255,0.7)', letterSpacing: '2px', textTransform: 'uppercase' }}>Loading Bharat...</p>
               <style dangerouslySetInnerHTML={{__html: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}} />
            </motion.div>
          )}
          
          <svg ref={svgRef} viewBox="0 0 560 640" className={styles.svg} style={{ width: '100%', height: '100%', display: 'block', opacity: loading ? 0 : 1, transition: 'opacity 0.8s ease-in-out' }} />
          
          {selectedState && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.9 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              className={styles.stateLabel}
              style={{ textAlign: 'center', minWidth: 220 }}
            >
              <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Selected Region</div>
              <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 8 }}>{selectedState}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                <div style={{ padding: '6px 16px', background: 'rgba(255,255,255,0.2)', borderRadius: 100, fontSize: 15, fontWeight: 800 }}>
                  🎯 <b>{stateCounts[selectedState] || 0}</b> {stateCounts[selectedState] === 1 ? 'Creator' : 'Creators'}
                </div>
                {(stateCounts[selectedState] || 0) === 0 && (
                  <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 600 }}>
                    Be the first from {selectedState}!
                  </div>
                )}
                {(stateCounts[selectedState] || 0) > 0 && (
                  <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 600 }}>
                    Verified & active on the platform
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Rajasthan Custom Message (Desktop Only) */}
          {!mob && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                position: 'absolute',
                top: '30%',
                left: '25%',
                zIndex: 30,
                pointerEvents: 'none'
              }}
            >
              {/* Message Box */}
              <div style={{
                position: 'absolute',
                top: '-80px',
                left: '-320px',
                width: '300px',
                background: '#ffffff',
                padding: '16px',
                borderRadius: '12px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                border: '2px solid #FF9933',
                transform: 'rotateX(-25deg) rotateZ(5deg)'
              }}>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#111', lineHeight: 1.5, fontFamily: 'Inter, sans-serif' }}>
                  "Har chhote creator ko ek nayi pehchaan dilana Creator Bharat ka mission hai. Hum har local talent ko <span style={{color: '#FF9933', fontWeight: 900}}>host karenge</span>."
                </p>
              </div>

              {/* Arrow Line */}
              <svg width="300" height="200" style={{ position: 'absolute', top: '-10px', left: '-150px', overflow: 'visible' }}>
                <path d="M -150 -10 Q -50 20 0 0" fill="transparent" stroke="#FF9933" strokeWidth="3" strokeDasharray="6 4" />
                <polygon points="-8,-6 2,0 -4,8" fill="#FF9933" />
              </svg>
            </motion.div>
          )}

          {/* Right Annotation (Talent Mission) */}
          {!mob && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className={styles.annotationRight}
            >
              <div className={styles.annoLineRight} />
              <div className={styles.annoText}>
                Tier 2 aur Tier 3 <span className={styles.annoHighlight}>cities ka talent</span> ab poori duniya tak pahunchega.
              </div>
            </motion.div>
          )}

          {/* Floating Motive Tags (Desktop only) */}
          {!mob && (
            <>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={`${styles.floatingTag} ${styles.topRight}`}>
                Digital Identity for every Indian Creator
              </motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={`${styles.floatingTag} ${styles.bottomLeft}`}>
                Breaking the Agency Monopoly
              </motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={`${styles.floatingTag} ${styles.topCenter}`}>
                Authentic Bharat Stories
              </motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={`${styles.floatingTag} ${styles.midLeft}`}>
                Zero Commission, 100% Growth
              </motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={`${styles.floatingTag} ${styles.midRight}`}>
                Empowering the Local Soul
              </motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={`${styles.floatingTag} ${styles.bottomRight}`}>
                Identity is your Currency
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}

IndiaMap3D.propTypes = {
  mob: PropTypes.bool,
  onSelectState: PropTypes.func,
  stateCounts: PropTypes.object
};
