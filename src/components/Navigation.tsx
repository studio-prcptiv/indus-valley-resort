"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const MotionLink = motion(Link);
import { trackBookingStart } from "@/utils/analytics";
import { HOTEL_INFO } from "@/data/hotel";

const useScrollTrigger = (threshold = 0): [React.RefObject<HTMLDivElement | null>, boolean] => {
  const [isTriggered, setIsTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTriggered(!entry.isIntersecting);
      },
      { threshold },
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  return [ref, isTriggered];
};

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [triggerRef, scrolled] = useScrollTrigger();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isDark = scrolled || !isHome;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Rooms", href: "/rooms" },
    { name: "Location", href: "/location" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <div
        ref={triggerRef}
        className="absolute top-0 h-1 w-full pointer-events-none opacity-0"
      />

      <motion.nav
        initial={false}
        animate={{ y: 0 }}
        role="navigation"
        aria-label="Main Navigation"
        className={`fixed top-0 w-full z-40 transition-all duration-300 ease-in-out ${
          isDark
            ? "bg-white/95 md:backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link
            href="/"
            className="flex flex-col cursor-pointer z-50 group focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none focus:rounded-sm"
            aria-label="Go to homepage"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span
              className={`font-serif text-lg md:text-xl tracking-widest font-bold transition-colors duration-300 ${
                isDark ? "text-stone-950" : "text-white"
              }`}
            >
              {HOTEL_INFO.name.toUpperCase()}
            </span>
            <span
              className={`text-[0.6rem] uppercase tracking-[0.3em] font-bold transition-colors duration-300 ${
                isDark ? "text-amber-700" : "text-amber-400"
              }`}
            >
              {HOTEL_INFO.location}
            </span>
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`uppercase text-xs tracking-widest font-bold relative group focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none focus:rounded-sm ${
                    isActive
                      ? "text-amber-600"
                      : isDark
                      ? "text-stone-600 hover:text-stone-900"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-2 left-0 h-0.5 bg-amber-600 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
            <MotionLink
              href="/booking"
              onClick={() => trackBookingStart("Header CTA")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 uppercase text-xs tracking-widest border transition-all duration-300 font-bold focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none focus:rounded-sm ${
                isDark
                  ? "border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-stone-900"
              }`}
            >
              Book
            </MotionLink>
          </div>

          <button
            className="md:hidden z-50 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none focus:rounded-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="text-stone-950" />
            ) : (
              <Menu className={isDark ? "text-stone-950" : "text-white"} />
            )}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="fixed inset-0 bg-stone-50 z-40 flex flex-col justify-center items-center gap-8 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="font-serif text-3xl text-stone-950 hover:text-amber-600 active:scale-90 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none focus:rounded-sm"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <div className="w-12 h-[1px] bg-stone-300 my-4" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/booking"
                onClick={() => {
                  setMobileMenuOpen(false);
                  trackBookingStart("Mobile Header CTA");
                }}
                className="bg-stone-950 text-white px-8 py-3 uppercase tracking-widest text-xs font-bold inline-block focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none focus:rounded-sm"
              >
                Book Your Stay
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
