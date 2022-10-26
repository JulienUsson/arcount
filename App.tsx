import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

import Main from './src/Main'

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    primary: '#eab308',
    card: '#fff',
    text: '#eab308',
  },
}

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar backgroundColor="white" translucent={false} />
      <Main />
    </NavigationContainer>
  )
}
