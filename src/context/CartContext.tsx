"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export interface CartItem {
  productId: string;
  productName: string;
  weight: number;
  priceINR: number;
  quantity: number;
  isSubscription?: boolean;
  subscriptionPlanId?: string;
  subscriptionType?: "single" | "combo";
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string, weight: number) => void;
  updateQuantity: (productId: string, weight: number, quantity: number) => void;
  clearCart: () => void;
  totalINR: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((newItem: Omit<CartItem, "quantity">, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.productId === newItem.productId &&
          i.weight === newItem.weight &&
          i.isSubscription === newItem.isSubscription &&
          i.subscriptionPlanId === newItem.subscriptionPlanId
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === newItem.productId &&
          i.weight === newItem.weight &&
          i.isSubscription === newItem.isSubscription &&
          i.subscriptionPlanId === newItem.subscriptionPlanId
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }
      return [...prev, { ...newItem, quantity: qty }];
    });
  }, []);

  const removeItem = useCallback((productId: string, weight: number) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.weight === weight))
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, weight: number, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, weight);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId && i.weight === weight
            ? { ...i, quantity }
            : i
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalINR = items.reduce(
    (sum, item) => sum + item.priceINR * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalINR, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
