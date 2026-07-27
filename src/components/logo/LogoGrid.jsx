import { useRef } from "react";
import { usePrefersReducedMotion } from "../../utils/useReducedMotion";
import { useRevealOnScroll } from "./useRevealOnScroll";

// 4 cards (2x2), between the color palette page's 3-card (~0.2s/row) and
// 6-card (~0.3s/row) reference groups in size, so its row entrance is
// tuned proportionally in between: a 2-item row's entrance (stagger +
// each card's own 220ms transition) takes ~0.25s end to end.
const STAGGER_STEP = 30;

export default function LogoGrid({ variant, logoBlack, logoWhite, gradientSrc, photoSrc, photoAlt }) {
  const logoClass = `logo-grid__logo logo-grid__logo--${variant}`;
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const visible = useRevealOnScroll(ref, { skip: prefersReducedMotion });
  const revealClass = `color-frame-reveal${visible ? " color-frame-reveal--visible" : ""}`;
  const delay = (index) => ({ transitionDelay: `${index * STAGGER_STEP}ms` });

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
