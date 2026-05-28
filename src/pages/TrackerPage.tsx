import { BarChart3 } from 'lucide-react'

export function TrackerPage() {
  return (
    <main className="max-w-container mx-auto px-4 md:px-6 py-6 pb-24 md:pb-8">
      <div className="mb-6">
        <h1 className="font-fredoka font-semibold text-text-primary mb-1" style={{ fontSize: '28px' }}>
          Tracker
        </h1>
      </div>
      <div
        className="flex flex-col items-center justify-center gap-5 rounded-card border-2 border-border-default py-20"
        style={{ backgroundColor: '#FFF5ED' }}
      >
        <div
          className="w-20 h-20 rounded-full border-2 border-border-strong flex items-center justify-center"
          style={{ backgroundColor: '#FAEEDA' }}
        >
          <BarChart3 size={38} strokeWidth={2} className="text-primary" aria-hidden="true" />
        </div>
        <div className="text-center">
          <h2 className="font-fredoka font-semibold text-text-primary text-2xl mb-2">Bientôt disponible</h2>
          <p className="font-nunito text-text-secondary text-sm max-w-xs mx-auto leading-relaxed">
            Le tracker de calories avec recherche d'aliments via OpenFoodFacts arrivera dans l'étape 2.
          </p>
        </div>
        <span
          className="font-nunito font-bold text-xs border-2 border-border-strong text-white"
          style={{ backgroundColor: '#E8713A', borderRadius: '50px', padding: '6px 16px' }}
        >
          Étape 2
        </span>
      </div>
    </main>
  )
}
