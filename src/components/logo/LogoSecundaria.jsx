import logo2Black from "../../../assets/logo/logo-2-black.svg";
import logo2White from "../../../assets/logo/logo-2-white.svg";
import gradientSecundaria from "../../../assets/images/gradient-logo-secundaria.png";
import opyPhoto from "../../../assets/images/imagens-videos/opy-2.png";
import LogoGrid from "./LogoGrid";

export default function LogoSecundaria() {
  return (
    <>
      <div className="text-section">
        <p className="text-section__heading">Logo Secundária</p>
        <div className="text-section__body">
          <p>
            A logo secundária distribui a marca em duas linhas: "squad" em
            cima e ".com" embaixo. O ".com" permanece alinhado à direita,
            acompanhando o final da palavra.
          </p>
          <p>
            Use essa versão quando o espaço horizontal for restrito ou quando
            o formato pedir uma composição mais vertical, como avatares,
            selos e peças quadradas. Nunca use as duas versões na mesma peça.
          </p>
        </div>
      </div>
      <LogoGrid
        variant="secondary"
        logoBlack={logo2Black}
        logoWhite={logo2White}
        gradientSrc={gradientSecundaria}
        photoSrc={opyPhoto}
        photoAlt="Logo secundária squad.com aplicada sobre uma foto"
      />
    </>
  );
}
