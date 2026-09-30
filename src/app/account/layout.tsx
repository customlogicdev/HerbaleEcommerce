import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Account",
  description: "Demo HairBloom account — login, orders, and addresses.",
};

export default function AccountLayout({ children }: { children: ReactNode }) {
  return children;
}
