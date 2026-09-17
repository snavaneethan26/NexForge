import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import EmptyState from '../components/EmptyState.jsx';
import { findProductById, getProductId } from '../data/allProducts.js';
import { getProductImage } from '../utils/getProductImage.js';
import { formatCurrency } from '../utils/formatCurrency.js';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const products = wishlistItems.map(findProductById).filter(Boolean);

  if (products.length === 0) {
    return (
      <div className="container page">
        <h1 className="page-title">Your wishlist</h1>
        <p className="page-subtitle">Save products for later.</p>
        <EmptyState
          icon={<Heart size={24} />}
          title="Your wishlist is empty"
          message="Tap the heart icon on any product to save it here."
          actionLabel="Discover products"
          actionTo="/products"
        />
      </div>
    );
  }

  return (
    <div className="container page">
      <h1 className="page-title">Your wishlist</h1>
      <p className="page-subtitle">{products.length} saved item{products.length === 1 ? '' : 's'}.</p>

      {products.map((product) => {
        const id = getProductId(product);
        return (
          <div className="wishlist-item" key={id}>
            <Link to={`/products/${id}`}>
              <img
                src={getProductImage(product)}
                alt={product.name}
                onError={(e) => { e.currentTarget.src = '/images/placeholder.svg'; }}
              />
            </Link>
            <div className="wishlist-item-body">
              <h3><Link to={`/products/${id}`}>{product.name}</Link></h3>
              <span className="product-meta">{product.brand} · {product.subcategory}</span>
              <div className="product-foot">
                <span className="price">{formatCurrency(product.price)}</span>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                <button
                  className="btn btn-primary btn-sm"
                  disabled={product.stock === 0}
                  onClick={() => { addToCart(id); removeFromWishlist(id); }}
                >
                  <ShoppingCart size={14} /> Move to Cart
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => removeFromWishlist(id)} aria-label={`Remove ${product.name} from wishlist`}>
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <button className="btn btn-secondary btn-sm" onClick={clearWishlist} style={{ marginTop: 4 }}>
        <Trash2 size={14} /> Clear wishlist
      </button>
    </div>
  );
}
