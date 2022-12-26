import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FlashList } from '@shopify/flash-list'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { GestureResponderEvent, Text, TouchableHighlight, View } from 'react-native'

import Fab from '../components/Fab'

import { List, ListItemButton } from '../components/List'
import { RootStackParamList } from '../Main'

import { SightAdjustment, useSightAdjustmentsStore } from '../stores/sightAdjustmentsStore'

type Navigation = NativeStackScreenProps<RootStackParamList, 'SightAdjustments'>['navigation']

const snapPoints = ['25%']

const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
)

export default function SightAdjustmentsScreen() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const currentIndexRef = useRef<number>()
  const { t } = useTranslation()
  const navigation = useNavigation<Navigation>()

  const adjustments = useSightAdjustmentsStore((state) => state.adjustments)
  const removeAdjustment = useSightAdjustmentsStore((state) => state.remove)

  const handleLineLongPress = (_adjustment: SightAdjustment, index: number) => {
    return () => {
      bottomSheetModalRef.current?.present()
      currentIndexRef.current = index
    }
  }

  const handleRemoveLinePress = () => {
    removeAdjustment(currentIndexRef.current!)
    bottomSheetModalRef.current?.dismiss()
  }

  const handleEditLinePress = () => {
    bottomSheetModalRef.current?.dismiss()
    navigation.navigate('SetSightAdjustment', adjustments[currentIndexRef.current!])
  }

  const handleAddPress = () => {
    navigation.navigate('SetSightAdjustment', {})
  }

  return (
    <View className="flex-1">
      <FlashList
        renderItem={({ item, index }) => {
          return <SightAdjustmentLine {...item} onLongPress={handleLineLongPress(item, index)} />
        }}
        keyExtractor={(item) => item.distance.toString()}
        data={adjustments}
        estimatedItemSize={100}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={Empty}
        ListFooterComponent={<View className="h-[80px]" />}
      />
      <Fab icon="add" onPress={handleAddPress} />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        <List>
          <ListItemButton icon="edit" onPress={handleEditLinePress}>
            {t('Edit this line')}
          </ListItemButton>
          <ListItemButton icon="delete" onPress={handleRemoveLinePress}>
            {t('Remove this line')}
          </ListItemButton>
        </List>
      </BottomSheetModal>
    </View>
  )
}

interface SightAdjustmentLineProps extends SightAdjustment {
  onLongPress?: (event: GestureResponderEvent) => void
}

function SightAdjustmentLine({ distance, value, onLongPress }: SightAdjustmentLineProps) {
  return (
    <TouchableHighlight underlayColor="#f3f4f6" onLongPress={onLongPress}>
      <View className="py-2 flex-row justify-evenly">
        <Text className="text-center">{distance} m</Text>
        <Text>{value.toFixed(1)} cm</Text>
      </View>
    </TouchableHighlight>
  )
}

function Empty() {
  const { t } = useTranslation()
  return (
    <Text className="text-center text-gray-400">
      {t('Use this screen to save your sight adjustments.')}
    </Text>
  )
}

function Separator() {
  return <View className="border-t border-gray-100" />
}
