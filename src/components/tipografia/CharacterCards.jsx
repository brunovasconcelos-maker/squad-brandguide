import { useState } from "react";
import { getCharacter, getPrimarySwatch } from "../../data/colorPalette";

const WEIGHTS = [200, 300, 400, 500, 600, 700, 800];
const LINE_HEIGHTS = [0.8, 0.85, 0.9, 0.95, 1, 1.05, 1.1, 1.15, 1.2];
const LETTER_SPACINGS = [-4, -3, -2, -1, 0];

function darkestHex(name) {
  return getCharacter(name).scale.find((s) => s.step === 10).hex;
}

function primaryHex(name) {
  return getPrimarySwatch(getCharacter(name)).hex;
}

function CardSlider({ length, index, onChange, label }) {
  return (
    <div className="character-card__slider-wrap">
      <div className="character-card__slider-track">
        <span className="character-card__slider-endpoint" />
        <input
          type="range"
          className="character-card__slider"
          min={0}
          max={length - 1}
          step={1}
          value={index}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
        />
        <span className="character-card__slider-endpoint" />
      </div>
      <p className="character-card__label">{label}</p>
    </div>
  );
}

function MakyCard() {
  const [weightIndex, setWeightIndex] = useState(3); // 500, the middle of the 7 weights
  return (
    <div className="character-card" style={{ backgroundColor: primaryHex("Maky") }}>
      <div
        className="character-card__text"
        style={{ color: darkestHex("Maky"), fontWeight: WEIGHTS[weightIndex] }}
      >
        <p>A Maky</p>
        <p>atrai o lead</p>
      </div>
      <CardSlider
        length={WEIGHTS.length}
        index={weightIndex}
        onChange={setWeightIndex}
        label="Font Weight"
      />
    </div>
  );
}

function WazCard() {
  const [lineHeightIndex, setLineHeightIndex] = useState(4); // 1.0, the middle of the 9 steps
  return (
    <div className="character-card" style={{ backgroundColor: primaryHex("Waz") }}>
      <div
        className="character-card__text"
        style={{ color: darkestHex("Waz"), lineHeight: LINE_HEIGHTS[lineHeightIndex] }}
      >
        <p>O Waz atende</p>
        <p>e converte</p>
      </div>
      <CardSlider
        length={LINE_HEIGHTS.length}
        index={lineHeightIndex}
        onChange={setLineHeightIndex}
        label="Line Height"
      />
    </div>
  );
}

function FinCard() {
  const [letterSpacingIndex, setLetterSpacingIndex] = useState(2); // -2px, the middle of the 5 steps
  return (
    <div className="character-card" style={{ backgroundColor: primaryHex("Fin") }}>
      <div
        className="character-card__text"
        style={{
          color: darkestHex("Fin"),
          letterSpacing: `${LETTER_SPACINGS[letterSpacingIndex]}px`,
        }}
      >
        <p>O Fin</p>
        <p>cobra e cuida</p>
        <p>do caixa</p>
      </div>
      <CardSlider
        length={LETTER_SPACINGS.length}
        index={letterSpacingIndex}
        onChange={setLetterSpacingIndex}
        label="Letter Spacing"
      />
    </div>
  );
}

export default function CharacterCards() {
  return (
    <div className="character-cards">
      <MakyCard />
      <WazCard />
      <FinCard />
    </div>
  );
}
