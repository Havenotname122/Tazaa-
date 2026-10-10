import React, { useState } from 'react';
import { TazaaBrandProduct, TAZAA_BRAND_CATALOG } from '../data/tazaaCatalog';
import { useLanguage } from '../i18n/LanguageContext';
import {
  Sparkles,
  ShoppingBag,
  Leaf,
  ShieldCheck,
  CheckCircle2,
  Maximize2,
  X,
  Plus,
  Minus,
} from 'lucide-react';

interface TazaaStoreViewProps {
  onAddToCart: (product: TazaaBrandProduct, quantity: number) => void;
  onOpenConsultant: (productName?: string) => void;
}

export const TazaaStoreView: React.FC<TazaaStoreViewProps> = ({
  onAddToCart,
  onOpenConsultant,
}) => {
  const { language, formatMoney } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<TazaaBrandProduct | null>(null);
  const [modalQty, setModalQty] = useState<number>(1);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: language === 'ru' ? 'Все товары' : language === 'ky' ? 'Бардык товарлар' : language === 'es' ? 'Todos los productos' : language === 'zh' ? '全部商品' : 'All Products' },
    { id: 'bio_cups', label: language === 'ru' ? 'Bio-Cups & Посуда' : language === 'ky' ? 'Bio-Cups & Идиштер' : language === 'es' ? 'Bio-Cups y Bebidas' : language === 'zh' ? '环保生物杯' : 'Bio-Cups & Drinkware' },
    { id: 'fiber_tableware', label: language === 'ru' ? 'Тарелки из листвы' : language === 'ky' ? 'Жалбырак табактары' : language === 'es' ? 'Platos de hojas' : language === 'zh' ? '模压落叶餐盘' : 'Molded Fiber Plates' },
    { id: 'raw_eco_plastics', label: language === 'ru' ? 'Сырьевые эко-пластики' : language === 'ky' ? 'Чийки эко-пластиктер' : language === 'es' ? 'Eco-plásticos PHA' : language === 'zh' ? 'PHA 环保原料' : 'Raw Eco-Plastics (PHA)' },
    { id: 'circular_packaging', label: language === 'ru' ? 'Эко-упаковка' : language === 'ky' ? 'Циркулярдык таңгак' : language === 'es' ? 'Embalaje circular' : language === 'zh' ? '循环包装' : 'Circular Packaging' },
    { id: 'botanical_goods', label: language === 'ru' ? 'Семенная канцелярия' : language === 'ky' ? 'Үрөндүү кагаз' : language === 'es' ? 'Papel semilla' : language === 'zh' ? '种子植物纸' : 'Botanical Goods' },
  ];

  const filteredProducts = TAZAA_BRAND_CATALOG.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.tagline.toLowerCase().includes(q) ||
      item.circularEcoBadge.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const handleQuickAdd = (product: TazaaBrandProduct, qty = 1) => {
    onAddToCart(product, qty);
    setAddedToast(product.name);
    setTimeout(() => setAddedToast(null), 3000);
  };

  return (
    <div className="w-full space-y-8 animate-fadeIn">
      {/* Brand Hero Showcase */}
      <div className="relative rounded-3xl bg-gradient-to-br from-emerald-950 via-[#1B5E20] to-emerald-900 text-white p-6 sm:p-10 shadow-lg overflow-hidden border border-emerald-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E676]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/10 text-emerald-200 border border-emerald-400/30 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#00E676]" />
            <span>Tazaa • Exclusive Circular Brand Store</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Circular Consumer Goods & Sustainable Raw Materials
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Every item in the Tazaa catalog is exclusively formulated and manufactured in-house from closed-loop organic agricultural residues, fallen foliage, and marine-biodegradable polymers. 100% petroleum-free, certified food-safe, and fully home-compostable.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenConsultant('Tazaa Bio-Cup')}
              className="px-4 py-2.5 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 text-xs font-black transition shadow-sm flex items-center gap-2 group"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span>Consult with Akyl AI Brand Consultant</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-emerald-200/90 px-3 py-2 rounded-xl bg-emerald-900/50 border border-emerald-700/50">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00E676]" />
              <span>Direct Manufacturer Warranty • Zero Third-Party Aggregation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-[#1B5E20] text-white shadow-xs'
                    : 'text-slate-600 hover:text-emerald-950 hover:bg-emerald-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'ru' ? 'Поиск по каталогу...' : language === 'ky' ? 'Издөө...' : 'Search Tazaa catalog...'}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
            />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-3xl border border-emerald-100 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Image & Badges */}
              <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/95 text-emerald-950 shadow-xs border border-emerald-100 flex items-center gap-1">
                    <Leaf className="w-2.5 h-2.5 text-emerald-600" />
                    <span>{item.packUnit}</span>
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProduct(item);
                      setModalQty(1);
                    }}
                    className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow-xs transition"
                    title="View Product Specs"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                    {item.categoryLabel}
                  </div>
                  <h3 className="font-black text-sm text-slate-900 group-hover:text-[#1B5E20] transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {item.tagline}
                  </p>
                </div>

                {/* Circular Eco-Badge */}
                <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100 text-[11px] font-semibold text-emerald-900 flex items-start gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-tight">{item.circularEcoBadge}</span>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
                  <span className="truncate">{item.dimensions}</span>
                </div>
              </div>
            </div>

            {/* Price & Actions Footer */}
            <div className="p-5 pt-0 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">
                    Price
                  </span>
                  <span className="text-base font-black text-emerald-950">
                    {formatMoney(item.priceUsd)}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-slate-500">
                  {item.packUnit}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onOpenConsultant(item.name)}
                  className="px-2.5 py-2 rounded-xl border border-emerald-200 text-emerald-800 hover:bg-emerald-50 text-[11px] font-bold transition flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>Ask Akyl AI</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAdd(item, 1)}
                  className="px-2.5 py-2 rounded-xl bg-[#1B5E20] hover:bg-emerald-800 text-white text-[11px] font-black transition flex items-center justify-center gap-1 shadow-xs"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 relative animate-fadeIn">
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
              <div className="sm:col-span-5 aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="sm:col-span-7 space-y-3">
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                  {selectedProduct.categoryLabel}
                </span>
                <h2 className="text-xl font-black text-emerald-950">
                  {selectedProduct.name}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Circular Eco-Badge</span>
                  </div>
                  <div className="text-xs font-black text-emerald-950">
                    {selectedProduct.circularEcoBadge}
                  </div>
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <div>
                    <span className="font-bold text-slate-900">Dimensions: </span>
                    {selectedProduct.dimensions}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Composition: </span>
                    {selectedProduct.materialComposition}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-2xl font-black text-emerald-950">
                    {formatMoney(selectedProduct.priceUsd * modalQty)}
                  </span>
                  <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1 border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setModalQty(Math.max(1, modalQty - 1))}
                      className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold px-2">{modalQty}</span>
                    <button
                      type="button"
                      onClick={() => setModalQty(modalQty + 1)}
                      className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Lifecycle & Stewardship Breakdown */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>Proprietary Circular Stewardship & Lifecycle</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-black text-slate-800 block text-[11px]">Material Origin</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {selectedProduct.lifecycleGuide.origin}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-black text-slate-800 block text-[11px]">In-Use Durability</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {selectedProduct.lifecycleGuide.inUseDurability}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-black text-slate-800 block text-[11px]">End-of-Life Instructions</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {selectedProduct.lifecycleGuide.endOfLifeInstructions}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-black text-slate-800 block text-[11px]">Compost Timeline</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {selectedProduct.lifecycleGuide.compostTimeline}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  onOpenConsultant(selectedProduct.name);
                  setSelectedProduct(null);
                }}
                className="px-4 py-2.5 rounded-xl border border-emerald-300 text-emerald-900 font-bold text-xs hover:bg-emerald-50 transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ask Akyl AI Consultant</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  handleQuickAdd(selectedProduct, modalQty);
                  setSelectedProduct(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#1B5E20] hover:bg-emerald-800 text-white font-black text-xs transition shadow-xs flex items-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add {modalQty} {selectedProduct.packUnit} to Bag</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Added-to-Cart Toast */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-700 animate-slideUp text-xs">
          <div className="w-7 h-7 rounded-full bg-[#00E676]/20 flex items-center justify-center text-[#00E676]">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold">{addedToast} added to bag</div>
            <div className="text-[10px] text-emerald-200">100% Home compostable circular order</div>
          </div>
        </div>
      )}
    </div>
  );
};
