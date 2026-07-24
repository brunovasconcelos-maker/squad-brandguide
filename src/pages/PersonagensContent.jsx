import { useState } from "react";
import CharacterFilterHeader from "../components/CharacterFilterHeader";
import ImageGrid from "../components/ImageGrid";
import { images } from "../data/personagens";
import { matchesAnyCharacter } from "../utils/imageFilters";

export default function PersonagensContent() {
  const [selected, setSelected] = useState([]);

  const filteredImages = images.filter((image) => matchesAnyCharacter(image.character, selected));

  return (
    <div className="page__content">
      <CharacterFilterHeader count={filteredImages.length} selected={selected} onSelectedChange={setSelected} />
      <ImageGrid images={filteredImages} aspect="1:1" tagsVariant="characters" />
    </div>
  );
}
