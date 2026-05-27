"use client";
import { useEffect, useRef, useState } from "react";

const SKILLS = [
  "React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS",
  "Framer Motion", "HTML5", "CSS3", "Responsive Design",
  "Node.js", "Express.js", "PHP", "Laravel", "REST APIs",
  "JWT Auth", "API Integration",
  "MongoDB", "MySQL", "Firebase", "PostgreSQL", "Database Design",
  "Python", "Java", "Machine Learning", "Data Analysis", "AI Integration",
  "Three.js", "WebGL",
  "Git", "GitHub", "Postman", "VS Code", "Linux",
  "OOP", "Data Structures", "Algorithms", "Async Programming",
];

const PILL = {
  bg:          "rgba(52, 211, 153, 0.1)",
  border:      "rgba(52, 211, 153, 0.28)",
  text:        "#6ee7b7",
  glow:        "rgba(52, 211, 153, 0.55)",
  hover:       "rgba(52, 211, 153, 0.18)",
  hoverBorder: "rgba(52, 211, 153, 0.55)",
};

/* ─── responsive hook ─────────────────────────────── */
function useBreakpoint() {
  const [bp, setBp] = useState({ isMobile: false, isTablet: false, width: 1200 });
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setBp({ isMobile: w < 640, isTablet: w >= 640 && w < 1024, width: w });
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return bp;
}

