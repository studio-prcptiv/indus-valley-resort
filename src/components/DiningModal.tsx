"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { MENU_CATEGORIES } from "@/data/hotel";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

interface DiningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DiningModal({ isOpen, onClose }: DiningModalProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div data-lenis-prevent className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black"
          />

          {/* Modal Container */}
          <div className="flex min-h-full items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-5xl bg-stone-50 shadow-2xl rounded-sm p-6 md:p-12 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full border border-stone-200 text-stone-900 hover:bg-stone-900 hover:text-white transition-colors z-10"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>

              <SectionHeading sub="Fine Dining" title="Our Menu" center={true} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto overflow-y-auto max-h-[70vh] pr-2 scrollbar-thin">
                {MENU_CATEGORIES.map((category, idx) => (
                  <Reveal key={idx} delay={idx * 0.1}>
                    <div className="mb-8">
                      <h3 className="font-serif text-2xl text-stone-900 mb-6 border-b border-stone-200 pb-2 inline-block pr-8">
                        {category.title}
                      </h3>
                      <div className="space-y-8">
                        {category.items.map((item, i) => (
                          <motion.div
                            key={i}
                            className="group"
                            whileHover={{ x: 10 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <div className="flex justify-between items-baseline mb-1">
                              <h4 className="font-bold text-stone-800 text-lg group-hover:text-amber-600 transition-colors">
                                {item.name}
                              </h4>
                              <span className="font-sans font-bold text-stone-900">
                                {item.price}
                              </span>
                            </div>
                            <p className="text-stone-500 text-sm font-light italic">
                              {item.desc}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
