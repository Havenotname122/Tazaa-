import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, translations, TranslationKey } from './translations';
import { SupportedCurrency, UserAccountProfile } from '../types';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  currency: SupportedCurrency;
  setCurrency: (cur: SupportedCurrency) => void;
  formatMoney: (amount: number) => string;
  userProfile: UserAccountProfile;
  updateUserProfile: (partial: Partial<UserAccountProfile>) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  t: (key: TranslationKey) => string;
}

const STORAGE_LANG_KEY = 'tazaa_user_language_v2';
const STORAGE_CURR_KEY = 'tazaa_user_currency_v2';
const STORAGE_PROFILE_KEY = 'tazaa_user_profile_v2';
const KGS_TO_USD_RATE = 87.5;

const initialProfile: UserAccountProfile = {
  id: 'usr-eco-884',
  name: 'Aigul Bermet',
  email: 'aigul.maker@tazaa.kg',
  userRole: 'Procurement Partner',
  organizationName: 'Central Asia Bio-Materials Consortium',
  ecoTier: 'Emerald Circular Pioneer',
  avatarInitials: 'AB',
  country: 'Kyrgyzstan',
  region: 'Central Asia',
  totalWasteProcessedKg: 48.5,
  totalCo2SavedKg: 116.4,
  walletBalanceKgs: 4240,
  walletBalanceUsd: 48.45,
  savedRecipesCount: 7,
  procurementBudgetUsd: 125000,
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  currency: 'USD',
  setCurrency: () => {},
  formatMoney: (k) => `$${k.toFixed(2)}`,
  userProfile: initialProfile,
  updateUserProfile: () => {},
  isSettingsOpen: false,
  setIsSettingsOpen: () => {},
  t: (key) => translations.en[key] || key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LANG_KEY) as SupportedLanguage;
      const validLangs: SupportedLanguage[] = [
        'en', 'ru', 'ky', 'es', 'zh', 'de', 'pt', 'hi', 'ko', 'fr', 'it', 'tr', 'ar', 'fa', 'ka'
      ];
      if (saved && validLangs.includes(saved)) {
        return saved;
      }
      const browserLang = navigator.language?.toLowerCase() || '';
      if (browserLang.startsWith('ru')) return 'ru';
      if (browserLang.startsWith('ky')) return 'ky';
      if (browserLang.startsWith('es')) return 'es';
      if (browserLang.startsWith('zh')) return 'zh';
      if (browserLang.startsWith('de')) return 'de';
      if (browserLang.startsWith('pt')) return 'pt';
      if (browserLang.startsWith('fr')) return 'fr';
      if (browserLang.startsWith('it')) return 'it';
      if (browserLang.startsWith('tr')) return 'tr';
      if (browserLang.startsWith('ar')) return 'ar';
      if (browserLang.startsWith('ko')) return 'ko';
      if (browserLang.startsWith('hi')) return 'hi';
      if (browserLang.startsWith('fa')) return 'fa';
      if (browserLang.startsWith('ka')) return 'ka';
    } catch {
      // ignore
    }
    return 'en';
  });

  const [currency, setCurrencyState] = useState<SupportedCurrency>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CURR_KEY) as SupportedCurrency;
      if (saved && (saved === 'KGS' || saved === 'USD' || saved === 'EUR')) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'USD';
  });

  const [userProfile, setUserProfile] = useState<UserAccountProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PROFILE_KEY);
      if (saved) {
        return { ...initialProfile, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
    return initialProfile;
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const setLanguage = (newLang: SupportedLanguage) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_LANG_KEY, newLang);
      document.documentElement.lang = newLang;
    } catch {
      // ignore
    }
  };

  const setCurrency = (newCur: SupportedCurrency) => {
    setCurrencyState(newCur);
    try {
      localStorage.setItem(STORAGE_CURR_KEY, newCur);
    } catch {
      // ignore
    }
  };

  const updateUserProfile = (partial: Partial<UserAccountProfile>) => {
    setUserProfile((prev) => {
      const updated = { ...prev, ...partial };
      try {
        localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  useEffect(() => {
    try {
      document.documentElement.lang = language;
    } catch {
      // ignore
    }
  }, [language]);

  const formatMoney = (amount: number): string => {
    if (currency === 'KGS') {
      const kgsVal = amount < 100 ? amount * KGS_TO_USD_RATE : amount;
      return `${Math.round(kgsVal).toLocaleString()} сом`;
    }
    if (currency === 'EUR') {
      const eurVal = amount < 100 ? amount * 0.92 : (amount / KGS_TO_USD_RATE) * 0.92;
      return `€${eurVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    // Default USD
    const usdVal = amount > 500 ? amount / KGS_TO_USD_RATE : amount;
    return `$${usdVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const t = (key: TranslationKey): string => {
    const langDict = translations[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    return translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        formatMoney,
        userProfile,
        updateUserProfile,
        isSettingsOpen,
        setIsSettingsOpen,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
