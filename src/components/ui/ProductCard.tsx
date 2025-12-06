import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Eye } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  secondaryImage?: string;
  badge?: string;
  isNew?: boolean;
}

export const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  secondaryImage,
  badge,
  isNew,
}: ProductCardProps) => {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const inWishlist = isInWishlist(id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({ id, name, price, originalPrice, image, secondaryImage });
    toast({
      title: inWishlist ? "Removed from Wishlist" : "Added to Wishlist",
      description: inWishlist ? `${name} removed from your wishlist.` : `${name} saved to your wishlist.`,
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id,
      name,
      price,
      originalPrice,
      image,
      size: "M",
      color: "Violet",
      quantity: 1,
    });
    toast({
      title: "Added to Cart",
      description: `${name} has been added to your cart.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group product-card"
    >
      <Link to={`/product/${id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          <img
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover product-image-primary transition-opacity duration-500"
          />
          {secondaryImage && (
            <img
              src={secondaryImage}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover product-image-secondary opacity-0 transition-opacity duration-500"
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-primary text-primary-foreground rounded">
                New
              </span>
            )}
            {badge && (
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-accent text-accent-foreground rounded">
                {badge}
              </span>
            )}
            {discount > 0 && (
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-destructive text-destructive-foreground rounded">
                -{discount}%
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleWishlistClick}
              className={`p-2 bg-background/90 rounded-lg transition-colors ${
                inWishlist ? "text-destructive" : "text-foreground hover:text-primary"
              }`}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart size={18} className={inWishlist ? "fill-current" : ""} />
            </button>
            <button
              className="p-2 bg-background/90 rounded-lg text-foreground hover:text-primary transition-colors"
              aria-label="Quick view"
            >
              <Eye size={18} />
            </button>
          </div>

          {/* Add to Cart Button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button 
              onClick={handleAddToCart}
              className="w-full py-3 bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider rounded hover:bg-primary/90 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-medium text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-foreground">₹{price.toLocaleString("en-IN")}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
