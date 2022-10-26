import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback, useEffect, useState } from 'react'

const KEY = '@scores'

export interface ScoreHistory {
  scores: number[]
  date: number
}

export async function getScoreHistories(): Promise<ScoreHistory[]> {
  return JSON.parse((await AsyncStorage.getItem(KEY)) ?? '[]') as ScoreHistory[]
}

export async function saveScoreHistory(scores: number[]) {
  const data = await getScoreHistories()
  data.unshift({ scores, date: Date.now() })
  AsyncStorage.setItem(KEY, JSON.stringify(data))
}

export function useScoreHistories(): [ScoreHistory[], () => void] {
  const [scores, setScores] = useState<ScoreHistory[]>([])

  useEffect(() => {
    getScoreHistories().then((scores) => setScores(scores))
  }, [])

  const refresh = useCallback(() => {
    getScoreHistories().then((scores) => setScores(scores))
  }, [])

  return [scores, refresh]
}
