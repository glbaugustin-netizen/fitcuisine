export function formatDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function todayStr(): string {
  return formatDate(new Date())
}

export function formatDateFr(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00')
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function addDays(dateStr: string, delta: number): string {
  const date = new Date(dateStr + 'T12:00:00')
  date.setDate(date.getDate() + delta)
  return formatDate(date)
}

export function isToday(dateStr: string): boolean {
  return dateStr === todayStr()
}

export function shortDayFr(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00')
  return date.toLocaleDateString('fr-FR', { weekday: 'short' }).slice(0, 3)
}
