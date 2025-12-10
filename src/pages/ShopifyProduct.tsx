import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Minus, Plus, ShoppingBag, Truck, RotateCcw, Shield } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchProductByHandle, formatPrice, ShopifyProduct, CartItem } from "@/lib/shopify";
import { useShopifyCartStore } from "@/stores/shopifyCartStore";
import { toast } from "sonner";

const ShopifyProductPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  
  const addItem = useShopifyCartStore((state) => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      setLoading(true);
      const data = await fetchProductByHandle(handle);
      setProduct(data);
      setLoading(false);
    };
    loadProduct();
  }, [handle]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const variant = product.variants.edges[selectedVariant]?.node;
    if (!variant) {
      toast.error("Please select a variant");
      return;
    }

    const cartItem: CartItem = {
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      selectedOptions: variant.selectedOptions || [],
    };

    addItem(cartItem);
    toast.success("Added to cart", {
      description: `${product.title} x ${quantity}`,
      position: "top-center",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <h1 className="text-2xl font-heading font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentVariant = product.variants.edges[selectedVariant]?.node;
  const price = currentVariant?.price || product.priceRange.minVariantPrice;
  const compareAtPrice = currentVariant?.compareAtPrice;
  const hasDiscount = compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount);
  const images = product.images.edges;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ChevronLeft size={16} />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-card">
              {images[selectedImage]?.node && (
                <img
                  src={images[selectedImage].node.url}
                  alt={images[selectedImage].node.altText || product.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img
                      src={image.node.url}
                      alt={image.node.altText || `${product.title} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(price.amount, price.currencyCode)}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
                  </span>
                )}
              </div>
            </div>

            {/* Options */}
            {product.options.map((option, optionIndex) => (
              <div key={option.name} className="space-y-3">
                <h3 className="font-medium">{option.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value, valueIndex) => {
                    const variantIndex = product.variants.edges.findIndex(
                      v => v.node.selectedOptions.some(
                        opt => opt.name === option.name && opt.value === value
                      )
                    );
                    const isSelected = product.variants.edges[selectedVariant]?.node.selectedOptions.some(
                      opt => opt.name === option.name && opt.value === value
                    );
                    
                    return (
                      <Button
                        key={value}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => variantIndex >= 0 && setSelectedVariant(variantIndex)}
                        className={isSelected ? "btn-royal" : ""}
                      >
                        {value}
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="font-medium">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={16} />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4">
              <Button 
                onClick={handleAddToCart} 
                className="flex-1 btn-royal" 
                size="lg"
                disabled={!currentVariant?.availableForSale}
              >
                <ShoppingBag size={20} className="mr-2" />
                {currentVariant?.availableForSale ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-accent" />
                <p className="text-xs text-muted-foreground">Free Shipping over ₹999</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-accent" />
                <p className="text-xs text-muted-foreground">7-Day Easy Returns</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-accent" />
                <p className="text-xs text-muted-foreground">Secure Payment</p>
              </div>
            </div>

            {/* Description Tabs */}
            <Tabs defaultValue="description" className="pt-6">
              <TabsList className="w-full">
                <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
                <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                <TabsTrigger value="shipping" className="flex-1">Shipping</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-4">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description || "No description available."}
                </p>
              </TabsContent>
              <TabsContent value="details" className="pt-4">
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Premium quality fabric</li>
                  <li>• Made for Indian weather</li>
                  <li>• Machine washable</li>
                </ul>
              </TabsContent>
              <TabsContent value="shipping" className="pt-4">
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Free shipping on orders above ₹999</li>
                  <li>• Delivery within 3-7 business days</li>
                  <li>• Cash on Delivery available</li>
                </ul>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShopifyProductPage;
