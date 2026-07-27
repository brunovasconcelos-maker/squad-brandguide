import { useRef } from "react";
import ContrastBadge from "./ContrastBadge";
import CopyableColor from "./CopyableColor";
import { characters } from "../../data/colorPalette";
import { usePrefersReducedMotion } from "../../utils/useReducedMotion";
import { useRevealOnScroll } from "./useRevealOnScroll";

const ORDER = ["Maky", "Waz", "Fin", "Pipo", "Juri", "Opy"];
const STAGGER_STEP = 25;

function ColorScaleRow({ character, skipReveal }) {
  const ref = useRef(null);
  const visible = useRevealOnScroll(ref, { skip: skipReveal });

  return (
    <div className="color-scale-row" ref={ref}>
      <p className="color-scale-row__name">{character.name}</p>
      <div className="color-scale-row__swatches">
        {character.scale.map((swatch, index) => {
          const isPrimary = swatch.step === character.primaryStep;
          return (
            <div
              key={swatch.step}
              className={`color-swatch${visible ? " reveal--visible" : " reveal"}`}
              style={{ transitionDelay: `${index * STAGGER_STEP}ms` }}
            >
              <CopyableColor
                hex={swatch.hex}
                className="color-swatch__block"
                style={{ backgroundColor: swatch.hex }}
              >
                <div className="color-swatch__badges">
                  {swatch.badges.map((badge) => (
                    <ContrastBadge key={badge.color} color={badge.color} grade={badge.grade} />
                  ))}
                </div>
              </CopyableColor>
              <div className="color-swatch__info">
                <p className="color-swatch__step">
                  {isPrimary ? `${character.name}: ${swatch.step}` : swatch.step}
                </p>
                <p className="color-swatch__hex">{swatch.hex}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ColorScale() {
  const ordered = ORDER.map((name) => characters.find((c) => c.name === name));
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="color-scale">
      {ordered.map((character) => (
        <ColorScaleRow key={character.name} character={character} skipReveal={prefersReducedMotion} />
      ))}
    </div>
  );
}
