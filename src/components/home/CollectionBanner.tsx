import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    name: "Men",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80",
    link: "/collections/men",
  },
  {
    name: "Women",
    image: "https://images.unsplash.com/photo-1485968579169-19d59de1ced6?w=800&q=80",
    link: "/collections/women",
  },
  {
    name: "Streetwear",
    image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800&q=80",
    link: "/collections/streetwear",
  },
];

export const CollectionBanner = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-widest mb-2 block">
            Explore
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
            Shop by Collection
          </h2>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={collection.link}
                className="group relative block aspect-[3/4] rounded-2xl overflow-hidden"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover image-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {collection.name}
                  </h3>
                  <span className="inline-flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                    Shop Now <ArrowRight size={18} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
