import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <Link to="/" className="logo" aria-label="NexForge home">
            <span className="logo-mark">N</span>
            NexForge
          </Link>
          <p style={{ marginTop: 12, maxWidth: 320 }}>
            Powerful PC components, reliable peripherals, and developer hardware built for your next idea.
          </p>
        </div>
        <div>
          <h4>Shop</h4>
          <div className="footer-links">
            <Link to="/products">All Products</Link>
            <Link to="/category/pc-components">PC Components</Link>
            <Link to="/category/peripherals">Peripherals</Link>
            <Link to="/category/ai-hardware">AI Hardware</Link>
          </div>
        </div>
        <div>
          <h4>Account</h4>
          <div className="footer-links">
            <Link to="/account">Account</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/wishlist">Wishlist</Link>
          </div>
        </div>
        <div>
          <h4>NexForge</h4>
          <div className="footer-links">
            <span>Final-year B.Tech AI &amp; DS portfolio project</span>
            <span>Prices in INR</span>
            <span>Local demo catalog — checkout coming soon</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 NexForge. All rights reserved.</span>
        <span>Built with React, Vite &amp; Lucide icons.</span>
      </div>
    </footer>
  );
}
