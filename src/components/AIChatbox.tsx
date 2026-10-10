import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, EcoAIAnalysisResult } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Loader2,
  Trash2,
} from 'lucide-react';

interface AIChatboxProps {
  currentAnalysis?: EcoAIAnalysisResult | null;
  initialPrompt?: string | null;
}

export const AIChatbox: React.FC<AIChatboxProps> = ({ currentAnalysis, initialPrompt }) => {
  const { language, userProfile, t } = useLanguage();

  const getInitialWelcome = (lang: string) => {
    const welcomes: Record<string, string> = {
      ky: `Кош келиңиз! Мен **Akyl AI** — **Tazaa** циркулярдык эко-дүкөнүнүн расмий кеңешчисимин.

Биздин товарлар боюнча суроолоруңуз болсо жардам берүүгө даярмын:
• **Tazaa Bio-Cup** (кант камышы жана бамбуктан жасалган идиштер)
• **Калыпталган жалбырак табактары** (100% дарактарды кыйбастан)
• **Туруктуу чийки эко-пластиктер** (PHA био-смоласы)
• **Үрөндүү открыткалар** (топуракта гүл болуп өсөт)

Өлчөмдөр, баалар, жеткирүү жана үйдө компосттоо боюнча суроо бериңиз!`,

      ru: `Добро пожаловать в **Tazaa**! Я **Akyl AI** — эксклюзивный консультант по нашей продукции.

Готов проконсультировать вас по всем товарам:
• **Tazaa Bio-Cup** — биоразлагаемые стаканы из бамбука и тростника
• **Прессованные тарелки из листьев** — 100% экологичная посуда
• **Сырьевые эко-пластики (PHA)** — гранулы для литья и термоформования
• **Семенные открытки** — бумага с семенами цветов, прорастающая в грунте

Задавайте вопросы о размерах, оптовых ценах, доставке и правилах домашнего компостирования!`,

      es: `¡Bienvenido a **Tazaa**! Soy **Akyl AI**, su consultor exclusivo de marca.

Estoy aquí para responder a sus preguntas sobre nuestro catálogo:
• **Tazaa Bio-Cup** (vasos biodegradables de bagazo y bambú)
• **Platos de fibra prensada** (100% hojas caídas, sin tala)
• **Eco-plásticos crudos sostenibles** (gránulos PHA biodegradables)
• **Tarjetas con semillas** (papel que florece al plantarlo)

Pregúnteme sobre dimensiones, precios por lote y compostaje domiciliario.`,

      zh: `欢迎来到 **Tazaa**！我是 **Akyl AI**，您的专属品牌顾问。

我可以为您提供以下产品的详细咨询：
• **Tazaa Bio-Cup 环保生物杯**（甘蔗渣与竹纤维材质）
• **模压落叶餐盘**（零伐木，纯落叶蒸汽压制）
• **环保生物塑料原料 (PHA 树脂)**（海洋与土壤全降解颗粒）
• **植物种子纸名片**（埋入土壤即可盛开野花）

请随时向我咨询规格尺寸、大宗报价或家庭堆肥方法！`,

      de: `Willkommen bei **Tazaa**! Ich bin **Akyl AI**, Ihr persönlicher Markenberater.

Ich berate Sie gerne zu unseren Produkten:
• **Tazaa Bio-Cup** (Heiß- und Kaltgetränkebecher aus Zuckerrohr & Bambus)
• **Formfaser-Speiseteller** (aus Laub, 100% baumfrei)
• **Nachhaltige Roh-Biokunststoffe (PHA-Harze)** (vollständig biologisch abbaubar)
• **Botanische Saatkarten** (papier mit Wildblumensamen)

Fragen Sie mich nach Abmessungen, Großhandelspreisen oder Kompostierungsanleitungen!`,

      fr: `Bienvenue chez **Tazaa** ! Je suis **Akyl AI**, votre conseiller de marque exclusif.

Je suis à votre écoute pour vous renseigner sur nos créations :
• **Tazaa Bio-Cup** (gobelets en bagasse et bambou)
• **Assiettes en fibres moulées** (feuilles mortes sans déforestation)
• **Éco-plastiques bruts durables (PHA)** (polymères biodégradables)
• **Cartes botaniques ensemencées** (fleurs à planter)

Posez-moi vos questions sur les formats, devis ou le compostage à la maison !`,

      it: `Benvenuti in **Tazaa**! Sono **Akyl AI**, il vostro consulente di marca esclusivo.

Sono qui per fornirvi ogni dettaglio sul nostro catalogo:
• **Tazaa Bio-Cup** (bicchieri in canna da zucchero e bambù)
• **Piatti in fibra modellata** (foglie cadute a vapore)
• **Eco-plastiche grezze sostenibili (PHA)** (granuli biodegradabili)
• **Cartoline botaniche con semi** (fioriscono nel terreno)

Chiedetemi informazioni su dimensioni, preventivi all'ingrosso e compostaggio domestico!`,

      pt: `Bem-vindo à **Tazaa**! Eu sou o **Akyl AI**, seu consultor exclusivo de marca.

Estou aqui para esclarecer dúvidas sobre os nossos produtos:
• **Tazaa Bio-Cup** (copos biodegradáveis de bagaço e bambu)
• **Pratos de fibra moldada** (folhas secas sem derrubada de árvores)
• **Eco-plásticos brutos sustentáveis (PHA)** (grânulos biodegradáveis)
• **Cartões de sementes botânicas** (brotam flores ao plantar)

Pergunte-me sobre dimensões técnicas, compras em escala e compostagem!`,

      tr: `**Tazaa**'ya hoş geldiniz! Ben **Akyl AI**, resmi marka danışmanınızım.

Ürünlerimiz hakkında her türlü sorunuzu yanıtlayabilirim:
• **Tazaa Bio-Cup** (şeker kamışı ve bambu içecek bardakları)
• **Preslenmiş yaprak tabaklar** (ağaç kesilmeden üretilen sofra takımları)
• **Sürdürülebilir ham eko-plastikler (PHA)** (biyolojik çözünür granüller)
• **Tohumlu botanik kartlar** (ekildiğinde çiçek açan kağıtlar)

Ölçüler, toptan fiyatlandırma ve kompost talimatları hakkında bana danışabilirsiniz!`,

      hi: `**Tazaa** में आपका स्वागत है! मैं **Akyl AI** हूँ — आपका विशेष ब्रांड सलाहकार।

मैं आपको हमारे सभी उत्पादों की जानकारी दे सकता हूँ:
• **Tazaa Bio-Cup** (गन्ने की खोई और बांस से बने कप)
• **मोल्डेड लीफ प्लेट्स** (गिरे पत्तों से बनी इको-थालियां)
• **कच्चा इको-प्लास्टिक (PHA रेजिन)** (बायो-पॉलिमर दाने)
• **बीज युक्त स्टेशनरी कार्ड** (मिट्टी में लगाने पर खिलने वाले फूल)

मुझसे उत्पाद आयामों, थोक दरों और घरेलू खाद बनाने के बारे में पूछें!`,

      ko: `**Tazaa**에 오신 것을 환영합니다! 저는 전담 브랜드 컨설턴트 **Akyl AI**입니다.

제품에 대한 모든 질문을 환영합니다:
• **Tazaa Bio-Cup** (사탕수수와 대나무 음료 컵)
• **몰드 낙엽 식기 플레이트** (나무 벌목 없는 가을 낙엽 접시)
• **친환경 바이오 플라스틱 원료 (PHA)** (생분해성 수지 펠렛)
• **식재용 씨앗 스테이셔너리 카드** (심으면 꽃이 자라는 카드)

규격, 대량 구매 견적, 퇴비화 방법 등에 대해 문의해 주세요!`,

      ar: `مرحباً بك في **Tazaa**! أنا **Akyl AI** — مستشارك الحصري لمنتجاتنا الدائرية.

يسعدني الرد على جميع استفساراتك حول:
• **أكواب Tazaa Bio-Cup** (أكواب قصب السكر والخيزران)
• **أطباق أوراق الشجر المضغوطة** (أوانٍ طبيعية دون قطع الأشجار)
• **بلاستيك حيوي خام مستدام (PHA)** (حبيبات بوليمر حيوي قابلة للتحلل)
• **بطاقات البذور النباتية** (تزهر عند زراعتها في التربة)

اسألني عن المقاسات، أسعار الجملة، وإرشادات التحلل المنزلي!`,

      fa: `به **Tazaa** خوش آمدید! من **Akyl AI** هستم — مشاور اختصاصی شما برای محصولات پایدار تظا.

پاسخگوی تمامی پرسش‌های شما هستم:
• **لیوان‌های Tazaa Bio-Cup** (از باگاس نیشکر و بامبو)
• **بشقاب‌های قالبی از برگ خشک** (ظروف فشرده بدون قطع درختان)
• **مواد اولیه پلاستیک زیستی (PHA)** (گرانول‌های زیست‌پلیمر)
• **کارت‌های بذر گیاهی** (کارت دست‌ساز با بذر گل‌های وحشی)

در مورد ابعاد، سفارش عمده و کمپوست خانگی از من راهنمایی بخواهید!`,

      ka: `მოგესალმებით **Tazaa**-ში! მე ვარ **Akyl AI** — თქვენი ბრენდ-კონსულტანტი.

მზად ვარ გაგიწიოთ კონსულტაცია ჩვენს პროდუქციაზე:
• **Tazaa Bio-Cup** (შაქრის ლერწმისა და ბამბუკის ჭიქები)
• **ფოთლის დაწნეხილი თეფშები** (შემოდგომის ფოთლები ხეების მოჭრის გარეშე)
• **ნედლი ეკო-პლასტმასი (PHA)** (სრულად ბიოდეგრადირებადი გრანულები)
• **თესლიანი ბოტანიკური ბარათები** (მიწაში დარგვისას ყვავის)

მკითხეთ ზომებზე, საბითუმო ფასებსა და კომპოსტირებაზე!`,

      en: `Welcome to **Tazaa**. I am **Akyl AI**, your exclusive on-site brand consultant. Ask me about any proprietary Tazaa product (Tazaa Bio-Cup, molded fiber plates, sustainable PHA raw plastics). I am here to help with dimensions, bulk pricing, checkout guidance, and circular lifecycle instructions.`,
    };

    return welcomes[lang] || welcomes.en;
  };

  const getQuickPrompts = (lang: string) => {
    const promptMap: Record<string, string[]> = {
      ky: [
        'Tazaa Bio-Cup өлчөмдөрү жана баасы',
        'Tazaa жалбырак табактары кандай жасалат?',
        'PHA чийки эко-пластиги жөнүндө маалымат',
        'Үйдө кантип компосттоо керек?',
      ],
      ru: [
        'Характеристики и цена Tazaa Bio-Cup',
        'Тарелки из опавших листьев Tazaa',
        'Сырьевой биополимер PHA оптом',
        'Как компостировать посуду дома?',
      ],
      es: [
        'Especificaciones y precio de Tazaa Bio-Cup',
        'Platos de fibra prensada Tazaa',
        'Resinas crudas PHA biodegradables',
        '¿Cómo compostar los platos en casa?',
      ],
      zh: [
        'Tazaa Bio-Cup 规格与价格',
        'Tazaa 模压树叶餐盘工艺介绍',
        'PHA 环保生物塑料颗粒大宗采购',
        '如何在家庭庭院中自然堆肥？',
      ],
      de: [
        'Tazaa Bio-Cup Maße und Preise',
        'Tazaa Laub-Speiseteller Herstellung',
        'Nachhaltige PHA-Harzpellets Großhandel',
        'Wie kompostiert man Produkte im Garten?',
      ],
      fr: [
        'Spécifications et prix du Tazaa Bio-Cup',
        'Assiettes en feuilles d\'automne Tazaa',
        'Granulés de biopolymère PHA durable',
        'Comment composter la vaisselle à domicile ?',
      ],
      it: [
        'Misure e prezzi di Tazaa Bio-Cup',
        'Piatti in fibra modellata Tazaa',
        'Granuli polimerici grezzi PHA all\'ingrosso',
        'Come compostare le stoviglie in giardino?',
      ],
      pt: [
        'Especificações e preço do Tazaa Bio-Cup',
        'Pratos de folhas secas Tazaa',
        'Resinas brutas de biopolímero PHA',
        'Como compostar a louça em casa?',
      ],
      tr: [
        'Tazaa Bio-Cup ölçüleri ve fiyatı',
        'Tazaa dökülen yaprak tabakları',
        'Sürdürülebilir PHA ham biyo-peletler',
        'Evde bahçede nasıl kompost yapılır?',
      ],
      hi: [
        'Tazaa Bio-Cup की विशेषताएं और मूल्य',
        'Tazaa गिरे पत्तों की थालियां',
        'PHA कच्चा इको-प्लास्टिक थोक आपूर्ति',
        'घर पर बर्तनों की खाद कैसे बनाएं?',
      ],
      ko: [
        'Tazaa Bio-Cup 규격 및 단가',
        'Tazaa 몰드 낙엽 플레이트 소개',
        '생분해 PHA 원료 펠렛 대량 견적',
        '가정에서 안전하게 퇴비화하는 방법',
      ],
      ar: [
        'مواصفات وأسعار أكواب Tazaa Bio-Cup',
        'أطباق أوراق الشجر المضغوطة من Tazaa',
        'حبيبات بلاستيك PHA الخام المستدام',
        'كيفية التحلل المنزلي للأطباق بأمان؟',
      ],
      fa: [
        'مشخصات و قیمت لیوان‌های Tazaa Bio-Cup',
        'بشقاب‌های قالبی از برگ خشک تظا',
        'خرید عمده گرانول‌های زیست‌پلیمر PHA',
        'چگونه در خانه ظروف را کمپوست کنیم؟',
      ],
      ka: [
        'Tazaa Bio-Cup-ის ზომები და ფასი',
        'Tazaa-ს ფოთლის დაწნეხილი თეფშები',
        'PHA ნედლი ეკო-პლასტმასის საბითუმო ფასი',
        'როგორ დავაკომპოსტოთ ჭურჭელი სახლში?',
      ],
      en: [
        'Tell me about Tazaa Bio-Cup specs',
        'Pricing for Tazaa Molded Fiber Plates',
        'Tazaa Sustainable Raw Eco-Plastics (PHA)',
        'How to safely home-compost Tazaa items',
      ],
    };

    return promptMap[lang] || promptMap.en;
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: getInitialWelcome(language),
      timestamp: Date.now(),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update initial message when language changes if only 1 message exists
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === 'welcome') {
      setMessages([
        {
          id: 'welcome',
          role: 'model',
          content: getInitialWelcome(language),
          timestamp: Date.now(),
        },
      ]);
    }
  }, [language]);

  // Handle incoming initialPrompt
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText.trim(),
      timestamp: Date.now(),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
          contextData: {
            analysis: currentAnalysis || null,
            userProfile,
          },
          language,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to get EcoAI response.');
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: data.reply,
        timestamp: Date.now(),
      };
      setMessages([...newHistory, botMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const botMsg: ChatMessage = {
        id: `bot-fb-${Date.now()}`,
        role: 'model',
        content: getInitialWelcome(language),
        timestamp: Date.now(),
      };
      setMessages([...newHistory, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        content: getInitialWelcome(language),
        timestamp: Date.now(),
      },
    ]);
  };

  const currentPrompts = getQuickPrompts(language);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Header Banner */}
      <div className="bg-white border border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-2">
            <Bot className="w-3.5 h-3.5 text-emerald-600" />
            <span>Akyl AI Brand Consultant</span>
          </div>
          <h2 className="text-2xl font-extrabold text-emerald-950 tracking-tight">
            Consultation on Tazaa Products
          </h2>
          <p className="text-xs sm:text-sm text-emerald-800/80 mt-1">
            Official consultation on dimensions, wholesale pricing, materials, and safe backyard composting.
          </p>
        </div>
        <button
          onClick={handleClear}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{t('clearChat')}</span>
        </button>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white border border-emerald-100 rounded-3xl shadow-sm flex flex-col h-[580px] overflow-hidden">
        {/* Messages List Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-emerald-50/20">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-emerald-700" />}
                </div>
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-emerald-600 text-white shadow-xs rounded-tr-xs'
                      : 'bg-white text-emerald-950 border border-emerald-100 shadow-xs rounded-tl-xs'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-emerald-100 text-xs text-emerald-800 flex items-center gap-2 shadow-xs">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                <span>Akyl AI is generating advice in your language...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-white border-t border-emerald-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-bold text-emerald-900 shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-600" /> {t('suggestedPrompts')}
          </span>
          {currentPrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(prompt)}
              className="text-[11px] px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 shrink-0 font-medium transition"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 bg-white border-t border-emerald-100 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('chatPlaceholder')}
            className="flex-1 px-4 py-3 rounded-2xl bg-emerald-50/50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 placeholder-emerald-700/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 sm:px-5 sm:py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-md shadow-emerald-600/20 disabled:opacity-40 flex items-center gap-1.5 shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">{t('send')}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
