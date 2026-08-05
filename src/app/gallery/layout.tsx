import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery | Indus Valley Resort Pahalgam Kashmir Views",
  description:
    "Explore high-definition photos of Indus Valley Resort in Pahalgam, Kashmir. Browse luxury mountain view balcony suites, family rooms, dining lounge, and valley vistas.",
  keywords: [
    "pahalgam hotel photos",
    "kashmir resort images",
    "indus valley resort gallery",
    "pahalgam mountain view room photos",
  ],
  alternates: {
    canonical: "https://hotelindusvalley.com/gallery",
  },
  openGraph: {
    title: "Photo Gallery | Indus Valley Resort Pahalgam Kashmir",
    description:
      "Full-screen photo gallery showcasing accommodations, interiors, and scenic mountain views at Indus Valley Resort, Pahalgam.",
    url: "https://hotelindusvalley.com/gallery",
    images: [
      {
        url: "https://hotelindusvalley.com/og-image.png",
        secureUrl: "https://hotelindusvalley.com/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Photo Gallery - Indus Valley Resort Pahalgam Kashmir",
      },
    ],
    siteName: "Indus Valley Resort Pahalgam",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Gallery | Indus Valley Resort Pahalgam Kashmir",
    description:
      "Full-screen photo gallery showcasing accommodations, interiors, and scenic mountain views at Indus Valley Resort, Pahalgam.",
    images: [
      {
        url: "https://hotelindusvalley.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Photo Gallery - Indus Valley Resort Pahalgam Kashmir",
      },
    ],
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
