import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import type { ActivePage, Recipe, UserProfile } from '../types'
import { useTracker } from '../contexts/TrackerContext'
import { useFavorites } from '../contexts/FavoritesContext'
import { ProfileForm } from '../components/dashboard/ProfileForm'
import { CalorieGoalCard, calcGoal } from '../components/dashboard/CalorieGoalCard'
import { ProgressCharts } from '../components/dashboard/ProgressCharts'
import { WeightCard } from '../components/dashboard/WeightCard'
import { QuickStats } from '../components/dashboard/QuickStats'
import { RecipeCard } from '../components/RecipeCard'
import { RecipeDetail } from '../components/RecipeDetail'
import { Toast } from '../components/Toast'

interface DashboardPageProps {
  onNavigate: (page: ActivePage) => void
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

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-card border-2 border-border-strong bg-white p-5 space-y-4">
      <h2 className="font-fredoka font-semibold text-text-primary" style={{ fontSize: '20px' }}>{title}</h2>
      {children}
    </div>
  )
}

// ── Coach Avocat triste (empty favorites state) ───────────────────────────────

function SadAvocatSVG() {
  return (
    <svg width="72" height="72" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="16" cy="18" rx="9" ry="11" fill="#5AAD2F" stroke="#2C2420" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="16" cy="20" rx="5" ry="7" fill="#8B5E3C" stroke="#2C2420" strokeWidth="1.5" />
      <circle cx="16" cy="11" r="7" fill="#5AAD2F" stroke="#2C2420" strokeWidth="2" />
      <circle cx="13.5" cy="10" r="1.5" fill="#2C2420" />
      <circle cx="18.5" cy="10" r="1.5" fill="#2C2420" />
      <path d="M13.5 14.5 Q16 12.5 18.5 14.5" stroke="#2C2420" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

// ── Favorites section ─────────────────────────────────────────────────────────

function FavoritesSection({ onNavigate }: { onNavigate: (page: ActivePage) => void }) {
  const { getFavoriteRecipes, favoritesCount } = useFavorites()
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const isMobile = useIsMobile()
  const favoriteRecipes = getFavoriteRecipes()

  return (
    <div className="rounded-card border-2 border-border-strong bg-white p-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-9 h-9 rounded-full border-2 border-border-strong flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: '#FAECE7' }}
        >
          <Heart size={18} strokeWidth={2.5} fill="#E8713A" color="#E8713A" aria-hidden="true" />
        </div>
        <h2 className="font-fredoka font-semibold text-text-primary" style={{ fontSize: '20px' }}>
          Mes recettes favorites
        </h2>
        {favoritesCount > 0 && (
          <span className="font-nunito font-semibold text-text-secondary" style={{ fontSize: '15px' }}>
            ({favoritesCount})
          </span>
        )}
      </div>

      {favoriteRecipes.length === 0 ? (
        /* Empty state */
        <div
          className="flex flex-col items-center justify-center text-center py-10 px-6 rounded-input"
          style={{ backgroundColor: '#FFF5ED', border: '2px dashed #E8DDD3' }}
        >
          <SadAvocatSVG />
          <h3 className="font-fredoka font-semibold text-text-primary mt-4 mb-1" style={{ fontSize: '18px' }}>
            Pas encore de favoris !
          </h3>
          <p className="font-nunito text-text-secondary text-sm mb-5 max-w-xs">
            Clique sur le cœur d'une recette pour la retrouver ici.
          </p>
          <button
            onClick={() => onNavigate('recettes')}
            className="font-nunito font-bold text-sm border-2 border-border-strong text-text-primary transition-all duration-150 hover:-translate-y-0.5 hover:shadow-btn-hover active:scale-95"
            style={{ backgroundColor: '#FAEEDA', borderRadius: '50px', padding: '10px 22px' }}
          >
            Explorer les recettes
          </button>
        </div>
      ) : (
        /* Favorites grid */
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}
        >
          {favoriteRecipes.map((recipe, i) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={i} onClick={setSelectedRecipe} />
          ))}
        </div>
      )}

      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          isMobile={isMobile}
        />
      )}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { state, saveProfile, logWeight } = useTracker()
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const handleSaveProfile = async (profile: UserProfile) => {
    setSaving(true)
    const goal = calcGoal(profile)
    const enriched: UserProfile = {
      ...profile,
      targetCalories: goal.targetCalories,
      targetProtein:  goal.targetProtein,
      targetCarbs:    goal.targetCarbs,
      targetFat:      goal.targetFat,
    }
    try {
      await saveProfile(enriched)
      setToast('Profil enregistré !')
    } catch {
      setToast('Erreur lors de la sauvegarde.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="max-w-container mx-auto px-4 md:px-6 py-6 pb-28 md:pb-10">
      <div className="mb-6">
        <h1 className="font-fredoka font-semibold text-text-primary mb-1" style={{ fontSize: '28px' }}>
          Dashboard
        </h1>
        <p className="font-nunito text-text-secondary text-sm">
          Suis ta progression et ajuste tes objectifs
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        {/* Colonne gauche */}
        <div className="space-y-5">
          <Card title="Mon profil">
            <ProfileForm profile={state.profile} onSave={handleSaveProfile} saving={saving} />
          </Card>
          <Card title="Mon objectif calorique">
            <CalorieGoalCard profile={state.profile} />
          </Card>
        </div>

        {/* Colonne droite */}
        <div className="space-y-5">
          <Card title="Progression calorique">
            <ProgressCharts
              journals={state.journals}
              targetCalories={state.profile?.targetCalories}
            />
          </Card>
          <Card title="Suivi du poids">
            <WeightCard
              weightHistory={state.weightHistory}
              onLog={logWeight}
            />
          </Card>
          <Card title="Statistiques">
            <QuickStats
              journals={state.journals}
              targetCalories={state.profile?.targetCalories}
              period={7}
            />
          </Card>
        </div>
      </div>

      {/* Favorites — full width below the 2-col grid */}
      <div className="mt-5">
        <FavoritesSection onNavigate={onNavigate} />
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </main>
  )
}
