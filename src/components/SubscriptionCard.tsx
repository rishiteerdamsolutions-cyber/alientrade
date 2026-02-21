"use client";

import { motion } from "framer-motion";
import { SubscriptionPlan } from "@/data/products";

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
  formatPrice: (amount: number) => string;
  onSelectOneTime: (productId: string) => void;
  onSelectCombo: () => void;
}

export default function SubscriptionCard({
  plan,
  formatPrice,
  onSelectOneTime,
  onSelectCombo,
}: SubscriptionCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`relative rounded-2xl border-2 bg-white p-6 ${
        plan.popular
          ? "border-brand-red shadow-lg"
          : "border-brand-brown/20"
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-red px-3 py-0.5 text-xs font-bold text-white">
          Most Popular
        </span>
      )}
      <h3 className="text-xl font-bold text-brand-brown">{plan.name}</h3>
      <p className="mt-1 text-sm text-brand-brown-light">{plan.duration}</p>
      <p className="mt-2 text-sm text-brand-brown">
        {plan.id === "yearly" ? "Chilli 5kg / Turmeric 3kg" : `${plan.weightKg}kg per product`} • {plan.frequency}
      </p>
      <p className="mt-2 text-xs text-brand-green font-medium">{plan.savings}</p>

      <div className="mt-4 space-y-2">
        <p className="text-sm font-medium text-brand-brown">Single product</p>
        <div className="flex gap-2">
          <button
            onClick={() => onSelectOneTime("red-chilli-powder")}
            className="flex-1 rounded-lg bg-brand-red/10 px-3 py-2 text-sm font-medium text-brand-red hover:bg-brand-red/20"
          >
            Chilli {formatPrice(plan.priceChilliINR)}
          </button>
          <button
            onClick={() => onSelectOneTime("turmeric-powder")}
            className="flex-1 rounded-lg bg-brand-gold/20 px-3 py-2 text-sm font-medium text-brand-brown hover:bg-brand-gold/30"
          >
            Turmeric {formatPrice(plan.priceTurmericINR)}
          </button>
        </div>
      </div>

      <div className="mt-4 border-t border-brand-brown/10 pt-4">
        <p className="text-sm font-medium text-brand-brown">Combo (both)</p>
        <p className="text-lg font-bold text-brand-red">
          {formatPrice(plan.comboPriceINR)}
        </p>
        <button
          onClick={onSelectCombo}
          className="mt-2 w-full rounded-lg bg-brand-red px-4 py-2 font-medium text-white hover:bg-brand-red-light transition-colors"
        >
          Add Combo
        </button>
      </div>
    </motion.div>
  );
}
