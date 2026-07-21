import TypeCaption from "./TypeCaption";

const WEIGHTS = [
  { label: "Extra light", weight: 200 },
  { label: "Light", weight: 300 },
  { label: "Regular", weight: 400 },
  { label: "Medium", weight: 500 },
  { label: "Semibold", weight: 600 },
  { label: "Bold", weight: 700 },
  { label: "Extrabold", weight: 800 },
];

export default function FontWeightShowcase() {
  return (
    <div className="weight-showcase-block">
      <div className="weight-showcase">
        {WEIGHTS.map(({ label, weight }) => (
          <p key={weight} style={{ fontWeight: weight }}>
            {label}
          </p>
        ))}
      </div>
      <TypeCaption label="Font Weight:">
        O peso da fonte é a espessura do traço das letras. A Fustat vai de
        Extra Light a Extrabold, e essa variação é o que cria hierarquia:
        pesos mais fortes puxam o olhar para o que importa, pesos mais leves
        acomodam informação de apoio. Use o contraste entre eles para guiar a
        leitura, sem depender de mudanças bruscas de tamanho.
      </TypeCaption>
    </div>
  );
}
