interface TranslationDictionary {
  meta: {
    title: string;
    description: string;
  };
  common: {
    whatsapp: string;
    contactUs: string;
    learnMore: string;
    available: string;
    phone: string;
    address: string;
  };
  partnerLabel: string;
  nav: {
    home: string;
    departures: string;
    gallery: string;
    routes: string;
    process: string;
    services: string;
    practical: string;
    contacts: string;
    pricing: string;
    faq: string;
  };
  header: {
    partnership: string;
    whatsapp: string;
    menu: string;
    openMenu: string;
    closeMenu: string;
    language: string;
    french: string;
    english: string;
  };
  announcement: {
    label: string;
    close: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    whatsapp: string;
    departures: string;
    quote: string;
    destinationsLabel: string;
    parcelLabel: string;
    parcelSupport: string;
  };
  partnership: {
    eyebrow: string;
    title: string;
    text: string;
    connector: string;
  };
  quickActions: {
    eyebrow: string;
    title: string;
    intro: string;
    quote: {
      title: string;
      text: string;
      button: string;
    };
    tracking: {
      title: string;
      text: string;
      button: string;
    };
    parcel: {
      title: string;
      text: string;
      button: string;
    };
    fromLabel: string;
    toLabel: string;
    chooseContact: string;
    noContacts: string;
    optionalLabel: string;
    itemLabel: string;
    quoteItemPlaceholder: string;
    weightLabel: string;
    weightPlaceholder: string;
    quantityLabel: string;
    quantityPlaceholder: string;
    referenceLabel: string;
    referencePlaceholder: string;
    referenceHint: string;
    checkItemLabel: string;
    checkItemPlaceholder: string;
  };
  departures: {
    eyebrow: string;
    title: string;
    intro: string;
    routeLabel: string;
    dateLabel: string;
    deadlineLabel: string;
    noteLabel: string;
    nextBadge: string;
    availableBadge: string;
    whatsappButton: string;
    emptyTitle: string;
    emptyText: string;
    emptyButton: string;
    upcomingDates: string;
    requestDetails: string;
    chooseContact: string;
    noContacts: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    intro: string;
    secondaryEyebrow: string;
    secondaryTitle: string;
    secondaryIntro: string;
    disclaimer: string;
  };
  pricing: {
    eyebrow: string;
    title: string;
    intro: string;
    scopeLabel: string;
    additionalFeesTitle: string;
    restrictionTitle: string;
    exchangeRateTitle: string;
    contactTitle: string;
    contactIntro: string;
    whatsappButton: string;
    confirmationNote: string;
  };
  routes: {
    eyebrow: string;
    title: string;
    intro: string;
    availableRoute: string;
    routeLabel: (origin: string, destination: string) => string;
  };
  process: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: readonly {
      title: string;
      description: string;
    }[];
  };
  quote: {
    eyebrow: string;
    title: string;
    text: string;
    button: string;
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    emptyText: string;
    emptyButton: string;
  };
  parcelRules: {
    eyebrow: string;
    title: string;
    text: string;
    disclaimer: string;
  };
  deliveryPickup: {
    eyebrow: string;
    title: string;
    homeDeliveryTitle: string;
    homeDeliveryText: string;
    pickupTitle: string;
    pickupText: string;
    note: string;
  };
  tracking: {
    eyebrow: string;
    title: string;
    text: string;
    button: string;
  };
  payments: {
    eyebrow: string;
    title: string;
    intro: string;
    countryLabel: (country: string) => string;
    emptyText: string;
  };
  practical: {
    eyebrow: string;
    title: string;
    intro: string;
    emptyText: string;
    deliveryLabel: string;
    deliveryValue: string;
    pickupLabel: string;
    pickupValue: string;
    trackingLabel: string;
    trackingValue: string;
    authorizedParcelsLabel: string;
    authorizedParcelsValue: string;
  };
  contacts: {
    eyebrow: string;
    title: string;
    intro: string;
    phonesLabel: string;
    zonesLabel: string;
    addressLabel: string;
    dropOffFallback: string;
    callButton: string;
    whatsappButton: string;
    primaryWhatsapp: string;
    directionsButton: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    intro: string;
    expand: (question: string) => string;
    collapse: (question: string) => string;
  };
  footer: {
    partnership: string;
    description: string;
    quickLinks: string;
    contact: string;
    followUs: string;
    disclaimer: string;
    copyright: (year: number) => string;
  };
  accessibility: {
    skipToContent: string;
    mainNavigation: string;
    mobileNavigation: string;
    languageSelector: string;
    selectFrench: string;
    selectEnglish: string;
    logoAlt: (company: string) => string;
    routeVisual: string;
    floatingWhatsapp: string;
    callNumber: (phone: string) => string;
    whatsappNumber: (phone: string) => string;
    externalLink: (label: string) => string;
  };
  whatsappMessages: {
    contact: string;
    quote: string;
    tracking: string;
    parcelCheck: string;
    pricing: string;
    contactLocation: (location: string) => string;
  };
}

