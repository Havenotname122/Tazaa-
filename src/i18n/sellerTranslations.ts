import { SupportedLanguage, EcoProductCategory } from '../types';

export interface SellerPortalI18n {
  portalTitle: string;
  portalBadge: string;
  creatorStudio: string;
  portalSub: string;
  tabListProduct: string;
  tabMyStore: string;
  addAnotherProduct: string;
  listingSpecTitle: string;
  listingSpecSub: string;
  productNameLabel: string;
  productNamePlaceholder: string;
  categoryLabel: string;
  catBioplastic: string;
  catMoldedPackaging: string;
  catUpcycledTextiles: string;
  catRecycledHardware: string;
  catBioIngredients: string;
  wasteSourceLabel: string;
  wasteSourceHint: string;
  wasteSourcePlaceholder: string;
  compositionChips: string[];
  priceLabel: string;
  pricePlaceholder: string;
  qtyLabel: string;
  qtyPlaceholder: string;
  unitOptions: Record<string, string>;
  descLabel: string;
  descSub: string;
  descPlaceholder: string;
  akylTitle: string;
  akylSub: string;
  akylAnalyzeBtn: string;
  akylVerifyingBtn: string;
  ecoScoreCertLabel: string;
  netLcaLabel: string;
  optimalPriceLabel: string;
  applyRecPrice: string;
  compostDaysText: string;
  verificationNotesText: string;
  imageUploadLabel: string;
  dragDropText: string;
  browseFiles: string;
  dragDropHint: string;
  imageLoadedText: string;
  orUseSample: string;
  sampleCoffee: string;
  sampleLeaf: string;
  sampleSeed: string;
  sampleBiopot: string;
  resetBtn: string;
  publishBtn: string;
  publishSuccessSuffix: string;
  livePreviewTitle: string;
  livePreviewSub: string;
  standardsTitle: string;
  standardsSub: string;
  standardsRules: string[];
  itemsSold: string;
  totalRevenue: string;
  wasteDiverted: string;
  activeListingsCount: string;
  trendMonth: string;
  walletPayoutNotice: string;
  circularOffsetNotice: string;
  tierVerifiedNotice: string;
  myListingsTitle: string;
  myListingsSub: string;
  editBtn: string;
  pauseListingBtn: string;
  resumeListingBtn: string;
  deleteBtn: string;
  confirmDeletePrompt: string;
  wasteMaterialLabel: string;
  priceLabelShort: string;
  inventoryLabelShort: string;
  inStockLabel: string;
  statusActive: string;
  statusPaused: string;
  inquiriesTitle: string;
  inquiriesSub: string;
  thOrder: string;
  thInstitution: string;
  thProduct: string;
  thValue: string;
  thStatus: string;
  thActions: string;
  unitsRequested: string;
  statusPending: string;
  statusShipped: string;
  statusCompleted: string;
  editModalTitle: string;
  productTitleLabel: string;
  availableStockLabel: string;
  cancelBtn: string;
  saveChangesBtn: string;
}

