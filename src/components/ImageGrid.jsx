import { useState } from "react";
import Lightbox from "./Lightbox";
import downloadIcon from "../../assets/icons/download.svg";

export default function ImageGrid({ images, aspect = "16:9", tagsVariant = "full" }) {
  const [openImage, setOpenImage] = useState(null);
  const isSquare = aspect === "1:1";

  const cellClassName = isSquare ? "image-grid__cell image-grid__cell--square" : "image-grid__cell";

  return (
    <div className={isSquare ? "image-grid image-grid--square" : "image-grid"}>
      {images.map((image) => (
        <div
          key={image.filename}
          className={cellClassName}
          role="button"
          tabIndex={0}
          onClick={() => setOpenImage(image)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setOpenImage(image);
            }
          }}
        >
          <img src={image.src} alt="" loading="lazy" />
          <div className="image-grid__cell-overlay" />
          <p className="image-grid__cell-title">{image.title}</p>
          <a
            className="image-grid__cell-download"
            href={image.src}
            download={`${image.filename}.${image.extension}`}
            aria-label={`Baixar ${image.title}`}
            onClick={(event) => event.stopPropagation()}
          >
            <span
              className="image-grid__cell-download-icon"
              style={{ maskImage: `url(${downloadIcon})`, WebkitMaskImage: `url(${downloadIcon})` }}
            />
          </a>
        </div>
      ))}

      {openImage && (
        <Lightbox
          image={openImage}
          images={images}
          onClose={() => setOpenImage(null)}
          onNavigate={setOpenImage}
          tagsVariant={tagsVariant}
        />
      )}
    </div>
  );
}
