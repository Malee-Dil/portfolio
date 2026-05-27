"use client";
import { useEffect, useState, useRef } from "react";

const ROLES = [
  "Full-Stack Developer",
  "AI Systems Builder",
  "Problem Solver",
  "React Specialist",
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const typeRef = useRef({ charIdx: 0, deleting: false, traitIdx: 0, timeout: null });

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const r = typeRef.current;
    const tick = () => {
      const current = ROLES[r.traitIdx];
      if (!r.deleting) {
        r.charIdx++;
        setTypedText(current.slice(0, r.charIdx));
        if (r.charIdx === current.length) {
          r.deleting = true;
          r.timeout = setTimeout(tick, 1800);
          return;
        }
        r.timeout = setTimeout(tick, 68);
      } else {
        r.charIdx--;
        setTypedText(current.slice(0, r.charIdx));
        if (r.charIdx === 0) {
          r.deleting = false;
          r.traitIdx = (r.traitIdx + 1) % ROLES.length;
          r.timeout = setTimeout(tick, 320);
          return;
        }
        r.timeout = setTimeout(tick, 34);
      }
    };
    r.timeout = setTimeout(tick, 900);
    return () => clearTimeout(r.timeout);
  }, []);

  const fade = (delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(32px)",
    transition: `opacity .9s ${delay}s cubic-bezier(.16,1,.3,1),
                 transform .9s ${delay}s cubic-bezier(.16,1,.3,1)`,
  });

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 48px",
        overflow: "hidden",
        fontFamily: "'Outfit', sans-serif",
        textAlign: "center",
      }}
    >
      {/* ── Ambient blobs ── */}
      <div aria-hidden style={{
        position: "absolute", top: "0%", left: "-10%",
        width: 700, height: 600, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(99,210,255,0.09) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", top: "-5%", right: "-8%",
        width: 600, height: 550, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(200,130,255,0.08) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: "10%", left: "40%",
        width: 500, height: 400, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(132,255,176,0.05) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      {/* ── Scattered background dots ── */}
      {[
        { top: "12%", left: "8%",   size: 4 },
        { top: "25%", right: "12%", size: 3 },
        { top: "60%", left: "5%",   size: 3 },
        { top: "75%", right: "8%",  size: 4 },
        { top: "40%", left: "18%",  size: 2 },
        { top: "30%", right: "22%", size: 2 },
        { top: "80%", left: "30%",  size: 3 },
        { top: "15%", right: "35%", size: 2 },
      ].map((d, i) => (
        <div key={i} aria-hidden style={{
          position: "absolute",
          top: d.top, left: d.left, right: d.right,
          width: d.size, height: d.size,
          borderRadius: "50%",
          background: "rgba(240,244,255,0.15)",
          pointerEvents: "none",
        }} />
      ))}

      {/* ── Small decorative shapes (image-2 style) ── */}
      <div aria-hidden style={{
        position: "absolute", top: "8%", left: "14%",
        width: 16, height: 16,
        border: "1.5px solid rgba(99,210,255,0.4)",
        borderRadius: 3, transform: "rotate(15deg)", pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", top: "8%", right: "18%",
        width: 14, height: 14,
        border: "1.5px solid rgba(200,130,255,0.4)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", top: "15%", right: "10%",
        width: 10, height: 10,
        border: "1.5px solid rgba(99,210,255,0.35)",
        transform: "rotate(45deg)", pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", top: "18%", left: "5%",
        width: 20, height: 20,
        border: "1.5px solid rgba(200,130,255,0.25)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: "20%", right: "15%",
        width: 12, height: 12,
        border: "1.5px solid rgba(132,255,176,0.35)",
        borderRadius: 2, transform: "rotate(20deg)", pointerEvents: "none",
      }} />

      {/* ── Main content ── */}
      <div style={{
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: 1100,
        margin: "0 auto",
      }}>

        {/* ── Availability badge ── */}
        <div style={{
          ...fade(0),
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "7px 18px",
          borderRadius: 100,
          background: "rgba(132,255,176,0.07)",
          border: "1px solid rgba(132,255,176,0.2)",
          marginBottom: 40,
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: "50%",
            background: "#84ffb0", boxShadow: "0 0 8px #84ffb0",
            animation: "heroPulse 2s ease infinite", flexShrink: 0,
          }} />
          <span style={{
            fontFamily: "'Fira Code', monospace",
            fontSize: 10, letterSpacing: "0.15em",
            textTransform: "uppercase", color: "#84ffb0",
          }}>
            Open to opportunities
          </span>
        </div>

        {/* ── BOX with side images + name ── */}
        <div style={{
          ...fade(0.08),
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: 900,
          marginBottom: 40,
          padding: "0 80px",
        }}>

          {/* Left image — rotated left like image 2 */}
          <div style={{
            position: "absolute",
            left: -20,
            bottom: -28,
            zIndex: 4,
            transform: "rotate(-18deg)",
            animation: "floatLeft 3s ease-in-out infinite",
          }}>
            <img
              src="/Ok-hand.png"
              alt="OK hand"
              style={{
                width: 180,
                filter: "drop-shadow(0 4px 24px rgba(99,210,255,0.35))",
              }}
            />
          </div>

          {/* The rainbow-border frame box */}
          <div style={{
            flex: 1,
            position: "relative",
            borderRadius: 12,
            padding: "40px 52px 34px",
            //background: "transparent",
            backdropFilter: "blur(12px)",
            /* Rainbow gradient border via backgroundImage trick */
            border: "2px solid transparent",
            // backgroundImage: `
            //   linear-gradient(rgba(8,11,18,0.72), rgba(8,11,18,0.72)),
            //   linear-gradient(135deg, #63d2ff 0%, #c882ff 35%, #ff82b0 60%, #ffdd63 80%, #84ffb0 100%)
            // `,
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}>

            {/* Corner accent squares like image 2 */}
            {[
              { top: -1, left: -1, borderRight: "none", borderBottom: "none" },
              { top: -1, right: -1, borderLeft: "none", borderBottom: "none" },
              { bottom: -1, left: -1, borderRight: "none", borderTop: "none" },
              { bottom: -1, right: -1, borderLeft: "none", borderTop: "none" },
            ].map((s, i) => (
              <div key={i} aria-hidden style={{
                position: "absolute",
                width: 12, height: 12,
                border: "2px solid rgba(99,210,255,0.8)",
                background: "transparent",
                ...s,
              }} />
            ))}

            {/* Window dots top-left */}
            <div style={{
              position: "absolute", top: 14, left: 18,
              display: "flex", gap: 6,
            }}>
              {["rgba(255,90,90,0.7)", "rgba(255,190,50,0.7)", "rgba(50,210,100,0.7)"].map((c, i) => (
                <span key={i} style={{
                  width: 10, height: 10, borderRadius: "50%",
                  //background: c, display: "block",
                }} />
              ))}
            </div>

            {/* Name — Bebas Neue: chunky uppercase like image 2 */}
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3.2rem, 8vw, 6.5rem)",
              fontWeight: 400,
              letterSpacing: "0.05em",
              lineHeight: 1,
              margin: "0 0 18px",
              background: "linear-gradient(135deg, #63d2ff 0%, #c882ff 55%, #ff82b0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Maleesha Dilshan
            </h1>

            {/* Subtitle row */}
            <div style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(1rem, 2vw, 1.4rem)",
              color: "rgba(240,244,255,0.55)",
              letterSpacing: "0.05em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}>
              <span>UI</span>
              <span style={{ color: "rgba(99,210,255,0.4)" }}>×</span>
              <span>UX</span>
              <span style={{ color: "rgba(99,210,255,0.4)" }}>×</span>
              <span>Software Engineering</span>
            </div>
          </div>

          {/* Right image — rotated right like image 2 */}
          <div style={{
            position: "absolute",
            right: -20,
            bottom: -28,
            zIndex: 4,
            transform: "rotate(18deg)",
            animation: "floatRight 3.4s ease-in-out infinite",
          }}>
            <img
              src="/pineapple.webp"
              alt="Pineapple"
              style={{
                width: 180,
                filter: "drop-shadow(0 4px 24px rgba(200,130,255,0.35))",
              }}
            />
          </div>
        </div>

        {/* ── Typewriter ── */}
        <div style={{
          ...fade(0.18),
          fontFamily: "'Fira Code', monospace",
          fontSize: 13,
          color: "rgba(240,244,255,.35)",
          display: "flex",
          alignItems: "center",
          gap: 6,
          letterSpacing: "0.04em",
          marginBottom: 44,
        }}>
          <span style={{ color: "rgba(99,210,255,.5)" }}>~/</span>
          <span style={{ color: "rgba(240,244,255,.6)" }}>{typedText}</span>
          <span style={{
            display: "inline-block", width: 2, height: 14,
            background: "#63d2ff", borderRadius: 2,
            animation: "heroBlink 1s step-end infinite",
          }} />
        </div>

        {/* ── CTAs ── */}
        <div style={{
          ...fade(0.24),
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: 56,
        }}>
          <HoverButton href="#projects" primary label="View Projects"
            icon={
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            }
          />
          <HoverButton href="/Maleesha_Dilshan_CV.pdf" label="Download CV"
            icon={
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
            }
          />
        </div>

        {/* ── Stat strip ── */}
        <div style={{
          ...fade(0.3),
          display: "flex",
          gap: 0,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: 32,
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "center",
        }}>
          {[
            { val: "3+",        desc: "Years of experience", emoji: "🗓️" },
            { val: "20+",       desc: "Projects shipped",    emoji: "📦" },
            { val: "7",         desc: "Tech domains",        emoji: "🛠️" },
            { val: "Sri Lanka", desc: "Based in",            emoji: "🌍" },
          ].map((s, i) => (
            <div key={i} style={{
              flex: "1 1 160px",
              padding: "0 28px",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
              display: "flex", flexDirection: "column", alignItems: "center",
            }}>
              <span style={{ fontSize: 20, marginBottom: 6 }}>{s.emoji}</span>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)",
                fontWeight: 400,
                letterSpacing: "0.05em",
                lineHeight: 1,
                background: "linear-gradient(135deg, #f0f4ff, rgba(240,244,255,0.5))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: 6,
              }}>
                {s.val}
              </div>
              <div style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: 10,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(240,244,255,0.25)",
              }}>
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div style={{
        position: "absolute", bottom: 36, left: "50%",
        transform: "translateX(-50%)", zIndex: 1,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        opacity: mounted ? 0.4 : 0,
        transition: "opacity 1s 1.4s ease",
      }}>
        <span style={{
          fontFamily: "'Fira Code', monospace",
          fontSize: 9, letterSpacing: "0.25em",
          textTransform: "uppercase", color: "rgba(240,244,255,.5)",
        }}>
          Scroll
        </span>
        <div style={{
          width: 1, height: 48,
          background: "linear-gradient(to bottom, rgba(240,244,255,.4), transparent)",
          animation: "heroScrollLine 2s ease infinite",
        }} />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Dancing+Script:wght@600&family=Fira+Code:wght@400&family=Outfit:wght@400;600;800;900&display=swap');

        @keyframes heroBlink {
          0%,100% { opacity:1 } 50% { opacity:0 }
        }
        @keyframes heroPulse {
          0%,100% { opacity:1; transform:scale(1) }
          50%      { opacity:.5; transform:scale(.7) }
        }
        @keyframes heroScrollLine {
          0%   { transform:scaleY(0); transform-origin:top;    opacity:1 }
          50%  { transform:scaleY(1); transform-origin:top;    opacity:1 }
          100% { transform:scaleY(1); transform-origin:bottom; opacity:0 }
        }
        @keyframes floatLeft {
          0%,100% { transform: rotate(-18deg) translateY(0px); }
          50%     { transform: rotate(-18deg) translateY(-10px); }
        }
        @keyframes floatRight {
          0%,100% { transform: rotate(18deg) translateY(0px); }
          50%     { transform: rotate(18deg) translateY(-10px); }
        }
      `}</style>
    </section>
  );
}

function HoverButton({ href, label, icon, primary }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      target={href.endsWith(".pdf") ? "_blank" : undefined}
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "13px 28px", borderRadius: 100,
        fontFamily: "'Outfit', sans-serif",
        fontSize: 14, fontWeight: 600, letterSpacing: "0.01em",
        textDecoration: "none",
        transition: "all .25s cubic-bezier(.16,1,.3,1)",
        ...(primary ? {
          background: "linear-gradient(135deg, #63d2ff, #c882ff)",
          color: "#080b12", border: "1px solid transparent",
          boxShadow: hov ? "0 0 32px rgba(99,210,255,.35)" : "none",
          transform: hov ? "translateY(-2px)" : "translateY(0)",
          opacity: hov ? 0.9 : 1,
        } : {
          background: hov ? "rgba(255,255,255,.06)" : "rgba(255,255,255,.03)",
          color: hov ? "#f0f4ff" : "rgba(240,244,255,.6)",
          border: `1px solid ${hov ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.09)"}`,
          transform: hov ? "translateY(-2px)" : "translateY(0)",
        }),
      }}
    >
      {label}
      <span style={{
        transform: hov ? "translate(2px,-1px)" : "translate(0,0)",
        transition: "transform .2s ease", display: "flex",
      }}>
        {icon}
      </span>
    </a>
  );
}