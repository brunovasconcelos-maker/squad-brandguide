import { useState } from "react";
import CharacterFilterHeader from "../components/CharacterFilterHeader";
import AddGradientButton from "../components/gradientes/AddGradientButton";
import GradientModal from "../components/gradientes/GradientModal";
import ImageGrid from "../components/ImageGrid";
import { images } from "../data/gradientes";
import { matchesExactCharacters } from "../utils/imageFilters";
import { useImageSelection } from "../utils/useImageSelection";

export default function GradientesContent() {
  const [selected, setSelected] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredImages = images.filter((image) => matchesExactCharacters(image.characters, selected));

  const { selected: imageSelection, toggle: toggleImageSelection, clear: clearImageSelection } =
    useImageSelection(filteredImages);

  return (
    <div className="page__content">
      <AddGradientButton onClick={() => setModalOpen(true)} />
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

      {modalOpen && <GradientModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
