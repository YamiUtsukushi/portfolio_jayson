# 🟣 Jayson Mooken — Portfolio

> Portfolio personnel de Jayson Mooken, Ingénieur Développeur Full Stack.
> Construit avec Next.js 14, Framer Motion et un design system dark luxury / glassmorphism.

🌐 **Live** → [jayson-mooken-portfolio.netlify.app](https://jayson-mooken-portfolio.netlify.app)

---

## ✨ Aperçu

Interface dark luxury aux teintes violettes avec :
- Animations scroll-triggered sur chaque section
- Cards projets avec effet 3D tilt au hover
- Curseur personnalisé violet avec effet magnétique
- Formulaire de contact fonctionnel (envoi email via Brevo)
- Design 100% responsive (mobile, tablette, desktop)

---

## 🧱 Stack technique

| Catégorie | Technologie |
|-----------|-------------|
| Framework | Next.js 14 (App Router) |
| Langage | TypeScript strict |
| Styling | Tailwind CSS + CSS custom properties |
| Animations | Framer Motion |
| Icônes | Lucide React |
| Fonts | Syne (titres) + DM Sans (corps) |
| Emails | Brevo REST API |
| Déploiement | Netlify |

---

## 🎨 Design System

### Palette

```css
--color-primary:     #50207A;   /* violet profond */
--color-accent-soft: #D6B9FC;   /* lavande claire */
--color-accent-mid:  #838CE5;   /* bleu-violet */
--color-bg:          #0A0A0F;   /* fond ultra-dark */
--color-bg-card:     #12101A;   /* fond des cards */
--color-text:        #EDE8FF;   /* texte principal */
--color-muted:       #7A7090;   /* texte secondaire */
```

### Typographie
- **Titres** : Syne 700/800
- **Corps** : DM Sans 400/500

---

## 🗂️ Structure du projet

```
/app
  layout.tsx                    → Layout global (curseur, navbar, transitions)
  page.tsx                      → Page d'accueil (Hero + Projets)
  /about/page.tsx               → Page À propos (expériences, formations, compétences)
  /contact/page.tsx             → Page Contact dédiée
  /projects/[slug]/page.tsx     → Page détail projet
  /api/contact/route.ts         → API Route — envoi email via Brevo

/components
  /ui
    CustomCursor.tsx            → Curseur violet magnétique
    ScrollProgress.tsx          → Barre de progression au scroll
    ScrollToTop.tsx             → Reset scroll à chaque navigation
    PageTransition.tsx          → Wipe animation entre pages
    MagneticButton.tsx          → Bouton avec effet magnétique
    StatusBadge.tsx             → Badge statut (Déployé / En cours / Archivé)
    NoiseBg.tsx                 → Texture grain cinématique
  /sections
    Hero.tsx                    → Section héro avec texte rotatif
    ProjectGrid.tsx             → Grille de projets filtrée
    ProjectCard.tsx             → Card projet avec effet 3D tilt
    Contact.tsx                 → Formulaire de contact
  /layout
    Navbar.tsx                  → Navigation sticky glassmorphism
    Footer.tsx                  → Pied de page

/data
  projects.ts                   → Source de vérité des projets

/lib
  animations.ts                 → Variants Framer Motion réutilisables
  utils.ts
```

---

## 🚀 Lancer le projet en local

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation

```bash
git clone https://github.com/YamiUtsukushi/portfolio.git
cd portfolio
npm install
```

### Variables d'environnement

Crée un fichier `.env.local` à la racine :

```env
BREVO_API_KEY=ta_clé_api_brevo
```

> Récupère ta clé sur [app.brevo.com](https://app.brevo.com) → Paramètres → SMTP & API → Clés API

### Démarrage

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000)

### Build production

```bash
npm run build
npm start
```

---

## 📦 Projets présentés

| Projet | Stack | Statut | Live |
|--------|-------|--------|------|
| Sneakers Shop React | React, Vite, Context API | ✅ Déployé | [Voir](https://sneakers-shop-react.netlify.app/) |
| Shopify Theme iDhighTech2 | Shopify, Liquid, JS | ✅ Déployé | GitHub |
| Shopify Theme LD Global | Shopify, Liquid, JS | ✅ Déployé | [Voir](https://ldglobalco.myshopify.com/) |
| Machine Learning & Deep Learning | Python, TensorFlow, PyTorch | ⚙ En cours | GitHub |
| Web Scraping & Analyse de ventes | Python, Pandas, Matplotlib | ⚙ En cours | GitHub |
| Guess The Code | Vanilla JS, HTML, CSS | ✅ Déployé | [Voir](https://guess-the-code-by-jayson.netlify.app/) |
| Tic-Tac-Toe | React, Node.js, WebSockets | ⚙ En cours | GitHub |

---

## 📬 Formulaire de contact

Le formulaire utilise l'API Brevo pour envoyer un email transactionnel directement sur `jaymooken@gmail.com`.

Route API : `POST /api/contact`

Payload attendu :
```json
{
  "name": "Prénom Nom",
  "email": "email@example.com",
  "message": "Votre message..."
}
```

---

## 🛠️ Générer le CV

Un script de génération de CV ATS-optimisé en `.docx` est inclus :

```bash
npm install docx
node generate-cv.js
```

Le fichier `CV_Jayson_Mooken.docx` est généré à la racine du projet.

---

## 🚢 Déploiement sur Netlify

1. Connecte ton repo GitHub à Netlify
2. Build command : `npm run build`
3. Publish directory : `.next`
4. Ajoute la variable d'environnement `BREVO_API_KEY` dans **Site settings → Environment variables**
5. Redéploie

---

## 📄 Licence

MIT — libre d'utilisation et de modification.

---

Projet réalisé par **Jayson MOOKEN**
🔗 [LinkedIn](https://www.linkedin.com/in/jayson-mooken/)

*Développé avec ☕ par [Jayson Mooken](https://github.com/YamiUtsukushi)*
