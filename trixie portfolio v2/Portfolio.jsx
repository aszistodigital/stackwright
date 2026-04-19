/**
 * Portfolio.jsx - Stackwright Solutions v2
 * Trixie Shane Maningding: Fractional COO for Founder-Led Agencies
 *
 * Required dependencies:
 *   npm install react lucide-react
 *   Tailwind CSS configured in the project
 *   Google Fonts: Cormorant Garamond + Outfit (loaded via useEffect)
 */

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';

/* ══════════════════════════════════════════════════════
   GLOBAL STYLES
══════════════════════════════════════════════════════ */

const GLOBAL_CSS = `
  :root {
    --bg:       #F5F2EE;
    --bg-warm:  #EDE8DF;
    --bg-dark:  #1D1A17;
    --bg-dark2: #252119;
    --ink:      #1D1A17;
    --ink-2:    #6B6259;
    --ink-3:    #9E958A;
    --accent:   #8B3A1B;
    --accent-h: #7A3218;
    --border:   #E4DDD4;
    --border-2: #CFC8BD;
  }

  *, *::before, *::after { box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    margin: 0;
    background: var(--bg);
    color: var(--ink);
    font-family: 'Outfit', sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  /* ── Scroll reveal ── */
  .reveal {
    opacity: 0;
    transform: translateY(26px);
    transition: opacity 0.78s cubic-bezier(0.16,1,0.3,1),
                transform 0.78s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal.in { opacity: 1; transform: none; }
  .d1 { transition-delay: 0.06s; }
  .d2 { transition-delay: 0.14s; }
  .d3 { transition-delay: 0.24s; }
  .d4 { transition-delay: 0.34s; }
  .d5 { transition-delay: 0.46s; }
  .d6 { transition-delay: 0.58s; }

  /* ── Hero grid ── */
  .hero-grid { grid-template-columns: 1fr; }
  .hero-right { display: none; }
  @media (min-width: 900px) {
    .hero-grid { grid-template-columns: 55% 45%; }
    .hero-right { display: flex; }
  }

  /* ── Service hover rows ── */
  .svc-row {
    border-bottom: 1px solid var(--border);
    padding: 1.1rem 0;
    cursor: default;
    transition: padding 0.38s cubic-bezier(0.16,1,0.3,1);
  }
  .svc-row:hover { padding: 1.45rem 0; }
  .svc-name { transition: color 0.2s ease; }
  .svc-row:hover .svc-name { color: var(--accent); }
  .svc-detail {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: max-height 0.45s cubic-bezier(0.16,1,0.3,1),
                opacity 0.3s ease 0.06s;
  }
  .svc-row:hover .svc-detail { max-height: 100px; opacity: 1; }

  /* ── Services tab ── */
  .tab-indicator {
    transition: transform 0.38s cubic-bezier(0.16,1,0.3,1);
  }

  /* ── Marquee ── */
  @keyframes slide-left {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .marquee-inner {
    display: flex;
    width: max-content;
    animation: slide-left 36s linear infinite;
  }
  .marquee-inner:hover { animation-play-state: paused; }

  /* ── Dot grid background ── */
  .dot-grid {
    background-image: radial-gradient(circle, #CCC5BB 1px, transparent 1px);
    background-size: 28px 28px;
  }

  /* ── Responsive helpers ── */
  @media (max-width: 767px) {
    .hide-mobile { display: none !important; }
  }
  @media (min-width: 768px) {
    .show-mobile { display: none !important; }
  }

  /* ── Case study grid ── */
  .case-grid { grid-template-columns: 1fr; }
  @media (min-width: 860px) {
    .case-grid { grid-template-columns: 58% 42%; }
  }

  /* ── Fit grid ── */
  .fit-grid { grid-template-columns: 1fr; gap: 0; }
  @media (min-width: 768px) {
    .fit-grid { grid-template-columns: 1fr 1fr; }
  }

  /* ── Cred grid ── */
  .cred-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
  }
  @media (min-width: 640px) {
    .cred-grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (min-width: 900px) {
    .cred-grid { grid-template-columns: repeat(6, 1fr); }
  }

  /* ── How I Work / Automation cards ── */
  .how-grid { grid-template-columns: 1fr; }
  @media (min-width: 800px) {
    .how-grid { grid-template-columns: 1fr 1.4fr 1fr; }
  }

  /* ── Auto cards: asymmetric 3-col ── */
  .auto-grid { grid-template-columns: 1fr; }
  @media (min-width: 800px) {
    .auto-grid { grid-template-columns: 1.3fr 1fr 1fr; }
  }

  /* ── Sample Work grid ── */
  .work-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
  }
  @media (min-width: 600px) {
    .work-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (min-width: 960px) {
    .work-grid { grid-template-columns: repeat(3, 1fr); }
  }

  /* ── Work card hover ── */
  .work-card {
    border: 1px solid var(--border);
    border-top: 3px solid transparent;
    background: var(--bg-warm);
    padding: clamp(1.75rem, 3vw, 2.5rem);
    transition:
      border-top-color 0.28s ease,
      background 0.28s ease,
      transform 0.28s cubic-bezier(0.16,1,0.3,1);
    cursor: default;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: -1px 0 0 -1px; /* collapse double borders */
  }
  .work-card:hover {
    border-top-color: var(--accent);
    background: var(--bg);
    transform: translateY(-2px);
    z-index: 1;
  }
  .work-card .wc-link {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-3);
    text-decoration: none;
    margin-top: auto;
    transition: color 0.2s ease;
  }
  .work-card:hover .wc-link {
    color: var(--accent);
  }
`;

/* ══════════════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════════════ */

function useInView(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.unobserve(el); }
    }, { threshold: 0.1, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useCounter(target, active, duration = 2200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      const e = 1 - (1 - p) ** 3;
      setVal(Math.round(e * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

/* ══════════════════════════════════════════════════════
   SHARED PRIMITIVES
══════════════════════════════════════════════════════ */

const SectionLabel = ({ children, style = {}, className = '' }) => (
  <div className={className} style={{
    fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.18em',
    textTransform: 'uppercase', color: 'var(--accent)',
    marginBottom: '1.5rem', ...style,
  }}>{children}</div>
);

const CTAButton = ({ href = '#book-call', children, large = false }) => (
  <a href={href} style={{
    display: 'inline-flex', alignItems: 'center', gap: large ? 10 : 7,
    background: 'var(--accent)', color: '#fff',
    padding: large ? '1.05rem 2.5rem' : '0.85rem 1.9rem',
    fontSize: large ? '0.88rem' : '0.78rem',
    fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase',
    textDecoration: 'none',
    transition: 'background 0.2s ease, transform 0.1s ease',
    fontFamily: 'Outfit, sans-serif',
  }}
  onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-h)'}
  onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
  onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
  onMouseUp={e => e.currentTarget.style.transform = 'none'}
  >
    {children} <ArrowRight size={large ? 16 : 14} strokeWidth={2} />
  </a>
);

/* ══════════════════════════════════════════════════════
   NAV
══════════════════════════════════════════════════════ */

function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: solid ? 'rgba(245,242,238,0.95)' : 'transparent',
      borderBottom: `1px solid ${solid ? 'var(--border)' : 'transparent'}`,
      backdropFilter: solid ? 'blur(12px)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{
        maxWidth: 1400, margin: '0 auto',
        padding: '0 max(1.5rem, 4vw)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: 70,
      }}>

        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none', color: 'var(--ink)' }}>
          <div style={{ fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', lineHeight: 1 }}>
            STACKWRIGHT
          </div>
          <div style={{ fontWeight: 300, fontSize: '0.63rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-3)', marginTop: 3 }}>
            SOLUTIONS
          </div>
        </a>

        {/* Desktop links */}
        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '2.25rem' }}>
          {[['The Problem', '#problem'], ['How I Work', '#how-i-work'], ['Services', '#services'], ['The Work', '#sample-work'], ['Proof & Testimonials', '#proof']].map(([l, h]) => (
            <a key={h} href={h} style={{
              fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.04em',
              color: 'var(--ink-2)', textDecoration: 'none', transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--ink)'}
            onMouseLeave={e => e.target.style.color = 'var(--ink-2)'}
            >{l}</a>
          ))}
        </div>

        {/* CTA */}
        <a href="#book-call" style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: 'var(--accent)', color: '#fff',
          padding: '0.58rem 1.15rem',
          fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.08em',
          textTransform: 'uppercase', textDecoration: 'none',
          transition: 'background 0.2s, transform 0.1s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-h)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
        onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
        onMouseUp={e => e.currentTarget.style.transform = 'none'}
        >
          Book a Call <ArrowRight size={12} strokeWidth={2.5} />
        </a>
      </div>
    </nav>
  );
}

