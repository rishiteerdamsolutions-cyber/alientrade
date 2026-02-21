"use client";

import { CurrencyProvider } from "@/context/CurrencyContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CurrencyProvider>
      <CartProvider>
        <OrderProvider>{children}</OrderProvider>
      </CartProvider>
    </CurrencyProvider>
  );
}
