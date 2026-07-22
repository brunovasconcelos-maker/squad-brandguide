import { useState } from "react";
import Lightbox from "./Lightbox";

export default function ImageGrid({ images }) {
  const [openImage, setOpenImage] = useState(null);

  return (
    <div className="image-grid">
      {images.map((image) => (
        <button
          key={image.filename}
          type="button"
          className="image-grid__cell"
          onClick={() => setOpenImage(image)}
        >
          <img src={image.src} alt="" loading="lazy" />
        </button>
      ))}

      {openImage && (
        <Lightbox
          image={openImage}
          images={images}
          onClose={() => setOpenImage(null)}
          onSelect={setOpenImage}
        />
      )}
    </div>
  );
}
