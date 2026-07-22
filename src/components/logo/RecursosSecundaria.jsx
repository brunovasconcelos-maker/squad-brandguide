import logo2Black from "../../../assets/logo/logo-2-black.svg";
import logo2White from "../../../assets/logo/logo-2-white.svg";
import RecursosLogo from "./RecursosLogo";

const ITEMS = [
  { label: "Logo-Dark-SVG", href: logo2Black, download: "Logo-Dark-SVG.svg" },
  { label: "Logo-Light-SVG", href: logo2White, download: "Logo-Light-SVG.svg" },
];

export default function RecursosSecundaria() {
  return <RecursosLogo items={ITEMS} />;
}
