import { useState } from "react";
import filterIcon from "../../assets/icons/filter.svg";
import clearIcon from "../../assets/icons/X.svg";
import FilterPanel from "./FilterPanel";
import { buildFilterLabel, createDefaultFilters, isDefaultFilters } from "../utils/imageFilters";

export default function ImagesHeader({ count, filters, onApply, showFormato = true }) {
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <div className="images-header">
      <div className="images-header__actions">
        <div className="filter-trigger">
          <button className="ver-contraste" type="button" onClick={() => setPanelOpen(true)}>
            <span
              className="ver-contraste__icon ver-contraste__icon--mask"
              style={{ maskImage: `url(${filterIcon})`, WebkitMaskImage: `url(${filterIcon})` }}
            />
            {buildFilterLabel(filters)}
          </button>

          {panelOpen && (
            <FilterPanel
              appliedFilters={filters}
              onCancel={() => setPanelOpen(false)}
              onSave={(newFilters) => {
                onApply(newFilters);
                setPanelOpen(false);
              }}
              showFormato={showFormato}
            />
          )}
        </div>

        {!isDefaultFilters(filters) && (
          <button
            className="ver-contraste"
            type="button"
            onClick={() => onApply(createDefaultFilters())}
          >
            <span
              className="ver-contraste__icon ver-contraste__icon--mask"
              style={{ maskImage: `url(${clearIcon})`, WebkitMaskImage: `url(${clearIcon})` }}
            />
            Limpar
          </button>
        )}
      </div>
      <p className="images-header__count">Mostrando: {count} resultados</p>
    </div>
  );
}
