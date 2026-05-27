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
    slug: 'sneakers-shop-react',
    title: 'Sneakers Shop React',
    shortDescription:
      'E-commerce complet avec authentification par rôles, panier, favoris, dark mode et dashboard admin.',
    longDescription: `Une boutique e-commerce React construite de A à Z — avec une véritable gestion des rôles utilisateur (admin / client), panier persistant, liste de favoris et dark mode natif.

Fonctionnalités clés :
• Auth par rôles (admin / client) avec React Context API
• Panier et favoris avec persistance d'état
• Dashboard admin : gestion des produits, commandes, utilisateurs
• Dark mode complet avec toggle animé
• Interface responsive, animations fluides

Stack technique : React 18, Vite, Context API, CSS Modules.`,
    tags: ['React 18', 'Vite', 'Context API', 'JavaScript'],
    category: 'web',
    status: 'deployed',
    githubUrl: 'https://github.com/YamiUtsukushi/sneakers-shop-react',
    liveUrl: 'https://sneakers-shop-react.netlify.app/',
    image: '/images/projects/sneakers-shop-react.jpg',
    year: 2024,
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
