import { useState } from "react";
import logo2Black from "../../../assets/logo/logo-2-black.svg";
import logo2White from "../../../assets/logo/logo-2-white.svg";
import logo2_1xBlack from "../../../assets/logo/logo-2-1x-black.png";
import logo2_2xBlack from "../../../assets/logo/logo-2-2x-black.png";
import logo2_3xBlack from "../../../assets/logo/logo-2-3x-black.png";
import logo2_4xBlack from "../../../assets/logo/logo-2-4x-black.png";
import logo2_1xWhite from "../../../assets/logo/logo-2-1x-white.png";
import logo2_2xWhite from "../../../assets/logo/logo-2-2x-white.png";
import logo2_3xWhite from "../../../assets/logo/logo-2-3x-white.png";
import logo2_4xWhite from "../../../assets/logo/logo-2-4x-white.png";
import { useCart } from "../../context/CartContext";
import { RecursosRow, SizeStepper } from "../RecursosRow";

const PNG_BLACK = [logo2_1xBlack, logo2_2xBlack, logo2_3xBlack, logo2_4xBlack];
const PNG_WHITE = [logo2_1xWhite, logo2_2xWhite, logo2_3xWhite, logo2_4xWhite];

export default function RecursosSecundaria() {
  const [darkSize, setDarkSize] = useState(1);
  const [lightSize, setLightSize] = useState(1);
  const { items: cartItems, toggleItem } = useCart();

  // "Logo-2-" prefix (not just "Logo-") keeps these filenames/cart ids
  // distinct from the primary section's, which shares the same "logo"
  // page slug — otherwise both sections' Dark-SVG entries would collide.
  const darkSvgItem = {
    id: "logo:Logo-2-Dark-SVG",
    filename: "Logo-2-Dark-SVG",
    title: "Logo-2-Dark-SVG",
    src: logo2Black,
    extension: "svg",
    pageSlug: "logo",
  };
  const lightSvgItem = {
    id: "logo:Logo-2-Light-SVG",
    filename: "Logo-2-Light-SVG",
    title: "Logo-2-Light-SVG",
    src: logo2White,
    extension: "svg",
    pageSlug: "logo",
  };
  const darkPngItem = {
    id: `logo:Logo-2-Dark-PNG-${darkSize}x`,
    filename: `Logo-2-Dark-PNG-${darkSize}x`,
    title: `Logo-2-Dark-PNG (${darkSize}x)`,
    src: PNG_BLACK[darkSize - 1],
    extension: "png",
    pageSlug: "logo",
  };
  const lightPngItem = {
    id: `logo:Logo-2-Light-PNG-${lightSize}x`,
    filename: `Logo-2-Light-PNG-${lightSize}x`,
    title: `Logo-2-Light-PNG (${lightSize}x)`,
    src: PNG_WHITE[lightSize - 1],
    extension: "png",
    pageSlug: "logo",
  };

  return (
    <div className="text-section">
      <p className="text-section__heading">Recursos</p>
      <RecursosRow
        label="Logo-2-Dark-SVG"
        item={darkSvgItem}
        inCart={cartItems.has(darkSvgItem.id)}
        onToggleCart={toggleItem}
      />
      <RecursosRow
        label="Logo-2-Light-SVG"
        item={lightSvgItem}
        inCart={cartItems.has(lightSvgItem.id)}
        onToggleCart={toggleItem}
      />
      <RecursosRow
        label="Logo-2-Dark-PNG"
        item={darkPngItem}
        sizeControl={<SizeStepper value={darkSize} onChange={setDarkSize} />}
        inCart={cartItems.has(darkPngItem.id)}
        onToggleCart={toggleItem}
      />
      <RecursosRow
        label="Logo-2-Light-PNG"
        item={lightPngItem}
        sizeControl={<SizeStepper value={lightSize} onChange={setLightSize} />}
        inCart={cartItems.has(lightPngItem.id)}
        onToggleCart={toggleItem}
      />
    </div>
  );
}
