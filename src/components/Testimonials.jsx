import { useState, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { SectionLabel } from './Primitives';

const testimonials = [
  {
    quote: "Trixie has been an incredible asset to our team. She is extremely tech savvy, quick to learn new tools, and always finds efficient solutions to keep our workflows running smoothly. Beyond her technical skills, she is a true team player who communicates clearly, collaborates effortlessly, and consistently goes above and beyond what's expected. Anyone would be lucky to have her on their team.",
    name: 'Erik',
    company: 'Rize Technologies',
    initials: 'E',
  },
  {
    quote: "Trixie has been instrumental in bringing structure and momentum to our operations. Her organization, follow-through, and proactive communication have helped streamline workflows, improve accountability, and move key projects and priorities forward. She's been an incredible asset to our organization and we are very fortunate to have her operational expertise and excellence on our team.",
    name: 'Bernadette',
    company: 'Swatch Junkie Creative',
    initials: 'B',
  },
  {
    quote: "Trixie is an amazing project manager, who helped get us from zero to fully operational as a marketing agency in 6 weeks. We now have a dialed in ClickUp and SOPs that will help our business to grow. I highly recommend Trixie to anyone, especially agencies looking to grow and scale.",
    name: 'Nicole',
    company: 'Lead Better HQ',
    initials: 'N',
  },
  {
    quote: "Trixie was a really great Marketing Coordinator and VA for our organisation. She worked with us on Active Campaign support, setting up microsites, creating social media content and providing Zendesk marketing ticket support. We have really improved our processes and marketing outcomes as a result of Trixie's work. Would absolutely continue to work with. Really great job.",
    name: 'Joe',
    company: 'We Make Footballers',
    initials: 'J',
  },
  {
    quote: "Trixie has been a fantastic team member! She works fast, is organized and also creative — a rare combination. I am so grateful she is a part of our team.",
    name: 'Joel',
    company: '4Good Marketing',
    initials: 'JL',
  },
];

function Stars() {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 12 12" fill="var(--accent-rose)">
          <polygon points="6,1 7.8,4.2 11.4,4.7 8.7,7.3 9.5,10.9 6,9 2.5,10.9 3.3,7.3 0.6,4.7 4.2,4.2" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ initials, size = 52 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: 'var(--bg-warm)',
      border: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: size * 0.38, fontWeight: 600,
      color: 'var(--accent-rose)',
      letterSpacing: '0.02em',
    }}>
      {initials}
    </div>
  );
}

function ArrowBtn({ onClick, disabled, dir }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 48, height: 48, borderRadius: '50%',
        border: '1.5px solid var(--border-2)',
        background: 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.3 : 1,
        transition: 'border-color 0.2s, opacity 0.2s',
        flexShrink: 0,
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.borderColor = 'var(--accent)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-2)'; }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {dir === 'prev'
          ? <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>
          : <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>
        }
      </svg>
    </button>
  );
}

