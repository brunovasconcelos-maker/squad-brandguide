import { useState } from "react";
import GradientesHeader from "../components/gradientes/GradientesHeader";
import AddGradientButton from "../components/gradientes/AddGradientButton";
import ImageGrid from "../components/ImageGrid";
import { images } from "../data/gradientes";

export default function GradientesContent() {
  const [selected, setSelected] = useState([]);

  const filteredImages = images.filter(
    (image) => selected.length === 0 || selected.every((character) => image.characters.includes(character))
  );

  return (
    <div className="page__content">
      <AddGradientButton />
      <GradientesHeader count={filteredImages.length} selected={selected} onSelectedChange={setSelected} />
      <ImageGrid images={filteredImages} aspect="1:1" tagsVariant="characters" />
    </div>
  );
}
