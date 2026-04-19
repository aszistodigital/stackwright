import { useState, useEffect } from 'react';
import { ArrowRight } from './Icons';

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [progress, setProgress] = useState(0);
  const [navCtaHovered, setNavCtaHovered] = useState(false);

  useEffect(() => {
    const fn = () => {
      setSolid(window.scrollY > 60);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: solid ? 'rgba(28,13,8,0.95)' : 'transparent',
      borderBottom: `1px solid ${solid ? 'rgba(255,255,255,0.08)' : 'transparent'}`,
      backdropFilter: solid ? 'blur(14px)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{
        maxWidth: 1400, margin: '0 auto',
        padding: '0 max(1.5rem, 4vw)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: 70,
      }}>
        <a href="#" style={{ textDecoration: 'none', color: '#F3E6DA' }}>
          <div style={{ fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', lineHeight: 1 }}>
            STACKWRIGHT
          </div>
          <div style={{ fontWeight: 300, fontSize: '0.63rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(243,230,218,0.38)', marginTop: 3 }}>
            SOLUTIONS
          </div>
        </a>

        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '2.25rem' }}>
          {[
            ['The Problem', '#problem'],
            ['How I Work', '#how-i-work'],
            ['Services', '#services'],
            ['Testimonials', '#testimonials'],
          ].map(([label, href]) => (
            <a key={href} href={href} style={{
              fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.04em',
              color: 'rgba(243,230,218,0.55)', textDecoration: 'none', transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = '#F3E6DA'}
            onMouseLeave={e => e.target.style.color = 'rgba(243,230,218,0.55)'}
            >
              {label}
            </a>
          ))}
        </div>

        <a href="#contact" style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: 'var(--accent)', color: '#fff',
          padding: '0.58rem 1.15rem',
          fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.08em',
          textTransform: 'uppercase', textDecoration: 'none',
          position: 'relative', overflow: 'hidden',
          transition: 'background 0.2s, transform 0.1s',
        }}
        onMouseEnter={e => { setNavCtaHovered(true); e.currentTarget.style.background = 'var(--accent-h)'; }}
        onMouseLeave={e => { setNavCtaHovered(false); e.currentTarget.style.background = 'var(--accent)'; }}
        onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
        onMouseUp={e => e.currentTarget.style.transform = 'none'}
        >
          <div style={{
            position: 'absolute', bottom: 0, left: '50%',
            width: 6, height: navCtaHovered ? '100%' : 0,
            transform: 'translateX(-100%)',
            background: 'linear-gradient(to top, rgba(255,185,105,0.55), transparent)',
            transition: 'height 0.45s cubic-bezier(0.16,1,0.3,1)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, right: '50%',
            width: 6, height: navCtaHovered ? '100%' : 0,
            transform: 'translateX(100%)',
            background: 'linear-gradient(to top, rgba(215,110,50,0.5), transparent)',
            transition: 'height 0.45s cubic-bezier(0.16,1,0.3,1)',
            pointerEvents: 'none',
          }} />
          <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            Book a Call <ArrowRight size={12} strokeWidth={2.5} style={{
              transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
              transform: navCtaHovered ? 'translateY(-3px)' : 'none',
            }} />
          </span>
        </a>
      </div>

      <div className="nav-progress" style={{ width: `${progress}%` }} />
    </nav>
  );
}
