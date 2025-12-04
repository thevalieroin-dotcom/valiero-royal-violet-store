import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Crown } from "lucide-react";

export const AboutBrand = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80"
                alt="About Valiero"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 md:right-6 p-6 bg-card border border-border rounded-2xl shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 gradient-royal rounded-xl flex items-center justify-center">
                  <Crown className="text-primary-foreground" size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">10K+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-accent text-sm font-medium uppercase tracking-widest mb-4 block">
              Our Story
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              About <span className="text-gradient-gold">VALIERO</span>
            </h2>
            <div className="space-y-4 text-foreground/70 mb-8">
              <p>
                Born from the streets of India, VALIERO represents a new era of fashion for the bold and confident. We believe every Indian deserves to wear their royalty.
              </p>
              <p>
                Our designs blend traditional luxury with modern streetwear aesthetics, creating pieces that make you stand out while staying true to your roots.
              </p>
              <p>
                Premium fabrics, meticulous craftsmanship, and designs made for the Indian climate — that's the VALIERO promise.
              </p>
            </div>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors"
            >
              Discover Our Journey
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
