import { useState } from 'react'
import type { ActivePage } from './types'
import { Navigation } from './components/Navigation'
import { RecipesPage } from './pages/RecipesPage'
import { TrackerPage } from './pages/TrackerPage'
import { DashboardPage } from './pages/DashboardPage'

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('recettes')

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF9F3' }}>
      <Navigation activePage={activePage} onNavigate={setActivePage} />

      {activePage === 'recettes' && <RecipesPage />}
      {activePage === 'tracker' && <TrackerPage />}
      {activePage === 'dashboard' && <DashboardPage />}
    </div>
  )
}
