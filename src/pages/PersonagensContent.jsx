import { useState } from "react";
import CharacterFilterHeader from "../components/CharacterFilterHeader";
import ImageGrid from "../components/ImageGrid";
import { images } from "../data/personagens";
import { matchesAnyCharacter } from "../utils/imageFilters";
import { useImageSelection } from "../utils/useImageSelection";

export default function PersonagensContent() {
  const [selected, setSelected] = useState([]);

  const filteredImages = images.filter((image) => matchesAnyCharacter(image.character, selected));

  const { selected: imageSelection, toggle: toggleImageSelection, clear: clearImageSelection } =
    useImageSelection(filteredImages);

  return (
    <div className="page__content">
      <CharacterFilterHeader
        count={filteredImages.length}
        selected={selected}
        onSelectedChange={setSelected}
        selectedCount={imageSelection.size}
        onClearSelection={clearImageSelection}
      />
      <ImageGrid
        images={filteredImages}
        aspect="1:1"
        tagsVariant="characters"
        selected={imageSelection}
        onToggleSelect={toggleImageSelection}
      />
    </div>
  );
}
