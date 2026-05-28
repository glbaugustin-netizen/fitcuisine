const STROKE = '#2C2420'
const SW = 2.5

interface IllustrationProps {
  className?: string
}

export function PancakesSVG({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="85" rx="40" ry="8" fill="#E8B44A" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" />
      <rect x="22" y="68" width="76" height="18" rx="8" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="26" y="52" width="68" height="18" rx="8" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="30" y="36" width="60" height="18" rx="8" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M35 40 Q45 33 55 40 Q65 33 75 40" stroke="#E8B44A" strokeWidth={SW} strokeLinecap="round" fill="none" />
      <circle cx="48" cy="44" r="3" fill="#E8713A" />
      <circle cx="60" cy="42" r="3" fill="#E8713A" />
      <circle cx="72" cy="44" r="3" fill="#E8713A" />
    </svg>
  )
}

export function OatsSVG({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="35" width="60" height="65" rx="12" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="38" y="28" width="44" height="14" rx="6" fill="#E8B44A" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="60" cy="58" rx="22" ry="12" fill="#FFF0E6" stroke={STROKE} strokeWidth={SW} />
      <circle cx="52" cy="55" r="4" fill="#D85A30" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="62" cy="53" r="3" fill="#D85A30" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="68" cy="58" r="3.5" fill="#E8713A" stroke={STROKE} strokeWidth={1.5} />
      <path d="M40 72 Q60 68 80 72" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" fill="none" />
      <path d="M42 80 Q60 76 78 80" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function AvocadoToastSVG({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="70" width="84" height="26" rx="8" fill="#E8B44A" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="22" y="55" width="76" height="20" rx="6" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="60" cy="55" rx="30" ry="18" fill="#5AAD2F" stroke={STROKE} strokeWidth={SW} />
      <ellipse cx="60" cy="55" rx="18" ry="11" fill="#EAF3DE" stroke={STROKE} strokeWidth={1.5} />
      <ellipse cx="60" cy="57" rx="8" ry="9" fill="#8B5E3C" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="72" cy="42" r="10" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} />
      <circle cx="72" cy="42" r="6" fill="#FAEEDA" />
      <circle cx="72" cy="42" r="4" fill="#E8B44A" />
    </svg>
  )
}

export function ChickenBowlSVG({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="88" rx="44" ry="10" fill="#E8DDD3" stroke={STROKE} strokeWidth={SW} />
      <path d="M16 62 Q16 95 60 95 Q104 95 104 62 Z" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
      <ellipse cx="60" cy="62" rx="44" ry="12" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} />
      <ellipse cx="52" cy="58" rx="16" ry="8" fill="#FAEEDA" stroke={STROKE} strokeWidth={1.5} />
      <path d="M40 56 Q52 48 64 56" stroke={STROKE} strokeWidth={1.5} strokeLinecap="round" fill="none" />
      <ellipse cx="74" cy="60" rx="12" ry="7" fill="#5AAD2F" stroke={STROKE} strokeWidth={1.5} />
      <ellipse cx="60" cy="55" rx="10" ry="6" fill="#E8713A" stroke={STROKE} strokeWidth={1.5} />
    </svg>
  )
}

export function PastaSVG({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="88" rx="44" ry="10" fill="#E8DDD3" stroke={STROKE} strokeWidth={SW} />
      <path d="M16 60 Q16 93 60 93 Q104 93 104 60 Z" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
      <ellipse cx="60" cy="60" rx="44" ry="12" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} />
      <path d="M38 56 Q45 48 52 56 Q58 64 65 56 Q72 48 80 56" stroke="#E8B44A" strokeWidth={3} strokeLinecap="round" fill="none" />
      <path d="M36 62 Q43 54 50 62 Q57 70 64 62 Q71 54 78 62" stroke="#E8B44A" strokeWidth={3} strokeLinecap="round" fill="none" />
      <circle cx="55" cy="52" r="6" fill="#D85A30" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="66" cy="54" r="5" fill="#D85A30" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="72" cy="62" r="4" fill="#D85A30" stroke={STROKE} strokeWidth={1.5} />
    </svg>
  )
}

