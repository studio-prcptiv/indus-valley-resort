import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  MapPin,
  Coffee,
  Wind,
  ChevronRight,
  Star,
  Instagram,
  Facebook,
  Mail,
  ArrowRight,
  Utensils,
  Snowflake,
  ChevronLeft,
  Quote,
  MessageCircle,
  FileText,
  CheckCircle,
} from "lucide-react";

// --- PERFORMANCE UTILITIES ---

// 1. Hook to detect mobile devices
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

// 2. Intersection Observer Hook
const useScrollTrigger = (threshold = 0) => {
  const [isTriggered, setIsTriggered] = useState(false);
  const ref = useRef(null);

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

// --- CONFIGURATION ---

const HOTEL_INFO = {
  name: "Pine Palace Platinum",
  location: "Gondola Base Station, Gulmarg",
  whatsapp: "919596255222",
  email: "reservations@pinepalaceresort.com",
  address: "Near Gondola Base Station, Gulmarg, Kashmir 193403",
  coordinates: "34.0506° N, 74.3879° E",
};

// --- DATA ---

const ROOMS = [
  {
    id: 1,
    title: "Platinum Club Room",
    price: "₹16,500",
    desc: "Modern luxury meeting alpine tradition. Located in the new wing, these rooms offer sound-proofed windows and easy access to the Gondola base. The interiors are crafted with local pine wood, providing a warm, aromatic ambiance.",
    features: [
      "King Size Bed",
      "Central Heating",
      '43" LED TV',
      "Modern Bath",
      "Mountain View",
      "Work Desk",
      "Free Wi-Fi",
      "Room Service",
    ],
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=60&w=600",
    type: "Best Seller",
  },
  {
    id: 2,
    title: "Platinum Suite",
    price: "₹24,000",
    desc: "Expansive suites with a separate living area, offering panoramic views of the Apharwat peaks and the Gondola. Perfect for couples seeking privacy and luxury, featuring premium upholstery.",
    features: [
      "Master Bedroom",
      "Living Area",
      "Mountain View",
      "Tea/Coffee Maker",
      "Bathtub",
      "Mini Bar",
      "Premium Toiletries",
      "Butler Service",
    ],
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=60&w=600",
    type: "Luxury",
  },
  {
    id: 3,
    title: "Family Quad Room",
    price: "₹28,500",
    desc: "Ideal for families or groups, featuring two large king beds and ample space for winter gear storage. Designed to keep the family together while providing enough room for everyone to relax.",
    features: [
      "2 King Beds",
      "Ski Storage",
      "Sitting Area",
      "24/7 Hot Water",
      "4 Occupancy",
      "Soundproofing",
      "Heated Floors",
      "Dining Table",
    ],
    image:
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=60&w=600",
    type: "Family",
  },
];

const GUEST_REVIEWS = [
  {
    name: "Arjun Mehta",
    date: "2 weeks ago",
    rating: 5,
    text: "Unbeatable location. It's barely a 2-minute walk to the Gondola, which saved us so much time in the mornings. The Platinum rooms are very warm, central heating is excellent. Food was delicious, especially the Rogan Josh.",
  },
  {
    name: "Sarah Williams",
    date: "1 month ago",
    rating: 5,
    text: "The proximity to the Gondola is the real USP. It's a short walk away. Staff was very helpful in arranging our ski passes. The view from the suite was breathtaking.",
  },
  {
    name: "Vikram Singh",
    date: "3 weeks ago",
    rating: 4,
    text: "Great property. The wooden interiors give a very cozy vibe. Service was a bit slow during dinner but the staff is very polite. Definitely the best place to stay if you want to be near the lifts.",
  },
  {
    name: "Priya D.",
    date: "2 months ago",
    rating: 5,
    text: "Absolutely loved the 'Platinum' experience. Hot water was available 24/7, room service was prompt. Waking up to the snow-covered pines was magical. Will visit again.",
  },
  {
    name: "Daniel Foster",
    date: "1 week ago",
    rating: 5,
    text: "The heated floors in the bathroom were a lifesaver after a long day in the snow. The concierge organized our entire itinerary including snowmobiles. Top notch service.",
  },
  {
    name: "Emily Clark",
    date: "2 weeks ago",
    rating: 5,
    text: "View of the Apharwat peak right from our bed was surreal. The housekeeping staff made sure our room was toasty warm every time we returned. A true winter wonderland stay.",
  },
  {
    name: "Rohan Kapoor",
    date: "1 week ago",
    rating: 5,
    text: "The ski-in access (almost) is a game changer. The boot warmers in the ski room were a nice touch.",
  },
  {
    name: "Meera Patel",
    date: "3 weeks ago",
    rating: 5,
    text: "Magical snowfall views from the Platinum Suite. The staff ensured our toddler was comfortable with extra heaters.",
  },
  {
    name: "Aditya Verma",
    date: "1 month ago",
    rating: 4,
    text: "Excellent Wazwan. The Gushtaba is a must-try. Rooms are cozy and the wooden finish smells amazing.",
  },
  {
    name: "Sophie Anderson",
    date: "2 months ago",
    rating: 5,
    text: "Coming from Europe, I was impressed by the heating standards. Comparable to Swiss chalets.",
  },
];

const MENU_CATEGORIES = [
  {
    title: "Kashmiri Wazwan",
    items: [
      {
        name: "Rogan Josh",
        desc: "Aromatic lamb curry slow-cooked with Kashmiri spices",
        price: "₹850",
      },
      {
        name: "Gushtaba",
        desc: "Minced mutton balls in savory yogurt gravy",
        price: "₹900",
      },
      {
        name: "Yakhni",
        desc: "Delicate mutton cooked in yogurt and saffron broth",
        price: "₹850",
      },
      {
        name: "Rista",
        desc: "Spicy meat balls in fiery red gravy",
        price: "₹875",
      },
      {
        name: "Dum Aloo",
        desc: "Potatoes simmered in rich spicy red gravy",
        price: "₹550",
      },
    ],
  },
  {
    title: "Indian Specialties",
    items: [
      {
        name: "Chicken Tikka Masala",
        desc: "Roasted chicken in spicy creamy tomato sauce",
        price: "₹750",
      },
      {
        name: "Paneer Butter Masala",
        desc: "Cottage cheese in rich tomato gravy with butter",
        price: "₹650",
      },
      {
        name: "Dal Makhani",
        desc: "Black lentils slow-cooked overnight with cream",
        price: "₹450",
      },
      {
        name: "Tandoori Platter",
        desc: "Assortment of grilled kebabs and tikkas",
        price: "₹950",
      },
    ],
  },
  {
    title: "Continental & Grills",
    items: [
      {
        name: "Grilled Rainbow Trout",
        desc: "Fresh local river catch with lemon butter sauce",
        price: "₹950",
      },
      {
        name: "Classic Fish & Chips",
        desc: "Batter fried fish served with tartar sauce",
        price: "₹700",
      },
      {
        name: "Alfredo Pasta",
        desc: "Penne tossed in creamy cheese sauce with mushrooms",
        price: "₹550",
      },
      {
        name: "Club Sandwich",
        desc: "Toasted triple decker with chicken, egg and cheese",
        price: "₹450",
      },
    ],
  },
  {
    title: "Warm Beverages",
    items: [
      {
        name: "Kashmiri Kahwa",
        desc: "Traditional saffron tea brewed with cardamom",
        price: "₹250",
      },
      { name: "Masala Chai", desc: "Spiced Indian milk tea", price: "₹150" },
      {
        name: "Hot Chocolate",
        desc: "Rich cocoa with whipped cream and marshmallows",
        price: "₹280",
      },
    ],
  },
];

// --- ANIMATION UTILITIES ---

const Reveal = ({ children, delay = 0 }) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <div className="mb-8">{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
    className="w-full"
  >
    {children}
  </motion.div>
);

// --- UI COMPONENTS ---

const SectionHeading = ({ sub, title, center = true, dark = false }) => (
  <div className={`mb-12 ${center ? "text-center" : "text-left"}`}>
    <span
      className={`uppercase text-xs font-bold ${dark ? "text-amber-500" : "text-amber-700"} mb-3 block font-sans tracking-widest`}
    >
      {sub}
    </span>
    <h2
      className={`font-serif text-3xl md:text-5xl ${dark ? "text-white" : "text-emerald-950"}`}
    >
      {title}
    </h2>
    <div
      className={`h-1 w-20 ${dark ? "bg-amber-500" : "bg-emerald-900"} mt-6 ${center ? "mx-auto" : ""}`}
    />
  </div>
);

const Navigation = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [triggerRef, scrolled] = useScrollTrigger();

  const isDark = scrolled || activeTab !== "home";
  const navLinks = ["Home", "Rooms", "Dining", "Experience", "Contact"];

  return (
    <>
      <div
        ref={triggerRef}
        className="absolute top-0 h-1 w-full pointer-events-none opacity-0"
      />

      <motion.nav
        initial={false}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 w-full z-40 transition-all duration-300 ease-in-out ${
          scrolled
            ? "bg-white/95 md:backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div
            className="flex flex-col cursor-pointer z-50 group"
            onClick={() => setActiveTab("home")}
          >
            <span
              className={`font-serif text-xl tracking-widest font-bold transition-colors duration-300 ${isDark ? "text-emerald-950" : "text-white"}`}
            >
              PINE PALACE PLATINUM
            </span>
            <span
              className={`text-[0.6rem] uppercase tracking-[0.3em] transition-colors duration-300 ${isDark ? "text-amber-700" : "text-amber-400"}`}
            >
              Gulmarg • Kashmir
            </span>
          </div>

          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => setActiveTab(link.toLowerCase())}
                className={`uppercase text-xs tracking-widest transition-all duration-200 hover:scale-105 font-bold ${
                  activeTab === link.toLowerCase()
                    ? "text-amber-600"
                    : isDark
                      ? "text-stone-600 hover:text-emerald-900"
                      : "text-white/90 hover:text-white"
                }`}
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => setActiveTab("booking")}
              className={`px-6 py-2 uppercase text-xs tracking-widest border transition-all duration-300 hover:shadow-lg active:scale-95 font-bold ${
                isDark
                  ? "border-emerald-900 text-emerald-900 hover:bg-emerald-900 hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-emerald-900"
              }`}
            >
              Book
            </button>
          </div>

          <button
            className="md:hidden z-50 transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="text-emerald-950" />
            ) : (
              <Menu className={isDark ? "text-emerald-950" : "text-white"} />
            )}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="fixed inset-0 bg-stone-50 z-40 flex flex-col justify-center items-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link}
                custom={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                onClick={() => {
                  setActiveTab(link.toLowerCase());
                  setMobileMenuOpen(false);
                }}
                className="font-serif text-3xl text-emerald-950 hover:text-amber-600 active:scale-90"
              >
                {link}
              </motion.button>
            ))}
            <div className="w-12 h-[1px] bg-stone-300 my-4" />
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={() => {
                setActiveTab("booking");
                setMobileMenuOpen(false);
              }}
              className="bg-emerald-950 text-white px-8 py-3 uppercase tracking-widest text-xs font-bold"
            >
              Book Your Stay
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- HERO SECTION ---

