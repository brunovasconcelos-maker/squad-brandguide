import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import minusIcon from "../../assets/icons/Minus.svg";
import { pages } from "../pageConfig";
import { usePrefersReducedMotion } from "../utils/useReducedMotion";

const EXIT_DURATION = 240;
const ITEM_BASE_DELAY = 90;
const ITEM_STAGGER_STEP = 30;
const ITEM_TRANSITION_DURATION = 200;

export default function MenuOverlay({ onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [hasEntered, setHasEntered] = useState(prefersReducedMotion);

  function requestClose() {
    if (isClosing) return;
    if (prefersReducedMotion) {
      onClose();
      return;
    }
    setIsClosing(true);
    window.setTimeout(onClose, EXIT_DURATION);
  }

  // Once the staggered entrance finishes, drop each item's per-index delay
  // so a later hover isn't held back by leftover entrance timing.
  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const totalEntranceMs =
      ITEM_BASE_DELAY + (pages.length - 1) * ITEM_STAGGER_STEP + ITEM_TRANSITION_DURATION;
    const timer = window.setTimeout(() => setHasEntered(true), totalEntranceMs);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <>
      <div
        className={`menu-overlay-backdrop${isClosing ? " is-closing" : ""}`}
        onClick={requestClose}
      />
      <div className={`menu-overlay${isClosing ? " is-closing" : ""}`}>
        <Link className="menu-overlay__exit" to="/" onClick={onClose}>
          Sair do Manual
        </Link>
        <button
          className="menu-overlay__close"
          type="button"
          aria-label="Fechar menu"
          onClick={requestClose}
        >
          <img src={minusIcon} alt="" />
        </button>
        <nav className="menu-overlay__list">
          {pages.map((page, index) => (
            <Link
              key={page.slug}
              className="menu-overlay__item"
              to={page.path}
              onClick={onClose}
              style={{
                transitionDelay: hasEntered ? "0ms" : `${ITEM_BASE_DELAY + index * ITEM_STAGGER_STEP}ms`,
              }}
            >
              {page.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
