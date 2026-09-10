import { FILTER_CHARACTERS, toggleMultiFilter } from "../utils/imageFilters";

// Read from the folder like the image grids do, so a new character's avatar
// (e.g. nexo_avatar.png) is picked up by dropping the file in.
const avatarModules = import.meta.glob("../../assets/images/avatares/*_avatar.png", {
  eager: true,
  import: "default",
});

const AVATARS = Object.fromEntries(
  Object.entries(avatarModules).map(([path, src]) => [
    path.split("/").pop().replace("_avatar.png", ""),
    src,
  ])
);

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function CharacterFilterHeader({
  count,
  selected,
  onSelectedChange,
  characters = FILTER_CHARACTERS,
}) {
  return (
    <div className="images-header">
      <div className="gradientes-pills">
        <button
          type="button"
          className={`filter-pill${selected.length === 0 ? " filter-pill--selected" : ""}`}
          onClick={() => onSelectedChange([])}
        >
          Todos
        </button>
        {characters.map((key) => (
          <button
            key={key}
            type="button"
            className={`character-pill${selected.includes(key) ? " character-pill--selected" : ""}`}
            onClick={() => onSelectedChange(toggleMultiFilter(selected, key))}
          >
            {/* Avatar is optional so a character whose portrait hasn't been
                added yet shows a label-only pill instead of a broken image. */}
            {AVATARS[key] && <img className="character-pill__avatar" src={AVATARS[key]} alt="" />}
            {capitalize(key)}
          </button>
        ))}
      </div>
      <p className="images-header__count">Mostrando: {count} resultados</p>
    </div>
  );
}
