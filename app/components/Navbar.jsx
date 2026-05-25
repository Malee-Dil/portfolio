"use client";
import { useEffect, useRef, useState } from "react";

const LINKS = [
  { label: "About",    href: "#about"    },
  { label: "Skills",   href: "#skills"   },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact"  },
];

export default function Navbar() {
  const [mounted,    setMounted]    = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [active,     setActive]     = useState(null);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [hovered,    setHovered]    = useState(null);
  const indicatorRef = useRef(null);
  const navLinksRef  = useRef({});

  // Slide-down entrance
  useEffect(() => { requestAnimationFrame(() => setMounted(true)); }, []);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracker
  useEffect(() => {
    const ids = LINKS.map(l => l.href.replace("#", ""));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive("#" + e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Move hover indicator
  useEffect(() => {
    const key = hovered || active;
    const el  = navLinksRef.current[key];
    const ind = indicatorRef.current;
    if (!el || !ind) return;
    const rect    = el.getBoundingClientRect();
    const parent  = el.parentElement.getBoundingClientRect();
    ind.style.width   = rect.width  + "px";
    ind.style.left    = (rect.left - parent.left) + "px";
    ind.style.opacity = "1";
  }, [hovered, active]);

  const hideIndicator = () => {
    if (!active) indicatorRef.current.style.opacity = "0";
    else {
      const el = navLinksRef.current[active];
      const ind = indicatorRef.current;
      if (!el || !ind) return;
      const rect   = el.getBoundingClientRect();
      const parent = el.parentElement.getBoundingClientRect();
      ind.style.width  = rect.width + "px";
      ind.style.left   = (rect.left - parent.left) + "px";
      ind.style.opacity = "1";
    }
  };

  return (
    <>
      <style>{`
        @keyframes navDown { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes menuFade { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <nav style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        height: 72,
        fontFamily: "'Syne', sans-serif",
        background: scrolled
          ? "rgba(8,11,18,0.85)"
          : "rgba(8,11,18,0)",
        backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.4)" : "none",
        transition: "background .4s ease, border-color .4s ease, box-shadow .4s ease, backdrop-filter .4s ease",
        opacity:    mounted ? 1 : 0,
        transform:  mounted ? "translateY(0)" : "translateY(-20px)",
        animation:  "navDown .6s cubic-bezier(.16,1,.3,1) both",
      }}>

        {/* Logo */}
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          {/* Monogram mark */}
          <div style={{
            width: 32, height: 32,
            borderRadius: 8,
            background: "linear-gradient(135deg, #63d2ff22, #c882ff22)",
            border: "1px solid rgba(99,210,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 13,
              fontWeight: 800,
              background: "linear-gradient(135deg, #63d2ff, #c882ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em",
            }}>M</span>
          </div>

          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
              fontSize: 18,
            letterSpacing: "-0.02em",
            background: "linear-gradient(135deg, #f0f4ff 0%, rgba(240,244,255,0.6) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Maleesha
          </span>
        </a>

        {/* Desktop links */}
        <div
          onMouseLeave={hideIndicator}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            position: "relative",
          }}
        >
          {/* Sliding indicator */}
          <div
            ref={indicatorRef}
            style={{
              position: "absolute",
              bottom: -2,
              height: 2,
              borderRadius: 2,
              background: "linear-gradient(90deg, #63d2ff, #c882ff)",
              transition: "left .25s cubic-bezier(.16,1,.3,1), width .25s cubic-bezier(.16,1,.3,1), opacity .2s",
              opacity: 0,
              pointerEvents: "none",
            }}
          />

          {LINKS.map(({ label, href }) => {
            const isActive = active === href;
            return (
              <a
                key={href}
                href={href}
                ref={el => navLinksRef.current[href] = el}
                onMouseEnter={() => setHovered(href)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "8px 14px",
                  borderRadius: 8,
                  color: isActive || hovered === href
                    ? "#f0f4ff"
                    : "rgba(240,244,255,0.4)",
                  textDecoration: "none",
                  transition: "color .2s ease, background .2s ease",
                  background: hovered === href && !isActive
                    ? "rgba(255,255,255,0.04)"
                    : "transparent",
                  position: "relative",
                }}
              >
                {label}
              </a>
            );
          })}

          {/* CTA */}
          <a
            href="mailto:www.maleeshadilshan231@email.com"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "8px 18px",
              borderRadius: 100,
              marginLeft: 12,
              background: "linear-gradient(135deg, #63d2ff18, #c882ff18)",
              border: "1px solid rgba(99,210,255,0.25)",
              color: "#63d2ff",
              textDecoration: "none",
              transition: "all .2s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "linear-gradient(135deg, #63d2ff28, #c882ff28)";
              e.currentTarget.style.borderColor = "rgba(99,210,255,0.5)";
              e.currentTarget.style.boxShadow = "0 0 18px rgba(99,210,255,0.2)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "linear-gradient(135deg, #63d2ff18, #c882ff18)";
              e.currentTarget.style.borderColor = "rgba(99,210,255,0.25)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Hire me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(p => !p)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            flexDirection: "column",
            gap: 5,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
          }}
          className="nav-hamburger"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block",
              width: i === 1 ? 16 : 22,
              height: 1.5,
              borderRadius: 2,
              background: "rgba(240,244,255,0.6)",
              transition: "width .2s ease",
            }} />
          ))}
        </button>

      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position: "fixed",
          top: 64, left: 0, right: 0,
          zIndex: 99,
          background: "rgba(8,11,18,0.96)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "16px 32px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          animation: "menuFade .25s cubic-bezier(.16,1,.3,1) both",
        }}>
          {LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "12px 0",
                color: active === href ? "#63d2ff" : "rgba(240,244,255,0.55)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                transition: "color .2s",
              }}
            >
              {label}
            </a>
          ))}
          <a
            href="mailto:maleesha@email.com"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginTop: 12,
              padding: "10px 0",
              color: "#63d2ff",
              textDecoration: "none",
            }}
          >
            → Hire me
          </a>
        </div>
      )}

      {/* Mobile-only CSS */}
      <style>{`
        @media (max-width: 680px) {
          .nav-hamburger { display: flex !important; }
        }
        @media (min-width: 681px) {
          .nav-hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}