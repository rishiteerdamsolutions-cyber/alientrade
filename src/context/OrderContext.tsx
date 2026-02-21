"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export interface OrderItem {
  productName: string;
  weight: number;
  quantity: number;
  priceINR: number;
}

export interface OrderDetails {
  orderId: string;
  paymentId: string;
  amountINR: number;
  items: OrderItem[];
  paymentStatus: "confirmed" | "pending";
}

interface OrderContextType {
  lastOrder: OrderDetails | null;
  setLastOrder: (order: OrderDetails | null) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);

  return (
    <OrderContext.Provider value={{ lastOrder, setLastOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within OrderProvider");
  return ctx;
}
