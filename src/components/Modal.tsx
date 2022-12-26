import Icon from '@expo/vector-icons/MaterialIcons'
import React, { ReactNode } from 'react'
import { Modal as ModalRN, Text, TouchableHighlight, View } from 'react-native'

interface Props {
  title: string
  children: ReactNode
  open: boolean
  onClose: () => void
}

export function Modal({ title, children, open, onClose }: Props) {
  return (
    <ModalRN animationType="slide" visible={open} onRequestClose={onClose}>
      <View className="px-2 relative">
        <Text className="flex-grow text-center text-lg font-bold">{title}</Text>
        <TouchableHighlight
          className="absolute top-0 right-2 rounded-full"
          underlayColor="#f3f4f6"
          onPress={() => onClose()}
        >
          <Icon name="close" size={32} color="#111827" />
        </TouchableHighlight>
      </View>
      <View className="px-2 grow">{children}</View>
    </ModalRN>
  )
}