/* ══════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════ */

function Hero() {
  const [ref, visible] = useInView({ threshold: 0.01 });
  const r = (d) => `reveal ${d} ${visible ? 'in' : ''}`;

  return (
    <section ref={ref} style={{ background: 'var(--bg)', position: 'relative' }}>
      <div className="hero-grid" style={{ display: 'grid', minHeight: '100dvh' }}>

        {/* Left: Content */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(7rem,12vw,10rem) max(1.5rem,6vw) clamp(4rem,6vw,6rem)',
        }}>
          <div className={r('d1')} style={{
            fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.75rem',
          }}>
            Fractional COO &amp; Embedded Operator
          </div>

          <h1 className={r('d2')} style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(3rem,6.5vw,6rem)',
            fontWeight: 600, lineHeight: 1.04,
            letterSpacing: '-0.025em', color: 'var(--ink)',
            marginBottom: '0.3em', maxWidth: '14ch',
          }}>
            "I'm the bottleneck."
          </h1>

          <p className={r('d3')} style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.2rem,2vw,1.55rem)',
            fontWeight: 400, fontStyle: 'italic', lineHeight: 1.5,
            color: 'var(--ink-2)', marginBottom: '2rem', maxWidth: '48ch',
          }}>
            And I fix that. I'm a fractional COO who works across operations and
            marketing, and I use AI and automation to build systems that run without
            you in every loop.
          </p>

          <p className={r('d4')} style={{
            fontSize: 'clamp(0.9rem,1.1vw,1rem)', lineHeight: 1.75,
            color: 'var(--ink-2)', marginBottom: '2.75rem', maxWidth: '42ch',
          }}>
            I run the operational backend of founder-led agencies: team management,
            client relationships, systems, and decision-making. Your job becomes growth.
          </p>

          <div className={r('d5')} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <CTAButton large>See if we're a fit</CTAButton>
            <a href="#problem" style={{
              fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.04em',
              color: 'var(--ink-2)', textDecoration: 'none',
              borderBottom: '1px solid var(--border-2)', paddingBottom: 2,
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--ink)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-2)'; e.currentTarget.style.borderColor = 'var(--border-2)'; }}
            >
              See why it matters
            </a>
          </div>
        </div>

        {/* Right: Stats panel (desktop only) */}
        <div className="hero-right" style={{
          background: 'var(--bg-warm)',
          borderLeft: '1px solid var(--border)',
          flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(6rem,8vw,8rem) clamp(2.5rem,4vw,4rem)',
        }}>
          <div style={{ marginBottom: '3rem' }}>
            {[
              ['6', 'years', 'inside founder-led agencies'],
              ['30+', 'businesses', 'and agencies supported'],
              ['$405K', 'campaign', 'generated in a single launch'],
            ].map(([num, bold, rest], i) => (
              <div key={i} style={{
                borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
                paddingBottom: i < 2 ? '2.25rem' : 0,
                marginBottom: i < 2 ? '2.25rem' : 0,
              }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2.5rem,4vw,3.5rem)',
                  fontWeight: 700, lineHeight: 1,
                  letterSpacing: '-0.02em', color: 'var(--ink)',
                }}>{num}</div>
                <div style={{ marginTop: '0.5rem', lineHeight: 1.4 }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink)' }}>{bold} </span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 400, color: 'var(--ink-2)' }}>{rest}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            fontSize: '0.67rem', fontWeight: 400, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--ink-3)', lineHeight: 2.1,
          }}>
            B.S. Computer Engineering / MBA<br />
            Former Business Analyst, DOST Philippines<br />
            Serving global clients async
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   THE PROBLEM
══════════════════════════════════════════════════════ */