export function WrapSVG({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="80" rx="45" ry="18" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} />
      <ellipse cx="60" cy="72" rx="40" ry="14" fill="#FFF0E6" stroke={STROKE} strokeWidth={SW} />
      <path d="M20 72 Q60 50 100 72" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" />
      <ellipse cx="60" cy="66" rx="28" ry="10" fill="#5AAD2F" stroke={STROKE} strokeWidth={1.5} />
      <ellipse cx="54" cy="62" rx="10" ry="6" fill="#E8713A" stroke={STROKE} strokeWidth={1.5} />
      <ellipse cx="68" cy="64" rx="8" ry="5" fill="#FAEEDA" stroke={STROKE} strokeWidth={1.5} />
    </svg>
  )
}

export function CurrySVG({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="88" rx="44" ry="10" fill="#E8DDD3" stroke={STROKE} strokeWidth={SW} />
      <path d="M16 62 Q16 95 60 95 Q104 95 104 62 Z" fill="#E8B44A" stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
      <ellipse cx="60" cy="62" rx="44" ry="12" fill="#E8B44A" stroke={STROKE} strokeWidth={SW} />
      <ellipse cx="52" cy="60" rx="10" ry="7" fill="#D85A30" stroke={STROKE} strokeWidth={1.5} />
      <ellipse cx="68" cy="58" rx="8" ry="6" fill="#E8713A" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="56" cy="54" r="5" fill="#5AAD2F" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="66" cy="64" r="4" fill="#FAEEDA" stroke={STROKE} strokeWidth={1.5} />
      <path d="M60 30 Q65 22 60 18 Q55 22 60 30" fill="#5AAD2F" stroke={STROKE} strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  )
}

export function SalmonSVG({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="65" width="80" height="22" rx="6" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 65 Q60 30 95 65" fill="#E8713A" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 62 Q60 38 90 62" stroke={STROKE} strokeWidth={1.5} strokeLinecap="round" fill="none" />
      <path d="M35 59 Q60 44 85 59" stroke="#D85A30" strokeWidth={1.5} strokeLinecap="round" fill="none" />
      <circle cx="38" cy="75" r="6" fill="#5AAD2F" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="52" cy="77" r="5" fill="#5AAD2F" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="82" cy="74" r="5" fill="#5AAD2F" stroke={STROKE} strokeWidth={1.5} />
      <path d="M60 30 Q68 22 72 28 Q68 34 60 30" fill="#E8713A" stroke={STROKE} strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  )
}

export function SteakSVG({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="85" rx="42" ry="14" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} />
      <path d="M22 68 Q30 48 60 46 Q90 48 98 68 Q90 82 60 82 Q30 82 22 68Z" fill="#D85A30" stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M35 60 Q50 54 65 60" stroke="#993C1D" strokeWidth={1.5} strokeLinecap="round" fill="none" />
      <path d="M30 66 Q45 60 60 66 Q75 60 88 66" stroke="#993C1D" strokeWidth={1.5} strokeLinecap="round" fill="none" />
      <ellipse cx="80" cy="80" rx="14" ry="9" fill="#E8713A" stroke={STROKE} strokeWidth={SW} />
      <path d="M72 78 Q80 74 88 78" stroke="#FAEEDA" strokeWidth={1.5} strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function GratinSVG({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="60" width="90" height="36" rx="8" fill="#E8B44A" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="18" y="54" width="84" height="16" rx="6" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 56 Q40 46 60 50 Q80 46 98 56" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" />
      <circle cx="38" cy="52" r="5" fill="#E8B44A" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="52" cy="49" r="4" fill="#E8B44A" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="66" cy="50" r="5" fill="#E8B44A" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="80" cy="52" r="4" fill="#E8B44A" stroke={STROKE} strokeWidth={1.5} />
      <rect x="10" y="56" width="8" height="28" rx="4" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} />
      <rect x="102" y="56" width="8" height="28" rx="4" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} />
    </svg>
  )
}

