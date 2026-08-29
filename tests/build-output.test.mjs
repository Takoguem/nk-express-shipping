import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);
const outputRoot = new URL("../dist/", import.meta.url);

test("le build produit une page statique Cloudflare Pages", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");

  assert.match(html, /<div id="root"><\/div>/);
  assert.match(html, /<meta\s+name="description"/);
  assert.match(html, /<meta property="og:image" content="\/og\.png"/);
  assert.match(html, /<script type="module" crossorigin src="\/assets\//);
  await access(new URL("og.png", outputRoot));
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

  assert.match(javascript, /shipping-site-language/);
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
    "<Contacts",
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
});
