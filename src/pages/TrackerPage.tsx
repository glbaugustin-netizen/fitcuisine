import { useState, useCallback } from 'react'
import type { MealType, TrackerEntry } from '../types'
import { useTracker } from '../contexts/TrackerContext'
import { DateSelector } from '../components/DateSelector'
import { DaySummary } from '../components/DaySummary'
import { MealSlot } from '../components/MealSlot'
import { AddFoodModal } from '../components/AddFoodModal'
import { Toast } from '../components/Toast'

const MEAL_LABELS: Record<MealType, string> = {
  breakfast: 'Petit-déjeuner',
  lunch:     'Déjeuner',
  dinner:    'Dîner',
  snack:     'Snack',
}

const MEAL_ORDER: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack']

export function TrackerPage() {
  const { state, addEntry, removeEntry, setSelectedDate, getDayTotals } = useTracker()
  const [modalMeal, setModalMeal] = useState<MealType | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const date = state.selectedDate
  const journal = state.journals[date]
  const totals = getDayTotals(date)

  const getMealEntries = (meal: MealType): TrackerEntry[] =>
    journal?.meals[meal] ?? []

  const handleAdd = useCallback((entry: TrackerEntry) => {
    if (!modalMeal) return
    addEntry(date, modalMeal, entry)
    setToast(`Ajouté au ${MEAL_LABELS[modalMeal]} !`)
    setModalMeal(null)
  }, [modalMeal, date, addEntry])

  const handleRemove = useCallback((meal: MealType, entryId: string) => {
    removeEntry(date, meal, entryId)
  }, [date, removeEntry])

  return (
    <main className="max-w-container mx-auto px-4 md:px-6 py-6 pb-28 md:pb-10 space-y-5">

      <div>
        <h1 className="font-fredoka font-semibold text-text-primary mb-1" style={{ fontSize: '28px' }}>
          Tracker
        </h1>
        <p className="font-nunito text-text-secondary text-sm">
          Suis tes macros jour par jour
        </p>
      </div>

      <DateSelector date={date} onChange={setSelectedDate} />

      <DaySummary
        calories={totals.calories}
        protein={totals.protein}
        carbs={totals.carbs}
        fat={totals.fat}
        profile={state.profile}
      />

      <div className="space-y-4">
        {MEAL_ORDER.map((meal) => (
          <MealSlot
            key={meal}
            mealType={meal}
            entries={getMealEntries(meal)}
            onAdd={() => setModalMeal(meal)}
            onRemove={(id) => handleRemove(meal, id)}
          />
        ))}
      </div>

      {modalMeal && (
        <AddFoodModal
          mealType={modalMeal}
          mealLabel={MEAL_LABELS[modalMeal]}
          onClose={() => setModalMeal(null)}
          onAdd={handleAdd}
        />
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </main>
  )
}
