"use client";

import React, { useState } from "react";
import { ROOMS, EXTRA_BED_TARIFF, CWOB_TARIFF, MEAL_PLAN_DEFINITIONS } from "@/data/hotel";
import { Check, Info, BedDouble, Baby } from "lucide-react";

export default function TariffTable() {
  const [selectedPlan, setSelectedPlan] = useState<"all" | "ep" | "cp" | "map" | "ap">("all");

  return (
    <div className="bg-white rounded-sm shadow-xl border border-stone-200 overflow-hidden my-12">
      {/* Header */}
      <div className="bg-stone-900 text-white p-6 sm:p-8 text-center sm:text-left flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <span className="text-amber-500 uppercase tracking-widest text-xs font-bold block mb-1">
            Official Seasonal Rates
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium">Room Tariffs & Meal Plans</h2>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 bg-stone-800/80 p-1.5 rounded-sm border border-stone-700">
          {(["all", "ep", "cp", "map", "ap"] as const).map((plan) => (
            <button
              key={plan}
              onClick={() => setSelectedPlan(plan)}
              className={`px-3 py-1.5 text-xs font-bold tracking-widest uppercase transition-all rounded-sm ${
                selectedPlan === plan
                  ? "bg-amber-600 text-white shadow-md"
                  : "text-stone-300 hover:text-white hover:bg-stone-700/50"
              }`}
            >
              {plan === "all" ? "All Plans" : plan.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tariff Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-100 border-b border-stone-200 text-stone-900 uppercase text-[11px] sm:text-xs font-bold tracking-wider">
              <th className="py-4 px-4 sm:px-6">Room Category</th>
              {(selectedPlan === "all" || selectedPlan === "ep") && (
                <th className="py-4 px-4 sm:px-6 text-center bg-stone-100/80">
                  <div>EP</div>
                  <div className="text-[9px] font-normal text-stone-500 normal-case tracking-normal">Room Only</div>
                </th>
              )}
              {(selectedPlan === "all" || selectedPlan === "cp") && (
                <th className="py-4 px-4 sm:px-6 text-center bg-stone-100">
                  <div>CP</div>
                  <div className="text-[9px] font-normal text-stone-500 normal-case tracking-normal">Room + Breakfast</div>
                </th>
              )}
              {(selectedPlan === "all" || selectedPlan === "map") && (
                <th className="py-4 px-4 sm:px-6 text-center bg-amber-50/70 border-x border-amber-200/40 text-amber-900">
                  <div className="flex items-center justify-center gap-1">
                    MAP <span className="bg-amber-600 text-white text-[8px] px-1 py-0.5 rounded font-bold uppercase">Popular</span>
                  </div>
                  <div className="text-[9px] font-normal text-amber-700 normal-case tracking-normal">Room + Breakfast + Dinner</div>
                </th>
              )}
              {(selectedPlan === "all" || selectedPlan === "ap") && (
                <th className="py-4 px-4 sm:px-6 text-center bg-stone-100">
                  <div>AP</div>
                  <div className="text-[9px] font-normal text-stone-500 normal-case tracking-normal">Room + All Meals</div>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 text-stone-700 text-sm">
            {/* Rooms Rows */}
            {ROOMS.map((room) => (
              <tr key={room.id} className="hover:bg-amber-50/20 transition-colors">
                <td className="py-5 px-4 sm:px-6">
                  <div className="font-serif text-base sm:text-lg font-semibold text-stone-950">
                    {room.title}
                  </div>
                  <div className="text-xs text-stone-500 font-light mt-0.5">
                    {room.type} • Max {room.maxGuests || "2 Guests"}
                  </div>
                </td>
                {(selectedPlan === "all" || selectedPlan === "ep") && (
                  <td className="py-5 px-4 sm:px-6 text-center font-sans font-bold tracking-tight text-stone-900 text-base sm:text-lg">
                    ₹{room.tariffs.ep.toLocaleString("en-IN")}/-
                  </td>
                )}
                {(selectedPlan === "all" || selectedPlan === "cp") && (
                  <td className="py-5 px-4 sm:px-6 text-center font-sans font-bold tracking-tight text-stone-900 text-base sm:text-lg">
                    ₹{room.tariffs.cp.toLocaleString("en-IN")}/-
                  </td>
                )}
                {(selectedPlan === "all" || selectedPlan === "map") && (
                  <td className="py-5 px-4 sm:px-6 text-center font-sans font-bold tracking-tight text-amber-800 text-base sm:text-xl bg-amber-50/30 border-x border-amber-200/40">
                    ₹{room.tariffs.map.toLocaleString("en-IN")}/-
                  </td>
                )}
                {(selectedPlan === "all" || selectedPlan === "ap") && (
                  <td className="py-5 px-4 sm:px-6 text-center font-sans font-bold tracking-tight text-stone-900 text-base sm:text-lg">
                    ₹{room.tariffs.ap.toLocaleString("en-IN")}/-
                  </td>
                )}
              </tr>
            ))}

            {/* Extra Bed Row */}
            <tr className="bg-stone-50/80 font-medium">
              <td className="py-4 px-4 sm:px-6">
                <div className="flex items-center gap-2 text-stone-900 font-bold">
                  <BedDouble size={16} className="text-amber-600" />
                  <span>Extra Bed</span>
                </div>
                <div className="text-xs text-stone-500 font-light">Per extra adult / bed option</div>
              </td>
              {(selectedPlan === "all" || selectedPlan === "ep") && (
                <td className="py-4 px-4 sm:px-6 text-center font-sans font-semibold text-stone-800">
                  ₹{EXTRA_BED_TARIFF.ep}/-
                </td>
              )}
              {(selectedPlan === "all" || selectedPlan === "cp") && (
                <td className="py-4 px-4 sm:px-6 text-center font-sans font-semibold text-stone-800">
                  ₹{EXTRA_BED_TARIFF.cp}/-
                </td>
              )}
              {(selectedPlan === "all" || selectedPlan === "map") && (
                <td className="py-4 px-4 sm:px-6 text-center font-sans font-semibold text-amber-900 bg-amber-50/40 border-x border-amber-200/40">
                  ₹{EXTRA_BED_TARIFF.map.toLocaleString("en-IN")}/-
                </td>
              )}
              {(selectedPlan === "all" || selectedPlan === "ap") && (
                <td className="py-4 px-4 sm:px-6 text-center font-sans font-semibold text-stone-800">
                  ₹{EXTRA_BED_TARIFF.ap.toLocaleString("en-IN")}/-
                </td>
              )}
            </tr>

            {/* CWOB Row */}
            <tr className="bg-stone-50/80 font-medium">
              <td className="py-4 px-4 sm:px-6">
                <div className="flex items-center gap-2 text-stone-900 font-bold">
                  <Baby size={16} className="text-amber-600" />
                  <span>CWOB (Child Without Extra Bed)</span>
                </div>
                <div className="text-xs text-stone-500 font-light">Child policy rate without extra bed</div>
              </td>
              {(selectedPlan === "all" || selectedPlan === "ep") && (
                <td className="py-4 px-4 sm:px-6 text-center font-sans font-semibold text-amber-700">
                  Complimentary
                </td>
              )}
              {(selectedPlan === "all" || selectedPlan === "cp") && (
                <td className="py-4 px-4 sm:px-6 text-center font-sans font-semibold text-stone-800">
                  ₹{CWOB_TARIFF.cp}/-
                </td>
              )}
              {(selectedPlan === "all" || selectedPlan === "map") && (
                <td className="py-4 px-4 sm:px-6 text-center font-sans font-semibold text-amber-900 bg-amber-50/40 border-x border-amber-200/40">
                  ₹{CWOB_TARIFF.map}/-
                </td>
              )}
              {(selectedPlan === "all" || selectedPlan === "ap") && (
                <td className="py-4 px-4 sm:px-6 text-center font-sans font-semibold text-stone-800">
                  ₹{CWOB_TARIFF.ap}/-
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Policies Footer Grid */}
      <div className="bg-stone-50 p-6 border-t border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-600">
        {/* Child Policy */}
        <div className="flex gap-3 bg-white p-4 rounded-sm border border-stone-200/80 shadow-sm">
          <Baby className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-stone-900 uppercase tracking-wider mb-1">Child Policy</h4>
            <ul className="space-y-1 font-light">
              <li className="flex items-center gap-1.5">
                <Check size={12} className="text-amber-600" />
                <span className="font-semibold text-stone-800">Child below 5 years:</span> Complimentary stay & meals
              </li>
              <li className="flex items-center gap-1.5">
                <Check size={12} className="text-amber-600" />
                <span className="font-semibold text-stone-800">CWOB (Child Without Extra Bed):</span> Charges as per table above
              </li>
            </ul>
          </div>
        </div>

        {/* Meal Plan Descriptions */}
        <div className="flex gap-3 bg-white p-4 rounded-sm border border-stone-200/80 shadow-sm">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-stone-900 uppercase tracking-wider mb-1">Meal Plan Guide</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-light">
              {MEAL_PLAN_DEFINITIONS.map((m) => (
                <div key={m.code}>
                  <strong className="text-stone-800 font-semibold">{m.code}:</strong> {m.desc}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
