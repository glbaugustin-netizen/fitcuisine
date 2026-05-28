import { useCallback, useState } from 'react'
import { Heart } from 'lucide-react'
import { useFavorites } from '../contexts/FavoritesContext'

interface FavoriteButtonProps {
  recipeId: string
  size?: 'sm' | 'md'
  className?: string
}

export function FavoriteButton({ recipeId, size = 'sm', className = '' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const [popping, setPopping] = useState(false)
  const liked = isFavorite(recipeId)

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setPopping(true)
    setTimeout(() => setPopping(false), 150)
    toggleFavorite(recipeId)
  }, [recipeId, toggleFavorite])

  const btnSize = size === 'sm' ? 36 : 40
  const iconSize = size === 'sm' ? 18 : 22

  return (
    <button
      onClick={handleClick}
      aria-label={liked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      aria-pressed={liked}
      className={`flex items-center justify-center flex-shrink-0 ${className}`}
      style={{
        width: btnSize,
        height: btnSize,
        borderRadius: '50%',
        backgroundColor: liked ? '#FFFFFF' : 'rgba(44, 36, 32, 0.3)',
        border: liked ? '2px solid #2C2420' : '2px solid transparent',
        transform: popping ? 'scale(1.3)' : 'scale(1)',
        transition: 'transform 0.15s ease, background-color 0.2s ease, border-color 0.2s ease',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      <Heart
        size={iconSize}
        strokeWidth={2.5}
        fill={liked ? '#E8713A' : 'none'}
        color={liked ? '#E8713A' : '#FFFFFF'}
        aria-hidden="true"
      />
    </button>
  )
}
