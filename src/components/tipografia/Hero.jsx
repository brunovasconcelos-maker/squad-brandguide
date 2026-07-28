import inline01 from "../../../assets/images/tipografia/inline-01.png";
import inline02 from "../../../assets/images/tipografia/inline-02.png";
import inline03 from "../../../assets/images/tipografia/inline-03.png";
import inline04 from "../../../assets/images/tipografia/inline-04.png";
import inline05 from "../../../assets/images/tipografia/inline-05.png";

const STAGGER_STEP = 60;

function InlineImg({ src, index }) {
  return (
    <img
      className="hero-panel__img"
      src={src}
      alt=""
      style={{ transitionDelay: `${index * STAGGER_STEP}ms` }}
    />
  );
}

export default function Hero() {
  return (
    <div className="hero-panel">
      <p className="hero-panel__text">
        Squad <InlineImg src={inline01} index={0} /> para deixar marca:
        <br />
        da web aos impressos, <InlineImg src={inline02} index={1} /> cores,
        <br />
        fonts, <InlineImg src={inline03} index={2} /> imagens e voz.
        <br />
        Tudo <InlineImg src={inline04} index={3} /> em um só{" "}
        <InlineImg src={inline05} index={4} /> lugar.
      </p>
    </div>
  );
}
