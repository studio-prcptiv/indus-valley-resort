"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Building2 } from "lucide-react";
import { trackBookingStart, trackPhoneClick, trackEmailClick } from "@/utils/analytics";
import { HOTEL_INFO } from "@/data/hotel";

export default function Footer() {
  const linkFocusClasses = "focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none focus:rounded-sm";

  return (
    <footer role="contentinfo" className="bg-stone-900 text-white pt-24 pb-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <span className="font-serif text-2xl md:text-3xl block mb-6 uppercase tracking-widest">
              {HOTEL_INFO.name}
            </span>
            <p className="text-stone-400 max-w-sm leading-relaxed mb-8 font-light text-sm">
              Official Website | Luxury mountain resort in {HOTEL_INFO.location}. Book directly to unlock exclusive room upgrades and the best rate guarantee.
            </p>
          </div>
          <div>
            <h4 className="text-amber-500 uppercase tracking-widest text-xs font-bold mb-6">
              Explore
            </h4>
            <ul className="space-y-4 text-sm text-stone-300 w-full">
              <li>
                <Link
                  href="/"
                  className={`hover:text-white transition-colors hover:translate-x-1 duration-200 block ${linkFocusClasses}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/rooms"
                  className={`hover:text-white transition-colors hover:translate-x-1 duration-200 block ${linkFocusClasses}`}
                >
                  Our Suites
                </Link>
              </li>
              <li>
                <Link
                  href="/location"
                  className={`hover:text-white transition-colors hover:translate-x-1 duration-200 block ${linkFocusClasses}`}
                >
                  Location
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className={`hover:text-white transition-colors hover:translate-x-1 duration-200 block ${linkFocusClasses}`}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`hover:text-white transition-colors hover:translate-x-1 duration-200 block ${linkFocusClasses}`}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  onClick={() => trackBookingStart("Footer Link")}
                  className={`hover:text-white transition-colors hover:translate-x-1 duration-200 block font-bold text-amber-500 ${linkFocusClasses}`}
                >
                  Book Your Stay
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-amber-500 uppercase tracking-widest text-xs font-bold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm text-stone-300 w-full">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 shrink-0 text-amber-500" aria-hidden="true" />
                <div className="font-light text-xs leading-relaxed">
                  <span className="text-stone-400 font-semibold block uppercase tracking-wider text-[10px] mb-0.5">Resort Address</span>
                  <span>{HOTEL_INFO.address}, {HOTEL_INFO.district}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Building2 size={16} className="mt-1 shrink-0 text-amber-500" aria-hidden="true" />
                <div className="font-light text-xs leading-relaxed">
                  <span className="text-stone-400 font-semibold block uppercase tracking-wider text-[10px] mb-0.5">Head Office</span>
                  <span>{HOTEL_INFO.headOfficeAddress}</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-amber-500" aria-hidden="true" />
                <div>
                  <span className="text-stone-400 font-semibold block uppercase tracking-wider text-[10px] mb-0.5">Reservations &amp; Bookings</span>
                  <a
                    href={`tel:${HOTEL_INFO.reservationsPhone.replace(/[^0-9+]/g, "")}`}
                    onClick={() => trackPhoneClick("Footer")}
                    className={`break-words hover:text-white transition-colors font-light ${linkFocusClasses}`}
                  >
                    {HOTEL_INFO.reservationsPhone}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="mt-1 shrink-0 text-amber-500" aria-hidden="true" />
                <a
                  href={`mailto:${HOTEL_INFO.email}`}
                  onClick={() => trackEmailClick("Footer")}
                  className={`break-all hover:text-white transition-colors font-light ${linkFocusClasses}`}
                >
                  {HOTEL_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500 gap-2">
          <p>
            &copy; {new Date().getFullYear()} {HOTEL_INFO.name}. All rights
            reserved. Official Site.
          </p>
          <div className="flex gap-1 md:mt-0 items-center">
            <span>Powered by</span>
            <a
              href="https://www.prcptiv.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-stone-300 hover:text-white transition-colors font-medium inline-block hover:-translate-y-1 transform duration-200 ${linkFocusClasses}`}
            >
              Perceptive Studio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
