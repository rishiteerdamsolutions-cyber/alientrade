export type CurrencyCode = "INR" | "USD" | "GBP" | "CAD" | "AUD";

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
  rate: number; // rate relative to 1 INR
}

export const currencies: Record<CurrencyCode, CurrencyInfo> = {
  INR: { code: "INR", symbol: "₹", name: "Indian Rupee", flag: "🇮🇳", rate: 1 },
  USD: { code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸", rate: 0.012 },
  GBP: { code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧", rate: 0.0095 },
  CAD: { code: "CAD", symbol: "C$", name: "Canadian Dollar", flag: "🇨🇦", rate: 0.016 },
  AUD: { code: "AUD", symbol: "A$", name: "Australian Dollar", flag: "🇦🇺", rate: 0.018 },
};

export function convertPrice(amountINR: number, currency: CurrencyCode): number {
  const rate = currencies[currency].rate;
  return Math.round(amountINR * rate * 100) / 100;
}

export function formatPrice(amountINR: number, currency: CurrencyCode): string {
  const converted = convertPrice(amountINR, currency);
  const info = currencies[currency];

  if (currency === "INR") {
    return `${info.symbol}${converted.toLocaleString("en-IN")}`;
  }
  return `${info.symbol}${converted.toFixed(2)}`;
}

export function detectCurrency(): CurrencyCode {
  if (typeof window === "undefined") return "USD";

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (tz.startsWith("Asia/")) return "INR";
  if (tz.startsWith("America/") && tz.includes("Toronto")) return "CAD";
  if (tz.startsWith("America/")) return "USD";
  if (tz.startsWith("Europe/London")) return "GBP";
  if (tz.startsWith("Australia/")) return "AUD";

  return "USD";
}
