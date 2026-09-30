import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Bag",
  description: "Review the HairBloom products in your bag.",
};

export default function CartLayout({ children }: { children: ReactNode }) {
  return children;
}
