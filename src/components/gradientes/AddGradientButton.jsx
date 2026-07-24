// Visual only, per Figma — not wired up to any action yet.
export default function AddGradientButton() {
  return (
    <button className="add-gradient-button" type="button" aria-label="Adicionar gradiente">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
        <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}
