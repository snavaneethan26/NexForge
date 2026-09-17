import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getProductId } from '../data/allProducts.js';

const WishlistContext = createContext(null);
const STORAGE_KEY = 'nexforge-wishlist-v1';

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return [...new Set(parsed.map(String))];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch {
      // ignore
    }
  }, [wishlistItems]);

  const addToWishlist = (productOrId) => {
    const id = typeof productOrId === 'string' ? productOrId : getProductId(productOrId);
    setWishlistItems((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((id) => id !== String(productId)));
  };

  const toggleWishlist = (productOrId) => {
    const id = typeof productOrId === 'string' ? productOrId : getProductId(productOrId);
    setWishlistItems((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const isInWishlist = (productOrId) => {
    const id = typeof productOrId === 'string' ? productOrId : getProductId(productOrId);
    return wishlistItems.includes(id);
  };

  const clearWishlist = () => setWishlistItems([]);

  const value = useMemo(
    () => ({ wishlistItems, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, clearWishlist }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wishlistItems]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
