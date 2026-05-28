import { useEffect, useState } from 'react'
import type { ActivePage } from './types'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { TrackerProvider } from './contexts/TrackerContext'
import { FavoritesProvider, useFavorites } from './contexts/FavoritesContext'
import { Navigation } from './components/Navigation'
import { RecipesPage } from './pages/RecipesPage'
import { TrackerPage } from './pages/TrackerPage'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'
import { Heart } from 'lucide-react'

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

// ── Favorites toast — rendered once at app level ──────────────────────────────

function FavoriteToastDisplay() {
  const { toast, clearToast } = useFavorites()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!toast) { setVisible(false); return }
    setVisible(true)
    const timer = setTimeout(clearToast, toast.liked ? 2000 : 1500)
    return () => clearTimeout(timer)
  }, [toast, clearToast])

  if (!toast || !visible) return null

  return (
    <div
      className="fixed bottom-24 md:bottom-6 left-1/2 z-[101] flex items-center gap-2.5 font-nunito font-semibold text-sm shadow-modal fav-toast-enter"
      style={{
        transform: 'translateX(-50%)',
        backgroundColor: toast.liked ? '#FAECE7' : '#FFFFFF',
        color: toast.liked ? '#2C2420' : '#8A7D74',
        border: toast.liked ? '2px solid #E8713A' : '2px solid #E8DDD3',
        padding: '10px 20px',
        borderRadius: '50px',
        maxWidth: '320px',
        whiteSpace: 'nowrap',
      }}
      role="status"
      aria-live="polite"
    >
      <Heart
        size={15}
        strokeWidth={2.5}
        fill={toast.liked ? '#E8713A' : 'none'}
        color={toast.liked ? '#E8713A' : '#8A7D74'}
        aria-hidden="true"
      />
      <span>{toast.liked ? 'Ajouté aux favoris !' : 'Retiré des favoris'}</span>
    </div>
  )
}

// ── App content ───────────────────────────────────────────────────────────────

function AppContent() {
  const { user, loading } = useAuth()
  const [activePage, setActivePage] = useState<ActivePage>('recettes')

  if (loading) return <LoadingScreen />
  if (!user) return <LoginPage />

  return (
    <TrackerProvider>
      <FavoritesProvider>
        <div className="min-h-screen" style={{ backgroundColor: '#FFF9F3' }}>
          <Navigation activePage={activePage} onNavigate={setActivePage} />

          {activePage === 'recettes' && <RecipesPage />}
          {activePage === 'tracker' && <TrackerPage />}
          {activePage === 'dashboard' && <DashboardPage onNavigate={setActivePage} />}

          <FavoriteToastDisplay />
        </div>
      </FavoritesProvider>
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
