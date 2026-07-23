export const VIDEO_EXTENSIONS = new Set(["mp4", "mov", "webm"]);

export function isVideoExtension(extension) {
  return VIDEO_EXTENSIONS.has(extension.toLowerCase());
}
