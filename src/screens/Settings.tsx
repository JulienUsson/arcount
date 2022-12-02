import React from 'react'
import { useTranslation } from 'react-i18next'
import { Linking, Text, TouchableHighlight, View } from 'react-native'

export default function Settings() {
  const { t } = useTranslation()

  async function handlePrivacyPolicyPress() {
    await Linking.openURL(
      'https://raw.githubusercontent.com/JulienUsson/arcount/master/privacy-policy.md',
    )
  }

  return (
    <View className="flex-grow border-t border-gray-100">
      <TouchableHighlight underlayColor="#f3f4f6" onPress={handlePrivacyPolicyPress}>
        <Text className="py-4 text-center border-b border-gray-100">{t('Privacy Policy')}</Text>
      </TouchableHighlight>
    </View>
  )
}
