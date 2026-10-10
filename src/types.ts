export type SupportedLanguage =
  | 'en'
  | 'ru'
  | 'ky'
  | 'es'
  | 'zh'
  | 'de'
  | 'pt'
  | 'hi'
  | 'ko'
  | 'fr'
  | 'it'
  | 'tr'
  | 'ar'
  | 'fa'
  | 'ka';

export type SupportedCurrency = 'USD' | 'KGS' | 'EUR';

export type UserRole = 'Procurement Partner' | 'Purchasing Institution' | 'Verified Supplier';

export interface UserAccountProfile {
  id: string;
  name: string;
  email: string;
  userRole: UserRole;
  organizationName: string;
  ecoTier: string;
  avatarInitials: string;
  country: string;
  region: string;
  totalWasteProcessedKg: number;
  totalCo2SavedKg: number;
  walletBalanceKgs: number;
  walletBalanceUsd: number;
  savedRecipesCount: number;
  procurementBudgetUsd: number;
}

export interface MaterialIngredient {
  name: string;
  ratioOrAmount: string;
  role: string;
  isFromDetectedWaste: boolean;
  alternative?: string;
}

export interface EcoRecipeStep {
  stepNumber: number;
  title: string;
  instruction: string;
  temperatureAlert?: string;
  proTip?: string;
}

export interface ProductionRoute {
  routeId: string;
  category: 'biopolymer_film' | 'leaf_tableware' | 'seed_paper' | 'molded_composite' | 'recycling_payout' | 'recycling_hub';
  categoryLabel: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estTime: string;
  cureTime: string;
  summary: string;
  ratios_and_ingredients: MaterialIngredient[];
  binding_and_waterproofing?: {
    binderRecommended: string;
    waterproofingMethod: string;
  };
  seed_integration?: {
    isApplicable: boolean;
    recommendedSeeds: string[];
    maxDryingTemperature: string;
    survivalInstructions: string;
  };
  processing_parameters?: {
    grinding: string;
    molding: string;
    pressing: string;
    drying: string;
  };
  recipe_steps: EcoRecipeStep[];
  eco_impact: {
    co2Saved: string;
    plasticPrevented: string;
    lifecycle: string;
  };
  commercialPotential?: {
    estCostPerUnit: string;
    marketSellingPrice: string;
    profitMargin: string;
  };
}

export interface MultiRecipeAnalysisResponse {
  detected_materials: string[];
  rawMassEstimateKg: number;
  overallCategory: 'Organic Cellulose & Food Waste' | 'Synthetic Polymers & Recyclables' | 'Complex Mixed Waste' | string;
  isSafeForHomeBioProduction: boolean;
  safetyWarning?: string;
  recyclingPayoutEstimate: {
    materialType: string;
    resinCode?: string;
    estPayoutKgs: number;
    estPayoutUsd: number;
    recommendedCenter: string;
  };
  productionRoutes: ProductionRoute[];
}

export interface CausePercentage {
  factor: string;
  percentage: number;
  detail: string;
}

export interface DiagnosticReport {
  defectName: string;
  qualityScore: number;
  qualityGrade: string;
  primaryRootCause: string;
  causeBreakdown: CausePercentage[];
  syntheticContaminationRisk: {
    detected: boolean;
    riskLevel: string;
    detectionMethod: string;
  };
  whatToAdd: {
    ingredient: string;
    amount: string;
    purpose: string;
  }[];
  salvageProcedure: string[];
  preventionRules: string[];
}

export interface QualityTestDiagnosis {
  defectName?: string;
  qualityScore: number;
  qualityGrade: string;
  primaryIssue: string;
  chemicalExplanation: string;
  syntheticContaminationRisk: {
    detected: boolean;
    riskLevel: string;
    detectionMethod: string;
  };
  whatToAdd: {
    ingredient: string;
    amount: string;
    reason?: string;
    purpose?: string;
  }[];
  fixInstructions: string[];
  preventionTips: string[];
}

export interface EcoAIAnalysisResult {
  detected_materials: string[];
  is_biodegradable: boolean;
  material_category: string;
  recommendation_type: 'BIO_PRODUCT' | 'RECYCLING_CENTER';
  product_options?: string[];
  non_viable_reason?: string;
  recipe_title?: string;
  summary?: string;
  ratios_and_ingredients: MaterialIngredient[];
  binding_and_waterproofing?: {
    binderRecommended: string;
    waterproofingMethod: string;
  };
  seed_integration?: {
    isApplicable: boolean;
    recommendedSeeds: string[];
    maxDryingTemperature: string;
    survivalInstructions: string;
  };
  recipe_steps: EcoRecipeStep[];
  processing_details?: {
    grinding: string;
    molding: string;
    pressing: string;
    drying: string;
  };
  alternative_methods?: {
    title: string;
    description: string;
    keyMaterials: string[];
  }[];
  eco_impact?: {
    co2Saved: string;
    treesEquivalent: string;
    description: string;
  };
  recycling_info?: {
    resinCode: string;
    stepsToRecycle: string[];
    estimatedEarnings: string;
  };
}

