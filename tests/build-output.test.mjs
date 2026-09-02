import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const projectRoot = new URL("../", import.meta.url);
const outputRoot = new URL("../dist/", import.meta.url);

test("le build produit une page statique Cloudflare Pages", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");

  assert.match(html, /<html lang="en">/);
  assert.match(html, /<div id="root"><\/div>/);
  assert.match(html, /<meta\s+name="description"/);
  assert.match(html, /<meta property="og:image" content="\/og\.png"/);
  assert.match(html, /<script type="module" crossorigin src="\/assets\//);
  await access(new URL("og.png", outputRoot));
});

test("l'anglais est rétabli à chaque chargement sans persistance locale", async () => {
  const languageHook = await readFile(new URL("src/hooks/useLanguage.ts", projectRoot), "utf8");

  assert.match(languageHook, /useState<Language>\("en"\)/);
  assert.match(languageHook, /document\.documentElement\.lang = language/);
  assert.doesNotMatch(languageHook, /localStorage|sessionStorage|navigator\.language/);
});

test("tous les fichiers référencés par la page existent", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");
  const assetPaths = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map(
    ([, path]) => path,
  );

  assert.ok(assetPaths.length >= 2);
  await Promise.all(
    assetPaths.map((path) => access(new URL(`.${path}`, outputRoot))),
  );
});

test("le lot frontend conserve le bilingue et WhatsApp", async () => {
  const assetsDirectory = new URL("assets/", outputRoot);
  const assetNames = await readdir(assetsDirectory);
  const scripts = assetNames.filter((name) => name.endsWith(".js"));
  const javascript = (
    await Promise.all(scripts.map((name) => readFile(new URL(name, assetsDirectory), "utf8")))
  ).join("\n");

  assert.doesNotMatch(javascript, /shipping-site-language/);
  assert.match(javascript, /wa\.me/);
  assert.match(javascript, /Your parcels between Cameroon/);
  assert.match(javascript, /Vos colis entre le Cameroun/);
  assert.match(javascript, /Nos expéditions en images/);
  assert.match(javascript, /Shipping in action/);
  assert.match(javascript, /12505 Quiverbrook Ct, Bowie, MD 20720/);
  assert.match(javascript, /\+1 240 715 8407/);
  assert.match(javascript, /\+1 240 715 8406/);
  assert.match(javascript, /\+1 646 409 1168/);
  assert.match(javascript, /\+1 450 369 2148/);
  assert.match(javascript, /\+1 450 369 2149/);
  assert.match(javascript, /\+237 675 069 501/);
  assert.match(javascript, /\+237 678 50 82 28/);
  assert.match(javascript, /\+237 679 40 70 66/);
  assert.match(javascript, /google\.com\/maps\/dir/);
  assert.match(javascript, /Rue Rene Vachon, Salaberry-de-Valleyfield, J6S 0R4/);
  assert.match(javascript, /Shipping Rates from Cameroon/);
  assert.match(javascript, /Tarifs d’expédition depuis le Cameroun/);
  assert.match(javascript, /13,500 FCFA \/ kg/);
  assert.match(javascript, /18,000 FCFA \/ kg/);
  assert.match(javascript, /25,000 FCFA \/ kg/);
  assert.match(javascript, /From 15,000 FCFA \/ unit/);
  assert.match(javascript, /15,000 FCFA \/ item/);
  assert.match(javascript, /50,000 FCFA \/ kg/);
  assert.match(javascript, /From 20,000 FCFA \/ kg/);
  assert.match(javascript, /1,000 FCFA/);
  assert.match(javascript, /2,000 FCFA/);
  assert.match(javascript, /white powder/);
  assert.match(javascript, /daily market exchange rate/);
  assert.match(javascript, /Message sent from the NK Ultra Shipping Express website/);
  assert.match(javascript, /Message envoyé depuis le site NK Ultra Shipping Express/);
  assert.match(javascript, /What would you like to do\?/);
  assert.match(javascript, /Que souhaitez-vous faire \?/);
});

test("les six photos de la galerie sont présentes dans le build", async () => {
  const assetNames = await readdir(new URL("assets/", outputRoot));
  const galleryImages = assetNames.filter((name) =>
    /^shipping-(?:main|gallery-0[1-5])-[^.]+\.jpeg$/.test(name),
  );

  assert.equal(galleryImages.length, 6);
});

