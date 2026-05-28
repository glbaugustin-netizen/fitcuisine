import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import type { Recipe, FilterState } from '../types'
import { recipes } from '../data/recipes'
import { FilterBar } from '../components/FilterBar'
import { RecipeCard } from '../components/RecipeCard'
import { RecipeDetail } from '../components/RecipeDetail'

const defaultFilters: FilterState = {
  search: '',
  objective: 'tous',
  category: 'tous',
  mainIngredient: 'tous',
  sort: 'default',
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  return debouncedValue
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler, { passive: true })
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

export function RecipesPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const isMobile = useIsMobile()
  const gridRef = useRef<HTMLDivElement>(null)

  const debouncedSearch = useDebounce(filters.search, 280)

  const handleFilterChange = useCallback((partial: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...partial }))
  }, [])

  const filtered = useMemo(() => {
    let result = [...recipes]

    // Search
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase().trim()
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.mainIngredient.toLowerCase().includes(query) ||
          r.ingredients.some((ing) => ing.name.toLowerCase().includes(query))
      )
    }

    // Objective
    if (filters.objective !== 'tous') {
      result = result.filter((r) => r.objective === filters.objective)
    }

    // Category
    if (filters.category !== 'tous') {
      result = result.filter((r) => r.category === filters.category)
    }

    // Main ingredient
    if (filters.mainIngredient !== 'tous') {
      result = result.filter((r) => r.mainIngredient === filters.mainIngredient)
    }

    // Sort
    switch (filters.sort) {
      case 'time-asc':
        result.sort((a, b) => a.prepTime - b.prepTime)
        break
      case 'time-desc':
        result.sort((a, b) => b.prepTime - a.prepTime)
        break
      case 'calories-asc':
        result.sort((a, b) => a.macros.calories - b.macros.calories)
        break
      case 'calories-desc':
        result.sort((a, b) => b.macros.calories - a.macros.calories)
        break
    }

    return result
  }, [debouncedSearch, filters.objective, filters.category, filters.mainIngredient, filters.sort])

  const closeDetail = useCallback(() => setSelectedRecipe(null), [])

  return (
    <main className="max-w-container mx-auto px-4 md:px-6 py-6 pb-24 md:pb-8">
      {/* Page title */}
      <div className="mb-6">
        <h1 className="font-fredoka font-semibold text-text-primary mb-1" style={{ fontSize: '28px' }}>
          Recettes
        </h1>
        <p className="font-nunito text-text-secondary text-sm">
          {recipes.length} recettes rapides pour atteindre tes objectifs
        </p>
      </div>

      {/* Filters */}
      <section aria-label="Filtres de recherche" className="mb-6">
        <FilterBar
          filters={filters}
          onChange={handleFilterChange}
          totalCount={recipes.length}
          filteredCount={filtered.length}
        />
      </section>

      {/* Recipe grid */}
      <section aria-label="Grille de recettes" ref={gridRef}>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <span className="font-fredoka font-semibold text-text-secondary text-xl">
              Aucune recette trouvée
            </span>
            <p className="font-nunito text-text-muted text-sm text-center max-w-xs">
              Essaie de modifier tes filtres ou ta recherche
            </p>
            <button
              onClick={() => setFilters(defaultFilters)}
              className="font-nunito font-bold text-sm border-2 border-border-strong bg-primary text-white transition-all duration-150 hover:-translate-y-0.5 hover:shadow-btn-hover active:scale-95"
              style={{ borderRadius: '50px', padding: '10px 22px' }}
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div
            className="grid gap-5"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            }}
          >
            {filtered.map((recipe, index) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                index={index}
                onClick={setSelectedRecipe}
              />
            ))}
          </div>
        )}
      </section>

      {/* Recipe detail modal */}
      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={closeDetail}
          isMobile={isMobile}
        />
      )}
    </main>
  )
}
