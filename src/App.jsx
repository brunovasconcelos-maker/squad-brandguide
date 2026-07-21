import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BrandPage from "./pages/BrandPage";
import PaletaDeCoresContent from "./pages/PaletaDeCoresContent";
import { pages } from "./pageConfig";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {pages.map((page) => (
        <Route
          key={page.slug}
          path={page.path}
          element={
            <BrandPage title={page.title}>
              {page.slug === "paleta-de-cores" ? <PaletaDeCoresContent /> : null}
            </BrandPage>
          }
        />
      ))}
    </Routes>
  );
}
