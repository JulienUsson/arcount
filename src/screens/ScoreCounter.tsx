import React, { useMemo, useState } from 'react'
import { Text, View } from 'react-native'

import Button from '../components/button'
import IconButton from '../components/icon-button'
import Points from '../components/points'
import { useScoreStore } from '../stores/scoreStore'

export default function ScoreCounter() {
  const addScore = useScoreStore((state) => state.add)
  const [points, setPoints] = useState<number[]>([])
  const sum = useMemo(() => points.reduce((acc, score) => acc + score, 0), [points])

  function add(value: number) {
    return () => {
      setPoints([...points, value])
    }
  }

  function remove() {
    setPoints(points.filter((_, index) => index !== points.length - 1))
  }

  function removeAll() {
    setPoints([])
  }

  async function done() {
    if (points.length > 0) {
      addScore(points)
      setPoints([])
    }
  }

  return (
    <View className="h-full">
      <View className="flex-1 relative">
        <Points>{points}</Points>
        <View className="mb-4 mx-4">
          <Text className="text-right text-4xl text-gray-300 mb-2">{points.length}</Text>
          <Text className="text-right text-6xl text-gray-800">{sum}</Text>
        </View>
      </View>
      <View className="mx-4 mb-2 border-t border-gray-100" />
      <View className="flex flex-row">
        <View className="w-1/2" />
        <IconButton
          name="backspace"
          iconStyle="pr-[6px]"
          onPress={remove}
          onLongPress={removeAll}
        />
        <IconButton name="done" onPress={done} />
      </View>
      <View className="flex flex-row">
        <View className="w-1/4" />
        <Button textStyle="text-gray-400" onPress={add(1)}>
          1
        </Button>
        <Button textStyle="text-gray-800" onPress={add(4)}>
          4
        </Button>
        <Button textStyle="text-red-600" onPress={add(7)}>
          7
        </Button>
      </View>
      <View className="flex flex-row">
        <Button textStyle="text-gray-300" onPress={add(0)}>
          X
        </Button>
        <Button textStyle="text-gray-800" onPress={add(3)}>
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
