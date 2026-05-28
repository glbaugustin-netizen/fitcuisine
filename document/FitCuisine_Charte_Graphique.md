# FitCuisine — Charte Graphique "Bubblegum Pop"

> Document de référence pour maintenir la cohérence visuelle sur tout le projet.
> À consulter AVANT chaque développement de composant ou de page.

---

## 1. Identité visuelle

**Style :** Cartoon Bubblegum Pop
**Ambiance :** Joyeux, gourmand, accessible, fun & motivant
**Mots-clés :** Bulles, arrondi, contours épais, couleurs chaudes, rebondissant
**Mascotte :** "Coach Avocat" — un avocat cartoon sportif qui apparaît dans la navbar et à divers endroits de l'app

**Règle absolue :** AUCUN emoji dans l'interface. Tout est en icônes vectorielles (Lucide React) ou illustrations SVG cartoon dessinées.

---

## 2. Palette de couleurs

### 2.1 Surfaces & fonds

| Token                  | Hex       | Usage                                              |
| ---------------------- | --------- | -------------------------------------------------- |
| `--bg-page`            | `#FFF9F3` | Fond de page global (crème très clair)              |
| `--bg-card`            | `#FFFFFF` | Fond des cartes, modales                            |
| `--bg-card-masse`      | `#FFF0E6` | Fond des cartes recettes objectif Masse (pêche)     |
| `--bg-card-seche`      | `#EEFAE6` | Fond des cartes recettes objectif Sèche (vert pâle) |
| `--bg-input`           | `#FFFFFF` | Fond des champs de saisie                           |
| `--bg-nav`             | `#FFF5ED` | Fond de la barre de navigation                      |
| `--bg-section`         | `#FFF5ED` | Fond des sections mises en avant                    |

### 2.2 Couleurs principales (accents)

| Token                  | Hex       | Usage                                              |
| ---------------------- | --------- | -------------------------------------------------- |
| `--color-primary`      | `#E8713A` | Boutons principaux, CTA, accents forts (corail/orange) |
| `--color-primary-hover`| `#D4612E` | Hover sur boutons primaires                         |
| `--color-primary-light`| `#FAECE7` | Fond léger pour éléments primaires                  |
| `--color-secondary`    | `#E8B44A` | Accents secondaires (jaune doré/miel)               |
| `--color-secondary-light`| `#FAEEDA`| Fond léger secondaire (miel pâle)                  |

### 2.3 Couleurs sémantiques — Objectifs

| Token                  | Hex       | Usage                                              |
| ---------------------- | --------- | -------------------------------------------------- |
| `--color-masse`        | `#D85A30` | Badge "Masse", bordure cartes masse (corail/rouge) |
| `--color-masse-bg`     | `#FFF0E6` | Fond cartes masse                                  |
| `--color-masse-light`  | `#FAECE7` | Fond pilule masse                                  |
| `--color-seche`        | `#5AAD2F` | Badge "Sèche", bordure cartes sèche (vert)        |
| `--color-seche-bg`     | `#EEFAE6` | Fond cartes sèche                                  |
| `--color-seche-light`  | `#EAF3DE` | Fond pilule sèche                                  |

### 2.4 Couleurs des macros

| Macro       | Token               | Couleur pilule (bg) | Couleur texte   | Hex bg    | Hex texte |
| ----------- | -------------------- | ------------------- | --------------- | --------- | --------- |
| Calories    | `--color-cal`        | Jaune miel pâle     | Brun doré       | `#FAEEDA` | `#854F0B` |
| Protéines   | `--color-prot`       | Corail pâle         | Rouge brique    | `#FAECE7` | `#993C1D` |
| Glucides    | `--color-carb`       | Vert pâle           | Vert foncé      | `#EAF3DE` | `#3B6D11` |
| Lipides     | `--color-fat`        | Rose pâle           | Rose foncé      | `#FBEAF0` | `#72243E` |

### 2.5 Texte & bordures

