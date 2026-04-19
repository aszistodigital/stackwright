import { useInView } from '../hooks/useInView';
import { SectionLabel } from './Primitives';
import { Check, XIcon } from './Icons';

const goodFit = [
  'Your business has momentum but the structure has not kept up.',
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

export default function FitSection() {
  const [ref, visible] = useInView();
  const r = (d) => `reveal ${d} ${visible ? 'in' : ''}`;

  return (
    <section ref={ref} style={{
      background: 'var(--bg)', borderTop: '1px solid var(--border)',
      padding: 'var(--section-spacing-standard) max(1.5rem,6vw)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        <div style={{ marginBottom: 'clamp(3rem,5vw,4rem)' }}>
          <SectionLabel className={r('d1')}>Who This Is For</SectionLabel>
          <h2 className={r('d2')} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.25rem,4vw,3.5rem)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
            Not every founder is my client. On purpose.
          </h2>
        </div>

        <div className="fit-grid" style={{ display: 'grid' }}>
          <div className={r('d2')} style={{ padding: 'clamp(2rem,4vw,3rem)', border: '1px solid var(--border)', borderTop: '3px solid var(--accent-rose)', background: 'var(--bg)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '2rem' }}>Right fit</div>
            {goodFit.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', paddingBottom: i < goodFit.length - 1 ? '1.1rem' : 0, marginBottom: i < goodFit.length - 1 ? '1.1rem' : 0, borderBottom: i < goodFit.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <Check size={16} strokeWidth={2} style={{ color: 'var(--accent-rose)', flexShrink: 0, marginTop: '0.15rem' }} />
                <span style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--ink-2)' }}>{item}</span>
              </div>
            ))}
          </div>

          <div className={r('d3')} style={{ padding: 'clamp(2rem,4vw,3rem)', border: '1px solid var(--border)', borderTop: '3px solid var(--border-2)', background: 'var(--bg-warm)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '2rem' }}>Not a fit</div>
            {notFit.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', paddingBottom: i < notFit.length - 1 ? '1.1rem' : 0, marginBottom: i < notFit.length - 1 ? '1.1rem' : 0, borderBottom: i < notFit.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <XIcon size={16} strokeWidth={2} style={{ color: 'var(--ink-3)', flexShrink: 0, marginTop: '0.15rem' }} />
                <span style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--ink-2)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={r('d5')} style={{ marginTop: '3.5rem', maxWidth: 680 }}>
          <p style={{ fontSize: 'clamp(0.95rem,1.2vw,1.05rem)', lineHeight: 1.8, color: 'var(--ink-2)' }}>
            Part of the value is stopping people from building on top of confusion by asking the uncomfortable question early.
            Most discovery calls reveal the mismatch quickly if both people are honest.
          </p>
        </div>

      </div>
    </section>
  );
}
