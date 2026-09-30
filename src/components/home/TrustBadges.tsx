import { Heart, Leaf, ShieldCheck, Truck, FlaskConical } from "lucide-react";

const badges = [
  { icon: Leaf, title: "Natural Ingredients", text: "Safe for your hair & scalp" },
  { icon: ShieldCheck, title: "Dermatologically Tested", text: "Gentle yet effective" },
  { icon: Truck, title: "Free Shipping", text: "On orders over $50" },
  { icon: Heart, title: "Loved by 50K+ Customers", text: "Real people. Real results." },
  { icon: FlaskConical, title: "Cruelty-Free", text: "Never tested on animals" },
];

export function TrustBadges() {
  return (
    <section className="border-y border-beige bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-5">
        {badges.map((badge) => (
          <div key={badge.title} className="flex items-center gap-3">
            <badge.icon className="h-8 w-8 text-forest" strokeWidth={1.4} />
            <div>
              <p className="text-sm font-semibold text-charcoal">{badge.title}</p>
              <p className="text-xs text-muted">{badge.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
