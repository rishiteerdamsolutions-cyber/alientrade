"use client";

import { useState } from "react";
import Image from "next/image";
import { subscriptionPlans, products } from "@/data/products";
import SubscriptionCard from "@/components/SubscriptionCard";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";

export default function SubscriptionsPage() {
  const { addItem, items } = useCart();
  const { format } = useCurrency();
  const [selectedInPlan, setSelectedInPlan] = useState<Record<string, "red-chilli-powder" | "turmeric-powder">>({});

  const recommendedFromCart = (() => {
    const singleSub = items.find(
      (i) => i.isSubscription && i.subscriptionType === "single" && i.subscriptionPlanId
    );
    if (!singleSub?.subscriptionPlanId) return null;
    const plan = subscriptionPlans.find((p) => p.id === singleSub.subscriptionPlanId);
    if (!plan) return null;
    const addedChilli = singleSub.productId === "red-chilli-powder";
    const otherProductId = addedChilli ? "turmeric-powder" : "red-chilli-powder";
    const otherProduct = products.find((p) => p.id === otherProductId);
    if (!otherProduct) return null;
    const pack = otherProduct.packSizes.find((p) => p.weight === (otherProductId === "turmeric-powder" ? Math.min(plan.weightKg, 3) : plan.weightKg));
    if (!pack) return null;
    const price = otherProductId === "red-chilli-powder" ? plan.priceChilliINR : plan.priceTurmericINR;
    const weight = otherProductId === "red-chilli-powder" ? plan.weightKg : Math.min(plan.weightKg, 3);
    return { plan, otherProduct, pack, price, weight, otherProductId };
  })();

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
            recommendedProduct={selectedInPlan[plan.id]}
            onSelectOneTime={(productId) => {
              const isChilli = productId === "red-chilli-powder";
              const weight = isChilli ? plan.weightKg : Math.min(plan.weightKg, 3);
              const price = isChilli ? plan.priceChilliINR : plan.priceTurmericINR;
              setSelectedInPlan((prev) => ({ ...prev, [plan.id]: productId as "red-chilli-powder" | "turmeric-powder" }));
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

      {recommendedFromCart && (
        <div className="mt-16">
          <h2 className="text-xl font-bold text-brand-brown mb-4">Recommended for you</h2>
          <p className="text-sm text-brand-brown-light mb-4">
            You added {recommendedFromCart.otherProductId === "red-chilli-powder" ? "Turmeric" : "Chilli"} — add the matching {recommendedFromCart.plan.name} of {recommendedFromCart.otherProduct.shortName} too?
          </p>
          <div className="max-w-sm rounded-2xl border-2 border-brand-red/50 bg-white p-6 shadow-lg ring-2 ring-brand-red/20">
            <span className="inline-block rounded-full bg-brand-red px-3 py-0.5 text-xs font-bold text-white mb-4">
              Recommended
            </span>
            <div className={`relative h-32 rounded-xl bg-gradient-to-br ${recommendedFromCart.otherProduct.gradient} flex items-center justify-center mb-4`}>
              {recommendedFromCart.pack.imagePath && (
                <Image
                  src={recommendedFromCart.pack.imagePath}
                  alt={`${recommendedFromCart.otherProduct.name} ${recommendedFromCart.pack.label}`}
                  fill
                  className="object-contain p-4"
                  sizes="384px"
                />
              )}
            </div>
            <h3 className="font-bold text-brand-brown">{recommendedFromCart.otherProduct.name}</h3>
            <p className="text-sm text-brand-brown-light">{recommendedFromCart.plan.name} • {recommendedFromCart.pack.label}</p>
            <p className="mt-2 text-lg font-bold text-brand-red">{format(recommendedFromCart.price)}</p>
            <button
              onClick={() => {
                const isChilli = recommendedFromCart.otherProductId === "red-chilli-powder";
                addItem({
                  productId: recommendedFromCart.otherProductId,
                  productName: recommendedFromCart.otherProduct.name,
                  weight: recommendedFromCart.weight,
                  priceINR: recommendedFromCart.price,
                  isSubscription: true,
                  subscriptionPlanId: recommendedFromCart.plan.id,
                  subscriptionType: "single",
                });
              }}
              className="mt-4 w-full rounded-lg bg-brand-red px-4 py-3 font-semibold text-white hover:bg-brand-red-light transition-colors"
            >
              Add {recommendedFromCart.otherProduct.shortName} {recommendedFromCart.plan.name}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
