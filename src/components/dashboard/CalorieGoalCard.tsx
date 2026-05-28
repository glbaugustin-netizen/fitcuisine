import type { UserProfile, CalorieGoal } from '../../types'

const ACTIVITY_COEFF: Record<string, number> = {
  sedentaire:  1.2,
  modere:      1.55,
  actif:       1.725,
  'tres-actif': 1.9,
}

export function calcGoal(profile: UserProfile): CalorieGoal {
  const { sex, age, height, weight, activityLevel, goal } = profile
  const mb = sex === 'homme'
    ? 10 * weight + 6.25 * height - 5 * age - 5
    : 10 * weight + 6.25 * height - 5 * age - 161

  const coeff = ACTIVITY_COEFF[activityLevel] ?? 1.55
  const total = mb * coeff
  const adjust = goal === 'masse' ? 400 : -400
  const target = Math.round(total + adjust)

  const protSplit = goal === 'masse' ? 0.30 : 0.40
  const carbSplit = goal === 'masse' ? 0.45 : 0.35
  const fatSplit  = 0.25

  return {
    mb:               Math.round(mb),
    totalExpenditure: Math.round(total),
    targetCalories:   target,
    targetProtein:    Math.round((target * protSplit) / 4),
    targetCarbs:      Math.round((target * carbSplit) / 4),
    targetFat:        Math.round((target * fatSplit) / 9),
  }
}

function MacroBar({ label, grams, pct, color }: {
  label: string; grams: number; pct: number; color: string
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="font-nunito font-semibold text-text-secondary" style={{ fontSize: '12px' }}>{label}</span>
        <span className="font-fredoka font-semibold" style={{ fontSize: '14px', color }}>{grams}g <span className="font-nunito text-text-muted text-xs">({pct}%)</span></span>
      </div>
      <div className="h-2 rounded-pill w-full" style={{ backgroundColor: '#F0E8E0' }}>
        <div className="h-2 rounded-pill transition-all duration-700 ease-out" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  )
}

function CoachAvocatSVG() {
  return (
    <svg width="64" height="64" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="16" cy="18" rx="9" ry="11" fill="#5AAD2F" stroke="#2C2420" strokeWidth="2"/>
      <ellipse cx="16" cy="20" rx="5" ry="7" fill="#8B5E3C" stroke="#2C2420" strokeWidth="1.5"/>
      <circle cx="16" cy="11" r="7" fill="#5AAD2F" stroke="#2C2420" strokeWidth="2"/>
      <circle cx="13.5" cy="10" r="1.5" fill="#2C2420"/>
      <circle cx="18.5" cy="10" r="1.5" fill="#2C2420"/>
      <path d="M13.5 13 Q16 15 18.5 13" stroke="#2C2420" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

export function CalorieGoalCard({ profile }: { profile: UserProfile | null }) {
  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
        <CoachAvocatSVG />
        <p className="font-nunito font-semibold text-text-secondary text-sm max-w-xs">
          Remplis ton profil pour calculer ton objectif calorique personnalisé
        </p>
      </div>
    )
  }

  const goal = calcGoal(profile)
  const isMasse = profile.goal === 'masse'

  return (
    <div className="space-y-4">
      {/* Big number */}
      <div className="text-center py-3 rounded-input" style={{ backgroundColor: isMasse ? '#FFF0E6' : '#EEFAE6' }}>
        <p className="font-nunito font-semibold uppercase text-text-secondary" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>Objectif journalier</p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="font-fredoka font-semibold text-text-primary" style={{ fontSize: '42px' }}>{goal.targetCalories}</span>
          <span className="font-nunito text-text-secondary" style={{ fontSize: '14px' }}>kcal</span>
        </div>
      </div>

      {/* MB + dépense */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Métabolisme de base', value: goal.mb },
          { label: 'Dépense totale', value: goal.totalExpenditure },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-input p-3 text-center" style={{ border: '1.5px solid #E8DDD3', backgroundColor: 'white' }}>
            <p className="font-nunito text-text-muted" style={{ fontSize: '11px' }}>{label}</p>
            <p className="font-fredoka font-semibold text-text-primary" style={{ fontSize: '20px' }}>{value} <span className="font-nunito text-xs text-text-muted">kcal</span></p>
          </div>
        ))}
      </div>

      {/* Macro bars */}
      <div className="space-y-3">
        <MacroBar label="Protéines" grams={goal.targetProtein} pct={isMasse ? 30 : 40} color="#E8713A" />
        <MacroBar label="Glucides"  grams={goal.targetCarbs}   pct={isMasse ? 45 : 35} color="#5AAD2F" />
        <MacroBar label="Lipides"   grams={goal.targetFat}     pct={25}                color="#C46E8E" />
      </div>
    </div>
  )
}
