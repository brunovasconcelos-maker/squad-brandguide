import logo from "../../assets/logo/Logo.svg";
import menuIcon from "../../assets/icons/Icon-Menu.svg";

export default function Nav({ onMenuClick }) {
  return (
    <nav className="nav">
      <img className="nav__logo" src={logo} alt="Logo" />
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
