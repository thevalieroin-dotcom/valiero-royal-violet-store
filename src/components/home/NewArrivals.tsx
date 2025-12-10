import { ShopifyProductGrid } from "@/components/shopify/ShopifyProductGrid";

export const NewArrivals = () => {
  return (
    <ShopifyProductGrid 
      title="New Arrivals" 
      subtitle="Fresh Drops"
      limit={4}
    />
  );
};
