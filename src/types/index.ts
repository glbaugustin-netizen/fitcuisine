export type RecipeCategory = 'petit-dejeuner' | 'dejeuner' | 'diner' | 'snack'
export type RecipeObjective = 'masse' | 'seche'
export type MainIngredient = 'poulet' | 'boeuf' | 'poisson' | 'oeufs' | 'vegetarien' | 'crevettes' | 'dinde' | 'porc'

export interface Ingredient {
  name: string
  quantity: number
  unit: string
}

export interface Macros {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface Recipe {
  id: string
  name: string
  prepTime: number
  difficulty: 1 | 2 | 3
  servings: number
  category: RecipeCategory
  objective: RecipeObjective
  mainIngredient: MainIngredient
  ingredients: Ingredient[]
  steps: string[]
  macros: Macros
}

export type ActivePage = 'recettes' | 'tracker' | 'dashboard'
export type SortOption = 'default' | 'time-asc' | 'time-desc' | 'calories-asc' | 'calories-desc'

export interface FilterState {
  search: string
  objective: RecipeObjective | 'tous'
  category: RecipeCategory | 'tous'
  mainIngredient: MainIngredient | 'tous'
  sort: SortOption
  showFavoritesOnly: boolean
  dishType: string | 'tous'
}

// ── Tracker ──────────────────────────────────────────────────────────────────

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export interface TrackerEntry {
  id: string
  name: string
  brand?: string
  quantity: number  // en grammes
  calories: number
  protein: number
  carbs: number
  fat: number
  source: 'openfoodfacts' | 'recipe'
  recipeId?: string
}

export interface DayJournal {
  date: string  // 'YYYY-MM-DD'
  meals: Record<MealType, TrackerEntry[]>
}

// ── Profil utilisateur ───────────────────────────────────────────────────────

export type ActivityLevel = 'sedentaire' | 'modere' | 'actif' | 'tres-actif'

export interface UserProfile {
  sex: 'homme' | 'femme'
  age: number
  height: number   // cm
  weight: number   // kg
  activityLevel: ActivityLevel
  goal: 'masse' | 'seche'
  targetCalories?: number
  targetProtein?: number
  targetCarbs?: number
  targetFat?: number
}

export interface CalorieGoal {
  mb: number
  totalExpenditure: number
  targetCalories: number
  targetProtein: number
  targetCarbs: number
  targetFat: number
}

export interface WeightEntry {
  date: string
  value: number
}
