import downloadIcon from "../../assets/icons/download.svg";
import plusCircleIcon from "../../assets/icons/PlusCircle.svg";
import checkCircleIcon from "../../assets/icons/CheckCircle.svg";

export const MIN_SIZE = 1;
export const MAX_SIZE = 4;

export function maskStyle(icon) {
  return { maskImage: `url(${icon})`, WebkitMaskImage: `url(${icon})` };
}

export function SizeStepper({ value, onChange }) {
  return (
    <div className="recursos-row__stepper">
      <button
        type="button"
        className="recursos-row__stepper-button"
        aria-label="Diminuir tamanho"
        disabled={value <= MIN_SIZE}
        onClick={() => onChange(value - 1)}
      >
        −
      </button>
      <span className="recursos-row__stepper-value">{value}x</span>
      <button
        type="button"
        className="recursos-row__stepper-button"
        aria-label="Aumentar tamanho"
        disabled={value >= MAX_SIZE}
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  );
}

export function RecursosRow({ label, item, sizeControl, inCart, onToggleCart }) {
  return (
    <div className="recursos-row recursos-row--interactive">
      <p className="recursos-row__label">{label}</p>
      {sizeControl}
      <div className="recursos-row__actions">
        <a
          className="recursos-row__icon-button"
          href={item.src}
          download={`${item.filename}.${item.extension}`}
          aria-label={`Baixar ${item.title}`}
        >
          <span className="recursos-row__icon-button-icon" style={maskStyle(downloadIcon)} />
        </a>
        <button
          type="button"
          className={`recursos-row__icon-button${inCart ? " recursos-row__icon-button--added" : ""}`}
          aria-label={inCart ? `Remover ${item.title} do carrinho` : `Adicionar ${item.title} ao carrinho`}
          aria-pressed={inCart}
          onClick={() => onToggleCart(item)}
        >
          <span
            className="recursos-row__icon-button-icon"
            style={maskStyle(inCart ? checkCircleIcon : plusCircleIcon)}
          />
        </button>
      </div>
    </div>
  );
}
