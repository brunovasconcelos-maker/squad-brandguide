import { useRef } from "react";
import TypeCaption from "./TypeCaption";
import { usePrefersReducedMotion } from "../../utils/useReducedMotion";
import { useRevealOnScroll } from "./useRevealOnScroll";

const WEIGHTS = [
  { label: "Extra light", weight: 200 },
  { label: "Light", weight: 300 },
  { label: "Regular", weight: 400 },
  { label: "Medium", weight: 500 },
  { label: "Semibold", weight: 600 },
  { label: "Bold", weight: 700 },
  { label: "Extrabold", weight: 800 },
];

// Same recipe as the color palette/logo pages' .color-frame-reveal (opacity
// + upward offset, animating together). 7 lines; spaced for a quick,
// readable top-to-bottom reveal once scrolled into view.
const STAGGER_STEP = 30;

export default function FontWeightShowcase() {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const visible = useRevealOnScroll(ref, { skip: prefersReducedMotion });
  const revealClass = `color-frame-reveal${visible ? " color-frame-reveal--visible" : ""}`;

  return (
    <div className="weight-showcase-block">
      <div className="weight-showcase" ref={ref}>
        {WEIGHTS.map(({ label, weight }, index) => (
          <p
            key={weight}
            className={revealClass}
            style={{ fontWeight: weight, transitionDelay: `${index * STAGGER_STEP}ms` }}
          >
            {label}
          </p>
        ))}
      </div>
      <TypeCaption label="Font Weight:">
        O peso da fonte é a espessura do traço das letras. A Fustat vai de
        Extra Light a Extrabold, e essa variação é o que cria hierarquia:
        pesos mais fortes puxam o olhar para o que importa, pesos mais leves
        acomodam informação de apoio. Use o contraste entre eles para guiar a
        leitura, sem depender de mudanças bruscas de tamanho.
      </TypeCaption>
    </div>
  );
}
