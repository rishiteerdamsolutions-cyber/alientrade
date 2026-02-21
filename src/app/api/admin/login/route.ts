import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
const SESSION_SECRET = process.env.SESSION_SECRET || "alientrade-admin-secret";

function createToken(): string {
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(timestamp + ADMIN_USERNAME)
    .digest("hex");
  return `${timestamp}.${signature}`;
}

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
    return age < 24 * 60 * 60 * 1000; // 24 hours
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const token = createToken();
    const res = NextResponse.json({ ok: true });
    res.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60,
      path: "/",
    });
    return res;
  } catch (err) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true });
}
