import { Link } from 'react-router-dom';
import ProductGrid from './ProductGrid.jsx';

export default function ProductSection({ title, subtitle, products, linkTo, linkLabel = 'View all' }) {
  if (!products || products.length === 0) return null;
  return (
    <section className="section">
      <div className="section-head">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {linkTo && <Link to={linkTo} className="link-more">{linkLabel} →</Link>}
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
