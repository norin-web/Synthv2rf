import { useEffect, useState } from "react";

// No smooth / inertia scroll on this site: the scroll lag annoys users.
export const reduced = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Counts a number up once `run` turns true; non-numeric values render as-is. */
export function useCountUp(value: string, run: boolean, ms = 900) {
  const m = value.match(/^(\d+)(.*)$/);
  const [n, setN] = useState(() => (m && run && !reduced() ? 0 : null));
  useEffect(() => {
    if (!m || !run || reduced() || document.hidden) return setN(null);
    const to = +m[1];
    const t0 = performance.now();
    let raf = requestAnimationFrame(function tick(t) {
      const k = Math.min(1, (t - t0) / ms);
      setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
      else setN(null);
    });
    return () => cancelAnimationFrame(raf);
  }, [run]); // eslint-disable-line react-hooks/exhaustive-deps
  return n === null ? value : `${n}${m?.[2] ?? ""}`;
}
