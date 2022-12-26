import React from 'react'
import { Text, View } from 'react-native'

export default function Badge({ children }: { children: number }) {
  return (
    <View className="bg-red-600 rounded-full h-[18px] w-[18px] justify-center items-center">
      <Text className="text-white text-xs font-bold">{children}</Text>
    </View>
  )
}
