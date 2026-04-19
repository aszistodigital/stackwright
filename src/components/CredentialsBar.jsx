import { useInView } from '../hooks/useInView';
import { useCounter } from '../hooks/useCounter';

const C = '#F3E6DA'; // light cream on dark marquee strip

/* ── Inline SVGs for logos not in Simple Icons or rendering incorrectly ── */
const GHLIcon = () => (
  <svg viewBox="0 0 34 22" fill={C} width="22" height="16">
    {/* Left arrow — tall */}
    <polygon points="6,0 1,8 4,8 4,22 8,22 8,8 11,8"/>
    {/* Center arrow — shorter */}
    <polygon points="17,5 12,12 15,12 15,22 19,22 19,12 22,12"/>
    {/* Right arrow — tall */}
    <polygon points="28,0 23,8 26,8 26,22 30,22 30,8 33,8"/>
  </svg>
);

const SlackIcon = () => (
  <svg viewBox="0 0 24 24" fill={C} width="20" height="20">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zm2.521-10.123a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.527 2.527 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.527 2.527 0 0 1 2.521 2.521 2.527 2.527 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521H8.834zm10.123 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.527 2.527 0 0 1-2.521 2.521h-2.522V8.834zm-1.268 0a2.527 2.527 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.528 2.528 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522V8.834zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
  </svg>
);

const KlaviyoIcon = () => (
  <svg viewBox="0 0 20 24" fill={C} width="16" height="20">
    <path d="M0,0 L14,0 L20,12 L14,24 L0,24 Z"/>
  </svg>
);

const AnthropicIcon = () => (
  <svg viewBox="-10 -10 20 20" fill={C} width="20" height="20">
    {/* 12-pointed starburst matching Anthropic/Claude mark */}
    <polygon points="0,-9 0.91,-3.38 4.5,-7.79 2.47,-2.47 7.79,-4.5 3.38,-0.91 9,0 3.38,0.91 7.79,4.5 2.47,2.47 4.5,7.79 0.91,3.38 0,9 -0.91,3.38 -4.5,7.79 -2.47,2.47 -7.79,4.5 -3.38,0.91 -9,0 -3.38,-0.91 -7.79,-4.5 -2.47,-2.47 -4.5,-7.79 -0.91,-3.38"/>
  </svg>
);

export default function CredentialsBar() {
  const [ref, visible] = useInView();
  const r = (d) => `reveal ${d} ${visible ? 'in' : ''}`;
  const c6   = useCounter(6,   visible);
  const c30  = useCounter(30,  visible);
  const c405 = useCounter(405, visible);
  const c20  = useCounter(20,  visible);

  const stats = [
    { value: c6,   suffix: '',    label: 'Years in the work' },
    { value: c30,  suffix: '+',   label: 'Businesses supported' },
    { value: c405, suffix: 'K',   label: 'Single campaign result', prefix: '$' },
    { value: c20,  suffix: '',    label: 'Largest team managed' },
  ];

  const tools = [
    { slug: 'notion',        label: 'Notion' },
    { slug: 'clickup',       label: 'ClickUp' },
    { slug: 'google',        label: 'Google Workspace' },
    { Icon: SlackIcon,       label: 'Slack' },
    { slug: 'hubspot',       label: 'HubSpot' },
    { Icon: KlaviyoIcon,     label: 'Klaviyo' },
    { slug: 'mailchimp',     label: 'Mailchimp' },
    { slug: 'meta',          label: 'Meta Ads' },
    { Icon: AnthropicIcon,   label: 'Claude' },
    { slug: 'vercel',        label: 'Vercel' },
    { slug: 'replit',        label: 'Replit' },
    { slug: 'supabase',      label: 'Supabase' },
    { Icon: GHLIcon,         label: 'GoHighLevel' },
  ];

  return (
    <section ref={ref} style={{ background: 'var(--bg-dark)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 max(1.5rem,6vw)' }}>
      <div className="cred-grid">
        {stats.map((s, i) => (
          <div key={i} className={r(`d${i + 1}`)} style={{
            padding: 'clamp(2rem,4vw,3rem) clamp(1.5rem,3vw,2.5rem)',
            borderRight: '1px solid rgba(255,255,255,0.06)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            textAlign: 'center',
          }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.25rem,3.5vw,3.25rem)', fontWeight: 700, lineHeight: 1, color: 'var(--accent)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
              {s.static ? s.static : `${s.prefix || ''}${s.value}${s.suffix}`}
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.68)', lineHeight: 1.4 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', padding: '1.5rem 0' }}>
        <div className="marquee-inner">
          {[...Array(2)].map((_, j) =>
            tools.map((tool, i) => (
              <div key={`${j}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', padding: '0 2rem', flexShrink: 0, opacity: 0.38 }}>
                {tool.Icon
                  ? <tool.Icon />
                  : <img
                      src={`https://cdn.simpleicons.org/${tool.slug}/F3E6DA`}
                      alt={tool.label}
                      title={tool.label}
                      style={{ width: 20, height: 20, objectFit: 'contain', display: 'block' }}
                      onError={e => { e.currentTarget.style.display = 'none'; }}
                    />
                }
                <span style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F3E6DA', whiteSpace: 'nowrap' }}>
                  {tool.label}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
