import { useState, useEffect } from 'react';

export function useCounter(target, active, duration = 2200) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      const e = 1 - (1 - p) ** 3;
      setVal(Math.round(e * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return val;
}
