import Nav from "../components/Nav";
import BottomNav from "../components/BottomNav";

export default function BrandPage({ title }) {
  return (
    <div className="page">
      <Nav />
      <h1 className="page__title">{title}</h1>
      <BottomNav />
    </div>
  );
}
