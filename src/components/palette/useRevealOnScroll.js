import { useEffect, useState } from "react";

// Marks a row "visible" the first time it enters the viewport — already
// in view at mount (initial load) fires almost immediately; below the fold
// waits for the user to actually scroll it into view. Fires once, then
// disconnects, so scrolling back past it doesn't replay the reveal.
export function useRevealOnScroll(ref, { skip = false } = {}) {
  const [visible, setVisible] = useState(skip);

  useEffect(() => {
    if (skip) {
      setVisible(true);
      return undefined;
    }

    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, skip]);

  return visible;
}
