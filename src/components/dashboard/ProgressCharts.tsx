import { useState } from 'react'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  ReferenceLine, Tooltip, CartesianGrid,
} from 'recharts'
import type { DayJournal } from '../../types'
import { formatDate, shortDayFr } from '../../utils/date'

interface ProgressChartsProps {
  journals: Record<string, DayJournal>
  targetCalories: number | undefined
}

interface DayData {
  day: string
  date: string
  calories: number
}

function buildChartData(journals: Record<string, DayJournal>, days: number): DayData[] {
  const today = new Date()
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - (days - 1 - i))
    const dateStr = formatDate(d)
    const journal = journals[dateStr]
    const calories = journal
      ? Object.values(journal.meals).flat().reduce((s, e) => s + e.calories, 0)
      : 0
    return { day: shortDayFr(dateStr), date: dateStr, calories }
  })
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number }> }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-input border-2 border-border-strong shadow-modal px-3 py-2" style={{ backgroundColor: 'white' }}>
      <p className="font-fredoka font-semibold text-text-primary" style={{ fontSize: '16px' }}>
        {payload[0].value} <span className="font-nunito text-xs text-text-muted">kcal</span>
      </p>
    </div>
  )
}

export function ProgressCharts({ journals, targetCalories }: ProgressChartsProps) {
  const [period, setPeriod] = useState<7 | 30>(7)
  const data = buildChartData(journals, period)
  const hasData = data.some((d) => d.calories > 0)

  return (
    <div className="space-y-4">
      {/* Period toggle */}
      <div className="flex gap-2">
        {([7, 30] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className="font-nunito font-bold text-sm transition-all duration-150 active:scale-95"
            style={{
              borderRadius: '50px', padding: '6px 16px',
              border: period === p ? '2px solid #2C2420' : '2px solid #E8DDD3',
              backgroundColor: period === p ? '#FAEEDA' : 'white',
              color: period === p ? '#854F0B' : '#8A7D74',
            }}
            aria-pressed={period === p}
          >
            {p} jours
          </button>
        ))}
      </div>

      {!hasData ? (
        <div className="flex items-center justify-center py-10 rounded-input" style={{ border: '1.5px solid #E8DDD3', backgroundColor: '#FFF5ED' }}>
          <p className="font-nunito text-text-muted text-sm text-center">
            Commence à tracker tes repas pour voir ta progression ici
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barCategoryGap="20%">
            <CartesianGrid vertical={false} stroke="#F0E8E0" strokeDasharray="4 4" />
            <XAxis
              dataKey="day"
              tick={{ fontFamily: 'Nunito', fontSize: 11, fill: '#8A7D74', fontWeight: 600 }}
              axisLine={false} tickLine={false}
            />
            <YAxis
              tick={{ fontFamily: 'Nunito', fontSize: 10, fill: '#B5A99E' }}
              axisLine={false} tickLine={false}
            />
            {targetCalories && (
              <ReferenceLine
                y={targetCalories}
                stroke="#2C2420"
                strokeDasharray="5 4"
                strokeWidth={1.5}
                label={{ value: 'Objectif', position: 'right', fontSize: 10, fill: '#8A7D74', fontFamily: 'Nunito' }}
              />
            )}
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F0E8E0', radius: 6 }} />
            <Bar dataKey="calories" fill="#E8713A" radius={[6, 6, 0, 0]} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
