import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/Logo.svg";
import menuIcon from "../../assets/icons/Icon-Menu.svg";
import CartPanel from "./CartPanel";
import { useCart } from "../context/CartContext";

function CartIcon() {
  return (
    <svg className="nav__cart-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="4.5" height="4.5" rx="1" fill="white" />
      <rect x="9.75" y="4" width="4.5" height="4.5" rx="1" fill="white" />
      <rect x="15.5" y="4" width="4.5" height="4.5" rx="1" fill="white" />
      <rect x="4" y="9.75" width="4.5" height="4.5" rx="1" fill="white" />
      <rect x="9.75" y="9.75" width="4.5" height="4.5" rx="1" fill="white" />
      <rect x="15.5" y="9.75" width="4.5" height="4.5" rx="1" fill="white" />
      <rect x="4" y="15.5" width="4.5" height="4.5" rx="1" fill="white" />
      <rect x="9.75" y="15.5" width="4.5" height="4.5" rx="1" fill="white" />
      <rect x="15.5" y="15.5" width="4.5" height="4.5" rx="1" fill="white" />
    </svg>
  );
}

export default function Nav({ onMenuClick, logoTo, onLogoClick }) {
  const logoImg = <img className="nav__logo" src={logo} alt="Logo" />;
  const { items } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const cartButtonRef = useRef(null);

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
          className="nav__cart-button"
          type="button"
          aria-label="Abrir carrinho de downloads"
          aria-pressed={cartOpen}
          onClick={() => setCartOpen((prev) => !prev)}
          ref={cartButtonRef}
        >
          <CartIcon />
          {items.size > 0 && <span className="nav__cart-badge">{items.size}</span>}
        </button>
        <button
          className="nav__menu-button"
          type="button"
          aria-label="Abrir menu"
          onClick={onMenuClick}
        >
          <img className="nav__menu-icon" src={menuIcon} alt="" />
        </button>
      </div>

      {cartOpen && <CartPanel triggerRef={cartButtonRef} onClose={() => setCartOpen(false)} />}
    </nav>
  );
}
