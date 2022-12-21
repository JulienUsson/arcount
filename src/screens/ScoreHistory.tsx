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
import { HistoryScore, useHistoryStore } from '../stores/scoreStore'

const snapPoints = ['25%']

const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
)

export default function ScoreHistoryScreen() {
  const { t } = useTranslation()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const currentIndexRef = useRef<number>()

  const history = useHistoryStore((state) => state.history)
  const removeScore = useHistoryStore((state) => state.remove)

  const handleLineLongPress = (_score: HistoryScore, index: number) => {
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
        data={history}
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

interface ScoreLineProps extends HistoryScore {
  onLongPress?: (event: GestureResponderEvent) => void
}

function ScoreLine({ date, average, sum, onLongPress }: ScoreLineProps) {
  const { t } = useTranslation()
  return (
    <TouchableHighlight underlayColor="#f3f4f6" onLongPress={onLongPress}>
      <View className="px-4 py-1">
        <Text className="text-center font-light">{format(date, 'dd/MM/yyyy - HH:mm')}</Text>
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
      {t('Start your training now and come back later to see your history !')}
    </Text>
  )
}

function Separator() {
  return <View className="border-t border-gray-100" />
}
