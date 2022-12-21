import React from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, Text, TouchableWithoutFeedback, TouchableHighlight, View } from 'react-native'

interface Props {
  text: string
  open: boolean
  onClose: (valid: boolean) => void
}

export function ConfirmDialog({ text, open, onClose }: Props) {
  const { t } = useTranslation()

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => onClose(false)}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={() => onClose(false)}>
        <View
          className="w-full h-full items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <View className="bg-white border border-gray-100 rounded m-2">
            <View className="px-4 pt-2 pb-4">
              <Text className="text-center text-lg font-bold">{t('Warning')}</Text>
              <Text className="mt-2 text-center">{text}</Text>
            </View>
            <View className="flex-row">
              <TouchableHighlight
                className="flex-grow"
                underlayColor="#f3f4f6"
                onPress={() => onClose(false)}
              >
                <View className="border-t border-r border-gray-100 py-3">
                  <Text className="text-center ">{t('Cancel')}</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                className="flex-grow"
                underlayColor="#f3f4f6"
                onPress={() => onClose(true)}
              >
                <View className="border-t border-gray-100 py-3">
                  <Text className="text-center font-bold text-yellow-500">{t('CONFIRM')}</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
