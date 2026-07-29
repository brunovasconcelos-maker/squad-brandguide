import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/Logo.svg";
import menuIcon from "../../assets/icons/Icon-Menu.svg";
import cartIconOutline from "../../assets/icons/SquaresFour.svg";
import cartIconFill from "../../assets/icons/SquaresFour-1.svg";
import CartPanel from "./CartPanel";
import { useCart } from "../context/CartContext";

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
          <span
            className="nav__cart-icon"
            style={{
              maskImage: `url(${cartOpen ? cartIconFill : cartIconOutline})`,
              WebkitMaskImage: `url(${cartOpen ? cartIconFill : cartIconOutline})`,
            }}
          />
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
