import type { Language } from "../types/site";

export type QuickActionType = "quote" | "tracking" | "item-check";

export interface QuickActionFormData {
  item: string;
  weight: string;
  quantity: string;
  reference: string;
}

function clean(value: string): string {
  return value.trim();
}

function englishOrigin(name: string): string {
  return name === "USA" ? "the USA" : name;
}

function englishDestination(name: string): string {
  return name === "USA" ? "the USA" : name;
}

function frenchOrigin(name: string): string {
  return name === "États-Unis" ? "des États-Unis" : `du ${name}`;
}

function frenchDestination(name: string): string {
  return name === "États-Unis" ? "les États-Unis" : `le ${name}`;
}

/** Compose le message d’un groupe de départ dans la langue du contact choisi. */
export function buildDepartureMessage(
  origin: string,
  destination: string,
  language: Language,
): string {
  return language === "fr"
    ? `Bonjour, je souhaite obtenir plus d’informations concernant le prochain départ ${origin} → ${destination}.`
    : `Hello, I would like more information about the upcoming ${origin} → ${destination} shipment.`;
}

/** Compose les trois demandes rapides sans stocker les données du formulaire. */
export function buildQuickActionMessage(
  action: QuickActionType,
  origin: string,
  destination: string,
  formData: QuickActionFormData,
  language: Language,
): string {
  const item = clean(formData.item);
  const weight = clean(formData.weight);
  const quantity = clean(formData.quantity);
  const reference = clean(formData.reference);

  if (action === "tracking") {
    return language === "fr"
      ? `Bonjour, je souhaite connaître le statut de mon colis expédié ${frenchOrigin(origin)} vers ${frenchDestination(destination)}.\n\nRéférence du colis : ${reference || "Non communiquée"}`
      : `Hello, I would like to check the status of my shipment from ${englishOrigin(origin)} to ${englishDestination(destination)}.\n\nShipment reference: ${reference || "Not provided"}`;
  }

  if (action === "item-check") {
    return language === "fr"
      ? `Bonjour, je souhaite vérifier si l’article suivant peut être expédié ${frenchOrigin(origin)} vers ${frenchDestination(destination)} :\n\nArticle : ${item || "Non précisé"}\n\nPouvez-vous me confirmer s’il est accepté et m’indiquer s’il existe des conditions particulières ?`
      : `Hello, I would like to check whether the following item can be shipped from ${englishOrigin(origin)} to ${englishDestination(destination)}:\n\nItem: ${item || "Not specified"}\n\nCould you please confirm whether it is accepted and let me know if any special conditions apply?`;
  }

  const details = language === "fr"
    ? [
        item ? `Article : ${item}` : "",
        weight ? `Poids approximatif : ${weight}` : "",
        quantity ? `Quantité : ${quantity}` : "",
      ]
    : [
        item ? `Item: ${item}` : "",
        weight ? `Approximate weight: ${weight}` : "",
        quantity ? `Quantity: ${quantity}` : "",
      ];
  const detailBlock = details.filter(Boolean).join("\n");

  if (language === "fr") {
    return [
      `Bonjour, je souhaite obtenir un devis pour l’expédition d’un colis ${frenchOrigin(origin)} vers ${frenchDestination(destination)}.`,
      detailBlock,
      "Pouvez-vous m’indiquer le tarif applicable ?",
    ].filter(Boolean).join("\n\n");
  }

  return [
    `Hello, I would like to request a quote for shipping a parcel from ${englishOrigin(origin)} to ${englishDestination(destination)}.`,
    detailBlock,
    "Could you please provide me with the applicable rate?",
  ].filter(Boolean).join("\n\n");
}
