import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  CreditCard,
  HandHeart,
  Home,
  Info,
  MapPin,
  MessageCircle,
  Navigation,
  PackageCheck,
  Phone,
  Plane,
  SearchCheck,
  ShieldCheck,
  Store,
  Truck,
  WalletCards,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { siteConfig } from "../data/site-config";
import { translations } from "../data/translations";
import type { Language } from "../types/site";
import { WhatsAppContactPicker } from "../components/WhatsAppContactPicker";
import {
  buildDepartureMessage,
  buildQuickActionMessage,
  createTelLink,
  createWhatsAppLink,
  formatIsoDate,
  getDepartureWhatsAppContacts,
  getWhatsAppContacts,
  isIsoDateTodayOrFuture,
  sortByIsoDate,
} from "../utils";
import type { QuickActionFormData, QuickActionType } from "../utils";

interface SiteSectionsProps {
  language: Language;
}

interface SectionHeadingProps {
  id?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}

function SectionHeading({ id, eyebrow, title, intro, align = "left" }: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </div>
  );
}

function countryName(countryId: string, language: Language) {
  const country = siteConfig.countries.find((item) => item.id === countryId);
  if (!country) return null;
  return language === "fr" ? country.nameFr : country.nameEn;
}

function messageCountryName(countryId: string, language: Language) {
  const country = siteConfig.countries.find((item) => item.id === countryId);
  if (!country) return countryId;
  return language === "fr" ? country.messageNameFr : country.messageNameEn;
}

function routeDetails(routeId: string, language: Language) {
  const route = siteConfig.routes.find((item) => item.id === routeId && item.enabled);
  if (!route) return null;

  const originCountry = siteConfig.countries.find((item) => item.id === route.origin && item.enabled);
  const destinationCountry = siteConfig.countries.find(
    (item) => item.id === route.destination && item.enabled,
  );
  if (!originCountry || !destinationCountry) return null;

  return {
    route,
    origin: language === "fr" ? originCountry.nameFr : originCountry.nameEn,
    destination:
      language === "fr" ? destinationCountry.nameFr : destinationCountry.nameEn,
    originFlag: originCountry.flag,
    destinationFlag: destinationCountry.flag,
  };
}

function ActionCard({
  actionId,
  icon: Icon,
  title,
  text,
  label,
  active,
  onClick,
}: {
  actionId: QuickActionType;
  icon: LucideIcon;
  title: string;
  text: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`action-card${active ? " is-active" : ""}`}
      id={`quick-actions-${actionId}`}
      type="button"
      aria-pressed={active}
      onClick={onClick}
    >
      <span className="icon-badge"><Icon aria-hidden="true" size={22} /></span>
      <span className="action-card__copy">
        <strong>{title}</strong>
        <small>{text}</small>
      </span>
      <span className="action-card__link">{label}<ArrowRight aria-hidden="true" size={16} /></span>
    </button>
  );
}

