"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { HOTEL_INFO } from "@/data/hotel";

interface WhatsAppButtonProps {
  mobileOnly?: boolean;
}

export default function WhatsAppButton({ mobileOnly = false }: WhatsAppButtonProps) {
  const content = (
    <>
      {mobileOnly ? (
        <div className="flex items-center justify-center gap-3 bg-stone-900/95 backdrop-blur-md text-white p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] border-t border-white/10 active:bg-stone-800">
          <MessageCircle className="w-5 h-5 text-amber-500 fill-amber-500/20" />
          <span className="uppercase tracking-widest text-xs font-bold font-sans">
            Plan Your Stay
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 bg-white/90 backdrop-blur-xl text-stone-900 py-6 px-3 rounded-l-2xl shadow-[-4px_0_20px_rgba(0,0,0,0.1)] border-y border-l border-stone-200 group hover:bg-stone-900 hover:border-stone-800 transition-all duration-300">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-500/20 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
            <MessageCircle className="w-5 h-5 text-stone-700 group-hover:text-amber-500 transition-colors relative z-10" />
          </div>
          <span
            className="font-sans font-bold text-[10px] tracking-widest group-hover:text-white transition-colors uppercase whitespace-nowrap"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
            }}
          >
            Book on WhatsApp
          </span>
        </div>
      )}
    </>
  );

  return (
    <motion.a
      initial={{ x: mobileOnly ? 0 : 100, y: mobileOnly ? 100 : 0 }}
      animate={{ x: 0, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      href={`https://wa.me/${HOTEL_INFO.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className={
        mobileOnly
          ? "fixed bottom-0 left-0 right-0 z-30 md:hidden"
          : "fixed top-1/2 right-0 -translate-y-1/2 z-30 hidden md:block"
      }
      aria-label="Book via WhatsApp"
    >
      {content}
    </motion.a>
  );
}
