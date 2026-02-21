"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useCurrency } from "@/context/CurrencyContext";

const HERO_IMAGES = ["/images/5.png", "/images/6.png", "/images/7.png", "/images/8.png", "/images/9.png", "/images/10.png", "/images/11.png", "/images/12.png"];
const COUNTRIES = [
  { flag: "🇺🇸", name: "USA" },
  { flag: "🇬🇧", name: "UK" },
  { flag: "🇨🇦", name: "Canada" },
  { flag: "🇦🇺", name: "Australia" },
];

export default function Home() {
  const { format } = useCurrency();
  const minPrices = products.map((p) => p.packSizes[0].priceINR);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-brown via-brand-brown-light to-brand-red py-12 sm:py-16 md:py-24 px-4 sm:px-6 text-white">
        {HERO_IMAGES.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              i === heroIndex ? "opacity-30" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Authentic Indian Spices
            <br />
            <span className="text-brand-gold">Made With Love, Delivered Worldwide</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
            Farmers bring their produce and powder before our eyes. We take personal care — just like we do for our own family.
            Premium Red Chilli Powder & Turmeric Powder for NRIs in USA, UK, Canada & Australia.
          </p>
          <div className="mt-6 sm:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              href="/products"
              className="rounded-full bg-brand-gold px-6 py-3 min-h-[44px] flex items-center justify-center font-semibold text-brand-brown hover:bg-brand-gold-light transition-colors active:scale-95"
            >
              Shop Products
            </Link>
            <Link
              href="/subscriptions"
              className="rounded-full border-2 border-white px-6 py-3 min-h-[44px] flex items-center justify-center font-semibold hover:bg-white/10 transition-colors active:scale-95"
            >
              View Subscriptions
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-4 overflow-hidden min-h-[56px] bg-brand-cream">
        <div className="absolute inset-0 flex items-center overflow-hidden">
          <div className="flex animate-scroll-3d flex-nowrap shrink-0 items-center">
            {[...COUNTRIES, ...COUNTRIES, ...COUNTRIES, ...COUNTRIES, ...COUNTRIES, ...COUNTRIES].map((c, i) => (
              <span key={i} className="flex items-center gap-2 mx-6 whitespace-nowrap shrink-0 text-brand-brown font-medium">
                <span className="text-2xl">{c.flag}</span>
                <span>{c.name}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-brand-brown text-center mb-6 sm:mb-10">
            Our Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            {products.map((p, i) => (
              <ProductCard
                key={p.id}
                slug={p.slug}
                name={p.name}
                tagline={p.tagline}
                gradient={p.gradient}
                iconEmoji={p.iconEmoji}
                imageSrc={p.id === "red-chilli-powder" ? "/images/products/PRODUCT1/CHILLI-ALLPACK.png" : "/images/products/PRODUCT2/TURMERIC-ALLPACK.png"}
                minPrice={minPrices[i] ?? 0}
                formatPrice={format}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-brand-brown mb-6">
            Why AlienTrade?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                <img src="/images/2.png" alt="Homemade Quality" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-semibold text-brand-brown">Homemade Quality</h3>
              <p className="text-sm text-brand-brown-light mt-1">
                Same care we use for our own kitchen
              </p>
            </div>
            <div>
              <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                <img src="/images/3.png" alt="Pure Ingredients" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-semibold text-brand-brown">Pure Ingredients</h3>
              <p className="text-sm text-brand-brown-light mt-1">
                No additives, no artificial colors
              </p>
            </div>
            <div>
              <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                <img src="/images/4.png" alt="Worldwide Shipping" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-semibold text-brand-brown">Worldwide Shipping</h3>
              <p className="text-sm text-brand-brown-light mt-1">
                USA, UK, Canada, Australia
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16 px-4 sm:px-6 pb-[max(2rem,calc(2rem+env(safe-area-inset-bottom)))]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-brand-brown text-center mb-6 sm:mb-8">
            Our Products in Focus
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.flatMap((product) =>
              product.packSizes.map((pack) => (
                <Link
                  key={`${product.id}-${pack.weight}`}
                  href={`/products/${product.slug}`}
                  className="group relative rounded-xl overflow-hidden border-2 border-brand-brown/10 hover:border-brand-red/50 transition-all bg-white shadow-sm hover:shadow-md"
                >
                  {pack.bestSeller && (
                    <span className="absolute top-2 left-2 z-10 rounded-full bg-brand-red px-2 py-0.5 text-xs font-bold text-white">
                      Best Seller
                    </span>
                  )}
                  <div className="relative aspect-square bg-brand-cream">
                    {pack.imagePath && (
                      <Image
                        src={pack.imagePath}
                        alt={`${product.name} ${pack.label}`}
                        fill
                        className="object-contain p-3 group-hover:scale-105 transition-transform"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    )}
                  </div>
                  <div className="p-3 text-center">
                    <p className="font-semibold text-brand-brown text-sm">{product.shortName}</p>
                    <p className="text-brand-red font-bold">{pack.label}</p>
                    <p className="text-xs text-brand-brown-light mt-0.5">{format(pack.priceINR)}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
