import inline01 from "../../../assets/images/tipografia/inline-01.png";
import inline02 from "../../../assets/images/tipografia/inline-02.png";
import inline03 from "../../../assets/images/tipografia/inline-03.png";
import inline04 from "../../../assets/images/tipografia/inline-04.png";
import inline05 from "../../../assets/images/tipografia/inline-05.png";

function InlineImg({ src }) {
  return <img className="hero-panel__img" src={src} alt="" />;
}

export default function Hero() {
  return (
    <div className="hero-panel">
      <p className="hero-panel__text">
        Squad <InlineImg src={inline01} /> para deixar marca: da web aos
        impressos, <InlineImg src={inline02} /> cores, fonts,{" "}
        <InlineImg src={inline03} /> imagens e voz. Tudo{" "}
        <InlineImg src={inline04} /> em um só <InlineImg src={inline05} />{" "}
        lugar.
      </p>
    </div>
  );
}