| Token                  | Hex       | Usage                                              |
| ---------------------- | --------- | -------------------------------------------------- |
| `--text-primary`       | `#2C2420` | Titres, texte principal (brun très foncé, PAS noir pur) |
| `--text-secondary`     | `#8A7D74` | Texte secondaire, labels, métadonnées              |
| `--text-muted`         | `#B5A99E` | Placeholders, texte désactivé                      |
| `--border-default`     | `#E8DDD3` | Bordures de cartes, séparateurs (beige)            |
| `--border-strong`      | `#2C2420` | Contours cartoon épais (brun foncé, 2-3px)         |

---

## 3. Typographie

### 3.1 Familles de polices

| Rôle        | Police        | Import Google Fonts                                     |
| ----------- | ------------- | ------------------------------------------------------- |
| **Titres**  | Fredoka       | `Fredoka:wght@400;500;600`                              |
| **Body**    | Nunito        | `Nunito:wght@400;600;700`                               |

**Fallback :** `sans-serif`

### 3.2 Échelle typographique

| Élément                     | Police  | Taille  | Poids | Couleur            |
| --------------------------- | ------- | ------- | ----- | ------------------ |
| H1 — Titre de page          | Fredoka | 28px    | 600   | `--text-primary`   |
| H2 — Titre de section       | Fredoka | 22px    | 600   | `--text-primary`   |
| H3 — Titre de carte/bloc    | Fredoka | 16px    | 600   | `--text-primary`   |
| Body — Texte courant         | Nunito  | 14px    | 400   | `--text-primary`   |
| Body bold                    | Nunito  | 14px    | 700   | `--text-primary`   |
| Small — Méta, labels         | Nunito  | 12px    | 600   | `--text-secondary` |
| Tiny — Badges, pilules       | Nunito  | 11px    | 700   | Variable           |
| Chiffres gros (calories)     | Fredoka | 36-48px | 600   | `--text-primary`   |
| Chiffres macros (valeurs)    | Fredoka | 20px    | 600   | Variable           |

### 3.3 Règles typographiques