test("le projet ne dépend plus de Next, Vinext ou d'un Worker", async () => {
  const [packageJson, viteConfig, siteConfig] = await Promise.all([
    readFile(new URL("package.json", projectRoot), "utf8"),
    readFile(new URL("vite.config.ts", projectRoot), "utf8"),
    readFile(new URL("src/data/site-config.ts", projectRoot), "utf8"),
  ]);

  assert.doesNotMatch(packageJson, /vinext|wrangler|@cloudflare\/vite-plugin|@openai\/sites-vite-plugin/);
  assert.doesNotMatch(viteConfig, /worker|cloudflare|sites\(/i);
  assert.match(siteConfig, /id: "usa-cameroon"/);
  assert.match(siteConfig, /id: "cameroon-usa"/);
  assert.match(siteConfig, /id: "canada-cameroon"/);
  assert.match(siteConfig, /id: "cameroon-canada"/);

  await assert.rejects(access(new URL("app/page.tsx", projectRoot)));
  await assert.rejects(access(new URL("worker/index.ts", projectRoot)));
});

test("les sections suivent l'ordre éditorial demandé sans dupliquer les contacts", async () => {
  const sections = await readFile(new URL("src/sections/SiteSections.tsx", projectRoot), "utf8");
  const siteSections = sections.slice(sections.indexOf("export function SiteSections"));
  const expectedOrder = [
    "<Departures",
    "<QuickActions",
    "<Contacts",
    "<Pricing",
    "<MainGalleryImage",
    "<Gallery",
    "<Process",
    "<DeliveryPickup",
    "<Payments",
    "<Practical",
    "<Faq",
  ];

  const positions = expectedOrder.map((component) => siteSections.indexOf(component));
  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual(positions, [...positions].sort((left, right) => left - right));
  assert.equal((siteSections.match(/<Contacts\s/g) ?? []).length, 1);
  assert.equal((siteSections.match(/<QuickActions\s/g) ?? []).length, 1);
  assert.equal((siteSections.match(/<Pricing\s/g) ?? []).length, 1);
});

test("les dix départs de septembre 2026 sont uniques, complets et triés", async () => {
  const siteConfig = await readFile(new URL("src/data/site-config.ts", projectRoot), "utf8");
  const departureBlock = siteConfig.slice(
    siteConfig.indexOf("departures: ["),
    siteConfig.indexOf("pricing: {"),
  );
  const ids = [...departureBlock.matchAll(/id: "([^"]+)"/g)].map(([, id]) => id);
  const dates = [...departureBlock.matchAll(/date: "([^"]+)"/g)].map(([, date]) => date);
  const expectedIds = [
    "usa-cameroon-2026-09-03",
    "cameroon-usa-2026-09-05",
    "usa-cameroon-2026-09-10",
    "canada-cameroon-2026-09-13",
    "usa-cameroon-2026-09-15",
    "usa-cameroon-2026-09-17",
    "cameroon-usa-2026-09-19",
    "cameroon-canada-2026-09-19",
    "cameroon-usa-2026-09-20",
    "usa-cameroon-2026-09-26",
  ];

  assert.deepEqual(ids, expectedIds);
  assert.equal(new Set(ids).size, 10);
  assert.equal(dates.length, 10);
  assert.deepEqual(dates, [...dates].sort());
  assert.equal((departureBlock.match(/deadline: null/g) ?? []).length, 10);
  assert.doesNotMatch(departureBlock, /2026-08-/);
});

test("les liens WhatsApp normalisent les numéros et signent chaque message", async () => {
  const phoneSource = await readFile(new URL("src/utils/phone.ts", projectRoot), "utf8");
  const phoneJavascript = ts.transpileModule(phoneSource, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const utilities = await import(`data:text/javascript,${encodeURIComponent(phoneJavascript)}`);
  const numbers = [
    ["+1 240 715 8406", "12407158406"],
    ["+1 646 409 1168", "16464091168"],
    ["+1 450 369 2148", "14503692148"],
    ["+1 450 369 2149", "14503692149"],
    ["+237 675 069 501", "237675069501"],
    ["+237 678 50 82 28", "237678508228"],
    ["+237 679 40 70 66", "237679407066"],
    ["+237 679 46 83 36", "237679468336"],
    ["+1 240 715 8407", "12407158407"],
  ];

  for (const [phone, normalized] of numbers) {
    const link = utilities.createWhatsAppLink(phone, "Hello", "en");
    assert.ok(link);
    const url = new URL(link);
    assert.equal(url.pathname, `/${normalized}`);
    assert.match(
      url.searchParams.get("text"),
      /\n\n_Message sent from the NK Ultra Shipping Express website\._$/,
    );
  }

  const frenchLink = utilities.createWhatsAppLink(
    "+1 240 715 8407",
    "Bonjour",
    "fr",
  );
  assert.match(
    new URL(frenchLink).searchParams.get("text"),
    /\n\n_Message envoyé depuis le site NK Ultra Shipping Express\._$/,
  );
});

test("les contacts WhatsApp et leurs langues sont centralisés par pays d'origine", async () => {
  const siteConfig = await readFile(new URL("src/data/site-config.ts", projectRoot), "utf8");

  assert.match(siteConfig, /departureContacts:\s*\{[\s\S]*usa:\s*\["usa-240", "usa-646"\]/);
  assert.match(siteConfig, /canada:\s*\["canada-2148", "canada-2149"\]/);
  assert.match(siteConfig, /cameroon:\s*\[[\s\S]*"cameroon-douala-shipping"[\s\S]*"cameroon-yaounde"[\s\S]*"cameroon-buea"/);
  assert.match(siteConfig, /id: "cameroon-douala-general"[\s\S]*phone: "\+237 678 50 82 28"[\s\S]*whatsappLanguage: "fr"/);
  assert.match(siteConfig, /id: "cameroon-douala-shipping"[\s\S]*phone: "\+237 679 46 83 36"[\s\S]*whatsappLanguage: "fr"/);
  assert.match(siteConfig, /id: "cameroon-buea"[\s\S]*whatsappLanguage: "en"/);
});

test("les départs sont regroupés dans l'ordre métier et utilisent un sélecteur de contact", async () => {
  const [siteConfig, sections] = await Promise.all([
    readFile(new URL("src/data/site-config.ts", projectRoot), "utf8"),
    readFile(new URL("src/sections/SiteSections.tsx", projectRoot), "utf8"),
  ]);

  assert.match(siteConfig, /departureRouteOrder:\s*\[\s*"usa-cameroon",\s*"canada-cameroon",\s*"cameroon-usa",\s*"cameroon-canada",?\s*\]/);
  assert.match(sections, /siteConfig\.departureRouteOrder[\s\S]*routeDepartures/);
  assert.match(sections, /<WhatsAppContactPicker[\s\S]*buildDepartureMessage/);
  assert.match(sections, /copy\.departures\.requestDetails/);
});

test("les accès rapides filtrent les destinations et les anciens CTA les ciblent", async () => {
  const sections = await readFile(new URL("src/sections/SiteSections.tsx", projectRoot), "utf8");

  assert.match(sections, /routes\s*\.filter\(\(route\) => route\.origin === originId\)/);
  assert.match(sections, /getDepartureWhatsAppContacts\(activeRoute\.origin\)/);
  assert.match(sections, /href="#quick-actions-quote"/);
  assert.match(sections, /href="#quick-actions-tracking"/);
  assert.match(sections, /href="#quick-actions-item-check"/);
  assert.match(sections, /buildQuickActionMessage/);
});

test("les messages des accès rapides conservent le trajet, les champs et la langue du contact", async () => {
  const messageSource = await readFile(new URL("src/utils/whatsapp-messages.ts", projectRoot), "utf8");
  const messageJavascript = ts.transpileModule(messageSource, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const messages = await import(`data:text/javascript,${encodeURIComponent(messageJavascript)}`);
  const formData = {
    item: "Cosmétiques & vêtements",
    weight: "8 kg",
    quantity: "2",
    reference: "NK-2026/É01",
  };

  const englishQuote = messages.buildQuickActionMessage("quote", "USA", "Cameroon", formData, "en");
  assert.match(englishQuote, /from the USA to Cameroon/);
  assert.match(englishQuote, /Cosmétiques & vêtements/);
  assert.match(englishQuote, /Approximate weight: 8 kg/);

  const frenchTracking = messages.buildQuickActionMessage("tracking", "Cameroun", "États-Unis", formData, "fr");
  assert.match(frenchTracking, /du Cameroun vers les États-Unis/);
  assert.match(frenchTracking, /NK-2026\/É01/);

  const bueaDeparture = messages.buildDepartureMessage("Cameroun", "USA", "en");
  assert.match(bueaDeparture, /^Hello,/);
  const doualaDeparture = messages.buildDepartureMessage("Cameroun", "États-Unis", "fr");
  assert.match(doualaDeparture, /^Bonjour,/);
});
