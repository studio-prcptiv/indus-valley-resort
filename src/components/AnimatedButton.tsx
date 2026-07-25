"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "outlineWhite";
  ariaLabel?: string;
}

export default function AnimatedButton({
  children,
  className,
  onClick,
  variant = "primary",
  ariaLabel,
}: AnimatedButtonProps) {
  const baseClasses =
    "px-8 py-4 rounded-sm uppercase tracking-widest text-xs font-bold flex items-center justify-center gap-3 transition-colors";
  const variants = {
    primary: "bg-stone-900 text-white hover:bg-stone-800 shadow-lg",
    secondary: "bg-white text-stone-900 hover:bg-stone-50 shadow-lg",
    outline: "border border-stone-900 text-stone-900 hover:bg-stone-100",
    outlineWhite:
      "border border-white/30 backdrop-blur-sm text-white hover:bg-white/10",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className || ""}`}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}
