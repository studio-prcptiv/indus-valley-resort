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
    canonical: "https://hotelindusvalley.com/contact",
  },
  openGraph: {
    title: "Contact & Booking | Indus Valley Resort Pahalgam Kashmir",
    description:
      "Contact our 24/7 concierge for direct reservations, room upgrades, and travel guidance in Pahalgam, Kashmir.",
    url: "https://hotelindusvalley.com/contact",
    images: [
      {
        url: "https://hotelindusvalley.com/og-image.png",
        secureUrl: "https://hotelindusvalley.com/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Contact Indus Valley Resort Pahalgam Kashmir",
      },
    ],
    siteName: "Indus Valley Resort Pahalgam",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Booking | Indus Valley Resort Pahalgam Kashmir",
    description:
      "Contact our 24/7 concierge for direct reservations, room upgrades, and travel guidance in Pahalgam, Kashmir.",
    images: [
      {
        url: "https://hotelindusvalley.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact Indus Valley Resort Pahalgam Kashmir",
      },
    ],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
