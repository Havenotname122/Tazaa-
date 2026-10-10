import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, EcoAIAnalysisResult } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  User,
  Loader2,
  X,
  Minimize2,
  Maximize2,
  Trash2,
} from 'lucide-react';

interface FloatingChatWidgetProps {
  currentAnalysis?: EcoAIAnalysisResult | null;
  initialPrompt?: string | null;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const FloatingChatWidget: React.FC<FloatingChatWidgetProps> = ({
  currentAnalysis,
  initialPrompt,
  isOpen,
  onToggle,
  onClose,
}) => {
  const { language, userProfile } = useLanguage();

  const getWelcomeText = (lang: string) => {
    const welcomes: Record<string, string> = {
      ky: `Саламатсызбы! Мен **Akyl AI** — **Tazaa** брендинин консультантымын.

Биздин 100% өсүмдүк калдыктарынан жасалган буюмдар (Tazaa Bio-Cup, калыпталган жалбырак табактары, PHA эко-пластиктери) боюнча суроолоруңузга кыргыз тилинде жооп берүүгө даярмын. Кандай сурооңуз бар?`,

      ru: `Здравствуйте! Я **Akyl AI** — консультант бренда **Tazaa**.

Я готов ответить на любые вопросы о нашей экологичной продукции (Tazaa Bio-Cup, прессованная посуда из листьев, сырьевые био-пластики PHA) на русском языке. Чем я могу помочь?`,

      es: `¡Hola! Soy **Akyl AI**, consultor exclusivo de la marca **Tazaa**.

Estoy a su disposición para resolver cualquier duda sobre nuestros productos circulares (Tazaa Bio-Cup, platos de hojas moldeadas, eco-plásticos PHA). ¿En qué puedo ayudarle hoy?`,

      zh: `您好！我是 **Tazaa** 专属品牌顾问 **Akyl AI**。

我可以用中文为您解答关于 Tazaa 环保生物杯、模压落叶餐具及 PHA 生物塑料颗粒的规格、价格与堆肥指南。请问有什么可以协助您？`,

      de: `Guten Tag! Ich bin **Akyl AI**, der Markenberater von **Tazaa**.

Ich beantworte gerne all Ihre Fragen zu unseren zirkulären Produkten (Tazaa Bio-Cup, Formfaser-Laubteller, biologisch abbaubare PHA-Harze) auf Deutsch. Wie kann ich Ihnen helfen?`,

      fr: `Bonjour ! Je suis **Akyl AI**, le conseiller exclusif de la marque **Tazaa**.

Je suis disponible pour répondre en français à toutes vos questions sur notre gamme (Tazaa Bio-Cup, assiettes en feuilles pressées, bio-plastiques PHA). Que souhaitez-vous savoir ?`,

      it: `Buongiorno! Sono **Akyl AI**, il consulente ufficiale del marchio **Tazaa**.

Sono pronto a rispondere in italiano a qualsiasi domanda sui nostri prodotti sostenibili (Tazaa Bio-Cup, piatti in foglie, biopolimeri PHA). Come posso aiutarvi?`,

      pt: `Olá! Sou o **Akyl AI**, consultor de marca da **Tazaa**.

Estou à sua disposição em português para tirar dúvidas sobre nossa linha sustentável (Tazaa Bio-Cup, pratos de folhas moldadas, bioplásticos PHA). Em que posso ajudar?`,

      tr: `Merhaba! Ben **Tazaa** marka danışmanı **Akyl AI**.

Döngüsel ürünlerimiz (Tazaa Bio-Cup, preslenmiş yaprak tabaklar, PHA biyo-plastikler) hakkında Türkçe olarak her türlü sorunuzu yanıtlamaya hazırım. Size nasıl yardımcı olabilirim?`,

      hi: `नमस्ते! मैं **Tazaa** का आधिकारिक ब्रांड सलाहकार **Akyl AI** हूँ।

मैं हमारे पर्यावरण-अनुकूल उत्पादों (Tazaa Bio-Cup, पत्तों के बर्तन, PHA इको-प्लास्टिक) के बारे में हिंदी में आपके प्रश्नों का उत्तर देने के लिए तैयार हूँ। मैं आपकी क्या मदद कर सकता हूँ?`,

      ko: `안녕하세요! **Tazaa**의 전담 브랜드 컨설턴트 **Akyl AI**입니다.

Tazaa Bio-Cup, 몰드 낙엽 식기, 친환경 PHA 바이오 플라스틱 등 당사 제품에 대해 한국어로 자세히 안내해 드리겠습니다. 무엇을 도와드릴까요?`,

      ar: `أهلاً بك! أنا **Akyl AI** — مستشار العلامة التجارية الحصري لـ **Tazaa**.

أنا مستعد للإجابة باللغة العربية على أي استفسار حول منتجاتنا الدائرية (أكواب Tazaa Bio-Cup، أطباق الأوراق المضغوطة، بلاستيك PHA الحيوي). كيف يمكنني مساعدتك؟`,

      fa: `درود! من **Akyl AI** هستم — مشاور رسمی برند **Tazaa**.

آماده‌ام به زبان فارسی پاسخگوی سؤالات شما درباره ظروف زیستی، لیوان‌های Bio-Cup و گرانول‌های PHA باشم. چه کمکی از من ساخته است؟`,

      ka: `გამარჯობა! მე ვარ **Akyl AI** — **Tazaa**-ს ბრენდის ოფიციალური კონსულტანტი.

მზად ვარ ქართულ ენაზე გიპასუხოთ ჩვენს ეკოლოგიურ პროდუქციაზე (Tazaa Bio-Cup, ფოთლის ჭურჭელი, PHA ბიოპლასტმასი). რით შემიძლია დაგეხმაროთ?`,

      en: `Welcome to **Tazaa**. I am **Akyl AI**, your exclusive on-site brand consultant for Tazaa's proprietary line of circular consumer goods and sustainable materials. I am here to assist you with product specifications, pricing, catalog navigation, checkout support, and circular lifecycle stewardship.`,
    };

    return welcomes[lang] || welcomes.en;
  };

  const getSuggestions = (lang: string) => {
    const list: Record<string, string[]> = {
      ky: [
        'Tazaa Bio-Cup өлчөмдөрү жана баасы',
        'Жалбырак табактары кандай жасалат?',
        'PHA чийки пластиги',
        'Үйдө компосттоо эрежеси',
      ],
      ru: [
        'Характеристики Tazaa Bio-Cup',
        'Тарелки из листьев Tazaa',
        'Сырьевые смолы PHA',
        'Как компостировать дома?',
      ],
      es: [
        'Especificaciones de Tazaa Bio-Cup',
        'Platos de fibra de hojas',
        'Resinas crudas PHA',
        'Compostaje en casa',
      ],
      zh: [
        'Tazaa Bio-Cup 规格与价格',
        '模压落叶餐盘制作工艺',
        'PHA 环保生物塑料颗粒',
        '家庭庭院堆肥指南',
      ],
      de: [
        'Tazaa Bio-Cup Spezifikationen',
        'Laub-Speiseteller Fertigung',
        'PHA-Biokunststoffharze',
        'Anleitung zur Kompostierung',
      ],
      fr: [
        'Détails Tazaa Bio-Cup',
        'Assiettes en feuilles mortes',
        'Granulés de polymère PHA',
        'Compostage à domicile',
      ],
      it: [
        'Dimensioni Tazaa Bio-Cup',
        'Piatti in fibra di foglie',
        'Resine grezze PHA',
        'Compostaggio in giardino',
      ],
      pt: [
        'Especificações do Tazaa Bio-Cup',
        'Pratos de folhas secas',
        'Resinas brutas PHA',
        'Como compostar em casa',
      ],
      tr: [
        'Tazaa Bio-Cup özellikleri',
        'Yaprak tabak üretimi',
        'PHA ham biyo-plastik',
        'Evde kompost talimatı',
      ],
      hi: [
        'Tazaa Bio-Cup की विशेषताएं',
        'पत्तों की थालियां कैसे बनती हैं?',
        'कच्चा PHA इको-प्लास्टिक',
        'घर पर खाद कैसे बनाएं?',
      ],
      ko: [
        'Tazaa Bio-Cup 규격 및 가격',
        '낙엽 플레이트 제작 공정',
        'PHA 생분해성 원료 펠렛',
        '가정 내 안전한 퇴비화 방법',
      ],
      ar: [
        'مواصفات أكواب Tazaa Bio-Cup',
        'صناعة أطباق أوراق الشجر',
        'بلاستيك PHA الحيوي الخام',
        'طريقة التحلل المنزلي',
      ],
      fa: [
        'مشخصات لیوان Tazaa Bio-Cup',
        'ساخت بشقاب از برگ خشک',
        'خرید گرانول‌های PHA',
        'روش کمپوست در باغچه',
      ],
      ka: [
        'Tazaa Bio-Cup-ის მახასიათებლები',
        'ფოთლის თეფშების დამზადება',
        'PHA ნედლი ბიოპლასტმასი',
        'სახლში კომპოსტირების წესი',
      ],
      en: [
        'Tell me about Tazaa Bio-Cup specs & pricing',
        'Details on Tazaa Molded Fiber Dinner Plates',
        'Tazaa Sustainable Raw Eco-Plastics (PHA)',
        'How to safely home-compost Tazaa products',
      ],
    };

    return list[lang] || list.en;
  };

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        content: getWelcomeText(language),
        timestamp: Date.now(),
      },
    ]);
  }, [language]);

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, isOpen]);

  const handleSend = async (customPrompt?: string) => {
    const text = (customPrompt || input).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
          contextData: {
            analysis: currentAnalysis || null,
            userProfile,
          },
          language,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to connect to EcoAI.');
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: data.reply,
        timestamp: Date.now(),
      };
      setMessages([...updated, botMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `bot-fb-${Date.now()}`,
        role: 'model',
        content: getWelcomeText(language),
        timestamp: Date.now(),
      };
      setMessages([...updated, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = getSuggestions(language);

  return (
    <>
      {/* Floating Trigger Bubble */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center">
        {!isOpen && (
          <button
            type="button"
            onClick={onToggle}
            className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#1B5E20] to-emerald-800 hover:from-emerald-900 hover:to-[#1B5E20] text-white shadow-xl shadow-[#1B5E20]/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-[#00E676]/40"
            title="Open AKYL AI Assistant"
          >
            <div className="relative">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00E676] absolute -top-0.5 -right-0.5 animate-ping" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#00E676] absolute -top-0.5 -right-0.5" />
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-black tracking-tight leading-none flex items-center gap-1">
                <span>AKYL AI</span>
                <Sparkles className="w-3 h-3 text-[#00E676]" />
              </div>
              <span className="text-[10px] text-emerald-200 font-semibold leading-none">
                {language === 'ky' ? 'Акылдуу кеңешчи' : language === 'ru' ? 'Онлайн консультант' : 'Brand Consultant'}
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Persistent Floating Chat Panel */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 shadow-2xl rounded-3xl bg-white border border-emerald-200 flex flex-col overflow-hidden ${
            isExpanded
              ? 'bottom-4 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[540px] h-[85vh] max-h-[750px]'
              : 'bottom-6 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[410px] h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-950 via-[#1B5E20] to-emerald-900 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-[#00E676]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs sm:text-sm font-black text-white">
                    AKYL AI • Tazaa Consultant
                  </h3>
                  <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/30">
                    Live
                  </span>
                </div>
                <p className="text-[10px] text-emerald-200">
                  {language.toUpperCase()} • Answering in your language
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-slate-300">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() =>
                  setMessages([
                    { id: 'init', role: 'model', content: getWelcomeText(language), timestamp: Date.now() },
                  ])
                }
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition"
                title="Clear Chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition"
                title="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#fbfdfc]">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                      isUser
                        ? 'bg-[#1B5E20] text-white shadow-xs'
                        : 'bg-emerald-100 text-[#1B5E20] border border-emerald-200'
                    }`}
                  >
                    {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      isUser
                        ? 'bg-[#1B5E20] text-white rounded-tr-xs shadow-xs'
                        : 'bg-white text-slate-800 border border-emerald-100 shadow-xs rounded-tl-xs'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-emerald-100 flex items-center justify-center text-[#1B5E20]">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="p-3 rounded-2xl bg-white border border-emerald-100 text-xs text-slate-700 flex items-center gap-2 shadow-xs">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                  <span className="text-[11px]">AKYL AI is formulating response...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestion Chips */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-bold text-emerald-800 shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#00E676]" />
            </span>
            {suggestions.map((sug, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(sug)}
                className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 whitespace-nowrap font-medium transition shrink-0"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-emerald-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                language === 'ky'
                  ? 'AKYL AIден суроо...'
                  : language === 'ru'
                  ? 'Задать вопрос AKYL AI...'
                  : language === 'es'
                  ? 'Preguntar a AKYL AI...'
                  : language === 'zh'
                  ? '向 AKYL AI 咨询...'
                  : language === 'de'
                  ? 'Frage an AKYL AI...'
                  : language === 'fr'
                  ? 'Demander à AKYL AI...'
                  : 'Ask AKYL AI consultant...'
              }
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-emerald-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#1B5E20]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-[#1B5E20] hover:bg-emerald-900 text-white transition shadow-sm disabled:opacity-40 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
