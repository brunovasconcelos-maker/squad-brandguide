import { useRef, useState } from "react";
import filterIcon from "../../../assets/icons/filter.svg";
import FilterPanel from "./FilterPanel";
import { buildFilterLabel } from "../../utils/imageFilters";

export default function ImagesHeader({ count, filters, onApply }) {
  const [panelOpen, setPanelOpen] = useState(false);
  const triggerRef = useRef(null);

  return (
    <div className="images-header">
      <div className="filter-trigger">
        <button
          ref={triggerRef}
          className="ver-contraste"
          type="button"
          onClick={() => setPanelOpen(true)}
        >
          <span
            className="ver-contraste__icon ver-contraste__icon--mask"
            style={{ maskImage: `url(${filterIcon})`, WebkitMaskImage: `url(${filterIcon})` }}
          />
          {buildFilterLabel(filters)}
        </button>

        {panelOpen && (
          <FilterPanel
            triggerRef={triggerRef}
            appliedFilters={filters}
            onCancel={() => setPanelOpen(false)}
            onSave={(newFilters) => {
              onApply(newFilters);
              setPanelOpen(false);
            }}
          />
        )}
      </div>
      <p className="images-header__count">Mostrando: {count} resultados</p>
    </div>
  );
}