export default function Testimonials() {
  const [ref, visible] = useInView({ threshold: 0.05 });
  const r = (d) => `reveal ${d} ${visible ? 'in' : ''}`;
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [dir, setDir] = useState(1);
  const touchStartX = useRef(null);

  const goTo = (next) => {
    if (animating) return;
    setDir(next > index ? 1 : -1);
    setAnimating(true);
    setTimeout(() => {
      setIndex(next);
      setAnimating(false);
    }, 280);
  };

  const t = testimonials[index];

  return (
    <section id="testimonials" ref={ref} style={{
      background: 'var(--bg)',
      borderTop: '1px solid var(--border)',
      padding: 'var(--section-spacing-standard) max(1.5rem,6vw)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        <div className="testi-slider-layout">

          {/* Left: label + heading + counter + arrows + profile links */}
          <div className={r('d1')} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '2.5rem' }}>
            <div>
              <SectionLabel style={{ marginBottom: '1.25rem' }}>What They Say</SectionLabel>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.25rem,3.8vw,3.25rem)',
                fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em',
                color: 'var(--ink)', margin: '0 0 1.25rem',
              }}>
                From founders who hired me to fix it.
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Stars />
                <span style={{ fontSize: '0.75rem', color: 'var(--ink-3)' }}>5.0 · Upwork</span>
              </div>
            </div>

            {/* Counter + arrows — hidden on mobile, shown below dots instead */}
            <div className="hide-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1rem', color: 'var(--ink-3)', letterSpacing: '0.04em',
              }}>
                <span style={{ color: 'var(--ink)', fontWeight: 600, fontSize: '1.1rem' }}>{String(index + 1).padStart(2, '0')}</span>
                {' / '}
                {String(testimonials.length).padStart(2, '0')}
              </div>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <ArrowBtn dir="prev" onClick={() => goTo(index - 1)} disabled={index === 0} />
                <ArrowBtn dir="next" onClick={() => goTo(index + 1)} disabled={index === testimonials.length - 1} />
              </div>
            </div>

            {/* Profile links */}
            <div className="testi-profile-links" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href="https://www.upwork.com/freelancers/~017f1ddd41bf1c0329?mp_source=share"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.55rem 1.1rem',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-warm)',
                  fontSize: '0.72rem', fontWeight: 600,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'var(--ink)', textDecoration: 'none',
                  fontFamily: 'Outfit, sans-serif',
                  transition: 'border-color 0.2s, color 0.2s',
                  flexShrink: 0,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-rose)'; e.currentTarget.style.color = 'var(--accent-rose)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--ink)'; }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Upwork Profile
              </a>
              <a
                href="https://drive.google.com/drive/folders/1ixxwln8jrgDbadr2MzF8p-Gx5CBli_XS?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.55rem 1.1rem',
                  background: 'var(--accent)',
                  fontSize: '0.72rem', fontWeight: 600,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: '#fff', textDecoration: 'none',
                  fontFamily: 'Outfit, sans-serif',
                  transition: 'background 0.2s',
                  flexShrink: 0,
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-h)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                </svg>
                Work Samples
              </a>
            </div>
          </div>

          {/* Right: testimonial card */}
          <div className={r('d2')} style={{ position: 'relative', overflow: 'hidden' }}>
            <div
              key={index}
              onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
              onTouchEnd={e => {
                if (touchStartX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchStartX.current;
                if (Math.abs(dx) > 48) {
                  if (dx < 0 && index < testimonials.length - 1) goTo(index + 1);
                  if (dx > 0 && index > 0) goTo(index - 1);
                }
                touchStartX.current = null;
              }}
              style={{
                background: 'var(--bg-warm)',
                border: '1px solid var(--border)',
                padding: 'clamp(2.5rem,5vw,4rem)',
                height: '100%',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                opacity: animating ? 0 : 1,
                transform: animating
                  ? `translateX(${dir > 0 ? '32px' : '-32px'})`
                  : 'translateX(0)',
                transition: 'opacity 0.28s ease, transform 0.28s ease',
              }}
            >
              <div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '4.5rem', lineHeight: 1,
                  color: 'var(--accent-rose)', opacity: 0.4,
                  marginBottom: '-0.75rem',
                  userSelect: 'none',
                }}>"</div>
                <p className="testi-quote" style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1.2rem,2vw,1.65rem)',
                  fontStyle: 'italic', lineHeight: 1.65,
                  color: 'var(--ink)', margin: 0,
                }}>
                  {t.quote}
                </p>
              </div>

              <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Avatar initials={t.initials} />
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3 }}>{t.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--ink-3)', marginTop: '0.2rem', letterSpacing: '0.02em' }}>{t.company}</div>
                  </div>
                </div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                  padding: '0.28rem 0.65rem',
                  border: '1px solid var(--border)',
                  background: 'var(--bg)',
                }}>
                  <Stars />
                  <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', fontFamily: 'Outfit, sans-serif' }}>
                    Verified · Upwork
                  </span>
                </div>
              </div>
            </div>

            {/* Dot indicators */}
            <div style={{ display: 'flex', gap: '0.45rem', justifyContent: 'center', marginTop: '1.25rem' }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    width: i === index ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    border: 'none',
                    background: i === index ? 'var(--accent-rose)' : 'var(--border-2)',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'width 0.28s ease, background 0.28s ease',
                  }}
                />
              ))}
            </div>

            {/* Mobile-only: arrows below dots */}
            <div className="show-mobile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', marginTop: '1.25rem' }}>
              <ArrowBtn dir="prev" onClick={() => goTo(index - 1)} disabled={index === 0} />
              <ArrowBtn dir="next" onClick={() => goTo(index + 1)} disabled={index === testimonials.length - 1} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
