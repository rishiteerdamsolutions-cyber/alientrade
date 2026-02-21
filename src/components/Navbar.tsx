"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CurrencySelector from "./CurrencySelector";

export default function Navbar() {
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/subscriptions", label: "Subscriptions" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-brand-gold/20 shadow-sm pt-[env(safe-area-inset-top)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 min-h-[44px] sm:h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/alientrade-logo.png"
              alt="AlienTrade"
              width={140}
              height={40}
              className="h-8 w-auto sm:h-10"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-brand-brown-light hover:text-brand-red transition-colors font-medium text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <CurrencySelector />
            <Link
              href="/cart"
              className="relative flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full hover:bg-brand-cream transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-brand-brown" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full hover:bg-brand-cream transition-colors"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-brand-brown" />
              ) : (
                <Menu className="w-5 h-5 text-brand-brown" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-brand-gold/10">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 px-2 text-brand-brown-light hover:text-brand-red transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
