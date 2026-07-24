import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import caretDownIcon from "../../assets/icons/CaretDown.svg";
import xIcon from "../../assets/icons/X.svg";

function maskStyle(icon) {
  return { maskImage: `url(${icon})`, WebkitMaskImage: `url(${icon})` };
}

// Generic floating-list dropdown, shared by the "Ver contraste" and
// "Crie o gradiente" modals. The option list portals to document.body so it
// overlays instead of being clipped by/scrolling its modal.
export default function Dropdown({
  placeholder,
  value,
  options,
  disabled,
  getOptionKey,
  onSelect,
  onRemove,
  renderTriggerLabel,
  renderTriggerSwatch,
  renderOption,
}) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const triggerRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    function updatePosition() {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    }

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    function handleClickOutside(event) {
      const insideTrigger = triggerRef.current && triggerRef.current.contains(event.target);
      const insideList = listRef.current && listRef.current.contains(event.target);
      if (!insideTrigger && !insideList) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  return (
    <div className={`dropdown${disabled ? " dropdown--disabled" : ""}`} ref={triggerRef}>
      <button
        type="button"
        className="dropdown__trigger"
        onClick={() => setOpen((prev) => !prev)}
        disabled={disabled}
      >
        <span className={`dropdown__value${value ? "" : " dropdown__value--placeholder"}`}>
          {value ? renderTriggerLabel(value) : placeholder}
        </span>
        <span className="dropdown__caret" style={maskStyle(caretDownIcon)} />
        {value && <span className="dropdown__swatch">{renderTriggerSwatch(value)}</span>}
      </button>

      {onRemove && (
        <button
          type="button"
          className="dropdown__remove"
          aria-label="Remover"
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
        >
          <span className="dropdown__remove-icon" style={maskStyle(xIcon)} />
        </button>
      )}

      {open &&
        !disabled &&
        position &&
        createPortal(
          <ul
            className="dropdown__list"
            ref={listRef}
            style={{ top: position.top, left: position.left, width: position.width }}
          >
            {options.map((option) => (
              <li key={getOptionKey(option)}>
                <button
                  type="button"
                  className="dropdown__option"
                  onClick={() => {
                    onSelect(option);
                    setOpen(false);
                  }}
                >
                  {renderOption(option)}
                </button>
              </li>
            ))}
          </ul>,
          document.body
        )}
    </div>
  );
}
