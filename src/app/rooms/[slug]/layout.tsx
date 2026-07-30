import type { Metadata } from "next";
import { ROOMS } from "@/data/hotel";

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = ROOMS.find((r) => r.slug === slug);

  if (!room) {
    return {
      title: "Suite Not Found | Indus Valley Resort Pahalgam",
    };
  }

  return {
    title: `${room.title} | Hotel Room Booking Pahalgam Kashmir`,
    description: `Book ${room.title} at Indus Valley Resort in Pahalgam, Kashmir. ${room.desc} Mountain balcony views starting at ₹${room.tariffs.ep.toLocaleString("en-IN")}/night.`,
    keywords: [
      `${room.title.toLowerCase()} pahalgam`,
      `hotel room pahalgam`,
      `stay in pahalgam kashmir`,
      `indus valley resort ${slug}`,
      "mountain view balcony room pahalgam",
    ],
    alternates: {
      canonical: `https://www.indusvalleyresort.com/rooms/${slug}`,
    },
    openGraph: {
      title: `${room.title} | Indus Valley Resort Pahalgam Kashmir`,
      description: room.desc,
      url: `https://www.indusvalleyresort.com/rooms/${slug}`,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${room.title} - Indus Valley Resort Pahalgam Kashmir`,
        },
      ],
      siteName: "Indus Valley Resort Pahalgam",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${room.title} | Indus Valley Resort Pahalgam Kashmir`,
      description: room.desc,
      images: ["/og-image.png"],
    },
  };
}

export default function RoomDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
