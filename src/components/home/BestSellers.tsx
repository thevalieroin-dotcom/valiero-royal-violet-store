import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Flame } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";

const products = [
  {
    id: "5",
    name: "Signature Logo Tee - Black",
    price: 1299,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
    badge: "Bestseller",
  },
  {
    id: "6",
    name: "Premium Cotton Polo",
    price: 1799,
    originalPrice: 2199,
    image: "https://images.unsplash.com/photo-1625910513413-5fc33bfa00dd?w=800&q=80",
  },
  {
    id: "7",
    name: "Streetwear Cargo Pants",
    price: 2299,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
    badge: "Hot",
  },
  {
    id: "8",
    name: "Classic Oversized Hoodie",
    price: 2199,
    originalPrice: 2799,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    badge: "Top Rated",
  },
];

export const BestSellers = () => {
  return (
    <section className="py-20 md:py-28 bg-card/50">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm font-medium uppercase tracking-widest mb-2 flex items-center gap-2">
              <Flame size={16} className="text-accent" />
              Top Picks in India
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
              Best Sellers
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/collections/bestsellers"
              className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors font-medium"
            >
              Shop Best Sellers
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
