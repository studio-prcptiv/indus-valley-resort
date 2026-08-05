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

  const imageUrl = room.image ? `https://hotelindusvalley.com${room.image}` : "https://hotelindusvalley.com/og-image.png";
  const imageType = room.image?.endsWith(".png") ? "image/png" : "image/jpeg";

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
      canonical: `https://hotelindusvalley.com/rooms/${slug}`,
    },
    openGraph: {
      title: `${room.title} | Indus Valley Resort Pahalgam Kashmir`,
      description: room.desc,
      url: `https://hotelindusvalley.com/rooms/${slug}`,
      images: [
        {
          url: imageUrl,
          secureUrl: imageUrl,
          width: 1200,
          height: 630,
          type: imageType,
          alt: `${room.title} - Indus Valley Resort Pahalgam Kashmir`,
        },
        {
          url: "https://hotelindusvalley.com/og-image.png",
          secureUrl: "https://hotelindusvalley.com/og-image.png",
          width: 1200,
          height: 630,
          type: "image/png",
          alt: "Indus Valley Resort Pahalgam Kashmir",
        },
      ],
      siteName: "Indus Valley Resort Pahalgam",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${room.title} | Indus Valley Resort Pahalgam Kashmir`,
      description: room.desc,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${room.title} - Indus Valley Resort Pahalgam Kashmir`,
        },
      ],
    },
  };
}

export default function RoomDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
