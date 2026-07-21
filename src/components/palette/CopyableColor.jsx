import { useState } from "react";

export default function CopyableColor({ hex, className, style, children }) {
  const [tooltipPos, setTooltipPos] = useState(null);
  const [copied, setCopied] = useState(false);

  function handleMouseMove(e) {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  }

  function handleMouseLeave() {
    setTooltipPos(null);
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

      {copied && (
        <span className="copy-toast">Copiado!</span>
      )}

      {tooltipPos && !copied && (
        <span
          className="copy-tooltip"
          style={{ left: tooltipPos.x + 16, top: tooltipPos.y + 16 }}
        >
          Copy HEX
        </span>
      )}
    </div>
  );
}
