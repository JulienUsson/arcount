import { styled } from 'nativewind'
import React from 'react'
import { ScrollView, Text } from 'react-native'

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView className="m-2">
      <Title>Collection of Personal Information</Title>

      <Paragraph>
        The app does not collect, transmit or share any information, personal or otherwise.
      </Paragraph>

      <Title>Email</Title>

      <Paragraph>
        If you email the developer for support or other feedback, the emails with email addresses
        will be retained for quality assurance purposes. The email addresses will be used only to
        reply to the concerns or suggestions raised and will never be used for any marketing
        purpose.
      </Paragraph>

      <Title>Disclosure of Personal Information</Title>

      <Paragraph>
        We will not disclose your information to any third party except if you expressly consent or
        where required by law.
      </Paragraph>

      <Paragraph>© 2022 Julien Usson. All Rights Reserved.</Paragraph>
    </ScrollView>
  )
}

const Title = styled(Text, 'font-bold text-lg')
const Paragraph = styled(Text, 'mb-2')
