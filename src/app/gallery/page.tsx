"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { GALLERY_IMAGES } from "@/data/hotel";
import PageTransition from "@/components/PageTransition";
import Reveal from "@/components/Reveal";

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Keyboard navigation & body overflow lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    if (activeIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev !== null ? (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1) : null
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev !== null ? (prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1) : null
    );
  };

  return (
    <PageTransition>
      <div className="pt-20 sm:pt-24 min-h-screen bg-stone-50">
        {/* Banner */}
        <div className="bg-stone-900 text-white py-14 sm:py-20 text-center px-4">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4"
          >
            Photo Gallery
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-stone-300 max-w-2xl mx-auto font-light text-sm sm:text-base px-2"
          >
            Explore visual glimpses of our luxury suites, dining, and scenic Pahalgam valley views.
          </motion.p>
        </div>

        {/* Image Grid */}
        <div className="container mx-auto px-3 sm:px-6 md:px-8 py-10 sm:py-16 md:py-20">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
            {GALLERY_IMAGES.map((img, index) => (
              <Reveal key={img.id} delay={Math.min(index * 0.05, 0.3)}>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  onClick={() => setActiveIndex(index)}
                  className="group relative cursor-pointer overflow-hidden rounded-sm shadow-sm hover:shadow-xl border border-stone-200/80 bg-stone-900 aspect-[4/3] sm:aspect-square"
                >
                  <motion.img
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.5 }}
                    src={img.url}
                    alt={`Indus Valley Resort Photo ${img.id}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm p-2 sm:p-2.5 rounded-full text-stone-900 shadow-md">
                      <Maximize2 size={16} className="sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {activeIndex !== null && (
            <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md">
              {/* Close Button */}
              <button
                onClick={() => setActiveIndex(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-colors z-20 cursor-pointer"
                aria-label="Close viewer"
              >
                <X size={22} className="sm:w-6 sm:h-6" />
              </button>

              {/* Prev Button (Desktop & Mobile) */}
              <button
                onClick={handlePrev}
                className="absolute left-3 sm:left-6 p-2.5 sm:p-4 rounded-full text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-colors z-20 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} className="sm:w-7 sm:h-7" />
              </button>

              {/* Next Button (Desktop & Mobile) */}
              <button
                onClick={handleNext}
                className="absolute right-3 sm:right-6 p-2.5 sm:p-4 rounded-full text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-colors z-20 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={24} className="sm:w-7 sm:h-7" />
              </button>

              {/* Image Frame */}
              <div className="relative w-full h-full flex flex-col items-center justify-center p-4 max-w-6xl">
                <motion.img
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  src={GALLERY_IMAGES[activeIndex].url}
                  alt={`Indus Valley Resort Photo ${GALLERY_IMAGES[activeIndex].id}`}
                  className="max-w-[90vw] max-h-[80vh] md:max-w-5xl md:max-h-[85vh] object-contain select-none shadow-2xl rounded-xs"
                />

                <div className="mt-4 sm:mt-6 text-center text-white/70">
                  <span className="text-xs sm:text-sm font-sans font-bold uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm">
                    Image {activeIndex + 1} of {GALLERY_IMAGES.length}
                  </span>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
