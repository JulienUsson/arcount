import { FlashList } from '@shopify/flash-list'
import { format } from 'date-fns'
import React from 'react'
import { Text, View } from 'react-native'

import Points from '../components/points'
import { Score, useScoreStore } from '../stores/scoreStore'

export default function ScoreCounter() {
  const scores = useScoreStore((state) => state.scores)

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

function ScoreLine({ date, points, average, sum }: Score) {
  return (
    <View>
      <Text>{format(date, 'dd/MM/yyyy HH:mm')}</Text>
      <Points>{points}</Points>
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
