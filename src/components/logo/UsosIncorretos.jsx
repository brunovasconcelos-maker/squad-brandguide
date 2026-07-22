import logoBlack from "../../../assets/logo/logo-black.svg";
import usoIncorretoImg from "../../../assets/images/uso-incorreto.png";
import FailBadge from "./FailBadge";

export default function UsosIncorretos() {
  return (
    <>
      <div className="text-section">
        <p className="text-section__heading">Usos incorretos</p>
        <div className="text-section__body">
          <p>
            Não altere a logo. Ela foi desenhada como um conjunto fechado e
            qualquer modificação enfraquece o reconhecimento da marca. Não
            aplique a logo em versão outline, apenas com contorno e sem
            preenchimento. Não incline nem rotacione a logo: ela deve
            permanecer sempre alinhada ao eixo horizontal. Não desalinhe o
            ".com" em relação ao "squad", nem altere seu tamanho, posição ou
            espaçamento. E nunca use "squad" isolado, sem o ".com": o domínio
            faz parte da marca e os dois elementos são inseparáveis.
          </p>
        </div>
      </div>
      <div className="logo-grid logo-grid--incorrect">
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
          <defs>
            <filter id="logo-outline-filter">
              <feMorphology in="SourceAlpha" operator="dilate" radius="1.4" result="dilated" />
              <feComposite in="dilated" in2="SourceAlpha" operator="out" result="ring" />
              <feFlood floodColor="#000000" result="black" />
              <feComposite in="black" in2="ring" operator="in" />
            </filter>
          </defs>
        </svg>
        <div className="logo-grid__card logo-grid__card--white">
          <FailBadge />
          <img
            className="logo-grid__logo logo-grid__logo--primary usos-incorretos__logo--outline"
            src={logoBlack}
            alt="Logo em versão outline (uso incorreto)"
          />
        </div>
        <div className="logo-grid__card logo-grid__card--white">
          <FailBadge />
          <img
            className="logo-grid__logo logo-grid__logo--primary usos-incorretos__logo--rotated"
            src={logoBlack}
            alt="Logo rotacionada (uso incorreto)"
          />
        </div>
        <div className="logo-grid__card logo-grid__card--white">
          <FailBadge />
          <img
            className="logo-grid__card-bg"
            src={usoIncorretoImg}
            alt="Logo com o .com desalinhado em relação ao squad (uso incorreto)"
          />
        </div>
        <div className="logo-grid__card logo-grid__card--white">
          <FailBadge />
          <div className="usos-incorretos__crop">
            <img
              className="usos-incorretos__crop-logo"
              src={logoBlack}
              alt="squad sem o .com (uso incorreto)"
            />
          </div>
        </div>
      </div>
    </>
  );
}
