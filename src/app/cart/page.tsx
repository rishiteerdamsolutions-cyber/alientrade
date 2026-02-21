"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalINR } = useCart();
  const { format } = useCurrency();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-brand-brown mb-4">Your cart is empty</h1>
        <p className="text-brand-brown-light mb-6">Add some delicious spices to get started!</p>
        <Link
          href="/products"
          className="inline-block rounded-lg bg-brand-red px-6 py-3 font-semibold text-white hover:bg-brand-red-light"
        >
          Shop Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-[max(2rem,calc(2rem+env(safe-area-inset-bottom)))]">
      <h1 className="text-2xl font-bold text-brand-brown mb-8">Shopping Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={`${item.productId}-${item.weight}`}
            className="flex items-center justify-between gap-4 p-4 bg-white rounded-xl border border-brand-brown/10"
          >
            <div>
              <h3 className="font-semibold text-brand-brown">{item.productName}</h3>
              <p className="text-sm text-brand-brown-light">
                {item.weight}kg {item.isSubscription && `• ${item.subscriptionPlanId}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-brand-brown/20 rounded-lg">
                <button
                  onClick={() => updateQuantity(item.productId, item.weight, item.quantity - 1)}
                  className="px-3 py-1 text-brand-brown hover:bg-brand-cream"
                >
                  −
                </button>
                <span className="px-3 py-1 font-medium w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.productId, item.weight, item.quantity + 1)}
                  className="px-3 py-1 text-brand-brown hover:bg-brand-cream"
                >
                  +
                </button>
              </div>
              <p className="font-semibold text-brand-red w-24 text-right">
                {format(item.priceINR * item.quantity)}
              </p>
              <button
                onClick={() => removeItem(item.productId, item.weight)}
                className="text-brand-brown-light hover:text-brand-red text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-white rounded-xl border border-brand-brown/10">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-medium text-brand-brown">Subtotal</span>
          <span className="text-xl font-bold text-brand-red">{format(totalINR)}</span>
        </div>
        <p className="text-xs text-brand-brown-light mb-4">Shipping charges extra as per market price and delivery location.</p>
        <Link
          href="/checkout"
          className="block w-full text-center rounded-lg bg-brand-red px-6 py-3 font-semibold text-white hover:bg-brand-red-light"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
