import React, { ReactNode } from 'react'
import { Modal, TouchableWithoutFeedback, View } from 'react-native'

interface Props {
  children: ReactNode
  open: boolean
  onClose: () => void
}

export function Dialog({ children, open, onClose }: Props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          className="w-full h-full items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <View className="bg-white border border-gray-100 rounded m-2 min-w-[200px]">
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
