import { ShopifyProductGrid } from "@/components/shopify/ShopifyProductGrid";

export const BestSellers = () => {
  return (
    <div className="bg-card/50">
      <ShopifyProductGrid 
        title="Best Sellers" 
        subtitle="Top Picks in India"
        limit={4}
      />
    </div>
  );
};
