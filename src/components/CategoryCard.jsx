import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CategoryCard({ slug, name, description, image }) {
  return (
    <article className="category-card">
      <img src={image} alt={name} loading="lazy" onError={(e) => { e.currentTarget.src = '/images/placeholder.svg'; }} />
      <div className="category-card-body">
        <h3>{name}</h3>
        <p>{description}</p>
        <Link to={`/category/${slug}`} className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start' }}>
          Explore <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}
