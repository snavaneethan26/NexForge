import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { findProductById, getProductId } from '../data/allProducts.js';

const CartContext = createContext(null);
const STORAGE_KEY = 'nexforge-cart-v1';

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((i) => i && typeof i.productId === 'string' && Number.isFinite(Number(i.quantity)))
      .map((i) => ({ productId: i.productId, quantity: Math.max(1, Math.min(99, Math.floor(Number(i.quantity)))) }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // storage unavailable — ignore
    }
  }, [cartItems]);

  const addToCart = (productOrId, qty = 1) => {
    const id = typeof productOrId === 'string' ? productOrId : getProductId(productOrId);
    const product = findProductById(id);
    if (!product) return;
    const amount = Math.max(1, Math.floor(Number(qty) || 1));
    setCartItems((prev) => {
      const existing = prev.find((i) => i.productId === id);
      const max = Math.max(0, Number(product.stock) || 0);
      if (existing) {
        const nextQty = max > 0 ? Math.min(existing.quantity + amount, max) : existing.quantity + amount;
        return prev.map((i) => (i.productId === id ? { ...i, quantity: nextQty } : i));
      }
      const startQty = max > 0 ? Math.min(amount, max) : amount;
      return [...prev, { productId: id, quantity: startQty }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((i) => i.productId !== String(productId)));
  };

  const updateQuantity = (productId, qty) => {
    const id = String(productId);
    const next = Math.floor(Number(qty));
    if (!Number.isFinite(next) || next < 1) {
      removeFromCart(id);
      return;
    }
    const product = findProductById(id);
    const max = product ? Number(product.stock) || 99 : 99;
    setCartItems((prev) =>
      prev.map((i) => (i.productId === id ? { ...i, quantity: Math.max(1, Math.min(next, max)) } : i))
    );
  };

  const clearCart = () => setCartItems([]);

  const detailedItems = useMemo(
    () =>
      cartItems
        .map((i) => ({ ...i, product: findProductById(i.productId) }))
        .filter((i) => i.product),
    [cartItems]
  );

  const getCartCount = () => cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const getCartTotal = () =>
    detailedItems.reduce((sum, i) => sum + (Number(i.product.price) || 0) * i.quantity, 0);

  const value = useMemo(
    () => ({
      cartItems,
      detailedItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartCount,
      getCartTotal
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartItems, detailedItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
