import { useState } from "react";
import logoBlack from "../../../assets/logo/logo-black.svg";
import logoWhite from "../../../assets/logo/logo-white.svg";
import { getCharacter, getPrimarySwatch } from "../../data/colorPalette";

function characterHex(name) {
  return getPrimarySwatch(getCharacter(name)).hex;
}

const SWATCHES = [
  { key: "white", hex: "#FFFFFF" },
  { key: "black", hex: "#000000" },
  { key: "waz", hex: characterHex("Waz") },
  { key: "maky", hex: characterHex("Maky") },
  { key: "fin", hex: characterHex("Fin") },
  { key: "pipo", hex: characterHex("Pipo") },
  { key: "juri", hex: characterHex("Juri") },
  { key: "opy", hex: characterHex("Opy") },
];

export default function LogoShowcase() {
  const [selected, setSelected] = useState("white");
  const backgroundColor = SWATCHES.find((s) => s.key === selected).hex;
  const logoSrc = selected === "black" ? logoWhite : logoBlack;

  return (
    <div className="logo-showcase" style={{ backgroundColor }}>
      <img className="logo-showcase__logo" src={logoSrc} alt="Logo" />

      <div className="logo-swatches">
        <p className="logo-swatches__label">Variações da Logo</p>
        <div className="logo-swatches__grid">
          {SWATCHES.map((swatch) => (
            <button
              key={swatch.key}
              type="button"
              className={
                "logo-swatch" +
                (swatch.key === "black" ? " logo-swatch--black" : "") +
                (selected === swatch.key ? " logo-swatch--selected" : "")
              }
              style={{ backgroundColor: swatch.hex }}
              aria-label={`Usar variação ${swatch.key}`}
              aria-pressed={selected === swatch.key}
              onClick={() => setSelected(swatch.key)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
