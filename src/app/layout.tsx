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
  title: "The Indus Valley Resort | Luxury Resort in Pahalgam, Kashmir",
  description:
    "Book directly at The Indus Valley Resort, Pahalgam for best rates guaranteed. Experience luxury mountain accommodations, authentic Kashmiri Wazwan dining, and breathtaking valley views.",
  keywords: [
    "The Indus Valley Resort",
    "Pahalgam hotel",
    "luxury resort Pahalgam",
    "direct booking Pahalgam",
    "Kashmiri Wazwan",
    "Pahalgam luxury suites",
  ],
  authors: [{ name: "The Indus Valley Resort" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://indusvalleyresort.com/",
  },
  openGraph: {
    type: "website",
    url: "https://indusvalleyresort.com/",
    title: "The Indus Valley Resort | Luxury Resort & Suites in Pahalgam",
    description:
      "Experience luxury mountain accommodations in Pahalgam with authentic Kashmiri Wazwan dining and serene river views. Book direct for room upgrades.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "The Indus Valley Resort Luxury Lounge",
      },
    ],
    siteName: "The Indus Valley Resort",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Indus Valley Resort | Luxury Resort & Suites in Pahalgam",
    description:
      "Experience luxury mountain accommodations in Pahalgam with authentic Kashmiri Wazwan dining. Book direct for best rates.",
    images: [
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200",
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
        <link rel="icon" href="/icon.png" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preconnect lists */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hotel",
              "name": "The Indus Valley Resort",
              "image": [
                "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1200",
              ],
              "description": "Premium luxury meeting mountain tradition in Pahalgam. Enjoy central heating, regional hospitality, and authentic Wazwan dining.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Kullar Road, Nagipora Dahwatoo",
                "addressLocality": "Pahalgam",
                "addressRegion": "Jammu & Kashmir",
                "postalCode": "192401",
                "addressCountry": "India",
              },
              "url": "https://indusvalleyresort.com/",
              "telephone": "+919797800119",
              "email": "contact@indusvalleyresort.com",
              "priceRange": "₹16500 - ₹28500",
              "starRating": {
                "@type": "Rating",
                "ratingValue": "5",
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "128",
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+919797800119",
                  "contactType": "customer service",
                  "availableLanguage": ["English", "Hindi", "Kashmiri"],
                },
              ],
              "amenityFeature": [
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Luxury Rooms & Suites",
                  "value": "True",
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Kashmiri Wazwan Restaurant",
                  "value": "True",
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Central Heating",
                  "value": "True",
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Mountain & River Views",
                  "value": "True",
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Free Wi-Fi",
                  "value": "True",
                },
              ],
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
