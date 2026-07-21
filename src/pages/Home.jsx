import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import arrowRight from "../../assets/icons/ArrowRight.svg";
import { pages } from "../pageConfig";

export default function Home() {
  return (
    <div className="home">
      <Nav />

      <Link className="cta" to={pages[0].path}>
        <span className="cta__inner">
          <span className="cta__label">Entrar no Manual</span>
          <img className="cta__icon" src={arrowRight} alt="" />
        </span>
      </Link>
    </div>
  );
}
