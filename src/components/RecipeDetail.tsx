import { useState, useCallback } from 'react'
import { X, ChevronLeft, Clock, Users, Plus, Minus, Dumbbell, Leaf, ShoppingBag } from 'lucide-react'
import type { Recipe } from '../types'
import { RecipeIllustration } from './illustrations'
import { recipeIllustrations } from '../data/illustrations'
import { MacroPill } from './MacroPill'

interface RecipeDetailProps {
  recipe: Recipe
  onClose: () => void
  onAddToTracker: () => void
  isMobile: boolean
}

const categoryLabel: Record<string, string> = {
  'petit-dejeuner': 'Petit-déjeuner',
  dejeuner: 'Déjeuner',
  diner: 'Dîner',
  snack: 'Snack',
}

function MacroBar({ label, value, max, color }: { label: string; value: number; max: number; color: string; bg?: string }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 w-24 flex-shrink-0">
        <span className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
        <span className="font-nunito font-semibold text-text-secondary" style={{ fontSize: '13px' }}>{label}</span>
      </div>
      <div className="flex-1 rounded-pill h-2" style={{ backgroundColor: '#F0E8E0' }}>
        <div
          className="h-2 rounded-pill transition-all duration-500 ease-out"
          style={{ width: `${pct}%`, backgroundColor: color }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      <span className="font-nunito text-text-secondary w-12 text-right" style={{ fontSize: '12px' }}>
        {value}g
      </span>
    </div>
  )
}

