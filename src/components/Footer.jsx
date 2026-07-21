import logo from "../../assets/logo/Logo.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <img className="footer__logo" src={logo} alt="Logo" />
      <p className="footer__text">
        Procurando algum recurso que não está incluído no material do Manual
        online? <strong>Entre em contato com o time de design</strong>
      </p>
    </footer>
  );
}
