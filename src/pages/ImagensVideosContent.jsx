import { useEffect, useState } from "react";
import ImagesHeader from "../components/ImagesHeader";
import ImageGrid from "../components/ImageGrid";
import { images } from "../data/imagensVideos";
import { createDefaultFilters, matchesFilters } from "../utils/imageFilters";

export default function ImagensVideosContent() {
  const [filters, setFilters] = useState(createDefaultFilters());
  const [dimensions, setDimensions] = useState({});

  // Preloads natural dimensions for every image so the "Formato" filter
  // (aspect ratio) can be applied without waiting for grid thumbnails to load.
  useEffect(() => {
    images.forEach((image) => {
      const preload = new Image();
      preload.onload = () => {
        setDimensions((prev) => ({
          ...prev,
          [image.filename]: { width: preload.naturalWidth, height: preload.naturalHeight },
        }));
      };
      preload.src = image.src;
    });
  }, []);

  const filteredImages = images.filter((image) =>
    matchesFilters(image, dimensions[image.filename], filters)
  );

  return (
    <div className="page__content">
      <ImagesHeader count={filteredImages.length} filters={filters} onApply={setFilters} />
      <ImageGrid images={filteredImages} />
    </div>
  );
}