export const translations = {
  fr: {
    meta: {
      title: "NK Ultra Shipping Express × Express Air Shipping | USA, Canada et Cameroun",
      description:
        "Services d’expédition de colis entre les États-Unis, le Canada et le Cameroun, proposés par deux entreprises partenaires.",
    },
    common: {
      whatsapp: "WhatsApp",
      contactUs: "Nous contacter",
      learnMore: "En savoir plus",
      available: "Disponible",
      phone: "Téléphone",
      address: "Adresse",
    },
    partnerLabel: "Entreprises partenaires",
    nav: {
      home: "Accueil",
      departures: "Départs",
      gallery: "Photos",
      routes: "Trajets",
      process: "Comment ça marche",
      services: "Services",
      practical: "Infos pratiques",
      contacts: "Contacts",
      pricing: "Tarifs",
      faq: "FAQ",
    },
    header: {
      partnership: "Deux entreprises partenaires",
      whatsapp: "Contacter sur WhatsApp",
      menu: "Menu",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      language: "Langue",
      french: "Français",
      english: "Anglais",
    },
    announcement: {
      label: "Annonce importante",
      close: "Fermer l’annonce",
    },
    hero: {
      eyebrow: "Expédition internationale",
      title: "Vos colis entre le Cameroun, les États-Unis et le Canada.",
      subtitle:
        "Une solution simple pour vos expéditions internationales, avec des départs réguliers et un accompagnement personnalisé.",
      whatsapp: "Contacter sur WhatsApp",
      departures: "Voir les prochains départs",
      quote: "Demander un tarif",
      destinationsLabel: "Pays desservis",
      parcelLabel: "Votre colis",
      parcelSupport: "Accompagné à chaque étape",
    },
    partnership: {
      eyebrow: "Un partenariat de confiance",
      title: "Deux entreprises distinctes, un même engagement pour vos colis.",
      text: "NK Ultra Shipping Express et Express Air Shipping travaillent en partenariat pour faciliter vos expéditions entre le Cameroun, les États-Unis et le Canada.",
      connector: "en partenariat avec",
    },
    quickActions: {
      eyebrow: "Accès rapide",
      title: "Que souhaitez-vous faire ?",
      intro: "Choisissez une action, votre trajet, puis le contact WhatsApp correspondant au pays de départ.",
      quote: {
          title: "Demander un devis",
        text: "Consultez les tarifs publiés ou demandez une estimation pour un autre trajet.",
          button: "Demander un devis",
      },
      tracking: {
        title: "Suivre un colis",
        text: "Demandez le statut de votre envoi avec votre référence.",
        button: "Suivre mon colis",
      },
      parcel: {
          title: "Vérifier un article",
        text: "Confirmez qu’un article peut être transporté avant de l’expédier.",
          button: "Vérifier un article",
      },
      fromLabel: "Depuis",
      toLabel: "Vers",
      chooseContact: "Choisissez un contact",
      noContacts: "Aucun contact WhatsApp n’est disponible pour ce pays de départ.",
      optionalLabel: "Facultatif",
      itemLabel: "Article",
      quoteItemPlaceholder: "ex. vêtements, cosmétiques…",
      weightLabel: "Poids approximatif",
      weightPlaceholder: "ex. 8 kg",
      quantityLabel: "Quantité",
      quantityPlaceholder: "ex. 2",
      referenceLabel: "Référence du colis",
      referencePlaceholder: "Saisissez votre référence",
      referenceHint: "Fortement recommandée pour faciliter la recherche de votre colis.",
      checkItemLabel: "Quel article souhaitez-vous expédier ?",
      checkItemPlaceholder: "ex. cosmétiques, vêtements, électronique…",
    },
    departures: {
      eyebrow: "Calendrier des expéditions",
      title: "Prochains départs",
      intro: "Consultez les prochaines dates disponibles pour préparer votre envoi.",
      routeLabel: "Trajet",
      dateLabel: "Date de départ",
      deadlineLabel: "Date limite de dépôt",
      noteLabel: "À noter",
      nextBadge: "Prochain départ",
      availableBadge: "Disponible",
      whatsappButton: "Demander des informations",
      emptyTitle: "Nouvelles dates prochainement",
      emptyText:
        "Les prochaines dates d’expédition seront annoncées prochainement. Contactez-nous sur WhatsApp pour connaître les dernières disponibilités.",
      emptyButton: "Voir les disponibilités sur WhatsApp",
      upcomingDates: "Dates à venir",
      requestDetails: "Demander des détails",
      chooseContact: "Choisissez un contact WhatsApp",
      noContacts: "Aucun contact n’est disponible pour ce trajet.",
    },
    gallery: {
      eyebrow: "Notre activité",
      title: "Nos expéditions en images",
      intro:
        "Découvrez un aperçu de colis, bagages et effets personnels préparés avec attention avant leur acheminement.",
      secondaryEyebrow: "Sur le terrain",
      secondaryTitle: "D’autres préparations en images",
      secondaryIntro:
        "Une galerie de colis, bagages et effets personnels regroupés avant leur prise en charge.",
      disclaimer:
        "Ces images illustrent notre activité. Contactez-nous pour confirmer qu’un article peut être transporté.",
    },
    pricing: {
      eyebrow: "Grille tarifaire",
      title: "Tarifs d’expédition depuis le Cameroun",
      intro:
        "Tarifs publiés uniquement pour les expéditions du Cameroun vers les États-Unis et le Canada.",
      scopeLabel: "Trajets concernés",
      additionalFeesTitle: "Frais supplémentaires",
      restrictionTitle: "Restriction importante",
      exchangeRateTitle: "Paiements en USD",
      contactTitle: "Vous expédiez depuis le Cameroun ? Contactez-nous sur WhatsApp",
      contactIntro: "Choisissez le contact correspondant à votre ville de départ.",
      whatsappButton: "Écrire sur WhatsApp",
      confirmationNote:
        "Les catégories et tarifs ci-dessus concernent uniquement ce service. Confirmez l’acceptation et le prix applicable à votre colis avant l’expédition.",
    },
    routes: {
      eyebrow: "Nos liaisons",
      title: "Trajets disponibles",
      intro: "Nous organisons des expéditions entre le Cameroun, les États-Unis et le Canada dans les deux sens.",
      availableRoute: "Trajet disponible",
      routeLabel: (origin, destination) => `Trajet de ${origin} vers ${destination}`,
    },
    process: {
      eyebrow: "Simple et accompagné",
      title: "Comment ça marche ?",
      intro: "Notre équipe vous guide depuis votre première demande jusqu’à la réception de votre colis.",
      steps: [
        {
          title: "Contactez-nous",
          description: "Présentez votre besoin via WhatsApp ou par téléphone.",
        },
        {
          title: "Présentez votre colis",
          description: "Indiquez notamment le type de colis, la destination et les informations utiles.",
        },
        {
          title: "Déposez ou remettez votre colis",
          description: "Les modalités vous sont communiquées selon votre localisation.",
        },
        {
          title: "Expédition et réception",
          description: "Le colis est acheminé selon le trajet convenu.",
        },
      ],
    },
    quote: {
      eyebrow: "Tarif personnalisé",
      title: "Besoin d’un tarif ?",
      text: "Consultez nos tarifs publiés pour les expéditions Cameroun → USA / Canada. Pour les autres trajets ou situations particulières, contactez-nous afin d’obtenir un tarif.",
      button: "Obtenir un tarif sur WhatsApp",
    },
    services: {
      eyebrow: "Types d’envois",
      title: "Services et colis",
      intro: "Découvrez les options disponibles pour préparer votre envoi.",
      emptyText:
        "Nous transportons différents types de colis et effets personnels selon la destination. Contactez-nous avant l’expédition afin de confirmer que votre article peut être transporté.",
      emptyButton: "Vérifier mon colis",
    },
    parcelRules: {
      eyebrow: "Avant l’expédition",
      title: "Articles autorisés et restrictions",
      text: "Seuls les articles autorisés par la réglementation applicable dans les pays de départ, de transit et de destination sont acceptés. Certains articles peuvent être soumis à des restrictions ou nécessiter des documents particuliers. Contactez-nous avant tout envoi en cas de doute.",
      disclaimer: "Ces informations sont générales et ne constituent pas un avis juridique.",
    },
    deliveryPickup: {
      eyebrow: "Réception de votre envoi",
      title: "Livraison et retrait",
      homeDeliveryTitle: "Livraison disponible",
      homeDeliveryText: "La livraison à domicile est proposée selon les modalités applicables à votre destination.",
      pickupTitle: "Retrait en point de dépôt disponible",
      pickupText: "Votre colis peut être retiré au point de dépôt ou à l’agence indiqué par notre équipe.",
      note: "Les modalités dépendent de la destination. Contactez-nous pour connaître les options disponibles pour votre envoi.",
    },
    tracking: {
      eyebrow: "Suivi via WhatsApp",
      title: "Suivre mon colis",
      text: "Pour connaître le statut de votre envoi, contactez notre équipe sur WhatsApp en indiquant votre référence de colis.",
      button: "Suivre sur WhatsApp",
    },
    payments: {
      eyebrow: "Règlement",
      title: "Moyens de paiement",
      intro: "Les moyens de paiement disponibles sont présentés par pays lorsqu’ils sont confirmés.",
      countryLabel: (country) => `Moyens de paiement — ${country}`,
      emptyText: "Contactez-nous pour connaître les moyens de paiement actuellement disponibles.",
    },
    practical: {
      eyebrow: "Préparer votre envoi",
      title: "Informations pratiques",
      intro: "Retrouvez les informations utiles avant de nous confier votre colis.",
      emptyText: "Contactez-nous sur WhatsApp pour préparer votre envoi.",
      deliveryLabel: "Livraison à domicile",
      deliveryValue: "Disponible selon la destination.",
      pickupLabel: "Retrait",
      pickupValue: "Disponible en point de dépôt ou en agence selon la destination.",
      trackingLabel: "Suivi",
      trackingValue: "Disponible via WhatsApp avec votre référence de colis.",
      authorizedParcelsLabel: "Colis acceptés",
      authorizedParcelsValue: "Seuls les articles autorisés peuvent être transportés.",
    },
    contacts: {
      eyebrow: "Une équipe à votre écoute",
      title: "Contacts et points de dépôt",
      intro: "Choisissez le contact correspondant à votre pays ou à votre ville.",
      phonesLabel: "Numéros de téléphone",
      zonesLabel: "Zones desservies",
      addressLabel: "Adresse",
      dropOffFallback: "Contactez-nous pour connaître le point de dépôt.",
      callButton: "Appeler",
      whatsappButton: "Écrire sur WhatsApp",
      primaryWhatsapp: "WhatsApp principal",
      directionsButton: "Itinéraire",
    },
    faq: {
      eyebrow: "Questions fréquentes",
      title: "FAQ",
      intro: "Les réponses essentielles pour préparer et suivre votre envoi.",
      expand: (question) => `Afficher la réponse à la question : ${question}`,
      collapse: (question) => `Masquer la réponse à la question : ${question}`,
    },
    footer: {
      partnership: "Deux entreprises distinctes, partenaires pour vos expéditions.",
      description: "Expéditions entre le Cameroun, les États-Unis et le Canada.",
      quickLinks: "Liens rapides",
      contact: "Contact principal",
      followUs: "Suivez-nous",
      disclaimer: "Les informations relatives aux départs, disponibilités et modalités peuvent évoluer. Contactez-nous pour confirmation.",
      copyright: (year) => `© ${year} NK Ultra Shipping Express × Express Air Shipping. Tous droits réservés.`,
    },
    accessibility: {
      skipToContent: "Aller au contenu principal",
      mainNavigation: "Navigation principale",
      mobileNavigation: "Navigation mobile",
      languageSelector: "Choisir la langue",
      selectFrench: "Afficher le site en français",
      selectEnglish: "Afficher le site en anglais",
      logoAlt: (company) => `Logo de ${company}`,
      routeVisual: "Liaisons d’expédition entre les États-Unis, le Canada et le Cameroun",
      floatingWhatsapp: "Ouvrir la conversation WhatsApp",
      callNumber: (phone) => `Appeler le ${phone}`,
      whatsappNumber: (phone) => `Contacter le ${phone} sur WhatsApp`,
      externalLink: (label) => `${label} — ouvre un nouvel onglet`,
    },
    whatsappMessages: {
      contact: "Bonjour, je souhaite avoir plus d’informations sur vos services d’expédition.",
      quote: "Bonjour, je souhaite obtenir un tarif pour l’envoi d’un colis.",
      tracking: "Bonjour, je souhaite connaître le statut de mon colis. Ma référence est :",
      parcelCheck: "Bonjour, je souhaite vérifier si mon colis peut être expédié.",
      pricing:
        "Bonjour, je souhaite obtenir des informations concernant l’expédition d’un colis du Cameroun vers les États-Unis ou le Canada.",
      contactLocation: (location) =>
        `Bonjour, je souhaite contacter votre équipe à ${location}.`,
    },
  },
  en: {
    meta: {
      title: "NK Ultra Shipping Express × Express Air Shipping | USA, Canada & Cameroon",
      description:
        "Parcel shipping services between the United States, Canada, and Cameroon, provided by two partner companies.",
    },
    common: {
      whatsapp: "WhatsApp",
      contactUs: "Contact us",
      learnMore: "Learn more",
      available: "Available",
      phone: "Phone",
      address: "Address",
    },
    partnerLabel: "Partner companies",
    nav: {
      home: "Home",
      departures: "Departures",
      gallery: "Gallery",
      routes: "Routes",
      process: "How it works",
      services: "Services",
      practical: "Practical information",
      contacts: "Contacts",
      pricing: "Rates",
      faq: "FAQ",
    },
    header: {
      partnership: "Two partner companies",
      whatsapp: "Contact us on WhatsApp",
      menu: "Menu",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      language: "Language",
      french: "French",
      english: "English",
    },
    announcement: {
      label: "Important announcement",
      close: "Close announcement",
    },
    hero: {
      eyebrow: "International shipping",
      title: "Your parcels between Cameroon, the United States, and Canada.",
      subtitle:
        "A straightforward international shipping service with regular departures and personal support at every step.",
      whatsapp: "Contact us on WhatsApp",
      departures: "View upcoming departures",
      quote: "Request a quote",
      destinationsLabel: "Countries served",
      parcelLabel: "Your parcel",
      parcelSupport: "Supported at every step",
    },
    partnership: {
      eyebrow: "A trusted partnership",
      title: "Two distinct companies, one commitment to your parcels.",
      text: "NK Ultra Shipping Express and Express Air Shipping work in partnership to support shipments between Cameroon, the United States, and Canada.",
      connector: "in partnership with",
    },
    quickActions: {
      eyebrow: "Quick access",
      title: "What would you like to do?",
      intro: "Choose an action, your route, and then the WhatsApp contact for the country of origin.",
      quote: {
        title: "Request a quote",
        text: "View published rates or request an estimate for another route.",
        button: "Get a quote",
      },
      tracking: {
        title: "Track a shipment",
        text: "Ask for an update using your shipment reference.",
        button: "Track my shipment",
      },
      parcel: {
        title: "Check an item",
        text: "Confirm that an item can be transported before you ship it.",
        button: "Check my item",
      },
      fromLabel: "From",
      toLabel: "To",
      chooseContact: "Choose a contact",
      noContacts: "No WhatsApp contact is available for this country of origin.",
      optionalLabel: "Optional",
      itemLabel: "Item",
      quoteItemPlaceholder: "e.g. clothes, cosmetics…",
      weightLabel: "Approximate weight",
      weightPlaceholder: "e.g. 8 kg",
      quantityLabel: "Quantity",
      quantityPlaceholder: "e.g. 2",
      referenceLabel: "Shipment reference",
      referencePlaceholder: "Enter your reference",
      referenceHint: "Strongly recommended to help the team locate your shipment.",
      checkItemLabel: "What would you like to ship?",
      checkItemPlaceholder: "e.g. cosmetics, clothes, electronics…",
    },
    departures: {
      eyebrow: "Shipping schedule",
      title: "Upcoming departures",
      intro: "Check the next available dates and start preparing your shipment.",
      routeLabel: "Route",
      dateLabel: "Departure date",
      deadlineLabel: "Drop-off deadline",
      noteLabel: "Please note",
      nextBadge: "Next departure",
      availableBadge: "Available",
      whatsappButton: "Ask for details",
      emptyTitle: "New dates coming soon",
      emptyText:
        "Upcoming shipping dates will be announced soon. Contact us on WhatsApp for the latest availability.",
      emptyButton: "Check availability on WhatsApp",
      upcomingDates: "Upcoming dates",
      requestDetails: "Request details",
      chooseContact: "Choose a WhatsApp contact",
      noContacts: "No contact is available for this route.",
    },
    gallery: {
      eyebrow: "Our work",
      title: "Shipping in action",
      intro:
        "See a selection of parcels, luggage, and personal belongings carefully prepared before transport.",
      secondaryEyebrow: "Behind the scenes",
      secondaryTitle: "More shipment preparations",
      secondaryIntro:
        "A gallery of parcels, luggage, and personal belongings gathered before handling.",
      disclaimer:
        "These images illustrate our work. Contact us to confirm whether an item can be transported.",
    },
    pricing: {
      eyebrow: "Published rates",
      title: "Shipping Rates from Cameroon",
      intro:
        "Published rates apply only to shipments from Cameroon to the United States and Canada.",
      scopeLabel: "Applicable routes",
      additionalFeesTitle: "Additional fees",
      restrictionTitle: "Important restriction",
      exchangeRateTitle: "Payments in USD",
      contactTitle: "Shipping from Cameroon? Contact us on WhatsApp",
      contactIntro: "Choose the contact for your departure city.",
      whatsappButton: "Message on WhatsApp",
      confirmationNote:
        "The categories and rates above apply only to this service. Confirm that your item is accepted and verify the applicable rate before shipping.",
    },
    routes: {
      eyebrow: "Our connections",
      title: "Available routes",
      intro: "We arrange shipments between Cameroon, the United States, and Canada in both directions.",
      availableRoute: "Available route",
      routeLabel: (origin, destination) => `Route from ${origin} to ${destination}`,
    },
    process: {
      eyebrow: "Simple and supported",
      title: "How does it work?",
      intro: "Our team guides you from your first inquiry through to parcel collection or delivery.",
      steps: [
        {
          title: "Contact us",
          description: "Tell us what you need by WhatsApp or phone.",
        },
        {
          title: "Tell us about your parcel",
          description: "Share the parcel type, destination, and any other useful details.",
        },
        {
          title: "Drop off or hand over your parcel",
          description: "We will explain the available arrangements based on your location.",
        },
        {
          title: "Shipping and receipt",
          description: "Your parcel is transported along the agreed route.",
        },
      ],
    },
    quote: {
      eyebrow: "Personalized quote",
      title: "Need a quote?",
      text: "View our published Cameroon → USA / Canada rates. For other routes or special cases, contact us for a quote.",
      button: "Get a quote on WhatsApp",
    },
    services: {
      eyebrow: "Types of shipments",
      title: "Services and parcels",
      intro: "Explore the available options as you prepare your shipment.",
      emptyText:
        "We transport different types of parcels and personal belongings depending on the destination. Contact us before shipping so we can confirm whether your item can be transported.",
      emptyButton: "Check my item",
    },
    parcelRules: {
      eyebrow: "Before shipping",
      title: "Permitted items and restrictions",
      text: "Only items permitted under the applicable regulations in the countries of origin, transit, and destination are accepted. Some items may be restricted or require specific documentation. Contact us before shipping if you are unsure.",
      disclaimer: "This general information does not constitute legal advice.",
    },
    deliveryPickup: {
      eyebrow: "Receiving your shipment",
      title: "Delivery and pickup",
      homeDeliveryTitle: "Delivery available",
      homeDeliveryText: "Home delivery is offered under the arrangements available at your destination.",
      pickupTitle: "Pickup available",
      pickupText: "Your parcel can be collected from the drop-off location or office specified by our team.",
      note: "Options depend on the destination. Contact us to learn which options are available for your shipment.",
    },
    tracking: {
      eyebrow: "Tracking via WhatsApp",
      title: "Track my shipment",
      text: "To check the status of your shipment, contact our team on WhatsApp and include your shipment reference.",
      button: "Track on WhatsApp",
    },
    payments: {
      eyebrow: "Payment",
      title: "Payment methods",
      intro: "Available payment methods are shown by country once they have been confirmed.",
      countryLabel: (country) => `Payment methods — ${country}`,
      emptyText: "Contact us to learn about the payment methods currently available.",
    },
    practical: {
      eyebrow: "Prepare your shipment",
      title: "Practical information",
      intro: "Find useful information before entrusting your parcel to us.",
      emptyText: "Contact us on WhatsApp to prepare your shipment.",
      deliveryLabel: "Home delivery",
      deliveryValue: "Available depending on the destination.",
      pickupLabel: "Pickup",
      pickupValue: "Available from a drop-off location or office depending on the destination.",
      trackingLabel: "Tracking",
      trackingValue: "Available on WhatsApp with your shipment reference.",
      authorizedParcelsLabel: "Accepted parcels",
      authorizedParcelsValue: "Only permitted items can be transported.",
    },
    contacts: {
      eyebrow: "A team ready to help",
      title: "Contacts and drop-off locations",
      intro: "Choose the contact for your country or city.",
      phonesLabel: "Phone numbers",
      zonesLabel: "Areas served",
      addressLabel: "Address",
      dropOffFallback: "Contact us for the drop-off location.",
      callButton: "Call",
      whatsappButton: "Message on WhatsApp",
      primaryWhatsapp: "Main WhatsApp number",
      directionsButton: "Directions",
    },
    faq: {
      eyebrow: "Frequently asked questions",
      title: "FAQ",
      intro: "Essential answers to help you prepare and track your shipment.",
      expand: (question) => `Show the answer to: ${question}`,
      collapse: (question) => `Hide the answer to: ${question}`,
    },
    footer: {
      partnership: "Two distinct companies working together for your shipments.",
      description: "Shipping between Cameroon, the United States, and Canada.",
      quickLinks: "Quick links",
      contact: "Main contact",
      followUs: "Follow us",
      disclaimer: "Departure dates, availability, and shipping arrangements may change. Contact us to confirm the latest information.",
      copyright: (year) => `© ${year} NK Ultra Shipping Express × Express Air Shipping. All rights reserved.`,
      developerCredit: "Designed & developed by Bruel Junior Takoguem",
      developerContact: "Contact me",
      
    },
    accessibility: {
      skipToContent: "Skip to main content",
      mainNavigation: "Main navigation",
      mobileNavigation: "Mobile navigation",
      languageSelector: "Choose a language",
      selectFrench: "View the website in French",
      selectEnglish: "View the website in English",
      logoAlt: (company) => `${company} logo`,
      routeVisual: "Shipping connections between the United States, Canada, and Cameroon",
      floatingWhatsapp: "Open the WhatsApp conversation",
      callNumber: (phone) => `Call ${phone}`,
      whatsappNumber: (phone) => `Contact ${phone} on WhatsApp`,
      externalLink: (label) => `${label} — opens in a new tab`,
    },
    whatsappMessages: {
      contact: "Hello, I would like more information about your shipping services.",
      quote: "Hello, I would like to request a quote for shipping a parcel.",
      tracking: "Hello, I would like to check the status of my shipment. My reference is:",
      parcelCheck: "Hello, I would like to check whether my parcel can be shipped.",
      pricing:
        "Hello, I would like information about shipping a parcel from Cameroon to the USA or Canada.",
      contactLocation: (location) =>
        `Hello, I would like to contact your team in ${location}.`,
    },
  },
} as const satisfies Record<"fr" | "en", TranslationDictionary>;
