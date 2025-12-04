import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Arjun Mehta",
    location: "Mumbai",
    rating: 5,
    text: "The quality is insane! Finally found a brand that understands what Indian youth want. The oversized tees fit perfectly.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Delhi",
    rating: 5,
    text: "Ordered the Royal Hoodie and I'm obsessed! The fabric quality is premium and perfect for Delhi winters. Worth every rupee.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    id: 3,
    name: "Rahul Singh",
    location: "Bangalore",
    rating: 5,
    text: "VALIERO has become my go-to brand. Fast delivery, great customer service, and the clothes are simply 🔥",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
];

export const Testimonials = () => {
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
            Customer Love
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
            What Our <span className="text-gradient-gold">Kings & Queens</span> Say
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 md:p-8 bg-card rounded-2xl border border-border relative"
            >
              <Quote className="absolute top-6 right-6 text-primary/20" size={40} />
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="fill-accent text-accent" size={16} />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground/80 mb-6 relative z-10">"{testimonial.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
