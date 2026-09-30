import type { BlogPost } from "@/types";
import { pexels } from "@/lib/utils";

export const posts: BlogPost[] = [
  {
    slug: "ritual-of-rosemary",
    title: "The Quiet Ritual of Rosemary Oil",
    excerpt: "Why this kitchen herb became the most searched hair ingredient of the year — and how to use it without greasing your pillow.",
    image: pexels(7038174, 1200),
    category: "Hair Rituals",
    author: "Elena Voss",
    date: "March 4, 2026",
    readTime: "6 min",
    content: [
      "Rosemary has lived in Mediterranean gardens for centuries, but it only recently migrated from the roasting pan to the vanity. The shift is not a trend so much as a return: folk traditions have massaged rosemary-infused oils into the scalp for generations.",
      "What changed is the evidence. Small clinical studies suggest rosemary oil can support the appearance of denser hair when used consistently for 12 weeks or more. The mechanism is thought to involve improved microcirculation and a calming effect on an inflamed scalp barrier.",
      "The mistake most people make is drowning the scalp. Two to four drops of a well-diluted serum is plenty. Warm it between your fingertips, part the hair in rows, and take a full minute. The massage is half the treatment.",
      "If you are pregnant, nursing, or managing a skin condition, speak with a clinician before adding essential oils. And always patch-test behind the ear. Nature is potent — that is the point.",
    ],
  },
  {
    slug: "ayurveda-morning-hair",
    title: "An Ayurvedic Morning for Modern Hair",
    excerpt: "A 12-minute routine borrowed from abhyanga that fits between the kettle and the commute.",
    image: pexels(17397001, 1200),
    category: "Wellness",
    author: "Dr. Anika Sharma",
    date: "February 19, 2026",
    readTime: "8 min",
    content: [
      "Ayurveda does not treat hair as an accessory. It treats it as a report card for digestion, sleep, and stress. When those three falter, the scalp is often the first to send a memo.",
      "A practical morning: warm a teaspoon of herbal oil in your palms while the kettle boils. Massage the scalp in small circles for four minutes. Comb through. Twist hair up. Then make tea. Before you leave, blot excess oil with a cotton cloth — no need to shampoo daily.",
      "If your dosha leans pitta (easily inflamed, premature greys), favor coconut and brahmi. If vata (dry, flyaway, restless), sesame and ashwagandha. Kapha scalps (oily, heavy) prefer lighter jojoba and a weekly detox scrub.",
      "None of this requires a shrine. It requires a closed bathroom door and the decision that your nervous system is not optional.",
    ],
  },
  {
    slug: "sulfate-free-does-not-mean-weak",
    title: "Sulfate-Free Does Not Mean Weak",
    excerpt: "How modern glucoside cleansers actually wash your hair — and why lather is a poor measure of clean.",
    image: pexels(8467970, 1200),
    category: "Ingredients",
    author: "Jonah Hale",
    date: "February 2, 2026",
    readTime: "5 min",
    content: [
      "The internet taught us to fear sulfates and then left us stranded with shampoos that do not rinse. That is a formulation problem, not a philosophy problem.",
      "Coco-glucoside and decyl glucoside are sugar-derived surfactants. They are milder than sodium lauryl sulfate, yes, but when they are blended with the right co-surfactants they still lift sebum, sunscreen, and yesterday’s dry shampoo.",
      "Look at the second and third ingredients, not the marketing line. Aloe should appear early. Fragrance should appear late. If a bottle lists ‘natural fragrance’ with no breakdown, write to the brand.",
      "HairBloom formulas are built to lather just enough to feel like a wash, then rinse clear. Clean is a feeling of slip, not squeak.",
    ],
  },
  {
    slug: "glass-hair-without-silicones",
    title: "Glass Hair, No Silicones",
    excerpt: "A three-product stack that photographs like a serum-slick runway — without dimethicone.",
    image: pexels(38714663, 1200),
    category: "Styling",
    author: "Mira Cho",
    date: "January 22, 2026",
    readTime: "4 min",
    content: [
      "Silicones are not villains. They are excellent at pretending. If you want hair that is actually healthier, not just reflective, you need oils that absorb and proteins that stay.",
      "The stack: Nourishing Shampoo, Repairing Conditioner, then two drops of Botanical Hair Oil on damp ends before a cool blow-dry. Finish with Liquid Shine Drops on dry hair, pressed not raked.",
      "The cool shot at the end of a blow-dry is not a flourish. It closes the cuticle so light bounces instead of scattering. That is the entire secret of ‘glass hair’.",
      "Skip this on humid days if your hair is fine — swap oil for the leave-in only. Texture always wins over dogma.",
    ],
  },
  {
    slug: "what-your-scalp-is-trying-to-say",
    title: "What Your Scalp Is Trying to Say",
    excerpt: "Itch, flakes, oil, tightness — a field guide to the most ignored landscape on your body.",
    image: pexels(12811777, 1200),
    category: "Scalp Care",
    author: "Elena Voss",
    date: "January 8, 2026",
    readTime: "7 min",
    content: [
      "We treat the scalp like the soil we forgot was there. Then we are surprised when the garden underperforms.",
      "Itch after washing often means the cleanser is too alkaline. Tightness by afternoon means the barrier is thirsty — try aloe gel as a scalp serum. Persistent flakes that do not move with a gentler shampoo deserve a clinician, not another scrub.",
      "Oil at the roots with dry ends is the most common pattern we see. It is usually a combination of over-washing and under-conditioning the lengths. Wash the scalp; feed the hair.",
      "Once a week, take a photo of your part in daylight. Patterns become obvious when you stop relying on bathroom lighting and memory.",
    ],
  },
  {
    slug: "building-a-slower-bathroom",
    title: "Building a Slower Bathroom",
    excerpt: "How to edit a routine until it feels like a small ceremony instead of a checklist.",
    image: pexels(17911757, 1200),
    category: "Culture",
    author: "Jonah Hale",
    date: "December 14, 2025",
    readTime: "5 min",
    content: [
      "A slower bathroom is not a more expensive one. It is a room with fewer decisions. Keep what you reach for. Let the rest go.",
      "We recommend a cleanser, a treatment, a cream, and one oil. That is a complete ritual for hair and skin. Everything else is a guest star.",
      "Put a small tray by the sink. Put a plant if you will water it. Put a towel you actually like. These are not aesthetics for Instagram; they are cues that tell your nervous system the next ten minutes are not a race.",
      "If a product has lived unopened for a season, it does not belong to your life. Compost the intention and give the bottle to a friend.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3) {
  return posts.filter((post) => post.slug !== slug).slice(0, limit);
}
