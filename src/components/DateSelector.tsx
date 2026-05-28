import { ChevronLeft, ChevronRight } from 'lucide-react'
import { formatDateFr, addDays, isToday } from '../utils/date'
import { todayStr } from '../utils/date'

interface DateSelectorProps {
  date: string
  onChange: (date: string) => void
}

export function DateSelector({ date, onChange }: DateSelectorProps) {
  const today = todayStr()
  const isTodaySelected = isToday(date)

  return (
    <div
      className="flex items-center justify-between rounded-input border-2 border-border-strong px-4 py-3"
      style={{ backgroundColor: '#FFF5ED' }}
    >
      <button
        onClick={() => onChange(addDays(date, -1))}
        className="w-9 h-9 rounded-full border-2 border-border-default bg-white flex items-center justify-center transition-all duration-150 hover:border-border-strong hover:bg-bg-section active:scale-95"
        aria-label="Jour précédent"
      >
        <ChevronLeft size={18} strokeWidth={2.5} className="text-text-primary" aria-hidden="true" />
      </button>

      <div className="flex flex-col items-center gap-1">
        <span
          className="font-fredoka font-semibold text-text-primary capitalize"
          style={{ fontSize: '20px' }}
        >
          {formatDateFr(date)}
        </span>
        {!isTodaySelected && (
          <button
            onClick={() => onChange(today)}
            className="font-nunito font-bold text-xs border-2 border-border-default text-text-secondary hover:border-border-strong hover:text-text-primary transition-all duration-150 active:scale-95"
            style={{ borderRadius: '50px', padding: '2px 12px' }}
            aria-label="Revenir à aujourd'hui"
          >
            Aujourd'hui
          </button>
        )}
        {isTodaySelected && (
          <span
            className="font-nunito font-bold text-xs border-2 border-primary text-primary"
            style={{ borderRadius: '50px', padding: '2px 12px' }}
          >
            Aujourd'hui
          </span>
        )}
      </div>

      <button
        onClick={() => onChange(addDays(date, 1))}
        disabled={date >= today}
        className="w-9 h-9 rounded-full border-2 border-border-default bg-white flex items-center justify-center transition-all duration-150 hover:border-border-strong hover:bg-bg-section active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Jour suivant"
      >
        <ChevronRight size={18} strokeWidth={2.5} className="text-text-primary" aria-hidden="true" />
      </button>
    </div>
  )
}
