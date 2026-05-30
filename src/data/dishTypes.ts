export type DishTypeId =
  | 'bowls'
  | 'bowl-cakes'
  | 'tartines-toasts'
  | 'pancakes-crepes'
  | 'pain-perdu'
  | 'porridges'
  | 'overnight-oats'
  | 'omelettes-oeufs'
  | 'galettes'
  | 'smoothies-shakers'
  | 'wraps-burritos'
  | 'sandwiches-croques'
  | 'pates'
  | 'nouilles-sautees'
  | 'riz-pilafs'
  | 'gratins'
  | 'salades'
  | 'currys-epices'
  | 'poelees-woks'
  | 'soupes'
  | 'papillotes'
  | 'farcis'
  | 'poisson'
  | 'viande-grillee'
  | 'panes'
  | 'muffins'
  | 'energy-balls'
  | 'barres-cookies'
  | 'puddings'
  | 'bols-yaourt'
  | 'dips-crudites'
  | 'autres'

export interface DishType {
  id: DishTypeId
  label: string
  icon: string
}

export const dishTypes: DishType[] = [
  { id: 'bowls',             label: 'Bowls',              icon: 'icon-bowls.svg' },
  { id: 'bowl-cakes',        label: 'Bowl cakes',         icon: 'icon-bowl-cakes.svg' },
  { id: 'tartines-toasts',   label: 'Tartines & Toasts',  icon: 'icon-tartines-toasts.svg' },
  { id: 'pancakes-crepes',   label: 'Pancakes & Crêpes',  icon: 'icon-pancakes.svg' },
  { id: 'pain-perdu',        label: 'Pain perdu',         icon: 'icon-pain-perdu.svg' },
  { id: 'porridges',         label: 'Porridges',          icon: 'icon-porridges.svg' },
  { id: 'overnight-oats',    label: 'Overnight oats',     icon: 'icon-overnight-oats.svg' },
  { id: 'omelettes-oeufs',   label: 'Omelettes & Œufs',  icon: 'icon-omelettes.svg' },
  { id: 'galettes',          label: 'Galettes',           icon: 'icon-galettes.svg' },
  { id: 'smoothies-shakers', label: 'Smoothies',          icon: 'icon-smoothies.svg' },
  { id: 'wraps-burritos',    label: 'Wraps & Burritos',   icon: 'icon-wraps.svg' },
  { id: 'sandwiches-croques',label: 'Sandwiches',         icon: 'icon-sandwiches.svg' },
  { id: 'pates',             label: 'Pâtes',              icon: 'icon-pates.svg' },
  { id: 'nouilles-sautees',  label: 'Nouilles sautées',   icon: 'icon-nouilles.svg' },
  { id: 'riz-pilafs',        label: 'Riz & Pilafs',       icon: 'icon-riz.svg' },
  { id: 'gratins',           label: 'Gratins',            icon: 'icon-gratins.svg' },
  { id: 'salades',           label: 'Salades',            icon: 'icon-salades.svg' },
  { id: 'currys-epices',     label: 'Currys',             icon: 'icon-currys.svg' },
  { id: 'poelees-woks',      label: 'Poêlées & Woks',     icon: 'icon-woks.svg' },
  { id: 'soupes',            label: 'Soupes',             icon: 'icon-soupes.svg' },
  { id: 'papillotes',        label: 'Papillotes',         icon: 'icon-papillotes.svg' },
  { id: 'farcis',            label: 'Farcis',             icon: 'icon-farcis.svg' },
  { id: 'poisson',           label: 'Poisson',            icon: 'icon-poisson.svg' },
  { id: 'viande-grillee',    label: 'Viande grillée',     icon: 'icon-viande.svg' },
  { id: 'panes',             label: 'Panés',              icon: 'icon-panes.svg' },
  { id: 'muffins',           label: 'Muffins',            icon: 'icon-muffins.svg' },
  { id: 'energy-balls',      label: 'Energy balls',       icon: 'icon-energy-balls.svg' },
  { id: 'barres-cookies',    label: 'Barres & Cookies',   icon: 'icon-barres-cookies.svg' },
  { id: 'puddings',          label: 'Puddings',           icon: 'icon-puddings.svg' },
  { id: 'bols-yaourt',       label: 'Bols yaourt',        icon: 'icon-bols-yaourt.svg' },
  { id: 'dips-crudites',     label: 'Dips & Crudités',    icon: 'icon-dips.svg' },
  { id: 'autres',            label: 'Autres',             icon: 'icon-autres.svg' },
]

