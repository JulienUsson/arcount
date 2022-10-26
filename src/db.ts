import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

const KEY = '@scores'

interface ScoreHistory {
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

export function useScoreHistories() {
  const [scores, setScores] = useState<ScoreHistory[]>([])

  useEffect(() => {
    getScoreHistories().then((scores) => setScores(scores))
  }, [])

  return scores
}
