import AsyncStorage from '@react-native-async-storage/async-storage'
import create from 'zustand'
import { persist } from 'zustand/middleware'

export interface Score {
  points: number[]
  date: number
  sum: number
  average: number
}

interface ScoreState {
  scores: Score[]
  add: (points: number[]) => void
}

export const useScoreStore = create<ScoreState>()(
  persist(
    (set) => ({
      scores: [],
      add: (points) =>
        set(({ scores }) => {
          const sum = points.reduce((acc, point) => acc + point, 0)
          const average = sum / points.length
          const newScore: Score = { points, date: Date.now(), average, sum }
          return { scores: [newScore, ...scores] }
        }),
    }),
    {
      name: '@scores',
      getStorage: () => AsyncStorage,
    },
  ),
)
