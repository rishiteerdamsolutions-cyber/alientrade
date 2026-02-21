"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "USA",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", country: "USA", message: "" });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-brand-brown mb-2">Contact Us</h1>
      <p className="text-brand-brown-light mb-8">
        Have a question? We&apos;d love to hear from you.
      </p>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <a
            href="https://wa.me/919581963980"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 font-semibold text-white hover:bg-[#20BD5A] mb-4"
          >
            Chat on WhatsApp
          </a>
          <p className="text-sm text-brand-brown-light">+91 95819 63980</p>
          <p className="mt-4 text-sm text-brand-brown-light">aideveloperindia@gmail.com</p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 space-y-4">
          <input
            required
            placeholder="Your Name"
            className="w-full rounded-lg border border-brand-brown/20 px-4 py-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            required
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-brand-brown/20 px-4 py-2"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <select
            className="w-full rounded-lg border border-brand-brown/20 px-4 py-2"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          >
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
          </select>
          <textarea
            required
            placeholder="Your Message"
            rows={4}
            className="w-full rounded-lg border border-brand-brown/20 px-4 py-2"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-brand-red px-6 py-3 font-semibold text-white hover:bg-brand-red-light"
          >
            Send Message
          </button>
          {submitted && (
            <p className="text-brand-green text-sm">Thank you! We&apos;ll get back soon.</p>
          )}
        </form>
      </div>
    </div>
  );
}
