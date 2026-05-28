import { useState } from 'react'
import type { ActivePage } from './types'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { TrackerProvider } from './contexts/TrackerContext'
import { Navigation } from './components/Navigation'
import { RecipesPage } from './pages/RecipesPage'
import { TrackerPage } from './pages/TrackerPage'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFF9F3' }}>
      <div className="flex flex-col items-center gap-4">
        <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <ellipse cx="16" cy="18" rx="9" ry="11" fill="#5AAD2F" stroke="#2C2420" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="16" cy="20" rx="5" ry="7" fill="#8B5E3C" stroke="#2C2420" strokeWidth="1.5" />
          <circle cx="16" cy="11" r="7" fill="#5AAD2F" stroke="#2C2420" strokeWidth="2" />
          <circle cx="13.5" cy="10" r="1.5" fill="#2C2420" />
          <circle cx="18.5" cy="10" r="1.5" fill="#2C2420" />
          <path d="M13.5 13 Q16 15 18.5 13" stroke="#2C2420" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
        <span className="font-fredoka font-semibold text-text-primary text-xl">Chargement...</span>
      </div>
    </div>
  )
}

function AppContent() {
  const { user, loading } = useAuth()
  const [activePage, setActivePage] = useState<ActivePage>('recettes')

  if (loading) return <LoadingScreen />
  if (!user) return <LoginPage />

  return (
    <TrackerProvider>
      <div className="min-h-screen" style={{ backgroundColor: '#FFF9F3' }}>
        <Navigation activePage={activePage} onNavigate={setActivePage} />

        {activePage === 'recettes' && <RecipesPage />}
        {activePage === 'tracker' && <TrackerPage />}
        {activePage === 'dashboard' && <DashboardPage />}
      </div>
    </TrackerProvider>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
