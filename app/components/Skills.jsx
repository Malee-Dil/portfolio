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

export default function Skills() {
  const sectionRef = useRef(null);
  const itemsRef   = useRef([]);
  const animRef    = useRef(null);
  const stateRef   = useRef({
    rotX: 0.4,
    rotY: 0,
    velX: 0.0004,
    velY: 0.0018,
    isDragging: false,
    lastX: 0,
    lastY: 0,
    autoRotate: true,
  });

  const [visible, setVisible] = useState(false);
  const [dims, setDims]       = useState({ rx: 500, ry: 260, rz: 260 });
  const [hovered, setHovered] = useState(null);

  // Entrance
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  // Responsive dims:
  // rx = wide (horizontal spread), ry & rz = equal so rotation looks circular
  // Think of it as a sphere that's been stretched horizontally
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      // ry/rz stay equal → circular orbital movement
      // rx is wider → pills spread left-right like a rectangle
      const r = Math.min(w * 0.22, 280); // circular radius
      setDims({
        rx: Math.min(w * 0.42, 620), // wide horizontal
        ry: r,                        // circular vertical
        rz: r,                        // circular depth — same as ry!
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // 3D rotation
  useEffect(() => {
    const items = itemsRef.current.filter(Boolean);
    const total = items.length;
    if (!total) return;

    // Fibonacci sphere point distribution, then scale each axis independently
    const points = items.map((_, i) => {
      const phi   = Math.acos(-1 + (2 * i) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;
      return {
        // x stretched wide, y & z keep circular proportions
        x: dims.rx * Math.cos(theta) * Math.sin(phi),
        y: dims.ry * Math.sin(theta) * Math.sin(phi),
        z: dims.rz * Math.cos(phi),
      };
    });

    const s = stateRef.current;
    const section = sectionRef.current;

    const onMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      if (s.isDragging) {
        // Left-right drag → rotY, Up-down drag → rotX
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

    const animate = () => {
      if (s.autoRotate) {
        s.velX += (0.0004 - s.velX) * 0.03;
        s.velY += (0.0018 - s.velY) * 0.03;
      }
      s.rotX += s.velX;
      s.rotY += s.velY;
      // Smooth deceleration after drag
      if (!s.isDragging) {
        s.velX *= 0.94;
        s.velY *= 0.94;
      }

      const cosX = Math.cos(s.rotX), sinX = Math.sin(s.rotX);
      const cosY = Math.cos(s.rotY), sinY = Math.sin(s.rotY);

      items.forEach((el, i) => {
        const { x, y, z } = points[i];

        // Standard XY rotation matrix
        const y1 =  y * cosX - z * sinX;
        const z1 =  y * sinX + z * cosX;
        const x1 =  x * cosY + z1 * sinY;
        const z2 = -x * sinY + z1 * cosY;

        // Normalise depth using rz (the circular radius)
        // so front/back contrast is strong and clear
        const depth   = (z2 + dims.rz) / (2 * dims.rz);
        const scale   = 0.5 + depth * 0.8;       // 0.5 → 1.3 scale range
        const opacity = 0.12 + depth * 0.88;      // 0.12 → 1.0 opacity range

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
    animate();

    return () => {
      section.removeEventListener("mousemove",  onMouseMove);
      section.removeEventListener("mousedown",  onMouseDown);
      section.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseup",     onMouseUp);
      cancelAnimationFrame(animRef.current);
    };
  }, [dims]);

  return (
    <>
      <style>{`
        .skills-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
          cursor: none;
          display: flex;
          flex-direction: column;
          align-items: center;
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

        /* ── HEADER ── */
        .skills-header {
          position: relative;
          z-index: 20;
          text-align: center;
          padding: 100px 40px 40px;
          pointer-events: none;
          width: 100%;
        }

        .skills-eyebrow {
          font-family: 'Fira Code', monospace;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(110, 231, 183, 0.4);
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin: 0 0 16px;
        }
        .skills-eyebrow::before,
        .skills-eyebrow::after {
          content: '';
          display: block;
          width: 28px;
          height: 1px;
          background: rgba(110, 231, 183, 0.2);
        }

        .skills-heading {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(3rem, 7vw, 6rem);
          font-weight: 800;
          letter-spacing: -0.045em;
          line-height: 0.95;
          color: #f0f4ff;
          margin: 0 0 16px;
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
          width: 24px;
          height: 1px;
          background: rgba(255,255,255,0.08);
        }

        /* ── ELLIPSOID WRAPPER ──
           Wide enough for rx, tall enough for ry.
           overflow:hidden clips nothing — mask fades edges softly.
        ── */
        .skills-ellipsoid-wrapper {
          position: relative;
          width: 100%;
          /* Height = 2 * ry + pill height clearance */
          height: 600px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
          /* Soft left/right fade so pills near edges dissolve, not clip */
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 6%,
            black 94%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 6%,
            black 94%,
            transparent 100%
          );
        }

        /* Top & bottom soft fade */
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

        /* Origin point — pills orbit around this */
        .skills-field {
          position: relative;
          width: 0;
          height: 0;
        }

        /* ── PILLS ── */
        .skill-pill {
          position: absolute;
          top: 0; left: 0;
          white-space: nowrap;
          padding: 7px 18px;
          border-radius: 100px;
          font-family: 'Outfit', sans-serif;
          font-size: clamp(11px, 1.05vw, 14px);
          font-weight: 600;
          letter-spacing: 0.01em;
          cursor: none;
          user-select: none;
          will-change: transform, opacity;
          transition: box-shadow .2s ease, background .2s ease, border-color .2s ease;
        }
        .skill-pill:hover {
          z-index: 9999 !important;
          opacity: 1 !important;
        }

        /* ── BOTTOM STRIP ── */
        .skills-strip {
          position: relative;
          z-index: 20;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 32px 0 48px;
          background: linear-gradient(to top, rgba(8,11,18,0.95) 0%, rgba(8,11,18,0.5) 60%, transparent 100%);
          flex-shrink: 0;
          pointer-events: none;
        }
        .strip-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 40px;
          border-right: 1px solid rgba(255,255,255,0.06);
        }
        .strip-item:last-child { border-right: none; }
        .strip-val {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.6rem, 2.5vw, 2.4rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1;
          background: linear-gradient(135deg, #6ee7b7, rgba(110,231,183,0.45));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 6px;
        }
        .strip-label {
          font-family: 'Fira Code', monospace;
          font-size: 10.5px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(110,231,183,0.28);
        }
      `}</style>

      <section id="skills" className="skills-section" ref={sectionRef}>

        {/* ── Header ── */}
        <div
          className="skills-header"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity .7s ease, transform .7s ease",
          }}
        >
          <p className="skills-eyebrow">Technical Arsenal</p>
          <h2 className="skills-heading">
            My <span>Skills</span> &amp; Stack.
          </h2>
          <p className="skills-drag-hint">drag anywhere to rotate</p>
        </div>

        {/* ── 3D ellipsoid ── */}
        <div className="skills-ellipsoid-wrapper">
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
                  borderWidth: "1px",
                  borderStyle: "solid",
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
            opacity:    visible ? 1 : 0,
            transition: "opacity .7s .4s ease",
          }}
        >
          {[
            { val: SKILLS.length + "+", label: "Technologies" },
            { val: "7",                 label: "Domains"      },
            { val: "3+",                label: "Years Exp."   },
          ].map((s, i) => (
            <div key={i} className="strip-item">
              <div className="strip-val">{s.val}</div>
              <div className="strip-label">{s.label}</div>
            </div>
          ))}
        </div>

      </section>
    </>
  );
}