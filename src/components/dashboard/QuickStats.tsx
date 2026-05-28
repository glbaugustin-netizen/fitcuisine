import { CheckCircle, Flame, Zap } from 'lucide-react'
import type { DayJournal } from '../../types'
import { formatDate } from '../../utils/date'

interface QuickStatsProps {
  journals: Record<string, DayJournal>
  targetCalories: number | undefined
  period: 7 | 30
}

function getDayCalories(journal: DayJournal | undefined): number {
  if (!journal) return 0
  return Object.values(journal.meals).flat().reduce((s, e) => s + e.calories, 0)
}

export function QuickStats({ journals, targetCalories, period }: QuickStatsProps) {
  const today = new Date()

  const days = Array.from({ length: period }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    return formatDate(d)
  })

  const daysWithData = days.filter((d) => getDayCalories(journals[d]) > 0)
  const avgCalories = daysWithData.length > 0
    ? Math.round(daysWithData.reduce((s, d) => s + getDayCalories(journals[d]), 0) / daysWithData.length)
    : 0

  const onTrack = targetCalories
    ? daysWithData.filter((d) => getDayCalories(journals[d]) <= targetCalories * 1.1).length
    : 0

  // Consecutive streak (days in a row from today)
  let streak = 0
  for (let i = 0; i < days.length; i++) {
    if (getDayCalories(journals[days[i]]) > 0) streak++
    else break
  }

  const stats = [
    {
      label: 'Jours on track',
      value: targetCalories ? onTrack : daysWithData.length,
      sub: `sur ${period} jours`,
      Icon: CheckCircle,
      color: '#5AAD2F',
      bg: '#EAF3DE',
    },
    {
      label: 'Moyenne kcal',
      value: avgCalories,
      sub: 'par jour',
      Icon: Flame,
      color: '#E8713A',
      bg: '#FFF0E6',
    },
    {
      label: 'Série actuelle',
      value: streak,
      sub: 'jours consécutifs',
      Icon: Zap,
      color: '#E8B44A',
      bg: '#FAEEDA',
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map(({ label, value, sub, Icon, color, bg }) => (
        <div
          key={label}
          className="flex flex-col items-center text-center rounded-card p-4 border-2 border-border-strong"
          style={{ backgroundColor: bg }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center mb-2 border-2 border-border-strong"
            style={{ backgroundColor: 'white' }}
          >
            <Icon size={18} strokeWidth={2} style={{ color }} aria-hidden="true" />
          </div>
          <span className="font-fredoka font-semibold text-text-primary" style={{ fontSize: '28px', lineHeight: 1 }}>
            {value}
          </span>
          <span className="font-nunito font-bold text-text-primary mt-1" style={{ fontSize: '11px' }}>{label}</span>
          <span className="font-nunito text-text-muted" style={{ fontSize: '10px' }}>{sub}</span>
        </div>
      ))}
    </div>
  )
}