- Pas de texte en ALL CAPS sauf exception rare (labels très courts type "MON OBJECTIF")
- Les labels de catégorie au-dessus des filtres sont en MAJUSCULES, 11px, `--text-secondary`, espacement lettres 0.5px
- Les titres de recettes sont en `sentence case`
- Les chiffres nutritionnels utilisent toujours Fredoka (le gros chiffre) + Nunito (l'unité en plus petit)

---

## 4. Bordures & contours

### 4.1 Le style "cartoon"

L'identité cartoon de FitCuisine repose sur des **bordures foncées épaisses** autour des éléments principaux :

| Élément                        | Bordure                                    |
| ------------------------------ | ------------------------------------------ |
| Cartes recettes                | `2px solid #2C2420` (contour cartoon)      |
| Cartes du tracker (slots)      | `2px solid #2C2420`                        |
| Barre de navigation (onglets)  | `2px solid #2C2420` sur l'onglet actif     |
| Boutons CTA principaux         | `2px solid #2C2420`                        |
| Champs de saisie               | `2px solid #E8DDD3` → focus: `2px solid #2C2420` |
| Badges macro (pilules)         | `1.5px solid` de la couleur de la macro    |
| Filtres (chips)                | `2px solid #E8DDD3` → actif: `2px solid #2C2420` |
| Séparateurs internes           | `1px solid #E8DDD3`                        |

### 4.2 Border-radius (tout est arrondi !)

| Élément                | Radius     |
| ---------------------- | ---------- |
| Cartes recettes        | `16px`     |
| Boutons, chips, filtres| `50px` (full pill)  |
| Badges (Masse, Sèche)  | `50px`     |
| Pilules macros          | `10px`     |
| Champs de saisie       | `12px`     |
| Navigation (container) | `16px`     |
| Navigation (onglet actif)| `12px`   |
| Avatar utilisateur     | `50%` (cercle) |
| Zone illustration plat | `12px` en haut, `0` en bas (coins intégrés à la carte) |

---

## 5. Composants UI

### 5.1 Navigation (top bar)

- Fond : `--bg-nav` (#FFF5ED)
- 3 onglets : Recettes, Tracker, Dashboard
- Chaque onglet a une icône Lucide + texte
- Onglet actif : fond `--color-primary` (#E8713A), texte blanc, border `2px solid #2C2420`, border-radius 12px
- Onglets inactifs : texte `--text-secondary`, pas de fond
- Logo FitCuisine à gauche avec la mascotte Coach Avocat (icône SVG)
- Avatar utilisateur (initiales) à droite : cercle `--color-primary`, texte blanc

### 5.2 Cartes recettes

```
┌─────────────────────────────┐  ← border: 2px solid #2C2420
│  ┌─────────────────────────┐│     border-radius: 16px
│  │    ILLUSTRATION PLAT    ││  ← fond: --bg-card-masse ou --bg-card-seche
│  │    (SVG cartoon)        ││
│  │           [Badge]───────││  ← badge en haut à droite ("Masse" ou "Sèche")
│  └─────────────────────────┘│
│  Nom de la recette           │  ← Fredoka 16px 600
│  ⏱ 20 min · ●●○ · Déjeuner │  ← Nunito 12px, --text-secondary
│  ┌────┐┌────┐┌────┐┌────┐  │
│  │520 ││P 42││G 48││L 14│  │  ← pilules macros (couleurs dédiées)
│  │kcal││    ││    ││    │  │
│  └────┘└────┘└────┘└────┘  │
└─────────────────────────────┘
```

- Grille : 3 colonnes sur desktop, 2 sur tablette, 1 sur mobile
- Gap : 20px
- Hover : `transform: translateY(-4px)` + légère ombre `0 8px 20px rgba(44,36,32,0.08)`
- Transition : `all 0.2s ease`
- La zone illustration occupe environ 55% de la hauteur de la carte

### 5.3 Badges objectif

| Badge    | Fond      | Texte  | Bordure                | Icône          |
| -------- | --------- | ------ | ---------------------- | -------------- |
| Masse    | `#D85A30` | Blanc  | `2px solid #2C2420`    | Haltère (Lucide: `Dumbbell`) |
| Sèche    | `#5AAD2F` | Blanc  | `2px solid #2C2420`    | Feuille (Lucide: `Leaf`)     |

- Border-radius : 50px (pill)
- Padding : 4px 12px
- Font : Nunito 11px 700

### 5.4 Pilules macros

- Disposition : flex row, gap 6px
- Chaque pilule : border-radius 10px, padding 4px 8px
- Le chiffre en gras (Nunito 700), l'unité en regular
- Couleurs : voir section 2.4

### 5.5 Filtres (chips)

- Border-radius : 50px (pill shape)
- Padding : 8px 16px
- État normal : fond blanc, border `2px solid #E8DDD3`, texte `--text-secondary`
- État actif : fond varie selon le filtre, border `2px solid #2C2420`, texte foncé ou blanc
- Filtre "Prise de masse" actif : fond `--color-masse`, texte blanc
- Filtre "Sèche" actif : fond `--color-seche`, texte blanc
- Autres filtres actifs : fond `--color-secondary-light`, texte `--text-primary`, border foncée
- Icône Lucide à gauche du texte pour les filtres principaux (objectif)
- Transition hover : fond léger `--bg-section`

### 5.6 Barre de recherche

- Largeur : 100% du conteneur
- Hauteur : 48px
- Border-radius : 12px
- Bordure : `2px solid #E8DDD3`
- Focus : `2px solid #2C2420`
- Icône recherche (Lucide: `Search`) à gauche, 18px, couleur `--text-muted`
- Placeholder : "Cherche une recette : poulet, avocat, pancakes..."
- Font : Nunito 14px

### 5.7 Boutons

| Type         | Fond               | Texte   | Bordure               | Radius |
| ------------ | ------------------- | ------- | --------------------- | ------ |
| Primaire CTA | `--color-primary`   | Blanc   | `2px solid #2C2420`   | 50px   |
| Secondaire   | Blanc               | `--text-primary` | `2px solid #E8DDD3` | 50px |
| Ghost        | Transparent         | `--text-secondary` | Aucune             | 50px |
| Icône (+)    | `--color-primary`   | Blanc   | `2px solid #2C2420`   | 50%  |

- Hover primaire : fond `--color-primary-hover`, `transform: translateY(-2px)`
- Active : `transform: translateY(0) scale(0.98)`
- Taille icône bouton "+" : 36px × 36px

### 5.8 Sélecteur de portions (fiche recette)

```
  [ − ]   2   [ + ]
```

- Boutons `−` et `+` : cercles 36px, border `2px solid #2C2420`, fond blanc
- Chiffre central : Fredoka 20px 600
- Hover boutons : fond `--bg-section`

### 5.9 Barres de progression macros (fiche recette)

- Hauteur : 8px
- Border-radius : 50px
- Fond vide : `#F0E8E0`
- Remplissage : couleur de la macro correspondante
- Affichage : `42g / 60g` à droite de la barre (Nunito 13px)
- Petit cercle coloré (indicateur) à gauche du label macro

### 5.10 Slots repas (tracker)

```
┌──────────────────────────────────────────┐
│  (icône)  Petit-déjeuner                [+] │  ← header du slot
│           510 kcal · 2 aliments              │
├──────────────────────────────────────────┤
│  Pancakes protéinés    P38 G42 L12  450 kcal│  ← ligne aliment
│  Café au lait          P 3 G 4 L 3   60 kcal│
└──────────────────────────────────────────┘
```

- Border : `2px solid #2C2420`, border-radius 16px
- Header : icône ronde colorée à gauche (différente par slot), titre Fredoka 15px 600
- Chaque slot a sa propre couleur d'icône :
  - Petit-déjeuner : jaune `#E8B44A`
  - Déjeuner : corail `#E8713A`
  - Dîner : violet doux `#8B7EC8`
  - Snack : vert `#5AAD2F`
- Lignes aliments : fond blanc, séparées par border-bottom `1px solid #E8DDD3`
- Macros dans chaque ligne : mini pilules colorées inline

---

## 6. Illustrations & iconographie

### 6.1 Icônes

- **Librairie principale :** Lucide React
- **Taille par défaut :** 18px inline, 20px dans les boutons, 24px dans la navigation
- **Stroke width :** 2px (standard Lucide)
- **Couleur :** hérite du texte parent ou couleur spécifique selon contexte

**Icônes utilisées fréquemment :**

| Contexte             | Icône Lucide           |
| -------------------- | ---------------------- |
| Recettes (nav)       | `UtensilsCrossed`      |
| Tracker (nav)        | `BarChart3`            |
| Dashboard (nav)      | `Target`               |
| Recherche            | `Search`               |
| Horloge/temps        | `Clock`                |
| Masse                | `Dumbbell`             |
| Sèche                | `Leaf`                 |
| Ajouter              | `Plus`                 |
| Retour               | `ChevronLeft`          |
| Favoris              | `Heart`                |
| Portions             | `Users`                |
| Calories/feu         | `Flame`                |
| Filtre               | `SlidersHorizontal`    |
| Calendrier           | `Calendar`             |
| Poids                | `Scale`                |
| Étoile/difficulté    | `ChefHat` ou `Circle` (rempli/vide) |

### 6.2 Illustrations de plats

- Style : cartoon avec contours épais (`2-3px`, couleur `#2C2420`)
- Couleurs pleines, pas de dégradés complexes
- Trait arrondi (`stroke-linecap: round`, `stroke-linejoin: round`)
- Chaque plat est une illustration SVG simple et reconnaissable
- Fond de l'illustration : couleur douce liée à l'objectif (pêche pour masse, vert pâle pour sèche)
- Taille dans les cartes : environ 120px × 120px centré

### 6.3 Mascotte "Coach Avocat"

- Petit avocat cartoon avec des bras musclés
- Apparaît dans la navbar (icône 32px) et ponctuellement dans les pages vides / messages d'encouragement
- Style cohérent avec les illustrations de plats (mêmes contours épais)

---

## 7. Espacements & layout

### 7.1 Grille

| Paramètre            | Valeur                    |
| -------------------- | ------------------------- |
| Conteneur max-width  | `1200px`                  |
| Padding conteneur    | `24px` (desktop), `16px` (mobile) |
| Grille recettes      | 3 colonnes (desktop), 2 (tablette), 1 (mobile) |
| Gap grille           | `20px`                    |
| Gap entre sections   | `32px`                    |

### 7.2 Espacements internes

| Élément              | Padding                   |
| -------------------- | ------------------------- |
| Carte recette        | `0` (l'image est bord à bord en haut), `14px 16px 16px` pour le body |
| Slot tracker         | `16px 20px`               |
| Section filtre       | `0` (les chips sont libres) |
| Navigation           | `8px 12px`                |
| Bouton CTA           | `12px 24px`               |
| Champ de saisie      | `12px 16px 12px 44px` (avec icône) |
| Fiche recette        | `24px` global             |

---

## 8. Ombres & élévation

L'app utilise les ombres **avec parcimonie** — le style cartoon repose sur les bordures, pas les ombres.

| Contexte               | Ombre                                          |
| ---------------------- | ---------------------------------------------- |
| Carte au repos         | Aucune                                         |
| Carte au hover         | `0 8px 20px rgba(44, 36, 32, 0.08)`           |
| Bouton CTA au hover    | `0 4px 12px rgba(232, 113, 58, 0.25)`         |
| Badge onglet actif     | `0 2px 8px rgba(232, 113, 58, 0.2)`           |
| Dropdown / modale      | `0 12px 32px rgba(44, 36, 32, 0.12)`          |

---

## 9. Animations & micro-interactions

| Interaction                 | Animation                                         |
| --------------------------- | ------------------------------------------------- |
| Hover carte recette         | `translateY(-4px)` + ombre, `0.2s ease`           |
| Hover bouton                | `translateY(-2px)`, `0.15s ease`                  |
| Click bouton                | `scale(0.98)`, `0.1s ease`                        |
| Apparition des cartes       | Stagger fade-in + translateY(12px), `0.3s ease`   |
| Changement de filtre        | Transition fluide des cartes (layout animation)    |
| Ajout au tracker            | Animation "pop" (scale 1 → 1.15 → 1), `0.3s`     |
| Barre de progression        | Remplissage animé de 0% à valeur, `0.6s ease-out` |
| Changement de portion       | Les chiffres transitionnent en douceur             |
| Changement de page (nav)    | Fade transition `0.2s`                             |

---

## 10. Responsive

### Breakpoints

| Nom       | Largeur          | Adaptations                              |
| --------- | ---------------- | ---------------------------------------- |
| Desktop   | `≥ 1024px`       | Layout complet, grille 3 colonnes, top nav |
| Tablette  | `768px – 1023px` | Grille 2 colonnes, top nav               |
| Mobile    | `< 768px`        | Grille 1 colonne, bottom nav, UI adaptée |

### Règles mobile

- La navigation passe en **bottom bar** fixe avec icônes + texte court
- Les filtres deviennent scrollables horizontalement
- Les cartes prennent toute la largeur
- La fiche recette s'empile verticalement (illustration → infos → macros → ingrédients → étapes)
- Le tracker garde ses 4 slots empilés
- Les pilules macros restent en ligne (elles sont assez compactes)

---

## 11. Résumé des "DO" et "DON'T"

### DO (à faire)

- Utiliser des bordures épaisses foncées (2px #2C2420) sur tous les éléments principaux
- Tout arrondir généreusement (16px cartes, 50px boutons/badges)
- Garder les couleurs chaudes et gourmandes
- Utiliser Fredoka pour tout ce qui est titre/chiffre important
- Utiliser Nunito pour le texte courant
- Mettre des icônes Lucide partout (navigation, filtres, actions)
- Différencier visuellement Masse (corail/orange) et Sèche (vert) immédiatement
- Animer les hovers et les transitions
- Garder le fond de page crème (#FFF9F3), jamais blanc pur

### DON'T (à ne pas faire)

- JAMAIS d'emoji — uniquement des icônes vectorielles Lucide ou des SVG custom
- Pas de noir pur (#000000) — utiliser #2C2420 pour les textes/bordures foncés
- Pas de coins carrés (tout est arrondi)
- Pas de fond blanc pur pour la page (#FFFFFF uniquement pour les cartes et inputs)
- Pas de dégradés complexes — couleurs pleines
- Pas de polices autres que Fredoka et Nunito
- Pas d'ombres lourdes — le style cartoon repose sur les bordures
- Pas de bordures grises/froides — rester dans les tons beige/brun chaud
- Pas de surcharge visuelle — l'espace blanc (crème) est important

---

*Document de référence FitCuisine — Style Bubblegum Pop — Mai 2026*
