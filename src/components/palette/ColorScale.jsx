import { useEffect, useRef, useState } from "react";
import ContrastBadge from "./ContrastBadge";
import CopyableColor from "./CopyableColor";
import { characters } from "../../data/colorPalette";
import { usePrefersReducedMotion } from "../../utils/useReducedMotion";
import { useRevealOnScroll } from "./useRevealOnScroll";

const ORDER = ["Maky", "Waz", "Fin", "Pipo", "Juri", "Opy"];
// 10 swatches per row; spaced so the row's entrance (stagger + each
// swatch's own 220ms transition) takes ~1s end to end.
const STAGGER_STEP = 87;
// Matches .color-frame-reveal's transition duration in styles.css — used to
// know when a given swatch's own entrance animation has actually finished,
// so its hover/copy-hex interaction doesn't wake up while it's still moving.
const REVEAL_DURATION = 220;

function ColorScaleRow({ character, skipReveal }) {
  const ref = useRef(null);
  const visible = useRevealOnScroll(ref, { skip: skipReveal });
  // Per-swatch gate for hover/copy-hex: each index flips true independently,
  // timed to that swatch's own delay + transition duration, instead of all
  // swatches in the row becoming interactive together the instant it's visible.
  const [settled, setSettled] = useState(() => character.scale.map(() => skipReveal));

  useEffect(() => {
    if (!visible) return undefined;
    if (skipReveal) {
      setSettled(character.scale.map(() => true));
      return undefined;
    }
    const timers = character.scale.map((_, index) =>
      setTimeout(() => {
        setSettled((prev) => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
      }, index * STAGGER_STEP + REVEAL_DURATION)
    );
    return () => timers.forEach(clearTimeout);
  }, [visible, skipReveal, character.scale]);

  return (
    <div className="color-scale-row" ref={ref}>
      <p className="color-scale-row__name">{character.name}</p>
      <div className="color-scale-row__swatches">
        {character.scale.map((swatch, index) => {
          const isPrimary = swatch.step === character.primaryStep;
          return (
            <div
              key={swatch.step}
              className={`color-swatch color-frame-reveal${visible ? " color-frame-reveal--visible" : ""}`}
              style={{ transitionDelay: `${index * STAGGER_STEP}ms` }}
            >
              <CopyableColor
                hex={swatch.hex}
                interactive={settled[index]}
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