const defaultEn: SellerPortalI18n = {
  portalTitle: 'Marketplace & Seller Portal',
  portalBadge: 'Sell Eco-Product',
  creatorStudio: 'Creator Studio',
  portalSub: 'Empower eco-creators who turn waste into products to list, verify, manage, and sell their upcycled creations directly to procurement partners.',
  tabListProduct: 'List a New Product',
  tabMyStore: 'My Eco-Store & Analytics',
  addAnotherProduct: 'Add Another Product',
  listingSpecTitle: 'Product Listing Specification',
  listingSpecSub: 'Provide technical material composition and batch quantities to attract corporate procurement partners.',
  productNameLabel: '1. Product Name',
  productNamePlaceholder: 'e.g. Upcycled Coffee-Ground Coaster Set, Molded Foliage Serving Tray',
  categoryLabel: '2. Category Selection',
  catBioplastic: 'Bioplastic Goods',
  catMoldedPackaging: 'Molded Leaf & Organic Packaging',
  catUpcycledTextiles: 'Upcycled Textiles',
  catRecycledHardware: 'Recycled Plastic Hardware',
  catBioIngredients: 'Bio-Ingredients / Raw Biomass',
  wasteSourceLabel: '3. Waste Source / Material Composition',
  wasteSourceHint: 'Specify precise waste %',
  wasteSourcePlaceholder: 'e.g. 80% Spent Coffee Grounds, 20% Potato Starch Binder',
  compositionChips: [
    '80% Spent Coffee Grounds, 20% Potato Starch Binder',
    '100% Fallen Foliage + Beeswax Waterproofing',
    '90% Shredded Office Cellulose + Wildflower Seeds',
    '100% Post-Industrial PET Flakes (Thermal Molded)',
    '85% Upcycled Cotton Denim Fiber + Bio-Resin',
    'Clean Pine Sawdust + Starch-Glycerol Biopolymer Matrix',
  ],
  priceLabel: 'Price per Unit / Batch',
  pricePlaceholder: 'e.g. 18.50',
  qtyLabel: 'Available Quantity / Batch Size',
  qtyPlaceholder: '100',
  unitOptions: {
    units: 'units',
    sets: 'sets',
    packs: 'packs',
    kg: 'kg',
    liters: 'liters',
  },
  descLabel: '5. Product Description & Environmental Story',
  descSub: 'Explain sustainability impact & care',
  descPlaceholder: 'Explain the environmental impact, raw waste collection origin, manufacturing technique, biodegradability timeline, and safe usage guidelines...',
  akylTitle: 'AKYL AI Sustainability Certifier & Pricing Engine',
  akylSub: 'Evaluates bio-material compliance, calculates carbon-negative Eco-Score, and benchmarks market pricing.',
  akylAnalyzeBtn: 'Analyze & Verify with AKYL AI',
  akylVerifyingBtn: 'Verifying Material...',
  ecoScoreCertLabel: 'Eco-Score Certification',
  netLcaLabel: 'Net Environmental LCA',
  optimalPriceLabel: 'Optimal Market Price',
  applyRecPrice: 'Apply Rec:',
  compostDaysText: 'Compostable in 45 days',
  verificationNotesText: 'AKYL AI Circular Verifier confirmed 100% petrochemical-free composition. Compliant with EN 13432 compostability and zero microplastic toxicity thresholds.',
  imageUploadLabel: '7. Product Image Upload',
  dragDropText: 'Drag & drop product photo here, or',
  browseFiles: 'browse files',
  dragDropHint: 'Supports high-resolution JPG, PNG, WEBP up to 10MB',
  imageLoadedText: 'Image loaded! Click or drop new file to replace',
  orUseSample: 'Or use a sample image:',
  sampleCoffee: 'Coffee Coasters',
  sampleLeaf: 'Leaf Plates',
  sampleSeed: 'Seed Paper',
  sampleBiopot: 'Bio-Polymer Pots',
  resetBtn: 'Reset Form',
  publishBtn: 'Publish to Eco-Marketplace',
  publishSuccessSuffix: 'has been published to the Eco-Marketplace!',
  livePreviewTitle: 'Live Card Preview',
  livePreviewSub: 'Preview how your item appears to buyers',
  standardsTitle: 'Creator Quality Standards',
  standardsSub: 'Procurement Partner Criteria',
  standardsRules: [
    'Must divert at least 70% post-consumer or organic waste material.',
    'Zero microplastics: binding matrices must degrade cleanly in compost.',
    'Seed products must be dried below 35°C to preserve germination viability.',
  ],
  itemsSold: 'Items Sold',
  totalRevenue: 'Total Revenue',
  wasteDiverted: 'Waste Diverted (kg)',
  activeListingsCount: 'Active Listings',
  trendMonth: '+18.4% this month',
  walletPayoutNotice: 'Payout routed via Eco-Wallet',
  circularOffsetNotice: 'Certified Circular Offset',
  tierVerifiedNotice: 'Tier 1 Creator Verified',
  myListingsTitle: 'My Active Product Listings',
  myListingsSub: 'Manage stock, pause availability, or adjust price points for purchasing institutions.',
  editBtn: 'Edit',
  pauseListingBtn: 'Pause Listing',
  resumeListingBtn: 'Resume Listing',
  deleteBtn: 'Delete',
  confirmDeletePrompt: 'Are you sure you want to delete this product listing?',
  wasteMaterialLabel: 'Waste Material:',
  priceLabelShort: 'Price',
  inventoryLabelShort: 'Inventory',
  inStockLabel: 'in stock',
  statusActive: 'Active',
  statusPaused: 'Paused',
  inquiriesTitle: 'Buyer Inquiries & Procurement Orders',
  inquiriesSub: 'Incoming purchase requests from corporate Procurement Partners and Purchasing Institutions.',
  thOrder: 'Order / PO #',
  thInstitution: 'Procurement Institution',
  thProduct: 'Product & Qty',
  thValue: 'Order Value',
  thStatus: 'Status',
  thActions: 'Actions',
  unitsRequested: 'units requested',
  statusPending: 'Pending',
  statusShipped: 'Shipped',
  statusCompleted: 'Completed',
  editModalTitle: 'Edit Product Listing',
  productTitleLabel: 'Product Title',
  availableStockLabel: 'Available Stock',
  cancelBtn: 'Cancel',
  saveChangesBtn: 'Save Changes',
};

