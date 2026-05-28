import { useState, useEffect, useRef, useCallback } from 'react'
import { X, Search, AlertTriangle, Minus, Plus, Dumbbell, Leaf } from 'lucide-react'
import type { MealType, TrackerEntry } from '../types'
import { recipes } from '../data/recipes'

interface AddFoodModalProps {
  mealType: MealType
  mealLabel: string
  onClose: () => void
  onAdd: (entry: TrackerEntry) => void
}

// ── OpenFoodFacts types ───────────────────────────────────────────────────────

interface OFFNutriments {
  'energy-kcal_100g'?: number
  energy_100g?: number
  proteins_100g?: number
  carbohydrates_100g?: number
  fat_100g?: number
}

interface OFFProduct {
  product_name?: string
  brands?: string
  quantity?: string
  nutriments: OFFNutriments
}

function isIncomplete(n: OFFNutriments): boolean {
  const kcal = n['energy-kcal_100g'] ?? (n.energy_100g ? n.energy_100g / 4.184 : 0)
  return kcal === 0 && (n.proteins_100g ?? 0) === 0 && (n.carbohydrates_100g ?? 0) === 0 && (n.fat_100g ?? 0) === 0
}

function calcEntry(product: OFFProduct, grams: number): TrackerEntry {
  const n = product.nutriments
  const kcalPer100 = n['energy-kcal_100g'] ?? (n.energy_100g ? n.energy_100g / 4.184 : 0)
  const ratio = grams / 100
  return {
    id: crypto.randomUUID(),
    name: product.product_name?.trim() || 'Produit inconnu',
    brand: product.brands?.split(',')[0]?.trim() || undefined,
    quantity: grams,
    calories: Math.round(kcalPer100 * ratio),
    protein:  Math.round((n.proteins_100g ?? 0) * ratio),
    carbs:    Math.round((n.carbohydrates_100g ?? 0) * ratio),
    fat:      Math.round((n.fat_100g ?? 0) * ratio),
    source: 'openfoodfacts',
  }
}

// ── OpenFoodFacts Tab ─────────────────────────────────────────────────────────

