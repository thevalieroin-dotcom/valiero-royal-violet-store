import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { ChevronDown, Grid, LayoutGrid, SlidersHorizontal, X } from "lucide-react";

const allProducts = [
  {
    id: "1",
    name: "Royal Violet Oversized Tee",
    price: 1499,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&q=80",
    isNew: true,
    category: "men",
  },
  {
    id: "2",
    name: "Black Crown Hoodie",
    price: 2499,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&q=80",
    isNew: true,
    category: "streetwear",
  },
  {
    id: "3",
    name: "Empire Joggers - Charcoal",
    price: 1999,
    originalPrice: 2499,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
    badge: "Trending",
    category: "men",
  },
  {
    id: "4",
    name: "Gold Accent Bomber Jacket",
    price: 3999,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    isNew: true,
    category: "streetwear",
  },
  {
    id: "5",
    name: "Signature Logo Tee - Black",
    price: 1299,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
    badge: "Bestseller",
    category: "men",
  },
  {
    id: "6",
    name: "Premium Cotton Polo",
    price: 1799,
    originalPrice: 2199,
    image: "https://images.unsplash.com/photo-1625910513413-5fc33bfa00dd?w=800&q=80",
    category: "men",
  },
  {
    id: "7",
    name: "Streetwear Cargo Pants",
    price: 2299,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
    badge: "Hot",
    category: "streetwear",
  },
  {
    id: "8",
    name: "Classic Oversized Hoodie",
    price: 2199,
    originalPrice: 2799,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    badge: "Top Rated",
    category: "women",
  },
  {
    id: "9",
    name: "Cropped Violet Tee",
    price: 1199,
    image: "https://images.unsplash.com/photo-1485968579169-19d59de1ced6?w=800&q=80",
    isNew: true,
    category: "women",
  },
  {
    id: "10",
    name: "Women's Jogger Set",
    price: 2899,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    category: "women",
  },
  {
    id: "11",
    name: "Oversized Graphic Hoodie",
    price: 2699,
    image: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80",
    isNew: true,
    category: "streetwear",
  },
  {
    id: "12",
    name: "Minimal Logo Tank",
    price: 999,
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80",
    category: "women",
  },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = ["Black", "White", "Violet", "Charcoal", "Gold"];
const priceRanges = [
  { label: "Under ₹1,000", min: 0, max: 1000 },
  { label: "₹1,000 - ₹2,000", min: 1000, max: 2000 },
  { label: "₹2,000 - ₹3,000", min: 2000, max: 3000 },
  { label: "Above ₹3,000", min: 3000, max: 99999 },
];

const collectionInfo: Record<string, { title: string; description: string }> = {
  men: {
    title: "Men's Collection",
    description: "Premium streetwear designed for the modern Indian man",
  },
  women: {
    title: "Women's Collection",
    description: "Elegant and bold pieces for the confident woman",
  },
  streetwear: {
    title: "Streetwear Collection",
    description: "Oversized tees, hoodies, and sets that define the streets",
  },
  new: {
    title: "New Arrivals",
    description: "Fresh drops from the latest collection",
  },
  bestsellers: {
    title: "Best Sellers",
    description: "Top-rated products loved by customers across India",
  },
};

const Collection = () => {
  const { category = "men" } = useParams();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [gridCols, setGridCols] = useState(4);

  const info = collectionInfo[category] || collectionInfo.men;

  const filteredProducts =
    category === "new"
      ? allProducts.filter((p) => p.isNew)
      : category === "bestsellers"
      ? allProducts.filter((p) => p.badge === "Bestseller" || p.badge === "Top Rated")
      : allProducts.filter((p) => p.category === category);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        {/* Hero Banner */}
        <section className="py-12 md:py-20 text-center border-b border-border">
          <div className="container mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              {info.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg max-w-xl mx-auto"
            >
              {info.description}
            </motion.p>
          </div>
        </section>

        {/* Filters Bar */}
        <section className="sticky top-16 md:top-20 z-40 py-4 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <SlidersHorizontal size={18} />
                <span className="text-sm font-medium">Filters</span>
                {(selectedSizes.length > 0 || selectedColors.length > 0 || selectedPrice) && (
                  <span className="w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {selectedSizes.length + selectedColors.length + (selectedPrice ? 1 : 0)}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground hidden md:block">
                  {filteredProducts.length} products
                </span>
                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={() => setGridCols(3)}
                    className={`p-2 rounded ${gridCols === 3 ? "bg-primary text-primary-foreground" : "bg-card"}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setGridCols(4)}
                    className={`p-2 rounded ${gridCols === 4 ? "bg-primary text-primary-foreground" : "bg-card"}`}
                  >
                    <LayoutGrid size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-border"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Size Filter */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Size</h4>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => toggleSize(size)}
                          className={`px-3 py-1.5 text-sm rounded border transition-colors ${
                            selectedSizes.includes(size)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Filter */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Color</h4>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => toggleColor(color)}
                          className={`px-3 py-1.5 text-sm rounded border transition-colors ${
                            selectedColors.includes(color)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Price</h4>
                    <div className="flex flex-wrap gap-2">
                      {priceRanges.map((range) => (
                        <button
                          key={range.label}
                          onClick={() =>
                            setSelectedPrice(selectedPrice === range.label ? null : range.label)
                          }
                          className={`px-3 py-1.5 text-sm rounded border transition-colors ${
                            selectedPrice === range.label
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                {(selectedSizes.length > 0 || selectedColors.length > 0 || selectedPrice) && (
                  <button
                    onClick={() => {
                      setSelectedSizes([]);
                      setSelectedColors([]);
                      setSelectedPrice(null);
                    }}
                    className="mt-4 flex items-center gap-2 text-sm text-accent hover:text-accent/80"
                  >
                    <X size={16} />
                    Clear all filters
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto">
            <div
              className={`grid grid-cols-2 ${
                gridCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
              } gap-4 md:gap-6`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Collection;
