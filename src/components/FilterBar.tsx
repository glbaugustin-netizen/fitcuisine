import { Search, SlidersHorizontal, Dumbbell, Leaf, X, Heart } from 'lucide-react'
import type { FilterState, RecipeObjective, RecipeCategory, MainIngredient, SortOption } from '../types'
import { useFavorites } from '../contexts/FavoritesContext'

interface FilterBarProps {
  filters: FilterState
  onChange: (filters: Partial<FilterState>) => void
  totalCount: number
  filteredCount: number
}

interface ChipProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  activeStyle?: React.CSSProperties
  'aria-label'?: string
}

function Chip({ active, onClick, children, activeStyle, 'aria-label': ariaLabel }: ChipProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      aria-label={ariaLabel}
      className="flex-shrink-0 flex items-center gap-1.5 font-nunito font-semibold transition-all duration-150 active:scale-95"
      style={{
        borderRadius: '50px',
        padding: '7px 15px',
        fontSize: '13px',
        border: active ? '2px solid #2C2420' : '2px solid #E8DDD3',
        backgroundColor: active ? (activeStyle?.backgroundColor ?? '#FAEEDA') : 'white',
        color: active ? (activeStyle?.color ?? '#2C2420') : '#8A7D74',
        ...(!active ? {} : activeStyle),
      }}
    >
      {children}
    </button>
  )
}

const objectives: { value: RecipeObjective | 'tous'; label: string }[] = [
  { value: 'tous', label: 'Tous' },
  { value: 'masse', label: 'Prise de masse' },
  { value: 'seche', label: 'Sèche' },
]

const categories: { value: RecipeCategory | 'tous'; label: string }[] = [
  { value: 'tous', label: 'Tous' },
  { value: 'petit-dejeuner', label: 'Petit-déj' },
  { value: 'dejeuner', label: 'Déjeuner' },
  { value: 'diner', label: 'Dîner' },
  { value: 'snack', label: 'Snack' },
]

const ingredients: { value: MainIngredient | 'tous'; label: string }[] = [
  { value: 'tous', label: 'Tous' },
  { value: 'poulet', label: 'Poulet' },
  { value: 'boeuf', label: 'Bœuf' },
  { value: 'poisson', label: 'Poisson' },
  { value: 'oeufs', label: 'Œufs' },
  { value: 'vegetarien', label: 'Végétarien' },
  { value: 'dinde', label: 'Dinde' },
  { value: 'porc', label: 'Porc' },
  { value: 'crevettes', label: 'Crevettes' },
]

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Par défaut' },
  { value: 'time-asc', label: 'Temps croissant' },
  { value: 'time-desc', label: 'Temps décroissant' },
  { value: 'calories-asc', label: 'Calories croissantes' },
  { value: 'calories-desc', label: 'Calories décroissantes' },
]

