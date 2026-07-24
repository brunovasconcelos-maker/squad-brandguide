import { useState } from "react";
import JSZip from "jszip";
import Lightbox from "./Lightbox";
import downloadIcon from "../../assets/icons/download.svg";

async function downloadSelectedAsZip(selectedImages) {
  const zip = new JSZip();
  await Promise.all(
    selectedImages.map(async (image) => {
      const response = await fetch(image.src);
      const blob = await response.blob();
      zip.file(`${image.filename}.${image.extension}`, blob);
    })
  );

  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const link = document.createElement("a");
  link.href = url;
  link.download = "imagens.zip";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function ImageGrid({ images, aspect = "16:9", tagsVariant = "full", selected, onToggleSelect }) {
  const [openImage, setOpenImage] = useState(null);
  const [zipping, setZipping] = useState(false);
  const isSquare = aspect === "1:1";

  async function handleBulkDownload() {
    const selectedImages = images.filter((image) => selected.has(image.filename));
    if (selectedImages.length === 0) return;
    setZipping(true);
    try {
      await downloadSelectedAsZip(selectedImages);
    } finally {
      setZipping(false);
    }
  }

  const selectionMode = selected.size > 0;
  const gridClassName = [
    isSquare ? "image-grid image-grid--square" : "image-grid",
    selectionMode ? "image-grid--selecting" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const baseCellClassName = isSquare ? "image-grid__cell image-grid__cell--square" : "image-grid__cell";

  return (
    <div className={gridClassName}>
      {images.map((image) => {
        const isSelected = selected.has(image.filename);
        return (
          <div
            key={image.filename}
            className={`${baseCellClassName}${isSelected ? " image-grid__cell--selected" : ""}`}
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
            <button
              type="button"
              className="image-grid__cell-checkbox"
              aria-label={isSelected ? `Remover seleção de ${image.title}` : `Selecionar ${image.title}`}
              aria-pressed={isSelected}
              onClick={(event) => {
                event.stopPropagation();
                onToggleSelect(image.filename);
              }}
            >
              {isSelected ? (
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="9" fill="white" />
                  <path d="M6 10.2l2.5 2.5L14 7.2" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="8.25" stroke="white" strokeWidth="1.5" />
                </svg>
              )}
            </button>
          </div>
        );
      })}

      {openImage && (
        <Lightbox
          image={openImage}
          images={images}
          onClose={() => setOpenImage(null)}
          onNavigate={setOpenImage}
          tagsVariant={tagsVariant}
        />
      )}

      {selectionMode && (
        <button
          type="button"
          className="image-grid__bulk-download"
          onClick={handleBulkDownload}
          disabled={zipping}
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
          {zipping ? "Baixando..." : `Download (${selected.size})`}
        </button>
      )}
    </div>
  );
}
