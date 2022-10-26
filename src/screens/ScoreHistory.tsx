import { useIsFocused } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { format } from 'date-fns'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'

import Scores from '../components/scores'

import { ScoreHistory, useScoreHistories } from '../db'

export default function ScoreCounter() {
  const isFocused = useIsFocused()
  const [scores, refresh] = useScoreHistories()

  useEffect(() => {
    refresh()
  }, [refresh, isFocused])

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        renderItem={({ item }) => {
          return <ScoreLine {...item} />
        }}
        keyExtractor={(item) => item.date.toString()}
        data={scores}
        estimatedItemSize={100}
        ItemSeparatorComponent={Separator}
      />
    </View>
  )
}

function ScoreLine({ date, scores }: ScoreHistory) {
  return (
    <View>
      <Text>{format(date, 'dd/MM/yyyy HH:mm')}</Text>
      <Scores>{scores}</Scores>
    </View>
  )
}

function Separator() {
  return <View className="mx-4 my-1 border-t border-gray-100" />
}
