import { useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { List, ListItemButton } from '../components/List'
import { RootStackParamList } from '../Main'

type Navigation = NativeStackScreenProps<RootStackParamList, 'Main'>['navigation']

export default function MoreScreen() {
  const { t } = useTranslation()
  const navigation = useNavigation<Navigation>()

  return (
    <List>
      <ListItemButton onPress={() => navigation.navigate('SightAdjustments')} icon="tune">
        {t('Sight Adjustments')}
      </ListItemButton>
      <ListItemButton onPress={() => navigation.navigate('PrivacyPolicy')} icon="privacy-tip">
        {t('Privacy Policy')}
      </ListItemButton>
    </List>
  )
}
