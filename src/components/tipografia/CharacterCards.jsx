import { useState } from "react";
import { getCharacter, getPrimarySwatch } from "../../data/colorPalette";

const WEIGHTS = [200, 300, 400, 500, 600, 700, 800];

function darkestHex(name) {
  return getCharacter(name).scale.find((s) => s.step === 10).hex;
}

function primaryHex(name) {
  return getPrimarySwatch(getCharacter(name)).hex;
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
      <div className="character-card__slider-wrap">
        <input
          type="range"
          className="character-card__slider"
          min={0}
          max={WEIGHTS.length - 1}
          step={1}
          value={weightIndex}
          onChange={(e) => setWeightIndex(Number(e.target.value))}
          aria-label="Font weight"
        />
        <p className="character-card__label">Font Weight</p>
      </div>
    </div>
  );
}

function WazCard() {
  const [lineHeight, setLineHeight] = useState(1); // middle of 0.8–1.2
  return (
    <div className="character-card" style={{ backgroundColor: primaryHex("Waz") }}>
      <div
        className="character-card__text"
        style={{ color: darkestHex("Waz"), lineHeight }}
      >
        <p>O Waz atende</p>
        <p>e converte</p>
      </div>
      <div className="character-card__slider-wrap">
        <input
          type="range"
          className="character-card__slider"
          min={0.8}
          max={1.2}
          step={0.01}
          value={lineHeight}
          onChange={(e) => setLineHeight(Number(e.target.value))}
          aria-label="Line height"
        />
        <p className="character-card__label">Line Height</p>
      </div>
    </div>
  );
}

function FinCard() {
  const [letterSpacing, setLetterSpacing] = useState(-2); // middle of -4–0
  return (
    <div className="character-card" style={{ backgroundColor: primaryHex("Fin") }}>
      <div
        className="character-card__text"
        style={{ color: darkestHex("Fin"), letterSpacing: `${letterSpacing}px` }}
      >
        <p>O Fin</p>
        <p>cobra e cuida</p>
        <p>do caixa</p>
      </div>
      <div className="character-card__slider-wrap">
        <input
          type="range"
          className="character-card__slider"
          min={-4}
          max={0}
          step={0.1}
          value={letterSpacing}
          onChange={(e) => setLetterSpacing(Number(e.target.value))}
          aria-label="Letter spacing"
        />
        <p className="character-card__label">Letter Spacing</p>
      </div>
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
