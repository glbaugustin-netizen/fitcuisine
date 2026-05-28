import { Clock, Dumbbell, Leaf } from 'lucide-react'
import type { Recipe } from '../types'
import { MacroPill } from './MacroPill'
import { RecipeIllustration } from './illustrations'
import { recipeIllustrations } from '../data/illustrations'

interface RecipeCardProps {
  recipe: Recipe
  index: number
  onClick: (recipe: Recipe) => void
}

const categoryLabel: Record<string, string> = {
  'petit-dejeuner': 'Petit-déj',
  dejeuner: 'Déjeuner',
  diner: 'Dîner',
  snack: 'Snack',
}

function DifficultyDots({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`Difficulté ${level} sur 3`}>
      {[1, 2, 3].map((d) => (
        <span
          key={d}
          className="inline-block w-2 h-2 rounded-full border border-text-secondary"
          style={{ backgroundColor: d <= level ? '#8A7D74' : 'transparent' }}
        />
      ))}
    </span>
  )
}

export function RecipeCard({ recipe, index, onClick }: RecipeCardProps) {
  const isMasse = recipe.objective === 'masse'
  const illustrationKey = recipeIllustrations[recipe.id] ?? 'chicken-bowl'

  return (
    <article
      className="rounded-card border-2 border-border-strong overflow-hidden cursor-pointer select-none transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-primary"
      style={{
        backgroundColor: isMasse ? '#FFF0E6' : '#EEFAE6',
        animationDelay: `${index * 60}ms`,
      }}
      onClick={() => onClick(recipe)}
      onKeyDown={(e) => e.key === 'Enter' && onClick(recipe)}
      tabIndex={0}
      role="button"
      aria-label={`Voir la recette ${recipe.name}`}
    >
      {/* Illustration zone — 55% height */}
      <div
        className="relative flex items-center justify-center"
        style={{
          height: '160px',
          backgroundColor: isMasse ? '#FFF0E6' : '#EEFAE6',
          borderBottom: '2px solid #E8DDD3',
        }}
      >
        <RecipeIllustration
          illustrationKey={illustrationKey}
          className="w-28 h-28"
        />

        {/* Objective badge */}
        <span
          className="absolute top-3 right-3 flex items-center gap-1 font-nunito font-bold border-2 border-border-strong"
          style={{
            backgroundColor: isMasse ? '#D85A30' : '#5AAD2F',
            color: 'white',
            borderRadius: '50px',
            padding: '3px 10px',
            fontSize: '11px',
          }}
          aria-label={isMasse ? 'Objectif prise de masse' : 'Objectif sèche'}
        >
          {isMasse ? (
            <Dumbbell size={11} strokeWidth={2.5} aria-hidden="true" />
          ) : (
            <Leaf size={11} strokeWidth={2.5} aria-hidden="true" />
          )}
          {isMasse ? 'Masse' : 'Sèche'}
        </span>
      </div>

      {/* Card body */}
      <div className="p-3.5">
        {/* Name */}
        <h3 className="font-fredoka font-semibold text-text-primary leading-snug mb-1.5" style={{ fontSize: '15px' }}>
          {recipe.name}
        </h3>

        {/* Meta info */}
        <div className="flex items-center gap-2 mb-3" style={{ color: '#8A7D74' }}>
          <span className="flex items-center gap-1 font-nunito font-semibold" style={{ fontSize: '12px' }}>
            <Clock size={13} strokeWidth={2} aria-hidden="true" />
            {recipe.prepTime} min
          </span>
          <span style={{ color: '#E8DDD3' }}>·</span>
          <DifficultyDots level={recipe.difficulty} />
          <span style={{ color: '#E8DDD3' }}>·</span>
          <span className="font-nunito font-semibold" style={{ fontSize: '12px' }}>
            {categoryLabel[recipe.category]}
          </span>
        </div>

        {/* Macro pills */}
        <div className="flex flex-wrap gap-1.5">
          <MacroPill type="calories" value={recipe.macros.calories} />
          <MacroPill type="protein" value={recipe.macros.protein} />
          <MacroPill type="carbs" value={recipe.macros.carbs} />
          <MacroPill type="fat" value={recipe.macros.fat} />
        </div>
      </div>
    </article>
  )
}
