import { useState } from 'react'
import type { UserProfile } from '../types'
import { useTracker } from '../contexts/TrackerContext'
import { ProfileForm } from '../components/dashboard/ProfileForm'
import { CalorieGoalCard, calcGoal } from '../components/dashboard/CalorieGoalCard'
import { ProgressCharts } from '../components/dashboard/ProgressCharts'
import { WeightCard } from '../components/dashboard/WeightCard'
import { QuickStats } from '../components/dashboard/QuickStats'
import { Toast } from '../components/Toast'

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-card border-2 border-border-strong bg-white p-5 space-y-4">
      <h2 className="font-fredoka font-semibold text-text-primary" style={{ fontSize: '20px' }}>{title}</h2>
      {children}
    </div>
  )
}

export function DashboardPage() {
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

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </main>
  )
}
