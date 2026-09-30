import { Hero } from "@/components/home/Hero";
import { TrustBadges } from "@/components/home/TrustBadges";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { BestSellers } from "@/components/home/BestSellers";
import { StoryBanner } from "@/components/home/StoryBanner";
import { PromoBanners } from "@/components/home/PromoBanners";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { Newsletter } from "@/components/home/Newsletter";
import { PromiseBar } from "@/components/home/PromiseBar";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <CategoryGrid />
      <BestSellers />
      <StoryBanner />
      <PromoBanners />
      <Testimonials />
      <InstagramFeed />
      <Newsletter />
      <PromiseBar />
    </>
  );
}
