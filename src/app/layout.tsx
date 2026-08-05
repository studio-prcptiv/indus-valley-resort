import type { Metadata } from "next";
import SmoothScrolling from "@/components/SmoothScrolling";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./index.css";
import "lenis/dist/lenis.css";
import React from "react";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://hotelindusvalley.com"),
  title: {
    default: "Indus Valley Resort | Best Luxury Hotel in Pahalgam, Kashmir",
    template: "%s | Indus Valley Resort Pahalgam",
  },
  description:
    "Looking for the best hotels in Pahalgam, Kashmir? Book directly at Indus Valley Resort at Dahwatoo, Rafting Point, Pahalgam. Experience mountain view balcony rooms from ₹2,500/night, EP/CP/MAP/AP meal plans, 24/7 hot water, central heating, and authentic Kashmiri Wazwan.",
  keywords: [
    "hotels in pahalgam",
    "hotels in kashmir",
    "best hotel in pahalgam",
    "luxury resort in pahalgam",
    "resorts in pahalgam kashmir",
    "pahalgam hotel room price",
    "hotels near lidder river pahalgam",
    "indus valley resort pahalgam",
    "deluxe room in pahalgam",
    "family hotels in pahalgam",
    "kashmir luxury hotels",
    "pahalgam hotel booking",
    "cheap hotels in pahalgam",
    "top 10 hotels in pahalgam",
    "pahalgam resorts with balcony view",
  ],
  authors: [{ name: "Indus Valley Resort Pahalgam" }],
  creator: "Indus Valley Resort",
  publisher: "Indus Valley Resort",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: ["/favicon.png"],
    apple: [{ url: "/favicon.png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://hotelindusvalley.com",
  },
  openGraph: {
    type: "website",
    url: "https://hotelindusvalley.com",
    title: "Indus Valley Resort | Best Luxury Hotel & Resort in Pahalgam, Kashmir",
    description:
      "Book your stay at Indus Valley Resort, Pahalgam. Luxury mountain rooms, balcony valley views, flexible meal plans (EP, CP, MAP, AP), and authentic Kashmiri Wazwan.",
    images: [
      {
        url: "https://hotelindusvalley.com/og-image.png",
        secureUrl: "https://hotelindusvalley.com/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Indus Valley Resort Luxury Hotel in Pahalgam Kashmir",
      },
    ],
    siteName: "Indus Valley Resort Pahalgam",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Indus Valley Resort | Best Luxury Hotel in Pahalgam, Kashmir",
    description:
      "Luxury hotel in Pahalgam with mountain balcony views, central heating, 24/7 hot water, and Kashmiri Wazwan dining. Direct booking rates.",
    images: [
      {
        url: "https://hotelindusvalley.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Indus Valley Resort Luxury Hotel in Pahalgam Kashmir",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Hotel & Lodging Business Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Hotel", "Resort", "LodgingBusiness"],
              "name": "Indus Valley Resort",
              "alternateName": ["Hotel Indus Valley Resort Pahalgam", "Indus Valley Resort Kashmir"],
              "image": [
                "https://hotelindusvalley.com/og-image.png",
                "https://hotelindusvalley.com/hotel/1.jpeg",
                "https://hotelindusvalley.com/hotel/2.jpeg",
                "https://hotelindusvalley.com/rooms/mountainview/1.jpeg",
              ],
              "logo": "https://hotelindusvalley.com/logo.png",
              "description": "Indus Valley Resort is a luxury mountain resort located in Pahalgam, Kashmir. Offering mountain view balcony suites, central heating, 24/7 hot water, authentic Kashmiri Wazwan dining, and proximity to Lidder River and Betaab Valley.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Dahwatoo, Rafting Point",
                "addressLocality": "Pahalgam",
                "addressRegion": "Jammu and Kashmir",
                "postalCode": "1920401",
                "addressCountry": "IN",
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 33.920263,
                "longitude": 75.269961,
              },
              "url": "https://hotelindusvalley.com",
              "telephone": "+918899901175",
              "email": "indusvalleyresortpahalgam@gmail.com",
              "priceRange": "₹2000 - ₹7500",
              "starRating": {
                "@type": "Rating",
                "ratingValue": "4.8",
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "142",
                "bestRating": "5",
                "worstRating": "1",
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "00:00",
                "closes": "23:59"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+918899901175",
                  "contactType": "reservations",
                  "availableLanguage": ["English", "Hindi", "Kashmiri"],
                },
              ],
              "amenityFeature": [
                { "@type": "LocationFeatureSpecification", "name": "Mountain View Balcony", "value": "True" },
                { "@type": "LocationFeatureSpecification", "name": "Central Heating", "value": "True" },
                { "@type": "LocationFeatureSpecification", "name": "24/7 Hot Water", "value": "True" },
                { "@type": "LocationFeatureSpecification", "name": "Kashmiri Wazwan Restaurant", "value": "True" },
                { "@type": "LocationFeatureSpecification", "name": "Lobby Lounge & Kahwa Bar", "value": "True" },
                { "@type": "LocationFeatureSpecification", "name": "Free High-Speed Wi-Fi", "value": "True" },
                { "@type": "LocationFeatureSpecification", "name": "Free Parking", "value": "True" },
              ],
              "containsPlace": [
                { "@type": "TouristAttraction", "name": "Lidder River", "distance": "2 km" },
                { "@type": "TouristAttraction", "name": "Betaab Valley", "distance": "15 km" },
                { "@type": "TouristAttraction", "name": "Aru Valley", "distance": "12 km" },
                { "@type": "TouristAttraction", "name": "Pahalgam Golf Course", "distance": "3 km" }
              ]
            }),
          }}
        />
      </head>
      <body>
        {/* Google Analytics Script via next/script component */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Skip to Main Content Link for Keyboard Accessibility (WCAG AA Compliance) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-amber-600 focus:text-white focus:px-6 focus:py-3 focus:z-50 focus:rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans text-sm font-bold uppercase tracking-wider shadow-xl"
        >
          Skip to main content
        </a>

        <SmoothScrolling>
          <Navigation />
          <main id="main-content" tabIndex={-1} className="min-h-screen focus:outline-none">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <WhatsAppButton mobileOnly={true} />
        </SmoothScrolling>
      </body>
    </html>
  );
}
