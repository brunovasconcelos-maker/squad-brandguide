import { useRef } from "react";
import logoBlack from "../../../assets/logo/logo-black.svg";
import usoIncorretoImg from "../../../assets/images/uso-incorreto.png";
import FailBadge from "./FailBadge";
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

export default function UsosIncorretos() {
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
    <>
      <div className="text-section">
        <p className="text-section__heading">Usos incorretos</p>
        <div className="text-section__body">
          <p>
            Não altere a logo. Ela foi desenhada como um conjunto fechado e
            qualquer modificação enfraquece o reconhecimento da marca. Não
            aplique a logo em versão outline, apenas com contorno e sem
            preenchimento. Não incline nem rotacione a logo: ela deve
            permanecer sempre alinhada ao eixo horizontal. Não desalinhe o
            ".com" em relação ao "squad", nem altere seu tamanho, posição ou
            espaçamento. E nunca use "squad" isolado, sem o ".com": o domínio
            faz parte da marca e os dois elementos são inseparáveis.
          </p>
        </div>
      </div>
      <div className="logo-grid logo-grid--incorrect" ref={ref}>
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
          <defs>
            <filter id="logo-outline-filter">
              <feMorphology in="SourceAlpha" operator="dilate" radius="1.4" result="dilated" />
              <feComposite in="dilated" in2="SourceAlpha" operator="out" result="ring" />
              <feFlood floodColor="#000000" result="black" />
              <feComposite in="black" in2="ring" operator="in" />
            </filter>
          </defs>
        </svg>
        <div className={`logo-grid__card logo-grid__card--white ${revealClass}`} style={delay(0)}>
          <FailBadge />
          <img
            className="logo-grid__logo logo-grid__logo--primary usos-incorretos__logo--outline"
            src={logoBlack}
            alt="Logo em versão outline (uso incorreto)"
          />
        </div>
        <div className={`logo-grid__card logo-grid__card--white ${revealClass}`} style={delay(1)}>
          <FailBadge />
          <img
            className="logo-grid__logo logo-grid__logo--primary usos-incorretos__logo--rotated"
            src={logoBlack}
            alt="Logo rotacionada (uso incorreto)"
          />
        </div>
        <div className={`logo-grid__card logo-grid__card--white ${revealClass}`} style={delay(2)}>
          <FailBadge />
          <img
            className="logo-grid__card-bg"
            src={usoIncorretoImg}
            alt="Logo com o .com desalinhado em relação ao squad (uso incorreto)"
          />
        </div>
        <div className={`logo-grid__card logo-grid__card--white ${revealClass}`} style={delay(3)}>
          <FailBadge />
          <div className="usos-incorretos__crop">
            <img
              className="usos-incorretos__crop-logo"
              src={logoBlack}
              alt="squad sem o .com (uso incorreto)"
            />
          </div>
        </div>
      </div>
    </>
  );
}
