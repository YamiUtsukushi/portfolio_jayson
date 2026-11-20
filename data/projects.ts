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
      'Thème Shopify Online Store 2.0 sur mesure pour une boutique high-tech : 14 sections custom, fiche produit refondue, flash sale avec timers et recherche prédictive.',
    longDescription: `Thème Shopify Online Store 2.0 conçu pour une boutique high-tech (composants gaming, audio, smartphones, accessoires). Je suis parti du thème Dawn de Shopify et je l'ai profondément personnalisé : 14 sections développées sur mesure, une fiche produit entièrement refondue, et des pages collection, recherche et panier restylées pour une identité visuelle cohérente. Tout est configurable depuis l'éditeur de thème Shopify, sans toucher au code.

L'objectif

Donner à une boutique tech une vitrine qui pousse à l'achat : mettre en avant les promotions avec des comptes à rebours, présenter chaque produit avec des visuels et des vidéos, et laisser le marchand tout personnaliser lui-même, produit par produit, grâce aux metafields.

Fiche produit refondue

• Galerie custom : grande image principale et vignettes horizontales paginées (+N), qui reste fixe à gauche pendant le scroll des infos sur desktop
• Badges automatiques : NEW pour un produit de moins de 30 jours, X% OFF calculé depuis le prix barré
• Timer flash-sale relié à un metafield produit, partagé avec la section Flash Sale
• Zone d'achat optimisée : quantité et Ajouter au panier sur la même ligne, Acheter maintenant en pleine largeur
• Bandeau de 4 avantages configurables (offres du jour, retours, paiement, aide)
• FAQ en accordéon avec 3 sections par défaut, remplaçables produit par produit via metafields

Section Product Highlights

• 4 cartes en grille asymétrique : une grande à gauche, une large en haut à droite, deux petites en bas
• Vidéo YouTube, Vimeo ou MP4 détectée automatiquement à partir de l'URL
• 20 metafields produit (image, vidéo, titre, sous-titre et lien pour chaque carte), avec repli sur les valeurs du customizer si un champ est vide
• Taille, couleur et graisse du texte réglables carte par carte

Flash Sale et promotions

• Carrousel horizontal des produits en promotion, chacun avec son propre compte à rebours lu depuis un metafield
• Bannière Deal Of The Day avec un timer principal
• Défilement par glisser-déposer à la souris sur desktop et au doigt sur mobile
• Barre d'annonces qui fait défiler plusieurs messages automatiquement

Page d'accueil

• Hero Slider avec slides configurables et défilement automatique réglable
• Bandeau de marques en défilement continu, avec une cascade de logos : fichier local, puis logo Simple Icons généré à partir du nom de la marque, puis texte en dernier recours
• Sections Shop By Categories, Produits en vedette et Barre d'avantages
• Avis clients en défilement continu (marquee CSS en boucle infinie)

Navigation et recherche

• En-tête personnalisé avec recherche prédictive en JavaScript natif : suggestions de produits en direct via l'API /search/suggest.json de Shopify
• Page de résultats de recherche restylée sur le modèle des pages collection (sidebar, fil d'Ariane, cartes produit)
• Pied de page personnalisé

Pages de contenu

• Pages À propos, FAQ et Contact construites en sections, éditables depuis le customizer
• Page panier restylée

Technique

• Liquid pour le templating, avec des schémas de section complets : réglages, blocs et valeurs par défaut pour chaque section custom
• Metafields produit pour personnaliser timers, FAQ et highlights sans dupliquer de template
• JavaScript natif, sans librairie : galerie, comptes à rebours, recherche prédictive, sliders, glisser-déposer, accordéons
• CSS découpé par section, nommage BEM, police Poppins sur tout le thème
• Traductions anglais et français

Responsive

• Desktop (901 px et plus) : deux colonnes avec galerie fixe
• Tablette (601 à 900 px) : une colonne, vignettes sur 4 colonnes
• Mobile (600 px et moins) : zones tactiles de 44 px minimum, grilles adaptées
• Très petits écrans (380 px et moins) : avantages en 2 × 2, fil d'Ariane raccourci

Pour tester

• La boutique de démonstration est protégée par Shopify : mot de passe « test »`,
    tags: ['Shopify', 'Liquid', 'JavaScript', 'CSS3', 'Online Store 2.0', 'Metafields'],
    category: 'web',
    status: 'deployed',
    githubUrl: 'https://github.com/YamiUtsukushi/shopify-tech-store-theme',
    liveUrl: 'https://test-perso-dev.myshopify.com/',
    image: '/images/projects/shopify-idhightech.jpg',
    year: 2026,
    featured: true,
  },

  {
    slug: 'ml-deep-learning',
    title: 'Machine Learning & Deep Learning',
    shortDescription:
      'Projet de Master en équipe : classification d\'images CIFAR-10 (CNN et transfer learning), détection de fraude bancaire (Random Forest) et classification de texte (LSTM).',
    longDescription: `Projet d'équipe réalisé en Master 2 (Nexa Digital School) à cinq, en juillet 2025. Il couvre trois grandes familles de problèmes en Machine Learning et Deep Learning, chacune sur un jeu de données réel, dans un notebook Jupyter dédié : la vision par ordinateur, les données tabulaires et le traitement du langage. Chaque partie suit la même démarche : exploration des données, préparation, construction du modèle, entraînement, évaluation, puis analyse critique des résultats.

Partie 1 — Classification d'images avec des CNN

• Jeu de données CIFAR-10 : 60 000 images couleur de 32 × 32 pixels réparties en 10 classes (50 000 pour l'entraînement, 10 000 pour le test)
• CNN construit avec Keras : 3 couches de convolution, 2 de max pooling et une tête dense, soit environ 122 000 paramètres
• Callbacks ModelCheckpoint pour garder le meilleur modèle et EarlyStopping pour arrêter l'entraînement dès que la validation ne progresse plus
• Résultat : 70,6 % de précision sur le jeu de test
• Analyse : courbes d'apprentissage qui montrent un sur-apprentissage à partir de la 3e époque, et matrice de confusion qui révèle les confusions chat / chien, cerf / cheval et voiture / camion
• Comparaison avec du transfer learning (MobileNetV2 pré-entraîné sur ImageNet, base gelée et seule la tête entraînée) : 34,8 %, plus lent et moins précis, parce que le modèle est conçu pour des images bien plus grandes que 32 × 32
• Suivi des entraînements dans TensorBoard et début de recherche d'hyperparamètres (optimiseurs Adam, SGD et Adamax, taux d'apprentissage, nombre d'époques)

Partie 2 — Détection de fraude bancaire

• Jeu de données Kaggle de 284 807 transactions par carte bancaire, dont seulement 0,17 % de fraudes : un cas de classes très déséquilibrées
• Analyse exploratoire : répartition des classes et distribution des montants selon le type de transaction
• Préparation : normalisation du montant avec StandardScaler et découpage entraînement / test stratifié pour garder la même proportion de fraudes
• Modèle Random Forest avec class_weight='balanced' pour compenser le déséquilibre
• Résultat sur les fraudes : 96 % de précision, 74 % de rappel et un F1-score de 0,84
• Réflexion sur les autres techniques possibles (sous-échantillonnage, XGBoost avec scale_pos_weight) et sur un usage en régression : prédire le montant habituel d'un client pour repérer les transactions anormales

Partie 3 — Classification de texte avec un LSTM

• Jeu de données de dépenses personnelles : à partir de la description d'une transaction, prédire sa catégorie
• Pipeline de bout en bout dans le modèle : vectorisation du texte (TextVectorization), embedding de dimension 128, LSTM bidirectionnel, dropout et sortie softmax multi-classe
• Résultat : 35 % de précision en validation, un score modeste qui s'explique par un jeu de données réduit et des descriptions très courtes

Ce que j'en retiens

• Savoir lire des courbes d'apprentissage et repérer le sur-apprentissage
• Choisir la bonne métrique : sur des classes déséquilibrées, la précision globale ne veut rien dire, il faut regarder le rappel et le F1-score de la classe rare
• Comprendre quand le transfer learning aide, et quand il n'est pas adapté aux données
• Travailler à plusieurs sur des notebooks, avec un dépôt Git partagé

Stack

• Python, Jupyter, TensorFlow et Keras, Scikit-learn, Pandas, NumPy, Matplotlib, Seaborn, TensorBoard`,
    tags: ['Python', 'TensorFlow', 'Keras', 'Scikit-Learn', 'Pandas', 'NLP'],
    category: 'other',
    status: 'archived',
    githubUrl: 'https://github.com/YamiUtsukushi/Application_MachineLearning_DeepLearning',
    image: '/images/projects/ml-deep-learning.jpg',
    year: 2025,
    featured: true,
  },

  // ─── AUTRES ──────────────────────────────────────────────────────────────────

  {
    slug: 'shopify-theme-ldglobal',
    title: 'Shopify Theme — LD Global',
    shortDescription:
      'Thème Shopify Online Store 2.0 sur mesure pour une boutique de gadgets de cuisine : catalogue filtrable, cart drawer avec upsell, pages À propos, FAQ et Contact.',
    longDescription: `Thème Shopify Online Store 2.0 conçu pour LD Global, une boutique en dropshipping de gadgets de cuisine du quotidien : des produits simples, malins et accessibles. Je suis parti du thème Dawn et je l'ai refondu en profondeur : header sur mesure, hero animé, sept nouvelles sections pour la page d'accueil, pages Catalogue, Produit, À propos, FAQ et Contact entièrement repensées, et un cart drawer personnalisé. Tout est réglable depuis l'éditeur de thème Shopify, et la boutique est en ligne.

L'objectif

Donner à une jeune boutique une image chaleureuse et rassurante, et réduire au maximum les frictions d'achat : retrouver un produit en quelques clics grâce aux filtres, l'ajouter au panier sans quitter la page, et trouver seul les réponses à ses questions avant de commander.

Header et hero

• Barre d'annonce avec 3 messages qui défilent verticalement, durée de rotation réglable
• Header sur mesure : logo à gauche, barre de recherche intégrée au centre, compte et panier à droite, navigation centrée sur une deuxième ligne avec soulignement vert au survol
• Hero Banner en slideshow : images distinctes pour desktop et mobile, mots du titre qui changent en fondu, couleurs du titre et des boutons réglables slide par slide
• Correction d'un bug d'autoplay hérité de Dawn et d'un chevauchement entre le header sticky et le slideshow

Page d'accueil : 7 sections custom

• Hero Home : titre fluide avec clamp() et grille de catégories en cercles
• Vitrine Collections : mosaïque asymétrique de 5 blocs sur une grille CSS de 12 colonnes, zoom au survol, taille des textes réglable bloc par bloc
• Bestsellers : 6 produits choisis, ajout au panier qui ouvre directement le cart drawer
• Avis et confiance : carrousel horizontal dont le nombre de points de navigation s'adapte au nombre de cartes visibles, avec des chiffres clés configurables
• Mur social : mosaïque de 6 blocs construite avec grid-template-areas
• Split Image CTA : bloc image et texte avec appel à l'action

Catalogue

• Sidebar de filtres fixe sur desktop, avec 5 filtres en accordéon : disponibilité, prix, catégorie, promotions et nouveautés
• Filtre de prix à double curseur (0 à 200 €), synchronisé avec les paramètres de l'URL Shopify
• Barre d'outils avec bouton Filtres sur tablette et mobile, et sélecteur de tri
• Grille de 3 colonnes sur desktop et 2 sur mobile, fil d'Ariane et pagination numérotée

Fiche produit

• Galerie avec image principale et miniatures, sélecteur de variante et quantité
• Suggestions de produits similaires avec ajout au panier en AJAX, via l'API /cart/add.js

Cart drawer sur mesure

• Sélecteur de quantité personnalisé et section d'upsell « Vous aimerez aussi »
• Case à cocher des conditions générales avant de commander
• Ouverture automatique du drawer depuis tous les boutons Ajouter au panier du site, grâce à un intercepteur global dans theme.liquid
• Correction d'un bug de Dawn qui affichait un panier vide lors du tout premier ajout

Pages de contenu

• À propos : hero pleine largeur, trois blocs image et texte avec effet de chevauchement, chiffres clés sur fond sombre et avis clients
• FAQ : sidebar de catégories avec icônes, questions en accordéon et recherche en temps réel parmi les questions
• Contact : formulaire Nom, Email, Sujet et Message, colonne d'informations (support, email, engagements) et bannière d'appel à l'action

Technique

• Liquid avec des schémas de section complets : plus de 140 réglages au total sur les sections custom, pour que le marchand modifie textes, images, couleurs et tailles sans code
• JavaScript natif : cart drawer, carrousels, filtre de prix, recherche dans la FAQ, mots rotatifs, ajout au panier en AJAX
• CSS : grilles et grid-template-areas, typographie fluide avec clamp(), animations en @keyframes
• Charte graphique cohérente : vert #74B734, police Figtree, largeur de page de 1400 px

Responsive

• Mise en page adaptée desktop, tablette et mobile sur chaque section
• Sur mobile : filtres repliables, barre d'outils empilée, contrôles du slideshow masqués, sidebar de la FAQ qui défile normalement`,
    tags: ['Shopify', 'Liquid', 'JavaScript', 'CSS3', 'Online Store 2.0', 'AJAX'],
    category: 'web',
    status: 'deployed',
    githubUrl: 'https://github.com/YamiUtsukushi/shopify-kitchen-gadgets-theme',
    liveUrl: 'https://ldglobalco.myshopify.com/',
    image: '/images/projects/shopify-ldglobal.jpg',
    year: 2026,
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
