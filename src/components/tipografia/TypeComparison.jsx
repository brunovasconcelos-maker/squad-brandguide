import TypeCaption from "./TypeCaption";

const SAMPLE_TEXT = (
  <>
    <p>Squad para</p>
    <p>deixar marca.</p>
  </>
);

// Horizontal guide lines for the Line Height panel (y offsets within the 320px-tall panel).
const LINE_HEIGHT_GUIDES = [101.9, 142.9, 181.9, 222.9];

// Vertical guide-line pairs (left/right edge of each highlighted letter) for the
// Letter Spacing panel, as x/top/height triples within the 320px-tall panel.
const LETTER_SPACING_GUIDES = [
  { x: 146, top: 76, height: 83 },
  { x: 144, top: 76, height: 83 },
  { x: 193, top: 76, height: 83 },
  { x: 187, top: 76, height: 83 },
  { x: 235, top: 76, height: 83 },
  { x: 230, top: 76, height: 83 },
  { x: 274, top: 76, height: 83 },
  { x: 270, top: 76, height: 83 },
  { x: 379, top: 76, height: 83 },
  { x: 377, top: 76, height: 83 },
  { x: 421, top: 76, height: 83 },
  { x: 415, top: 76, height: 83 },
  { x: 444, top: 76, height: 83 },
  { x: 146, top: 158, height: 71 },
  { x: 142, top: 158, height: 71 },
  { x: 190, top: 158, height: 71 },
  { x: 186, top: 158, height: 71 },
  { x: 200, top: 158, height: 71 },
  { x: 198, top: 158, height: 71 },
  { x: 237, top: 158, height: 71 },
  { x: 278, top: 158, height: 71 },
  { x: 272, top: 158, height: 71 },
  { x: 385, top: 158, height: 71 },
  { x: 380, top: 158, height: 71 },
  { x: 426, top: 158, height: 71 },
  { x: 420, top: 158, height: 71 },
  { x: 450, top: 158, height: 71 },
  { x: 490, top: 158, height: 71 },
  { x: 487, top: 158, height: 71 },
];

export default function TypeComparison() {
  return (
    <div className="type-comparison">
      <div className="type-comparison__col">
        <div className="type-sample-panel">
          {LINE_HEIGHT_GUIDES.map((top) => (
            <span key={top} className="guide-line guide-line--h" style={{ top }} />
          ))}
          <div className="type-sample-panel__text">{SAMPLE_TEXT}</div>
        </div>
        <TypeCaption label="Line Height:">
          Line height é o espaço vertical entre as linhas de um texto. No
          nosso manual ele varia de 80% a 120%, sempre em relação ao tamanho
          da tipografia: títulos e textos grandes usam valores menores, para
          manter as linhas próximas e compactas, enquanto textos pequenos
          pedem valores maiores, que abrem respiro e facilitam a leitura.
        </TypeCaption>
      </div>

      <div className="type-comparison__col">
        <div className="type-sample-panel">
          {LETTER_SPACING_GUIDES.map((g, i) => (
            <span
              key={i}
              className="guide-line guide-line--v"
              style={{ left: g.x, top: g.top, height: g.height }}
            />
          ))}
          <div className="type-sample-panel__text">{SAMPLE_TEXT}</div>
        </div>
        <TypeCaption label="Letter Spacing:">
          Letter spacing é o espaço horizontal entre as letras. Nossa escala
          vai de -4 a 0 e segue a mesma lógica do line height: quanto maior a
          tipografia, mais negativo o valor, fechando os espaços que ficam
          exagerados em corpos grandes. Textos menores permanecem próximos de
          0, preservando a legibilidade.
        </TypeCaption>
      </div>
    </div>
  );
}
