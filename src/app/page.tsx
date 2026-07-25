"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  Coffee,
  Utensils,
  FileText,
  MapPin,
  Snowflake,
  Wind,
  ArrowRight,
} from "lucide-react";
import { ROOMS, GUEST_REVIEWS, HOTEL_INFO } from "@/data/hotel";
import PageTransition from "@/components/PageTransition";
import Reveal from "@/components/Reveal";
import AnimatedButton from "@/components/AnimatedButton";
import SectionHeading from "@/components/SectionHeading";
import DiningModal from "@/components/DiningModal";
import {
  trackBookingStart,
  trackBookingSubmit,
  trackViewMenu,
} from "@/utils/analytics";

// --- HERO SECTION (WITH BOOKING STRIP) ---
function Hero() {
  const router = useRouter();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0].title);

  const roomObj = ROOMS.find((r) => r.title === selectedRoom);
  const currentPrice = roomObj ? roomObj.price : "";

  const handleStripBook = (e: React.FormEvent) => {
    e.preventDefault();
    trackBookingSubmit(selectedRoom);
    const message =
      `*New Booking Request*%0A%0A` +
      `*Room:* ${selectedRoom}%0A` +
      `*Check-in:* ${checkIn || "Not specified"}%0A` +
      `*Check-out:* ${checkOut || "Not specified"}%0A` +
      `*Adults:* ${adults}%0A` +
      `*Children:* ${children}%0A` +
      `*Price:* ${currentPrice}`;
    window.open(`https://wa.me/${HOTEL_INFO.whatsapp}?text=${message}`, "_blank");
  };

  const stripInputClasses =
    "w-full bg-white/10 border border-white/15 px-2.5 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500 rounded-sm appearance-none cursor-pointer focus-visible:ring-1 focus-visible:ring-amber-500";
  const stripLabelClasses =
    "block text-[10px] uppercase tracking-widest text-white/60 mb-1 font-bold";

  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden bg-stone-950 flex flex-col justify-center py-28 md:py-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hotel/1.jpeg"
          alt="Hotel Indus Valley Resort"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-stone-950/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col justify-center items-center text-center px-4 sm:px-6 max-w-7xl mx-auto">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white mb-4 sm:mb-6 leading-tight">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="block"
          >
            Indus Valley
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="block italic font-light opacity-90"
          >
            Resort
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-white/80 max-w-md lg:max-w-lg mx-auto mb-6 sm:mb-8 font-light text-base sm:text-lg px-4"
        >
          Experience luxury and serene mountain views in Pahalgam, surrounded by pristine pine forests and river streams.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-1 sm:mt-2 w-full max-w-xs sm:max-w-none"
        >
          <AnimatedButton
            variant="secondary"
            onClick={() => {
              trackBookingStart("Hero Explore CTA");
              router.push("/rooms");
            }}
          >
            Explore Our Suites
          </AnimatedButton>
          <AnimatedButton
            variant="outlineWhite"
            onClick={() => {
              trackBookingStart("Hero Book Now CTA");
              router.push("/booking");
            }}
          >
            Book Now
          </AnimatedButton>
        </motion.div>

        {/* Booking Strip */}
        <motion.form
          onSubmit={handleStripBook}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="w-full max-w-xs sm:max-w-5xl mx-auto mt-8 sm:mt-12 bg-black/50 backdrop-blur-md border border-white/10 p-3.5 sm:p-5 md:p-6 rounded-sm text-white text-left font-sans shadow-2xl"
        >
          {/* Mobile: stacked 2-col grid; Desktop: 7-col row */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-7 gap-3 sm:gap-4 items-end">
            <div>
              <label htmlFor="stripCheckIn" className={stripLabelClasses}>Check-in</label>
              <input
                id="stripCheckIn"
                type="date"
                required
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className={stripInputClasses}
              />
            </div>
            <div>
              <label htmlFor="stripCheckOut" className={stripLabelClasses}>Check-out</label>
              <input
                id="stripCheckOut"
                type="date"
                required
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className={stripInputClasses}
              />
            </div>
            <div>
              <label htmlFor="stripAdults" className={stripLabelClasses}>Adults</label>
              <select id="stripAdults" value={adults} onChange={(e) => setAdults(e.target.value)} className={stripInputClasses}>
                <option value="1" className="text-stone-950">1</option>
                <option value="2" className="text-stone-950">2</option>
                <option value="3" className="text-stone-950">3</option>
                <option value="4" className="text-stone-950">4</option>
              </select>
            </div>
            <div>
              <label htmlFor="stripChildren" className={stripLabelClasses}>Children</label>
              <select id="stripChildren" value={children} onChange={(e) => setChildren(e.target.value)} className={stripInputClasses}>
                <option value="0" className="text-stone-950">0</option>
                <option value="1" className="text-stone-950">1</option>
                <option value="2" className="text-stone-950">2</option>
                <option value="3" className="text-stone-950">3</option>
              </select>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <label htmlFor="stripRoom" className={stripLabelClasses}>Suite</label>
              <select id="stripRoom" value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} className={stripInputClasses}>
                {ROOMS.map((r) => (
                  <option key={r.id} value={r.title} className="text-stone-950">{r.title}</option>
                ))}
              </select>
            </div>
            <div className="col-span-2 flex items-center gap-4 pt-2 lg:pt-0">
              <div className="flex flex-col justify-center shrink-0">
                <span className="text-[9px] text-white/40 uppercase tracking-widest block leading-none mb-1">Rate</span>
                <span className="text-base sm:text-lg text-amber-400 font-sans font-bold tracking-tight leading-none">{currentPrice}</span>
              </div>
              <button
                type="submit"
                className="flex-1 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-bold text-xs uppercase tracking-widest px-5 sm:px-6 py-3 transition-colors rounded-sm flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none cursor-pointer whitespace-nowrap"
              >
                Book Now <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
}

