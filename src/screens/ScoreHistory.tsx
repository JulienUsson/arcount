import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  TouchableHighlight,
} from '@gorhom/bottom-sheet'
import { FlashList } from '@shopify/flash-list'
import { format } from 'date-fns'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { GestureResponderEvent, Text, View } from 'react-native'

import { List, ListItemButton } from '../components/List'

import Points from '../components/points'
import { Score, useScoreStore } from '../stores/scoreStore'

const snapPoints = ['25%']

const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
)

export default function ScoreCounter() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const scores = useScoreStore((state) => state.scores)
  const removeScore = useScoreStore((state) => state.remove)
  const currentIndexRef = useRef<number>()
  const { t } = useTranslation()

  const handleLineLongPress = (_score: Score, index: number) => {
    return () => {
      bottomSheetModalRef.current?.present()
      currentIndexRef.current = index
    }
  }

  const handleRemoveLinePress = () => {
    removeScore(currentIndexRef.current!)
    bottomSheetModalRef.current?.dismiss()
  }

  return (
    <View className="flex-1 mt-2">
      <FlashList
        renderItem={({ item, index }) => {
          return <ScoreLine {...item} onLongPress={handleLineLongPress(item, index)} />
        }}
        keyExtractor={(item) => item.date.toString()}
        data={scores}
        estimatedItemSize={100}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={Empty}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        <List>
          <ListItemButton icon="delete" onPress={handleRemoveLinePress}>
            {t('Remove this line')}
          </ListItemButton>
        </List>
      </BottomSheetModal>
    </View>
  )
}

interface ScoreLineProps extends Score {
  onLongPress?: (event: GestureResponderEvent) => void
}

function ScoreLine({ date, points, average, sum, onLongPress }: ScoreLineProps) {
  const { t } = useTranslation()
  return (
    <TouchableHighlight underlayColor="#f3f4f6" onLongPress={onLongPress}>
      <View className="px-4 py-1">
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
    </TouchableHighlight>
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
  return <View className="border-t border-gray-100" />
}
