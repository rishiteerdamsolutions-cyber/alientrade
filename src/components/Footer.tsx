import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-brand-brown text-brand-cream pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/alientrade-logo.png"
                alt="AlienTrade"
                width={140}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-brand-cream/70 text-sm leading-relaxed max-w-md">
              Bringing authentic, homemade-quality Indian spices to NRIs worldwide.
              Farmers bring & powder before our eyes — we take personal care, just like for our family.
            </p>
            <div className="flex gap-3 mt-4 text-sm text-brand-cream/60">
              <span>🇺🇸 USA</span>
              <span>🇬🇧 UK</span>
              <span>🇨🇦 Canada</span>
              <span>🇦🇺 Australia</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-brand-gold">Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm text-brand-cream/70">
              <Link href="/products" className="hover:text-brand-gold transition-colors">
                Products
              </Link>
              <Link href="/subscriptions" className="hover:text-brand-gold transition-colors">
                Subscriptions
              </Link>
              <Link href="/about" className="hover:text-brand-gold transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="hover:text-brand-gold transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-brand-gold">Contact</h3>
            <div className="flex flex-col gap-2 text-sm text-brand-cream/70">
              <a href="mailto:aideveloperindia@gmail.com" className="hover:text-brand-gold transition-colors">
                aideveloperindia@gmail.com
              </a>
              <p>India</p>
              <p className="mt-2 text-xs text-brand-cream/40">
                Payments secured by Razorpay
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-cream/10 mt-8 pt-6 text-center text-xs text-brand-cream/40 space-y-2">
          <p>&copy; {new Date().getFullYear()} AlienTrade. All rights reserved. Made with care in India.</p>
          <a
            href="https://aideveloperindia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-brand-gold transition-colors"
          >
            <Image
              src="/A%20logo.png"
              alt="A-logo"
              width={24}
              height={24}
              className="h-6 w-auto"
            />
            <span>Built by A-logo AI Developer</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
