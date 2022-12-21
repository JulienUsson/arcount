import AsyncStorage from '@react-native-async-storage/async-storage'
import _ from 'lodash'
import create from 'zustand'
import { persist } from 'zustand/middleware'

import { SessionScore } from './sessionStore'

export interface HistoryScore {
  title: string
  date: number
  scores: SessionScore[]
  sum: number
  average: number
  max: number
}

interface HistoryState {
  history: HistoryScore[]
  add: (title: string, scores: SessionScore[]) => void
  remove: (index: number) => void
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      history: [],
      add: (title, scores) => {
        const points = scores.flatMap((score) => score.points)
        const newHistory: HistoryScore = {
          title,
          date: Date.now(),
          scores,
          sum: _.sum(points),
          average: _.mean(points),
          max: _.sumBy(scores, (score) => score.max),
        }
        return set(({ history }) => ({ history: [newHistory, ...history] }))
      },
      remove: (index) =>
        set(({ history: scores }) => {
          return { history: scores.filter((_, i) => i !== index) }
        }),
    }),
    {
      name: '@history',
      getStorage: () => AsyncStorage,
    },
  ),
)
