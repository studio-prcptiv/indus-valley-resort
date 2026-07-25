"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  sub: string;
  title: string;
  center?: boolean;
  dark?: boolean;
}

export default function SectionHeading({
  sub,
  title,
  center = true,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${center ? "text-center" : "text-left"}`}>
      <motion.span
        initial={{ opacity: 0, letterSpacing: "0em" }}
        whileInView={{ opacity: 1, letterSpacing: "0.1em" }}
        viewport={{ once: true }}
        className={`uppercase text-xs font-bold ${
          dark ? "text-amber-500" : "text-amber-700"
        } mb-3 block font-sans tracking-widest`}
      >
        {sub}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`font-serif text-3xl md:text-5xl ${
          dark ? "text-white" : "text-stone-900"
        }`}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className={`h-1 ${
          dark ? "bg-amber-500" : "bg-stone-800"
        } mt-6 ${center ? "mx-auto" : ""}`}
      />
    </div>
  );
}
