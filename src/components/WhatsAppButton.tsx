"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { useOrder } from "@/context/OrderContext";

const WHATSAPP_NUMBER = "919581963980";

function buildOrderMessage(order: {
  orderId: string;
  paymentId: string;
  amountINR: number;
  items: { productName: string; weight: number; quantity: number }[];
  paymentStatus: string;
}): string {
  const lines = [
    "Hi! I've placed an order with AlienTrade.",
    "",
    `Order ID: ${order.orderId}`,
    `Payment ID: ${order.paymentId}`,
    `Payment Status: ${order.paymentStatus} ✓`,
    "",
    "Items:",
    ...order.items.map(
      (i) => `- ${i.productName} ${i.weight}kg x ${i.quantity}`
    ),
    "",
    `Total: ₹${order.amountINR.toLocaleString("en-IN")}`,
    "",
    "Please confirm and share shipping details.",
  ];
  return lines.join("\n");
}

const GENERIC_MESSAGE =
  "Hi! I'm interested in AlienTrade spices - Red Chilli Powder and Turmeric Powder. Could you share more details?";

export default function WhatsAppButton() {
  const pathname = usePathname();
  const { lastOrder } = useOrder();

  const isSuccessPage = pathname === "/checkout/success";
  const hasOrderDetails = isSuccessPage && lastOrder;

  const message = hasOrderDetails
    ? buildOrderMessage({
        orderId: lastOrder.orderId,
        paymentId: lastOrder.paymentId,
        amountINR: lastOrder.amountINR,
        items: lastOrder.items.map((i) => ({
          productName: i.productName,
          weight: i.weight,
          quantity: i.quantity,
        })),
        paymentStatus: lastOrder.paymentStatus,
      })
    : GENERIC_MESSAGE;

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 flex h-14 w-14 min-w-[44px] min-h-[44px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl active:scale-95 bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))]"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" strokeWidth={2} />
    </a>
  );
}