function OFFTab({ onAdd }: { onAdd: (e: TrackerEntry) => void }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<OFFProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<OFFProduct | null>(null)
  const [grams, setGrams] = useState(100)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const timer = setTimeout(async () => {
      if (abortRef.current) abortRef.current.abort()
      const ctrl = new AbortController()
      abortRef.current = ctrl
      setLoading(true); setError(null)
      try {
        const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=15&fields=product_name,nutriments,brands,quantity`
        const res = await fetch(url, { signal: ctrl.signal })
        const data = await res.json() as { products?: OFFProduct[] }
        setResults((data.products ?? []).filter((p) => p.product_name?.trim()))
      } catch (e) {
        if (e instanceof DOMException && e.name === 'AbortError') return
        setError('Erreur de connexion à OpenFoodFacts.')
      } finally {
        setLoading(false)
      }
    }, 400)
    return () => clearTimeout(timer)
  }, [query])

  if (selected) {
    const preview = calcEntry(selected, grams)
    const incomplete = isIncomplete(selected.nutriments)
    return (
      <div className="space-y-4">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-1 font-nunito font-semibold text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          <span>←</span> Retour aux résultats
        </button>

        <div className="rounded-input border-2 border-border-default p-4 space-y-3" style={{ backgroundColor: '#FFF5ED' }}>
          <div>
            <p className="font-fredoka font-semibold text-text-primary" style={{ fontSize: '16px' }}>{selected.product_name}</p>
            {selected.brands && <p className="font-nunito text-text-muted text-xs">{selected.brands.split(',')[0]}</p>}
          </div>

          {incomplete && (
            <div className="flex items-start gap-2 rounded-input p-3" style={{ backgroundColor: '#FAEEDA', border: '1.5px solid #E8B44A' }}>
              <AlertTriangle size={14} strokeWidth={2} style={{ color: '#854F0B', flexShrink: 0, marginTop: 1 }} aria-hidden="true" />
              <p className="font-nunito font-semibold" style={{ fontSize: '12px', color: '#854F0B' }}>
                Données nutritionnelles incomplètes pour ce produit.
              </p>
            </div>
          )}

          <div className="flex items-center justify-between rounded-input border-2 border-border-default bg-white p-3">
            <span className="font-nunito font-semibold text-text-primary text-sm">Quantité</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setGrams((g) => Math.max(g - 10, 10))}
                className="w-8 h-8 rounded-full border-2 border-border-strong bg-white flex items-center justify-center hover:bg-bg-section active:scale-95">
                <Minus size={14} strokeWidth={2.5} aria-hidden="true" />
              </button>
              <div className="flex items-center gap-1">
                <input
                  type="number" value={grams} min={1} max={2000}
                  onChange={(e) => setGrams(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center font-fredoka font-semibold text-text-primary border-2 border-border-default rounded-input focus:border-border-strong focus:outline-none"
                  style={{ fontSize: '18px', padding: '2px 4px' }}
                  aria-label="Quantité en grammes"
                />
                <span className="font-nunito text-text-secondary text-sm">g</span>
              </div>
              <button onClick={() => setGrams((g) => Math.min(g + 10, 2000))}
                className="w-8 h-8 rounded-full border-2 border-border-strong bg-primary flex items-center justify-center hover:bg-primary-hover active:scale-95">
                <Plus size={14} strokeWidth={2.5} className="text-white" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { label: `${preview.calories} kcal`, bg: '#FAEEDA', color: '#854F0B', border: '#E8B44A' },
              { label: `P ${preview.protein}g`, bg: '#FAECE7', color: '#993C1D', border: '#E8713A' },
              { label: `G ${preview.carbs}g`, bg: '#EAF3DE', color: '#3B6D11', border: '#5AAD2F' },
              { label: `L ${preview.fat}g`, bg: '#FBEAF0', color: '#72243E', border: '#C46E8E' },
            ].map(({ label, bg, color, border }) => (
              <span key={label} className="font-nunito font-bold rounded-macro px-3 py-1"
                style={{ fontSize: '12px', backgroundColor: bg, color, border: `1.5px solid ${border}` }}>
                {label}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => onAdd(preview)}
          className="w-full font-nunito font-bold text-sm border-2 border-border-strong text-white hover:-translate-y-0.5 hover:shadow-btn-hover active:scale-95 transition-all duration-150"
          style={{ backgroundColor: '#E8713A', borderRadius: '50px', padding: '12px 24px' }}
        >
          Ajouter à ce repas
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" aria-hidden="true" />
        <input
          type="search" value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Chercher un aliment : riz, poulet, yaourt..."
          className="w-full font-nunito text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
          style={{ height: '44px', paddingLeft: '40px', paddingRight: '16px', borderRadius: '12px', border: '2px solid #E8DDD3', fontSize: '14px', backgroundColor: 'white' }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#2C2420')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#E8DDD3')}
          aria-label="Rechercher un aliment"
          autoFocus
        />
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8 gap-2 text-text-muted">
          <span className="w-4 h-4 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          <span className="font-nunito text-sm">Recherche en cours…</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-input p-3" style={{ backgroundColor: '#FAEEDA', border: '1.5px solid #E8B44A' }}>
          <AlertTriangle size={14} style={{ color: '#854F0B' }} aria-hidden="true" />
          <p className="font-nunito text-sm font-semibold" style={{ color: '#854F0B' }}>{error}</p>
        </div>
      )}

      {!loading && !error && query && results.length === 0 && (
        <p className="text-center font-nunito text-text-muted text-sm py-6">Aucun résultat pour "{query}"</p>
      )}

      {!query && (
        <p className="text-center font-nunito text-text-muted text-sm py-6">Tape le nom d'un aliment pour rechercher</p>
      )}

      <div className="space-y-1 max-h-72 overflow-y-auto">
        {results.map((p, i) => {
          const n = p.nutriments
          const kcal = Math.round(n['energy-kcal_100g'] ?? (n.energy_100g ? n.energy_100g / 4.184 : 0))
          return (
            <button
              key={i}
              onClick={() => { setSelected(p); setGrams(100) }}
              className="w-full flex items-center justify-between p-3 rounded-input text-left hover:bg-bg-section active:scale-95 transition-all border border-transparent hover:border-border-default"
            >
              <div className="flex-1 min-w-0">
                <p className="font-nunito font-semibold text-text-primary text-sm truncate">{p.product_name}</p>
                {p.brands && <p className="font-nunito text-text-muted truncate" style={{ fontSize: '11px' }}>{p.brands.split(',')[0]}</p>}
              </div>
              <span className="font-fredoka font-semibold ml-2 flex-shrink-0" style={{ fontSize: '14px', color: '#854F0B' }}>
                {kcal} kcal/100g
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Recipes Tab ───────────────────────────────────────────────────────────────

function RecipesTab({ onAdd }: { onAdd: (e: TrackerEntry) => void }) {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [portions, setPortions] = useState(1)

  const filtered = recipes.filter((r) =>
    !query || r.name.toLowerCase().includes(query.toLowerCase())
  )

  const selected = recipes.find((r) => r.id === selectedId) ?? null

  const handleAdd = () => {
    if (!selected) return
    const ratio = portions / selected.servings
    const entry: TrackerEntry = {
      id: crypto.randomUUID(),
      name: selected.name,
      quantity: Math.round(portions * 100),
      calories: Math.round(selected.macros.calories * ratio),
      protein:  Math.round(selected.macros.protein * ratio),
      carbs:    Math.round(selected.macros.carbs * ratio),
      fat:      Math.round(selected.macros.fat * ratio),
      source: 'recipe',
      recipeId: selected.id,
    }
    onAdd(entry)
  }

  if (selected) {
    const ratio = portions / selected.servings
    return (
      <div className="space-y-4">
        <button onClick={() => setSelectedId(null)}
          className="flex items-center gap-1 font-nunito font-semibold text-sm text-text-secondary hover:text-text-primary transition-colors">
          <span>←</span> Retour aux recettes
        </button>

        <div className="rounded-input border-2 border-border-default p-4 space-y-3" style={{ backgroundColor: '#FFF5ED' }}>
          <div className="flex items-start justify-between gap-2">
            <p className="font-fredoka font-semibold text-text-primary" style={{ fontSize: '16px' }}>{selected.name}</p>
            <span className="flex items-center gap-1 font-nunito font-bold border-2 border-border-strong flex-shrink-0"
              style={{ backgroundColor: selected.objective === 'masse' ? '#D85A30' : '#5AAD2F', color: 'white', borderRadius: '50px', padding: '2px 10px', fontSize: '10px' }}>
              {selected.objective === 'masse' ? <Dumbbell size={10} aria-hidden="true" /> : <Leaf size={10} aria-hidden="true" />}
              {selected.objective === 'masse' ? 'Masse' : 'Sèche'}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-input border-2 border-border-default bg-white p-3">
            <span className="font-nunito font-semibold text-text-primary text-sm">Portions</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setPortions((p) => Math.max(p - 1, 1))}
                className="w-8 h-8 rounded-full border-2 border-border-strong bg-white flex items-center justify-center hover:bg-bg-section active:scale-95">
                <Minus size={14} strokeWidth={2.5} aria-hidden="true" />
              </button>
              <span className="font-fredoka font-semibold text-text-primary w-5 text-center" style={{ fontSize: '18px' }}>{portions}</span>
              <button onClick={() => setPortions((p) => Math.min(p + 1, 10))}
                className="w-8 h-8 rounded-full border-2 border-border-strong bg-primary flex items-center justify-center hover:bg-primary-hover active:scale-95">
                <Plus size={14} strokeWidth={2.5} className="text-white" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { label: `${Math.round(selected.macros.calories * ratio)} kcal`, bg: '#FAEEDA', color: '#854F0B', border: '#E8B44A' },
              { label: `P ${Math.round(selected.macros.protein * ratio)}g`, bg: '#FAECE7', color: '#993C1D', border: '#E8713A' },
              { label: `G ${Math.round(selected.macros.carbs * ratio)}g`, bg: '#EAF3DE', color: '#3B6D11', border: '#5AAD2F' },
              { label: `L ${Math.round(selected.macros.fat * ratio)}g`, bg: '#FBEAF0', color: '#72243E', border: '#C46E8E' },
            ].map(({ label, bg, color, border }) => (
              <span key={label} className="font-nunito font-bold rounded-macro px-3 py-1"
                style={{ fontSize: '12px', backgroundColor: bg, color, border: `1.5px solid ${border}` }}>
                {label}
              </span>
            ))}
          </div>
        </div>

        <button onClick={handleAdd}
          className="w-full font-nunito font-bold text-sm border-2 border-border-strong text-white hover:-translate-y-0.5 hover:shadow-btn-hover active:scale-95 transition-all duration-150"
          style={{ backgroundColor: '#E8713A', borderRadius: '50px', padding: '12px 24px' }}>
          Ajouter au repas
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" aria-hidden="true" />
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Chercher une recette…"
          className="w-full font-nunito text-sm placeholder:text-text-muted focus:outline-none"
          style={{ height: '44px', paddingLeft: '40px', paddingRight: '16px', borderRadius: '12px', border: '2px solid #E8DDD3', fontSize: '14px', backgroundColor: 'white' }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#2C2420')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#E8DDD3')}
        />
      </div>
      <div className="space-y-1 max-h-80 overflow-y-auto">
        {filtered.map((r) => (
          <button key={r.id} onClick={() => { setSelectedId(r.id); setPortions(r.servings) }}
            className="w-full flex items-center justify-between p-3 rounded-input text-left hover:bg-bg-section active:scale-95 transition-all border border-transparent hover:border-border-default">
            <div className="flex-1 min-w-0">
              <p className="font-nunito font-semibold text-text-primary text-sm truncate">{r.name}</p>
              <p className="font-nunito text-text-muted" style={{ fontSize: '11px' }}>{r.macros.calories} kcal · P{r.macros.protein}g G{r.macros.carbs}g L{r.macros.fat}g</p>
            </div>
            <span className="flex items-center gap-1 font-nunito font-bold border-2 border-border-strong ml-2 flex-shrink-0"
              style={{ backgroundColor: r.objective === 'masse' ? '#D85A30' : '#5AAD2F', color: 'white', borderRadius: '50px', padding: '2px 8px', fontSize: '10px' }}>
              {r.objective === 'masse' ? <Dumbbell size={9} aria-hidden="true" /> : <Leaf size={9} aria-hidden="true" />}
              {r.objective === 'masse' ? 'Masse' : 'Sèche'}
            </span>
          </button>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center font-nunito text-text-muted text-sm py-6">Aucune recette trouvée</p>
      )}
    </div>
  )
}

// ── Modal wrapper ─────────────────────────────────────────────────────────────

export function AddFoodModal({ mealLabel, onClose, onAdd }: AddFoodModalProps) {
  const [activeTab, setActiveTab] = useState<'search' | 'recipes'>('search')

  const handleAdd = useCallback((entry: TrackerEntry) => {
    onAdd(entry)
  }, [onAdd])

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center" role="dialog" aria-modal="true" aria-label={`Ajouter un aliment — ${mealLabel}`}>
      <div className="absolute inset-0 bg-text-primary/40" onClick={onClose} aria-hidden="true" />

      <div
        className="relative z-10 w-full md:max-w-lg max-h-[92vh] md:max-h-[85vh] overflow-hidden flex flex-col rounded-t-2xl md:rounded-card border-2 border-border-strong shadow-modal"
        style={{ backgroundColor: '#FFF9F3' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b-2 border-border-default flex-shrink-0" style={{ backgroundColor: '#FFF5ED' }}>
          <h2 className="font-fredoka font-semibold text-text-primary" style={{ fontSize: '18px' }}>
            Ajouter — {mealLabel}
          </h2>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full border-2 border-border-strong bg-white flex items-center justify-center hover:bg-bg-section active:scale-95 transition-all"
            aria-label="Fermer">
            <X size={16} strokeWidth={2.5} className="text-text-primary" aria-hidden="true" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-5 pt-4 pb-2 flex-shrink-0">
          {([['search', 'Aliment'], ['recipes', 'Recette FitCuisine']] as const).map(([tab, label]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 font-nunito font-bold text-sm transition-all duration-150 active:scale-95"
              style={{
                borderRadius: '50px',
                padding: '8px 16px',
                border: activeTab === tab ? '2px solid #2C2420' : '2px solid #E8DDD3',
                backgroundColor: activeTab === tab ? '#E8713A' : 'white',
                color: activeTab === tab ? 'white' : '#8A7D74',
              }}
              aria-pressed={activeTab === tab}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 pb-5 pt-2">
          {activeTab === 'search' ? (
            <OFFTab onAdd={handleAdd} />
          ) : (
            <RecipesTab onAdd={handleAdd} />
          )}
        </div>
      </div>
    </div>
  )
}
