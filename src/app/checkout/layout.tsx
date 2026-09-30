import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Demo checkout for HairBloom. No real payment is processed.",
};

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return children;
}
