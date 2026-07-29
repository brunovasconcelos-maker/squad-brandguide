import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../context/CartContext";
import { downloadImagesAsZip } from "../utils/downloadZip";
import downloadIcon from "../../assets/icons/download.svg";
import xIcon from "../../assets/icons/X.svg";

// Figma shows five rows before the "Ver tudo" affordance, so the collapsed
// list is capped there and the rest stay hidden until expanded.
const COLLAPSED_LIMIT = 5;

function maskStyle(icon) {
  return { maskImage: `url(${icon})`, WebkitMaskImage: `url(${icon})` };
}

// Floating panel anchored under the nav cart button, following the same
// fixed-position-via-getBoundingClientRect + portal + click-outside pattern
// as Dropdown.jsx.
export default function CartPanel({ triggerRef, onClose }) {
  const { items, removeItem, clear } = useCart();
  const [position, setPosition] = useState(null);
  const [zipping, setZipping] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const panelRef = useRef(null);

  const cartItems = Array.from(items.values());
  const hasOverflow = cartItems.length > COLLAPSED_LIMIT;
  const visibleItems = expanded ? cartItems : cartItems.slice(0, COLLAPSED_LIMIT);

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

  // Dropping back under the limit (via per-item removal or "Limpar tudo")
  // leaves no way to collapse again, so reset alongside the item count.
  useEffect(() => {
    if (!hasOverflow) setExpanded(false);
  }, [hasOverflow]);

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
      {cartItems.length === 0 ? (
        <p className="cart-panel__empty">Nenhum item adicionado ainda.</p>
      ) : (
        <>
          <ul className={`cart-panel__list${expanded ? " cart-panel__list--expanded" : ""}`}>
            {visibleItems.map((item) => (
              <li className="cart-panel__row" key={item.id}>
                <div className="cart-panel__item">
                  {/* Logo-page assets are wordmarks, so they're fitted whole
                      rather than cropped to fill like the photo/art grids. */}
                  <img
                    className={`cart-panel__thumb${item.pageSlug === "logo" ? " cart-panel__thumb--contain" : ""}`}
                    src={item.src}
                    alt=""
                  />
                  <div className="cart-panel__info">
                    <p className="cart-panel__item-title">{item.title}</p>
                    <p className="cart-panel__item-format">{item.extension.toUpperCase()}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="cart-panel__remove"
                  aria-label={`Remover ${item.title} do carrinho`}
                  onClick={() => removeItem(item.id)}
                >
                  <span className="cart-panel__remove-icon" style={maskStyle(xIcon)} />
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-panel__actions">
            {hasOverflow ? (
              <button
                type="button"
                className="cart-panel__see-all"
                onClick={() => setExpanded((prev) => !prev)}
              >
                {expanded ? "Ver menos" : `Ver tudo (${cartItems.length})`}
              </button>
            ) : (
              <span />
            )}
            <button type="button" className="cart-panel__clear-all" onClick={clear}>
              Limpar tudo
            </button>
          </div>

          <button
            type="button"
            className="cart-panel__download-all"
            onClick={handleDownloadAll}
            disabled={zipping}
          >
            <span className="cart-panel__download-all-icon" style={maskStyle(downloadIcon)} />
            {zipping ? "Baixando..." : "Download de todos"}
          </button>
        </>
      )}
    </div>,
    document.body
  );
}
