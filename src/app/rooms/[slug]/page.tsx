"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowRight, CheckCircle, Info, Calendar } from "lucide-react";
import { ROOMS, HOTEL_INFO } from "@/data/hotel";
import PageTransition from "@/components/PageTransition";
import Reveal from "@/components/Reveal";
import AnimatedButton from "@/components/AnimatedButton";
import SectionHeading from "@/components/SectionHeading";
import {
  trackBookingStart,
  trackWhatsAppClick,
  trackRoomGalleryInteraction,
} from "@/utils/analytics";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function RoomDetail({ params }: PageProps) {
  const router = useRouter();
  const { slug } = React.use(params);

  const room = ROOMS.find((r) => r.slug === slug);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedPlanKey, setSelectedPlanKey] = useState<"ep" | "cp" | "map" | "ap">("ep");

  if (!room) {
    return (
      <div className="pt-28 sm:pt-32 pb-24 text-center min-h-screen flex flex-col justify-center items-center px-4">
        <h2 className="font-serif text-2xl sm:text-3xl text-stone-950 mb-4">Suite Not Found</h2>
        <p className="text-stone-500 mb-8 text-sm sm:text-base">The requested accommodations could not be located.</p>
        <Link href="/rooms" className="text-amber-700 underline font-bold tracking-widest text-xs uppercase">
          Back to Our Suites
        </Link>
      </div>
    );
  }

  const otherRooms = ROOMS.filter((r) => r.id !== room.id);

  const planNames: Record<"ep" | "cp" | "map" | "ap", { label: string; sub: string }> = {
    ep: { label: "EP (Room Only)", sub: "No Meals Included" },
    cp: { label: "CP (Breakfast)", sub: "Bed & Breakfast" },
    map: { label: "MAP (Half Board)", sub: "Breakfast + Dinner" },
    ap: { label: "AP (Full Board)", sub: "All Meals Included" },
  };

  const currentPriceNum = room.tariffs[selectedPlanKey];
  const currentPriceFormatted = `₹${currentPriceNum.toLocaleString("en-IN")}`;

  const handleBook = () => {
    trackBookingStart(`Room Detail Page Book ${room.title} (${selectedPlanKey.toUpperCase()})`);
    router.push(
      `/booking?room=${encodeURIComponent(room.title)}&plan=${selectedPlanKey.toUpperCase()}`
    );
  };

  const handleEnquire = () => {
    trackWhatsAppClick(`Room Detail Enquire WhatsApp ${room.title}`);
    const msg = `Hi, I would like to enquire about reserving ${room.title} on the ${selectedPlanKey.toUpperCase()} plan (${currentPriceFormatted}/night).`;
    window.open(`https://wa.me/${HOTEL_INFO.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <PageTransition>
      {/* HotelRoom Schema.org JSON-LD for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HotelRoom",
            "name": `${room.title} - Indus Valley Resort Pahalgam`,
            "description": room.desc,
            "image": room.images.map((img) => `https://www.indusvalleyresort.com${img}`),
            "occupancy": {
              "@type": "QuantitativeValue",
              "value": room.maxGuests || "2",
              "unitCode": "C62"
            },
            "offers": {
              "@type": "Offer",
              "price": room.tariffs.ep,
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock",
              "validFrom": "2026-01-01",
              "url": `https://www.indusvalleyresort.com/rooms/${room.slug}`
            },
            "containedInPlace": {
              "@type": "Hotel",
              "name": "Indus Valley Resort",
              "address": "Kullar Road, Nagipora Dahwatoo, Pahalgam, Kashmir 192126"
            }
          })
        }}
      />
      <div className="pt-20 sm:pt-24 bg-stone-50 min-h-screen">
        {/* Banner */}
        <div className="bg-stone-900 text-white py-10 sm:py-16 px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="text-amber-500 uppercase tracking-widest text-[10px] sm:text-xs font-bold mb-2 sm:mb-3 block">
              {room.type} | Direct Booking Perks Available
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight">{room.title}</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Back button */}
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-950 transition-colors uppercase tracking-widest text-[10px] sm:text-xs font-bold mb-6 sm:mb-8 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none focus:rounded-sm"
          >
            &larr; Back to Suites
          </Link>

          {/* Mobile: Sticky booking box */}
          <div className="lg:hidden mb-6">
            <div className="bg-white p-5 shadow-lg rounded-sm border border-stone-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-stone-400 text-[10px] uppercase tracking-widest block font-bold">
                    Selected: {selectedPlanKey.toUpperCase()} Plan
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl text-amber-700 font-sans font-bold tracking-tight">
                      {currentPriceFormatted}
                    </span>
                    <span className="text-stone-400 text-xs font-light">/ night</span>
                  </div>
                </div>
                <span className="text-[9px] uppercase font-bold tracking-widest bg-amber-50 text-amber-800 border border-amber-200 px-2 py-1 rounded-sm">
                  Direct Tariff
                </span>
              </div>
              <div className="flex gap-3">
                <AnimatedButton className="flex-1" onClick={handleBook}>
                  Book Now <ArrowRight size={14} className="text-amber-500" />
                </AnimatedButton>
                <AnimatedButton variant="outline" className="flex-1" onClick={handleEnquire}>
                  Enquire
                </AnimatedButton>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 items-start">
            {/* Left Col: Images + Details */}
            <div className="lg:col-span-2 space-y-8 sm:space-y-12">
              {/* Image Viewer */}
              <div className="space-y-3 sm:space-y-4">
                <div className="relative h-[220px] sm:h-[350px] md:h-[480px] w-full rounded-sm overflow-hidden shadow-xl bg-stone-100">
                  <Image
                    src={room.images[activeImageIndex]}
                    alt={`${room.title} view ${activeImageIndex + 1}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover transition-all duration-500"
                  />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-stone-900/90 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-sm uppercase tracking-widest z-10">
                    {activeImageIndex + 1} / {room.images.length}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {room.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => { setActiveImageIndex(index); trackRoomGalleryInteraction(room.title); }}
                      className={`relative w-16 h-12 sm:w-28 sm:h-20 rounded-sm overflow-hidden border-2 transition-all flex-shrink-0 ${
                        activeImageIndex === index
                          ? "border-amber-600 scale-95 shadow-md"
                          : "border-transparent opacity-65 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt={`Thumbnail ${index + 1}`} fill sizes="112px" className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Description + Selectable Meal Plans */}
              <div className="bg-white p-5 sm:p-8 md:p-12 shadow-sm rounded-sm border border-stone-100 space-y-6 sm:space-y-8">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-stone-950 mb-3 sm:mb-4">Suite Description</h2>
                  <p className="text-stone-600 font-light leading-relaxed text-sm sm:text-lg">{room.desc}</p>
                </div>

                {/* Selectable Meal Plans Section */}
                <div className="border-t border-stone-100 pt-6 sm:pt-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-stone-950">Select Your Meal Plan</h3>
                      <p className="text-xs text-stone-500 font-light mt-0.5">
                        Click on a meal plan below to select and view updated night rates.
                      </p>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-sm self-start sm:self-auto">
                      Selected: {selectedPlanKey.toUpperCase()} Plan
                    </span>
                  </div>

                  {/* 4 Interactive Meal Plan Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                    {(["ep", "cp", "map", "ap"] as const).map((key) => {
                      const isSelected = selectedPlanKey === key;
                      const planPrice = room.tariffs[key];
                      const isMap = key === "map";

                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setSelectedPlanKey(key)}
                          className={`relative flex flex-col justify-between p-4 rounded-sm border text-left transition-all cursor-pointer ${
                            isSelected
                              ? "bg-amber-50/60 border-amber-600 ring-2 ring-amber-500 shadow-md scale-[1.02]"
                              : "bg-stone-50/70 border-stone-200 hover:border-amber-400 hover:bg-stone-50"
                          }`}
                        >
                          {/* Badge tag inside flex flow to prevent ANY overlap */}
                          {isMap && (
                            <div className="mb-2">
                              <span className="inline-block bg-amber-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-xs uppercase tracking-wider">
                                Most Popular
                              </span>
                            </div>
                          )}

                          <div className="flex justify-between items-start w-full">
                            <span className="text-xs uppercase font-bold tracking-wider text-stone-950">
                              {planNames[key].label}
                            </span>
                            {isSelected && (
                              <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 ml-1" />
                            )}
                          </div>

                          <span className="text-stone-400 text-[10px] font-light mt-1 block">
                            {planNames[key].sub}
                          </span>

                          <div className="mt-3 pt-2 border-t border-stone-200/60">
                            <span className="text-xl font-sans font-bold tracking-tight text-stone-950">
                              ₹{planPrice.toLocaleString("en-IN")}/-
                            </span>
                            <span className="text-[10px] text-stone-400 block font-light">per night</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Extra Bed & Child Policy Breakdown */}
                  <div className="bg-stone-50 p-4 sm:p-5 rounded-sm border border-stone-200/80 space-y-3 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="font-bold uppercase tracking-wider text-stone-950">Extra Bed Charges:</span>
                      <span className="font-sans font-semibold text-amber-800 text-xs">
                        EP: ₹400 | CP: ₹700 | MAP: ₹1,000 | AP: ₹1,300
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-t border-stone-200/60 pt-2">
                      <span className="font-bold uppercase tracking-wider text-stone-950">Child Policy (Below 5 yrs):</span>
                      <span className="text-amber-700 font-medium">Complimentary</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-t border-stone-200/60 pt-2">
                      <span className="font-bold uppercase tracking-wider text-stone-950">CWOB (Child Without Bed):</span>
                      <span className="font-sans font-semibold text-amber-800 text-xs">
                        EP: Free | CP: ₹400 | MAP: ₹600 | AP: ₹800
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="border-t border-stone-100 pt-6 sm:pt-8">
                  <h3 className="font-serif text-xl sm:text-2xl text-stone-950 mb-4 sm:mb-6">Amenity Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {room.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 sm:gap-3 text-stone-600">
                        <CheckCircle className="text-amber-600 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm font-light">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rules */}
                <div className="border-t border-stone-100 pt-6 sm:pt-8 bg-amber-50/30 p-4 sm:p-6 rounded-sm">
                  <h4 className="font-bold font-sans text-[10px] sm:text-xs text-stone-950 uppercase tracking-widest mb-2 sm:mb-3 flex items-center gap-2">
                    <Info size={14} className="text-amber-600" aria-hidden="true" /> Suite Rules & Guidelines
                  </h4>
                  <ul className="text-[10px] sm:text-xs text-stone-500 space-y-1.5 sm:space-y-2 leading-relaxed pl-4 sm:pl-6 list-disc">
                    <li>Standard check-in time is 2:00 PM and check-out is 12:00 PM.</li>
                    <li>Complimentary high-speed Wi-Fi is provided throughout the wing.</li>
                    <li>Central heating schedules are adjusted automatically.</li>
                    <li>24/7 hot water supply is standard.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Col: Desktop Booking Sidebar */}
            <div className="hidden lg:block lg:col-span-1 lg:sticky lg:top-28 space-y-6">
              <div className="bg-white p-8 shadow-lg rounded-sm border border-stone-200 text-center">
                <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-50 text-amber-800 border border-amber-200/50 px-2 py-0.5 rounded-sm inline-block mb-3">
                  Direct Tariff Rate
                </span>
                <span className="text-stone-400 text-xs uppercase tracking-widest block mb-1">
                  Rate for {selectedPlanKey.toUpperCase()} Plan
                </span>
                <div className="flex items-baseline justify-center gap-2 mb-6">
                  <span className="text-4xl text-amber-700 font-sans font-bold tracking-tight">
                    {currentPriceFormatted}
                  </span>
                  <span className="text-stone-400 text-sm font-light">/ night</span>
                </div>

                <div className="text-left border-y border-stone-100 py-4 my-6 space-y-3">
                  {[
                    `Selected Plan: ${planNames[selectedPlanKey].label}`,
                    "Best Rate Guarantee",
                    "Child below 5 Complimentary",
                  ].map((perk, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-stone-600 font-light">
                      <CheckCircle className="text-stone-800 w-4 h-4 flex-shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <AnimatedButton className="w-full" onClick={handleBook}>
                    Book with {selectedPlanKey.toUpperCase()} Plan <ArrowRight size={16} className="text-amber-500" />
                  </AnimatedButton>
                  <AnimatedButton variant="outline" className="w-full" onClick={handleEnquire}>
                    Enquire on WhatsApp
                  </AnimatedButton>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-center gap-2 text-xs text-stone-400">
                  <Calendar size={14} className="text-amber-600" aria-hidden="true" />
                  <span>Free cancellation up to 7 days prior</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Suites */}
        <div className="bg-stone-100 py-16 sm:py-24 border-t border-stone-200/50">
          <div className="container mx-auto px-4 sm:px-6">
            <SectionHeading sub="Accommodations" title="Explore Alternative Suites" center={true} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 mt-8 sm:mt-12 max-w-4xl mx-auto">
              {otherRooms.map((r, idx) => (
                <Reveal key={r.id} delay={idx * 0.1}>
                  <div
                    onClick={() => { setActiveImageIndex(0); router.push(`/rooms/${r.slug}`); }}
                    className="group bg-white rounded-sm shadow-sm hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-stone-100 cursor-pointer flex flex-col h-full"
                  >
                    <div className="relative h-48 sm:h-64 overflow-hidden bg-stone-100">
                      <Image src={r.image} alt={r.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-stone-900/90 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 uppercase tracking-widest font-bold z-10">{r.type}</div>
                    </div>
                    <div className="p-5 sm:p-8 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl text-stone-950 mb-2 sm:mb-3 group-hover:text-amber-600 transition-colors">{r.title}</h3>
                        <p className="text-stone-500 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 font-light">{r.desc}</p>
                      </div>
                      <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-stone-50 text-[10px] sm:text-xs uppercase tracking-widest font-bold text-amber-700">
                        <span>Details & Rates</span>
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
