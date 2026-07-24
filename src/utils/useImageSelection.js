import { useEffect, useState } from "react";

// Shared multi-select state for image grids. Lives at the page level (not
// inside ImageGrid) so sibling header components can show a selection count
// and a "Cancelar Seleção" action next to the filter controls.
export function useImageSelection(images) {
  const [selected, setSelected] = useState(() => new Set());

  // Keeps selection in sync with whatever's currently visible (e.g. a
  // filter change can drop previously-selected items).
  useEffect(() => {
    setSelected((prev) => {
      const visible = new Set(images.map((image) => image.filename));
      let changed = false;
      const next = new Set();
      prev.forEach((filename) => {
        if (visible.has(filename)) next.add(filename);
        else changed = true;
      });
      return changed ? next : prev;
    });
  }, [images]);

  function toggle(filename) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(filename)) next.delete(filename);
      else next.add(filename);
      return next;
    });
  }

  function clear() {
    setSelected(new Set());
  }

  return { selected, toggle, clear };
}
