import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getOrdersFromDb } from "@/lib/orders-db";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME!;
const SESSION_SECRET = process.env.SESSION_SECRET || "alientrade-admin-secret";

function verifyToken(token: string): boolean {
  try {
    const [timestamp, signature] = token.split(".");
    if (!timestamp || !signature) return false;
    const expected = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(timestamp + ADMIN_USERNAME)
      .digest("hex");
    if (signature !== expected) return false;
    const age = Date.now() - parseInt(timestamp, 10);
    return age < 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const orders = await getOrdersFromDb();
    return NextResponse.json(orders);
  } catch (err) {
    console.error("Fetch orders error:", err);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
