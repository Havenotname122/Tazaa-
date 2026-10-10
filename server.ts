import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment variables.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    brand: 'TAZAA',
    engines: ['AI-Engine-1-VisionSlot', 'AI-Engine-2-AutonomousChat'],
    languages: ['en', 'ru', 'ky', 'es', 'zh', 'de', 'pt', 'fr', 'it', 'tr', 'hi', 'ko', 'ar', 'fa', 'ka'],
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

function parseDataUrl(dataUrl: string) {
  const matches = dataUrl.match(/^data:([^;]+);base64,(.*)$/);
  if (matches) {
    return {
      mimeType: matches[1],
      base64Data: matches[2],
    };
  }
  return {
    mimeType: 'image/jpeg',
    base64Data: dataUrl,
  };
}

function isQuotaExhaustedError(err: any): boolean {
  const msg = err?.message || '';
  return (
    err?.status === 429 ||
    msg.includes('429') ||
    msg.includes('RESOURCE_EXHAUSTED') ||
    msg.includes('quota') ||
    msg.includes('Quota exceeded')
  );
}

async function generateWithModelFallback<T>(
  task: (modelName: string) => Promise<T>,
  models = ['gemini-3.8-flash', 'gemini-3.1-flash-lite']
): Promise<T> {
  let lastError: any;
  for (const model of models) {
    try {
      return await task(model);
    } catch (err: any) {
      lastError = err;
      const isQuota = isQuotaExhaustedError(err);
      console.warn(
        `Model ${model} failed (${isQuota ? 'Quota exhausted' : err?.status || err?.message?.slice(0, 80)}). Trying next model...`
      );
    }
  }
  throw lastError;
}

function getLanguageDirective(lang = 'en'): string {
  const langMap: Record<string, { name: string; native: string; mandate: string }> = {
    ky: {
      name: 'Kyrgyz',
      native: 'Кыргызча',
      mandate: 'KYRGYZ (Кыргызча / Кыргыз тилинде). Output ALL text, titles, descriptions, instructions, prices (in KGS / сом), and consultant advice in natural, fluent, grammatically correct KYRGYZ (Кыргыз тилинде). Do NOT answer in English.',
    },
    ru: {
      name: 'Russian',
      native: 'Русский',
      mandate: 'RUSSIAN (Русский язык). Output ALL text, titles, descriptions, instructions, and advice in natural, fluent, professional RUSSIAN (на русском языке). Do NOT answer in English.',
    },
    es: {
      name: 'Spanish',
      native: 'Español',
      mandate: 'SPANISH (Español). Output ALL text, titles, descriptions, instructions, and advice in natural, fluent, professional SPANISH (en español). Do NOT answer in English.',
    },
    zh: {
      name: 'Simplified Chinese',
      native: '简体中文',
      mandate: 'MANDARIN CHINESE (简体中文). Output ALL text, titles, descriptions, instructions, and advice in natural, fluent, professional SIMPLIFIED CHINESE (简体中文). Do NOT answer in English.',
    },
    de: {
      name: 'German',
      native: 'Deutsch',
      mandate: 'GERMAN (Deutsch). Output ALL text, titles, descriptions, instructions, and advice in natural, fluent, professional GERMAN (auf Deutsch). Do NOT answer in English.',
    },
    pt: {
      name: 'Portuguese',
      native: 'Português',
      mandate: 'PORTUGUESE (Português). Output ALL text, titles, descriptions, instructions, and advice in natural, fluent, professional PORTUGUESE (em português). Do NOT answer in English.',
    },
    fr: {
      name: 'French',
      native: 'Français',
      mandate: 'FRENCH (Français). Output ALL text, titles, descriptions, instructions, and advice in natural, fluent, professional FRENCH (en français). Do NOT answer in English.',
    },
    it: {
      name: 'Italian',
      native: 'Italiano',
      mandate: 'ITALIAN (Italiano). Output ALL text, titles, descriptions, instructions, and advice in natural, fluent, professional ITALIAN (in italiano). Do NOT answer in English.',
    },
    tr: {
      name: 'Turkish',
      native: 'Türkçe',
      mandate: 'TURKISH (Türkçe). Output ALL text, titles, descriptions, instructions, and advice in natural, fluent, professional TURKISH (Türkçe olarak). Do NOT answer in English.',
    },
    hi: {
      name: 'Hindi',
      native: 'हिन्दी',
      mandate: 'HINDI (हिन्दी). Output ALL text, titles, descriptions, instructions, and advice in natural, fluent, grammatically correct HINDI (हिन्दी में). Do NOT answer in English.',
    },
    ko: {
      name: 'Korean',
      native: '한국어',
      mandate: 'KOREAN (한국어). Output ALL text, titles, descriptions, instructions, and advice in natural, fluent, professional KOREAN (한국어로). Do NOT answer in English.',
    },
    ar: {
      name: 'Arabic',
      native: 'العربية',
      mandate: 'ARABIC (العربية). Output ALL text, titles, descriptions, instructions, and advice in natural, fluent, professional Modern Standard ARABIC (باللغة العربية). Do NOT answer in English.',
    },
    fa: {
      name: 'Persian',
      native: 'فارسی',
      mandate: 'PERSIAN (فارسی). Output ALL text, titles, descriptions, instructions, and advice in natural, fluent, professional PERSIAN (به زبان فارسی). Do NOT answer in English.',
    },
    ka: {
      name: 'Georgian',
      native: 'ქართული',
      mandate: 'GEORGIAN (ქართული). Output ALL text, titles, descriptions, instructions, and advice in natural, fluent, professional GEORGIAN (ქართულ ენაზე). Do NOT answer in English.',
    },
    en: {
      name: 'English',
      native: 'English',
      mandate: 'ENGLISH. Output all text, titles, descriptions, and instructions in clear, modern, professional English.',
    },
  };

  const selected = langMap[lang] || langMap.en;
  return `CRITICAL MULTILINGUAL MANDATE:
The user interface is currently set to ${selected.name} (${selected.native}).
${selected.mandate}
Even if technical catalog names or inputs are in English, formulate your entire explanation, response, and assistance in ${selected.name} (${selected.native}).`;
}

