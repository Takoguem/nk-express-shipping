import type { Language } from "../types/site";

const MIN_PHONE_DIGITS = 3;
const MAX_PHONE_DIGITS = 15;

const SITE_SIGNATURES: Record<Language, string> = {
  en: "_Message sent from the NK Ultra Shipping Express website._",
  fr: "_Message envoyé depuis le site NK Ultra Shipping Express._",
};

function hasUsableLength(phone: string): boolean {
  return phone.length >= MIN_PHONE_DIGITS && phone.length <= MAX_PHONE_DIGITS;
}

/** Retourne uniquement les chiffres attendus par les liens wa.me. */
export function normalizePhoneNumber(phone: string): string {
  const trimmedPhone = phone.trim();
  const digits = trimmedPhone.replace(/\D/g, "");

  return trimmedPhone.startsWith("00") ? digits.slice(2) : digits;
}

/** Conserve un préfixe international pour produire un lien tel: lisible. */
export function normalizePhoneForTel(phone: string): string | null {
  const trimmedPhone = phone.trim();
  const digits = normalizePhoneNumber(trimmedPhone);

  if (!hasUsableLength(digits)) return null;

  const isInternational = trimmedPhone.startsWith("+") || trimmedPhone.startsWith("00");
  return isInternational ? `+${digits}` : digits;
}

export function createTelLink(phone: string): string | null {
  const normalizedPhone = normalizePhoneForTel(phone);
  return normalizedPhone ? `tel:${normalizedPhone}` : null;
}

/** Ajoute une signature unique à tous les messages WhatsApp générés par le site. */
export function appendSiteSignature(message: string, language: Language): string {
  const cleanMessage = message.trim();
  return cleanMessage
    ? `${cleanMessage}\n\n${SITE_SIGNATURES[language]}`
    : SITE_SIGNATURES[language];
}

export function createWhatsAppLink(
  phone: string,
  message: string,
  language: Language,
): string | null {
  const normalizedPhone = normalizePhoneNumber(phone);

  if (!hasUsableLength(normalizedPhone)) return null;

  const baseUrl = `https://wa.me/${normalizedPhone}`;
  return `${baseUrl}?text=${encodeURIComponent(appendSiteSignature(message, language))}`;
}
