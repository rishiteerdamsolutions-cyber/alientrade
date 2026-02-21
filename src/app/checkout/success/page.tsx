"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { useOrder } from "@/context/OrderContext";
import { useCart } from "@/context/CartContext";

function SuccessContent() {
  const searchParams = useSearchParams();
  const { lastOrder, setLastOrder } = useOrder();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orderId = searchParams.get("razorpay_order_id") || searchParams.get("order_id");
    const paymentId = searchParams.get("razorpay_payment_id") || searchParams.get("payment_id");
    const signature = searchParams.get("razorpay_signature");

    const stored = sessionStorage.getItem("orderSuccess");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setLastOrder({
          orderId: data.orderId,
          paymentId: data.paymentId,
          amountINR: data.amountINR,
          items: data.items,
          paymentStatus: data.paymentStatus || "confirmed",
        });
        sessionStorage.removeItem("orderSuccess");
        clearCart();
      } catch (_) {}
    } else if (orderId && paymentId && signature) {
      fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          paymentId,
          signature,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.verified && data.items) {
            setLastOrder({
              orderId: data.orderId,
              paymentId: data.paymentId,
              amountINR: data.amountINR,
              items: data.items,
              paymentStatus: data.paymentStatus || "confirmed",
            });
            clearCart();
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [searchParams, setLastOrder, clearCart]);

  if (loading && !lastOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-brand-brown-light">Verifying your payment...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-green/20 mb-6">
        <CheckCircle className="w-12 h-12 text-brand-green" />
      </div>
      <h1 className="text-3xl font-bold text-brand-brown mb-2">Order Confirmed!</h1>
      <p className="text-brand-brown-light mb-8">
        Thank you for your order. We&apos;ll process it soon.
      </p>

      {lastOrder && (
        <div className="bg-white rounded-xl border border-brand-brown/10 p-6 text-left mb-8">
          <p className="text-sm text-brand-brown-light">Order ID: {lastOrder.orderId}</p>
          <p className="text-sm text-brand-brown-light">Payment ID: {lastOrder.paymentId}</p>
          <p className="text-sm text-brand-brown-light mt-2">
            Payment Status: <span className="text-brand-green font-medium">Confirmed</span>
          </p>
          <div className="mt-4 pt-4 border-t border-brand-brown/10">
            {lastOrder.items.map((item, i) => (
              <p key={i} className="text-brand-brown">
                {item.productName} {item.weight}kg × {item.quantity}
              </p>
            ))}
          </div>
          <p className="mt-2 font-bold text-brand-red">
            Total: ₹{lastOrder.amountINR.toLocaleString("en-IN")}
          </p>
        </div>
      )}

      <p className="text-brand-brown mb-4">
        Click the WhatsApp button below to confirm your order and share shipping details.
      </p>
      <a
        href={`https://wa.me/919581963980?text=${encodeURIComponent(
          lastOrder
            ? `Hi! I've placed an order with AlienTrade.\n\nOrder ID: ${lastOrder.orderId}\nPayment ID: ${lastOrder.paymentId}\nPayment Status: Confirmed ✓\n\nItems:\n${lastOrder.items.map((i) => `- ${i.productName} ${i.weight}kg x ${i.quantity}`).join("\n")}\n\nTotal: ₹${lastOrder.amountINR.toLocaleString("en-IN")}\n\nPlease confirm and share shipping details.`
            : "Hi! I've placed an order with AlienTrade. Please confirm."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3 font-semibold text-white hover:bg-[#20BD5A] transition-colors"
      >
        Confirm via WhatsApp
      </a>

      <Link
        href="/products"
        className="block mt-6 text-brand-brown-light hover:text-brand-red"
      >
        Continue shopping
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-brand-brown-light">Loading...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
