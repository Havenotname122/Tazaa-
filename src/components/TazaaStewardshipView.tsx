import React from 'react';
import {
  Leaf,
  Sprout,
  Sun,
  Droplets,
  Clock,
  Sparkles,
} from 'lucide-react';

interface TazaaStewardshipViewProps {
  onOpenConsultant: () => void;
  onGoToShop: () => void;
}

export const TazaaStewardshipView: React.FC<TazaaStewardshipViewProps> = ({
  onOpenConsultant,
}) => {
  return (
    <div className="w-full space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-white border border-emerald-100 rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-[#1B5E20] border border-emerald-300">
            <Sprout className="w-3.5 h-3.5 text-[#00E676]" />
            <span>Closed-Loop Circularity</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-emerald-950 tracking-tight">
            Tazaa Circular Stewardship & Lifecycle Guide
          </h1>
          <p className="text-xs sm:text-sm text-emerald-800/80 leading-relaxed">
            At Tazaa, our circular philosophy is absolute: everything extracted from nature must return cleanly to nature without leaving toxic chemicals, synthetic coatings, or persistent microplastics behind. Learn how our proprietary products are manufactured and how to safely compost or recycle them.
          </p>
        </div>
      </div>

      {/* 4-Stage Closed Loop Diagram */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl border border-emerald-100 p-6 space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#1B5E20] flex items-center justify-center font-black text-sm">
            01
          </div>
          <h3 className="font-black text-sm text-slate-900">
            Renewable Bio-Residues
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We harvest fallen autumn foliage, sugarcane bagasse, coffee espresso grounds, and non-GMO agricultural starches. Zero trees are felled in our production.
          </p>
        </div>
        <div className="bg-white rounded-3xl border border-emerald-100 p-6 space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#1B5E20] flex items-center justify-center font-black text-sm">
            02
          </div>
          <h3 className="font-black text-sm text-slate-900">
            Clean Manufacturing
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Formed with clean steam-pressing and hydraulic molds using natural potato starches and beeswax or carnauba water barriers. 100% free from petroleum adhesives.
          </p>
        </div>
        <div className="bg-white rounded-3xl border border-emerald-100 p-6 space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#1B5E20] flex items-center justify-center font-black text-sm">
            03
          </div>
          <h3 className="font-black text-sm text-slate-900">
            High-Utility Life
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Leak-proof, temperature-resilient up to 95°C, and fully food-contact certified by the FDA and EU standards for residential and hospitality service.
          </p>
        </div>
        <div className="bg-white rounded-3xl border border-emerald-100 p-6 space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-2xl bg-[#1B5E20] text-[#00E676] flex items-center justify-center font-black text-sm">
            04
          </div>
          <h3 className="font-black text-sm text-slate-900">
            Backyard Composting
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Buried in ordinary garden soil or organic compost, each item biodegrades in 30 to 60 days, enriching your garden soil with organic humus and nutrients.
          </p>
        </div>
      </div>

      {/* Step-by-Step Composting Protocols */}
      <div className="bg-white border border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-lg font-black text-emerald-950 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-600" />
            <span>How to Safely Compost Your Tazaa Products at Home</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Follow these simple steps to return Tazaa tableware and packaging directly to the earth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Step 1: Tear or Fold</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              For Tazaa Bio-Cups and Molded Fiber Plates, tear or break the items into 2-3 pieces. Increasing surface area accelerates microbial colonization by soil bacteria.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
              <Droplets className="w-4 h-4 text-emerald-600" />
              <span>Step 2: Add Moisture & Carbon</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Place the pieces in your home compost bin or bury them beneath 5-10 cm of moist garden soil alongside kitchen vegetable scraps and fallen leaves.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
              <Sun className="w-4 h-4 text-emerald-600" />
              <span>Step 3: 45-Day Soil Enrichment</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Within 45 to 60 days, the natural cellulose and vegetable binders decompose completely into nutrient-rich humus, feeding your houseplants or vegetable beds.
            </p>
          </div>
        </div>

        {/* Akyl AI Assistance Bar */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1B5E20] text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#00E676]" />
            </div>
            <div>
              <h4 className="text-xs font-black text-emerald-950">
                Have specific disposal or municipal questions?
              </h4>
              <p className="text-[11px] text-emerald-800">
                Ask Akyl AI for tailored composting timelines, industrial recycling codes, or bulk commercial disposal.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenConsultant}
            className="px-4 py-2 rounded-xl bg-[#1B5E20] hover:bg-emerald-800 text-white text-xs font-black transition shrink-0"
          >
            Consult Akyl AI Now
          </button>
        </div>
      </div>
    </div>
  );
};
