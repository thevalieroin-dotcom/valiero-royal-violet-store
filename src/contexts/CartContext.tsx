import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load cart from localStorage or database
  useEffect(() => {
    if (user) {
      loadCartFromDb();
    } else {
      const saved = localStorage.getItem("valiero-cart");
      setItems(saved ? JSON.parse(saved) : []);
    }
  }, [user]);

  // Save to localStorage when not logged in
  useEffect(() => {
    if (!user) {
      localStorage.setItem("valiero-cart", JSON.stringify(items));
    }
  }, [items, user]);

  const loadCartFromDb = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("user_cart")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;

      const cartItems: CartItem[] = (data || []).map((item) => ({
        id: item.product_id,
        name: item.product_name,
        price: item.product_price,
        originalPrice: item.product_original_price || undefined,
        image: item.product_image,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
      }));

      // Merge localStorage cart into database cart on login
      const localCart = localStorage.getItem("valiero-cart");
      if (localCart) {
        const localItems: CartItem[] = JSON.parse(localCart);
        for (const localItem of localItems) {
          const exists = cartItems.find(
            (i) => i.id === localItem.id && i.size === localItem.size && i.color === localItem.color
          );
          if (!exists) {
            cartItems.push(localItem);
            await saveItemToDb(localItem);
          }
        }
        localStorage.removeItem("valiero-cart");
      }

      setItems(cartItems);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveItemToDb = async (item: CartItem) => {
    if (!user) return;
    await supabase.from("user_cart").upsert({
      user_id: user.id,
      product_id: item.id,
      product_name: item.name,
      product_price: item.price,
      product_original_price: item.originalPrice || null,
      product_image: item.image,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
    }, { onConflict: "user_id,product_id,size,color" });
  };

  const addToCart = async (item: CartItem) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.id === item.id && i.size === item.size && i.color === item.color
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        if (user) saveItemToDb(updated[existingIndex]);
        return updated;
      }
      if (user) saveItemToDb(item);
      return [...prev, item];
    });
  };

  const removeFromCart = async (id: string, size: string, color: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size && i.color === color)));
    if (user) {
      await supabase
        .from("user_cart")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", id)
        .eq("size", size)
        .eq("color", color);
    }
  };

  const updateQuantity = async (id: string, size: string, color: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id, size, color);
      return;
    }
    setItems((prev) =>
      prev.map((i) => {
        if (i.id === id && i.size === size && i.color === color) {
          const updated = { ...i, quantity };
          if (user) saveItemToDb(updated);
          return updated;
        }
        return i;
      })
    );
  };

  const clearCart = async () => {
    setItems([]);
    if (user) {
      await supabase.from("user_cart").delete().eq("user_id", user.id);
    } else {
      localStorage.removeItem("valiero-cart");
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, loading }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
