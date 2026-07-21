import { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import HomeMenuOverlay from "../components/HomeMenuOverlay";
import arrowRight from "../../assets/icons/ArrowRight.svg";
import { pages } from "../pageConfig";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="home">
      <Nav onMenuClick={() => setMenuOpen(true)} />

      <Link className="cta" to={pages[0].path}>
        <span className="cta__inner">
          <span className="cta__label">Entrar no Manual</span>
          <img className="cta__icon" src={arrowRight} alt="" />
        </span>
      </Link>

      {menuOpen && <HomeMenuOverlay onClose={() => setMenuOpen(false)} />}
    </div>
  );
}
