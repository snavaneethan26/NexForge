import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { activeProducts, categoryFromSlug } from '../data/allProducts.js';
import { applyProductFilters } from '../utils/filterProducts.js';

export default function CategoryPage() {
  const { category } = useParams();
  const info = categoryFromSlug(category);
  const [search, setSearch] = useState('');
  const [subcategory, setSubcategory] = useState('all');
  const [sort, setSort] = useState('relevance');

  const match = info?.match;
  const inCategory = useMemo(
    () => (match ? activeProducts.filter((p) => p.category === match) : []),
    [match]
  );
  const subcategories = useMemo(
    () => [...new Set(inCategory.map((p) => p.subcategory).filter(Boolean))],
    [inCategory]
  );

  const results = useMemo(
    () => applyProductFilters(inCategory, { search, category: 'all', subcategory, brand: 'all', sort, featuredOnly: false }),
    [inCategory, search, subcategory, sort]
  );

  if (!info) {
    return (
      <div className="container page">
        <EmptyState
          title="Category not found"
          message="The category you are looking for does not exist."
          actionLabel="Browse all products"
          actionTo="/products"
        />
      </div>
    );
  }

  return (
    <div className="container page">
      <div className="cat-banner">
        <div className="cat-banner-body">
          <h1>{info.name}</h1>
          <p>{info.description}</p>
          <p className="result-count" style={{ margin: '12px 0 0' }}>
            {inCategory.length} product{inCategory.length === 1 ? '' : 's'}
          </p>
        </div>
        <img
          src={info.image}
          alt={info.name}
          onError={(e) => { e.currentTarget.src = '/images/placeholder.svg'; }}
        />
      </div>

      <div className="toolbar">
        <SearchBar onSearch={setSearch} />
        <select aria-label="Sort products" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="relevance">Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {subcategories.length > 0 && (
        <div className="chip-row" role="group" aria-label="Filter by subcategory">
          <button className={`chip ${subcategory === 'all' ? 'active' : ''}`} onClick={() => setSubcategory('all')}>
            All
          </button>
          {subcategories.map((s) => (
            <button key={s} className={`chip ${subcategory === s ? 'active' : ''}`} onClick={() => setSubcategory(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      {results.length > 0 ? (
        <ProductGrid products={results} />
      ) : (
        <EmptyState
          title="No products found"
          message="Try a different search term or subcategory."
          actionLabel="View all products"
          actionTo="/products"
        />
      )}
    </div>
  );
}
