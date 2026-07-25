import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reserve Your Stay | Direct Hotel Booking Pahalgam Kashmir",
  description:
    "Book your room directly at Indus Valley Resort, Pahalgam. Guaranteed best rates on Mountain View Balcony Rooms, Family Suites, and Deluxe Rooms with EP, CP, MAP, and AP meal plans.",
  keywords: [
    "book hotel in pahalgam",
    "direct hotel booking kashmir",
    "reserve room indus valley resort pahalgam",
    "best hotel rates pahalgam",
  ],
  alternates: {
    canonical: "https://www.indusvalleyresort.com/booking",
  },
  openGraph: {
    title: "Reserve Your Stay | Indus Valley Resort Pahalgam Kashmir",
    description:
      "Direct room reservation form for Indus Valley Resort, Pahalgam. Unlock direct booking perks and best rate guarantees.",
    url: "https://www.indusvalleyresort.com/booking",
    images: ["/hotel/1.jpeg"],
  },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
