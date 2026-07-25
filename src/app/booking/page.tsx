"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, MessageCircle, ChevronRight } from "lucide-react";
import { ROOMS, HOTEL_INFO } from "@/data/hotel";
import PageTransition from "@/components/PageTransition";
import AnimatedButton from "@/components/AnimatedButton";
import { trackBookingSubmit } from "@/utils/analytics";

function BookingForm() {
  const searchParams = useSearchParams();
  const roomParam = searchParams.get("room");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    altPhone: "",
    room: "Mountain View Room with Balcony",
    mealPlan: "MAP",
    extraBed: "0",
    cwob: "0",
    checkIn: "",
    checkOut: "",
    guests: "2",
  });

  useEffect(() => {
    if (roomParam) {
      setFormData((prev) => ({ ...prev, room: roomParam }));
    }
  }, [roomParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trackBookingSubmit(formData.room);
    const message =
      `*New Booking Request*%0A%0A` +
      `*Name:* ${formData.firstName} ${formData.lastName}%0A` +
      `*Room:* ${formData.room}%0A` +
      `*Meal Plan:* ${formData.mealPlan}%0A` +
      `*Dates:* ${formData.checkIn} to ${formData.checkOut}%0A` +
      `*Guests:* ${formData.guests}%0A` +
      (Number(formData.extraBed) > 0 ? `*Extra Bed:* ${formData.extraBed}%0A` : "") +
      (Number(formData.cwob) > 0 ? `*CWOB (Child No Bed):* ${formData.cwob}%0A` : "") +
      `*Email:* ${formData.email}%0A` +
      `*Phone:* ${formData.phone}%0A` +
      (formData.altPhone ? `*Alt Phone:* ${formData.altPhone}%0A` : "");
    window.open(
      `https://wa.me/${HOTEL_INFO.whatsapp}?text=${message}`,
      "_blank",
    );
  };

  const inputClasses =
    "w-full border-b border-stone-300 py-2 outline-none bg-transparent font-serif transition-colors focus:border-amber-600 focus:bg-stone-50/50 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none";
  const labelClasses =
    "block text-xs uppercase tracking-widest text-stone-500 mb-2 font-bold";

  return (
    <div className="pt-32 pb-24 container mx-auto px-6 min-h-screen flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row"
      >
        <div className="md:w-1/3 bg-stone-900 p-10 text-white flex flex-col justify-between">
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
                <CheckCircle className="text-amber-500 w-4 h-4" aria-hidden="true" />{" "}
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
                  autoComplete="given-name"
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
                  autoComplete="family-name"
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
                  autoComplete="email"
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
                  autoComplete="tel"
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
                autoComplete="tel"
                className={inputClasses}
                placeholder="+91 12345 67890"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="room" className={labelClasses}>
                  Select Room Type
                </label>
                <div className="relative">
                  <select
                    id="room"
                    name="room"
                    value={formData.room}
                    onChange={handleChange}
                    className={`${inputClasses} appearance-none cursor-pointer pr-10`}
                  >
                    {ROOMS.map((room) => (
                      <option key={room.id} value={room.title}>
                        {room.title}
                      </option>
                    ))}
                  </select>
                  <ChevronRight className="absolute right-0 top-3 text-stone-400 w-4 h-4 rotate-90 pointer-events-none" aria-hidden="true" />
                </div>
              </div>

              <div>
                <label htmlFor="mealPlan" className={labelClasses}>
                  Select Meal Plan
                </label>
                <div className="relative">
                  <select
                    id="mealPlan"
                    name="mealPlan"
                    value={formData.mealPlan}
                    onChange={handleChange}
                    className={`${inputClasses} appearance-none cursor-pointer pr-10`}
                  >
                    <option value="EP">EP — European Plan (Room Only)</option>
                    <option value="CP">CP — Continental Plan (Room + Breakfast)</option>
                    <option value="MAP">MAP — Modified American Plan (Room + Breakfast + Dinner)</option>
                    <option value="AP">AP — American Plan (Room + All Meals)</option>
                  </select>
                  <ChevronRight className="absolute right-0 top-3 text-stone-400 w-4 h-4 rotate-90 pointer-events-none" aria-hidden="true" />
                </div>
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
                  required
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
                  required
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
              <MessageCircle size={16} className="text-amber-500" aria-hidden="true" />
            </AnimatedButton>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default function Booking() {
  return (
    <PageTransition>
      <Suspense fallback={<div className="pt-32 text-center text-stone-950 font-serif">Loading reservation form...</div>}>
        <BookingForm />
      </Suspense>
    </PageTransition>
  );
}
