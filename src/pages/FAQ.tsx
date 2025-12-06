import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronDown, Truck, RotateCcw, Ruler, CreditCard } from "lucide-react";

const faqCategories = [
  {
    id: "shipping",
    title: "Shipping & Delivery",
    icon: Truck,
    questions: [
      {
        q: "What are the shipping charges?",
        a: "We offer FREE shipping on all orders above ₹999. For orders below ₹999, a flat shipping fee of ₹79 applies across India.",
      },
      {
        q: "How long does delivery take to metro cities?",
        a: "For metro cities like Mumbai, Delhi, Bangalore, Chennai, Kolkata, and Hyderabad, delivery typically takes 3-5 business days.",
      },
      {
        q: "What about delivery to Tier 2 and Tier 3 cities?",
        a: "For Tier 2 cities like Pune, Ahmedabad, Jaipur, Lucknow, etc., delivery takes 4-6 business days. For Tier 3 cities and remote areas, it may take 5-7 business days.",
      },
      {
        q: "Do you deliver to Northeast India?",
        a: "Yes! We deliver to all states in Northeast India. Delivery to states like Assam, Meghalaya, Manipur, etc. typically takes 6-8 business days.",
      },
      {
        q: "Can I track my order?",
        a: "Absolutely! Once your order is shipped, you'll receive a tracking link via SMS and email. You can track your order status in real-time.",
      },
      {
        q: "Do you offer same-day delivery?",
        a: "Currently, we do not offer same-day delivery. However, we're working on express delivery options for select metro cities.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns & Exchanges",
    icon: RotateCcw,
    questions: [
      {
        q: "What is your return policy?",
        a: "We offer a hassle-free 7-day return policy. If you're not satisfied with your purchase, you can return it within 7 days of delivery for a full refund or exchange.",
      },
      {
        q: "How do I initiate a return?",
        a: "Simply contact us via email at returns@valiero.in or WhatsApp at +91-XXXXXXXXXX with your order number. Our team will arrange a pickup from your address.",
      },
      {
        q: "Are there any items that cannot be returned?",
        a: "Items that have been worn, washed, or altered cannot be returned. Products must be in original condition with tags attached. Innerwear and accessories are non-returnable for hygiene reasons.",
      },
      {
        q: "How long does it take to process a refund?",
        a: "Once we receive and inspect the returned item, refunds are processed within 3-5 business days. The amount will be credited to your original payment method.",
      },
      {
        q: "Can I exchange for a different size?",
        a: "Yes! Size exchanges are free of charge. Contact us within 7 days of delivery, and we'll arrange an exchange for your preferred size (subject to availability).",
      },
      {
        q: "What if I receive a damaged or defective item?",
        a: "We're sorry if that happens! Contact us immediately with photos of the damaged item. We'll arrange a free replacement or full refund within 24 hours.",
      },
    ],
  },
  {
    id: "sizing",
    title: "Size Guide",
    icon: Ruler,
    questions: [
      {
        q: "How do I find my correct size?",
        a: "Each product page has a detailed size chart. Measure your body dimensions and compare with our chart. For oversized fits, we recommend going with your regular size for the intended loose look.",
      },
      {
        q: "What are the measurements for each size?",
        a: "Our standard measurements (in inches): S - Chest 42\", Length 28\" | M - Chest 44\", Length 29\" | L - Chest 46\", Length 30\" | XL - Chest 48\", Length 31\" | XXL - Chest 50\", Length 32\"",
      },
      {
        q: "Do your clothes shrink after washing?",
        a: "Our premium fabrics are pre-shrunk to minimize shrinkage. However, to maintain the perfect fit, we recommend washing in cold water and avoiding high-heat drying.",
      },
      {
        q: "I'm between two sizes, what should I order?",
        a: "For a relaxed, oversized fit (our signature style), go with your regular size. If you prefer a slightly fitted look, size down. When in doubt, our team is happy to help via WhatsApp!",
      },
      {
        q: "Are your sizes consistent across all products?",
        a: "Yes, we maintain consistent sizing across our collections. However, oversized tees and hoodies are designed with a naturally relaxed fit compared to regular fits.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payment Options",
    icon: CreditCard,
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major payment methods: Credit/Debit Cards (Visa, Mastercard, RuPay), UPI (Google Pay, PhonePe, Paytm), Net Banking, Wallets, and Cash on Delivery (COD).",
      },
      {
        q: "Is Cash on Delivery (COD) available?",
        a: "Yes! COD is available across India. A nominal COD fee of ₹49 applies to all COD orders. This helps us cover handling costs.",
      },
      {
        q: "Is it safe to pay online on your website?",
        a: "Absolutely! We use industry-standard SSL encryption and partner with trusted payment gateways like Razorpay to ensure your payment information is always secure.",
      },
      {
        q: "Can I pay using EMI?",
        a: "Yes, we offer EMI options for orders above ₹3000. During checkout, select the EMI option to view available EMI plans from your bank.",
      },
      {
        q: "Do you accept international payments?",
        a: "Currently, we only ship within India and accept payments in INR. We're working on expanding internationally soon!",
      },
      {
        q: "What happens if my payment fails?",
        a: "If your payment fails, no amount will be deducted from your account. If money was deducted but order wasn't placed, it will be automatically refunded within 5-7 business days.",
      },
    ],
  },
];

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("shipping");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const currentCategory = faqCategories.find((c) => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        {/* Hero */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 gradient-dark" />
          <div className="container mx-auto relative z-10 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase bg-primary/20 text-primary rounded-full"
            >
              Help Center
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Frequently Asked <span className="text-gradient-gold">Questions</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Find answers to common questions about shipping, returns, sizing, and payments.
            </motion.p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Category Tabs */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 space-y-2">
                  {faqCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          setActiveCategory(category.id);
                          setOpenQuestion(null);
                        }}
                        className={`w-full flex items-center gap-3 p-4 rounded-lg text-left transition-all ${
                          activeCategory === category.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-card hover:bg-card/80 text-foreground"
                        }`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{category.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Questions */}
              <div className="lg:col-span-3 space-y-4">
                <AnimatePresence mode="wait">
                  {currentCategory && (
                    <motion.div
                      key={activeCategory}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      {currentCategory.questions.map((item, index) => (
                        <div
                          key={index}
                          className="border border-border rounded-lg overflow-hidden"
                        >
                          <button
                            onClick={() =>
                              setOpenQuestion(openQuestion === `${activeCategory}-${index}` ? null : `${activeCategory}-${index}`)
                            }
                            className="w-full flex items-center justify-between p-5 text-left bg-card hover:bg-card/80 transition-colors"
                          >
                            <span className="font-medium pr-4">{item.q}</span>
                            <ChevronDown
                              size={20}
                              className={`flex-shrink-0 transition-transform ${
                                openQuestion === `${activeCategory}-${index}` ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {openQuestion === `${activeCategory}-${index}` && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <p className="p-5 pt-0 text-muted-foreground leading-relaxed">
                                  {item.a}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
              Still have questions?
            </h2>
            <p className="text-muted-foreground mb-8">
              Our support team is here to help you 7 days a week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn-royal rounded-lg inline-flex items-center justify-center"
              >
                Contact Us
              </a>
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold rounded-lg inline-flex items-center justify-center"
              >
                WhatsApp Support
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
