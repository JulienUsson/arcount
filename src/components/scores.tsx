import React from 'react'
import { Text, View } from 'react-native'

interface Props {
  children: number[]
}

export default function Scores({ children: scores }: Props) {
  return (
    <View className="flex-row m-3 flex-wrap">
      {scores.map((score, index) => {
        const bgColor = getBackgroundClass(score)
        return (
          <View
            key={index}
            className={`m-1 w-8 h-8 ${bgColor} rounded-full justify-center items-center`}
          >
            <Text className="text-lg text-white">{score === 0 ? 'X' : score}</Text>
          </View>
        )
      })}
    </View>
  )
}

function getBackgroundClass(score: number) {
  switch (score) {
    case 0:
      return 'bg-gray-300'
    case 1:
    case 2:
      return 'bg-gray-400'
    case 3:
    case 4:
      return 'bg-gray-800'
    case 5:
    case 6:
      return 'bg-blue-500'
    case 7:
    case 8:
      return 'bg-red-600'
    case 9:
    case 10:
      return 'bg-yellow-400'
  }
}
