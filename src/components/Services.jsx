import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { SectionLabel } from './Primitives';
import { ArrowRight } from './Icons';

const services = [
  {
    label: 'Operations',
    items: [
      { name: 'Fractional COO and Embedded Operations', detail: 'Acting as the operational lead inside your business: running team direction, setting decision authority, and making the business function without the founder in every loop.' },
      { name: 'Hiring, Onboarding, and Team Infrastructure', detail: 'Building the people systems that let a team grow without constant founder involvement — from job scoping and onboarding flows to role clarity and escalation design.' },
      { name: 'SOP Builds and Process Documentation', detail: 'Building operating infrastructure that the team actually uses, not just polished tools that live in a tab nobody opens.' },
      { name: 'Reporting and Performance Infrastructure', detail: 'Creating repeatable cadences for planning, reporting, handoffs, and decisions so the business stops rebuilding the machine every season.' },
      { name: 'Decision Authority and Escalation Design', detail: 'Clarifying who owns what, what requires founder input, and what should move without them — so the team stops routing everything back to one person.' },
    ],
  },
  {
    label: 'Marketing',
    items: [
      { name: 'Campaign Strategy and Execution', detail: 'Building and executing campaigns across channels — from strategy and offer architecture through to deployment and in-flight optimization.' },
      { name: 'Funnel and Offer Architecture', detail: 'Designing conversion infrastructure that compounds: positioning, sequencing, and the logic that turns attention into revenue.' },
      { name: 'Content Systems and Editorial Infrastructure', detail: 'Creating content plans and production systems that connect to business goals, not just filling a publishing calendar.' },
      { name: 'Positioning and Messaging Refinement', detail: 'Tightening how the business communicates its value — so the offer holds up under scrutiny and the right clients self-select.' },
      { name: 'Marketing Team Management and Handoff', detail: 'Managing the marketing function end to end and building the handoff structure so execution does not require the founder to be the bottleneck.' },
    ],
  },
  {
    label: 'Automation & AI',
    items: [
      { name: 'GoHighLevel Buildouts, Migrations, and Optimization', detail: 'Full GHL environments built clean from the start — CRM hygiene, pipeline logic, funnel and email infrastructure, SMS and voice automation, membership and client portals. Rescue jobs for founders who bought GHL and never got it working.' },
      { name: 'AI-Assisted Workflows for Marketing and Operations', detail: 'AI-assisted workflows for lead qualification, content production, reporting, client communication, and internal decision support. Built around what the business actually needs, not the newest model release.' },
      { name: 'Custom Automation Across CRM, Email, Scheduling, and Reporting', detail: 'Connecting the tools that should already talk to each other — so the handoffs stop falling through the cracks and the team stops doing manual work a system should handle.' },
      { name: 'Lead Capture, Nurture, and Conversion Automation', detail: 'Building the automation underneath your funnel: lead capture, follow-up sequences, and conversion logic that runs without someone manually managing each step.' },
      { name: 'Client Onboarding and Delivery Automation', detail: 'Automating the intake, onboarding, and delivery process so new clients get a consistent experience and the team is not rebuilding the same workflow every time.' },
      { name: 'Internal Operations Automation', detail: 'Finding the approvals, reports, and handoffs that keep ending up on a human, scoping the automation, and building it — then documenting it so the team can maintain it without outside help.' },
    ],
  },
];

export default function Services() {
  const [ref, visible] = useInView();
  const r = (d) => `reveal ${d} ${visible ? 'in' : ''}`;
  const [tab, setTab] = useState(0);
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="services" ref={ref} style={{
      background: 'var(--bg)', borderTop: '1px solid var(--border)',
      padding: 'var(--section-spacing-standard) max(1.5rem,6vw)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
          <div style={{ maxWidth: 520 }}>
            <SectionLabel className={r('d1')}>Services</SectionLabel>
            <h2 className={r('d2')} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.25rem,4vw,3.5rem)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '1rem' }}>
              Operations. Marketing. Automation.
            </h2>
            <p className={r('d3')} style={{ fontSize: 'clamp(0.85rem,1vw,0.95rem)', fontWeight: 500, letterSpacing: '0.02em', color: 'var(--ink-2)', marginBottom: '0.5rem' }}>
              One operator, one system, one person accountable.
            </p>
            <p className={r('d4')} style={{ fontSize: 'clamp(0.9rem,1.1vw,1rem)', lineHeight: 1.75, color: 'var(--ink-2)' }}>
              Most fractional operators work in one lane. I work across two, and I build on a third. Operations is
              the backbone that keeps your business running. Marketing is the infrastructure that keeps it growing.
              Automation is what connects them, so the systems you pay for actually talk to each other and the
              handoffs stop falling through the cracks.
            </p>
          </div>

          <div className={`${r('d3')} services-tabs`} style={{ display: 'flex', border: '1px solid var(--border)', background: 'var(--bg-warm)', alignSelf: 'flex-start' }}>
            {services.map((s, i) => (
              <button key={i} onClick={() => { setTab(i); setExpanded(null); }} style={{
                padding: '0.75rem 1.75rem',
                fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: tab === i ? 'var(--ink)' : 'transparent',
                color: tab === i ? '#fff' : 'var(--ink-2)',
                border: 'none', cursor: 'pointer',
                transition: 'background 0.28s ease, color 0.28s ease',
                fontFamily: 'Outfit, sans-serif',
              }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)' }}>
          {services[tab].items.map((item, i) => (
            <div
              key={`${tab}-${i}`}
              className={`svc-row${expanded === i ? ' svc-expanded' : ''}`}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <span className="svc-name" style={{ fontSize: 'clamp(1rem,1.4vw,1.1rem)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: 'var(--ink)' }}>
                  {item.name}
                </span>
                <ArrowRight size={16} strokeWidth={1.5} style={{
                  color: 'var(--ink-3)', flexShrink: 0,
                  transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                  transform: expanded === i ? 'rotate(90deg)' : 'none',
                }} />
              </div>
              <div className="svc-detail">
                <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--ink-2)', margin: '0.75rem 0 0', maxWidth: '64ch' }}>
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={r('d5')} style={{ marginTop: '3.5rem' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '1.1rem' }}>
            However you'd search for me, I'm probably the person.
          </p>
          <div className="services-pills" style={{ gap: '0.6rem' }}>
            {[
              { label: 'Fractional COO',            bg: 'rgba(195,118,96,0.12)',  dot: '#C37660', text: '#7A3525' },
              { label: 'Chief of Systems',           bg: 'rgba(176,144,112,0.14)', dot: '#B09070', text: '#5A3E28' },
              { label: 'Systems Operator',           bg: 'rgba(222,161,147,0.18)', dot: '#DEA193', text: '#7A4035' },
              { label: 'Revenue Operations Lead',    bg: 'rgba(195,118,96,0.08)',  dot: '#C37660', text: '#7A3525' },
              { label: 'Embedded Growth Operator',   bg: 'rgba(180,150,130,0.14)', dot: '#B09080', text: '#5C3D32' },
              { label: 'Operational Stack Builder',  bg: 'rgba(158,138,135,0.14)', dot: '#9E8A87', text: '#4A3530' },
            ].map(({ label, bg, dot, text }) => (
              <span key={label} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                padding: '0.55rem 1.25rem',
                borderRadius: '999px',
                background: bg,
                whiteSpace: 'nowrap',
              }}>
                <span style={{
                  width: 9, height: 9, borderRadius: '50%',
                  background: dot, flexShrink: 0, display: 'inline-block',
                }} />
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '0.95rem', fontWeight: 600,
                  color: text, letterSpacing: '0.01em',
                }}>{label}</span>
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
