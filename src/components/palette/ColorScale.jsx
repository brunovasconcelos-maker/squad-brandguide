import ContrastBadge from "./ContrastBadge";
import { characters } from "../../data/colorPalette";

const ORDER = ["Maky", "Waz", "Fin", "Pipo", "Juri", "Opy"];

export default function ColorScale() {
  const ordered = ORDER.map((name) => characters.find((c) => c.name === name));

  return (
    <div className="color-scale">
      {ordered.map((character) => (
        <div key={character.name} className="color-scale-row">
          <p className="color-scale-row__name">{character.name}</p>
          <div className="color-scale-row__swatches">
            {character.scale.map((swatch) => {
              const isPrimary = swatch.step === character.primaryStep;
              return (
                <div key={swatch.step} className="color-swatch">
                  <div
                    className="color-swatch__block"
                    style={{ backgroundColor: swatch.hex }}
                  >
                    <div className="color-swatch__badges">
                      {swatch.badges.map((badge) => (
                        <ContrastBadge key={badge.color} color={badge.color} grade={badge.grade} />
                      ))}
                    </div>
                  </div>
                  <div className="color-swatch__info">
                    <p className="color-swatch__step">
                      {isPrimary ? `${character.name}: ${swatch.step}` : swatch.step}
                    </p>
                    <p className="color-swatch__hex">{swatch.hex}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
