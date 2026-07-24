import { useState } from "react";
import GradientesHeader from "../components/gradientes/GradientesHeader";
import AddGradientButton from "../components/gradientes/AddGradientButton";
import ImageGrid from "../components/ImageGrid";
import { images } from "../data/gradientes";
import { matchesExactCharacters } from "../utils/imageFilters";

export default function GradientesContent() {
  const [selected, setSelected] = useState([]);

  const filteredImages = images.filter((image) => matchesExactCharacters(image.characters, selected));

  return (
    <div className="page__content">
      <AddGradientButton />
      <GradientesHeader count={filteredImages.length} selected={selected} onSelectedChange={setSelected} />
      <ImageGrid images={filteredImages} aspect="1:1" tagsVariant="characters" />
    </div>
  );
}
