export type RecipeCategory = 'petit-dejeuner' | 'dejeuner' | 'diner' | 'snack'
export type RecipeObjective = 'masse' | 'seche'
export type MainIngredient = 'poulet' | 'boeuf' | 'poisson' | 'oeufs' | 'vegetarien' | 'crevettes' | 'dinde'

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
}