function QuickActions({ language }: SiteSectionsProps) {
  const copy = translations[language];
  const routes = siteConfig.routes.filter((route) => route.enabled);
  const initialRoute = routes[0];
  const [action, setAction] = useState<QuickActionType>("quote");
  const [originId, setOriginId] = useState(initialRoute?.origin ?? "");
  const [destinationId, setDestinationId] = useState(initialRoute?.destination ?? "");
  const [formData, setFormData] = useState<QuickActionFormData>({
    item: "",
    weight: "",
    quantity: "",
    reference: "",
  });

  useEffect(() => {
    const selectActionFromHash = () => {
      const hashAction = window.location.hash.replace("#quick-actions-", "");
      if (hashAction === "quote" || hashAction === "tracking" || hashAction === "item-check") {
        setAction(hashAction);
      }
    };
    selectActionFromHash();
    window.addEventListener("hashchange", selectActionFromHash);
    return () => window.removeEventListener("hashchange", selectActionFromHash);
  }, []);
  const cards = [
    {
      id: "quote" as const,
      icon: CircleDollarSign,
      ...copy.quickActions.quote,
    },
    {
      id: "tracking" as const,
      icon: SearchCheck,
      ...copy.quickActions.tracking,
    },
    {
      id: "item-check" as const,
      icon: PackageCheck,
      ...copy.quickActions.parcel,
    },
  ];
  const originIds = [...new Set(routes.map((route) => route.origin))];
  const destinationIds = routes
    .filter((route) => route.origin === originId)
    .map((route) => route.destination);
  const activeRoute = routes.find(
    (route) => route.origin === originId && route.destination === destinationId,
  );
  const contacts = activeRoute ? getDepartureWhatsAppContacts(activeRoute.origin) : [];

  const updateField = (field: keyof QuickActionFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleOriginChange = (nextOriginId: string) => {
    const nextDestination = routes.find((route) => route.origin === nextOriginId)?.destination ?? "";
    setOriginId(nextOriginId);
    setDestinationId(nextDestination);
  };

  if (!initialRoute) return null;

  return (
    <section className="section section--navy quick-actions-section" id="quick-actions" aria-labelledby="quick-title">
      <div className="container">
        <SectionHeading
          id="quick-title"
          eyebrow={copy.quickActions.eyebrow}
          title={copy.quickActions.title}
          intro={copy.quickActions.intro}
        />
        <div className="quick-grid">
          {cards.map((card) => (
            <ActionCard
              key={card.id}
              actionId={card.id}
              icon={card.icon}
              title={card.title}
              text={card.text}
              label={card.button}
              active={action === card.id}
              onClick={() => setAction(card.id)}
            />
          ))}
        </div>

        <div className="quick-action-panel" aria-live="polite">
          <div className="route-selectors">
            <label>
              <span>{copy.quickActions.fromLabel}</span>
              <select value={originId} onChange={(event) => handleOriginChange(event.target.value)}>
                {originIds.map((countryId) => {
                  const country = siteConfig.countries.find((item) => item.id === countryId);
                  if (!country) return null;
                  return <option value={country.id} key={country.id}>{country.flag} {language === "fr" ? country.nameFr : country.nameEn}</option>;
                })}
              </select>
            </label>
            <label>
              <span>{copy.quickActions.toLabel}</span>
              <select value={destinationId} onChange={(event) => setDestinationId(event.target.value)}>
                {destinationIds.map((countryId) => {
                  const country = siteConfig.countries.find((item) => item.id === countryId);
                  if (!country) return null;
                  return <option value={country.id} key={country.id}>{country.flag} {language === "fr" ? country.nameFr : country.nameEn}</option>;
                })}
              </select>
            </label>
          </div>

          {action === "quote" ? (
            <div className="quick-form-grid">
              <label><span>{copy.quickActions.itemLabel}<small>{copy.quickActions.optionalLabel}</small></span><input value={formData.item} onChange={(event) => updateField("item", event.target.value)} placeholder={copy.quickActions.quoteItemPlaceholder} /></label>
              <label><span>{copy.quickActions.weightLabel}<small>{copy.quickActions.optionalLabel}</small></span><input value={formData.weight} onChange={(event) => updateField("weight", event.target.value)} placeholder={copy.quickActions.weightPlaceholder} /></label>
              <label><span>{copy.quickActions.quantityLabel}<small>{copy.quickActions.optionalLabel}</small></span><input value={formData.quantity} onChange={(event) => updateField("quantity", event.target.value)} placeholder={copy.quickActions.quantityPlaceholder} /></label>
            </div>
          ) : null}

          {action === "tracking" ? (
            <label className="quick-form-field">
              <span>{copy.quickActions.referenceLabel}</span>
              <input value={formData.reference} onChange={(event) => updateField("reference", event.target.value)} placeholder={copy.quickActions.referencePlaceholder} />
              <small>{copy.quickActions.referenceHint}</small>
            </label>
          ) : null}

          {action === "item-check" ? (
            <label className="quick-form-field">
              <span>{copy.quickActions.checkItemLabel}</span>
              <input value={formData.item} onChange={(event) => updateField("item", event.target.value)} placeholder={copy.quickActions.checkItemPlaceholder} />
            </label>
          ) : null}

          {activeRoute ? (
            <WhatsAppContactPicker
              contacts={contacts}
              heading={copy.quickActions.chooseContact}
              emptyText={copy.quickActions.noContacts}
              messageForLanguage={(contactLanguage) =>
                buildQuickActionMessage(
                  action,
                  messageCountryName(activeRoute.origin, contactLanguage),
                  messageCountryName(activeRoute.destination, contactLanguage),
                  formData,
                  contactLanguage,
                )
              }
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Departures({ language }: SiteSectionsProps) {
  const copy = translations[language];
  const locale = language === "fr" ? "fr-FR" : "en-US";
  const departures = sortByIsoDate(
    siteConfig.departures.filter(
      (departure) =>
        departure.enabled &&
        isIsoDateTodayOrFuture(departure.date) &&
        routeDetails(departure.routeId, language) !== null,
    ),
    (departure) => departure.date,
  );
  const nextDepartureId = departures[0]?.id;
  const groups = siteConfig.departureRouteOrder
    .map((routeId) => {
      const route = routeDetails(routeId, language);
      const routeDepartures = departures.filter((departure) => departure.routeId === routeId);
      return route && routeDepartures.length ? { route, departures: routeDepartures } : null;
    })
    .filter((group): group is NonNullable<typeof group> => group !== null);

  return (
    <section className="section section--warm" id="departures" aria-labelledby="departures-title">
      <div className="container">
        <SectionHeading
          id="departures-title"
          eyebrow={copy.departures.eyebrow}
          title={copy.departures.title}
          intro={copy.departures.intro}
        />

        {groups.length ? (
          <div className="departures-grid">
            {groups.map(({ route, departures: routeDepartures }) => {
              const containsNextDeparture = routeDepartures.some(
                (departure) => departure.id === nextDepartureId,
              );
              const contacts = getDepartureWhatsAppContacts(route.route.origin);
              return (
                <article className={`departure-card${containsNextDeparture ? " departure-card--featured" : ""}`} key={route.route.id}>
                  <div className="departure-route">
                    <span><span aria-hidden="true">{route.originFlag}</span>{route.origin}</span>
                    <ArrowRight aria-hidden="true" size={20} />
                    <span><span aria-hidden="true">{route.destinationFlag}</span>{route.destination}</span>
                  </div>

                  <p className="departure-dates-label">{copy.departures.upcomingDates}</p>
                  <ul className="departure-dates">
                    {routeDepartures.map((departure) => {
                      const formattedDate = formatIsoDate(departure.date, locale);
                      if (!formattedDate) return null;
                      const deadline = departure.deadline
                        ? formatIsoDate(departure.deadline, locale)
                        : null;
                      const note = (language === "fr" ? departure.noteFr : departure.noteEn)?.trim();
                      const status = (language === "fr" ? departure.statusFr : departure.statusEn)?.trim();
                      const isNextDeparture = departure.id === nextDepartureId;

                      return (
                        <li className={isNextDeparture ? "is-next" : undefined} key={departure.id}>
                          <span><CalendarDays aria-hidden="true" size={17} /><strong>{formattedDate}</strong></span>
                          {isNextDeparture ? <small>{copy.departures.nextBadge}</small> : null}
                          {status ? <em>{status}</em> : null}
                          {deadline ? <em>{copy.departures.deadlineLabel} : {deadline}</em> : null}
                          {note ? <em>{copy.departures.noteLabel} : {note}</em> : null}
                        </li>
                      );
                    })}
                  </ul>

                  <details className="departure-contact-disclosure">
                    <summary className="button button--card">
                      <MessageCircle aria-hidden="true" size={18} />{copy.departures.requestDetails}
                    </summary>
                    <WhatsAppContactPicker
                      contacts={contacts}
                      heading={copy.departures.chooseContact}
                      emptyText={copy.departures.noContacts}
                      messageForLanguage={(contactLanguage) =>
                        buildDepartureMessage(
                          messageCountryName(route.route.origin, contactLanguage),
                          messageCountryName(route.route.destination, contactLanguage),
                          contactLanguage,
                        )
                      }
                    />
                  </details>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-state__icon"><CalendarDays aria-hidden="true" size={28} /></span>
            <div>
              <h3>{copy.departures.emptyTitle}</h3>
              <p>{copy.departures.emptyText}</p>
            </div>
            <a
              className="button button--navy"
              href={createWhatsAppLink(siteConfig.whatsapp.primary, copy.whatsappMessages.contact, language) ?? "#contacts"}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle aria-hidden="true" size={18} />{copy.departures.emptyButton}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function MainGalleryImage({ language }: SiteSectionsProps) {
  const copy = translations[language];
  const { gallery } = siteConfig;
  const mainImage = gallery.mainImage;

  if (!gallery.enabled || !mainImage.enabled) return null;

  return (
    <section className="section gallery-main-section" aria-labelledby="gallery-main-title">
      <div className="container">
        <SectionHeading
          id="gallery-main-title"
          eyebrow={copy.gallery.eyebrow}
          title={copy.gallery.title}
          intro={copy.gallery.intro}
        />

        <figure className="gallery-main">
          <img
            src={mainImage.src}
            alt={language === "fr" ? mainImage.altFr : mainImage.altEn}
            width={mainImage.width}
            height={mainImage.height}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}

function Gallery({ language }: SiteSectionsProps) {
  const copy = translations[language];
  const { gallery } = siteConfig;
  const images = gallery.images.filter((image) => image.enabled);

  if (!gallery.enabled || !images.length) return null;

  return (
    <section className="section gallery-section" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <SectionHeading
          id="gallery-title"
          eyebrow={copy.gallery.secondaryEyebrow}
          title={copy.gallery.secondaryTitle}
          intro={copy.gallery.secondaryIntro}
        />
        <div className="gallery-grid">
          {images.map((image) => (
            <figure className="gallery-card" key={image.id}>
              <img
                src={image.src}
                alt={language === "fr" ? image.altFr : image.altEn}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>

        <p className="gallery-disclaimer"><Info aria-hidden="true" size={17} />{copy.gallery.disclaimer}</p>
      </div>
    </section>
  );
}

function Routes({ language }: SiteSectionsProps) {
  const copy = translations[language];
  const routes = siteConfig.routes
    .filter((route) => route.enabled)
    .map((route) => routeDetails(route.id, language))
    .filter((route): route is NonNullable<typeof route> => route !== null);

  if (!routes.length) return null;

  return (
    <div className="process-routes" id="routes" aria-labelledby="routes-title">
      <SectionHeading id="routes-title" eyebrow={copy.routes.eyebrow} title={copy.routes.title} intro={copy.routes.intro} />
      <div className="routes-grid">
        {routes.map(({ route, origin, destination, originFlag, destinationFlag }) => (
          <article className="route-card" key={route.id} aria-label={copy.routes.routeLabel(origin, destination)}>
            <span className="route-card__label"><span className="route-dot" />{copy.routes.availableRoute}</span>
            <div className="route-card__journey">
              <span><b aria-hidden="true">{originFlag}</b><strong>{origin}</strong></span>
              <span className="route-card__line"><Plane aria-hidden="true" size={17} /></span>
              <span><b aria-hidden="true">{destinationFlag}</b><strong>{destination}</strong></span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Process({ language }: SiteSectionsProps) {
  const copy = translations[language];
  const icons = [MessageCircle, ClipboardCheck, HandHeart, Truck];

  return (
    <section className="section section--navy" id="process" aria-labelledby="process-title">
      <div className="container">
        <SectionHeading id="process-title" eyebrow={copy.process.eyebrow} title={copy.process.title} intro={copy.process.intro} />
        <ol className="process-grid">
          {copy.process.steps.map((step, index) => {
            const Icon = icons[index];
            return (
              <li className="process-step" key={step.title}>
                <span className="process-step__number">0{index + 1}</span>
                <span className="process-step__icon"><Icon aria-hidden="true" size={22} /></span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            );
          })}
        </ol>
        <Routes language={language} />
      </div>
    </section>
  );
}

function QuoteAndServices({ language }: SiteSectionsProps) {
  const copy = translations[language];
  const services = siteConfig.services.filter((service) => service.enabled);

  return (
    <div className="practical-support" id="services" aria-labelledby="services-title">
      <div className="decision-grid">
        <article className="decision-card decision-card--gold">
          <span className="icon-badge"><CircleDollarSign aria-hidden="true" size={24} /></span>
          <p className="eyebrow">{copy.quote.eyebrow}</p>
          <h2>{copy.quote.title}</h2>
          <p>{copy.quote.text}</p>
          <a className="button button--navy" href="#quick-actions-quote">
            <MessageCircle aria-hidden="true" size={18} />{copy.quote.button}
          </a>
        </article>

        <article className="decision-card">
          <span className="icon-badge"><PackageCheck aria-hidden="true" size={24} /></span>
          <p className="eyebrow">{copy.services.eyebrow}</p>
          <h2 id="services-title">{copy.services.title}</h2>
          {services.length ? (
            <div className="services-list">
              {services.map((service) => {
                const title = (language === "fr" ? service.titleFr : service.titleEn).trim();
                const description = (language === "fr" ? service.descriptionFr : service.descriptionEn)?.trim();
                if (!title) return null;
                return <div key={service.id}><Check aria-hidden="true" size={17} /><span><strong>{title}</strong>{description ? <small>{description}</small> : null}</span></div>;
              })}
            </div>
          ) : (
            <p>{copy.services.emptyText}</p>
          )}
          <a className="button button--outline" href="#quick-actions-item-check">
            <MessageCircle aria-hidden="true" size={18} />{copy.services.emptyButton}
          </a>
        </article>
      </div>

      <div className="rules-card">
        <span className="rules-card__icon"><ShieldCheck aria-hidden="true" size={28} /></span>
        <div>
          <p className="eyebrow">{copy.parcelRules.eyebrow}</p>
          <h3>{copy.parcelRules.title}</h3>
          <p>{copy.parcelRules.text}</p>
          <small>{copy.parcelRules.disclaimer}</small>
        </div>
      </div>
    </div>
  );
}

function DeliveryPickup({ language }: SiteSectionsProps) {
  const copy = translations[language];

  return (
    <section className="section" id="delivery" aria-labelledby="delivery-title">
      <div className="container">
        <SectionHeading
          id="delivery-title"
          eyebrow={copy.deliveryPickup.eyebrow}
          title={copy.deliveryPickup.title}
        />
        <div className="logistics-grid">
          <article className="logistics-card">
            <div className="logistics-card__header"><Truck aria-hidden="true" size={22} /><h3>{copy.deliveryPickup.title}</h3></div>
            <div className="availability-list">
              {siteConfig.delivery.homeDelivery ? <div><Home aria-hidden="true" size={19} /><span><strong>{copy.deliveryPickup.homeDeliveryTitle}</strong><small>{copy.deliveryPickup.homeDeliveryText}</small></span></div> : null}
              {siteConfig.delivery.pickup ? <div><Store aria-hidden="true" size={19} /><span><strong>{copy.deliveryPickup.pickupTitle}</strong><small>{copy.deliveryPickup.pickupText}</small></span></div> : null}
            </div>
            <p className="logistics-card__note">{copy.deliveryPickup.note}</p>
          </article>

          <article className="logistics-card logistics-card--tracking">
            <div className="logistics-card__header"><SearchCheck aria-hidden="true" size={22} /><h3>{copy.tracking.title}</h3></div>
            <p>{copy.tracking.text}</p>
            <a className="button button--navy" href="#quick-actions-tracking">
              <MessageCircle aria-hidden="true" size={18} />{copy.tracking.button}
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}

function Payments({ language }: SiteSectionsProps) {
  const copy = translations[language];
  const configuredPayments = (Object.entries(siteConfig.paymentMethods) as Array<
    [keyof typeof siteConfig.paymentMethods, string[]]
  >).filter(([, methods]) => methods.some((method) => method.trim()));

  return (
    <section className="section section--warm payments-section" id="payments" aria-labelledby="payments-title">
      <div className="container">
        <SectionHeading id="payments-title" eyebrow={copy.payments.eyebrow} title={copy.payments.title} intro={copy.payments.intro} />
        <article className="payments-card">
          <span className="payments-card__icon"><WalletCards aria-hidden="true" size={24} /></span>
          {configuredPayments.length ? (
            <div className="payment-groups">
              {configuredPayments.map(([countryId, methods]) => {
                const label = countryName(countryId, language);
                if (!label) return null;
                return <div key={countryId}><strong>{copy.payments.countryLabel(label)}</strong><ul>{methods.filter((method) => method.trim()).map((method) => <li key={method}><CreditCard aria-hidden="true" size={16} />{method}</li>)}</ul></div>;
              })}
            </div>
          ) : <p className="payments-card__empty">{copy.payments.emptyText}</p>}
        </article>
      </div>
    </section>
  );
}

function Practical({ language }: SiteSectionsProps) {
  const copy = translations[language];
  const practicalItems = [
    ...siteConfig.practicalInformation.filter((item) => item.enabled).map((item) => ({
      id: item.id,
      label: language === "fr" ? item.labelFr : item.labelEn,
      value: language === "fr" ? item.valueFr : item.valueEn,
      icon: Info,
    })),
    { id: "authorized", label: copy.practical.authorizedParcelsLabel, value: copy.practical.authorizedParcelsValue, icon: ShieldCheck },
  ].filter((item) => item.label.trim() && item.value.trim());

  return (
    <section className="section" id="practical" aria-labelledby="practical-title">
      <div className="container">
        <SectionHeading id="practical-title" eyebrow={copy.practical.eyebrow} title={copy.practical.title} intro={copy.practical.intro} />
        <div className="practical-grid">
          {practicalItems.map((item) => {
            const Icon = item.icon;
            return <article className="practical-card" key={item.id}><Icon aria-hidden="true" size={21} /><div><h3>{item.label}</h3><p>{item.value}</p></div></article>;
          })}
        </div>
        <QuoteAndServices language={language} />
      </div>
    </section>
  );
}

function Contacts({ language }: SiteSectionsProps) {
  const copy = translations[language];
  const contacts = siteConfig.contacts.filter((contact) => contact.enabled);

  return (
    <section className="section" id="contacts" aria-labelledby="contacts-title">
      <div className="container">
        <SectionHeading id="contacts-title" eyebrow={copy.contacts.eyebrow} title={copy.contacts.title} intro={copy.contacts.intro} />
        <div className="contacts-grid">
          {contacts.map((contact) => {
            const country = siteConfig.countries.find((item) => item.id === contact.countryId);
            if (!country) return null;
            const countryLabel = language === "fr" ? country.nameFr : country.nameEn;
            const isBowie = contact.id === "usa-bowie";
            const title = isBowie
              ? `${country.shortName} — ${contact.zones?.[0] || contact.city || "Bowie"}`
              : contact.city?.trim() || countryLabel;
            const subtitle = !isBowie && contact.city?.trim() ? countryLabel : null;
            const address = contact.address?.trim();
            const contactPeople = getWhatsAppContacts(contact.contactIds);
            const purpose = (language === "fr" ? contact.purposeFr : contact.purposeEn)?.trim();
            const purposeDescription = (
              language === "fr" ? contact.purposeDescriptionFr : contact.purposeDescriptionEn
            )?.trim();

            return (
              <article className={`contact-card${isBowie ? " contact-card--location" : ""}`} key={contact.id}>
                <div className="contact-card__title"><span aria-hidden="true">{country.flag}</span><div><h3>{title}</h3>{subtitle ? <small>{subtitle}</small> : null}</div></div>
                {!isBowie && contact.zones?.filter((zone) => zone.trim()).length ? (
                  <div className="contact-block"><span className="contact-block__label"><MapPin aria-hidden="true" size={16} />{copy.contacts.zonesLabel}</span><div className="zone-list">{contact.zones.filter((zone) => zone.trim()).map((zone) => <span key={zone}>{zone}</span>)}</div></div>
                ) : null}
                <div className="contact-block">
                  <span className="contact-block__label"><Phone aria-hidden="true" size={16} />{copy.contacts.phonesLabel}</span>
                  <div className="phone-list">
                    {contactPeople.map((person) => {
                      const telLink = createTelLink(person.phone);
                      if (!telLink) return null;
                      const phoneWhatsAppLink = createWhatsAppLink(
                        person.phone,
                        translations[person.whatsappLanguage].whatsappMessages.contactLocation(title),
                        person.whatsappLanguage,
                      );
                      return (
                        <div className="phone-row" key={person.id}>
                          <a href={telLink} aria-label={copy.accessibility.callNumber(person.phone)}>{person.phone}</a>
                          {phoneWhatsAppLink ? (
                            <a className="phone-whatsapp" href={phoneWhatsAppLink} target="_blank" rel="noreferrer" aria-label={copy.accessibility.whatsappNumber(person.phone)}>
                              <MessageCircle aria-hidden="true" size={15} />WhatsApp
                            </a>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="dropoff-note"><MapPin aria-hidden="true" size={18} /><span><strong>{copy.contacts.addressLabel}</strong><small>{address || copy.contacts.dropOffFallback}</small></span></div>
                {purpose ? (
                  <div className="contact-purpose">
                    <strong>{purpose}</strong>
                    {purposeDescription ? <p>{purposeDescription}</p> : null}
                  </div>
                ) : null}
                <div className="contact-actions">
                  {address && contact.directionsUrl ? (
                    <a className="contact-action" href={contact.directionsUrl} target="_blank" rel="noreferrer">
                      <Navigation aria-hidden="true" size={17} />{copy.contacts.directionsButton}
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Pricing({ language }: SiteSectionsProps) {
  const copy = translations[language];
  const pricing = siteConfig.pricing;
  const items = pricing.items.filter((item) => item.enabled);
  const additionalFees = pricing.additionalFees.filter((fee) => fee.enabled);
  const whatsappContacts = getWhatsAppContacts(pricing.whatsappContactIds);
  const routes = pricing.routeIds
    .map((routeId) => routeDetails(routeId, language))
    .filter((route): route is NonNullable<typeof route> => route !== null);

  if (!pricing.enabled || !items.length) return null;

  return (
    <section className="section pricing-section" id="pricing" aria-labelledby="pricing-title">
      <div className="container">
        <SectionHeading
          id="pricing-title"
          eyebrow={copy.pricing.eyebrow}
          title={copy.pricing.title}
          intro={copy.pricing.intro}
        />

        <div className="pricing-scope" aria-label={copy.pricing.scopeLabel}>
          <strong>{copy.pricing.scopeLabel}</strong>
          <div>
            {routes.map(({ route, origin, destination, originFlag, destinationFlag }) => (
              <span key={route.id}>
                <b aria-hidden="true">{originFlag}</b>{origin}
                <ArrowRight aria-hidden="true" size={16} />
                <b aria-hidden="true">{destinationFlag}</b>{destination}
              </span>
            ))}
          </div>
        </div>

        <div className="pricing-grid">
          {items.map((item) => (
            <article className="pricing-item" key={item.id}>
              <span className="pricing-item__icon"><PackageCheck aria-hidden="true" size={20} /></span>
              <h3>{language === "fr" ? item.labelFr : item.labelEn}</h3>
              <strong>{language === "fr" ? item.priceFr : item.priceEn}</strong>
            </article>
          ))}
        </div>

        <div className="pricing-information">
          <article className="pricing-fees">
            <div className="pricing-information__title"><CreditCard aria-hidden="true" size={21} /><h3>{copy.pricing.additionalFeesTitle}</h3></div>
            <dl>
              {additionalFees.map((fee) => (
                <div key={fee.id}>
                  <dt>{language === "fr" ? fee.labelFr : fee.labelEn}</dt>
                  <dd>{language === "fr" ? fee.priceFr : fee.priceEn}</dd>
                </div>
              ))}
            </dl>
          </article>

          <article className="pricing-exchange">
            <div className="pricing-information__title"><CircleDollarSign aria-hidden="true" size={21} /><h3>{copy.pricing.exchangeRateTitle}</h3></div>
            <p>{language === "fr" ? pricing.exchangeRateNoteFr : pricing.exchangeRateNoteEn}</p>
          </article>
        </div>

        <aside className="pricing-warning" aria-labelledby="pricing-warning-title">
          <ShieldCheck aria-hidden="true" size={24} />
          <div>
            <h3 id="pricing-warning-title">{copy.pricing.restrictionTitle}</h3>
            <p>{language === "fr" ? pricing.restrictionFr : pricing.restrictionEn}</p>
          </div>
        </aside>

        <p className="pricing-confirmation"><Info aria-hidden="true" size={17} />{copy.pricing.confirmationNote}</p>

        {whatsappContacts.length ? (
          <div className="pricing-contacts" aria-labelledby="pricing-contacts-title">
            <div>
              <p className="eyebrow">WhatsApp</p>
              <h3 id="pricing-contacts-title">{copy.pricing.contactTitle}</h3>
              <p>{copy.pricing.contactIntro}</p>
            </div>
            <WhatsAppContactPicker
              contacts={whatsappContacts}
              heading={copy.quickActions.chooseContact}
              emptyText={copy.quickActions.noContacts}
              messageForLanguage={(contactLanguage) =>
                translations[contactLanguage].whatsappMessages.pricing
              }
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Faq({ language }: SiteSectionsProps) {
  const copy = translations[language];
  const faq = siteConfig.faq.filter((item) => item.enabled);
  if (!faq.length) return null;

  return (
    <section className="section section--warm" id="faq" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <SectionHeading id="faq-title" eyebrow={copy.faq.eyebrow} title={copy.faq.title} intro={copy.faq.intro} />
        <div className="faq-list">
          {faq.map((item) => {
            const question = (language === "fr" ? item.questionFr : item.questionEn).trim();
            const answer = (language === "fr" ? item.answerFr : item.answerEn).trim();
            if (!question || !answer) return null;
            return <details className="faq-item" key={item.id}><summary><span>{question}</span><ChevronDown aria-hidden="true" size={20} /></summary><div><p>{answer}</p></div></details>;
          })}
        </div>
      </div>
    </section>
  );
}

export function SiteSections({ language }: SiteSectionsProps) {
  return (
    <>
      <Departures language={language} />
      <QuickActions language={language} />
      <Contacts language={language} />
      <Pricing language={language} />
      <MainGalleryImage language={language} />
      <Gallery language={language} />
      <Process language={language} />
      <DeliveryPickup language={language} />
      <Payments language={language} />
      <Practical language={language} />
      <Faq language={language} />
    </>
  );
}
