import { useInView } from '../hooks/useInView';
import { SectionLabel, CTAButton } from './Primitives';

export default function CTASection() {
  const [ref, visible] = useInView();
  const r = (d) => `reveal ${d} ${visible ? 'in' : ''}`;

  return (
    <section id="book-call" ref={ref} style={{
      background: 'var(--bg-warm)', borderTop: '1px solid var(--border)',
      padding: 'var(--section-spacing-standard) max(1.5rem,6vw)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ maxWidth: 760 }}>
          <SectionLabel className={r('d1')}>Ready to talk?</SectionLabel>
          <h2 className={r('d2')} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4.5vw,4rem)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '2rem' }}>
            Relief doesn't happen just because someone was hired.
          </h2>
          <p className={r('d3')} style={{ fontSize: 'clamp(1rem,1.5vw,1.2rem)', lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: '1.5rem', maxWidth: '54ch' }}>
            Most founders have tried the hire. They brought someone in, handed over the login credentials, hoped it would help. It didn't. Not because the person was wrong, but because the problem wasn't a headcount problem.
          </p>
          <p className={r('d4')} style={{ fontSize: 'clamp(1rem,1.5vw,1.2rem)', lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: '1.5rem', maxWidth: '54ch' }}>
            It was a structure problem. And that's what I fix.
          </p>
          <p className={r('d5')} style={{ fontSize: 'clamp(1rem,1.5vw,1.2rem)', lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: '3rem', maxWidth: '54ch' }}>
            If your business is running through you instead of with you, that's the conversation worth having.
          </p>
          <div className={r('d6')}>
            <CTAButton large>Book a Discovery Call</CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
