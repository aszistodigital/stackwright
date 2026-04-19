import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from './Icons';

export default function Hero() {
  const [active, setActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ctaHovered, setCtaHovered] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let particles = [];

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Funnel positioned in the lower portion of the hero
    // Wide open left → narrows to tight neck at ~70% across
    const FUNNEL_START = 0.36; // fraction of W where walls begin narrowing
    const NECK_X      = 0.72; // fraction of W where neck is tightest
    const CY          = 0.78; // vertical center as fraction of H
    const MAX_HALF    = 0.18; // wide section half-height as fraction of H
    const MIN_HALF    = 0.028; // neck half-height as fraction of H

    const getChannel = (x) => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      const cy = H * CY;
      const maxH = H * MAX_HALF;
      const minH = H * MIN_HALF;
      const fsx = W * FUNNEL_START;
      const nkx = W * NECK_X;

      if (x <= fsx) return { cy, half: maxH, top: cy - maxH, bottom: cy + maxH };
      if (x >= nkx) return { cy, half: minH, top: cy - minH, bottom: cy + minH };

      const t = (x - fsx) / (nkx - fsx);
      const ease = t < 0.5 ? 2*t*t : -1 + (4 - 2*t) * t; // smoothstep
      const half = maxH - (maxH - minH) * ease;
      return { cy, half, top: cy - half, bottom: cy + half };
    };

    const spawnParticle = () => {
      const ch = getChannel(0);
      const baseVx = Math.random() * 2.2 + 1.4;
      return {
        x: -Math.random() * 60,
        y: ch.top + Math.random() * (ch.bottom - ch.top),
        r: Math.random() * 3 + 2,
        vx: baseVx,
        vy: (Math.random() - 0.5) * 5.5, // strong random vertical in wide zone
        baseVx,
      };
    };

    // Pre-populate: seed wide section densely, a few in the funnel
    const MAX = 200;
    for (let i = 0; i < MAX * 0.72; i++) {
      const W = canvas.offsetWidth;
      const p = spawnParticle();
      p.x = Math.random() * W * (FUNNEL_START + 0.15);
      const ch = getChannel(p.x);
      p.y = ch.top + Math.random() * (ch.bottom - ch.top);
      p.vx = p.baseVx;
      p.vy = (Math.random() - 0.5) * 5;
      particles.push(p);
    }

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const fsx     = W * FUNNEL_START;
      const nkx     = W * NECK_X;
      const freeHalf = getChannel(0).half;

      // Funnel fill
      ctx.beginPath();
      for (let x = 0; x <= W; x += 4) {
        const { top } = getChannel(x);
        x === 0 ? ctx.moveTo(x, top) : ctx.lineTo(x, top);
      }
      for (let x = W; x >= 0; x -= 4) ctx.lineTo(x, getChannel(x).bottom);
      ctx.closePath();
      ctx.fillStyle = 'rgba(195,118,96,0.04)';
      ctx.fill();

      // Funnel walls
      ['top', 'bottom'].forEach(side => {
        ctx.beginPath();
        for (let x = 0; x <= W; x += 3) {
          const ch = getChannel(x);
          const y = side === 'top' ? ch.top : ch.bottom;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(195,118,96,0.26)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // Warm rose halo at neck
      const nkCh = getChannel(nkx);
      const halo = ctx.createRadialGradient(nkx, nkCh.cy, 0, nkx, nkCh.cy, 90);
      halo.addColorStop(0,   'rgba(210,100,80,0.42)');
      halo.addColorStop(0.35,'rgba(195,118,96,0.18)');
      halo.addColorStop(1,   'rgba(195,118,96,0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(nkx, nkCh.cy, 90, 0, Math.PI * 2);
      ctx.fill();

      // Spawn fresh particles at left edge
      if (particles.length < MAX && Math.random() < 0.65) particles.push(spawnParticle());
      particles = particles.filter(p => p.x < W + 50);

      // Slow zone starts just as particles reach the neck halo
      const slowX = nkx - W * 0.05;

      particles.forEach(p => {
        const ch          = getChannel(p.x);
        const compression = ch.half / freeHalf;
        const atNeck      = p.x >= slowX;

        if (!atNeck) {
          // Wide section + entire narrowing funnel: stay fast and chaotic
          // Walls physically constrain y but particles keep bouncing freely
          p.x  += p.vx;
          p.vy += (Math.random() - 0.5) * 0.5;
          p.vy  = Math.max(-6, Math.min(6, p.vy));
          p.y  += p.vy;

          if (p.y - p.r < ch.top)    { p.y = ch.top + p.r;    p.vy =  Math.abs(p.vy) * 0.8; }
          if (p.y + p.r > ch.bottom) { p.y = ch.bottom - p.r; p.vy = -Math.abs(p.vy) * 0.8; }
        } else {
          // AT the neck: dramatic slowdown + straighten to center line
          const targetVx = p.baseVx * Math.pow(compression, 2.2) * 0.5;
          p.vx += (targetVx - p.vx) * 0.14;
          p.x  += p.vx;

          p.vy += (ch.cy - p.y) * 0.1;
          p.vy *= 0.72;
          p.y  += p.vy;
          p.y   = Math.max(ch.top + p.r, Math.min(ch.bottom - p.r, p.y));
        }

        // Color only shifts to deep rose at the neck
        const stress = atNeck ? Math.pow(1 - compression, 1.1) : 0;
        const cr = Math.round(243 - (243 - 160) * stress);
        const cg = Math.round(230 - (230 -  35) * stress);
        const cb = Math.round(218 - (218 -  55) * stress);
        const alpha  = atNeck ? 0.52 + 0.42 * stress : 0.48;
        const radius = p.r * (atNeck ? 0.58 + 0.42 * compression : 1);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setActive(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMousePos({ x: (e.clientX - cx) / cx, y: (e.clientY - cy) / cy });
    };
    window.addEventListener('mousemove', fn, { passive: true });
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  const words = ['"I\'m', 'the', 'bottleneck'];

  return (
    <section style={{
      background: 'var(--bg-dark)',
      minHeight: '100dvh',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
      padding: 'var(--section-spacing-large) max(1.5rem,6vw) calc(var(--section-spacing-large) * 1.15)',
      textAlign: 'center',
    }}>

      {/* Radial spotlight — tracks mouse */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 60% 50% at ${50 + mousePos.x * 18}% ${48 + mousePos.y * 14}%, rgba(195,118,96,0.09) 0%, transparent 65%)`,
        transition: 'background 1.4s cubic-bezier(0.16,1,0.3,1)',
      }} />

      {/* Grain */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        opacity: 0.028, mixBlendMode: 'overlay',
      }} />

      {/* Bottleneck canvas — threads converging to a focal node */}
      <canvas ref={canvasRef} aria-hidden="true" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', opacity: active ? 1 : 0,
        transition: 'opacity 2s ease 0.8s',
      }} />

      {/* Parallax content */}
      <div style={{
        position: 'relative', zIndex: 1,
        transform: `translate(${mousePos.x * -6}px, ${mousePos.y * -3}px)`,
        transition: 'transform 1.1s cubic-bezier(0.16,1,0.3,1)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>

        {/* Quote — word by word */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(3.5rem,10.5vw,9.5rem)',
          fontWeight: 600, lineHeight: 1.0, letterSpacing: '-0.03em',
          color: '#F3E6DA',
          margin: '0 0 clamp(1.5rem,3vw,2.5rem)',
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'center', columnGap: '0.28em', rowGap: 0,
        }}>
          {words.map((word, i) => (
            <span key={i} className="word-wrap">
              <span
                className="word-inner"
                style={{
                  animationDelay: `${0.32 + i * 0.13}s`,
                  animationPlayState: active ? 'running' : 'paused',
                }}
              >
                {i === words.length - 1 ? <><em>bottleneck</em>."</> : word}
              </span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.05rem,1.7vw,1.45rem)',
          fontWeight: 400, fontStyle: 'italic',
          color: 'rgba(243,230,218,0.55)',
          maxWidth: '52ch', lineHeight: 1.6,
          margin: '0 0 clamp(1rem,2vw,1.75rem)',
          opacity: active ? 1 : 0,
          transform: active ? 'none' : 'translateY(14px)',
          transition: 'opacity 0.85s cubic-bezier(0.16,1,0.3,1) 0.78s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.78s',
        }}>
          And I fix that. I'm a fractional COO who works across operations and
          marketing, and I use AI and automation to build systems that run
          without you in every loop.
        </p>

        {/* CTA */}
        <div style={{
          opacity: active ? 1 : 0,
          transform: active ? 'none' : 'translateY(14px)',
          transition: 'opacity 0.85s cubic-bezier(0.16,1,0.3,1) 1.08s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 1.08s',
        }}>
          <a href="#contact" className="btn-primary" style={{
            gap: 8, padding: '0 2.25rem', minHeight: 52,
            fontSize: '0.8rem', letterSpacing: '0.1em',
          }}
          onMouseEnter={e => { setCtaHovered(true); e.currentTarget.style.background = 'var(--accent-h)'; }}
          onMouseLeave={e => { setCtaHovered(false); e.currentTarget.style.background = 'var(--accent)'; }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
          onMouseUp={e => e.currentTarget.style.transform = 'none'}
          >
            <div style={{
              position: 'absolute', bottom: 0, left: '50%',
              width: 8, height: ctaHovered ? '100%' : 0,
              transform: 'translateX(-100%)',
              background: 'linear-gradient(to top, rgba(255,185,105,0.55), transparent)',
              transition: 'height 0.45s cubic-bezier(0.16,1,0.3,1)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', bottom: 0, right: '50%',
              width: 8, height: ctaHovered ? '100%' : 0,
              transform: 'translateX(100%)',
              background: 'linear-gradient(to top, rgba(215,110,50,0.5), transparent)',
              transition: 'height 0.45s cubic-bezier(0.16,1,0.3,1)',
              pointerEvents: 'none',
            }} />
            <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              See if we're a fit <ArrowRight size={14} style={{
                transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
                transform: ctaHovered ? 'translateY(-3px)' : 'none',
              }} />
            </span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        opacity: active ? 0.82 : 0,
        transition: 'opacity 1.2s ease 1.6s',
        animation: active ? 'scroll-bounce 2.2s ease-in-out 2s infinite' : 'none',
      }}>
        <span style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(243,230,218,0.75)', fontFamily: 'Outfit, sans-serif' }}>Scroll</span>
        <svg width="16" height="22" viewBox="0 0 16 22" fill="none" stroke="rgba(243,230,218,0.7)" strokeWidth="1.5" strokeLinecap="round">
          <line x1="8" y1="0" x2="8" y2="15" />
          <polyline points="3 10 8 15 13 10" />
        </svg>
      </div>
    </section>
  );
}
