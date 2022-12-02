import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={navigationTheme}>
        <BottomSheetModalProvider>
          <StatusBar backgroundColor="white" translucent={false} />
          <Main />
        </BottomSheetModalProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}
