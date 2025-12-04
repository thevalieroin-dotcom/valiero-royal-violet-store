import { motion } from "framer-motion";
import { Truck, RotateCcw, Shield, CreditCard } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders above ₹999",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day hassle-free returns",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "UPI, Cards, COD accepted",
  },
  {
    icon: CreditCard,
    title: "COD Available",
    description: "Pay on delivery option",
  },
];

export const TrustBadges = () => {
  return (
    <section className="py-12 md:py-16 border-y border-border bg-card/30">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                <badge.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{badge.title}</h3>
              <p className="text-sm text-muted-foreground">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
