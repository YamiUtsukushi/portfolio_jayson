// ============================================
// SOURCE DE VÉRITÉ — Projets
// Remplace les données placeholder par tes vrais projets
// ============================================

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;        // Pour la card (1–2 lignes)
  longDescription: string;         // Pour la page détail (markdown-like)
  tags: string[];                  // ['React', 'Next.js', 'Prisma', ...]
  category: 'web' | 'mobile' | 'design' | 'other';
  status: 'deployed' | 'in-progress' | 'archived';
  liveUrl?: string;                // Optionnel
  githubUrl?: string;              // Optionnel
  image: string;                   // /images/projects/nom-projet.jpg
  screenshots?: string[];          // Images pour la page détail
  year: number;
  featured: boolean;               // Apparaît en premier dans la grille
}

export const projects: Project[] = [
  // ─── FEATURED ────────────────────────────────────────────────────────────────

  {
    slug: 'portail-observabilite-grafana',
    title: 'Portail de Gestion de Projets d\'Observabilité',
    shortDescription:
      'Portail full stack intégré à Grafana : dashboards et rapports rangés par client et par campagne de tests, ouverts en un clic sur la bonne période.',
    longDescription: `Projet de fin d'études Bac+5 réalisé chez Atakama Technologies (nov. 2023 – juin 2025). J'ai conçu et développé seul, en full stack, un portail web qui centralise par projet client et par campagne de tests les dashboards Grafana et les livrables documentaires. L'application automatise l'import des dashboards via l'API Grafana, les cale sur la période de chaque campagne, et elle est déployée en continu en production.

Le besoin

Atakama mène des campagnes de tests de performance et de monitoring pour ses clients (load tests, monitoring synthétique, expérience utilisateur, infrastructure…), dont les résultats vivent dans Grafana. Avant le portail, les équipes devaient retrouver à la main les bons dashboards dans la bonne organisation Grafana, puis saisir la plage temporelle de la campagne. Le portail range tout par projet puis par campagne, avec les rapports associés, et ouvre chaque dashboard en un clic, déjà calé sur la bonne période.

Fonctionnalités

• Projets clients : création, modification, suppression, et affectation à des utilisateurs par l'admin (relation N-N)
• Configuration Grafana par projet : URL, organisation et identifiants, test de connexion avant enregistrement, nom de l'organisation importé comme nom de projet
• Campagnes datées (début / fin) avec import groupé de dashboards dès la création
• Import automatique depuis l'API Grafana : récupération des dashboards et classement par type selon leurs tags (LoadTest, DigitalExpMon, Infrastructure…)
• Injection automatique de from / to / orgId dans les URLs Grafana, avec une option « sans plage temporelle »
• Dashboards : ajout en masse, détection des doublons côté front et back, modification et suppression unitaire ou multiple
• Consultation : dashboards groupés par type, recherche, filtres par type et par période, ouverture directe dans Grafana
• Documents de campagne : upload, téléchargement, remplacement et suppression de rapports (PDF, etc.)
• Navigation en arbre Projets → Campagnes dans une barre latérale qui suit l'URL
• Comptes : connexion JWT, déconnexion automatique à l'expiration du token, mot de passe oublié par e-mail, édition du profil
• Administration : gestion des utilisateurs et des rôles, filtre des projets par utilisateur

Back-end

• API REST Node.js 20 / Express en couches : routes → services → repositories → modèles Sequelize
• Routes REST imbriquées : /projets/:id/details/:detailId/dashboards et /documents
• PostgreSQL 16 : 8 tables, relations 1-1 (configuration Grafana) et N-N (affectations), ENUM pour les types de dashboards, suppressions en cascade
• Authentification JWT + bcrypt, rôles USER / ADMIN protégés par middleware
• Validation des entrées avec express-validator, gestion d'erreurs centralisée
• Proxy back-end vers Grafana pour contourner le CORS et garder les appels côté serveur
• Upload de fichiers avec Multer, e-mails transactionnels avec Nodemailer

Front-end

• React 18 avec React Router 6 et routes privées, panneau admin chargé à la demande
• Pattern vue / contrôleur : chaque écran a un hook useXxxController qui porte l'état et les appels API, le composant ne fait que l'affichage
• État global léger avec trois contextes (Auth, Project, Campaign) plutôt que Redux
• Recherche, filtres, tris par colonne, actions groupées, upload et téléchargement de documents

CI/CD et infrastructure

• Trois services Docker (front React, API Express, PostgreSQL) derrière le reverse proxy Traefik en HTTPS
• GitHub Actions : à chaque push sur main, build d'une image Docker taguée par le hash du commit, push sur un registre privé
• Déploiement automatique via un playbook Ansible lancé en SSH sur le serveur, sans intervention manuelle
• Deux dépôts orchestrés par sous-modules git : l'API déclenche ensuite le pipeline du front

Ce que ça apporte

• Gain de temps : plus besoin de naviguer dans Grafana ni de saisir les dates à la main
• Fiabilité : URLs normalisées, doublons détectés, configuration Grafana vérifiée avant enregistrement
• Traçabilité : chaque campagne regroupe sa période, ses dashboards et ses livrables
• Pilotage : vue consolidée des projets par utilisateur et accès attribués par l'admin

En chiffres

• 15 fonctionnalités livrées front et back
• ~600 commits (≈ 250 côté API, ≈ 360 côté front)
• 19 mois de développement, méthode agile avec tickets Jira`,
    tags: [
      'React 18',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Sequelize',
      'Grafana',
      'JWT',
      'Docker',
      'GitHub Actions',
      'Ansible',
      'Traefik',
    ],
    category: 'web',
    status: 'deployed',
    image: '/images/projects/portail-observabilite-grafana.jpg',
    year: 2025,
    featured: true,
  },

  {
    slug: 'sneakers-shop-react',
    title: 'Sneakers Shop React',
    shortDescription:
      'Boutique de sneakers en React : deux rôles (client / admin), catalogue filtrable, panier, checkout en 3 étapes, favoris, dark mode et back-office.',
    longDescription: `KICKS est une boutique de sneakers en ligne développée en React 18 avec Vite. Le projet est né en 2023 comme un simple catalogue, puis je l'ai entièrement refondu en 2026 pour en faire une application e-commerce complète, avec un parcours client de la recherche à la commande et un back-office administrateur. C'est une application 100 % front-end : les produits viennent d'un fichier JSON, les comptes et les commandes sont simulés, et l'état est persisté dans le localStorage.

L'objectif

Construire un e-commerce réaliste sans back-end, pour travailler l'architecture d'une application React de taille moyenne : routage protégé par rôle, état global partagé entre de nombreux écrans, persistance côté client et design system cohérent en mode clair comme en mode sombre.

Authentification et rôles

• Page de connexion comme point d'entrée unique, avec deux comptes de démonstration : admin et client
• Redirection automatique selon le rôle après connexion, et dès l'arrivée si la session existe déjà
• Composant ProtectedRoute réutilisable : toutes les pages exigent d'être connecté, le dashboard exige le rôle admin
• Session persistée dans le localStorage, sans jamais y stocker le mot de passe

Parcours client

• Catalogue de 14 sneakers en grille responsive, avec pages Homme et Femme (articles mixtes inclus)
• Recherche par nom ou par marque, en temps réel
• Filtres combinables : prix maximum, note minimale, en stock uniquement, plus un bouton de réinitialisation
• Tri par prix croissant ou décroissant et par meilleures notes
• Skeleton loaders pendant le chargement du catalogue
• Fiche produit : galerie avec miniatures cliquables, note en étoiles, stock disponible, sélection de taille obligatoire avant l'ajout au panier
• Favoris avec compteur dans la navbar et page dédiée

Panier et commande

• Panier : quantités modifiables, suppression d'un article, vider le panier, sous-total et total en direct
• Livraison offerte dès 100 €, avec un message indiquant le montant restant
• Checkout en 3 étapes avec stepper : livraison, paiement simulé (formatage automatique du numéro de carte), confirmation
• Récapitulatif de commande affiché tout au long du tunnel

Back-office administrateur

• Layout dédié avec sidebar, et menu burger sur mobile
• KPIs : nombre d'articles, ruptures de stock, chiffre d'affaires simulé, commandes en attente
• Catalogue : tableau complet avec ajout, modification et suppression d'articles via un formulaire (tailles, catégorie, mise en ligne, images)
• Gestion des stocks : ajustement + / − par article, statuts Rupture / Faible / OK
• Commandes : liste simulée avec statuts colorés

Architecture

• React Router 6 : routes publiques, routes protégées et redirection par rôle, page 404 qui renvoie vers l'accueil adapté au rôle
• Trois contextes : AuthContext (session et rôle), ShopContext (panier et favoris), ThemeContext (mode sombre)
• Panier et favoris gérés par un useReducer avec des actions explicites (CART_ADD, CART_UPDATE_QUANTITY, FAVORITES_TOGGLE…)
• Persistance du panier, des favoris, de la session et du thème dans le localStorage, avec hydratation au démarrage
• Calculs dérivés (total, nombre d'articles, liste filtrée) mémoïsés avec useMemo
• Design system en CSS custom properties, qui permet de basculer tout le site en mode sombre via un simple attribut data-theme

UX et responsive

• Interface épurée, adaptée au mobile, à la tablette et au desktop
• Dark mode complet sur toute la partie client, mémorisé d'une visite à l'autre
• États vides soignés (panier vide, aucun favori, aucun résultat) avec un appel à l'action
• Retours visuels immédiats : confirmation d'ajout au panier, message d'erreur si aucune taille n'est choisie

Pour tester

• Client : user / user123
• Administrateur : admin / admin123`,
    tags: ['React 18', 'Vite', 'React Router 6', 'Context API', 'useReducer', 'JavaScript', 'CSS3'],
    category: 'web',
    status: 'deployed',
    githubUrl: 'https://github.com/YamiUtsukushi/sneakers-shop-react',
    liveUrl: 'https://sneakers-shop-react.netlify.app/',
    image: '/images/projects/sneakers-shop-react.jpg',
    year: 2026,
    featured: true,
  },

  {
    slug: 'shopify-theme-idhightech',
    title: 'Shopify Theme — iDhighTech2',
    shortDescription:
      'Thème Shopify Online Store 2.0 pour boutique high-tech, basé sur Dawn avec sections et composants custom.',
    longDescription: `Thème Shopify Online Store 2.0 développé pour une boutique high-tech — construit sur Dawn avec une personnalisation avancée en Liquid, CSS et JavaScript.

Fonctionnalités clés :
• Architecture Online Store 2.0 : sections et blocs configurables
• Composants custom : hero produit, bannières promo, fiches techniques
• Optimisation performance : lazy loading, images srcset, scripts différés
• Full responsive mobile-first
• Intégration native des apps Shopify (reviews, upsells, etc.)

Stack technique : Liquid, Shopify CLI, JavaScript, CSS3.`,
    tags: ['Shopify', 'Liquid', 'JavaScript', 'CSS3'],
    category: 'web',
    status: 'deployed',
    githubUrl: 'https://github.com/YamiUtsukushi/shopify-tech-store-theme',
    image: '/images/projects/shopify-idhightech.jpg',
    year: 2023,
    featured: true,
  },

  {
    slug: 'ml-deep-learning',
    title: 'Machine Learning & Deep Learning',
    shortDescription:
      '3 cas pratiques : CNN sur CIFAR-10, Random Forest sur données bancaires, LSTM pour le NLP.',
    longDescription: `Exploration de 3 cas pratiques en Machine Learning et Deep Learning, couvrant les principaux paradigmes de l'IA moderne.

Cas 1 — CNN (CIFAR-10) :
• Classification d'images avec un réseau de convolution
• Data augmentation, dropout, batch normalization
• Accuracy finale > 85% sur le jeu de test

Cas 2 — Random Forest (données bancaires) :
• Détection de fraude sur données tabulaires déséquilibrées
• Feature engineering, SMOTE, GridSearchCV
• Analyse d'importance des features

Cas 3 — LSTM (NLP) :
• Analyse de sentiment sur corpus de texte
• Tokenisation, embedding, séquences variables
• Architecture bidirectionnelle

Stack technique : Python, TensorFlow, Keras, PyTorch, Scikit-Learn, Pandas, NumPy.`,
    tags: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'Keras', 'NLP'],
    category: 'other',
    status: 'in-progress',
    githubUrl: 'https://github.com/YamiUtsukushi/Application_MachineLearning_DeepLearning',
    image: '/images/projects/ml-deep-learning.jpg',
    year: 2024,
    featured: true,
  },

  // ─── AUTRES ──────────────────────────────────────────────────────────────────

  {
    slug: 'shopify-theme-ldglobal',
    title: 'Shopify Theme — LD Global',
    shortDescription:
      'Thème Shopify Online Store 2.0 pour boutique gadgets cuisine — cart drawer, sections custom, FAQ/Contact/À propos, full responsive.',
    longDescription: `Thème Shopify Online Store 2.0 pour une boutique de gadgets de cuisine, basé sur Dawn avec un niveau de personnalisation avancé.

Fonctionnalités clés :
• Cart drawer animé avec upsells et récapitulatif produits
• Sections custom : hero lifestyle, grille de catégories, témoignages
• Pages dédiées : FAQ accordion, Contact stylisée, À propos avec valeurs
• Navigation mega-menu sur desktop, hamburger sur mobile
• Optimisation SEO : balises structurées, sitemap, meta dynamiques

Stack technique : Liquid, Shopify CLI, JavaScript, CSS3.`,
    tags: ['Shopify', 'Liquid', 'JavaScript', 'CSS3'],
    category: 'web',
    status: 'deployed',
    githubUrl: 'https://github.com/YamiUtsukushi/shopify-kitchen-gadgets-theme',
    liveUrl: 'https://ldglobalco.myshopify.com/',
    image: '/images/projects/shopify-ldglobal.jpg',
    year: 2023,
    featured: false,
  },

  {
    slug: 'web-scraping-analyse-ventes',
    title: 'Web Scraping & Analyse de ventes',
    shortDescription:
      'Pipeline complet : scraping, nettoyage, analyse statistique et visualisation de données de ventes.',
    longDescription: `Pipeline de données end-to-end — du scraping web à la visualisation de données de ventes.

Étapes du pipeline :
• Scraping : extraction automatisée avec BeautifulSoup et gestion des erreurs, retries, rate limiting
• Nettoyage : traitement des valeurs manquantes, normalisation, déduplication avec Pandas
• Analyse : statistiques descriptives, corrélations, détection d'anomalies
• Visualisation : dashboards matplotlib avec graphiques interactifs (tendances, saisonnalité, top produits)

Ce projet illustre une approche data engineering complète, de la collecte brute à l'insight business.

Stack technique : Python, BeautifulSoup, Pandas, Matplotlib, NumPy.`,
    tags: ['Python', 'BeautifulSoup', 'Pandas', 'Matplotlib', 'Data'],
    category: 'other',
    status: 'in-progress',
    githubUrl: 'https://github.com/YamiUtsukushi/webscraping-analyse-ventes-matplotlib',
    image: '/images/projects/web-scraping-ventes.jpg',
    year: 2024,
    featured: false,
  },

  {
    slug: 'guess-the-code',
    title: 'Guess The Code',
    shortDescription:
      'Jeu de déduction avec niveaux de difficulté, timer, système de score et historique des parties.',
    longDescription: `Un jeu de déduction façon Mastermind, entièrement en Vanilla JS — sans framework, sans dépendances.

Fonctionnalités :
• 3 niveaux de difficulté (Easy / Medium / Hard) avec longueur de code variable
• Timer en temps réel et pression croissante
• Système de score basé sur la rapidité et le nombre de tentatives
• Historique des parties persisté en localStorage
• Feedback visuel immédiat à chaque tentative

Ce projet prouve qu'on peut faire quelque chose de solide avec juste HTML, CSS et JavaScript natif.

Stack technique : Vanilla JS, HTML5, CSS3.`,
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Vanilla JS'],
    category: 'web',
    status: 'deployed',
    githubUrl: 'https://github.com/YamiUtsukushi/guess-the-code',
    liveUrl: 'https://guess-the-code-by-jayson.netlify.app/',
    image: '/images/projects/guess-the-code.jpg',
    year: 2024,
    featured: false,
  },

  {
    slug: 'tic-tac-toe',
    title: 'Tic-Tac-Toe',
    shortDescription:
      'Jeu de morpion en temps réel avec React côté client et Node.js côté serveur.',
    longDescription: `Un Tic-Tac-Toe multijoueur en temps réel — deux joueurs, une connexion, zéro latence.

Architecture :
• Serveur Node.js avec WebSockets pour la communication temps réel
• Client React gérant l'état du plateau, le tour actif et les résultats
• Logique de détection de victoire côté serveur (anti-triche)
• Reconnexion automatique si la connexion est perdue

Simple dans son concept, mais solide dans son implémentation — un bon exercice de communication client-serveur en temps réel.

Stack technique : React, Node.js, WebSockets.`,
    tags: ['React', 'Node.js', 'WebSockets', 'JavaScript'],
    category: 'web',
    status: 'in-progress',
    githubUrl: 'https://github.com/YamiUtsukushi/Tic-Tac-Toe',
    image: '/images/projects/tic-tac-toe.jpg',
    year: 2024,
    featured: false,
  },
];

// ============================================
// HELPERS
// ============================================

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectsByStatus(
  status: Project['status']
): Project[] {
  return projects.filter((p) => p.status === status);
}

export function getProjectsByCategory(
  category: Project['category']
): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  projects.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export function getProjectsByTag(tag: string): Project[] {
  return projects.filter((p) => p.tags.includes(tag));
}
