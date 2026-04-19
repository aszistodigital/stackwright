export default function Footer() {
  return (
    <footer style={{
      background: '#381E17',
      padding: 'clamp(2.5rem,4vw,3.5rem) max(1.5rem,6vw)',
      borderTop: '1px solid rgba(237,209,204,0.1)',
    }}>
      <div style={{
        maxWidth: 1400, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem',
      }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#EDD1CC', lineHeight: 1 }}>
            STACKWRIGHT SOLUTIONS
          </div>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.08em', color: 'rgba(237,209,204,0.45)', marginTop: 6, lineHeight: 1.5 }}>
            Trixie Shane Maningding. Fractional COO for founder-led agencies.
          </div>
        </div>
        <div style={{ fontSize: '0.7rem', color: 'rgba(237,209,204,0.35)', letterSpacing: '0.06em' }}>
          &copy; {new Date().getFullYear()} Stackwright Solutions
        </div>
      </div>
    </footer>
  );
}
