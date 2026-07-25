import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Booking | Direct Hotel Reservation Pahalgam Kashmir",
  description:
    "Get in touch with Indus Valley Resort in Pahalgam, Kashmir. Call or WhatsApp +91 8899901175 for direct room booking discounts, custom tour inquiries, and concierge service.",
  keywords: [
    "contact hotels in pahalgam",
    "pahalgam hotel whatsapp booking",
    "indus valley resort phone number",
    "direct reservation pahalgam kashmir",
  ],
  alternates: {
    canonical: "https://www.indusvalleyresort.com/contact",
  },
  openGraph: {
    title: "Contact & Booking | Indus Valley Resort Pahalgam Kashmir",
    description:
      "Contact our 24/7 concierge for direct reservations, room upgrades, and travel guidance in Pahalgam, Kashmir.",
    url: "https://www.indusvalleyresort.com/contact",
    images: ["/hotel/1.jpeg"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