function Problem() {
  const [ref, visible] = useInView();
  const r = (d) => `reveal ${d} ${visible ? 'in' : ''}`;
  const [tab, setTab] = useState(0);

  const tabs = [
    {
      label: 'What founders say',
      content: [
        '"I need someone to take things off my plate."',
        '"I need a project manager."',
        '"I need systems."',
        '"I need someone proactive who can just come in and figure it out."',
      ],
    },
    {
      label: "What's actually wrong",
      content: [
        'The founder is still the operating system. Tools, team members, and workflows exist, but the founder\'s memory is manually holding everything together.',
        'Most agencies are busy all day but do not have rhythm. Priorities change midweek. Meetings create more work instead of decisions.',
        'The team built a beautiful ClickUp. Nobody uses it. Client updates happen in Slack. The founder is still the hidden QA layer.',
        'That is not an organization problem. That is a founder-dependency problem.',
      ],
    },
  ];

  return (
    <section id="problem" ref={ref} style={{ background: 'var(--bg)', padding: 'clamp(5rem,10vw,8rem) max(1.5rem,6vw)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ maxWidth: 820 }}>
          <SectionLabel className={r('d1')}>The Problem</SectionLabel>
          <h2 className={r('d2')} style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.25rem,4.5vw,4rem)',
            fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em',
            color: 'var(--ink)', marginBottom: '1.5rem',
          }}>
            The real problem isn't that you're overwhelmed.
          </h2>
          <p className={r('d3')} style={{
            fontSize: 'clamp(1rem,1.3vw,1.1rem)', lineHeight: 1.75,
            color: 'var(--ink-2)', maxWidth: '60ch', marginBottom: '1.25rem',
          }}>
            It's that your business was built around you being in the room.
            Every decision, every handoff, every bottleneck leads back to one person: you.
          </p>
          <p className={r('d3')} style={{
            fontSize: 'clamp(1rem,1.3vw,1.1rem)', lineHeight: 1.75,
            color: 'var(--ink-2)', maxWidth: '60ch', marginBottom: '1.25rem',
          }}>
            You don't need someone to take things off your plate.
            You need someone to rebuild the plate so it stops breaking.
          </p>
          <p className={r('d4')} style={{
            fontSize: 'clamp(0.9rem,1.1vw,1rem)', lineHeight: 1.75,
            color: 'var(--ink-3)', maxWidth: '60ch', fontStyle: 'italic',
          }}>
            "These are not the same things as operating slowly."
          </p>
        </div>

        {/* Interactive tab: what founders say vs. what's wrong */}
        <div className={r('d4')} style={{
          marginTop: '4rem', marginBottom: '4rem',
          border: '1px solid var(--border)',
          background: 'var(--bg-warm)',
        }}>
          {/* Tab bar */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', position: 'relative' }}>
            {tabs.map((t, i) => (
              <button key={i} onClick={() => setTab(i)} style={{
                flex: 1, padding: '1.1rem 1.5rem',
                fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: tab === i ? 'var(--ink)' : 'var(--ink-3)',
                background: 'transparent', border: 'none', cursor: 'pointer',
                borderBottom: tab === i ? '2px solid var(--accent)' : '2px solid transparent',
                transition: 'color 0.2s, border-color 0.2s',
                fontFamily: 'Outfit, sans-serif',
              }}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div style={{ padding: 'clamp(1.5rem,3vw,2.5rem)' }}>
            {tabs[tab].content.map((line, i) => (
              <div key={`${tab}-${i}`} style={{
                display: 'flex', alignItems: 'flex-start', gap: '1rem',
                paddingTop: i > 0 ? '1.25rem' : 0,
                borderTop: i > 0 ? '1px solid var(--border)' : 'none',
                marginTop: i > 0 ? '1.25rem' : 0,
              }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.5rem', fontWeight: 400, color: 'var(--accent)',
                  lineHeight: 1, marginTop: '0.1rem', flexShrink: 0,
                }}>
                  {tab === 0 ? `0${i + 1}` : String.fromCharCode(8594)}
                </div>
                <p style={{
                  fontSize: tab === 0 ? 'clamp(1rem,1.4vw,1.1rem)' : '0.95rem',
                  fontStyle: tab === 0 ? 'italic' : 'normal',
                  fontFamily: tab === 0 ? "'Cormorant Garamond', serif" : 'inherit',
                  fontWeight: tab === 0 ? 400 : 400,
                  lineHeight: 1.65, color: 'var(--ink-2)', margin: 0,
                }}>
                  {line}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pull quote */}
        <div className={r('d5')} style={{
          borderLeft: '3px solid var(--accent)',
          paddingLeft: 'clamp(1.5rem,3vw,2.5rem)',
          maxWidth: 640,
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.4rem,2.5vw,2rem)',
            fontWeight: 400, fontStyle: 'italic', lineHeight: 1.45,
            color: 'var(--ink)', margin: 0,
          }}>
            Most operators will audit your processes. I audit your operating model.
            That's a different thing, and it's the one that actually changes how a business runs.
          </p>
          <p style={{
            fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--ink-3)', marginTop: '1rem',
          }}>
            Trixie Shane Maningding
          </p>
        </div>

        {/* ClickUp story */}
        <div style={{
          marginTop: '5rem',
          display: 'grid', gridTemplateColumns: '1fr',
          gap: '3rem',
        }}>
          <div style={{ maxWidth: 700 }}>
            <div className={r('d1')} style={{
              fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '1.25rem',
            }}>
              A pattern I have seen more than once
            </div>
            <p className={r('d2')} style={{
              fontSize: 'clamp(0.95rem,1.2vw,1.05rem)', lineHeight: 1.8,
              color: 'var(--ink-2)', marginBottom: '1.25rem',
            }}>
              A beautifully organized ClickUp setup. Custom statuses, color-coded pipelines,
              dashboards, templates, recurring tasks, SOP links attached to every phase.
              On paper, it looked like a serious operating system.
            </p>
            <p className={r('d3')} style={{
              fontSize: 'clamp(0.95rem,1.2vw,1.05rem)', lineHeight: 1.8,
              color: 'var(--ink-2)', marginBottom: '1.25rem',
            }}>
              In reality, the team barely used it. Client updates were still happening in Slack.
              Urgent requests came through voice notes. The founder was still answering quick questions
              because nobody trusted the board to reflect what was actually current.
              The tool looked mature. The behavior underneath had not changed.
            </p>
            <p className={r('d4')} style={{
              fontSize: 'clamp(0.95rem,1.2vw,1.05rem)', lineHeight: 1.8,
              color: 'var(--ink)', fontWeight: 500,
            }}>
              The founder thought they bought leverage.
              What they actually bought was a better-organized version of dependency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   HOW I WORK
══════════════════════════════════════════════════════ */

function HowIWork() {
  const [ref, visible] = useInView();
  const r = (d) => `reveal ${d} ${visible ? 'in' : ''}`;

  const steps = [
    {
      num: '01',
      title: 'Find where you are still the real system',
      body: 'Within the first week, I identify where the business actually routes through you: who people go to when something is unclear, where decisions really get made, whether priorities live in the tool or in your DMs. A newer operator often does not see this until month three.',
    },
    {
      num: '02',
      title: 'Separate the people problem from the structure problem',
      body: 'Most operators assume the team is dropping the ball. Most of the time the real issue is unclear ownership, no decision rights, or contradictory priorities from the founder. I do not rush to label anyone underperforming until I have looked at the environment they are operating inside.',
    },
    {
      num: '03',
      title: 'See the next bottleneck before it is visible',
      body: 'Before anything else, I am asking: If sales increase 20%, what breaks first? If you step away for two weeks, where does work stall? If one key person leaves, what knowledge disappears with them? I have seen the same movie enough times to recognize the first ten minutes.',
    },
  ];

  return (
    <section id="how-i-work" ref={ref} style={{
      background: 'var(--bg-warm)', borderTop: '1px solid var(--border)',
      padding: 'clamp(5rem,10vw,8rem) max(1.5rem,6vw)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        <div style={{ marginBottom: 'clamp(3rem,6vw,5rem)', maxWidth: 680 }}>
          <SectionLabel className={r('d1')}>How I Work</SectionLabel>
          <h2 className={r('d2')} style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.25rem,4vw,3.5rem)',
            fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em',
            color: 'var(--ink)', marginBottom: '1.5rem',
          }}>
            Diagnostic first. Execution second.
          </h2>
          <p className={r('d3')} style={{
            fontSize: 'clamp(0.95rem,1.2vw,1.05rem)', lineHeight: 1.8,
            color: 'var(--ink-2)', marginBottom: '1.25rem',
          }}>
            You don't need another consultant who shows up, talks in frameworks, and hands you a deck.
            You need someone who can read what's actually happening inside your business and fix the
            thing that's breaking it.
          </p>
          <p className={r('d3')} style={{
            fontSize: 'clamp(0.95rem,1.2vw,1.05rem)', lineHeight: 1.8,
            color: 'var(--ink-2)', marginBottom: '1.25rem',
          }}>
            Every engagement starts with a diagnostic: what's the real constraint, where does execution
            actually break down, and what would need to be true for this business to run without you
            in every loop.
          </p>
          <p className={r('d4')} style={{
            fontSize: 'clamp(0.95rem,1.2vw,1.05rem)', lineHeight: 1.8,
            color: 'var(--ink-2)',
          }}>
            Then we build for that. Not for a template. For your business.
          </p>
        </div>

        <div className="how-grid" style={{ display: 'grid', gap: 0 }}>
          {steps.map((s, i) => (
            <div key={i} className={r(`d${i + 2}`)} style={{
              padding: 'clamp(2rem,3vw,3rem)',
              borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
              borderTop: '1px solid var(--border)',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Large decorative number */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(4rem,8vw,7rem)',
                fontWeight: 700, lineHeight: 1,
                color: 'var(--border)', position: 'absolute',
                top: '-0.1em', right: '0.5rem',
                userSelect: 'none', pointerEvents: 'none',
              }}>
                {s.num}
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '0.85rem', fontWeight: 400, color: 'var(--accent)',
                  letterSpacing: '0.08em', marginBottom: '1rem',
                }}>
                  {s.num}
                </div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1.2rem,1.8vw,1.5rem)',
                  fontWeight: 600, lineHeight: 1.25,
                  color: 'var(--ink)', marginBottom: '1.25rem',
                }}>
                  {s.title}
                </h3>
                <p style={{
                  fontSize: '0.9rem', lineHeight: 1.75,
                  color: 'var(--ink-2)', margin: 0,
                }}>
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer notes */}
        <div className={r('d6')} style={{
          marginTop: '3rem', paddingTop: '2.5rem',
          borderTop: '1px solid var(--border)',
          display: 'flex', alignItems: 'flex-start', gap: '3rem', flexWrap: 'wrap',
        }}>
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flex: '1 1 400px',
          }}>
            <div style={{
              width: 3, flexShrink: 0,
              height: 48, background: 'var(--accent)',
              marginTop: 4,
            }} />
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.1rem,1.8vw,1.4rem)',
              fontWeight: 400, fontStyle: 'italic',
              lineHeight: 1.5, color: 'var(--ink)',
              margin: 0, maxWidth: '56ch',
            }}>
              "Being indispensable is not the same as being effective."
            </p>
          </div>
          <p style={{
            fontSize: '0.88rem', lineHeight: 1.75,
            color: 'var(--ink-3)', maxWidth: '44ch',
            flex: '1 1 280px', alignSelf: 'center',
          }}>
            Many bottlenecks are not obvious until you look at the whole system,
            not just the part that hurts.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SERVICES
