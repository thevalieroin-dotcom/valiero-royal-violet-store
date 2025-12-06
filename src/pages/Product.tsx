import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "@/hooks/use-toast";
import {
  Heart,
  Share2,
  Truck,
  RotateCcw,
  Shield,
  Star,
  Minus,
  Plus,
  Check,
  ChevronDown,
} from "lucide-react";

const productData = {
  id: "1",
  name: "Royal Violet Oversized Tee",
  price: 1499,
  originalPrice: 1999,
  images: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&q=80",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
  ],
  sizes: ["S", "M", "L", "XL", "XXL"],
  colors: [
    { name: "Violet", hex: "#6B4E9E" },
    { name: "Black", hex: "#1a1a1a" },
    { name: "Charcoal", hex: "#36454F" },
  ],
  stock: 12,
  rating: 4.8,
  reviewCount: 156,
  description:
    "Embrace the royal lifestyle with our signature oversized tee. Crafted from premium 220 GSM cotton, this piece combines street style with luxury comfort. The relaxed fit and dropped shoulders create that effortless cool look that defines modern Indian fashion.",
  features: [
    "Premium 220 GSM 100% cotton",
    "Made for Indian weather",
    "Pre-shrunk fabric",
    "Relaxed oversized fit",
    "Ribbed neckline",
  ],
  care: [
    "Machine wash cold",
    "Do not bleach",
    "Tumble dry low",
    "Iron on medium heat",
  ],
  sizeGuide: {
    S: { chest: "42", length: "28", shoulder: "22" },
    M: { chest: "44", length: "29", shoulder: "23" },
    L: { chest: "46", length: "30", shoulder: "24" },
    XL: { chest: "48", length: "31", shoulder: "25" },
    XXL: { chest: "50", length: "32", shoulder: "26" },
  },
};

const reviews = [
  {
    id: 1,
    name: "Vikram K.",
    location: "Mumbai",
    rating: 5,
    date: "2 weeks ago",
    text: "Best quality tee I've ever bought! The fabric is so soft and the fit is perfect. Ordered L and it's exactly the oversized look I wanted.",
    verified: true,
  },
  {
    id: 2,
    name: "Sneha M.",
    location: "Pune",
    rating: 5,
    date: "1 month ago",
    text: "The violet color is absolutely stunning in person. Got so many compliments. Already ordered 2 more!",
    verified: true,
  },
  {
    id: 3,
    name: "Aryan S.",
    location: "Delhi",
    rating: 4,
    date: "1 month ago",
    text: "Great quality and fast delivery. The only thing is I wish there were more color options. But overall very happy with the purchase.",
    verified: true,
  },
];

