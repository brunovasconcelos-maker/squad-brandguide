import contrastIcon from "../../../assets/icons/Contrast.svg";

export default function Acessibilidade() {
  return (
    <div className="text-section">
      <p className="text-section__heading">Acessibilidade</p>
      <div className="text-section__body">
        <p>
          Cor não é só estética. Toda combinação de texto e fundo precisa ser
          legível para quem tem baixa visão ou daltonismo. O padrão de
          referência é a WCAG, que mede o contraste entre as duas cores.
          Adotamos o nível AAA como meta, com razão mínima de 7:1 para textos
          comuns, sendo AA (4.5:1) o mínimo aceitável.
        </p>
        <p>
          Cada tom desta página mostra o resultado do teste com texto branco
          e preto. Consulte antes de aplicar: tons escuros pedem texto mais
          claro, tons claros pedem texto mais escuro. E nunca use cor como
          único recurso para transmitir informação, sempre acompanhe de ícone
          ou texto.
        </p>
      </div>
      <div className="ver-contraste-wrap">
        <button className="ver-contraste" type="button">
          <span className="ver-contraste__icon">
            <img src={contrastIcon} alt="" />
          </span>
          Ver contraste
        </button>
      </div>
    </div>
  );
}
