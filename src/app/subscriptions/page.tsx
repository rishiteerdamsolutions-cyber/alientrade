"use client";

import { subscriptionPlans } from "@/data/products";
import SubscriptionCard from "@/components/SubscriptionCard";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";

export default function SubscriptionsPage() {
  const { addItem } = useCart();
  const { format } = useCurrency();

  const handleSelectCombo = (planId: string) => {
    const plan = subscriptionPlans.find((p) => p.id === planId)!;
    addItem({
      productId: "combo",
      productName: "Chilli + Turmeric Combo",
      weight: plan.weightKg,
      priceINR: plan.comboPriceINR,
      isSubscription: true,
      subscriptionPlanId: plan.id,
      subscriptionType: "combo",
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-[max(2rem,calc(2rem+env(safe-area-inset-bottom)))]">
      <h1 className="text-3xl font-bold text-brand-brown mb-2">Subscription Packages</h1>
      <p className="text-brand-brown-light mb-10">
        Save more with our quarterly, half-yearly, and yearly packs. One-time or recurring.
      </p>
      <p className="text-sm text-brand-brown-light mb-8 -mt-4">
        Shipping charges extra as per market price and delivery location.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {subscriptionPlans.map((plan) => (
          <SubscriptionCard
            key={plan.id}
            plan={plan}
            formatPrice={format}
            onSelectOneTime={(productId) => {
              const isChilli = productId === "red-chilli-powder";
              const weight = isChilli ? plan.weightKg : Math.min(plan.weightKg, 3);
              const price = isChilli ? plan.priceChilliINR : plan.priceTurmericINR;
              addItem({
                productId,
                productName: isChilli ? "Red Chilli Powder" : "Turmeric Powder",
                weight,
                priceINR: price,
                isSubscription: true,
                subscriptionPlanId: plan.id,
                subscriptionType: "single",
              });
            }}
            onSelectCombo={() => handleSelectCombo(plan.id)}
          />
        ))}
      </div>
    </div>
  );
}
