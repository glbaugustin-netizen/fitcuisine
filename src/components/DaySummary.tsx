import type { UserProfile } from '../types'

interface DaySummaryProps {
  calories: number
  protein: number
  carbs: number
  fat: number
  profile: UserProfile | null
}

interface MacroBlockProps {
  label: string
  value: number
  unit: string
  bg: string
  textColor: string
  borderColor: string
}

function MacroBlock({ label, value, unit, bg, textColor, borderColor }: MacroBlockProps) {
  return (
    <div
      className="flex-1 flex flex-col items-center gap-0.5 rounded-card py-3 px-2"
      style={{ backgroundColor: bg, border: `1.5px solid ${borderColor}` }}
    >
      <span className="font-nunito font-semibold uppercase" style={{ fontSize: '10px', color: textColor, letterSpacing: '0.5px' }}>
        {label}
      </span>
      <div className="flex items-baseline gap-0.5">
        <span className="font-fredoka font-semibold" style={{ fontSize: '24px', color: textColor }}>{value}</span>
        <span className="font-nunito text-xs" style={{ color: textColor, opacity: 0.7 }}>{unit}</span>
      </div>
    </div>
  )
}

export function DaySummary({ calories, protein, carbs, fat, profile }: DaySummaryProps) {
  const target = profile?.targetCalories
  const pct = target && target > 0 ? Math.min((calories / target) * 100, 100) : null

  return (
    <div
      className="rounded-card border-2 border-border-strong p-4 space-y-3"
      style={{ backgroundColor: '#FFF5ED' }}
    >
      {/* Macro blocks */}
      <div className="flex gap-2">
        <MacroBlock label="Calories" value={calories} unit="kcal" bg="#FAEEDA" textColor="#854F0B" borderColor="#E8B44A" />
        <MacroBlock label="Protéines" value={protein} unit="g" bg="#FAECE7" textColor="#993C1D" borderColor="#E8713A" />
        <MacroBlock label="Glucides" value={carbs} unit="g" bg="#EAF3DE" textColor="#3B6D11" borderColor="#5AAD2F" />
        <MacroBlock label="Lipides" value={fat} unit="g" bg="#FBEAF0" textColor="#72243E" borderColor="#C46E8E" />
      </div>

      {/* Progress bar vs objective */}
      {pct !== null && target && (
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="font-nunito font-semibold text-text-secondary" style={{ fontSize: '12px' }}>
              Objectif journalier
            </span>
            <span className="font-nunito font-bold" style={{ fontSize: '12px', color: pct >= 100 ? '#D85A30' : '#3B6D11' }}>
              {calories} / {target} kcal
            </span>
          </div>
          <div className="h-2 rounded-pill w-full" style={{ backgroundColor: '#F0E8E0' }}>
            <div
              className="h-2 rounded-pill transition-all duration-500 ease-out"
              style={{
                width: `${pct}%`,
                backgroundColor: pct >= 100 ? '#D85A30' : '#E8713A',
              }}
              role="progressbar"
              aria-valuenow={calories}
              aria-valuemin={0}
              aria-valuemax={target}
              aria-label={`${calories} sur ${target} kcal`}
            />
          </div>
        </div>
      )}

      {!profile && (
        <p className="font-nunito text-text-muted text-xs text-center">
          Complète ton profil pour voir ta progression calorique
        </p>
      )}
    </div>
  )
}
