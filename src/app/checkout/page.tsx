"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import RazorpayCheckout from "@/components/RazorpayCheckout";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalINR } = useCart();
  const { format } = useCurrency();
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "USA",
  });

  useEffect(() => {
    if (items.length === 0 && !orderId) {
      router.push("/cart");
    }
  }, [items, orderId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderItems = items.map((i) => ({
        productName: i.productName,
        weight: i.weight,
        quantity: i.quantity,
        priceINR: i.priceINR,
      }));
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalINR,
          items: orderItems,
          customer: form,
        }),
      });
      const data = await res.json();
      if (data.orderId) {
        setOrderId(data.orderId);
      } else {
        alert(data.error || "Failed to create order");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !orderId) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-[max(2rem,calc(2rem+env(safe-area-inset-bottom)))]">
      <h1 className="text-2xl font-bold text-brand-brown mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="space-y-4">
          <h2 className="font-semibold text-brand-brown">Shipping Details</h2>
          <input
            required
            placeholder="Full Name"
            className="w-full rounded-lg border border-brand-brown/20 px-4 py-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            required
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-brand-brown/20 px-4 py-2"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            required
            placeholder="Phone"
            className="w-full rounded-lg border border-brand-brown/20 px-4 py-2"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <textarea
            required
            placeholder="Address"
            rows={2}
            className="w-full rounded-lg border border-brand-brown/20 px-4 py-2"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              required
              placeholder="City"
              className="rounded-lg border border-brand-brown/20 px-4 py-2"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <input
              placeholder="State"
              className="rounded-lg border border-brand-brown/20 px-4 py-2"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              required
              placeholder="ZIP / Postal Code"
              className="rounded-lg border border-brand-brown/20 px-4 py-2"
              value={form.zip}
              onChange={(e) => setForm({ ...form, zip: e.target.value })}
            />
            <select
              className="rounded-lg border border-brand-brown/20 px-4 py-2"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            >
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl border border-brand-brown/10 p-4 sm:p-6 md:sticky md:top-24">
            <h2 className="font-semibold text-brand-brown mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={`${item.productId}-${item.weight}`} className="flex justify-between text-sm">
                  <span className="text-brand-brown">
                    {item.productName} {item.weight}kg × {item.quantity}
                  </span>
                  <span>{format(item.priceINR * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-brand-brown/10 pt-4 flex justify-between font-bold text-brand-brown">
              <span>Subtotal</span>
              <span className="text-brand-red">{format(totalINR)}</span>
            </div>
            <p className="text-xs text-brand-brown-light mt-2">Shipping charges extra as per market price and delivery location.</p>
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-lg bg-brand-red px-6 py-3 font-semibold text-white hover:bg-brand-red-light disabled:opacity-50"
            >
              {loading ? "Processing..." : `Pay ${format(totalINR)}`}
            </button>
          </div>
        </div>
      </form>

      {orderId && (
        <RazorpayCheckout
          orderId={orderId}
          amount={totalINR}
          onClose={() => setOrderId(null)}
        />
      )}
    </div>
  );
}
