export interface TariffRates {
  ep: number;
  cp: number;
  map: number;
  ap: number;
}

export interface Room {
  id: number;
  slug: string;
  title: string;
  price: string;
  tariffs: TariffRates;
  desc: string;
  features: string[];
  image: string;
  images: string[];
  type: string;
  maxGuests?: string;
  size?: string;
}

export interface GuestReview {
  name: string;
  rating: number;
  text: string;
  date: string;
}

export interface MenuItem {
  name: string;
  desc: string;
  price: string;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}

export interface Attraction {
  name: string;
  distance: string;
  type: "Sightseeing" | "Transit" | "Sports" | "Adventure";
  description: string;
}

export interface GalleryImage {
  id: number;
  url: string;
  title?: string;
}

export const EXTRA_BED_TARIFF: TariffRates = {
  ep: 400,
  cp: 700,
  map: 1000,
  ap: 1300,
};

export const CWOB_TARIFF: TariffRates = {
  ep: 0,
  cp: 400,
  map: 600,
  ap: 800,
};

export const CHILD_POLICY = {
  belowFive: "Complimentary (Child below 5 years)",
  cwob: "CWOB (Child Without Extra Bed)",
};

export const MEAL_PLAN_DEFINITIONS = [
  { code: "EP", name: "European Plan", desc: "Room Only (No Meals)" },
  { code: "CP", name: "Continental Plan", desc: "Room + Breakfast" },
  { code: "MAP", name: "Modified American Plan", desc: "Room + Breakfast + Lunch or Dinner" },
  { code: "AP", name: "American Plan", desc: "Room + All Meals (Breakfast, Lunch & Dinner)" },
];

export const HOTEL_INFO = {
  name: "Indus Valley Resort",
  location: "Pahalgam, Jammu & Kashmir",
  whatsapp: "+91 8899901175",
  phone: "+91 8899901175",
  reservationsPhone: "+91 8899901175",
  email: "contact@indusvalleyresort.com",
  address: "Dahwatoo, Rafting Point, Pahalgam, 1920401",
  district: "Anantnag, Jammu & Kashmir India",
  headOfficeAddress: "3rd Floor Ali Jan Complex, M.A Road, Srinagar, Jammu & Kashmir, India, 190001",
  coordinates: "33.920263, 75.269961",
  airportDistance: "Srinagar International Airport (SXR) - 70km (approx. 2 hr drive)",
  railwayDistance: "Anantnag Railway Station - 40 km (approx. 45 mins drive)",
};

export const ROOMS: Room[] = [
  {
    id: 1,
    slug: "mountain-view-room-balcony",
    title: "Mountain View Room with Balcony",
    price: "₹2,500",
    tariffs: {
      ep: 2500,
      cp: 3200,
      map: 4000,
      ap: 4800,
    },
    desc: "Charming accommodations featuring a private sit-out balcony with unobstructed views of Pahalgam's pine valleys and snow-capped mountain peaks.",
    features: [
      "Private Scenic Balcony",
      "King Size Bed",
      "Mountain & Valley View",
      "Free High-Speed Wi-Fi",
      "Central Heating & 24/7 Hot Water",
    ],
    image: "/rooms/mountainview/1.jpeg",
    images: [
      "/rooms/mountainview/1.jpeg",
      "/rooms/mountainview/2.jpeg",
      "/rooms/mountainview/3.jpeg",
      "/rooms/mountainview/4.jpeg",
      "/rooms/mountainview/5.jpeg",
      "/rooms/mountainview/6.jpeg",
      "/rooms/mountainview/7.jpeg",
    ],
    type: "Best Seller",
    maxGuests: "2 Guests",
    size: "32 m²",
  },
  {
    id: 2,
    slug: "family-room",
    title: "Family Room",
    price: "₹4,000",
    tariffs: {
      ep: 4000,
      cp: 5000,
      map: 6000,
      ap: 7500,
    },
    desc: "Spacious multi-occupancy room designed for families or group travelers, featuring ample living area, double bed arrangements, and full alpine amenities.",
    features: [
      "2 Large Beds / Family Layout",
      "4 Occupancy Capacity",
      "Pine Wood Interiors",
      "Sitting & Dining Area",
      "Central Heating & 24/7 Hot Water",
    ],
    image: "/rooms/family/1.jpeg",
    images: [
      "/rooms/family/1.jpeg",
      "/rooms/family/2.jpeg",
      "/rooms/family/3.jpeg",
      "/rooms/family/4.jpeg",
      "/rooms/family/5.jpeg",
      "/rooms/family/6.jpeg",
      "/rooms/family/7.jpeg",
    ],
    type: "Family",
    maxGuests: "4 Guests",
    size: "54 m²",
  },
  {
    id: 3,
    slug: "deluxe-room",
    title: "Deluxe Room",
    price: "₹2,000",
    tariffs: {
      ep: 2000,
      cp: 2700,
      map: 3500,
      ap: 4500,
    },
    desc: "Elegantly appointed standard luxury room offering modern comforts, quiet tranquility, and cozy wooden interiors at an unbeatable value.",
    features: [
      "Queen Bed",
      "Central Heating",
      "Tea & Coffee Station",
      "En-suite Bathroom & 24/7 Hot Water",
    ],
    image: "/rooms/deluxe/1.jpeg",
    images: [
      "/rooms/deluxe/1.jpeg",
      "/rooms/deluxe/2.jpeg",
      "/rooms/deluxe/3.jpeg",
      "/rooms/deluxe/4.jpeg",
      "/rooms/deluxe/5.jpeg",
      "/rooms/deluxe/6.jpeg",
      "/rooms/deluxe/7.jpeg",
    ],
    type: "Deluxe Luxury",
    maxGuests: "2 Guests",
    size: "28 m²",
  },
];

