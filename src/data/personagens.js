function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Picks up every image currently in the folder — and any added later —
// without needing code changes per file.
const modules = import.meta.glob(
  "../../assets/images/personagens/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
);

export const images = Object.entries(modules)
  .map(([path, src]) => {
    const file = path.split("/").pop();
    const extension = file.split(".").pop();
    const filename = file.replace(/\.[^.]+$/, "");
    // Accept both naming conventions present in the folder — waz_pose_1.png and
    // Nexo-Pose-1.png — so the character key is always the lowercase prefix and
    // matches the filter pills regardless of how the file was exported.
    const character = filename.split(/[_-]/)[0].toLowerCase();
    return {
      filename,
      title: capitalize(character),
      src,
      extension,
      character,
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
