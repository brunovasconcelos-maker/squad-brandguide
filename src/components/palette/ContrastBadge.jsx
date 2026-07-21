export default function ContrastBadge({ color, grade }) {
  return (
    <span className={`contrast-badge contrast-badge--${color}`}>
      <span className="contrast-badge__swatch" />
      {grade}
    </span>
  );
}
