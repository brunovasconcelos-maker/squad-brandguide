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

    let raf1;
    let raf2;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          // For rows already in view at mount, the browser hasn't painted
          // the pre-reveal (opacity 0) state yet — flipping to visible in
          // the same tick leaves nothing for the CSS transition to animate
          // from, so it just appears instantly. Waiting two frames
          // guarantees a paint of the hidden state happens first.
          raf1 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(() => setVisible(true));
          });
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [ref, skip]);

  return visible;
}
