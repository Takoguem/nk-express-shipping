import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Facebook,
  Instagram,
  Menu,
  MessageCircle,
  Music2,
  Package,
  Phone,
  X,
} from "lucide-react";
import { siteConfig } from "../data/site-config";
import { translations } from "../data/translations";
import { useLanguage } from "../hooks/useLanguage";
import { SiteSections } from "../sections/SiteSections";
import { createTelLink, createWhatsAppLink } from "../utils";
import { BrandLogo } from "./BrandLogo";

export function LandingPage() {
  const { language, setLanguage } = useLanguage();
  const copy = translations[language];
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const partners = siteConfig.companyPartners.filter((partner) => partner.enabled);

  const announcementText = siteConfig.announcement.enabled
    ? language === "fr"
      ? siteConfig.announcement.textFr.trim() || siteConfig.announcement.textEn.trim()
      : siteConfig.announcement.textEn.trim() || siteConfig.announcement.textFr.trim()
    : "";

  const whatsappLink = useMemo(
    () => createWhatsAppLink(siteConfig.whatsapp.primary, copy.whatsappMessages.contact, language),
    [copy.whatsappMessages.contact, language],
  );

  const navigation = [
    { href: "#departures", label: copy.nav.departures },
    { href: "#contacts", label: copy.nav.contacts },
    { href: "#pricing", label: copy.nav.pricing },
    { href: "#process", label: copy.nav.process },
    { href: "#practical", label: copy.nav.practical },
    { href: "#faq", label: copy.nav.faq },
  ];

  const socialLinks = [
    { id: "tiktok", label: "TikTok", href: siteConfig.socials.tiktok.trim(), icon: Music2 },
    { id: "instagram", label: "Instagram", href: siteConfig.socials.instagram.trim(), icon: Instagram },
    { id: "facebook", label: "Facebook", href: siteConfig.socials.facebook.trim(), icon: Facebook },
  ].filter((social) => social.href);

  useEffect(() => {
    document.title = copy.meta.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = copy.meta.description;

    const metadata = [
      ['meta[property="og:title"]', copy.meta.title],
      ['meta[property="og:description"]', copy.meta.description],
      ['meta[name="twitter:title"]', copy.meta.title],
      ['meta[name="twitter:description"]', copy.meta.description],
    ] as const;

    metadata.forEach(([selector, content]) => {
      const element = document.querySelector<HTMLMetaElement>(selector);
      if (element) element.content = content;
    });

    const openGraphLocale = document.querySelector<HTMLMetaElement>('meta[property="og:locale"]');
    const alternateLocale = document.querySelector<HTMLMetaElement>(
      'meta[property="og:locale:alternate"]',
    );
    if (openGraphLocale) openGraphLocale.content = language === "fr" ? "fr_FR" : "en_US";
    if (alternateLocale) alternateLocale.content = language === "fr" ? "en_US" : "fr_FR";
  }, [copy.meta.description, copy.meta.title, language]);

  useEffect(() => {
    const faviconPath = siteConfig.seo.faviconPath.trim();
    if (!faviconPath) return;

    const existingIcon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    const icon = existingIcon ?? document.createElement("link");
    icon.rel = "icon";
    icon.href = faviconPath;
    if (!existingIcon) document.head.append(icon);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">{copy.accessibility.skipToContent}</a>

      {announcementText && !announcementDismissed ? (
        <aside className="announcement" aria-label={copy.announcement.label}>
          <div className="container announcement__inner">
            <span><strong>{copy.announcement.label}</strong>{announcementText}</span>
            <button type="button" onClick={() => setAnnouncementDismissed(true)} aria-label={copy.announcement.close}>
              <X aria-hidden="true" size={18} />
            </button>
          </div>
        </aside>
      ) : null}

      <header className="site-header">
        <div className="container header-inner">
          <a className="partner-lockup" href="#accueil" aria-label={copy.nav.home} onClick={closeMenu}>
            <span className="partner-lockup__logos">
              {partners.map((partner, index) => (
                <span className="partner-lockup__item" key={partner.id}>
                  {index > 0 ? <span className="partner-cross">×</span> : null}
                  <BrandLogo partner={partner} compact alt={copy.accessibility.logoAlt(partner.name)} />
                </span>
              ))}
            </span>
            <small>{copy.partnerLabel}</small>
          </a>

          <nav className="desktop-nav" aria-label={copy.accessibility.mainNavigation}>
            {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
          </nav>

          <div className="header-actions">
            <div className="language-switch" role="group" aria-label={copy.accessibility.languageSelector}>
              {(["en", "fr"] as const).map((option) => (
                <button
                  type="button"
                  className={language === option ? "is-active" : undefined}
                  aria-pressed={language === option}
                  aria-label={option === "fr" ? copy.accessibility.selectFrench : copy.accessibility.selectEnglish}
                  onClick={() => setLanguage(option)}
                  key={option}
                >
                  {option.toUpperCase()}
                </button>
              ))}
            </div>
            {whatsappLink ? (
              <a className="button button--whatsapp header-whatsapp" href={whatsappLink} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" size={17} />{copy.common.whatsapp}
              </a>
            ) : null}
            <button
              className="menu-button"
              type="button"
              ref={menuButtonRef}
              aria-label={menuOpen ? copy.header.closeMenu : copy.header.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>

        <nav
          className={`mobile-menu${menuOpen ? " is-open" : ""}`}
          id="mobile-menu"
          aria-label={copy.accessibility.mobileNavigation}
          aria-hidden={!menuOpen}
          hidden={!menuOpen}
        >
          <div className="container mobile-menu__inner">
            {navigation.map((item) => <a href={item.href} key={item.href} onClick={closeMenu}>{item.label}<ArrowRight aria-hidden="true" size={18} /></a>)}
            {whatsappLink ? <a className="button button--whatsapp" href={whatsappLink} target="_blank" rel="noreferrer" onClick={closeMenu}><MessageCircle aria-hidden="true" size={18} />{copy.header.whatsapp}</a> : null}
          </div>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="accueil">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{copy.hero.eyebrow}</p>
              <h1>{copy.hero.title}</h1>
              <p className="hero-subtitle">{copy.hero.subtitle}</p>
              <div className="country-chips" aria-label={copy.hero.destinationsLabel}>
                {siteConfig.countries.filter((country) => country.enabled).map((country) => (
                  <span key={country.id}>
                    <span aria-hidden="true">{country.flag}</span>{language === "fr" ? country.nameFr : country.nameEn}
                  </span>
                ))}
              </div>
              <div className="hero-actions">
                {whatsappLink ? (
                  <a className="button button--whatsapp" href={whatsappLink} target="_blank" rel="noreferrer">
                    <MessageCircle aria-hidden="true" size={19} />{copy.hero.whatsapp}<span aria-hidden="true">↗</span>
                  </a>
                ) : null}
                <a className="button button--secondary" href="#departures">
                  {copy.hero.departures}<ArrowDown aria-hidden="true" size={18} />
                </a>
              </div>
            </div>

            <div className="route-visual" role="img" aria-label={copy.accessibility.routeVisual}>
              <div className="route-visual__glow" />
              <div className="route-node route-node--usa"><span aria-hidden="true">🇺🇸</span><strong>USA</strong></div>
              <div className="route-node route-node--canada"><span aria-hidden="true">🇨🇦</span><strong>Canada</strong></div>
              <div className="route-node route-node--cameroon"><span aria-hidden="true">🇨🇲</span><strong>{language === "fr" ? "Cameroun" : "Cameroon"}</strong></div>
              <div className="parcel-card">
                <span className="parcel-card__icon"><Package aria-hidden="true" size={23} /></span>
                <span><small>{copy.hero.parcelLabel}</small><strong>{copy.hero.parcelSupport}</strong></span>
              </div>
            </div>
          </div>
        </section>

        <section className="partnership-preview" aria-labelledby="partnership-title">
          <div className="container partnership-card">
            <div className="partnership-brands">
              {partners.map((partner, index) => (
                <div className="partnership-brand" key={partner.id}>
                  {index > 0 ? <span className="partnership-cross">×</span> : null}
                  <BrandLogo partner={partner} alt={copy.accessibility.logoAlt(partner.name)} />
                </div>
              ))}
            </div>
            <div className="partnership-copy">
              <p className="eyebrow">{copy.partnership.eyebrow}</p>
              <h2 id="partnership-title">{copy.partnership.title}</h2>
              <p>{copy.partnership.text}</p>
            </div>
          </div>
        </section>

        <SiteSections language={language} />
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="footer-partners">
              {partners.map((partner, index) => (
                <span key={partner.id}>{index > 0 ? <b>×</b> : null}<BrandLogo partner={partner} compact alt={copy.accessibility.logoAlt(partner.name)} /></span>
              ))}
            </div>
            <p>{copy.footer.partnership}</p>
            <small>{copy.footer.description}</small>
          </div>
          <div className="footer-links">
            <h2>{copy.footer.quickLinks}</h2>
            {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
          </div>
          <div className="footer-contact">
            <h2>{copy.footer.contact}</h2>
            {createTelLink(siteConfig.whatsapp.primary) ? <a className="footer-phone" href={createTelLink(siteConfig.whatsapp.primary) ?? undefined}><Phone aria-hidden="true" size={17} />{siteConfig.whatsapp.primary}</a> : null}
            {whatsappLink ? <a className="button button--whatsapp" href={whatsappLink} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" size={18} />{copy.header.whatsapp}</a> : null}
            {socialLinks.length ? (
              <div className="footer-socials" aria-label={copy.footer.followUs}>
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return <a key={social.id} href={social.href} target="_blank" rel="noreferrer" aria-label={copy.accessibility.externalLink(social.label)}><Icon aria-hidden="true" size={18} /></a>;
                })}
              </div>
            ) : null}
          </div>
        </div>
        <div className="container footer-bottom">
          <p>{copy.footer.disclaimer}</p>
          <small>{copy.footer.copyright(new Date().getFullYear())}</small>
        </div>
      </footer>

      {whatsappLink ? (
        <a className="floating-whatsapp" href={whatsappLink} target="_blank" rel="noreferrer" aria-label={copy.accessibility.floatingWhatsapp}>
          <MessageCircle aria-hidden="true" size={22} /><span>{copy.common.whatsapp}</span>
        </a>
      ) : null}
    </div>
  );
}
