import ProductCard from './ProductCard.jsx';
import { getProductId } from '../data/allProducts.js';

export default function ProductGrid({ products }) {
  if (!products || products.length === 0) return null;
  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={getProductId(p)} product={p} />
      ))}
    </div>
  );
}
