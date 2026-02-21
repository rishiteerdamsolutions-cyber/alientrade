"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  CurrencyCode,
  CurrencyInfo,
  currencies,
  formatPrice,
  convertPrice,
  detectCurrency,
} from "@/lib/currency";

interface CurrencyContextType {
  currency: CurrencyCode;
  currencyInfo: CurrencyInfo;
  setCurrency: (code: CurrencyCode) => void;
  format: (amountINR: number) => string;
  convert: (amountINR: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  useEffect(() => {
    setCurrency(detectCurrency());
  }, []);

  const value: CurrencyContextType = {
    currency,
    currencyInfo: currencies[currency],
    setCurrency,
    format: (amountINR: number) => formatPrice(amountINR, currency),
    convert: (amountINR: number) => convertPrice(amountINR, currency),
  };

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
