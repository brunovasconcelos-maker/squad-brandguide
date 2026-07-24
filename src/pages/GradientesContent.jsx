import { useState } from "react";
import CharacterFilterHeader from "../components/CharacterFilterHeader";
import AddGradientButton from "../components/gradientes/AddGradientButton";
import GradientModal from "../components/gradientes/GradientModal";
import ImageGrid from "../components/ImageGrid";
import { images } from "../data/gradientes";
import { matchesExactCharacters } from "../utils/imageFilters";

export default function GradientesContent() {
  const [selected, setSelected] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredImages = images.filter((image) => matchesExactCharacters(image.characters, selected));

  return (
    <div className="page__content">
      <AddGradientButton onClick={() => setModalOpen(true)} />
      <CharacterFilterHeader count={filteredImages.length} selected={selected} onSelectedChange={setSelected} />
      <ImageGrid images={filteredImages} aspect="1:1" tagsVariant="characters" />

      {modalOpen && <GradientModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
