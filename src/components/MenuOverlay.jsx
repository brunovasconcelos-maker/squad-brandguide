import { useState } from "react";
import { Link } from "react-router-dom";
import minusIcon from "../../assets/icons/Minus.svg";
import { pages } from "../pageConfig";
import { usePrefersReducedMotion } from "../utils/useReducedMotion";

const EXIT_DURATION = 250;

export default function MenuOverlay({ onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  function requestClose() {
    if (isClosing) return;
    if (prefersReducedMotion) {
      onClose();
      return;
    }
    setIsClosing(true);
    window.setTimeout(onClose, EXIT_DURATION);
  }

  return (
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
        {pages.map((page) => (
          <Link
            key={page.slug}
            className="menu-overlay__item"
            to={page.path}
            onClick={onClose}
          >
            {page.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
