import { useInView } from '../hooks/useInView';
import { SectionLabel } from './Primitives';
import { HubIcon, ForkIcon, ForesightIcon } from './Icons';

const steps = [
  {
    num: '01',
    title: 'Find where you are still the real system',
    body: "Within the first week, I identify where the business actually routes through you: who people go to when something is unclear, where decisions really get made, whether priorities live in the tool or in your DMs. A newer operator often does not see this until month three.",
    Icon: HubIcon,
  },
  {
    num: '02',
    title: 'Separate the people problem from the structure problem',
    body: 'Most operators assume the team is dropping the ball. Most of the time the real issue is unclear ownership, no decision rights, or contradictory priorities from the founder. I do not rush to label anyone underperforming until I have looked at the environment they are operating inside.',
    Icon: ForkIcon,
  },
  {
    num: '03',
    title: 'See the next bottleneck before it is visible',
    body: 'Before anything else, I am asking: if sales increase 20%, what breaks first? If you step away for two weeks, where does work stall? I have seen the same movie enough times to recognize the first ten minutes.',
    Icon: ForesightIcon,
  },
];

export default function HowIWork() {
  const [ref, visible] = useInView();
  const r = (d) => `reveal ${d} ${visible ? 'in' : ''}`;

  return (
    <section id="how-i-work" ref={ref} style={{
      background: 'var(--bg-warm)', borderTop: '1px solid var(--border)',
      padding: 'var(--section-spacing-standard) max(1.5rem,6vw)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        <div style={{ marginBottom: 'clamp(3rem,6vw,5rem)', maxWidth: 620 }}>
          <SectionLabel className={r('d1')}>How I Work</SectionLabel>
          <h2 className={r('d2')} style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.25rem,4vw,3.5rem)',
            fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em',
            color: 'var(--ink)', marginBottom: '1rem',
          }}>
            I look at the operating model, not the task list.
          </h2>
          <p className={r('d3')} style={{ fontSize: 'clamp(0.95rem,1.2vw,1.05rem)', lineHeight: 1.75, color: 'var(--ink-2)' }}>
            You don't need another consultant who shows up, talks in frameworks, and hands you a deck. You need
            someone who can read what's actually happening inside your business and fix the thing that's breaking it.
          </p>
          <p className={r('d4')} style={{ fontSize: 'clamp(0.95rem,1.2vw,1.05rem)', lineHeight: 1.75, color: 'var(--ink-2)', marginTop: '1rem' }}>
            Every engagement starts with a diagnostic: what's the real constraint, where does execution actually break
            down, and what would need to be true for this business to run without you in every loop. Then we build for
            that. Not for a template. For your business.
          </p>
        </div>

        <div className="how-grid" style={{ display: 'grid', gap: 0 }}>
          {steps.map((s, i) => (
            <div key={i} className={`how-col ${r(`d${i + 2}`)}`} style={{
              padding: 'clamp(2rem,3vw,2.5rem)',
              borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
              borderTop: '1px solid var(--border)',
              background: 'var(--bg-warm)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div className="how-col-num" style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(4rem,8vw,7rem)', fontWeight: 700, lineHeight: 1,
                color: 'var(--border)', position: 'absolute', top: '-0.1em', right: '0.5rem',
                userSelect: 'none', pointerEvents: 'none',
                transition: 'color 0.32s ease',
              }}>{s.num}</div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <s.Icon size={24} style={{ color: 'var(--accent-rose)', marginBottom: '1.25rem', display: 'block' }} />
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', fontWeight: 400, color: 'var(--accent-rose)', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>{s.num}</div>
                <h3 className="how-col-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.2rem,1.8vw,1.5rem)', fontWeight: 600, lineHeight: 1.25, color: 'var(--ink)', marginBottom: '1.25rem', transition: 'color 0.32s ease' }}>{s.title}</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={r('d6')} style={{ marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
          <div style={{ width: 3, flexShrink: 0, height: 48, background: 'var(--accent-rose)', marginTop: 4 }} />
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.1rem,1.8vw,1.4rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.5, color: 'var(--ink)', margin: '0 0 0.75rem', maxWidth: '56ch' }}>
              "Being indispensable is not the same as being effective."
            </p>
            <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-3)', margin: 0 }}>
              Trixie Shane Maningding
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
