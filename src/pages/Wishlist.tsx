import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { Heart, ShoppingBag, X, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item: typeof items[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      size: "M", // Default size
      color: "Violet", // Default color
      quantity: 1,
    });
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 md:pt-24">
          <div className="container mx-auto py-16 md:py-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto"
            >
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-card flex items-center justify-center">
                <Heart size={40} className="text-muted-foreground" />
              </div>
              <h1 className="font-heading text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
              <p className="text-muted-foreground mb-8">
                Save your favorite items here so you can easily find them later. Start exploring our collection!
              </p>
              <Link to="/collections/men" className="btn-royal rounded-lg inline-flex items-center gap-2">
                Explore Collection <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="container mx-auto py-8 md:py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold">My Wishlist</h1>
            <p className="text-muted-foreground mt-2">{items.length} items saved</p>
          </div>

          {/* Wishlist Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-card rounded-xl overflow-hidden border border-border"
              >
                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 z-10 p-2 bg-background/80 rounded-full text-muted-foreground hover:text-destructive hover:bg-background transition-all"
                >
                  <X size={16} />
                </button>

                {/* Image */}
                <Link to={`/product/${item.id}`} className="block aspect-[3/4] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Info */}
                <div className="p-4">
                  <Link
                    to={`/product/${item.id}`}
                    className="font-medium text-foreground hover:text-accent transition-colors line-clamp-2 text-sm"
                  >
                    {item.name}
                  </Link>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-semibold text-foreground">
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        ₹{item.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="mt-3 w-full py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={16} />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
