import { useEffect, useLayoutEffect, useState } from "react";
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

const PANEL_MARGIN = 8;
const VIEWPORT_GUTTER = 20;

export default function FilterPanel({ triggerRef, appliedFilters, onCancel, onSave }) {
  const [draft, setDraft] = useState(appliedFilters);
  const [style, setStyle] = useState(null);

  useLayoutEffect(() => {
    function updatePosition() {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      setStyle({
        top: rect.bottom + PANEL_MARGIN,
        left: rect.left,
        maxHeight: `calc(100vh - ${rect.bottom + PANEL_MARGIN + VIEWPORT_GUTTER}px)`,
      });
    }
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [triggerRef]);

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
      <div className="filter-panel" style={style || { visibility: "hidden" }}>
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
            <div className="filter-group__pills">
              <button
                type="button"
                className={`filter-pill${draft.mediaType === "imagem" ? " filter-pill--selected" : ""}`}
                onClick={() => setDraft((d) => ({ ...d, mediaType: "imagem" }))}
              >
                <span
                  className="filter-pill__icon"
                  style={maskStyle(draft.mediaType === "imagem" ? imageSquareFillIcon : imageSquareIcon)}
                />
                Imagem
              </button>
              <button
                type="button"
                className={`filter-pill${draft.mediaType === "video" ? " filter-pill--selected" : ""}`}
                onClick={() => setDraft((d) => ({ ...d, mediaType: "video" }))}
              >
                <span
                  className="filter-pill__icon"
                  style={maskStyle(draft.mediaType === "video" ? videoCameraFillIcon : videoCameraIcon)}
                />
                Vídeo
              </button>
              <button
                type="button"
                className={`filter-pill${draft.mediaType === "ambos" ? " filter-pill--selected" : ""}`}
                onClick={() => setDraft((d) => ({ ...d, mediaType: "ambos" }))}
              >
                <span className="filter-pill__icon" style={maskStyle(imageSquareIcon)} />
                <span className="filter-pill__icon" style={maskStyle(videoCameraIcon)} />
                Ambos
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
