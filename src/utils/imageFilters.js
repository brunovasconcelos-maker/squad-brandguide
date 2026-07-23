import { isVideoExtension } from "./mediaType";

export const CHARACTERS = ["waz", "maky", "fin", "pipo", "juri", "opy"];

export const FORMATS = [
  { key: "quadrado", label: "Quadrado (1:1)" },
  { key: "vertical", label: "Vertical (9:16)" },
  { key: "horizontal", label: "Horizontal (16:9)" },
];

export const TYPES = ["png", "jpg", "svg", "mp4", "gif"];

export function createDefaultFilters() {
  return {
    mediaType: "ambos",
    characters: [],
    formats: [],
    types: [],
  };
}

export function toggleMultiFilter(selected, key) {
  if (key === "todos") return [];
  return selected.includes(key) ? selected.filter((k) => k !== key) : [...selected, key];
}

export function isDefaultFilters(filters) {
  return (
    filters.mediaType === "ambos" &&
    filters.characters.length === 0 &&
    filters.formats.length === 0 &&
    filters.types.length === 0
  );
}

// Buckets a natural width/height into one of the three named format filters.
// Real photos rarely land exactly on 1:1 or 16:9, so this classifies by
// which side dominates rather than requiring an exact ratio match.
export function classifyFormat(width, height) {
  const ratio = width / height;
  if (Math.abs(ratio - 1) < 0.05) return "quadrado";
  return ratio > 1 ? "horizontal" : "vertical";
}

export function matchesFilters(image, dimensions, filters) {
  const isVideo = isVideoExtension(image.extension);
  if (filters.mediaType === "imagem" && isVideo) return false;
  if (filters.mediaType === "video" && !isVideo) return false;

  if (filters.characters.length > 0 && !filters.characters.includes(image.character)) {
    return false;
  }

  if (filters.formats.length > 0) {
    const format = dimensions ? classifyFormat(dimensions.width, dimensions.height) : null;
    if (!format || !filters.formats.includes(format)) return false;
  }

  if (filters.types.length > 0 && !filters.types.includes(image.extension.toLowerCase())) {
    return false;
  }

  return true;
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function buildFilterLabel(filters) {
  const parts = [];

  if (filters.mediaType !== "ambos") {
    parts.push(filters.mediaType === "imagem" ? "Imagem" : "Vídeo");
  }
  filters.characters.forEach((key) => parts.push(capitalize(key)));
  filters.formats.forEach((key) => {
    const format = FORMATS.find((f) => f.key === key);
    if (format) parts.push(format.label.split(" ")[0]);
  });
  filters.types.forEach((key) => parts.push(key.toUpperCase()));

  return parts.length > 0 ? `Filtro: ${parts.join(", ")}` : "Filtro: Todos";
}
