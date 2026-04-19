import { useState, useEffect, useRef } from 'react';

const ADMIN_TRIGGER = 'Admin support / task delegation';

const QUALIFIER_OPTS = [
  'Strategic operations & leadership support',
  'Team and people management',
  'Systems, processes & client communications',
  ADMIN_TRIGGER,
  "Not sure yet — I just know something's broken",
];

const PRIORITY_OPTS = [
  'Rarely — we stick to the plan',
  'Sometimes — weekly or every other week',
  'Often — multiple times per week',
  "Always — depends on the day / what we're feeling",
];

const TIMELINE_OPTS = [
  'I need someone ASAP (this week / next week)',
  'Soon (within 2–4 weeks)',
  "Open — I'm exploring my options",
  'Not immediately, but in the next quarter',
];

const FOUND_OPTS = ['Referral', 'LinkedIn', 'Upwork', 'Web search', 'Other'];

const TOTAL = 10;

export default function ContactForm() {
  const [step, setStep] = useState('qualifier');
  const [visible, setVisible] = useState(true);
  const [answers, setAnswers] = useState({});
  const [hoveredOpt, setHoveredOpt] = useState(null);
  const [pulsingOpt, setPulsingOpt] = useState(null);
  const inputRef = useRef(null);

  const goTo = (next) => {
    setVisible(false);
    setTimeout(() => {
      setStep(next);
      setVisible(true);
    }, 260);
  };

  const setA = (key, val) => setAnswers(p => ({ ...p, [key]: val }));

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 340);
    return () => clearTimeout(t);
  }, [step]);

  const canContinue = () => {
    if (step === 1) return (answers.q1 || '').trim().split(/\s+/).filter(Boolean).length >= 3;
    if (step === 2) return (answers.q2 || '').trim().length > 0;
    if (step === 3) return true;
    if (step === 4) return !!answers.q4;
    if (step === 5) return !!answers.q5;
    if (step === 6) return !!answers.q6;
    if (step === 7) return !!answers.q7;
    if (step === 8) return (answers.name || '').trim().length > 0;
    if (step === 9) return (answers.company || '').trim().length > 0;
    if (step === 10) return /\S+@\S+\.\S+/.test(answers.email || '');
    return false;
  };

  const advance = () => {
    if (!canContinue()) return;
    if (typeof step === 'number') {
      if (step === TOTAL) submitToFormspree();
      goTo(step < TOTAL ? step + 1 : 'thankyou');
    }
  };

  const skip = () => {
    if (typeof step === 'number') goTo(step < TOTAL ? step + 1 : 'thankyou');
  };

  const autoAdvance = (fromStep) => {
    setVisible(false);
    setTimeout(() => {
      setStep(fromStep < TOTAL ? fromStep + 1 : 'thankyou');
      setVisible(true);
    }, 300);
  };

  const submitToFormspree = () => {
    fetch('https://formspree.io/f/mzdyvpzb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(answers),
    });
  };

  const pulse = (opt, callback) => {
    setPulsingOpt(opt);
    setTimeout(() => setPulsingOpt(null), 350);
    callback();
  };

  const back = () => {
    if (step === 1 || step === 'admin-block') goTo('qualifier');
    else if (typeof step === 'number' && step > 1) goTo(step - 1);
  };

  const [showExitPrompt, setShowExitPrompt] = useState(false);

  const hasAnyInput = () => Object.values(answers).some(v => typeof v === 'string' ? v.trim().length > 0 : !!v);

  const goHome = () => { window.location.hash = ''; };

  const handleBackToSite = () => {
    if (hasAnyInput()) setShowExitPrompt(true);
    else goHome();
  };

  // Global keyboard handler
  useEffect(() => {
    const handler = (e) => {
      if (typeof step !== 'number') return;
      const isTextarea = document.activeElement?.tagName === 'TEXTAREA';
      if (e.key === 'Enter') {
        if (isTextarea) {
          if (e.metaKey || e.ctrlKey) { e.preventDefault(); advance(); }
        } else {
          e.preventDefault();
          advance();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, answers]);

  // ── Shared styles ──────────────────────────────────────────
  const label = {
    fontSize: '0.66rem', fontWeight: 600, letterSpacing: '0.2em',
    textTransform: 'uppercase', color: 'var(--accent-rose)',
    marginBottom: '1.1rem', display: 'block',
  };
  const question = {
    fontFamily: 'Cormorant Garamond, Georgia, serif',
    fontSize: 'clamp(1.55rem, 4vw, 2.15rem)', fontWeight: 500,
    lineHeight: 1.22, color: 'var(--bg)', marginBottom: '0.5rem', margin: 0,
  };
  const hint = {
    fontSize: '0.84rem', color: 'var(--ink-3)',
    marginTop: '0.55rem', marginBottom: '1.8rem', lineHeight: 1.6,
  };
  const fieldBase = {
    width: '100%', background: 'transparent', border: 'none',
    borderBottom: '1px solid rgba(243,230,218,0.18)',
    color: 'var(--bg)', fontFamily: 'Outfit, sans-serif',
    fontSize: '1rem', outline: 'none', lineHeight: 1.65,
    padding: '0.7rem 0',
    transition: 'border-color 0.2s',
  };

  const optCard = (sel, opt) => {
    const hovered = hoveredOpt === opt && !sel;
    const pulsing = pulsingOpt === opt;
    return {
      display: 'block', width: '100%', textAlign: 'left',
      padding: '0.85rem 1.1rem', marginBottom: '0.45rem',
      background: sel
        ? 'rgba(195,118,96,0.18)'
        : hovered ? 'rgba(243,230,218,0.07)' : 'rgba(243,230,218,0.03)',
      border: `1px solid ${sel
        ? 'var(--accent)'
        : hovered ? 'rgba(243,230,218,0.22)' : 'rgba(243,230,218,0.1)'}`,
      color: 'rgba(243,230,218,0.88)',
      fontFamily: 'Outfit, sans-serif', fontSize: '0.9rem',
      cursor: 'pointer', lineHeight: 1.4,
      transition: 'background 0.15s ease, border-color 0.15s ease, transform 0.15s ease',
      animation: pulsing ? 'opt-pulse 0.32s ease' : 'none',
    };
  };

  const continueBtn = (active) => ({
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: active ? 'var(--accent)' : 'rgba(195,118,96,0.2)',
    color: active ? '#fff' : 'var(--ink-3)',
    border: 'none', cursor: active ? 'pointer' : 'default',
    padding: '0.9rem 2rem', fontFamily: 'Outfit, sans-serif',
    fontSize: '0.77rem', fontWeight: 500,
    letterSpacing: '0.1em', textTransform: 'uppercase',
    transition: 'all 0.2s',
  });
  const skipBtn = {
    background: 'none', border: 'none', color: 'var(--ink-3)',
    cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
    fontSize: '0.77rem', fontWeight: 500,
    letterSpacing: '0.1em', textTransform: 'uppercase',
    padding: '0.9rem 0', transition: 'color 0.2s',
  };
  const backBtn = {
    background: 'none', border: 'none', color: 'var(--ink-3)',
    cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
    fontSize: '0.75rem', letterSpacing: '0.05em', padding: 0,
    transition: 'color 0.2s',
  };
  const wrap = {
    width: '100%', maxWidth: 560,
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(18px)',
    transition: 'opacity 0.24s ease, transform 0.24s cubic-bezier(0.16,1,0.3,1)',
  };

  const ChevronUp = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
  const ChevronDown = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );

  const shell = (children, showProgress = false) => {
    const isQ = typeof step === 'number';
    const canBack = isQ && step > 1;
    const canNext = isQ && canContinue();
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', display: 'flex', flexDirection: 'column', fontFamily: 'Outfit, sans-serif', color: 'var(--bg)' }}>
        {showExitPrompt && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(28,13,8,0.72)', backdropFilter: 'blur(4px)' }}
            onClick={() => setShowExitPrompt(false)}
          >
            <div style={{ background: 'var(--bg-dark2)', border: '1px solid rgba(243,230,218,0.1)', padding: '2.5rem 2rem', maxWidth: 380, width: '90%', textAlign: 'center' }}
              onClick={e => e.stopPropagation()}
            >
              <p style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.35rem', fontWeight: 500, color: 'var(--bg)', marginBottom: '0.65rem', lineHeight: 1.3 }}>
                Leave the form?
              </p>
              <p style={{ fontSize: '0.875rem', color: 'rgba(243,230,218,0.55)', lineHeight: 1.65, marginBottom: '2rem' }}>
                Your answers won't be saved if you leave now.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button onClick={goHome} style={{ background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', padding: '0.75rem 1.5rem', fontFamily: 'Outfit, sans-serif', fontSize: '0.77rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Yes, leave
                </button>
                <button onClick={() => setShowExitPrompt(false)} style={{ background: 'transparent', color: 'rgba(243,230,218,0.6)', border: '1px solid rgba(243,230,218,0.12)', cursor: 'pointer', padding: '0.75rem 1.5rem', fontFamily: 'Outfit, sans-serif', fontSize: '0.77rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'border-color 0.2s, color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(243,230,218,0.28)'; e.currentTarget.style.color = 'rgba(243,230,218,0.9)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(243,230,218,0.12)'; e.currentTarget.style.color = 'rgba(243,230,218,0.6)'; }}
                >
                  Keep going
                </button>
              </div>
            </div>
          </div>
        )}
        <header style={{ padding: '1.1rem 2rem', borderBottom: '1px solid rgba(243,230,218,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: 'var(--bg-dark)', zIndex: 10 }}>
          <button onClick={handleBackToSite} style={backBtn}>
            ← Back to site
          </button>
          {showProgress && isQ && (
            <span style={{ fontSize: '0.7rem', color: 'var(--ink-2)', letterSpacing: '0.06em' }}>
              {step} <span style={{ color: 'var(--ink-3)' }}>/ {TOTAL}</span>
            </span>
          )}
        </header>
        {showProgress && isQ && (
          <div style={{ height: 2, background: 'rgba(243,230,218,0.06)' }}>
            <div style={{ height: '100%', background: 'var(--accent)', width: `${((step - 1) / TOTAL) * 100}%`, transition: 'width 0.45s cubic-bezier(0.16,1,0.3,1)' }} />
          </div>
        )}
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem 6rem' }}>
          {children}
        </main>
        {showProgress && isQ && (
          <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.75rem', display: 'flex', alignItems: 'center', gap: 2, zIndex: 20 }}>
            <button
              onClick={canBack ? back : undefined}
              disabled={!canBack}
              title="Previous question"
              style={{
                width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: canBack ? 'var(--accent)' : 'rgba(195,118,96,0.15)',
                color: canBack ? '#fff' : 'rgba(243,230,218,0.25)',
                border: 'none', cursor: canBack ? 'pointer' : 'default',
                borderRadius: '4px 0 0 4px',
                transition: 'background 0.18s, color 0.18s',
              }}
            ><ChevronUp /></button>
            <button
              onClick={canNext ? advance : undefined}
              disabled={!canNext}
              title="Next question"
              style={{
                width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: canNext ? 'var(--accent)' : 'rgba(195,118,96,0.15)',
                color: canNext ? '#fff' : 'rgba(243,230,218,0.25)',
                border: 'none', cursor: canNext ? 'pointer' : 'default',
                borderRadius: '0 4px 4px 0',
                transition: 'background 0.18s, color 0.18s',
              }}
            ><ChevronDown /></button>
          </div>
        )}
      </div>
    );
  };

  // ── Thank you ──────────────────────────────────────────────
  if (step === 'thankyou') {
    return shell(
      <div style={{ ...wrap, textAlign: 'center', maxWidth: 520 }}>
        <span style={label}>Thank you</span>
        <h1 style={{ ...question, fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.5rem' }}>
          Got it{answers.name ? `, ${answers.name}` : ''}.
        </h1>
        <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'rgba(243,230,218,0.65)', marginBottom: '2.5rem' }}>
          I'll review what you shared and reach out to{' '}
          <span style={{ color: 'var(--accent-rose)' }}>{answers.email || 'you'}</span>{' '}
          within 48 hours. If it looks like a fit, I'll send a link to schedule a conversation.
        </p>
        <button onClick={goHome} style={{ ...backBtn, textDecoration: 'underline', fontSize: '0.8rem' }}>
          Back to the site
        </button>
      </div>
    );
  }

  // ── Admin block ────────────────────────────────────────────
  if (step === 'admin-block') {
    return shell(
      <div style={wrap}>
        <span style={label}>Quick note</span>
        <h2 style={{ ...question, marginBottom: '1.5rem' }}>That's not what I do.</h2>
        <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'rgba(243,230,218,0.65)', marginBottom: '1.25rem' }}>
          I run your whole operational backend. Team management, client communication, systems, and decision-making. If that's what you're looking for, let's talk.
        </p>
        <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'rgba(243,230,218,0.65)', marginBottom: '2.5rem' }}>
          If you need a VA or executive assistant, I can recommend a few resources.
        </p>
        <div>
          <button onClick={back} style={backBtn}>← Go back</button>
        </div>
      </div>
    );
  }

  // ── Qualifier ──────────────────────────────────────────────
  if (step === 'qualifier') {
    return shell(
      <div style={wrap}>
        <span style={label}>Before we begin</span>
        <h2 style={question}>What are you primarily looking for right now?</h2>
        <p style={hint}>Select one — this helps confirm we're a fit before you invest more time.</p>
        <div>
          {QUALIFIER_OPTS.map(opt => (
            <button key={opt}
              onMouseEnter={() => setHoveredOpt(opt)}
              onMouseLeave={() => setHoveredOpt(null)}
              onClick={() => pulse(opt, () => {
                setA('qualifier', opt);
                setTimeout(() => {
                  if (opt === ADMIN_TRIGGER) goTo('admin-block');
                  else goTo(1);
                }, 280);
              })}
              style={optCard(answers.qualifier === opt, opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Questions 1–10 ─────────────────────────────────────────
  const stepNum = step;

  const renderQ = () => {
    switch (stepNum) {
      case 1: {
        const wordCount = (answers.q1 || '').trim().split(/\s+/).filter(Boolean).length;
        return <>
          <span style={label}>Question {stepNum} of {TOTAL}</span>
          <h2 style={question}>What brought you here?</h2>
          <p style={hint}>What's actually not working right now?</p>
          <textarea ref={inputRef} rows={7}
            value={answers.q1 || ''}
            onChange={e => setA('q1', e.target.value)}
            placeholder="Be specific — the more honestly you describe what's broken, the more useful our conversation will be."
            style={{ ...fieldBase, resize: 'none' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem', marginBottom: '1.75rem' }}>
            <span style={{ fontSize: '0.72rem', color: wordCount < 3 ? 'var(--ink-3)' : 'var(--accent-rose)' }}>
              {wordCount} {wordCount === 1 ? 'word' : 'words'}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--ink-3)' }}>⌘ Return to continue</span>
          </div>
        </>;
      }
      case 2: return <>
        <span style={label}>Question {stepNum} of {TOTAL}</span>
        <h2 style={question}>What would you hand off to a fractional COO right away?</h2>
        <p style={hint}>List whatever comes to mind first — no need to edit yourself.</p>
        <textarea ref={inputRef} rows={5}
          value={answers.q2 || ''}
          onChange={e => setA('q2', e.target.value)}
          placeholder="e.g. Managing the team, running weekly standups, client escalations..."
          style={{ ...fieldBase, resize: 'none', marginBottom: '1.75rem' }}
        />
        <span style={{ fontSize: '0.72rem', color: 'var(--ink-3)', display: 'block', marginBottom: '1.75rem' }}>⌘ Return to continue</span>
      </>;
      case 3: return <>
        <span style={label}>Question {stepNum} of {TOTAL}</span>
        <h2 style={question}>When you've tried to delegate in the past, what got in the way?</h2>
        <p style={hint}></p>
        <textarea ref={inputRef} rows={5}
          value={answers.q3 || ''}
          onChange={e => setA('q3', e.target.value)}
          placeholder="e.g. No documentation, couldn't let go, the wrong hire..."
          style={{ ...fieldBase, resize: 'none', marginBottom: '1.75rem' }}
        />
      </>;
      case 4: return <>
        <span style={label}>Question {stepNum} of {TOTAL}</span>
        <h2 style={question}>How quickly do priorities typically shift in your business?</h2>
        <p style={hint}>No wrong answer.</p>
        <div>
          {PRIORITY_OPTS.map(opt => (
            <button key={opt}
              onMouseEnter={() => setHoveredOpt(opt)}
              onMouseLeave={() => setHoveredOpt(null)}
              onClick={() => pulse(opt, () => { setA('q4', opt); autoAdvance(stepNum); })}
              style={optCard(answers.q4 === opt, opt)}
            >{opt}</button>
          ))}
        </div>
      </>;
      case 5: return <>
        <span style={label}>Question {stepNum} of {TOTAL}</span>
        <h2 style={question}>Have you worked with an operator, OBM, or COO before?</h2>
        <p style={hint}></p>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {['No', 'Yes'].map(opt => (
            <button key={opt}
              onMouseEnter={() => setHoveredOpt(opt)}
              onMouseLeave={() => setHoveredOpt(null)}
              onClick={() => pulse(opt, () => setA('q5', opt))}
              style={{ ...optCard(answers.q5 === opt, opt), width: 'auto', padding: '0.75rem 2rem' }}
            >{opt}</button>
          ))}
        </div>
        {answers.q5 === 'Yes' && (
          <div style={{ marginTop: '0.25rem' }}>
            <p style={{ ...hint, marginBottom: '0.6rem' }}>What happened?</p>
            <textarea ref={inputRef} rows={4}
              value={answers.q5_detail || ''}
              onChange={e => setA('q5_detail', e.target.value)}
              placeholder="What worked, what didn't, why it ended..."
              style={{ ...fieldBase, resize: 'none', marginBottom: '1.75rem' }}
            />
          </div>
        )}
        <div style={{ height: answers.q5 === 'Yes' ? 0 : '1.75rem' }} />
      </>;
      case 6: return <>
        <span style={label}>Question {stepNum} of {TOTAL}</span>
        <h2 style={question}>What's your timeline?</h2>
        <p style={hint}></p>
        <div>
          {TIMELINE_OPTS.map(opt => (
            <button key={opt}
              onMouseEnter={() => setHoveredOpt(opt)}
              onMouseLeave={() => setHoveredOpt(null)}
              onClick={() => pulse(opt, () => { setA('q6', opt); autoAdvance(stepNum); })}
              style={optCard(answers.q6 === opt, opt)}
            >{opt}</button>
          ))}
        </div>
      </>;
      case 7: return <>
        <span style={label}>Question {stepNum} of {TOTAL}</span>
        <h2 style={question}>How did you find me?</h2>
        <p style={hint}></p>
        <div>
          {FOUND_OPTS.map(opt => (
            <button key={opt}
              onMouseEnter={() => setHoveredOpt(opt)}
              onMouseLeave={() => setHoveredOpt(null)}
              onClick={() => pulse(opt, () => { setA('q7', opt); autoAdvance(stepNum); })}
              style={optCard(answers.q7 === opt, opt)}
            >{opt}</button>
          ))}
        </div>
      </>;
      case 8: return <>
        <span style={label}>Question {stepNum} of {TOTAL}</span>
        <h2 style={question}>What should I call you?</h2>
        <p style={hint}>First name is fine.</p>
        <input ref={inputRef} type="text"
          value={answers.name || ''}
          onChange={e => setA('name', e.target.value)}
          placeholder="Your name"
          style={{ ...fieldBase, marginBottom: '2rem' }}
        />
      </>;
      case 9: return <>
        <span style={label}>Question {stepNum} of {TOTAL}</span>
        <h2 style={question}>Company or agency name?</h2>
        <p style={hint}></p>
        <input ref={inputRef} type="text"
          value={answers.company || ''}
          onChange={e => setA('company', e.target.value)}
          placeholder="Company / Agency"
          style={{ ...fieldBase, marginBottom: '2rem' }}
        />
      </>;
      case 10: return <>
        <span style={label}>Last one</span>
        <h2 style={question}>And your email?</h2>
        <p style={hint}>I'll reach out here once I've reviewed what you shared.</p>
        <input ref={inputRef} type="email"
          value={answers.email || ''}
          onChange={e => setA('email', e.target.value)}
          placeholder="your@email.com"
          style={{ ...fieldBase, marginBottom: '2rem' }}
        />
      </>;
      default: return null;
    }
  };

  // Optional steps that show a Skip button
  const isOptional = stepNum === 3;

  return shell(
    <div style={wrap}>
      {renderQ()}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
        <button onClick={advance} disabled={!canContinue()} style={continueBtn(canContinue())}>
          {stepNum === TOTAL ? 'Submit' : 'Continue'} →
        </button>
        {isOptional && (
          <button onClick={skip} style={skipBtn}>Skip</button>
        )}
      </div>
    </div>,
    true
  );
}
