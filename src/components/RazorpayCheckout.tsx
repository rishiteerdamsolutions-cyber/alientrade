"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useOrder } from "@/context/OrderContext";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: { name?: string; email?: string; contact?: string };
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: () => void) => void;
}

export default function RazorpayCheckout({
  orderId,
  amount,
  onClose,
}: {
  orderId: string;
  amount: number;
  onClose: () => void;
}) {
  const router = useRouter();
  const { setLastOrder } = useOrder();
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (!orderId || !amount) return;

    const loadScript = () => {
      if (scriptLoaded.current) return;
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
      scriptLoaded.current = true;
    };

    loadScript();

    const initRazorpay = () => {
      if (!window.Razorpay) {
        setTimeout(initRazorpay, 100);
        return;
      }

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: Math.round(amount * 100),
        currency: "INR",
        name: "AlienTrade",
        description: "Authentic Indian Spices",
        order_id: orderId,
        handler: async (response) => {
          try {
            const res = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });
            const data = await res.json();
            if (data.verified && data.items) {
              setLastOrder({
                orderId: data.orderId,
                paymentId: data.paymentId,
                amountINR: data.amountINR,
                items: data.items,
                paymentStatus: data.paymentStatus || "confirmed",
              });
              sessionStorage.setItem(
                "orderSuccess",
                JSON.stringify({
                  orderId: data.orderId,
                  paymentId: data.paymentId,
                  amountINR: data.amountINR,
                  items: data.items,
                  paymentStatus: data.paymentStatus || "confirmed",
                })
              );
              router.push("/checkout/success");
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
          }
        },
      });

      rzp.on("payment.failed", () => {
        onClose();
        alert("Payment failed. Please try again.");
      });

      rzp.open();
    };

    const timer = setTimeout(initRazorpay, 500);
    return () => clearTimeout(timer);
  }, [orderId, amount, router, setLastOrder, onClose]);

  return null;
}