// --- DIRECT BOOKING BENEFITS INFINITE HORIZONTAL MARQUEE ---
function DirectBookingBenefits() {
  const benefits = [
    { icon: "★", title: "Best Rate Guarantee", desc: "Save on booking fees. Get exclusive direct booking discounts." },
    { icon: "✧", title: "Complimentary Upgrades", desc: "Priority room upgrades and late check-out options." },
    { icon: "☏", title: "Direct Support", desc: "Instant confirmations and 24/7 personal coordinator access." },
  ];
  const items = [...benefits, ...benefits, ...benefits, ...benefits];

  return (
    <section className="bg-white border-b border-stone-200 py-3 sm:py-4 overflow-hidden opacity-60" aria-label="Direct booking advantages">
      <div className="flex whitespace-nowrap animate-marquee" style={{ width: "max-content" }}>
        {items.map((b, i) => (
          <div key={i} className="flex items-center gap-2 px-6 sm:px-8 md:px-12 shrink-0">
            <span className="text-amber-600 font-serif text-sm">{b.icon}</span>
            <span className="font-serif text-[10px] sm:text-xs md:text-sm font-bold text-stone-950 uppercase tracking-widest">
              {b.title}
            </span>
            <span className="text-stone-400 text-[9px] sm:text-[10px] md:text-xs font-light tracking-wide hidden sm:inline">
              — {b.desc}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- LOCATION / STATS SECTION ---
function LocationStats() {
  return (
    <section className="py-16 sm:py-24 bg-stone-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <SectionHeading sub="The Location" title="Heart of Pahalgam" center={true} dark={true} />
            <p className="text-stone-300 leading-loose mb-8 sm:mb-12 text-base sm:text-lg font-light max-w-2xl mx-auto px-2">
              Situated on Kullar Road in Nagipora Dahwatoo, Pahalgam.
              Enjoy tranquil pine forest surrounding, breathtaking valley landscapes, and convenient access to Pahalgam&apos;s legendary sights.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 border-t border-white/10 pt-8 sm:pt-12">
              {[
                { title: "Lidder River", dist: "2 km (5 min drive)", icon: MapPin },
                { title: "Betaab Valley", dist: "15 km (25 min drive)", icon: Snowflake },
                { title: "Golf Course", dist: "3 km (8 min drive)", icon: Wind },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="group p-4 sm:p-6 rounded-sm hover:bg-white/5 transition-colors cursor-default"
                >
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <h4 className="font-serif text-lg sm:text-xl mb-1 sm:mb-2">{item.title}</h4>
                  <span className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-widest font-bold">{item.dist}</span>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// --- ROOMS PREVIEW SECTION ---
function RoomsPreview() {
  const router = useRouter();
  return (
    <section className="py-16 sm:py-24 bg-stone-50">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading sub="Accommodations" title="Our Accommodations" center={true} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12">
          {ROOMS.map((room, idx) => (
            <Reveal key={room.id} delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group bg-white rounded-sm shadow-sm hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-stone-100 cursor-pointer h-full flex flex-col"
                onClick={() => {
                  trackBookingStart(`Rooms Preview Card ${room.title}`);
                  router.push(`/rooms/${room.slug}`);
                }}
              >
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-stone-100">
                  <Image src={room.image} alt={room.title} fill sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 text-[10px] sm:text-xs uppercase tracking-widest font-bold text-stone-900 z-10">{room.type}</div>
                </div>
                <div className="p-5 sm:p-8 flex-grow flex flex-col">
                  <h3 className="font-serif text-xl sm:text-2xl text-stone-950 mb-2 sm:mb-3 group-hover:text-amber-600 transition-colors">{room.title}</h3>
                  <p className="text-stone-500 text-xs sm:text-sm leading-relaxed border-b border-stone-100 pb-4 sm:pb-6 flex-grow">{room.desc}</p>
                  {/* Mobile: show price + CTA inline */}
                  <div className="flex items-center justify-between mt-4 sm:mt-0 sm:hidden">
                    <span className="text-amber-700 font-sans font-bold text-lg tracking-tight">{room.price}<span className="text-stone-400 text-xs font-light font-sans"> /night</span></span>
                    <span className="text-amber-700 text-xs font-bold uppercase tracking-widest flex items-center gap-1">View <ChevronRight size={14} /></span>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <div className="text-center">
          <AnimatedButton variant="outline" onClick={() => { trackBookingStart("Rooms Preview Main CTA"); router.push("/rooms"); }}>
            Explore Our Suites
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}

// --- MD MESSAGE SECTION ---
function MDMessage() {
  return (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 text-center border-b border-stone-100">
      <Reveal>
        <div className="max-w-3xl mx-auto">
          <h3 className="text-amber-600 uppercase tracking-widest text-[10px] sm:text-xs font-bold mb-6 sm:mb-8">
            A Message from the Managing Director
          </h3>
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-stone-950 leading-relaxed mb-8 sm:mb-10 italic">
            &ldquo;At The Indus Valley Resort, our vision has always been simple: to offer
            guests the rare luxury of location, warmth, and genuine Kashmiri
            hospitality.
            <br /><br />
            Experience the value of time, comfort, and care in Pahalgam. Every detail of our property is designed so
            you spend less time commuting and more time experiencing Kashmir at
            its finest.
            <br /><br />
            We look forward to welcoming you personally.&rdquo;
          </p>
          <div className="text-stone-500 font-sans tracking-wide text-xs sm:text-sm font-bold">— Managing Director</div>
        </div>
      </Reveal>
    </section>
  );
}

// --- DINING SECTION ---
interface DiningProps { onOpenMenu: () => void; }

function Dining({ onOpenMenu }: DiningProps) {
  return (
    <section className="py-16 sm:py-24 bg-stone-100">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
          <div className="lg:w-1/2 relative w-full h-[250px] sm:h-[300px] md:h-[450px]">
            <Reveal>
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-full h-full border-2 border-stone-900/20 z-0" />
              <div className="relative z-10 w-full h-full shadow-xl rounded-sm overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=75&w=800"
                  alt="Fine Dining Wazwan Experience"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
          <div className="lg:w-1/2">
            <Reveal delay={0.2}>
              <SectionHeading sub="Dining" title="Kashmiri Wazwan & More" center={false} />
              <p className="text-stone-600 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                Our in-house restaurant offers a warm refuge from the snow.
                Specializing in authentic Kashmiri Wazwan (Rogan Josh, Gustaba) as
                well as comforting Indian and Continental classics.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-white p-4 sm:p-6 shadow-sm border border-stone-200 text-center hover:shadow-md transition-shadow">
                  <Coffee className="mx-auto text-amber-600 mb-2 sm:mb-3 w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                  <h4 className="font-serif text-base sm:text-lg text-stone-950">Lobby Lounge</h4>
                  <p className="text-[10px] sm:text-xs text-stone-500 mt-1 sm:mt-2">Kahwa & Snacks</p>
                </div>
                <div className="bg-white p-4 sm:p-6 shadow-sm border border-stone-200 text-center hover:shadow-md transition-shadow">
                  <Utensils className="mx-auto text-amber-600 mb-2 sm:mb-3 w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                  <h4 className="font-serif text-base sm:text-lg text-stone-950">Restaurant</h4>
                  <p className="text-[10px] sm:text-xs text-stone-500 mt-1 sm:mt-2">Buffet & A la Carte</p>
                </div>
              </div>
              <AnimatedButton onClick={() => { trackViewMenu(); onOpenMenu(); }} ariaLabel="View Full Menu">
                View Full Menu <FileText size={16} />
              </AnimatedButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- GUEST REVIEWS SECTION ---
function GuestReviews() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (offset: number) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-16 sm:py-24 text-center px-0 relative overflow-hidden">
      <div className="flex flex-col items-center mb-8 sm:mb-12 px-4 sm:px-6 relative">
        <SectionHeading sub="Testimonials" title="Guest Experiences" center={true} />
        <div className="hidden md:flex gap-3 absolute right-6 bottom-0">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => scroll(-400)} className="p-3 rounded-full border border-stone-200 text-stone-950 hover:bg-stone-950 hover:text-white transition-colors" aria-label="Scroll reviews left">
            <ChevronLeft size={20} />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => scroll(400)} className="p-3 rounded-full border border-stone-200 text-stone-950 hover:bg-stone-950 hover:text-white transition-colors" aria-label="Scroll reviews right">
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>

      <div ref={scrollRef} className="w-full overflow-x-auto snap-x snap-mandatory flex gap-4 sm:gap-6 px-4 sm:px-6 pb-8 sm:pb-12 scrollbar-hide group/list">
        {GUEST_REVIEWS.map((review, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="snap-center shrink-0"
          >
            <div className="w-[80vw] sm:w-[70vw] md:w-[30vw] h-full bg-stone-50 p-6 sm:p-8 md:p-10 rounded-sm text-left border border-stone-100 shadow-sm flex flex-col relative transition-all duration-500 ease-out md:group-hover/list:blur-[2px] md:group-hover/list:opacity-50 md:hover:!blur-none md:hover:!opacity-100 md:hover:scale-[1.02] md:hover:shadow-xl md:hover:z-10 md:hover:-translate-y-2">
              <Quote size={28} className="text-stone-900/10 absolute top-6 right-6 sm:top-8 sm:right-8" aria-hidden="true" />
              <div className="flex text-amber-500 mb-4 sm:mb-6" aria-label={`${review.rating} star rating`}>
                {Array.from({ length: review.rating }).map((_, idx) => (
                  <Star key={idx} size={12} fill="currentColor" stroke="none" />
                ))}
              </div>
              <p className="text-stone-600 text-xs sm:text-sm leading-loose line-clamp-4 mb-4 sm:mb-6 italic font-serif flex-grow">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="mt-auto flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-stone-200/50">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-stone-950 text-white flex items-center justify-center font-bold text-xs sm:text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-stone-950">{review.name}</h4>
                  <span className="text-[10px] sm:text-xs text-stone-400 font-bold">{review.date}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile CTA - more prominent for conversion */}
      <div className="flex justify-center mt-6 sm:mt-8 px-4">
        <AnimatedButton
          onClick={() => {
            trackBookingStart("Testimonials CTA");
            router.push("/booking");
          }}
        >
          Book Your Stay <ArrowRight size={16} className="text-amber-500" />
        </AnimatedButton>
      </div>
    </section>
  );
}

// --- MAIN PAGE ---
export default function Home() {
  const [isDiningOpen, setIsDiningOpen] = useState(false);

  return (
    <PageTransition>
      <Hero />
      <DirectBookingBenefits />
      <LocationStats />
      <RoomsPreview />
      <MDMessage />
      <Dining onOpenMenu={() => setIsDiningOpen(true)} />
      <GuestReviews />
      <DiningModal isOpen={isDiningOpen} onClose={() => setIsDiningOpen(false)} />
    </PageTransition>
  );
}
