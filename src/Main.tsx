import './i18n'
import Icon from '@expo/vector-icons/MaterialIcons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'

import Badge from './components/Badge'
import ScoreCounterScreen from './screens/ScoreCounter'
import ScoreHistory from './screens/ScoreHistory'
import SessionScoreScreen from './screens/SessionScore'
import SettingsScreen from './screens/Settings'
import { useSessionStore } from './stores/sessionStore'

export type RootParamList = {
  ScoreCounter: undefined
  SessionScore: undefined
  ScoreHistory: undefined
  Settings: undefined
}

const Tab = createMaterialTopTabNavigator<RootParamList>()

export default function Main() {
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
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="settings" color={color} size={24} />,
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
