import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rooms & Seasonal Tariffs | Best Hotel Room Price in Pahalgam, Kashmir",
  description:
    "Explore room tariffs at Indus Valley Resort, Pahalgam. Choose from Mountain View Balcony Rooms, Family Suites, and Deluxe Rooms starting at ₹2,000/night with EP, CP, MAP & AP meal plans.",
  keywords: [
    "hotels in pahalgam room price",
    "pahalgam hotel rates",
    "mountain view room pahalgam",
    "family room hotel pahalgam",
    "deluxe room hotel pahalgam kashmir",
    "best resort tariffs pahalgam",
    "ep cp map ap meal plans pahalgam",
  ],
  alternates: {
    canonical: "https://hotelindusvalley.com/rooms",
  },
  openGraph: {
    title: "Rooms & Seasonal Tariffs | Indus Valley Resort Pahalgam Kashmir",
    description:
      "Direct room tariffs for Mountain View Balcony, Family, and Deluxe rooms in Pahalgam, Kashmir. Transparent rates with flexible meal plan options.",
    url: "https://hotelindusvalley.com/rooms",
    images: [
      {
        url: "https://hotelindusvalley.com/og-image.png",
        secureUrl: "https://hotelindusvalley.com/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Rooms & Seasonal Tariffs - Indus Valley Resort Pahalgam Kashmir",
      },
    ],
    siteName: "Indus Valley Resort Pahalgam",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rooms & Seasonal Tariffs | Indus Valley Resort Pahalgam Kashmir",
    description:
      "Direct room tariffs for Mountain View Balcony, Family, and Deluxe rooms in Pahalgam, Kashmir. Transparent rates with flexible meal plan options.",
    images: [
      {
        url: "https://hotelindusvalley.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rooms & Seasonal Tariffs - Indus Valley Resort Pahalgam Kashmir",
      },
    ],
  },
};

export default function RoomsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
