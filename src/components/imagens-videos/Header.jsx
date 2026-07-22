import filterIcon from "../../../assets/icons/filter.svg";

export default function Header({ count }) {
  return (
    <div className="images-header">
      <button className="ver-contraste" type="button">
        <span
          className="ver-contraste__icon ver-contraste__icon--mask"
          style={{ maskImage: `url(${filterIcon})`, WebkitMaskImage: `url(${filterIcon})` }}
        />
        Filtro: Todos
      </button>
      <p className="images-header__count">Mostrando: {count} resultados</p>
    </div>
  );
}
