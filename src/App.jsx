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
      "Mountain View",
      "Free Wi-Fi",
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
    features: ["Master Bedroom", "Living Area", "Bathtub", "Butler Service"],
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=60&w=600",
    type: "Luxury",
  },
  {
    id: 3,
    title: "Family Quad Room",
    price: "₹28,500",
    desc: "Ideal for families or groups, featuring two large king beds and ample space for winter gear storage. Designed to keep the family together while providing enough room for everyone to relax.",
    features: ["2 King Beds", "4 Occupancy", "Heated Floors", "Dining Table"],
    image:
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=60&w=600",
    type: "Family",
  },
];

const GUEST_REVIEWS = [
  {
    name: "Arjun Mehta",
    rating: 5,
    text: "Unbeatable location. It's barely a 2-minute walk to the Gondola.",
    date: "2 weeks ago",
  },
  {
    name: "Sarah Williams",
    rating: 5,
    text: "The proximity to the Gondola is the real USP. Breathtaking views.",
    date: "1 month ago",
  },
  {
    name: "Vikram Singh",
    rating: 4,
    text: "Great property. The wooden interiors give a very cozy vibe.",
    date: "3 weeks ago",
  },
  {
    name: "Priya D.",
    rating: 5,
    text: "Absolutely loved the 'Platinum' experience. Hot water was available 24/7.",
    date: "2 months ago",
  },
  {
    name: "Daniel Foster",
    rating: 5,
    text: "The heated floors in the bathroom were a lifesaver.",
    date: "1 week ago",
  },
  {
    name: "Sophie Anderson",
    rating: 5,
    text: "Coming from Europe, I was impressed by the heating standards.",
    date: "2 months ago",
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
        desc: "Minced mutton balls in savory yogurt gravy (The King of Dishes)",
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
        desc: "Traditional saffron tea brewed with cardamom and almonds",
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

// --- ANIMATION COMPONENTS ---

const Reveal = ({ children, delay = 0 }) => {
  const isMobile = useIsMobile();

  if (isMobile) return <div className="mb-8">{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
    className="w-full"
  >
    {children}
  </motion.div>
);

const AnimatedButton = ({
  children,
  className,
  onClick,
  variant = "primary",
  ariaLabel,
}) => {
  const baseClasses =
    "px-8 py-4 rounded-sm uppercase tracking-widest text-xs font-bold flex items-center justify-center gap-3 transition-colors";
  const variants = {
    primary: "bg-emerald-950 text-white hover:bg-emerald-900 shadow-lg",
    secondary: "bg-white text-emerald-950 hover:bg-stone-50 shadow-lg",
    outline: "border border-emerald-950 text-emerald-950 hover:bg-stone-50",
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
};

const SectionHeading = ({ sub, title, center = true, dark = false }) => (
  <div className={`mb-12 ${center ? "text-center" : "text-left"}`}>
    <motion.span
      initial={{ opacity: 0, letterSpacing: "0em" }}
      whileInView={{ opacity: 1, letterSpacing: "0.1em" }}
      viewport={{ once: true }}
      className={`uppercase text-xs font-bold ${dark ? "text-amber-500" : "text-amber-700"} mb-3 block font-sans tracking-widest`}
    >
      {sub}
    </motion.span>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`font-serif text-3xl md:text-5xl ${dark ? "text-white" : "text-emerald-950"}`}
    >
      {title}
    </motion.h2>
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: 80 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className={`h-1 ${dark ? "bg-amber-500" : "bg-emerald-900"} mt-6 ${center ? "mx-auto" : ""}`}
    />
  </div>
);

// --- UI COMPONENTS ---

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
            role="button"
            tabIndex={0}
            aria-label="Go to homepage"
            onKeyDown={(e) => e.key === "Enter" && setActiveTab("home")}
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
                className={`uppercase text-xs tracking-widest font-bold relative group ${
                  activeTab === link.toLowerCase()
                    ? "text-amber-600"
                    : isDark
                      ? "text-stone-600 hover:text-emerald-900"
                      : "text-white/90 hover:text-white"
                }`}
              >
                {link}
                <span
                  className={`absolute -bottom-2 left-0 h-0.5 bg-amber-600 transition-all duration-300 ${activeTab === link.toLowerCase() ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("booking")}
              className={`px-6 py-2 uppercase text-xs tracking-widest border transition-all duration-300 font-bold ${
                isDark
                  ? "border-emerald-900 text-emerald-900 hover:bg-emerald-900 hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-emerald-900"
              }`}
            >
              Book
            </motion.button>
          </div>

          <button
            className="md:hidden z-50 transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
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

const Hero = ({ setActiveTab }) => {
  const isMobile = useIsMobile();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-emerald-950">
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: isMobile ? 1 : 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: isMobile ? 0 : 10, ease: "easeOut" }}
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="block"
            >
              Pine Palace
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="block italic font-light opacity-90"
            >
              Platinum
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-white/80 max-w-lg mx-auto mb-8 font-light text-lg"
          >
            Experience the convenience of staying just 200 meters from the
            Gondola base station.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-4 justify-center mt-2"
          >
            <AnimatedButton
              variant="secondary"
              onClick={() => setActiveTab("rooms")}
            >
              View Platinum Rooms
            </AnimatedButton>
            <AnimatedButton
              variant="outlineWhite"
              onClick={() =>
                window.open(`https://wa.me/${HOTEL_INFO.whatsapp}`, "_blank")
              }
            >
              Enquire Rates
            </AnimatedButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

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

        {/* Desktop Navigation Buttons */}
        <div className="hidden md:flex gap-3 absolute right-6 bottom-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll(-400)}
            className="p-3 rounded-full border border-stone-200 text-emerald-950 hover:bg-emerald-950 hover:text-white transition-colors"
            aria-label="Scroll reviews left"
          >
            <ChevronLeft size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll(400)}
            className="p-3 rounded-full border border-stone-200 text-emerald-950 hover:bg-emerald-950 hover:text-white transition-colors"
            aria-label="Scroll reviews right"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="w-full overflow-x-auto snap-x snap-mandatory flex gap-6 px-6 pb-12 scrollbar-hide group/list"
      >
        {GUEST_REVIEWS.map((review, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="snap-center shrink-0"
          >
            <div className="w-[85vw] md:w-[30vw] h-full bg-stone-50 p-8 md:p-10 rounded-sm text-left border border-stone-100 shadow-sm flex flex-col relative transition-all duration-500 ease-out md:group-hover/list:blur-[2px] md:group-hover/list:opacity-50 md:hover:!blur-none md:hover:!opacity-100 md:hover:scale-[1.02] md:hover:shadow-xl md:hover:z-10 md:hover:-translate-y-2">
              <Quote
                size={32}
                className="text-emerald-900/10 absolute top-8 right-8"
              />
              <div className="flex text-amber-500 mb-6">
                {[...Array(review.rating)].map((_, idx) => (
                  <Star key={idx} size={14} fill="currentColor" stroke="none" />
                ))}
              </div>
              <p className="text-stone-600 text-sm leading-loose line-clamp-4 mb-6 italic font-serif flex-grow">
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
                  <span className="text-xs text-stone-400">{review.date}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <a
          href="https://www.google.com/travel/hotels/entity/CgsItuqYpe_BiOnJARAB/reviews?q=hotel%20pine%20palace%20platinum%20gulmarg&g2lb=4965990%2C72471280%2C72560029%2C72573224%2C72647020%2C72686036%2C72803964%2C72882230%2C72958624%2C73059275%2C73064764%2C73107089%2C73192290&hl=en-IN&gl=in&cs=1&ssta=1&ts=CAEaSQorEicyJTB4MzhlMWFmMjU4ZmQ1YTY3ZDoweGM5ZDIyMjBlZjRhNjM1MzYaABIaEhQKBwjqDxABGBsSBwjqDxABGBwYATICEAAqCQoFOgNJTlIaAA&qs=CAE4AkIJCTY1pvQOItLJQgkJNjWm9A4i0sk&ictx=111&utm_campaign=sharing&utm_medium=link&utm_source=htls"
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

const MDMessage = () => (
  <section className="bg-white py-24 px-6 text-center border-b border-stone-100">
    <Reveal>
      <div className="max-w-3xl mx-auto">
        <h3 className="text-amber-600 uppercase tracking-widest text-xs font-bold mb-8">
          A Message from the Managing Director
        </h3>
        <p className="font-serif text-2xl md:text-3xl text-emerald-950 leading-relaxed mb-10 italic">
          “At Pine Palace Platinum, our vision has always been simple, to offer
          guests the rare luxury of location, warmth, and genuine Kashmiri
          hospitality.
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

const RoomsList = ({ setActiveTab }) => (
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
            <motion.div
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group bg-white rounded-sm shadow-sm hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-stone-100 cursor-pointer h-full flex flex-col"
              onClick={() => setActiveTab("rooms")}
            >
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs uppercase tracking-widest font-bold text-emerald-900">
                  {room.type}
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="font-serif text-2xl text-emerald-950 mb-3 group-hover:text-amber-600 transition-colors">
                  {room.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed border-b border-stone-100 pb-6 flex-grow">
                  {room.desc}
                </p>
                {/* Removed View Details link as requested */}
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
      <div className="text-center">
        <AnimatedButton variant="outline" onClick={() => setActiveTab("rooms")}>
          Explore Our Suites
        </AnimatedButton>
      </div>
    </div>
  </section>
);

const Dining = ({ setActiveTab }) => (
  <section className="py-24 bg-stone-100">
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2 relative w-full">
          <Reveal>
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-emerald-900/20 z-0" />
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=75&w=800"
                alt="Fine Dining at Pine Palace"
                className="relative z-10 w-full shadow-xl rounded-sm"
                loading="lazy"
              />
            </motion.div>
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
              Specializing in authentic Kashmiri Wazwan (Rogan Josh, Gustaba) as
              well as comforting Indian and Continental classics.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 shadow-sm border border-stone-200 text-center hover:shadow-md transition-shadow">
                <Coffee className="mx-auto text-emerald-900 mb-3" />
                <h4 className="font-serif text-lg text-emerald-950">
                  Lobby Lounge
                </h4>
                <p className="text-xs text-stone-500 mt-2">Kahwa & Snacks</p>
              </div>
              <div className="bg-white p-6 shadow-sm border border-stone-200 text-center hover:shadow-md transition-shadow">
                <Utensils className="mx-auto text-emerald-900 mb-3" />
                <h4 className="font-serif text-lg text-emerald-950">
                  Restaurant
                </h4>
                <p className="text-xs text-stone-500 mt-2">
                  Buffet & A la Carte
                </p>
              </div>
            </div>
            <AnimatedButton
              onClick={() => setActiveTab("menu")}
              ariaLabel="View Full Menu"
            >
              View Full Menu <FileText size={16} />
            </AnimatedButton>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

const Experience = () => (
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
            Station. While others commute, you can stroll from the hotel to the
            lift in minutes. Enjoy the convenience of returning quickly to your
            doorstep after a day on the Apharwat peaks.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-12">
            {[
              {
                title: "Gondola Base",
                dist: "200m (2 min Walk)",
                icon: MapPin,
              },
              { title: "Ski Chair Lift", dist: "200m Walk", icon: Snowflake },
              { title: "Golf Course", dist: "5 min Drive", icon: Wind },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="group p-6 rounded-sm hover:bg-white/5 transition-colors cursor-default"
              >
                <item.icon className="w-6 h-6 text-amber-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-serif text-xl mb-2">{item.title}</h4>
                <span className="text-xs text-stone-400 uppercase tracking-widest">
                  {item.dist}
                </span>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

const MenuPage = ({ setActiveTab }) => (
  <div className="pt-32 pb-24 container mx-auto px-6 min-h-screen">
    <button
      onClick={() => setActiveTab("dining")}
      className="mb-8 flex items-center gap-2 text-stone-500 hover:text-emerald-950 transition-colors uppercase tracking-widest text-xs font-bold"
      aria-label="Go back to dining section"
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
                    <span className="font-serif text-emerald-900 font-medium">
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
                  <AnimatedButton onClick={() => handleBook(room.title)}>
                    Book this Suite{" "}
                    <ArrowRight size={16} className="text-amber-500" />
                  </AnimatedButton>
                  <AnimatedButton
                    variant="outline"
                    onClick={() =>
                      window.open(
                        `https://wa.me/${HOTEL_INFO.whatsapp}?text=I have a query about ${room.title}`,
                        "_blank",
                      )
                    }
                  >
                    Enquire Now
                  </AnimatedButton>
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

  const inputClasses =
    "w-full border-b border-stone-300 py-2 outline-none bg-transparent font-serif transition-colors focus:border-amber-600 focus:bg-stone-50/50";
  const labelClasses =
    "block text-xs uppercase tracking-widest text-stone-500 mb-2";

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
              will receive your details directly on WhatsApp.
            </p>
          </div>
          <div className="space-y-4 text-sm text-stone-300">
            {[
              "Best Rate Guarantee",
              "No Hidden Fees",
              "Direct Concierge Access",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="text-amber-500 w-4 h-4" />{" "}
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-2/3 p-10 md:p-12 bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className={labelClasses}>
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Your first name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className={labelClasses}>
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Your last name"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className={labelClasses}>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="youremail@contact.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className={labelClasses}>
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="+91 12345 67890"
                />
              </div>
            </div>
            <div>
              <label htmlFor="altPhone" className={labelClasses}>
                Alternative Phone (Optional)
              </label>
              <input
                id="altPhone"
                type="tel"
                name="altPhone"
                value={formData.altPhone}
                onChange={handleChange}
                className={inputClasses}
                placeholder="+91 12345 67890"
              />
            </div>
            <div>
              <label htmlFor="room" className={labelClasses}>
                Select Suite
              </label>
              <div className="relative">
                <select
                  id="room"
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                  className={`${inputClasses} appearance-none cursor-pointer`}
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
                <label htmlFor="checkIn" className={labelClasses}>
                  Check-in
                </label>
                <input
                  id="checkIn"
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="checkOut" className={labelClasses}>
                  Check-out
                </label>
                <input
                  id="checkOut"
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="guests" className={labelClasses}>
                  Guests
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className={inputClasses}
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <AnimatedButton className="w-full mt-4">
              Confirm Booking{" "}
              <MessageCircle size={16} className="text-amber-500" />
            </AnimatedButton>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const WhatsAppButton = ({ mobileOnly = false }) => {
  const content = (
    <>
      {mobileOnly ? (
        <div className="flex items-center justify-center gap-3 bg-emerald-950/95 backdrop-blur-md text-white p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] border-t border-white/10 active:bg-emerald-900">
          <MessageCircle className="w-5 h-5 text-amber-500 fill-amber-500/20" />
          <span className="uppercase tracking-widest text-xs font-bold font-sans">
            Plan Your Stay
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 bg-white/90 backdrop-blur-xl text-emerald-950 py-6 px-3 rounded-l-2xl shadow-[-4px_0_20px_rgba(0,0,0,0.1)] border-y border-l border-stone-200 group hover:bg-emerald-950 hover:border-emerald-900 transition-all duration-300">
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
          ? "fixed bottom-0 left-0 right-0 z-50 md:hidden"
          : "fixed top-1/2 right-0 -translate-y-1/2 z-50 hidden md:block"
      }
      aria-label="Book via WhatsApp"
    >
      {content}
    </motion.a>
  );
};

const Footer = ({ setActiveTab }) => (
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
            <motion.a
              whileHover={{ scale: 1.2, color: "#f59e0b" }}
              href="#"
              aria-label="Instagram"
              className="text-white transition-colors"
            >
              <Instagram size={20} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, color: "#f59e0b" }}
              href="#"
              aria-label="Facebook"
              className="text-white transition-colors"
            >
              <Facebook size={20} />
            </motion.a>
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
                className="cursor-pointer hover:text-white transition-colors hover:translate-x-1 duration-200 block"
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
              <MapPin size={16} className="mt-1 shrink-0 text-amber-500" />{" "}
              <span className="break-words">
                Near Gondola Base Station,
                <br />
                Gulmarg, Kashmir 193403
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-amber-500" />{" "}
              <span className="break-words">+91 95962 55222</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="mt-1 shrink-0 text-amber-500" />{" "}
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

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [preSelectedRoom, setPreSelectedRoom] = useState(null);

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  const styles = useMemo(
    () => (
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
      :root { --font-serif: 'Playfair Display', serif; --font-sans: 'Inter', sans-serif; scroll-behavior: smooth; }
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
                          Our concierge team is available 24/7. Direct
                          reservations:{" "}
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
                          <label htmlFor="contactName" className="sr-only">
                            Name
                          </label>
                          <input
                            id="contactName"
                            type="text"
                            placeholder="Your first name"
                            className="w-full border-b border-stone-300 py-2 outline-none bg-transparent font-serif focus:border-amber-600 transition-colors"
                          />
                          <label htmlFor="contactEmail" className="sr-only">
                            Email
                          </label>
                          <input
                            id="contactEmail"
                            type="email"
                            placeholder="youremail@contact.com"
                            className="w-full border-b border-stone-300 py-2 outline-none bg-transparent font-serif focus:border-amber-600 transition-colors"
                          />
                          <label htmlFor="contactMessage" className="sr-only">
                            Message
                          </label>
                          <textarea
                            id="contactMessage"
                            placeholder="Message"
                            rows={3}
                            className="w-full border-b border-stone-300 py-2 outline-none bg-transparent font-serif focus:border-amber-600 transition-colors"
                          ></textarea>
                        </div>
                        <AnimatedButton className="w-full mt-4">
                          Send Inquiry
                        </AnimatedButton>
                      </form>
                    </div>
                    <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-full bg-stone-200">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d413.22934335121505!2d74.3788228429222!3d34.04810988728005!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e1af258fd5a67d%3A0xc9d2220ef4a63536!2sHotel%20Pine%20Palace%20Platinum%20Gulmarg!5e0!3m2!1sen!2sin!4v1769190771785!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0, position: "absolute", inset: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Pine Palace Location Map"
                      ></iframe>
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
