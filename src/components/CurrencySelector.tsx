"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { currencies, CurrencyCode } from "@/lib/currency";

export default function CurrencySelector() {
  const { currency, setCurrency, currencyInfo } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center gap-1 px-3 py-2 min-h-[44px] rounded-lg hover:bg-brand-cream transition-colors text-sm font-medium text-brand-brown"
      >
        <span>{currencyInfo.flag}</span>
        <span>{currency}</span>
        <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-brand-gold/20 overflow-hidden z-50">
          {(Object.keys(currencies) as CurrencyCode[]).map((code) => {
            const c = currencies[code];
            return (
              <button
                key={code}
                onClick={() => {
                  setCurrency(code);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-brand-cream transition-colors ${
                  currency === code
                    ? "bg-brand-cream font-semibold text-brand-red"
                    : "text-brand-brown"
                }`}
              >
                <span>{c.flag}</span>
                <span>{c.code}</span>
                <span className="text-brand-brown-light text-xs ml-auto">
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