══════════════════════════════════════════════════════ */

function Services() {
  const [ref, visible] = useInView();
  const r = (d) => `reveal ${d} ${visible ? 'in' : ''}`;
  const [tab, setTab] = useState(0);

  const services = [
    {
      label: 'Operations',
      description: 'The backbone. SOPs that get used, not shelved. Hiring and onboarding that scales. Reporting that tells you the truth. Team infrastructure that runs without you approving every step.',
      items: [
        { name: 'Fractional COO and embedded operations', detail: '' },
        { name: 'Hiring, onboarding, and team infrastructure', detail: '' },
        { name: 'SOP builds and process documentation', detail: '' },
        { name: 'Reporting and performance infrastructure', detail: '' },
        { name: 'Decision authority and escalation design', detail: '' },
      ],
    },
    {
      label: 'Marketing',
      description: 'The growth engine. Campaign architecture, funnel builds, and content infrastructure that actually compounds. Positioning that holds up under scrutiny. Execution that does not require you to be the bottleneck.',
      items: [
        { name: 'Campaign strategy and execution', detail: '' },
        { name: 'Funnel and offer architecture', detail: '' },
        { name: 'Content systems and editorial infrastructure', detail: '' },
        { name: 'Positioning and messaging refinement', detail: '' },
        { name: 'Marketing team management and handoff', detail: '' },
      ],
    },
    {
      label: 'Automation & AI',
      description: 'The connective tissue. GoHighLevel builds, AI-assisted workflows, and custom automation that replaces the manual work you and your team keep rebuilding. Not automation for the sake of it. Automation that removes a specific bottleneck you can name.',
      items: [
        { name: 'GoHighLevel (GHL) buildouts, migrations, and optimization', detail: '' },
        { name: 'AI-assisted workflows for marketing and operations', detail: '' },
        { name: 'Custom automation across CRM, email, scheduling, and reporting', detail: '' },
        { name: 'Lead capture, nurture, and conversion automation', detail: '' },
        { name: 'Client onboarding and delivery automation', detail: '' },
        { name: 'Internal operations automation (approvals, reporting, handoffs)', detail: '' },
      ],
    },
  ];

  return (
    <section id="services" ref={ref} style={{
      background: 'var(--bg)',
      borderTop: '1px solid var(--border)',
      padding: 'clamp(5rem,10vw,8rem) max(1.5rem,6vw)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem',
          marginBottom: 'clamp(2.5rem,5vw,4rem)',
        }}>
          <div style={{ maxWidth: 580 }}>
            <SectionLabel className={r('d1')}>Services</SectionLabel>
            <h2 className={r('d2')} style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.25rem,4vw,3.5rem)',
              fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em',
              color: 'var(--ink)', marginBottom: '0.6rem',
            }}>
              Operations. Marketing. Automation.
            </h2>
            <p className={r('d2')} style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.1rem,1.6vw,1.35rem)',
              fontWeight: 400, fontStyle: 'italic',
              color: 'var(--ink-2)', marginBottom: '1rem',
            }}>
              One operator, one system, one person accountable.
            </p>
            <p className={r('d3')} style={{
              fontSize: 'clamp(0.9rem,1.1vw,1rem)', lineHeight: 1.75,
              color: 'var(--ink-2)',
            }}>
              Most fractional operators work in one lane. I work across two, and I build on a third.
              For founder-led agencies, that combination is the difference between hiring three people
              and getting one person who understands the whole machine.
            </p>
          </div>

          {/* Tab toggle */}
          <div className={r('d3')} style={{
            display: 'flex', border: '1px solid var(--border)',
            background: 'var(--bg-warm)', alignSelf: 'flex-start', flexWrap: 'wrap',
          }}>
            {services.map((s, i) => (
              <button key={i} onClick={() => setTab(i)} style={{
                padding: '0.75rem 1.5rem',
                fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: tab === i ? 'var(--ink)' : 'transparent',
                color: tab === i ? '#fff' : 'var(--ink-2)',
                border: 'none', cursor: 'pointer',
                transition: 'background 0.28s ease, color 0.28s ease',
                fontFamily: 'Outfit, sans-serif',
              }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Service description */}
        <div className={r('d4')} style={{
          marginBottom: '2rem',
          padding: '1.5rem 2rem',
          background: 'var(--bg-warm)',
          border: '1px solid var(--border)',
          borderLeft: '3px solid var(--accent)',
        }}>
          <p style={{
            fontSize: '0.92rem', lineHeight: 1.75,
            color: 'var(--ink-2)', margin: 0,
          }}>
            {services[tab].description}
          </p>
        </div>

        {/* Service list */}
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {services[tab].items.map((item, i) => (
            <div key={`${tab}-${i}`} className="svc-row">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <span className="svc-name" style={{
                  fontSize: 'clamp(1rem,1.4vw,1.1rem)',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600, color: 'var(--ink)',
                }}>
                  {item.name}
                </span>
                <ArrowRight size={16} strokeWidth={1.5} style={{ color: 'var(--ink-3)', flexShrink: 0, transition: 'color 0.2s' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Pull quote */}
        <div className={r('d5')} style={{
          marginTop: '3.5rem',
          padding: '2rem 2.5rem',
          background: 'var(--bg-dark)',
          border: '1px solid var(--border)',
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.1rem,1.8vw,1.5rem)',
            fontWeight: 400, fontStyle: 'italic',
            lineHeight: 1.55, color: 'rgba(255,255,255,0.85)',
            margin: 0, maxWidth: '70ch',
          }}>
            "I hired an operator. What I got was someone who could see three problems ahead
            of where I was looking, and who could actually build the thing to fix it.
            That is a different skill set, and it is the one that actually changes how a business runs."
          </p>
          <p style={{
            fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
            marginTop: '1.25rem',
          }}>
            Client, Founder
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   AUTOMATION AS STRUCTURE
══════════════════════════════════════════════════════ */

function AutomationSection() {
  const [ref, visible] = useInView();
  const r = (d) => `reveal ${d} ${visible ? 'in' : ''}`;

  const cards = [
    {
      title: 'GoHighLevel, done right',
      body: 'GHL is powerful and easy to misuse. I build GHL environments that stay clean as you scale: CRM hygiene, pipeline logic, funnel and email infrastructure, SMS and voice automation, membership and client portals. Full buildouts, migrations, and rescue jobs for founders who bought GHL and never got it working.',
    },
    {
      title: 'AI workflows that earn their keep',
      body: 'AI-assisted workflows for lead qualification, content production, reporting, client communication, and internal decision support. Built around what your business actually needs, not around the newest model release. Every AI workflow I build has a clear job, a clear owner, and a clear off-switch.',
    },
    {
      title: 'Operations automation, end to end',
      body: 'Client onboarding, delivery, reporting, approvals, handoffs. The work that does not need a human but keeps ending up on one. I find it, scope it, and automate it, then document it so your team can maintain it without me.',
    },
  ];

  return (
    <section ref={ref} style={{
      background: 'var(--bg-warm)',
      borderTop: '1px solid var(--border)',
      padding: 'clamp(5rem,10vw,8rem) max(1.5rem,6vw)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        <div style={{ maxWidth: 780, marginBottom: 'clamp(3rem,5vw,4.5rem)' }}>
          <SectionLabel className={r('d1')}>Automation</SectionLabel>
          <h2 className={r('d2')} style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.25rem,4vw,3.5rem)',
            fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em',
            color: 'var(--ink)', marginBottom: '1.5rem',
          }}>
            Automation is not a feature. It is how the business runs.
          </h2>
          <p className={r('d3')} style={{
            fontSize: 'clamp(0.95rem,1.2vw,1.05rem)', lineHeight: 1.8,
            color: 'var(--ink-2)', marginBottom: '1.25rem',
          }}>
            Most founders have tried automation. They bought GoHighLevel, built half a funnel,
            stitched together a few Zapier flows, and ended up with more tools than systems.
            Now they are paying for software that does not talk to itself, and the team is still
            doing the work manually because the automation is unreliable.
          </p>
          <p className={r('d3')} style={{
            fontSize: 'clamp(0.95rem,1.2vw,1.05rem)', lineHeight: 1.8,
            color: 'var(--ink-2)',
          }}>
            That happens because automation was treated as a project, not as structure.
            I treat it as structure.
          </p>
        </div>

        {/* What I look at */}
        <div className={r('d4')} style={{
          marginBottom: '3.5rem',
          padding: '2rem 2.5rem',
          background: 'var(--bg)',
          border: '1px solid var(--border)',
        }}>
          <div style={{
            fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '1.25rem',
          }}>
            Every engagement looks at three things
          </div>
          {[
            'Where your team is doing work that a system should be doing.',
            'Where your tools are duplicating effort instead of compounding it.',
            'Where AI can take on the repetitive judgment calls that are eating your founder hours.',
          ].map((line, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: '1rem',
              paddingTop: i > 0 ? '1rem' : 0,
              borderTop: i > 0 ? '1px solid var(--border)' : 'none',
              marginTop: i > 0 ? '1rem' : 0,
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent)',
                lineHeight: 1.4, flexShrink: 0, minWidth: '1.5rem',
              }}>
                {`0${i + 1}`}
              </div>
              <p style={{
                fontSize: '0.92rem', lineHeight: 1.7,
                color: 'var(--ink-2)', margin: 0,
              }}>
                {line}
              </p>
            </div>
          ))}
        </div>

        {/* Three cards */}
        <div className="auto-grid" style={{ display: 'grid', gap: 0 }}>
          {cards.map((c, i) => (
            <div key={i} className={r(`d${i + 2}`)} style={{
              padding: 'clamp(2rem,3vw,3rem)',
              borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
              borderTop: '1px solid var(--border)',
              position: 'relative',
            }}>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.15rem,1.6vw,1.35rem)',
                fontWeight: 600, lineHeight: 1.3,
                color: 'var(--ink)', marginBottom: '1rem',
              }}>
                {c.title}
              </h3>
              <p style={{
                fontSize: '0.88rem', lineHeight: 1.75,
                color: 'var(--ink-2)', margin: 0,
              }}>
                {c.body}
              </p>
            </div>
          ))}
        </div>

        {/* Sub-note */}
        <div className={r('d6')} style={{
          marginTop: '2.5rem',
          padding: '1.5rem 2rem',
          border: '1px solid var(--border)',
          borderLeft: '3px solid var(--border-2)',
          background: 'var(--bg)',
        }}>
          <p style={{
            fontSize: '0.85rem', lineHeight: 1.7,
            color: 'var(--ink-3)', margin: 0, fontStyle: 'italic',
          }}>
            I do not sell automation as a product. I build it as part of the operating system.
            If automation is not the right answer for your bottleneck, I will tell you.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROOF / CASE STUDIES
══════════════════════════════════════════════════════ */

function CaseStudies() {
  const [ref, visible] = useInView();
  const r = (d) => `reveal ${d} ${visible ? 'in' : ''}`;

  return (
    <section ref={ref} style={{
      background: 'var(--bg)',
      borderTop: '1px solid var(--border)',
      padding: 'clamp(5rem,10vw,8rem) max(1.5rem,6vw)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        <div style={{ marginBottom: 'clamp(3rem,6vw,5rem)' }}>
          <SectionLabel className={r('d1')}>Proof</SectionLabel>
          <h2 className={r('d2')} style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.25rem,4vw,3.5rem)',
            fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em',
            color: 'var(--ink)', marginBottom: '0.75rem',
          }}>
            What the work actually looks like.
          </h2>
          <p className={r('d3')} style={{
            fontSize: 'clamp(0.9rem,1.1vw,1rem)', lineHeight: 1.75,
            color: 'var(--ink-3)',
          }}>
            Not case study theater. Real engagements, real constraints, real results.
          </p>
        </div>

        {/* Case 1: Full width featured */}
        <div className={r('d2')} style={{
          padding: 'clamp(2rem,4vw,3.5rem)',
          borderTop: '1px solid var(--border)',
          background: 'var(--bg-warm)',
          marginBottom: 0,
        }}>
          <div style={{
            fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.25rem',
          }}>
            Case Study 01
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
            <div style={{ maxWidth: 700 }}>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.5rem,2.5vw,2.25rem)',
                fontWeight: 600, lineHeight: 1.2,
                color: 'var(--ink)', marginBottom: '1.5rem',
              }}>
                48 Hours, No Founder, Critical Launch
              </h3>

              <p style={{
                fontSize: '0.92rem', lineHeight: 1.8,
                color: 'var(--ink-2)', marginBottom: '1.25rem',
              }}>
                A seven-figure agency founder stepped away for 48 hours during a product launch.
                No calls, no Slack, no approvals. The team executed without her.
              </p>

              <p style={{
                fontSize: '0.92rem', lineHeight: 1.8,
                color: 'var(--ink-2)', marginBottom: '1.25rem',
              }}>
                That wasn't luck. That was six weeks of rebuilding decision authority, documentation,
                handoff structure, and the automation underneath it, so the business could run a
                critical moment without the founder in the room.
              </p>

              {/* Stats */}
              <div style={{
                borderTop: '1px solid var(--border)',
                paddingTop: '1.75rem', marginTop: '1.75rem',
                display: 'flex', gap: '2.5rem', flexWrap: 'wrap',
              }}>
                {[
                  ['0', 'escalations during the launch window'],
                  ['On time', 'launch delivered without founder in the loop'],
                ].map(([n, l]) => (
                  <div key={n}>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 'clamp(1.75rem,2.5vw,2.5rem)',
                      fontWeight: 700, lineHeight: 1,
                      color: 'var(--accent)', letterSpacing: '-0.02em',
                    }}>{n}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--ink-2)', marginTop: '0.4rem', lineHeight: 1.5, maxWidth: '22ch' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Case 2 + Case 3: side by side */}
        <div className="case-grid" style={{ display: 'grid', gap: 0 }}>

          {/* Case 2 */}
          <div className={r('d3')} style={{
            borderTop: '1px solid var(--border)',
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ padding: 'clamp(2rem,4vw,3.5rem)', flex: 1 }}>
              <div style={{
                fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.25rem',
              }}>
                Case Study 02
              </div>

              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.5rem,2.2vw,2rem)',
                fontWeight: 600, lineHeight: 1.2,
                color: 'var(--ink)', marginBottom: '1.5rem',
              }}>
                Six Years. One Campaign. $405,000.
              </h3>

              <p style={{
                fontSize: '0.92rem', lineHeight: 1.8,
                color: 'var(--ink-2)', marginBottom: '1.25rem',
              }}>
                A founder had been running the same core offer for six years. The infrastructure
                was stable. The marketing wasn't compounding. We rebuilt the campaign architecture:
                cleaner positioning, tighter targeting, better conversion sequencing, and automated
                the follow-up so leads stopped falling through the cracks between sales and delivery.
              </p>
            </div>

            {/* Stat */}
            <div style={{
              borderTop: '1px solid var(--border)',
              padding: '2rem clamp(2rem,4vw,3.5rem)',
              background: 'var(--bg-dark)',
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.5rem,4vw,3.5rem)',
                fontWeight: 700, lineHeight: 1,
                color: '#fff', letterSpacing: '-0.02em',
              }}>$405,000</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem', lineHeight: 1.5 }}>
                in tracked campaign revenue. Six-year engagement, still ongoing.
              </div>
            </div>
          </div>

          {/* Case 3: GHL Rescue */}
          <div className={r('d4')} style={{
            borderTop: '1px solid var(--border)',
            borderLeft: '1px solid var(--border)',
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ padding: 'clamp(2rem,4vw,3.5rem)', flex: 1 }}>
              <div style={{
                fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.25rem',
              }}>
                Case Study 03
              </div>

              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.5rem,2.2vw,2rem)',
                fontWeight: 600, lineHeight: 1.2,
                color: 'var(--ink)', marginBottom: '1.5rem',
              }}>
                The GHL Rescue
              </h3>

              <p style={{
                fontSize: '0.92rem', lineHeight: 1.8,
                color: 'var(--ink-2)', marginBottom: '1.25rem',
              }}>
                An agency founder had been paying for GoHighLevel for eighteen months.
                Two failed buildouts, one half-finished migration, and a team that had stopped
                using it entirely because nothing worked the way it was supposed to.
              </p>

              <p style={{
                fontSize: '0.92rem', lineHeight: 1.8,
                color: 'var(--ink-2)',
              }}>
                We rebuilt the environment from the ground up: CRM logic, pipeline automation,
                email and SMS sequences, client onboarding flows, and reporting dashboards.
                Integrated AI-assisted lead qualification on top. The team is back in the tool,
                the automation is running, and the founder stopped approving things that a
                workflow should have handled automatically.
              </p>
            </div>

            {/* Placeholder stat bar */}
            <div style={{
              borderTop: '1px solid var(--border)',
              padding: '2rem clamp(2rem,4vw,3.5rem)',
              background: 'var(--bg-warm)',
            }}>
              <div style={{
                fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--ink-3)',
              }}>
                Result metrics in progress
              </div>
            </div>
          </div>
        </div>

        {/* Bad fit story */}
        <div className={r('d5')} style={{
          marginTop: '3rem',
          padding: 'clamp(1.75rem,3vw,2.5rem)',
          border: '1px solid var(--border)',
          borderLeft: '3px solid var(--border-2)',
          background: 'var(--bg)',
        }}>
          <div style={{
            fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '1rem',
          }}>
            The engagement I learned the most from
          </div>
          <p style={{
            fontSize: '0.92rem', lineHeight: 1.8,
            color: 'var(--ink-2)', marginBottom: '0.75rem',
          }}>
            A founder wanted help with operations, team coordination, and getting out of the weeds.
            But once inside, it was clear they did not actually want an operator.
            They wanted relief without real delegation. Priorities changed constantly.
            Direction was given in one place and privately overridden somewhere else.
          </p>
          <p style={{
            fontSize: '0.92rem', lineHeight: 1.8,
            color: 'var(--ink-2)',
          }}>
            Staying too long trying to operationalize around a leadership problem was the mistake.
            The lesson: I now screen harder for decision readiness before saying yes.
            I would rather lose a contract than step into a role where I am being sold
            as the operator but treated as a well-organized buffer.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SAMPLE WORK