export function SmoothieSVG({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M38 30 L30 90 Q30 96 60 96 Q90 96 90 90 L82 30 Z" fill="#E8B44A" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 30 L82 30" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" />
      <path d="M34 55 Q60 50 86 55" fill="none" stroke="#FAEEDA" strokeWidth={2} strokeLinecap="round" />
      <circle cx="48" cy="45" r="5" fill="#D85A30" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="60" cy="42" r="4" fill="#D85A30" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="72" cy="45" r="5" fill="#E8B44A" stroke={STROKE} strokeWidth={1.5} />
      <line x1="60" y1="20" x2="60" y2="30" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" />
      <ellipse cx="60" cy="20" rx="6" ry="4" fill="#5AAD2F" stroke={STROKE} strokeWidth={1.5} />
    </svg>
  )
}

export function EnergyBallsSVG({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="90" rx="40" ry="10" fill="#E8DDD3" stroke={STROKE} strokeWidth={SW} />
      <circle cx="42" cy="72" r="18" fill="#8B5E3C" stroke={STROKE} strokeWidth={SW} />
      <circle cx="42" cy="72" r="18" fill="#5C3D1E" />
      <path d="M35 68 Q42 62 49 68" stroke="#E8B44A" strokeWidth={1.5} strokeLinecap="round" fill="none" />
      <circle cx="38" cy="74" r="2" fill="#E8B44A" />
      <circle cx="46" cy="76" r="1.5" fill="#FAEEDA" />
      <circle cx="78" cy="68" r="16" fill="#5C3D1E" stroke={STROKE} strokeWidth={SW} />
      <path d="M72 64 Q78 58 84 64" stroke="#E8B44A" strokeWidth={1.5} strokeLinecap="round" fill="none" />
      <circle cx="74" cy="70" r="2" fill="#FAEEDA" />
      <circle cx="60" cy="80" r="14" fill="#5C3D1E" stroke={STROKE} strokeWidth={SW} />
      <circle cx="56" cy="77" r="2" fill="#E8B44A" />
    </svg>
  )
}

export function TartineRicottaSVG({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="62" width="84" height="28" rx="10" fill="#E8B44A" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="22" y="50" width="76" height="18" rx="8" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="60" cy="54" rx="30" ry="10" fill="white" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="46" cy="50" r="4" fill="#E8B44A" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="58" cy="48" r="3" fill="#E8B44A" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="70" cy="50" r="4" fill="#E8B44A" stroke={STROKE} strokeWidth={1.5} />
      <path d="M42 58 Q52 54 62 58 Q72 54 78 58" stroke="#E8DDD3" strokeWidth={1.5} strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function OmeletteSVG({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="72" rx="48" ry="22" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} />
      <path d="M14 68 Q30 50 60 52 Q90 50 106 68 Q90 88 60 88 Q30 88 14 68Z" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
      <ellipse cx="50" cy="66" rx="8" ry="5" fill="#5AAD2F" stroke={STROKE} strokeWidth={1.5} />
      <ellipse cx="66" cy="68" rx="7" ry="4" fill="#D85A30" stroke={STROKE} strokeWidth={1.5} />
      <ellipse cx="78" cy="64" rx="6" ry="4" fill="#E8B44A" stroke={STROKE} strokeWidth={1.5} />
      <path d="M22 66 L98 66" stroke="#FAEEDA" strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}

export function YogurtSVG({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 42 L28 88 Q28 96 60 96 Q92 96 92 88 L88 42 Z" fill="white" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="32" y="34" width="56" height="14" rx="6" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 52 Q60 46 86 52" stroke={STROKE} strokeWidth={1.5} strokeLinecap="round" fill="none" />
      <circle cx="46" cy="62" r="7" fill="#D85A30" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="62" cy="58" r="6" fill="#D85A30" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="74" cy="64" r="7" fill="#993C1D" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="58" cy="70" r="5" fill="#D85A30" stroke={STROKE} strokeWidth={1.5} />
    </svg>
  )
}

export function CrepesSVG({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="82" rx="42" ry="8" fill="#E8B44A" stroke={STROKE} strokeWidth={SW} />
      <ellipse cx="60" cy="74" rx="40" ry="7" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} />
      <ellipse cx="60" cy="66" rx="38" ry="7" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} />
      <ellipse cx="60" cy="58" rx="36" ry="7" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} />
      <path d="M42 56 Q52 50 62 56 Q72 50 78 56" stroke="#E8B44A" strokeWidth={1.5} strokeLinecap="round" fill="none" />
      <ellipse cx="50" cy="54" rx="6" ry="3" fill="#D85A30" stroke={STROKE} strokeWidth={1.5} />
      <ellipse cx="66" cy="52" rx="5" ry="3" fill="#5AAD2F" stroke={STROKE} strokeWidth={1.5} />
    </svg>
  )
}