export function FilterBar({ filters, onChange, totalCount, filteredCount }: FilterBarProps) {
  const { favoritesCount } = useFavorites()

  const hasActiveFilters =
    filters.objective !== 'tous' ||
    filters.category !== 'tous' ||
    filters.mainIngredient !== 'tous' ||
    filters.sort !== 'default' ||
    filters.search !== '' ||
    filters.showFavoritesOnly

  function resetAll() {
    onChange({ objective: 'tous', category: 'tous', mainIngredient: 'tous', sort: 'default', search: '', showFavoritesOnly: false })
  }

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search
          size={18}
          strokeWidth={2}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="search"
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          placeholder="Cherche une recette : poulet, avocat, pancakes..."
          className="w-full font-nunito text-sm text-text-primary placeholder:text-text-muted transition-all duration-150 focus:outline-none"
          style={{
            height: '48px',
            paddingLeft: '44px',
            paddingRight: '16px',
            borderRadius: '12px',
            border: '2px solid #E8DDD3',
            backgroundColor: 'white',
            fontSize: '14px',
          }}
          aria-label="Rechercher une recette"
          onFocus={(e) => (e.currentTarget.style.borderColor = '#2C2420')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#E8DDD3')}
        />
      </div>

      {/* Objective filter — most prominent */}
      <div>
        <p
          className="font-nunito font-semibold mb-2 uppercase tracking-wider"
          style={{ fontSize: '11px', color: '#8A7D74', letterSpacing: '0.5px' }}
        >
          Objectif
        </p>
        <div className="filter-scroll flex items-center gap-2 pb-1">
          {objectives.map(({ value, label }) => {
            const active = filters.objective === value
            return (
              <Chip
                key={value}
                active={active}
                onClick={() => onChange({ objective: value })}
                aria-label={`Filtrer par objectif : ${label}`}
                activeStyle={
                  value === 'masse'
                    ? { backgroundColor: '#D85A30', color: 'white' }
                    : value === 'seche'
                    ? { backgroundColor: '#5AAD2F', color: 'white' }
                    : { backgroundColor: '#FAEEDA', color: '#2C2420' }
                }
              >
                {value === 'masse' && <Dumbbell size={13} strokeWidth={2.5} aria-hidden="true" />}
                {value === 'seche' && <Leaf size={13} strokeWidth={2.5} aria-hidden="true" />}
                {label}
              </Chip>
            )
          })}
        </div>
      </div>

      {/* Favoris filter */}
      <div>
        <p
          className="font-nunito font-semibold mb-2 uppercase tracking-wider"
          style={{ fontSize: '11px', color: '#8A7D74', letterSpacing: '0.5px' }}
        >
          Sélection
        </p>
        <div className="filter-scroll flex items-center gap-2 pb-1">
          <Chip
            active={filters.showFavoritesOnly}
            onClick={() => onChange({ showFavoritesOnly: !filters.showFavoritesOnly })}
            aria-label="Afficher uniquement les favoris"
            activeStyle={{ backgroundColor: '#FAECE7', color: '#E8713A', border: '2px solid #E8713A' }}
          >
            <Heart
              size={13}
              strokeWidth={2.5}
              fill={filters.showFavoritesOnly ? '#E8713A' : 'none'}
              color={filters.showFavoritesOnly ? '#E8713A' : '#8A7D74'}
              aria-hidden="true"
            />
            Favoris{favoritesCount > 0 ? ` (${favoritesCount})` : ''}
          </Chip>
        </div>
      </div>

      {/* Type + Ingredient + Sort row */}
      <div className="space-y-3">
        {/* Category */}
        <div>
          <p
            className="font-nunito font-semibold mb-2 uppercase tracking-wider"
            style={{ fontSize: '11px', color: '#8A7D74', letterSpacing: '0.5px' }}
          >
            Type de repas
          </p>
          <div className="filter-scroll flex items-center gap-2 pb-1">
            {categories.map(({ value, label }) => (
              <Chip
                key={value}
                active={filters.category === value}
                onClick={() => onChange({ category: value })}
                aria-label={`Filtrer par type : ${label}`}
                activeStyle={{ backgroundColor: '#FAEEDA', color: '#2C2420' }}
              >
                {label}
              </Chip>
            ))}
          </div>
        </div>

        {/* Ingredient */}
        <div>
          <p
            className="font-nunito font-semibold mb-2 uppercase tracking-wider"
            style={{ fontSize: '11px', color: '#8A7D74', letterSpacing: '0.5px' }}
          >
            Ingrédient principal
          </p>
          <div className="filter-scroll flex items-center gap-2 pb-1">
            {ingredients.map(({ value, label }) => (
              <Chip
                key={value}
                active={filters.mainIngredient === value}
                onClick={() => onChange({ mainIngredient: value })}
                aria-label={`Filtrer par ingrédient : ${label}`}
                activeStyle={{ backgroundColor: '#FAEEDA', color: '#2C2420' }}
              >
                {label}
              </Chip>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-text-secondary flex-shrink-0">
            <SlidersHorizontal size={15} strokeWidth={2} aria-hidden="true" />
            <span className="font-nunito font-semibold uppercase tracking-wider" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
              Tri
            </span>
          </div>
          <div className="filter-scroll flex items-center gap-2 pb-1">
            {sortOptions.map(({ value, label }) => (
              <Chip
                key={value}
                active={filters.sort === value}
                onClick={() => onChange({ sort: value })}
                activeStyle={{ backgroundColor: '#FAEEDA', color: '#2C2420' }}
              >
                {label}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {/* Results count + reset */}
      <div className="flex items-center justify-between pt-1">
        <p className="font-nunito text-text-secondary text-sm">
          <span className="font-bold text-text-primary font-fredoka" style={{ fontSize: '16px' }}>{filteredCount}</span>
          <span className="ml-1">recette{filteredCount !== 1 ? 's' : ''}</span>
          {hasActiveFilters && <span className="text-text-muted"> sur {totalCount}</span>}
        </p>
        {hasActiveFilters && (
          <button
            onClick={resetAll}
            className="flex items-center gap-1 font-nunito font-semibold text-xs text-text-secondary transition-colors hover:text-text-primary"
            style={{
              border: '1.5px solid #E8DDD3',
              borderRadius: '50px',
              padding: '5px 12px',
            }}
            aria-label="Réinitialiser les filtres"
          >
            <X size={12} strokeWidth={2.5} aria-hidden="true" />
            Réinitialiser
          </button>
        )}
      </div>
    </div>
  )
}
