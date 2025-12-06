import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, X, ShoppingBag, Truck, Shield, ArrowRight } from "lucide-react";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  const shippingThreshold = 999;
  const freeShipping = totalPrice >= shippingThreshold;
  const amountToFreeShipping = shippingThreshold - totalPrice;
  const shippingCost = freeShipping ? 0 : 79;
  const finalTotal = totalPrice + shippingCost;

  const handleCheckout = () => {
    // Shopify checkout integration placeholder
    alert("Redirecting to Shopify Checkout...\n\nTo enable real checkout, please connect your Shopify store.");
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
                <ShoppingBag size={40} className="text-muted-foreground" />
              </div>
              <h1 className="font-heading text-3xl font-bold mb-4">Your Cart is Empty</h1>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added anything to your cart yet. Explore our collection and find something you love!
              </p>
              <Link to="/collections/men" className="btn-royal rounded-lg inline-flex items-center gap-2">
                Start Shopping <ArrowRight size={18} />
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
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold">Shopping Cart</h1>
            <button
              onClick={clearCart}
              className="text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              Clear Cart
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={`${item.id}-${item.size}-${item.color}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 md:gap-6 p-4 md:p-6 bg-card rounded-xl border border-border"
                >
                  {/* Image */}
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-32 md:w-32 md:h-40 object-cover rounded-lg"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4">
                      <div>
                        <Link
                          to={`/product/${item.id}`}
                          className="font-medium text-foreground hover:text-accent transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                          <p>Size: {item.size}</p>
                          <p>Color: {item.color}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        className="p-2 h-fit text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {/* Price & Quantity */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                          className="p-2 hover:bg-secondary transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                          className="p-2 hover:bg-secondary transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                        {item.originalPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            ₹{(item.originalPrice * item.quantity).toLocaleString("en-IN")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                <div className="p-6 bg-card rounded-xl border border-border">
                  <h2 className="font-heading text-xl font-bold mb-6">Order Summary</h2>

                  {/* Free Shipping Progress */}
                  {!freeShipping && (
                    <div className="mb-6 p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-foreground mb-2">
                        Add <span className="font-semibold text-accent">₹{amountToFreeShipping.toLocaleString("en-IN")}</span> more for free shipping!
                      </p>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${(totalPrice / shippingThreshold) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">₹{totalPrice.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className={freeShipping ? "text-green-500 font-medium" : "font-medium"}>
                        {freeShipping ? "FREE" : `₹${shippingCost}`}
                      </span>
                    </div>
                    <div className="border-t border-border pt-4 flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="text-xl font-bold text-foreground">
                        ₹{finalTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full btn-royal rounded-lg flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout <ArrowRight size={18} />
                  </button>

                  <p className="mt-4 text-xs text-center text-muted-foreground">
                    Taxes calculated at checkout
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                    <Truck className="text-primary" size={20} />
                    <div className="text-xs">
                      <p className="font-medium">Free Shipping</p>
                      <p className="text-muted-foreground">Over ₹999</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                    <Shield className="text-primary" size={20} />
                    <div className="text-xs">
                      <p className="font-medium">COD Available</p>
                      <p className="text-muted-foreground">Pay on delivery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