/** Lookup map id → DishType */
export const dishTypeMap: Record<string, DishTypeId> = {
  // ── Bowls ──────────────────────────────────────────────────────────────────
  'bowl-poulet-riz-avocat':           'bowls',
  'bowl-saumon-edamame':             'bowls',
  'buddha-bowl-steak-quinoa':        'bowls',
  'smoothie-bowl-epinards-banane':   'bowls',
  'bowl-acai-proteine-light':        'bowls',
  'poke-bowl-poulet-mangue':         'bowls',
  'bibimbap-boeuf-riz-oeuf':         'bowls',
  'smoothie-bowl-chocolat-cacahuete':'bowls',

  // ── Bowl cakes & Mug cakes ─────────────────────────────────────────────────
  'bowl-cake-proteine-chocolat':     'bowl-cakes',
  'bowl-cake-xl-cacahuete':          'bowl-cakes',
  'mug-cake-proteine-chocolat':      'bowl-cakes',

  // ── Tartines & Toasts ──────────────────────────────────────────────────────
  'tartines-avocat-oeufs':           'tartines-toasts',
  'tartine-ricotta-miel-noix':       'tartines-toasts',
  'tartines-cacahuete-banane-miel':  'tartines-toasts',
  'tartine-saumon-fume-avocat':      'tartines-toasts',
  'toasts-ricotta-tomate-basilic':   'tartines-toasts',
  'tartine-cacahuete-confiture':     'tartines-toasts',
  'toast-avocat-oeuf-fromage':       'tartines-toasts',
  'tartine-thon-tomate-basilic':     'tartines-toasts',

  // ── Pancakes, Crêpes & Gaufres ─────────────────────────────────────────────
  'pancakes-proteines':              'pancakes-crepes',
  'crepes-proteinees-light':         'pancakes-crepes',
  'pancakes-courgette-fromage-blanc':'pancakes-crepes',
  'gaufres-proteinees-avoine-banane':'pancakes-crepes',
  'pancakes-ricotta-moelleux':       'pancakes-crepes',
  'crepes-proteinees-farine-coco':   'pancakes-crepes',
  'crepes-proteinees-choco-banane':  'pancakes-crepes',

  // ── Pain perdu ─────────────────────────────────────────────────────────────
  'french-toast-myrtilles':          'pain-perdu',
  'pain-perdu-coco-pecan':           'pain-perdu',
  'brioche-perdue-caramelisee-amandes':'pain-perdu',

  // ── Porridges ──────────────────────────────────────────────────────────────
  'porridge-banane-amande-chocolat': 'porridges',
  'porridge-sale-parmesan-oeuf':     'porridges',
  'porridge-leger-courgette-coco':   'porridges',

  // ── Overnight oats ─────────────────────────────────────────────────────────
  'overnight-oats-pb':               'overnight-oats',
  'overnight-oats-banane-granola':   'overnight-oats',

  // ── Omelettes & Œufs ──────────────────────────────────────────────────────
  'omelette-blanche-legumes':        'omelettes-oeufs',
  'oeufs-cocotte-tomate-basilic':    'omelettes-oeufs',
  'shakshuka-express':               'omelettes-oeufs',
  'omelette-blanche-champignons-epinards':'omelettes-oeufs',
  'shakshuka-verte-epinards':        'omelettes-oeufs',
  'frittata-mediterraneenne':        'omelettes-oeufs',
  'tortilla-espagnole-patate-chorizo':'omelettes-oeufs',
  'omelette-garnie-pdt-fromage':     'omelettes-oeufs',

  // ── Galettes ───────────────────────────────────────────────────────────────
  'galettes-avoine-courgette-feta':  'galettes',
  'galette-sarrasin-oeuf-jambon':    'galettes',

  // ── Smoothies & Shakers ────────────────────────────────────────────────────
  'smoothie-gainer-banane':          'smoothies-shakers',
  'milkshake-chocolat-cacahuete':    'smoothies-shakers',
  'smoothie-gainer-mangue-coco':     'smoothies-shakers',
  'shaker-vert-epinards-pomme':      'smoothies-shakers',
  'shaker-gainer-banane-cacahuete':  'smoothies-shakers',
  'smoothie-proteine-fraise-menthe': 'smoothies-shakers',

  // ── Wraps & Burritos ───────────────────────────────────────────────────────
  'wrap-thon-xl':                    'wraps-burritos',
  'wrap-steak-oeuf-fromage':         'wraps-burritos',
  'burrito-petit-dej-mexicain':      'wraps-burritos',
  'wraps-laitue-poulet-teriyaki':    'wraps-burritos',
  'wraps-boeuf-guacamole-cheddar':   'wraps-burritos',

  // ── Sandwiches, Bagels & Croques ───────────────────────────────────────────
  'croque-monsieur-proteine':        'sandwiches-croques',
  'sandwich-club-dinde-avocat':      'sandwiches-croques',
  'bagel-saumon-cream-cheese':       'sandwiches-croques',
  'croque-monsieur-xxl-chevre-miel': 'sandwiches-croques',

  // ── Pâtes ──────────────────────────────────────────────────────────────────
  'pates-bolognaise-proteinees':     'pates',
  'gratin-pates-poulet-brocoli':     'pates',
  'pates-carbonara-proteinees':      'pates',
  'lasagnes-express-poulet-epinards':'pates',
  'pates-poulet-pesto-mozzarella':   'pates',
  'pates-saucisse-italienne-tomate': 'pates',

  // ── Nouilles sautées ───────────────────────────────────────────────────────
  'nouilles-sautees-porc-cacahuetes':'nouilles-sautees',
  'pad-thai-poulet-cacahuetes':      'nouilles-sautees',
  'nouilles-udon-boeuf-legumes':     'nouilles-sautees',

  // ── Riz & Pilafs ───────────────────────────────────────────────────────────
  'riz-saute-boeuf-teriyaki':        'riz-pilafs',
  'riz-cantonais-poulet-oeuf':       'riz-pilafs',
  'riz-saute-poulet-curry-coco':     'riz-pilafs',
  'pilaf-poulet-epices-raisins':     'riz-pilafs',

  // ── Gratins ────────────────────────────────────────────────────────────────
  'gratin-riz-poulet-champignons':   'gratins',
  'hachis-parmentier-proteine':      'gratins',
  'gratin-pates-thon-bechamel':      'gratins',
  'gratin-dauphinois-poulet':        'gratins',

  // ── Salades ────────────────────────────────────────────────────────────────
  'salade-poulet-quinoa':            'salades',
  'salade-thai-boeuf-grille':        'salades',
  'salade-cesar-light-poulet':       'salades',
  'taboule-chou-fleur-crevettes':    'salades',
  'salade-nicoise-proteinee':        'salades',
  'salade-tiede-saumon-asperges':    'salades',

  // ── Currys & Épicés ────────────────────────────────────────────────────────
  'curry-pois-chiches-patate-douce': 'currys-epices',
  'poulet-tikka-riz-chou-fleur':     'currys-epices',
  'curry-vert-crevettes-chou-fleur': 'currys-epices',
  'curry-japonais-poulet':           'currys-epices',
  'poulet-tandoori-raita-concombre': 'currys-epices',

  // ── Poêlées & Woks ─────────────────────────────────────────────────────────
  'poelee-dinde-legumes':            'poelees-woks',
  'wok-crevettes-brocolis':          'poelees-woks',
  'poelee-crevettes-ail-courgettes': 'poelees-woks',
  'wok-poulet-poivrons-soja':        'poelees-woks',
  'poelee-dinde-courgettes-curry':   'poelees-woks',

  // ── Soupes ─────────────────────────────────────────────────────────────────
  'soupe-lentilles-corail':          'soupes',
  'soupe-miso-tofu-wakame':          'soupes',
  'soupe-thai-poulet-citronnelle':   'soupes',

  // ── Papillotes ─────────────────────────────────────────────────────────────
  'cabillaud-papillote-legumes':     'papillotes',
  'papillote-dorade-courgette-citron':'papillotes',

  // ── Farcis ─────────────────────────────────────────────────────────────────
  'courgettes-farcies-dinde':        'farcis',
  'roules-aubergine-ricotta-tomate': 'farcis',
  'poivrons-farcis-quinoa-dinde-feta':'farcis',

  // ── Poisson ────────────────────────────────────────────────────────────────
  'saumon-teriyaki-riz':             'poisson',
  'pave-thon-haricots-verts':        'poisson',
  'merlu-fondue-poireaux':           'poisson',
  'cabillaud-tomates-confites-olives':'poisson',
  'steak-thon-salade-fenouil':       'poisson',
  'saumon-laque-soja-pak-choi':      'poisson',
  'bar-croute-herbes-legumes-rotis': 'poisson',
  'tartare-saumon-concombre':        'poisson',

  // ── Viande grillée ─────────────────────────────────────────────────────────
  'steak-hache-puree-patate-douce':  'viande-grillee',
  'poulet-grille-ratatouille':       'viande-grillee',
  'dinde-grillee-asperges-citron':   'viande-grillee',
  'poulet-roti-miel-moutarde-puree': 'viande-grillee',
  'poulet-citron-herbes-legumes-vapeur':'viande-grillee',
  'brochettes-poulet-legumes':       'viande-grillee',
  'crevettes-ail-persil-courgettes-spirales':'viande-grillee',

  // ── Panés ──────────────────────────────────────────────────────────────────
  'poulet-pane-avoine-frites-patate':'panes',
  'escalope-dinde-panee-herbes':     'panes',

  // ── Muffins ────────────────────────────────────────────────────────────────
  'muffins-oeufs-bacon-fromage':     'muffins',
  'muffins-blancs-oeuf-legumes':     'muffins',
  'muffins-banane-noix-chocolat-proteines':'muffins',

  // ── Energy balls & Bouchées ────────────────────────────────────────────────
  'energy-balls-chocolat-amandes':   'energy-balls',
  'dattes-fourrees-beurre-amande':   'energy-balls',
  'energy-balls-coco-citron':        'energy-balls',
  'bouchees-concombre-saumon-fume':  'energy-balls',

  // ── Barres & Cookies ───────────────────────────────────────────────────────
  'barres-granola-miel-amandes':     'barres-cookies',
  'cookies-proteines-avoine-chocolat':'barres-cookies',
  'barres-cereales-chocolat-coco':   'barres-cookies',
  'banana-bread-proteine':           'barres-cookies',

  // ── Puddings ───────────────────────────────────────────────────────────────
  'pudding-chia-vanille-framboise':  'puddings',
  'pudding-proteine-chocolat-express':'puddings',

  // ── Bols yaourt & Fromage blanc ────────────────────────────────────────────
  'yaourt-grec-fruits-rouges':       'bols-yaourt',
  'cottage-cheese-concombre':        'bols-yaourt',
  'skyr-proteine-cafe-noisettes':    'bols-yaourt',
  'yaourt-grec-whey-granola-miel':   'bols-yaourt',
  'skyr-cannelle-amandes':           'bols-yaourt',
  'fromage-blanc-whey-fruits-rouges':'bols-yaourt',
  'bowl-fromage-blanc-fruits-rouges':'bols-yaourt',
  'cottage-cheese-miel-noix-banane': 'bols-yaourt',
  'yaourt-grec-granola-fruits-secs': 'bols-yaourt',

  // ── Dips & Crudités ────────────────────────────────────────────────────────
  'houmous-crudites':                'dips-crudites',
  'verrines-tzatziki-crudites':      'dips-crudites',
  'batonnets-legumes-houmous':       'dips-crudites',
  'oeufs-durs-crudites-matin':       'dips-crudites',

  // ── Autres ─────────────────────────────────────────────────────────────────
  'tacos-boeuf-haricots-rouges-cheddar':'autres',
  'risotto-poulet-parmesan':         'autres',
  'quesadillas-poulet-fromage':      'autres',
  'chili-con-carne-express':         'autres',
  'boeuf-stroganoff-express':        'autres',
  'assiette-express-thon-crudites':  'autres',
  'burger-maison-boeuf-cheddar-bacon':'autres',
  'mini-pizzas-pain-pita':           'autres',
  'oeufs-durs-paprika':              'autres',
  'pomme-beurre-amande':             'autres',
  'roules-dinde-fromage-roquette':   'autres',
  'chips-courgette-parmesan':        'autres',
}
