import { useState } from 'react';
import { ArrowRight } from './Icons';

export const SectionLabel = ({ children, style = {}, className = '' }) => (
  <div className={className} style={{
    fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.18em',
    textTransform: 'uppercase', color: 'var(--accent-rose)',
    marginBottom: '1.5rem', ...style,
  }}>
    {children}
  </div>
);

export const CTAButton = ({ href = '#contact', children, large = false }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href} className="btn-primary" style={{
      gap: large ? 10 : 7,
      padding: large ? '0 2.5rem' : '0 1.9rem',
      minHeight: 52,
      fontSize: large ? '0.88rem' : '0.8rem',
    }}
    onMouseEnter={e => { setHovered(true); e.currentTarget.style.background = 'var(--accent-h)'; }}
    onMouseLeave={e => { setHovered(false); e.currentTarget.style.background = 'var(--accent)'; }}
    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
    onMouseUp={e => e.currentTarget.style.transform = 'none'}
    >
      <div style={{
        position: 'absolute', bottom: 0, left: '50%',
        width: 8, height: hovered ? '100%' : 0,
        transform: 'translateX(-100%)',
        background: 'linear-gradient(to top, rgba(255,185,105,0.55), transparent)',
        transition: 'height 0.45s cubic-bezier(0.16,1,0.3,1)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, right: '50%',
        width: 8, height: hovered ? '100%' : 0,
        transform: 'translateX(100%)',
        background: 'linear-gradient(to top, rgba(215,110,50,0.5), transparent)',
        transition: 'height 0.45s cubic-bezier(0.16,1,0.3,1)',
        pointerEvents: 'none',
      }} />
      <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: large ? 10 : 7 }}>
        {children} <ArrowRight size={large ? 16 : 14} strokeWidth={2} style={{
          transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
          transform: hovered ? 'translateX(3px)' : 'none',
        }} />
      </span>
    </a>
  );
};
