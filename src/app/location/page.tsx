"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Plane, Train, Compass, ChevronRight, ExternalLink } from "lucide-react";
import { HOTEL_INFO, ATTRACTIONS } from "@/data/hotel";
import PageTransition from "@/components/PageTransition";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function Location() {
  return (
    <PageTransition>
      <div className="pt-24">
        {/* Banner */}
        <div className="bg-stone-900 text-white py-20 text-center px-4">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-5xl mb-4"
          >
            Location & Directions
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-stone-300 max-w-2xl mx-auto font-light"
          >
            Nestled in the pristine pine valley of Pahalgam, easily accessible from Srinagar and Anantnag.
          </motion.p>
        </div>

        {/* Custom Map & Directions */}
        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col lg:flex-row gap-12 items-stretch">
            {/* Map Frame */}
            <div className="w-full lg:w-1/2 min-h-[450px] bg-stone-100 shadow-xl rounded-sm overflow-hidden relative flex flex-col justify-end">
              <iframe
                src={HOTEL_INFO.mapEmbedUrl}
                width="100%"
                height="100%"
                className="w-full h-full border-0 absolute inset-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Indus Valley Resort Map"
              ></iframe>
              <div className="relative z-10 p-4 m-4 bg-white/95 backdrop-blur-md shadow-lg rounded-sm border border-stone-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-50 text-amber-700 rounded-sm shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-900 font-serif">Indus Valley Resort</p>
                    <p className="text-[11px] text-stone-500 font-light">{HOTEL_INFO.address}</p>
                  </div>
                </div>
                <a
                  href={HOTEL_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 text-white hover:bg-amber-700 transition-colors text-xs font-sans rounded-sm font-medium tracking-wide shrink-0 shadow-sm"
                >
                  <span>Get Directions</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Directions info */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between bg-white p-8 md:p-12 shadow-xl rounded-sm border border-stone-100">
              <div>
                <SectionHeading sub="Getting Here" title="Travel & Transit" center={false} />
                <p className="text-stone-600 font-light mb-8 leading-relaxed">
                  Pahalgam is well connected by scenic highways from Srinagar and Anantnag. Taxis, private vehicles, and pre-arranged resort shuttles offer seamless year-round access to our property.
                </p>

                <div className="space-y-6">
                  {/* Airport */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-stone-50 rounded-sm text-amber-700">
                      <Plane size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-950 font-sans text-sm uppercase tracking-wider mb-1">
                        By Air
                      </h4>
                      <p className="text-stone-500 text-sm leading-relaxed">
                        {HOTEL_INFO.airportDistance}
                      </p>
                    </div>
                  </div>

                  {/* Rail */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-stone-50 rounded-sm text-amber-700">
                      <Train size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-950 font-sans text-sm uppercase tracking-wider mb-1">
                        By Rail
                      </h4>
                      <p className="text-stone-500 text-sm leading-relaxed">
                        {HOTEL_INFO.railwayDistance}
                      </p>
                    </div>
                  </div>

                  {/* Coordinates */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-stone-50 rounded-sm text-amber-700">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-950 font-sans text-sm uppercase tracking-wider mb-1">
                        Coordinates
                      </h4>
                      <p className="text-stone-500 text-sm leading-relaxed font-mono">
                        {HOTEL_INFO.coordinates}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col gap-4 text-xs font-bold text-stone-400">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="uppercase tracking-widest text-[10px]">Resort Address</span>
                  <span className="text-stone-950 font-light leading-relaxed sm:text-right normal-case text-xs">
                    {HOTEL_INFO.address}, {HOTEL_INFO.district}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="uppercase tracking-widest text-[10px]">Head Office</span>
                  <span className="text-stone-950 font-light leading-relaxed sm:text-right normal-case text-xs">
                    {HOTEL_INFO.headOfficeAddress}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nearby attractions */}
        <div className="bg-stone-50 py-24 border-t border-stone-200/50">
          <div className="container mx-auto px-6">
            <SectionHeading sub="Nearby Sights" title="Explore Pahalgam" center={true} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {ATTRACTIONS.map((attr, idx) => (
                <Reveal key={attr.name} delay={idx * 0.1}>
                  <div className="bg-white p-8 rounded-sm shadow-sm hover:shadow-xl transition-shadow border border-stone-100 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs uppercase tracking-widest font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-sm">
                          {attr.type}
                        </span>
                        <span className="text-xs text-stone-400 font-light flex items-center gap-1">
                          <Compass size={12} /> {attr.distance}
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl text-stone-950 mb-3">
                        {attr.name}
                      </h3>
                      <p className="text-stone-500 text-sm font-light leading-relaxed">
                        {attr.description}
                      </p>
                    </div>
                    
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(attr.name + " Pahalgam")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 pt-4 border-t border-stone-50 flex items-center justify-end text-amber-700 text-xs font-bold tracking-widest uppercase hover:text-amber-600 transition-colors group"
                    >
                      Get Directions <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
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
