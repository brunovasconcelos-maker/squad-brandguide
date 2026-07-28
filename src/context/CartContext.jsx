import { createContext, useCallback, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

// Global download cart: persists across page navigation because the
// provider lives above the router, not inside any one page. Items are
// keyed by `${pageSlug}:${filename}` since filenames are only unique
// within a single page's asset folder, not across all four pages.
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => new Map());

  const addItem = useCallback((item) => {
    setItems((prev) => {
      if (prev.has(item.id)) return prev;
      const next = new Map(prev);
      next.set(item.id, item);
      return next;
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const toggleItem = useCallback((item) => {
    setItems((prev) => {
      const next = new Map(prev);
      if (next.has(item.id)) next.delete(item.id);
      else next.set(item.id, item);
      return next;
    });
  }, []);

  const clear = useCallback(() => setItems(new Map()), []);

  const value = useMemo(
    () => ({ items, addItem, removeItem, toggleItem, clear }),
    [items, addItem, removeItem, toggleItem, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
