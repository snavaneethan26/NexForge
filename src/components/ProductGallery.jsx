import { getProductImage } from '../utils/getProductImage.js';

export default function ProductGallery({ product }) {
  const img = getProductImage(product);
  return (
    <div className="gallery">
      <img
        src={img}
        alt={product.name}
        onError={(e) => { e.currentTarget.src = '/images/placeholder.svg'; }}
      />
    </div>
  );
}
