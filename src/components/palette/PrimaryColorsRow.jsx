import { useEffect, useRef, useState } from "react";
import ContrastBadge from "./ContrastBadge";
import CopyableColor from "./CopyableColor";
import { characters, getPrimarySwatch } from "../../data/colorPalette";
import { usePrefersReducedMotion } from "../../utils/useReducedMotion";
import { useRevealOnScroll } from "./useRevealOnScroll";

const ORDER = ["Maky", "Waz", "Fin", "Pipo", "Juri", "Opy"];
const ROW_SIZE = 3;
// These cards are the ones visible on page load, so their entrance is
// tuned faster than the scroll-revealed color-scale rows below: spaced so
// a 3-card row's entrance (stagger + each card's own 220ms transition)
// takes ~0.3s end to end.
const STAGGER_STEP = 40;
// Matches .color-frame-reveal's transition duration in styles.css — used to
// know when a given card's own entrance animation has actually finished, so
// its hover/copy-hex interaction doesn't wake up while it's still moving in.
const REVEAL_DURATION = 220;

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
  // Per-card gate for hover/copy-hex: each index flips true independently,
  // timed to that card's own delay + transition duration, instead of all
  // cards becoming interactive together the instant the group is visible.
  const [settled, setSettled] = useState(() => ordered.map(() => prefersReducedMotion));

  useEffect(() => {
    if (!visible) return undefined;
    if (prefersReducedMotion) {
      setSettled(ordered.map(() => true));
      return undefined;
    }
    const timers = ordered.map((_, flatIndex) =>
      setTimeout(() => {
        setSettled((prev) => {
          const next = [...prev];
          next[flatIndex] = true;
          return next;
        });
      }, flatIndex * STAGGER_STEP + REVEAL_DURATION)
    );
    return () => timers.forEach(clearTimeout);
  }, [visible, prefersReducedMotion, ordered.length]);

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
                interactive={settled[flatIndex]}
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
