export default function LogoGrid({ variant, logoBlack, logoWhite, gradientSrc, photoSrc, photoAlt }) {
  const logoClass = `logo-grid__logo logo-grid__logo--${variant}`;

  return (
    <div className="logo-grid">
      <div className="logo-grid__card logo-grid__card--white">
        <img className={logoClass} src={logoBlack} alt="Logo" />
      </div>
      <div className="logo-grid__card logo-grid__card--black">
        <img className={logoClass} src={logoWhite} alt="Logo" />
      </div>
      <div className="logo-grid__card logo-grid__card--gradient">
        <img className="logo-grid__card-bg" src={gradientSrc} alt="" />
        <img className={logoClass} src={logoBlack} alt="Logo" />
      </div>
      <div className="logo-grid__card logo-grid__card--photo">
        <img className="logo-grid__card-bg" src={photoSrc} alt={photoAlt} />
        <div className="logo-grid__card-overlay" />
        <img className={logoClass} src={logoWhite} alt="Logo" />
      </div>
    </div>
  );
}