══════════════════════════════════════════════════════ */

/**
 * DRIVE LINKS — swap each `href` below with the individual subfolder share link.
 * Root folder (fallback): https://drive.google.com/drive/folders/1ixxwln8jrgDbadr2MzF8p-Gx5CBli_XS
 */
const DRIVE_ROOT = 'https://drive.google.com/drive/folders/1ixxwln8jrgDbadr2MzF8p-Gx5CBli_XS?usp=drive_link';

const WORK_CATEGORIES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 6v6l4 2" /><path d="M22 2l-5 5" /><path d="M17 2h5v5" />
      </svg>
    ),
    name: 'AI & Automations',
    description: 'Workflow diagrams, prompt systems, AI-assisted process blueprints, and automation documentation.',
    href: DRIVE_ROOT, // TODO: replace with AI & Automations subfolder link
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    name: 'Copywriting',
    description: 'Sales pages, email sequences, landing page copy, and long-form editorial content.',
    href: DRIVE_ROOT, // TODO: replace with Copywriting subfolder link
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="4.93" y1="4.93" x2="9.17" y2="9.17" /><line x1="14.83" y1="14.83" x2="19.07" y2="19.07" /><line x1="14.83" y1="9.17" x2="19.07" y2="4.93" /><line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
      </svg>
    ),
    name: 'Graphics',
    description: 'Brand visuals, presentation decks, social graphics, and creative design assets.',
    href: DRIVE_ROOT, // TODO: replace with Graphics subfolder link
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    name: 'Landing Pages / Funnels',
    description: 'Full funnel maps, page wireframes, offer architecture, and live GHL or web builds.',
    href: DRIVE_ROOT, // TODO: replace with Landing Pages/Funnels subfolder link
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    name: 'Newsletters',
    description: 'Email newsletter campaigns, editorial calendars, subject line tests, and sequence copy.',
    href: DRIVE_ROOT, // TODO: replace with Newsletters subfolder link
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    name: 'Operations / Project Management',
    description: 'SOPs, process documentation, project trackers, org charts, and operational dashboards.',
    href: DRIVE_ROOT, // TODO: replace with Operations/Project Management subfolder link
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /><line x1="12" y1="2" x2="12" y2="9" /><line x1="12" y1="15" x2="12" y2="22" />
      </svg>
    ),
    name: 'Podcast Production',
    description: 'Episode briefs, scripts, show notes, guest prep documents, and production SOPs.',
    href: DRIVE_ROOT, // TODO: replace with Podcast Production subfolder link
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    name: 'Social Media Management',
    description: 'Content calendars, platform strategy, post copy, engagement frameworks, and reporting.',
    href: DRIVE_ROOT, // TODO: replace with Social Media Management subfolder link
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    name: 'Strategy',
    description: 'Business audits, strategy decks, positioning frameworks, and growth planning artifacts.',
    href: DRIVE_ROOT, // TODO: replace with Strategy subfolder link
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    name: 'Videos',
    description: 'Video scripts, production briefs, show concepts, and post-production documentation.',
    href: DRIVE_ROOT, // TODO: replace with Videos subfolder link
  },
];

