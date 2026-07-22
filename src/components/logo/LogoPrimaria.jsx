import logoBlack from "../../../assets/logo/logo-black.svg";
import logoWhite from "../../../assets/logo/logo-white.svg";
import gradientPrimaria from "../../../assets/images/gradient-logo-primaria.png";
import wazPhoto from "../../../assets/images/imagens-videos/waz-2.png";
import LogoGrid from "./LogoGrid";

export default function LogoPrimaria() {
  return (
    <>
      <div className="text-section">
        <p className="text-section__heading">Logo Primária</p>
        <div className="text-section__body">
          <p>
            Nossa logo primária é escrita horizontalmente, com o "squad" e o
            ".com" na mesma linha. É a versão padrão da marca e deve ser a
            primeira escolha em qualquer aplicação.
          </p>
          <p>
            Use sempre que houver espaço horizontal suficiente para que a
            leitura aconteça sem esforço. Ela funciona bem em cabeçalhos,
            assinaturas de peça, apresentações e materiais em formato
            paisagem.
          </p>
        </div>
      </div>
      <LogoGrid
        variant="primary"
        logoBlack={logoBlack}
        logoWhite={logoWhite}
        gradientSrc={gradientPrimaria}
        photoSrc={wazPhoto}
        photoAlt="Logo squad.com aplicada sobre uma foto"
      />
    </>
  );
}
