import AsyncStorage from '@react-native-async-storage/async-storage'
import create from 'zustand'
import { persist } from 'zustand/middleware'

export interface Score {
  points: number[]
  date: number
  sum: number
  average: number
  max: number
}

interface SessionState {
  scores: Score[]
  add: (points: number[]) => void
  remove: (index: number) => void
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      scores: [],
      add: (points) =>
        set(({ scores }) => {
          const sum = points.reduce((acc, point) => acc + point, 0)
          const average = sum / points.length
          const newScore: Score = {
            points,
            date: Date.now(),
            average,
            sum,
            max: points.length * 10,
          }
          return { scores: [newScore, ...scores] }
        }),
      remove: (index) =>
        set(({ scores }) => {
          return { scores: scores.filter((_, i) => i !== index) }
        }),
    }),
    {
      name: '@session',
      getStorage: () => AsyncStorage,
    },
  ),
)
