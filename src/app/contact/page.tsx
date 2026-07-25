"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import SectionHeading from "@/components/SectionHeading";
import AnimatedButton from "@/components/AnimatedButton";
import { trackEvent, trackPhoneClick } from "@/utils/analytics";
import { HOTEL_INFO } from "@/data/hotel";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trackEvent("submit_contact_form", {
      sender_name: formData.name,
      sender_email: formData.email,
    });
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputClasses =
    "w-full border-b border-stone-300 py-2 outline-none bg-transparent font-serif transition-colors focus:border-amber-600 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none";

  return (
    <PageTransition>
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
            className="max-w-6xl mx-auto bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-stone-100"
          >
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative z-10">
              <div className="mb-8">
                <h3 className="font-serif text-3xl text-stone-950 mb-3">
                  Send us a Message
                </h3>
                <p className="text-stone-500 font-light text-sm leading-relaxed">
                  Our concierge team is available 24/7. Direct
                  reservations:{" "}
                  <a
                    href={`tel:${HOTEL_INFO.whatsapp.replace(/[^0-9+]/g, "")}`}
                    onClick={() => trackPhoneClick("Contact Page")}
                    className="font-medium text-stone-900 hover:text-amber-600 transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none focus:rounded-sm"
                  >
                    {HOTEL_INFO.whatsapp}
                  </a>
                </p>
              </div>
              <form
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div className="space-y-4">
                  <div>
                    <label htmlFor="contactName" className="sr-only">
                      Name
                    </label>
                    <input
                      id="contactName"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      autoComplete="name"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="contactEmail" className="sr-only">
                      Email
                    </label>
                    <input
                      id="contactEmail"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="youremail@contact.com"
                      autoComplete="email"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="contactMessage" className="sr-only">
                      Message
                    </label>
                    <textarea
                      id="contactMessage"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Message"
                      rows={3}
                      className={inputClasses}
                    ></textarea>
                  </div>
                </div>

                {submitted && (
                  <p className="text-amber-900 text-xs font-bold font-serif uppercase tracking-widest bg-amber-50 border border-amber-200/50 p-3 rounded-sm">
                    ✓ Inquiry Sent! Our concierge team will reach out shortly.
                  </p>
                )}

                <AnimatedButton className="w-full mt-4">
                  Send Inquiry
                </AnimatedButton>
              </form>
            </div>
            <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-full bg-stone-200">
              <iframe
                src="https://maps.google.com/maps?q=33.920263,75.269961&z=14&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, position: "absolute", inset: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Indus Valley Resort Location Map"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
