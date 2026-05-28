# FitCuisine — Cahier de Conception

> Guide culinaire pour sportifs + tracker de calories intelligent

---

## 1. Vision du projet

Une application web tout-en-un destinée aux sportifs, combinant :

- Un **catalogue de recettes rapides** (<30 min) classées par objectif nutritionnel (prise de masse ou sèche)
- Un **tracker de calories performant** avec recherche d'aliments via API et calcul automatique des macros
- Un **dashboard de progression** avec objectifs personnalisés

---

## 2. Spécifications générales

| Paramètre         | Choix validé                                      |
| ------------------ | ------------------------------------------------- |
| Format             | App React tout-en-un                              |
| Langue             | 100% français                                     |
| Responsive         | PC-first, responsive mobile                       |
| Design             | À définir ensemble (session design dédiée)        |
| Stockage (proto)   | Stockage local (persistent storage artifact)      |
| Stockage (prod)    | Firebase Firestore (sync cross-device)            |
| Auth (prod)        | Google Sign-In (un clic)                          |
| Hébergement (prod) | Firebase Hosting                                  |
| API nutrition      | OpenFoodFacts (gratuite, bon catalogue FR)         |

---

## 3. Architecture — Les 3 sections

### 3.1 Recettes (Priorité #1)

**Base de données intégrée : 20-30 recettes**

- Répartition équilibrée entre **prise de masse** et **sèche**
- Couverture de tous les repas : petit-déjeuner, déjeuner, dîner, snacks
- Toutes réalisables en **moins de 30 minutes**

**Structure d'une recette :**

- Nom
- Photo / illustration
- Temps de préparation
- Difficulté (1 à 3)
- Nombre de portions (ajustable)
- Catégorie de repas (petit-déj, déjeuner, dîner, snack)
- Objectif (masse ou sèche)
- Liste d'ingrédients avec quantités
- Étapes de préparation
- Macros par portion : calories, protéines, glucides, lipides

**Système de filtres :**

- Filtre principal et le plus visible : **objectif** (masse / sèche)
- Type de repas (petit-déj, déjeuner, dîner, snack)
- Ingrédient principal (poulet, bœuf, poisson, œufs, végétarien…)
- Tri par temps de prépa ou par calories
- Barre de recherche par nom

**Fiche recette détaillée :**

- Sélecteur de portions → recalcul automatique des quantités et macros
- Affichage visuel des macros (barres ou cercles de répartition P/G/L)
- Bouton **"Ajouter au tracker"** → envoie la recette avec la bonne portion dans le journal du jour

---

### 3.2 Tracker de calories (Priorité #2)

**Journal quotidien :**

- Calendrier en haut pour naviguer entre les jours
- 4 slots par jour : petit-déjeuner, déjeuner, dîner, snacks
- Deux modes d'ajout par slot :
  - **Recherche OpenFoodFacts** : on tape un aliment, l'API renvoie les résultats, on choisit, on ajuste la quantité → calcul automatique des macros
  - **Ajout d'une recette** depuis la section recettes de l'app

**Calcul automatique :**

- Récap en temps réel en bas du journal
- Total du jour : calories, protéines, glucides, lipides
- Barre de progression par rapport à l'objectif de l'utilisateur

**Intégration OpenFoodFacts :**

- Endpoint : `https://world.openfoodfacts.org/cgi/search.pl`
- Données pour 100g → l'utilisateur ajuste la quantité → calcul proportionnel
- Debounce sur la recherche pour ne pas spammer l'API
- Gestion des cas où les données nutritionnelles sont incomplètes (warning affiché)
- Gratuit, pas de clé API requise

---

### 3.3 Dashboard (Priorité #3)

**Profil utilisateur :**

- Poids actuel
- Objectif : prise de masse ou sèche
- Niveau d'activité (sédentaire, modéré, actif, très actif)
- Sexe, âge, taille (pour le calcul du métabolisme)

**Calcul de l'objectif calorique :**

- Formule de Mifflin-St Jeor pour le métabolisme de base (MB)
  - Homme : MB = 10 × poids(kg) + 6.25 × taille(cm) − 5 × âge − 5
  - Femme : MB = 10 × poids(kg) + 6.25 × taille(cm) − 5 × âge − 161
- Multiplication par le coefficient d'activité (1.2 à 1.9)
- Ajustement selon l'objectif :
  - Prise de masse : **+300 à +500 kcal**
  - Sèche : **−300 à −500 kcal**
- Répartition macro recommandée (ajustable)

**Progression :**

- Graphique sur 7 / 30 jours : calories consommées vs objectif
- Suivi du poids (saisie manuelle)
- Stats : nombre de jours "on track", moyenne calorique de la semaine

---

## 4. Navigation

- **Bottom bar** (mobile) / **sidebar ou top nav** (PC) avec 3 onglets :
  - 🍽️ Recettes
  - 📊 Tracker
  - 🎯 Dashboard

---

## 5. Stack technique

### Phase prototype (artifact React)

- React avec hooks (useState, useEffect, useContext)
- Stockage local via persistent storage de l'artifact
- Appels API vers OpenFoodFacts (fetch)
- Tailwind CSS pour le styling
- Bibliothèques disponibles : recharts (graphiques), lucide-react (icônes), lodash

### Phase production (Firebase)

- **Firebase Auth** : Google Sign-In
- **Firestore** : base de données NoSQL temps réel
  - `users/{userId}/profile` — infos utilisateur
  - `users/{userId}/journal/{date}` — journal alimentaire par jour
  - `users/{userId}/favorites` — recettes favorites
  - `users/{userId}/weight/{date}` — historique de poids
- **Firebase Hosting** : déploiement avec URL publique
- **Coût** : plan Spark (gratuit) — 1 Go Firestore, 50k lectures/jour, auth illimitée

---

## 6. Plan de construction

| Étape | Contenu                                                              | Livrable                      |
| ----- | -------------------------------------------------------------------- | ----------------------------- |
| 1     | Structure app + navigation + 20-30 recettes + filtres + fiches       | Prototype testable            |
| 2     | Tracker calories + intégration OpenFoodFacts + lien recettes→tracker | Prototype enrichi             |
| 3     | Dashboard profil + objectifs caloriques + progression                | Prototype complet             |
| 4     | Polish design, tests, ajustements UX                                 | Version finale prototype      |
| 5     | Migration Firebase (Auth Google, Firestore, Hosting, déploiement)    | App en production             |

Chaque étape produit une version fonctionnelle et testable.
Le design sera défini ensemble au moment de l'étape 1.

---

## 7. Décisions prises

- ✅ App React tout-en-un
- ✅ 100% français
- ✅ PC-first, responsive
- ✅ 20-30 recettes au lancement
- ✅ API OpenFoodFacts pour le tracker
- ✅ Firebase pour la prod (Firestore + Auth Google + Hosting)
- ✅ Prototype d'abord, Firebase ensuite
- ✅ Connexion Google (un clic)
- ✅ Design à définir ensemble

---

*Document généré le 27 mai 2026 — Projet FitCuisine*
