import React from 'react'
import { useTranslation } from 'react-i18next'
import { Linking } from 'react-native'

import { List, ListItemButton } from '../components/List'

export default function Settings() {
  const { t } = useTranslation()

  async function handlePrivacyPolicyPress() {
    await Linking.openURL(
      'https://raw.githubusercontent.com/JulienUsson/arcount/master/privacy-policy.md',
    )
  }

  return (
    <List>
      <ListItemButton onPress={handlePrivacyPolicyPress} icon="privacy-tip">
        {t('Privacy Policy')}
      </ListItemButton>
    </List>
  )
}
