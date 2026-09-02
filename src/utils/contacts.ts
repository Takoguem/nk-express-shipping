import { siteConfig } from "../data/site-config";
import type { WhatsAppContact } from "../types/site";

type DepartureOrigin = keyof typeof siteConfig.whatsapp.departureContacts;

function isDepartureOrigin(countryId: string): countryId is DepartureOrigin {
  return countryId === "usa" || countryId === "canada" || countryId === "cameroon";
}

/** Retourne uniquement les contacts actifs correspondant aux identifiants fournis. */
export function getWhatsAppContacts(contactIds: string[]): WhatsAppContact[] {
  return contactIds
    .map((contactId) =>
      siteConfig.whatsapp.contacts.find(
        (contact) => contact.id === contactId && contact.enabled,
      ),
    )
    .filter((contact): contact is WhatsAppContact => contact !== undefined);
}

/** Sélectionne les contacts WhatsApp autorisés pour un pays de départ. */
export function getDepartureWhatsAppContacts(originCountryId: string): WhatsAppContact[] {
  if (!isDepartureOrigin(originCountryId)) return [];
  return getWhatsAppContacts(siteConfig.whatsapp.departureContacts[originCountryId]);
}
