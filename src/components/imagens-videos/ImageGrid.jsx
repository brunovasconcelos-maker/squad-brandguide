import { useState } from "react";
import Lightbox from "./Lightbox";
import downloadIcon from "../../../assets/icons/download.svg";

export default function ImageGrid({ images }) {
  const [openImage, setOpenImage] = useState(null);

  return (
    <div className="image-grid">
      {images.map((image) => (
        <div
          key={image.filename}
          className="image-grid__cell"
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
          onSelect={setOpenImage}
        />
      )}
    </div>
  );
}