export function RecipeDetail({ recipe, onClose, onAddToTracker, isMobile }: RecipeDetailProps) {
  const [portions, setPortions] = useState(recipe.servings)
  const isMasse = recipe.objective === 'masse'
  const illustrationKey = recipeIllustrations[recipe.id] ?? 'chicken-bowl'

  const ratio = portions / recipe.servings

  const scaled = {
    calories: Math.round(recipe.macros.calories * ratio),
    protein: Math.round(recipe.macros.protein * ratio),
    carbs: Math.round(recipe.macros.carbs * ratio),
    fat: Math.round(recipe.macros.fat * ratio),
  }

  const totalMacroG = scaled.protein + scaled.carbs + scaled.fat
  const protPct = totalMacroG > 0 ? Math.round((scaled.protein / totalMacroG) * 100) : 0
  const carbPct = totalMacroG > 0 ? Math.round((scaled.carbs / totalMacroG) * 100) : 0
  const fatPct = totalMacroG > 0 ? Math.round((scaled.fat / totalMacroG) * 100) : 0

  const incr = useCallback(() => setPortions((p) => Math.min(p + 1, 10)), [])
  const decr = useCallback(() => setPortions((p) => Math.max(p - 1, 1)), [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={`Recette : ${recipe.name}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-text-primary/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="relative z-10 w-full md:max-w-2xl max-h-[92vh] md:max-h-[88vh] overflow-y-auto rounded-t-2xl md:rounded-card border-2 border-border-strong shadow-modal"
        style={{ backgroundColor: '#FFF9F3' }}
      >
        {/* Illustration header */}
        <div
          className="relative flex items-center justify-center"
          style={{
            height: isMobile ? '200px' : '240px',
            backgroundColor: isMasse ? '#FFF0E6' : '#EEFAE6',
            borderBottom: '2px solid #E8DDD3',
          }}
        >
          <RecipeIllustration illustrationKey={illustrationKey} className="w-40 h-40" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-bg-card border-2 border-border-strong flex items-center justify-center transition-all duration-150 hover:-translate-y-0.5 active:scale-95"
            aria-label="Fermer la recette"
          >
            <X size={18} strokeWidth={2.5} className="text-text-primary" aria-hidden="true" />
          </button>

          {/* Back for mobile */}
          <button
            onClick={onClose}
            className="md:hidden absolute top-3 left-3 w-9 h-9 rounded-full bg-bg-card border-2 border-border-strong flex items-center justify-center transition-all duration-150 hover:-translate-y-0.5 active:scale-95"
            aria-label="Retour"
          >
            <ChevronLeft size={18} strokeWidth={2.5} className="text-text-primary" aria-hidden="true" />
          </button>

          {/* Objective badge */}
          <span
            className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 font-nunito font-bold border-2 border-border-strong"
            style={{
              backgroundColor: isMasse ? '#D85A30' : '#5AAD2F',
              color: 'white',
              borderRadius: '50px',
              padding: '4px 14px',
              fontSize: '12px',
            }}
          >
            {isMasse ? <Dumbbell size={13} strokeWidth={2.5} aria-hidden="true" /> : <Leaf size={13} strokeWidth={2.5} aria-hidden="true" />}
            {isMasse ? 'Prise de masse' : 'Sèche'}
          </span>
        </div>

        <div className="p-5 md:p-6 space-y-5">
          {/* Title + meta */}
          <div>
            <h2 className="font-fredoka font-semibold text-text-primary text-2xl leading-tight mb-2">
              {recipe.name}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-text-secondary">
              <span className="flex items-center gap-1 font-nunito font-semibold text-sm">
                <Clock size={15} strokeWidth={2} aria-hidden="true" />
                {recipe.prepTime} min
              </span>
              <span style={{ color: '#E8DDD3' }}>·</span>
              <span className="font-nunito font-semibold text-sm">
                {categoryLabel[recipe.category]}
              </span>
              <span style={{ color: '#E8DDD3' }}>·</span>
              <span className="flex items-center gap-1 font-nunito font-semibold text-sm">
                <Users size={15} strokeWidth={2} aria-hidden="true" />
                {recipe.servings} portion{recipe.servings > 1 ? 's' : ''} par défaut
              </span>
            </div>
          </div>

          {/* Portions selector */}
          <div
            className="flex items-center justify-between rounded-input border-2 border-border-default p-3"
            style={{ backgroundColor: '#FFF5ED' }}
          >
            <span className="font-nunito font-semibold text-text-primary text-sm">Nombre de portions</span>
            <div className="flex items-center gap-3">
              <button
                onClick={decr}
                disabled={portions <= 1}
                className="w-9 h-9 rounded-full border-2 border-border-strong bg-bg-card flex items-center justify-center font-bold transition-all duration-150 hover:bg-bg-section active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Diminuer les portions"
              >
                <Minus size={16} strokeWidth={2.5} aria-hidden="true" />
              </button>
              <span className="font-fredoka font-semibold text-text-primary w-6 text-center" style={{ fontSize: '20px' }}>
                {portions}
              </span>
              <button
                onClick={incr}
                disabled={portions >= 10}
                className="w-9 h-9 rounded-full border-2 border-border-strong bg-primary flex items-center justify-center font-bold transition-all duration-150 hover:bg-primary-hover active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Augmenter les portions"
              >
                <Plus size={16} strokeWidth={2.5} className="text-white" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Macros visual */}
          <div
            className="rounded-input border-2 border-border-default p-4 space-y-3"
            style={{ backgroundColor: '#FFF5ED' }}
          >
            <h3 className="font-fredoka font-semibold text-text-primary mb-3" style={{ fontSize: '16px' }}>
              Valeurs nutritionnelles
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <MacroPill type="calories" value={scaled.calories} size="md" />
              <MacroPill type="protein" value={scaled.protein} size="md" />
              <MacroPill type="carbs" value={scaled.carbs} size="md" />
              <MacroPill type="fat" value={scaled.fat} size="md" />
            </div>
            <div className="space-y-2">
              <MacroBar label="Protéines" value={scaled.protein} max={Math.max(scaled.protein, 1)} color="#E8713A" bg="#FAECE7" />
              <MacroBar label="Glucides" value={scaled.carbs} max={Math.max(scaled.protein, scaled.carbs, scaled.fat)} color="#5AAD2F" bg="#EAF3DE" />
              <MacroBar label="Lipides" value={scaled.fat} max={Math.max(scaled.protein, scaled.carbs, scaled.fat)} color="#C46E8E" bg="#FBEAF0" />
            </div>
            <p className="font-nunito text-text-muted mt-2" style={{ fontSize: '11px' }}>
              Répartition : P {protPct}% · G {carbPct}% · L {fatPct}%
            </p>
          </div>

          {/* Ingredients */}
          <div>
            <h3 className="font-fredoka font-semibold text-text-primary mb-3" style={{ fontSize: '18px' }}>
              Ingrédients
            </h3>
            <ul className="space-y-2" aria-label="Liste des ingrédients">
              {recipe.ingredients.map((ing, i) => {
                const qty = Math.round(ing.quantity * ratio * 10) / 10
                return (
                  <li
                    key={i}
                    className="flex items-center justify-between py-2 font-nunito"
                    style={{ borderBottom: '1px solid #E8DDD3' }}
                  >
                    <span className="text-text-primary font-semibold text-sm">{ing.name}</span>
                    <span
                      className="font-nunito font-bold text-sm rounded-macro px-2 py-0.5"
                      style={{ backgroundColor: isMasse ? '#FAECE7' : '#EAF3DE', color: isMasse ? '#993C1D' : '#3B6D11' }}
                    >
                      {qty} {ing.unit}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Steps */}
          <div>
            <h3 className="font-fredoka font-semibold text-text-primary mb-3" style={{ fontSize: '18px' }}>
              Préparation
            </h3>
            <ol className="space-y-3" aria-label="Étapes de préparation">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full border-2 border-border-strong flex items-center justify-center font-fredoka font-semibold text-sm"
                    style={{ backgroundColor: isMasse ? '#D85A30' : '#5AAD2F', color: 'white' }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <p className="font-nunito text-text-primary text-sm leading-relaxed pt-0.5">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* CTA */}
          <button
            onClick={onAddToTracker}
            className="w-full flex items-center justify-center gap-2 font-nunito font-bold text-sm border-2 border-border-strong text-white transition-all duration-150 hover:-translate-y-0.5 hover:shadow-btn-hover active:scale-95"
            style={{
              backgroundColor: '#E8713A',
              borderRadius: '50px',
              padding: '14px 24px',
            }}
          >
            <ShoppingBag size={18} strokeWidth={2} aria-hidden="true" />
            Ajouter au tracker
          </button>
        </div>
      </div>
    </div>
  )
}
