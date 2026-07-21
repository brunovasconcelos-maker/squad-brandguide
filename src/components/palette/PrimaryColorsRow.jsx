import ContrastBadge from "./ContrastBadge";
import { characters, getPrimarySwatch } from "../../data/colorPalette";

const ORDER = ["Maky", "Waz", "Fin", "Pipo", "Juri", "Opy"];

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function PrimaryColorsRow() {
  const ordered = ORDER.map((name) => characters.find((c) => c.name === name));
  const rows = chunk(ordered, 3);

  return (
    <div className="primary-colors">
      {rows.map((row, i) => (
        <div className="primary-colors__row" key={i}>
          {row.map((character) => {
            const primary = getPrimarySwatch(character);
            return (
              <div
                key={character.name}
                className="primary-color-card"
                style={{ backgroundColor: primary.hex }}
              >
                <div className="primary-color-card__badges">
                  {primary.badges.map((badge) => (
                    <ContrastBadge key={badge.color} color={badge.color} grade={badge.grade} />
                  ))}
                </div>
                <div className="primary-color-card__info">
                  <p className="primary-color-card__name">
                    {character.name}: {character.primaryStep}
                  </p>
                  <div className="primary-color-card__values">
                    <p>{primary.hex}</p>
                    <p>{character.primaryRgb}</p>
                    <p>{character.primaryHsl}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
