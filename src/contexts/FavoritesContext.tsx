import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import type { Recipe } from '../types'
import { recipes as allRecipes } from '../data/recipes'
import { useAuth } from './AuthContext'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface FavoritesToast {
  liked: boolean
  recipeName: string
}

interface FavoritesContextType {
  favorites: string[]
  toggleFavorite: (recipeId: string) => void
  isFavorite: (recipeId: string) => boolean
  getFavoriteRecipes: () => Recipe[]
  favoritesCount: number
  toast: FavoritesToast | null
  clearToast: () => void
}

// ── Context ───────────────────────────────────────────────────────────────────

const FavoritesContext = createContext<FavoritesContextType | null>(null)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState<string[]>([])
  const [toast, setToast] = useState<FavoritesToast | null>(null)

  // Ref to avoid stale closures in toggleFavorite
  const favRef = useRef<string[]>([])
  useEffect(() => { favRef.current = favorites }, [favorites])

  // Load favorites from Firestore on login / clear on logout
  useEffect(() => {
    if (!user) {
      setFavorites([])
      return
    }
    getDoc(doc(db, 'users', user.uid, 'settings', 'favorites'))
      .then((snap) => {
        if (snap.exists()) setFavorites(snap.data().recipeIds ?? [])
      })
      .catch(() => {})
  }, [user])

  const toggleFavorite = useCallback((recipeId: string) => {
    const current = favRef.current
    const liked = !current.includes(recipeId)
    const next = liked
      ? [...current, recipeId]
      : current.filter((id) => id !== recipeId)

    setFavorites(next)
    const recipe = allRecipes.find((r) => r.id === recipeId)
    setToast({ liked, recipeName: recipe?.name ?? '' })

    if (user) {
      setDoc(doc(db, 'users', user.uid, 'settings', 'favorites'), { recipeIds: next }).catch(() => {})
    }
  }, [user])

  const isFavorite = useCallback((recipeId: string) => favorites.includes(recipeId), [favorites])
  const getFavoriteRecipes = useCallback(() => allRecipes.filter((r) => favorites.includes(r.id)), [favorites])
  const clearToast = useCallback(() => setToast(null), [])

  return (
    <FavoritesContext.Provider value={{
      favorites,
      toggleFavorite,
      isFavorite,
      getFavoriteRecipes,
      favoritesCount: favorites.length,
      toast,
      clearToast,
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
