import JSZip from "jszip";

export async function downloadImagesAsZip(images, zipFilename) {
  const zip = new JSZip();
  await Promise.all(
    images.map(async (image) => {
      const response = await fetch(image.src);
      const blob = await response.blob();
      zip.file(`${image.filename}.${image.extension}`, blob);
    })
  );

  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const link = document.createElement("a");
  link.href = url;
  link.download = zipFilename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
