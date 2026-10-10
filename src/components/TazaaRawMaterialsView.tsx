import React, { useState } from 'react';
import { TazaaBrandProduct, TAZAA_BRAND_CATALOG } from '../data/tazaaCatalog';
import { useLanguage } from '../i18n/LanguageContext';
import {
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  Cpu,
} from 'lucide-react';

interface TazaaRawMaterialsViewProps {
  onAddToCart: (product: TazaaBrandProduct, quantity: number) => void;
  onOpenConsultant: (materialName?: string) => void;
}

export const TazaaRawMaterialsView: React.FC<TazaaRawMaterialsViewProps> = ({
  onAddToCart,
  onOpenConsultant,
}) => {
  const { formatMoney } = useLanguage();
  const rawMaterials = TAZAA_BRAND_CATALOG.filter(
    (item) => item.category === 'raw_eco_plastics' || item.name.includes('Resin') || item.name.includes('Polymer')
  );

  return (
    <div className="w-full space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-white border border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-[#1B5E20] border border-emerald-300">
            <Cpu className="w-3.5 h-3.5 text-[#00E676]" />
            <span>Industrial Circular Polymers & Bio-Resins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 tracking-tight">
            Tazaa Sustainable Raw Eco-Plastics
          </h1>
          <p className="text-xs sm:text-sm text-emerald-800/80 leading-relaxed">
            Direct-from-manufacturer bio-resins formulated for high-volume injection molding, sheet thermoforming, and 3D additive manufacturing. Engineered to replace fossil petrochemicals with marine-biodegradable polyhydroxyalkanoates (PHA) and pure food-grade rPET.
          </p>
        </div>
      </div>

      {/* Materials Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rawMaterials.map((mat) => (
          <div
            key={mat.id}
            className="bg-white rounded-3xl border border-emerald-100 p-6 shadow-xs hover:shadow-md transition space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">
                    {mat.categoryLabel}
                  </span>
                  <h3 className="text-lg font-black text-emerald-950 leading-snug">
                    {mat.name}
                  </h3>
                  <p className="text-xs text-slate-500">{mat.tagline}</p>
                </div>
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                  <img
                    src={mat.imageUrl}
                    alt={mat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{mat.circularEcoBadge}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Pack Volume</span>
                  <span className="font-bold text-slate-800">{mat.packUnit}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Dimensions / Mesh</span>
                  <span className="font-bold text-slate-800">{mat.dimensions}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Polymer Formulation</span>
                  <span className="font-semibold text-slate-700">{mat.materialComposition}</span>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <span className="text-[10px] font-black uppercase text-slate-400 block">Certifications</span>
                <div className="flex flex-wrap gap-1.5">
                  {mat.certifications.map((c, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[10px] font-bold"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Standard Tier Price</span>
                <span className="text-xl font-black text-emerald-950">
                  {formatMoney(mat.priceUsd)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenConsultant(mat.name)}
                  className="px-3 py-2 rounded-xl border border-emerald-200 text-emerald-900 text-xs font-bold hover:bg-emerald-50 transition flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ask Akyl AI</span>
                </button>
                <button
                  type="button"
                  onClick={() => onAddToCart(mat, 1)}
                  className="px-4 py-2 rounded-xl bg-[#1B5E20] hover:bg-emerald-800 text-white text-xs font-black transition flex items-center gap-1.5 shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Order Batch</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
