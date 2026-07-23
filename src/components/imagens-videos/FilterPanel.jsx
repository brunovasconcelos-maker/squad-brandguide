import { useEffect, useState } from "react";
import { CHARACTERS, FORMATS, TYPES, toggleMultiFilter } from "../../utils/imageFilters";
import imageSquareIcon from "../../../assets/icons/ImageSquare.svg";
import imageSquareFillIcon from "../../../assets/icons/ImageSquare-1.svg";
import videoCameraIcon from "../../../assets/icons/VideoCamera.svg";
import videoCameraFillIcon from "../../../assets/icons/VideoCamera-1.svg";

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function maskStyle(icon) {
  return { maskImage: `url(${icon})`, WebkitMaskImage: `url(${icon})` };
}

export default function FilterPanel({ appliedFilters, onCancel, onSave }) {
  const [draft, setDraft] = useState(appliedFilters);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  return (
    <>
      <div className="filter-panel-backdrop" onClick={onCancel} />
      <div className="filter-panel">
        <div className="filter-panel__header">
          <p className="filter-panel__title">Filtros</p>
          <button
            className="filter-panel__close"
            type="button"
            aria-label="Fechar filtros"
            onClick={onCancel}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="filter-panel__body">
          <div className="filter-group">
            <p className="filter-group__label">Tipo de mídia:</p>
            <div className="media-type-cards">
              <button
                type="button"
                className={`media-type-card${draft.mediaType === "imagem" ? " media-type-card--selected" : ""}`}
                onClick={() => setDraft((d) => ({ ...d, mediaType: "imagem" }))}
              >
                <span
                  className="media-type-card__icon"
                  style={maskStyle(draft.mediaType === "imagem" ? imageSquareFillIcon : imageSquareIcon)}
                />
                <span className="media-type-card__label">Imagem</span>
              </button>
              <button
                type="button"
                className={`media-type-card${draft.mediaType === "video" ? " media-type-card--selected" : ""}`}
                onClick={() => setDraft((d) => ({ ...d, mediaType: "video" }))}
              >
                <span
                  className="media-type-card__icon"
                  style={maskStyle(draft.mediaType === "video" ? videoCameraFillIcon : videoCameraIcon)}
                />
                <span className="media-type-card__label">Vídeo</span>
              </button>
              <button
                type="button"
                className={`media-type-card${draft.mediaType === "ambos" ? " media-type-card--selected" : ""}`}
                onClick={() => setDraft((d) => ({ ...d, mediaType: "ambos" }))}
              >
                <span className="media-type-card__icon-row">
                  <span className="media-type-card__icon" style={maskStyle(imageSquareIcon)} />
                  <span className="media-type-card__icon" style={maskStyle(videoCameraIcon)} />
                </span>
                <span className="media-type-card__label">Ambos</span>
              </button>
            </div>
          </div>

          <div className="filter-group">
            <p className="filter-group__label">Personagens:</p>
            <div className="filter-group__pills">
              <button
                type="button"
                className={`filter-pill${draft.characters.length === 0 ? " filter-pill--selected" : ""}`}
                onClick={() => setDraft((d) => ({ ...d, characters: [] }))}
              >
                Todos: Squad
              </button>
              {CHARACTERS.map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`filter-pill${draft.characters.includes(key) ? " filter-pill--selected" : ""}`}
                  onClick={() =>
                    setDraft((d) => ({ ...d, characters: toggleMultiFilter(d.characters, key) }))
                  }
                >
                  {capitalize(key)}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <p className="filter-group__label">Formato:</p>
            <div className="filter-group__pills">
              <button
                type="button"
                className={`filter-pill${draft.formats.length === 0 ? " filter-pill--selected" : ""}`}
                onClick={() => setDraft((d) => ({ ...d, formats: [] }))}
              >
                Todos
              </button>
              {FORMATS.map((format) => (
                <button
                  key={format.key}
                  type="button"
                  className={`filter-pill${draft.formats.includes(format.key) ? " filter-pill--selected" : ""}`}
                  onClick={() =>
                    setDraft((d) => ({ ...d, formats: toggleMultiFilter(d.formats, format.key) }))
                  }
                >
                  {format.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <p className="filter-group__label">Tipo:</p>
            <div className="filter-group__pills">
              <button
                type="button"
                className={`filter-pill${draft.types.length === 0 ? " filter-pill--selected" : ""}`}
                onClick={() => setDraft((d) => ({ ...d, types: [] }))}
              >
                Todos
              </button>
              {TYPES.map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`filter-pill${draft.types.includes(key) ? " filter-pill--selected" : ""}`}
                  onClick={() => setDraft((d) => ({ ...d, types: toggleMultiFilter(d.types, key) }))}
                >
                  {key.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="filter-panel__footer">
          <button className="filter-panel__cancel" type="button" onClick={onCancel}>
            Cancelar
          </button>
          <button className="filter-panel__save" type="button" onClick={() => onSave(draft)}>
            Salvar
          </button>
        </div>
      </div>
    </>
  );
}
