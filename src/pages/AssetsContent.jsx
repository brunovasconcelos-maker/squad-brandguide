import { useState } from "react";
import ImagesHeader from "../components/ImagesHeader";
import ImageGrid from "../components/ImageGrid";
import { images } from "../data/assetsPage";
import { createDefaultFilters, matchesFilters } from "../utils/imageFilters";
import { useImageSelection } from "../utils/useImageSelection";

export default function AssetsContent() {
  const [filters, setFilters] = useState(createDefaultFilters());

  const filteredImages = images.filter((image) => matchesFilters(image, null, filters));

  const { selected: imageSelection, toggle: toggleImageSelection, clear: clearImageSelection } =
    useImageSelection(filteredImages);

  return (
    <div className="page__content">
      <ImagesHeader
        count={filteredImages.length}
        filters={filters}
        onApply={setFilters}
        showFormato={false}
        selectedCount={imageSelection.size}
        onClearSelection={clearImageSelection}
      />
      <ImageGrid
        images={filteredImages}
        aspect="1:1"
        selected={imageSelection}
        onToggleSelect={toggleImageSelection}
      />
    </div>
  );
}