function getLocalizedChatFallback(lang = 'en'): string {
  const fallbacks: Record<string, string> = {
    ky: `Кош келиңиз! Мен **Akyl AI** — **Tazaa** циркулярдык эко-дүкөнүнүн расмий кеңешчисимин.

Биздин негизги товарлар:
• **Tazaa Bio-Cup** — 100% өсүмдүк калдыктарынан жасалган кофе жана муздак суусундук чөйчөктөрү ($12.99 / 50 даана).
• **Tazaa калыпталган жалбырак табактары** — Дарактарды кыйбастан, түшкөн жалбырактардан пресстелген табактар ($14.50 / 25 даана).
• **Tazaa туруктуу чийки эко-пластиктер (PHA)** — Деңизде жана топуракта толук чирип кетүүчү биополимер гранулдары ($85.00 / 25 кг).
• **Tazaa үрөндүү открыткалары** — Топуракка көмгөндө гүл болуп өсүп чыгуучу табигый кагаз ($28.00 / 100 даана).

Товарлардын өлчөмдөрү, жапырт сатып алуу баалары жана компосттоо боюнча суроолоруңузга жооп берүүгө даярмын!`,

    ru: `Добро пожаловать в **Tazaa**! Я **Akyl AI** — ваш эксклюзивный консультант по нашей экологичной продукции.

Популярные позиции нашего каталога:
• **Tazaa Bio-Cup** — биоразлагаемые стаканчики из сахарного тростника и бамбука ($12.99 / упаковка 50 шт.).
• **Прессованные тарелки из листьев Tazaa** — прочная посуда из опавшей листвы без вырубки деревьев ($14.50 / упаковка 25 шт.).
• **Сырьевые эко-пластики Tazaa (PHA смолы)** — биополимерные гранулы, безопасно разлагающиеся в почве и морской воде ($85.00 / мешок 25 кг).
• **Семенные открытки Tazaa** — бумага из хлопка с семенами диких цветов, прорастающая в почве ($28.00 / коробка 100 шт.).

Я готов проконсультировать вас по точным размерам, оптовым ценам, оформлению заказа и правилам компостирования!`,

    es: `¡Bienvenido a **Tazaa**! Soy **Akyl AI**, su consultor exclusivo de la marca para nuestra línea de productos circulares y materiales sostenibles.

Selecciones destacadas de nuestro catálogo:
• **Tazaa Bio-Cup** — Vasos biodegradables para bebidas frías y calientes de bagazo de caña y bambú (USD 12.99 / Paquete de 50).
• **Platos de fibra prensada Tazaa** — Vajilla moldeada a partir de hojas caídas sin tala de árboles (USD 14.50 / Paquete de 25).
• **Eco-plásticos crudos sostenibles Tazaa (Resinas PHA)** — Gránulos de biopolímero biodegradables en suelo y agua marina (USD 85.00 / Saco de 25 kg).
• **Tarjetas botánicas con semillas Tazaa** — Tarjetas de algodón reciclado que florecen al plantarse (USD 28.00 / Caja de 100).

Estoy a su disposición para resolver consultas sobre dimensiones técnicas, pedidos al por mayor y compostaje domiciliario.`,

    zh: `欢迎光临 **Tazaa**！我是 **Akyl AI**，您的专属品牌顾问。

我们自主研发的核心循环产品包括：
• **Tazaa Bio-Cup 生物环保杯** — 甘蔗渣与竹纤维热压成型，植物巴西棕榈蜡防渗涂层（12.99 美元 / 50只装）。
• **Tazaa 模压落叶餐盘** — 纯落叶蒸汽热压，零树木砍伐，45天庭院自然堆肥（14.50 美元 / 25只装）。
• **Tazaa 环保生物塑料原料 (PHA 树脂)** — 海洋与土壤全生物降解颗粒，适配注塑与3D打印（85.00 美元 / 25公斤袋）。
• **Tazaa 植物种子纸名片** — 回收棉纤维内嵌非转基因野花种子，浇水即可发芽盛开（28.00 美元 / 100张盒装）。

您可以随时向我咨询产品规格尺寸、大宗采购报价、下单结账流程及家庭堆肥指南！`,

    de: `Willkommen bei **Tazaa**! Ich bin **Akyl AI**, Ihr exklusiver Markenberater für unsere proprietären zirkulären Konsumgüter und nachhaltigen Materialien.

Ausgewählte Produkte unseres Katalogs:
• **Tazaa Bio-Cup** — Heiß- und Kaltgetränkebecher aus Zuckerrohrbagasse und Bambus (USD 12.99 / 50er-Pack).
• **Tazaa Formfaser-Speiseteller** — Dampfgepresstes Herbstlaub ohne Baumfällung mit Bienenwachsversiegelung (USD 14.50 / 25er-Pack).
• **Tazaa Nachhaltige Roh-Biokunststoffe (PHA-Harze)** — Boden- und meeresbiologisch abbaubares Polymergranulat (USD 85.00 / 25-kg-Sack).
• **Tazaa Botanische Saatkarten** — Handgeschöpftes Papier mit Wildblumensamen (USD 28.00 / 100er-Box).

Ich stehe Ihnen gerne für Fragen zu technischen Abmessungen, Staffelpreisen und Heimkompostierung zur Verfügung!`,

    fr: `Bienvenue chez **Tazaa** ! Je suis **Akyl AI**, votre conseiller de marque exclusif pour notre gamme de produits éco-responsables et matériaux circulaires.

Sélection de notre catalogue :
• **Tazaa Bio-Cup** — Gobelets en bagasse de canne à sucre et bambou pour boissons chaudes et froides (12,99 $ / paquet de 50).
• **Assiettes en fibres moulées Tazaa** — Vaisselle en feuilles mortes pressées à la vapeur sans déforestation (14,50 $ / paquet de 25).
• **Éco-plastiques bruts durables Tazaa (Résines PHA)** — Granulés de biopolymère biodégradables en milieu marin et sol (85,00 $ / sac de 25 kg).
• **Cartes botaniques ensemencées Tazaa** — Papier en coton recyclé qui germe en fleurs (28,00 $ / boîte de 100).

Je suis à votre entière disposition pour vous guider sur les dimensions, prix de gros et compostage à domicile.`,

    it: `Benvenuti in **Tazaa**! Sono **Akyl AI**, il vostro consulente esclusivo per la nostra linea di prodotti circolari e polimeri sostenibili.

I punti di forza del nostro catalogo:
• **Tazaa Bio-Cup** — Bicchieri biodegradabili in canna da zucchero e bambù (USD 12.99 / confezione da 50).
• **Piatti in fibra modellata Tazaa** — Stoviglie ricavate da foglie cadute senza abbattere alberi (USD 14.50 / confezione da 25).
• **Eco-plastiche grezze sostenibili Tazaa (Resine PHA)** — Granuli polimerici biodegradabili in mare e terreno (USD 85.00 / sacco da 25 kg).
• **Cartoline botaniche con semi Tazaa** — Carta riciclata con semi di fiori selvatici (USD 28.00 / scatola da 100).

Sono a vostra completa disposizione per dettagli tecnici, sconti per volumi e istruzioni per il compostaggio!`,

    pt: `Bem-vindo à **Tazaa**! Sou o **Akyl AI**, seu consultor exclusivo para nossa linha de bens circulares e materiais sustentáveis.

Destaques do nosso catálogo:
• **Tazaa Bio-Cup** — Copos biodegradáveis de bagaço de cana e bambu (USD 12.99 / pacote de 50).
• **Pratos de fibra moldada Tazaa** — Louça termoprensada a partir de folhas secas caídas (USD 14.50 / pacote de 25).
• **Eco-plásticos brutos sustentáveis Tazaa (Resinas PHA)** — Grânulos de biopolímero biodegradáveis no mar e solo (USD 85.00 / saca de 25 kg).
• **Cartões de sementes botânicas Tazaa** — Papel de algodão que floresce ao ser plantado (USD 28.00 / caixa de 100).

Estou à disposição para esclarecer dimensões técnicas, compras no atacado e compostagem doméstica!`,

    tr: `**Tazaa**'ya hoş geldiniz! Ben **Akyl AI**, döngüsel tüketim ürünlerimiz ve sürdürülebilir malzemelerimiz için özel marka danışmanınızım.

Kataloğumuzun öne çıkan ürünleri:
• **Tazaa Bio-Cup** — Şeker kamışı ve bambudan üretilen sıcak/soğuk içecek bardakları (12.99 USD / 50'li paket).
• **Tazaa Preslenmiş Yaprak Tabaklar** — Ağaç kesilmeden dökülen yapraklardan buharla preslenen tabaklar (14.50 USD / 25'li paket).
• **Tazaa Sürdürülebilir Ham Eko-Plastikler (PHA Reçineleri)** — Denizde ve toprakta biyolojik olarak çözünen peletler (85.00 USD / 25 kg torba).
• **Tazaa Tohumlu Botanik Kartvizitler** — Toprağa ekildiğinde kır çiçekleri açan tohumlu kağıtlar (28.00 USD / 100'lü kutu).

Ürün ölçüleri, toptan sipariş fiyatları ve evde kompost yapma adımları hakkında size yardımcı olmaktan memnuniyet duyarım!`,

    hi: `**Tazaa** में आपका स्वागत है! मैं **Akyl AI** हूँ — हमारे सर्कुलर और पर्यावरण-अनुकूल उत्पादों के लिए आपका विशेष ब्रांड सलाहकार।

हमारे मुख्य उत्पाद:
• **Tazaa Bio-Cup** — गन्ने की खोई और बांस से बने गर्म/ठंडे पेय कप ($12.99 / 50 का पैक)।
• **Tazaa मोल्डेड लीफ प्लेट्स** — बिना पेड़ काटे गिरे पत्तों से बनी टिकाऊ थालियां ($14.50 / 25 का पैक)।
• **Tazaa कच्चा इको-प्लास्टिक (PHA रेजिन)** — समुद्र और मिट्टी में पूरी तरह अपघटित होने वाले बायो-पॉलिमर दाने ($85.00 / 25 किग्रा बैग)।
• **Tazaa बीज युक्त स्टेशनरी कार्ड** — मिट्टी में लगाने पर फूल उगाने वाले जीवित वनस्पति कार्ड ($28.00 / 100 का बॉक्स)।

मैं आपको उत्पाद विनिर्देशों, थोक मूल्यों और घरेलू खाद बनाने की प्रक्रिया में मार्गदर्शन करने के लिए तैयार हूँ!`,

    ko: `**Tazaa**에 오신 것을 환영합니다! 저는 친환경 순환 제품과 지속 가능한 소재를 위한 전담 브랜드 컨설턴트 **Akyl AI**입니다.

주요 카탈로그 제품 안내:
• **Tazaa Bio-Cup** — 사탕수수와 대나무 섬유로 성형된 100% 식물성 음료 컵 (USD 12.99 / 50개입).
• **Tazaa 몰드 낙엽 식기 플레이트** — 나무 벌목 없이 가을 낙엽을 증기 압착한 친환경 접시 (USD 14.50 / 25개입).
• **Tazaa 친환경 바이오 플라스틱 원료 (PHA 수지)** — 토양과 해수에서 생분해되는 펠렛 원료 (USD 85.00 / 25kg 백).
• **Tazaa 식재용 씨앗 스테이셔너리 카드** — 흙에 심으면 야생화가 피어나는 친환경 카드 (USD 28.00 / 100개입).

제품 치수, 대량 발주 견적, 주문 지원 및 가정 내 퇴비화 방법에 대해 언제든 문의해 주세요!`,

    ar: `مرحباً بك في **Tazaa**! أنا **Akyl AI** — مستشارك الحصري لمنتجاتنا الاستهلاكية الدائرية وموادنا البيئية المستدامة.

أبرز منتجاتنا الحصرية:
• **أكواب Tazaa Bio-Cup** — أكواب للمشروبات الباردة والساخنة مصنوعة من قصب السكر والخيزران (12.99 دولار / عبوة 50 كوب).
• **أطباق Tazaa من الأوراق المضغوطة** — أوانٍ متينة مصنوعة من أوراق الخريف المتساقطة دون قطع الأشجار (14.50 دولار / عبوة 25 طبق).
• **بلاستيك Tazaa الحيوي الخام (راتنجات PHA)** — حبيبات بوليمر حيوي تتحلل بأمان في التربة والبيئة البحرية (85.00 دولار / كيس 25 كجم).
• **بطاقات Tazaa النباتية ذات البذور** — بطاقات قطنية قابلة للزراعة تنبت أزهاراً برية عند سقيها (28.00 دولار / صندوق 100 بطاقة).

أنا هنا لمساعدتك في أي استفسار يخص المقاسات، أسعار الطلبيات بالجملة، وإرشادات التحلل المنزلي!`,

    fa: `به **Tazaa** خوش آمدید! من **Akyl AI** هستم — مشاور اختصاصی شما برای محصولات پایدار و پلاستیک‌های زیستی چرخه بسته.

محصولات برگزیده تظا:
• **لیوان‌های Tazaa Bio-Cup** — لیوان‌های نوشیدنی سرد و گرم از باگاس نیشکر و بامبو (۱۲.۹۹ دلار / بسته ۵۰ عددی).
• **بشقاب‌های قالبی از برگ Tazaa** — ظروف فشرده‌شده از برگ‌های پاییزی بدون قطع درختان (۱۴.۵۰ دلار / بسته ۲۵ عددی).
• **مواد اولیه پلاستیک زیستی Tazaa (رزین‌های PHA)** — گرانول‌های زیست‌پلیمر تجزیه‌پذیر در خاک و آب دریا (۸۵.۰۰ دلار / کیسه ۲۵ کیلوگرمی).
• **کارت‌های بذر گیاهی Tazaa** — کاغذ دست‌ساز حاوی بذر گل‌های وحشی که با کاشتن سبز می‌شود (۲۸.۰۰ دلار / جعبه ۱۰۰ عددی).

برای راهنمایی در مورد ابعاد دقیق، قیمت سفارش‌های عمده و نحوه کمپوست خانگی در خدمت شما هستم!`,

    ka: `მოგესალმებით **Tazaa**-ში! მე ვარ **Akyl AI** — თქვენი ექსკლუზიური ბრენდ-კონსულტანტი ეკოლოგიური ცირკულარული პროდუქტებისა და ბიო-მასალების საკითხებში.

ჩვენი კატალოგის გამორჩეული პროდუქტები:
• **Tazaa Bio-Cup** — შაქრის ლერწმისა და ბამბუკის ბოჭკოსგან დამზადებული ჭიქები ($12.99 / 50 ცალი).
• **Tazaa ფოთლის დაწნეხილი თეფშები** — ჩამოცვენილი შემოდგომის ფოთლებისგან დამზადებული ჭურჭელი ხეების მოჭრის გარეშე ($14.50 / 25 ცალი).
• **Tazaa ნედლი ეკო-პლასტმასი (PHA ფისები)** — ნიადაგსა და ზღვის წყალში სრულად ბიოდეგრადირებადი გრანულები ($85.00 / 25 კგ ტომარა).
• **Tazaa თესლიანი ბოტანიკური ბარათები** — გადამუშავებული ბამბის ბარათები, რომლებიც მიწაში დარგვისას ველურ ყვავილებად აღმოცენდება ($28.00 / 100 ცალი).

მზად ვარ გიპასუხოთ ტექნიკურ ზომებზე, საბითუმო ფასებზე და კომპოსტირების წესებზე!`,

    en: `Welcome to **Tazaa**. I am **Akyl AI**, your exclusive on-site brand consultant. Here are featured selections from our proprietary circular catalog:

• **Tazaa Bio-Cup** — Upcycled sugarcane bagasse and bamboo drinkware with carnauba seal (USD 12.99 / Pack of 50).
• **Tazaa Molded Fiber Dinner Plates** — Steam-pressed fallen autumn foliage tableware, 100% tree-free (USD 14.50 / Pack of 25).
• **Tazaa Sustainable Raw Eco-Plastics (PHA Resins)** — Marine & soil biodegradable polyhydroxyalkanoate compound pellets (USD 85.00 / 25 kg Bag).
• **Tazaa Botanical Seed Stationery Cards** — Handcrafted deckle-edge living seed cards that sprout wildflowers (USD 28.00 / Box of 100).
• **Tazaa Cassava Organic Bio-Bags** — 100% water-soluble, marine-safe shopping bags (USD 11.00 / Roll of 100).
• **Tazaa Mycelium Protective Packaging Shells** — Agricultural hemp shives bonded with mushroom mycelium (USD 24.00 / Set of 10).

I am available to assist you with technical dimensions, batch volume pricing, checkout navigation, and end-of-life backyard composting protocols.`,
  };

  return fallbacks[lang] || fallbacks.en;
}

