import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BrandPage from "./pages/BrandPage";
import LogoContent from "./pages/LogoContent";
import PaletaDeCoresContent from "./pages/PaletaDeCoresContent";
import TipografiaContent from "./pages/TipografiaContent";
import ImagensVideosContent from "./pages/ImagensVideosContent";
import PersonagensContent from "./pages/PersonagensContent";
import AssetsContent from "./pages/AssetsContent";
import GradientesContent from "./pages/GradientesContent";
import ScrollToTop from "./components/ScrollToTop";
import { pages } from "./pageConfig";

const CONTENT_BY_SLUG = {
  logo: LogoContent,
  "paleta-de-cores": PaletaDeCoresContent,
  tipografia: TipografiaContent,
  "imagens-e-videos": ImagensVideosContent,
  personagens: PersonagensContent,
  assets: AssetsContent,
  gradientes: GradientesContent,
};

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        {pages.map((page) => {
          const Content = CONTENT_BY_SLUG[page.slug];
          return (
            <Route
              key={page.slug}
              path={page.path}
              element={
                <BrandPage title={page.title}>{Content ? <Content /> : null}</BrandPage>
              }
            />
          );
        })}
      </Routes>
    </>
  );
}
