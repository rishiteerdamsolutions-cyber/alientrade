"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProductCardProps {
  slug: string;
  name: string;
  tagline: string;
  gradient: string;
  imageSrc: string;
  minPrice: number;
  formatPrice: (amount: number) => string;
}

export default function ProductCard({
  slug,
  name,
  tagline,
  gradient,
  imageSrc,
  minPrice,
  formatPrice,
}: ProductCardProps) {
  return (
    <Link href={`/products/${slug}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-xl"
      >
        <div className={`relative h-48 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-brand-brown group-hover:text-brand-red transition-colors">
            {name}
          </h3>
          <p className="mt-1 text-sm text-brand-brown-light line-clamp-2">
            {tagline}
          </p>
          <p className="mt-3 text-brand-red font-semibold">
            From {formatPrice(minPrice)}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
