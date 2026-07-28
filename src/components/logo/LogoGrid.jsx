import { useRef } from "react";
import { usePrefersReducedMotion } from "../../utils/useReducedMotion";
import { useRevealOnScroll } from "./useRevealOnScroll";

// These frames are larger than the color palette page's, so the base
// .color-frame-reveal recipe (32px offset, 220ms) reads too subtly here —
// overridden inline (the shared class stays untouched, so Paleta de Cores'
// own pacing/offset is unaffected): a taller starting offset for clearly
// visible downward movement, and duration extended by another 0.5s on top
// of the already-doubled 440ms. 4 cards (2x2): a 2-item row's entrance
// takes ~1s end to end.
const OFFSET_PX = 60;
const ITEM_DURATION = 940;
const STAGGER_STEP = 60;

export default function LogoGrid({ variant, logoBlack, logoWhite, gradientSrc, photoSrc, photoAlt }) {
  const logoClass = `logo-grid__logo logo-grid__logo--${variant}`;
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const visible = useRevealOnScroll(ref, { skip: prefersReducedMotion });
  const revealClass = `color-frame-reveal${visible ? " color-frame-reveal--visible" : ""}`;
  const delay = (index) => ({
    transform: `translateY(${visible ? 0 : -OFFSET_PX}px)`,
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
