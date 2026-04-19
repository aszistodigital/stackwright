import { useState, useEffect, useRef } from 'react';
import { CloseIcon, SendIcon } from './Icons';
import { GROQ_API_KEY, SYSTEM_PROMPT } from '../constants/groq';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "I'm StackBot, Trixie's AI assistant. Ask me anything about her services, how she works, or whether this might be the right fit for your agency.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open && inputRef.current) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  const handleOpen = () => {
    setOpen(v => !v);
    setShowGreeting(false);
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages, userMsg],
          temperature: 0.65,
          max_tokens: 600,
        }),
      });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong on my end. Try refreshing and asking again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {/* Chat panel */}
      <div style={{
        position: 'fixed', bottom: '5.5rem', right: '1.5rem',
        width: 'min(380px, calc(100vw - 2rem))', height: '520px',
        background: 'var(--bg)', border: '1px solid var(--border)',
        boxShadow: '0 20px 60px -10px rgba(28,13,8,0.18)',
        display: 'flex', flexDirection: 'column', zIndex: 200,
        transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.97)',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'transform 0.32s cubic-bezier(0.16,1,0.3,1), opacity 0.28s ease',
        transformOrigin: 'bottom right',
      }}>
        {/* Header */}
        <div style={{ padding: '1.1rem 1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-warm)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid var(--accent-rose)' }}>
              <img src="/trixie.png" alt="Trixie" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 15%' }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>StackBot</div>
              <div style={{ fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.08em', color: 'var(--ink-3)', marginTop: '0.15rem' }}>Trixie's AI assistant</div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--ink-3)', padding: 4, display: 'flex', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-3)'}
            aria-label="Close chat">
            <CloseIcon />
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '85%', padding: '0.7rem 0.95rem',
                background: msg.role === 'user' ? 'var(--accent)' : 'var(--bg-warm)',
                color: msg.role === 'user' ? '#fff' : 'var(--ink)',
                border: msg.role === 'user' ? 'none' : '1px solid var(--border)',
                fontSize: '0.85rem', lineHeight: 1.65,
                whiteSpace: 'pre-wrap', wordBreak: 'break-word',
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ padding: '0.7rem 1rem', background: 'var(--bg-warm)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                {[0, 1, 2].map(j => (
                  <div key={j} style={{ width: 6, height: 6, background: 'var(--ink-3)', borderRadius: '50%', animation: `dot-pulse 1.2s ease-in-out ${j * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '0.85rem 1rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.6rem', alignItems: 'flex-end', flexShrink: 0, background: 'var(--bg)' }}>
          <textarea
            ref={inputRef} value={input}
            onChange={e => setInput(e.target.value)} onKeyDown={onKeyDown}
            placeholder="Ask anything..." rows={1}
            style={{ flex: 1, padding: '0.6rem 0.75rem', border: '1px solid var(--border)', background: 'var(--bg-warm)', color: 'var(--ink)', fontSize: '0.85rem', fontFamily: 'Outfit, sans-serif', lineHeight: 1.5, resize: 'none', outline: 'none', transition: 'border-color 0.2s', maxHeight: 100, overflow: 'auto' }}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
          <button onClick={send} disabled={!input.trim() || loading} style={{
            background: input.trim() && !loading ? 'var(--accent)' : 'var(--border)',
            color: input.trim() && !loading ? '#fff' : 'var(--ink-3)',
            border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'default',
            padding: '0.6rem 0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s, color 0.2s, transform 0.1s',
            flexShrink: 0, alignSelf: 'stretch',
          }}
          onMouseDown={e => { if (input.trim() && !loading) e.currentTarget.style.transform = 'scale(0.95)'; }}
          onMouseUp={e => e.currentTarget.style.transform = 'none'}
          aria-label="Send message">
            <SendIcon />
          </button>
        </div>
      </div>

      {/* Greeting popup */}
      {showGreeting && !open && (
        <div style={{
          position: 'fixed', bottom: '5.5rem', right: '1.5rem',
          width: 'min(300px, calc(100vw - 2rem))',
          background: '#fff', border: '1px solid var(--border)',
          boxShadow: '0 12px 40px -8px rgba(28,13,8,0.22)',
          zIndex: 199, padding: '1.1rem 1rem 1rem',
          display: 'flex', flexDirection: 'column', gap: '0.6rem',
          animation: 'greet-in 0.38s cubic-bezier(0.16,1,0.3,1) both',
        }}>
          <div style={{ position: 'absolute', top: -22, right: 18, width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', border: '2.5px solid #fff', boxShadow: '0 2px 10px rgba(139,58,27,0.25)' }}>
            <img src="/trixie.png" alt="Trixie" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 15%' }} />
          </div>
          <button onClick={() => setShowGreeting(false)} style={{ position: 'absolute', top: 8, right: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--ink-3)', padding: 2, display: 'flex', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-3)'}
            aria-label="Dismiss">
            <CloseIcon />
          </button>
          <div style={{ paddingRight: '1rem', fontFamily: "'Cormorant Garamond', serif", fontSize: '0.88rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3, marginTop: '0.5rem' }}>Hi, I'm StackBot.</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.6, fontFamily: 'Outfit, sans-serif' }}>
            Trixie's AI assistant. Ask me about her services, how she works, or whether this might be the right fit for your agency.
          </div>
          <button onClick={handleOpen} style={{ marginTop: '0.2rem', padding: '0.5rem 0.85rem', background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.04em', fontFamily: 'Outfit, sans-serif', alignSelf: 'flex-start', transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            Ask away
          </button>
        </div>
      )}

      {/* Floating avatar button */}
      <button onClick={handleOpen} style={{
        position: 'fixed', bottom: '1.5rem', right: '1.5rem',
        width: 56, height: 56, background: 'transparent',
        border: '2.5px solid var(--accent)', borderRadius: '50%',
        padding: 0, cursor: 'pointer', overflow: 'hidden',
        boxShadow: '0 8px 24px -4px rgba(139,58,27,0.4)',
        zIndex: 200, transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)'; e.currentTarget.style.boxShadow = '0 12px 32px -4px rgba(139,58,27,0.5)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(139,58,27,0.4)'; }}
      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.96)'}
      onMouseUp={e => e.currentTarget.style.transform = 'scale(1.06)'}
      aria-label="Open chat with StackBot">
        {open ? (
          <div style={{ width: '100%', height: '100%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <CloseIcon />
          </div>
        ) : (
          <img src="/trixie.png" alt="Trixie" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 15%' }} />
        )}
      </button>
    </>
  );
}
