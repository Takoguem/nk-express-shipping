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
