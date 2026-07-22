import Header from "../components/imagens-videos/Header";
import ImageGrid from "../components/imagens-videos/ImageGrid";
import { images } from "../data/imagensVideos";

export default function ImagensVideosContent() {
  return (
    <div className="page__content">
      <Header count={images.length} />
      <ImageGrid images={images} />
    </div>
  );
}
