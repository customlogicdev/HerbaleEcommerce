"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { SearchModal } from "@/components/layout/SearchModal";
import { AuthModal } from "@/components/layout/AuthModal";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Toaster } from "@/components/ui/Toaster";
import { useStore } from "@/store/useStore";

export function SiteChrome({ children }: { children: ReactNode }) {
  const setHydrated = useStore((s) => s.setHydrated);

  useEffect(() => {
    setHydrated(true);
  }, [setHydrated]);

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
      <SearchModal />
      <AuthModal />
      <MobileMenu />
      <Toaster />
    </>
  );
}
