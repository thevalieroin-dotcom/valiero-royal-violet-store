import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Crown, Sparkles, Heart, Users } from "lucide-react";

const values = [
  {
    icon: Crown,
    title: "Modern Royalty",
    description:
      "We believe every Indian deserves to feel like royalty. Our designs blend traditional luxury with contemporary street style.",
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    description:
      "Only the finest fabrics, carefully sourced and crafted to withstand Indian weather while ensuring maximum comfort.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description:
      "Every stitch, every design is created with passion. We pour our hearts into crafting pieces you'll love to wear.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "VALIERO is more than a brand—it's a community of bold individuals who dare to express themselves through fashion.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="text-accent text-sm font-medium uppercase tracking-widest mb-4 block">
                Our Story
              </span>
              <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                About <span className="text-gradient-gold">VALIERO</span>
              </h1>
              <p className="text-xl text-foreground/70 leading-relaxed">
                Born from the streets of India, VALIERO represents a new era of fashion for the bold and confident.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
                    alt="VALIERO Story"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  The Birth of <span className="text-gradient-gold">Royalty</span>
                </h2>
                <div className="space-y-4 text-foreground/70 leading-relaxed">
                  <p>
                    VALIERO was founded in 2023 with a simple yet powerful vision: to create premium streetwear that resonates with the spirit of modern Indian youth.
                  </p>
                  <p>
                    The name "VALIERO" draws inspiration from the word "valor" — representing courage, strength, and the confidence to stand out. We believe that fashion is more than clothing; it's a statement of who you are and who you aspire to be.
                  </p>
                  <p>
                    Our designs are crafted keeping the Indian climate and body types in mind. From the fabric selection to the final stitch, every detail is meticulously planned to ensure you not only look good but feel comfortable in every situation.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-card/50">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold">
                What We <span className="text-gradient-gold">Stand For</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 bg-card rounded-2xl border border-border text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                    <value.icon className="text-primary" size={28} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center p-8 md:p-12 gradient-card rounded-3xl border border-border"
              >
                <Crown className="mx-auto text-accent mb-6" size={48} />
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  To empower the Indian youth with premium, affordable fashion that lets them express their unique identity. We're not just selling clothes — we're building a movement of confident individuals who dare to wear their royalty.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-card/50 border-y border-border">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "10,000+", label: "Happy Customers" },
                { number: "50+", label: "Cities Delivered" },
                { number: "100+", label: "Unique Designs" },
                { number: "4.8★", label: "Average Rating" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-gradient-gold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
