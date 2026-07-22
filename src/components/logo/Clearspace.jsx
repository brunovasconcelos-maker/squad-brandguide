import clearspaceImg from "../../../assets/images/clearspace.png";

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
        <img
          className="clearspace-panel__image"
          src={clearspaceImg}
          alt="Diagrama de clearspace da logo"
        />
      </div>
    </>
  );
}
