import { useInView } from '../hooks/useInView';
import { SectionLabel } from './Primitives';

export default function Problem() {
  const [ref, visible] = useInView();
  const r = (d) => `reveal ${d} ${visible ? 'in' : ''}`;

  const pairs = [
    {
      quote: '"I need someone to take things off my plate."',
      diagnosis: "The founder is still the operating system. Tools, team members, and workflows exist, but the founder's memory is manually holding everything together.",
    },
    {
      quote: '"I need a project manager."',
      diagnosis: 'Most agencies are busy all day but do not have rhythm. Priorities change midweek. Meetings create more work instead of decisions.',
    },
    {
      quote: '"I need systems."',
      diagnosis: "The team built a beautiful ClickUp. Nobody uses it. Client updates happen in Slack. The founder is still the hidden QA layer.",
    },
    {
      quote: '"I need someone proactive who can just come in and figure it out."',
      diagnosis: 'That is not an organization problem. That is a founder-dependency problem.',
    },
  ];

  return (
    <section id="problem" ref={ref} style={{ background: 'var(--bg)', padding: 'var(--section-spacing-standard) max(1.5rem,6vw)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

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
          <p className={r('d3')} style={{ fontSize: 'clamp(1rem,1.3vw,1.1rem)', lineHeight: 1.75, color: 'var(--ink-2)', maxWidth: '60ch' }}>
            It is that your business was built around you being in the room. Every decision, every handoff,
            every bottleneck leads back to one person: you. You don't need someone to take things off your
            plate. You need someone to rebuild the plate so it stops breaking.
          </p>
        </div>

        <div className={r('d4')} style={{ marginTop: '4rem', marginBottom: '4rem', border: '1px solid var(--border)', background: 'var(--bg-warm)' }}>
          {/* Column headers */}
          <div className="problem-table-header" style={{
            gap: '0 clamp(1rem,3vw,2.5rem)',
            padding: '1.1rem clamp(1.5rem,3vw,2.5rem)',
            borderBottom: '1px solid var(--border)',
          }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)', fontFamily: 'Outfit, sans-serif' }}>
              What founders say
            </div>
            <div style={{ width: 'clamp(3rem,6vw,5rem)' }} />
            <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)', fontFamily: 'Outfit, sans-serif' }}>
              What's actually wrong
            </div>
          </div>

          {/* Pairs */}
          <div style={{ padding: 'clamp(1.5rem,3vw,2.5rem)', display: 'flex', flexDirection: 'column', gap: 0 }}>
            {pairs.map((pair, i) => (
              <div key={i} className="problem-row" style={{
                gap: 'clamp(1rem,2vw,1.5rem) clamp(1rem,3vw,2.5rem)',
                alignItems: 'center',
                paddingTop: i > 0 ? 'clamp(1.5rem,2.5vw,2rem)' : 0,
                paddingBottom: 'clamp(1.5rem,2.5vw,2rem)',
                borderBottom: i < pairs.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                {/* Quote */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.5rem', fontWeight: 400,
                    color: 'var(--accent-rose)', lineHeight: 1,
                    flexShrink: 0, marginTop: '0.15rem',
                  }}>
                    {`0${i + 1}`}
                  </span>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(1rem,1.4vw,1.15rem)',
                    fontStyle: 'italic', lineHeight: 1.6,
                    color: 'var(--ink-2)', margin: 0,
                  }}>
                    {pair.quote}
                  </p>
                </div>

                {/* Connector */}
                <div className="problem-connector" style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem',
                  width: 'clamp(3rem,6vw,5rem)', flexShrink: 0,
                }}>
                  <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-3)', fontFamily: 'Outfit, sans-serif', lineHeight: 1 }}>actually</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', color: 'var(--accent-rose)', lineHeight: 1 }}>→</span>
                </div>

                {/* Diagnosis */}
                <p style={{
                  fontSize: '0.9rem', lineHeight: 1.7,
                  color: 'var(--ink-2)', margin: 0,
                }}>
                  {pair.diagnosis}
                </p>
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}
