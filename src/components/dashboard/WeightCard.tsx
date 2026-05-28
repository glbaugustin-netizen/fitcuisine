import { useState } from 'react'
import { Plus } from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts'
import { todayStr, shortDayFr } from '../../utils/date'

interface WeightCardProps {
  weightHistory: Record<string, number>
  onLog: (date: string, value: number) => void
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number }> }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-input border-2 border-border-strong shadow-modal px-3 py-2" style={{ backgroundColor: 'white' }}>
      <p className="font-fredoka font-semibold text-text-primary" style={{ fontSize: '16px' }}>
        {payload[0].value} <span className="font-nunito text-xs text-text-muted">kg</span>
      </p>
    </div>
  )
}

export function WeightCard({ weightHistory, onLog }: WeightCardProps) {
  const [weightInput, setWeightInput] = useState('')
  const today = todayStr()

  const chartData = Object.entries(weightHistory)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-30)
    .map(([date, value]) => ({ day: shortDayFr(date), date, value }))

  const handleSave = () => {
    const v = parseFloat(weightInput)
    if (!v || v <= 0 || v > 500) return
    onLog(today, v)
    setWeightInput('')
  }

  return (
    <div className="space-y-4">
      {/* Input */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="number" value={weightInput} onChange={(e) => setWeightInput(e.target.value)}
            placeholder={weightHistory[today]?.toString() ?? 'Ex : 75.5'}
            className="w-full font-nunito font-semibold text-text-primary focus:outline-none"
            style={{
              height: '44px', borderRadius: '12px', border: '2px solid #E8DDD3',
              padding: '0 40px 0 16px', fontSize: '15px', backgroundColor: 'white',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#2C2420')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#E8DDD3')}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            aria-label="Poids du jour en kg"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 font-nunito text-text-muted text-sm">kg</span>
        </div>
        <button
          onClick={handleSave}
          disabled={!weightInput}
          className="w-11 h-11 rounded-full border-2 border-border-strong flex items-center justify-center transition-all duration-150 hover:-translate-y-0.5 active:scale-95 disabled:opacity-40"
          style={{ backgroundColor: '#E8713A' }}
          aria-label="Enregistrer le poids"
        >
          <Plus size={18} strokeWidth={2.5} className="text-white" aria-hidden="true" />
        </button>
      </div>

      {/* Chart */}
      {chartData.length < 2 ? (
        <div className="flex items-center justify-center py-8 rounded-input" style={{ border: '1.5px solid #E8DDD3', backgroundColor: '#FFF5ED' }}>
          <p className="font-nunito text-text-muted text-sm text-center">
            Enregistre ton poids chaque jour pour voir ta courbe
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={150}>
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E8B44A" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#E8B44A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#F0E8E0" strokeDasharray="4 4" />
            <XAxis
              dataKey="day"
              tick={{ fontFamily: 'Nunito', fontSize: 11, fill: '#8A7D74', fontWeight: 600 }}
              axisLine={false} tickLine={false}
            />
            <YAxis
              domain={['auto', 'auto']}
              tick={{ fontFamily: 'Nunito', fontSize: 10, fill: '#B5A99E' }}
              axisLine={false} tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone" dataKey="value"
              stroke="#E8B44A" strokeWidth={2.5}
              fill="url(#weightGrad)"
              dot={{ r: 4, fill: '#E8B44A', stroke: '#2C2420', strokeWidth: 1.5 }}
              activeDot={{ r: 5, fill: '#E8713A', stroke: '#2C2420', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
