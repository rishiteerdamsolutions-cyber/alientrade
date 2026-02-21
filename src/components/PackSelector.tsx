"use client";

import { PackSize } from "@/data/products";

interface PackSelectorProps {
  packSizes: PackSize[];
  selected: number;
  onSelect: (weight: number) => void;
  formatPrice: (amount: number) => string;
}

export default function PackSelector({
  packSizes,
  selected,
  onSelect,
  formatPrice,
}: PackSelectorProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-brand-brown">Select pack size</p>
      <div className="flex flex-wrap gap-2">
        {packSizes.map((pack) => (
          <button
            key={pack.weight}
            onClick={() => onSelect(pack.weight)}
            className={`rounded-lg border-2 px-4 py-2 min-h-[44px] text-sm font-medium transition-all ${
              selected === pack.weight
                ? "border-brand-red bg-brand-red/10 text-brand-red"
                : "border-brand-brown/20 text-brand-brown hover:border-brand-red/50"
            }`}
          >
            {pack.label} — {formatPrice(pack.priceINR)}
          </button>
        ))}
      </div>
    </div>
  );
}
