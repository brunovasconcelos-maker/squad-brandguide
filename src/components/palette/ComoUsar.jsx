export default function ComoUsar() {
  return (
    <div className="text-section">
      <p className="text-section__heading">Como usar</p>
      <div className="text-section__body">
        <p>
          Cada personagem do Squad tem uma cor principal e dez tons derivados
          dela, numerados de 10 (mais escuro) a 95 (mais claro). A numeração
          segue o valor de luminosidade do HSL, o que torna a escala
          previsível.
        </p>
        <p>
          Respeite a cor do personagem: combine apenas tons da paleta dele,
          sem misturar com a de outro agente. Use sempre o HEX exato
          apresentado aqui, sem alterar opacidade ou saturação para criar
          variações próprias. Clique em qualquer cor para copiar o valor.
        </p>
      </div>
    </div>
  );
}
