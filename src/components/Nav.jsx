import { Link } from "react-router-dom";
import logo from "../../assets/logo/Logo.svg";
import menuIcon from "../../assets/icons/Icon-Menu.svg";

export default function Nav({ onMenuClick, logoTo, onLogoClick }) {
  const logoImg = <img className="nav__logo" src={logo} alt="Logo" />;

  return (
    <nav className="nav">
      {logoTo ? (
        <Link className="nav__logo-link" to={logoTo}>
          {logoImg}
        </Link>
      ) : (
        <button
          className="nav__logo-link"
          type="button"
          onClick={onLogoClick}
          aria-label="Reiniciar animação"
        >
          {logoImg}
        </button>
      )}
      <p className="nav__title">Manual da Marca</p>
      <div className="nav__actions">
        <button
          className="nav__menu-button"
          type="button"
          aria-label="Abrir menu"
          onClick={onMenuClick}
        >
          <img className="nav__menu-icon" src={menuIcon} alt="" />
        </button>
      </div>
    </nav>
  );
}
