import Icon from '@expo/vector-icons/MaterialIcons'
import React, { ReactNode } from 'react'
import { GestureResponderEvent, Text, TouchableHighlight, View } from 'react-native'

interface ListProps {
  children: ReactNode | ReactNode[]
}

export function List({ children }: ListProps) {
  return <View className="flex-grow border-t border-gray-100">{children}</View>
}

interface ListItemButtonProps {
  children: string
  icon?: keyof typeof Icon['glyphMap']
  onPress?: (event: GestureResponderEvent) => void
}

export function ListItemButton({ icon, onPress, children }: ListItemButtonProps) {
  return (
    <TouchableHighlight underlayColor="#f3f4f6" onPress={onPress}>
      <View className="py-4 border-b border-gray-100 relative">
        {icon && (
          <View className="absolute top-3 left-8">
            <Icon name={icon} size={24} color="#6b7280" />
          </View>
        )}
        <Text className="text-center text-gray-700">{children}</Text>
      </View>
    </TouchableHighlight>
  )
}
