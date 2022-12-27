import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  TouchableHighlight,
} from '@gorhom/bottom-sheet'
import { FlashList } from '@shopify/flash-list'
import { format } from 'date-fns'
import _ from 'lodash'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GestureResponderEvent, Text, View } from 'react-native'

import { List, ListItemButton } from '../components/List'
import { Modal } from '../components/Modal'
import Points from '../components/Points'
import { HistoryScore, useHistoryStore } from '../stores/historyStore'
import { SessionScore } from '../stores/sessionStore'

const snapPoints = ['25%']

const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
)

export default function ScoreHistoryScreen() {
  const { t } = useTranslation()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const currentIndexRef = useRef<number>()

  const [currentHistory, setCurrentHistory] = useState<HistoryScore>()
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

  const handleMoreInfoPress = () => {
    setCurrentHistory(history[currentIndexRef.current!])
    bottomSheetModalRef.current?.dismiss()
  }

  return (
    <View className="flex-1 mt-2">
      <FlashList
        renderItem={({ item, index }) => {
          return <HistoryLine {...item} onLongPress={handleLineLongPress(item, index)} />
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
          <ListItemButton icon="more-vert" onPress={handleMoreInfoPress}>
            {t('More infos')}
          </ListItemButton>
          <ListItemButton icon="delete" onPress={handleRemoveLinePress}>
            {t('Remove this line')}
          </ListItemButton>
        </List>
      </BottomSheetModal>

      {currentHistory && (
        <Modal
          open
          title={currentHistory.title || format(currentHistory.date, 'dd/MM/yyyy - HH:mm')}
          onClose={() => setCurrentHistory(undefined)}
        >
          <FlashList
            renderItem={({ item }) => {
              return <ScoreLine {...item} />
            }}
            keyExtractor={(_item, index) => index.toString()}
            data={currentHistory.scores}
            estimatedItemSize={100}
            ItemSeparatorComponent={Separator}
            ListFooterComponent={<View className="h-[80px]" />}
          />
        </Modal>
      )}
    </View>
  )
}

interface HistoryLineProps extends HistoryScore {
  onLongPress?: (event: GestureResponderEvent) => void
}

function HistoryLine({ title, date, average, sum, max, onLongPress }: HistoryLineProps) {
  const { t } = useTranslation()
  return (
    <TouchableHighlight underlayColor="#f3f4f6" onLongPress={onLongPress}>
      <View className="px-4 py-1">
        <View className="flex-row">
          <Text>{title}</Text>
          <View className="flex-grow" />
          <Text className="font-light">{format(date, 'dd/MM/yyyy - HH:mm')}</Text>
        </View>

        <View className="flex-row">
          <Text className="flex-1 text-center font-bold text-lg">
            <Text className="font-light">{t('SUM')}</Text> {sum}
            <Text className="font-light">/{max}</Text>
          </Text>

          <Text className="flex-1 text-center font-bold text-lg">
            <Text className="font-light">{t('AVG')}</Text> {average.toFixed(1)}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

interface ScoreLineProps extends SessionScore {
  onLongPress?: (event: GestureResponderEvent) => void
}

function ScoreLine({ points, average, sum, max, onLongPress }: ScoreLineProps) {
  const { t } = useTranslation()
  return (
    <TouchableHighlight underlayColor="#f3f4f6" onLongPress={onLongPress}>
      <View className="px-4 py-1">
        <Points>{points}</Points>
        <View className="flex-row justify-around">
          <Text className="font-bold">
            <Text className="font-light">{t('SUM')}</Text> {sum}
            <Text className="font-light">/{max}</Text>
          </Text>

          <Text className="font-bold">
            <Text className="font-light">{t('AVG')}</Text> {average.toFixed(1)}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

function Empty() {
  const { t } = useTranslation()
  return (
    <Text className="text-center text-gray-400">
      {t('Start your training now and come back later to see your history !')}
    </Text>
  )
}

function Separator() {
  return <View className="border-t border-gray-100" />
}
