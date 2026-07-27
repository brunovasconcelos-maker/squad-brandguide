import { useRef } from "react";
import ContrastBadge from "./ContrastBadge";
import CopyableColor from "./CopyableColor";
import { characters, getPrimarySwatch } from "../../data/colorPalette";
import { usePrefersReducedMotion } from "../../utils/useReducedMotion";
import { useRevealOnScroll } from "./useRevealOnScroll";

const ORDER = ["Maky", "Waz", "Fin", "Pipo", "Juri", "Opy"];
// 3 cards per row; spaced so the row's entrance (stagger + each card's own
// 220ms transition) takes ~1s end to end.
const STAGGER_STEP = 390;

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function PrimaryColorsRowGroup({ row, skipReveal }) {
  const ref = useRef(null);
  const visible = useRevealOnScroll(ref, { skip: skipReveal });

  return (
    <div className="primary-colors__row" ref={ref}>
      {row.map((character, index) => {
        const primary = getPrimarySwatch(character);
        return (
          <CopyableColor
            key={character.name}
            hex={primary.hex}
            className={`primary-color-card${visible ? " reveal--visible" : " reveal"}`}
            style={{ backgroundColor: primary.hex, transitionDelay: `${index * STAGGER_STEP}ms` }}
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
  );
}

export default function PrimaryColorsRow() {
  const ordered = ORDER.map((name) => characters.find((c) => c.name === name));
  const rows = chunk(ordered, 3);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="primary-colors">
      {rows.map((row, i) => (
        <PrimaryColorsRowGroup key={i} row={row} skipReveal={prefersReducedMotion} />
      ))}
    </div>
  );
}
