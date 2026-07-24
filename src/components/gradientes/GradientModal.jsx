import { useEffect, useRef, useState } from "react";
import Dropdown from "../Dropdown";
import { gradientColors } from "../../data/gradientColors";
import { renderMeshGradient, exportMeshGradientPng } from "../../utils/meshGradient";

const MIN_SIZE = 180;
const MAX_SIZE = 1600;
const MAX_COLORS = 6;
const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 1200;
const PREVIEW_RESOLUTION_SCALE = Math.min(window.devicePixelRatio || 1, 2);

function createSlot() {
  return { id: crypto.randomUUID(), colorId: null, hex: null, x: 0.5, y: 0.5 };
}

function randomPosition() {
  return {
    x: 0.15 + Math.random() * 0.7,
    y: 0.15 + Math.random() * 0.7,
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function SizeField({ label, value, onCommit }) {
  const [draft, setDraft] = useState(String(value));

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  function commit() {
    const parsed = parseInt(draft, 10);
    const next = Number.isFinite(parsed) ? clamp(parsed, MIN_SIZE, MAX_SIZE) : value;
    setDraft(String(next));
    onCommit(next);
  }

  return (
    <div className="gradient-modal__size-field">
      <span className="gradient-modal__size-label">{label}</span>
      <input
        type="number"
        className="gradient-modal__size-input"
        value={draft}
        min={MIN_SIZE}
        max={MAX_SIZE}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") event.currentTarget.blur();
        }}
      />
    </div>
  );
}

