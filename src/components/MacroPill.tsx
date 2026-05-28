interface MacroPillProps {
  type: 'calories' | 'protein' | 'carbs' | 'fat'
  value: number
  label?: string
  size?: 'sm' | 'md'
}

const macroConfig = {
  calories: { bg: '#FAEEDA', text: '#854F0B', border: '#E8B44A', label: 'kcal', shortLabel: 'kcal' },
  protein:  { bg: '#FAECE7', text: '#993C1D', border: '#E8713A', label: 'g', shortLabel: 'P' },
  carbs:    { bg: '#EAF3DE', text: '#3B6D11', border: '#5AAD2F', label: 'g', shortLabel: 'G' },
  fat:      { bg: '#FBEAF0', text: '#72243E', border: '#C46E8E', label: 'g', shortLabel: 'L' },
}

export function MacroPill({ type, value, label, size = 'sm' }: MacroPillProps) {
  const config = macroConfig[type]
  const displayLabel = label ?? (type === 'calories' ? '' : config.shortLabel + ' ')

  return (
    <span
      className="inline-flex items-baseline rounded-macro font-nunito select-none whitespace-nowrap"
      style={{
        backgroundColor: config.bg,
        color: config.text,
        border: `1.5px solid ${config.border}`,
        padding: size === 'sm' ? '3px 7px' : '5px 10px',
        fontSize: size === 'sm' ? '11px' : '13px',
      }}
    >
      {type !== 'calories' && (
        <span style={{ fontWeight: 700, marginRight: 1 }}>{displayLabel}</span>
      )}
      <span style={{ fontWeight: 700, fontSize: size === 'sm' ? '12px' : '14px' }}>{value}</span>
      <span style={{ fontWeight: 400, fontSize: size === 'sm' ? '10px' : '12px', marginLeft: 1 }}>
        {config.label}
      </span>
    </span>
  )
}
