import { useIsFocused } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'

import Scores from '../components/scores'

import { useScoreHistories } from '../db'

export default function ScoreCounter() {
  const isFocused = useIsFocused()
  const [scores, refresh] = useScoreHistories()

  useEffect(() => {
    refresh()
  }, [refresh, isFocused])

  return (
    <View className="h-full">
      {scores.map(({ date, scores }) => (
        <View key={date}>
          <Text>{date}</Text>
          <Scores>{scores}</Scores>
        </View>
      ))}
    </View>
  )
}
