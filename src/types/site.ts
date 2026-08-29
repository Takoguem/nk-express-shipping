export type Language = "fr" | "en";

export interface LocalizedText {
  fr: string;
  en: string;
}

export interface CompanyPartner {
  id: string;
  name: string;
  slogan?: string;
  logoFile: string;
  enabled: boolean;
}

export interface Country {
  id: string;
  nameFr: string;
  nameEn: string;
  shortName: string;
  flag: string;
  enabled: boolean;
}

export interface ShippingRoute {
  id: string;
  origin: string;
  destination: string;
  enabled: boolean;
}

export interface Departure {
  id: string;
  routeId: string;
  date: string;
  deadline?: string | null;
  statusFr?: string;
  statusEn?: string;
  noteFr?: string;
  noteEn?: string;
  enabled: boolean;
}

export interface ContactLocation {
  id: string;
  countryId: string;
  city: string | null;
  zones?: string[];
  phones: string[];
  address: string | null;
  purposeFr?: string;
  purposeEn?: string;
  purposeDescriptionFr?: string;
  purposeDescriptionEn?: string;
  directionsUrl?: string;
  enabled: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  altFr: string;
  altEn: string;
  width: number;
  height: number;
  enabled: boolean;
}

export interface GalleryConfig {
  enabled: boolean;
  mainImage: GalleryImage;
  images: GalleryImage[];
}

export interface ConfigurableService {
  id: string;
  titleFr: string;
  titleEn: string;
  descriptionFr?: string;
  descriptionEn?: string;
  enabled: boolean;
}

export interface PracticalInformation {
  id: string;
  labelFr: string;
  labelEn: string;
  valueFr: string;
  valueEn: string;
  enabled: boolean;
}

export interface FrequentlyAskedQuestion {
  id: string;
  questionFr: string;
  questionEn: string;
  answerFr: string;
  answerEn: string;
  enabled: boolean;
}

export interface SiteConfig {
  companyPartners: CompanyPartner[];
  countries: Country[];
  whatsapp: { primary: string };
  routes: ShippingRoute[];
  departures: Departure[];
  gallery: GalleryConfig;
  announcement: { enabled: boolean; textFr: string; textEn: string };
  contacts: ContactLocation[];
  services: ConfigurableService[];
  paymentMethods: Record<"usa" | "canada" | "cameroon", string[]>;
  delivery: { homeDelivery: boolean; pickup: boolean };
  practicalInformation: PracticalInformation[];
  faq: FrequentlyAskedQuestion[];
  socials: { tiktok: string; instagram: string; facebook: string };
  seo: { faviconPath: string };
}
