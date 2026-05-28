import { useState } from 'react'
import type { UserProfile, ActivityLevel } from '../../types'

interface ProfileFormProps {
  profile: UserProfile | null
  onSave: (profile: UserProfile) => void
  saving: boolean
}

type Sex = 'homme' | 'femme'

const activityOptions: { value: ActivityLevel; label: string; sub: string }[] = [
  { value: 'sedentaire',  label: 'Sédentaire',  sub: 'Peu ou pas d\'exercice' },
  { value: 'modere',      label: 'Modéré',      sub: '3-5 jours/semaine' },
  { value: 'actif',       label: 'Actif',       sub: '6-7 jours/semaine' },
  { value: 'tres-actif',  label: 'Très actif',  sub: '2× par jour' },
]

function Chip({
  active, onClick, children, activeStyle,
}: {
  active: boolean; onClick: () => void; children: React.ReactNode
  activeStyle?: React.CSSProperties
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="font-nunito font-bold transition-all duration-150 active:scale-95 text-sm"
      style={{
        borderRadius: '50px', padding: '8px 18px',
        border: active ? '2px solid #2C2420' : '2px solid #E8DDD3',
        backgroundColor: active ? (activeStyle?.backgroundColor ?? '#FAEEDA') : 'white',
        color: active ? (activeStyle?.color ?? '#2C2420') : '#8A7D74',
      }}
    >
      {children}
    </button>
  )
}

function NumberInput({ label, value, onChange, placeholder, unit }: {
  label: string; value: string; onChange: (v: string) => void
  placeholder: string; unit?: string
}) {
  return (
    <div className="space-y-1">
      <label className="font-nunito font-semibold uppercase text-text-secondary" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
        {label}
      </label>
      <div className="relative">
        <input
          type="number" value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full font-nunito font-semibold text-text-primary focus:outline-none"
          style={{
            height: '44px', borderRadius: '12px', border: '2px solid #E8DDD3',
            padding: unit ? '0 40px 0 16px' : '0 16px',
            fontSize: '15px', backgroundColor: 'white',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#2C2420')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#E8DDD3')}
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 font-nunito text-text-muted text-sm">{unit}</span>
        )}
      </div>
    </div>
  )
}

export function ProfileForm({ profile, onSave, saving }: ProfileFormProps) {
  const [sex, setSex] = useState<Sex>(profile?.sex ?? 'homme')
  const [age, setAge] = useState(profile?.age?.toString() ?? '')
  const [height, setHeight] = useState(profile?.height?.toString() ?? '')
  const [weight, setWeight] = useState(profile?.weight?.toString() ?? '')
  const [activity, setActivity] = useState<ActivityLevel>(profile?.activityLevel ?? 'modere')
  const [goal, setGoal] = useState<'masse' | 'seche'>(profile?.goal ?? 'masse')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const a = parseInt(age), h = parseInt(height), w = parseFloat(weight)
    if (!a || !h || !w) return
    onSave({ sex, age: a, height: h, weight: w, activityLevel: activity, goal })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Sexe */}
      <div className="space-y-2">
        <p className="font-nunito font-semibold uppercase text-text-secondary" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>Sexe</p>
        <div className="flex gap-2">
          <Chip active={sex === 'homme'} onClick={() => setSex('homme')} activeStyle={{ backgroundColor: '#E8713A', color: 'white' }}>Homme</Chip>
          <Chip active={sex === 'femme'} onClick={() => setSex('femme')} activeStyle={{ backgroundColor: '#E8713A', color: 'white' }}>Femme</Chip>
        </div>
      </div>

      {/* Chiffres */}
      <div className="grid grid-cols-3 gap-3">
        <NumberInput label="Âge" value={age} onChange={setAge} placeholder="25" unit="ans" />
        <NumberInput label="Taille" value={height} onChange={setHeight} placeholder="175" unit="cm" />
        <NumberInput label="Poids" value={weight} onChange={setWeight} placeholder="75" unit="kg" />
      </div>

      {/* Activité */}
      <div className="space-y-2">
        <p className="font-nunito font-semibold uppercase text-text-secondary" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>Niveau d'activité</p>
        <div className="grid grid-cols-2 gap-2">
          {activityOptions.map(({ value, label, sub }) => (
            <button
              key={value}
              type="button"
              onClick={() => setActivity(value)}
              className="text-left rounded-input p-3 transition-all duration-150 active:scale-95"
              style={{
                border: activity === value ? '2px solid #2C2420' : '2px solid #E8DDD3',
                backgroundColor: activity === value ? '#FAEEDA' : 'white',
              }}
            >
              <p className="font-nunito font-bold text-sm" style={{ color: activity === value ? '#854F0B' : '#2C2420' }}>{label}</p>
              <p className="font-nunito text-text-muted" style={{ fontSize: '11px' }}>{sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Objectif */}
      <div className="space-y-2">
        <p className="font-nunito font-semibold uppercase text-text-secondary" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>Objectif</p>
        <div className="flex gap-2">
          <Chip active={goal === 'masse'} onClick={() => setGoal('masse')} activeStyle={{ backgroundColor: '#D85A30', color: 'white' }}>Prise de masse</Chip>
          <Chip active={goal === 'seche'} onClick={() => setGoal('seche')} activeStyle={{ backgroundColor: '#5AAD2F', color: 'white' }}>Sèche</Chip>
        </div>
      </div>

      <button
        type="submit"
        disabled={saving || !age || !height || !weight}
        className="w-full font-nunito font-bold text-sm border-2 border-border-strong text-white transition-all duration-150 hover:-translate-y-0.5 hover:shadow-btn-hover active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
        style={{ backgroundColor: '#E8713A', borderRadius: '50px', padding: '12px 24px' }}
      >
        {saving ? 'Enregistrement…' : 'Enregistrer mon profil'}
      </button>
    </form>
  )
}
