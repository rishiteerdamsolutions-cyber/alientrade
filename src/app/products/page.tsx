"use client";

import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useCurrency } from "@/context/CurrencyContext";

export default function ProductsPage() {
  const { format } = useCurrency();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-brand-brown mb-2">Our Products</h1>
      <p className="text-brand-brown-light mb-10">
        Farmers bring & powder before our eyes — we take personal care, just like for our family
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            slug={p.slug}
            name={p.name}
            tagline={p.tagline}
            gradient={p.gradient}
            iconEmoji={p.iconEmoji}
            imageSrc={p.id === "red-chilli-powder" ? "/images/products/PRODUCT1/CHILLI-ALLPACK.png" : "/images/products/PRODUCT2/TURMERIC-ALLPACK.png"}
            minPrice={p.packSizes[0].priceINR}
            formatPrice={format}
          />
        ))}
      </div>
    </div>
  );
}