export const SELLER_TRANSLATIONS: Record<SupportedLanguage, SellerPortalI18n> = {
  en: defaultEn,
  ru: {
    ...defaultEn,
    portalTitle: 'Маркетплейс и кабинет продавца',
    portalBadge: 'Продать эко-продукт',
    creatorStudio: 'Студия эко-создателей',
    tabListProduct: 'Опубликовать товар',
    tabMyStore: 'Мой эко-магазин',
    publishBtn: 'Опубликовать в маркетплейсе',
    editBtn: 'Изменить',
    deleteBtn: 'Удалить',
  },
  ky: {
    ...defaultEn,
    portalTitle: 'Базар жана сатуучунун кабинети',
    portalBadge: 'Эко-продукт сатуу',
    tabListProduct: 'Жаңы продукт кошуу',
    tabMyStore: 'Менин дүкөнүм',
    publishBtn: 'Маркетплейске жарыялоо',
  },
  de: { ...defaultEn },
  es: { ...defaultEn },
  zh: { ...defaultEn },
  pt: { ...defaultEn },
  fr: { ...defaultEn },
  it: { ...defaultEn },
  tr: { ...defaultEn },
  hi: { ...defaultEn },
  ko: { ...defaultEn },
  ar: { ...defaultEn },
  fa: { ...defaultEn },
  ka: { ...defaultEn },
};

export function getRegionalDefaultCurrency(country?: string, region?: string): 'USD' | 'EUR' | 'KZT' | 'KGS' {
  const c = (country || '').toLowerCase();
  const r = (region || '').toLowerCase();
  if (c.includes('kyrgyzstan') || r.includes('central asia')) {
    if (c.includes('kazakhstan')) return 'KZT';
    return 'KGS';
  }
  if (
    r.includes('europe') ||
    ['germany', 'france', 'spain', 'italy', 'netherlands', 'portugal', 'austria', 'belgium'].some(
      (eu) => c.includes(eu)
    )
  ) {
    return 'EUR';
  }
  if (c.includes('kazakhstan')) {
    return 'KZT';
  }
  return 'USD';
}

export function getLocalizedCategoryName(
  category: EcoProductCategory,
  lang: SupportedLanguage
): string {
  const dict = SELLER_TRANSLATIONS[lang] || SELLER_TRANSLATIONS.en;
  switch (category) {
    case 'Bioplastic Goods':
      return dict.catBioplastic;
    case 'Molded Leaf & Organic Packaging':
      return dict.catMoldedPackaging;
    case 'Upcycled Textiles':
      return dict.catUpcycledTextiles;
    case 'Recycled Plastic Hardware':
      return dict.catRecycledHardware;
    case 'Bio-Ingredients / Raw Biomass':
      return dict.catBioIngredients;
    default:
      return category;
  }
}
