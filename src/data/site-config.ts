/*
====================================================
INFORMATIONS DU SITE À MODIFIER ICI
====================================================

Ce fichier permet de modifier les informations
commerciales sans toucher au design du site.

Vous pouvez notamment modifier :
- les prochains départs
- les trajets
- les téléphones
- WhatsApp
- les adresses
- les points de dépôt
- les services
- les moyens de paiement
- les réseaux sociaux
- les annonces
- les informations pratiques

====================================================
*/

import galleryImage01 from "../assets/gallery/shipping-gallery-01.jpeg";
import galleryImage02 from "../assets/gallery/shipping-gallery-02.jpeg";
import galleryImage03 from "../assets/gallery/shipping-gallery-03.jpeg";
import galleryImage04 from "../assets/gallery/shipping-gallery-04.jpeg";
import galleryImage05 from "../assets/gallery/shipping-gallery-05.jpeg";
import galleryMainImage from "../assets/gallery/shipping-main.jpeg";
import type { SiteConfig } from "../types/site";

export const siteConfig: SiteConfig = {
  companyPartners: [
    {
      id: "nk-ultra-shipping",
      name: "NK Ultra Shipping Express",
      slogan: "Your Package, Our Priority",
      logoFile: "nk-ultra-shipping-logo.png",
      enabled: true,
    },
    {
      id: "express-air-shipping",
      name: "Express Air Shipping",
      logoFile: "express-air-shipping-logo.png",
      enabled: true,
    },
  ],
  countries: [
    { id: "usa", nameFr: "États-Unis", nameEn: "United States", shortName: "USA", flag: "🇺🇸", enabled: true },
    { id: "canada", nameFr: "Canada", nameEn: "Canada", shortName: "Canada", flag: "🇨🇦", enabled: true },
    { id: "cameroon", nameFr: "Cameroun", nameEn: "Cameroon", shortName: "Cameroun", flag: "🇨🇲", enabled: true },
  ],
  whatsapp: { primary: "+1 240 715 8407" },
  routes: [
    { id: "usa-cameroon", origin: "usa", destination: "cameroon", enabled: true },
    { id: "cameroon-usa", origin: "cameroon", destination: "usa", enabled: true },
    { id: "canada-cameroon", origin: "canada", destination: "cameroon", enabled: true },
    { id: "cameroon-canada", origin: "cameroon", destination: "canada", enabled: true },
  ],
  departures: [
  {
    id: "usa-cameroon-2026-08-30",
    routeId: "usa-cameroon",
    date: "2026-08-30",
    deadline: null,
    noteFr: "",
    noteEn: "",
    enabled: true,
  },
  {
    id: "cameroon-usa-2026-09-05",
    routeId: "cameroon-usa",
    date: "2026-09-05",
    deadline: null,
    noteFr: "",
    noteEn: "",
    enabled: true,
  },
],
  gallery: {
    enabled: true,
    mainImage: {
      id: "shipping-main",
      src: galleryMainImage,
      altFr: "Colis et bagages préparés avec soin pour une expédition internationale",
      altEn: "Parcels and luggage carefully prepared for international shipping",
      width: 605,
      height: 1280,
      enabled: true,
    },
    images: [
      {
        id: "shipping-gallery-01",
        src: galleryImage01,
        altFr: "Produits conditionnés et regroupés avant leur expédition",
        altEn: "Packaged products grouped together before shipping",
        width: 605,
        height: 773,
        enabled: true,
      },
      {
        id: "shipping-gallery-02",
        src: galleryImage02,
        altFr: "Effets personnels préparés pour le transport international",
        altEn: "Personal belongings prepared for international transport",
        width: 576,
        height: 1024,
        enabled: true,
      },
      {
        id: "shipping-gallery-03",
        src: galleryImage03,
        altFr: "Sacs et bagages rassemblés avant leur prise en charge",
        altEn: "Bags and luggage gathered before shipment handling",
        width: 576,
        height: 1024,
        enabled: true,
      },
      {
        id: "shipping-gallery-04",
        src: galleryImage04,
        altFr: "Vêtements et effets personnels triés avant expédition",
        altEn: "Clothing and personal belongings sorted before shipping",
        width: 1001,
        height: 1080,
        enabled: true,
      },
      {
        id: "shipping-gallery-05",
        src: galleryImage05,
        altFr: "Produits emballés et disposés pour préparer un envoi",
        altEn: "Packaged goods laid out while preparing a shipment",
        width: 486,
        height: 1080,
        enabled: true,
      },
    ],
  },
  announcement: { enabled: false, textFr: "", textEn: "" },
  contacts: [
    {
      id: "usa-bowie",
      countryId: "usa",
      city: "Bowie",
      zones: ["Bowie, Maryland"],
      phones: ["+1 240 715 8406", "+1 646 409 1168"],
      address: "12505 Quiverbrook Ct, Bowie, MD 20720",
      purposeFr: "Dépôt & récupération des colis",
      purposeEn: "Parcel drop-off & pickup",
      purposeDescriptionFr:
        "Vous pouvez déposer vos colis et récupérer vos colis disponibles à notre point de Bowie, Maryland.",
      purposeDescriptionEn:
        "You can drop off your parcels and collect available shipments at our Bowie, Maryland location.",
      directionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=12505%20Quiverbrook%20Ct%2C%20Bowie%2C%20MD%2020720",
      enabled: true,
    },
    {
      id: "canada",
      countryId: "canada",
      city: null,
      phones: ["+1 450 369 2148", "+1 450 369 2149"],
      address: null,
      enabled: true,
    },
    {
      id: "yaounde",
      countryId: "cameroon",
      city: "Yaoundé",
      phones: ["+237 675 069 501"],
      address: null,
      enabled: true,
    },
    {
      id: "douala",
      countryId: "cameroon",
      city: "Douala - Bonamoussadi",
      phones: ["+237 678 50 82 28"],
      address: null,
      enabled: true,
    },
    {
      id: "buea",
      countryId: "cameroon",
      city: "Buea",
      phones: ["+237 679 40 70 66"],
      address: null,
      enabled: true,
    },
  ],
  services: [],
  paymentMethods: {
  usa: [
    "Zelle",
    "PayPal",
    "Cash",
  ],
  canada: [
    "Interac e-Transfer",
    "PayPal",
    "Cash",
  ],
  cameroon: [
    "Orange Money",
    "MTN Mobile Money",
    "Cash",
  ],
},
  delivery: { homeDelivery: true, pickup: true },
  practicalInformation: [
    {
      id: "deposit-deadline",
      labelFr: "Date limite de dépôt",
      labelEn: "Drop-off deadline",
      valueFr: "Contactez-nous pour connaître la date limite du prochain départ.",
      valueEn: "Contact us for the next shipment's drop-off deadline.",
      enabled: true,
    },
    {
      id: "tracking",
      labelFr: "Suivi",
      labelEn: "Tracking",
      valueFr: "Disponible via WhatsApp avec votre référence de colis.",
      valueEn: "Available on WhatsApp with your shipment reference.",
      enabled: true,
    },
  ],
  faq: [
    {
      id: "routes",
      questionFr: "Quels trajets proposez-vous ?",
      questionEn: "Which routes do you offer?",
      answerFr: "Les trajets actuellement proposés relient le Cameroun aux États-Unis et au Canada, dans les deux sens.",
      answerEn: "Our current routes connect Cameroon with the United States and Canada in both directions.",
      enabled: true,
    },
    {
      id: "departures",
      questionFr: "Comment connaître les prochains départs ?",
      questionEn: "How can I find upcoming shipments?",
      answerFr: "Les dates actives sont publiées sur cette page. Pour les dernières disponibilités, contactez-nous sur WhatsApp.",
      answerEn: "Active dates are published on this page. Contact us on WhatsApp for the latest availability.",
      enabled: true,
    },
    {
      id: "quote",
      questionFr: "Comment obtenir un tarif ?",
      questionEn: "How can I request a quote?",
      answerFr: "Contactez-nous sur WhatsApp avec le type de colis, son poids, son volume, son origine et sa destination.",
      answerEn: "Contact us on WhatsApp with the parcel type, weight, volume, origin, and destination.",
      enabled: true,
    },
    {
      id: "accepted-items",
      questionFr: "Comment savoir si mon colis est accepté ?",
      questionEn: "How do I know whether my parcel is accepted?",
      answerFr: "Contactez-nous avant l'expédition afin que notre équipe confirme si votre article peut être transporté.",
      answerEn: "Contact us before shipping so our team can confirm whether your item can be transported.",
      enabled: true,
    },
    {
      id: "tracking",
      questionFr: "Comment suivre mon colis ?",
      questionEn: "How can I track my shipment?",
      answerFr: "Le suivi s'effectue sur WhatsApp. Indiquez votre référence de colis à notre équipe.",
      answerEn: "Tracking is handled on WhatsApp. Share your shipment reference with our team.",
      enabled: true,
    },
    {
      id: "drop-off",
      questionFr: "Où déposer mon colis ?",
      questionEn: "Where can I drop off my parcel?",
      answerFr: "Contactez-nous pour connaître le point de dépôt adapté à votre localisation.",
      answerEn: "Contact us for the drop-off location that applies to your area.",
      enabled: true,
    },
    {
      id: "delivery",
      questionFr: "Proposez-vous la livraison ?",
      questionEn: "Do you offer delivery?",
      answerFr: "Oui. La livraison à domicile et le retrait sont disponibles. Les modalités dépendent de la destination.",
      answerEn: "Yes. Home delivery and pickup are available. Terms depend on the destination.",
      enabled: true,
    },
    {
  id: "payment",
  questionFr: "Quels moyens de paiement acceptez-vous ?",
  questionEn: "Which payment methods do you accept?",
  answerFr:
    "Aux États-Unis, nous acceptons Zelle, PayPal et les paiements en espèces. Au Canada, nous acceptons Interac e-Transfer, PayPal et les paiements en espèces. Au Cameroun, nous acceptons Orange Money, MTN Mobile Money et les paiements en espèces. Contactez-nous pour confirmer le moyen de paiement disponible pour votre envoi.",
  answerEn:
    "In the United States, we accept Zelle, PayPal, and cash payments. In Canada, we accept Interac e-Transfer, PayPal, and cash payments. In Cameroon, we accept Orange Money, MTN Mobile Money, and cash payments. Contact us to confirm the payment method available for your shipment.",
  enabled: true,
},
  ],
  socials: { tiktok: "https://www.tiktok.com/@nkultrashipping?_r=1&_t=ZS-99G47ugLHKz", 
    instagram: "", facebook: "" },
  seo: { faviconPath: "" },
};
