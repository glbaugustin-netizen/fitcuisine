import { useEffect } from 'react'
import { X } from 'lucide-react'

interface ToastProps {
  message: string
  onClose: () => void
}

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 font-nunito font-semibold text-sm border-2 border-border-strong shadow-modal"
      style={{
        backgroundColor: '#FFF5ED',
        color: '#2C2420',
        padding: '12px 20px',
        borderRadius: '50px',
        maxWidth: '340px',
        whiteSpace: 'nowrap',
      }}
      role="status"
      aria-live="polite"
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="flex-shrink-0 text-text-secondary hover:text-text-primary transition-colors"
        aria-label="Fermer"
      >
        <X size={16} strokeWidth={2} />
      </button>
    </div>
  )
}
