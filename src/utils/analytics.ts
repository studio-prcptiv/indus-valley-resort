
"use client";
/**
 * Safely handles pushes to GA4 and GTM data layers in the browser.
 * Enterprise analytics utility for tracking hospitality conversions.
 */

interface TrackParams {
  [key: string]: string | number | boolean | undefined;
}

export function trackEvent(eventName: string, params?: TrackParams) {
  if (typeof window === "undefined") return;

  // Push to GTM dataLayer
  const dataLayer = (window as any).dataLayer || [];
  dataLayer.push({
    event: eventName,
    ...params,
  });
  (window as any).dataLayer = dataLayer;

  // Push to GA4 gtag
  const gtag = (window as any).gtag;
  if (typeof gtag === "function") {
    gtag("event", eventName, params);
  }
}

export function trackBookingStart(roomName: string) {
  trackEvent("begin_checkout", {
    item_name: roomName,
    category: "Suites",
    value: 1,
  });
}

export function trackBookingSubmit(roomName: string) {
  trackEvent("purchase", {
    item_name: roomName,
    category: "Suites",
    value: 1,
    currency: "INR",
  });
}

export function trackWhatsAppClick(location: string) {
  trackEvent("contact_whatsapp", {
    click_location: location,
  });
}

export function trackPhoneClick(location: string) {
  trackEvent("contact_phone", {
    click_location: location,
  });
}

export function trackEmailClick(location: string) {
  trackEvent("contact_email", {
    click_location: location,
  });
}

export function trackRoomGalleryInteraction(roomName: string) {
  trackEvent("view_room_gallery", {
    item_name: roomName,
  });
}

export function trackViewMenu() {
  trackEvent("view_dining_menu", {
    category: "Wazwan & Specialities",
  });
}
