"use client";
import { useEffect, useRef, useState } from 'react';

const EMAIL = 'maleesha@email.com';

const LINKS = [
  {
    key: 'github',
    label: 'GitHub',
    sub: 'View my code',
    href: 'https://github.com/maleesha',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.2 22 16.447 22 12.021 22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    sub: 'Lets connect',
    href: 'https://www.linkedin.com/in/maleesha-kavindya/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

// Reusable animated div — applies visible classes only when `show` is true
function FadeUp({ show, delay = 0, className = '', children }) {
  return (
    <div
      className={className}
      style={{
        opacity:    show ? 1 : 0,
        transform:  show ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [copied,  setCopied]  = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  const copy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 lg:py-[120px] px-6 font-[var(--font-display)]"
    >
      {/* ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-transparent via-violet-500/7 to-transparent blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="container relative z-10 text-center max-w-4xl">

        {/* ── Eyebrow ── */}
        <FadeUp show={visible} delay={0} className="flex items-center justify-center gap-3 mb-4">
          <span className="w-6 h-px bg-border-soft block" />
          <p className="eyebrow">Get In Touch</p>
          <span className="w-6 h-px bg-border-soft block" />
        </FadeUp>

        {/* ── Heading ── */}
        <FadeUp show={visible} delay={100}>
          <h2 className="mb-4 leading-tight">
            Let&apos;s build something
            <br />
            <span className="text-gradient block">remarkable.</span>
          </h2>
        </FadeUp>

        {/* ── Sub-heading ── */}
        <p style={{
          textAlign:  'center',
          color:      'var(--text-secondary)',
          fontSize:   '1.1rem',
          lineHeight: '1.75',
          maxWidth:   '28rem',
          margin:     '0 auto 3rem auto',
          opacity:    visible ? 1 : 0,
          transform:  visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s ease 200ms, transform 0.7s ease 200ms',
        }}>
          Open to internships, freelance projects, and interesting collaborations.
          If you have an idea — my inbox is always open.
        </p>

        {/* ── Email copy row ── */}
        <FadeUp show={visible} delay={300} className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-3 p-2.5 pl-5 rounded-full glass">
            <span className="font-mono text-sm text-text-muted tracking-wide">
              {EMAIL}
            </span>
            <button
              onClick={copy}
              className={`btn text-xs tracking-widest px-3.5 py-1 border transition-all duration-200 ${
                copied
                  ? 'border-green-500/30 bg-green-500/10 text-green-400'
                  : 'border-border-soft/50 bg-bg-surface/50 text-text-ghost hover:border-accent-blue hover:text-accent-blue hover:shadow-glow-blue'
              }`}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </FadeUp>

        {/* ── Divider ── */}
        <FadeUp show={visible} delay={350}>
          <div className="divider-line mb-10" />
        </FadeUp>

        {/* ── Social cards ── */}
        <FadeUp show={visible} delay={400}>
          <div className="flex flex-wrap justify-center gap-4">
            {LINKS.map((l) => (
              <a
                key={l.key}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHovered(l.key)}
                onMouseLeave={() => setHovered(null)}
                className={`social-link min-w-[11rem] group ${
                  hovered === l.key
                    ? 'glow-blue border-accent-blue/25 bg-accent-blue/5 text-accent-blue'
                    : 'border-border-subtle hover:border-border-soft hover:shadow-glow-blue hover:-translate-y-0.5'
                }`}
              >
                <span className={`${hovered === l.key ? 'text-accent-blue' : 'text-text-ghost'} transition-colors flex-shrink-0`}>
                  {l.icon}
                </span>
                <div className="text-left grow">
                  <div className="font-display text-sm font-semibold leading-tight group-hover:text-text-primary">
                    {l.label}
                  </div>
                  <div className="font-mono text-xs uppercase tracking-[0.08em] text-text-ghost mt-1">
                    {l.sub}
                  </div>
                </div>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-auto opacity-0 group-hover:opacity-50 -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200 flex-shrink-0"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            ))}
          </div>
        </FadeUp>

        {/* ── Footer note ── */}
        <p
          className="font-mono text-sm uppercase tracking-[0.18em] text-text-ghost mt-14"
          style={{
            opacity:    visible ? 0.9 : 0,
            transition: 'opacity 0.7s ease 700ms',
          }}
        >
          Designed &amp; built by Maleesha · {new Date().getFullYear()}
        </p>

      </div>
    </section>
  );
}