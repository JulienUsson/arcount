import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import _ from 'lodash'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, TouchableHighlight, View } from 'react-native'

import Counter from '../components/Counter'
import { RootStackParamList } from '../Main'
import { useSightAdjustmentsStore } from '../stores/sightAdjustmentsStore'

type Navigation = NativeStackScreenProps<RootStackParamList, 'SetSightAdjustment'>['navigation']

const distances = [undefined, undefined, ..._.range(101), undefined, undefined]
const values = [
  undefined,
  undefined,
  ..._.range(11).flatMap((i) => _.range(10).map((x) => i + x / 10)),
  undefined,
  undefined,
]

export default function SetSightAdjustmentScreen() {
  const { t } = useTranslation()
  const navigation = useNavigation<Navigation>()
  const { params } = useRoute<RouteProp<RootStackParamList, 'SetSightAdjustment'>>()

  const setAdjustment = useSightAdjustmentsStore((state) => state.set)

  const [distance, setDistance] = useState(params.distance ?? 0)
  const [value, setValue] = useState(params.value ?? 0)

  function handleAdd() {
    setAdjustment({ distance, value })
    navigation.goBack()
  }

  return (
    <View className="flex-1">
      <View className="flex-row justify-center mt-[30%]">
        <Counter data={distances} defaultValue={distance} onChange={setDistance} unit="m" />
        <Counter
          data={values}
          defaultValue={value}
          onChange={setValue}
          unit="cm"
          fractionDigits={1}
        />
      </View>
      <View className="flex-1" />
      <View className="flex-row">
        <TouchableHighlight
          className="flex-grow"
          underlayColor="#f3f4f6"
          onPress={() => navigation.goBack()}
        >
          <View className="border-t border-r border-gray-100 py-3">
            <Text className="text-center ">{t('Cancel')}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight className="flex-grow" underlayColor="#f3f4f6" onPress={handleAdd}>
          <View className="border-t border-gray-100 py-3">
            <Text className="text-center font-bold text-yellow-500">{t('SET')}</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  )
}
