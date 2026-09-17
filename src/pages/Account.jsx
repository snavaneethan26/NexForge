import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Moon, Package, RotateCcw, ShoppingCart, Sun, Trash2, User } from 'lucide-react';
import EmptyState from '../components/EmptyState.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { useLocalStorage } from '../utils/useLocalStorage.js';

const ACCOUNT_KEY = 'nexforge-account-v1';
const EMPTY_PROFILE = { name: '', email: '', phone: '', address: '', city: '', pincode: '' };

export default function Account() {
  const [profile, setProfile] = useLocalStorage(ACCOUNT_KEY, EMPTY_PROFILE);
  const [draft, setDraft] = useState(profile);
  const [saved, setSaved] = useState(false);
  const { getCartCount, clearCart } = useCart();
  const { wishlistItems, clearWishlist } = useWishlist();
  const { theme, toggleTheme } = useTheme();

  const set = (key, value) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setSaved(false);
  };

  const save = (e) => {
    e.preventDefault();
    setProfile(draft);
    setSaved(true);
  };

  const resetDemoData = () => {
    clearCart();
    clearWishlist();
  };

  const initial = (profile.name || profile.email || 'G').trim().charAt(0).toUpperCase() || 'G';

  return (
    <div className="container page">
      <div className="account-hero">
        <span className="avatar" aria-hidden="true">{initial}</span>
        <div>
          <h1>{profile.name || 'Guest account'}</h1>
          <p>{profile.email || 'This is a local demo profile — no sign-in required. Your details stay in this browser.'}</p>
        </div>
      </div>

      <div className="account-grid">
        <div className="stat-card">
          <strong>{getCartCount()}</strong>
          <span>Items in cart</span>
        </div>
        <div className="stat-card">
          <strong>{wishlistItems.length}</strong>
          <span>Items in wishlist</span>
        </div>
        <div className="stat-card">
          <strong>0</strong>
          <span>Orders placed</span>
        </div>
      </div>

      <section className="account-card" aria-label="Profile details">
        <h2>Profile details</h2>
        <p>Saved locally in your browser. Used for faster checkout later.</p>
        <form onSubmit={save}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="acc-name">Full name</label>
              <input id="acc-name" type="text" value={draft.name} onChange={(e) => set('name', e.target.value)} placeholder="Aarav Sharma" autoComplete="name" />
            </div>
            <div className="form-group">
              <label htmlFor="acc-email">Email</label>
              <input id="acc-email" type="email" value={draft.email} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" autoComplete="email" />
            </div>
            <div className="form-group">
              <label htmlFor="acc-phone">Phone</label>
              <input id="acc-phone" type="tel" value={draft.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+91 98765 43210" autoComplete="tel" />
            </div>
            <div className="form-group">
              <label htmlFor="acc-pincode">Pincode</label>
              <input id="acc-pincode" type="text" inputMode="numeric" value={draft.pincode} onChange={(e) => set('pincode', e.target.value)} placeholder="411001" autoComplete="postal-code" />
            </div>
            <div className="form-group full">
              <label htmlFor="acc-address">Address</label>
              <input id="acc-address" type="text" value={draft.address} onChange={(e) => set('address', e.target.value)} placeholder="Flat, street, area" autoComplete="street-address" />
            </div>
            <div className="form-group full">
              <label htmlFor="acc-city">City</label>
              <input id="acc-city" type="text" value={draft.city} onChange={(e) => set('city', e.target.value)} placeholder="Pune" autoComplete="address-level2" />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-sm">Save profile</button>
            {saved && <span className="saved-note" role="status">Profile saved ✓</span>}
          </div>
        </form>
      </section>

      <section className="account-card" aria-label="Orders">
        <h2>My orders</h2>
        <p>Checkout is not enabled yet, so orders will appear here once it launches.</p>
        <EmptyState
          icon={<Package size={24} />}
          title="No orders yet"
          message="Your orders will show up here after checkout goes live."
          actionLabel="Continue shopping"
          actionTo="/products"
        />
      </section>

      <section className="account-card" aria-label="Preferences and data">
        <h2>Preferences &amp; data</h2>
        <p>Appearance and demo data controls.</p>
        <div className="pref-row">
          <div>
            <strong>Appearance</strong>
            <span>Currently using {theme} mode.</span>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
        <div className="pref-row">
          <div>
            <strong>Quick links</strong>
            <span>Jump to your cart or wishlist.</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to="/cart" className="btn btn-secondary btn-sm"><ShoppingCart size={14} /> Cart</Link>
            <Link to="/wishlist" className="btn btn-secondary btn-sm"><Heart size={14} /> Wishlist</Link>
          </div>
        </div>
        <div className="pref-row">
          <div>
            <strong>Reset demo data</strong>
            <span>Clears your cart and wishlist from this browser.</span>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={resetDemoData}>
            <RotateCcw size={14} /> Reset
          </button>
        </div>
        <div className="pref-row">
          <div>
            <strong>Delete profile</strong>
            <span>Removes your saved profile details only.</span>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => { setProfile(EMPTY_PROFILE); setDraft(EMPTY_PROFILE); setSaved(false); }}
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
        <p style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }}>
          <User size={14} /> Signed in locally as {profile.name || 'Guest'} — no password needed for this demo.
        </p>
      </section>
    </div>
  );
}
