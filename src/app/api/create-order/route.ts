import { NextRequest, NextResponse } from "next/server";
import { getRazorpay } from "@/lib/razorpay";
import { saveOrder } from "@/lib/order-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, items } = body;

    if (!amount || !items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: "Invalid request: amount and items required" },
        { status: 400 }
      );
    }

    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Razorpay expects paise
      currency: "INR",
      receipt: `order_${Date.now()}`,
    });

    saveOrder(order.id, items, amount);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("Create order error:", err);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
