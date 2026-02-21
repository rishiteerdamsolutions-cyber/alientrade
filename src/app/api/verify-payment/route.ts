import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getOrder } from "@/lib/order-store";
import { updateOrderPaymentId } from "@/lib/orders-db";

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, paymentId, signature } = body;

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { error: "Missing orderId, paymentId or signature" },
        { status: 400 }
      );
    }

    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json(
        { error: "Invalid signature", verified: false },
        { status: 400 }
      );
    }

    try {
      await updateOrderPaymentId(orderId, paymentId);
    } catch (dbErr) {
      console.error("MongoDB update error:", dbErr);
    }

    const orderData = getOrder(orderId);
    if (!orderData) {
      return NextResponse.json(
        { error: "Order not found", verified: true },
        { status: 404 }
      );
    }

    return NextResponse.json({
      verified: true,
      orderId,
      paymentId,
      amountINR: orderData.totalINR,
      items: orderData.items,
      paymentStatus: "confirmed",
    });
  } catch (err) {
    console.error("Verify payment error:", err);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
