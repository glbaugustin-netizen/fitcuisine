import { useRef, useState, useEffect } from 'react'
import { LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export function UserAvatar() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  if (!user) return null

  const initials = (user.displayName ?? user.email ?? 'A')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-9 h-9 rounded-full border-2 border-border-strong overflow-hidden flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95"
        style={{ backgroundColor: '#E8713A' }}
        aria-label="Menu utilisateur"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {user.photoURL ? (
          <img src={user.photoURL} alt={user.displayName ?? 'Avatar'} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          <span className="font-fredoka font-semibold text-white text-sm leading-none">{initials}</span>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 top-11 w-56 rounded-card border-2 border-border-strong shadow-modal z-[200]"
          style={{ backgroundColor: 'white' }}
          role="menu"
        >
          <div className="px-4 py-3 border-b border-border-default">
            <p className="font-nunito font-bold text-text-primary text-sm truncate">{user.displayName}</p>
            <p className="font-nunito text-text-muted truncate" style={{ fontSize: '12px' }}>{user.email}</p>
          </div>
          <button
            onClick={() => { setOpen(false); logout() }}
            className="w-full flex items-center gap-2 px-4 py-3 font-nunito font-semibold text-sm text-text-secondary hover:text-text-primary hover:bg-bg-section transition-colors rounded-b-card"
            role="menuitem"
          >
            <LogOut size={15} strokeWidth={2} aria-hidden="true" />
            Se déconnecter
          </button>
        </div>
      )}
    </div>
  )
}
