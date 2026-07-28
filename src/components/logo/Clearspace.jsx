import { useRef } from "react";
import clearspaceImg from "../../../assets/images/clearspace.png";
import { usePrefersReducedMotion } from "../../utils/useReducedMotion";
import { useRevealOnScroll } from "./useRevealOnScroll";

// Matches LogoGrid/UsosIncorretos: a taller starting offset (this frame is
// larger than the color palette page's) and duration extended by another
// 0.5s on top of the already-doubled 440ms, so this single frame gets one
// clear, slower movement (no stagger needed — there's only one frame).
const OFFSET_PX = 60;
const ITEM_DURATION = 940;

export default function Clearspace() {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const visible = useRevealOnScroll(ref, { skip: prefersReducedMotion });

  return (
    <>
      <div className="text-section">
        <p className="text-section__heading">Clearspace</p>
        <div className="text-section__body">
          <p>
            Clearspace é a área ao redor da logo que deve permanecer sempre
            livre, garantindo que ela seja distinguível de qualquer elemento
            próximo. Nossa medida de referência é a largura da letra "u" de
            "squad": essa distância deve ser respeitada nos quatro lados, e
            nenhum texto, imagem ou grafismo pode invadir esse espaço.
          </p>
        </div>
      </div>
      <div
        className={`clearspace-panel color-frame-reveal${visible ? " color-frame-reveal--visible" : ""}`}
        style={{
          transform: `translateY(${visible ? 0 : -OFFSET_PX}px)`,
          transitionDuration: `${ITEM_DURATION}ms`,
        }}
        ref={ref}
      >
        <img
          className="clearspace-panel__image"
          src={clearspaceImg}
          alt="Diagrama de clearspace da logo"
        />
      </div>
    </>
  );
}
