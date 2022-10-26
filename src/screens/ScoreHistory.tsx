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
        ListEmptyComponent={Empty}
      />
    </View>
  )
}

function ScoreLine({ date, scores, average, sum }: ScoreHistory) {
  return (
    <View>
      <Text>{format(date, 'dd/MM/yyyy HH:mm')}</Text>
      <Scores>{scores}</Scores>
      <Text>
        {average.toFixed(1)} {sum}
      </Text>
    </View>
  )
}

function Empty() {
  return (
    <Text className="text-center text-gray-700">
      Start your training now and come back later to see your scores !
    </Text>
  )
}

function Separator() {
  return <View className="mx-4 my-1 border-t border-gray-100" />
}
