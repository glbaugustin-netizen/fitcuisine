import { useState } from 'react'
import { Plus, X, Sun, UtensilsCrossed, Moon, Apple } from 'lucide-react'
import type { MealType, TrackerEntry } from '../types'

interface MealSlotProps {
  mealType: MealType
  entries: TrackerEntry[]
  onAdd: () => void
  onRemove: (entryId: string) => void
}

const mealConfig: Record<MealType, { label: string; Icon: typeof Sun; color: string; bg: string }> = {
  breakfast: { label: 'Petit-déjeuner', Icon: Sun, color: '#E8B44A', bg: '#FFF8E6' },
  lunch:     { label: 'Déjeuner',       Icon: UtensilsCrossed, color: '#E8713A', bg: '#FFF0E6' },
  dinner:    { label: 'Dîner',          Icon: Moon,   color: '#8B7EC8', bg: '#F4F0FB' },
  snack:     { label: 'Snack',          Icon: Apple,  color: '#5AAD2F', bg: '#EEFAE6' },
}

function EntryRow({ entry, onRemove }: { entry: TrackerEntry; onRemove: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="flex items-center justify-between py-2 px-4 group transition-colors"
      style={{ borderBottom: '1px solid #E8DDD3', backgroundColor: hovered ? '#FFFAF6' : 'transparent' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex-1 min-w-0">
        <span className="font-nunito font-semibold text-text-primary text-sm truncate block">
          {entry.name}
          {entry.brand && <span className="font-normal text-text-muted ml-1">· {entry.brand}</span>}
        </span>
        <div className="flex items-center gap-1.5 mt-0.5">
          {[
            { label: 'P', value: entry.protein, bg: '#FAECE7', color: '#993C1D', border: '#E8713A' },
            { label: 'G', value: entry.carbs,   bg: '#EAF3DE', color: '#3B6D11', border: '#5AAD2F' },
            { label: 'L', value: entry.fat,     bg: '#FBEAF0', color: '#72243E', border: '#C46E8E' },
          ].map(({ label, value, bg, color, border }) => (
            <span
              key={label}
              className="font-nunito font-bold"
              style={{ fontSize: '10px', backgroundColor: bg, color, border: `1px solid ${border}`, borderRadius: '6px', padding: '1px 5px' }}
            >
              {label} {value}g
            </span>
          ))}
          <span className="font-nunito text-text-muted" style={{ fontSize: '11px' }}>{entry.quantity}g</span>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-2 flex-shrink-0">
        <span
          className="font-fredoka font-semibold"
          style={{ fontSize: '14px', color: '#854F0B' }}
        >
          {entry.calories} kcal
        </span>
        <button
          onClick={onRemove}
          className={[
            'w-6 h-6 rounded-full border border-border-default bg-white flex items-center justify-center transition-all duration-150 hover:border-border-strong hover:bg-red-50 active:scale-95',
            hovered ? 'opacity-100' : 'opacity-0 md:opacity-0',
          ].join(' ')}
          aria-label={`Supprimer ${entry.name}`}
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <X size={12} strokeWidth={2.5} className="text-text-secondary" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export function MealSlot({ mealType, entries, onAdd, onRemove }: MealSlotProps) {
  const config = mealConfig[mealType]
  const { label, Icon, color, bg } = config
  const totalCalories = entries.reduce((s, e) => s + e.calories, 0)

  return (
    <article
      className="rounded-card border-2 border-border-strong overflow-hidden"
      style={{ backgroundColor: 'white' }}
      aria-label={`Slot ${label}`}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ backgroundColor: bg, borderBottom: '1px solid #E8DDD3' }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-border-strong flex-shrink-0"
            style={{ backgroundColor: color }}
          >
            <Icon size={16} strokeWidth={2} className="text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-fredoka font-semibold text-text-primary" style={{ fontSize: '15px' }}>
              {label}
            </h3>
            {entries.length > 0 && (
              <p className="font-nunito text-text-secondary" style={{ fontSize: '11px' }}>
                {totalCalories} kcal · {entries.length} aliment{entries.length > 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={onAdd}
          className="w-9 h-9 rounded-full border-2 border-border-strong flex items-center justify-center transition-all duration-150 hover:-translate-y-0.5 hover:shadow-btn-hover active:scale-95"
          style={{ backgroundColor: '#E8713A' }}
          aria-label={`Ajouter un aliment au ${label}`}
        >
          <Plus size={18} strokeWidth={2.5} className="text-white" aria-hidden="true" />
        </button>
      </div>

      {/* Entries */}
      {entries.length === 0 ? (
        <div className="flex items-center justify-center py-5">
          <p className="font-nunito text-text-muted text-sm">Aucun aliment ajouté</p>
        </div>
      ) : (
        <div>
          {entries.map((entry) => (
            <EntryRow
              key={entry.id}
              entry={entry}
              onRemove={() => onRemove(entry.id)}
            />
          ))}
        </div>
      )}
    </article>
  )
}
