"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product, ToastItem } from "@/types";

interface DemoUser {
  name: string;
  email: string;
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  user: DemoUser | null;
  hydrated: boolean;
  cartOpen: boolean;
  searchOpen: boolean;
  authOpen: boolean;
  mobileOpen: boolean;
  toasts: ToastItem[];
  setHydrated: (value: boolean) => void;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setAuthOpen: (open: boolean) => void;
  setMobileOpen: (open: boolean) => void;
  addToast: (message: string, type?: ToastItem["type"]) => void;
  dismissToast: (id: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  login: (user: DemoUser) => void;
  logout: () => void;
  cartCount: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      user: null,
      hydrated: false,
      cartOpen: false,
      searchOpen: false,
      authOpen: false,
      mobileOpen: false,
      toasts: [],
      setHydrated: (value) => set({ hydrated: value }),
      setCartOpen: (open) => set({ cartOpen: open, mobileOpen: false }),
      setSearchOpen: (open) => set({ searchOpen: open, mobileOpen: false }),
      setAuthOpen: (open) => set({ authOpen: open, mobileOpen: false }),
      setMobileOpen: (open) => set({ mobileOpen: open }),
      addToast: (message, type = "success") => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
        window.setTimeout(() => get().dismissToast(id), 3200);
      },
      dismissToast: (id) =>
        set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existing = state.cart.find((item) => item.id === product.id);
          const cart = existing
            ? state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              )
            : [
                ...state.cart,
                {
                  id: product.id,
                  slug: product.slug,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  quantity,
                  size: product.size,
                },
              ];
          return { cart, cartOpen: true };
        });
        get().addToast(`${product.name} added to bag`);
      },
      removeFromCart: (id) => {
        const item = get().cart.find((entry) => entry.id === id);
        set((state) => ({ cart: state.cart.filter((entry) => entry.id !== id) }));
        if (item) get().addToast(`${item.name} removed`, "info");
      },
      updateQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeFromCart(id);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) => (item.id === id ? { ...item, quantity } : item)),
        }));
      },
      clearCart: () => set({ cart: [] }),
      toggleWishlist: (id) => {
        const has = get().wishlist.includes(id);
        set((state) => ({
          wishlist: has ? state.wishlist.filter((item) => item !== id) : [...state.wishlist, id],
        }));
        get().addToast(has ? "Removed from wishlist" : "Saved to wishlist", has ? "info" : "success");
      },
      isWishlisted: (id) => get().wishlist.includes(id),
      login: (user) => {
        set({ user, authOpen: false });
        get().addToast(`Welcome, ${user.name.split(" ")[0]}`);
      },
      logout: () => {
        set({ user: null });
        get().addToast("Signed out", "info");
      },
      cartCount: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "hairbloom-store",
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
