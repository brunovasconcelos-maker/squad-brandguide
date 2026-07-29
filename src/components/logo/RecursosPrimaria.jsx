import { useState } from "react";
import logoBlack from "../../../assets/logo/logo-black.svg";
import logoWhite from "../../../assets/logo/logo-white.svg";
import logo1xBlack from "../../../assets/logo/logo-1x-black.png";
import logo2xBlack from "../../../assets/logo/logo-2x-black.png";
import logo3xBlack from "../../../assets/logo/logo-3x-black.png";
import logo4xBlack from "../../../assets/logo/logo-4x-black.png";
import logo1xWhite from "../../../assets/logo/logo-1x-white.png";
import logo2xWhite from "../../../assets/logo/logo-2x-white.png";
import logo3xWhite from "../../../assets/logo/logo-3x-white.png";
import logo4xWhite from "../../../assets/logo/logo-4x-white.png";
import downloadIcon from "../../../assets/icons/download.svg";
import plusCircleIcon from "../../../assets/icons/PlusCircle.svg";
import checkCircleIcon from "../../../assets/icons/CheckCircle.svg";
import { useCart } from "../../context/CartContext";

const PNG_BLACK = [logo1xBlack, logo2xBlack, logo3xBlack, logo4xBlack];
const PNG_WHITE = [logo1xWhite, logo2xWhite, logo3xWhite, logo4xWhite];
const MIN_SIZE = 1;
const MAX_SIZE = 4;

function maskStyle(icon) {
  return { maskImage: `url(${icon})`, WebkitMaskImage: `url(${icon})` };
}

function SizeStepper({ value, onChange }) {
  return (
    <div className="recursos-row__stepper">
      <button
        type="button"
        className="recursos-row__stepper-button"
        aria-label="Diminuir tamanho"
        disabled={value <= MIN_SIZE}
        onClick={() => onChange(value - 1)}
      >
        −
      </button>
      <span className="recursos-row__stepper-value">{value}x</span>
      <button
        type="button"
        className="recursos-row__stepper-button"
        aria-label="Aumentar tamanho"
        disabled={value >= MAX_SIZE}
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  );
}

function RecursosRow({ label, item, sizeControl, inCart, onToggleCart }) {
  return (
    <div className="recursos-row recursos-row--interactive">
      <p className="recursos-row__label">{label}</p>
      {sizeControl}
      <div className="recursos-row__actions">
        <a
          className="recursos-row__icon-button"
          href={item.src}
          download={`${item.filename}.${item.extension}`}
          aria-label={`Baixar ${item.title}`}
        >
          <span className="recursos-row__icon-button-icon" style={maskStyle(downloadIcon)} />
        </a>
        <button
          type="button"
          className={`recursos-row__icon-button${inCart ? " recursos-row__icon-button--added" : ""}`}
          aria-label={inCart ? `Remover ${item.title} do carrinho` : `Adicionar ${item.title} ao carrinho`}
          aria-pressed={inCart}
          onClick={() => onToggleCart(item)}
        >
          <span
            className="recursos-row__icon-button-icon"
            style={maskStyle(inCart ? checkCircleIcon : plusCircleIcon)}
          />
        </button>
      </div>
    </div>
  );
}

export default function RecursosPrimaria() {
  const [darkSize, setDarkSize] = useState(1);
  const [lightSize, setLightSize] = useState(1);
  const { items: cartItems, toggleItem } = useCart();

  const darkSvgItem = {
    id: "logo:Logo-Dark-SVG",
    filename: "Logo-Dark-SVG",
    title: "Logo-Dark-SVG",
    src: logoBlack,
    extension: "svg",
    pageSlug: "logo",
  };
  const lightSvgItem = {
    id: "logo:Logo-Light-SVG",
    filename: "Logo-Light-SVG",
    title: "Logo-Light-SVG",
    src: logoWhite,
    extension: "svg",
    pageSlug: "logo",
  };
  const darkPngItem = {
    id: `logo:Logo-Dark-PNG-${darkSize}x`,
    filename: `Logo-Dark-PNG-${darkSize}x`,
    title: `Logo-Dark-PNG (${darkSize}x)`,
    src: PNG_BLACK[darkSize - 1],
    extension: "png",
    pageSlug: "logo",
  };
  const lightPngItem = {
    id: `logo:Logo-Light-PNG-${lightSize}x`,
    filename: `Logo-Light-PNG-${lightSize}x`,
    title: `Logo-Light-PNG (${lightSize}x)`,
    src: PNG_WHITE[lightSize - 1],
    extension: "png",
    pageSlug: "logo",
  };

  return (
    <div className="text-section">
      <p className="text-section__heading">Recursos</p>
      <RecursosRow
        label="Logo-Dark-SVG"
        item={darkSvgItem}
        inCart={cartItems.has(darkSvgItem.id)}
        onToggleCart={toggleItem}
      />
      <RecursosRow
        label="Logo-Light-SVG"
        item={lightSvgItem}
        inCart={cartItems.has(lightSvgItem.id)}
        onToggleCart={toggleItem}
      />
      <RecursosRow
        label="Logo-Dark-PNG"
        item={darkPngItem}
        sizeControl={<SizeStepper value={darkSize} onChange={setDarkSize} />}
        inCart={cartItems.has(darkPngItem.id)}
        onToggleCart={toggleItem}
      />
      <RecursosRow
        label="Logo-Light-PNG"
        item={lightPngItem}
        sizeControl={<SizeStepper value={lightSize} onChange={setLightSize} />}
        inCart={cartItems.has(lightPngItem.id)}
        onToggleCart={toggleItem}
      />
    </div>
  );
}
