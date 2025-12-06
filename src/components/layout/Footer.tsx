import { Link } from "react-router-dom";
import { Instagram, Youtube, Twitter, Mail } from "lucide-react";
import { useState } from "react";

const footerLinks = {
  shop: [
    { name: "Men", path: "/collections/men" },
    { name: "Women", path: "/collections/women" },
    { name: "Streetwear", path: "/collections/streetwear" },
    { name: "New Arrivals", path: "/collections/new" },
  ],
  help: [
    { name: "FAQs", path: "/faq" },
    { name: "Shipping Policy", path: "/faq" },
    { name: "Return Policy", path: "/faq" },
    { name: "Track Order", path: "/faq" },
  ],
  company: [
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
  ],
};

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail("");
  };

  return (
    <footer className="bg-card border-t border-border">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="container mx-auto py-12 md:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-heading text-2xl md:text-3xl font-semibold mb-3">
              Join the <span className="text-gradient-gold">Royal Club</span>
            </h3>
            <p className="text-muted-foreground mb-6">
              Get exclusive access to new drops, offers & behind-the-scenes content.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                required
              />
              <button type="submit" className="btn-royal rounded-lg text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="font-heading text-2xl font-bold text-gradient-gold">VALIERO</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              Premium streetwear for the modern Indian youth. Wear your royalty.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-background rounded-lg text-foreground/70 hover:text-accent hover:bg-accent/10 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-background rounded-lg text-foreground/70 hover:text-accent hover:bg-accent/10 transition-colors"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-background rounded-lg text-foreground/70 hover:text-accent hover:bg-accent/10 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="mailto:hello@valiero.in"
                className="p-2 bg-background rounded-lg text-foreground/70 hover:text-accent hover:bg-accent/10 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 uppercase text-sm tracking-wider">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground text-sm hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 uppercase text-sm tracking-wider">Help</h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground text-sm hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 uppercase text-sm tracking-wider">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground text-sm hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2024 Valiero. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Secure Payments
              </span>
              <span>Made in India 🇮🇳</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
