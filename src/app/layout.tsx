import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import { SiteChrome } from "@/components/layout/SiteChrome";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "HairBloom — Natural Care for Stronger, Shinier Hair",
    template: "%s · HairBloom",
  },
  description:
    "Premium organic haircare and botanicals. Sulfate-free formulas with rosemary, aloe, and cold-pressed oils. Free shipping over $49.",
  openGraph: {
    title: "HairBloom Organic Living",
    description: "Natural care for stronger, shinier hair.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} bg-[#fbfaf4] font-sans text-charcoal antialiased`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
