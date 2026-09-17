import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Heart, Menu, Moon, Search, ShoppingCart, Sun, User, X } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import SearchBar from './SearchBar.jsx';

export default function Header() {
  const { getCartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const navigate = useNavigate();
  const count = getCartCount();

  const goSearch = (q) => {
    navigate(q ? `/products?search=${encodeURIComponent(q)}` : '/products');
    setMobileSearch(false);
  };

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo" aria-label="NexForge home">
          <span className="logo-mark">N</span>
          NexForge
        </Link>

        <nav className="nav-desktop" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
          <NavLink to="/category/pc-components" className={({ isActive }) => (isActive ? 'active' : '')}>PC Components</NavLink>
          <NavLink to="/category/peripherals" className={({ isActive }) => (isActive ? 'active' : '')}>Peripherals</NavLink>
          <NavLink to="/category/ai-hardware" className={({ isActive }) => (isActive ? 'active' : '')}>AI Hardware</NavLink>
        </nav>

        <div className="header-search">
          <SearchBar onSearch={goSearch} compact />
        </div>

        <div className="header-actions">
          <button
            className="icon-btn mobile-only"
            aria-label="Search"
            onClick={() => setMobileSearch((v) => !v)}
          >
            <Search size={20} />
          </button>
          <Link to="/wishlist" className="icon-btn" aria-label={`Wishlist, ${wishlistItems.length} items`}>
            <Heart size={20} />
            {wishlistItems.length > 0 && <span className="badge">{wishlistItems.length}</span>}
          </Link>
          <Link to="/cart" className="icon-btn" aria-label={`Cart, ${count} items`}>
            <ShoppingCart size={20} />
            {count > 0 && <span className="badge">{count}</span>}
          </Link>
          <button
            className="icon-btn"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/account" className="icon-btn" aria-label="Your account">
            <User size={20} />
          </Link>
          <button
            className="icon-btn mobile-only"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileSearch && (
        <div className="mobile-menu open">
          <div className="mobile-search">
            <SearchBar onSearch={goSearch} autoFocus />
          </div>
        </div>
      )}

      <nav className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-label="Mobile">
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/products" onClick={() => setMenuOpen(false)}>All Products</Link>
        <Link to="/category/pc-components" onClick={() => setMenuOpen(false)}>PC Components</Link>
        <Link to="/category/peripherals" onClick={() => setMenuOpen(false)}>Peripherals</Link>
        <Link to="/category/ai-hardware" onClick={() => setMenuOpen(false)}>AI Hardware</Link>
        <Link to="/wishlist" onClick={() => setMenuOpen(false)}>Wishlist</Link>
        <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
        <Link to="/account" onClick={() => setMenuOpen(false)}>Account</Link>
      </nav>
    </header>
  );
}
