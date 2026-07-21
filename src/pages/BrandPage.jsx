import { useState } from "react";
import Nav from "../components/Nav";
import BottomNav from "../components/BottomNav";
import MenuOverlay from "../components/MenuOverlay";
import Footer from "../components/Footer";

export default function BrandPage({ title, children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="page">
      <Nav onMenuClick={() => setMenuOpen(true)} />
      <h1 className="page__title">{title}</h1>
      {children}
      <Footer />
      <BottomNav />
      {menuOpen && <MenuOverlay onClose={() => setMenuOpen(false)} />}
    </div>
  );
}
