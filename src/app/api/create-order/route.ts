import { NextRequest, NextResponse } from "next/server";
import { getRazorpay } from "@/lib/razorpay";
import { saveOrder } from "@/lib/order-store";
import { saveOrderToDb } from "@/lib/orders-db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, items, customer } = body;

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

    if (customer?.name && customer?.email && customer?.phone && customer?.address) {
      try {
        await saveOrderToDb(order.id, items, amount, {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          city: customer.city || "",
          state: customer.state || "",
          zip: customer.zip || "",
          country: customer.country || "USA",
        });
      } catch (dbErr) {
        console.error("MongoDB save error:", dbErr);
      }
    }

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
