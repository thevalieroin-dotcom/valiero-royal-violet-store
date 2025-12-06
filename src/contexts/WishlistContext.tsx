import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  secondaryImage?: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (item: WishlistItem) => void;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load wishlist from localStorage or database
  useEffect(() => {
    if (user) {
      loadWishlistFromDb();
    } else {
      const saved = localStorage.getItem("valiero-wishlist");
      setItems(saved ? JSON.parse(saved) : []);
    }
  }, [user]);

  // Save to localStorage when not logged in
  useEffect(() => {
    if (!user) {
      localStorage.setItem("valiero-wishlist", JSON.stringify(items));
    }
  }, [items, user]);

  const loadWishlistFromDb = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("user_wishlist")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;

      const wishlistItems: WishlistItem[] = (data || []).map((item) => ({
        id: item.product_id,
        name: item.product_name,
        price: item.product_price,
        originalPrice: item.product_original_price || undefined,
        image: item.product_image,
        secondaryImage: item.secondary_image || undefined,
      }));

      // Merge localStorage wishlist into database on login
      const localWishlist = localStorage.getItem("valiero-wishlist");
      if (localWishlist) {
        const localItems: WishlistItem[] = JSON.parse(localWishlist);
        for (const localItem of localItems) {
          const exists = wishlistItems.find((i) => i.id === localItem.id);
          if (!exists) {
            wishlistItems.push(localItem);
            await saveItemToDb(localItem);
          }
        }
        localStorage.removeItem("valiero-wishlist");
      }

      setItems(wishlistItems);
    } catch (error) {
      console.error("Error loading wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveItemToDb = async (item: WishlistItem) => {
    if (!user) return;
    await supabase.from("user_wishlist").upsert({
      user_id: user.id,
      product_id: item.id,
      product_name: item.name,
      product_price: item.price,
      product_original_price: item.originalPrice || null,
      product_image: item.image,
      secondary_image: item.secondaryImage || null,
    }, { onConflict: "user_id,product_id" });
  };

  const addToWishlist = async (item: WishlistItem) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      if (user) saveItemToDb(item);
      return [...prev, item];
    });
  };

  const removeFromWishlist = async (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (user) {
      await supabase.from("user_wishlist").delete().eq("user_id", user.id).eq("product_id", id);
    }
  };

  const isInWishlist = (id: string) => items.some((i) => i.id === id);

  const toggleWishlist = (item: WishlistItem) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ items, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist, loading }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};
