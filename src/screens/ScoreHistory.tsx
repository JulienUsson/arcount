import React from 'react'
import { Text, View } from 'react-native'

import Scores from '../components/scores'

import { useScoreHistories } from '../db'

export default function ScoreCounter() {
  const scores = useScoreHistories()

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
