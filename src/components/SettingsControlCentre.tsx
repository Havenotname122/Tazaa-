import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { LANGUAGE_OPTIONS } from '../i18n/translations';
import {
  X,
  User,
  Globe,
  Coins,
  Check,
  Award,
  Sparkles,
  Settings,
} from 'lucide-react';

export const SettingsControlCentre: React.FC = () => {
  const {
    language,
    setLanguage,
    currency,
    setCurrency,
    formatMoney,
    userProfile,
    updateUserProfile,
    isSettingsOpen,
    setIsSettingsOpen,
  } = useLanguage();

  const [activeSubTab, setActiveSubTab] = useState<'language' | 'account' | 'preferences'>('language');
  const [userNameInput, setUserNameInput] = useState(userProfile.name);
  const [userRoleInput, setUserRoleInput] = useState(userProfile.userRole);
  const [orgNameInput, setOrgNameInput] = useState(userProfile.organizationName);
  const [countryInput, setCountryInput] = useState(userProfile.country || 'Kyrgyzstan');
  const [regionInput, setRegionInput] = useState(userProfile.region || 'Central Asia');
  const [isSavedFeedback, setIsSavedFeedback] = useState(false);

  React.useEffect(() => {
    setUserNameInput(userProfile.name);
    setUserRoleInput(userProfile.userRole);
    setOrgNameInput(userProfile.organizationName);
    setCountryInput(userProfile.country || 'Kyrgyzstan');
    setRegionInput(userProfile.region || 'Central Asia');
  }, [userProfile]);

  if (!isSettingsOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: userNameInput,
      userRole: userRoleInput as any,
      organizationName: orgNameInput,
      country: countryInput,
      region: regionInput,
    });
    setIsSavedFeedback(true);
    setTimeout(() => setIsSavedFeedback(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-emerald-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="px-6 py-5 bg-gradient-to-r from-emerald-900 to-green-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <Settings className="w-5 h-5 text-[#00E676]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-tight text-white">
                  Control Centre & Settings
                </h3>
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/30">
                  TAZAA
                </span>
              </div>
              <p className="text-xs text-emerald-200/80">
                Manage language preferences, user profile, and regional payouts
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsSettingsOpen(false)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-tab Navigation */}
        <div className="px-6 pt-3 bg-white border-b border-emerald-100 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveSubTab('language')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition ${
              activeSubTab === 'language'
                ? 'border-emerald-600 text-emerald-950'
                : 'border-transparent text-slate-500 hover:text-emerald-800'
            }`}
          >
            <Globe className="w-4 h-4 text-emerald-600" />
            <span>Language Control Centre</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('account')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition ${
              activeSubTab === 'account'
                ? 'border-emerald-600 text-emerald-950'
                : 'border-transparent text-slate-500 hover:text-emerald-800'
            }`}
          >
            <User className="w-4 h-4 text-emerald-600" />
            <span>Account & Eco-Wallet</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('preferences')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition ${
              activeSubTab === 'preferences'
                ? 'border-emerald-600 text-emerald-950'
                : 'border-transparent text-slate-500 hover:text-emerald-800'
            }`}
          >
            <Coins className="w-4 h-4 text-emerald-600" />
            <span>Currency & Standards</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* TAB 1: LANGUAGE CONTROL CENTRE */}
          {activeSubTab === 'language' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-emerald-950">
                    System Language Selection
                  </h4>
                  <p className="text-xs text-slate-500">
                    Choose your primary language across all UI elements, AI recipes, and Akyl AI brand consultant chat.
                  </p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900">
                  Active: {language.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {LANGUAGE_OPTIONS.map((opt) => {
                  const isSelected = language === opt.code;
                  return (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => setLanguage(opt.code)}
                      className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between h-28 ${
                        isSelected
                          ? 'bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-500 shadow-md'
                          : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-3xl">{opt.flag}</span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-black text-sm text-emerald-950 flex items-center gap-1.5">
                          <span>{opt.nativeName}</span>
                          {opt.code === 'ky' && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-extrabold uppercase">
                              Special
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500">{opt.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-150 text-xs text-emerald-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-950">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Multilingual AI Grounding:
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Both <strong>Akyl AI Consultant</strong> and platform assistants formulate all responses, product guidance, and circular lifecycle tips in your selected language.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: ACCOUNT & ECO-WALLET */}
          {activeSubTab === 'account' && (
            <div className="space-y-6">
              <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-150 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white font-black text-lg flex items-center justify-center shadow-md">
                    {userProfile.avatarInitials}
                  </div>
                  <div>
                    <h4 className="font-black text-base text-emerald-950">
                      {userProfile.name}
                    </h4>
                    <p className="text-xs text-slate-500">{userProfile.email}</p>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] font-bold text-emerald-800">
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{userProfile.ecoTier}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-emerald-200 text-right w-full sm:w-auto">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Eco-Wallet Balance
                  </span>
                  <span className="text-lg font-black text-emerald-700">
                    {formatMoney(userProfile.walletBalanceUsd)}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4 pt-2 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-emerald-950 mb-1">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={userNameInput}
                      onChange={(e) => setUserNameInput(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-emerald-950 mb-1">
                      Role / Title
                    </label>
                    <input
                      type="text"
                      value={userRoleInput}
                      onChange={(e) => setUserRoleInput(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-emerald-950 mb-1">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      value={orgNameInput}
                      onChange={(e) => setOrgNameInput(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-emerald-950 mb-1">
                      Designated Country
                    </label>
                    <input
                      type="text"
                      value={countryInput}
                      onChange={(e) => setCountryInput(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  {isSavedFeedback ? (
                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Saved successfully!
                    </span>
                  ) : <span />}
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition shadow-xs"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: CURRENCY & STANDARDS */}
          {activeSubTab === 'preferences' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-black text-emerald-950 mb-1">
                  Currency Display Preference
                </h4>
                <p className="text-xs text-slate-500 mb-3">
                  Choose your preferred currency display format.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrency('USD')}
                    className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                      currency === 'USD'
                        ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="font-black text-sm text-emerald-950">$ US Dollar (USD)</div>
                    </div>
                    {currency === 'USD' && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency('EUR')}
                    className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                      currency === 'EUR'
                        ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="font-black text-sm text-emerald-950">€ Euro (EUR)</div>
                    </div>
                    {currency === 'EUR' && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency('KGS')}
                    className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                      currency === 'KGS'
                        ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="font-black text-sm text-emerald-950">с Kyrgyz Som (KGS)</div>
                    </div>
                    {currency === 'KGS' && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-900 block">
                  Circular Manufacturing Standards
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Tazaa enforces strict environmental criteria across its operations: zero synthetic single-use plastics, 100% home compostable biological matrices, and verified non-toxic food contact safety.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            TAZAA • Circular Consumer Goods Platform
          </span>
          <button
            type="button"
            onClick={() => setIsSettingsOpen(false)}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
