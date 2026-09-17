import { imageMap, categoryFallbackImage, PLACEHOLDER_IMAGE } from '../data/imageMap.js';
import { getProductId } from '../data/allProducts.js';

export function getProductImage(product) {
  if (!product) return PLACEHOLDER_IMAGE;
  const id = getProductId(product);
  // 1. Explicit image map entry
  if (imageMap[id]) return imageMap[id];
  // 2. First image from product.images if present
  if (Array.isArray(product.images) && product.images.length > 0 && product.images[0]) {
    return product.images[0];
  }
  // 3. Category-based fallback
  if (product.category && categoryFallbackImage[product.category]) {
    return categoryFallbackImage[product.category];
  }
  // 4. Safe placeholder
  return PLACEHOLDER_IMAGE;
}