function SampleWork() {
  const [ref, visible] = useInView();
  const r = (d) => `reveal ${d} ${visible ? 'in' : ''}`;

  return (
    <section id="sample-work" ref={ref} style={{
      background: 'var(--bg)',
      borderTop: '1px solid var(--border)',
      padding: 'clamp(5rem,10vw,8rem) max(1.5rem,6vw)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem',
          marginBottom: 'clamp(3rem,6vw,5rem)',
        }}>
          <div style={{ maxWidth: 640 }}>
            <SectionLabel className={r('d1')}>The Work</SectionLabel>
            <h2 className={r('d2')} style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.25rem,4vw,3.5rem)',
              fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em',
              color: 'var(--ink)', marginBottom: '1rem',
            }}>
              The work, not just the story.
            </h2>
            <p className={r('d3')} style={{
              fontSize: 'clamp(0.95rem,1.2vw,1.05rem)', lineHeight: 1.8,
              color: 'var(--ink-2)', maxWidth: '52ch',
            }}>
              Ten categories. Real clients. Browse by area or view the full archive.
              Everything here is actual output from real engagements.
            </p>
          </div>

          {/* Archive CTA */}
          <a
            href={DRIVE_ROOT}
            target="_blank"
            rel="noopener noreferrer"
            className={r('d3')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'var(--ink-2)',
              textDecoration: 'none', border: '1px solid var(--border-2)',
              padding: '0.75rem 1.5rem',
              transition: 'border-color 0.2s, color 0.2s, background 0.2s',
              flexShrink: 0, alignSelf: 'flex-start',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.color = 'var(--accent)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-2)';
              e.currentTarget.style.color = 'var(--ink-2)';
            }}
          >
            Browse full archive
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        {/* Category grid */}
        <div className={`work-grid ${r('d2')}`} style={{ border: '1px solid var(--border)' }}>
          {WORK_CATEGORIES.map((cat, i) => (
            <div key={i} className="work-card">

              {/* Icon */}
              <div style={{ color: 'var(--accent)', lineHeight: 1 }}>
                {cat.icon}
              </div>

              {/* Name */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.05rem,1.4vw,1.2rem)',
                fontWeight: 600, lineHeight: 1.2,
                color: 'var(--ink)',
              }}>
                {cat.name}
              </div>

              {/* Description */}
              <p style={{
                fontSize: '0.85rem', lineHeight: 1.7,
                color: 'var(--ink-2)', margin: 0,
              }}>
                {cat.description}
              </p>

              {/* CTA link */}
              <a
                href={cat.href}
                target="_blank"
                rel="noopener noreferrer"
                className="wc-link"
              >
                View samples
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Drive note */}
        <div className={r('d5')} style={{
          marginTop: '2rem',
          padding: '1.25rem 1.75rem',
          border: '1px solid var(--border)',
          borderLeft: '3px solid var(--border-2)',
          background: 'var(--bg-warm)',
          display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap',
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ink-3)', flexShrink: 0, marginTop: '0.1rem' }}>
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p style={{
            fontSize: '0.82rem', lineHeight: 1.65,
            color: 'var(--ink-3)', margin: 0, fontStyle: 'italic',
          }}>
            Samples are shared with permission. Some files are redacted or anonymized to protect client confidentiality.
            Work shown is representative of the type of output delivered across real engagements.
          </p>
        </div>

      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   TESTIMONIALS
══════════════════════════════════════════════════════ */

function Testimonials() {
  const [ref, visible] = useInView();
  const r = (d) => `reveal ${d} ${visible ? 'in' : ''}`;

  return (
    <section id="proof" ref={ref} style={{
      background: 'var(--bg-warm)',
      borderTop: '1px solid var(--border)',
      padding: 'clamp(5rem,10vw,8rem) max(1.5rem,6vw)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        <div style={{ marginBottom: 'clamp(3rem,5vw,4rem)' }}>
          <SectionLabel className={r('d1')}>Testimonials</SectionLabel>
          <h2 className={r('d2')} style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.25rem,4vw,3.5rem)',
            fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em',
            color: 'var(--ink)',
          }}>
            From founders who hired me to fix it.
          </h2>
        </div>

        {/* Placeholder — to be filled with real testimonials */}
        <div className={r('d3')} style={{
          padding: 'clamp(2.5rem,5vw,4rem)',
          border: '1px solid var(--border)',
          background: 'var(--bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: 200,
        }}>
          <p style={{
            fontSize: '0.82rem', lineHeight: 1.7,
            color: 'var(--ink-3)', fontStyle: 'italic',
            textAlign: 'center', maxWidth: '38ch',
          }}>
            Testimonials to be added. Content coming from real client engagements.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   WHO THIS IS FOR
══════════════════════════════════════════════════════ */

function FitSection() {
  const [ref, visible] = useInView();
  const r = (d) => `reveal ${d} ${visible ? 'in' : ''}`;

  const goodFit = [
    'Your business has momentum. The structure has not kept up.',
    'You are ready to hand off real authority, not just tasks.',
    'You want a strategic partner, not an employee.',
    'You can make a decision when a decision needs to be made.',
    'You are willing to stop bypassing the system once it is built.',
    'You want to grow the agency, not just survive the next busy season.',
  ];

  const notFit = [
    'You say "just copy me on everything" as a default.',
    'Your priorities shift by mood rather than strategy.',
    'You want relief before you have made any actual decisions.',
    'You are looking for time-tracker oversight.',
    'You want the operator to act as a visionary for decisions that are yours to make.',
    'You are not ready to let go at the level you say you want to.',
  ];

  return (
    <section ref={ref} style={{
      background: 'var(--bg)',
      borderTop: '1px solid var(--border)',
      padding: 'clamp(5rem,10vw,8rem) max(1.5rem,6vw)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        <div style={{ marginBottom: 'clamp(3rem,5vw,4rem)' }}>
          <SectionLabel className={r('d1')}>Who This Is For</SectionLabel>
          <h2 className={r('d2')} style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.25rem,4vw,3.5rem)',
            fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em',
            color: 'var(--ink)', maxWidth: '22ch',
          }}>
            Not every founder is my client. On purpose.
          </h2>
        </div>

        <div className="fit-grid" style={{ display: 'grid' }}>
          {/* Good fit */}
          <div className={r('d2')} style={{
            padding: 'clamp(2rem,4vw,3rem)',
            border: '1px solid var(--border)',
            borderTop: '3px solid var(--accent)',
            background: 'var(--bg)',
          }}>
            <div style={{
              fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '2rem',
            }}>
              Right fit
            </div>
            {goodFit.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '1rem',
                paddingBottom: i < goodFit.length - 1 ? '1.1rem' : 0,
                marginBottom: i < goodFit.length - 1 ? '1.1rem' : 0,
                borderBottom: i < goodFit.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <Check size={16} strokeWidth={2} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.15rem' }} />
                <span style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--ink-2)' }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Not fit */}
          <div className={r('d3')} style={{
            padding: 'clamp(2rem,4vw,3rem)',
            border: '1px solid var(--border)',
            borderTop: '3px solid var(--border-2)',
            background: 'var(--bg-warm)',
          }}>
            <div style={{
              fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '2rem',
            }}>
              Not a fit
            </div>
            {notFit.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '1rem',
                paddingBottom: i < notFit.length - 1 ? '1.1rem' : 0,
                marginBottom: i < notFit.length - 1 ? '1.1rem' : 0,
                borderBottom: i < notFit.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <X size={16} strokeWidth={2} style={{ color: 'var(--ink-3)', flexShrink: 0, marginTop: '0.15rem' }} />
                <span style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--ink-2)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stopping confusion line + CTA */}
        <div className={r('d5')} style={{ marginTop: '3.5rem', maxWidth: 680 }}>
          <p style={{
            fontSize: 'clamp(0.95rem,1.2vw,1.05rem)', lineHeight: 1.8,
            color: 'var(--ink-2)', marginBottom: '2rem',
          }}>
            Part of the value is stopping people from building on top of confusion
            by asking the uncomfortable question early.
            Most discovery calls reveal the mismatch quickly if both people are honest.
          </p>
          <CTAButton>See if we're a fit</CTAButton>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   CREDENTIALS BAR
══════════════════════════════════════════════════════ */

function CredentialsBar() {
  const [ref, visible] = useInView();

  const c6   = useCounter(6, visible);
  const c30  = useCounter(30, visible);
  const c405 = useCounter(405, visible);
  const c20  = useCounter(20, visible);
  const c12  = useCounter(12, visible);

  const stats = [
    { value: c6,   suffix: '',    label: 'Years in the work' },
    { value: c30,  suffix: '+',   label: 'Businesses supported' },
    { value: c405, suffix: 'K',   label: 'Single campaign result', prefix: '$' },
    { value: c20,  suffix: '',    label: 'Largest team managed' },
    { value: c12,  suffix: ' mo', label: 'To build a 6-figure agency' },
    { value: null, suffix: '',    label: 'B.S. CompEng / MBA', static: 'Dual' },
  ];

  return (
    <section ref={ref} style={{
      background: 'var(--bg-dark)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div className="cred-grid">
        {stats.map((s, i) => (
          <div key={i} style={{
            padding: 'clamp(2rem,4vw,3rem) clamp(1.5rem,3vw,2.5rem)',
            borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.25rem,3.5vw,3.25rem)',
              fontWeight: 700, lineHeight: 1,
              color: '#fff', letterSpacing: '-0.02em',
              marginBottom: '0.6rem',
            }}>
              {s.static ? s.static : `${s.prefix || ''}${s.value}${s.suffix}`}
            </div>
            <div style={{
              fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
              lineHeight: 1.5,
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Tools marquee */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden', padding: '1.25rem 0',
      }}>
        <div className="marquee-inner">
          {[...Array(2)].map((_, j) => (
            ['Notion', 'ClickUp', 'Google Workspace', 'Slack', 'GoHighLevel', 'HubSpot', 'Klaviyo', 'Mailchimp', 'Meta Ads', 'Claude Code', 'Vercel', 'Lovable', 'Replit', 'Supabase'].map((tool, i) => (
              <span key={`${j}-${i}`} style={{
                fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)',
                padding: '0 2rem', whiteSpace: 'nowrap', flexShrink: 0,
              }}>
                {tool}
              </span>
            ))
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   CTA SECTION
══════════════════════════════════════════════════════ */

function CTASection() {
  const [ref, visible] = useInView();
  const r = (d) => `reveal ${d} ${visible ? 'in' : ''}`;

  return (
    <section id="book-call" ref={ref} style={{
      background: 'var(--bg-warm)',
      borderTop: '1px solid var(--border)',
      padding: 'clamp(5rem,10vw,9rem) max(1.5rem,6vw)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ maxWidth: 760 }}>
          <SectionLabel className={r('d1')}>Ready to talk</SectionLabel>

          <h2 className={r('d2')} style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem,4.5vw,4rem)',
            fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em',
            color: 'var(--ink)', marginBottom: '2rem',
          }}>
            Relief doesn't happen just because someone was hired.
          </h2>

          <p className={r('d3')} style={{
            fontSize: 'clamp(1rem,1.5vw,1.2rem)', lineHeight: 1.75,
            color: 'var(--ink-2)', marginBottom: '1.25rem', maxWidth: '54ch',
          }}>
            Most founders have tried the hire. They brought someone in, handed over the login
            credentials, hoped it would help. It didn't. Not because the person was wrong,
            but because the problem wasn't a headcount problem.
          </p>

          <p className={r('d3')} style={{
            fontSize: 'clamp(1rem,1.5vw,1.2rem)', lineHeight: 1.75,
            color: 'var(--ink-2)', marginBottom: '1.25rem', maxWidth: '54ch',
          }}>
            It was a structure problem. And that's what I fix.
          </p>

          <p className={r('d4')} style={{
            fontSize: 'clamp(0.9rem,1.1vw,1rem)', lineHeight: 1.75,
            color: 'var(--ink-2)', marginBottom: '3rem', maxWidth: '50ch',
          }}>
            If your business is running through you instead of with you,
            that's the conversation worth having.
          </p>

          <div className={r('d5')} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'flex-start' }}>
            <CTAButton large>Book Discovery Call</CTAButton>
            <p style={{
              fontSize: '0.82rem', lineHeight: 1.6,
              color: 'var(--ink-3)', margin: 0, fontStyle: 'italic',
            }}>
              Not sure if this is the right fit? That's exactly what the first call is for.
            </p>
          </div>
        </div>

        {/* Divider + credentials note */}
        <div className={r('d6')} style={{
          marginTop: '5rem', paddingTop: '3rem',
          borderTop: '1px solid var(--border)',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
        }}>
          {[
            ['Structure without shame.', 'The approach to every engagement.'],
            ['Philippines-based.', 'Serving global clients async. Sole client-facing point of contact.'],
            ['6 years, still going.', 'Longest engagement is still active. That says more than any title.'],
          ].map(([title, sub]) => (
            <div key={title}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.1rem', fontWeight: 600,
                color: 'var(--ink)', marginBottom: '0.4rem',
              }}>{title}</div>
              <div style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--ink-2)' }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-dark)',
      padding: 'clamp(2.5rem,4vw,3.5rem) max(1.5rem,6vw)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{
        maxWidth: 1400, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem',
      }}>
        <div>
          <div style={{
            fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', lineHeight: 1,
          }}>
            STACKWRIGHT SOLUTIONS
          </div>
          <div style={{
            fontSize: '0.7rem', letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.3)', marginTop: 6, lineHeight: 1.5,
          }}>
            Trixie Shane Maningding. Fractional COO for founder-led agencies.
          </div>
        </div>

        <div style={{
          fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.06em',
        }}>
          &copy; {new Date().getFullYear()} Stackwright Solutions
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════ */

export default function Portfolio() {
  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&display=swap';
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* Grain overlay: fixed, pointer-events-none, never on scrolling container */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 999, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.022,
          mixBlendMode: 'multiply',
        }}
      />

      <Nav />
      <Hero />
      <Problem />
      <HowIWork />
      <Services />
      <AutomationSection />
      <SampleWork />
      <Testimonials />
      <CaseStudies />
      <FitSection />
      <CredentialsBar />
      <CTASection />
      <Footer />
    </>
  );
}
