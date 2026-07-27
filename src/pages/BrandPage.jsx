import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Nav from "../components/Nav";
import BottomNav from "../components/BottomNav";
import MenuOverlay from "../components/MenuOverlay";
import Footer from "../components/Footer";
import { pages } from "../pageConfig";

export default function BrandPage({ title, children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // BrandPage stays mounted across in-manual navigation (e.g. via the
  // bottom nav), so the overlay needs an explicit close on route change.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="page">
      <Nav onMenuClick={() => setMenuOpen(true)} logoTo={pages[0].path} />
      <h1 className="page__title">{title}</h1>
      {children}
      <Footer />
      <BottomNav />
      {menuOpen && <MenuOverlay onClose={() => setMenuOpen(false)} />}
    </div>
  );
}
