import { useState } from "react";
import Nav from "../components/Nav";
import BottomNav from "../components/BottomNav";
import MenuOverlay from "../components/MenuOverlay";

export default function BrandPage({ title }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="page">
      <Nav onMenuClick={() => setMenuOpen(true)} />
      <h1 className="page__title">{title}</h1>
      <BottomNav />
      {menuOpen && <MenuOverlay onClose={() => setMenuOpen(false)} />}
    </div>
  );
}