export function ChickenSaladSVG({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="88" rx="44" ry="10" fill="#E8DDD3" stroke={STROKE} strokeWidth={SW} />
      <path d="M16 62 Q16 95 60 95 Q104 95 104 62 Z" fill="#EAF3DE" stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
      <ellipse cx="60" cy="62" rx="44" ry="12" fill="#EAF3DE" stroke={STROKE} strokeWidth={SW} />
      <ellipse cx="46" cy="56" rx="12" ry="7" fill="#5AAD2F" stroke={STROKE} strokeWidth={1.5} />
      <ellipse cx="66" cy="60" rx="10" ry="6" fill="#5AAD2F" stroke={STROKE} strokeWidth={1.5} />
      <ellipse cx="60" cy="54" rx="10" ry="6" fill="#FAEEDA" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="48" cy="64" r="5" fill="#D85A30" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="72" cy="58" r="4" fill="#E8B44A" stroke={STROKE} strokeWidth={1.5} />
    </svg>
  )
}

export function TurkeyStirSVG({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 70 Q15 95 60 95 Q105 95 105 70 Q105 60 60 58 Q15 60 15 70Z" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M8 62 L112 62" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" />
      <path d="M5 60 L115 60 Q112 52 108 52 L12 52 Q8 52 5 60Z" fill="#8A7D74" stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
      <ellipse cx="42" cy="72" rx="10" ry="7" fill="#5AAD2F" stroke={STROKE} strokeWidth={1.5} />
      <ellipse cx="60" cy="68" rx="12" ry="7" fill="#FAEEDA" stroke={STROKE} strokeWidth={1.5} />
      <ellipse cx="78" cy="74" rx="10" ry="6" fill="#D85A30" stroke={STROKE} strokeWidth={1.5} />
      <line x1="60" y1="52" x2="60" y2="30" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" />
    </svg>
  )
}

export function SalmonBowlSVG({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="88" rx="44" ry="10" fill="#E8DDD3" stroke={STROKE} strokeWidth={SW} />
      <path d="M16 62 Q16 95 60 95 Q104 95 104 62 Z" fill="#EAF3DE" stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
      <ellipse cx="60" cy="62" rx="44" ry="12" fill="#EAF3DE" stroke={STROKE} strokeWidth={SW} />
      <path d="M28 56 Q46 42 58 52 Q52 44 70 52 Q80 44 92 56" fill="#E8713A" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="44" cy="64" rx="8" ry="5" fill="#5AAD2F" stroke={STROKE} strokeWidth={1.5} />
      <ellipse cx="76" cy="62" rx="8" ry="5" fill="#5AAD2F" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="60" cy="60" r="4" fill="#E8B44A" stroke={STROKE} strokeWidth={1.5} />
    </svg>
  )
}

