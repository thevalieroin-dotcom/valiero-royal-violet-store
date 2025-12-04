import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";

const products = [
  {
    id: "1",
    name: "Royal Violet Oversized Tee",
    price: 1499,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&q=80",
    isNew: true,
  },
  {
    id: "2",
    name: "Black Crown Hoodie",
    price: 2499,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&q=80",
    isNew: true,
  },
  {
    id: "3",
    name: "Empire Joggers - Charcoal",
    price: 1999,
    originalPrice: 2499,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
    badge: "Trending",
  },
  {
    id: "4",
    name: "Gold Accent Bomber Jacket",
    price: 3999,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    isNew: true,
  },
];

export const NewArrivals = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent text-sm font-medium uppercase tracking-widest mb-2 block">
              Fresh Drops
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
              New Arrivals
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/collections/new"
              className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors font-medium"
            >
              View All
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};
