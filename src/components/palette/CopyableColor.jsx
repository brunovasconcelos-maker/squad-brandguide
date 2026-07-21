import { useState } from "react";

export default function CopyableColor({ hex, className, style, children }) {
  const [tooltipPos, setTooltipPos] = useState(null);
  const [copied, setCopied] = useState(false);

  function handleMouseMove(e) {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  }

  function handleMouseLeave() {
    setTooltipPos(null);
    setCopied(false);
  }

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable or permission denied — fail silently.
    }
  }

  return (
    <div
      className={className}
      style={{ ...style, cursor: "pointer" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}

      {tooltipPos && (
        <span
          className={copied ? "copy-tooltip copy-tooltip--copied" : "copy-tooltip"}
          style={{ left: tooltipPos.x + 16, top: tooltipPos.y + 16 }}
        >
          {copied ? "Copiado" : "Copy HEX"}
        </span>
      )}
    </div>
  );
}
