import { Link } from 'react-router-dom';
import { ArrowRight, Cpu } from 'lucide-react';
import { activeProducts } from '../data/allProducts.js';

export default function Hero() {
  const brands = [...new Set(activeProducts.map((p) => p.brand))].length;
  return (
    <section className="hero">
      <div className="hero-inner">
        <div>
          <h1>Build smarter.<br />Upgrade better.</h1>
          <p>
            Discover powerful PC components, reliable peripherals, and developer hardware built for
            your next idea.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary">
              Explore Products <ArrowRight size={16} />
            </Link>
            <Link to="/category/ai-hardware" className="btn btn-secondary">
              Browse AI Hardware
            </Link>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-visual-grid">
            <div className="hero-chip"><Cpu size={20} /><strong>CPUs &amp; GPUs</strong></div>
            <div className="hero-chip"><Cpu size={20} /><strong>Peripherals</strong></div>
            <div className="hero-chip"><Cpu size={20} /><strong>AI Boards</strong></div>
          </div>
          <div className="hero-stats">
            <div><strong>{activeProducts.length}+</strong><span>Products</span></div>
            <div><strong>{brands}+</strong><span>Brands</span></div>
            <div><strong>3</strong><span>Collections</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
