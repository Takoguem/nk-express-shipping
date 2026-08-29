# NK Ultra Shipping Express × Express Air Shipping

Site vitrine statique, bilingue français/anglais et responsive pour deux entreprises distinctes qui travaillent en partenariat :

- **NK Ultra Shipping Express** — « Your Package, Our Priority » ;
- **Express Air Shipping**.

Le projet utilise React, TypeScript, Vite et Tailwind CSS. Il ne contient aucun backend, aucune base de données, aucune authentification, aucune API métier et aucune fonction serveur. Le dossier `dist` produit par le build peut être publié directement sur Cloudflare Pages.

## Sommaire

- [Installation](#installation)
- [Lancer le site](#lancer-le-site)
- [Créer le build statique](#créer-le-build-statique)
- [Ajouter les logos](#ajouter-les-logos)
- [Modifier le contenu du site](#modifier-le-contenu-du-site)
- [Comprendre les données vides](#comprendre-les-données-vides)
- [Structure du projet](#structure-du-projet)
- [Déploiement sur Cloudflare Pages](#déploiement-sur-cloudflare-pages)

## Prérequis

- Node.js `22.13.0` ou une version plus récente ;
- npm, fourni avec Node.js ;
- Git et un compte GitHub pour le déploiement automatique.

## Installation

Depuis la racine du projet :

```bash
npm install
```

Le fichier `package-lock.json` doit être conservé afin de garantir des installations reproductibles. Sur Cloudflare Pages, l’installation peut être effectuée avec `npm ci` automatiquement.

## Lancer le site

```bash
npm run dev
```

Vite affiche une adresse locale dans le terminal. Ouvrez cette adresse dans un navigateur pour prévisualiser les modifications.

## Créer le build statique

```bash
npm run build
```

Cette commande effectue d’abord la vérification TypeScript, puis crée le site optimisé dans :

```text
dist/
```

Le fichier d’entrée final est :

```text
dist/index.html
```

Pour tester exactement le build de production :

```bash
npm run preview
```

Autres vérifications disponibles :

```bash
npm run lint
npm test
```

| Commande | Utilité |
| --- | --- |
| `npm run dev` | Lance le serveur de développement Vite. |
| `npm run build` | Vérifie TypeScript et produit le site statique dans `dist`. |
| `npm run preview` | Sert localement le contenu final de `dist`. |
| `npm run lint` | Vérifie la qualité du code React et TypeScript. |
| `npm test` | Reconstruit puis vérifie les fichiers statiques générés. |

## Ajouter les logos

Placez les deux fichiers dans ces chemins exacts :

```text
src/assets/logos/nk-ultra-shipping-logo.png
src/assets/logos/express-air-shipping-logo.png
```

Les noms doivent correspondre aux propriétés `logoFile` de `companyPartners` dans `src/data/site-config.ts`.

Conseils :

- utilisez de préférence des PNG transparents, propres et compressés ;
- ne fusionnez pas les deux logos en une seule image ;
- conservez un poids visuel comparable pour les deux entreprises ;
- si un logo manque, le site affiche automatiquement le nom légal de l’entreprise sans image cassée.

Les formats `.jpg`, `.jpeg`, `.webp` et `.svg` sont également pris en charge si la propriété `logoFile` est mise à jour avec le bon nom.

---

## Modifier le contenu du site

> **FICHIER PRINCIPAL À MODIFIER : `src/data/site-config.ts`**
>
> Les informations commerciales peuvent être modifiées dans ce fichier sans toucher aux composants React ni au design.

Ce fichier centralise notamment :

- les deux entreprises, leurs slogans et leurs fichiers de logo ;
- le numéro WhatsApp principal ;
- les pays et les quatre trajets ;
- les dates de départ ;
- les contacts, villes, zones et adresses ;
- les services ;
- les moyens de paiement ;
- la livraison et le retrait ;
- les informations pratiques ;
- la FAQ ;
- les réseaux sociaux ;
- la bannière d’annonce ;
- le chemin du favicon.

Les textes fixes français et anglais se trouvent dans `src/data/translations.ts`. Les types de données sont définis dans `src/types/site.ts`.

### Ajouter un départ

Ajoutez un objet dans le tableau `departures`. La propriété `routeId` doit correspondre à l’identifiant d’un trajet existant.

```ts
departures: [
  {
    id: "departure-001",
    routeId: "usa-cameroon",
    date: "2026-09-10",
    deadline: "2026-09-06",
    statusFr: "Places disponibles",
    statusEn: "Space available",
    noteFr: "",
    noteEn: "",
    enabled: true,
  },
],
```

Règles :

- utilisez le format `AAAA-MM-JJ` ;
- donnez un `id` unique à chaque départ ;
- gardez les champs inconnus vides, à `null`, ou supprimez-les ;
- les dates passées ou invalides ne sont pas affichées comme prochaines dates ;
- les dates futures actives sont triées automatiquement ;
- le premier départ reçoit automatiquement le badge « Prochain départ » ;
- le message WhatsApp reprend automatiquement le trajet concerné.

### Masquer ou supprimer un départ

- remplacez `enabled: true` par `enabled: false` pour le masquer temporairement ;
- retirez l’objet du tableau pour le supprimer définitivement.

### Modifier WhatsApp

Modifiez uniquement :

```ts
whatsapp: {
  primary: "+1 240 715 8407",
},
```

Le site nettoie automatiquement les espaces, parenthèses, tirets et signes avant de créer les liens `wa.me`.

### Ajouter une adresse

Dans le contact concerné, remplacez `address: null` par une adresse confirmée :

```ts
address: "Adresse complète confirmée",
```

Ne renseignez jamais une adresse supposée. Avec `address: null`, le site invite automatiquement le visiteur à demander le point de dépôt.

### Ajouter un moyen de paiement

Complétez uniquement la liste du pays concerné :

```ts
paymentMethods: {
  usa: ["Moyen de paiement confirmé"],
  canada: [],
  cameroon: [],
},
```

Une liste vide affiche automatiquement un message invitant le visiteur à contacter l’équipe.

### Ajouter TikTok, Instagram ou Facebook

Ajoutez l’URL officielle complète :

```ts
socials: {
  tiktok: "https://www.tiktok.com/@compte-officiel",
  instagram: "",
  facebook: "",
},
```

Une plateforme avec une URL vide reste entièrement masquée.

### Activer une annonce

```ts
announcement: {
  enabled: true,
  textFr: "Le dépôt des colis ferme samedi à 18 h.",
  textEn: "Parcel drop-off closes on Saturday at 6 p.m.",
},
```

Utilisez `enabled: false` pour masquer la bannière sans effacer les textes.

### Ajouter un service

Ajoutez uniquement un service officiellement confirmé :

```ts
services: [
  {
    id: "service-confirme",
    titleFr: "Nom français confirmé",
    titleEn: "Confirmed English name",
    descriptionFr: "Description française facultative.",
    descriptionEn: "Optional English description.",
    enabled: true,
  },
],
```

### Configurer le favicon

Placez un fichier léger dans `public`, par exemple `public/favicon.png`, puis modifiez :

```ts
seo: {
  faviconPath: "/favicon.png",
},
```

Avec une chaîne vide, aucun favicon personnalisé n’est chargé.

### Modifier l’image de partage social

Remplacez :

```text
public/og.png
```

Le build copie automatiquement cette image vers `dist/og.png`.

## Comprendre les données vides

Le site ne rend jamais publiquement `null`, `undefined`, une chaîne vide ou un libellé sans valeur.

| Donnée absente | Comportement visible |
| --- | --- |
| Aucun départ futur actif | Message annonçant de nouvelles dates et bouton WhatsApp. |
| Date passée ou invalide | Départ retiré automatiquement de la liste à venir. |
| `address: null` | Invitation à demander le point de dépôt. |
| `services: []` | Invitation à vérifier le colis sur WhatsApp. |
| Moyens de paiement vides | Invitation à demander les moyens disponibles. |
| URL sociale vide | Plateforme entièrement masquée. |
| Annonce désactivée | Bannière et espace entièrement masqués. |
| Champ facultatif vide | Ligne inutile non rendue. |
| Logo absent | Nom légal affiché comme solution de repli. |
| Élément désactivé | Élément masqué sans suppression de la configuration. |

## Structure du projet

```text
index.html                       Page HTML statique et métadonnées SEO
public/                          Fichiers copiés tels quels dans le build
src/
├── App.tsx                      Composant racine React
├── main.tsx                     Point d’entrée Vite
├── styles.css                  Styles globaux et responsive
├── assets/logos/               Logos des deux partenaires
├── components/                 Composants réutilisables
├── data/site-config.ts         Informations commerciales modifiables
├── data/translations.ts        Interface française et anglaise
├── hooks/                      Gestion de la langue
├── sections/                   Sections de la page
├── types/                      Types TypeScript
└── utils/                      Dates, téléphone et WhatsApp

vite.config.ts                  Configuration du build statique
postcss.config.mjs              Configuration Tailwind CSS
dist/                           Sortie finale générée, non modifiée à la main
```

Le projet est une application React exécutée entièrement dans le navigateur. Le choix FR/EN est conservé dans `localStorage`. Aucun code n’est exécuté côté serveur après le déploiement.

## Déploiement sur Cloudflare Pages

Ce projet est un site statique React + TypeScript + Vite. Cloudflare Pages exécute la commande de build, puis publie directement le contenu du dossier `dist`. Aucune base de données, authentification, API ou fonction serveur n’est nécessaire.

### Paramètres de build

Utilisez exactement les paramètres suivants :

```text
Build command:
npm run build

Build output directory:
dist

Root directory:
/

Production branch:
main
```

Vous pouvez sélectionner `Vite` comme préréglage de framework. Aucune variable d’environnement n’est nécessaire pour cette version du site.

### 1. Mettre le projet sur GitHub

1. Créez un nouveau dépôt vide sur GitHub.
2. Ouvrez un terminal à la racine du projet.
3. Vérifiez que les fichiers à publier sont prêts, puis envoyez-les sur la branche `main` :

```bash
git init
git add .
git commit -m "Préparer le site pour Cloudflare Pages"
git branch -M main
git remote add origin https://github.com/VOTRE-COMPTE/VOTRE-DEPOT.git
git push -u origin main
```

Remplacez `VOTRE-COMPTE` et `VOTRE-DEPOT` par les valeurs du dépôt GitHub. Si le dépôt local possède déjà une adresse distante nommée `origin`, ne répétez pas la commande `git remote add origin`.

### 2. Connecter GitHub à Cloudflare Pages

1. Connectez-vous au tableau de bord Cloudflare.
2. Ouvrez la section **Pages** et choisissez la création d’un nouveau projet.
3. Sélectionnez l’option de connexion à Git.
4. Autorisez Cloudflare à accéder à GitHub si cela est demandé.
5. Sélectionnez le dépôt qui contient ce site.
6. Choisissez `main` comme branche de production.

### 3. Configurer le build

Dans les paramètres du projet Cloudflare Pages :

1. choisissez `Vite` comme préréglage de framework ;
2. saisissez `npm run build` dans **Build command** ;
3. saisissez `dist` dans **Build output directory** ;
4. saisissez `/` dans **Root directory** ;
5. conservez `main` comme **Production branch** ;
6. n’ajoutez aucune variable d’environnement pour cette version.

### 4. Déployer le site

Lancez le déploiement depuis Cloudflare Pages. La plateforme installe les dépendances, exécute `npm run build`, vérifie la présence de `dist`, puis publie les fichiers statiques générés.

Si le build réussit, le site devient accessible immédiatement. Le fichier publié comme page d’accueil est `dist/index.html`.

### 5. Obtenir l’URL gratuite

Après le premier déploiement, Cloudflare attribue automatiquement une adresse gratuite se terminant par :

```text
.pages.dev
```

Cette adresse peut être partagée immédiatement et reste liée au projet Cloudflare Pages.

### 6. Mettre le site à jour plus tard

Après avoir modifié `src/data/site-config.ts`, les traductions, les logos ou un autre fichier, vérifiez le site puis envoyez les changements sur GitHub :

```bash
npm run build
git add .
git commit -m "Mettre à jour le contenu du site"
git push
```

Chaque `git push` sur la branche `main` déclenche automatiquement un nouveau build et remplace la version en production lorsque le déploiement réussit.

### 7. Connecter un nom de domaine personnalisé

Un domaine personnalisé est facultatif. Pour en ajouter un :

1. ouvrez le projet dans Cloudflare Pages ;
2. accédez à la section des domaines personnalisés ;
3. choisissez l’ajout d’un domaine ;
4. saisissez le domaine ou sous-domaine souhaité ;
5. suivez les instructions DNS affichées par Cloudflare ;
6. attendez la validation et l’activation du certificat HTTPS.

L’adresse gratuite en `.pages.dev` continue de fonctionner même après l’ajout d’un domaine personnalisé.

## Vérifications avant publication

- les deux partenaires sont clairement séparés ;
- les vrais logos sont ajoutés dès qu’ils sont disponibles ;
- les quatre trajets sont configurés ;
- seules les dates futures actives sont affichées ;
- les textes français et anglais sont présents ;
- le choix de langue persiste ;
- les liens `tel:` et WhatsApp utilisent les bons numéros ;
- aucune adresse, aucun tarif, aucun service ni aucun paiement n’a été inventé ;
- les réseaux sociaux vides sont masqués ;
- `npm run lint`, `npm run build` et `npm test` réussissent ;
- `dist/index.html` existe avant le déploiement.
