export default function RecursosLogo({ items }) {
  return (
    <div className="text-section">
      <p className="text-section__heading">Recursos</p>
      {items.map((item) => (
        <div className="recursos-row" key={item.label}>
          <p className="recursos-row__label">{item.label}</p>
          <a className="recursos-row__download" href={item.href} download={item.download}>
            Download
          </a>
        </div>
      ))}
    </div>
  );
}
