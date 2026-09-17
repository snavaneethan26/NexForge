import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import ProductGrid from '../components/ProductGrid.jsx';
import FilterSidebar from '../components/FilterSidebar.jsx';
import SearchBar from '../components/SearchBar.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { activeProducts } from '../data/allProducts.js';
import { applyProductFilters } from '../utils/filterProducts.js';

const DEFAULTS = { category: 'all', subcategory: 'all', brand: 'all', sort: 'relevance', featuredOnly: false };

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const search = params.get('search') || '';
  const [filters, setFilters] = useState(DEFAULTS);

  const categories = useMemo(() => [...new Set(activeProducts.map((p) => p.category))], []);
  const subcategories = useMemo(() => {
    const base = filters.category === 'all'
      ? activeProducts
      : activeProducts.filter((p) => p.category === filters.category);
    return [...new Set(base.map((p) => p.subcategory).filter(Boolean))];
  }, [filters.category]);
  const brands = useMemo(() => [...new Set(activeProducts.map((p) => p.brand))].sort(), []);

  const results = useMemo(
    () => applyProductFilters(activeProducts, { ...filters, search }),
    [filters, search]
  );

  return (
    <div className="container page">
      <h1 className="page-title">All products</h1>
      <p className="page-subtitle">Search, filter, and sort the full NexForge catalog.</p>

      <div className="toolbar">
        <SearchBar
          key={search}
          initialValue={search}
          onSearch={(q) => setParams(q ? { search: q } : {})}
        />
        <select
          aria-label="Sort products"
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        >
          <option value="relevance">Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
        <button className="btn btn-secondary btn-sm filters-toggle" onClick={() => setShowFilters((v) => !v)}>
          <SlidersHorizontal size={15} /> Filters
        </button>
      </div>

      <div className="products-layout">
        <div className={`filters-wrap ${showFilters ? 'open' : ''}`}>
          <FilterSidebar
            categories={categories}
            subcategories={subcategories}
            brands={brands}
            filters={filters}
            onChange={setFilters}
            onReset={() => { setFilters(DEFAULTS); setParams({}); }}
          />
        </div>
        <div>
          <p className="result-count">{results.length} product{results.length === 1 ? '' : 's'} found</p>
          {results.length > 0 ? (
            <ProductGrid products={results} />
          ) : (
            <EmptyState
              title="No products found"
              message="Try a different search term or reset the filters."
              actionLabel="Reset filters"
              actionTo="/products"
            />
          )}
        </div>
      </div>
    </div>
  );
}
