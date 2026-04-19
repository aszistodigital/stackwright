import { useInView } from '../hooks/useInView';
import { SectionLabel } from './Primitives';

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

export default function AutomationSection() {
  const [ref, visible] = useInView();
  const [ref2, visible2] = useInView();
  const r  = (d) => `reveal ${d} ${visible  ? 'in' : ''}`;
  const r2 = (d) => `reveal ${d} ${visible2 ? 'in' : ''}`;

  return (
    <section ref={ref} style={{
      background: 'var(--bg-dark)', borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: 'var(--section-spacing-standard) max(1.5rem,6vw)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        <div style={{ marginBottom: 'clamp(3rem,6vw,5rem)', maxWidth: 700 }}>
          <SectionLabel className={r('d1')} style={{ color: 'var(--accent-rose)' }}>Automation & AI</SectionLabel>
          <h2 className={r('d2')} style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.25rem,4vw,3.5rem)',
            fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em',
            color: '#F3E6DA', marginBottom: '1.25rem',
          }}>
            Automation is not a feature. <span style={{ color: 'var(--accent-rose)' }}>It is how the business runs.</span>
          </h2>
          <p className={r('d3')} style={{ fontSize: 'clamp(0.95rem,1.2vw,1.05rem)', lineHeight: 1.75, color: 'rgba(243,230,218,0.65)', marginBottom: '1rem' }}>
            Most founders have tried automation. They bought GoHighLevel, built half a funnel, stitched together a few Zapier flows, and ended up with more tools than systems. Now they are paying for software that does not talk to itself, and the team is still doing the work manually because the automation is unreliable.
          </p>
          <p className={r('d4')} style={{ fontSize: 'clamp(0.95rem,1.2vw,1.05rem)', lineHeight: 1.75, color: 'rgba(243,230,218,0.65)' }}>
            That happens because automation was treated as a project, not as structure. I treat it as structure. Every engagement looks at three things: where your team is doing work that a system should be doing, where your tools are duplicating effort instead of compounding it, and where AI can take on the repetitive judgment calls that are eating your founder hours.
          </p>
        </div>

        <div ref={ref2} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 0,
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}>
          {cards.map((card, i) => (
            <div key={i} className={r2(`d${i + 1}`)} style={{
              padding: 'clamp(2rem,3.5vw,3rem)',
              borderRight: i < cards.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '0.7rem', fontWeight: 400,
                color: 'var(--accent-rose)', letterSpacing: '0.1em',
                textTransform: 'uppercase', marginBottom: '1rem',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.15rem,1.6vw,1.35rem)',
                fontWeight: 600, lineHeight: 1.25,
                color: 'var(--accent-rose)', marginBottom: '1rem',
              }}>
                {card.title}
              </h3>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.75, color: 'rgba(243,230,218,0.62)', margin: 0 }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>

        <div className={r('d5')} style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: 'clamp(1.5rem,3vw,2rem) 0',
          display: 'flex', alignItems: 'flex-start', gap: '1rem',
        }}>
          <div style={{ width: 2, flexShrink: 0, height: 36, background: 'var(--accent-rose)', marginTop: 4 }} />
          <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'rgba(243,230,218,0.45)', margin: 0, maxWidth: '60ch' }}>
            I do not sell automation as a product. I build it as part of the operating system. If automation is not the right answer for your bottleneck, I will tell you.
          </p>
        </div>

      </div>
    </section>
  );
}
