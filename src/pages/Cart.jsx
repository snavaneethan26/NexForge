import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import EmptyState from '../components/EmptyState.jsx';
import { getProductId } from '../data/allProducts.js';
import { getProductImage } from '../utils/getProductImage.js';
import { formatCurrency } from '../utils/formatCurrency.js';
import { useCart } from '../context/CartContext.jsx';

export default function Cart() {
  const { detailedItems, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartCount } = useCart();
  const total = getCartTotal();

  if (detailedItems.length === 0) {
    return (
      <div className="container page">
        <h1 className="page-title">Your cart</h1>
        <p className="page-subtitle">Items you add will show up here.</p>
        <EmptyState
          icon={<ShoppingCart size={24} />}
          title="Your cart is empty"
          message="Explore the catalog and add components, peripherals, or dev hardware."
          actionLabel="Browse products"
          actionTo="/products"
        />
      </div>
    );
  }

  return (
    <div className="container page">
      <h1 className="page-title">Your cart</h1>
      <p className="page-subtitle">{getCartCount()} item{getCartCount() === 1 ? '' : 's'} in your cart.</p>

      <div className="cart-layout">
        <div>
          {detailedItems.map(({ product, productId, quantity }) => {
            const id = productId || getProductId(product);
            return (
              <div className="cart-item" key={id}>
                <Link to={`/products/${id}`}>
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    onError={(e) => { e.currentTarget.src = '/images/placeholder.svg'; }}
                  />
                </Link>
                <div className="cart-item-body">
                  <h3><Link to={`/products/${id}`}>{product.name}</Link></h3>
                  <span className="product-meta">{product.brand} · {product.subcategory}</span>
                  <div className="product-foot">
                    <span className="price">{formatCurrency(product.price)}</span>
                    <span className="product-meta">{product.stock} in stock</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                    <div className="qty-control">
                      <button aria-label={`Decrease quantity of ${product.name}`} onClick={() => updateQuantity(id, quantity - 1)}>
                        <Minus size={14} />
                      </button>
                      <span aria-live="polite">{quantity}</span>
                      <button aria-label={`Increase quantity of ${product.name}`} onClick={() => updateQuantity(id, quantity + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <button className="btn btn-secondary btn-sm" onClick={() => removeFromCart(id)} aria-label={`Remove ${product.name} from cart`}>
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <button className="btn btn-secondary btn-sm" onClick={clearCart}>
            <Trash2 size={14} /> Clear cart
          </button>
        </div>

        <aside className="summary" aria-label="Order summary">
          <h3 style={{ margin: '0 0 8px' }}>Order summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>{formatCurrency(total)}</span></div>
          <div className="summary-row"><span>Shipping</span><span>Calculated later</span></div>
          <div className="summary-row summary-total"><span>Total</span><span>{formatCurrency(total)}</span></div>
          <button className="btn btn-primary btn-block" disabled style={{ marginTop: 16 }} title="Checkout is not implemented in this demo">
            Checkout coming soon
          </button>
        </aside>
      </div>
    </div>
  );
}
