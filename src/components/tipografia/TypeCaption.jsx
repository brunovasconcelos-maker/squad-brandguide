export default function TypeCaption({ label, children }) {
  return (
    <div className="type-caption">
      <p className="type-caption__label">{label}</p>
      <p className="type-caption__body">{children}</p>
    </div>
  );
}
