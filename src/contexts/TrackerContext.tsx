import { createContext, useContext, useReducer, useCallback, useEffect, useRef } from 'react'
import type { DayJournal, MealType, TrackerEntry, UserProfile } from '../types'
import { todayStr } from '../utils/date'
import { useAuth } from './AuthContext'
import {
  doc, setDoc, getDoc, collection, getDocs,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

// ── State & Actions ──────────────────────────────────────────────────────────

interface TrackerState {
  journals: Record<string, DayJournal>
  profile: UserProfile | null
  weightHistory: Record<string, number>
  selectedDate: string
}

type TrackerAction =
  | { type: 'ADD_ENTRY'; date: string; meal: MealType; entry: TrackerEntry }
  | { type: 'REMOVE_ENTRY'; date: string; meal: MealType; entryId: string }
  | { type: 'SAVE_PROFILE'; profile: UserProfile }
  | { type: 'LOG_WEIGHT'; date: string; value: number }
  | { type: 'SET_DATE'; date: string }
  | { type: 'LOAD_JOURNAL'; date: string; journal: DayJournal }
  | { type: 'LOAD_WEIGHTS'; weights: Record<string, number> }

const emptyMeals = (): Record<MealType, TrackerEntry[]> => ({
  breakfast: [], lunch: [], dinner: [], snack: [],
})

function emptyJournal(date: string): DayJournal {
  return { date, meals: emptyMeals() }
}

function trackerReducer(state: TrackerState, action: TrackerAction): TrackerState {
  switch (action.type) {
    case 'ADD_ENTRY': {
      const existing = state.journals[action.date] ?? emptyJournal(action.date)
      return {
        ...state,
        journals: {
          ...state.journals,
          [action.date]: {
            ...existing,
            meals: {
              ...existing.meals,
              [action.meal]: [...existing.meals[action.meal], action.entry],
            },
          },
        },
      }
    }
    case 'REMOVE_ENTRY': {
      const existing = state.journals[action.date] ?? emptyJournal(action.date)
      return {
        ...state,
        journals: {
          ...state.journals,
          [action.date]: {
            ...existing,
            meals: {
              ...existing.meals,
              [action.meal]: existing.meals[action.meal].filter((e) => e.id !== action.entryId),
            },
          },
        },
      }
    }
    case 'SAVE_PROFILE':
      return { ...state, profile: action.profile }
    case 'LOG_WEIGHT':
      return {
        ...state,
        weightHistory: { ...state.weightHistory, [action.date]: action.value },
      }
    case 'SET_DATE':
      return { ...state, selectedDate: action.date }
    case 'LOAD_JOURNAL':
      return {
        ...state,
        journals: { ...state.journals, [action.date]: action.journal },
      }
    case 'LOAD_WEIGHTS':
      return { ...state, weightHistory: action.weights }
    default:
      return state
  }
}

// ── Context ──────────────────────────────────────────────────────────────────

interface TrackerContextType {
  state: TrackerState
  addEntry: (date: string, meal: MealType, entry: TrackerEntry) => void
  removeEntry: (date: string, meal: MealType, entryId: string) => void
  saveProfile: (profile: UserProfile) => Promise<void>
  logWeight: (date: string, value: number) => void
  setSelectedDate: (date: string) => void
  getDayTotals: (date: string) => { calories: number; protein: number; carbs: number; fat: number }
}

const TrackerContext = createContext<TrackerContextType | null>(null)

export function useTracker() {
  const ctx = useContext(TrackerContext)
  if (!ctx) throw new Error('useTracker must be used inside TrackerProvider')
  return ctx
}

// ── Provider ─────────────────────────────────────────────────────────────────

export function TrackerProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [state, dispatch] = useReducer(trackerReducer, {
    journals: {},
    profile: null,
    weightHistory: {},
    selectedDate: todayStr(),
  })

  // Keep a ref to always have latest state in callbacks without stale closures
  const stateRef = useRef(state)
  useEffect(() => { stateRef.current = state }, [state])

  // ── Load from Firestore on login ───────────────────────────────────────────
  useEffect(() => {
    if (!user) return

    // Profile
    getDoc(doc(db, 'users', user.uid, 'profile', 'data')).then((snap) => {
      if (snap.exists()) {
        dispatch({ type: 'SAVE_PROFILE', profile: snap.data() as UserProfile })
      }
    }).catch(() => {/* offline ok */})

    // Weight history
    getDocs(collection(db, 'users', user.uid, 'weight')).then((snap) => {
      const weights: Record<string, number> = {}
      snap.forEach((d) => { weights[d.id] = (d.data() as { value: number }).value })
      dispatch({ type: 'LOAD_WEIGHTS', weights })
    }).catch(() => {})

    // Today's journal
    const today = todayStr()
    getDoc(doc(db, 'users', user.uid, 'journal', today)).then((snap) => {
      if (snap.exists()) {
        dispatch({ type: 'LOAD_JOURNAL', date: today, journal: snap.data() as DayJournal })
      }
    }).catch(() => {})
  }, [user])

  // Load journal when selectedDate changes (if not already loaded)
  useEffect(() => {
    if (!user) return
    const date = state.selectedDate
    if (stateRef.current.journals[date]) return // already loaded
    getDoc(doc(db, 'users', user.uid, 'journal', date)).then((snap) => {
      if (snap.exists()) {
        dispatch({ type: 'LOAD_JOURNAL', date, journal: snap.data() as DayJournal })
      }
    }).catch(() => {})
  }, [user, state.selectedDate])

  // ── Actions with Firestore sync ────────────────────────────────────────────

  const addEntry = useCallback((date: string, meal: MealType, entry: TrackerEntry) => {
    const currentState = stateRef.current
    const existing = currentState.journals[date] ?? emptyJournal(date)
    const newJournal: DayJournal = {
      ...existing,
      meals: {
        ...existing.meals,
        [meal]: [...existing.meals[meal], entry],
      },
    }
    dispatch({ type: 'ADD_ENTRY', date, meal, entry })
    if (user) {
      setDoc(doc(db, 'users', user.uid, 'journal', date), newJournal).catch(() => {})
    }
  }, [user])

  const removeEntry = useCallback((date: string, meal: MealType, entryId: string) => {
    const currentState = stateRef.current
    const existing = currentState.journals[date] ?? emptyJournal(date)
    const newJournal: DayJournal = {
      ...existing,
      meals: {
        ...existing.meals,
        [meal]: existing.meals[meal].filter((e) => e.id !== entryId),
      },
    }
    dispatch({ type: 'REMOVE_ENTRY', date, meal, entryId })
    if (user) {
      setDoc(doc(db, 'users', user.uid, 'journal', date), newJournal).catch(() => {})
    }
  }, [user])

  const saveProfile = useCallback(async (profile: UserProfile) => {
    dispatch({ type: 'SAVE_PROFILE', profile })
    if (user) {
      await setDoc(doc(db, 'users', user.uid, 'profile', 'data'), profile)
    }
  }, [user])

  const logWeight = useCallback((date: string, value: number) => {
    dispatch({ type: 'LOG_WEIGHT', date, value })
    if (user) {
      setDoc(doc(db, 'users', user.uid, 'weight', date), { date, value }).catch(() => {})
    }
  }, [user])

  const setSelectedDate = useCallback((date: string) => {
    dispatch({ type: 'SET_DATE', date })
  }, [])

  const getDayTotals = useCallback((date: string) => {
    const journal = stateRef.current.journals[date]
    if (!journal) return { calories: 0, protein: 0, carbs: 0, fat: 0 }
    const all = Object.values(journal.meals).flat()
    return {
      calories: all.reduce((s, e) => s + e.calories, 0),
      protein:  all.reduce((s, e) => s + e.protein, 0),
      carbs:    all.reduce((s, e) => s + e.carbs, 0),
      fat:      all.reduce((s, e) => s + e.fat, 0),
    }
  }, [])

  return (
    <TrackerContext.Provider value={{
      state, addEntry, removeEntry, saveProfile, logWeight, setSelectedDate, getDayTotals,
    }}>
      {children}
    </TrackerContext.Provider>
  )
}