const Product = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "care" | "size">("description");
  const [isZoomed, setIsZoomed] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(productData.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose your preferred size before adding to cart.",
        variant: "destructive",
      });
      return;
    }
    addToCart({
      id: productData.id,
      name: productData.name,
      price: productData.price,
      originalPrice: productData.originalPrice,
      image: productData.images[0],
      size: selectedSize,
      color: selectedColor.name,
      quantity,
    });
    toast({
      title: "Added to Cart",
      description: `${productData.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose your preferred size before proceeding.",
        variant: "destructive",
      });
      return;
    }
    handleAddToCart();
    window.location.href = "/cart";
  };

  const handleWishlist = () => {
    toggleWishlist({
      id: productData.id,
      name: productData.name,
      price: productData.price,
      originalPrice: productData.originalPrice,
      image: productData.images[0],
    });
    toast({
      title: inWishlist ? "Removed from Wishlist" : "Added to Wishlist",
      description: inWishlist
        ? `${productData.name} removed from your wishlist.`
        : `${productData.name} saved to your wishlist.`,
    });
  };

  const discount = Math.round(
    ((productData.originalPrice - productData.price) / productData.originalPrice) * 100
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        {/* Breadcrumb */}
        <div className="container mx-auto py-4">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/collections/men" className="hover:text-foreground">
              Men
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{productData.name}</span>
          </nav>
        </div>

        {/* Product Section */}
        <section className="container mx-auto pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-secondary cursor-zoom-in"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={productData.images[selectedImage]}
                  alt={productData.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    isZoomed ? "scale-150" : "scale-100"
                  }`}
                />
                {discount > 0 && (
                  <span className="absolute top-4 left-4 px-3 py-1.5 bg-destructive text-destructive-foreground text-sm font-semibold rounded">
                    -{discount}% OFF
                  </span>
                )}
              </motion.div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {productData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-28 lg:self-start space-y-6">
              {/* Title & Price */}
              <div>
                <span className="text-accent text-sm font-medium uppercase tracking-wider">
                  New Arrival
                </span>
                <h1 className="font-heading text-3xl md:text-4xl font-bold mt-2 mb-4">
                  {productData.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < Math.floor(productData.rating)
                            ? "fill-accent text-accent"
                            : "text-muted-foreground"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {productData.rating} ({productData.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-foreground">
                    ₹{productData.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{productData.originalPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-500 text-sm font-medium rounded">
                    Save ₹{(productData.originalPrice - productData.price).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-sm font-medium mb-3">
                  Color: <span className="text-muted-foreground">{selectedColor.name}</span>
                </h3>
                <div className="flex gap-3">
                  {productData.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor.name === color.name
                          ? "border-primary scale-110"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">
                    Size: <span className="text-muted-foreground">{selectedSize || "Select size"}</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab("size")}
                    className="text-sm text-accent hover:underline"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {productData.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-12 rounded-lg border font-medium transition-all ${
                        selectedSize === size
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-green-500 font-medium">In stock</span>
                <span className="text-muted-foreground">
                  — Only {productData.stock} pieces left!
                </span>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-card transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-card transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <button onClick={handleAddToCart} className="flex-1 btn-royal rounded-lg">Add to Cart</button>
                <button 
                  onClick={handleWishlist}
                  className={`p-4 border rounded-lg transition-colors ${
                    inWishlist 
                      ? "border-destructive text-destructive" 
                      : "border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  <Heart size={20} className={inWishlist ? "fill-current" : ""} />
                </button>
              </div>

              {/* Buy Now */}
              <button onClick={handleBuyNow} className="w-full btn-outline-gold rounded-lg">Buy Now</button>

              {/* Trust Features */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="text-primary" size={20} />
                  <div>
                    <div className="font-medium">Free Shipping</div>
                    <div className="text-muted-foreground text-xs">On orders above ₹999</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RotateCcw className="text-primary" size={20} />
                  <div>
                    <div className="font-medium">Easy Returns</div>
                    <div className="text-muted-foreground text-xs">7-day return policy</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="text-primary" size={20} />
                  <div>
                    <div className="font-medium">COD Available</div>
                    <div className="text-muted-foreground text-xs">Cash on Delivery</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Check className="text-primary" size={20} />
                  <div>
                    <div className="font-medium">Premium Quality</div>
                    <div className="text-muted-foreground text-xs">Made for Indian weather</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Tabs */}
        <section className="border-t border-border bg-card/50 py-12 md:py-16">
          <div className="container mx-auto">
            {/* Tabs */}
            <div className="flex gap-8 border-b border-border mb-8">
              {[
                { id: "description", label: "Description" },
                { id: "care", label: "Material & Care" },
                { id: "size", label: "Size Guide" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`pb-4 text-sm font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="max-w-3xl">
              {activeTab === "description" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <p className="text-foreground/80 leading-relaxed">{productData.description}</p>
                  <div>
                    <h4 className="font-semibold mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {productData.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-foreground/80">
                          <Check className="text-primary" size={16} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === "care" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h4 className="font-semibold">Care Instructions</h4>
                  <ul className="space-y-2">
                    {productData.care.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-foreground/80">
                        <Check className="text-primary" size={16} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activeTab === "size" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-sm text-muted-foreground mb-4">
                    All measurements are in inches. For the best fit, measure your body and compare with the chart below.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 pr-6 font-semibold">Size</th>
                          <th className="text-left py-3 pr-6 font-semibold">Chest</th>
                          <th className="text-left py-3 pr-6 font-semibold">Length</th>
                          <th className="text-left py-3 font-semibold">Shoulder</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(productData.sizeGuide).map(([size, measurements]) => (
                          <tr key={size} className="border-b border-border/50">
                            <td className="py-3 pr-6 font-medium">{size}</td>
                            <td className="py-3 pr-6 text-muted-foreground">{measurements.chest}"</td>
                            <td className="py-3 pr-6 text-muted-foreground">{measurements.length}"</td>
                            <td className="py-3 text-muted-foreground">{measurements.shoulder}"</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-2xl md:text-3xl font-bold">Customer Reviews</h2>
              <button className="btn-outline-gold rounded-lg text-sm py-2 px-4">Write a Review</button>
            </div>

            {/* Reviews Summary */}
            <div className="flex flex-col md:flex-row gap-8 mb-12 p-6 bg-card rounded-2xl">
              <div className="text-center md:border-r border-border md:pr-8">
                <div className="text-5xl font-bold text-foreground mb-2">{productData.rating}</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="fill-accent text-accent" size={18} />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  Based on {productData.reviewCount} reviews
                </div>
              </div>
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-sm w-6">{stars}★</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full"
                        style={{ width: `${stars === 5 ? 75 : stars === 4 ? 20 : 5}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="p-6 bg-card rounded-xl border border-border">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{review.name}</span>
                        {review.verified && (
                          <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-500 rounded">
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {review.location} • {review.date}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="fill-accent text-accent" size={14} />
                      ))}
                    </div>
                  </div>
                  <p className="text-foreground/80">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Product;
