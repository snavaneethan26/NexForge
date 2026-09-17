import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { getProductId } from '../data/allProducts.js';
import { getProductImage } from '../utils/getProductImage.js';
import { formatCurrency } from '../utils/formatCurrency.js';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';

export function stockStatus(stock) {
  if (stock === 0) return { label: 'Out of Stock', className: 'stock out' };
  if (stock > 0 && stock <= 5) return { label: `Only ${stock} left`, className: 'stock low' };
  return { label: 'In Stock', className: 'stock in' };
}

export default function ProductCard({ product }) {
  const id = getProductId(product);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(id);
  const status = stockStatus(product.stock);
  const img = getProductImage(product);

  return (
    <article className="product-card">
      <div className="product-card-media">
        <Link to={`/products/${id}`} aria-label={`View ${product.name}`}>
          <img
            src={img}
            alt={product.name}
            loading="lazy"
            onError={(e) => { e.currentTarget.src = '/images/placeholder.svg'; }}
          />
        </Link>
        {product.isFeatured && <span className="featured-tag">Featured</span>}
        <button
          className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
          aria-label={inWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={inWishlist}
          onClick={() => toggleWishlist(id)}
        >
          <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="product-card-body">
        <span className="product-brand">{product.brand}</span>
        <h3 className="product-name">
          <Link to={`/products/${id}`}>{product.name}</Link>
        </h3>
        <span className="product-meta">{product.subcategory || product.category}</span>
        <p className="product-desc">{product.description}</p>
        <div className="product-rating">
          <span className="stars" aria-hidden="true">
            <Star size={14} fill="currentColor" />
          </span>
          <strong>{product.rating?.toFixed(1)}</strong>
          <span className="review-count">({product.reviewCount} reviews)</span>
        </div>
        <div className="product-foot">
          <span className="price">{formatCurrency(product.price)}</span>
          <span className={status.className}>{status.label}</span>
        </div>
        <div className="product-actions">
          <button
            className="btn btn-primary btn-sm"
            disabled={product.stock === 0}
            onClick={() => addToCart(id)}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={15} /> Add to Cart
          </button>
          <Link to={`/products/${id}`} className="btn btn-secondary btn-sm">
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