export function SoupSVG({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="88" rx="44" ry="10" fill="#E8DDD3" stroke={STROKE} strokeWidth={SW} />
      <path d="M16 62 Q16 95 60 95 Q104 95 104 62 Z" fill="#E8B44A" stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
      <ellipse cx="60" cy="62" rx="44" ry="12" fill="#E8B44A" stroke={STROKE} strokeWidth={SW} />
      <path d="M44 26 Q46 20 44 14" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" fill="none" />
      <path d="M60 24 Q62 18 60 12" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" fill="none" />
      <path d="M76 26 Q78 20 76 14" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" fill="none" />
      <circle cx="46" cy="58" r="5" fill="#D85A30" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="60" cy="55" r="4" fill="#D85A30" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="72" cy="60" r="5" fill="#E8713A" stroke={STROKE} strokeWidth={1.5} />
    </svg>
  )
}

export function FishPapilloteSVG({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 50 Q60 30 102 50 Q102 85 60 92 Q18 85 18 50Z" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M18 50 Q60 40 102 50" fill="none" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" />
      <path d="M60 30 Q68 22 60 30" fill="none" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" />
      <ellipse cx="60" cy="66" rx="26" ry="12" fill="#B5D6F0" stroke={STROKE} strokeWidth={1.5} />
      <path d="M40 64 Q52 58 64 64" stroke={STROKE} strokeWidth={1.5} strokeLinecap="round" fill="none" />
      <ellipse cx="38" cy="70" rx="6" ry="4" fill="#5AAD2F" stroke={STROKE} strokeWidth={1.5} />
      <ellipse cx="82" cy="70" rx="6" ry="4" fill="#5AAD2F" stroke={STROKE} strokeWidth={1.5} />
      <circle cx="60" cy="72" r="4" fill="#E8B44A" stroke={STROKE} strokeWidth={1.5} />
    </svg>
  )
}

export function ShrimpWokSVG({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 68 Q15 95 60 95 Q105 95 105 68 Q105 58 60 56 Q15 58 15 68Z" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M8 60 L112 60" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" />
      <path d="M5 58 L115 58 Q112 50 108 50 L12 50 Q8 50 5 58Z" fill="#8A7D74" stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M36 64 Q40 56 48 60 Q44 68 36 64Z" fill="#E8713A" stroke={STROKE} strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M54 62 Q58 54 66 58 Q62 66 54 62Z" fill="#E8713A" stroke={STROKE} strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M72 66 Q76 58 84 62 Q80 70 72 66Z" fill="#E8713A" stroke={STROKE} strokeWidth={1.5} strokeLinejoin="round" />
      <ellipse cx="46" cy="74" rx="8" ry="5" fill="#5AAD2F" stroke={STROKE} strokeWidth={1.5} />
      <ellipse cx="70" cy="76" rx="8" ry="5" fill="#5AAD2F" stroke={STROKE} strokeWidth={1.5} />
      <line x1="60" y1="50" x2="60" y2="28" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" />
    </svg>
  )
}

export function ChickenGrillSVG({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="72" width="88" height="14" rx="6" fill="#8A7D74" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 72 L26 86" stroke={STROKE} strokeWidth={2} strokeLinecap="round" />
      <path d="M40 72 L40 86" stroke={STROKE} strokeWidth={2} strokeLinecap="round" />
      <path d="M54 72 L54 86" stroke={STROKE} strokeWidth={2} strokeLinecap="round" />
      <path d="M68 72 L68 86" stroke={STROKE} strokeWidth={2} strokeLinecap="round" />
      <path d="M82 72 L82 86" stroke={STROKE} strokeWidth={2} strokeLinecap="round" />
      <path d="M94 72 L94 86" stroke={STROKE} strokeWidth={2} strokeLinecap="round" />
      <path d="M28 48 Q35 30 55 32 Q70 30 80 42 Q90 55 78 66 Q65 74 50 68 Q32 62 28 48Z" fill="#D85A30" stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M38 52 Q50 46 62 52" stroke="#993C1D" strokeWidth={1.5} strokeLinecap="round" fill="none" />
      <path d="M35 58 Q48 52 60 58 Q72 52 82 58" stroke="#993C1D" strokeWidth={1.5} strokeLinecap="round" fill="none" />
      <ellipse cx="88" cy="80" rx="12" ry="7" fill="#5AAD2F" stroke={STROKE} strokeWidth={SW} />
    </svg>
  )
}

