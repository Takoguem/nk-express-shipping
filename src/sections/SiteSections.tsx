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
import {
  createTelLink,
  createWhatsAppLink,
  formatIsoDate,
  isIsoDateTodayOrFuture,
  normalizePhoneNumber,
  sortByIsoDate,
} from "../utils";

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
  icon: Icon,
  title,
  text,
  label,
  href,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  label: string;
  href: string;
}) {
  return (
    <a className="action-card" href={href} target="_blank" rel="noreferrer">
      <span className="icon-badge"><Icon aria-hidden="true" size={22} /></span>
      <span className="action-card__copy">
        <strong>{title}</strong>
        <small>{text}</small>
      </span>
      <span className="action-card__link">{label}<ArrowRight aria-hidden="true" size={16} /></span>
    </a>
  );
}

function QuickActions({ language }: SiteSectionsProps) {
  const copy = translations[language];
  const phone = siteConfig.whatsapp.primary;
  const cards = [
    {
      icon: CircleDollarSign,
      ...copy.quickActions.quote,
      href: createWhatsAppLink(phone, copy.whatsappMessages.quote) ?? "#contacts",
    },
    {
      icon: SearchCheck,
      ...copy.quickActions.tracking,
      href: createWhatsAppLink(phone, copy.whatsappMessages.tracking) ?? "#contacts",
    },
    {
      icon: PackageCheck,
      ...copy.quickActions.parcel,
      href: createWhatsAppLink(phone, copy.whatsappMessages.parcelCheck) ?? "#contacts",
    },
  ];

  return (
    <section className="section section--quick" aria-labelledby="quick-title">
      <div className="container">
        <SectionHeading id="quick-title" eyebrow={copy.quickActions.eyebrow} title={copy.quickActions.title} />
        <div className="quick-grid">
          {cards.map((card) => <ActionCard key={card.title} {...card} label={card.button} />)}
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

  return (
    <section className="section section--warm" id="departures" aria-labelledby="departures-title">
      <div className="container">
        <SectionHeading
          id="departures-title"
          eyebrow={copy.departures.eyebrow}
          title={copy.departures.title}
          intro={copy.departures.intro}
        />

        {departures.length ? (
          <div className="departures-grid">
            {departures.map((departure, index) => {
              const route = routeDetails(departure.routeId, language);
              const formattedDate = formatIsoDate(departure.date, locale);
              if (!route || !formattedDate) return null;

              const deadline = departure.deadline
                ? formatIsoDate(departure.deadline, locale)
                : null;
              const note = (language === "fr" ? departure.noteFr : departure.noteEn)?.trim();
              const status = (language === "fr" ? departure.statusFr : departure.statusEn)?.trim();
              const message = copy.whatsappMessages.departure(route.origin, route.destination);
              const link = createWhatsAppLink(siteConfig.whatsapp.primary, message) ?? "#contacts";

              return (
                <article className={`departure-card${index === 0 ? " departure-card--featured" : ""}`} key={departure.id}>
                  <div className="departure-card__topline">
                    <span className="status-badge">
                      {index === 0 ? copy.departures.nextBadge : copy.departures.availableBadge}
                    </span>
                    {status ? <span className="departure-card__status">{status}</span> : null}
                  </div>
                  <div className="departure-route">
                    <span><span aria-hidden="true">{route.originFlag}</span>{route.origin}</span>
                    <ArrowRight aria-hidden="true" size={20} />
                    <span><span aria-hidden="true">{route.destinationFlag}</span>{route.destination}</span>
                  </div>
                  <div className="departure-date">
                    <CalendarDays aria-hidden="true" size={22} />
                    <span><small>{copy.departures.dateLabel}</small><strong>{formattedDate}</strong></span>
                  </div>
                  {deadline ? (
                    <p className="departure-meta"><strong>{copy.departures.deadlineLabel} :</strong> {deadline}</p>
                  ) : null}
                  {note ? (
                    <p className="departure-meta"><strong>{copy.departures.noteLabel} :</strong> {note}</p>
                  ) : null}
                  <a className="button button--card" href={link} target="_blank" rel="noreferrer">
                    <MessageCircle aria-hidden="true" size={18} />{copy.departures.whatsappButton}
                  </a>
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
              href={createWhatsAppLink(siteConfig.whatsapp.primary, copy.whatsappMessages.contact) ?? "#contacts"}
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

function Routes({ language }: SiteSectionsProps) {
  const copy = translations[language];
  const routes = siteConfig.routes
    .filter((route) => route.enabled)
    .map((route) => routeDetails(route.id, language))
    .filter((route): route is NonNullable<typeof route> => route !== null);

  if (!routes.length) return null;

  return (
    <section className="section" id="routes" aria-labelledby="routes-title">
      <div className="container">
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
    </section>
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
      </div>
    </section>
  );
}

function QuoteAndServices({ language }: SiteSectionsProps) {
  const copy = translations[language];
  const quoteLink = createWhatsAppLink(siteConfig.whatsapp.primary, copy.whatsappMessages.quote) ?? "#contacts";
  const checkLink = createWhatsAppLink(siteConfig.whatsapp.primary, copy.whatsappMessages.parcelCheck) ?? "#contacts";
  const services = siteConfig.services.filter((service) => service.enabled);

  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="container decision-grid">
        <article className="decision-card decision-card--gold">
          <span className="icon-badge"><CircleDollarSign aria-hidden="true" size={24} /></span>
          <p className="eyebrow">{copy.quote.eyebrow}</p>
          <h2>{copy.quote.title}</h2>
          <p>{copy.quote.text}</p>
          <a className="button button--navy" href={quoteLink} target="_blank" rel="noreferrer">
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
          <a className="button button--outline" href={checkLink} target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" size={18} />{copy.services.emptyButton}
          </a>
        </article>
      </div>

      <div className="container rules-card">
        <span className="rules-card__icon"><ShieldCheck aria-hidden="true" size={28} /></span>
        <div>
          <p className="eyebrow">{copy.parcelRules.eyebrow}</p>
          <h3>{copy.parcelRules.title}</h3>
          <p>{copy.parcelRules.text}</p>
          <small>{copy.parcelRules.disclaimer}</small>
        </div>
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
    ...(siteConfig.delivery.homeDelivery
      ? [{ id: "home-delivery", label: copy.practical.deliveryLabel, value: copy.practical.deliveryValue, icon: Home }]
      : []),
    ...(siteConfig.delivery.pickup
      ? [{ id: "pickup", label: copy.practical.pickupLabel, value: copy.practical.pickupValue, icon: Store }]
      : []),
    { id: "authorized", label: copy.practical.authorizedParcelsLabel, value: copy.practical.authorizedParcelsValue, icon: ShieldCheck },
  ].filter((item) => item.label.trim() && item.value.trim());

  const configuredPayments = (Object.entries(siteConfig.paymentMethods) as Array<
    [keyof typeof siteConfig.paymentMethods, string[]]
  >).filter(([, methods]) => methods.some((method) => method.trim()));

  return (
    <section className="section section--warm" id="practical" aria-labelledby="practical-title">
      <div className="container">
        <SectionHeading id="practical-title" eyebrow={copy.practical.eyebrow} title={copy.practical.title} intro={copy.practical.intro} />
        <div className="practical-grid">
          {practicalItems.map((item) => {
            const Icon = item.icon;
            return <article className="practical-card" key={item.id}><Icon aria-hidden="true" size={21} /><div><h3>{item.label}</h3><p>{item.value}</p></div></article>;
          })}
        </div>

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
            <a className="button button--navy" href={createWhatsAppLink(siteConfig.whatsapp.primary, copy.whatsappMessages.tracking) ?? "#contacts"} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" size={18} />{copy.tracking.button}
            </a>
          </article>
        </div>

        <article className="payments-card">
          <div className="payments-card__intro">
            <span className="icon-badge"><WalletCards aria-hidden="true" size={22} /></span>
            <div><p className="eyebrow">{copy.payments.eyebrow}</p><h3>{copy.payments.title}</h3><p>{copy.payments.intro}</p></div>
          </div>
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

function Contacts({ language }: SiteSectionsProps) {
  const copy = translations[language];
  const contacts = siteConfig.contacts.filter((contact) => contact.enabled);
  const primaryPhone = normalizePhoneNumber(siteConfig.whatsapp.primary);

  return (
    <section className="section" id="contacts" aria-labelledby="contacts-title">
      <div className="container">
        <SectionHeading id="contacts-title" eyebrow={copy.contacts.eyebrow} title={copy.contacts.title} intro={copy.contacts.intro} />
        <div className="contacts-grid">
          {contacts.map((contact) => {
            const country = siteConfig.countries.find((item) => item.id === contact.countryId);
            if (!country) return null;
            const countryLabel = language === "fr" ? country.nameFr : country.nameEn;
            const title = contact.city?.trim() || countryLabel;
            const subtitle = contact.city?.trim() ? countryLabel : null;
            const address = contact.address?.trim();

            return (
              <article className="contact-card" key={contact.id}>
                <div className="contact-card__title"><span aria-hidden="true">{country.flag}</span><div><h3>{title}</h3>{subtitle ? <small>{subtitle}</small> : null}</div></div>
                {contact.zones?.filter((zone) => zone.trim()).length ? (
                  <div className="contact-block"><span className="contact-block__label"><MapPin aria-hidden="true" size={16} />{copy.contacts.zonesLabel}</span><div className="zone-list">{contact.zones.filter((zone) => zone.trim()).map((zone) => <span key={zone}>{zone}</span>)}</div></div>
                ) : null}
                <div className="contact-block">
                  <span className="contact-block__label"><Phone aria-hidden="true" size={16} />{copy.contacts.phonesLabel}</span>
                  <div className="phone-list">
                    {contact.phones.map((phone) => {
                      const telLink = createTelLink(phone);
                      if (!telLink) return null;
                      const isPrimary = normalizePhoneNumber(phone) === primaryPhone;
                      return (
                        <div className="phone-row" key={phone}>
                          <a href={telLink} aria-label={copy.accessibility.callNumber(phone)}>{phone}</a>
                          {isPrimary ? <a className="phone-whatsapp" href={createWhatsAppLink(phone, copy.whatsappMessages.contact) ?? undefined} target="_blank" rel="noreferrer" aria-label={copy.accessibility.whatsappNumber(phone)}><MessageCircle aria-hidden="true" size={16} />WhatsApp</a> : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="dropoff-note"><MapPin aria-hidden="true" size={18} /><span><strong>{copy.contacts.addressLabel}</strong><small>{address || copy.contacts.dropOffFallback}</small></span></div>
              </article>
            );
          })}
        </div>
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
      <QuickActions language={language} />
      <Departures language={language} />
      <Routes language={language} />
      <Process language={language} />
      <QuoteAndServices language={language} />
      <Practical language={language} />
      <Contacts language={language} />
      <Faq language={language} />
    </>
  );
}
