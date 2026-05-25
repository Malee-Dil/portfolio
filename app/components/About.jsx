"use client";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: "3+",  label: "Years\nCoding"    },
  { value: "20+", label: "Projects\nBuilt"  },
  { value: "7",   label: "Tech\nDomains"    },
  { value: "∞",   label: "Problems\nSolved" },
];

const TRAITS = [
  "Full-Stack Dev",
  "AI Enthusiast",
  "Problem Solver",
  "Open Source",
  "Clean Code",
  "System Design",
];

export default function About() {
  const sectionRef = useRef(null);
  const [visible, setVisible]     = useState(false);
  const [typedText, setTypedText] = useState("");
  const typeRef = useRef({ charIdx: 0, traitIdx: 0, deleting: false, timeout: null });

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const t = typeRef.current;
    const tick = () => {
      const current = TRAITS[t.traitIdx];
      if (!t.deleting) {
        t.charIdx++;
        setTypedText(current.slice(0, t.charIdx));
        if (t.charIdx === current.length) {
          t.deleting = true;
          t.timeout = setTimeout(tick, 1600);
          return;
        }
        t.timeout = setTimeout(tick, 72);
      } else {
        t.charIdx--;
        setTypedText(current.slice(0, t.charIdx));
        if (t.charIdx === 0) {
          t.deleting = false;
          t.traitIdx = (t.traitIdx + 1) % TRAITS.length;
          t.timeout = setTimeout(tick, 300);
          return;
        }
        t.timeout = setTimeout(tick, 36);
      }
    };
    t.timeout = setTimeout(tick, 800);
    return () => clearTimeout(t.timeout);
  }, []);

  const fade = (delay = 0) => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? "translateY(0)" : "translateY(28px)",
    transition: `opacity .8s ${delay}s cubic-bezier(.16,1,.3,1), transform .8s ${delay}s cubic-bezier(.16,1,.3,1)`,
  });

  return (
    <>
      <style>{`
        .about-section {
          position: relative;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: stretch;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
        }

        /* ── LEFT PANEL ── */
        .about-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 100px 64px 80px 80px;
          position: relative;
          z-index: 1;
        }

        /* ── RIGHT PANEL ── */
        .about-right {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 80px 80px 40px;
          z-index: 1;
        }

        /* Faint vertical divider */
        .about-right::before {
          content: '';
          position: absolute;
          left: 0; top: 10%; bottom: 10%;
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent);
          pointer-events: none;
        }

        /* eyebrow */
        .about-eyebrow {
          font-family: 'Fira Code', monospace;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(240,244,255,0.25);
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
        }
        .about-eyebrow::before {
          content: '';
          display: block;
          width: 32px; height: 1px;
          background: rgba(240,244,255,0.2);
          flex-shrink: 0;
        }

        /* heading */
        .about-heading {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(3.5rem, 6vw, 5.5rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.0;
          color: #f0f4ff;
          margin-bottom: 20px;
        }

        .about-heading .accent {
          background: linear-gradient(135deg, #63d2ff, #c882ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* typewriter */
        .about-typewriter {
          font-family: 'Fira Code', monospace;
          font-size: 13px;
          color: #84ffb0;
          margin-bottom: 36px;
          display: flex;
          align-items: center;
          gap: 6px;
          min-height: 22px;
        }
        .about-typewriter-prefix { color: rgba(132,255,176,0.4); }
        .about-typewriter-cursor {
          display: inline-block;
          width: 2px; height: 14px;
          background: #84ffb0;
          border-radius: 2px;
          animation: aboutBlink 1s step-end infinite;
          vertical-align: middle;
          margin-left: 1px;
        }
        @keyframes aboutBlink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* bio */
        .about-bio {
          font-family: 'Dancing Script', cursive;
          font-size: clamp(1.1rem, 1.5vw, 1.35rem);
          font-weight: 600;
          line-height: 1.9;
          color: rgba(240,244,255,0.6);
          margin-bottom: 24px;
          max-width: 520px;
        }
        .about-bio strong { color: rgba(240,244,255,0.92); font-weight: 700; }
        .about-bio .hl    { color: #63d2ff; font-weight: 700; }

        /* badges */
        .about-meta {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        .meta-badge {
          font-family: 'Fira Code', monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          padding: 5px 14px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: rgba(240,244,255,0.45);
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .meta-badge .pulse-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #84ffb0;
          box-shadow: 0 0 6px #84ffb0;
          animation: aboutPulse 2s ease infinite;
          flex-shrink: 0;
        }
        @keyframes aboutPulse {
          0%,100%{opacity:1;transform:scale(1)}
          50%{opacity:.5;transform:scale(.7)}
        }

        /* CTAs */
        .about-ctas { display: flex; gap: 12px; flex-wrap: wrap; }

        .cta-primary {
          font-family: 'Fira Code', monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 13px 28px;
          border-radius: 100px;
          border: none;
          background: linear-gradient(135deg, #63d2ff, #c882ff);
          color: #080b12;
          text-decoration: none;
          display: inline-block;
          transition: opacity .2s, box-shadow .2s, transform .2s;
        }
        .cta-primary:hover {
          opacity: .85;
          box-shadow: 0 0 28px rgba(99,210,255,.35);
          transform: translateY(-2px);
        }

        .cta-ghost {
          font-family: 'Fira Code', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 13px 28px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: rgba(240,244,255,0.5);
          text-decoration: none;
          display: inline-block;
          transition: border-color .2s, color .2s, transform .2s;
        }
        .cta-ghost:hover {
          border-color: rgba(255,255,255,.22);
          color: #f0f4ff;
          transform: translateY(-2px);
        }

        /* ── STAT STRIP (bottom of left) ── */
        .stat-strip {
          display: flex;
          gap: 0;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin-top: 52px;
          padding-top: 32px;
        }
        .stat-strip-item {
          flex: 1;
          padding-right: 28px;
          border-right: 1px solid rgba(255,255,255,0.06);
          margin-right: 28px;
        }
        .stat-strip-item:last-child {
          border-right: none;
          margin-right: 0;
          padding-right: 0;
        }
        .stat-strip-val {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1;
          background: linear-gradient(135deg, #f0f4ff, rgba(240,244,255,0.45));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 6px;
        }
        .stat-strip-label {
          font-family: 'Fira Code', monospace;
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(240,244,255,0.25);
          white-space: pre-line;
          line-height: 1.4;
        }

        /* ── RIGHT: photo + cards ── */
        .about-photo-wrap {
          position: relative;
          width: 280px;
          height: 360px;
          margin-bottom: 40px;
          flex-shrink: 0;
        }

        .about-photo-wrap img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center bottom;
          display: block;
          filter: brightness(0.93) contrast(1.07)
                  drop-shadow(0 0 48px rgba(99,210,255,0.18))
                  drop-shadow(0 0 20px rgba(200,130,255,0.1));
        }

        .about-photo-fade {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 100px;
          background: linear-gradient(to top, #080b12 0%, transparent 100%);
          pointer-events: none;
        }

        /* floating chip */
        .about-status-chip {
          position: absolute;
          bottom: -18px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          font-family: 'Fira Code', monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          padding: 7px 18px;
          border-radius: 100px;
          background: rgba(8,11,18,0.92);
          border: 1px solid rgba(132,255,176,0.28);
          color: #84ffb0;
          display: flex;
          align-items: center;
          gap: 8px;
          backdrop-filter: blur(12px);
          z-index: 3;
          box-shadow: 0 4px 24px rgba(0,0,0,0.5);
        }

        /* mini info cards */
        .about-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          width: 100%;
          max-width: 340px;
        }

        .about-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 18px 16px;
          transition:
            background .2s ease,
            border-color .2s ease,
            transform .2s cubic-bezier(.16,1,.3,1);
        }
        .about-card:hover {
          background: rgba(255,255,255,0.055);
          border-color: rgba(255,255,255,0.12);
          transform: translateY(-3px);
        }
        .about-card-val {
          font-family: 'Outfit', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 6px;
          background: linear-gradient(135deg, #f0f4ff, rgba(240,244,255,0.4));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .about-card-label {
          font-family: 'Fira Code', monospace;
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(240,244,255,0.25);
          white-space: pre-line;
          line-height: 1.5;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .about-section {
            grid-template-columns: 1fr;
            min-height: unset;
          }
          .about-left  { padding: 80px 32px 48px; }
          .about-right { padding: 0 32px 80px; order: -1; }
          .about-right::before { display: none; }
          .about-photo-wrap { width: 200px; height: 260px; }
          .about-heading { font-size: clamp(2.4rem, 7vw, 3.6rem); }
          .stat-strip { flex-wrap: wrap; gap: 24px; }
          .stat-strip-item { border-right: none; margin-right: 0; }
        }
      `}</style>

      <section id="about" className="about-section" ref={sectionRef}>

        {/* ══════════ LEFT ══════════ */}
        <div className="about-left">

          <p className="about-eyebrow" style={fade(0)}>About Me</p>

          <h2 className="about-heading" style={fade(.08)}>
            Building things<br />
            that <span className="accent">matter.</span>
          </h2>

          {/* typewriter */}
          <div className="about-typewriter" style={fade(.14)}>
            <span className="about-typewriter-prefix">$ whoami →&nbsp;</span>
            <span>{typedText}</span>
            <span className="about-typewriter-cursor" />
          </div>

          <p className="about-bio" style={fade(.2)}>
            I'm a <strong>Computer Science undergraduate</strong> at the{" "}
            <span className="hl">University of Jaffna</span>, building
            full-stack applications that bridge elegant UI with robust backend
            architecture. My stack: <strong>React</strong>, <strong>Node.js</strong>,{" "}
            <strong>MongoDB</strong> — but I never stop at the stack I know.
          </p>

          <p className="about-bio" style={fade(.24)}>
            Deeply fascinated by <strong>AI systems</strong> and how they turn
            messy real-world problems into clean, automated solutions.
            I care about the details others skip.
          </p>

          {/* badges */}
          <div className="about-meta" style={fade(.28)}>
            <span className="meta-badge">
              <span className="pulse-dot" />
              Available for opportunities
            </span>
            <span className="meta-badge">🎓 Univ. of Jaffna</span>
            <span className="meta-badge">🇱🇰 Sri Lanka</span>
          </div>

          {/* CTAs */}
          <div className="about-ctas" style={fade(.32)}>
            <a href="#contact" className="cta-primary">Get in touch</a>
            <a href="#projects" className="cta-ghost">View my work →</a>
          </div>

          {/* Stat strip */}
          <div className="stat-strip" style={fade(.38)}>
            {STATS.map((s, i) => (
              <div key={i} className="stat-strip-item">
                <div className="stat-strip-val">{s.value}</div>
                <div className="stat-strip-label">{s.label}</div>
              </div>
            ))}
          </div>

        </div>

        {/* ══════════ RIGHT ══════════ */}
        <div className="about-right" style={{
          opacity:    visible ? 1 : 0,
          transform:  visible ? "translateX(0)" : "translateX(32px)",
          transition: "opacity .9s .15s cubic-bezier(.16,1,.3,1), transform .9s .15s cubic-bezier(.16,1,.3,1)",
        }}>

          {/* Photo */}
          <div className="about-photo-wrap">
            <img
              src="/Maleesha_Dil-removebg-preview.png"
              alt="Maleesha"
            />
            <div className="about-photo-fade" />

            {/* Status chip floating over photo bottom */}
            <div className="about-status-chip">
              <span style={{
                width: 7, height: 7,
                borderRadius: "50%",
                background: "#84ffb0",
                boxShadow: "0 0 8px #84ffb0",
                flexShrink: 0,
                animation: "aboutPulse 2s ease infinite",
              }} />
              Open to internships &amp; projects
            </div>
          </div>

          {/* Mini stat cards */}
          <div className="about-cards">
            {STATS.map((s, i) => (
              <div
                key={i}
                className="about-card"
                style={{
                  opacity:    visible ? 1 : 0,
                  transform:  visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity .55s ${.3 + i * .08}s cubic-bezier(.16,1,.3,1),
                               transform .55s ${.3 + i * .08}s cubic-bezier(.16,1,.3,1)`,
                }}
              >
                <div className="about-card-val">{s.value}</div>
                <div className="about-card-label">{s.label}</div>
              </div>
            ))}
          </div>

        </div>

      </section>
    </>
  );
}