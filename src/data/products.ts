export interface PackSize {
  weight: number;
  label: string;
  priceINR: number;
  imagePath?: string;
  bestSeller?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  features: string[];
  color: string;
  gradient: string;
  iconEmoji: string;
  imageFolder: string;
  packSizes: PackSize[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  duration: string;
  months: number;
  weightKg: number;
  priceChilliINR: number;
  priceTurmericINR: number;
  comboPriceINR: number;
  frequency: string;
  popular?: boolean;
  savings: string;
}

export const products: Product[] = [
  {
    id: "red-chilli-powder",
    slug: "red-chilli-powder",
    name: "Red Chilli Powder",
    shortName: "Chilli",
    tagline: "Fiery, Aromatic & Pure — Just Like Home",
    description:
      "Local farmers bring their finest sun-dried red chillies and powder them before our eyes. We take personal care at every step — just like we do for our own family. No additives, no artificial colors — just pure, potent heat and vibrant color that transforms every dish.",
    features: [
      "100% pure sun-dried red chillies",
      "No artificial colors or preservatives",
      "Hand-sorted and stone-ground fresh",
      "Rich, deep red color and bold aroma",
      "Perfect heat level for everyday cooking",
    ],
    color: "#8B1A1A",
    gradient: "from-red-800 via-red-600 to-orange-500",
    iconEmoji: "🌶️",
    imageFolder: "PRODUCT1",
    packSizes: [
      { weight: 1, label: "1 kg", priceINR: 840, imagePath: "/images/products/PRODUCT1/CHILLI-1KG.png" },
      { weight: 2, label: "2 kg", priceINR: 1440, imagePath: "/images/products/PRODUCT1/CHILLI-2KG.png" },
      { weight: 3, label: "3 kg", priceINR: 2040, imagePath: "/images/products/PRODUCT1/CHILLI-3KG.png" },
      { weight: 4, label: "4 kg", priceINR: 2640, imagePath: "/images/products/PRODUCT1/CHILLI-4KG.png" },
      { weight: 5, label: "5 kg", priceINR: 3240, imagePath: "/images/products/PRODUCT1/CHILLI-5KG.png", bestSeller: true },
    ],
  },
  {
    id: "turmeric-powder",
    slug: "turmeric-powder",
    name: "Turmeric Powder",
    shortName: "Turmeric",
    tagline: "Golden, Pure & Healing — Nature's Gift",
    description:
      "Local farmers bring their premium turmeric rhizomes and powder them before our eyes. We take personal care at every step — just like we do for our own family. Rich in curcumin, flavor, and the natural goodness trusted for generations.",
    features: [
      "High curcumin content for maximum benefit",
      "No polishing or chemical treatment",
      "Farmers bring & powder before our eyes",
      "Vibrant golden-yellow color",
      "Perfect for cooking, milk, and remedies",
    ],
    color: "#D4A017",
    gradient: "from-yellow-600 via-amber-500 to-orange-400",
    iconEmoji: "✨",
    imageFolder: "PRODUCT2",
    packSizes: [
      { weight: 1, label: "1 kg", priceINR: 480, imagePath: "/images/products/PRODUCT2/TURMERIC-1KG.png" },
      { weight: 2, label: "2 kg", priceINR: 720, imagePath: "/images/products/PRODUCT2/TURMERIC-2KG.png" },
      { weight: 3, label: "3 kg", priceINR: 960, imagePath: "/images/products/PRODUCT2/TURMERIC-3KG.png", bestSeller: true },
    ],
  },
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "quarterly",
    name: "Quarterly Pack",
    duration: "3 Months",
    months: 3,
    weightKg: 2,
    priceChilliINR: 1440,
    priceTurmericINR: 720,
    comboPriceINR: 2030,
    frequency: "Every 3 months",
    savings: "Save 6%",
  },
  {
    id: "half-yearly",
    name: "Half-Yearly Pack",
    duration: "6 Months",
    months: 6,
    weightKg: 3,
    priceChilliINR: 2040,
    priceTurmericINR: 960,
    comboPriceINR: 2880,
    frequency: "Every 6 months",
    popular: true,
    savings: "Save 9%",
  },
  {
    id: "yearly",
    name: "Yearly Pack",
    duration: "12 Months",
    months: 12,
    weightKg: 5,
    priceChilliINR: 3240,
    priceTurmericINR: 960,
    comboPriceINR: 4020,
    frequency: "Once a year",
    savings: "Save 13%",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
