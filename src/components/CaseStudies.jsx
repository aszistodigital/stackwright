import { useInView } from '../hooks/useInView';
import { SectionLabel } from './Primitives';

export default function CaseStudies() {
  const [ref, visible] = useInView();
  const [ref2, visible2] = useInView();
  const r  = (d) => `reveal ${d} ${visible  ? 'in' : ''}`;
  const r2 = (d) => `reveal ${d} ${visible2 ? 'in' : ''}`;

  return (
    <section ref={ref} style={{
      background: 'var(--bg-warm)', borderTop: '1px solid var(--border)',
      padding: 'var(--section-spacing-large) max(1.5rem,6vw)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        <div style={{ marginBottom: 'clamp(3rem,6vw,5rem)' }}>
          <SectionLabel className={r('d1')}>Proof</SectionLabel>
          <h2 className={r('d2')} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.25rem,4vw,3.5rem)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '1rem' }}>
            What the work actually looks like.
          </h2>
        </div>

        <div className="case-grid" style={{ display: 'grid', gap: 0 }}>

          <div className={r('d2')} style={{ padding: 'clamp(2rem,4vw,3.5rem)', borderTop: '1px solid var(--border)', background: 'var(--bg)' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent-rose)', marginBottom: '1.25rem' }}>Case Study 01</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.5rem,2.5vw,2.25rem)', fontWeight: 600, lineHeight: 1.2, color: 'var(--ink)', marginBottom: '1.5rem' }}>
              48 Hours, No Founder, Critical Launch Window
            </h3>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.8, color: 'var(--ink-2)', marginBottom: '1.25rem' }}>
              A seven-figure agency founder stepped away for 48 hours during a product launch. No calls, no Slack, no approvals. The team executed without her.
            </p>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.8, color: 'var(--ink-2)', marginBottom: '1.25rem' }}>
              That wasn't luck. That was six weeks of rebuilding decision authority, documentation, handoff structure, and the automation underneath it, so the business could run a critical moment without the founder in the room.
            </p>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
              {[['0', 'escalations during the launch window'], ['On time', 'launch executed to schedule without founder input'], ['Rested', 'founder actually stepped away and stayed away']].map(([n, l]) => (
                <div key={n}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,3vw,2.75rem)', fontWeight: 700, lineHeight: 1, color: 'var(--accent-rose)', letterSpacing: '-0.02em' }}>{n}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--ink-2)', marginTop: '0.4rem', lineHeight: 1.5 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div ref={ref2} className={r2('d1')} style={{ borderTop: '1px solid var(--border)', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: 'clamp(2rem,4vw,3.5rem)', flex: 1 }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent-rose)', marginBottom: '1.25rem' }}>Case Study 02</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.5rem,2.2vw,2rem)', fontWeight: 600, lineHeight: 1.2, color: 'var(--ink)', marginBottom: '1.5rem' }}>
                Six Years. One Campaign. $405,000.
              </h3>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.8, color: 'var(--ink-2)', marginBottom: '1.25rem' }}>
                A founder had been running the same core offer for six years. The infrastructure was stable. The marketing wasn't compounding.
              </p>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.8, color: 'var(--ink-2)', marginBottom: '1.25rem' }}>
                We rebuilt the campaign architecture: cleaner positioning, tighter targeting, better conversion sequencing, and automated the follow-up so leads stopped falling through the cracks between sales and delivery.
              </p>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.8, color: 'var(--ink-2)' }}>
                $405,000 in tracked campaign revenue across a 12-month campaign period. Six-year engagement, still ongoing.
              </p>
            </div>
            <div style={{ borderTop: '1px solid var(--border)', padding: '2rem clamp(2rem,4vw,3.5rem)', background: 'var(--bg-dark)' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem,4vw,3.5rem)', fontWeight: 700, lineHeight: 1, color: '#fff', letterSpacing: '-0.02em' }}>$405,000</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem', lineHeight: 1.5 }}>
                from a single campaign launch (2025). Six-year engagement, still ongoing.
              </div>
            </div>
          </div>

        </div>

        {/* Case Study 03 — full-width row */}
        <div className={r2('d2')} style={{
          borderTop: '1px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: 'clamp(280px,42%,560px) 1fr',
          gap: 0,
        }}>
          <div style={{ padding: 'clamp(2rem,4vw,3.5rem)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent-rose)', marginBottom: '1.25rem' }}>Case Study 03</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.5rem,2.2vw,2rem)', fontWeight: 600, lineHeight: 1.2, color: 'var(--ink)', marginBottom: '1.5rem' }}>
                The GHL Rescue.
              </h3>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.8, color: 'var(--ink-2)', marginBottom: '1.25rem' }}>
                An agency founder had been paying for GoHighLevel for eighteen months. Two failed buildouts, one half-finished migration, and a team that had stopped using it entirely because nothing worked the way it was supposed to.
              </p>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.8, color: 'var(--ink-2)' }}>
                We rebuilt the environment from the ground up: CRM logic, pipeline automation, email and SMS sequences, client onboarding flows, and reporting dashboards. Integrated AI-assisted lead qualification on top. The team is back in the tool, the automation is running, and the founder stopped approving things that a workflow should have handled automatically.
              </p>
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: '2rem' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '0.5rem' }}>Note</div>
              <p style={{ fontSize: '0.78rem', lineHeight: 1.6, color: 'var(--ink-3)', margin: 0 }}>Metrics to be updated when available. Placeholder pending client confirmation.</p>
            </div>
          </div>
          <div style={{ padding: 'clamp(2rem,4vw,3.5rem)', background: 'var(--bg)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {[
              ['18 months', 'of GHL subscription before the system actually worked'],
              ['2 failed buildouts', 'prior to this engagement — third time was structural, not just tactical'],
              ['Full rebuild', 'CRM, pipelines, email, SMS, onboarding, reporting, and AI lead qualification — all live'],
            ].map(([n, l]) => (
              <div key={n} style={{ paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.5rem,2.5vw,2.25rem)', fontWeight: 700, lineHeight: 1, color: 'var(--accent-rose)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>{n}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
