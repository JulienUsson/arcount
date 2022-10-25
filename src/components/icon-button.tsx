import Icon from '@expo/vector-icons/MaterialIcons'
import { styled } from 'nativewind'
import React from 'react'
import { TouchableHighlight, TouchableOpacityProps, View } from 'react-native'

interface Props extends TouchableOpacityProps {
  rootStyle?: TouchableOpacityProps['style']
  iconStyle?: TouchableOpacityProps['style']
  name: keyof typeof Icon['glyphMap']
}

function IconButton({ rootStyle, iconStyle, name, ...props }: Props) {
  return (
    <View className="h-24 w-1/4 p-4">
      <TouchableHighlight
        underlayColor="#f3f4f6"
        {...props}
        style={rootStyle}
        className="h-full flex justify-center items-center rounded-full bg-yellow-400"
      >
        <Icon name={name} style={iconStyle} size={32} color="#fff" />
      </TouchableHighlight>
    </View>
  )
}

export default styled(IconButton, {
  props: {
    rootStyle: true,
    iconStyle: true,
  },
})
