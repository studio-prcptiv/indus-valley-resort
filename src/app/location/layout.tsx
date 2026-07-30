import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Location & Directions | Hotel in Pahalgam Near Lidder River, Kashmir",
  description:
    "Located at Dahwatoo, Rafting Point, Pahalgam, Kashmir. Indus Valley Resort offers convenient access to Lidder River (2 km), Betaab Valley (15 km), Aru Valley (12 km), and Srinagar Airport (70 km).",
  keywords: [
    "hotels in pahalgam location",
    "hotel near lidder river pahalgam",
    "hotels near betaab valley",
    "hotels near aru valley",
    "pahalgam map directions",
    "dahwatoo rafting point pahalgam",
  ],
  alternates: {
    canonical: "https://www.indusvalleyresort.com/location",
  },
  openGraph: {
    title: "Location & Directions | Indus Valley Resort Pahalgam Kashmir",
    description:
      "Map and travel instructions for Indus Valley Resort, Pahalgam. Close to Lidder River, Betaab Valley, and Pahalgam Golf Course.",
    url: "https://www.indusvalleyresort.com/location",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Location Map - Indus Valley Resort Pahalgam Kashmir",
      },
    ],
    siteName: "Indus Valley Resort Pahalgam",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Location & Directions | Indus Valley Resort Pahalgam Kashmir",
    description:
      "Map and travel instructions for Indus Valley Resort, Pahalgam. Close to Lidder River, Betaab Valley, and Pahalgam Golf Course.",
    images: ["/og-image.png"],
  },
};

export default function LocationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
