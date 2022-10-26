import Icon from '@expo/vector-icons/MaterialIcons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'

import ScoreCounter from './screens/ScoreCounter'
import ScoreHistory from './screens/ScoreHistory'

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
        name="ScoreHistory"
        component={ScoreHistory}
        options={{
          tabBarIcon: ({ color }) => <Icon name="timeline" color={color} size={24} />,
        }}
      />
    </Tab.Navigator>
  )
}
