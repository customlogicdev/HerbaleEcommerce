import type { TeamMember, Testimonial } from "@/types";
import { pexels } from "@/lib/utils";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Amelia Chen",
    role: "Colorist, Brooklyn",
    quote:
      "I recommend HairBloom to every client who wants their color to last. The shampoo is gentle enough for a fresh balayage and the oil is the only one that does not collapse my blowouts.",
    rating: 5,
    avatar: pexels(38058164, 240),
  },
  {
    id: "t2",
    name: "Priya Raman",
    role: "Yoga teacher, Austin",
    quote:
      "The growth serum became a nightly meditation. I sit on the edge of the tub, take a minute, and my hairline has never looked this full. The ritual is the product.",
    rating: 5,
    avatar: pexels(6954004, 240),
  },
  {
    id: "t3",
    name: "Leah Brooks",
    role: "Founder, Still Studio",
    quote:
      "Finally a clean brand that does not smell like a candle shop. Everything is quiet, green, and it actually works on 3C hair. The mask is a weekly non-negotiable.",
    rating: 5,
    avatar: pexels(18968720, 240),
  },
];

export const team: TeamMember[] = [
  {
    name: "Elena Voss",
    role: "Founder & Formulator",
    bio: "A botanist who left a fragrance house to make haircare that reads like a garden, not a laboratory accident.",
    image: pexels(6635916, 800),
  },
  {
    name: "Dr. Anika Sharma",
    role: "Head of Ayurveda",
    bio: "Bridges classical texts with modern safety data so every oil has both a lineage and a lab note.",
    image: pexels(7010902, 800),
  },
  {
    name: "Jonah Hale",
    role: "Creative Director",
    bio: "Keeps the brand quiet on purpose. If a bottle needs to shout, the formula is not finished.",
    image: pexels(10125608, 800),
  },
];

export const instagramImages = [
  { src: pexels(38714663, 700), alt: "Long glossy hair in daylight" },
  { src: "/images/hero-products.jpg", alt: "HairBloom bottles on stone" },
  { src: pexels(7038174, 700), alt: "Serum among leaves" },
  { src: "/images/story-woman.jpg", alt: "Woman with botanical leaves" },
  { src: pexels(17911757, 700), alt: "Spa still life" },
  { src: pexels(17397001, 700), alt: "Woman in a sunlit forest" },
];

export const values = [
  {
    title: "Our Mission",
    body: "To make ritual-grade herbal care that is honest about ingredients, kind to waterways, and beautiful enough to leave on the sink.",
  },
  {
    title: "Our Values",
    body: "We formulate without sulfates, parabens, or mineral oil. We pay living wages at our partner farms. We print less and refill more.",
  },
  {
    title: "Our Ingredients",
    body: "Rosemary from coastal Croatia, aloe from a family farm in Texas, sesame from a cooperative in Kerala. Traceable, seasonal, never anonymous.",
  },
];
