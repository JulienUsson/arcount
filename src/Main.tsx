import './i18n'
import Icon from '@expo/vector-icons/MaterialIcons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import { useTranslation } from 'react-i18next'

import Badge from './components/Badge'
import MoreScreen from './screens/More'
import PrivacyPolicyScreen from './screens/PrivacyPolicy'
import ScoreCounterScreen from './screens/ScoreCounter'
import ScoreHistory from './screens/ScoreHistory'
import SessionScoreScreen from './screens/SessionScore'
import SightAdjustmentsScreen from './screens/SightAdjustments'
import { useSessionStore } from './stores/sessionStore'

export type RootStackParamList = {
  Main: undefined
  SightAdjustments: undefined
  PrivacyPolicy: undefined
}

export type TabParamList = {
  ScoreCounter: undefined
  SessionScore: undefined
  ScoreHistory: undefined
  More: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createMaterialTopTabNavigator<TabParamList>()

export default function Main() {
  const { t } = useTranslation()

  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={TabNavigator} options={{ header: () => null }} />
      <Stack.Screen
        name="SightAdjustments"
        component={SightAdjustmentsScreen}
        options={{ title: t('Sight Adjustments') as string }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{ title: t('Privacy Policy') as string }}
      />
    </Stack.Navigator>
  )
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarShowLabel: false,
        tabBarStyle: { elevation: 0 },
        tabBarPressColor: '#f3f4f6',
      }}
    >
      <Tab.Screen
        name="ScoreCounter"
        component={ScoreCounterScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="calculate" color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="SessionScore"
        component={SessionScoreScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="track-changes" color={color} size={24} />,
          tabBarBadge: () => <SessionBadge />,
        }}
      />
      <Tab.Screen
        name="ScoreHistory"
        component={ScoreHistory}
        options={{
          tabBarIcon: ({ color }) => <Icon name="timeline" color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="more-horiz" color={color} size={24} />,
        }}
      />
    </Tab.Navigator>
  )
}

function SessionBadge() {
  const count = useSessionStore((state) => state.scores.length)
  if (!count) {
    return null
  }

  return <Badge>{count}</Badge>
}
