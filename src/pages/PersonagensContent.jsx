import GridHeader from "../components/GridHeader";
import ImageGrid from "../components/ImageGrid";
import { images } from "../data/personagens";

export default function PersonagensContent() {
  return (
    <div className="page__content">
      <GridHeader count={images.length} />
      <ImageGrid images={images} aspect="1:1" />
    </div>
  );
}
