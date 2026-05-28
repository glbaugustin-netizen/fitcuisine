import { UtensilsCrossed, BarChart3, Target } from 'lucide-react'
import type { ActivePage } from '../types'

interface NavigationProps {
  activePage: ActivePage
  onNavigate: (page: ActivePage) => void
}

function CoachAvocatSVG() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="16" cy="18" rx="9" ry="11" fill="#5AAD2F" stroke="#2C2420" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="16" cy="20" rx="5" ry="7" fill="#8B5E3C" stroke="#2C2420" strokeWidth="1.5" />
      <circle cx="16" cy="11" r="7" fill="#5AAD2F" stroke="#2C2420" strokeWidth="2" />
      <circle cx="13.5" cy="10" r="1.5" fill="#2C2420" />
      <circle cx="18.5" cy="10" r="1.5" fill="#2C2420" />
      <path d="M13.5 13 Q16 15 18.5 13" stroke="#2C2420" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M7 20 Q4 18 3 15 Q4 13 6 15" stroke="#2C2420" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#5AAD2F" />
      <ellipse cx="3.5" cy="14" rx="2" ry="1.5" fill="#FAEEDA" stroke="#2C2420" strokeWidth="1.5" />
      <path d="M25 20 Q28 18 29 15 Q28 13 26 15" stroke="#2C2420" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#5AAD2F" />
      <ellipse cx="28.5" cy="14" rx="2" ry="1.5" fill="#FAEEDA" stroke="#2C2420" strokeWidth="1.5" />
    </svg>
  )
}

const navItems: { id: ActivePage; label: string; Icon: typeof UtensilsCrossed; shortLabel: string }[] = [
  { id: 'recettes', label: 'Recettes', shortLabel: 'Recettes', Icon: UtensilsCrossed },
  { id: 'tracker', label: 'Tracker', shortLabel: 'Tracker', Icon: BarChart3 },
  { id: 'dashboard', label: 'Dashboard', shortLabel: 'Dashboard', Icon: Target },
]

export function Navigation({ activePage, onNavigate }: NavigationProps) {
  return (
    <>
      {/* Top nav — desktop & tablet */}
      <nav
        className="hidden md:flex items-center justify-between sticky top-0 z-50 px-6 py-3 border-b-2 border-border-strong"
        style={{ backgroundColor: '#FFF5ED' }}
        aria-label="Navigation principale"
      >
        {/* Logo + Mascot */}
        <button
          className="flex items-center gap-2 select-none"
          onClick={() => onNavigate('recettes')}
          aria-label="Accueil FitCuisine"
        >
          <CoachAvocatSVG />
          <span className="font-fredoka text-2xl font-semibold text-text-primary leading-none">
            FitCuisine
          </span>
        </button>

        {/* Tabs */}
        <div
          className="flex items-center gap-1 p-1 rounded-nav"
          style={{ backgroundColor: '#F0E8DF' }}
          role="tablist"
          aria-label="Sections"
        >
          {navItems.map(({ id, label, Icon }) => {
            const isActive = activePage === id
            return (
              <button
                key={id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onNavigate(id)}
                className={[
                  'flex items-center gap-2 px-4 py-2 rounded-nav font-nunito font-semibold text-sm transition-all duration-200',
                  isActive
                    ? 'bg-primary text-white border-2 border-border-strong shadow-nav-active'
                    : 'text-text-secondary border-2 border-transparent hover:bg-bg-section',
                ].join(' ')}
              >
                <Icon size={18} strokeWidth={2} aria-hidden="true" />
                {label}
              </button>
            )
          })}
        </div>

        {/* User avatar */}
        <div
          className="w-9 h-9 rounded-full bg-primary border-2 border-border-strong flex items-center justify-center select-none"
          aria-label="Profil utilisateur"
          role="img"
        >
          <span className="font-fredoka font-semibold text-white text-sm leading-none">A</span>
        </div>
      </nav>

      {/* Bottom bar — mobile */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t-2 border-border-strong flex"
        style={{ backgroundColor: '#FFF5ED' }}
        aria-label="Navigation mobile"
      >
        {navItems.map(({ id, shortLabel, Icon }) => {
          const isActive = activePage === id
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              aria-label={shortLabel}
              aria-current={isActive ? 'page' : undefined}
              className={[
                'flex-1 flex flex-col items-center justify-center py-2 gap-1 font-nunito text-xs font-semibold transition-all duration-200',
                isActive ? 'text-primary' : 'text-text-secondary',
              ].join(' ')}
            >
              <div
                className={[
                  'p-1.5 rounded-nav transition-all duration-200',
                  isActive ? 'bg-primary-light border-2 border-border-strong' : '',
                ].join(' ')}
              >
                <Icon
                  size={22}
                  strokeWidth={2}
                  aria-hidden="true"
                  className={isActive ? 'text-primary' : 'text-text-secondary'}
                />
              </div>
              <span>{shortLabel}</span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
