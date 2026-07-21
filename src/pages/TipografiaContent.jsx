import Hero from "../components/tipografia/Hero";
import NossaTipografia from "../components/tipografia/NossaTipografia";
import FontWeightShowcase from "../components/tipografia/FontWeightShowcase";
import TypeComparison from "../components/tipografia/TypeComparison";

export default function TipografiaContent() {
  return (
    <div className="page__content">
      <Hero />
      <NossaTipografia />
      <FontWeightShowcase />
      <TypeComparison />
    </div>
  );
}
