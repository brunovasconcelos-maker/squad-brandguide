import LogoShowcase from "../components/logo/LogoShowcase";
import LogoPrimaria from "../components/logo/LogoPrimaria";
import RecursosPrimaria from "../components/logo/RecursosPrimaria";
import LogoSecundaria from "../components/logo/LogoSecundaria";
import RecursosSecundaria from "../components/logo/RecursosSecundaria";
import Clearspace from "../components/logo/Clearspace";
import UsosIncorretos from "../components/logo/UsosIncorretos";

export default function LogoContent() {
  return (
    <div className="page__content">
      <LogoShowcase />
      <LogoPrimaria />
      <RecursosPrimaria />
      <LogoSecundaria />
      <RecursosSecundaria />
      <Clearspace />
      <UsosIncorretos />
    </div>
  );
}
