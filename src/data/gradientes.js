import { CHARACTERS } from "../utils/imageFilters";

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Parses "waz_gradient_1" -> ["waz"], "pipo_waz_gradient" -> ["waz", "pipo"]
// (reordered to the canonical character order), "squad_gradient_1" -> all six.
function parseCharacters(filename) {
  const match = filename.match(/^(.+)_gradient(?:_\d+)?$/);
  const namesPart = match ? match[1] : filename;
  if (namesPart === "squad") return [...CHARACTERS];
  const present = namesPart.split("_");
  return CHARACTERS.filter((character) => present.includes(character));
}

// Picks up every image currently in the folder — and any added later —
// without needing code changes per file.
const modules = import.meta.glob("../../assets/images/gradientes/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
});

export const images = Object.entries(modules)
  .map(([path, src]) => {
    const file = path.split("/").pop();
    const extension = file.split(".").pop();
    const filename = file.replace(/\.[^.]+$/, "");
    const characters = parseCharacters(filename);
    return {
      filename,
      title: characters.map(capitalize).join(", "),
      src,
      extension,
      characters,
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
