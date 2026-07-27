import { useRef } from "react";
import ContrastBadge from "./ContrastBadge";
import CopyableColor from "./CopyableColor";
import { characters, getPrimarySwatch } from "../../data/colorPalette";
import { usePrefersReducedMotion } from "../../utils/useReducedMotion";
import { useRevealOnScroll } from "./useRevealOnScroll";

const ORDER = ["Maky", "Waz", "Fin", "Pipo", "Juri", "Opy"];
const ROW_SIZE = 3;
// Spaced so a 3-card row's entrance (stagger + each card's own 220ms
// transition) takes ~1s end to end.
const STAGGER_STEP = 390;

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function PrimaryColorsRow() {
  const ordered = ORDER.map((name) => characters.find((c) => c.name === name));
  const rows = chunk(ordered, ROW_SIZE);
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef(null);
  // Observed as a single unit (not per row) so the stagger index is a flat
  // count across every card — row 1 finishes (left to right) before row 2
  // starts, instead of each row restarting its own 0-2 index and animating
  // in sync with the other row's matching column.
  const visible = useRevealOnScroll(ref, { skip: prefersReducedMotion });

  return (
    <div className="primary-colors" ref={ref}>
      {rows.map((row, rowIndex) => (
        <div className="primary-colors__row" key={rowIndex}>
          {row.map((character, colIndex) => {
            const primary = getPrimarySwatch(character);
            const flatIndex = rowIndex * ROW_SIZE + colIndex;
            return (
              <CopyableColor
                key={character.name}
                hex={primary.hex}
                className={`primary-color-card color-frame-reveal${visible ? " color-frame-reveal--visible" : ""}`}
                style={{ backgroundColor: primary.hex, transitionDelay: `${flatIndex * STAGGER_STEP}ms` }}
              >
                <div className="primary-color-card__badges">
                  {primary.badges.map((badge) => (
                    <ContrastBadge key={badge.color} color={badge.color} grade={badge.grade} />
                  ))}
                </div>
                <div className="primary-color-card__info">
                  <p className="primary-color-card__name">
                    {character.name}: {character.primaryStep}
                  </p>
                  <div className="primary-color-card__values">
                    <p>{primary.hex}</p>
                    <p>{character.primaryRgb}</p>
                    <p>{character.primaryHsl}</p>
                  </div>
                </div>
              </CopyableColor>
            );
          })}
        </div>
      ))}
    </div>
  );
}
