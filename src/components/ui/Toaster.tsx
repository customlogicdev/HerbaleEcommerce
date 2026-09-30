"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, XCircle } from "lucide-react";
import { useStore } from "@/store/useStore";

const icons = {
  success: CheckCircle2,
  info: Info,
  error: XCircle,
};

export function Toaster() {
  const toasts = useStore((s) => s.toasts);
  const dismissToast = useStore((s) => s.dismissToast);

  return (
    <div className="pointer-events-none fixed top-20 right-4 z-[80] flex w-[min(100%-2rem,22rem)] flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type];
          return (
            <motion.button
              key={toast.id}
              type="button"
              onClick={() => dismissToast(toast.id)}
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-beige bg-white px-4 py-3 text-left shadow-[0_16px_40px_rgba(26,26,26,0.12)]"
            >
              <Icon
                className={
                  toast.type === "error"
                    ? "mt-0.5 h-4 w-4 text-peach"
                    : "mt-0.5 h-4 w-4 text-forest"
                }
              />
              <span className="text-sm text-charcoal">{toast.message}</span>
            </motion.button>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
