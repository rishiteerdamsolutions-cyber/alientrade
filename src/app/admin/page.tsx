"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Order {
  orderId: string;
  paymentId?: string;
  amountINR: number;
  items: { productName: string; weight: number; quantity: number; priceINR: number }[];
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  createdAt: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/orders", { credentials: "include" })
      .then((res) => {
        if (res.status === 401) {
          router.push("/admin/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          if (data.error) setError(data.error);
          else setOrders(Array.isArray(data) ? data : []);
        }
      })
      .catch(() => setError("Failed to load orders"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include",
    });
    router.push("/admin/login");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream">
        <p className="text-brand-brown-light">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-brand-brown">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-brand-brown px-4 py-2 text-white text-sm hover:bg-brand-brown-light"
          >
            Logout
          </button>
        </div>

        <Link
          href="/"
          className="text-brand-brown-light text-sm hover:text-brand-red mb-4 inline-block"
        >
          Back to site
        </Link>

        {error && (
          <p className="text-red-600 mb-4">{error}</p>
        )}

        <div className="space-y-6">
          {orders.length === 0 ? (
            <p className="text-brand-brown-light">No orders yet.</p>
          ) : (
            orders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white rounded-xl border border-brand-brown/10 p-6 shadow-sm"
              >
                <div className="flex flex-wrap justify-between gap-4 mb-4">
                  <div>
                    <p className="font-semibold text-brand-brown">
                      Order ID: {order.orderId}
                    </p>
                    <p className="text-sm text-brand-brown-light">
                      Payment ID: {order.paymentId || "Pending"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-brand-red">
                      ₹{order.amountINR.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-brand-brown-light">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 border-t border-brand-brown/10 pt-4">
                  <div>
                    <h3 className="font-medium text-brand-brown mb-2">
                      Customer Details
                    </h3>
                    <p className="text-sm text-brand-brown">
                      <strong>Name:</strong> {order.customer?.name}
                    </p>
                    <p className="text-sm text-brand-brown">
                      <strong>Email:</strong> {order.customer?.email}
                    </p>
                    <p className="text-sm text-brand-brown">
                      <strong>Phone:</strong> {order.customer?.phone}
                    </p>
                    <p className="text-sm text-brand-brown">
                      <strong>Address:</strong> {order.customer?.address},{" "}
                      {order.customer?.city}, {order.customer?.state}{" "}
                      {order.customer?.zip}, {order.customer?.country}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-brand-brown mb-2">
                      Items
                    </h3>
                    <ul className="text-sm text-brand-brown space-y-1">
                      {order.items?.map((item, i) => (
                        <li key={i}>
                          {item.productName} {item.weight}kg × {item.quantity} —{" "}
                          ₹{(item.priceINR * item.quantity).toLocaleString("en-IN")}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
