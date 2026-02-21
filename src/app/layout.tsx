import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "AlienTrade - Authentic Indian Spices for NRIs Worldwide",
  description:
    "Premium Red Chilli Powder & Turmeric Powder. Farmers bring & powder before our eyes — we take personal care, just like for our family. Delivered to USA, UK, Canada, Australia.",
  icons: {
    icon: "/alientrade-logo.png",
    apple: "/alientrade-logo.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AlienTrade - Authentic Spices",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FFF8E7] text-[#3E2723]`}
      >
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
