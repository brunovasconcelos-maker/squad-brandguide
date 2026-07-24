import { useState } from "react";
import ImagesHeader from "../components/ImagesHeader";
import ImageGrid from "../components/ImageGrid";
import { images } from "../data/assetsPage";
import { createDefaultFilters, matchesFilters } from "../utils/imageFilters";

export default function AssetsContent() {
  const [filters, setFilters] = useState(createDefaultFilters());

  const filteredImages = images.filter((image) => matchesFilters(image, null, filters));

  return (
    <div className="page__content">
      <ImagesHeader count={filteredImages.length} filters={filters} onApply={setFilters} showFormato={false} />
      <ImageGrid images={filteredImages} aspect="1:1" />
    </div>
  );
}