export default function Skills() {
  const sectionRef = useRef(null);
  const itemsRef   = useRef([]);
  const animRef    = useRef(null);
  const stateRef   = useRef({
    rotX: 0.4, rotY: 0,
    velX: 0.0004, velY: 0.0018,
    isDragging: false,
    lastX: 0, lastY: 0,
    autoRotate: true,
  });

  const [visible, setVisible]   = useState(false);
  const [dims, setDims]         = useState({ rx: 500, ry: 260, rz: 260 });
  const [hovered, setHovered]   = useState(null);
  const { isMobile, isTablet, width } = useBreakpoint();

  /* ── Entrance observer ── */
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  /* ── Responsive dims ── */
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      let rx, ry, rz;
      if (w < 480) {
        // Very small mobile: tight sphere
        rx = w * 0.38;
        ry = w * 0.30;
        rz = w * 0.30;
      } else if (w < 640) {
        // Mobile
        rx = w * 0.40;
        ry = w * 0.28;
        rz = w * 0.28;
      } else if (w < 1024) {
        // Tablet
        rx = Math.min(w * 0.38, 360);
        ry = Math.min(w * 0.22, 210);
        rz = Math.min(w * 0.22, 210);
      } else {
        // Desktop
        rx = Math.min(w * 0.42, 620);
        const r = Math.min(w * 0.22, 280);
        ry = r;
        rz = r;
      }
      setDims({ rx, ry, rz });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ── 3D animation + drag/touch ── */
  useEffect(() => {
    const items = itemsRef.current.filter(Boolean);
    const total = items.length;
    if (!total) return;

    const points = items.map((_, i) => {
      const phi   = Math.acos(-1 + (2 * i) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;
      return {
        x: dims.rx * Math.cos(theta) * Math.sin(phi),
        y: dims.ry * Math.sin(theta) * Math.sin(phi),
        z: dims.rz * Math.cos(phi),
      };
    });

    const s = stateRef.current;
    const section = sectionRef.current;

    /* ── Mouse handlers ── */
    const onMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      if (s.isDragging) {
        s.velY = (e.clientX - rect.left - s.lastX) * 0.003;
        s.velX = (e.clientY - rect.top  - s.lastY) * 0.003;
        s.autoRotate = false;
      }
      s.lastX = e.clientX - rect.left;
      s.lastY = e.clientY - rect.top;
    };
    const onMouseDown = (e) => {
      s.isDragging = true;
      s.autoRotate = false;
      const rect = section.getBoundingClientRect();
      s.lastX = e.clientX - rect.left;
      s.lastY = e.clientY - rect.top;
    };
    const onMouseUp    = () => { s.isDragging = false; setTimeout(() => { s.autoRotate = true; }, 2000); };
    const onMouseLeave = () => { s.isDragging = false; setTimeout(() => { s.autoRotate = true; }, 2000); };

    /* ── Touch handlers ── */
    const onTouchStart = (e) => {
      const t = e.touches[0];
      const rect = section.getBoundingClientRect();
      s.isDragging = true;
      s.autoRotate = false;
      s.lastX = t.clientX - rect.left;
      s.lastY = t.clientY - rect.top;
    };
    const onTouchMove = (e) => {
      e.preventDefault();
      const t = e.touches[0];
      const rect = section.getBoundingClientRect();
      if (s.isDragging) {
        s.velY = (t.clientX - rect.left - s.lastX) * 0.003;
        s.velX = (t.clientY - rect.top  - s.lastY) * 0.003;
      }
      s.lastX = t.clientX - rect.left;
      s.lastY = t.clientY - rect.top;
    };
    const onTouchEnd = () => {
      s.isDragging = false;
      setTimeout(() => { s.autoRotate = true; }, 2000);
    };

    /* ── Animation loop ── */
    const animate = () => {
      if (s.autoRotate) {
        s.velX += (0.0004 - s.velX) * 0.03;
        s.velY += (0.0018 - s.velY) * 0.03;
      }
      s.rotX += s.velX;
      s.rotY += s.velY;
      if (!s.isDragging) {
        s.velX *= 0.94;
        s.velY *= 0.94;
      }

      const cosX = Math.cos(s.rotX), sinX = Math.sin(s.rotX);
      const cosY = Math.cos(s.rotY), sinY = Math.sin(s.rotY);

      items.forEach((el, i) => {
        const { x, y, z } = points[i];
        const y1 =  y * cosX - z * sinX;
        const z1 =  y * sinX + z * cosX;
        const x1 =  x * cosY + z1 * sinY;
        const z2 = -x * sinY + z1 * cosY;

        const depth   = (z2 + dims.rz) / (2 * dims.rz);
        const scale   = 0.5 + depth * 0.8;
        const opacity = 0.12 + depth * 0.88;

        el.style.transform = `translate3d(${x1}px, ${y1}px, 0) scale(${scale}) translate(-50%, -50%)`;
        el.style.opacity   = opacity.toFixed(3);
        el.style.zIndex    = Math.floor(depth * 1000);
      });

      animRef.current = requestAnimationFrame(animate);
    };

    section.addEventListener("mousemove",  onMouseMove);
    section.addEventListener("mousedown",  onMouseDown);
    section.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseup",     onMouseUp);
    section.addEventListener("touchstart", onTouchStart, { passive: false });
    section.addEventListener("touchmove",  onTouchMove,  { passive: false });
    section.addEventListener("touchend",   onTouchEnd);
    animate();

    return () => {
      section.removeEventListener("mousemove",  onMouseMove);
      section.removeEventListener("mousedown",  onMouseDown);
      section.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseup",     onMouseUp);
      section.removeEventListener("touchstart", onTouchStart);
      section.removeEventListener("touchmove",  onTouchMove);
      section.removeEventListener("touchend",   onTouchEnd);
      cancelAnimationFrame(animRef.current);
    };
  }, [dims]);

  /* ── Ellipsoid wrapper height: tall enough to fit ry ── */
  const wrapperHeight = isMobile
    ? Math.max(dims.ry * 2 + 100, 320)
    : isTablet
    ? Math.max(dims.ry * 2 + 120, 480)
    : 600;

  /* ── Header padding ── */
  const headerPadding = isMobile
    ? "70px 20px 28px"
    : isTablet
    ? "80px 32px 32px"
    : "100px 40px 40px";

  /* ── Strip padding ── */
  const stripPadding = isMobile ? "20px 0 36px" : "32px 0 48px";
  const stripItemPad = isMobile ? "0 18px" : isTablet ? "0 28px" : "0 40px";

  return (
    <>
      <style>{`
        .skills-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-sizing: border-box;
        }

        /* No custom cursor on touch devices */
        @media (hover: hover) {
          .skills-section { cursor: none; }
        }

        .skills-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 20% 20%, rgba(52,211,153,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 50% 55% at 80% 75%, rgba(52,211,153,0.04) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 50% 95%, rgba(52,211,153,0.03) 0%, transparent 55%);
          pointer-events: none;
          z-index: 0;
        }

        .skills-header {
          position: relative;
          z-index: 20;
          text-align: center;
          width: 100%;
          pointer-events: none;
          box-sizing: border-box;
        }

        .skills-eyebrow {
          font-family: 'Fira Code', monospace;
          font-size: 10.5px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(110, 231, 183, 0.4);
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin: 0 0 14px;
        }
        .skills-eyebrow::before,
        .skills-eyebrow::after {
          content: '';
          display: block;
          width: 22px;
          height: 1px;
          background: rgba(110, 231, 183, 0.2);
        }

        .skills-heading {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          letter-spacing: -0.045em;
          line-height: 0.95;
          color: #f0f4ff;
          margin: 0 0 14px;
        }
        .skills-heading span {
          background: linear-gradient(135deg, #34d399, #6ee7b7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .skills-drag-hint {
          font-family: 'Fira Code', monospace;
          font-size: 9px;
          color: rgba(255,255,255,0.14);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .skills-drag-hint::before,
        .skills-drag-hint::after {
          content: '';
          display: block;
          width: 20px;
          height: 1px;
          background: rgba(255,255,255,0.08);
        }

        .skills-ellipsoid-wrapper {
          position: relative;
          width: 100%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 7%,
            black 93%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 7%,
            black 93%,
            transparent 100%
          );
        }

        .skills-ellipsoid-wrapper::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 10;
          background:
            linear-gradient(to bottom, rgba(8,11,18,0.7) 0%, transparent 22%),
            linear-gradient(to top,    rgba(8,11,18,0.7) 0%, transparent 22%);
        }

        .skills-field {
          position: relative;
          width: 0;
          height: 0;
          touch-action: none;
        }

        .skill-pill {
          position: absolute;
          top: 0; left: 0;
          white-space: nowrap;
          border-radius: 100px;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          letter-spacing: 0.01em;
          user-select: none;
          will-change: transform, opacity;
          transition: box-shadow .2s ease, background .2s ease, border-color .2s ease;
          border-width: 1px;
          border-style: solid;
        }
        .skill-pill:hover {
          z-index: 9999 !important;
          opacity: 1 !important;
        }

        /* Mobile pill sizing */
        @media (max-width: 639px) {
          .skill-pill {
            padding: 5px 12px;
            font-size: 10px;
          }
        }
        /* Tablet pill sizing */
        @media (min-width: 640px) and (max-width: 1023px) {
          .skill-pill {
            padding: 6px 15px;
            font-size: 12px;
          }
        }
        /* Desktop pill sizing */
        @media (min-width: 1024px) {
          .skill-pill {
            padding: 7px 18px;
            font-size: clamp(11px, 1.05vw, 14px);
            cursor: none;
          }
        }

        .skills-strip {
          position: relative;
          z-index: 20;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(to top, rgba(8,11,18,0.95) 0%, rgba(8,11,18,0.5) 60%, transparent 100%);
          flex-shrink: 0;
          pointer-events: none;
          box-sizing: border-box;
        }

        .strip-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          border-right: 1px solid rgba(255,255,255,0.06);
        }
        .strip-item:last-child { border-right: none; }

        .strip-val {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1;
          background: linear-gradient(135deg, #6ee7b7, rgba(110,231,183,0.45));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 5px;
        }

        .strip-label {
          font-family: 'Fira Code', monospace;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(110,231,183,0.28);
        }

        /* Strip responsive sizing */
        @media (max-width: 639px) {
          .strip-val   { font-size: 1.5rem; }
          .strip-label { font-size: 9px; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .strip-val   { font-size: 1.9rem; }
          .strip-label { font-size: 10px; }
        }
        @media (min-width: 1024px) {
          .strip-val   { font-size: clamp(1.6rem, 2.5vw, 2.4rem); }
          .strip-label { font-size: 10.5px; }
        }

        /* Heading responsive */
        @media (max-width: 639px) {
          .skills-heading { font-size: clamp(2.6rem, 11vw, 3.4rem); }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .skills-heading { font-size: clamp(2.8rem, 7vw, 4.5rem); }
        }
        @media (min-width: 1024px) {
          .skills-heading { font-size: clamp(3rem, 7vw, 6rem); }
        }
      `}</style>

      <section id="skills" className="skills-section" ref={sectionRef}>

        {/* ── Header ── */}
        <div
          className="skills-header"
          style={{
            padding: headerPadding,
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity .7s ease, transform .7s ease",
          }}
        >
          <p className="skills-eyebrow">Technical Arsenal</p>
          <h2 className="skills-heading">
            My <span>Skills</span> &amp; Stack.
          </h2>
          <p className="skills-drag-hint">
            {isMobile ? "drag to rotate" : "drag anywhere to rotate"}
          </p>
        </div>

        {/* ── 3D ellipsoid ── */}
        <div
          className="skills-ellipsoid-wrapper"
          style={{ height: wrapperHeight }}
        >
          <div className="skills-field">
            {SKILLS.map((label, i) => (
              <div
                key={i}
                ref={el => (itemsRef.current[i] = el)}
                className="skill-pill"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background:  hovered === i ? PILL.hover  : PILL.bg,
                  borderColor: hovered === i ? PILL.hoverBorder : PILL.border,
                  color:       PILL.text,
                  opacity:     visible ? undefined : 0,
                  boxShadow:   hovered === i
                    ? `0 0 22px ${PILL.glow}, 0 0 0 1px ${PILL.hoverBorder}`
                    : "none",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom strip ── */}
        <div
          className="skills-strip"
          style={{
            padding: stripPadding,
            opacity:    visible ? 1 : 0,
            transition: "opacity .7s .4s ease",
          }}
        >
          {[
            { val: SKILLS.length + "+", label: "Technologies" },
            { val: "7",                 label: "Domains"      },
            { val: "3+",                label: "Years Exp."   },
          ].map((s, i) => (
            <div key={i} className="strip-item" style={{ padding: stripItemPad }}>
              <div className="strip-val">{s.val}</div>
              <div className="strip-label">{s.label}</div>
            </div>
          ))}
        </div>

      </section>
    </>
  );
}