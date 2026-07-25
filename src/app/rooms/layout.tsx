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
    canonical: "https://www.indusvalleyresort.com/rooms",
  },
  openGraph: {
    title: "Rooms & Seasonal Tariffs | Indus Valley Resort Pahalgam Kashmir",
    description:
      "Direct room tariffs for Mountain View Balcony, Family, and Deluxe rooms in Pahalgam, Kashmir. Transparent rates with flexible meal plan options.",
    url: "https://www.indusvalleyresort.com/rooms",
    images: ["/rooms/mountainview/1.jpeg"],
  },
};

export default function RoomsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
