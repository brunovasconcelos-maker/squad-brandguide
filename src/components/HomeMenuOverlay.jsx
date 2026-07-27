import { useState } from "react";
import { Link } from "react-router-dom";
import minusIcon from "../../assets/icons/Minus.svg";
import { pages } from "../pageConfig";
import { usePrefersReducedMotion } from "../utils/useReducedMotion";

const EXIT_DURATION = 240;

export default function HomeMenuOverlay({ onClose }) {
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
    <>
      <div
        className={`home-menu-overlay-backdrop${isClosing ? " is-closing" : ""}`}
        onClick={requestClose}
      />
      <div className={`home-menu-overlay${isClosing ? " is-closing" : ""}`}>
        <button
          className="home-menu-overlay__close"
          type="button"
          aria-label="Fechar menu"
          onClick={requestClose}
        >
          <img src={minusIcon} alt="" />
        </button>
        <p className="home-menu-overlay__text">
          Esse é a Manual da Marca Squad.com, feito para auxiliar o time do
          Squad.com a trabalhar e presenvar a marca. Se você faz parte do time
          do Squad.com faça login para ter acesso ao manual.
        </p>
        <Link
          className="home-menu-overlay__cta"
          to={pages[0].path}
          onClick={onClose}
        >
          Entrar no Manual
        </Link>
      </div>
    </>
  );
}
