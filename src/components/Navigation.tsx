"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { trackBookingStart } from "@/utils/analytics";
import { HOTEL_INFO } from "@/data/hotel";

const MotionLink = motion(Link);

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

  // Lock body scroll when mobile menu is open & listen for Escape key
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  // Auto-close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

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
            className="flex items-center gap-3.5 cursor-pointer z-50 group focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none focus:rounded-sm"
            aria-label="Go to homepage"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Image
              src="/logo.png"
              alt={HOTEL_INFO.name}
              width={140}
              height={58}
              priority
              className={`h-7 md:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${
                isDark ? "" : "drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
              }`}
            />
            <div className={`h-6 w-[1px] transition-colors duration-300 ${isDark ? "bg-stone-300" : "bg-white/20"}`} />
            <div className="flex flex-col justify-center">
              <span
                className={`font-serif text-xs md:text-sm tracking-[0.2em] font-bold uppercase transition-colors duration-300 ${
                  isDark ? "text-stone-900" : "text-white"
                }`}
              >
                Indus Valley
              </span>
              <span
                className={`text-[0.55rem] uppercase tracking-[0.3em] font-bold transition-colors duration-300 ${
                  isDark ? "text-amber-700" : "text-amber-400"
                }`}
              >
                Resort · Pahalgam
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
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

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden z-50 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none focus:rounded-sm p-1.5 -mr-1.5 cursor-pointer"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu className={isDark ? "text-stone-950 w-6 h-6" : "text-white w-6 h-6"} />
          </button>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Navigation Modal with Frosted Glass Blur */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex flex-col md:hidden bg-stone-900/20 backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full bg-white/70 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto"
            >
              {/* Mobile Menu Top Header Bar with Exit Button */}
              <div className="w-full px-6 py-4 flex justify-between items-center border-b border-stone-300/40 bg-white/40 backdrop-blur-md sticky top-0 z-10">
                <Link
                  href="/"
                  className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none focus:rounded-sm"
                  aria-label="Go to homepage"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Image
                    src="/logo.png"
                    alt={HOTEL_INFO.name}
                    width={130}
                    height={54}
                    priority
                    className="h-7 w-auto object-contain"
                  />
                  <div className="h-5 w-[1px] bg-stone-300" />
                  <div className="flex flex-col">
                    <span className="font-serif text-xs tracking-[0.2em] font-bold uppercase text-stone-900">
                      Indus Valley
                    </span>
                    <span className="text-[0.5rem] uppercase tracking-[0.3em] font-bold text-amber-700">
                      Resort · Pahalgam
                    </span>
                  </div>
                </Link>

                {/* Prominent Exit Button */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-900 text-white hover:bg-stone-800 active:scale-95 transition-all text-xs font-semibold tracking-wider uppercase shadow-sm focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none cursor-pointer"
                  aria-label="Close menu"
                >
                  <span>Exit</span>
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Minimal Navigation Links */}
              <div className="flex-1 flex flex-col justify-center items-center px-6 py-8">
                <div className="flex flex-col items-center gap-6 w-full max-w-xs">
                  {navLinks.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + i * 0.05 }}
                        className="w-full text-center"
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          aria-current={isActive ? "page" : undefined}
                          className={`font-serif text-3xl tracking-wide transition-colors duration-200 inline-block ${
                            isActive
                              ? "text-amber-700 font-bold"
                              : "text-stone-800 hover:text-stone-950 active:scale-95"
                          }`}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="w-12 h-[1px] bg-stone-300/60 my-7" />

                {/* Primary CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full max-w-xs"
                >
                  <Link
                    href="/booking"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      trackBookingStart("Mobile Header CTA");
                    }}
                    className="w-full text-center bg-stone-950 text-white px-8 py-3.5 uppercase tracking-widest text-xs font-bold transition-all active:scale-95 shadow-md hover:bg-stone-900 block rounded-xs"
                  >
                    Book Your Stay
                  </Link>
                </motion.div>
              </div>

              {/* Bottom Resort Information Footer */}
              <div className="px-6 py-4 border-t border-stone-300/40 bg-white/30 text-center">
                <p className="text-[0.7rem] text-stone-500 tracking-wider uppercase font-medium">
                  {HOTEL_INFO.address}
                </p>
                <p className="text-xs text-amber-700 font-semibold mt-0.5">
                  Reservations: {HOTEL_INFO.phone}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


