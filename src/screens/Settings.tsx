import React from 'react'
import { Linking, Text, TouchableHighlight, View } from 'react-native'

export default function Settings() {
  async function handlePrivacyPolicyPress() {
    await Linking.openURL(
      'https://raw.githubusercontent.com/JulienUsson/arcount/master/privacy-policy.md',
    )
  }

  return (
    <View className="flex-grow">
      <View className="flex-grow" />
      <TouchableHighlight underlayColor="#f3f4f6" onPress={handlePrivacyPolicyPress}>
        <Text className="my-2 text-center">Privacy Policy</Text>
      </TouchableHighlight>
    </View>
  )
}
