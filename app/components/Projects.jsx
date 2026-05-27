"use client";
import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    title: "AI Productivity Tracker",
    desc: "Tracks and classifies user activity in real time using machine learning to surface insights and boost focus.",
    tags: ["Python", "ML", "React", "Node.js"],
    color: "#63d2ff",
    glow: "rgba(99,210,255,0.08)",
    border: "rgba(99,210,255,0.18)",
    gradient: "linear-gradient(135deg, rgba(99,210,255,0.07) 0%, transparent 65%)",
    demo: "#",
    repo: "https://github.com/Malee-Dil/focus-ai-system",
    year: "2024",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2z"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
  },
  {
    title: "Attendance System",
    desc: "Fingerprint-based smart attendance platform with real-time dashboard, reporting, and admin controls.",
    tags: ["Laravel", "PHP", "MySQL", "Hardware"],
    color: "#c882ff",
    glow: "rgba(200,130,255,0.08)",
    border: "rgba(200,130,255,0.18)",
    gradient: "linear-gradient(135deg, rgba(200,130,255,0.07) 0%, transparent 65%)",
    demo: "#",
    repo: "https://github.com/Malee-Dil/attendance-management-system",
    year: "2024",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    title: "Generator Service System",
    desc: "Full-stack job and service management platform — scheduling, invoicing, and technician dispatch in one place.",
    tags: ["React", "Node.js", "MongoDB", "REST API"],
    color: "#84ffb0",
    glow: "rgba(132,255,176,0.08)",
    border: "rgba(132,255,176,0.18)",
    gradient: "linear-gradient(135deg, rgba(132,255,176,0.07) 0%, transparent 65%)",
    demo: "#",
    repo: "https://github.com/NishanshaSachith/magmaapp-full-project",
    year: "2023",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
];

/* ─── responsive hook ─────────────────────────────── */
function useBreakpoint() {
  const [bp, setBp] = useState({ isMobile: false, isTablet: false });
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setBp({ isMobile: w < 640, isTablet: w >= 640 && w < 1024 });
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return bp;
}

/* ─── LinkBtn ─────────────────────────────────────── */
function LinkBtn({ href, title, children }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 32, height: 32,
        borderRadius: 9,
        border: `1px solid ${hov ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)"}`,
        background: hov ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: hov ? "#f0f4ff" : "rgba(240,244,255,0.35)",
        textDecoration: "none",
        transition: "all .2s ease",
        flexShrink: 0,
      }}
    >
      {children}
    </a>
  );
}

