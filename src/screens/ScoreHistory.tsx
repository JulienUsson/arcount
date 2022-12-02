import { FlashList } from '@shopify/flash-list'
import { format } from 'date-fns'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

import Points from '../components/points'
import { Score, useScoreStore } from '../stores/scoreStore'

export default function ScoreCounter() {
  const scores = useScoreStore((state) => state.scores)

  return (
    <View className="flex-1 mt-2">
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
  const { t } = useTranslation()
  return (
    <View>
      <Text className="text-center font-light">{format(date, 'dd/MM/yyyy - HH:mm')}</Text>
      <Points>{points}</Points>
      <View className="flex-row justify-around">
        <Text className="font-bold">
          <Text className="font-light">{t('AVG')}</Text> {average.toFixed(1)}
        </Text>
        <Text className="font-bold">
          <Text className="font-light">{t('SUM')}</Text> {sum}
        </Text>
      </View>
    </View>
  )
}

function Empty() {
  const { t } = useTranslation()
  return (
    <Text className="text-center text-gray-700">
      {t('Start your training now and come back later to see your scores !')}
    </Text>
  )
}

function Separator() {
  return <View className="mx-4 my-1 border-t border-gray-100" />
}
