export default function Header({ count }) {
  return (
    <div className="images-header">
      <button className="ver-contraste" type="button">
        <span className="ver-contraste__icon">
          {/* No SlidersHorizontal asset was provided for this icon — this is a
              plain inline approximation, not a designer-provided asset file
              like the rest of the site's icons. Swap for a real SVG when
              available. */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6h12M19 6h2M3 18h4M11 18h10M3 12h8M15 12h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="17" cy="6" r="2" fill="white" />
            <circle cx="7" cy="18" r="2" fill="white" />
            <circle cx="13" cy="12" r="2" fill="white" />
          </svg>
        </span>
        Filtro: Todos
      </button>
      <p className="images-header__count">Mostrando: {count} resultados</p>
    </div>
  );
}
