import logoBlack from "../../../assets/logo/logo-black.svg";
import logoWhite from "../../../assets/logo/logo-white.svg";
import RecursosLogo from "./RecursosLogo";

const ITEMS = [
  { label: "Logo-Dark-SVG", href: logoBlack, download: "Logo-Dark-SVG.svg" },
  { label: "Logo-Light-SVG", href: logoWhite, download: "Logo-Light-SVG.svg" },
];

export default function RecursosPrimaria() {
  return <RecursosLogo items={ITEMS} />;
}
