import './i18n'
import Icon from '@expo/vector-icons/MaterialIcons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'

import { Text, View } from 'react-native'

import ScoreCounter from './screens/ScoreCounter'
import ScoreHistory from './screens/ScoreHistory'
import SessionScore from './screens/SessionScore'
import Settings from './screens/Settings'
import { useSessionStore } from './stores/sessionStore'

const Tab = createMaterialTopTabNavigator()

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
        component={ScoreCounter}
        options={{
          tabBarIcon: ({ color }) => <Icon name="calculate" color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="SessionScore"
        component={SessionScore}
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
        component={Settings}
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

function Badge({ children }: { children: number }) {
  return (
    <View className="bg-red-600 rounded-full h-[18px] w-[18px] justify-center items-center">
      <Text className="text-white text-xs font-bold">{children}</Text>
    </View>
  )
}
