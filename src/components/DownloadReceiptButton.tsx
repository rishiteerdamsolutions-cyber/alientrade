"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import { Download } from "lucide-react";
import type { OrderDetails } from "@/context/OrderContext";

interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export default function DownloadReceiptButton({
  order,
  customer,
}: {
  order: OrderDetails;
  customer?: Customer | null;
}) {
  const [loading, setLoading] = useState(false);

  const getLogoBase64 = async (): Promise<string | null> => {
    try {
      const res = await fetch("/alientrade-logo.png");
      const blob = await res.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch {
      return null;
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      const doc = new jsPDF();
      let y = 20;

      const logoBase64 = await getLogoBase64();
      if (logoBase64) {
        doc.addImage(logoBase64, "PNG", 20, 10, 45, 18);
        y = 38;
      } else {
        doc.setFontSize(18);
        doc.text("AlienTrade - Order Receipt", 20, y);
        y += 12;
      }

      doc.setDrawColor(200, 180, 160);
      doc.setLineWidth(0.5);
      doc.line(20, y, 190, y);
      y += 10;

      if (customer) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Customer Details", 20, y);
        y += 7;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(`Name: ${customer.name}`, 20, y);
        y += 6;
        doc.text(`Email: ${customer.email}`, 20, y);
        y += 6;
        doc.text(`Phone: ${customer.phone}`, 20, y);
        y += 6;
        doc.text(`Address: ${customer.address}`, 20, y);
        y += 6;
        const cityLine = [customer.city, customer.state, customer.zip, customer.country]
          .filter(Boolean)
          .join(", ");
        if (cityLine) {
          doc.text(cityLine, 20, y);
          y += 6;
        }
        y += 4;
      }

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Order Details", 20, y);
      y += 7;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`Order ID: ${order.orderId}`, 20, y);
      y += 6;
      doc.text(`Payment ID: ${order.paymentId}`, 20, y);
      y += 6;
      doc.text(`Payment Status: ${order.paymentStatus}`, 20, y);
      y += 6;
      doc.text(`Date: ${new Date().toLocaleString()}`, 20, y);
      y += 12;

      doc.setFont("helvetica", "bold");
      doc.text("Items:", 20, y);
      y += 8;

      doc.setFont("helvetica", "normal");
      order.items.forEach((item) => {
        doc.text(
          `• ${item.productName} ${item.weight}kg × ${item.quantity} — ₹${(item.priceINR * item.quantity).toLocaleString("en-IN")}`,
          25,
          y
        );
        y += 6;
      });

      y += 4;
      doc.setFont("helvetica", "bold");
      doc.text(`Total: ₹${order.amountINR.toLocaleString("en-IN")}`, 20, y);
      y += 10;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text("Thank you for your order. Shipping charges as per delivery location.", 20, y);
      y += 5;
      doc.text("Contact: aideveloperindia@gmail.com | WhatsApp: +91 95819 63980", 20, y);

      doc.save(`AlienTrade-Order-${order.orderId}.pdf`);
    } catch (err) {
      console.error(err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-brown/30 px-6 py-3 font-semibold text-brand-brown hover:bg-brand-cream transition-colors disabled:opacity-50"
    >
      <Download className="w-5 h-5" />
      {loading ? "Generating PDF..." : "Download Order Receipt (PDF)"}
    </button>
  );
}