/* ─── ProjectCard ─────────────────────────────────── */
function ProjectCard({ project, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 20,
        border: `1px solid ${hovered ? project.border : "rgba(255,255,255,0.06)"}`,
        background: hovered ? project.glow : "rgba(255,255,255,0.02)",
        padding: "clamp(20px, 4vw, 32px)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateY(-6px)" : "translateY(0)"
          : "translateY(32px)",
        boxShadow: hovered
          ? `0 20px 60px ${project.glow}, 0 0 0 1px ${project.border}`
          : "none",
        transition: `
          opacity .65s ${0.08 + index * 0.12}s cubic-bezier(.16,1,.3,1),
          transform .65s ${0.08 + index * 0.12}s cubic-bezier(.16,1,.3,1),
          border-color .25s ease,
          background .25s ease,
          box-shadow .3s ease
        `,
        fontFamily: "'Outfit', sans-serif",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* corner gradient wash */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: project.gradient,
        opacity: hovered ? 1 : 0,
        transition: "opacity .3s ease",
        pointerEvents: "none",
        borderRadius: "inherit",
      }} />

      {/* top row: icon + year + links */}
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 20,
        position: "relative",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {/* icon box */}
          <div style={{
            width: 44, height: 44,
            borderRadius: 12,
            background: project.glow,
            border: `1px solid ${project.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: project.color,
            flexShrink: 0,
            boxShadow: hovered ? `0 0 20px ${project.glow}` : "none",
            transition: "box-shadow .25s ease",
          }}>
            {project.icon}
          </div>

          {/* year badge */}
          <span style={{
            fontFamily: "'Fira Code', monospace",
            fontSize: 10.5,
            letterSpacing: "0.12em",
            padding: "3px 10px",
            borderRadius: 100,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "rgba(240,244,255,0.3)",
          }}>
            {project.year}
          </span>
        </div>

        {/* links */}
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          {[
            {
              href: project.repo,
              title: "Source code",
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.2 22 16.447 22 12.021 22 6.484 17.522 2 12 2z"/>
                </svg>
              ),
            },
            {
              href: project.demo,
              title: "Live demo",
              icon: (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              ),
            },
          ].map((btn, bi) => (
            <LinkBtn key={bi} href={btn.href} title={btn.title}>{btn.icon}</LinkBtn>
          ))}
        </div>
      </div>

      {/* title */}
      <h3 style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: "clamp(1rem, 3.5vw, 1.2rem)",
        fontWeight: 700,
        letterSpacing: "-0.02em",
        lineHeight: 1.2,
        color: hovered ? "#f0f4ff" : "rgba(240,244,255,0.88)",
        marginBottom: 10,
        position: "relative",
        transition: "color .2s",
        margin: "0 0 10px 0",
      }}>
        {project.title}
      </h3>

      {/* desc */}
      <p style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: "clamp(0.82rem, 2.5vw, 0.93rem)",
        lineHeight: 1.7,
        color: "rgba(240,244,255,0.4)",
        marginBottom: 20,
        position: "relative",
        flexGrow: 1,
        margin: "0 0 20px 0",
      }}>
        {project.desc}
      </p>

      {/* tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, position: "relative" }}>
        {project.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: "'Fira Code', monospace",
            fontSize: 10,
            letterSpacing: "0.08em",
            padding: "3px 10px",
            borderRadius: 100,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "rgba(240,244,255,0.32)",
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Section ────────────────────────────────── */
export default function Projects() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  const fade = (delay = 0) => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity .7s ${delay}s cubic-bezier(.16,1,.3,1), transform .7s ${delay}s cubic-bezier(.16,1,.3,1)`,
  });

  /* grid: 1 col on mobile, 2 on tablet, 3 on desktop */
  const gridCols = isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)";

  /* padding: tight on mobile, medium on tablet, generous on desktop */
  const sectionPadding = isMobile
    ? "80px 20px 60px"
    : isTablet
    ? "90px 40px 70px"
    : "100px 80px";

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: sectionPadding,
        overflow: "hidden",
        fontFamily: "'Outfit', sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* ambient glow */}
      <div aria-hidden style={{
        position: "absolute",
        top: "30%", left: "50%",
        transform: "translateX(-50%)",
        width: "min(900px, 120vw)",
        height: 500,
        background: "radial-gradient(ellipse, rgba(99,210,255,0.04) 0%, transparent 70%)",
        filter: "blur(80px)",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1300,
        width: "100%",
        margin: "0 auto",
      }}>

        {/* ── Header ── */}
        <div style={{
          display: "flex",
          alignItems: isMobile ? "flex-start" : "flex-end",
          justifyContent: "space-between",
          flexDirection: isMobile ? "column" : "row",
          marginBottom: isMobile ? 40 : 64,
          gap: isMobile ? 24 : 40,
        }}>

          {/* left: label + heading */}
          <div>
            <p style={{
              ...fade(0),
              fontFamily: "'Fira Code', monospace",
              fontSize: 10.5,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(240,244,255,0.25)",
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 10,
              margin: "0 0 12px 0",
            }}>
              <span style={{ display: "block", width: 24, height: 1, background: "rgba(255,255,255,0.15)" }} />
              Selected Work
            </p>

            <h2 style={{
              ...fade(.08),
              fontFamily: "'Outfit', sans-serif",
              fontSize: isMobile ? "clamp(2.6rem, 11vw, 3.6rem)" : "clamp(3.2rem, 6vw, 5.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: "#f0f4ff",
              margin: 0,
            }}>
              Things I've{" "}
              <span style={{
                background: "linear-gradient(135deg, #63d2ff, #c882ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                built.
              </span>
            </h2>
          </div>

          {/* right: tagline + github link */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: isMobile ? "flex-start" : "flex-end",
            gap: 14,
          }}>
            <p style={{
              ...fade(.12),
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(0.87rem, 2.5vw, 1rem)",
              lineHeight: 1.7,
              color: "rgba(240,244,255,0.38)",
              maxWidth: 340,
              textAlign: isMobile ? "left" : "right",
              margin: 0,
            }}>
              A few projects I'm proud of —<br />from AI tools to full-stack platforms.
            </p>

            <a
              href="https://github.com/Malee-Dil"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...fade(.16),
                fontFamily: "'Fira Code', monospace",
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "10px 20px",
                borderRadius: 100,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.03)",
                color: "rgba(240,244,255,0.45)",
                textDecoration: "none",
                display: "inline-block",
                transition: "all .2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
                e.currentTarget.style.color = "#f0f4ff";
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "rgba(240,244,255,0.45)";
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              }}
            >
              View all on GitHub →
            </a>
          </div>
        </div>

        {/* ── Project cards grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: gridCols,
          gap: isMobile ? 14 : 18,
          alignItems: "stretch",
        }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} visible={visible} />
          ))}
        </div>

      </div>
    </section>
  );
}