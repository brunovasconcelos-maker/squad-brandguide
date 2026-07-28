import { useEffect, useState } from "react";

// Marks a group "visible" once it's fully (100%) within the viewport —
// already satisfying that at mount (initial load) fires almost
// immediately; below the fold waits for the user to scroll it entirely
// into view. Fires once, then disconnects, so scrolling back past it
// doesn't replay the reveal.
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
          // For groups already in view at mount, the browser hasn't
          // painted the pre-reveal (opacity 0) state yet — flipping to
          // visible in the same tick leaves nothing for the CSS
          // transition to animate from, so it just appears instantly.
          // Waiting two frames guarantees a paint of the hidden state
          // happens first.
          raf1 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(() => setVisible(true));
          });
        }
      },
      { threshold: 1.0 }
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
