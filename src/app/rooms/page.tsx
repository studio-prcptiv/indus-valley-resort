"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import { ROOMS } from "@/data/hotel";
import PageTransition from "@/components/PageTransition";
import Reveal from "@/components/Reveal";
import AnimatedButton from "@/components/AnimatedButton";
import { trackBookingStart } from "@/utils/analytics";

import TariffTable from "@/components/TariffTable";

export default function Rooms() {
  const router = useRouter();

  const handleBook = (roomTitle: string) => {
    router.push(`/booking?room=${encodeURIComponent(roomTitle)}`);
  };

  return (
    <PageTransition>
      <div className="pt-20 sm:pt-24">
        {/* Banner */}
        <div className="bg-stone-900 text-white py-14 sm:py-20 text-center px-4">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4"
          >
            Our Rooms & Tariffs
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-stone-300 max-w-2xl mx-auto font-light text-sm sm:text-base px-2"
          >
            Refined mountain luxury. Transparent seasonal tariffs with flexible meal plan options (EP, CP, MAP, AP).
          </motion.p>
        </div>

        {/* Room Listings */}
        <div className="py-12 sm:pt-20 sm:pb-16 container mx-auto px-4 sm:px-6">
          <div className="space-y-16 sm:space-y-24 md:space-y-32">
            {ROOMS.map((room, idx) => (
              <Reveal key={room.id} delay={idx * 0.1}>
                <div
                  className={`flex flex-col ${
                    idx % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"
                  } gap-8 sm:gap-12 lg:gap-24 items-center`}
                >
                  {/* Image container */}
                  <div
                    className="w-full md:w-1/2 relative group cursor-pointer h-[250px] sm:h-[350px] lg:h-[450px]"
                    onClick={() => {
                      trackBookingStart(`Rooms Listing Image ${room.title}`);
                      router.push(`/rooms/${room.slug}`);
                    }}
                  >
                    <div className="absolute inset-0 bg-stone-900/5 transform translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 rounded-sm transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />
                    <div className="relative w-full h-full overflow-hidden rounded-sm shadow-2xl">
                      <Image
                        src={room.image}
                        alt={room.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={idx === 0}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-bold tracking-widest text-stone-950 uppercase shadow-lg z-10">
                        {room.type}
                      </div>
                    </div>
                  </div>

                  {/* Details container */}
                  <div className="w-full md:w-1/2">
                    <h3
                      className="font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-950 mb-3 sm:mb-4 cursor-pointer hover:text-amber-600 transition-colors"
                      onClick={() => {
                        trackBookingStart(`Rooms Listing Title ${room.title}`);
                        router.push(`/rooms/${room.slug}`);
                      }}
                    >
                      {room.title}
                    </h3>

                    {/* Price + badge row */}
                    <div className="flex flex-wrap items-baseline gap-3 sm:gap-4 mb-3 sm:mb-4 border-b border-stone-200 pb-3 sm:pb-4">
                      <span className="text-xl sm:text-2xl text-amber-700 font-medium font-sans">Starts at {room.price}/-</span>
                      <span className="text-stone-400 text-xs sm:text-sm font-light">(EP / Room Only)</span>
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest bg-amber-50 text-amber-800 border border-amber-200/50 px-2 py-0.5 rounded-sm">
                        Direct Rate
                      </span>
                    </div>

                    {/* Room specs */}
                    <div className="flex flex-wrap gap-4 sm:gap-6 text-[10px] sm:text-xs uppercase tracking-wider text-stone-500 font-bold mb-4 sm:mb-6">
                      <span>✦ Size: {room.size || "30 m²"}</span>
                      <span>✦ Max: {room.maxGuests || "2 Guests"}</span>
                    </div>

                    {/* Tariffs preview pill grid */}
                    <div className="bg-stone-50 p-3 sm:p-4 rounded-sm border border-stone-200/80 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                      <div>
                        <div className="text-[9px] uppercase tracking-wider text-stone-400 font-bold">EP</div>
                        <div className="font-sans font-bold tracking-tight text-stone-900">₹{room.tariffs.ep.toLocaleString("en-IN")}/-</div>
                      </div>
                      <div>
                        <div className="text-[9px] uppercase tracking-wider text-stone-400 font-bold">CP</div>
                        <div className="font-sans font-bold tracking-tight text-stone-900">₹{room.tariffs.cp.toLocaleString("en-IN")}/-</div>
                      </div>
                      <div className="bg-amber-100/50 rounded py-0.5 border border-amber-200">
                        <div className="text-[9px] uppercase tracking-wider text-amber-800 font-bold">MAP</div>
                        <div className="font-sans font-bold tracking-tight text-amber-900">₹{room.tariffs.map.toLocaleString("en-IN")}/-</div>
                      </div>
                      <div>
                        <div className="text-[9px] uppercase tracking-wider text-stone-400 font-bold">AP</div>
                        <div className="font-sans font-bold tracking-tight text-stone-900">₹{room.tariffs.ap.toLocaleString("en-IN")}/-</div>
                      </div>
                    </div>

                    <p className="text-stone-600 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base font-light">{room.desc}</p>
                    
                    {/* Features grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-6 sm:gap-x-8 mb-8 sm:mb-10">
                      {room.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-stone-600">
                          <div className="p-0.5 sm:p-1 rounded-full bg-stone-100 text-amber-600">
                            <ChevronRight size={12} />
                          </div>
                          {feat}
                        </div>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <AnimatedButton
                        onClick={() => {
                          trackBookingStart(`Rooms Listing Book Now ${room.title}`);
                          handleBook(room.title);
                        }}
                      >
                        Book this Room <ArrowRight size={16} className="text-amber-500" />
                      </AnimatedButton>
                      <AnimatedButton
                        variant="outline"
                        onClick={() => {
                          trackBookingStart(`Rooms Listing View Details ${room.title}`);
                          router.push(`/rooms/${room.slug}`);
                        }}
                      >
                        View Details & Tariffs
                      </AnimatedButton>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Full Tariff Table Section */}
          <Reveal delay={0.2}>
            <div className="mt-20 sm:mt-28">
              <TariffTable />
            </div>
          </Reveal>
        </div>
      </div>
    </PageTransition>
  );
}
