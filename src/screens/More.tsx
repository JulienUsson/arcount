import { useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Linking } from 'react-native'

import { List, ListItemButton } from '../components/List'
import { RootStackParamList } from '../Main'

type Navigation = NativeStackScreenProps<RootStackParamList, 'SightAdjustments'>['navigation']

export default function MoreScreen() {
  const { t } = useTranslation()
  const navigation = useNavigation<Navigation>()

  async function handlePrivacyPolicyPress() {
    await Linking.openURL(
      'https://raw.githubusercontent.com/JulienUsson/arcount/master/privacy-policy.md',
    )
  }

  return (
    <List>
      <ListItemButton onPress={() => navigation.navigate('SightAdjustments')} icon="tune">
        {t('Sight Adjustments')}
      </ListItemButton>
      <ListItemButton onPress={handlePrivacyPolicyPress} icon="privacy-tip">
        {t('Privacy Policy')}
      </ListItemButton>
    </List>
  )
}
