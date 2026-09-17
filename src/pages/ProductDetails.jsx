import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import ProductGallery from '../components/ProductGallery.jsx';
import SpecificationsTable from '../components/SpecificationsTable.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { stockStatus } from '../components/ProductCard.jsx';
import { activeProducts, findProductById, getProductId } from '../data/allProducts.js';
import { formatCurrency } from '../utils/formatCurrency.js';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';

export default function ProductDetails() {
  const { id } = useParams();
  const product = findProductById(id);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => { setQty(1); }, [id]);

  const related = useMemo(() => {
    if (!product) return [];
    return activeProducts
      .filter((p) => getProductId(p) !== getProductId(product) && (p.category === product.category || p.subcategory === product.subcategory))
      .slice(0, 4);
  }, [product]);

  if (!product || product.isActive === false) {
    return (
      <div className="container page">
        <EmptyState
          title="Product not found"
          message="This product does not exist or is no longer available."
          actionLabel="Browse products"
          actionTo="/products"
        />
      </div>
    );
  }

  const pid = getProductId(product);
  const inWishlist = isInWishlist(pid);
  const status = stockStatus(product.stock);
  const maxQty = Math.max(1, product.stock || 1);

  return (
    <div className="container page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <span>{product.name}</span>
      </nav>

      <div className="details-grid">
        <ProductGallery product={product} />
        <div className="details-info">
          <span className="product-brand">{product.brand}</span>
          <h1>{product.name}</h1>
          <span className="product-meta">{product.category} · {product.subcategory}</span>
          <div className="product-rating" style={{ marginTop: 8 }}>
            <span className="stars" aria-hidden="true"><Star size={15} fill="currentColor" /></span>
            <strong>{product.rating?.toFixed(1)}</strong>
            <span className="review-count">({product.reviewCount} reviews)</span>
            {product.isFeatured && <span className="featured-tag" style={{ position: 'static' }}>Featured</span>}
          </div>
          <p style={{ color: '#475569' }}>{product.description}</p>
          <div className="details-price">{formatCurrency(product.price)}</div>
          <span className={status.className}>{status.label}</span>
          {product.stock > 0 && (
            <p className="product-meta" style={{ marginTop: 6 }}>{product.stock} units available</p>
          )}

          <div className="qty-row">
            <span className="product-meta">Quantity</span>
            <div className="qty-control">
              <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1}>
                <Minus size={15} />
              </button>
              <span aria-live="polite">{qty}</span>
              <button aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(maxQty, q + 1))} disabled={qty >= maxQty}>
                <Plus size={15} />
              </button>
            </div>
          </div>

          <div className="details-actions">
            <button
              className="btn btn-primary"
              disabled={product.stock === 0}
              onClick={() => addToCart(pid, qty)}
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>
            <button className="btn btn-secondary" onClick={() => toggleWishlist(pid)} aria-pressed={inWishlist}>
              <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
              {inWishlist ? 'Wishlisted' : 'Wishlist'}
            </button>
          </div>

          <h2 style={{ fontSize: '1.1rem', marginTop: 24 }}>Specifications</h2>
          <SpecificationsTable specifications={product.specifications} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="section" style={{ paddingBottom: 32 }}>
          <div className="section-head">
            <div><h2>Related products</h2></div>
          </div>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
