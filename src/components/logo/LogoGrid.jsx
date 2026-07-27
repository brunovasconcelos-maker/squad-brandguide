import { useRef } from "react";
import { usePrefersReducedMotion } from "../../utils/useReducedMotion";
import { useRevealOnScroll } from "./useRevealOnScroll";

const STAGGER_STEP = 25;

export default function LogoGrid({ variant, logoBlack, logoWhite, gradientSrc, photoSrc, photoAlt }) {
  const logoClass = `logo-grid__logo logo-grid__logo--${variant}`;
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const visible = useRevealOnScroll(ref, { skip: prefersReducedMotion });
  const revealClass = visible ? "reveal--visible" : "reveal";
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