const Hero = ({ setActiveTab }) => {
  const isMobile = useIsMobile();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-emerald-950">
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: isMobile ? 1 : 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: isMobile ? 0 : 10, ease: "easeOut" }}
          // OPTIMIZED IMAGE: Reduced quality (q=50) and width (w=1400) for faster natural load
          src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=50&w=1400"
          srcSet="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=50&w=600 600w, 
                  https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=50&w=1400 1400w"
          sizes="100vw"
          alt="Pine Palace Platinum Interior"
          className="w-full h-[120%] object-cover object-center will-change-transform"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-emerald-950/90" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-[1px] w-12 bg-white/60" />
            <span className="uppercase tracking-[0.3em] text-white/90 text-sm font-light">
              2 Mins to Gondola
            </span>
            <div className="h-[1px] w-12 bg-white/60" />
          </motion.div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight">
            <motion.span
              className="block"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.3 },
                },
              }}
            >
              {"Pine Palace".split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 1, ease: [0.2, 0.65, 0.3, 0.9] },
                    },
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
            <motion.span
              className="block italic font-light opacity-90"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.8 },
                },
              }}
            >
              {"Platinum".split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 1, ease: [0.2, 0.65, 0.3, 0.9] },
                    },
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-white/80 max-w-lg mx-auto mb-8 font-light text-lg"
          >
            Experience the convenience of staying just 200 meters from the
            Gondola base station.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-4 justify-center mt-2"
          >
            <button
              onClick={() => setActiveTab("rooms")}
              className="bg-white text-emerald-950 px-8 py-4 rounded-sm uppercase tracking-widest text-sm font-bold hover:bg-stone-100 transition-transform hover:-translate-y-1 shadow-lg"
            >
              View Platinum Rooms
            </button>
            <button
              onClick={() =>
                window.open(`https://wa.me/${HOTEL_INFO.whatsapp}`, "_blank")
              }
              className="border border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-sm uppercase tracking-widest text-sm font-bold hover:bg-white/10 transition-transform hover:-translate-y-1"
            >
              Enquire Rates
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// --- GUEST REVIEWS ---

