import { styled } from 'nativewind'
import React from 'react'
import { Text, TouchableHighlight, TouchableOpacityProps, View } from 'react-native'

interface Props extends TouchableOpacityProps {
  rootStyle?: TouchableOpacityProps['style']
  textStyle?: TouchableOpacityProps['style']
  children: string
}

function Button({ rootStyle, textStyle, children, ...props }: Props) {
  return (
    <View className="h-24 w-1/4 p-4">
      <TouchableHighlight
        underlayColor="#f3f4f6"
        {...props}
        style={rootStyle}
        className="h-full flex justify-center items-center rounded-full"
      >
        <Text style={textStyle} className="text-4xl">
          {children}
        </Text>
      </TouchableHighlight>
    </View>
  )
}

export default styled(Button, {
  props: {
    rootStyle: true,
    textStyle: true,
  },
})
