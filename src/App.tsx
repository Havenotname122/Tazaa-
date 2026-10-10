/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { Navbar, AppTab } from './components/Navbar';
import { TazaaStoreView } from './components/TazaaStoreView';
import { TazaaRawMaterialsView } from './components/TazaaRawMaterialsView';
import { TazaaStewardshipView } from './components/TazaaStewardshipView';
import { AIChatbox } from './components/AIChatbox';
import { TazaaCartDrawer, CartItem } from './components/TazaaCartDrawer';
import { SettingsControlCentre } from './components/SettingsControlCentre';
import { FloatingChatWidget } from './components/FloatingChatWidget';
import { TazaaBrandProduct, TAZAA_BRAND_CATALOG } from './data/tazaaCatalog';
import { Sparkles } from 'lucide-react';

function MainApp() {
  const { language } = useLanguage();
  const [currentTab, setCurrentTab] = useState<AppTab>('catalog');

  // Shopping Bag Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: TAZAA_BRAND_CATALOG[0], // Tazaa Bio-Cup starter
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Floating Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [prefilledQuestion, setPrefilledQuestion] = useState<string | null>(null);

  const handleAddToCart = (product: TazaaBrandProduct, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQty = (productId: string, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const getProductQuestion = (productName: string, lang: string) => {
    const map: Record<string, string> = {
      ky: `${productName} буюмунун өлчөмдөрү, баасы жана үйдө компосттоо эрежелери жөнүндө маалымат бериңизчи.`,
      ru: `Расскажите подробнее о характеристиках, размерах, ценах и компостировании ${productName}.`,
      es: `Cuéntame sobre las dimensiones, precio y ciclo de compostaje de ${productName}.`,
      zh: `请介绍一下 ${productName} 的规格尺寸、价格以及堆肥处理流程。`,
      de: `Erzählen Sie mir mehr über Abmessungen, Preise und Kompostierung von ${productName}.`,
      fr: `Parlez-moi des dimensions, du prix et du compostage de ${productName}.`,
      it: `Parlami delle dimensioni, del prezzo e del ciclo di compostaggio di ${productName}.`,
      pt: `Conte-me sobre as dimensões, preço e ciclo de compostagem de ${productName}.`,
      tr: `${productName} ürününün boyutları, fiyatı ve kompost talimatları hakkında bilgi verir misiniz?`,
      hi: `कृपया ${productName} के आकार, मूल्य और खाद बनाने की प्रक्रिया के बारे में बताएं।`,
      ko: `${productName}의 규격, 단가 및 가정 내 퇴비화 방법에 대해 알려주세요.`,
      ar: `أخبرني بمزيد من التفاصيل عن مقاسات وأسعار ودورة تحلل ${productName}.`,
      fa: `لطفاً درباره ابعاد، قیمت و روش کمپوست خانگی ${productName} توضیح دهید.`,
      ka: `გთხოვთ მომაწოდოთ ინფორმაცია ${productName}-ის ზომებზე, ფასზე და კომპოსტირებაზე.`,
      en: `Tell me about ${productName} dimensions, pricing, and circular composting lifecycle.`,
    };
    return map[lang] || map.en;
  };

  const handleOpenConsultantWithProduct = (productName?: string) => {
    if (productName) {
      const q = getProductQuestion(productName, language);
      setPrefilledQuestion(q);
    }
    setIsChatOpen(true);
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-slate-50 to-emerald-50/20 text-slate-900 font-sans flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      {/* Brand Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content View Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* TAB 1: Flagship Tazaa Brand Store Catalog */}
        {currentTab === 'catalog' && (
          <TazaaStoreView
            onAddToCart={handleAddToCart}
            onOpenConsultant={handleOpenConsultantWithProduct}
          />
        )}

        {/* TAB 2: Industrial Sustainable Raw Eco-Plastics & Polymers */}
        {currentTab === 'raw_materials' && (
          <TazaaRawMaterialsView
            onAddToCart={handleAddToCart}
            onOpenConsultant={handleOpenConsultantWithProduct}
          />
        )}

        {/* TAB 3: Circular Stewardship & Lifecycle Guide */}
        {currentTab === 'stewardship' && (
          <TazaaStewardshipView
            onOpenConsultant={() => setIsChatOpen(true)}
            onGoToShop={() => setCurrentTab('catalog')}
          />
        )}

        {/* TAB 4: Dedicated Akyl AI Brand Consultant Lounge */}
        {currentTab === 'consultant' && (
          <div className="w-full max-w-4xl mx-auto space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-[#1B5E20] border border-emerald-300">
                <Sparkles className="w-3.5 h-3.5 text-[#00E676]" />
                <span>Akyl AI Brand Consultant Lounge</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-emerald-950">
                Direct Consultation on Tazaa Circular Products
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
                Ask about product specifications, batch bulk volumes, material compositions, or get step-by-step instructions on safe backyard composting in your selected language.
              </p>
            </div>
            <AIChatbox initialPrompt={prefilledQuestion} />
          </div>
        )}
      </main>

      {/* Sliding Direct Shopping Bag Drawer */}
      <TazaaCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Settings & Currency Control Centre Modal */}
      <SettingsControlCentre />

      {/* Persistent Floating Akyl AI Consultant Widget */}
      <FloatingChatWidget
        isOpen={isChatOpen}
        initialPrompt={prefilledQuestion}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        onClose={() => {
          setIsChatOpen(false);
          setPrefilledQuestion(null);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
