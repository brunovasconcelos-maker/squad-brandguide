import { useEffect, useState } from "react";

// Lets components skip JS-driven animation delays (e.g. deferring an
// unmount to let an exit transition play) when the user has asked for
// reduced motion — the CSS handles making the motion itself instant, but
// without this the close action would still visually hang for the
// no-longer-animating duration, which is its own latency regression.
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event) => setReduced(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}
