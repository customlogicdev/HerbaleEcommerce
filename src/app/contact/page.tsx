import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Write to the HairBloom studio — we read every note.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.22em] text-forest uppercase">Studio</p>
      <h1 className="mt-2 font-serif text-5xl">We would love to hear from you</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <p className="text-sm leading-7 text-muted">
            Questions about an order, an ingredient, or a stubborn dry scalp? The garden desk is open weekdays 9–5 PT.
          </p>
          <div className="space-y-4 text-sm">
            <p className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-forest" /> +1 (555) 123-4567
            </p>
            <p className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-forest" /> hello@hairbloom.com
            </p>
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-forest" />
              123 Greenway Blvd
              <br />
              San Francisco, CA 94107
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-beige">
            <iframe
              title="HairBloom studio map"
              className="h-64 w-full"
              loading="lazy"
              src="https://maps.google.com/maps?q=San%20Francisco%20CA%2094107&t=&z=13&ie=UTF8&iwloc=&output=embed"
            />
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
