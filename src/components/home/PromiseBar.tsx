import { Ban, Leaf, Recycle, Sparkles, Vegan } from "lucide-react";

const items = [
  { icon: Ban, label: "Cruelty free" },
  { icon: Sparkles, label: "Paraben free" },
  { icon: Leaf, label: "Sulfate free" },
  { icon: Vegan, label: "Vegan" },
  { icon: Recycle, label: "Recyclable packaging" },
];

export function PromiseBar() {
  return (
    <section className="bg-forest text-cream">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 py-5 text-sm sm:px-6">
        <span className="text-[11px] tracking-[0.22em] uppercase">Our promise</span>
        {items.map((item) => (
          <span key={item.label} className="inline-flex items-center gap-2">
            <item.icon className="h-4 w-4" /> {item.label}
          </span>
        ))}
      </div>
    </section>
  );
}
