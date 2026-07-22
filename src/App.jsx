import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BrandPage from "./pages/BrandPage";
import PaletaDeCoresContent from "./pages/PaletaDeCoresContent";
import TipografiaContent from "./pages/TipografiaContent";
import ImagensVideosContent from "./pages/ImagensVideosContent";
import { pages } from "./pageConfig";

const CONTENT_BY_SLUG = {
  "paleta-de-cores": PaletaDeCoresContent,
  tipografia: TipografiaContent,
  "imagens-e-videos": ImagensVideosContent,
};

export default function App() {
  return (
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
  );
}
