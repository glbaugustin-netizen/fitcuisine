import { useState } from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'
import { Toast } from '../components/Toast'

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.78h5.4a4.63 4.63 0 01-2 3.04v2.52h3.23C18.34 15.95 19.6 13.3 19.6 10.23z" fill="#4285F4"/>
      <path d="M10 20c2.7 0 4.97-.9 6.62-2.43l-3.23-2.52c-.9.6-2.05.96-3.39.96-2.6 0-4.8-1.76-5.59-4.12H1.07v2.6A9.99 9.99 0 0010 20z" fill="#34A853"/>
      <path d="M4.41 11.89A6.04 6.04 0 014.1 10c0-.66.11-1.3.31-1.89V5.51H1.07A9.99 9.99 0 000 10c0 1.61.38 3.13 1.07 4.49l3.34-2.6z" fill="#FBBC05"/>
      <path d="M10 3.98c1.47 0 2.79.51 3.82 1.5l2.86-2.86A9.97 9.97 0 0010 0 9.99 9.99 0 001.07 5.51l3.34 2.6C5.2 5.74 7.4 3.98 10 3.98z" fill="#EA4335"/>
    </svg>
  )
}

function CoachAvocatLarge() {
  return (
    <svg width="72" height="72" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="16" cy="18" rx="9" ry="11" fill="#5AAD2F" stroke="#2C2420" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <ellipse cx="16" cy="20" rx="5" ry="7" fill="#8B5E3C" stroke="#2C2420" strokeWidth="1.5"/>
      <circle cx="16" cy="11" r="7" fill="#5AAD2F" stroke="#2C2420" strokeWidth="2"/>
      <circle cx="13.5" cy="10" r="1.5" fill="#2C2420"/>
      <circle cx="18.5" cy="10" r="1.5" fill="#2C2420"/>
      <path d="M13.5 13 Q16 15 18.5 13" stroke="#2C2420" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M7 20 Q4 18 3 15 Q4 13 6 15" stroke="#2C2420" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#5AAD2F"/>
      <ellipse cx="3.5" cy="14" rx="2" ry="1.5" fill="#FAEEDA" stroke="#2C2420" strokeWidth="1.5"/>
      <path d="M25 20 Q28 18 29 15 Q28 13 26 15" stroke="#2C2420" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#5AAD2F"/>
      <ellipse cx="28.5" cy="14" rx="2" ry="1.5" fill="#FAEEDA" stroke="#2C2420" strokeWidth="1.5"/>
    </svg>
  )
}

export function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async () => {
    setLoading(true)
    setError(null)
    try {
      await signInWithPopup(auth, googleProvider)
    } catch {
      setError('Connexion annulée ou erreur — réessaie.')
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: '#FFF9F3' }}
    >
      <div className="w-full max-w-sm text-center space-y-8">

        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-24 h-24 rounded-full border-2 border-border-strong flex items-center justify-center shadow-modal"
            style={{ backgroundColor: '#FFF0E6' }}
          >
            <CoachAvocatLarge />
          </div>
          <div>
            <h1 className="font-fredoka font-semibold text-text-primary" style={{ fontSize: '36px', lineHeight: 1 }}>
              FitCuisine
            </h1>
            <p className="font-nunito text-text-secondary mt-1" style={{ fontSize: '16px' }}>
              Ton guide culinaire pour sportifs
            </p>
          </div>
        </div>

        {/* Card */}
        <div
          className="rounded-card border-2 border-border-strong p-8 space-y-6"
          style={{ backgroundColor: 'white' }}
        >
          <div>
            <h2 className="font-fredoka font-semibold text-text-primary text-xl mb-1">
              Bienvenue !
            </h2>
            <p className="font-nunito text-text-secondary text-sm">
              Connecte-toi pour accéder à tes recettes et tracker tes macros.
            </p>
          </div>

          <button
            onClick={handleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 font-nunito font-bold border-2 border-border-strong text-white transition-all duration-150 hover:-translate-y-0.5 hover:shadow-btn-hover active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
            style={{
              backgroundColor: '#E8713A',
              borderRadius: '50px',
              padding: '14px 24px',
              fontSize: '16px',
            }}
            aria-label="Se connecter avec Google"
          >
            {loading ? (
              <span className="w-5 h-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            {loading ? 'Connexion…' : 'Se connecter avec Google'}
          </button>

          <p className="font-nunito text-text-muted text-center" style={{ fontSize: '12px' }}>
            Gratuit, aucune carte requise
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: '25 recettes', sub: 'masse & sèche' },
            { label: 'Tracker', sub: 'calories + macros' },
            { label: 'Dashboard', sub: 'objectifs & progrès' },
          ].map(({ label, sub }) => (
            <div
              key={label}
              className="rounded-card border-2 border-border-default p-3 text-center"
              style={{ backgroundColor: '#FFF5ED' }}
            >
              <p className="font-fredoka font-semibold text-text-primary text-sm">{label}</p>
              <p className="font-nunito text-text-muted" style={{ fontSize: '11px' }}>{sub}</p>
            </div>
          ))}
        </div>
      </div>

      {error && <Toast message={error} onClose={() => setError(null)} />}
    </div>
  )
}
