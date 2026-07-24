import { CHARACTERS, toggleMultiFilter } from "../utils/imageFilters";
import wazAvatar from "../../assets/images/avatares/waz_avatar.png";
import makyAvatar from "../../assets/images/avatares/maky_avatar.png";
import finAvatar from "../../assets/images/avatares/fin_avatar.png";
import pipoAvatar from "../../assets/images/avatares/pipo_avatar.png";
import juriAvatar from "../../assets/images/avatares/juri_avatar.png";
import opyAvatar from "../../assets/images/avatares/opy_avatar.png";

const AVATARS = {
  waz: wazAvatar,
  maky: makyAvatar,
  fin: finAvatar,
  pipo: pipoAvatar,
  juri: juriAvatar,
  opy: opyAvatar,
};

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function CharacterFilterHeader({ count, selected, onSelectedChange }) {
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
        {CHARACTERS.map((key) => (
          <button
            key={key}
            type="button"
            className={`character-pill${selected.includes(key) ? " character-pill--selected" : ""}`}
            onClick={() => onSelectedChange(toggleMultiFilter(selected, key))}
          >
            <img className="character-pill__avatar" src={AVATARS[key]} alt="" />
            {capitalize(key)}
          </button>
        ))}
      </div>
      <p className="images-header__count">Mostrando: {count} resultados</p>
    </div>
  );
}
