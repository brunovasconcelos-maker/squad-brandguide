import PrimaryColorsRow from "../components/palette/PrimaryColorsRow";
import ComoUsar from "../components/palette/ComoUsar";
import ColorScale from "../components/palette/ColorScale";
import Acessibilidade from "../components/palette/Acessibilidade";
import ContrastExamples from "../components/palette/ContrastExamples";

export default function PaletaDeCoresContent() {
  return (
    <div className="page__content">
      <PrimaryColorsRow />
      <ComoUsar />
      <ColorScale />
      <Acessibilidade />
      <ContrastExamples />
    </div>
  );
}
