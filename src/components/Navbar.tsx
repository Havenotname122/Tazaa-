import React, { useState, useRef, useEffect } from 'react';
import {
  Leaf,
  ShoppingBag,
  Check,
  ChevronDown,
  Settings,
  Sparkles,
  Cpu,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LANGUAGE_OPTIONS } from '../i18n/translations';

export type AppTab = 'catalog' | 'raw_materials' | 'stewardship' | 'consultant';

interface NavbarProps {
  currentTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  cartCount,
  onOpenCart,
}) => {
  const { language, setLanguage, setIsSettingsOpen, t } = useLanguage();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const tabs: Array<{ id: AppTab; label: string; icon: any; highlighted?: boolean }> = [
    {
      id: 'catalog',
      label: t('tabCatalog'),
      icon: ShoppingBag,
    },
    {
      id: 'raw_materials',
      label: t('tabRawMaterials'),
      icon: Cpu,
    },
    {
      id: 'stewardship',
      label: t('tabStewardship'),
      icon: Leaf,
    },
    {
      id: 'consultant',
      label: t('tabBrandConsultant'),
      icon: Sparkles,
      highlighted: true,
    },
  ];

  const currentLangObj = LANGUAGE_OPTIONS.find((l) => l.code === language) || LANGUAGE_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-100 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-2">
        {/* Brand: TAZAA */}
        <div
          onClick={() => onTabChange('catalog')}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1B5E20] to-[#00E676] p-[1.5px] shadow-md shadow-[#1B5E20]/20">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Leaf className="w-5 h-5 text-[#1B5E20] group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-black text-xl tracking-tight text-[#1B5E20]">
                TAZAA
              </span>
              <span className="text-[10px] uppercase font-black tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#1B5E20] border border-emerald-300 flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-2.5 h-2.5 text-[#00E676]" />
                Brand Store
              </span>
            </div>
            <p className="text-[11px] text-emerald-800/90 hidden lg:block max-w-xl truncate leading-tight">
              Exclusive Circular Consumer Goods & Materials
            </p>
          </div>
        </div>

        {/* Center: Tabs & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
          <nav className="flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#1B5E20] text-white shadow-sm shadow-[#1B5E20]/25 ring-2 ring-emerald-400'
                      : tab.highlighted
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 font-black hover:bg-emerald-100 hover:border-emerald-400 shadow-2xs'
                      : 'text-slate-700 hover:text-[#1B5E20] hover:bg-emerald-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#00E676]' : tab.highlighted ? 'text-emerald-700' : 'text-emerald-700'}`} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Shopping Cart Bag Button */}
          <button
            type="button"
            onClick={onOpenCart}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-100/90 hover:bg-emerald-200 text-[#1B5E20] border border-emerald-300 text-xs font-black transition shadow-xs group"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#1B5E20] group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Bag</span>
            {cartCount > 0 && (
              <span className="w-4.5 h-4.5 rounded-full bg-[#1B5E20] text-white text-[10px] font-black flex items-center justify-center leading-none">
                {cartCount}
              </span>
            )}
          </button>

          {/* Persistent High-Visibility Language Selector Dropdown */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl bg-emerald-50/90 hover:bg-emerald-100/90 text-[#1B5E20] border-2 border-emerald-400 text-xs font-black transition shadow-sm hover:shadow group ring-1 ring-emerald-300/40"
              title="Select Language for UI and AI Responses"
              aria-label="Switch Language"
            >
              <span className="text-base leading-none drop-shadow-xs">{currentLangObj.flag}</span>
              <span className="font-extrabold tracking-tight">
                <span className="inline sm:hidden">{currentLangObj.code.toUpperCase()}</span>
                <span className="hidden sm:inline">{currentLangObj.nativeName}</span>
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-emerald-800 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border-2 border-emerald-300 shadow-2xl py-2 z-50 animate-fadeIn divide-y divide-emerald-50 max-h-96 overflow-y-auto">
                <div className="px-3.5 py-1.5 text-[10px] font-black text-[#1B5E20] uppercase tracking-wider bg-emerald-50/50 flex items-center justify-between">
                  <span>{t('language')}</span>
                  <span className="text-[9px] font-bold text-emerald-600">AI Speaks This Language</span>
                </div>
                <div className="py-1">
                  {LANGUAGE_OPTIONS.map((opt) => {
                    const isSelected = language === opt.code;
                    return (
                      <button
                        key={opt.code}
                        type="button"
                        onClick={() => {
                          setLanguage(opt.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-left transition ${
                          isSelected
                            ? 'bg-emerald-100/80 text-[#1B5E20] font-black'
                            : 'text-slate-700 hover:bg-emerald-50 hover:text-[#1B5E20]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg leading-none">{opt.flag}</span>
                          <div>
                            <div className="leading-tight font-bold">{opt.nativeName}</div>
                            <span className="text-[10px] text-slate-500 font-normal">{opt.label}</span>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#1B5E20] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Settings Control Centre Button */}
          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 sm:px-2.5 sm:py-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-[#1B5E20] border border-slate-200 text-xs font-bold transition shadow-xs flex items-center gap-1.5"
            title="Settings & Account Control Centre"
          >
            <Settings className="w-4 h-4 text-emerald-700" />
            <span className="hidden lg:inline text-[11px]">Settings</span>
          </button>
        </div>
      </div>
    </header>
  );
};