export default function GradientModal({ onClose }) {
  const [slots, setSlots] = useState(() => [createSlot(), createSlot()]);
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [fittedSize, setFittedSize] = useState({ width: 0, height: 0 });
  const [downloading, setDownloading] = useState(false);

  const previewWrapRef = useRef(null);
  const frameRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Fits the W:H aspect ratio within the available preview area (a
  // "contain" fit), recomputed whenever that area resizes — including when
  // adding/removing a color slot changes the left column's height, which
  // this column stretches to match.
  useEffect(() => {
    const container = previewWrapRef.current;
    if (!container) return undefined;

    function updateFit() {
      const rect = container.getBoundingClientRect();
      const ratio = width / height;
      let fitW = rect.width;
      let fitH = fitW / ratio;
      if (fitH > rect.height) {
        fitH = rect.height;
        fitW = fitH * ratio;
      }
      setFittedSize({ width: Math.max(1, Math.round(fitW)), height: Math.max(1, Math.round(fitH)) });
    }

    updateFit();
    const observer = new ResizeObserver(updateFit);
    observer.observe(container);
    return () => observer.disconnect();
  }, [width, height]);

  // Re-renders the low-res live preview whenever colors, positions, or the
  // fitted size change. The full-resolution export re-renders separately at
  // download time, so dragging stays responsive regardless of W/H.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || fittedSize.width === 0) return;
    const points = slots.filter((slot) => slot.hex).map((slot) => ({ hex: slot.hex, x: slot.x, y: slot.y }));
    const renderWidth = Math.round(fittedSize.width * PREVIEW_RESOLUTION_SCALE);
    const renderHeight = Math.round(fittedSize.height * PREVIEW_RESOLUTION_SCALE);
    canvas.width = renderWidth;
    canvas.height = renderHeight;
    const ctx = canvas.getContext("2d");
    renderMeshGradient(ctx, renderWidth, renderHeight, points);
  }, [slots, fittedSize]);

  function handleColorSelect(slotId, option) {
    setSlots((prev) =>
      prev.map((slot) => {
        if (slot.id !== slotId) return slot;
        const position = slot.hex != null ? { x: slot.x, y: slot.y } : randomPosition();
        return { ...slot, colorId: option.id, hex: option.hex, ...position };
      })
    );
  }

  function handleRemoveSlot(slotId) {
    setSlots((prev) => prev.filter((slot) => slot.id !== slotId));
  }

  function handleAddSlot() {
    setSlots((prev) => (prev.length >= MAX_COLORS ? prev : [...prev, createSlot()]));
  }

  function handleHandlePointerDown(slotId, event) {
    event.preventDefault();
    const frame = frameRef.current;
    if (!frame) return;

    function handleMove(moveEvent) {
      const rect = frame.getBoundingClientRect();
      const x = clamp((moveEvent.clientX - rect.left) / rect.width, 0, 1);
      const y = clamp((moveEvent.clientY - rect.top) / rect.height, 0, 1);
      setSlots((prev) => prev.map((slot) => (slot.id === slotId ? { ...slot, x, y } : slot)));
    }

    function handleUp() {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
  }

  async function handleDownload() {
    const points = slots.filter((slot) => slot.hex).map((slot) => ({ hex: slot.hex, x: slot.x, y: slot.y }));
    if (points.length === 0) return;

    setDownloading(true);
    // Yields a frame so the "downloading" state actually paints before the
    // synchronous full-resolution render runs.
    await new Promise((resolve) => setTimeout(resolve, 0));
    try {
      const blob = await exportMeshGradientPng(width, height, points);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "gradiente.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  }

  const hasColors = slots.some((slot) => slot.hex);

  return (
    <div className="gradient-modal-backdrop" onClick={onClose}>
      <div className="gradient-modal__panel" onClick={(event) => event.stopPropagation()}>
        <button className="lightbox__close" type="button" aria-label="Fechar" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <p className="gradient-modal__title">Crie o gradiente</p>

        <div className="gradient-modal__body">
          <div className="gradient-modal__controls">
            <div className="gradient-modal__section">
              <div className="gradient-modal__section-header">
                <p className="gradient-modal__section-label">Cores:</p>
                <button
                  type="button"
                  className="gradient-modal__add-colors"
                  onClick={handleAddSlot}
                  disabled={slots.length >= MAX_COLORS}
                >
                  Add Cores
                </button>
              </div>

              {slots.length > 0 && (
                <div className="gradient-modal__color-list">
                  {slots.map((slot) => {
                    const selected = slot.colorId ? gradientColors.find((c) => c.id === slot.colorId) : null;
                    return (
                      <Dropdown
                        key={slot.id}
                        placeholder="Selecione uma cor"
                        value={selected}
                        options={gradientColors}
                        getOptionKey={(option) => option.id}
                        onSelect={(option) => handleColorSelect(slot.id, option)}
                        onRemove={() => handleRemoveSlot(slot.id)}
                        renderTriggerLabel={(option) => `${option.step} | ${option.hex}`}
                        renderTriggerSwatch={(option) => (
                          <span
                            style={{ backgroundColor: option.hex, width: "100%", height: "100%", display: "block" }}
                          />
                        )}
                        renderOption={(option) => (
                          <>
                            <span className="dropdown__option-swatch" style={{ backgroundColor: option.hex }} />
                            {option.character} {option.step} | {option.hex}
                          </>
                        )}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            <div className="gradient-modal__section">
              <p className="gradient-modal__section-label">Tamanho</p>
              <div className="gradient-modal__size-row">
                <SizeField label="W" value={width} onCommit={setWidth} />
                <SizeField label="H" value={height} onCommit={setHeight} />
              </div>
            </div>

            <button
              type="button"
              className="gradient-modal__download"
              onClick={handleDownload}
              disabled={!hasColors || downloading}
            >
              {downloading ? "Gerando..." : "Fazer Download"}
            </button>
          </div>

          <div className="gradient-modal__preview" ref={previewWrapRef}>
            <div
              className="gradient-modal__canvas-frame"
              ref={frameRef}
              style={{ width: fittedSize.width, height: fittedSize.height }}
            >
              <canvas className="gradient-modal__canvas" ref={canvasRef} />
              {slots
                .filter((slot) => slot.hex)
                .map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    className="gradient-modal__handle"
                    style={{ left: `${slot.x * 100}%`, top: `${slot.y * 100}%` }}
                    onMouseDown={(event) => handleHandlePointerDown(slot.id, event)}
                    aria-label="Arrastar cor"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
