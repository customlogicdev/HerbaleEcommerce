import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your saved HairBloom rituals.",
};

export default function WishlistLayout({ children }: { children: ReactNode }) {
  return children;
}