// --------------------------------------------------------------------------
// 1. DUAL AI ENGINE 2: Autonomous Assistant & Brand Consultant (/api/chat)
// --------------------------------------------------------------------------
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, contextData, language = 'en' } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const langDirective = getLanguageDirective(language);

    const systemInstruction = `
================================================================================
CRITICAL MULTILINGUAL MANDATE (HIGHEST PRIORITY):
${langDirective}
YOU MUST RESPOND TO THE USER ENTIRELY IN THE CHOSEN LANGUAGE SPECIFIED ABOVE.
Never default or revert to English unless the user language is English ("en").
Translate product details, greetings, specifications, composting steps, and answers into the chosen language with natural grammar and vocabulary.
================================================================================

CRITICAL IDENTITY & PURPOSE:
Your official name is AKYL AI.
You are AKYL AI, the exclusive, highly sophisticated AI Consultant embedded natively within Tazaa.
Tazaa is a premium, standalone e-commerce store that manufactures and sells its own exclusive brand of fully eco-friendly, circular consumer goods and materials (such as bio-cups, fiber plates, and sustainable raw eco-plastics).
Your single responsibility is to act as an elite on-site brand consultant, assisting shoppers with product questions, catalog navigation, brand information, dimensions, pricing, materials, checkout, and circular stewardship.

CORE BOUNDARIES & CONSTRAINTS (STRICT RULES):
- NO Third-Party Aggregation: Tazaa is NOT a marketplace aggregator like Amazon anymore. You only recommend and discuss proprietary Tazaa-branded products.
- Exclusive Focus: Your sole function is customer consultation, guiding users smoothly through the available inventory and explaining the unique, circular lifecycle of Tazaa's products.
- Circular Stewardship: Educate customers on how Tazaa items are produced using eco-friendly materials and instruct them on how they can safely recycle or compost the items in their backyard garden or municipal compost.
- Tone: Authoritative, pristine, deeply helpful, and corporate. Avoid casual internet slang, emojis, or conversational filler.

PROPRIETARY TAZAA BRAND INVENTORY:
1. Tazaa Bio-Cup
   - [Product Name Label]: Tazaa Bio-Cup (Hot & Cold Beverage Service)
   - [Pricing Metadata]: USD 12.99 / Pack of 50
   - [Circular Eco-Badge]: 100% Home Compostable & Recyclable
   - Specs: 350ml (12 oz), Top Ø 88mm x Height 110mm. Formed from upcycled sugarcane bagasse and bamboo fiber with plant-based carnauba wax seal.
   - Circular Lifecycle: Breaks down naturally in home compost within 45-60 days or recycles in standard paper pulping.

2. Tazaa Molded Fiber Dinner Plates
   - [Product Name Label]: Tazaa Molded Fiber Dinner Plates (Pack of 25)
   - [Pricing Metadata]: USD 14.50 / Pack of 25
   - [Circular Eco-Badge]: 100% Tree-Free Backyard Compostable
   - Specs: Diameter 260mm (10.2"). Steam-pressed deciduous fallen foliage bound with organic starch and beeswax waterproofing.
   - Circular Lifecycle: Backyard composts in 45 days, returning nutrient-dense organic humus to garden soil.

3. Tazaa Sustainable Raw Eco-Plastics (PHA Resins)
   - [Product Name Label]: Tazaa Sustainable Raw Eco-Plastics (PHA Resin Compound Pellets)
   - [Pricing Metadata]: USD 85.00 / 25 kg Bag
   - [Circular Eco-Badge]: TÜV Austria OK Biodegradable Marine & Soil Certified
   - Specs: MFI 8-12 g/10min (190°C/2.16kg). Pure polyhydroxyalkanoate bio-resin pellets for injection molding and thermoforming.
   - Circular Lifecycle: Completely biodegrades in soil and marine environments without yielding synthetic microplastics.

4. Tazaa Espresso Upcycled Travel Tumbler
   - [Product Name Label]: Tazaa Espresso Upcycled Travel Tumbler (360ml)
   - [Pricing Metadata]: USD 16.50
   - [Circular Eco-Badge]: Carbon-Negative Grade A (-1.42 kg CO₂/unit)
   - Specs: 360ml, double-wall thermal insulation, made from rescued cafe espresso grounds.

5. Tazaa Botanical Seed Stationery Cards
   - [Product Name Label]: Tazaa Botanical Seed Stationery Cards (Box of 100)
   - [Pricing Metadata]: USD 28.00 / Box of 100
   - [Circular Eco-Badge]: Zero-Waste Living Seed Inoculant
   - Specs: 105 x 148 mm deckle-edge cards. Post-consumer cotton pulp embedded with non-GMO wildflower seeds cured strictly below 35°C.

6. Tazaa Cassava Organic Bio-Bags
   - [Product Name Label]: Tazaa Cassava Organic Bio-Bags (Roll of 100)
   - [Pricing Metadata]: USD 11.00 / Roll of 100
   - [Circular Eco-Badge]: 100% Water-Soluble Marine Safe
   - Specs: 300 x 450 mm. Organic cassava root matrix holding up to 4 kg weight. Dissolves safely in hot water.

7. Tazaa Mycelium Protective Packaging Shells
   - [Product Name Label]: Tazaa Mycelium Protective Packaging Shells (Set of 10)
   - [Pricing Metadata]: USD 24.00 / Set of 10
   - [Circular Eco-Badge]: Cradle to Cradle Gold Certified
   - Specs: 150 x 150 x 80 mm custom fit blocks. Agricultural hemp fiber grown with living mushroom fungal mycelium.

Context loaded: ${contextData ? JSON.stringify(contextData) : 'None'}
`;

    const formattedContents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    let replyText = '';
    try {
      const ai = getGeminiClient();
      const response = await generateWithModelFallback(async (model) => {
        return await ai.models.generateContent({
          model,
          contents: formattedContents,
          config: {
            systemInstruction,
          },
        });
      });
      replyText = response.text || '';
    } catch (chatErr: any) {
      console.warn('Gemini chat fallback used:', chatErr?.message);
      replyText = getLocalizedChatFallback(language);
    }

    return res.json({
      success: true,
      reply: replyText,
    });
  } catch (error: any) {
    console.error('Error in chat:', error);
    return res.json({
      success: true,
      reply: getLocalizedChatFallback(req.body?.language || 'en'),
    });
  }
});

// Mount Vite in dev or static dist in prod
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`TAZAA Dual AI Engine server running on port ${port}`);
  });
}

startServer();
