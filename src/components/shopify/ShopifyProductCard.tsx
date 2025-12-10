import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShopifyProduct, formatPrice, CartItem } from "@/lib/shopify";
import { useShopifyCartStore } from "@/stores/shopifyCartStore";
import { toast } from "sonner";

interface ShopifyProductCardProps {
  product: ShopifyProduct;
  index?: number;
}

export const ShopifyProductCard = ({ product, index = 0 }: ShopifyProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useShopifyCartStore((state) => state.addItem);
  
  const { node } = product;
  const primaryImage = node.images.edges[0]?.node.url;
  const secondaryImage = node.images.edges[1]?.node.url;
  const price = node.priceRange.minVariantPrice;
  const compareAtPrice = node.compareAtPriceRange?.minVariantPrice;
  const hasDiscount = compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount);
  const firstVariant = node.variants.edges[0]?.node;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) {
      toast.error("Product variant not available");
      return;
    }

    const cartItem: CartItem = {
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    };

    addItem(cartItem);
    toast.success("Added to cart", {
      description: node.title,
      position: "top-center",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${node.handle}`} className="block">
        <div className="product-card">
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden bg-secondary/20">
            {primaryImage && (
              <img
                src={primaryImage}
                alt={node.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isHovered && secondaryImage ? "opacity-0" : "opacity-100"
                }`}
              />
            )}
            {secondaryImage && (
              <img
                src={secondaryImage}
                alt={`${node.title} - alternate view`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
            
            {/* Badges */}
            {hasDiscount && (
              <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-1 text-xs font-medium rounded">
                Sale
              </div>
            )}
            
            {/* Quick Actions */}
            <div
              className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
                isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
              }`}
            >
              <Button
                variant="secondary"
                size="icon"
                className="h-9 w-9 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background"
              >
                <Heart size={18} />
              </Button>
            </div>
            
            {/* Add to Cart Button */}
            <div
              className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Button
                onClick={handleAddToCart}
                className="w-full btn-royal text-sm"
                size="sm"
              >
                <ShoppingBag size={16} className="mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
          
          {/* Product Info */}
          <div className="p-4">
            <h3 className="font-medium text-sm md:text-base line-clamp-2 group-hover:text-accent transition-colors">
              {node.title}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-bold text-primary">
                {formatPrice(price.amount, price.currencyCode)}
              </span>
              {hasDiscount && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
