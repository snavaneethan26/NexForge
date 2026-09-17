import { Award, Headset, ShieldCheck, Truck } from 'lucide-react';
import Hero from '../components/Hero.jsx';
import CategoryCard from '../components/CategoryCard.jsx';
import ProductSection from '../components/ProductSection.jsx';
import { CATEGORIES, activeProducts } from '../data/allProducts.js';

const WHY = [
  { icon: <ShieldCheck size={20} />, title: 'Genuine products', text: 'Curated catalog from trusted PC, peripheral, and dev-board brands.' },
  { icon: <Truck size={20} />, title: 'Built for builders', text: 'Components and boards selected for gaming, study, and AI projects.' },
  { icon: <Award size={20} />, title: 'Honest pricing in INR', text: 'Clear Indian Rupee pricing with stock visibility on every product.' },
  { icon: <Headset size={20} />, title: 'Student friendly', text: 'A clean catalog designed as a final-year AI & DS portfolio project.' }
];

export default function Home() {
  const featured = activeProducts.filter((p) => p.isFeatured);
  const pc = activeProducts.filter((p) => p.category === 'PC Components').slice(0, 4);
  const peri = activeProducts.filter((p) => p.category === 'Peripherals').slice(0, 4);
  const ai = activeProducts.filter((p) => p.category === 'Developer / AI Hardware').slice(0, 4);

  return (
    <div>
      <Hero />

      <div className="container">
        <section className="section">
          <div className="section-head">
            <div>
              <h2>Shop by collection</h2>
              <p>Three focused collections for your setup and your ideas.</p>
            </div>
          </div>
          <div className="category-grid">
            {CATEGORIES.map((c) => (
              <CategoryCard key={c.slug} slug={c.slug} name={c.name} description={c.description} image={c.image} />
            ))}
          </div>
        </section>

        <ProductSection
          title="Featured products"
          subtitle="Hand-picked favorites across all collections."
          products={featured.slice(0, 8)}
          linkTo="/products"
        />
        <ProductSection
          title="PC Components"
          subtitle="CPUs, GPUs, and memory for reliable builds."
          products={pc}
          linkTo="/category/pc-components"
        />
        <ProductSection
          title="Peripherals"
          subtitle="Keyboards, mice, monitors, headsets, and more."
          products={peri}
          linkTo="/category/peripherals"
        />
        <ProductSection
          title="Developer / AI Hardware"
          subtitle="Raspberry Pi, Jetson, Arduino, ESP32, and dev kits."
          products={ai}
          linkTo="/category/ai-hardware"
        />

        <section className="section" style={{ paddingBottom: 48 }}>
          <div className="section-head">
            <div>
              <h2>Why choose NexForge</h2>
              <p>A minimal, honest tech marketplace.</p>
            </div>
          </div>
          <div className="why-grid">
            {WHY.map((w) => (
              <div className="why-card" key={w.title}>
                <span className="why-icon">{w.icon}</span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