const GuestReviews = () => {
  const scrollRef = useRef(null);

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white py-24 text-center px-0 relative overflow-hidden">
      <div className="flex flex-col items-center mb-12 px-6 relative">
        <SectionHeading
          sub="Testimonials"
          title="Guest Experiences"
          center={true}
        />
        <Reveal>
          <div className="flex flex-col items-center justify-center mb-10 space-y-2">
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={16} fill="currentColor" stroke="none" />
              <span className="text-stone-800 font-bold text-sm">4.8</span>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-stone-500 font-medium">
              Rated highly on Google • Trusted by Travelers all over the World
            </p>
          </div>
        </Reveal>

        {/* Desktop Navigation Buttons */}
        <div className="hidden md:flex gap-3 absolute right-6 bottom-0">
          <button
            onClick={() => scroll(-400)}
            className="p-3 rounded-full border border-stone-200 text-emerald-950 hover:bg-emerald-950 hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll(400)}
            className="p-3 rounded-full border border-stone-200 text-emerald-950 hover:bg-emerald-950 hover:text-white transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="w-full overflow-x-auto snap-x snap-mandatory flex gap-6 px-6 pb-12 scrollbar-hide group/list"
      >
        {GUEST_REVIEWS.map((review, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="snap-center shrink-0 w-[85vw] md:w-[30vw] bg-stone-50 p-8 md:p-10 rounded-sm text-left border border-stone-100 shadow-sm flex flex-col relative transition-all duration-300 md:group-hover/list:blur-[2px] md:group-hover/list:opacity-50 md:hover:!blur-none md:hover:!opacity-100 md:hover:scale-[1.02] md:hover:shadow-xl md:hover:z-10 hover:-translate-y-1"
          >
            <Quote
              size={32}
              className="text-emerald-900/10 absolute top-8 right-8"
            />
            <div className="flex text-amber-500 mb-6">
              {[...Array(review.rating)].map((_, idx) => (
                <Star key={idx} size={14} fill="currentColor" stroke="none" />
              ))}
            </div>
            <p className="text-stone-600 text-sm leading-loose line-clamp-4 mb-6 italic font-serif">
              "{review.text}"
            </p>
            <div className="mt-auto flex items-center gap-4 pt-4 border-t border-stone-200/50">
              <div className="w-10 h-10 rounded-full bg-emerald-950 text-white flex items-center justify-center font-bold text-sm">
                {review.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-sm text-emerald-950">
                  {review.name}
                </h4>
                <span className="text-xs text-stone-400">
                  {review.date || "Recent Guest"}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <a
          href={`https://www.google.com/search?q=${HOTEL_INFO.name}+reviews`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-emerald-900 font-medium text-sm tracking-wide hover:text-amber-600 transition-colors border-b border-transparent hover:border-amber-600 pb-0.5"
        >
          Read more reviews on Google <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
};

const MDMessage = () => {
  return (
    <section className="bg-white py-24 px-6 text-center border-b border-stone-100">
      <Reveal>
        <div className="max-w-3xl mx-auto">
          <h3 className="text-amber-600 uppercase tracking-widest text-xs font-bold mb-8">
            A Message from the Managing Director
          </h3>
          <p className="font-serif text-2xl md:text-3xl text-emerald-950 leading-relaxed mb-10 italic">
            “At Pine Palace Platinum, our vision has always been simple, to
            offer guests the rare luxury of location, warmth, and genuine
            Kashmiri hospitality.
            <br />
            <br />
            Being just steps from the Gondola, we understand the value of time,
            comfort, and care. Every detail in our Platinum Wing is designed so
            you spend less time commuting and more time experiencing Gulmarg at
            its finest.
            <br />
            <br />
            We look forward to welcoming you personally.”
          </p>
          <div className="text-stone-500 font-sans tracking-wide text-sm">
            — Managing Director
            <br />
            Pine Palace Platinum, Gulmarg
          </div>
        </div>
      </Reveal>
    </section>
  );
};

const RoomsList = ({ setActiveTab }) => {
  return (
    <section className="py-24 bg-stone-50">
      <div className="container mx-auto px-6">
        <SectionHeading
          sub="Accommodations"
          title="The Platinum Wing"
          center={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {ROOMS.map((room, idx) => (
            <Reveal key={room.id} delay={idx * 0.1}>
              <div
                className="group bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-stone-100 cursor-pointer"
                onClick={() => setActiveTab("rooms")}
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full object-cover"
                    // Optimization: Lazy load + Async decoding
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="400"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs uppercase tracking-widest font-bold text-emerald-900">
                    {room.type}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-2xl text-emerald-950 mb-3 group-hover:text-amber-600 transition-colors">
                    {room.title}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed border-b border-stone-100 pb-6">
                    {room.desc.substring(0, 100)}...
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => setActiveTab("rooms")}
            className="inline-flex items-center gap-2 text-emerald-900 font-bold uppercase tracking-widest text-sm border-b-2 border-emerald-900 pb-1 hover:text-amber-600 hover:border-amber-600 transition-colors"
          >
            Explore Our Suites <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

const Dining = ({ setActiveTab }) => {
  return (
    <section className="py-24 bg-stone-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <Reveal>
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-emerald-900/20 z-0" />
              <img
                // Optimization: reduced quality and specific width
                src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=75&w=800"
                alt="Dining"
                className="relative z-10 w-full shadow-xl rounded-sm hover:scale-[1.01] transition-transform duration-500"
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
              />
            </Reveal>
          </div>
          <div className="lg:w-1/2">
            <Reveal delay={0.2}>
              <SectionHeading
                sub="Dining"
                title="Kashmiri Wazwan & More"
                center={false}
              />
              <p className="text-stone-600 leading-relaxed mb-8">
                Our in-house restaurant offers a warm refuge from the snow.
                Specializing in authentic Kashmiri Wazwan (Rogan Josh, Gustaba)
                as well as comforting Indian and Continental classics.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 shadow-sm border border-stone-200 text-center hover:-translate-y-1 transition-transform">
                  <Coffee className="mx-auto text-emerald-900 mb-3" />
                  <h4 className="font-serif text-lg text-emerald-950">
                    Lobby Lounge
                  </h4>
                  <p className="text-xs text-stone-500 mt-2">Kahwa & Snacks</p>
                </div>
                <div className="bg-white p-6 shadow-sm border border-stone-200 text-center hover:-translate-y-1 transition-transform">
                  <Utensils className="mx-auto text-emerald-900 mb-3" />
                  <h4 className="font-serif text-lg text-emerald-950">
                    Main Restaurant
                  </h4>
                  <p className="text-xs text-stone-500 mt-2">
                    Buffet & A la Carte
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab("menu")}
                className="bg-emerald-950 text-white px-8 py-4 rounded-sm uppercase tracking-widest text-xs font-bold hover:bg-emerald-900 transition-colors flex items-center gap-3 group"
              >
                <span>View Full Menu</span>
                <FileText
                  size={16}
                  className="text-amber-500 group-hover:-translate-y-1 transition-transform"
                />
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section className="py-24 bg-emerald-950 text-white overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <SectionHeading
              sub="The Location"
              title="Steps from the Slopes"
              center={true}
              dark={true}
            />
            <p className="text-stone-300 leading-loose mb-12 text-lg font-light max-w-2xl mx-auto">
              We are situated just a short walk from the Gulmarg Gondola Base
              Station. While others commute, you can stroll from the hotel to
              the lift in minutes. Enjoy the convenience of returning quickly to
              your doorstep after a day on the Apharwat peaks.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-12">
              {[
                {
                  title: "Gondola Base",
                  dist: "200m (2 min Walk)",
                  icon: (
                    <MapPin className="w-6 h-6 text-amber-500 mx-auto mb-4" />
                  ),
                },
                {
                  title: "Ski Chair Lift",
                  dist: "200m Walk",
                  icon: (
                    <Snowflake className="w-6 h-6 text-amber-500 mx-auto mb-4" />
                  ),
                },
                {
                  title: "Golf Course",
                  dist: "5 min Drive",
                  icon: (
                    <Wind className="w-6 h-6 text-amber-500 mx-auto mb-4" />
                  ),
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group p-6 rounded-sm hover:bg-white/5 transition-colors"
                >
                  {item.icon}
                  <h4 className="font-serif text-xl mb-2">{item.title}</h4>
                  <span className="text-xs text-stone-400 uppercase tracking-widest">
                    {item.dist}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const MenuPage = ({ setActiveTab }) => (
  <div className="pt-32 pb-24 container mx-auto px-6 min-h-screen">
    <button
      onClick={() => setActiveTab("dining")}
      className="mb-8 flex items-center gap-2 text-stone-500 hover:text-emerald-950 transition-colors uppercase tracking-widest text-xs font-bold"
    >
      <ChevronLeft size={16} /> Back to Dining
    </button>
    <SectionHeading sub="Fine Dining" title="Our Menu" center={true} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
      {MENU_CATEGORIES.map((category, idx) => (
        <Reveal key={idx} delay={idx * 0.1}>
          <div className="mb-8">
            <h3 className="font-serif text-2xl text-emerald-950 mb-6 border-b border-stone-200 pb-2 inline-block pr-8">
              {category.title}
            </h3>
            <div className="space-y-8">
              {category.items.map((item, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-stone-800 text-lg group-hover:text-amber-600 transition-colors">
                      {item.name}
                    </h4>
                    <span className="font-serif text-emerald-900 font-medium">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-stone-500 text-sm font-light italic">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
);

const RoomsPage = ({ setActiveTab, setPreSelectedRoom }) => {
  const handleBook = (roomTitle) => {
    setPreSelectedRoom(roomTitle);
    setActiveTab("booking");
  };

  return (
    <div className="pt-24 pb-24 container mx-auto px-6">
      <div className="space-y-32">
        {ROOMS.map((room, idx) => (
          <Reveal key={room.id} delay={idx * 0.1}>
            <div
              className={`flex flex-col ${idx % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"} gap-12 lg:gap-24 items-center`}
            >
              <div className="w-full md:w-1/2 relative group">
                <div className="absolute inset-0 bg-emerald-950/5 transform translate-x-4 translate-y-4 rounded-sm transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />
                <div className="relative overflow-hidden rounded-sm shadow-2xl">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    src={room.image}
                    alt={room.title}
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-6 py-2 text-sm font-bold tracking-widest text-emerald-950 uppercase shadow-lg">
                    {room.type}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="font-serif text-4xl lg:text-5xl text-emerald-950 mb-4">
                  {room.title}
                </h3>
                <div className="flex items-baseline gap-4 mb-6 border-b border-stone-200 pb-6">
                  <span className="text-2xl text-amber-700 font-medium">
                    {room.price}
                  </span>
                  <span className="text-stone-400 text-sm font-light">
                    per night / season rate
                  </span>
                </div>
                <p className="text-stone-600 leading-relaxed mb-8 text-lg font-light">
                  {room.desc}
                </p>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-10">
                  {room.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm text-stone-600"
                    >
                      <div className="p-1 rounded-full bg-stone-100 text-amber-600">
                        <ChevronRight size={14} />
                      </div>
                      {feat}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBook(room.title)}
                    className="px-8 py-4 bg-emerald-950 text-white uppercase tracking-widest text-xs font-bold hover:bg-emerald-900 shadow-xl flex items-center justify-center gap-3"
                  >
                    <span>Book this Suite</span>
                    <ArrowRight size={16} className="text-amber-500" />
                  </motion.button>
                  <motion.button
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      window.open(
                        `https://wa.me/${HOTEL_INFO.whatsapp}?text=I have a query about ${room.title}`,
                        "_blank",
                      )
                    }
                    className="px-8 py-4 border border-emerald-950 text-emerald-950 uppercase tracking-widest text-xs font-bold hover:bg-stone-50 flex items-center justify-center"
                  >
                    Enquire Now
                  </motion.button>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

const BookingPage = ({ initialRoom }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    altPhone: "",
    room: initialRoom || "Platinum Club Room",
    checkIn: "",
    checkOut: "",
    guests: "2",
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const message =
      `*New Booking Request*%0A%0A` +
      `*Name:* ${formData.firstName} ${formData.lastName}%0A` +
      `*Room:* ${formData.room}%0A` +
      `*Dates:* ${formData.checkIn} to ${formData.checkOut}%0A` +
      `*Guests:* ${formData.guests}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Phone:* ${formData.phone}%0A` +
      (formData.altPhone ? `*Alt Phone:* ${formData.altPhone}%0A` : "");
    window.open(
      `https://wa.me/${HOTEL_INFO.whatsapp}?text=${message}`,
      "_blank",
    );
  };

  return (
    <div className="pt-32 pb-24 container mx-auto px-6 min-h-screen flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row"
      >
        <div className="md:w-1/3 bg-emerald-950 p-10 text-white flex flex-col justify-between">
          <div>
            <span className="text-amber-500 uppercase tracking-widest text-xs font-bold mb-4 block">
              Reservation
            </span>
            <h2 className="font-serif text-3xl mb-6">Secure Your Stay</h2>
            <p className="text-stone-400 text-sm leading-relaxed mb-8">
              Fill out the form to generate a booking request. Our concierge
              will receive your details directly on WhatsApp to confirm
              availability and finalize your reservation.
            </p>
          </div>
          <div className="space-y-4 text-sm text-stone-300">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-amber-500 w-4 h-4" />
              <span>Best Rate Guarantee</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="text-amber-500 w-4 h-4" />
              <span>No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="text-amber-500 w-4 h-4" />
              <span>Direct Concierge Access</span>
            </div>
          </div>
        </div>
        <div className="md:w-2/3 p-10 md:p-12 bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-stone-300 py-2 outline-none bg-transparent font-serif"
                  placeholder="Your first name"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-stone-300 py-2 outline-none bg-transparent font-serif"
                  placeholder="Your last name"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-stone-300 py-2 outline-none bg-transparent font-serif"
                  placeholder="youremail@contact.com"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-stone-300 py-2 outline-none bg-transparent font-serif"
                  placeholder="+91 12345 67890"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                Alternative Phone (Optional)
              </label>
              <input
                type="tel"
                name="altPhone"
                value={formData.altPhone}
                onChange={handleChange}
                className="w-full border-b border-stone-300 py-2 outline-none bg-transparent font-serif"
                placeholder="+91 12345 67890"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                Select Suite
              </label>
              <div className="relative">
                <select
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                  className="w-full border-b border-stone-300 py-2 outline-none bg-transparent font-serif appearance-none cursor-pointer"
                >
                  {ROOMS.map((room) => (
                    <option key={room.id} value={room.title}>
                      {room.title}
                    </option>
                  ))}
                </select>
                <ChevronRight className="absolute right-0 top-3 text-stone-400 w-4 h-4 rotate-90 pointer-events-none" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                  Check-in
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="w-full border-b border-stone-300 py-2 outline-none bg-transparent font-serif"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                  Check-out
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="w-full border-b border-stone-300 py-2 outline-none bg-transparent font-serif"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                  Guests
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full border-b border-stone-300 py-2 outline-none bg-transparent font-serif"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-emerald-950 text-white px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-emerald-900 transition-all shadow-xl flex items-center justify-center gap-3 mt-4"
            >
              <span>Confirm Booking</span>
              <MessageCircle size={16} className="text-amber-500" />
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const WhatsAppButton = ({ mobileOnly = false }) => {
  if (mobileOnly) {
    return (
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      >
        <a
          href={`https://wa.me/${HOTEL_INFO.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-emerald-950/95 backdrop-blur-md text-white p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] border-t border-white/10 active:bg-emerald-900"
        >
          <MessageCircle className="w-5 h-5 text-amber-500 fill-amber-500/20" />
          <span className="uppercase tracking-widest text-xs font-bold font-sans">
            Plan Your Stay
          </span>
        </a>
      </motion.div>
    );
  }
  return (
    <motion.a
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      href={`https://wa.me/${HOTEL_INFO.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-1/2 right-0 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-4 bg-white/90 backdrop-blur-xl text-emerald-950 py-6 px-3 rounded-l-2xl shadow-[-4px_0_20px_rgba(0,0,0,0.1)] border-y border-l border-stone-200 group hover:bg-emerald-950 hover:border-emerald-900 transition-all duration-300"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
        <MessageCircle className="w-5 h-5 text-emerald-700 group-hover:text-amber-500 transition-colors relative z-10" />
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
    </motion.a>
  );
};

const Footer = ({ setActiveTab }) => {
  return (
    <footer className="bg-emerald-950 text-white pt-24 pb-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <span className="font-serif text-3xl block mb-6">
              PINE PALACE PLATINUM
            </span>
            <p className="text-stone-400 max-w-sm leading-relaxed mb-8 font-light">
              The premier destination near the Gondola in Gulmarg. Luxury meets
              adventure at 2,650 meters.
            </p>
            <div className="flex gap-4">
              <div className="text-white hover:text-amber-500 cursor-pointer transition-colors">
                <Instagram size={20} />
              </div>
              <div className="text-white hover:text-amber-500 cursor-pointer transition-colors">
                <Facebook size={20} />
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-amber-500 uppercase tracking-widest text-xs font-bold mb-6">
              Explore
            </h4>
            <ul className="space-y-4 text-sm text-stone-300 w-full">
              {["Rooms", "Dining", "Experience", "Contact"].map((link) => (
                <li
                  key={link}
                  onClick={() => setActiveTab(link.toLowerCase())}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  {link === "Rooms" ? "Our Suites" : link}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-amber-500 uppercase tracking-widest text-xs font-bold mb-6">
              Contact
            </h4>
            <ul className="space-y-4 text-sm text-stone-300 w-full">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 shrink-0 text-amber-500" />
                <span className="break-words">
                  Near Gondola Base Station,
                  <br />
                  Gulmarg, Kashmir 193403
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-amber-500" />
                <span className="break-words">+91 95962 55222</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="mt-1 shrink-0 text-amber-500" />
                <span className="break-all">
                  reservations@pinepalaceresort.com
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500">
          <p>
            &copy; {new Date().getFullYear()} Pine Palace Platinum. All rights
            reserved.
          </p>
          <div className="flex gap-1 md:mt-0 items-center">
            <span>Developed by</span>
            <a
              href="https://www.prcptiv.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-300 hover:text-amber-500 transition-colors font-medium inline-block hover:-translate-y-1 transform duration-200"
            >
              Perceptive Co.
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [preSelectedRoom, setPreSelectedRoom] = useState(null);

  // --- SECURITY: DISABLE RIGHT CLICK ---
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  const styles = useMemo(
    () => (
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
      :root { 
        --font-serif: 'Playfair Display', serif; 
        --font-sans: 'Inter', sans-serif; 
        scroll-behavior: smooth;
      }
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      .will-change-transform { will-change: transform; }
    `}</style>
    ),
    [],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  return (
    <div className="font-sans text-stone-800 bg-stone-50 selection:bg-amber-200">
      {styles}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <PageTransition key="home">
              <Hero setActiveTab={setActiveTab} />
              <Experience />
              <MDMessage />
              <div id="rooms-preview">
                <RoomsList
                  setActiveTab={setActiveTab}
                  setPreSelectedRoom={setPreSelectedRoom}
                />
              </div>
              <Dining setActiveTab={setActiveTab} />
              <GuestReviews />
            </PageTransition>
          )}
          {activeTab === "rooms" && (
            <PageTransition key="rooms">
              <div className="pt-24">
                <div className="bg-emerald-950 text-white py-20 text-center px-4">
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="font-serif text-5xl mb-4"
                  >
                    Our Suites
                  </motion.h1>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-stone-300 max-w-2xl mx-auto font-light"
                  >
                    Refined comfort meeting alpine ruggedness.
                  </motion.p>
                </div>
                <RoomsPage
                  setActiveTab={setActiveTab}
                  setPreSelectedRoom={setPreSelectedRoom}
                />
              </div>
            </PageTransition>
          )}
          {activeTab === "experience" && (
            <PageTransition key="experience">
              <div className="pt-24">
                <Experience />
                <MDMessage />
              </div>
            </PageTransition>
          )}
          {activeTab === "dining" && (
            <PageTransition key="dining">
              <div className="pt-24">
                <div className="bg-emerald-950 text-white py-20 text-center px-4">
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="font-serif text-5xl mb-4"
                  >
                    Dining
                  </motion.h1>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-stone-300 max-w-2xl mx-auto font-light"
                  >
                    Authentic flavors, unforgettable views.
                  </motion.p>
                </div>
                <Dining setActiveTab={setActiveTab} />
              </div>
            </PageTransition>
          )}
          {activeTab === "menu" && (
            <PageTransition key="menu">
              <MenuPage setActiveTab={setActiveTab} />
            </PageTransition>
          )}
          {activeTab === "booking" && (
            <PageTransition key="booking">
              <BookingPage initialRoom={preSelectedRoom} />
            </PageTransition>
          )}
          {activeTab === "contact" && (
            <PageTransition key="contact">
              <div className="pt-24">
                <div className="container mx-auto px-6 py-12">
                  <SectionHeading
                    sub="Get in Touch"
                    title="Contact & Location"
                    center={true}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-6xl mx-auto bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]"
                  >
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative z-10">
                      <div className="mb-8">
                        <h3 className="font-serif text-3xl text-emerald-950 mb-3">
                          Send us a Message
                        </h3>
                        <p className="text-stone-500 font-light text-sm leading-relaxed">
                          Our concierge team is available 24/7 to assist with
                          your booking.
                          <br />
                          Direct reservations:{" "}
                          <span className="font-medium text-emerald-900">
                            +91 95962 55222
                          </span>
                        </p>
                      </div>
                      <form
                        className="space-y-6"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <div className="space-y-4">
                          <input
                            type="text"
                            placeholder="Your first name"
                            className="w-full border-b border-stone-300 py-2 outline-none bg-transparent font-serif"
                          />
                          <input
                            type="email"
                            placeholder="youremail@contact.com"
                            className="w-full border-b border-stone-300 py-2 outline-none bg-transparent font-serif"
                          />
                          <textarea
                            placeholder="Message"
                            rows={3}
                            className="w-full border-b border-stone-300 py-2 outline-none bg-transparent font-serif"
                          ></textarea>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-emerald-950 text-white px-8 py-4 uppercase tracking-widest text-xs font-bold w-full mt-4 hover:bg-emerald-900 transition-colors"
                        >
                          Send Inquiry
                        </motion.button>
                      </form>
                    </div>
                    <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-full bg-stone-200">
                      <div className="absolute inset-0 flex items-center justify-center text-stone-400">
                        Map Loading...
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </PageTransition>
          )}
        </AnimatePresence>
      </main>
      <Footer setActiveTab={setActiveTab} />
      <WhatsAppButton />
      <WhatsAppButton mobileOnly={true} />
    </div>
  );
}
