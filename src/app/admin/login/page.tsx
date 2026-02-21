"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-brand-brown text-center mb-6">
          Admin Login
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg border border-brand-brown/10 p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-brand-brown mb-1">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-brand-brown/20 px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-brown mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-brand-brown/20 px-4 py-2"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-brand-red px-4 py-2 font-semibold text-white hover:bg-brand-red-light disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <Link
          href="/"
          className="block text-center text-brand-brown-light text-sm mt-4 hover:text-brand-red"
        >
          Back to site
        </Link>
      </div>
    </div>
  );
}
