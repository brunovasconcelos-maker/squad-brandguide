import { useState } from "react";
import Lightbox from "./Lightbox";
import downloadIcon from "../../assets/icons/download.svg";
import checkIcon from "../../assets/icons/Check.svg";
import { useCart } from "../context/CartContext";

export default function ImageGrid({ images, aspect = "16:9", tagsVariant = "full", pageSlug }) {
  const [openImage, setOpenImage] = useState(null);
  const { items: cartItems, toggleItem } = useCart();
  const isSquare = aspect === "1:1";

  const gridClassName = isSquare ? "image-grid image-grid--square" : "image-grid";
  const baseCellClassName = isSquare ? "image-grid__cell image-grid__cell--square" : "image-grid__cell";

  return (
    <div className={gridClassName}>
      {images.map((image) => {
        const cartId = `${pageSlug}:${image.filename}`;
        const inCart = cartItems.has(cartId);
        return (
          <div
            key={image.filename}
            className={baseCellClassName}
            role="button"
            tabIndex={0}
            onClick={() => setOpenImage(image)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setOpenImage(image);
              }
            }}
          >
            <img src={image.src} alt="" loading="lazy" />
            <div className="image-grid__cell-overlay" />
            <p className="image-grid__cell-title">{image.title}</p>
            <button
              type="button"
              className={`image-grid__cell-cart-toggle${inCart ? " image-grid__cell-cart-toggle--added" : ""}`}
              aria-label={inCart ? `Remover ${image.title} do carrinho` : `Adicionar ${image.title} ao carrinho`}
              aria-pressed={inCart}
              onClick={(event) => {
                event.stopPropagation();
                toggleItem({
                  id: cartId,
                  filename: image.filename,
                  title: image.title,
                  src: image.src,
                  extension: image.extension,
                  pageSlug,
                });
              }}
            >
              {inCart ? (
                <img className="image-grid__cell-cart-toggle-icon" src={checkIcon} alt="" />
              ) : (
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4.5v11M4.5 10h11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </button>
            <a
              className="image-grid__cell-download"
              href={image.src}
              download={`${image.filename}.${image.extension}`}
              aria-label={`Baixar ${image.title}`}
              onClick={(event) => event.stopPropagation()}
            >
              <span
                className="image-grid__cell-download-icon"
                style={{ maskImage: `url(${downloadIcon})`, WebkitMaskImage: `url(${downloadIcon})` }}
              />
            </a>
          </div>
        );
      })}

      {openImage && (
        <Lightbox
          image={openImage}
          images={images}
          onClose={() => setOpenImage(null)}
          onNavigate={setOpenImage}
          tagsVariant={tagsVariant}
        />
      )}
    </div>
  );
}
