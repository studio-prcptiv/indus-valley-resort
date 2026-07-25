import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Location & Directions | Hotel in Pahalgam Near Lidder River, Kashmir",
  description:
    "Located on Kullar Road in Nagipora Dahwatoo, Pahalgam, Kashmir. Indus Valley Resort offers convenient access to Lidder River (2 km), Betaab Valley (15 km), Aru Valley (12 km), and Srinagar Airport (90 km).",
  keywords: [
    "hotels in pahalgam location",
    "hotel near lidder river pahalgam",
    "hotels near betaab valley",
    "hotels near aru valley",
    "pahalgam map directions",
    "kullar road nagipora dahwatoo pahalgam",
  ],
  alternates: {
    canonical: "https://www.indusvalleyresort.com/location",
  },
  openGraph: {
    title: "Location & Directions | Indus Valley Resort Pahalgam Kashmir",
    description:
      "Map and travel instructions for Indus Valley Resort, Pahalgam. Close to Lidder River, Betaab Valley, and Pahalgam Golf Course.",
    url: "https://www.indusvalleyresort.com/location",
    images: ["/hotel/1.jpeg"],
  },
};

export default function LocationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
