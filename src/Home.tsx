import Icon from '@expo/vector-icons/MaterialIcons'
import React, { useMemo, useState } from 'react'
import { Text, View } from 'react-native'

import Button from './components/button'

export default function Home() {
  const [scores, setScores] = useState<number[]>([])
  const sum = useMemo(() => scores.reduce((acc, score) => acc + score, 0), [scores])

  function add(value: number) {
    return () => {
      setScores([...scores, value])
    }
  }

  function remove() {
    setScores(scores.filter((_, index) => index !== scores.length - 1))
  }

  function done() {
    setScores([])
  }

  return (
    <View className="h-full">
      <View className="flex-1">
        <Text>{JSON.stringify(scores)}</Text>
        <Text>{sum}</Text>
      </View>
      <View className="flex flex-row">
        <View className="w-1/2" />
        <Button textStyle="text-black" onPress={remove}>
          <Icon name="backspace" size={24} />
        </Button>
        <Button textStyle="text-black" onPress={done}>
          <Icon name="done" size={24} />
        </Button>
      </View>
      <View className="flex flex-row">
        <View className="w-1/4" />
        <Button textStyle="text-gray-400" onPress={add(1)}>
          1
        </Button>
        <Button textStyle="text-black" onPress={add(4)}>
          4
        </Button>
        <Button textStyle="text-red-600" onPress={add(7)}>
          7
        </Button>
      </View>
      <View className="flex flex-row">
        <Button textStyle="text-gray-200" onPress={add(0)}>
          <Icon name="close" size={24} />
        </Button>
        <Button textStyle="text-black" onPress={add(3)}>
          3
        </Button>
        <Button textStyle="text-blue-500" onPress={add(6)}>
          6
        </Button>
        <Button textStyle="text-yellow-400" onPress={add(9)}>
          9
        </Button>
      </View>
      <View className="flex flex-row">
        <Button textStyle="text-gray-400" onPress={add(2)}>
          2
        </Button>
        <Button textStyle="text-blue-500" onPress={add(5)}>
          5
        </Button>
        <Button textStyle="text-red-600" onPress={add(8)}>
          8
        </Button>
        <Button textStyle="text-yellow-400" onPress={add(10)}>
          10
        </Button>
      </View>
    </View>
  )
}