export interface LocalSupplierStation {
  id: string;
  name: string;
  city: string;
  country?: string;
  region?: string;
  district: string;
  distanceKm: number;
  acceptedMaterials: string[];
  payoutRateKgsPerKg: number;
  payoutRateUsdPerKg: number;
  address: string;
  phone: string;
  whatsapp: string;
  operatingHours: string;
  isVerified: boolean;
}

export interface CareerOpportunity {
  id: string;
  title: string;
  businessModel: string;
  category: 'franchise' | 'employment' | 'startup' | 'supply_contract';
  compensationKgs: string;
  compensationUsd: string;
  marginOrSalary: string;
  partnerOrganization: string;
  location: string;
  requirements: string[];
  description: string;
  contactAction: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  matchedSupplierOrCareer?: {
    type: 'supplier' | 'career';
    name: string;
    detail: string;
  };
}

export interface SampleWastePhoto {
  id: string;
  imageSrc: string;
  title: string;
  category: string;
  wasteType: 'leaves' | 'paper' | 'synthetic_bottle' | 'cotton' | 'wood' | 'mixed';
  targetProduct: string;
}

export interface ReadyEcoProduct {
  id: string;
  badge: string;
  priceRange: string;
  category: string;
  name: string;
  tagline: string;
  material: string;
  country?: string;
  region?: string;
  decompositionTime: string;
  whyItsGood: string[];
  retailerName: string;
  buyUrl: string;
  whereToBuyLink?: string;
  certifications?: string[];
}

export interface PantrySupply {
  id: string;
  name: string;
  householdRole: string;
  typicalPrice: string;
  chemicalFunction: string;
  country?: string;
  region?: string;
  whereToBuyLocally: string;
  onlineOption: string;
  standardHomeAlternative?: string;
  whereLocally?: string;
  onlineLink?: string;
}

export interface QualityTestGuideline {
  id: string;
  name: string;
  instructions: string;
  symptomOptions: string[];
}

export type EcoProductCategory =
  | 'Bioplastic Goods'
  | 'Molded Leaf & Organic Packaging'
  | 'Upcycled Textiles'
  | 'Recycled Plastic Hardware'
  | 'Bio-Ingredients / Raw Biomass';

export interface SellerProductListing {
  id: string;
  name: string;
  category: EcoProductCategory;
  wasteSource: string;
  price: number;
  currency: string;
  quantity: number;
  unit: string;
  description: string;
  ecoScoreBadge: string;
  carbonOffsetKg: number;
  certifications: string[];
  imageUrl: string;
  status: 'active' | 'paused';
  dateListed: string;
  viewsCount: number;
  salesCount: number;
}

export interface BuyerOrderInquiry {
  id: string;
  orderNumber: string;
  buyerName: string;
  buyerOrganization: string;
  buyerRole: 'Procurement Partner' | 'Purchasing Institution';
  country: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  currency: string;
  status: 'Pending' | 'Shipped' | 'Completed';
  date: string;
  contactEmail: string;
  deliveryAddress: string;
}

export interface VerifiedSupplier {
  id: string;
  companyName: string;
  registrationNumber: string;
  category: 'eco_plastic' | 'carbon_offsets' | 'renewable_hardware' | 'biodegradable_packaging' | 'sustainable_textiles' | 'waste_to_energy';
  categoryLabel: string;
  primaryCommodity: string;
  specifications: string;
  moq: string;
  capacityPerMonth: string;
  spotPriceUsd: number;
  unitLabel: string;
  certifications: string[];
  country: string;
  city: string;
  facilityAddress: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  esgRating: 'AAA' | 'AA' | 'A';
  deliveryTerms: string;
  isCoreEcoPlastic: boolean;
  technicalDataSheetSummary: string;
}

export interface WasteStreamPathway {
  pathwayName: string;
  methodType: 'Chemical' | 'Mechanical' | 'Thermochemical' | 'Biological';
  yieldPercentage: string;
  processingSteps: string[];
  chemicalReagentsOrCompatibilizers: string;
  temperatureAndPressure: string;
  keyMachinery: string;
  carbonOffsetPerTonKg: number;
  commercialEndProduct: string;
  matchedSupplierCategory: string;
}

export interface WasteStreamMatrixEntry {
  id: string;
  streamName: string;
  streamCategory: 'e_waste' | 'industrial_byproduct' | 'organic_biomass' | 'textiles' | 'polymer_blends';
  categoryLabel: string;
  description: string;
  sampleInputExamples: string[];
  primaryContaminants: string[];
  technicalPathways: WasteStreamPathway[];
}

export interface GreenSectorJobRequisition {
  id: string;
  requisitionId: string;
  roleTitle: string;
  industry: 'environmental_rd' | 'climate_science' | 'sustainability_consulting' | 'ecological_engineering' | 'green_tech';
  industryLabel: string;
  hiringEntity: string;
  esgSponsor: string;
  location: string;
  country: string;
  region: string;
  workModel: 'Hybrid' | 'Onsite' | 'Global Remote';
  experienceLevel: 'Fellowship / Early Career' | 'Mid-Senior Specialist' | 'Principal / Director';
  annualCompensationUsd: string;
  monthlyCompensationKgs: string;
  requiredQualifications: string[];
  coreResponsibilities: string[];
  keyTechnicalDomains: string[];
  applicationDeadline: string;
  isUrgentHiring: boolean;
}
