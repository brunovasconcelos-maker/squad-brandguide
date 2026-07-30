import fustatVariable from "../../../assets/fonts/Fustat-Variable.ttf";
import { useCart } from "../../context/CartContext";
import { RecursosRow } from "../RecursosRow";

const FONT_ITEM = {
  id: "tipografia:Fustat-Variable",
  filename: "Fustat-Variable",
  title: "Fustat Font",
  src: fustatVariable,
  extension: "ttf",
  pageSlug: "tipografia",
};

export default function Recursos() {
  const { items: cartItems, toggleItem } = useCart();

  return (
    <div className="text-section">
      <p className="text-section__heading">Recursos</p>
      <RecursosRow
        label="Fustat Font"
        item={FONT_ITEM}
        inCart={cartItems.has(FONT_ITEM.id)}
        onToggleCart={toggleItem}
      />
    </div>
  );
}
