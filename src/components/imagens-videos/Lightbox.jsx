import { useEffect, useState } from "react";
import { computeAspectRatio } from "../../utils/aspectRatio";

const VIDEO_EXTENSIONS = new Set(["mp4", "mov", "webm"]);

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function Lightbox({ image, images, onClose, onSelect }) {
  const [naturalSize, setNaturalSize] = useState(null);

  useEffect(() => {
    setNaturalSize(null);
  }, [image.filename]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const similar = images
    .filter((img) => img.character === image.character && img.filename !== image.filename)
    .slice(0, 4);

  const aspectRatio = naturalSize ? computeAspectRatio(naturalSize.width, naturalSize.height) : null;
  const type = VIDEO_EXTENSIONS.has(image.extension.toLowerCase()) ? "Vídeo" : "Imagem";

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox__panel" onClick={(event) => event.stopPropagation()}>
        <button
          className="lightbox__close"
          type="button"
          aria-label="Fechar"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <p className="lightbox__title">{image.title}</p>

        <div className="lightbox__image-wrap">
          <img
            className="lightbox__image"
            src={image.src}
            alt={image.title}
            onLoad={(event) =>
              setNaturalSize({
                width: event.target.naturalWidth,
                height: event.target.naturalHeight,
              })
            }
          />
        </div>

        {similar.length > 0 && (
          <div className="lightbox__similar">
            <p className="lightbox__similar-label">Ver similares:</p>
            <div className="lightbox__similar-track">
              {similar.map((img) => (
                <button
                  key={img.filename}
                  type="button"
                  className="lightbox__similar-thumb"
                  onClick={() => onSelect(img)}
                >
                  <img src={img.src} alt={img.title} />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="lightbox__footer">
          <div className="lightbox__tags">
            <span className="lightbox-tag">{image.extension.toUpperCase()}</span>
            <span className="lightbox-tag">{type}</span>
            <span className="lightbox-tag">{capitalize(image.character)}</span>
            {aspectRatio && <span className="lightbox-tag">{aspectRatio}</span>}
          </div>
          <a
            className="lightbox__download"
            href={image.src}
            download={`${image.filename}.${image.extension}`}
          >
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 3v10m0 0l-3.5-3.5M10 13l3.5-3.5M4 16.5h12"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Download
          </a>
        </div>
      </div>
    </div>
  );
}
