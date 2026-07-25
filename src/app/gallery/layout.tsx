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
    canonical: "https://www.indusvalleyresort.com/gallery",
  },
  openGraph: {
    title: "Photo Gallery | Indus Valley Resort Pahalgam Kashmir",
    description:
      "Full-screen photo gallery showcasing accommodations, interiors, and scenic mountain views at Indus Valley Resort, Pahalgam.",
    url: "https://www.indusvalleyresort.com/gallery",
    images: ["/gallery/1.jpeg"],
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
