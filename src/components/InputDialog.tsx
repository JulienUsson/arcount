import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, TextInput, TouchableHighlight, View } from 'react-native'

import { Dialog } from './Dialog'

interface Props {
  title: string
  placeholder: string
  open: boolean
  onClose: (text?: string) => void
}

export function InputDialog({ title, placeholder, open, onClose }: Props) {
  const { t } = useTranslation()
  const inputRef = useRef<TextInput>(null)
  const [value, setValue] = useState('')

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose}>
      <View className="px-4 pt-2 pb-4">
        <Text className="pb-2 text-center text-lg font-bold">{title}</Text>
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={setValue}
          className="border rounded border-yellow-400 px-2 py-1 w-[250px]"
          placeholder={placeholder}
          selectionColor="#facc15"
        />
      </View>
      <View className="flex-row">
        <TouchableHighlight className="flex-grow" underlayColor="#f3f4f6" onPress={() => onClose()}>
          <View className="border-t border-r border-gray-100 py-3">
            <Text className="text-center ">{t('Cancel')}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          className="flex-grow"
          underlayColor="#f3f4f6"
          onPress={() => {
            setValue('')
            onClose(value)
          }}
        >
          <View className="border-t border-gray-100 py-3">
            <Text className="text-center font-bold text-yellow-500">{t('SAVE')}</Text>
          </View>
        </TouchableHighlight>
      </View>
    </Dialog>
  )
}
