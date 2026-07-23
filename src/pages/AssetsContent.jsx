import GridHeader from "../components/GridHeader";
import ImageGrid from "../components/ImageGrid";
import { images } from "../data/assetsPage";

export default function AssetsContent() {
  return (
    <div className="page__content">
      <GridHeader count={images.length} />
      <ImageGrid images={images} aspect="1:1" cardVariant="assets" />
    </div>
  );
}
