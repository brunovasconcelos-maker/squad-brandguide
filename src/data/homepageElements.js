const modules = import.meta.glob(
  "../../assets/images/homepage-elements/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
);

export const homepageElements = Object.entries(modules)
  .map(([path, src]) => {
    const file = path.split("/").pop();
    const filename = file.replace(/\.[^.]+$/, "");
    return { filename, src };
  })
  .sort((a, b) => a.filename.localeCompare(b.filename));
