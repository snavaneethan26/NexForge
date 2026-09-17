export function applyProductFilters(products, { search = '', category = 'all', subcategory = 'all', brand = 'all', sort = 'relevance', featuredOnly = false }) {
  const q = search.trim().toLowerCase();
  let list = products.filter((p) => p.isActive !== false);

  if (category !== 'all') list = list.filter((p) => p.category === category);
  if (subcategory !== 'all') list = list.filter((p) => p.subcategory === subcategory);
  if (brand !== 'all') list = list.filter((p) => p.brand === brand);
  if (featuredOnly) list = list.filter((p) => p.isFeatured);

  if (q) {
    list = list.filter((p) =>
      [p.name, p.brand, p.description, p.category, p.subcategory]
        .filter(Boolean)
        .some((f) => String(f).toLowerCase().includes(q))
    );
  }

  const sorted = [...list];
  if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating);
  return sorted;
}