export const GUEST_REVIEWS: GuestReview[] = [
  {
    name: "Rajesh Sharma",
    rating: 5,
    text: "The hospitality at Indus Valley Resort is truly world-class. From the moment we arrived, the staff treated us like family. Prompt service, 24/7 hot water, and central heating made our stay delightfully comfortable.",
    date: "1 week ago",
  },
  {
    name: "Ananya Mukherjee",
    rating: 5,
    text: "The authentic Kashmiri Wazwan at their restaurant was the absolute highlight of our trip! The Rogan Josh and hot Kahwa served in a cozy dining atmosphere created an unforgettable experience.",
    date: "2 weeks ago",
  },
  {
    name: "Vikramaditya Rao",
    rating: 5,
    text: "Breathtaking mountain balcony views paired with the peaceful sounds of Lidder River nearby. The serene pine-forested atmosphere makes this the finest luxury retreat in Pahalgam.",
    date: "3 weeks ago",
  },
  {
    name: "Sneha Verma",
    rating: 5,
    text: "Impeccable service and heartwarming Kashmiri hospitality. The resort team went out of their way to customize our meal preferences and arrange local sightseeing.",
    date: "1 month ago",
  },
  {
    name: "Rohan Deshmukh",
    rating: 5,
    text: "Exceptional food quality and warm ambiance! Their morning breakfast spread and rich Wazwan delicacies were top-tier. The wooden suite interiors give a luxurious, cozy vibe.",
    date: "1 month ago",
  },
  {
    name: "Kavita Reddy",
    rating: 5,
    text: "The staff's attention to detail and personal service blew us away. Waking up to pristine valley views from our private balcony was pure magic.",
    date: "2 months ago",
  },
  {
    name: "Amitav Patel",
    rating: 5,
    text: "A tranquil paradise nestled in Pahalgam. Premier room amenities, courteous staff, gourmet dining, and a serene mountain atmosphere guaranteed a perfect vacation.",
    date: "2 months ago",
  },
  {
    name: "Dr. Siddharth Kapoor",
    rating: 5,
    text: "Outstanding hospitality, mouthwatering Kashmiri cuisine, and exceptionally prompt service. The team ensured every aspect of our family stay was seamless.",
    date: "3 months ago",
  },
];

export const MENU_CATEGORIES: MenuCategory[] = [
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

export const ATTRACTIONS: Attraction[] = [
  {
    name: "Betaab Valley",
    distance: "15 km (25 min drive)",
    type: "Sightseeing",
    description: "Famed scenic valley surrounded by lush meadows, snow-capped mountain peaks, and dense pine forests.",
  },
  {
    name: "Aru Valley",
    distance: "12 km (20 min drive)",
    type: "Adventure",
    description: "A tranquil meadow village serving as the base camp for treks to Kolahoi Glacier and alpine lakes.",
  },
  {
    name: "Chandanwari",
    distance: "16 km (30 min drive)",
    type: "Adventure",
    description: "Picturesque valley famous for snow sledding and as the starting point of the holy Amarnath Yatra.",
  },
  {
    name: "Lidder River & Rafting Point",
    distance: "2 km (5 min drive)",
    type: "Adventure",
    description: "Crystal-clear mountain river offering exciting white water rafting, trout fishing, and serene walks.",
  },
  {
    name: "Baisaran Valley (Mini Switzerland)",
    distance: "5 km (Pony Ride or Trek)",
    type: "Sightseeing",
    description: "Breathtaking hilltop meadow surrounded by dense pine trees with panoramic views of Pahalgam town.",
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, url: "/gallery/1.jpeg" },
  { id: 2, url: "/gallery/2.jpeg" },
  { id: 3, url: "/gallery/3.jpeg" },
  { id: 4, url: "/gallery/4.jpeg" },
  { id: 5, url: "/gallery/5.jpeg" },
  { id: 6, url: "/gallery/6.jpeg" },
  { id: 7, url: "/gallery/7.jpeg" },
  { id: 8, url: "/gallery/8.jpeg" },
  { id: 9, url: "/gallery/9.jpeg" },
  { id: 10, url: "/gallery/10.jpeg" },
  { id: 11, url: "/gallery/11.jpeg" },
  { id: 12, url: "/gallery/12.jpeg" },
  { id: 13, url: "/gallery/13.jpeg" },
  { id: 14, url: "/gallery/14.jpeg" },
  { id: 15, url: "/gallery/15.jpeg" },
  { id: 16, url: "/gallery/16.jpeg" },
  { id: 17, url: "/gallery/17.jpeg" },
  { id: 18, url: "/gallery/18.jpeg" },
  { id: 19, url: "/gallery/19.jpeg" },
  { id: 20, url: "/gallery/20.jpeg" },
];
