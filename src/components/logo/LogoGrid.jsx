import { useRef } from "react";
import { usePrefersReducedMotion } from "../../utils/useReducedMotion";
import { useRevealOnScroll } from "./useRevealOnScroll";

// Roughly double the base .color-frame-reveal recipe (220ms/card) so the
// motion reads clearly instead of feeling instant — a per-card duration and
// stagger step overridden inline (the shared class stays untouched, so
// Paleta de Cores' own pacing is unaffected). 4 cards (2x2): a 2-item row's
// entrance takes ~0.5s end to end.
const ITEM_DURATION = 440;
const STAGGER_STEP = 60;

export default function LogoGrid({ variant, logoBlack, logoWhite, gradientSrc, photoSrc, photoAlt }) {
  const logoClass = `logo-grid__logo logo-grid__logo--${variant}`;
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const visible = useRevealOnScroll(ref, { skip: prefersReducedMotion });
  const revealClass = `color-frame-reveal${visible ? " color-frame-reveal--visible" : ""}`;
  const delay = (index) => ({
    transitionDuration: `${ITEM_DURATION}ms`,
    transitionDelay: `${index * STAGGER_STEP}ms`,
  });

  return (
    <div className="logo-grid" ref={ref}>
      <div className={`logo-grid__card logo-grid__card--white ${revealClass}`} style={delay(0)}>
        <img className={logoClass} src={logoBlack} alt="Logo" />
      </div>
      <div className={`logo-grid__card logo-grid__card--black ${revealClass}`} style={delay(1)}>
        <img className={logoClass} src={logoWhite} alt="Logo" />
      </div>
      <div className={`logo-grid__card logo-grid__card--gradient ${revealClass}`} style={delay(2)}>
        <img className="logo-grid__card-bg" src={gradientSrc} alt="" />
        <img className={logoClass} src={logoBlack} alt="Logo" />
      </div>
      <div className={`logo-grid__card logo-grid__card--photo ${revealClass}`} style={delay(3)}>
        <img className="logo-grid__card-bg" src={photoSrc} alt={photoAlt} />
        <div className="logo-grid__card-overlay" />
        <img className={logoClass} src={logoWhite} alt="Logo" />
      </div>
    </div>
  );
}
