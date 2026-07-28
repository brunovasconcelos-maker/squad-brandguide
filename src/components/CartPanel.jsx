import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../context/CartContext";
import { downloadImagesAsZip } from "../utils/downloadZip";

// Floating panel anchored under the nav cart button, following the same
// fixed-position-via-getBoundingClientRect + portal + click-outside pattern
// as Dropdown.jsx.
export default function CartPanel({ triggerRef, onClose }) {
  const { items, removeItem } = useCart();
  const [position, setPosition] = useState(null);
  const [zipping, setZipping] = useState(false);
  const panelRef = useRef(null);

  const cartItems = Array.from(items.values());

  useEffect(() => {
    function updatePosition() {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom + 8, right: window.innerWidth - rect.right });
    }

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [triggerRef]);

  useEffect(() => {
    function handleClickOutside(event) {
      const insideTrigger = triggerRef.current && triggerRef.current.contains(event.target);
      const insidePanel = panelRef.current && panelRef.current.contains(event.target);
      if (!insideTrigger && !insidePanel) onClose();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [triggerRef, onClose]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  async function handleDownloadAll() {
    if (cartItems.length === 0) return;
    setZipping(true);
    try {
      await downloadImagesAsZip(cartItems, "carrinho.zip");
    } finally {
      setZipping(false);
    }
  }

  if (!position) return null;

  return createPortal(
    <div className="cart-panel" ref={panelRef} style={{ top: position.top, right: position.right }}>
      <p className="cart-panel__title">Carrinho</p>

      {cartItems.length === 0 ? (
        <p className="cart-panel__empty">Nenhum item adicionado ainda.</p>
      ) : (
        <>
          <ul className="cart-panel__list">
            {cartItems.map((item) => (
              <li className="cart-panel__row" key={item.id}>
                <img className="cart-panel__thumb" src={item.src} alt="" />
                <div className="cart-panel__info">
                  <p className="cart-panel__item-title">{item.title}</p>
                  <span className="lightbox-tag cart-panel__item-format">{item.extension.toUpperCase()}</span>
                </div>
                <button
                  type="button"
                  className="cart-panel__remove"
                  aria-label={`Remover ${item.title} do carrinho`}
                  onClick={() => removeItem(item.id)}
                >
                  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L4 12M4 4l8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="cart-panel__download-all"
            onClick={handleDownloadAll}
            disabled={zipping}
          >
            {zipping ? "Baixando..." : "Baixar tudo"}
          </button>
        </>
      )}
    </div>,
    document.body
  );
}
