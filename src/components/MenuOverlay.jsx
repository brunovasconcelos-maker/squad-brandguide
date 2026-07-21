import { Link } from "react-router-dom";
import minusIcon from "../../assets/icons/Minus.svg";
import { pages } from "../pageConfig";

export default function MenuOverlay({ onClose }) {
  return (
    <div className="menu-overlay">
      <Link className="menu-overlay__exit" to="/" onClick={onClose}>
        Sair do Manual
      </Link>
      <button
        className="menu-overlay__close"
        type="button"
        aria-label="Fechar menu"
        onClick={onClose}
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
