import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  TouchableHighlight,
} from '@gorhom/bottom-sheet'
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import { useNavigation } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import _ from 'lodash'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GestureResponderEvent, Text, View } from 'react-native'

import { ConfirmDialog } from '../components/ConfirmDialog'
import Fab from '../components/Fab'
import { InputDialog } from '../components/InputDialog'
import { List, ListItemButton } from '../components/List'
import Points from '../components/Points'
import { RootParamList } from '../Main'
import { useHistoryStore } from '../stores/scoreStore'
import { SessionScore, useSessionStore } from '../stores/sessionStore'

type Navigation = MaterialTopTabScreenProps<RootParamList, 'SessionScore'>['navigation']

const snapPoints = ['25%']

const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
)

export default function SessionScoreScreen() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const currentIndexRef = useRef<number>()
  const { t } = useTranslation()
  const navigation = useNavigation<Navigation>()

  const scores = useSessionStore((state) => state.scores)
  const removeScore = useSessionStore((state) => state.remove)
  const removeAllScores = useSessionStore((state) => state.removeAll)
  const saveScore = useHistoryStore((state) => state.add)
  const [showRemoveAllConfirm, setRemoveAllConfirm] = useState(false)
  const [showSaveDialog, setSaveDialog] = useState(false)

  const volleysCount = scores.length
  const points = scores.flatMap((score) => score.points)
  const average = _.mean(points)
  const sum = _.sum(points)
  const max = _.sumBy(scores, (score) => score.max)

  const handleLineLongPress = (_score: SessionScore, index: number) => {
    return () => {
      bottomSheetModalRef.current?.present()
      currentIndexRef.current = index
    }
  }

  const handleRemoveLinePress = () => {
    removeScore(currentIndexRef.current!)
    bottomSheetModalRef.current?.dismiss()
  }

  const handleRemoveAllLinesPress = () => {
    bottomSheetModalRef.current?.dismiss()
    setRemoveAllConfirm(true)
  }

  const handleSavePress = () => {
    setSaveDialog(true)
  }

  const handleRemoveAllConfirmClose = (resp: boolean) => {
    if (resp) {
      removeAllScores()
    }
    setRemoveAllConfirm(false)
  }

  const handleSaveDialogClose = (text: string | undefined) => {
    if (text !== undefined) {
      saveScore(text, scores)
      removeAllScores()
      navigation.navigate('ScoreHistory')
    }
    setSaveDialog(false)
  }

  return (
    <View className="flex-1 mt-2">
      {volleysCount > 0 && (
        <View className="px-4 py-1 border-b border-gray-300">
          <View className="flex-row justify-around">
            <Text className="text-lg font-bold">
              <Text className="font-light">{t('CNT')}</Text> {volleysCount}
            </Text>

            <Text className="text-lg font-bold">
              <Text className="font-light">{t('AVG')}</Text> {average.toFixed(1)}
            </Text>

            <Text className="text-lg  font-bold">
              <Text className="font-light">{t('SUM')}</Text> {sum}
              <Text className="font-light">/{max}</Text>
            </Text>
          </View>
        </View>
      )}
      <FlashList
        renderItem={({ item, index }) => {
          return <ScoreLine {...item} onLongPress={handleLineLongPress(item, index)} />
        }}
        keyExtractor={(_item, index) => index.toString()}
        data={scores}
        estimatedItemSize={100}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={Empty}
        ListFooterComponent={<View className="h-[80px]" />}
      />
      {volleysCount > 0 && <Fab icon="save" onPress={handleSavePress} />}
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
          <ListItemButton icon="clear-all" onPress={handleRemoveAllLinesPress}>
            {t('Remove all lines')}
          </ListItemButton>
        </List>
      </BottomSheetModal>
      <ConfirmDialog
        text={t('Are you sure to delete all scores?')}
        open={showRemoveAllConfirm}
        onClose={handleRemoveAllConfirmClose}
      />
      <InputDialog
        title={t('Save your training')}
        placeholder={t('Choose a name')}
        open={showSaveDialog}
        onClose={handleSaveDialogClose}
      />
    </View>
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
            <Text className="font-light">{t('AVG')}</Text> {average.toFixed(1)}
          </Text>
          <Text className="font-bold">
            <Text className="font-light">{t('SUM')}</Text> {sum}
            <Text className="font-light">/{max}</Text>
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
      {t('Start your training now and come back later to see your scores !')}
    </Text>
  )
}

function Separator() {
  return <View className="border-t border-gray-100" />
}
