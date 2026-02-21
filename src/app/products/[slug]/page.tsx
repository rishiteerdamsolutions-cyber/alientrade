"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProductBySlug } from "@/data/products";
import PackSelector from "@/components/PackSelector";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const { format } = useCurrency();
  const [selectedWeight, setSelectedWeight] = useState(product?.packSizes[0].weight ?? 1);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-brand-brown-light">Product not found</p>
        <Link href="/products" className="text-brand-red mt-4 inline-block">
          Back to products
        </Link>
      </div>
    );
  }

  const selectedPack = product.packSizes.find((p) => p.weight === selectedWeight)!;

  const handleAddToCart = () => {
    addItem(
      {
        productId: product.id,
        productName: product.name,
        weight: selectedWeight,
        priceINR: selectedPack.priceINR,
      },
      quantity
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-[max(2rem,calc(2rem+env(safe-area-inset-bottom)))]">
      <Link href="/products" className="text-brand-brown-light hover:text-brand-red text-sm mb-6 inline-block">
        ← Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
        <div className={`rounded-2xl h-64 sm:h-80 md:h-96 bg-gradient-to-br ${product.gradient} flex items-center justify-center relative overflow-hidden`}>
          <Image
            src={selectedPack.imagePath!}
            alt={`${product.name} ${selectedPack.label}`}
            fill
            className="object-contain p-6"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-brown">{product.name}</h1>
            {selectedPack.bestSeller && (
              <span className="rounded-full bg-brand-red px-3 py-0.5 text-sm font-bold text-white">
                Best Seller
              </span>
            )}
          </div>
          <p className="mt-2 text-brand-brown-light">{product.tagline}</p>
          <p className="mt-4 text-brand-brown">{product.description}</p>

          <ul className="mt-4 space-y-2">
            {product.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-brand-brown">
                <span className="text-brand-green">✓</span> {f}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <PackSelector
              packSizes={product.packSizes}
              selected={selectedWeight}
              onSelect={setSelectedWeight}
              formatPrice={format}
            />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center border border-brand-brown/20 rounded-lg self-start">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="min-w-[44px] min-h-[44px] px-4 py-2 text-brand-brown hover:bg-brand-cream active:bg-brand-cream"
              >
                −
              </button>
              <span className="px-4 py-2 font-medium min-w-[2rem] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="min-w-[44px] min-h-[44px] px-4 py-2 text-brand-brown hover:bg-brand-cream active:bg-brand-cream"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="min-h-[44px] flex-1 rounded-lg bg-brand-red px-6 py-3 font-semibold text-white hover:bg-brand-red-light transition-colors active:scale-[0.98]"
            >
              Add to Cart — {format(selectedPack.priceINR * quantity)}
            </button>
          </div>
          <p className="mt-2 text-xs text-brand-brown-light">
            Courier charges (DTDC) extra as per market rates.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-xl font-bold text-brand-brown mb-4">All Pack Sizes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {product.packSizes.map((pack) => (
            <button
              key={pack.weight}
              onClick={() => setSelectedWeight(pack.weight)}
              className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                selectedWeight === pack.weight ? "border-brand-red ring-2 ring-brand-red/30" : "border-brand-brown/20 hover:border-brand-red/50"
              }`}
            >
              {pack.bestSeller && (
                <span className="absolute top-1 left-1 z-10 rounded bg-brand-red px-1.5 py-0.5 text-[10px] font-bold text-white">
                  Best Seller
                </span>
              )}
              {pack.imagePath && (
                <div className="relative aspect-square">
                  <Image
                    src={pack.imagePath}
                    alt={`${product.name} ${pack.label}`}
                    fill
                    className="object-contain p-2"
                    sizes="120px"
                  />
                </div>
              )}
              <p className="text-center text-sm font-medium py-2 text-brand-brown">{pack.label}</p>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
