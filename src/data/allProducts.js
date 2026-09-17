import { pcComponents } from './pcComponents.js';
import { peripherals } from './peripherals.js';
import { aiHardware } from './aiHardware.js';

export const allProducts = [...pcComponents, ...peripherals, ...aiHardware];

export const getProductId = (product) =>
  typeof product._id === 'object' && product._id !== null && '$oid' in product._id
    ? product._id.$oid
    : String(product._id);

export const findProductById = (id) =>
  allProducts.find((p) => getProductId(p) === String(id));

export const activeProducts = allProducts.filter((p) => p.isActive !== false);

export const CATEGORIES = [
  {
    slug: 'pc-components',
    name: 'PC Components',
    match: 'PC Components',
    description:
      'Power your system with reliable CPUs, GPUs, memory, storage, motherboards, and essential components.',
    image: '/images/categories/pc-components.jpg'
  },
  {
    slug: 'peripherals',
    name: 'Peripherals',
    match: 'Peripherals',
    description:
      'Upgrade your setup with keyboards, mice, monitors, headsets, webcams, and gaming controllers.',
    image: '/images/categories/peripherals.jpg'
  },
  {
    slug: 'ai-hardware',
    name: 'Developer / AI Hardware',
    match: 'Developer / AI Hardware',
    description:
      'Build intelligent projects using Raspberry Pi, Jetson boards, Arduino, ESP32, and development kits.',
    image: '/images/categories/ai-hardware.jpg'
  }
];

export const categoryFromSlug = (slug) =>
  CATEGORIES.find((c) => c.slug === String(slug).toLowerCase());
