import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { ShopifyProduct, fetchProducts } from "@/lib/shopify";
import { ShopifyProductCard } from "./ShopifyProductCard";
import { Skeleton } from "@/components/ui/skeleton";

interface ShopifyProductGridProps {
  title: string;
  subtitle?: string;
  query?: string;
  limit?: number;
}

export const ShopifyProductGrid = ({ 
  title, 
  subtitle, 
  query,
  limit = 8 
}: ShopifyProductGridProps) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts(limit, query);
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, [limit, query]);

  if (loading) {
    return (
      <section className="py-20 md:py-28">
        <div className="container mx-auto">
          <div className="mb-12">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-10 w-48" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-20 md:py-28">
        <div className="container mx-auto">
          <div className="mb-12">
            {subtitle && (
              <span className="text-accent text-sm font-medium uppercase tracking-widest mb-2 block">
                {subtitle}
              </span>
            )}
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
              {title}
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
              <Package className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-2">No Products Found</h3>
            <p className="text-muted-foreground max-w-md">
              Products will appear here once they're added to your Shopify store. 
              Tell me what product you'd like to create and I'll add it for you!
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {subtitle && (
            <span className="text-accent text-sm font-medium uppercase tracking-widest mb-2 block">
              {subtitle}
            </span>
          )}
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
            {title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <ShopifyProductCard key={product.node.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