export function HoumusSVG({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="88" rx="44" ry="10" fill="#E8DDD3" stroke={STROKE} strokeWidth={SW} />
      <path d="M16 62 Q16 95 60 95 Q104 95 104 62 Z" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
      <ellipse cx="60" cy="62" rx="44" ry="12" fill="#FAEEDA" stroke={STROKE} strokeWidth={SW} />
      <ellipse cx="60" cy="60" rx="26" ry="8" fill="#E8B44A" stroke={STROKE} strokeWidth={1.5} />
      <path d="M52 58 Q60 54 68 58" stroke="#854F0B" strokeWidth={1.5} strokeLinecap="round" fill="none" />
      <circle cx="60" cy="56" r="3" fill="#D85A30" />
      <line x1="78" y1="52" x2="92" y2="38" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" />
      <ellipse cx="92" cy="36" rx="8" ry="4" fill="#EAF3DE" stroke={STROKE} strokeWidth={1.5} />
      <line x1="82" y1="56" x2="96" y2="44" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" />
      <ellipse cx="97" cy="42" rx="7" ry="4" fill="#EAF3DE" stroke={STROKE} strokeWidth={1.5} />
    </svg>
  )
}

export function CottageCheeseSVG({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="88" rx="38" ry="9" fill="#E8DDD3" stroke={STROKE} strokeWidth={SW} />
      <path d="M22 64 Q22 92 60 92 Q98 92 98 64 Z" fill="white" stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
      <ellipse cx="60" cy="64" rx="38" ry="10" fill="white" stroke={STROKE} strokeWidth={SW} />
      <ellipse cx="52" cy="61" rx="8" ry="5" fill="#FAEEDA" stroke={STROKE} strokeWidth={1.5} />
      <ellipse cx="66" cy="59" rx="7" ry="4" fill="#FAEEDA" stroke={STROKE} strokeWidth={1.5} />
      <ellipse cx="42" cy="65" rx="6" ry="4" fill="#EAF3DE" stroke={STROKE} strokeWidth={1.5} />
      <ellipse cx="76" cy="65" rx="6" ry="4" fill="#EAF3DE" stroke={STROKE} strokeWidth={1.5} />
      <path d="M46 72 Q54 68 62 72 Q70 68 76 72" stroke="#5AAD2F" strokeWidth={1.5} strokeLinecap="round" fill="none" />
    </svg>
  )
}

const illustrationMap: Record<string, React.ComponentType<IllustrationProps>> = {
  pancakes: PancakesSVG,
  oats: OatsSVG,
  'avocado-toast': AvocadoToastSVG,
  'chicken-bowl': ChickenBowlSVG,
  pasta: PastaSVG,
  wrap: WrapSVG,
  curry: CurrySVG,
  salmon: SalmonSVG,
  steak: SteakSVG,
  gratin: GratinSVG,
  smoothie: SmoothieSVG,
  'energy-balls': EnergyBallsSVG,
  'tartine-ricotta': TartineRicottaSVG,
  omelette: OmeletteSVG,
  yogurt: YogurtSVG,
  crepes: CrepesSVG,
  'chicken-salad': ChickenSaladSVG,
  'turkey-stir': TurkeyStirSVG,
  'salmon-bowl': SalmonBowlSVG,
  soup: SoupSVG,
  'fish-papillote': FishPapilloteSVG,
  'shrimp-wok': ShrimpWokSVG,
  'chicken-grill': ChickenGrillSVG,
  houmous: HoumusSVG,
  'cottage-cheese': CottageCheeseSVG,
}

export function RecipeIllustration({
  illustrationKey,
  className,
}: {
  illustrationKey: string
  className?: string
}) {
  const Component = illustrationMap[illustrationKey] ?? ChickenBowlSVG
  return <Component className={className} />
}
