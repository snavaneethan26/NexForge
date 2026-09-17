export default function FilterSidebar({
  categories,
  subcategories,
  brands,
  filters,
  onChange,
  onReset
}) {
  const set = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <aside className="filters" aria-label="Product filters">
      <h3>Filters</h3>

      <div className="filter-group">
        <label className="group-title" htmlFor="f-category">Category</label>
        <select
          id="f-category"
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value, subcategory: 'all' })}
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="group-title" htmlFor="f-subcategory">Subcategory</label>
        <select id="f-subcategory" value={filters.subcategory} onChange={(e) => set('subcategory', e.target.value)}>
          <option value="all">All subcategories</option>
          {subcategories.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="group-title" htmlFor="f-brand">Brand</label>
        <select id="f-brand" value={filters.brand} onChange={(e) => set('brand', e.target.value)}>
          <option value="all">All brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="group-title" htmlFor="f-sort">Sort by</label>
        <select id="f-sort" value={filters.sort} onChange={(e) => set('sort', e.target.value)}>
          <option value="relevance">Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div className="filter-group">
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={filters.featuredOnly}
            onChange={(e) => set('featuredOnly', e.target.checked)}
          />
          Featured only
        </label>
      </div>

      <button className="btn btn-secondary btn-sm btn-block" onClick={onReset}>
        Reset filters
      </button>
    </aside>
  );
}
