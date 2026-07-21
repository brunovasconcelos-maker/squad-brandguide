import { Link } from "react-router-dom";
import minusIcon from "../../assets/icons/Minus.svg";
import { pages } from "../pageConfig";

export default function HomeMenuOverlay({ onClose }) {
  return (
    <div className="home-menu-overlay">
      <button
        className="home-menu-overlay__close"
        type="button"
        aria-label="Fechar menu"
        onClick={onClose}
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
  );
}
