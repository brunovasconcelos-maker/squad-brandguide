import logoBlack from "../../../assets/logo/logo-black.svg";

export default function Clearspace() {
  return (
    <>
      <div className="text-section">
        <p className="text-section__heading">Clearspace</p>
        <div className="text-section__body">
          <p>
            Clearspace é a área ao redor da logo que deve permanecer sempre
            livre, garantindo que ela seja distinguível de qualquer elemento
            próximo. Nossa medida de referência é a largura da letra "u" de
            "squad": essa distância deve ser respeitada nos quatro lados, e
            nenhum texto, imagem ou grafismo pode invadir esse espaço.
          </p>
        </div>
      </div>
      <div className="clearspace-panel">
        <div className="clearspace-frame">
          <span className="clearspace-frame__corner clearspace-frame__corner--tl" />
          <span className="clearspace-frame__corner clearspace-frame__corner--tr" />
          <span className="clearspace-frame__corner clearspace-frame__corner--bl" />
          <span className="clearspace-frame__corner clearspace-frame__corner--br" />
          <div className="clearspace-frame__legend">
            <p className="clearspace-frame__legend-label">x</p>
            <span className="clearspace-frame__legend-tick" />
          </div>
          <img className="clearspace-frame__logo" src={logoBlack} alt="Logo" />
        </div>
      </div>
    </>
  );
}
